import type { ComparisonFinding, EvidenceComparison } from "./types.js";
import { hearingPracticalClaims, hearingSources } from "../claim-expansion-practical-hearing.js";

function finding(headline: string, summary: string, evidence: string, scope: string, limitation: string, sourceIds: string[]): ComparisonFinding {
	return { headline, summary, evidence, scope, limitation, sourceIds };
}
export const hearingComparison: EvidenceComparison = {
	slug: "hearing-protection",
	title: "Compare hearing-protection approaches",
	description: "Foam and reusable earplugs, earmuffs, double protection and ordinary ANC headphones: compare fit, evidence and practical limits without treating a package rating as personal protection.",
	checkedAt: "2026-09-12",
	datasetLabel: "NIOSH guidance and fit-testing policy, randomized training evidence and technical synthesis",
	measureNote: "Qualitative findings, not a league table of noise-reduction ratings. NRR is a product label, PAR is an individual fit-test estimate, and neither is a percentage of hearing loss prevented.",
	resultNote: "Match protection to measured exposure, fit and the ability to wear it consistently. Reduce noise at its source where possible; the highest label is not automatically the best practical choice.",
	protocolNote: "The approaches were not tested together in one comparative trial. Training studies involve specific earplugs and populations; their results are not estimates for earmuffs or all products. No hearing-loss risk or safe-duration calculator is supplied.",
	guidance: { text: "Use appropriate noise controls and protector selection, fit testing and instruction for the exposure. A package rating, a quieter impression or adding two ratings cannot establish personal safety. This comparison does not assess symptoms or certify a workplace's compliance.", sourceIds: ["ppe", "policy"] },
	topics: ["health-and-medicine"],
	guidePath: "/guides/hearing-protection",
	reviews: hearingPracticalClaims.map(claim => ({ path: `/consensus/${claim.topicSlug}/${claim.slug}`, label: claim.title })),
	readerUpdates: [{ id: "b1ca4b93-8513-4688-bfb3-8d8a1b4d4d4c", date: "2026-09-12T02:21:01.000Z", kind: "new_comparison", bottomLineImpact: "new", summary: "Added hearing-protection roles, fit and use limits, linked to five new reviews and a reading guide.", sourceIds: ["policy", "ppe", "cochrane"] }],
	outcomes: [
		{ id: "evidence", label: "Protection and fit", unit: "Device role and evidence", explanation: "What the approach does and what needs verification for the individual. Different devices do not receive invented common attenuation values." },
		{ id: "use", label: "Use and maintenance limits", unit: "Practical considerations", explanation: "How fitting skill, other equipment, communication and repeated use affect practical protection." }
	],
	contexts: [
		{ id: "general", label: "Understand the approaches", supportsEstimates: true, explanation: "Compare device roles and evidence boundaries, keeping individual fit and measured exposure separate from general guidance." },
		{ id: "personal", label: "My safe exposure time", supportsEstimates: false, explanation: "No personal duration can be calculated from a label or device type. Actual exposure, fit, frequency content and wearing conditions are missing." },
		{ id: "injury", label: "My hearing-loss risk", supportsEstimates: false, explanation: "Attenuation studies do not provide a personal injury probability. This comparison cannot diagnose hearing changes or predict a person's cumulative risk." }
	],
	options: [
		{
			id: "foam",
			label: "Formable foam earplugs",
			scope: "Earplugs shaped before insertion; actual fit must be established.",
			estimates: {},
			findingsByContext: { general: {
				evidence: finding("Technique changes achieved protection", "Foam earplugs can provide useful attenuation, but a high package rating does not establish the wearer's result.", "Randomized evidence supports better immediate attenuation after extensive fitting instruction than after simple instruction in specific foam-plug users.", "Earplug training and fit-test outcomes, not a head-to-head victory over all earmuffs or reusable plugs.", "An improvement in measured attenuation is not a percentage reduction in future hearing loss.", ["cochrane", "policy"]),
				use: finding("Learn, verify and reassess the fit", "Fitting skill and clean handling matter, particularly when plugs are repeatedly removed and reinserted.", "NIOSH notes that foam plugs require handling before insertion and may be inconvenient for intermittent use at dirty worksites. Later recruit evidence does not support assuming skill persists indefinitely.", "The selected plug, fitting technique and actual pattern of use.", "A successful initial test is not permanent certification; repeated testing without instruction is not a proven refresher program.", ["ppe", "retention"])
			} }
		},
		{
			id: "reusable",
			label: "Preformed or custom earplugs",
			scope: "Reusable shapes or individually made plugs; neither category guarantees fit.",
			estimates: {},
			findingsByContext: { general: {
				evidence: finding("The shape still needs verification", "A ready-made or custom shape does not remove the need to check the attenuation achieved by the person wearing it.", "NIOSH recommends individual quantitative fit testing for selected protectors. Training evidence includes preformed plugs but does not establish custom plugs as universally superior.", "A particular device and wearer, rather than every product sharing a shape or material.", "Do not transfer an effect estimate from one premoulded-plug trial to all custom products.", ["policy", "cochrane"]),
				use: finding("Convenience can support consistent use", "Reusable options can suit repeated removal and replacement, provided fitting, care and suitability are maintained.", "NIOSH identifies preformed plugs as convenient for intermittent exposures and emphasizes comfort, communication and compatibility when choosing protection.", "The actual task, device instructions and the user's ability to maintain its fit.", "A higher price or custom manufacture does not establish an individual protection value or indefinite service life.", ["ppe", "policy"])
			} }
		},
		{
			id: "muffs",
			label: "Protective earmuffs",
			scope: "Muffs designed for hearing protection, with an effective seal around the outer ear.",
			estimates: {},
			findingsByContext: { general: {
				evidence: finding("The seal is part of the protection", "Protective muffs can be easier to put on correctly, but their performance depends on the seal and compatibility with other equipment.", "NIOSH describes interactions with eyewear, helmets and other head-worn equipment; its fit-testing policy addresses individual performance.", "The fitted protector and equipment combination, not all over-ear headphones.", "The earplug-training trials do not supply an earmuff attenuation estimate.", ["ppe", "policy"]),
				use: finding("Balance access, comfort and communication", "Muffs may be convenient for intermittent tasks, while heat, weight, confined space and other equipment can affect use.", "NIOSH treats these practical factors and needed speech or warning signals as part of selection, rather than choosing by label alone.", "A compatible device that can be worn for the relevant exposures.", "Removing protection to communicate can undermine its benefit; this page cannot select the right communication system for a job.", ["ppe"])
			} }
		},
		{
			id: "dual",
			label: "Earplugs plus earmuffs",
			scope: "Combined protection for appropriate high-noise or impulse exposure, with both devices fitted.",
			estimates: {},
			findingsByContext: { general: {
				evidence: finding("Useful combination, non-additive ratings", "Dual protection can add attenuation, but the two printed ratings cannot simply be added.", "The technical synthesis explains frequency-dependent coupling and other sound pathways. NIOSH includes double protection in guidance for specified high-noise and impulse exposures.", "The fitted combination and relevant sound spectrum.", "No fixed combined value, generic added-decibel guarantee or personal safe duration follows from the two labels.", ["handbook", "ppe"]),
				use: finding("Check the combination as worn", "Compatibility, communication and continuous correct use remain important with two devices.", "NIOSH emphasizes fit and task requirements; the chapter explains why combining devices does not create unlimited attenuation.", "Appropriate protection within a wider noise-control program.", "A second protector does not justify abandoning quieter equipment or ignoring problems with either device's fit.", ["policy", "ppe", "handbook"])
			} }
		},
		{
			id: "anc",
			label: "Ordinary ANC headphones",
			scope: "Consumer noise cancellation without an established protective-device role.",
			estimates: {},
			findingsByContext: { general: {
				evidence: finding("Quieter does not establish protection", "Active noise cancellation alone is not evidence that a headphone is suitable hearing protection.", "NIOSH says noise-cancelling headphones or earbuds should not be considered hearing protection unless labeled with an NRR. Individual fit still matters for a labeled protector.", "A distinction between an electronic feature and verified protective performance.", "This does not imply all electronic protectors are ineffective; some genuine protectors include communication or sound-restoration electronics.", ["ppe", "policy"]),
				use: finding("Check the intended protective role", "Evaluate the exact product and relevant protective guidance, rather than the ANC feature name or perceived quiet.", "NIOSH distinguishes ordinary ANC from protective technologies and includes communication needs in selecting suitable equipment.", "Product-specific performance, operating conditions and fit.", "No consumer brand endorsement, playback level, impulse-noise guarantee or universal injury-risk reduction is supplied.", ["ppe"])
			} }
		}
	],
	limitations: [
		"The approaches are not ranked by a common measured outcome. Earplug-training results do not establish comparative performance for all devices.",
		"A personal attenuation rating estimates a tested fit. It is not a guarantee of continuous correct wearing or a direct measurement of hearing loss prevented.",
		"The 2025 NIOSH individual-testing policy supersedes its older derating recommendation. Technical explanations do not prescribe current regulatory compliance.",
		"Long-term evidence does not establish a universal refresher schedule. A newer observational synthesis has reporting discrepancies; its numerical estimates are withheld in the linked review.",
		"This is targeted AI-assisted source checking, not independent expert review, a product market survey or a personal clinical assessment."
	],
	sources: [
		{ id: "policy", ...pick(hearingSources.policy), locator: "January 2025 recommendation and supersession of the 1998 derating policy" },
		{ id: "ppe", ...pick(hearingSources.ppe), locator: "Control hierarchy, device types, ANC, fit and the five selection considerations" },
		{ id: "cochrane", ...pick(hearingSources.cochrane), locator: "Summary-of-findings tables, methods, results and declarations" },
		{ id: "retention", ...pick(hearingSources.recruits), locator: "Primary indexed methods, attrition, results and limitations; no booster intervention" },
		{ id: "handbook", ...pick(hearingSources.handbook), locator: "Sections 8.6–8.8, pages 133–134" }
	]
};
function pick(source: typeof hearingSources.policy) {
	return { title: source.title, url: source.url!, note: source.note };
}
