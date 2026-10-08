import assert from "node:assert/strict";
import { chmod, lstat, mkdir, mkdtemp, readFile, rm, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import test from "node:test";
import { prepareSearchGateOutput, validateCompletedTitleRows, writeSearchGateOwnership } from "./lib/search-gate-evidence.mjs";

async function fixture(context) {
	const workingArea = path.join(process.cwd(), ".ai-work/runs");
	await mkdir(workingArea, { recursive: true, mode: 0o700 });
	const root = await mkdtemp(path.join(workingArea, "evidence-unit-"));
	context.after(() => rm(root, { recursive: true, force: true }));
	return { root, output: path.join(root, ".ai-work/runs/result") };
}

test("evidence output is private and has an exclusive owner", async (context) => {
	const { root, output } = await fixture(context);
	await prepareSearchGateOutput(root, output);
	assert.equal((await lstat(output)).mode & 0o077, 0);
	assert.equal(JSON.parse(await readFile(path.join(output, "run-owner.json"))).pid, process.pid);
	await assert.rejects(prepareSearchGateOutput(root, output), { code: "EEXIST" });
});

test("evidence rejects traversal and unrelated output directories", async (context) => {
	const { root, output } = await fixture(context);
	await assert.rejects(prepareSearchGateOutput(root, `${output}/../other`));
	await assert.rejects(prepareSearchGateOutput(root, path.join(root, "unrelated")));
});

test("evidence never reuses an existing private directory or clobbers its files", async (context) => {
	const { output } = await fixture(context);
	await mkdir(output, { recursive: true, mode: 0o700 });
	const evidence = path.join(output, "retained-evidence.json");
	await writeFile(evidence, "unique prior result", { mode: 0o600 });
	await assert.rejects(prepareSearchGateOutput(path.resolve(output, "../../.."), output), { code: "EEXIST" });
	assert.equal(await readFile(evidence, "utf8"), "unique prior result");
	await assert.rejects(lstat(path.join(output, "run-owner.json")), { code: "ENOENT" });
});

test("evidence rejects symlink parents without touching their destination", async (context) => {
	const { root, output } = await fixture(context);
	const destination = path.join(root, "outside");
	await mkdir(destination);
	await symlink(destination, path.join(root, ".ai-work"));
	await assert.rejects(prepareSearchGateOutput(root, output));
	await assert.rejects(lstat(path.join(destination, "runs")), { code: "ENOENT" });
});

test("evidence does not change an existing nonprivate directory", async (context) => {
	const { root, output } = await fixture(context);
	await mkdir(output, { recursive: true });
	await chmod(output, 0o755);
	await assert.rejects(prepareSearchGateOutput(root, output));
	assert.equal((await lstat(output)).mode & 0o777, 0o755);
});

test("ownership records only typed process identities", async (context) => {
	const { root, output } = await fixture(context);
	await prepareSearchGateOutput(root, output);
	const state = { parentPid: process.pid, phase: "setup", scratch: path.join(root, ".ai-work/runs/sg-test"), children: [{ pid: process.pid, role: "model" }] };
	writeSearchGateOwnership(output, state);
	const recorded = JSON.parse(await readFile(path.join(output, "ownership.json")));
	assert.equal(recorded.parentPid, process.pid);
	assert.deepEqual(recorded.children, state.children);
	assert.throws(() => writeSearchGateOwnership(output, { ...state, authorization: "not-saved" }));
	assert.throws(() => writeSearchGateOwnership(output, { ...state, children: [{ pid: process.pid, role: "model", cookie: "not-saved" }] }));
	assert.equal(await readFile(path.join(output, "ownership.json"), "utf8"), `${JSON.stringify(recorded, null, 2)}\n`);
});

test("ownership rejects invalid process identifiers and unknown roles", async (context) => {
	const { root, output } = await fixture(context);
	await prepareSearchGateOutput(root, output);
	const state = { parentPid: process.pid, phase: "setup", scratch: path.join(root, ".ai-work/runs/sg-test"), children: [] };
	for (const invalid of [{ ...state, parentPid: 0 }, { ...state, phase: "unknown/path" }, { ...state, children: [{ pid: 0, role: "model" }] }, { ...state, children: [{ pid: process.pid, role: "unknown" }] }]) assert.throws(() => writeSearchGateOwnership(output, invalid));
});

test("retained titles require every original slug first on both actual routes", () => {
	const claims = [{ slug: "first" }, { slug: "second" }];
	const rows = claims.flatMap(claim => ["claims", "search/suggestions"].map(route => ({ kind: "title", route, slug: claim.slug, passed: true, predicted: [claim.slug] })));
	assert.equal(validateCompletedTitleRows(rows, claims), 4);
	assert.throws(() => validateCompletedTitleRows(rows.slice(0, 3), claims));
	assert.throws(() => validateCompletedTitleRows(rows.toReversed(), claims));
	assert.throws(() => validateCompletedTitleRows(rows.map((row, index) => index === 0 ? { ...row, predicted: ["unrelated", row.slug] } : row), claims));
	assert.throws(() => validateCompletedTitleRows(rows.map((row, index) => index === 0 ? { ...row, passed: false } : row), claims));
	assert.throws(() => validateCompletedTitleRows(rows.map((row, index) => index === 0 ? { ...row, token: "not-accepted" } : row), claims));
});
