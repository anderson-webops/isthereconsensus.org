import type { SeedClaim } from "./claims.js";
import {
	august2026EncyclopediaTrancheFiveSourcedClaim as reviewedClaim,
	encyclopediaDoiSources as sources
} from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026EvolutionFinalClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Can losing genes be an adaptive evolutionary change?",
		slug: "can-losing-genes-be-an-adaptive-evolutionary-change",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Evolution does not inevitably add parts or increase complexity. Gene loss can be neutral, harmful, or adaptive when a function is costly or unnecessary in a particular environment; streamlining and loss-of-function changes are common in parasites, symbionts, microbes, and other lineages.",
		stableCore: [
			"Natural selection favors reproductive success in a current environment, not complexity for its own sake.",
			"Comparative genomics documents repeated gene and genome reduction, while experiments show that some losses improve fitness under specific conditions.",
			"Calling a loss adaptive requires evidence about fitness and environment; not every missing gene is beneficial."
		],
		openQuestions: [
			"How often is a particular loss driven by selection rather than drift or relaxed constraint?",
			"Which ecological transitions make simplification more likely than innovation?"
		],
		whatWouldChangeMinds: [
			"Genomic and fitness studies showing that apparent adaptive losses are consistently annotation artifacts or nonadaptive by-products.",
			"A better general model explaining repeated beneficial loss-of-function evolution without selection or changed ecological costs."
		],
		misconceptions: [
			"Evolution has no built-in ladder from simple to complex.",
			"Losing a gene is not automatically degeneration.",
			"An adaptive loss in one environment need not remain beneficial after conditions change."
		],
		editorSummary:
			"Evolution can build, repurpose, or discard. Whether a change is adaptive depends on its fitness consequences, not whether it looks more elaborate.",
		uncertaintySummary:
			"Gene loss is pervasive; the harder case-by-case question is whether drift, relaxed selection, or positive selection best explains a specific loss.",
		sources: sources([
			[
				"systematic_review",
				"Evolution by gene loss",
				"Nature Reviews Genetics",
				2016,
				"10.1038/nrg.2016.39",
				"Review of gene loss as a pervasive source of phenotypic variation and, in many settings, adaptation."
			],
			[
				"systematic_review",
				"Genome reduction as the dominant mode of evolution",
				"BioEssays",
				2013,
				"10.1002/bies.201300037",
				"Synthesis showing extensive evolutionary simplification punctuated by episodes of complexification."
			],
			[
				"landmark_study",
				"Bacterial adaptation through loss of function",
				"PLoS Genetics",
				2013,
				"10.1371/journal.pgen.1003617",
				"Experimental and comparative evidence that loss-of-function mutations can repeatedly improve bacterial fitness."
			]
		])
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Do organisms mutate because they need a particular adaptation?",
		slug: "do-organisms-mutate-because-they-need-a-particular-adaptation",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Generally no. Mutations arise before selection can test whether they help, and they are not produced because an organism foresees the useful answer. Mutation rates and locations are not perfectly uniform—and stress can alter mutation processes—but that bias is different from directing a specific beneficial change because it is needed.",
		stableCore: [
			"Classic fluctuation experiments and later molecular work show that resistant variants can arise before exposure selects them.",
			"Biochemical mechanisms create mutation-rate and mutation-spectrum biases without knowing which change will improve future fitness.",
			"Selection then changes the frequencies of variants according to their consequences in the environment."
		],
		openQuestions: [
			"How much do evolved mutation biases influence which adaptive paths are available in different populations?",
			"When does stress-induced mutagenesis increase evolvability enough to be favored despite its costs?"
		],
		whatWouldChangeMinds: [
			"Replicated experiments showing organisms reliably generate the particular beneficial sequence change only when that benefit is needed, after excluding selection and known mutation biases.",
			"A molecular mechanism that senses a future adaptive target and edits the relevant locus with demonstrated specificity."
		],
		misconceptions: [
			"Random with respect to fitness does not mean every nucleotide changes with equal probability.",
			"Stress-altered mutation rates are not proof that mutations anticipate a useful result.",
			"Artificial directed evolution is an engineering method, not evidence of foresight in natural mutation."
		],
		editorSummary:
			"Mutation supplies biased but non-foresighted variation; selection filters the consequences. Those two ideas are compatible, not contradictory.",
		uncertaintySummary:
			"The core distinction is settled. Research continues on how mutation bias, stress responses, population size, and existing variation shape actual evolutionary paths.",
		sources: sources([
			[
				"systematic_review",
				"Mutation and Adaptation: The Directed Mutation Controversy in Evolutionary Perspective",
				"Annual Review of Ecology and Systematics",
				1995,
				"10.1146/annurev.es.26.110195.003005",
				"Review explaining why proposed directed-mutation cases do not require mutations targeted to adaptive need."
			],
			[
				"systematic_review",
				"The Role of Mutation Bias in Adaptive Evolution",
				"Trends in Ecology & Evolution",
				2019,
				"10.1016/j.tree.2019.01.015",
				"Modern review separating real mutation bias from the claim that mutation itself anticipates adaptation."
			],
			[
				"landmark_study",
				"The origin of mutants",
				"Nature",
				1988,
				"10.1038/335142a0",
				"Influential experimental challenge that triggered extensive testing of adaptive-mutation explanations.",
				"debate"
			]
		])
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Can genetic drift change populations without natural selection?",
		slug: "can-genetic-drift-change-populations-without-natural-selection",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Genetic drift is random change in allele frequencies caused by finite sampling from one generation to the next. It can fix or eliminate neutral—and sometimes selected—variants, especially in small populations, so not every evolutionary change is an adaptation produced by natural selection.",
		stableCore: [
			"Population genetics predicts drift from finite reproduction, and laboratory, genomic, and natural-population evidence matches those predictions.",
			"Drift is stronger when effective population size is small and after bottlenecks or founder events.",
			"Selection, mutation, migration, recombination, and drift act together; identifying their relative roles requires population data."
		],
		openQuestions: [
			"What effective population size and linked-selection history best explain diversity in a particular species?",
			"How often does drift carry weakly harmful or beneficial variants to outcomes selection alone would not predict?"
		],
		whatWouldChangeMinds: [
			"Repeated population data violating finite-sampling predictions after measurement error, migration, and selection are modeled.",
			"A successful evolutionary model that explains neutral diversity and bottleneck effects without stochastic allele-frequency change."
		],
		misconceptions: [
			"Drift is an evolutionary mechanism, not merely measurement noise.",
			"A trait's presence does not prove it was favored by selection.",
			"Random drift at one level does not make all of evolution random."
		],
		editorSummary:
			"Evolution includes chance as well as selection. Drift is indispensable for explaining why finite populations diverge and lose variation.",
		uncertaintySummary:
			"The existence of drift is foundational; uncertainty lies in estimating its strength relative to selection, migration, and linked genomic processes in a given case.",
		sources: sources([
			[
				"landmark_study",
				"Evolutionary Rate at the Molecular Level",
				"Nature",
				1968,
				"10.1038/217624a0",
				"Landmark neutral-theory paper formalizing how drift can dominate many molecular substitutions."
			],
			[
				"systematic_review",
				"Determinants of genetic diversity",
				"Nature Reviews Genetics",
				2016,
				"10.1038/nrg.2016.58",
				"Review of effective population size, drift, selection, mutation, and linked processes shaping diversity."
			],
			[
				"landmark_study",
				"Evolution in Mendelian Populations",
				"Genetics",
				1931,
				"10.1093/genetics/16.2.97",
				"Foundational population-genetic treatment of finite-population sampling and evolutionary change."
			]
		])
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Does transgenerational epigenetic inheritance overturn modern evolutionary theory?",
		slug: "does-transgenerational-epigenetic-inheritance-overturn-modern-evolutionary-theory",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Heritable epigenetic states are real and can contribute to phenotypic variation, especially in plants and some animals, but they extend rather than replace evolutionary genetics. In mammals, germline reprogramming limits many marks, robust human evidence across multiple unexposed generations is scarce, and DNA sequence evolution remains central.",
		stableCore: [
			"Inheritance can involve DNA methylation, chromatin, RNA, cytoplasmic factors, and reconstructed regulatory states as well as DNA sequence.",
			"The persistence, resetting, and evolutionary importance of epigenetic variation differ sharply among organisms and mechanisms.",
			"Selection can act on any reliably heritable variation; that principle already accommodates epigenetic contributions."
		],
		openQuestions: [
			"How common and durable are environmentally induced epialleles in natural populations?",
			"What fraction of apparent human transgenerational effects survives control for genetics, shared environment, exposure during gestation, and reporting bias?"
		],
		whatWouldChangeMinds: [
			"Large multigenerational studies showing stable, adaptive human inheritance independent of DNA sequence and renewed exposure.",
			"Evidence that epigenetic inheritance explains broad evolutionary patterns better than models integrating it with established population genetics."
		],
		misconceptions: [
			"Epigenetic inheritance is not the same as every environmental effect on a parent affecting distant descendants.",
			"Real non-DNA inheritance does not revive the claim that organisms inherit whatever traits they acquire.",
			"Modern evolutionary theory is a developing framework, not a rule that only DNA can matter."
		],
		editorSummary:
			"Epigenetic inheritance is an important mechanism with variable reach. It changes some details of heredity without displacing selection, drift, mutation, or DNA-based inheritance.",
		uncertaintySummary:
			"Mechanisms are well documented in several taxa. Prevalence, persistence, and causal importance—particularly across human generations—remain much less certain.",
		sources: sources([
			[
				"systematic_review",
				"Transgenerational Epigenetic Inheritance: myths and mechanisms",
				"Cell",
				2014,
				"10.1016/j.cell.2014.02.045",
				"Widely cited review distinguishing demonstrated mechanisms from overextended human claims."
			],
			[
				"systematic_review",
				"Molecular mechanisms of transgenerational epigenetic inheritance",
				"Nature Reviews Genetics",
				2022,
				"10.1038/s41576-021-00438-5",
				"Current mechanistic review emphasizing taxonomic differences and more limited effects in mammals."
			],
			[
				"systematic_review",
				"Transgenerational Epigenetic Inheritance: Prevalence, Mechanisms, and Implications for the Study of Heredity and Evolution",
				"The Quarterly Review of Biology",
				2009,
				"10.1086/598822",
				"Broad synthesis arguing for evolutionary relevance while cataloguing mechanisms and evidential limits.",
				"context"
			]
		])
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Can reproductive isolation evolve within observable timescales?",
		slug: "can-reproductive-isolation-evolve-within-observable-timescales",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Experiments and observed natural populations show that barriers to gene flow can begin evolving over years or tens of generations. Complete speciation is a process rather than one universally agreed instant, so evidence for rapid reproductive isolation does not always mean every biologist would already assign a new species name.",
		stableCore: [
			"Divergent environments, mate choice, chromosome changes, and genetic incompatibilities can build reproductive isolation.",
			"Laboratory selection experiments and introduced or rapidly diverging populations allow parts of that process to be measured directly.",
			"Species concepts use different criteria, making the boundary between diverging populations and completed species partly operational."
		],
		openQuestions: [
			"Which early barriers persist long enough to produce independently evolving lineages rather than later collapse?",
			"How do gene flow, geography, ecology, sexual selection, and demographic persistence interact across taxa?"
		],
		whatWouldChangeMinds: [
			"Reanalysis showing rapid-isolation cases are artifacts of plasticity, sampling, or pre-existing structure rather than heritable divergence.",
			"Experimental programs consistently failing to evolve reproductive barriers under conditions predicted to promote them."
		],
		misconceptions: [
			"Observing speciation does not require watching one animal abruptly give birth to a different species.",
			"Partial reproductive isolation can be strong evidence about process without settling taxonomy.",
			"Rapid examples do not imply that all speciation is fast."
		],
		editorSummary:
			"Scientists can observe populations moving along the speciation continuum, including measurable reproductive isolation; labels usually lag behind the process.",
		uncertaintySummary:
			"Rapid divergence is well documented, while the completion and permanence of speciation are harder to establish and vary with species concept and timescale.",
		sources: sources([
			[
				"systematic_review",
				"The Past and Future of Experimental Speciation",
				"Trends in Ecology & Evolution",
				2020,
				"10.1016/j.tree.2019.08.009",
				"Review of direct experimental tests that produce and measure barriers to gene flow in real time."
			],
			[
				"landmark_study",
				"Rapid evolution of reproductive isolation in the wild: evidence from introduced salmon",
				"Science",
				2000,
				"10.1126/science.290.5491.516",
				"Field evidence of reproductive isolation evolving after fewer than thirteen generations in divergent habitats."
			],
			[
				"systematic_review",
				"Laboratory experiments on speciation: what have we learned in 40 years?",
				"Evolution",
				1993,
				"10.1111/j.1558-5646.1993.tb01257.x",
				"Synthesis of laboratory selection experiments and what they establish about the evolution of reproductive isolation."
			]
		])
	})
];
