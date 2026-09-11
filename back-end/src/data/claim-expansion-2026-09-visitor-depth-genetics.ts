import type { SeedClaim } from "./claims.js";
import { september2026VisitorDepthClaim as reviewedClaim } from "./claim-expansion-2026-09-visitor-depth-shared.js";

const whoGenomeEditingRecommendations = [
	"consensus_statement",
	"Human genome editing: recommendations",
	"World Health Organization",
	2021,
	"https://www.who.int/publications/i/item/9789240030381",
	"WHO distinguishes somatic, germline, and heritable editing and calls for evidence-based safety, effectiveness, registration, and governance."
] as const;

const populationDescriptorsReport = [
	"consensus_statement",
	"Using Population Descriptors in Genetics and Genomics Research: A New Framework for an Evolving Field",
	"National Academies of Sciences, Engineering, and Medicine",
	2023,
	"10.17226/26902",
	"National Academies concludes that race should not be used as a proxy for human genetic variation and recommends purpose-specific descriptors."
] as const;

const acmgVariantGuideline = [
	"guideline",
	"Standards and Guidelines for the Interpretation of Sequence Variants: A Joint Consensus Recommendation of the ACMG and AMP",
	"Genetics in Medicine",
	2015,
	"10.1038/gim.2015.30",
	"ACMG and AMP define five variant classes and state that a variant of uncertain significance should not be used for clinical decision-making."
] as const;

const nasemGeCropsReport = [
	"consensus_statement",
	"Genetically Engineered Crops: Experiences and Prospects",
	"National Academies of Sciences, Engineering, and Medicine",
	2016,
	"10.17226/23395",
	"Independent assessment separates crop traits and management systems, finding heterogeneous benefits alongside evolved pest and weed resistance."
] as const;

export const september2026VisitorDepthGeneticsClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Does CRISPR always make only the intended DNA change?",
		slug: "does-crispr-always-make-only-the-intended-dna-change",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. CRISPR systems can be highly targeted, but an edit can also create changes at unintended sites or unexpected deletions, insertions, and rearrangements at the intended site. Frequency depends on the enzyme, guide, cell, delivery method, target, dose, and detection method, which is why therapeutic products require extensive product-specific testing rather than a blanket precision assumption.",
		stableCore: [
			"Matching a guide RNA to a target improves specificity but does not make molecular recognition perfect.",
			"Repair of the intended DNA break can itself produce several outcomes rather than one guaranteed sequence.",
			"Modern editing and detection methods can reduce and characterize risk without proving that every edited cell is identical."
		],
		openQuestions: [
			"Which combinations of editor, delivery system, assay, and cell type best predict clinically important unintended outcomes?",
			"How should rare edits, mosaicism, and long-term clonal effects be monitored after different therapies?"
		],
		whatWouldChangeMinds: [
			"Validated whole-genome and long-read evidence showing representative clinical editing produces only the specified change across relevant cells and follow-up.",
			"Conversely, reproducible evidence that current assays systematically miss consequential alterations in approved products."
		],
		misconceptions: [
			"More precise than older tools does not mean perfectly precise in every application.",
			"Off-target edits are not the only concern; unexpected repair can occur at the intended target.",
			"A laboratory observation does not establish the same risk in every clinical product."
		],
		editorSummary:
			"CRISPR is a family of programmable tools, not a promise of one flawless edit. The useful question is whether a specific product has measured, minimized, and clinically bounded its unintended outcomes.",
		uncertaintySummary:
			"The existence of unintended outcomes is well established. Their frequency and clinical significance vary sharply by platform and application, and detection continues to improve.",
		sources: [
			whoGenomeEditingRecommendations,
			[
				"landmark_study",
				"Repair of double-strand breaks induced by CRISPR-Cas9 leads to large deletions and complex rearrangements",
				"Nature Biotechnology",
				2018,
				"10.1038/nbt.4192",
				"Long-read and targeted analyses demonstrated that repair at an intended cut site can generate large deletions and rearrangements."
			],
			[
				"systematic_review",
				"Defining and improving the genome-wide specificities of CRISPR-Cas9 nucleases",
				"Nature Reviews Genetics",
				2016,
				"10.1038/nrg.2016.28",
				"Review explains off-target mechanisms, measurement limitations, and strategies for improving specificity."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Are somatic gene-therapy changes normally inherited by a patient's children?",
		slug: "are-somatic-gene-therapy-changes-normally-inherited-by-a-patients-children",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. Current somatic gene therapies are designed to modify selected body cells in the treated person, not eggs, sperm, or an embryo, so their therapeutic changes are not normally passed to children. Developers still assess where vectors travel and whether reproductive tissues are exposed because somatic delivery and heritable germline editing are biologically and ethically distinct, not separated by assumption alone.",
		stableCore: [
			"Somatic cells make up the body, while germ cells and their precursors contribute DNA to future offspring.",
			"Approved human gene therapies target the patient rather than intentionally modifying descendants.",
			"Biodistribution and reproductive-risk testing address unintended exposure before and after clinical use."
		],
		openQuestions: [
			"How should reproductive monitoring differ across viral vectors, nanoparticles, edited cells, doses, and target organs?",
			"Could future technologies that derive gametes from edited cells blur today's practical boundary?"
		],
		whatWouldChangeMinds: [
			"Verified transmission of a therapeutic somatic edit through human eggs or sperm under approved clinical use.",
			"A new treatment intentionally targeting reproductive cells, which would need to be evaluated as germline rather than ordinary somatic therapy."
		],
		misconceptions: [
			"Changing some DNA in a patient does not mean changing every cell in the body.",
			"Long-lasting benefit for one person is not the same as inheritance by their children.",
			"Somatic therapy still requires reproductive safety assessment even though inheritance is not its purpose."
		],
		editorSummary:
			"The target cell matters. Somatic therapy treats one patient's tissues, while heritable editing would alter the genetic starting point of a future child and descendants.",
		uncertaintySummary:
			"The basic distinction is firm. Product-specific uncertainty concerns unintended biodistribution and rare reproductive exposure, especially for new delivery platforms.",
		sources: [
			[
				"guideline",
				"Gene Therapy and Other Medical Advances",
				"MedlinePlus Genetics, U.S. National Library of Medicine",
				2023,
				"https://medlineplus.gov/download/genetics/understanding/therapy.pdf",
				"NIH educational guidance explains that current gene therapy focuses on somatic cells and that these alterations cannot ordinarily pass to children."
			],
			[
				"guideline",
				"Guidance for Industry: Human Somatic Cell Therapy and Gene Therapy",
				"U.S. Food and Drug Administration",
				1998,
				"https://www.fda.gov/media/72402/download",
				"FDA defines somatic cell therapy as involving non-germline cells and identifies vector localization to reproductive organs as a safety question."
			],
			whoGenomeEditingRecommendations
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Can ancestry DNA tests identify a person's exact ethnicity or tribal identity?",
		slug: "can-ancestry-dna-tests-identify-a-persons-exact-ethnicity-or-tribal-identity",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. Consumer ancestry tests estimate genetic similarity to selected reference groups; results depend on who is represented, which markers and models are used, and how populations are labeled. They can support genealogy and broad geographic inference, but they cannot determine a person's culture, citizenship, ethnicity, community acceptance, or tribal membership.",
		stableCore: [
			"Autosomal ancestry estimates are statistical comparisons with reference panels rather than direct readings of identity.",
			"Estimates can differ across companies and change when databases or algorithms are updated.",
			"Social and political membership criteria include kinship, history, law, and community relationships that DNA alone cannot supply."
		],
		openQuestions: [
			"How can companies communicate uncertainty, reference-panel gaps, and changing estimates more clearly?",
			"Which governance practices best protect communities whose samples or labels are used in ancestry databases?"
		],
		whatWouldChangeMinds: [
			"A validated genetic method that uniquely maps every person to stable, universally defined ethnic and political identities.",
			"Evidence that reference-panel composition and company methods no longer materially affect ancestry estimates."
		],
		misconceptions: [
			"A percentage estimate is not a certificate of cultural or legal membership.",
			"Geographic ancestry, ethnicity, race, nationality, and tribal citizenship are not interchangeable concepts.",
			"A changed estimate after a database update does not mean the person's DNA changed."
		],
		editorSummary:
			"Ancestry testing can add clues to family history, but its categories are built from comparison data and modeling. Identity and belonging remain larger than a genotype estimate.",
		uncertaintySummary:
			"Close biological relationships and some broad ancestry patterns can be estimated well. Fine-grained percentages and identity labels are more sensitive to sampling, migration, admixture, and company choices.",
		sources: [
			[
				"guideline",
				"What is genetic ancestry testing?",
				"MedlinePlus Genetics, U.S. National Library of Medicine",
				2026,
				"https://medlineplus.gov/genetics/understanding/dtcgenetictesting/ancestrytesting/",
				"NIH explains how reference databases, unequal representation, migration, and company methods limit ancestry estimates."
			],
			populationDescriptorsReport,
			[
				"context",
				"Epistemic and ethical considerations in the direct-to-consumer health and ancestry genetic testing process",
				"McGill Journal of Medicine",
				2021,
				"10.26443/mjm.v20i1.853",
				"Review describes technical, interpretive, privacy, identity, and equity limits in direct-to-consumer ancestry testing."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Is self-identified race interchangeable with genetic ancestry in medical research?",
		slug: "is-self-identified-race-interchangeable-with-genetic-ancestry-in-medical-research",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. Race is a social classification shaped by place and history, whereas genetic ancestry describes probabilistic relationships to ancestors or reference populations. Race can be important when studying racism and unequal treatment, but using it as an automatic proxy for genetic variation can obscure continuous diversity, mixed ancestry, environment, and structural causes of health differences.",
		stableCore: [
			"Most human genetic variation is continuous and shared rather than divided into discrete racial packages.",
			"People within one racial category can differ substantially in genetic ancestry, and categories vary across societies.",
			"The appropriate descriptor depends on whether a study asks about genetics, geography, lived social experience, discrimination, or another exposure."
		],
		openQuestions: [
			"Which combinations of genetic, environmental, geographic, and social measures best answer particular medical questions?",
			"How can legacy datasets be reanalyzed without erasing the effects of racism or overclaiming biological differences?"
		],
		whatWouldChangeMinds: [
			"Replicated genomic evidence that common racial categories consistently form discrete biological populations across settings.",
			"Evidence that substituting race for measured ancestry and relevant exposures improves causal explanation without systematic error."
		],
		misconceptions: [
			"Calling race social does not mean racism lacks biological health consequences.",
			"Rejecting race as a genetic proxy does not mean every allele has identical frequency everywhere.",
			"Genetic ancestry is itself model-dependent and should not be turned into a new rigid race label."
		],
		editorSummary:
			"Race may measure social treatment; ancestry may help describe population history. Good research states which mechanism it means instead of asking one label to stand in for both.",
		uncertaintySummary:
			"The non-equivalence is strongly established. The harder question is which descriptors and direct measurements are most informative for each clinical or research purpose.",
		sources: [
			populationDescriptorsReport,
			[
				"systematic_review",
				"Race and genetics versus 'race' in genetics",
				"Evolution, Medicine, and Public Health",
				2021,
				"10.1093/emph/eoab018",
				"Systematic review finds frequent conceptual problems when racial labels substitute for evolutionary and genetic population reasoning."
			],
			[
				"guideline",
				"Researchers Need to Rethink and Justify How and Why Race, Ethnicity, and Ancestry Labels Are Used",
				"National Academies of Sciences, Engineering, and Medicine",
				2023,
				"https://www.nationalacademies.org/news/researchers-need-to-rethink-and-justify-how-and-why-race-ethnicity-and-ancestry-labels-are-used-in-genetics-and-genomics-research-says-new-report",
				"National Academies summarizes why race is misleading as a proxy for genetic variation while remaining relevant to research on racism."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Does a variant of uncertain significance diagnose a genetic disorder?",
		slug: "does-a-variant-of-uncertain-significance-diagnose-a-genetic-disorder",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"No. A variant of uncertain significance means available evidence cannot yet classify a DNA change as disease-causing or benign. It should not by itself establish a diagnosis, direct irreversible treatment, or trigger predictive testing of relatives; clinical findings, family evidence, validated functional studies, and later reclassification may resolve it.",
		stableCore: [
			"Uncertain is a formal evidence category, not a softer synonym for pathogenic.",
			"Variant classification can change as population, family, functional, and disease-specific evidence accumulates.",
			"A patient's phenotype and independent clinical evidence remain essential to diagnosis."
		],
		openQuestions: [
			"How can laboratories share evidence and recontact patients reliably when classifications change?",
			"Which functional assays are sufficiently validated to move specific variants out of uncertainty?"
		],
		whatWouldChangeMinds: [
			"New evidence satisfying disease-specific criteria that reclassifies the particular variant as pathogenic or likely pathogenic.",
			"A replacement framework validated to make safer clinical decisions from currently uncertain variants."
		],
		misconceptions: [
			"A VUS is not evidence that a disease is genetic or that the variant is probably harmful.",
			"Finding the same VUS in a relative does not automatically prove causation.",
			"Reclassification of one variant does not validate every uncertain result from the same test."
		],
		editorSummary:
			"A VUS is a request for more evidence, not a molecular diagnosis. The safest interpretation resists turning technical uncertainty into false certainty for a patient or family.",
		uncertaintySummary:
			"The clinical rule is clear, while the future classification of any individual variant is genuinely uncertain and may remain unresolved for years.",
		sources: [
			acmgVariantGuideline,
			[
				"systematic_review",
				"Receiving results of uncertain clinical relevance from population genetic screening: systematic review and meta-synthesis of qualitative research",
				"European Journal of Human Genetics",
				2022,
				"10.1038/s41431-022-01054-5",
				"Review documents confusion and distress that can follow uncertain screening results, underscoring the need for careful interpretation and support."
			],
			[
				"guideline",
				"What do the results of genetic tests mean?",
				"MedlinePlus Genetics, U.S. National Library of Medicine",
				2021,
				"https://medlineplus.gov/genetics/understanding/testing/interpretingresults/",
				"NIH explains positive, negative, uninformative, and uncertain results and why results must be interpreted with clinical and family information."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Can a negative genetic test rule out every inherited disorder?",
		slug: "can-a-negative-genetic-test-rule-out-every-inherited-disorder",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. A negative result means the test did not find a reportable disease-causing change within what it could detect and interpret. It may not cover every gene, variant type, mosaic change, repeat expansion, regulatory region, or condition, and science may not yet know the cause, so residual risk depends on the test and the clinical question.",
		stableCore: [
			"Analytic sensitivity, gene coverage, variant classes, and reporting rules differ among tests.",
			"A negative result is most informative when a known familial pathogenic variant was specifically and accurately tested.",
			"Clinical evaluation and family history can remain important after nondiagnostic sequencing."
		],
		openQuestions: [
			"How much diagnostic yield will long-read sequencing, RNA analysis, methylation, and better reference data add?",
			"When should a nondiagnostic genome or exome be reanalyzed as knowledge and methods change?"
		],
		whatWouldChangeMinds: [
			"A test validated to detect and correctly interpret every possible inherited cause relevant to the patient.",
			"A known familial variant excluded with a fully informative targeted test, which can sharply reduce risk for that specific condition."
		],
		misconceptions: [
			"Negative does not mean that symptoms are unreal or that heredity has been disproved.",
			"A broad panel name does not guarantee complete coverage of every included gene and variant type.",
			"The residual risk after a negative test is not the same for every person or disorder."
		],
		editorSummary:
			"Genetic tests answer bounded questions. A useful negative result must be read against the assay's coverage, the suspected condition, and whether the family already has a known variant.",
		uncertaintySummary:
			"The limitation is well established. Residual risk is test-, disorder-, ancestry-, phenotype-, and family-specific, so a universal percentage would mislead.",
		sources: [
			[
				"guideline",
				"What are the risks and limitations of genetic testing?",
				"MedlinePlus Genetics, U.S. National Library of Medicine",
				2021,
				"https://medlineplus.gov/genetics/understanding/testing/riskslimitations/",
				"NIH explains that genetic tests provide limited information and cannot always predict disease, severity, or progression."
			],
			acmgVariantGuideline,
			[
				"systematic_review",
				"The clinical utility of exome and genome sequencing across clinical indications: a systematic review",
				"Human Genetics",
				2021,
				"10.1007/s00439-021-02331-x",
				"Systematic review reports wide diagnostic-yield variation and shows that even broad sequencing remains indication-dependent and often nondiagnostic."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Is whole-genome sequencing of healthy adults proven to improve long-term health outcomes?",
		slug: "is-whole-genome-sequencing-of-healthy-adults-proven-to-improve-long-term-health-outcomes",
		consensusBand: "mixed",
		confidenceScore: 69,
		evidenceCertainty: "low",
		bottomLine:
			"Not yet. Sequencing can uncover actionable variants in a minority of apparently healthy adults, but evidence that population-wide sequencing improves long-term health more than targeted family-history and guideline-based care remains limited. It can also produce uncertain findings, follow-up tests, cost, anxiety, and false reassurance, so feasibility and diagnostic yield are not the same as net clinical benefit.",
		stableCore: [
			"Some people carry high-penetrance variants despite having no symptoms at the time of testing.",
			"Pilot studies show that primary care can disclose selected results but also generates additional evaluation and uncertain findings.",
			"Long-term outcomes, opportunity cost, representativeness, and equitable implementation need stronger comparative evidence."
		],
		openQuestions: [
			"Which genes, ages, populations, and care pathways produce enough preventable disease to justify population screening?",
			"Do downstream surveillance and treatment improve morbidity or mortality without disproportionate harms and cost?"
		],
		whatWouldChangeMinds: [
			"Large randomized or strong quasi-experimental studies showing durable net health benefit and acceptable cost across representative populations.",
			"Evidence that targeted approaches consistently match population sequencing while producing fewer uncertain or unnecessary downstream actions."
		],
		misconceptions: [
			"Finding potentially actionable variants is not itself proof that screening saves lives.",
			"A genome sequence does not capture every health risk, environmental exposure, or future interpretation.",
			"Evidence for sequencing symptomatic rare-disease patients does not automatically establish benefit in healthy adults."
		],
		editorSummary:
			"Population sequencing is a plausible prevention strategy still awaiting outcome evidence. The key comparison is not data versus no data, but better health versus the best targeted alternative after all follow-up consequences.",
		uncertaintySummary:
			"Evidence certainty is low because trials are small, follow-up is short, and most data concern yield or management changes rather than long-term patient outcomes.",
		sources: [
			[
				"landmark_study",
				"The impact of whole-genome sequencing on the primary care and outcomes of healthy adult patients: A pilot randomized trial",
				"Annals of Internal Medicine",
				2017,
				"10.7326/M17-0188",
				"The MedSeq pilot found reportable variants and additional evaluation but was too small and short to establish long-term net benefit."
			],
			[
				"systematic_review",
				"The clinical utility of exome and genome sequencing across clinical indications: a systematic review",
				"Human Genetics",
				2021,
				"10.1007/s00439-021-02331-x",
				"Review finds utility evidence concentrated in diagnostic populations and emphasizes wide variation across indications."
			],
			[
				"guideline",
				"What are the pros and cons of direct-to-consumer genetic testing?",
				"MedlinePlus Genetics, U.S. National Library of Medicine",
				2026,
				"https://medlineplus.gov/genetics/understanding/dtcgenetictesting/dtcrisksbenefits/",
				"NIH summarizes incomplete prediction, confirmatory-testing, privacy, family, and psychosocial limits relevant to broad consumer screening claims."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Can mitochondrial donation reduce transmission of some mitochondrial DNA diseases?",
		slug: "can-mitochondrial-donation-reduce-transmission-of-some-mitochondrial-dna-diseases",
		consensusBand: "broad",
		confidenceScore: 87,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, for carefully selected families. Mitochondrial donation transfers the intended parents' nuclear DNA into a donor egg or embryo with healthy mitochondria, greatly reducing the amount of disease-associated mitochondrial DNA passed on. It does not guarantee zero carryover, and rare re-expansion plus limited long-term human follow-up make specialist selection, regulation, and monitoring essential.",
		stableCore: [
			"Most mitochondrial DNA is inherited through the egg, so replacing affected mitochondria can interrupt transmission.",
			"The resulting child has nuclear DNA from the intended parents and mitochondrial DNA from the donor.",
			"The treatment addresses pathogenic mitochondrial DNA, not disorders caused by nuclear genes or every mitochondrial condition."
		],
		openQuestions: [
			"How often will low-level mitochondrial carryover expand during development or across generations?",
			"What do lifelong health, fertility, psychosocial, and intergenerational follow-up show as the treated cohort grows?"
		],
		whatWouldChangeMinds: [
			"Long-term follow-up showing that disease-associated mitochondrial DNA commonly rebounds to harmful levels despite current selection and technique.",
			"Larger cohorts confirming durable prevention with lower carryover and no unexpected developmental or health effects."
		],
		misconceptions: [
			"The procedure does not replace most of the child's genes or design complex traits.",
			"Reduced transmission risk is not the same as guaranteed elimination of every abnormal mitochondrial genome.",
			"Early healthy births cannot substitute for long-term and intergenerational follow-up."
		],
		editorSummary:
			"Mitochondrial donation is targeted prevention for a narrow class of inherited disease. Its promise is real, but the small human evidence base makes continued follow-up part of the treatment's evidence, not an optional extra.",
		uncertaintySummary:
			"Mechanistic and early clinical evidence support substantial risk reduction. Precision around rare rebound, lifelong safety, and effects in future generations remains limited.",
		sources: [
			[
				"guideline",
				"Mitochondrial donation treatment",
				"Human Fertilisation and Embryology Authority",
				2026,
				"https://www.hfea.gov.uk/treatments/embryo-testing-and-treatments-for-disease/mitochondrial-donation-treatment/",
				"The UK regulator explains eligibility, licensing, donor mitochondria, residual risk, and long-term child follow-up."
			],
			[
				"consensus_statement",
				"Mitochondrial Replacement Techniques: Ethical, Social, and Policy Considerations",
				"National Academies of Sciences, Engineering, and Medicine",
				2016,
				"10.17226/21871",
				"National Academies evaluates scientific rationale, safety uncertainties, oversight, and cautious clinical investigation."
			],
			[
				"systematic_review",
				"Mitochondrial DNA Replacement Techniques to Prevent Human Mitochondrial Diseases",
				"International Journal of Molecular Sciences",
				2021,
				"10.3390/ijms22020551",
				"Review compares replacement methods, carryover, possible reversion, efficacy evidence, and ethical and legal issues."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Have insect-resistant genetically engineered crops generally reduced insecticide use and crop losses?",
		slug: "have-insect-resistant-genetically-engineered-crops-generally-reduced-insecticide-use-and-crop-losses",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "high",
		bottomLine:
			"Generally yes for widely studied Bt cotton and maize, especially where target pests are important. These crops have often reduced spraying against target insects, lowered pest damage, and increased realized yield and profit, but benefits vary by crop, region, pest pressure, seed cost, farmer support, and resistance management; they are not a guarantee for every farm or every pesticide.",
		stableCore: [
			"Bt traits produce proteins active against specified target insects rather than every agricultural pest.",
			"Reduced target-pest losses can raise harvested yield even when the crop's underlying maximum yield is unchanged.",
			"Refuges and integrated pest management help delay evolution of resistance in target insects."
		],
		openQuestions: [
			"How durable are benefits as pest communities, resistance, climate, and farming practices change?",
			"Which stewardship and access systems sustain gains for smallholders without increasing dependency or inequity?"
		],
		whatWouldChangeMinds: [
			"Updated representative farm evidence showing no meaningful reduction in target-insect spraying or losses after accounting for context.",
			"Long-term data showing resistance or secondary pests routinely erase benefits despite recommended management."
		],
		misconceptions: [
			"The average result does not mean every engineered trait, crop, country, or season performs the same way.",
			"Reduced insecticide use does not mean no pesticide use or no ecological tradeoffs.",
			"Higher realized yield from less pest damage is different from increasing the crop's theoretical yield potential."
		],
		editorSummary:
			"The useful unit of evidence is a crop-trait-pest-management system, not the word GMO. For major Bt crops, the average agronomic direction is favorable, with durability depending on stewardship.",
		uncertaintySummary:
			"Evidence is extensive but heterogeneous. Magnitudes vary across study design, geography, baseline spraying, pest pressure, seed markets, and resistance history.",
		sources: [
			nasemGeCropsReport,
			[
				"meta_analysis",
				"A Meta-Analysis of the Impacts of Genetically Modified Crops",
				"PLOS ONE",
				2014,
				"10.1371/journal.pone.0111629",
				"Meta-analysis of 147 studies found average pesticide, yield, and profit benefits, with larger pesticide reductions for insect-resistant than herbicide-tolerant crops."
			],
			[
				"meta_analysis",
				"Impact of genetically engineered maize on agronomic, environmental and toxicological traits: a meta-analysis of 21 years of field data",
				"Scientific Reports",
				2018,
				"10.1038/s41598-018-21284-2",
				"Long-run field-data synthesis found lower target-insect damage and mycotoxins with higher realized yield, while most assessed non-target groups were not reduced."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "genetics-and-biotechnology",
		title: "Do herbicide-tolerant crops prevent herbicide-resistant weeds from evolving?",
		slug: "do-herbicide-tolerant-crops-prevent-herbicide-resistant-weeds-from-evolving",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. Herbicide tolerance lets a crop survive a particular herbicide; it does not stop weeds from evolving resistance. Repeated reliance on one mode of action selects resistant weeds, while crop rotation, multiple effective modes of action, scouting, mechanical and cultural controls, and preventing seed production can slow resistance without making evolution impossible.",
		stableCore: [
			"The engineered crop and the weed population are different organisms under different selection pressures.",
			"Resistance has evolved to many herbicides in both genetically engineered and conventional cropping systems.",
			"Diverse integrated weed management reduces dependence on any single vulnerable control tactic."
		],
		openQuestions: [
			"Which incentive, labeling, and advisory programs produce durable adoption of integrated weed management?",
			"How quickly will new herbicides, gene editing, robotics, and ecological control alter resistance trajectories?"
		],
		whatWouldChangeMinds: [
			"Long-term population evidence showing repeated herbicide exposure does not select heritable resistance in weeds.",
			"Field systems that maintain control indefinitely with one mode of action and no resistance-management practices."
		],
		misconceptions: [
			"Herbicide-tolerant refers to the crop, not a promise that weeds remain susceptible.",
			"Resistant weeds are an evolutionary response to selection, not proof that a crop transferred its tolerance gene to every weed.",
			"Rotating brand names without changing effective modes of action may not diversify selection."
		],
		editorSummary:
			"Herbicide tolerance simplifies weed control in the short run but can concentrate selection. Its durability depends on using it as one tool in an integrated system rather than as an evolutionary exemption.",
		uncertaintySummary:
			"The evolutionary mechanism and observed resistance are well established. Local risk varies by weed biology, herbicide history, crop system, and management adherence.",
		sources: [
			nasemGeCropsReport,
			[
				"guideline",
				"PRN 2017-2: Guidance for Herbicide-Resistance Management, Labeling, Education, Training, and Stewardship",
				"U.S. Environmental Protection Agency",
				2025,
				"https://www.epa.gov/pesticide-registration/prn-2017-2-guidance-herbicide-resistance-management-labeling-education",
				"EPA guidance scales resistance-management requirements to risk and emphasizes labeling, education, training, and stewardship."
			],
			[
				"systematic_review",
				"Integrated weed management systems with herbicide-tolerant crops in the European Union: lessons learnt from home and abroad",
				"Critical Reviews in Biotechnology",
				2017,
				"10.1080/07388551.2016.1180588",
				"Review explains how repeated simplified management can accelerate resistance and why diversified control is more sustainable."
			]
		]
	})
];
