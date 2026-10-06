import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readerExpansionClaims } from "../src/data/claim-expansion-reader.js";
import {
	CLAIM_NARRATIVE_FIELDS,
	CLAIM_NARRATIVE_MAX_ITEMS,
	CLAIM_NARRATIVE_MAX_LENGTH,
	ClaimNarrativeValidationError,
	normalizeClaimNarratives
} from "../src/utils/claimNarratives.js";

describe("bounded claim narratives", () => {
	it("preserves all four narrative fields in every authored expansion review", () => {
		assert.equal(readerExpansionClaims.length, 201);
		let formerlyTruncated = 0;
		for (const claim of readerExpansionClaims) {
			const result = normalizeClaimNarratives(claim);
			for (const field of CLAIM_NARRATIVE_FIELDS) {
				assert.deepEqual(result[field], claim[field], `${claim.slug}: ${field}`);
				formerlyTruncated += claim[field].filter(item => item.length > 280).length;
			}
		}
		assert.equal(formerlyTruncated, 277);
	});

	it("trims newly supplied items and removes blank entries without shortening text", () => {
		const paragraph = "Detailed explanation. ".repeat(30).trim();
		const result = normalizeClaimNarratives({ stableCore: ["", "  ", `  ${paragraph}  `] });
		assert.deepEqual(result.stableCore, [paragraph]);
		assert.deepEqual(result.openQuestions, []);
	});

	it("accepts the exact item and character bounds", () => {
		const values = Array.from({ length: CLAIM_NARRATIVE_MAX_ITEMS }, () => "x".repeat(CLAIM_NARRATIVE_MAX_LENGTH));
		assert.deepEqual(normalizeClaimNarratives({ stableCore: values }).stableCore, values);
	});

	it("rejects rather than truncating an oversized new item in any narrative field", () => {
		for (const field of CLAIM_NARRATIVE_FIELDS) {
			assert.throws(
				() => normalizeClaimNarratives({ [field]: ["x".repeat(CLAIM_NARRATIVE_MAX_LENGTH + 1)] }),
				ClaimNarrativeValidationError
			);
		}
	});

	it("rejects excess items instead of silently dropping the final item", () => {
		for (const field of CLAIM_NARRATIVE_FIELDS) {
			assert.throws(
				() => normalizeClaimNarratives({ [field]: Array.from({ length: CLAIM_NARRATIVE_MAX_ITEMS + 1 }, (_entry, index) => `A bounded item ${index}.`) }),
				ClaimNarrativeValidationError
			);
		}
	});

	it("rejects malformed lists and does not put submitted content into errors", () => {
		for (const value of [null, "Private submitted content", {}, [7], [null], ["A point", {}]]) {
			assert.throws(() => normalizeClaimNarratives({ stableCore: value }), (error: unknown) => {
				assert.ok(error instanceof ClaimNarrativeValidationError);
				assert.equal(error.message, "stableCore must be a list of text items; nothing was saved.");
				return true;
			});
		}
	});

	it("leaves omitted legacy fields and exact oversized round trips intact", () => {
		const previous = {
			stableCore: [`  ${"x".repeat(CLAIM_NARRATIVE_MAX_LENGTH + 1)}  `],
			openQuestions: Array.from({ length: CLAIM_NARRATIVE_MAX_ITEMS + 1 }, (_entry, index) => `Retained legacy question ${index}.`)
		};
		assert.deepEqual(normalizeClaimNarratives({}, previous).stableCore, previous.stableCore);
		assert.deepEqual(normalizeClaimNarratives(previous, previous).openQuestions, previous.openQuestions);
		assert.deepEqual(normalizeClaimNarratives(previous, previous).stableCore, previous.stableCore);
	});

	it("allows a retained oversized item beside a changed bounded item but rejects new oversized text", () => {
		const retained = "x".repeat(CLAIM_NARRATIVE_MAX_LENGTH + 1);
		const previous = { stableCore: [retained, "Original bounded point."] };
		assert.deepEqual(
			normalizeClaimNarratives({ stableCore: [retained, "Changed bounded point."] }, previous).stableCore,
			[retained, "Changed bounded point."]
		);
		assert.throws(() => normalizeClaimNarratives({ stableCore: [`${retained}Changed`] }, previous), ClaimNarrativeValidationError);
	});

	it("allows clearing a field without changing another legacy field", () => {
		const previous = { stableCore: ["Retained explanation."], misconceptions: ["Old misconception."] };
		const result = normalizeClaimNarratives({ misconceptions: [] }, previous);
		assert.deepEqual(result.stableCore, previous.stableCore);
		assert.deepEqual(result.misconceptions, []);
	});

	it("does not mutate input or legacy arrays, including when another field fails", () => {
		const values = Object.freeze(["Original explanation."]);
		const previous = Object.freeze({ stableCore: values });
		const input = Object.freeze({ stableCore: values, openQuestions: Object.freeze(["x".repeat(CLAIM_NARRATIVE_MAX_LENGTH + 1)]) });
		assert.throws(() => normalizeClaimNarratives(input, previous), ClaimNarrativeValidationError);
		assert.deepEqual(values, ["Original explanation."]);
		assert.notEqual(normalizeClaimNarratives({}, previous).stableCore, values);
	});
});
