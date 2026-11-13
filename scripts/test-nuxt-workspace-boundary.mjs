import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const frontend = createRequire(path.join(root, "front-end/package.json"));
const { NuxtConfigSchema } = await import(pathToFileURL(frontend.resolve("@nuxt/schema")).href);

async function workspaceFor(rootDir, value) {
	return NuxtConfigSchema.workspaceDir.$resolve(value, async (name) => {
		assert.equal(name, "rootDir");
		return rootDir;
	});
}

async function allowFor(rootDir, workspaceDir) {
	const inputs = {
		rootDir,
		workspaceDir,
		buildDir: path.join(rootDir, ".nuxt"),
		srcDir: path.join(rootDir, "app")
	};
	return NuxtConfigSchema.vite.server.fs.allow.$resolve(undefined, async name => inputs[name]);
}

function contains(parent, filename) {
	const relative = path.relative(parent, filename);
	return relative === "" || (!path.isAbsolute(relative) && relative !== ".." && !relative.startsWith(`..${path.sep}`));
}

for (const marker of [
	"package-lock.json",
	"pnpm-workspace.yaml",
	"deno.json",
	"deno.jsonc"
]) {
	test(`ancestor ${marker} without workspace membership stays outside the development boundary`, async (context) => {
		const directory = await mkdtemp(path.join(tmpdir(), "consensus-workspace-"));
		context.after(() => rm(directory, { recursive: true, force: true }));
		const application = path.join(directory, "projects", "application");
		await mkdir(application, { recursive: true });
		await writeFile(path.join(directory, marker), marker.endsWith(".yaml")
			? "onlyBuiltDependencies:\n  - esbuild\n"
			: "{}\n");
		await writeFile(path.join(application, "package.json"), JSON.stringify({ name: "owned-application", private: true }));
		execFileSync("git", ["init", "--quiet", application]);
		const workspace = await workspaceFor(application);
		assert.equal(workspace, application);
		const allow = await allowFor(application, workspace);
		assert.ok(allow.every(parent => !contains(parent, path.join(directory, "outside.txt"))));
	});
}

test("declared monorepo imports remain available within their explicit boundary", async (context) => {
	const directory = await mkdtemp(path.join(tmpdir(), "consensus-monorepo-"));
	context.after(() => rm(directory, { recursive: true, force: true }));
	const workspace = path.join(directory, "workspace");
	const application = path.join(workspace, "apps", "application");
	await mkdir(application, { recursive: true });
	await writeFile(path.join(workspace, "package.json"), JSON.stringify({
		private: true,
		workspaces: ["apps/*", "packages/*"]
	}));
	await writeFile(path.join(application, "package.json"), JSON.stringify({ private: true }));
	execFileSync("git", ["init", "--quiet", workspace]);
	assert.equal(await workspaceFor(application), workspace);
	const allow = await allowFor(application, workspace);
	assert.ok(allow.some(parent => contains(parent, path.join(workspace, "packages", "shared", "index.ts"))));
	assert.ok(allow.every(parent => !contains(parent, path.join(directory, "outside.txt"))));
});

test("an explicit linked-worktree root stays isolated from its enclosing checkout", async (context) => {
	const directory = await mkdtemp(path.join(tmpdir(), "consensus-worktree-"));
	context.after(() => rm(directory, { recursive: true, force: true }));
	const workspace = path.join(directory, ".ai-work", "worktrees", "application");
	const frontendRoot = path.join(workspace, "front-end");
	await mkdir(frontendRoot, { recursive: true });
	execFileSync("git", ["init", "--quiet", directory]);
	await writeFile(path.join(workspace, ".git"), `gitdir: ${path.join(directory, ".git", "worktrees", "application")}\n`);
	await writeFile(path.join(workspace, "package.json"), JSON.stringify({
		private: true,
		workspaces: ["front-end", "back-end"]
	}));
	assert.equal(await workspaceFor(frontendRoot, workspace), workspace);
	const allow = await allowFor(frontendRoot, workspace);
	assert.ok(allow.some(parent => contains(parent, path.join(workspace, "back-end", "shared.ts"))));
	assert.ok(allow.every(parent => !contains(parent, path.join(directory, "outside.txt"))));
});

test("the site's resolved Vite boundary rejects external paths and retains intentional project file links", async (context) => {
	const { loadNuxt } = await import(pathToFileURL(frontend.resolve("@nuxt/kit")).href);
	const { createServer } = await import(pathToFileURL(frontend.resolve("vite")).href);
	const nuxt = await loadNuxt({
		cwd: path.join(root, "front-end"),
		dev: true,
		ready: false
	});
	context.after(() => nuxt.close());
	const workspace = path.resolve(root);
	assert.equal(nuxt.options.workspaceDir, workspace);
	const fs = nuxt.options.vite.server.fs;
	assert.ok(fs.allow.length > 0);
	assert.ok(fs.allow.every(parent => contains(workspace, path.resolve(parent))));
	const external = await mkdtemp(path.join(tmpdir(), "consensus-external-"));
	context.after(() => rm(external, { recursive: true, force: true }));
	await mkdir(nuxt.options.buildDir, { recursive: true });
	const internal = await mkdtemp(path.join(nuxt.options.buildDir, "fs-boundary-"));
	context.after(() => rm(internal, { recursive: true, force: true }));
	const marker = "owned nonsecret filesystem fixture";
	const outside = path.join(external, "outside.txt");
	const inside = path.join(internal, "inside.txt");
	const linked = path.join(internal, "linked.txt");
	await writeFile(outside, marker);
	await writeFile(inside, marker);
	await symlink(outside, linked);
	const server = await createServer({
		configFile: false,
		root: nuxt.options.rootDir,
		base: "/_nuxt/",
		appType: "custom",
		logLevel: "silent",
		optimizeDeps: { noDiscovery: true },
		server: {
			host: "127.0.0.1",
			port: 0,
			strictPort: true,
			fs
		}
	});
	context.after(() => server.close());
	await server.listen();
	const address = server.httpServer.address();
	assert.ok(address && typeof address === "object");
	const origin = `http://127.0.0.1:${address.port}`;
	const allowed = await fetch(`${origin}/_nuxt/@fs/${encodeURI(inside)}`);
	assert.equal(allowed.status, 200);
	assert.equal(await allowed.text(), marker);
	const linkedResponse = await fetch(`${origin}/_nuxt/@fs/${encodeURI(linked)}`);
	assert.equal(linkedResponse.status, 200);
	assert.equal(await linkedResponse.text(), marker);
	for (const filename of [outside]) {
		const alternate = encodeURI(filename).replace(/[a-z]/iu, character => `%${character.charCodeAt(0).toString(16)}`);
		for (const encoded of [
			encodeURI(filename),
			alternate
		]) {
			const denied = await fetch(`${origin}/_nuxt/@fs/${encoded}`);
			assert.equal(denied.status, 403, `Unexpected access to ${filename} via ${encoded}`);
			assert.ok(!(await denied.text()).includes(marker));
		}
	}
});
