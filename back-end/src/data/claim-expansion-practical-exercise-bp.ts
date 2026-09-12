import type { SeedClaim } from "./claims.js";

const checkedAt = "2026-09-12T00:25:00.000Z";
export const exerciseBpSlugs = {
	resting: "do-exercise-programs-lower-resting-blood-pressure-in-middle-aged-and-older-adults",
	ranking: "are-isometric-exercises-clearly-best-for-lowering-blood-pressure",
	ambulatory: "does-lower-clinic-blood-pressure-after-exercise-imply-lower-24-hour-pressure",
	dose: "does-research-identify-one-optimal-exercise-dose-for-lowering-blood-pressure",
	measurement: "can-post-exercise-readings-establish-long-term-blood-pressure-control"
};
export const exerciseBpPracticalGaps = [
	{
		slug: exerciseBpSlugs.resting,
		gap: "Quantifies sustained training effects on resting pressure in older study groups rather than general exercise benefits or cardiovascular drug outcomes.",
		relatedExistingSlugs: ["does-regular-physical-activity-reduce-the-risk-of-early-death-and-chronic-disease"]
	},
	{
		slug: exerciseBpSlugs.ranking,
		gap: "Tests claims that static exercise is the clear blood-pressure winner, distinguishing handgrip, other static exercises and network ranking uncertainty.",
		relatedExistingSlugs: [
			"is-high-intensity-interval-training-universally-superior-to-moderate-continuous-exercise"
		]
	},
	{
		slug: exerciseBpSlugs.ambulatory,
		gap: "Examines whether a clinic-pressure result transfers to 24-hour monitoring, using distinct syntheses and a randomized trial rather than treating these endpoints as interchangeable.",
		relatedExistingSlugs: ["does-home-blood-pressure-monitoring-help-control-hypertension"]
	},
	{
		slug: exerciseBpSlugs.dose,
		gap: "Distinguishes a model-estimated exercise dose-response peak from a randomized personal optimum or universal prescription.",
		relatedExistingSlugs: ["does-regular-physical-activity-reduce-the-risk-of-early-death-and-chronic-disease"]
	},
	{
		slug: exerciseBpSlugs.measurement,
		gap: "Addresses exercise-specific measurement timing rather than the existing review's question of whether home monitoring linked to clinical feedback improves control.",
		relatedExistingSlugs: ["does-home-blood-pressure-monitoring-help-control-hypertension"]
	}
];
function source(entry: SeedClaim["sources"][number]): SeedClaim["sources"][number] {
	return {
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: checkedAt,
		statusSources: [entry.url!],
		...entry
	};
}
export const exerciseBpSources = {
	hu: source({
		kind: "meta_analysis",
		title: "The Optimal Exercise Modality and Dose for Blood Pressure Management in Middle-Aged and Older Adults: A Systematic Review with Bayesian Model-Based, and Dose–Response Network Meta-Analysis of RCTs",
		publisher: "Sports Medicine",
		year: 2026,
		doi: "10.1007/s40279-026-02521-5",
		url: "https://link.springer.com/article/10.1007/s40279-026-02521-5",
		stance: "supports",
		isAnchor: true,
		order: 1,
		note: "Hu et al.; published 18 August 2026, English-language search through May 2025. Full main text checked, including Table 2 visually in the PDF; supplement not independently appraised. Eligibility is study-level mean age ≥45, not every participant ≥45. Authors' CINeMA assessments are reported, not independently reproduced. No competing interests declared; no specific grant. No correction identified in consulted records, not an exhaustive integrity audit. CC BY 4.0; data retained and explanations adapted with attribution."
	}),
	schneider: source({
		kind: "meta_analysis",
		title: "Effects of different exercise training modalities on 24-hour ambulatory blood pressure in adults with hypertension: a network meta-analysis of randomised controlled trials",
		publisher: "British Journal of Sports Medicine",
		year: 2026,
		doi: "10.1136/bjsports-2025-111474",
		pmid: "42120187",
		url: "https://pubmed.ncbi.nlm.nih.gov/42120187/",
		stance: "supports",
		isAnchor: true,
		order: 1,
		note: "Schneider et al.; primary abstract and disclosures checked, not the full paper or a formal risk-of-bias appraisal. 31 trials and 1,345 participants; exercise-versus-exercise superiority inconclusive. No competing interests declared. Trial overlap with other syntheses was not quantified."
	}),
	pinto: source({
		kind: "landmark_study",
		title: "Effect of home-based isometric training on blood pressure in older adults with high normal BP or stage I hypertension: A randomized controlled trial",
		publisher: "Journal of the American Geriatrics Society",
		year: 2025,
		doi: "10.1111/jgs.19213",
		pmid: "39392028",
		url: "https://agsjournals.onlinelibrary.wiley.com/doi/10.1111/jgs.19213",
		stance: "context",
		order: 2,
		note: "Pinto et al.; first online October 2024, 2025 journal issue. Publisher abstract, disclosures and full eight-page supplement checked; main full report not appraised. Of 84 randomized, 76 had office and 72 valid ambulatory analyses. Most used medication. LSP disclosed ownership of P3-EX LLC, which could benefit. Within-group falls are not evidence of superiority versus control."
	}),
	measurement: source({
		kind: "guideline",
		title: "Home Blood Pressure Monitoring",
		publisher: "American Heart Association",
		year: 2025,
		url: "https://www.heart.org/en/health-topics/high-blood-pressure/understanding-blood-pressure-readings/monitoring-your-blood-pressure-at-home",
		stance: "supports",
		isAnchor: true,
		order: 1,
		note: "Preparation, repeated readings and care boundaries checked on the official page, reviewed August 2025. Measurement guidance, not an exercise-effect trial or an individual diagnosis."
	}),
	active: source({
		kind: "guideline",
		title: "Getting Active to Control High Blood Pressure",
		publisher: "American Heart Association",
		year: 2025,
		url: "https://www.heart.org/en/health-topics/high-blood-pressure/changes-you-can-make-to-manage-high-blood-pressure/getting-active-to-control-high-blood-pressure",
		stance: "context",
		order: 2,
		note: "Official activity guidance checked for gradual progression, breathing, cooldown and individualized clinical advice. It supports safe activity, not a precise modality ranking or the network's numerical estimates."
	})
};
const common = {
	topicSlug: "exercise-and-sports-science",
	status: "published",
	reviewMode: "standard",
	consensusBand: "broad",
	agreementLevel: "broad_qualified",
	evidenceCertainty: "moderate",
	// Legacy editorial field, never a measured percentage of expert agreement.
	confidenceScore: 75,
	searchDatabases: [
		"Consensus.app (targeted discovery)",
		"Springer primary full text",
		"PubMed and publisher abstracts",
		"Wiley trial supplement",
		"American Heart Association guidance"
	],
	searchCutoffAt: checkedAt,
	inclusionRules: [
		"Retain population, measurement method, time horizon and comparison group.",
		"Separate sustained training from acute readings and model-based dose associations."
	],
	exclusionRules: [
		"Do not convert network ranks or interval levels into consensus percentages.",
		"Do not infer personal treatment, medication changes or event reductions from group pressure outcomes."
	],
	appraisalTools: [
		"Targeted source, numerical and applicability check; no formal GRADE, CINeMA or risk-of-bias appraisal completed"
	],
	institutionalAnchors: [
		{
			name: "American Heart Association",
			role: "Measurement and activity guidance, not endorsement of a network ranking"
		}
	],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Sources and scope checked by an AI agent; independent expert review not completed.",
	coiSummary:
		"Hu et al. and Schneider et al. report no competing interests. AHA documents provide institutional context, not independent trial replications.",
	independenceSummary:
		"Separate reviews can include overlapping trials. Different questions and syntheses are not independent votes, and author-reported certainty has not been independently reproduced here.",
	lastRetractionCheckAt: checkedAt
} satisfies Partial<SeedClaim>;
function publication(
	id: string,
	summary: string,
	focus: string
): Pick<SeedClaim, "changeLog" | "readerAnnouncement" | "surveillanceSpec"> {
	return {
		changeLog: [{ date: checkedAt, kind: "publication", summary }],
		readerAnnouncement: { id, date: checkedAt, kind: "new_review", bottomLineImpact: "new", summary },
		surveillanceSpec: {
			focus,
			cadenceDays: 180,
			watchTerms: [focus],
			integrityMonitors: ["Corrections and retractions of cited studies"],
			guidelineMonitors: ["AHA exercise and blood-pressure guidance"],
			triggerRules: [
				"Reassess after a relevant direct comparison, ambulatory trial, measurement guideline change or source correction."
			]
		}
	};
}

export const exerciseBpPracticalClaims: SeedClaim[] = [
	{
		...common,
		slug: exerciseBpSlugs.resting,
		title: "Do exercise programs lower resting blood pressure in middle-aged and older adults?",
		bottomLine:
			"Yes, training generally lowers resting blood pressure compared with control, but the size varies. A recent synthesis supports several exercise approaches; it does not predict an individual's response or establish one best program for everyone.",
		stableCore: [
			"Hu et al. included 159 randomized trials and 10,821 baseline participants. The eligibility criterion was study-level mean age ≥45, not that all participants were over 45 or had hypertension.",
			"Programs lasted 4–48 weeks, with a median of 12. The systolic network included 152 trials and the diastolic network 147; the full review count should not be attached to every outcome.",
			"Moderate continuous training's resting systolic estimate was −5.06 mmHg versus control, with a 95% credible interval of −6.71 to −3.43. This is a difference in group-average change, not a final reading or percentage benefit."
		],
		openQuestions: [
			"How large are sustained benefits with realistic long-term adherence?",
			"Which programs work best at different starting pressures and with different medications?"
		],
		whatWouldChangeMinds: [
			"Large, well-conducted direct comparisons with standardized measurement and longer follow-up.",
			"Consistent evidence that an apparent modality advantage survives bias, adherence and medication checks."
		],
		misconceptions: [
			"A negative mmHg difference means lower pressure relative to control, not a negative blood-pressure reading.",
			"A 95% credible interval is not 95% scientific agreement or a prediction interval for one person.",
			"A useful exercise effect is not evidence to stop prescribed treatment."
		],
		misconceptionTags: ["exercise blood pressure", "aerobic training", "resistance training", "hypertension"],
		editorSummary:
			"Compare the same outcome over the same time horizon. These training programs concern resting pressure after weeks of exercise, not pressure while lifting a weight. Background care and baseline risk remain relevant, and safe, sustainable activity matters beyond one biomarker.",
		uncertaintySummary:
			"Hu et al. reported four moderate-, sixteen low- and one very-low-confidence network comparisons, with none high. Measurement posture, medication reporting and study quality varied. The evidence for some benefit is more secure than precise ordering of programs.",
		uncertaintyDrivers: [
			{
				type: "bias",
				detail: "Many included trials had high risk of bias or some concerns according to the review authors."
			},
			{
				type: "generalizability",
				detail: "Study-average age and variable starting pressure limit personal extrapolation."
			}
		],
		evidenceSummaries: [
			{
				question: "What changes after a training program?",
				population: "Study groups with mean age ≥45, mixed baseline pressures",
				finding:
					"All six exercise categories had lower resting systolic and diastolic pressure versus control in the primary Bayesian network.",
				effectDirection: "supports",
				magnitude: "Continuous aerobic systolic MD −5.06 mmHg (95% credible interval −6.71 to −3.43).",
				certainty: "moderate",
				limitations: [
					"Direct and indirect evidence",
					"Variable background treatment",
					"No cardiovascular-event ranking"
				]
			}
		],
		...publication(
			"6e5048e0-4f99-4813-9538-ec36f3b99012",
			"New review: sustained exercise and resting blood pressure in older study groups.",
			"Exercise training resting blood pressure older adults"
		),
		sources: [exerciseBpSources.hu, exerciseBpSources.active]
	},
	{
		...common,
		slug: exerciseBpSlugs.ranking,
		title: "Are isometric exercises clearly best for lowering blood pressure?",
		bottomLine:
			"No universal winner is established. Isometric training can lower resting pressure, but rankings depend on the population, endpoint and study quality. Handgrip findings cannot automatically be applied to wall squats or every static exercise.",
		stableCore: [
			"Every isometric study in Hu et al.'s older-study-group review used handgrip: 11 studies, 17 intervention arms and 364 participants. That is a narrower intervention than all isometric exercise.",
			"Its handgrip estimate was −4.18 mmHg for resting systolic pressure, with a wide 95% credible interval of −8.31 to −0.06; this does not establish best-in-class performance.",
			"Circuit training had the largest primary estimate in that review, but combined training surpassed it in some sensitivity analyses excluding high-risk or small studies. Changing ranks are a reason for caution, not a new universal prescription."
		],
		openQuestions: [
			"Do adequately powered direct trials reproduce differences between handgrip, lower-body isometrics and combined exercise?",
			"Do effects remain with longer use and 24-hour monitoring?"
		],
		whatWouldChangeMinds: [
			"Replicated low-bias head-to-head trials using matched follow-up and validated pressure measurement.",
			"Consistent advantages in clinically relevant outcomes, adherence and safety rather than rank alone."
		],
		misconceptions: [
			"SUCRA and similar network ranks are not the percentage of scientists who agree.",
			"The largest point estimate is not necessarily the most trustworthy estimate.",
			"A category named isometric does not validate every device or exercise marketed under that label."
		],
		misconceptionTags: ["isometric exercise", "handgrip", "wall squats", "best exercise for blood pressure"],
		editorSummary:
			"The key question is not whether an exercise can help, but whether evidence establishes that it is better under comparable conditions. A network draws partly on indirect comparisons, so differences between the studies themselves can influence the apparent order.",
		uncertaintySummary:
			"No Hu network comparison was rated high confidence. Sparse modality evidence, study quality and unstable sensitivity rankings prevent a confident universal hierarchy; the site's conclusion is not that all programs are equivalent.",
		uncertaintyDrivers: [
			{
				type: "imprecision",
				detail: "The handgrip interval is wide and approaches no difference for systolic pressure."
			},
			{ type: "indirectness", detail: "Not every modality comparison is a direct randomized head-to-head trial." }
		],
		evidenceSummaries: [
			{
				question: "Does the recent network establish an isometric winner?",
				population: "Older study groups with resting peripheral pressure outcomes",
				finding:
					"Handgrip showed a reduction versus control, while circuit and combined training generally ranked higher; the ordering was not robust enough for a universal winner.",
				effectDirection: "mixed",
				magnitude: "Handgrip systolic MD −4.18 mmHg (95% credible interval −8.31 to −0.06).",
				certainty: "low",
				limitations: [
					"Handgrip only in the isometric category",
					"Low-confidence comparisons",
					"Quality-sensitive ranks"
				]
			}
		],
		...publication(
			"7862719c-a80c-4ce1-bbe8-662b4075a37b",
			"New review: why isometric blood-pressure rankings do not establish a universal best exercise.",
			"Isometric handgrip blood pressure comparative effectiveness"
		),
		sources: [exerciseBpSources.hu, exerciseBpSources.active]
	},
	{
		...common,
		slug: exerciseBpSlugs.ambulatory,
		title: "Does lower clinic blood pressure after exercise imply lower 24-hour pressure?",
		bottomLine:
			"Not automatically. Clinic and 24-hour monitoring are different outcomes. Exercise can improve ambulatory pressure, but a clinic result alone does not establish the size, duration or even detection of an effect across the day and night.",
		stableCore: [
			"Hu et al. excluded studies reporting only ambulatory pressure. Their resting figures cannot simply be reused as 24-hour estimates.",
			"Schneider et al.'s separate ambulatory synthesis supports continuous aerobic, interval and combined training, while resistance evidence remains uncertain; it does not establish a clear between-mode winner.",
			"Pinto et al. randomized 84 older adults to handgrip, walking or control for eight weeks. Office pressure fell within exercise groups, but between-group office differences were not detected, nor were ambulatory differences. Within-group change is not proof of a treatment effect."
		],
		openQuestions: [
			"Which programs reliably improve nighttime and daytime pressure in different treated populations?",
			"How do adherence, medication changes and measurement timing explain divergent results?"
		],
		whatWouldChangeMinds: [
			"Larger trials prespecifying office, home and ambulatory endpoints with adequate follow-up.",
			"Replicated direct evidence of clinically meaningful between-group ambulatory changes."
		],
		misconceptions: [
			"A significant fall within one group does not establish superiority to control.",
			"A nonsignificant difference does not demonstrate equivalence or prove zero effect.",
			"Different reviews can include overlapping studies and cannot be counted as separate votes."
		],
		misconceptionTags: [
			"ambulatory blood pressure",
			"24-hour pressure",
			"clinic readings",
			"handgrip walking trial"
		],
		editorSummary:
			"First ask what was measured and what comparison supports the claim. A single office visit samples a different situation from repeated daytime and nighttime recordings. The trial is a caution about inference, not evidence that all exercise fails to improve ambulatory pressure.",
		uncertaintySummary:
			"The ambulatory review's abstract was checked, not its full methods. Pinto's abstract and supplement were checked: 76 had office analyses and 72 valid ambulatory analyses, with most taking medication. Attrition, missing recordings and the specific older cohort limit extrapolation.",
		uncertaintyDrivers: [
			{ type: "imprecision", detail: "A small trial cannot reliably exclude modest ambulatory effects." },
			{
				type: "generalizability",
				detail: "Mostly medicated older participants are not all adults with high pressure."
			}
		],
		evidenceSummaries: [
			{
				question: "Does the same trial demonstrate clinic and ambulatory benefit?",
				population: "84 randomized older adults; 76 office and 72 ambulatory analyses",
				finding:
					"The Pinto trial did not detect between-group superiority for office or ambulatory pressure despite within-group office declines.",
				effectDirection: "unclear",
				magnitude: "Eight weeks; do not interpret a within-arm change as a control-adjusted effect.",
				certainty: "low",
				limitations: [
					"Limited sample",
					"Different analyzed denominators",
					"Most used antihypertensive medication"
				]
			}
		],
		coiSummary:
			"Schneider et al. declared no competing interests. Pinto et al. disclosed that LSP owns P3-EX LLC, which could benefit; that disclosure and incomplete full-report access are retained here.",
		...publication(
			"948a1673-081b-4a74-a8e8-d5fb6d89a23e",
			"New review: separate office-pressure change from ambulatory evidence and between-group effects.",
			"Exercise clinic versus ambulatory blood pressure"
		),
		sources: [
			exerciseBpSources.schneider,
			exerciseBpSources.pinto,
			{ ...exerciseBpSources.hu, order: 3, stance: "context", isAnchor: false }
		]
	},
	{
		...common,
		slug: exerciseBpSlugs.dose,
		title: "Does research identify one optimal exercise dose for lowering blood pressure?",
		bottomLine:
			"No single personal optimum is established. Dose-response modeling suggests useful ranges, but a peak fitted across different trials is not the result of randomizing each person to many doses. It should not become an exact universal target.",
		stableCore: [
			"Hu et al.'s model estimated its largest overall systolic reduction around 1,200 MET-minutes per week, but the component trials differed in population, modality, duration and starting pressure.",
			"The authors estimated exercise energy cost using activity compendiums, representative intensities and midpoints when protocols varied. These are modeling decisions rather than direct measurements of each participant's energy expenditure.",
			"The modeled circuit peak differed from the pooled peak; a separate isometric dose-response analysis was not possible. A single number therefore cannot summarize all programs."
		],
		openQuestions: [
			"Do randomized dose comparisons confirm the shape of the modeled relationship?",
			"How do sustainable adherence, baseline pressure and treatment modify the best practical dose?"
		],
		whatWouldChangeMinds: [
			"Replicated randomized dose-ranging trials with measured exposure and standardized outcomes.",
			"External validation showing useful individualized predictions beyond trial-level averages."
		],
		misconceptions: [
			"A model peak does not establish that slightly less is ineffective or slightly more is harmful.",
			"MET-minutes combine intensity and duration; they are not simply minutes of any activity.",
			"A population-level curve is not a substitute for a safe program matched to someone's health."
		],
		misconceptionTags: ["exercise dose", "MET minutes", "optimal workout", "blood pressure dose response"],
		editorSummary:
			"The dose curve is a hypothesis-generating summary, not a precision prescription. Exposure coding, sparse data and differences between trials can shape its maximum. General activity guidance and individual safety decisions should not be collapsed into a statistically optimized number.",
		uncertaintySummary:
			"Study-level modeling cannot remove all confounding by program or participant differences. The network's low-confidence comparisons, assumed exposure values and limited isometric dose variation make exact peaks less certain than the general value of regular activity.",
		uncertaintyDrivers: [
			{
				type: "indirectness",
				detail: "Across-trial dose associations are not individual randomized dose-response experiments."
			},
			{ type: "other", detail: "Compendium assignments and midpoint assumptions affect estimated exercise dose." }
		],
		evidenceSummaries: [
			{
				question: "What does the model's peak establish?",
				population: "Trials with study-level mean age ≥45",
				finding:
					"The Bayesian curve suggests a nonlinear systolic response, but the apparent optimum depends on dose coding, included trials and modality.",
				effectDirection: "unclear",
				magnitude:
					"Overall modeled peak around 1,200 MET-minutes/week; not a personal target or minimum effective threshold.",
				certainty: "low",
				limitations: [
					"Modeled exposure",
					"No isometric dose-response analysis",
					"No personal prediction validation"
				]
			}
		],
		...publication(
			"67a6621d-3631-40e6-95d6-e6fe9a7992e3",
			"New review: exercise dose-response modeling does not identify a universal personal optimum.",
			"Exercise dose response blood pressure optimal MET minutes"
		),
		sources: [exerciseBpSources.hu, exerciseBpSources.active]
	},
	{
		...common,
		slug: exerciseBpSlugs.measurement,
		title: "Can post-exercise readings establish long-term blood-pressure control?",
		bottomLine:
			"Not by themselves. A reading during or just after exercise answers a different question from standardized resting measurements collected over time. Measurement conditions and the record of readings matter when assessing control.",
		stableCore: [
			"AHA home-monitoring guidance advises avoiding exercise for 30 minutes before a routine reading and resting quietly for at least five minutes. A workout reading is not obtained under those resting conditions.",
			"A series of consistently obtained readings is more informative about control than selecting a single favorable post-workout value.",
			"Training studies report group outcomes after an intervention period. Their control-adjusted estimates cannot diagnose an individual's current pressure or determine a medication change."
		],
		openQuestions: [
			"How can home monitoring better capture meaningful trends without overinterpreting day-to-day variation?",
			"Which assessment schedules best separate sustained training effects from recent exercise?"
		],
		whatWouldChangeMinds: [
			"Validated protocols showing that another measurement schedule predicts sustained control reliably.",
			"Clinical guidance integrating different measurement contexts with demonstrated benefits rather than convenient single readings."
		],
		misconceptions: [
			"A lower number immediately after activity does not by itself prove that hypertension has resolved.",
			"A higher workout reading is not directly comparable to a standardized resting reading.",
			"This distinction is not a reason to dismiss concerning symptoms or delay medical care."
		],
		misconceptionTags: ["post exercise blood pressure", "home monitoring", "resting reading", "measurement timing"],
		editorSummary:
			"Keep the measurement question separate from the exercise question. Routine home tracking, supervised exercise testing and research follow-up serve different purposes. Interpret the record with a healthcare professional rather than using this review or one reading as a diagnosis.",
		uncertaintySummary:
			"Standardized preparation improves comparability but does not make every device or reading accurate. Cuff fit, validated equipment, posture and repeated measurements still matter; no universal correction can transform a workout reading into resting pressure.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail: "Measurement context and equipment affect how an individual reading should be interpreted."
			}
		],
		evidenceSummaries: [
			{
				question: "What makes a routine home reading comparable?",
				population: "People using home blood-pressure monitoring",
				finding:
					"AHA recommends standardized resting preparation and a record of repeated measurements rather than interpreting one reading in isolation.",
				effectDirection: "supports",
				magnitude: "Measurement protocol, not an exercise-effect size or diagnostic threshold.",
				certainty: "high",
				limitations: ["Does not replace clinical assessment", "Not a protocol for supervised exercise testing"]
			}
		],
		...publication(
			"dccd17c4-4e0c-4be2-abd7-be85b2cc78f3",
			"New review: post-exercise readings and long-term blood-pressure control are different questions.",
			"Exercise timing home blood pressure measurement control"
		),
		sources: [
			exerciseBpSources.measurement,
			{ ...exerciseBpSources.hu, order: 2, stance: "context", isAnchor: false }
		]
	}
];
