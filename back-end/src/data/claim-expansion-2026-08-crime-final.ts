import type { SeedClaim } from "./claims.js";
import {
	august2026EncyclopediaTrancheFiveSourcedClaim as reviewedClaim,
	encyclopediaDoiSources as sources
} from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026CrimeFinalClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Do Scared Straight prison-visit programs prevent juvenile offending?",
		slug: "do-scared-straight-prison-visit-programs-prevent-juvenile-offending",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. Randomized evaluations of Scared Straight and similar confrontational prison-visit programs found no prevention benefit and, on average, more later offending among participants. Frightening young people is not a harmless fallback when structured family, school, behavioral, and community interventions are available.",
		stableCore: [
			"The central systematic review is based on randomized experiments rather than testimonials or before-after impressions.",
			"Pooled outcomes indicate harmful average effects, making routine use difficult to justify even when a local program feels compelling.",
			"A memorable emotional reaction immediately after a visit is not evidence of reduced later offending."
		],
		openQuestions: [
			"Why do confrontational deterrence programs remain popular despite unusually clear harmful evidence?",
			"Which implementation supports help communities replace them with better-tested prevention?"
		],
		whatWouldChangeMinds: [
			"Modern independent randomized trials showing a reproducible reduction in offending without psychological or behavioral harm.",
			"A clearly different program model with evidence strong enough that it should no longer be grouped with Scared Straight."
		],
		misconceptions: [
			"A participant saying the visit was frightening does not establish behavior change.",
			"Good intentions do not neutralize measured harm.",
			"A redesigned supportive prison education program should not inherit the evidence for a confrontational one."
		],
		editorSummary:
			"Scared Straight is a rare case where randomized evidence indicates the intuitive intervention can make outcomes worse.",
		uncertaintySummary:
			"Trials are older and programs vary, but the randomized direction is sufficiently consistent that exposing youth outside research is not supported.",
		sources: sources([
			["systematic_review", "Scared Straight and Other Juvenile Awareness Programs for Preventing Juvenile Delinquency: A Systematic Review of the Randomized Experimental Evidence", "The ANNALS of the American Academy of Political and Social Science", 2003, "10.1177/0002716203254693", "Randomized-evidence synthesis finding higher subsequent offending among program participants."],
			["meta_analysis", "Scared Straight and Other Juvenile Awareness Programs for Preventing Juvenile Delinquency", "Campbell Systematic Reviews", 2013, "10.4073/csr.2013.5", "Updated Campbell review confirming no benefit and likely harm across randomized evaluations."],
			["systematic_review", "Psychological Treatments That Cause Harm", "Perspectives on Psychological Science", 2007, "10.1111/j.1745-6916.2007.00029.x", "Broader harm review using Scared Straight as an example of interventions that can worsen intended outcomes."]
		])
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Does education in prison reduce later reoffending?",
		slug: "does-education-in-prison-reduce-later-reoffending",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, on average. Academic and vocational education during incarceration is associated with lower recidivism and better post-release employment prospects, with stronger designs still supporting a meaningful reduction. Program access, completion, instructional quality, labor-market barriers, and reentry support determine how much benefit is realized.",
		stableCore: [
			"Multiple syntheses find lower return-to-custody or rearrest among participants than comparison groups.",
			"Selection into education can inflate observational effects, but higher-quality analyses still find benefit.",
			"Credentials alone cannot remove housing, licensing, discrimination, supervision, health, and labor-market barriers after release."
		],
		openQuestions: [
			"Which academic, vocational, college, and digital-access models produce durable outcomes for different learners?",
			"How do program quality, sentence length, transfer, release timing, and community continuity affect completion and impact?"
		],
		whatWouldChangeMinds: [
			"Strong randomized or quasi-experimental syntheses finding no recidivism benefit after selection and attrition are addressed.",
			"Evidence that measured reductions reflect surveillance or recording differences rather than fewer offenses."
		],
		misconceptions: [
			"A lower average recidivism rate does not mean education alone guarantees successful reentry.",
			"Participant motivation is a confound to measure, not a reason to discard all evidence.",
			"Vocational training must connect to real, legally accessible work to deliver its intended value."
		],
		editorSummary:
			"Correctional education is one of the better-supported rehabilitation investments, especially when learning continues into realistic reentry opportunities.",
		uncertaintySummary:
			"Program and outcome definitions vary, nonrandom selection remains important, and employment effects are less consistent than recidivism effects.",
		sources: sources([
			["meta_analysis", "Does providing inmates with education improve postrelease outcomes? A meta-analysis of correctional education programs in the United States", "Journal of Experimental Criminology", 2018, "10.1007/s11292-018-9334-6", "Updated synthesis emphasizing higher-quality designs and a substantial average recidivism reduction."],
			["meta_analysis", "How Effective Is Correctional Education, and Where Do We Go from Here?", "RAND Corporation", 2014, "10.7249/RR564", "Research synthesis of recidivism, employment, and implementation evidence for correctional education."],
			["meta_analysis", "Are Schools in Prison Worth It? The Effects and Economic Returns of Prison Education", "American Journal of Criminal Justice", 2023, "10.1007/s12103-023-09747-3", "Large updated synthesis examining recidivism, employment, wages, program types, and study-quality limitations."]
		])
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Do adult drug courts reduce reoffending?",
		slug: "do-adult-drug-courts-reduce-reoffending",
		consensusBand: "broad",
		confidenceScore: 83,
		evidenceCertainty: "moderate",
		bottomLine:
			"Adult drug courts generally reduce recidivism modestly compared with conventional case processing, but effects vary greatly and the evidence is weakened by selection and inconsistent designs. Therapeutic quality, eligibility, incentives, sanctions, completion rules, and what happens to people who fail the program all affect the net result.",
		stableCore: [
			"Meta-analyses repeatedly find a favorable average recidivism effect, usually concentrated during or shortly after participation.",
			"Random assignment is uncommon and program graduates are not an unbiased comparison with non-completers.",
			"Reduced reoffending does not by itself establish fairness, health benefit, cost-effectiveness, or appropriate use of coercion."
		],
		openQuestions: [
			"Which treatment and supervision components drive benefit rather than selection into well-run programs?",
			"How do racial equity, access, medication for opioid use disorder, sanctions, and failure consequences change net benefit?"
		],
		whatWouldChangeMinds: [
			"Low-bias multisite evaluations finding no recidivism benefit from contemporary treatment-oriented courts.",
			"Evidence that apparent reductions are offset by net-widening, harsher failure penalties, or health harms at the system level."
		],
		misconceptions: [
			"Drug courts are not one standardized intervention.",
			"Graduate success rates can badly overstate program effects.",
			"A recidivism benefit does not settle legal or ethical questions about coerced treatment."
		],
		editorSummary:
			"Drug courts have a modest favorable average, but implementation and the full participant pathway matter more than the label.",
		uncertaintySummary:
			"Heterogeneous programs, weak counterfactuals, selective attrition, and short follow-up make precise causal and distributional estimates difficult.",
		sources: sources([
			["systematic_review", "A systematic review of drug court effects on recidivism", "Journal of Experimental Criminology", 2006, "10.1007/s11292-006-9019-4", "Review finding a tentative favorable average while emphasizing weak methods and variability."],
			["meta_analysis", "Assessing the effectiveness of drug courts on recidivism: A meta-analytic review of traditional and non-traditional drug courts", "Journal of Criminal Justice", 2012, "10.1016/j.jcrimjus.2011.11.009", "Broader quantitative synthesis comparing program and participant characteristics."],
			["meta_analysis", "Looking Inside the Black Box of Drug Courts: A Meta-Analytic Review", "Justice Quarterly", 2011, "10.1080/07418825.2010.525222", "Meta-analysis exploring which treatment and supervision features correlate with stronger effects."]
		])
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Do face-to-face restorative justice conferences reduce repeat offending and help victims?",
		slug: "do-face-to-face-restorative-justice-conferences-reduce-repeat-offending-and-help-victims",
		consensusBand: "broad",
		confidenceScore: 87,
		evidenceCertainty: "moderate",
		bottomLine:
			"Structured restorative justice conferences with willing victims and offenders can modestly reduce repeat offending and improve victim satisfaction or emotional recovery compared with usual justice alone. They are not appropriate for every case, require informed voluntary participation and skilled safeguards, and should not be equated with informal pressure to forgive.",
		stableCore: [
			"Randomized evaluations support average victim benefits and a modest recidivism reduction in selected cases.",
			"The intervention adds facilitated dialogue and reparation to ordinary processing; selection and eligibility define who is represented.",
			"Safety planning, preparation, power imbalance, trauma, and a participant's freedom to decline are essential."
		],
		openQuestions: [
			"Which offenses, participant preferences, facilitation standards, and legal contexts produce benefit without coercion?",
			"How durable are victim and offender outcomes, and who is excluded from access to high-quality programs?"
		],
		whatWouldChangeMinds: [
			"Updated randomized syntheses finding no victim or recidivism benefit under well-safeguarded programs.",
			"Evidence of systematic retraumatization, coercion, inequity, or net-widening that outweighs measured gains."
		],
		misconceptions: [
			"Restorative justice is not simply apologizing or avoiding accountability.",
			"An average benefit does not make a conference safe or wanted in every case.",
			"Victim satisfaction and offender recidivism are separate outcomes."
		],
		editorSummary:
			"Restorative conferences can add value when participation is informed, voluntary, prepared, and professionally safeguarded.",
		uncertaintySummary:
			"Trials concern selected eligible cases and program models; transfer to intimate violence, severe power imbalance, or weak implementation remains uncertain.",
		sources: sources([
			["systematic_review", "Restorative Justice Conferencing Using Face-to-Face Meetings of Offenders and Victims: Effects on Offender Recidivism and Victim Satisfaction", "Campbell Systematic Reviews", 2013, "10.4073/csr.2013.12", "Randomized-trial synthesis finding modest recidivism reductions and stronger victim satisfaction."],
			["systematic_review", "Are Restorative Justice Conferences Effective in Reducing Repeat Offending? Findings from a Campbell Systematic Review", "Journal of Quantitative Criminology", 2014, "10.1007/s10940-014-9222-9", "Peer-reviewed synthesis and interpretation of randomized restorative-conference evidence."],
			["landmark_study", "Short-term effects of restorative justice conferences on post-traumatic stress symptoms among robbery and burglary victims: a randomized controlled trial", "Journal of Experimental Criminology", 2014, "10.1007/s11292-014-9200-0", "Randomized victim-outcome study illustrating potential psychological benefit in selected cases."]
		])
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Does public-area CCTV reduce crime?",
		slug: "does-public-area-cctv-reduce-crime",
		consensusBand: "broad",
		confidenceScore: 85,
		evidenceCertainty: "moderate",
		bottomLine:
			"CCTV produces a modest average crime reduction, with the clearest benefits in parking facilities and when cameras are actively monitored and combined with other measures. Effects are smaller or inconsistent in many open streets and for violent crime, and effectiveness does not by itself resolve privacy, bias, displacement, or accountability concerns.",
		stableCore: [
			"Meta-analyses find a small favorable overall effect rather than universal deterrence.",
			"Setting, camera coverage, monitoring, response capacity, lighting, and complementary interventions change outcomes.",
			"Crime displacement and diffusion of benefit should be measured beyond the camera's immediate view."
		],
		openQuestions: [
			"Which operating models improve safety enough to justify cost and privacy intrusion?",
			"How do facial recognition, automated analytics, unequal surveillance, and data retention change the harm-benefit balance?"
		],
		whatWouldChangeMinds: [
			"Updated high-quality evaluations finding no crime reduction in the settings currently showing benefit.",
			"Evidence that displacement, discriminatory enforcement, or privacy harms consistently outweigh local reductions."
		],
		misconceptions: [
			"Installing cameras is not the same as operating an effective response system.",
			"An average property-crime effect does not establish equal prevention of violent crime.",
			"Measured effectiveness and acceptable surveillance policy are different questions."
		],
		editorSummary:
			"CCTV is a context-dependent prevention tool with modest average effects, not an all-purpose substitute for environmental design, staffing, or community safety work.",
		uncertaintySummary:
			"Study quality, setting, technology, co-interventions, reporting, and displacement measures vary substantially, limiting a single transferable effect.",
		sources: sources([
			["meta_analysis", "CCTV surveillance for crime prevention: A 40-year systematic review with meta-analysis", "Criminology & Public Policy", 2019, "10.1111/1745-9133.12419", "Large updated synthesis finding modest, setting-dependent reductions and stronger effects with active monitoring."],
			["systematic_review", "Effects of Closed Circuit Television Surveillance on Crime", "Campbell Systematic Reviews", 2008, "10.4073/csr.2008.17", "Influential review distinguishing parking-facility benefits from weaker open-street evidence."],
			["systematic_review", "Surveillance cameras and crime: a review of randomized and natural experiments", "Journal of Scandinavian Studies in Criminology and Crime Prevention", 2017, "10.1080/14043858.2017.1387410", "Review focused on stronger evaluation designs and contextual limitations."]
		])
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Do voluntary local gun buybacks reduce firearm violence?",
		slug: "do-voluntary-local-gun-buybacks-reduce-firearm-violence",
		consensusBand: "broad",
		confidenceScore: 80,
		evidenceCertainty: "moderate",
		bottomLine:
			"U.S.-style voluntary local buybacks have not shown a clear population-level reduction in firearm homicide, suicide, or injury when used alone. They typically recover a small, nonrandom share of the local stock and many surrendered guns are older or lower risk. Different compulsory national policies or targeted removal programs are different interventions.",
		stableCore: [
			"Recent quasi-experimental evaluation finds no detectable average reduction across U.S. local programs.",
			"Scale and selection matter: the people and firearms most connected to near-term violence may be least likely to participate.",
			"A buyback can have symbolic, engagement, safe-disposal, or individual-household value without producing a measurable citywide violence decline."
		],
		openQuestions: [
			"Can targeted, sustained, high-value, or risk-linked designs measurably affect suicide, theft, domestic violence, or neighborhood harm?",
			"What outcomes should communities expect relative to other uses of violence-prevention funding?"
		],
		whatWouldChangeMinds: [
			"Credible controlled evaluations showing sustained firearm-harm reductions from voluntary local programs at realistic scale.",
			"Evidence that specific design features reliably reach high-risk weapons and owners rather than merely increasing collection totals."
		],
		misconceptions: [
			"Removing any one unwanted gun can reduce one household's risk without changing a citywide rate.",
			"Australian national policy evidence cannot be transferred unchanged to small voluntary U.S. events.",
			"No detected population effect does not prove every possible buyback design is incapable of benefit."
		],
		editorSummary:
			"Judge voluntary buybacks against the population outcome they claim and distinguish safe disposal from a demonstrated violence-prevention strategy.",
		uncertaintySummary:
			"Programs are heterogeneous and rare outcomes make local evaluation difficult, but current U.S. evidence does not support a large stand-alone effect.",
		sources: sources([
			["systematic_review", "Gun Buyback Programs in the United States", "Springer", 2020, "10.1007/978-3-030-55513-9_15", "Review of U.S. designs and evidence explaining why recovered volume and participant selection limit impact."],
			["landmark_study", "Have U.S. Gun Buyback Programs Misfired?", "National Bureau of Economic Research", 2021, "10.3386/w28763", "Multi-program quasi-experimental analysis finding no detectable reduction in firearm-related violence."],
			["consensus_statement", "Firearms and Violence: A Critical Review", "National Academies Press", 2004, "10.17226/10881", "Independent assessment finding the available buyback evidence insufficient to establish violence reduction."]
		])
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Does pretrial detention influence later case and life outcomes?",
		slug: "does-pretrial-detention-influence-later-case-and-life-outcomes",
		consensusBand: "broad",
		confidenceScore: 89,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Causal studies using quasi-random judge assignment and policy variation find that detention before trial increases guilty pleas or convictions and can reduce later employment, with mixed estimates for future crime. People detained are not interchangeable with those released, so simple comparisons are misleading; stronger designs are central to this conclusion.",
		stableCore: [
			"Detention can disrupt work, housing, health, caregiving, and defense preparation before guilt is adjudicated.",
			"Quasi-experimental studies isolate meaningful effects of detention itself on case disposition and socioeconomic outcomes.",
			"Public-safety effects vary by horizon and setting and must be separated from court-appearance outcomes."
		],
		openQuestions: [
			"Which defendants face the largest detention harms or release risks, and can transparent supports improve both safety and appearance?",
			"How do local jail conditions, case delay, counsel, employment protection, and supervision shape downstream effects?"
		],
		whatWouldChangeMinds: [
			"Multiple credible natural experiments finding no downstream case, employment, housing, health, or family effects.",
			"Evidence that current estimates are driven by violations of judge-assignment or policy-design assumptions."
		],
		misconceptions: [
			"A pretrial decision can have causal consequences even though it is not a sentence.",
			"Simple detained-versus-released comparisons confound detention with initial risk and resources.",
			"Finding harms does not imply every release decision has zero public-safety tradeoff."
		],
		editorSummary:
			"Pretrial detention changes more than location: it can alter case leverage, work, and later stability, so its effects belong in the policy calculation.",
		uncertaintySummary:
			"Strong quasi-experiments improve causal inference, but effects differ by jurisdiction, defendant, judge behavior, outcome definition, and follow-up.",
		sources: sources([
			["systematic_review", "The downstream consequences of pretrial detention: a systematic review and meta-analysis", "Justice Quarterly", 2024, "10.1080/07418825.2023.2193624", "Synthesis of detention effects across case, recidivism, and socioeconomic outcomes."],
			["landmark_study", "The Effects of Pretrial Detention on Conviction, Future Crime, and Employment: Evidence from Randomly Assigned Judges", "American Economic Review", 2018, "10.1257/aer.20161503", "Judge-assignment design finding effects on conviction, employment, and later offending."],
			["landmark_study", "The Unintended Impact of Pretrial Detention on Case Outcomes: Evidence from New York City Arraignments", "The Journal of Law and Economics", 2017, "10.1086/695285", "Quasi-experimental study linking detention to guilty outcomes and future criminal-justice contact."]
		])
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Does reducing cash bail clearly increase crime?",
		slug: "does-reducing-cash-bail-clearly-increase-crime",
		consensusBand: "mixed",
		confidenceScore: 66,
		evidenceCertainty: "low",
		bottomLine:
			"No general inevitable increase has been established. Evaluations of specific bail reforms often find small or no average crime changes, while some jurisdictions or subgroups show different estimates. Results depend on who is released, support and supervision, police and court practice, the comparison period, and concurrent shocks such as the pandemic.",
		stableCore: [
			"Bail reform is not one treatment: eligibility, judicial discretion, risk rules, reminders, services, and detention capacity differ.",
			"Interrupted time series and local natural experiments can be strongly affected by simultaneous policy and social changes.",
			"Failure to appear, rearrest, serious violence, case disposition, detention harm, and equity are distinct outcomes."
		],
		openQuestions: [
			"Which release supports preserve court appearance and safety for higher-need defendants?",
			"How do effects vary by charge, prior history, neighborhood, policing, implementation, and time horizon?"
		],
		whatWouldChangeMinds: [
			"Convergent multicity causal evidence showing substantial violent-crime increases from comparable reforms.",
			"Convergent evidence showing no public-safety tradeoff in any risk group under broad release policies."
		],
		misconceptions: [
			"One city's reform cannot establish a universal national effect.",
			"A rearrest is not identical to a conviction or a serious violent offense.",
			"Disagreement about effect size is not evidence that detention has no costs."
		],
		editorSummary:
			"Ask which reform, population, outcome, and counterfactual; the evidence does not support a single automatic crime verdict for all cash-bail reductions.",
		uncertaintySummary:
			"Policy heterogeneity, rare serious outcomes, shifting enforcement, spillovers, pandemic timing, and contested causal designs keep this an active evidence question.",
		sources: sources([
			["systematic_review", "The downstream consequences of pretrial detention: a systematic review and meta-analysis", "Justice Quarterly", 2024, "10.1080/07418825.2023.2193624", "Synthesis of detention effects that frames the case, recidivism, and socioeconomic tradeoffs relevant to release policy.", "context"],
			["landmark_study", "Does Bail Reform Increase Crime in New York State: Evidence from Interrupted Time-Series Analyses and Synthetic Control Methods", "Justice Quarterly", 2024, "10.1080/07418825.2023.2209145", "State-level analysis finding negligible overall crime effects while discussing pandemic and design limitations."],
			["landmark_study", "Does Cash Bail Deter Misconduct?", "American Economic Journal: Applied Economics", 2023, "10.1257/app.20210349", "Quasi-experimental evidence finding no deterrent effect of financial collateral on court appearance or pretrial crime in the studied reform context."]
		])
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Do focused-deterrence strategies reduce serious crime?",
		slug: "do-focused-deterrence-strategies-reduce-serious-crime",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"Focused deterrence—concentrating communication, enforcement, and services on the small groups driving serious violence—has reduced crime in many evaluations. The average effect is favorable, but randomized evidence is limited and success depends on analysis, community legitimacy, service delivery, restraint, and implementation rather than enforcement alone.",
		stableCore: [
			"Systematic reviews find statistically significant, moderate reductions across many programs.",
			"Strategies combine credible consequences with direct communication, community moral voices, and offers of support.",
			"Weak identification, regression to the mean, changing violence trends, and program bundles complicate causal attribution."
		],
		openQuestions: [
			"Which components and governance safeguards produce durable benefit without discriminatory or destabilizing enforcement?",
			"How well do programs transfer beyond the cities, networks, and leadership conditions in influential studies?"
		],
		whatWouldChangeMinds: [
			"Stronger randomized or synthetic-control evaluations consistently finding no reduction or harmful displacement.",
			"Evidence that service-centered or place-based alternatives outperform focused deterrence with fewer legitimacy costs."
		],
		misconceptions: [
			"Focused deterrence is not indiscriminate saturation policing.",
			"A favorable average does not certify every program using the name.",
			"Enforcement without credible support and procedural fairness is not the full model."
		],
		editorSummary:
			"Focused deterrence is promising and evidence-backed, but it is a coordinated strategy whose precision, services, legitimacy, and evaluation determine success.",
		uncertaintySummary:
			"Quasi-experimental studies dominate and publication bias is possible; program components and implementation vary enough to limit one effect estimate.",
		sources: sources([
			["systematic_review", "Focused deterrence strategies effects on crime: A systematic review", "Campbell Systematic Reviews", 2019, "10.1002/cl2.1051", "Updated systematic review finding a moderate favorable average across focused-deterrence programs."],
			["meta_analysis", "Focused Deterrence Strategies and Crime Control: An Updated Systematic Review and Meta-Analysis of the Empirical Evidence", "Criminology & Public Policy", 2018, "10.1111/1745-9133.12353", "Updated quantitative synthesis examining program type, design strength, and effect magnitude."],
			["meta_analysis", "The Effects of Focused Deterrence Strategies on Crime: A Systematic Review and Meta-Analysis of the Empirical Evidence", "Journal of Research in Crime and Delinquency", 2012, "10.1177/0022427811419368", "Influential synthesis establishing the favorable direction and limits of the earlier evidence base."]
		])
	}),
	reviewedClaim({
		topicSlug: "crime-and-justice",
		title: "Does solitary confinement harm mental health?",
		slug: "does-solitary-confinement-harm-mental-health",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Prolonged isolation is associated with psychological distress, anxiety, depression, perceptual disturbance, self-harm, and elevated post-release risk, with particular danger for people who already have mental illness. Exact causal effect sizes are difficult because placement is not random, but converging evidence and plausible mechanisms support harm.",
		stableCore: [
			"Isolation removes social contact, meaningful activity, environmental variation, and perceived control—conditions needed for psychological functioning.",
			"Systematic reviews, within-person patterns, administrative cohorts, and clinical observations converge on adverse outcomes.",
			"Duration, conditions, baseline illness, age, uncertainty, and access to care modify severity."
		],
		openQuestions: [
			"What exposure thresholds, conditions, and individual factors drive persistent rather than transient harm?",
			"Which safer alternatives manage acute danger while reducing isolation, injury, and staff risk?"
		],
		whatWouldChangeMinds: [
			"Strong longitudinal evidence finding no symptom, self-harm, or mortality increase after robust control for selection and baseline health.",
			"Evidence that humane, time-limited isolation with intensive contact has outcomes equivalent to less restrictive alternatives."
		],
		misconceptions: [
			"Difficulty estimating an exact causal number does not make converging harm evidence disappear.",
			"People with prior mental illness can be both more likely to be isolated and more vulnerable to its effects.",
			"A label such as administrative segregation does not determine actual sensory and social conditions."
		],
		editorSummary:
			"The relevant consensus is not that every person responds identically; it is that prolonged severe isolation carries a serious, preventable mental-health risk.",
		uncertaintySummary:
			"Nonrandom placement and varied definitions complicate magnitude, but multiple designs and outcomes converge strongly on harm, especially with longer exposure and vulnerability.",
		sources: sources([
			["systematic_review", "Shedding Light on the 'Hole': A Systematic Review and Meta-Analysis on Adverse Psychological Effects and Mortality Following Solitary Confinement in Correctional Settings", "Frontiers in Psychiatry", 2020, "10.3389/fpsyt.2020.00840", "Systematic review and meta-analysis of psychological and mortality outcomes linked to isolation."],
			["landmark_study", "Solitary Confinement and Risk of Self-Harm Among Jail Inmates", "American Journal of Public Health", 2014, "10.2105/AJPH.2013.301742", "Large administrative cohort finding a strong association between isolation and potentially fatal self-harm."],
			["landmark_study", "Solitary confinement placement and post-release mortality risk among formerly incarcerated individuals: a population-based study", "The Lancet Public Health", 2020, "10.1016/S2468-2667(19)30271-3", "Population cohort linking solitary-confinement exposure with higher mortality after release."]
		])
	})
];
