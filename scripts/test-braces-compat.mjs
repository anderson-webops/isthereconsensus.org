import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import braces from "../vendor/braces/index.js";

const lock = JSON.parse(await readFile(new URL("../package-lock.json", import.meta.url), "utf8"));

test("every locked braces dependency resolves to the guarded fork", () => {
	const entries = Object.entries(lock.packages)
		.filter(([name]) => name.endsWith("node_modules/braces"));

	assert.ok(entries.length > 0);
	for (const [, entry] of entries) {
		assert.equal(entry.resolved, "vendor/braces");
	}
	assert.equal(lock.packages["vendor/braces"].version, "3.0.4-webops.3");
});

test("shallow alternatives and ranges share a cumulative expansion budget", () => {
	assert.equal(braces.expand("{a,b}".repeat(12)).length, 4096);
	assert.throws(() => braces.expand("{a,b}".repeat(14)), /cumulative output budget/u);
	assert.throws(() => braces.expand(`${"{a,b}".repeat(9)}${"x".repeat(2100)}`), /cumulative output budget/u);
	assert.throws(() => braces.expand("{1..50000}", { rangeLimit: false }), /range limit/u);
});

test("ordinary brace patterns keep their compile, expand, and stringify behavior", () => {
	assert.deepEqual(braces.expand("item-{3..1}"), ["item-3", "item-2", "item-1"]);
	assert.deepEqual(braces.expand("{1..5..-2}"), ["1", "3", "5"]);
	assert.deepEqual(braces.expand("{5..1}", { step: -2 }), ["5", "3", "1"]);
	assert.deepEqual(braces("a/{b,c}/d"), ["a/(b|c)/d"]);
	assert.deepEqual(braces.expand("a/{b,c}/d"), ["a/b/d", "a/c/d"]);
	assert.deepEqual(braces.expand("item-{1..3}"), ["item-1", "item-2", "item-3"]);
	assert.equal(braces.stringify("a/{b,c}/d"), "a/{b,c}/d");
	assert.equal(braces.stringify(String.raw`a/\{b,c\}/d`), "a/{b,c}/d");
	assert.ok(braces.parse(`${"{".repeat(256)}x${"}".repeat(256)}`));
	assert.ok(braces.parse(`${"(".repeat(101)}x${")".repeat(101)}`));
});

test("descending and signed-step ranges are rejected before generation", () => {
	for (const [pattern, options] of [
		["{12000..1}", {}],
		["{1..12000..-1}", {}],
		[
			"{1..12000}",
			{ step: -1 }
		],
		[`{${"0".repeat(2100)}1..1000}`, {}],
		["{A..\uFFFF}", {}],
		["{9007199254740992..9007199254740992}", {}],
	]) {
		let generatedItems = 0;
		assert.throws(() => braces.expand(pattern, {
			...options,
			rangeLimit: false,
			transform(value) {
				generatedItems++;
				return String(value);
			},
		}), /range limit/u);
		assert.equal(generatedItems, 0);
	}
});

test("compiled stepped ranges share bounds without enumerating compact ranges", () => {
	assert.equal(braces.compile("{1..5..2}"), "(1|3|5)");
	assert.ok(braces.compile("{1..1000000000}").length < 1000);
	for (const pattern of [
		"{1..24000..2}",
		"{24000..1..-2}",
		"{1..4000..2}".repeat(6),
		"{9007199254740992..9007199254740992}",
		`{1..3000..${"0".repeat(700)}2}`,
		`{${"0".repeat(3000)}1..${"0".repeat(3000)}1000..2}`
	]) {
		for (const operation of [braces.compile, braces.create, braces]) {
			assert.throws(() => operation(pattern), /cumulative output budget/u);
		}
		assert.throws(() => braces.compile(braces.parse(pattern)), /cumulative output budget/u);
	}
	assert.throws(() => braces.compile("{1..24000}", { step: -2 }), /cumulative output budget/u);
});

test("deep strings are rejected before recursive walkers exhaust the stack", () => {
	const nestedBraces = `${"{".repeat(4000)}x${"}".repeat(4000)}`;
	const nestedParentheses = `${"(".repeat(4000)}x${")".repeat(4000)}`;

	for (const input of [nestedBraces, nestedParentheses]) {
		for (const operation of [
			braces.parse,
			braces.compile,
			braces.expand,
			braces.stringify,
			braces
		]) {
			assert.throws(() => operation(input), {
				name: "SyntaxError",
				message: "Brace pattern exceeds maximum nesting depth (256)",
			});
		}
	}
});

test("directly supplied ASTs cannot bypass the depth limit", () => {
	for (const operation of [braces.compile, braces.expand, braces.stringify]) {
		const ast = { type: "root", nodes: [] };
		let current = ast;

		for (let depth = 0; depth < 257; depth++) {
			const child = { type: "brace", nodes: [], parent: current };
			current.nodes.push(child);
			current = child;
		}
		current.nodes.push({ type: "text", value: "x", parent: current });

		assert.throws(() => operation(ast), {
			name: "SyntaxError",
			message: "Brace pattern exceeds maximum nesting depth (256)",
		});
	}
});

test("iterable AST nodes cannot bypass recursive walker guards", () => {
	const ast = {
		type: "root",
		nodes: new Set()
	};
	let current = ast;

	for (let depth = 0; depth < 257; depth++) {
		const child = {
			type: "brace",
			nodes: new Set(),
			parent: current
		};
		current.nodes.add(child);
		current = child;
	}
	current.nodes.add({ type: "text", value: "x", parent: current });

	for (const operation of [braces.compile, braces.stringify]) {
		assert.throws(() => operation(ast), {
			name: "SyntaxError",
			message: "Brace pattern exceeds maximum nesting depth (256)",
		});
	}
});
