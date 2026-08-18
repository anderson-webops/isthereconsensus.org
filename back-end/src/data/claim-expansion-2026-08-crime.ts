import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026CrimeClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Does the death penalty deter homicide more than long imprisonment?",
		slug: "does-the-death-penalty-deter-homicide-more-than-long-imprisonment",
		consensusBand: "unclear",
		confidenceScore: 42,
		evidenceCertainty: "very_low",
		bottomLine:
			"Research has not established whether the death penalty increases, decreases, or has no effect on homicide compared with long imprisonment. The strongest consensus review found existing studies unable to answer the relevant comparative question. That is not proof of zero deterrence; it means strong deterrence claims in either direction outrun the evidence.",
		stableCore: [
			"The relevant policy comparison is execution versus realistic alternative punishments, not execution versus no punishment.",
			"Executions are rare, delayed, selected through complex legal processes, and concentrated in particular jurisdictions, making causal inference unusually difficult.",
			"Studies have produced contradictory estimates that are highly sensitive to assumptions, time periods, and model choices.",
			"Questions about morality, constitutional law, error, fairness, cost, and incapacitation remain separate from the unresolved marginal-deterrence estimate."
		],
		openQuestions: [
			"Can future designs identify a credible comparison punishment and account for policy adoption, enforcement, homicide trends, and spillovers?",
			"How much do certainty and swiftness of ordinary punishment matter relative to maximum severity?"
		],
		whatWouldChangeMinds: [
			"Replicated quasi-experiments with credible counterfactuals finding a stable homicide effect across jurisdictions and specifications.",
			"New data that directly measure offenders' awareness and decision response to execution risk relative to life imprisonment."
		],
		misconceptions: [
			"Insufficient evidence of deterrence is not the same statement as proof that the effect is exactly zero.",
			"A correlation between executions and homicide trends cannot by itself reveal which caused which.",
			"Scientific uncertainty about deterrence does not settle the moral or legal question."
		],
		editorSummary:
			"The intellectually honest consensus is a limit: the available research cannot support a confident deterrence estimate. Public arguments should therefore not present large life-saving or crime-increasing effects as established facts.",
		uncertaintySummary:
			"Very low certainty reflects rare treatment, policy endogeneity, weak counterfactuals, delayed executions, measurement choices, model sensitivity, and inability to isolate death sentences from other sanctions.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Deterrence and the Death Penalty",
				publisher: "National Research Council",
				year: 2012,
				url: "https://doi.org/10.17226/13363",
				doi: "10.17226/13363",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "National Academies consensus review concluding that available research is not informative about whether capital punishment changes homicide rates relative to alternatives.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Estimating the effect of death penalty moratoriums on homicide rates using the synthetic control method",
				publisher: "Criminology & Public Policy",
				year: 2022,
				url: "https://doi.org/10.1111/1745-9133.12601",
				doi: "10.1111/1745-9133.12601",
				appraisal: "moderate",
				stance: "context",
				note: "Modern synthetic-control analysis finding no statistically significant homicide increase after moratoriums in four states, while remaining underpowered for small effects.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Does the death penalty save lives?",
				publisher: "Criminology & Public Policy",
				year: 2009,
				url: "https://doi.org/10.1111/j.1745-9133.2009.00596.x",
				doi: "10.1111/j.1745-9133.2009.00596.x",
				appraisal: "moderate",
				stance: "debate",
				note: "Methodological review of the contested deterrence literature illustrating why large claimed effects are unstable and disputed.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Does hot-spots policing reduce crime without simply moving it nearby?",
		slug: "does-hot-spots-policing-reduce-crime-without-simply-moving-it-nearby",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "high",
		bottomLine:
			"Focusing police resources on small places with concentrated crime produces modest average crime reductions, and reviews do not find that the benefit is usually canceled by crime simply moving next door. Tactics matter: problem-solving and focused prevention need to be distinguished from indiscriminate stops or aggressive enforcement that can impose community harms.",
		stableCore: [
			"A large share of reported crime is concentrated at a small number of micro-places, creating a plausible target for focused prevention.",
			"Randomized and quasi-experimental reviews find small but significant reductions in treated hot spots.",
			"Nearby areas more often show no displacement or a diffusion of benefit than an equal offsetting crime increase.",
			"A place-based effect does not establish that every police tactic used at that place is effective, lawful, proportionate, or trusted."
		],
		openQuestions: [
			"Which problem-oriented, community-led, environmental, service, and enforcement mixes preserve benefit while minimizing coercion and unequal burden?",
			"How durable are effects after concentrated deployment ends, and how should community trust and legitimacy be measured alongside crime?"
		],
		whatWouldChangeMinds: [
			"Updated high-quality reviews finding no net place-based crime reduction after measuring displacement over adequate areas and time.",
			"Evidence that non-police place-based alternatives consistently achieve greater safety with fewer harms at comparable cost."
		],
		misconceptions: [
			"Hot-spots policing is a location strategy, not one required tactic such as pedestrian stops.",
			"A crime reduction does not automatically demonstrate improved legitimacy, fairness, or resident well-being.",
			"Failure to find displacement nearby does not prove no crime changes anywhere or at any later time."
		],
		editorSummary:
			"The place-based prevention effect is unusually replicated for a policing strategy, but the public decision still requires asking what officers do, who bears contact, and whether environmental or service interventions could produce safer gains.",
		uncertaintySummary:
			"High certainty supports a modest average crime effect and little immediate spatial displacement. Tactic-specific harms, long-term durability, reporting changes, legitimacy, and transfer across settings are less certain.",
		sources: [
			{
				kind: "systematic_review",
				title: "Hot Spots Policing and Crime Reduction: An Update of an Ongoing Systematic Review and Meta-Analysis",
				publisher: "Office of Justice Programs",
				year: 2019,
				url: "https://www.ojp.gov/library/publications/hot-spots-policing-and-crime-reduction-update-ongoing-systematic-review-and",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "U.S. justice evidence summary reporting robust crime-prevention effects and no general pattern of immediate spatial displacement.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Hot spots policing of small geographic areas effects on crime",
				publisher: "Campbell Systematic Reviews",
				year: 2019,
				url: "https://doi.org/10.1002/cl2.1046",
				doi: "10.1002/cl2.1046",
				appraisal: "high",
				stance: "supports",
				note: "Campbell synthesis finding a statistically significant modest crime reduction with diffusion of benefits more common than offsetting nearby displacement.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "The effects of hot spots policing on violence: A systematic review and meta-analysis",
				publisher: "Aggression and Violent Behavior",
				year: 2024,
				url: "https://doi.org/10.1016/j.avb.2024.102011",
				doi: "10.1016/j.avb.2024.102011",
				appraisal: "high",
				stance: "context",
				note: "Updated violence-focused synthesis finding significant local reductions without evidence of average displacement and warning that implementation harms remain relevant.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Do police body-worn cameras consistently reduce use of force and complaints?",
		slug: "do-police-body-worn-cameras-consistently-reduce-use-of-force-and-complaints",
		consensusBand: "mixed",
		confidenceScore: 65,
		evidenceCertainty: "moderate",
		bottomLine:
			"Police body-worn cameras do not consistently reduce use of force or most officer and citizen behaviors across studies. Complaints often decline, but that can reflect changed conduct, easier resolution, or changed reporting. Effects depend on activation rules, discretion, supervision, access, disclosure, and whether footage produces accountability rather than merely recording events.",
		stableCore: [
			"Early single-site trials reported large improvements, but broader multi-site evidence produced smaller, null, and sometimes adverse results.",
			"Systematic review finds the most consistent signal for fewer complaints, not a universal reduction in force.",
			"Officer discretion over activation and differences in policy compliance can change the intervention being tested.",
			"Cameras create privacy, surveillance, evidence-retention, victim-consent, public-access, and facial-recognition questions beyond behavioral outcomes."
		],
		openQuestions: [
			"Which activation, auditing, disclosure, discipline, and community-access rules turn footage into fair accountability?",
			"How do cameras affect charging, plea bargaining, testimony, privacy, and outcomes for victims and bystanders over time?"
		],
		whatWouldChangeMinds: [
			"Large multi-jurisdiction trials consistently showing substantial reductions in force and misconduct under specified camera policies.",
			"Convergent evidence that complaint declines reflect suppressed reporting or surveillance harms rather than improved encounters."
		],
		misconceptions: [
			"A camera is not an accountability system by itself.",
			"Fewer complaints can have more than one explanation.",
			"One influential early trial should not outweigh a later multi-site evidence synthesis."
		],
		editorSummary:
			"The evidence does not support treating camera purchase as a guaranteed conduct reform. The more defensible question is which governance system makes recording useful, reviewable, privacy-conscious, and consequential.",
		uncertaintySummary:
			"Moderate certainty supports inconsistent average behavioral effects. Policy variation, contamination between groups, low activation compliance, local culture, changing technology, and reporting behavior limit one pooled answer.",
		sources: [
			{
				kind: "systematic_review",
				title: "Body-worn cameras do not have clear or consistent effects on most officer or citizen behaviors, but more evaluation is needed",
				publisher: "Campbell Collaboration",
				year: 2020,
				url: "https://www.campbellcollaboration.org/2020/09/body-worn-cameras/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Plain-language synthesis of 30 rigorous evaluations finding uncertain force effects, fewer complaints, and no clear pattern across most other behaviors.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Body-worn cameras' effects on police officers and citizen behavior: A systematic review",
				publisher: "Campbell Systematic Reviews",
				year: 2019,
				url: "https://doi.org/10.1002/cl2.1112",
				doi: "10.1002/cl2.1112",
				appraisal: "high",
				stance: "supports",
				note: "Full systematic review documenting mixed effects across force, complaints, arrest activity, assaults, resistance, and other officer or citizen outcomes.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "The Effect of Police Body-Worn Cameras on Use of Force and Citizens' Complaints Against the Police: A Randomized Controlled Trial",
				publisher: "Journal of Quantitative Criminology",
				year: 2015,
				url: "https://doi.org/10.1007/s10940-014-9236-3",
				doi: "10.1007/s10940-014-9236-3",
				appraisal: "moderate",
				stance: "debate",
				note: "Influential early single-jurisdiction randomized trial reporting large reductions and illustrating why later replication across policies and sites was essential.",
				order: 3
			},
			{
				kind: "landmark_study",
				title: "Wearing body cameras increases assaults against officers and does not reduce police use of force: Results from a global multi-site experiment",
				publisher: "European Journal of Criminology",
				year: 2016,
				url: "https://doi.org/10.1177/1477370816643734",
				doi: "10.1177/1477370816643734",
				appraisal: "moderate",
				stance: "debate",
				note: "Multi-site experiment reporting no average force reduction and possible increased assaults, reinforcing the role of protocol and context.",
				order: 4
			}
		]
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Does trying juveniles in adult court reduce later offending?",
		slug: "does-trying-juveniles-in-adult-court-reduce-later-offending",
		consensusBand: "broad",
		confidenceScore: 87,
		evidenceCertainty: "moderate",
		bottomLine:
			"Transferring youth to adult criminal court does not reliably deter future offending and, on average, has been associated with more subsequent crime than retaining comparable youth in the juvenile system. Effects vary by offense and case, but transfer is not supported as a general violence-prevention strategy.",
		stableCore: [
			"The key studies compare transferred youth with similar youth retained in juvenile court rather than comparing them with all other adolescents.",
			"A Community Guide review found a median increase in subsequent violent or general crime among transferred youth.",
			"Later analyses find null average effects in some matched samples and substantial heterogeneity rather than a dependable deterrent benefit.",
			"Accountability, legal jurisdiction, proportionality, public safety, development, and rehabilitation involve additional values beyond recidivism alone."
		],
		openQuestions: [
			"Which offense histories or service models explain heterogeneous outcomes, and can any subgroup benefit without exposing others to harm?",
			"How do facility conditions, sentence length, education, victim services, and reentry support mediate long-term outcomes?"
		],
		whatWouldChangeMinds: [
			"Strong modern quasi-experiments consistently showing lower reoffending for transferred youth across comparable cases.",
			"Evidence that revised adult-court treatment and reentry systems reverse the adverse average without creating other developmental harms."
		],
		misconceptions: [
			"A harsher nominal sentence does not automatically produce greater specific deterrence.",
			"A general average does not determine the correct legal response to every individual case.",
			"Evidence about transferred youths' reoffending does not by itself settle justice, culpability, or victim-centered policy."
		],
		editorSummary:
			"The empirical case for transfer as deterrence is weak to adverse. Policymakers can still debate jurisdiction and accountability, but they should not assume that adult processing generally makes transferred youth less likely to offend again.",
		uncertaintySummary:
			"Moderate certainty reflects consistent review-level concern but nonrandom case selection, legal differences, older cohorts, heterogeneous offenses, and changing juvenile and adult services.",
		sources: [
			{
				kind: "guideline",
				title: "Effects on Violence of Laws and Policies Facilitating the Transfer of Youth from the Juvenile to the Adult Justice System",
				publisher: "Task Force on Community Preventive Services",
				year: 2007,
				url: "https://www.cdc.gov/mmwr/preview/mmwrhtml/rr5609a1.htm",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Systematic Community Guide review recommending against transfer policies for violence prevention because transferred youth generally committed more subsequent crime.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Juvenile Transfer and the Specific Deterrence Hypothesis",
				publisher: "Criminology & Public Policy",
				year: 2016,
				url: "https://doi.org/10.1111/1745-9133.12222",
				doi: "10.1111/1745-9133.12222",
				appraisal: "high",
				stance: "context",
				note: "Updated review finding no statistically significant overall specific-deterrence effect and emphasizing variation and limited high-quality designs.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Differential Effects of Adult Court Transfer on Juvenile Offender Recidivism",
				publisher: "Law and Human Behavior",
				year: 2010,
				url: "https://doi.org/10.1007/s10979-009-9210-z",
				doi: "10.1007/s10979-009-9210-z",
				appraisal: "moderate",
				stance: "context",
				note: "Matched study finding a null overall effect but meaningful differences by offending history, cautioning against a single deterministic estimate.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Is eyewitness confidence a reliable measure of identification accuracy?",
		slug: "is-eyewitness-confidence-a-reliable-measure-of-identification-accuracy",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "high",
		bottomLine:
			"Eyewitness confidence is informative when it is recorded immediately after an identification made under fair, double-blind, non-suggestive conditions. Later confidence can be inflated by feedback, repetition, co-witnesses, or courtroom preparation and is not a reliable stand-alone guarantee. Accuracy depends on both witnessing conditions and identification procedure.",
		stableCore: [
			"Human perception and memory are reconstructive and can be altered without conscious dishonesty.",
			"Under pristine lineup conditions, an initial high-confidence identification can have substantial diagnostic value.",
			"Confidence becomes less trustworthy after confirming feedback, repeated identification, suggestive instructions, or learning which person police suspect.",
			"Blind administration, fair fillers, standardized instructions, immediate confidence recording, and preserving a video record improve interpretation."
		],
		openQuestions: [
			"How should confidence-accuracy estimates be calibrated across estimator variables, lineup types, repeated procedures, and diverse populations?",
			"Which courtroom instructions and expert-testimony practices help jurors use eyewitness evidence without replacing one oversimplification with another?"
		],
		whatWouldChangeMinds: [
			"Large field validation showing initial confidence under controlled procedures has little relationship to accuracy.",
			"Evidence that post-identification contamination does not materially change confidence or juror interpretation."
		],
		misconceptions: [
			"Confidence is not either completely useless or universally decisive.",
			"An honest witness can be confidently mistaken.",
			"The confidence stated in court may not be the confidence the witness expressed at the first identification."
		],
		editorSummary:
			"The modern evidence replaces the slogan that confidence never matters with a conditional rule: record the first confidence statement under a fair procedure. Once memory and confidence have been contaminated, courtroom certainty is much harder to interpret.",
		uncertaintySummary:
			"High certainty supports memory malleability and procedural safeguards. Exact calibration varies with lineup quality, base rates, estimator variables, confidence scale, and whether the suspect is actually present.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Identifying the Culprit: Assessing Eyewitness Identification",
				publisher: "National Research Council",
				year: 2014,
				url: "https://doi.org/10.17226/18891",
				doi: "10.17226/18891",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "National Academies consensus review describing limits of perception and memory and recommending blind procedures, standardized instructions, confidence recording, and documentation.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "The Relationship Between Eyewitness Confidence and Identification Accuracy: A New Synthesis",
				publisher: "Psychological Science in the Public Interest",
				year: 2017,
				url: "https://doi.org/10.1177/1529100616686966",
				doi: "10.1177/1529100616686966",
				appraisal: "high",
				stance: "supports",
				note: "Major synthesis showing that initial high confidence can predict accuracy under pristine test conditions while detailing how contamination breaks that relationship.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Eyewitness Confidence Does Not Necessarily Indicate Identification Accuracy",
				publisher: "Policy Insights from the Behavioral and Brain Sciences",
				year: 2024,
				url: "https://doi.org/10.1177/23727322241268384",
				doi: "10.1177/23727322241268384",
				appraisal: "moderate",
				stance: "context",
				note: "Current policy review emphasizing that witnessing and testing conditions determine whether a confidence statement deserves substantial weight.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Do cognitive-behavioral rehabilitation programs reduce reoffending?",
		slug: "do-cognitive-behavioral-rehabilitation-programs-reduce-reoffending",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"Well-implemented cognitive-behavioral programs reduce reoffending on average, particularly when they target relevant needs, match intensity to risk, and teach practical problem-solving and self-regulation. Effects vary widely; a program label is not enough, and punitive or poorly delivered versions should not be assumed effective.",
		stableCore: [
			"Meta-analyses of adult and juvenile programs find lower average recidivism among participants receiving structured cognitive-behavioral treatment.",
			"Implementation quality, trained staff, adequate dosage, engagement, and fidelity strongly influence results.",
			"Programs tend to work better when they address changeable criminogenic needs and match service intensity to assessed risk.",
			"CBT is one intervention family; education, substance-use care, housing, employment, mental health, supervision, and reentry conditions can alter outcomes."
		],
		openQuestions: [
			"Which components, delivery settings, cultural adaptations, and staff supports produce durable effects for specific populations?",
			"How have effect sizes changed with modern control conditions, implementation at scale, and improved study methods?"
		],
		whatWouldChangeMinds: [
			"Updated rigorous syntheses consistently finding no recidivism benefit after correcting for study quality and publication bias.",
			"Evidence that alternative rehabilitative models reliably produce larger durable effects at equal cost and burden."
		],
		misconceptions: [
			"Evidence that rehabilitation can work does not mean every named program works.",
			"A modest average reduction is not a guarantee that an individual will not reoffend.",
			"Rehabilitation and accountability are policy choices that can coexist rather than mutually exclusive categories."
		],
		editorSummary:
			"The claim that nothing works in rehabilitation is obsolete. The stronger evidence supports specific structured approaches under good implementation, while warning against using the broad word rehabilitation as proof of effectiveness.",
		uncertaintySummary:
			"Moderate certainty reflects positive review-level effects alongside older studies, quasi-experimental designs, variable outcome definitions, selective attrition, and large implementation heterogeneity.",
		sources: [
			{
				kind: "systematic_review",
				title: "Effects of Cognitive-Behavioral Programs for Criminal Offenders",
				publisher: "Campbell Systematic Reviews",
				year: 2007,
				url: "https://doi.org/10.4073/csr.2007.6",
				doi: "10.4073/csr.2007.6",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Campbell review finding meaningful average recidivism reductions and identifying treatment and implementation features associated with stronger effects.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "The positive effects of cognitive-behavioral programs for offenders: A meta-analysis of factors associated with effective treatment",
				publisher: "Journal of Experimental Criminology",
				year: 2005,
				url: "https://doi.org/10.1007/s11292-005-3541-7",
				doi: "10.1007/s11292-005-3541-7",
				appraisal: "high",
				stance: "supports",
				note: "Meta-analysis linking lower recidivism with CBT and finding larger effects for higher-risk participants and well-implemented programs with appropriate components.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Does Cognitive Behavioral Therapy Work in Criminal Justice? A New Analysis From CrimeSolutions",
				publisher: "National Institute of Justice",
				year: 2016,
				url: "https://nij.ojp.gov/library/publications/does-cognitive-behavioral-therapy-work-criminal-justice-new-analysis",
				appraisal: "high",
				stance: "context",
				note: "Justice-agency evidence synthesis finding effective uses alongside substantial variation by program, setting, population, and implementation.",
				order: 3
			}
		]
	})
];
