import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import process from "node:process";
import test from "node:test";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const frontend = createRequire(path.join(root, "front-end/package.json"));
const nuxt = createRequire(frontend.resolve("nuxt/package.json"));
const packagePath = process.env.UNIMPORT_ENTRY || nuxt.resolve("unimport");
const { createUnimport, dedupeDtsExports, scanDirExports, version } = await import(pathToFileURL(path.resolve(packagePath)).href);

test("Nuxt uses the exact maintained payload bound to the workspace lock", async () => {
	const installed = path.resolve(path.dirname(packagePath), "..");
	const maintained = path.join(root, "vendor/unimport");
	async function files(directory) {
		const result = [];
		for (const entry of await readdir(directory, { withFileTypes: true })) {
			if (entry.name === "node_modules")
				continue;
			assert.equal(entry.isSymbolicLink(), false);
			if (entry.isDirectory()) {
				for (const child of await files(path.join(directory, entry.name)))
					result.push(path.join(entry.name, child));
			}
			else {
				assert.equal(entry.isFile(), true);
				result.push(entry.name);
			}
		}
		return result.sort();
	}
	assert.deepEqual(await files(installed), await files(maintained));
	for (const name of await files(maintained))
		assert.ok((await readFile(path.join(installed, name))).equals(await readFile(path.join(maintained, name))), `Installed Unimport differs: ${name}`);
	const lock = JSON.parse(await readFile(path.join(root, "package-lock.json"), "utf8"));
	const location = path.relative(root, installed).split(path.sep).join("/");
	assert.equal(lock.packages[location].version, "7.0.2+webops.1");
	assert.equal(lock.packages[location].resolved, "file:vendor/unimport-7.0.2+webops.1.tgz");
	const archive = await readFile(path.join(root, "vendor/unimport-7.0.2+webops.1.tgz"));
	assert.equal(lock.packages[location].integrity, `sha512-${createHash("sha512").update(archive).digest("base64")}`);
});

for (const declarationType of ["class", "enum", "const enum"]) {
	test(`deduplicates ${declarationType} restated by a declaration file`, () => {
		const implementation = { name: "Widget", as: "Widget", from: "/app/widget.mjs" };
		const implementationType = { ...implementation, type: true, declarationType };
		const declaration = { ...implementation, from: "/app/widget.d.ts", type: true };
		const declarationTypeOnly = { ...declaration, declarationType };
		assert.deepEqual(dedupeDtsExports([
			implementation,
			implementationType,
			declaration,
			declarationTypeOnly,
		]), [implementation, implementationType]);
	});

	test(`preserves ${declarationType} declared only by a declaration file`, () => {
		const implementation = { name: "Legacy", as: "Legacy", from: "/app/legacy.mjs" };
		const declaration = { ...implementation, from: "/app/legacy.d.ts", type: true };
		const declarationTypeOnly = { ...declaration, declarationType };
		assert.deepEqual(dedupeDtsExports([implementation, declaration, declarationTypeOnly]), [implementation, declarationTypeOnly]);
	});

	test(`preserves independently named ${declarationType} declarations and aliases`, () => {
		const implementationType = {
			name: "One",
			as: "First",
			from: "/app/one.mjs",
			type: true,
			declarationType,
		};
		const differentName = {
			name: "Two",
			as: "First",
			from: "/app/two.d.ts",
			type: true,
			declarationType,
		};
		const differentAlias = { ...implementationType, as: "Second", from: "/app/one.d.ts" };
		assert.deepEqual(dedupeDtsExports([implementationType, differentName, differentAlias]), [implementationType, differentName, differentAlias]);
	});
}

test("ordinary values and independent type-only declarations remain available", () => {
	const value = { name: "value", as: "value", from: "/app/value.mjs" };
	const repeatedType = { ...value, from: "/app/value.d.ts", type: true };
	const independentType = {
		name: "Config",
		as: "Config",
		from: "/app/config.d.ts",
		type: true,
	};
	assert.deepEqual(dedupeDtsExports([value, repeatedType, independentType]), [value, independentType]);
});

test("actual directory scanning preserves the runtime class and removes its repeated declaration", async () => {
	const parent = process.env.UNIMPORT_SCRATCH || path.join(root, ".ai-work/runs/unimport-tests");
	await mkdir(parent, { recursive: true });
	const directory = await mkdtemp(path.join(parent, "scan-"));
	try {
		await writeFile(path.join(directory, "widget.mjs"), "export class Widget {}\n");
		await writeFile(path.join(directory, "widget.d.ts"), "export declare class Widget {}\n");
		const imports = await scanDirExports([directory], { types: true });
		assert.equal(imports.filter(item => item.name === "Widget" && item.from.endsWith(".d.ts")).length, 0);
		assert.equal(imports.filter(item => item.name === "Widget" && !item.type).length, 1);
		assert.equal(imports.filter(item => item.name === "Widget" && item.type && item.declarationType === "class").length, 1);
	}
	finally {
		await rm(directory, { recursive: true, force: true });
	}
});

test("actual auto-import injection and generated declarations preserve the public API", async () => {
	const unimport = createUnimport({
		imports: [
			{ name: "ref", from: "vue" },
		],
	});
	const result = await unimport.injectImports("const count = ref(1)", "/synthetic/counter.ts");
	assert.match(result.code, /import\s*\{\s*ref\s*\}\s*from\s*["']vue["']/u);
	assert.equal(result.imports.length, 1);
	assert.match(await unimport.generateTypeDeclarations(), /ref:\s*typeof import\('vue'\)\.ref/u);
});

test("package exports identify the maintained distribution", () => {
	if (process.env.UNIMPORT_EXPECT_BASE === "1")
		assert.equal(version, "7.0.1");
	else
		assert.equal(version, "7.0.2+webops.1");
});
