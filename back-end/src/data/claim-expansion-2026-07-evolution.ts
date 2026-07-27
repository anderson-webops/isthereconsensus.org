import type { SeedClaim } from "./claims.js";
import { july2026ReviewedClaim as reviewedClaim } from "./claim-expansion-2026-07-shared.js";

export const july2026EvolutionClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Does evolution have a predetermined goal or always produce perfect organisms?",
		slug: "does-evolution-have-a-predetermined-goal-or-always-produce-perfect-organisms",
		consensusBand: "strong",
		confidenceScore: 98,
		bottomLine:
			"No. Evolution has no scientifically detected predetermined destination and does not engineer perfect organisms. Populations change through mutation, recombination, natural selection, genetic drift, migration, and historical contingency. Adaptations are workable responses to past and present environments, constrained by ancestry and tradeoffs rather than optimized from scratch.",
		stableCore: [
			"Natural selection favors heritable variants that increase reproductive success in a particular environment; it does not plan for future needs.",
			"Evolution modifies inherited structures, so history constrains which paths are available.",
			"Traits often involve tradeoffs: an advantage in one environment, life stage, or function can impose a cost elsewhere.",
			"Lineages can become less complex, go extinct, or change without moving toward humans, intelligence, or any universal ladder of progress."
		],
		openQuestions: [
			"How predictable are evolutionary outcomes when similar environments act on different genetic and historical starting points?",
			"Which apparent imperfections reflect unavoidable tradeoffs, changing environments, weak selection, drift, or incomplete scientific understanding?"
		],
		whatWouldChangeMinds: [
			"Repeatable evidence that evolutionary change anticipates future environments through a goal-directed mechanism not reducible to known biological processes.",
			"Evidence that independent lineages consistently converge on one universal endpoint regardless of history, environment, and chance."
		],
		misconceptions: [
			"Calling a trait an adaptation does not mean it is perfect or designed for every modern environment.",
			"More recently evolved does not mean more advanced.",
			"Humans are one living branch of evolution, not the destination toward which all other lineages were moving."
		],
		editorSummary:
			"Everyday language tempts people to turn adaptation into intention and history into progress. The scientific account is local, constrained, and contingent: organisms can become well fitted without evolution aiming at a final form.",
		uncertaintySummary:
			"The absence of a predetermined evolutionary goal and the ubiquity of constraint and tradeoff are foundational. Researchers actively study predictability and convergence, but convergence is not evidence of foresight or a universal endpoint.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Evolution Resources: How can random biological changes lead to more adapted organisms?",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				url: "https://www.nationalacademies.org/evolution-resources",
				isAnchor: true,
				stance: "supports",
				note:
					"National Academies explanation that evolutionary variation is not directed toward predetermined goals and that selection produces adaptation without foresight.",
				order: 1
			},
			{
				kind: "context",
				title: "Avoiding the pitfall of progress and associated perils of evolutionary education",
				publisher: "Evolution: Education and Outreach",
				year: 2012,
				url:
					"https://consensus.app/papers/avoiding-the-pitfall-of-progress-and-associated-perils-of-werth/fc0e4cb1412557b4a5140d76366ee8ab/",
				stance: "supports",
				note:
					"Scholarly treatment of progress and teleology misconceptions and why ladder-like language misrepresents branching evolutionary history.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Misconceptions about evolution",
				publisher: "Understanding Evolution, University of California Museum of Paleontology",
				url: "https://evolution.berkeley.edu/teach-evolution/misconceptions-about-evolution/",
				stance: "context",
				note:
					"Evidence-based teaching guide addressing perfection, need, purpose, progress, and other recurring misunderstandings of natural selection.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Is evolution entirely random?",
		slug: "is-evolution-entirely-random",
		consensusBand: "strong",
		confidenceScore: 98,
		bottomLine:
			"No. Chance is important in mutation, recombination, reproduction, and genetic drift, but natural selection is systematically non-random: heritable variants that work better in a given environment tend to leave more descendants. Evolution combines stochastic and non-random processes; it is neither a pure lottery nor a planned progression.",
		stableCore: [
			"Mutations arise without regard to whether an organism needs their effects, although mutation rates and types can have biological biases.",
			"Genetic drift changes variant frequencies by chance, especially in small populations.",
			"Natural selection is non-random differential survival and reproduction relative to an environment.",
			"Migration, recombination, mate choice, population structure, and historical contingency add further processes that cannot be reduced to one use of the word random."
		],
		openQuestions: [
			"How do mutation bias, developmental bias, drift, and selection combine to shape which evolutionary paths are most likely?",
			"How predictable is evolution at molecular, trait, population, and ecosystem scales?"
		],
		whatWouldChangeMinds: [
			"Evidence that fitness differences do not systematically affect reproductive success across generations.",
			"Evidence that mutations generally arise because they would solve the organism's current adaptive need."
		],
		misconceptions: [
			"Random mutation does not imply random survival and reproduction.",
			"Non-random selection does not imply conscious choice, planning, or guaranteed progress.",
			"An outcome influenced by chance can still have strong statistical patterns and physical explanations."
		],
		editorSummary:
			"The apparent paradox disappears once processes are separated. Variation and sampling contain chance; selection sorts variants non-randomly in relation to current conditions.",
		uncertaintySummary:
			"The mixed stochastic and non-random framework is foundational. Live research concerns the relative weight, bias, and predictability of each process in particular cases, not whether evolution is simply random.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Teaching About Evolution and the Nature of Science, Chapter 2: Major Themes in Evolution",
				publisher: "National Academy of Sciences",
				year: 1998,
				url: "https://www.nationalacademies.org/read/5787/chapter/3",
				isAnchor: true,
				stance: "supports",
				note:
					"Foundational explanation that genetic variation contains chance while natural selection is non-random and evolution is not the simple product of chance.",
				order: 1
			},
			{
				kind: "context",
				title: "Mutation, Randomness, and Evolution",
				publisher: "Oxford Research Encyclopedia of Biology",
				year: 2021,
				url:
					"https://consensus.app/papers/mutation-randomness-and-evolution-stoltzfus/d952abcc2a6356809bff58a0b7fe4994/",
				stance: "context",
				note:
					"Modern review clarifying the several meanings of random mutation, mutation bias, and how chance inputs interact with selection and other evolutionary causes.",
				order: 2
			},
			{
				kind: "guideline",
				title: "Natural selection",
				publisher: "Understanding Evolution, University of California Museum of Paleontology",
				url:
					"https://evolution.berkeley.edu/evolution-101/mechanisms-the-processes-of-evolution/natural-selection/",
				stance: "context",
				note:
					"Teaching reference for differential reproduction, heritability, fitness, and why non-random selection does not mean purposeful design.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Are socially defined human racial groups discrete biological subspecies?",
		slug: "are-socially-defined-human-racial-groups-discrete-biological-subspecies",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"No. Human genetic and physical variation is real, but it is overlapping, continuous, and shaped by ancestry, geography, migration, gene flow, and environment; socially defined races do not form discrete biological subspecies or evolutionarily independent lineages. Race remains a powerful social category, and racism has real biological and health consequences.",
		stableCore: [
			"All living humans belong to one species with extensive shared ancestry and ongoing or recent gene flow among populations.",
			"Most genetic variants are shared, and frequencies usually change gradually across geography rather than at racial boundaries.",
			"Genetic ancestry and population structure can be scientifically useful when precisely measured, but clusters depend on sampling, scale, and the question asked.",
			"Social race can predict exposure to discrimination, environment, resources, and health outcomes without being a biological subspecies classification."
		],
		openQuestions: [
			"Which ancestry, geography, environment, exposure, or social variables best answer particular biomedical questions without reifying race?",
			"How can genomics improve representation and clinical usefulness while avoiding discrimination, false biological essentialism, and misleading population labels?"
		],
		whatWouldChangeMinds: [
			"Genomic evidence of fixed, discrete, reproductively isolated human lineages aligning consistently with socially defined racial categories.",
			"Evidence that within-group overlap, migration, admixture, and clinal variation are minor rather than central features of human diversity."
		],
		misconceptions: [
			"Rejecting biological races does not mean denying human genetic variation or ancestry.",
			"Finding statistical clusters in a chosen dataset does not create fixed natural boundaries or subspecies.",
			"Race can be socially real and biologically consequential through racism without being a valid taxonomy of human lineages."
		],
		editorSummary:
			"The precise consensus preserves both truths: ancestry and population variation are biologically meaningful when measured carefully, while broad social races are not discrete biological divisions. Erasing either half creates confusion.",
		uncertaintySummary:
			"The non-discrete conclusion is foundational across biological anthropology and human genetics. Research continues on the best population descriptors and on context-specific ancestry associations, not on restoring traditional racial subspecies.",
		sources: [
			{
				kind: "consensus_statement",
				title: "AABA Statement on Race & Racism",
				publisher: "American Association of Biological Anthropologists",
				year: 2019,
				url: "https://bioanth.org/about/aaba-statement-on-race-racism/",
				isAnchor: true,
				stance: "supports",
				note:
					"Professional consensus that race does not accurately represent human biological diversity, populations are not discrete, and racism has real biological effects.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Using Population Descriptors in Genetics and Genomics Research: A New Framework for an Evolving Field",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2023,
				url:
					"https://nap.nationalacademies.org/catalog/26902/using-population-descriptors-in-genetics-and-genomics-research-a-new-framework",
				stance: "supports",
				note:
					"Independent framework recommending that researchers replace race as a biological proxy with precise, justified measures of ancestry, environment, and social experience.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Genetic similarities within and between human populations",
				publisher: "Genetics",
				year: 2007,
				url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC1893020/",
				doi: "10.1534/genetics.106.067355",
				pmid: "17339205",
				pmcid: "PMC1893020",
				stance: "supports",
				note:
					"Population-genetic analysis showing extensive overlap among human populations and why average group differences do not imply discrete, homogeneous biological races.",
				order: 3
			}
		]
	})
];
