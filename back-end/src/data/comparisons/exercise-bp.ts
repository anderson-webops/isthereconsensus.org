import type { ComparisonEstimate, ComparisonFinding, EvidenceComparison } from "./types.js";

function estimate(value: number, lower: number, upper: number): ComparisonEstimate {
	return {
		value,
		qualifier: "reported",
		sourceIds: ["hu"],
		interpretation: "Group-average change, not an individual prediction.",
		uncertainty: {
			metric: "Mean difference in blood-pressure change (mmHg)",
			estimate: value,
			lower,
			upper,
			level: 95,
			kind: "credible"
		}
	};
}
function ambulatory(headline: string, summary: string, limitation: string): ComparisonFinding {
	return {
		headline,
		summary,
		limitation,
		sourceIds: ["schneider"],
		evidence:
			"Schneider et al. (2026): 31 randomized trials, 1,345 adults with hypertension, programs lasting at least four weeks.",
		scope: "24-hour monitoring, not the resting measurements in the other context. Abstract checked; full methods were not appraised."
	};
}
function option(
	id: string,
	label: string,
	scope: string,
	systolic: [number, number, number],
	diastolic: [number, number, number],
	finding: ComparisonFinding
): EvidenceComparison["options"][number] {
	return {
		id,
		label,
		scope,
		estimates: {},
		estimatesByContext: { resting: { systolic: estimate(...systolic), diastolic: estimate(...diastolic) } },
		findingsByContext: { ambulatory: { systolic: finding, diastolic: finding } }
	};
}

export const exerciseBpComparison: EvidenceComparison = {
	slug: "exercise-and-blood-pressure",
	title: "Compare exercise and blood pressure",
	description:
		"Compare six training approaches, systolic and diastolic outcomes, and what changes when pressure is measured over 24 hours.",
	checkedAt: "2026-09-12",
	datasetLabel: "Hu et al. (2026), Table 2; separate ambulatory evidence from Schneider et al. (2026)",
	measureNote:
		"The resting figures are group-average differences in change versus control, in mmHg. They are not final blood-pressure readings, percentages of expert agreement, or predicted reductions for an individual.",
	resultNote:
		"Options are not ordered by effectiveness. Larger estimates do not establish a universal winner; study quality, indirect comparisons and measurement context matter.",
	protocolNote:
		"Resting context: 159 randomized trials with 10,821 baseline participants; 152 trials entered the systolic network and 147 the diastolic network. Eligibility required study-level mean age ≥45, not every participant aged ≥45 or diagnosed with hypertension. Programs lasted 4–48 weeks (median 12). Bayesian random-effects estimates combine direct and indirect evidence. The separate 24-hour context uses a different review and population.",
	guidance: {
		text: "Exercise can be part of blood-pressure care, but these comparisons do not replace medication or clinical assessment. AHA guidance recommends gradual progression and appropriate advice for health conditions; breath-holding and abrupt stopping can affect pressure.",
		sourceIds: ["aha"]
	},
	topics: ["exercise-and-sports-science", "cardiovascular-metabolic-and-kidney-health", "health-and-medicine"],
	guidePath: "/guides/exercise-and-blood-pressure",
	reviews: [
		{
			path: "/consensus/exercise-and-sports-science/do-exercise-programs-lower-resting-blood-pressure-in-middle-aged-and-older-adults",
			label: "Training and resting blood pressure"
		},
		{
			path: "/consensus/exercise-and-sports-science/are-isometric-exercises-clearly-best-for-lowering-blood-pressure",
			label: "Isometric exercise and ranking claims"
		},
		{
			path: "/consensus/exercise-and-sports-science/does-lower-clinic-blood-pressure-after-exercise-imply-lower-24-hour-pressure",
			label: "Clinic versus 24-hour outcomes"
		},
		{
			path: "/consensus/exercise-and-sports-science/does-research-identify-one-optimal-exercise-dose-for-lowering-blood-pressure",
			label: "Exercise dose and model limits"
		},
		{
			path: "/consensus/exercise-and-sports-science/can-post-exercise-readings-establish-long-term-blood-pressure-control",
			label: "Measurement timing and long-term control"
		}
	],
	outcomes: [
		{
			id: "systolic",
			label: "Systolic pressure",
			unit: "mmHg versus control",
			explanation:
				"The upper pressure number. Negative estimates mean lower group-average pressure versus control, not an individual's expected reading."
		},
		{
			id: "diastolic",
			label: "Diastolic pressure",
			unit: "mmHg versus control",
			explanation:
				"The lower pressure number. Negative estimates mean lower group-average pressure versus control, not a systolic-pressure change or personal forecast."
		}
	],
	contexts: [
		{
			id: "resting",
			label: "Resting: middle-aged and older study groups",
			supportsEstimates: true,
			explanation:
				"Trials with mean age at least 45; mixed starting pressures and medication use. Not a hypertension-only or individual forecast."
		},
		{
			id: "ambulatory",
			label: "24-hour: adults with hypertension",
			supportsEstimates: true,
			explanation:
				"Separate ambulatory evidence is described qualitatively. Resting figures are never reused as 24-hour estimates."
		},
		{
			id: "personal",
			label: "My likely result",
			supportsEstimates: false,
			explanation:
				"These group data cannot predict your response, select a safe program for you, or determine whether medication should change."
		},
		{
			id: "events",
			label: "Heart attacks and strokes",
			supportsEstimates: false,
			explanation:
				"The displayed exercise networks measured blood pressure, not a matched comparison of cardiovascular events or survival."
		}
	],
	options: [
		option(
			"continuous",
			"Continuous aerobic training",
			"Moderate-intensity continuous training, such as sustained walking or cycling in the included protocols.",
			[-5.06, -6.71, -3.43],
			[-2.82, -3.74, -1.88],
			ambulatory(
				"Evidence of lower 24-hour pressure",
				"The ambulatory review supports aerobic training for both pressure outcomes.",
				"This does not establish superiority over other exercise modes."
			)
		),
		option(
			"intervals",
			"High-intensity intervals",
			"Intervals as delivered in the trials, not a universal intensity prescription or every short workout.",
			[-5.79, -8.1, -3.51],
			[-3.17, -4.49, -1.86],
			ambulatory(
				"Promising but imprecise evidence",
				"The review reports reductions in both outcomes; systolic uncertainty extends almost to no difference.",
				"A favorable estimate is not proof that intervals outperform continuous training."
			)
		),
		option(
			"resistance",
			"Dynamic resistance training",
			"Resistance movements with changing muscle length, distinct from static handgrip protocols.",
			[-4.95, -7.02, -2.87],
			[-2.95, -4.12, -1.76],
			ambulatory(
				"24-hour effects remain uncertain",
				"The review does not establish a clear ambulatory effect for dynamic resistance training.",
				"Uncertainty does not prove no benefit or justify importing resting estimates."
			)
		),
		option(
			"handgrip",
			"Isometric handgrip",
			"All 11 isometric studies in Hu et al. used handgrip. These estimates do not represent wall squats or every static exercise.",
			[-4.18, -8.31, -0.06],
			[-2.77, -5.06, -0.49],
			ambulatory(
				"24-hour effects remain uncertain",
				"The ambulatory synthesis reports uncertain evidence for isometric resistance training.",
				"Its category cannot validate all handgrip devices or all static exercises."
			)
		),
		option(
			"combined",
			"Combined aerobic and resistance",
			"Separate aerobic and resistance components within the same program or session; not the station-based circuit category.",
			[-7.72, -9.99, -5.43],
			[-3.79, -5.08, -2.49],
			ambulatory(
				"Evidence of lower 24-hour pressure",
				"The ambulatory review supports combined training for both pressure outcomes.",
				"Between-mode superiority remained inconclusive; no individual benefit is guaranteed."
			)
		),
		option(
			"circuit",
			"Circuit-based training",
			"Successive exercise stations with short rests and sustained aerobic demand; CBT here means circuit-based training.",
			[-13.52, -18.59, -8.44],
			[-6.87, -9.79, -3.97],
			ambulatory(
				"No separately matched circuit estimate",
				"The checked abstract does not establish a distinct circuit category matching Hu et al.",
				"Do not relabel combined training as the same circuit intervention."
			)
		)
	],
	limitations: [
		"Circuit training has the largest primary resting estimate but limited evidence. Combined training ranks above it in some quality and sample-size sensitivity checks.",
		"Hu et al. rated no network comparison high confidence: four moderate, sixteen low and one very low. This is the authors' appraisal, not an independent site appraisal.",
		"Background medication, starting pressure, measurement posture and protocols varied. Study-level mean age is not an individual eligibility rule.",
		"The 95% credible intervals describe Bayesian model uncertainty, conditional on data and assumptions. They are not confidence intervals, personal prediction intervals or scientific consensus percentages.",
		"A modeled dose-response peak is not a tested personal optimum. No exercise dose, medication change or treatment replacement is prescribed here."
	],
	sources: [
		{
			id: "hu",
			title: "Hu et al. (2026): exercise modality and dose for blood-pressure management",
			url: "https://link.springer.com/article/10.1007/s40279-026-02521-5",
			locator: "Table 2; methods 2.2–2.8; results 3.1–3.8; limitations",
			note: "Full text and Table 2 checked, including visual PDF verification. Published 18 August 2026; search through May 2025. No independent formal appraisal. Authors report no competing interests. Numerical data reproduced unchanged with attribution under CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/); explanatory text is adapted."
		},
		{
			id: "schneider",
			title: "Schneider et al. (2026): exercise and 24-hour ambulatory blood pressure",
			url: "https://pubmed.ncbi.nlm.nih.gov/42120187/",
			locator: "Abstract and competing-interest statement; DOI 10.1136/bjsports-2025-111474",
			note: "Abstract checked, not full-text appraisal. Its trial population and measurement method differ from Hu et al.; overlapping trials must not be counted as independent replications."
		},
		{
			id: "aha",
			title: "AHA: Getting Active to Control High Blood Pressure",
			url: "https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure/getting-active-to-control-high-blood-pressure",
			locator: "Activity, gradual progression, breathing and cooldown guidance; reviewed August 2025",
			note: "Institutional safety context, not the source of the numerical comparisons or a personalized exercise plan."
		}
	],
	readerUpdates: [
		{
			id: "25758a3c-a2db-4ba7-922c-a1557c2ce898",
			date: "2026-09-12T00:25:00.000Z",
			kind: "new_comparison",
			summary:
				"New exercise comparison separates resting and 24-hour pressure, credible intervals and uncertain rankings.",
			bottomLineImpact: "new",
			sourceIds: ["hu", "schneider", "aha"]
		}
	]
};
