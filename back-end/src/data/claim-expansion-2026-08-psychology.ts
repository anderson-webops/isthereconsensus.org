import type { SeedClaim } from "./claims.js";
import { august2026ReviewedClaim as reviewedClaim } from "./claim-expansion-2026-08-shared.js";

export const august2026PsychologyClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "neuroscience-and-psychology",
		title: "Can polygraph tests reliably detect lies?",
		slug: "can-polygraph-tests-reliably-detect-lies",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "moderate",
		bottomLine:
			"Polygraphs measure physiological arousal, not deception itself. Carefully structured tests about a specific known event can classify above chance under some research conditions, but error rates, examiner judgment, countermeasures, and differences between laboratory and real-world stakes prevent a result from proving that someone lied. Broad employee or security screening is especially vulnerable to false positives.",
		stableCore: [
			"Heart rate, blood pressure, breathing, and skin conductance can change for many reasons other than lying.",
			"Accuracy estimates depend strongly on test format, question construction, scoring, examinee selection, and whether ground truth is actually known.",
			"Specific-incident testing performs better than screening large groups for an unknown act or trait.",
			"An anxious truthful person can appear deceptive, while a deceptive person can sometimes reduce or manipulate measured responses."
		],
		openQuestions: [
			"How well do newer automated scoring and multimodal methods generalize to high-stakes field settings with verified ground truth?",
			"Can any screening design reach a false-positive rate acceptable for rare threats in large populations?"
		],
		whatWouldChangeMinds: [
			"Independent, preregistered field studies with known truth showing consistently high sensitivity and specificity across examiners, populations, and countermeasures.",
			"A validated physiological marker specific to intentional deception rather than general arousal, fear, effort, or surprise."
		],
		misconceptions: [
			"A machine trace does not directly record whether a statement is true.",
			"Above-chance average accuracy does not make an individual result conclusive.",
			"Even a fairly accurate test can falsely accuse many people when the screened behavior is rare."
		],
		editorSummary:
			"The fair answer is neither 'pure coin flip' nor 'lie detector.' Some specific-event protocols extract useful information, but the measurement is indirect and too context-sensitive to support the certainty often implied in policing, employment, or entertainment.",
		uncertaintySummary:
			"Estimates vary because studies use different formats, scorers, incentives, and definitions of truth. Laboratory accuracy and selected criminal cases do not resolve the much harder population-screening problem.",
		sources: [
			{
				kind: "consensus_statement",
				title: "The Polygraph and Lie Detection",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2003,
				url: "https://nap.nationalacademies.org/catalog/10420/the-polygraph-and-lie-detection",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Independent assessment concluding that specific-incident tests discriminate above chance but below perfection and that evidence is especially weak for employee security screening.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "A comprehensive meta-analysis of comparison question polygraph test accuracy",
				publisher: "Applied Cognitive Psychology",
				year: 2021,
				url: "https://doi.org/10.1002/acp.3779",
				doi: "10.1002/acp.3779",
				appraisal: "moderate",
				stance: "context",
				note: "Modern synthesis quantifying above-chance classification while showing that method, study quality, and field-versus-laboratory context materially affect estimates.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Neurophysiological Approaches to Lie Detection: A Systematic Review",
				publisher: "Brain Sciences",
				year: 2025,
				url: "https://doi.org/10.3390/brainsci15050519",
				doi: "10.3390/brainsci15050519",
				appraisal: "moderate",
				stance: "context",
				note: "Review of polygraph and newer brain-based methods emphasizing indirect measurement, heterogeneous validation, countermeasures, and limited forensic generalizability.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "neuroscience-and-psychology",
		title: "Does single-session psychological debriefing prevent PTSD after trauma?",
		slug: "does-single-session-psychological-debriefing-prevent-ptsd-after-trauma",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. Routinely requiring everyone exposed to trauma to recount emotions and details in a single early debriefing session does not prevent post-traumatic stress disorder and may impede recovery for some people. Humane practical support, monitoring, psychological first aid, and prompt evidence-based treatment for persistent symptoms are different interventions.",
		stableCore: [
			"Randomized trials do not show lower later PTSD rates from one-off individual psychological debriefing.",
			"Some trials found worse symptoms or slower natural recovery in debriefed participants.",
			"Most people show substantial natural recovery after trauma and should not be forced into a uniform emotional-processing session.",
			"Operational team review, voluntary social support, immediate safety, and targeted trauma-focused therapy should not be conflated with compulsory debriefing."
		],
		openQuestions: [
			"Which early, voluntary, stepped-care interventions best identify and help people at high risk without medicalizing normal acute reactions?",
			"How should support be adapted for mass disasters, military units, children, and repeated occupational exposure?"
		],
		whatWouldChangeMinds: [
			"Large modern randomized trials showing that a clearly specified single-session debriefing protocol reduces diagnosed PTSD without worsening other outcomes.",
			"Evidence identifying a reproducible high-risk subgroup for whom immediate debriefing has benefits exceeding harms."
		],
		misconceptions: [
			"Not recommending compulsory debriefing does not mean abandoning people after trauma.",
			"A practical incident review for learning and safety is not the same as mandatory emotional recounting intended to prevent PTSD.",
			"Feeling relieved immediately after a session does not establish better long-term mental-health outcomes."
		],
		editorSummary:
			"The intervention was plausible and well intentioned, but outcome trials did not support it. Early care should prioritize safety, practical needs, choice, connection, monitoring, and access to proven treatment when symptoms persist.",
		uncertaintySummary:
			"The conclusion applies most directly to routine, one-session individual debriefing offered to all trauma survivors. It should not be overextended to every form of peer support, psychological first aid, or structured occupational review.",
		sources: [
			{
				kind: "guideline",
				title: "Post-traumatic stress disorder: NICE guideline recommendations",
				publisher: "National Institute for Health and Care Excellence",
				year: 2018,
				url: "https://www.nice.org.uk/guidance/ng116/chapter/recommendations",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Current clinical guideline advising against psychologically focused debriefing for prevention or treatment of PTSD and recommending active monitoring or trauma-focused care when indicated.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Psychological debriefing for preventing post traumatic stress disorder (PTSD)",
				publisher: "Cochrane",
				year: 2002,
				url: "https://doi.org/10.1002/14651858.CD000560",
				doi: "10.1002/14651858.CD000560",
				appraisal: "high",
				stance: "supports",
				note: "Randomized-trial review finding no evidence that one-session debriefing prevents PTSD and evidence that it may be harmful for some participants.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Guidelines for the Management of Conditions Specifically Related to Stress",
				publisher: "World Health Organization",
				year: 2013,
				url: "https://www.who.int/publications/i/item/9789241505406",
				appraisal: "high",
				stance: "supports",
				note: "International guidance against psychological debriefing after recent trauma while supporting practical, non-intrusive assistance and evidence-based care for persistent disorders.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "neuroscience-and-psychology",
		title: "Do commercial brain-training games produce broad, lasting cognitive improvements?",
		slug: "do-commercial-brain-training-games-produce-broad-lasting-cognitive-improvements",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"Brain-training games reliably improve performance on the practiced game and sometimes on closely related tasks, but evidence for broad, durable transfer to everyday reasoning, memory, school performance, or protection from dementia is weak and inconsistent. Structured cognitive training used in research should not be treated as proof for every commercial app or marketing claim.",
		stableCore: [
			"Practice effects are real: repeated exposure makes people better at the trained task.",
			"Near transfer to highly similar tasks occurs more often than far transfer to different abilities or daily functioning.",
			"Active control groups are essential because expectancy, engagement, test familiarity, and contact can mimic improvement.",
			"Physical activity, cardiovascular risk management, education, sleep, and social engagement have broader health rationales than relying on a game to prevent cognitive decline."
		],
		openQuestions: [
			"Which training features, doses, and participant characteristics produce meaningful daily-life benefits rather than test-specific gains?",
			"Do any effects persist for years and reduce clinically important cognitive impairment or loss of independence?"
		],
		whatWouldChangeMinds: [
			"Independent, preregistered trials with active controls showing durable improvement across untrained abilities and real-world outcomes.",
			"Long-term evidence that a specified commercial program reduces incident cognitive impairment or functional decline."
		],
		misconceptions: [
			"Getting better at a brain game does not automatically mean becoming broadly smarter.",
			"A statistically detectable change on a similar test may be too small to matter in daily life.",
			"Evidence that some cognitive training helps a defined group does not validate all apps, doses, or dementia-prevention advertising."
		],
		editorSummary:
			"The central distinction is trained performance versus general ability. Commercial games can be enjoyable and can sharpen practiced skills, but their broad claims typically outrun evidence for far transfer and long-term function.",
		uncertaintySummary:
			"Results vary with training type, outcome selection, control condition, age, and study quality. Some targeted programs may yield modest transfer, but that is narrower than a class-wide promise of lasting cognitive enhancement.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Preventing Cognitive Decline and Dementia: A Way Forward",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2017,
				url: "https://nap.nationalacademies.org/catalog/24782/preventing-cognitive-decline-and-dementia-a-way-forward",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "Independent assessment finding encouraging but inconclusive evidence for cognitive training and insufficient evidence for strong public-health claims about preventing decline or dementia.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Near and Far Transfer in Cognitive Training: A Second-Order Meta-Analysis",
				publisher: "Collabra: Psychology",
				year: 2019,
				url: "https://doi.org/10.1525/collabra.203",
				doi: "10.1525/collabra.203",
				appraisal: "high",
				stance: "supports",
				note: "Meta-analysis of meta-analyses finding small near-transfer effects and little convincing evidence of broad far transfer after accounting for design quality.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Commercially Available Brain Training Programs: A Systematic Review and Meta-Analysis",
				publisher: "Neuropsychology Review",
				year: 2021,
				url: "https://doi.org/10.1007/s11065-021-09515-2",
				doi: "10.1007/s11065-021-09515-2",
				appraisal: "moderate",
				stance: "context",
				note: "Commercial-program synthesis reporting some cognitive effects but substantial heterogeneity and limitations in active controls, durability, and real-world outcomes.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "neuroscience-and-psychology",
		title: "Is sexual-orientation conversion therapy effective and safe?",
		slug: "is-sexual-orientation-conversion-therapy-effective-and-safe",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "moderate",
		bottomLine:
			"No credible evidence shows that conversion efforts can reliably change a person's sexual orientation, and professional reviews find meaningful risk of shame, depression, anxiety, damaged relationships, and suicidality. Supportive counseling that helps someone explore identity, values, distress, or relationships without a predetermined orientation-change goal is different.",
		stableCore: [
			"Sexual orientation is not classified as a disorder requiring cure.",
			"Claims of successful change rely heavily on self-selected reports, shifting definitions, suppression of behavior, or changes in identity labels rather than demonstrated orientation change.",
			"Survivor studies and clinical reviews consistently identify potential psychological and social harms, especially when efforts are coercive or tied to rejection.",
			"Affirming, client-led care can address depression, anxiety, faith conflict, family strain, or unwanted behavior without promising to change orientation."
		],
		openQuestions: [
			"How can long-term harms be measured rigorously when randomized exposure to a potentially harmful practice would be unethical?",
			"Which culturally responsive supports best help people facing conflict among identity, family, community, and religious commitments?"
		],
		whatWouldChangeMinds: [
			"Ethically obtained, independently replicated prospective evidence of durable orientation change with validated measures and no excess harm.",
			"Evidence that current harm findings disappear after strong control for preexisting distress, coercion, family rejection, and selection effects."
		],
		misconceptions: [
			"Choosing celibacy or changing behavior is not evidence that underlying orientation was therapeutically changed.",
			"Exploring identity without pressure toward a predetermined outcome is not conversion therapy.",
			"The observational nature of much harm research warrants careful causal language, not dismissal of consistent warning signals and ethical concerns."
		],
		editorSummary:
			"The evidence base cannot ethically include the kind of randomized trials used for ordinary treatments, but its limitations do not create evidence of effectiveness. Professional consensus instead supports noncoercive, identity-respecting care for the distress people actually experience.",
		uncertaintySummary:
			"Exact causal effect sizes for harms are limited by retrospective designs, selection, and co-occurring rejection. The lack of credible efficacy evidence, consistent harm signals, and ethical problems make the practical conclusion strong.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Report of the American Psychological Association Task Force on Appropriate Therapeutic Responses to Sexual Orientation",
				publisher: "American Psychological Association",
				year: 2009,
				url: "https://www.apa.org/pi/lgbt/resources/therapeutic-response.pdf",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Professional evidence review finding insufficient evidence that sexual-orientation change efforts work and documenting risks, ethical concerns, and an affirmative therapeutic approach.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Sexual orientation change efforts: A systematic review and a proposal for evidence-based practice",
				publisher: "Clinical Psychology: Science and Practice",
				year: 2020,
				url: "https://doi.org/10.1111/cpsp.12377",
				doi: "10.1111/cpsp.12377",
				appraisal: "moderate",
				stance: "supports",
				note: "Systematic review finding no methodologically credible evidence of reliable orientation change and substantial concern about adverse outcomes.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "History and Iatrogenic Effects of Conversion Therapy",
				publisher: "Annual Review of Clinical Psychology",
				year: 2024,
				url: "https://doi.org/10.1146/annurev-clinpsy-080822-052144",
				doi: "10.1146/annurev-clinpsy-080822-052144",
				appraisal: "high",
				stance: "supports",
				note: "Recent clinical review synthesizing the practice's history, lack of credible therapeutic benefit, pathways of iatrogenic harm, and implications for care.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "neuroscience-and-psychology",
		title: "Is neurofeedback an established effective treatment for ADHD?",
		slug: "is-neurofeedback-an-established-effective-treatment-for-adhd",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"Neurofeedback is not established as an effective stand-alone treatment for core ADHD symptoms. A 2024 meta-analysis of 38 randomized trials found no meaningful overall symptom benefit when outcomes were rated by people probably blinded to treatment, although some standard protocols and cognitive measures showed small signals that justify continued research.",
		stableCore: [
			"Neurofeedback trains participants using real-time signals derived from brain electrical activity, but protocols and control conditions vary substantially.",
			"Unblinded parent or participant ratings tend to show larger effects than probably blinded ratings, making expectancy and nonspecific treatment effects important.",
			"The latest broad synthesis found essentially no overall effect on blinded total ADHD symptoms and no consistent benefit across most neuropsychological outcomes.",
			"Evidence-based behavioral supports and approved medication options should not be displaced by an expensive intervention with uncertain clinical benefit."
		],
		openQuestions: [
			"Can a biologically verified learning response identify a subgroup likely to benefit from a specific standard protocol?",
			"Do small protocol-specific or processing-speed effects persist and translate into meaningful school, home, or occupational functioning?"
		],
		whatWouldChangeMinds: [
			"Large multisite trials with credible sham controls and blinded outcomes showing clinically meaningful, durable symptom and functional benefits.",
			"Prospective evidence that treatment response tracks successful regulation of the intended neural target rather than expectation or therapist contact."
		],
		misconceptions: [
			"A treatment involving brain signals is not automatically more objective or effective than behavioral care.",
			"Improvement reported by someone who knows treatment was received can be genuine yet still fail to establish a specific neurofeedback effect.",
			"An average lack of established benefit does not prove that no individual ever improves."
		],
		editorSummary:
			"Neurofeedback remains scientifically interesting, but the strongest blinded synthesis does not support presenting it as established ADHD care. Protocol-specific hints should motivate better trials, not stronger marketing.",
		uncertaintySummary:
			"Moderate certainty supports little or no average effect on blinded core symptoms. Heterogeneous protocols, imperfect blinding, small studies, and possible responder subgroups leave room for targeted research.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Neurofeedback for Attention-Deficit/Hyperactivity Disorder: A Systematic Review and Meta-Analysis",
				publisher: "JAMA Psychiatry",
				year: 2024,
				url: "https://doi.org/10.1001/jamapsychiatry.2024.3702",
				doi: "10.1001/jamapsychiatry.2024.3702",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Synthesis of 38 randomized trials and 2,472 participants finding no meaningful overall effect on probably blinded total symptoms and only limited protocol-specific signals.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Clinical Practice Guideline for the Diagnosis, Evaluation, and Treatment of Attention-Deficit/Hyperactivity Disorder in Children and Adolescents",
				publisher: "American Academy of Pediatrics",
				year: 2019,
				url: "https://publications.aap.org/pediatrics/article/144/4/e20192528/81590/Clinical-Practice-Guideline-for-the-Diagnosis",
				doi: "10.1542/peds.2019-2528",
				appraisal: "high",
				stance: "context",
				note: "Practice anchor for established ADHD diagnosis and treatment options, providing the standard against which adjunctive neurofeedback claims should be compared.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Treatments for ADHD in Children and Adolescents: A Systematic Review",
				publisher: "Pediatrics",
				year: 2024,
				url: "https://publications.aap.org/pediatrics/article/153/4/e2024065787/196922/Treatments-for-ADHD-in-Children-and-Adolescents-A",
				appraisal: "high",
				stance: "context",
				note: "Broad treatment review placing neurofeedback alongside better-established medication and psychosocial approaches and documenting uncertainty in comparative outcomes.",
				order: 3
			}
		]
	})
];
