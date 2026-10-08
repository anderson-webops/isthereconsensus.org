import assert from "node:assert/strict";
import { renameSync, writeFileSync } from "node:fs";
import { lstat, mkdir, realpath, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

export async function prepareSearchGateOutput(root, output) {
	assert.ok(path.isAbsolute(root) && await realpath(root) === root, "Use the real repository root.");
	assert.ok(path.isAbsolute(output) && path.normalize(output) === output, "Normalize the absolute evidence directory.");
	assert.ok(output.startsWith(`${path.join(root, ".ai-work/runs")}${path.sep}`), "Evidence must stay in the owning repository's run area.");
	let directory = root;
	for (const segment of path.relative(root, output).split(path.sep)) {
		directory = path.join(directory, segment);
		try {
			await mkdir(directory, { mode: 0o700 });
		}
		catch (error) {
			if (directory === output || error.code !== "EEXIST") throw error;
		}
		const stat = await lstat(directory);
		assert.ok(stat.isDirectory() && !stat.isSymbolicLink() && (stat.mode & 0o002) === 0, "Evidence parents must be protected real directories.");
	}
	assert.equal((await lstat(output)).mode & 0o077, 0, "The evidence directory must be private.");
	await writeFile(path.join(output, "run-owner.json"), `${JSON.stringify({ pid: process.pid, startedAt: new Date().toISOString() })}\n`, { mode: 0o600, flag: "wx" });
}

export function writeSearchGateOwnership(output, state) {
	assert.deepEqual(Object.keys(state).sort(), ["children", "parentPid", "phase", "scratch"]);
	assert.ok(Number.isInteger(state.parentPid) && state.parentPid > 0);
	assert.match(state.phase, /^[a-z-]{1,80}$/u);
	assert.ok(path.isAbsolute(state.scratch) && path.normalize(state.scratch) === state.scratch);
	assert.ok(Array.isArray(state.children));
	for (const child of state.children) {
		assert.deepEqual(Object.keys(child).sort(), ["pid", "role"]);
		assert.ok(Number.isInteger(child.pid) && child.pid > 0);
		assert.ok(["backend", "frontend", "database", "model", "browser"].includes(child.role));
	}
	const temporary = path.join(output, `.ownership-${process.pid}`);
	writeFileSync(temporary, `${JSON.stringify({ observedAt: new Date().toISOString(), ...state }, null, 2)}\n`, { mode: 0o600, flag: "wx" });
	renameSync(temporary, path.join(output, "ownership.json"));
}

export function validateCompletedTitleRows(rows, claims) {
	const titles = rows.filter(row => row.kind === "title");
	assert.equal(titles.length, claims.length * 2, "Retained title evidence must cover the complete original corpus on both APIs.");
	for (const [index, claim] of claims.entries()) {
		for (const [offset, route] of ["claims", "search/suggestions"].entries()) {
			const row = titles[index * 2 + offset];
			assert.deepEqual(Object.keys(row).sort(), ["kind", "passed", "predicted", "route", "slug"]);
			assert.equal(row.route, route);
			assert.equal(row.slug, claim.slug);
			assert.equal(row.passed, true);
			assert.equal(row.predicted[0], claim.slug);
		}
	}
	return titles.length;
}
