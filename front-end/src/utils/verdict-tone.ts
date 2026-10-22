import type { EvidenceLandscapeSupportLabel } from "~/constants/evidenceLandscape";
import type { ClaimConsensusBand, ClaimEvidenceCertainty } from "~/types/board";

export type VerdictTone = "strong" | "broad" | "debate" | "unclear" | "against";

interface VerdictSource {
	consensusBand?: ClaimConsensusBand;
	evidenceLandscape?: { supportLabel?: EvidenceLandscapeSupportLabel };
}

const supportLabelTones: Record<EvidenceLandscapeSupportLabel, VerdictTone> = {
	strong_consensus: "strong",
	broad_agreement_with_caveats: "broad",
	active_expert_debate: "debate",
	thin_evidence: "unclear",
	unsupported_fringe: "against",
	unresolved: "unclear"
};

const bandTones: Record<ClaimConsensusBand, VerdictTone> = {
	strong: "strong",
	broad: "broad",
	mixed: "debate",
	unclear: "unclear"
};

// One colour family per verdict so readers can scan agreement before reading labels.
export function verdictTone(claim: VerdictSource | null | undefined): VerdictTone {
	const supportLabel = claim?.evidenceLandscape?.supportLabel;
	if (supportLabel && supportLabel in supportLabelTones) return supportLabelTones[supportLabel];
	if (claim?.consensusBand && claim.consensusBand in bandTones) return bandTones[claim.consensusBand];
	return "unclear";
}

const certaintySteps: Record<ClaimEvidenceCertainty, number> = {
	very_low: 1,
	low: 2,
	moderate: 3,
	high: 4
};

export const CERTAINTY_STEP_COUNT = 4;

export function certaintyStep(certainty: ClaimEvidenceCertainty | null | undefined) {
	return certainty && certainty in certaintySteps ? certaintySteps[certainty] : 0;
}

export const VERDICT_TONE_ORDER: readonly VerdictTone[] = ["strong", "broad", "debate", "unclear", "against"];

export const VERDICT_TONE_LABELS: Record<VerdictTone, string> = {
	strong: "Strong consensus",
	broad: "Broad agreement",
	debate: "Active debate",
	unclear: "Thin or unclear evidence",
	against: "Unsupported or fringe"
};

export function verdictMix(claims: readonly VerdictSource[]) {
	const counts = new Map<VerdictTone, number>();
	for (const claim of claims) {
		const tone = verdictTone(claim);
		counts.set(tone, (counts.get(tone) ?? 0) + 1);
	}
	return VERDICT_TONE_ORDER.filter((tone) => counts.has(tone)).map((tone) => ({
		tone,
		count: counts.get(tone) ?? 0,
		label: VERDICT_TONE_LABELS[tone]
	}));
}
