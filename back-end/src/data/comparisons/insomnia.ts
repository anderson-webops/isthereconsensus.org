import type { EvidenceComparison } from "./types.js";
import { insomniaSources, sleepPracticalClaims } from "../claim-expansion-practical-sleep.js";

// Recommendations, modeled component effects and single-trial results are not
// a common-scale ranking. Each cell retains its own comparator and limitations.
export const insomniaComparison: EvidenceComparison = {
	slug: "non-drug-insomnia-treatments",
	title: "Compare non-drug insomnia treatments",
	description:
		"CBT-I, brief behavioral care, stimulus control, sleep restriction, relaxation, or sleep hygiene: compare symptom evidence and the demands of treatment.",
	checkedAt: "2026-09-11",
	readerUpdates: [
		{
			id: "af74f04d-451b-4db2-a529-3b16f99a9ba4",
			date: "2026-09-11T22:13:18.000Z",
			kind: "new_comparison",
			bottomLineImpact: "new",
			summary:
				"Added six non-drug insomnia approaches, separating symptom evidence from treatment demands, early safety signals and unstudied contexts.",
			sourceIds: ["guideline", "components", "brief", "digital", "acute", "safety"]
		}
	],
	datasetLabel: "AASM recommendations, component synthesis and selected clinical studies",
	measureNote:
		"No shared numeric score or remission ranking is assigned. Guideline strength is not an effect size. A component odds ratio, a study's remission percentage and an insomnia-severity score have different meanings; they cannot be compared as if they measured the same benefit.",
	resultNote:
		"Full CBT-I has the strongest guideline recommendation. Other approaches have different evidence, burdens and limits; none guarantees a particular person's outcome.",
	protocolNote:
		"This is an adult chronic-insomnia comparison, not a personal treatment plan. Do not derive a sleep window or change medicines from it. Significant daytime sleepiness, breathing symptoms or other health conditions need clinical assessment.",
	topics: ["sleep-and-circadian-health", "neuroscience-and-psychology"],
	guidePath: "/guides/sleep-and-insomnia",
	reviews: [
		{
			path: "/consensus/neuroscience-and-psychology/is-cognitive-behavioral-therapy-for-insomnia-a-first-line-treatment-for-chronic-insomnia",
			label: "Why CBT-I is a first-line treatment"
		},
		{
			path: "/consensus/sleep-and-circadian-health/is-sleep-hygiene-alone-an-effective-treatment-for-chronic-insomnia",
			label: "Why sleep hygiene alone is different"
		},
		...sleepPracticalClaims.map(claim => ({
			path: `/consensus/${claim.topicSlug}/${claim.slug}`,
			label: claim.title
		}))
	],
	outcomes: [
		{
			id: "symptoms",
			label: "Insomnia improvement",
			unit: "Study-specific findings",
			explanation:
				"Evidence for improving chronic-insomnia symptoms or remission, not a prediction of extra hours asleep."
		},
		{
			id: "demands",
			label: "Treatment demands and safety",
			unit: "Treatment-specific findings",
			explanation:
				"What participation involves, delivery limitations and safety uncertainties. Absence of a recorded harm is not proof of no risk."
		}
	],
	contexts: [
		{
			id: "adult-insomnia",
			label: "Adults with chronic insomnia",
			supportsEstimates: true,
			explanation:
				"Adult insomnia trials and guidance. Each card identifies where evidence instead comes from a narrower population or particular program."
		},
		{
			id: "short-opportunity",
			label: "Too little opportunity to sleep",
			supportsEstimates: false,
			explanation:
				"Treatment for chronic insomnia is not evidence that someone with insufficient time available for sleep should reduce it further. These studies do not provide matched benefit estimates for this situation."
		},
		{
			id: "other-populations",
			label: "Children or other sleep disorders",
			supportsEstimates: false,
			explanation:
				"The adult-insomnia findings are not matched estimates for children, untreated sleep apnea, circadian disorders or another diagnosis. Missing estimates do not mean that care is ineffective."
		}
	],
	options: [
		{
			id: "cbt-i",
			label: "Multicomponent CBT-I",
			scope: "Structured cognitive and behavioral treatment, not generic advice or every sleep app.",
			estimates: {},
			findingsByContext: {
				"adult-insomnia": {
					symptoms: {
						headline: "Strongest guideline support",
						summary:
							"AASM strongly recommends multicomponent CBT-I. The recommendation does not promise remission for everyone or establish a fixed number of additional sleep hours.",
						evidence:
							"The 2021 guideline distinguishes this strong recommendation from conditional support for brief therapies and individual components.",
						scope: "Adults with chronic insomnia; programs and clinical circumstances vary.",
						limitation:
							"Recommendation strength considers more than treatment effect. It is not a head-to-head effect-size ranking of all six options.",
						sourceIds: ["guideline"]
					},
					demands: {
						headline: "Structured work; delivery matters",
						summary:
							"Treatment requires practicing cognitive and behavioral skills. Automated, guided online and individual therapist-delivered programs should not be assumed equivalent.",
						evidence:
							"In a 101-patient Norwegian trial, face-to-face care outperformed fully automated SHUTi on insomnia severity at week 33. Digital non-inferiority was not established against a two-point ISI margin.",
						scope: "That delivery comparison concerns one clinical service and one automated program, not every online treatment.",
						limitation:
							"Access advantages remain important, but neither convenience nor improvement against a waiting list proves equivalence. Time-in-bed components can need adjustment and monitoring.",
						sourceIds: ["digital", "acute", "safety"]
					}
				}
			}
		},
		{
			id: "brief",
			label: "Brief behavioral treatment",
			scope: "A structured shorter behavioral program, not an information-only leaflet.",
			estimates: {},
			findingsByContext: {
				"adult-insomnia": {
					symptoms: {
						headline: "Can help; not proven equivalent to full CBT-I",
						summary:
							"Brief behavioral treatment can improve insomnia. AASM's support is conditional, and benefit versus education does not establish the same result as a fuller treatment.",
						evidence:
							"In Buysse et al., 55% of brief-treatment participants versus 13% of information-control participants no longer met insomnia criteria at four weeks.",
						scope: "79 older adults, mean age 71.7, with common comorbidities; not a brief-versus-full-CBT-I trial.",
						limitation:
							"Small, study-specific proportions cannot be ranked against results from different trials. A 2019 correction changed table headings from SD to SE; longer follow-up selected favorable responders.",
						sourceIds: ["brief", "guideline"]
					},
					demands: {
						headline: "Fewer contacts, still active treatment",
						summary:
							"The trial used two sessions and two phone calls with a nurse clinician. Shorter contact does not remove the need to practice behavioral changes or reassess persistent symptoms.",
						evidence:
							"The intervention was individualized behavioral care; the control received printed education. Contact time and content were different.",
						scope: "A four-week older-adult program. Local services may use different staffing or schedules.",
						limitation:
							"The study does not establish that all brief programs are interchangeable, nor a universal cost or time saving. Six-month selected-responder follow-up is not continued randomized evidence.",
						sourceIds: ["brief"]
					}
				}
			}
		},
		{
			id: "stimulus-control",
			label: "Stimulus control",
			scope: "Addresses the association between bed and wakefulness, either alone or within CBT-I.",
			estimates: {},
			findingsByContext: {
				"adult-insomnia": {
					symptoms: {
						headline: "Qualified support as a single treatment",
						summary:
							"AASM conditionally supports standalone stimulus control. Its contribution inside a package is a related but different question.",
						evidence:
							"The 2024 component synthesis linked it with improved self-reported sleep latency and efficiency. Modeled remission incremental OR: 1.43 (95% CI 1.00 to 2.05).",
						scope: "241 adult insomnia trials overall, not 241 standalone stimulus-control trials.",
						limitation:
							"The model assumes additive components without interactions. An incremental odds ratio is neither an absolute remission probability nor proof of equivalence to full CBT-I.",
						sourceIds: ["guideline", "components"]
					},
					demands: {
						headline: "Practice and context still matter",
						summary:
							"A single component can sound simple, but its usefulness depends on how it is delivered and practiced. It does not include every part of CBT-I.",
						evidence:
							"The component synthesis treated techniques as present or absent; actual content and intensity varied between programs.",
						scope: "Behavioral insomnia treatment in adults, not instructions for every cause of nighttime wakefulness.",
						limitation:
							"The component model does not establish a personal protocol, the needed number of contacts, or which patients can safely omit other parts of care.",
						sourceIds: ["components"]
					}
				}
			}
		},
		{
			id: "sleep-restriction",
			label: "Sleep restriction therapy",
			scope: "Clinically supported adjustment of time in bed, not deliberately maintaining chronic sleep deprivation.",
			estimates: {},
			findingsByContext: {
				"adult-insomnia": {
					symptoms: {
						headline: "Can improve continuity, not necessarily duration",
						summary:
							"AASM conditionally supports sleep restriction alone. Better sleep efficiency is not the same as more total sleep, particularly during early treatment.",
						evidence:
							"The component synthesis associated sleep restriction with sleep quality, efficiency and wake-after-sleep-onset improvements. An acute study also observed less laboratory-measured sleep during treatment.",
						scope: "The synthesis includes varied adult programs; the acute study had only 16 patients and no randomized control.",
						limitation:
							"Different outcomes and study designs should not be combined into an expected number of extra sleep minutes.",
						sourceIds: ["guideline", "components", "acute"]
					},
					demands: {
						headline: "Early alertness needs attention",
						summary:
							"Early sleepiness or vigilance impairment can occur. Do not set a severe sleep-restriction schedule from this page or drive while sleepy.",
						evidence:
							"A 16-person uncontrolled study found acute sleepiness and vigilance changes. A later trial in 150 postmenopausal women found no clear excess sleepiness after treatment, with wide intervals and different assessment timing.",
						scope: "The later trial's before/after endpoint does not measure every day immediately after restriction begins.",
						limitation:
							"These findings neither prove universal danger nor certify zero risk. Significant sleepiness and complicating health conditions warrant clinician-led assessment and adjustment.",
						sourceIds: ["acute", "safety"]
					}
				}
			}
		},
		{
			id: "relaxation",
			label: "Relaxation therapy",
			scope: "A relaxation technique alone is not the same intervention as adding it to an existing CBT-I package.",
			estimates: {},
			findingsByContext: {
				"adult-insomnia": {
					symptoms: {
						headline: "May help alone; added benefit remains uncertain",
						summary:
							"AASM conditionally supports standalone relaxation. The later component model did not establish an added remission benefit inside packages.",
						evidence:
							"The modeled incremental OR was 0.81 (95% CI 0.64 to 1.02). The interval includes no difference, so it is not conclusive evidence of harm.",
						scope: "Adult chronic-insomnia treatment, with different relaxation methods grouped together.",
						limitation:
							"Standalone and add-on comparisons ask different questions. Model assumptions and undetected interactions limit the interpretation.",
						sourceIds: ["guideline", "components"]
					},
					demands: {
						headline: "Not a mandatory ingredient",
						summary:
							"A calming practice may be personally useful without being essential to effective insomnia treatment. Making relaxation another performance target is not what this comparison recommends.",
						evidence:
							"The component synthesis explicitly describes its conclusions as hypothesis-generating, not a definitive prescription for the best package.",
						scope: "Treatment packages and methods vary; comfort, stress relief and insomnia remission are separate outcomes.",
						limitation:
							"The evidence does not justify telling everyone to add or abandon relaxation, or presenting it as a substitute for assessment of persistent symptoms.",
						sourceIds: ["components", "guideline"]
					}
				}
			}
		},
		{
			id: "sleep-hygiene",
			label: "Sleep-hygiene education",
			scope: "General advice about habits and sleep conditions, distinct from structured behavioral therapy.",
			estimates: {},
			findingsByContext: {
				"adult-insomnia": {
					symptoms: {
						headline: "Not recommended as the sole treatment",
						summary:
							"AASM conditionally recommends against education-only sleep hygiene as a standalone chronic-insomnia treatment. This does not mean sleep habits never matter.",
						evidence:
							"The guideline separates this advice from multicomponent CBT-I and supported single-component treatments.",
						scope: "Treating chronic insomnia, not judging whether a comfortable environment or sufficient sleep opportunity is worthwhile.",
						limitation:
							"Do not interpret this as proof of zero effect under every circumstance or reuse it as guidance for a different sleep disorder.",
						sourceIds: ["guideline"]
					},
					demands: {
						headline: "Accessible advice is not a complete care plan",
						summary:
							"A checklist can be easy to provide, but repeated advice alone may leave the treatment need unanswered. Knowing sleep rules is not the same as receiving CBT-I.",
						evidence:
							"AASM's public explanation cautions against sleep hygiene as the only treatment for chronic insomnia.",
						scope: "General education for adults, not individualized evaluation or adjustment of a behavioral program.",
						limitation:
							"Availability and simplicity do not establish equivalent effectiveness. This comparison supplies no personal treatment schedule or medication advice.",
						sourceIds: ["guideline", "aasm-explanation"]
					}
				}
			}
		}
	],
	limitations: [
		"This is a targeted, AI-assisted comparison, not an exhaustive systematic review, independent expert review or personal clinical recommendation.",
		"Full CBT-I and its components overlap. Their benefits cannot be added together, and a component model does not test every possible combination directly.",
		"Remission definitions, symptom scales, treatment length and follow-up differ. Do not subtract effects across these studies or label guideline recommendations as percentages of expert agreement.",
		"Early safety and end-of-treatment outcomes differ. Absence of a detected effect, particularly with wide intervals, is not proof of equivalence or zero risk."
	],
	sources: [
		...(["guideline", "components", "brief", "digital", "acute", "safety"] as const).map(id => ({
			id,
			title: insomniaSources[id].title,
			url: insomniaSources[id].url!,
			locator:
				id === "components" || id === "digital"
					? "Methods, results, limitations and disclosures in the linked full text"
					: "Published abstract and linked citation-status records; see access limits below",
			note: insomniaSources[id].note
		})),
		{
			id: "aasm-explanation",
			title: "AASM: New guideline supports behavioral, psychological treatments for insomnia",
			url: "https://aasm.org/new-guideline-supports-behavioral-psychological-treatments-for-insomnia/",
			locator: "Public explanation of the 2021 recommendations",
			note: "Institutional explanation of the guideline, not another clinical trial or independent replication. Distinguishes structured treatments from sleep hygiene alone."
		}
	]
};
