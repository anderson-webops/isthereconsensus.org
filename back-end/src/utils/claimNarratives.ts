export const CLAIM_NARRATIVE_MAX_ITEMS = 12;
export const CLAIM_NARRATIVE_MAX_LENGTH = 1000;
export const CLAIM_NARRATIVE_FIELDS = ["stableCore", "openQuestions", "whatWouldChangeMinds", "misconceptions"] as const;

type ClaimNarrativeField = (typeof CLAIM_NARRATIVE_FIELDS)[number];
type ClaimNarratives = Record<ClaimNarrativeField, readonly string[]>;

export class ClaimNarrativeValidationError extends Error {}

export function normalizeClaimNarratives(
	input: Partial<Record<ClaimNarrativeField, unknown>>,
	existing?: Partial<ClaimNarratives>
): Record<ClaimNarrativeField, string[]> {
	const result = {} as Record<ClaimNarrativeField, string[]>;
	for (const field of CLAIM_NARRATIVE_FIELDS) {
		const value = input[field];
		const previous = existing?.[field] ?? [];
		if (value === undefined) {
			result[field] = [...previous];
			continue;
		}
		if (!Array.isArray(value) || value.some(item => typeof item !== "string")) {
			throw new ClaimNarrativeValidationError(`${field} must be a list of text items; nothing was saved.`);
		}
		if (value.length === previous.length && value.every((item, index) => item === previous[index])) {
			result[field] = [...previous];
			continue;
		}
		const known = new Set(previous);
		const normalized = value.map(item => known.has(item) ? item : item.trim()).filter(Boolean);
		if (normalized.length > CLAIM_NARRATIVE_MAX_ITEMS) {
			throw new ClaimNarrativeValidationError(`${field} must contain at most ${CLAIM_NARRATIVE_MAX_ITEMS} items; nothing was saved.`);
		}
		if (normalized.some(item => item.length > CLAIM_NARRATIVE_MAX_LENGTH && !known.has(item))) {
			throw new ClaimNarrativeValidationError(`${field} items must contain at most ${CLAIM_NARRATIVE_MAX_LENGTH} characters; nothing was saved.`);
		}
		result[field] = normalized;
	}
	return result;
}
