import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import antfu from "@antfu/eslint-config";
import { ESLint } from "eslint";
import configuredRules from "../eslint.config.js";
import { approvedScientificDataSha256, preserveApprovedScientificProse } from "./lib/approved-data-prose.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const originalConfigs = await antfu({ antislop: true });
const typescriptParser = originalConfigs.find(config => config.name === "antfu/typescript/parser").languageOptions.parser;
const originalSlop = originalConfigs.find(config => config.plugins?.slop).plugins.slop;
const wrappedConfigs = await configuredRules;
const wrappedSlop = wrappedConfigs.find(config => config.plugins?.slop).plugins.slop;
const approvedSources = await Promise.all(Object.entries(approvedScientificDataSha256).map(async ([filename, digest]) => ({
	filename,
	digest,
	text: await readFile(path.join(repositoryRoot, filename), "utf8")
})));

function proseLinter(plugin) {
	return new ESLint({
		cwd: repositoryRoot,
		overrideConfigFile: true,
		overrideConfig: [
			{
				files: ["**/*.ts"],
				languageOptions: { parser: typescriptParser },
				plugins: { slop: plugin },
				rules: { "slop/no-em-dash": "error", "no-debugger": "error" }
			}
		]
	});
}

test("the exception binds all 28 preserved scientific data files to exact bytes", () => {
	assert.equal(approvedSources.length, 28);
	for (const source of approvedSources) {
		assert.equal(createHash("sha256").update(source.text).digest("hex"), source.digest, source.filename);
	}
});

test("only the 78 existing immutable-data prose reports are exempted", async () => {
	const original = proseLinter(originalSlop);
	const preserved = proseLinter(wrappedSlop);
	let originalReports = 0;
	for (const source of approvedSources) {
		const [before] = await original.lintText(source.text, { filePath: source.filename });
		const [after] = await preserved.lintText(source.text, { filePath: source.filename });
		assert.equal(before.fatalErrorCount, 0);
		assert.equal(after.fatalErrorCount, 0);
		originalReports += before.messages.filter(message => message.ruleId === "slop/no-em-dash").length;
		assert.deepEqual(after.messages, [], source.filename);
	}
	assert.equal(originalReports, 78);
});

test("editing existing prose re-enables the original rule even with the same filename", async () => {
	const source = approvedSources[0];
	const [result] = await proseLinter(wrappedSlop).lintText(source.text.replace("\u2014", "-"), { filePath: source.filename });
	assert.equal(result.fatalErrorCount, 0);
	assert.ok(result.messages.some(message => message.ruleId === "slop/no-em-dash"));
});

test("new prose in a pinned file remains strict and other checks still execute", async () => {
	const source = approvedSources[0];
	const appended = `${source.text}\nexport const editorialDraft = "New draft \u2014 new wording";\ndebugger;\n`;
	const [result] = await proseLinter(wrappedSlop).lintText(appended, { filePath: source.filename });
	assert.equal(result.fatalErrorCount, 0);
	assert.ok(result.messages.some(message => message.ruleId === "slop/no-em-dash" && message.line > source.text.split("\n").length));
	assert.ok(result.messages.some(message => message.ruleId === "no-debugger"));
});

test("unpinned data, application code and editable frontend prose retain the rule", async () => {
	const linter = proseLinter(wrappedSlop);
	for (const filename of ["back-end/src/data/editorial-draft.ts", "back-end/src/server.ts", "front-end/src/editorial-copy.ts"]) {
		const [result] = await linter.lintText("export const wording = \"Editable wording \\u2014 remains strict\";".replace("\\u2014", "\u2014"), { filePath: filename });
		assert.equal(result.fatalErrorCount, 0);
		assert.ok(result.messages.some(message => message.ruleId === "slop/no-em-dash"), filename);
	}
});

test("the rule does not trust matching data outside this checkout or stale stdin", () => {
	const source = approvedSources[0];
	const delegated = {};
	const rule = preserveApprovedScientificProse({
		create: () => delegated
	});
	assert.notEqual(rule.create({
		filename: path.join(repositoryRoot, source.filename),
		sourceCode: { text: source.text }
	}), delegated);
	assert.equal(rule.create({
		filename: path.resolve(repositoryRoot, "../another-checkout", source.filename),
		sourceCode: { text: source.text }
	}), delegated);
	assert.equal(rule.create({
		filename: path.join(repositoryRoot, source.filename),
		sourceCode: { text: `${source.text}\n` }
	}), delegated);
});

test("all other plugin rules, metadata and configured rule severities are preserved", () => {
	assert.deepEqual(Object.keys(wrappedSlop.rules), Object.keys(originalSlop.rules));
	assert.equal(wrappedSlop.rules["no-em-dash"].meta, originalSlop.rules["no-em-dash"].meta);
	for (const [name, rule] of Object.entries(originalSlop.rules)) {
		if (name !== "no-em-dash") assert.equal(wrappedSlop.rules[name], rule, name);
	}
	for (const original of originalConfigs.filter(config => config.name?.startsWith("antfu/antislop/rules/"))) {
		assert.deepEqual(wrappedConfigs.find(config => config.name === original.name).rules, original.rules);
	}
});
