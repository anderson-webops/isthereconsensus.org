import type { SeedClaim } from "./claims.js";
import { july2026EvolutionClaims } from "./claim-expansion-2026-07-evolution.js";
import { july2026ReviewedClaim as reviewedClaim } from "./claim-expansion-2026-07-shared.js";

const crossTopicClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Do routine childhood vaccines overwhelm or weaken the immune system?",
		slug: "do-routine-childhood-vaccines-overwhelm-or-weaken-the-immune-system",
		consensusBand: "strong",
		confidenceScore: 98,
		bottomLine:
			"No. The routine childhood schedule does not overwhelm or weaken a healthy immune system. Children encounter far more antigens through ordinary life than through vaccines, and comparative studies have not found that cumulative vaccine-antigen exposure increases later infections unrelated to vaccination. Individual contraindications still matter and should be assessed clinically.",
		stableCore: [
			"Infant immune systems respond to many antigens at once; the modern vaccine schedule uses a small fraction of that capacity.",
			"Receiving several recommended vaccines together has not been shown to cause chronic immune suppression.",
			"A large case-control study found no association between cumulative vaccine-antigen exposure in the first 23 months and non-vaccine-targeted infections from ages two through four.",
			"Spacing or skipping vaccines without a medical reason lengthens the period in which a child remains vulnerable to preventable disease."
		],
		openQuestions: [
			"How can schedule-safety evidence be communicated without dismissing parents who are trying to understand a complex recommendation?",
			"Which children need a modified schedule because of a documented allergy, immune disorder, treatment, or other clinical contraindication?"
		],
		whatWouldChangeMinds: [
			"Replicated, well-controlled evidence that the recommended schedule causes clinically meaningful immune suppression or excess unrelated infections.",
			"A major safety assessment showing that simultaneous vaccination creates harms not detected by current surveillance and comparative studies."
		],
		misconceptions: [
			"More injections do not necessarily mean more immune-system strain; today's vaccines contain fewer total antigens than older schedules.",
			"A fever or short-lived immune response after vaccination is not the same as a weakened immune system.",
			"An alternative schedule is not automatically safer merely because it spreads doses out."
		],
		editorSummary:
			"The durable answer is that routine vaccination trains rather than exhausts the immune system. The useful caveat is clinical: a small number of children have genuine contraindications, but that is not evidence that the schedule broadly overwhelms healthy children.",
		uncertaintySummary:
			"The central safety conclusion is high-confidence. Remaining uncertainty concerns rare adverse events, particular medical contraindications, and the best ways to study combinations as schedules evolve—not a general immune-overload effect.",
		sources: [
			{
				kind: "guideline",
				title: "Multiple Vaccines at Once",
				publisher: "Centers for Disease Control and Prevention",
				url: "https://www.cdc.gov/vaccine-safety/about/multiples.html",
				isAnchor: true,
				stance: "supports",
				note: "Current public-health guidance explaining why simultaneous recommended vaccines are tested for safety and do not overwhelm a child's immune system.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Association Between Estimated Cumulative Vaccine Antigen Exposure Through the First 23 Months of Life and Non-Vaccine-Targeted Infections From 24 Through 47 Months of Age",
				publisher: "JAMA",
				year: 2018,
				url: "https://consensus.app/papers/association-between-estimated-cumulative-vaccine-glanz-newcomer/2131ef6d6617579e834266aa0d4c7105/",
				stance: "supports",
				note: "Case-control evidence in 944 children finding no increased risk of later infections unrelated to vaccines as cumulative early-life vaccine-antigen exposure increased.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "The Childhood Immunization Schedule and Safety: Stakeholder Concerns, Scientific Evidence, and Future Studies",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2013,
				url: "https://nap.nationalacademies.org/catalog/13563/the-childhood-immunization-schedule-and-safety-stakeholder-concerns-scientific-evidence",
				stance: "supports",
				note: "Independent schedule-level review finding no evidence that the recommended schedule is unsafe while identifying useful priorities for continued monitoring.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Is water vapor the main cause of current global warming?",
		slug: "is-water-vapor-the-main-cause-of-current-global-warming",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"No. Water vapor is the most abundant greenhouse gas and strongly amplifies warming, but it acts mainly as a feedback in current climate change. Long-lived gases such as carbon dioxide initiate warming; warmer air then holds more water vapor, which adds further warming.",
		stableCore: [
			"Atmospheric water vapor responds quickly to temperature and precipitation, so it does not accumulate independently for centuries like carbon dioxide.",
			"Human-added carbon dioxide raises temperature and allows the atmosphere to retain more water vapor.",
			"Water-vapor feedback roughly doubles the warming response to carbon dioxide when considered on its own."
		],
		openQuestions: [
			"How will clouds and regional humidity patterns shape the exact strength of feedback as warming continues?",
			"How do short-term water-vapor variations interact with circulation changes and extreme rainfall?"
		],
		whatWouldChangeMinds: [
			"Observations showing that recent tropospheric water-vapor increases precede and drive warming independently of long-lived forcing.",
			"A physically consistent energy-budget account in which rising carbon dioxide is not needed to explain the trend."
		],
		misconceptions: [
			"Calling water vapor a feedback does not mean it is unimportant; it substantially amplifies initial warming.",
			"The largest natural greenhouse contribution is not necessarily the factor driving a recent change.",
			"Direct human water-vapor emissions are small and short-lived compared with the temperature-driven global response."
		],
		editorSummary:
			"This page clarifies the crucial difference between what sustains Earth's natural greenhouse effect and what is driving its present change.",
		uncertaintySummary:
			"The feedback mechanism and direction are high-confidence. Its exact regional strength depends on clouds, circulation, altitude, and the warming pattern.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Steamy Relationships: How Atmospheric Water Vapor Amplifies Earth's Greenhouse Effect",
				publisher: "NASA",
				year: 2022,
				url: "https://science.nasa.gov/earth/climate-change/steamy-relationships-how-atmospheric-water-vapor-amplifies-earths-greenhouse-effect/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Plain-language institutional explanation of water vapor as a rapid feedback that amplifies warming initiated by long-lived greenhouse gases.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Climate Change 2021: The Physical Science Basis, Chapter 7",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-7/",
				appraisal: "high",
				stance: "supports",
				note: "Assessment anchor for radiative forcing, climate feedbacks, water-vapor response, and equilibrium climate sensitivity.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Water Vapor Feedback and Global Warming",
				publisher: "Annual Review of Energy and the Environment",
				year: 2000,
				url: "https://doi.org/10.1146/annurev.energy.25.1.441",
				doi: "10.1146/annurev.energy.25.1.441",
				appraisal: "high",
				stance: "supports",
				note: "Foundational review explaining why water vapor amplifies carbon-dioxide-driven warming rather than replacing the initiating forcing.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Do high-protein diets damage kidney function in healthy adults?",
		slug: "do-high-protein-diets-damage-kidney-function-in-healthy-adults",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 80,
		evidenceCertainty: "moderate",
		bottomLine:
			"For healthy adults without kidney disease, controlled trials do not show that moderately high-protein diets damage kidney function over the periods studied. Higher protein can increase filtration as a normal adaptation. Evidence is thinner for very high intakes over many years, and people with kidney disease may need different limits.",
		stableCore: [
			"Randomized trials in healthy adults do not show worse measured kidney function on higher-protein diets than on normal or lower-protein diets.",
			"An increase in glomerular filtration after more protein is not by itself proof of injury.",
			"Advice for chronic kidney disease cannot be automatically applied to healthy kidneys, and healthy-adult findings should not be generalized to diagnosed disease."
		],
		openQuestions: [
			"What are the effects of very high intake maintained for decades rather than months or a few years?",
			"Do kidney-stone risk, protein source, hypertension, diabetes, or genetic susceptibility modify long-term outcomes?"
		],
		whatWouldChangeMinds: [
			"Long prospective studies showing greater chronic kidney disease incidence in otherwise healthy high-protein consumers after strong confounding control.",
			"Trials demonstrating persistent injury markers or clinically meaningful loss of filtration attributable to protein dose."
		],
		misconceptions: [
			"Advice to restrict protein in established kidney disease does not prove that protein causes disease in healthy kidneys.",
			"Higher filtration can be an adaptive physiological response rather than evidence of damage.",
			"'High protein' varies substantially across studies and does not mean unlimited intake."
		],
		editorSummary:
			"The healthy-adult evidence is reassuring at commonly studied intakes while leaving an honest long-duration boundary.",
		uncertaintySummary:
			"Trials are generally too short to rule out small effects over decades. Existing kidney disease, diabetes, hypertension, stone history, and unusually high intake require separate consideration.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Changes in Kidney Function Do Not Differ between Healthy Adults Consuming Higher- Compared with Lower- or Normal-Protein Diets: A Systematic Review and Meta-Analysis",
				publisher: "The Journal of Nutrition",
				year: 2018,
				url: "https://pubmed.ncbi.nlm.nih.gov/30383278/",
				pmid: "30383278",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Meta-analysis of 28 trials and 1,358 healthy adults finding no adverse difference in glomerular filtration between higher- and lower-protein diets.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "International Society of Sports Nutrition Position Stand: protein and exercise",
				publisher: "Journal of the International Society of Sports Nutrition",
				year: 2017,
				url: "https://pubmed.ncbi.nlm.nih.gov/28642676/",
				pmid: "28642676",
				appraisal: "moderate",
				stance: "context",
				note: "Position statement reviewing protein needs and safety evidence in healthy exercising people while distinguishing them from kidney-disease populations.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Healthy Eating for Adults with Chronic Kidney Disease",
				publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
				year: 2026,
				url: "https://www.niddk.nih.gov/health-information/kidney-disease/chronic-kidney-disease-ckd/eating-nutrition",
				appraisal: "high",
				stance: "context",
				note: "Clinical context showing why protein targets must be individualized once kidney disease is present rather than generalized from healthy-adult data.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "neuroscience-and-psychology",
		title: "Does psychotherapy help adults with depression?",
		slug: "does-psychotherapy-help-adults-with-depression",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Several structured psychotherapies reduce depressive symptoms and increase the chance of response or remission compared with usual care or control conditions. Average effects are meaningful but not universal, and treatment choice should reflect severity, preference, access, prior response, and safety needs.",
		stableCore: [
			"Cognitive behavioral, behavioral activation, interpersonal, problem-solving, psychodynamic, and related structured therapies all have supporting trial evidence.",
			"No single therapy is best for every adult, and differences among established approaches are usually smaller than differences in fit, access, and completion.",
			"Severe depression, psychosis, mania, or immediate self-harm risk can require medication, urgent care, or more intensive treatment in addition to psychotherapy."
		],
		openQuestions: [
			"Which personal and clinical factors can reliably match an individual to the most effective therapy and delivery format?",
			"How can health systems preserve quality while expanding digital, group, brief, and primary-care delivery?"
		],
		whatWouldChangeMinds: [
			"Large low-bias trials showing that established psychotherapies do not improve patient-important outcomes over credible controls.",
			"Replicated evidence that apparent effects are explained primarily by selective publication or nonspecific contact."
		],
		misconceptions: [
			"Psychotherapy is not simply casual conversation; evidence-based therapies use structured methods and goals.",
			"An average benefit does not mean everyone responds or that a patient failed by remaining depressed.",
			"Evidence for psychotherapy does not imply that antidepressant medication is unnecessary or inferior in every case."
		],
		editorSummary:
			"This page conveys both the broad treatment consensus and the reality that depression care is preference-sensitive and often multimodal.",
		uncertaintySummary:
			"Effects vary with comparator, severity, therapist and treatment fidelity, comorbidity, follow-up length, and publication bias. The overall benefit conclusion is robust.",
		sources: [
			{
				kind: "guideline",
				title: "Depression in adults: treatment and management",
				publisher: "National Institute for Health and Care Excellence",
				year: 2022,
				url: "https://www.nice.org.uk/guidance/ng222",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Evidence-based guideline offering several psychological treatments according to severity, preference, prior response, and clinical context.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Psychotherapies for depression: a network meta-analysis covering efficacy, acceptability and long-term outcomes of all main treatment types",
				publisher: "World Psychiatry",
				year: 2021,
				url: "https://pubmed.ncbi.nlm.nih.gov/34002502/",
				pmid: "34002502",
				appraisal: "high",
				stance: "supports",
				note: "Network meta-analysis of 331 randomized trials and 34,285 patients finding the main psychotherapy types efficacious and acceptable.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Clinical Practice Guideline for the Treatment of Depression Across Three Age Cohorts",
				publisher: "American Psychological Association",
				year: 2019,
				url: "https://www.apa.org/depression-guideline",
				appraisal: "high",
				stance: "context",
				note: "Professional guideline context for evidence-based psychotherapy and medication choices across adult age groups.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Are unapproved stem-cell treatments proven safe and effective for most advertised conditions?",
		slug: "are-unapproved-stem-cell-treatments-proven-safe-and-effective-for-most-advertised-conditions",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. Clinics market unapproved stem-cell or regenerative products for many unrelated conditions without adequate evidence of safety or benefit. Legitimate stem-cell treatments exist for a limited set of blood and immune disorders, and other uses may be tested in regulated trials, but those facts do not validate commercial cure-all claims.",
		stableCore: [
			"An approved cell therapy is specific to a product, cell type, indication, manufacturing process, and route—not a general endorsement of 'stem cells.'",
			"Regulators have received reports of blindness, tumors, infections, neurologic events, immune reactions, and other serious harms from unapproved products.",
			"Being listed on ClinicalTrials.gov or using a patient's own cells does not establish regulatory approval, safety, or effectiveness."
		],
		openQuestions: [
			"Which investigational cell therapies will prove beneficial for particular diseases after controlled trials?",
			"Which regulatory and enforcement approaches best protect patients without blocking responsible innovation?"
		],
		whatWouldChangeMinds: [
			"Condition-specific controlled trials showing reproducible benefits and acceptable harms for a currently unapproved product.",
			"Independent manufacturing and regulatory review establishing product identity, quality, and clinically meaningful efficacy."
		],
		misconceptions: [
			"'Natural' or 'your own cells' does not guarantee sterility, correct cell behavior, or safety.",
			"A real scientific field can coexist with commercial treatments that run far ahead of its evidence.",
			"Charging patients or registering a study does not make an intervention an approved clinical trial."
		],
		editorSummary:
			"This page distinguishes legitimate regenerative medicine from the broad, unsupported treatment claims used by many commercial clinics.",
		uncertaintySummary:
			"The warning about unapproved broad claims is strong. Individual investigational products must still be judged separately as trial evidence develops.",
		sources: [
			{
				kind: "guideline",
				title: "Important Patient and Consumer Information About Regenerative Medicine Therapies",
				publisher: "U.S. Food and Drug Administration",
				year: 2021,
				url: "https://www.fda.gov/vaccines-blood-biologics/consumers-biologics/important-patient-and-consumer-information-about-regenerative-medicine-therapies",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Regulatory warning describing unapproved marketed products, narrow approved uses, deceptive claims, and reported serious adverse events.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "The ISSCR Guide to Stem Cell Treatments",
				publisher: "International Society for Stem Cell Research",
				year: 2024,
				url: "https://www.isscr.org/s/ISSCR_PatientHandbook_v12_Feb2024_Redesign_v4b.pdf",
				appraisal: "high",
				stance: "supports",
				note: "Patient guide distinguishing approved, investigational, and unproven interventions and warning against one product marketed for many unrelated diseases.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Concise Review: A Comprehensive Analysis of Reported Adverse Events in Patients Receiving Unproven Stem Cell-Based Interventions",
				publisher: "Stem Cells Translational Medicine",
				year: 2018,
				url: "https://pubmed.ncbi.nlm.nih.gov/30063299/",
				doi: "10.1002/sctm.17-0282",
				pmid: "30063299",
				pmcid: "PMC6127222",
				appraisal: "moderate",
				stance: "supports",
				note: "Structured review of reported complications demonstrating that unproven interventions can cause serious and diverse harms.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Can genome or exome sequencing improve diagnosis for children with suspected rare genetic disorders?",
		slug: "can-genome-or-exome-sequencing-improve-diagnosis-for-children-with-suspected-rare-genetic-disorders",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. For children with congenital anomalies, developmental delay, intellectual disability, or another suspected rare genetic condition, clinical exome or genome sequencing often produces more diagnoses than older first-line tests and can change care. It does not diagnose every child and can reveal uncertain or incidental findings.",
		stableCore: [
			"Genome-wide sequencing has a substantially higher average diagnostic yield than chromosomal microarray for many pediatric rare-disease presentations.",
			"A molecular diagnosis can alter surveillance, treatment, reproductive counseling, and testing of relatives.",
			"Interpretation depends on phenotype, family samples, ancestry representation, laboratory quality, and periodic reanalysis."
		],
		openQuestions: [
			"When is genome sequencing more cost-effective than exome sequencing plus targeted follow-up?",
			"How can reference databases and interpretation improve for ancestries currently underrepresented in genomic datasets?"
		],
		whatWouldChangeMinds: [
			"Prospective implementation studies showing no diagnostic or management advantage over well-chosen conventional testing.",
			"Evidence that downstream harms and uncertain findings consistently outweigh the clinical utility of earlier sequencing."
		],
		misconceptions: [
			"A negative sequence result does not rule out a genetic disorder.",
			"A variant of uncertain significance is not a confirmed diagnosis.",
			"Consumer ancestry or health-risk testing is not equivalent to clinical genome-wide diagnostic testing."
		],
		editorSummary:
			"This is a mature clinical-genomics use case, presented with its diagnostic power and its interpretation limits together.",
		uncertaintySummary:
			"Yield varies widely by indication and family structure. Structural variants, repeats, mosaicism, noncoding changes, and limited ancestry data can still be missed or misinterpreted.",
		sources: [
			{
				kind: "guideline",
				title: "Exome and genome sequencing for pediatric patients with congenital anomalies or intellectual disability: an evidence-based clinical guideline of the American College of Medical Genetics and Genomics (ACMG)",
				publisher: "Genetics in Medicine",
				year: 2021,
				url: "https://pubmed.ncbi.nlm.nih.gov/34211152/",
				doi: "10.1038/s41436-021-01242-6",
				pmid: "34211152",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "ACMG strongly recommends considering exome or genome sequencing as a first- or second-tier test for pediatric congenital anomalies, developmental delay, or intellectual disability.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Meta-analysis of the diagnostic and clinical utility of genome and exome sequencing and chromosomal microarray in children with suspected genetic diseases",
				publisher: "NPJ Genomic Medicine",
				year: 2018,
				url: "https://pubmed.ncbi.nlm.nih.gov/30002876/",
				doi: "10.1038/s41525-018-0053-8",
				pmid: "30002876",
				pmcid: "PMC6037748",
				appraisal: "high",
				stance: "supports",
				note: "Meta-analysis of 37 studies and 20,068 children finding higher diagnostic yield for genome and exome sequencing than chromosomal microarray.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "The clinical utility of exome and genome sequencing across clinical indications: a systematic review",
				publisher: "Human Genetics",
				year: 2021,
				url: "https://pubmed.ncbi.nlm.nih.gov/34368901/",
				pmid: "34368901",
				appraisal: "moderate",
				stance: "context",
				note: "Review documenting management changes after diagnosis while emphasizing heterogeneous procedures, outcomes, and uncertain variants.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Are multicancer early-detection blood tests proven to reduce cancer deaths in average-risk people?",
		slug: "are-multicancer-early-detection-blood-tests-proven-to-reduce-cancer-deaths-in-average-risk-people",
		status: "published",
		consensusBand: "unclear",
		confidenceScore: 50,
		evidenceCertainty: "very_low",
		reviewMode: "living",
		bottomLine:
			"Not yet. Multicancer blood tests can detect signals from several cancers and often have high specificity, but no completed controlled trial has shown that screening average-risk, symptom-free people with these tests reduces cancer mortality. False positives, missed cancers, overdiagnosis, follow-up procedures, and effects on standard screening remain unresolved.",
		stableCore: [
			"Analytical or diagnostic accuracy is not the same as proof that a screening program saves lives.",
			"Published sensitivity varies substantially by test, cancer type, stage, population, and study design.",
			"People should not abandon established breast, cervical, colorectal, or lung screening because of a multicancer test."
		],
		openQuestions: [
			"Do randomized screening programs reduce late-stage diagnoses or cancer-specific and all-cause mortality?",
			"What diagnostic workups, harms, costs, and inequities follow positive or indeterminate results?"
		],
		whatWouldChangeMinds: [
			"Completed randomized trials showing fewer cancer deaths with an acceptable balance of harms and resource use.",
			"Validated screening pathways demonstrating reliable early-stage sensitivity and manageable false-positive follow-up."
		],
		misconceptions: [
			"Finding cancer-associated DNA in blood does not prove that population screening improves outcomes.",
			"High specificity can still generate many false positives when screening millions of people for uncommon cancers.",
			"A commercial prescription or test result is not equivalent to endorsement by a national screening guideline."
		],
		editorSummary:
			"This is a promising frontier technology whose commercial availability has arrived before mortality-benefit evidence.",
		uncertaintySummary:
			"Test accuracy is heterogeneous, completed benefit trials are absent, and patient-important harms are poorly measured. The page should change as randomized evidence arrives.",
		sources: [
			{
				kind: "consensus_statement",
				title: "What Cancer Screening Tests Check for Cancer?",
				publisher: "National Cancer Institute",
				year: 2024,
				url: "https://www.cancer.gov/about-cancer/screening/screening-tests",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "NCI states that effectiveness of multicancer detection screening in people without symptoms is unknown and requires randomized trials.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Multicancer Detection Tests for Screening: A Systematic Review",
				publisher: "Annals of Internal Medicine",
				year: 2025,
				url: "https://pubmed.ncbi.nlm.nih.gov/40953446/",
				doi: "10.7326/ANNALS-25-01877",
				pmid: "40953446",
				appraisal: "high",
				stance: "context",
				note: "Review through March 2025 finding no completed controlled benefit studies and insufficient evidence to evaluate screening harms or accuracy.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Multi-cancer early detection tests for general population screening: a systematic literature review",
				publisher: "Health Technology Assessment",
				year: 2025,
				url: "https://pubmed.ncbi.nlm.nih.gov/39898371/",
				doi: "10.3310/DLMT1294",
				pmid: "39898371",
				pmcid: "PMC11808444",
				appraisal: "high",
				stance: "context",
				note: "Review of 30 completed studies finding variable accuracy, high risk of bias, no completed randomized trials, and no meaningful mortality or quality-of-life results.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Are biosimilars as safe and effective as their reference biologic medicines?",
		slug: "are-biosimilars-as-safe-and-effective-as-their-reference-biologic-medicines",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes—when they are approved by a stringent regulator for the relevant indications. A biosimilar must be highly similar to its reference biologic with no clinically meaningful differences in safety, purity, or potency. Evidence also supports switching between approved biosimilars and reference products without added safety or immunogenicity risk.",
		stableCore: [
			"Biosimilars are not chemically identical generics, because biologic medicines naturally vary within tightly controlled ranges.",
			"Approval uses the totality of analytical, functional, pharmacokinetic, immunogenicity, and clinical evidence.",
			"'Interchangeable' is a U.S. pharmacy-substitution designation, not a higher level of safety or effectiveness than other approved biosimilars."
		],
		openQuestions: [
			"How can naming, education, procurement, and pharmacovigilance improve patient confidence and traceability?",
			"Where can additional evidence most efficiently support complex switching patterns or underrepresented populations?"
		],
		whatWouldChangeMinds: [
			"Postmarket or randomized evidence of reproducible clinically meaningful differences for approved products.",
			"A failure of comparative manufacturing controls that produces systematic potency, immunogenicity, or safety divergence."
		],
		misconceptions: [
			"A lower price does not mean a lower regulatory standard for clinical performance.",
			"Minor molecular variation occurs between batches of reference biologics as well as between a biosimilar and its reference.",
			"Not having an interchangeable designation does not mean an approved biosimilar is less safe or effective."
		],
		editorSummary:
			"This page explains why biologic similarity is established differently from generic identity while reaching the same practical treatment-confidence conclusion.",
		uncertaintySummary:
			"The class-wide conclusion is strong for approved products, but prescribers still consider indication, formulation, device, patient history, and local substitution rules.",
		sources: [
			{
				kind: "guideline",
				title: "9 Things to Know About Biosimilars and Interchangeable Biosimilars",
				publisher: "U.S. Food and Drug Administration",
				year: 2026,
				url: "https://www.fda.gov/drugs/things-know-about/9-things-know-about-biosimilars-and-interchangeable-biosimilars",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Current regulatory explanation that approved biosimilars have no clinically meaningful safety or effectiveness differences and that interchangeability concerns substitution.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Safety outcomes when switching between biosimilars and reference biologics: A systematic review and meta-analysis",
				publisher: "PLOS ONE",
				year: 2023,
				url: "https://pubmed.ncbi.nlm.nih.gov/37788264/",
				doi: "10.1371/journal.pone.0292231",
				pmid: "37788264",
				pmcid: "PMC10547155",
				appraisal: "high",
				stance: "supports",
				note: "FDA-authored synthesis of 31 studies and 5,252 patients finding no difference in deaths, serious adverse events, discontinuation, or immunogenicity after switching.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Review and Approval of Biosimilar Products",
				publisher: "U.S. Food and Drug Administration",
				year: 2026,
				url: "https://www.fda.gov/drugs/biosimilars/review-and-approval",
				appraisal: "high",
				stance: "context",
				note: "Regulatory-method context for the totality-of-evidence standard, indication extrapolation, and additional substitution requirements.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Can consumer microbiome tests reliably diagnose disease or prescribe personalized diets?",
		slug: "can-consumer-microbiome-tests-reliably-diagnose-disease-or-prescribe-personalized-diets",
		status: "published",
		consensusBand: "unclear",
		confidenceScore: 45,
		evidenceCertainty: "very_low",
		reviewMode: "living",
		bottomLine:
			"Not reliably at present. The microbiome is biologically important, but direct-to-consumer stool tests lack standardized sampling, analysis, healthy reference ranges, and validated links from a result to a diagnosis or personalized diet. Different providers can return substantially different profiles from the same material.",
		stableCore: [
			"Microbiome composition changes with diet, medication, illness, geography, collection, storage, laboratory method, and analytic pipeline.",
			"Research associations between microbes and disease do not automatically create a clinically valid diagnostic test.",
			"Consumers should not start, stop, or replace medical treatment based on a commercial microbiome report."
		],
		openQuestions: [
			"Which standardized microbial or functional markers will become clinically useful for particular diseases or treatment decisions?",
			"Can randomized trials show that microbiome-guided diets outperform simpler evidence-based dietary advice?"
		],
		whatWouldChangeMinds: [
			"Independent validation showing reproducible results across laboratories and accurate diagnosis in intended clinical populations.",
			"Randomized trials showing that test-guided recommendations improve patient-important outcomes over standard care."
		],
		misconceptions: [
			"A detailed species list is not the same as a validated health score or diagnosis.",
			"There is no single universal 'ideal microbiome' established for every healthy person.",
			"An interesting research association does not prove that changing one organism will improve a person's health."
		],
		editorSummary:
			"This page distinguishes the scientific importance of the microbiome from the current clinical validity of consumer testing services.",
		uncertaintySummary:
			"The field is developing rapidly and condition-specific tests may emerge. Current commercial outputs vary in methods, regulation, reproducibility, and evidentiary support.",
		sources: [
			{
				kind: "consensus_statement",
				title: "International consensus statement on microbiome testing in clinical practice",
				publisher: "The Lancet Gastroenterology & Hepatology",
				year: 2025,
				url: "https://pubmed.ncbi.nlm.nih.gov/39647502/",
				doi: "10.1016/S2468-1253(24)00311-X",
				pmid: "39647502",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "International panel finding scarce clinical-usefulness evidence, no proven value for current direct-to-consumer diagnostics, and an urgent need for standardized practice.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Evaluating the analytical performance of direct-to-consumer gut microbiome testing services",
				publisher: "Communications Biology",
				year: 2026,
				url: "https://pubmed.ncbi.nlm.nih.gov/41748906/",
				doi: "10.1038/s42003-025-09301-3",
				pmid: "41748906",
				pmcid: "PMC12946161",
				appraisal: "high",
				stance: "supports",
				note: "Seven services produced major within- and between-provider discrepancies on standardized fecal material, showing that analytical validity remains a basic unresolved problem.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Direct-to-Consumer Tests",
				publisher: "U.S. Food and Drug Administration",
				year: 2026,
				url: "https://www.fda.gov/medical-devices/in-vitro-diagnostics/direct-consumer-tests",
				appraisal: "high",
				stance: "context",
				note: "Regulatory context noting that direct-to-consumer tests, including microbiome tests, vary in evidentiary support and should not be the sole basis for dietary or medical decisions.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "neuroscience-and-psychology",
		title: "Is exposure and response prevention effective for obsessive-compulsive disorder?",
		slug: "is-exposure-and-response-prevention-effective-for-obsessive-compulsive-disorder",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Cognitive behavioral therapy that includes exposure and response prevention is a first-line treatment for obsessive-compulsive disorder and substantially reduces symptoms for many children and adults. It should be delivered collaboratively and gradually; it is not forced exposure or a guarantee of remission.",
		stableCore: [
			"ERP helps a person approach feared thoughts or situations while resisting the ritual or reassurance that maintains the cycle.",
			"Randomized trials show a large average symptom benefit compared with many control conditions.",
			"Medication, especially serotonin reuptake inhibitors, is also evidence-based and can be combined with ERP when appropriate."
		],
		openQuestions: [
			"Which formats best improve access and completion without weakening treatment fidelity?",
			"How can clinicians predict who needs combined therapy, intensive programs, or relapse-prevention support?"
		],
		whatWouldChangeMinds: [
			"Independent low-bias trials finding no durable benefit over credible active treatments or adequate pharmacotherapy.",
			"Evidence that symptom gains do not translate into meaningful functional or quality-of-life improvement."
		],
		misconceptions: [
			"ERP is not simply confronting a person's worst fear without preparation or consent.",
			"Anxiety during exposure is expected but treatment is paced, planned, and designed to build learning.",
			"Needing medication or additional treatment does not mean ERP has failed or that OCD is untreatable."
		],
		editorSummary:
			"The consensus is strong while the page preserves an important implementation boundary: skilled, collaborative ERP is not coercive flooding.",
		uncertaintySummary:
			"Effect size depends on comparator, therapist expertise, adherence, age, comorbidity, and study allegiance. Access and dropout remain major practical limits.",
		sources: [
			{
				kind: "guideline",
				title: "Obsessive-Compulsive Disorder: When Unwanted Thoughts or Repetitive Behaviors Take Over",
				publisher: "National Institute of Mental Health",
				year: 2025,
				url: "https://www.nimh.nih.gov/health/publications/obsessive-compulsive-disorder-when-unwanted-thoughts-or-repetitive-behaviors-take-over",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Current federal clinical overview identifying ERP and medication as effective, evidence-based OCD treatments.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Cognitive behavioural therapy with exposure and response prevention in the treatment of obsessive-compulsive disorder: A systematic review and meta-analysis of randomised controlled trials",
				publisher: "Comprehensive Psychiatry",
				year: 2021,
				url: "https://pubmed.ncbi.nlm.nih.gov/33618297/",
				pmid: "33618297",
				appraisal: "high",
				stance: "supports",
				note: "Thirty-six trials and 2,020 patients showed a large pooled benefit while identifying comparator choice, risk of bias, and researcher allegiance as important limitations.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Obsessive-compulsive disorder and body dysmorphic disorder: treatment",
				publisher: "National Institute for Health and Care Excellence",
				year: 2005,
				url: "https://www.nice.org.uk/guidance/cg31/chapter/Recommendations",
				appraisal: "high",
				stance: "context",
				note: "Stepped-care recommendations for ERP-containing CBT, medication, combined treatment, children, and more severe illness.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "neuroscience-and-psychology",
		title: "Does chronic sleep loss worsen depression and anxiety risk?",
		slug: "does-chronic-sleep-loss-worsen-depression-and-anxiety-risk",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Insufficient or disrupted sleep worsens emotional regulation and anxiety symptoms in experiments, and persistent insomnia predicts later depression. The relationship is bidirectional—mental illness also disrupts sleep—so sleep is a meaningful risk and treatment target, not a complete explanation for depression or anxiety.",
		stableCore: [
			"Experimental sleep loss reduces positive mood and increases anxiety symptoms even in otherwise healthy participants.",
			"Prospective studies find that persistent insomnia is associated with a higher risk of developing depression later.",
			"Treating sleep problems can help mental health, but serious depression or anxiety still needs direct assessment and care."
		],
		openQuestions: [
			"Which sleep interventions most effectively prevent first episodes or relapse in different mental-health conditions?",
			"How do sleep timing, regularity, apnea, circadian disruption, and total duration contribute independently?"
		],
		whatWouldChangeMinds: [
			"Well-controlled longitudinal and experimental evidence showing that persistent sleep disruption does not alter emotional or psychiatric outcomes.",
			"Prevention trials showing no mental-health effect when sleep is successfully improved before illness develops."
		],
		misconceptions: [
			"Sleep loss can contribute to mental illness without being its sole cause.",
			"Depression-related insomnia is not proof that every observed association runs only from depression to poor sleep.",
			"One short night and chronic sleep restriction are not equivalent exposures."
		],
		editorSummary:
			"This page presents sleep and mental health as a two-way system while retaining the causal evidence from experiments and prospective cohorts.",
		uncertaintySummary:
			"Exact risk varies by sleep disorder, duration, age, baseline mental health, and social stress. Depression findings are stronger than evidence for every anxiety disorder.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Recommended Amount of Sleep for a Healthy Adult: A Joint Consensus Recommendation",
				publisher: "American Academy of Sleep Medicine and Sleep Research Society",
				year: 2015,
				url: "https://aasm.org/resources/pdf/pressroom/adult-sleep-duration-consensus.pdf",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "Consensus statement linking regular adequate sleep with health, alertness, mood, and lower chronic-disease risk.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Sleep loss and emotion: A systematic review and meta-analysis of over 50 years of experimental research",
				publisher: "Psychological Bulletin",
				year: 2024,
				url: "https://pubmed.ncbi.nlm.nih.gov/38127505/",
				pmid: "38127505",
				appraisal: "high",
				stance: "supports",
				note: "Meta-analysis of 154 studies and 5,717 participants finding reduced positive affect and increased anxiety after several forms of experimental sleep loss.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Insomnia as a predictor of depression: a meta-analytic evaluation of longitudinal epidemiological studies",
				publisher: "Journal of Affective Disorders",
				year: 2011,
				url: "https://pubmed.ncbi.nlm.nih.gov/21300408/",
				pmid: "21300408",
				appraisal: "moderate",
				stance: "supports",
				note: "Prospective synthesis finding that insomnia substantially predicts later depression while acknowledging residual confounding and bidirectionality.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "neuroscience-and-psychology",
		title: "Do violent video games cause serious real-world violence?",
		slug: "do-violent-video-games-cause-serious-real-world-violence",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 58,
		evidenceCertainty: "low",
		reviewMode: "living",
		bottomLine:
			"Evidence does not show that violent video games cause serious or lethal real-world violence. Some meta-analyses find small increases in laboratory aggression, aggressive thoughts, or irritability, while others find smaller or null effects after stronger controls. Those outcomes should not be equated with assault, crime, or mass violence.",
		stableCore: [
			"Serious violence is rare and shaped by many stronger individual, family, social, and situational factors.",
			"Studies disagree more about small aggression measures than the public debate often suggests.",
			"Even organizations that report an aggression association say evidence is insufficient to link violent games with criminal violence or delinquency."
		],
		openQuestions: [
			"Which preregistered long-term designs best separate selection, family context, competitive play, and violent content?",
			"Are there meaningful effects in vulnerable subgroups that broad averages conceal?"
		],
		whatWouldChangeMinds: [
			"Replicated prospective or natural-experiment evidence showing a substantial increase in verified serious violence attributable to game exposure.",
			"Clear dose-response and mechanism evidence that survives controls for prior aggression, family environment, and social context."
		],
		misconceptions: [
			"Laboratory tasks such as noise blasts or word completion are not the same outcome as criminal violence.",
			"A small average effect on aggressive thoughts would not establish that games are a major cause of violent crime.",
			"Rejecting a mass-violence claim does not mean game content has no short-term effect on mood or behavior."
		],
		editorSummary:
			"This page refuses the usual leap from contested small aggression effects to a claim about serious violence.",
		uncertaintySummary:
			"Measures, analytic choices, publication bias, self-selection, and researcher disagreement make small behavioral effects uncertain. Evidence for serious violence is much weaker.",
		sources: [
			{
				kind: "consensus_statement",
				title: "APA Review Confirms Link Between Playing Violent Video Games and Aggression",
				publisher: "American Psychological Association",
				year: 2015,
				url: "https://www.apa.org/news/press/releases/2015/08/violent-video-games",
				isAnchor: true,
				appraisal: "moderate",
				stance: "debate",
				note: "APA task-force summary reporting an aggression association while explicitly finding insufficient evidence for criminal violence or delinquency.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Finding Common Ground in Meta-Analysis \"Wars\" on Violent Video Games",
				publisher: "Perspectives on Psychological Science",
				year: 2020,
				url: "https://pubmed.ncbi.nlm.nih.gov/31188714/",
				doi: "10.1177/1745691619850104",
				pmid: "31188714",
				appraisal: "moderate",
				stance: "debate",
				note: "Review of the 'meta-analysis wars' arguing that any aggression effect is small, method-sensitive, and not evidence of serious or lethal violence.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Violent video game engagement is not associated with adolescents' aggressive behaviour: evidence from a registered report",
				publisher: "Royal Society Open Science",
				year: 2019,
				url: "https://doi.org/10.1098/rsos.171474",
				doi: "10.1098/rsos.171474",
				appraisal: "moderate",
				stance: "debate",
				note: "Preregistered adolescent study finding no association under a specified analysis and illustrating why design transparency matters in this disputed literature.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "neuroscience-and-psychology",
		title: "Does physical punishment improve child behavior without harmful effects?",
		slug: "does-physical-punishment-improve-child-behavior-without-harmful-effects",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"No. Physical punishment may stop behavior in the moment, but it does not improve long-term behavior better than nonviolent discipline and is associated with more aggression, behavior problems, and poorer mental health. Major pediatric guidance recommends positive, consistent, nonphysical discipline.",
		stableCore: [
			"Prospective studies do not identify beneficial long-term child outcomes from physical punishment.",
			"Physical punishment predicts increases in externalizing behavior and does not reliably improve later compliance or self-regulation.",
			"Effective alternatives include clear expectations, reinforcement, redirection, natural consequences, and time-limited removal of privileges."
		],
		openQuestions: [
			"Which culturally responsive supports best help families replace physical punishment under high stress?",
			"How can studies further separate punishment effects from family adversity while avoiding unethical experiments?"
		],
		whatWouldChangeMinds: [
			"Robust prospective evidence showing durable behavioral benefits without increased aggression, distress, or relationship harm.",
			"Trials of feasible nonviolent alternatives showing consistently worse child and family outcomes."
		],
		misconceptions: [
			"Stopping behavior immediately is not the same as improving long-term self-regulation.",
			"Associations remain after many family factors are considered, though observational studies cannot remove every difference.",
			"Rejecting physical punishment does not mean parents should set no limits or consequences."
		],
		editorSummary:
			"The evidence favors firm, nonviolent discipline and does not support a harmless-benefit exception for spanking.",
		uncertaintySummary:
			"Random assignment to physical punishment would be unethical, so causal inference relies on prospective and quasi-experimental methods. Those methods consistently point away from benefit.",
		sources: [
			{
				kind: "systematic_review",
				title: "Physical punishment and child outcomes: a narrative review of prospective studies",
				publisher: "The Lancet",
				year: 2021,
				url: "https://pubmed.ncbi.nlm.nih.gov/34197808/",
				doi: "10.1016/S0140-6736(21)00582-1",
				pmid: "34197808",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Review of 69 prospective studies finding physical punishment consistently predicts worsening behavior and no positive outcomes.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Effective Discipline to Raise Healthy Children",
				publisher: "American Academy of Pediatrics",
				year: 2018,
				url: "https://doi.org/10.1542/peds.2018-3112",
				doi: "10.1542/peds.2018-3112",
				appraisal: "high",
				stance: "supports",
				note: "Pediatric policy statement recommending nonviolent discipline and summarizing developmental and health concerns about corporal punishment.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Spanking and child outcomes: Old controversies and new meta-analyses",
				publisher: "Journal of Family Psychology",
				year: 2016,
				url: "https://pubmed.ncbi.nlm.nih.gov/27055181/",
				doi: "10.1037/fam0000191",
				pmid: "27055181",
				appraisal: "moderate",
				stance: "supports",
				note: "Meta-analysis associating spanking with detrimental child outcomes and finding no evidence of improved long-term behavior.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "neuroscience-and-psychology",
		title: "Can recovered-memory techniques reliably reveal accurate hidden trauma memories?",
		slug: "can-recovered-memory-techniques-reliably-reveal-accurate-hidden-trauma-memories",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 60,
		evidenceCertainty: "low",
		bottomLine:
			"No technique can reliably verify that a newly recovered trauma memory is accurate. People can remember real trauma after a period of not thinking about it, but suggestion, guided imagery, hypnosis, repeated interpretation, and social pressure can also create confident false memories. Corroboration—not confidence or vividness—is the key safeguard.",
		stableCore: [
			"Memory is reconstructive: confidence, emotion, and vivid detail do not guarantee historical accuracy.",
			"Experiments show that suggestive procedures can produce false autobiographical beliefs and memories in a meaningful minority of participants.",
			"Spontaneous delayed recall and memories produced during highly suggestive techniques should not be treated as the same evidentiary situation."
		],
		openQuestions: [
			"Which interview practices best support trauma care while minimizing suggestion and preserving later fact-finding?",
			"How often do different forms of delayed recall occur in clinical and legal settings with independent corroboration?"
		],
		whatWouldChangeMinds: [
			"A validated technique that distinguishes true from false recovered memories with high accuracy in prospective real-world testing.",
			"Evidence that suggestive procedures do not increase false autobiographical recall under realistic conditions."
		],
		misconceptions: [
			"False memories are not necessarily lies; a person can sincerely believe an inaccurate memory.",
			"Some delayed memories may be accurate, so concern about suggestion does not justify automatically dismissing every report.",
			"Therapeutic validation of distress is different from certifying an uncorroborated event as historical fact."
		],
		editorSummary:
			"This page holds two truths together: delayed recall can occur, and no therapeutic method can certify the historical accuracy of a recovered memory.",
		uncertaintySummary:
			"Laboratory paradigms cannot reproduce every traumatic event, and real cases rarely offer complete records. Accuracy must be evaluated case by case with neutral interviewing and corroboration.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Childhood Trauma: Remembering What Never Happened",
				publisher: "American Psychological Association",
				year: 2026,
				url: "https://www.apa.org/topics/trauma/memories",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "Balanced professional explanation that delayed recall can occur, pseudomemories can be constructed, and uncorroborated accuracy cannot be determined from memory qualities alone.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Induction of false beliefs and false memories in laboratory studies—A systematic review",
				publisher: "Clinical Psychology & Psychotherapy",
				year: 2021,
				url: "https://pubmed.ncbi.nlm.nih.gov/33586291/",
				doi: "10.1002/cpp.2567",
				pmid: "33586291",
				appraisal: "high",
				stance: "supports",
				note: "Review of 59 experimental papers showing that imagery, suggestion, and related methods can induce false beliefs or memories in a substantial minority.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "The Return of the Repressed: The Persistent and Problematic Claims of Long-Forgotten Trauma",
				publisher: "Perspectives on Psychological Science",
				year: 2019,
				url: "https://doi.org/10.1177/1745691619862306",
				doi: "10.1177/1745691619862306",
				appraisal: "moderate",
				stance: "context",
				note: "Review of historical, experimental, clinical, and survey evidence warning that suggestive recovery practices remain in use despite false-memory risk.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Does a gluten-free diet improve health for people without celiac disease or gluten sensitivity?",
		slug: "does-a-gluten-free-diet-improve-health-for-people-without-celiac-disease-or-gluten-sensitivity",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"Not generally. A gluten-free diet is essential for celiac disease and can help some people with a carefully evaluated gluten-related disorder, but there is no good evidence that avoiding gluten improves health for the general population. Unnecessary restriction can reduce fiber or micronutrient intake and increase cost.",
		stableCore: [
			"Celiac disease is an immune-mediated condition for which strict lifelong gluten avoidance is treatment.",
			"People without celiac disease can have symptoms related to wheat, gluten, fermentable carbohydrates, allergy, or other causes, so diagnosis matters.",
			"Population evidence does not show a general cardiovascular, weight, or wellness advantage from avoiding gluten."
		],
		openQuestions: [
			"How can clinicians better distinguish non-celiac gluten sensitivity from fructan sensitivity and other gastrointestinal disorders?",
			"What are the long-term nutritional outcomes of commercial gluten-free dietary patterns outside celiac disease?"
		],
		whatWouldChangeMinds: [
			"Large randomized trials showing broad, durable health benefits in people without a gluten-related disorder.",
			"Replicated biomarkers identifying a common subgroup that specifically benefits from gluten exclusion."
		],
		misconceptions: [
			"'Gluten-free' is a medical requirement for some people, not a synonym for healthier food.",
			"Feeling better after removing wheat does not by itself identify gluten as the cause.",
			"Gluten-free processed foods can still be low in fiber, high in sugar, or otherwise nutritionally weak."
		],
		editorSummary:
			"This claim protects a necessary medical diet from being overgeneralized into a universal wellness prescription.",
		uncertaintySummary:
			"Evidence is strong for celiac treatment and weak for general-population benefit. Non-celiac symptom syndromes are real but heterogeneous and diagnostically difficult.",
		sources: [
			{
				kind: "guideline",
				title: "Eating, Diet, & Nutrition for Celiac Disease",
				publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
				year: 2026,
				url: "https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease/eating-diet-nutrition",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "Clinical anchor for who requires a strict gluten-free diet, cross-contact, and nutritional planning in diagnosed celiac disease.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Long term gluten consumption in adults without celiac disease and risk of coronary heart disease: prospective cohort study",
				publisher: "BMJ",
				year: 2017,
				url: "https://pubmed.ncbi.nlm.nih.gov/28465308/",
				doi: "10.1136/bmj.j1892",
				pmid: "28465308",
				appraisal: "moderate",
				stance: "supports",
				note: "Large prospective cohorts found no coronary benefit from avoiding gluten and cautioned that restriction can reduce beneficial whole-grain intake.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Impact of Gluten-free Diet on Anthropometric Indicators in Individuals With and Without Celiac Disease: A Systematic Review and Meta-analysis",
				publisher: "Clinical Therapeutics",
				year: 2023,
				url: "https://pubmed.ncbi.nlm.nih.gov/37903705/",
				pmid: "37903705",
				appraisal: "moderate",
				stance: "context",
				note: "Review finding no significant general effect on weight, body mass index, waist circumference, or body fat, with important population and duration limitations.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Does protein supplementation improve muscle and strength gains during resistance training?",
		slug: "does-protein-supplementation-improve-muscle-and-strength-gains-during-resistance-training",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, modestly—especially when a person's usual diet does not already provide enough protein. During sustained resistance training, supplementation increases average gains in lean mass and strength, but benefits plateau around total intakes near 1.6 grams per kilogram of body weight per day for most healthy adults.",
		stableCore: [
			"Resistance training is the main stimulus; protein supplementation adds a modest average benefit rather than replacing training.",
			"Baseline intake matters: extra protein is less useful when total dietary protein is already sufficient.",
			"Whole foods and supplements can both meet protein needs; powders are principally a convenient delivery format."
		],
		openQuestions: [
			"How do optimal amounts differ for older adults, calorie restriction, plant-based diets, and elite training?",
			"How should protein be distributed across meals for different goals and schedules?"
		],
		whatWouldChangeMinds: [
			"Large long-duration trials finding no additional lean-mass or strength benefit after controlling for baseline intake.",
			"Consistent evidence that substantially higher intakes produce further gains without offsetting harms."
		],
		misconceptions: [
			"Protein powder does not build muscle without an adequate training stimulus.",
			"More protein is not linearly better once total intake is sufficient.",
			"Observed lean-mass gains are modest averages and vary by age, training history, energy intake, and adherence."
		],
		editorSummary:
			"This page gives the useful middle answer: supplementation works, but the effect is modest, conditional, and subject to a clear plateau.",
		uncertaintySummary:
			"The average effect is well supported. The precise target varies by age, energy balance, protein quality, training status, and how baseline intake is measured.",
		sources: [
			{
				kind: "meta_analysis",
				title: "A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults",
				publisher: "British Journal of Sports Medicine",
				year: 2018,
				url: "https://pubmed.ncbi.nlm.nih.gov/28698222/",
				doi: "10.1136/bjsports-2017-097608",
				pmid: "28698222",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Forty-nine studies and 1,863 participants found modest added strength and lean-mass gains, with no further average lean-mass benefit above about 1.62 g/kg/day.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Dietary Supplements for Exercise and Athletic Performance",
				publisher: "National Institutes of Health Office of Dietary Supplements",
				year: 2025,
				url: "https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-Consumer/",
				appraisal: "high",
				stance: "context",
				note: "Public-health context for protein needs, supplement limits, product quality, and the larger role of training and overall diet.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "International Society of Sports Nutrition Position Stand: protein and exercise",
				publisher: "Journal of the International Society of Sports Nutrition",
				year: 2017,
				url: "https://pubmed.ncbi.nlm.nih.gov/28642676/",
				pmid: "28642676",
				appraisal: "moderate",
				stance: "context",
				note: "Position statement covering total intake, timing, protein quality, safety, and practical use for exercising adults.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Does eating organic food clearly improve long-term health outcomes?",
		slug: "does-eating-organic-food-clearly-improve-long-term-health-outcomes",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 60,
		evidenceCertainty: "low",
		bottomLine:
			"Not clearly. Organic food generally reduces exposure to some synthetic pesticide residues and antibiotic-resistant bacteria, but current human evidence does not establish a large long-term health advantage over a nutritious conventional diet. Observational links are difficult to separate from income, education, smoking, and broader dietary patterns.",
		stableCore: [
			"Organic and conventional foods are defined mainly by production standards, not by a guarantee that one item is more nutritious.",
			"Organic consumption usually lowers measured exposure to several pesticide residues.",
			"Evidence for lower cancer, allergy, obesity, or other chronic-disease risk remains observational and vulnerable to healthy-consumer confounding."
		],
		openQuestions: [
			"Do long-term differences in pesticide mixtures produce measurable clinical effects in higher-exposure groups?",
			"Which farming practices—not just labels—best improve environmental, worker, antimicrobial-resistance, and nutritional outcomes together?"
		],
		whatWouldChangeMinds: [
			"Long prospective studies with strong exposure measurement and confounding control showing consistent clinically important effects.",
			"Pragmatic trials or natural experiments linking sustained organic substitution to validated disease outcomes."
		],
		misconceptions: [
			"Organic does not mean pesticide-free; it restricts which substances and methods may be used.",
			"Lower residue exposure does not automatically establish a measurable reduction in disease.",
			"Conventional fruits and vegetables remain healthful, and avoiding produce because organic options cost more can be counterproductive."
		],
		editorSummary:
			"The measurable exposure difference is real; the claimed large personal-health payoff remains unproven.",
		uncertaintySummary:
			"Randomized clinical-outcome evidence is scarce, organic consumers differ from nonconsumers in many ways, and farming systems vary within both labels.",
		sources: [
			{
				kind: "systematic_review",
				title: "A Systematic Review of Organic Versus Conventional Food Consumption: Is There a Measurable Benefit on Human Health?",
				publisher: "Nutrients",
				year: 2019,
				url: "https://pubmed.ncbi.nlm.nih.gov/31861431/",
				doi: "10.3390/nu12010007",
				pmid: "31861431",
				isAnchor: true,
				appraisal: "moderate",
				stance: "context",
				note: "Comprehensive review finding suggestive exposure and observational differences but too little clinical evidence for definitive long-term health claims.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Are organic foods safer or healthier than conventional alternatives? A systematic review",
				publisher: "Annals of Internal Medicine",
				year: 2012,
				url: "https://pubmed.ncbi.nlm.nih.gov/22944875/",
				doi: "10.7326/0003-4819-157-5-201209040-00007",
				pmid: "22944875",
				appraisal: "high",
				stance: "context",
				note: "Systematic review finding limited evidence of clinically relevant superiority while documenting lower pesticide-residue detection and some microbial differences.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Labeling Organic Products",
				publisher: "U.S. Department of Agriculture",
				year: 2026,
				url: "https://www.ams.usda.gov/rules-regulations/organic/labeling",
				appraisal: "high",
				stance: "context",
				note: "Regulatory context clarifying what organic labels certify and why the label is not itself a comparative clinical-health claim.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "nutrition-and-diet",
		title: "Do non-sugar sweeteners reliably help with long-term weight control?",
		slug: "do-non-sugar-sweeteners-reliably-help-with-long-term-weight-control",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 64,
		evidenceCertainty: "low",
		reviewMode: "living",
		bottomLine:
			"Not reliably over the long term. Replacing sugar-sweetened products with low- or no-calorie sweeteners can reduce calories and modestly help weight in some short trials, but evidence does not show a durable population-level weight-control benefit. Effects depend on what they replace and whether people compensate elsewhere.",
		stableCore: [
			"Substitution matters: replacing sugar with a non-sugar sweetener differs from adding a diet product to an otherwise unchanged diet.",
			"Short randomized trials sometimes show small weight benefits, while longer observational results are inconsistent and confounded.",
			"Non-sugar sweeteners are not a stand-alone treatment for obesity and do not make an overall dietary pattern healthful."
		],
		openQuestions: [
			"Which sweeteners, doses, populations, and replacement patterns produce sustained benefit or harm?",
			"How do taste adaptation, appetite, microbiome changes, and compensatory eating affect long-term outcomes?"
		],
		whatWouldChangeMinds: [
			"Large multi-year randomized substitution trials showing durable clinically meaningful weight benefit.",
			"Consistent evidence that specific sweeteners worsen or improve metabolic outcomes independent of weight and reverse causation."
		],
		misconceptions: [
			"Zero sugar does not mean zero calories in the whole food or automatic weight loss.",
			"Observational links between diet drinks and obesity can reflect people switching after gaining weight.",
			"A recommendation against relying on sweeteners for weight control is not the same as saying every approved sweetener is acutely toxic."
		],
		editorSummary:
			"The evidence supports a narrow substitution tool, not a dependable long-term weight-loss strategy.",
		uncertaintySummary:
			"Trials are often short, products differ, adherence is difficult to measure, and observational studies are especially vulnerable to reverse causation.",
		sources: [
			{
				kind: "guideline",
				title: "WHO guideline on use of non-sugar sweeteners",
				publisher: "World Health Organization",
				year: 2023,
				url: "https://www.who.int/publications/i/item/9789240073616",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "Conditional recommendation against using non-sugar sweeteners as a long-term weight-control strategy, based on limited durable benefit and uncertain observational harms.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Association between intake of non-sugar sweeteners and health outcomes: systematic review and meta-analyses of randomised and non-randomised controlled trials and observational studies",
				publisher: "BMJ",
				year: 2019,
				url: "https://pubmed.ncbi.nlm.nih.gov/30602577/",
				doi: "10.1136/bmj.k4718",
				pmid: "30602577",
				appraisal: "high",
				stance: "context",
				note: "Broad review finding mostly low-certainty evidence, small short-term differences, and no compelling long-term weight-control advantage.",
				order: 2
			},
			{
				kind: "context",
				title: "Use of non-sugar sweeteners: WHO guideline summary",
				publisher: "World Health Organization",
				year: 2023,
				url: "https://www.who.int/news/item/15-05-2023-who-advises-not-to-use-non-sugar-sweeteners-for-weight-control-in-newly-released-guideline",
				appraisal: "high",
				stance: "context",
				note: "Public explanation of the recommendation's scope, conditional certainty, and exclusion of people with pre-existing diabetes.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Is Arctic sea ice declining because of human-caused warming?",
		slug: "is-arctic-sea-ice-declining-because-of-human-caused-warming",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Arctic sea-ice extent, thickness, and age have declined sharply, especially in late summer, and human-caused warming is the dominant explanation for the long-term trend. Natural variability changes individual years but does not explain the sustained multi-decade loss.",
		stableCore: [
			"Satellite observations show a strong downward September sea-ice trend since 1979 alongside loss of older, thicker ice.",
			"Climate models reproduce the long-term decline when human greenhouse-gas forcing is included, not with natural factors alone.",
			"Observed ice loss scales closely with cumulative human carbon dioxide emissions."
		],
		openQuestions: [
			"Which year will first be practically ice-free in September, and how often will such summers recur?",
			"How will changing sea ice affect Arctic ecosystems, weather, shipping, and coastal communities?"
		],
		whatWouldChangeMinds: [
			"A sustained recovery inconsistent with greenhouse forcing across extent, thickness, and ice-age records.",
			"A natural mechanism that quantitatively reproduces the trend without anthropogenic forcing."
		],
		misconceptions: [
			"One unusually icy year does not reverse a multi-decade trend.",
			"Sea ice already floats, so its melting has little direct sea-level effect; its climate and ecosystem effects remain substantial.",
			"Natural variability influences timing and year-to-year extent but is not an adequate explanation for the long trend."
		],
		editorSummary: "This is a direct climate indicator with unusually clear observations and attribution evidence.",
		uncertaintySummary:
			"The cause and direction are high-confidence; the precise timing of nearly ice-free summers and regional consequences remain uncertain.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Climate Change 2021: The Physical Science Basis, Chapter 3",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2021,
				url: "https://www.ipcc.ch/report/ar6/wg1/chapter/chapter-3/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Global attribution assessment concluding that human influence is the main driver of observed Arctic sea-ice loss.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Changing state of Arctic sea ice across all seasons",
				publisher: "Environmental Research Letters",
				year: 2018,
				url: "https://doi.org/10.1088/1748-9326/aade56",
				doi: "10.1088/1748-9326/aade56",
				appraisal: "high",
				stance: "supports",
				note: "Review synthesizing extent, thickness, age, seasonality, and the near-linear relationship between ice loss and cumulative carbon emissions.",
				order: 2
			},
			{
				kind: "context",
				title: "Arctic Sea Ice News and Analysis",
				publisher: "National Snow and Ice Data Center",
				year: 2026,
				url: "https://nsidc.org/arcticseaicenews/",
				appraisal: "high",
				stance: "context",
				note: "Current observational context for satellite extent, seasonal conditions, and comparison with the long-term record.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Does deforestation significantly contribute to climate change and biodiversity loss?",
		slug: "does-deforestation-significantly-contribute-to-climate-change-and-biodiversity-loss",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Deforestation releases stored carbon, removes future carbon uptake, alters water and energy cycles, and destroys or fragments habitat. It is a major contributor to both greenhouse-gas emissions and global biodiversity decline, although its size varies by region and commodity.",
		stableCore: [
			"Land-use change releases carbon from vegetation and soils while reducing the forest carbon sink.",
			"Habitat conversion is the largest direct driver of biodiversity loss in many terrestrial ecosystems.",
			"Avoiding deforestation usually protects more existing carbon and biodiversity in the near term than relying only on future tree planting."
		],
		openQuestions: [
			"Which policies most durably reduce commodity-driven forest loss without displacing it to another region?",
			"How much carbon and biodiversity can different natural-regeneration and restoration strategies recover?"
		],
		whatWouldChangeMinds: [
			"Global carbon budgets showing forest clearing is no longer a material net emissions source.",
			"Broad ecological evidence showing habitat loss is not a major driver of terrestrial species decline."
		],
		misconceptions: [
			"Planting new trees does not instantly replace the carbon, complexity, or species of an old forest.",
			"Deforestation matters even when wood products retain some carbon because soils, decay, fire, and lost uptake also affect the budget.",
			"Climate and biodiversity impacts can be large even where a cleared area remains agriculturally productive."
		],
		editorSummary:
			"This page joins two mature evidence bases—carbon accounting and habitat loss—without treating every forest or land-use choice as identical.",
		uncertaintySummary:
			"The overall conclusion is strong. Exact emissions and ecological effects vary with forest type, prior land use, fire, soil, product lifetime, and what replaces the forest.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Climate Change 2022: Mitigation of Climate Change, Chapter 7",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2022,
				url: "https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-7/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Assessment of agriculture, forestry, and land-use emissions plus the mitigation value of avoiding deforestation and restoring ecosystems.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Global Assessment Report on Biodiversity and Ecosystem Services",
				publisher: "Intergovernmental Science-Policy Platform on Biodiversity and Ecosystem Services",
				year: 2019,
				url: "https://www.ipbes.net/global-assessment",
				appraisal: "high",
				stance: "supports",
				note: "Global biodiversity assessment identifying land-use change as the largest direct driver of terrestrial and freshwater biodiversity loss.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Tropical forests and the changing earth system",
				publisher: "Philosophical Transactions of the Royal Society B",
				year: 2006,
				url: "https://doi.org/10.1098/rstb.2006.1876",
				doi: "10.1098/rstb.2006.1876",
				appraisal: "moderate",
				stance: "context",
				note: "Review of tropical forests in the carbon, water, climate, and biodiversity systems, including the consequences of clearing and degradation.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Can electricity grids remain reliable with high shares of wind and solar?",
		slug: "can-electricity-grids-remain-reliable-with-high-shares-of-wind-and-solar",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		reviewMode: "living",
		bottomLine:
			"Yes, but not by adding variable generation alone. Studies and real grids show that high wind and solar shares can be integrated reliably when planning also provides transmission, storage, demand flexibility, geographic diversity, firm low-carbon capacity, or other balancing resources. The least-cost mix depends on local weather, demand, and infrastructure.",
		stableCore: [
			"Wind and solar variability is predictable enough for system operators to plan around, but multi-hour and multi-day gaps require balancing resources.",
			"Transmission, geographic diversity, complementary generation, storage, and flexible demand each reduce reliability risk.",
			"High annual renewable energy shares do not by themselves prove that every hour can be supplied without firm capacity or overbuild."
		],
		openQuestions: [
			"Which combinations of long-duration storage, transmission, firm generation, and demand response are least costly in each region?",
			"How will electrified transport, heating, and industry reshape demand flexibility and extreme-weather risk?"
		],
		whatWouldChangeMinds: [
			"Repeated system failures attributable to high renewable penetration despite adequate balancing and resource-adequacy planning.",
			"Long-run operational evidence showing that required integration resources make high-renewable systems systematically infeasible."
		],
		misconceptions: [
			"Reliable high-renewable grids are not necessarily grids powered only by wind and solar every hour.",
			"An individual calm or cloudy period is an engineering constraint, not proof that integration is impossible.",
			"Annual energy percentages and instantaneous resource adequacy are different measurements."
		],
		editorSummary:
			"The scientific and engineering consensus is conditional: high shares are feasible, while exact architecture and cost remain active design questions.",
		uncertaintySummary:
			"Feasibility is well supported, but cost, technology mix, permitting, market rules, extreme events, and the meaning of 'high share' vary greatly by system.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Integrating Solar and Wind: Executive Summary",
				publisher: "International Energy Agency",
				year: 2024,
				url: "https://www.iea.org/reports/integrating-solar-and-wind/executive-summary",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Cross-country assessment of integration phases and the grid, flexibility, storage, and market measures required as variable-renewable shares rise.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "A Decade of Transformation: What We Have Learned Since RE Futures Showed What Was Possible",
				publisher: "National Renewable Energy Laboratory",
				year: 2022,
				url: "https://www.nrel.gov/news/feature/2022/re-futures/",
				appraisal: "high",
				stance: "supports",
				note: "Review of a major U.S. systems study finding high renewable penetration technically feasible with expanded flexibility and transmission.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Geophysical constraints on the reliability of solar and wind power worldwide",
				publisher: "Nature Communications",
				year: 2021,
				url: "https://www.nature.com/articles/s41467-021-26355-z",
				doi: "10.1038/s41467-021-26355-z",
				appraisal: "moderate",
				stance: "context",
				note: "Thirty-nine years of hourly weather across 42 countries shows high potential coverage but also persistent gaps requiring storage, overbuild, interconnection, or firm supply.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "climate-and-environment",
		title: "Does livestock production contribute substantially to greenhouse gas emissions?",
		slug: "does-livestock-production-contribute-substantially-to-greenhouse-gas-emissions",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Livestock production is a substantial source of human-caused greenhouse gases through methane from ruminant digestion, manure, feed production, energy use, and land-use change. Its exact global share depends on boundaries and metrics, but the contribution is not scientifically in doubt.",
		stableCore: [
			"Ruminants such as cattle and sheep produce methane during digestion, and methane has a strong near-term warming effect.",
			"Manure emits methane and nitrous oxide; feed and pasture can add carbon dioxide and land-use emissions.",
			"Production systems differ widely, so species, feed, land, productivity, and manure management strongly affect emissions per unit of food."
		],
		openQuestions: [
			"How durable and scalable are methane-reducing feeds, breeding, manure systems, and dietary shifts?",
			"Which metrics best compare short-lived methane with long-lived carbon dioxide for specific policy decisions?"
		],
		whatWouldChangeMinds: [
			"Revised global inventories showing livestock sources are minor after consistent full-lifecycle accounting.",
			"Atmospheric and farm measurements demonstrating that current methane and nitrous-oxide factors are systematically overstated."
		],
		misconceptions: [
			"Disagreement over whether the share is 12%, 14%, or another estimate is not disagreement that the contribution is substantial.",
			"Biogenic carbon cycling does not make additional livestock methane climate-neutral.",
			"Not every animal product or production system has the same emissions intensity."
		],
		editorSummary:
			"This page keeps the robust emissions conclusion separate from legitimate arguments about metrics, livelihoods, nutrition, and mitigation choices.",
		uncertaintySummary:
			"Global totals vary with lifecycle boundaries, land-use assumptions, methane metrics, and data quality. Source categories and the direction of mitigation are well established.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Tackling climate change through livestock: A global assessment of emissions and mitigation opportunities",
				publisher: "Food and Agriculture Organization of the United Nations",
				year: 2013,
				url: "https://www.fao.org/4/i3437e/i3437e00.htm",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Global lifecycle assessment identifying livestock emission sources, variation among systems, and major mitigation opportunities.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Global Methane Assessment: Benefits and Costs of Mitigating Methane Emissions",
				publisher: "United Nations Environment Programme",
				year: 2021,
				url: "https://www.unep.org/resources/report/global-methane-assessment-benefits-and-costs-mitigating-methane-emissions",
				appraisal: "high",
				stance: "supports",
				note: "International assessment of methane sources and the climate, health, and agricultural benefits of rapid mitigation, including livestock measures.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "Climate Change 2022: Mitigation of Climate Change, Chapter 7",
				publisher: "Intergovernmental Panel on Climate Change",
				year: 2022,
				url: "https://www.ipcc.ch/report/ar6/wg3/chapter/chapter-7/",
				appraisal: "high",
				stance: "context",
				note: "Assessment context for agriculture, land use, dietary demand, non-carbon-dioxide gases, and mitigation pathways.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Does induced abortion increase breast cancer risk?",
		slug: "does-induced-abortion-increase-breast-cancer-risk",
		consensusBand: "strong",
		confidenceScore: 96,
		bottomLine:
			"No. Higher-quality prospective studies and a large collaborative reanalysis do not show that induced abortion increases later breast cancer risk. Earlier positive reports were largely retrospective and vulnerable to differences in how people recalled or disclosed prior abortions.",
		stableCore: [
			"Pregnancy history can affect breast cancer risk, but induced abortion has not been shown to cause an increase.",
			"Prospective studies that record pregnancy history before cancer develops are less vulnerable to recall and reporting bias than retrospective interviews.",
			"A collaborative reanalysis of 53 epidemiological studies found prospective records did not support an abortion–breast cancer association.",
			"Major cancer organizations do not classify induced abortion as a breast cancer risk factor."
		],
		openQuestions: [
			"How can researchers continue to separate abortion history from correlated reproductive, social, and health-care factors?",
			"How should clinicians address the claim compassionately when it is raised in a politically charged or personally difficult setting?"
		],
		whatWouldChangeMinds: [
			"Large prospective cohorts with validated exposure records repeatedly showing a dose-responsive increase after adequate confounder control.",
			"A credible causal mechanism accompanied by consistent population-level evidence rather than retrospective reporting alone."
		],
		misconceptions: [
			"A biological story about interrupted pregnancy is not enough to establish an increase in real-world cancer incidence.",
			"Retrospective associations can be distorted when sensitive medical histories are reported differently by cases and controls.",
			"Saying abortion does not increase breast cancer risk is not a claim that all reproductive events have identical hormonal effects."
		],
		editorSummary:
			"This question is scientifically much less divided than its political visibility suggests. The strongest designs do not support a causal increase, and the page should explain why prospective records receive more weight than older recall-based studies.",
		uncertaintySummary:
			"The no-increase conclusion is stable. Normal uncertainty remains around subgroup estimates and long follow-up, but it does not create an evidence-balanced debate over whether induced abortion is a breast cancer cause.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Reproductive History and Cancer Risk",
				publisher: "National Cancer Institute",
				url: "https://www.cancer.gov/about-cancer/causes-prevention/risk/hormones/reproductive-history-fact-sheet",
				isAnchor: true,
				stance: "supports",
				note: "NCI synthesis distinguishing established reproductive risk factors from induced or spontaneous abortion, which are not associated with increased breast cancer risk.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Breast cancer and abortion: collaborative reanalysis of data from 53 epidemiological studies, including 83,000 women with breast cancer from 16 countries",
				publisher: "The Lancet",
				year: 2004,
				url: "https://consensus.app/papers/breast-cancer-and-abortion-collaborative-reanalysis-of-beral-bull/0b3fe20e9b185455919854f5d99689e8/",
				stance: "supports",
				note: "Large collaborative reanalysis showing that prospectively recorded abortions were not associated with breast cancer and explaining the recall bias in retrospective reports.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "Abortion and Breast Cancer Risk",
				publisher: "American Cancer Society",
				url: "https://www.cancer.org/cancer/risk-prevention/medical-treatments/abortion-and-breast-cancer-risk.html",
				stance: "supports",
				note: "Independent cancer-organization review concluding that the scientific evidence does not support induced abortion as a breast cancer risk factor.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Does vasectomy cause prostate cancer?",
		slug: "does-vasectomy-cause-prostate-cancer",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"There is no convincing evidence that vasectomy causes prostate cancer. Some observational studies report a very small association, mostly for localized disease, but it weakens in better-controlled analyses and may reflect prostate-specific antigen screening or other detection differences. Current urology guidance does not treat prostate cancer as a reason to avoid vasectomy.",
		stableCore: [
			"No plausible causal pathway has been established linking vasectomy to prostate cancer.",
			"Meta-analyses sometimes detect a small association with any or localized prostate cancer, but not a consistent increase in aggressive, advanced, or fatal disease.",
			"Adjustment for prostate-specific antigen screening reduces the observed association, supporting detection bias as an explanation.",
			"Vasectomy remains a highly effective permanent contraceptive option, with ordinary procedural benefits and risks that should be discussed separately."
		],
		openQuestions: [
			"Can future cohorts measure screening intensity, health-care use, and tumor severity well enough to rule out the remaining small observational signal?",
			"Do any uncommon biological or demographic subgroups have a meaningfully different long-term risk?"
		],
		whatWouldChangeMinds: [
			"Consistent prospective evidence of increased aggressive or fatal prostate cancer after careful control for screening and health-care behavior.",
			"A replicable biological mechanism that explains a dose, timing, and severity pattern in population data."
		],
		misconceptions: [
			"A small statistical association is not automatically a causal effect.",
			"Finding more localized cancers among frequently screened patients does not show that a procedure created those cancers.",
			"The absence of a demonstrated prostate cancer cause does not mean vasectomy has no short-term procedural risks."
		],
		editorSummary:
			"The fair answer is neither a frightening yes nor an absolute claim that every study is null. A small observational signal exists, but its pattern and sensitivity to screening adjustment do not support vasectomy as an established prostate cancer cause.",
		uncertaintySummary:
			"The causal conclusion is moderately secure rather than mathematically final. Residual confounding and detection bias are difficult to eliminate, but evidence for aggressive or fatal cancer—the outcomes most important to patients—does not show a convincing increase.",
		sources: [
			{
				kind: "guideline",
				title: "Vasectomy Guideline",
				publisher: "American Urological Association",
				url: "https://www.auanet.org/documents/Guidelines/PDF/clinical-guidance/Vasectomy.pdf",
				isAnchor: true,
				stance: "supports",
				note: "Clinical guideline context for counseling, complications, effectiveness, and the conclusion that prostate cancer is not a necessary pre-vasectomy risk discussion.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Vasectomy and Risk of Prostate Cancer: A Systematic Review and Meta-analysis",
				publisher: "European Urology Open Science",
				year: 2022,
				url: "https://consensus.app/papers/vasectomy-and-risk-of-prostate-cancer-a-systematic-review-baboudjian-rajwa/f3ef08cfb8d253538fa54b0d6f4747cc/",
				pmid: "35633829",
				stance: "debate",
				note: "Meta-analysis finding a small association concentrated in localized disease that approached null after adjustment for prostate-specific antigen screening.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "The Association Between Vasectomy and Prostate Cancer: A Systematic Review and Meta-analysis",
				publisher: "JAMA Internal Medicine",
				year: 2017,
				url: "https://pubmed.ncbi.nlm.nih.gov/28715534/",
				pmid: "28715534",
				stance: "supports",
				note: "Systematic review concluding that any observed association was weak, unlikely to be causal, and not associated with high-grade, advanced, or fatal prostate cancer.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Does bariatric surgery reduce mortality and major cardiovascular risk in severe obesity?",
		slug: "does-bariatric-surgery-reduce-mortality-and-major-cardiovascular-risk-in-severe-obesity",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"Probably yes for appropriately selected adults with severe obesity. Large long-term cohorts consistently associate metabolic or bariatric surgery with lower all-cause mortality and fewer major cardiovascular events than non-surgical care. Because most hard-outcome evidence is observational, the exact causal benefit is less certain than the direction; surgery also has real perioperative, nutritional, and lifelong follow-up requirements.",
		stableCore: [
			"Metabolic or bariatric surgery produces larger and more durable average weight loss than non-surgical treatment for severe obesity.",
			"Long-term observational studies associate surgery with lower all-cause and cardiovascular mortality and fewer major cardiovascular events.",
			"Benefits often include improvement or remission of type 2 diabetes, hypertension, sleep apnea, and other obesity-related disease.",
			"Procedure choice, operative risk, nutritional deficiencies, mental health, pregnancy planning, and access to lifelong follow-up materially affect the decision."
		],
		openQuestions: [
			"How large are the mortality and cardiovascular benefits after fully accounting for selection, health-care access, and adherence differences?",
			"Which procedure and timing provide the best balance of benefit, complications, weight recurrence, and patient priorities for each subgroup?"
		],
		whatWouldChangeMinds: [
			"Long-term randomized or exceptionally strong quasi-experimental evidence showing no reduction in major events or mortality.",
			"New safety evidence showing that late harms outweigh cardiometabolic benefits in currently recommended patient groups."
		],
		misconceptions: [
			"Surgery is not merely cosmetic; it is a metabolic treatment for a chronic disease.",
			"Lower observational mortality does not mean every individual should have surgery or that confounding is impossible.",
			"Surgery does not eliminate the need for nutrition, activity, medication review, and long-term clinical follow-up."
		],
		editorSummary:
			"The hard-outcome signal is compelling but should be described with observational-study humility. The page should help readers understand both the substantial average benefit in severe obesity and the irreversible, lifelong nature of the treatment decision.",
		uncertaintySummary:
			"Evidence for weight and metabolic improvement is strong; confidence in reduced mortality and major cardiovascular events is moderate because randomized trials are not long or large enough for those outcomes. Procedure-specific late harms and equitable access remain important.",
		sources: [
			{
				kind: "guideline",
				title: "2022 ASMBS and IFSO Indications for Metabolic and Bariatric Surgery",
				publisher: "American Society for Metabolic and Bariatric Surgery",
				year: 2022,
				url: "https://asmbs.org/resources/2022-asmbs-and-ifso-indications-for-metabolic-and-bariatric-surgery/",
				isAnchor: true,
				stance: "supports",
				note: "Current multidisciplinary indications and safety framework for selecting patients and treating metabolic or bariatric surgery as evidence-based obesity care.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Bariatric Surgery and Cardiovascular Disease: A Systematic Review and Meta-analysis",
				publisher: "European Heart Journal",
				year: 2022,
				url: "https://consensus.app/papers/bariatric-surgery-and-cardiovascular-disease-a-veldhuisen-gorter/dd36c0c117b455f6a5d3d0679b4a0142/",
				pmid: "35243488",
				stance: "supports",
				note: "Meta-analysis of 39 cohort studies associating surgery with lower all-cause mortality, cardiovascular mortality, and major cardiovascular events while noting the absence of randomized hard-outcome trials.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Effects of Bariatric Surgery on Mortality in Swedish Obese Subjects",
				publisher: "The New England Journal of Medicine",
				year: 2007,
				url: "https://pubmed.ncbi.nlm.nih.gov/17715408/",
				pmid: "17715408",
				stance: "supports",
				note: "Landmark prospective controlled cohort providing long-term evidence of lower overall mortality after bariatric surgery, with the usual limitations of non-random treatment assignment.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Do long-term opioids provide sustained benefit for chronic non-cancer pain?",
		slug: "do-long-term-opioids-provide-sustained-benefit-for-chronic-non-cancer-pain",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"For most chronic non-cancer pain, evidence does not show a large, reliably sustained long-term advantage over non-opioid care, while overdose, dependence, falls, endocrine effects, and other harms rise with exposure and dose. Some carefully selected patients may experience meaningful benefit, so the consensus is individualized use with explicit goals and reassessment—not that opioids never help or that indefinite escalation is broadly supported.",
		stableCore: [
			"Randomized evidence mainly covers short durations and finds small average improvements in pain and function.",
			"Evidence for benefits lasting beyond one year is very limited, whereas serious harms are well documented and often dose-related.",
			"Open-label extension studies lose many participants, making apparent long-term benefit among completers difficult to generalize.",
			"Guidelines emphasize shared decisions, realistic functional goals, the lowest effective dose, non-opioid options, and avoiding abrupt involuntary discontinuation."
		],
		openQuestions: [
			"Which patient characteristics reliably predict durable functional benefit that exceeds long-term harm?",
			"How can health systems reduce unsafe prescribing without abandoning patients, triggering withdrawal, or forcing rapid tapering?"
		],
		whatWouldChangeMinds: [
			"Large, long-duration randomized trials showing durable functional superiority with acceptable rates of serious harm.",
			"Validated tools that prospectively identify patients with a favorable long-term benefit-to-harm balance."
		],
		misconceptions: [
			"Limited evidence for average long-term benefit is not proof that no individual patient benefits.",
			"Physical dependence is expected with repeated exposure and is not identical to opioid use disorder.",
			"Recognizing opioid harms does not justify abrupt tapering or withholding treatment for acute pain, cancer pain, palliative care, or end-of-life care."
		],
		editorSummary:
			"The key consensus is about evidence boundaries and risk management. Long-term opioid therapy should not be presented as a generally proven durable solution, but patients already taking opioids need individualized, non-punitive care rather than slogans.",
		uncertaintySummary:
			"Short-term average effects and dose-related harms are reasonably characterized; durable functional benefit is uncertain because long trials are scarce and attrition is high. Individual response varies, and the evidence does not support a universal prohibition.",
		sources: [
			{
				kind: "guideline",
				title: "CDC Clinical Practice Guideline for Prescribing Opioids for Pain — United States, 2022",
				publisher: "Centers for Disease Control and Prevention",
				year: 2022,
				url: "https://www.cdc.gov/mmwr/volumes/71/rr/rr7103a1.htm",
				isAnchor: true,
				stance: "supports",
				note: "Current U.S. guideline synthesizing limited long-term benefit evidence, dose-related harms, individualized treatment goals, non-opioid options, and safeguards against abrupt tapering.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Opioid Treatments for Chronic Pain",
				publisher: "Agency for Healthcare Research and Quality",
				year: 2020,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK556253/",
				stance: "supports",
				note: "Comparative-effectiveness review finding small short-term benefits, very limited evidence beyond one year, and increased serious harms with long-term opioid therapy.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Efficacy and harms of long-term opioid therapy in chronic non-cancer pain: Systematic review and meta-analysis of open-label extension trials with a study duration ≥26 weeks",
				publisher: "European Journal of Pain",
				year: 2020,
				url: "https://consensus.app/papers/efficacy-and-harms-of-longterm-opioid-therapy-in-chronic-bialas-maier/ce101f1f16375d53868c4a04dab35865/",
				stance: "debate",
				note: "Review of 15 extension studies showing that only about 31% completed treatment and rating the evidence very low quality, which limits inference from outcomes among remaining participants.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "health-and-medicine",
		title: "Should menopausal hormone therapy be used to prevent chronic disease in most postmenopausal adults?",
		slug: "should-menopausal-hormone-therapy-be-used-to-prevent-chronic-disease-in-most-postmenopausal-adults",
		consensusBand: "strong",
		confidenceScore: 92,
		bottomLine:
			"No—not as a routine primary-prevention medicine for otherwise asymptomatic postmenopausal adults. Trials find some benefits, including fewer fractures and less diabetes, but also harms that vary by formulation, route, age, and timing; the overall balance does not support starting systemic hormone therapy mainly to prevent cardiovascular disease, dementia, or other chronic conditions. This is separate from using it to treat bothersome menopausal symptoms.",
		stableCore: [
			"Systemic menopausal hormone therapy is effective for vasomotor symptoms and can prevent bone loss in appropriately selected patients.",
			"Primary-prevention trials show a mixture of benefits and harms rather than a net chronic-disease prevention advantage for the general postmenopausal population.",
			"Risk depends on age, time since menopause, uterus status, formulation, dose, route, and personal cardiovascular, cancer, clotting, and fracture risk.",
			"Recommendations about symptom treatment cannot be substituted for recommendations about starting therapy solely to prevent future disease."
		],
		openQuestions: [
			"How do lower doses, transdermal routes, and newer formulations change long-term outcomes for specific risk profiles?",
			"Which younger, recently menopausal subgroups might have a different long-term benefit-to-harm balance without turning symptom treatment into blanket prevention?"
		],
		whatWouldChangeMinds: [
			"Large long-term randomized trials showing a favorable net prevention benefit for a clearly defined population and regimen.",
			"Reliable evidence that newer formulations avoid the important harms seen in existing prevention trials while retaining broad chronic-disease benefits."
		],
		misconceptions: [
			"A recommendation against routine primary prevention is not a recommendation against hormone therapy for all menopausal symptoms.",
			"Relative risks from one formulation or age group should not be copied to every route, dose, or patient.",
			"Changing product warnings does not by itself establish that hormone therapy prevents chronic disease overall."
		],
		editorSummary:
			"This page must preserve the indication boundary. Hormone therapy can be an appropriate and effective symptom treatment, but that does not make it a general anti-aging or chronic-disease prevention strategy.",
		uncertaintySummary:
			"The no-routine-primary-prevention conclusion is high-confidence for the population addressed by prevention recommendations. Individual symptom-treatment decisions remain preference-sensitive, and evidence for newer regimens is less complete than for older oral formulations.",
		sources: [
			{
				kind: "guideline",
				title: "Menopausal Hormone Therapy: Preventive Medication",
				publisher: "U.S. Preventive Services Task Force",
				year: 2022,
				url: "https://www.uspreventiveservicestaskforce.org/uspstf/document/RecommendationStatementFinal/menopausal-hormone-therapy-preventive-medication",
				isAnchor: true,
				stance: "supports",
				note: "Recommendation against combined or estrogen-only systemic therapy for primary prevention of chronic conditions, explicitly outside the separate question of treating menopausal symptoms.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Hormone Therapy for the Primary Prevention of Chronic Conditions in Postmenopausal Persons: Updated Evidence Report and Systematic Review for the US Preventive Services Task Force",
				publisher: "JAMA",
				year: 2022,
				url: "https://consensus.app/papers/hormone-therapy-for-the-primary-prevention-of-chronic-gartlehner-patel/436f9598b7145defa2051b5b6eabf02d/",
				stance: "supports",
				note: "Evidence review of 20 trials and 39,145 participants documenting both benefits and harms and finding no overall primary-prevention advantage.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "The 2022 Hormone Therapy Position Statement of The North American Menopause Society",
				publisher: "The North American Menopause Society",
				year: 2022,
				url: "https://pubmed.ncbi.nlm.nih.gov/35797481/",
				pmid: "35797481",
				stance: "context",
				note: "Clinical position statement explaining symptom benefits, timing and route considerations, contraindications, and the need for individualized rather than blanket treatment.",
				order: 3
			}
		]
	})
];

export const july2026ExpansionClaims: SeedClaim[] = [
	...crossTopicClaims,
	...july2026EvolutionClaims
];
