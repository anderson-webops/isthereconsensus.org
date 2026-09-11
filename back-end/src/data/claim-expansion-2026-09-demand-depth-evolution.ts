import type { SeedClaim } from "./claims.js";
import { september2026DemandDepthClaim as reviewedClaim } from "./claim-expansion-2026-09-demand-depth-shared.js";

const academiesEvolutionSource = [
	"consensus_statement",
	"Science, Evolution, and Creationism",
	"National Academies Press",
	2008,
	"https://nap.nationalacademies.org/catalog/11876/science-evolution-and-creationism",
	"The National Academies synthesize converging fossil, comparative, developmental, and molecular evidence for evolution and common ancestry."
] as const;

export const september2026DemandDepthEvolutionClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Does human chromosome 2 preserve evidence of an ancestral chromosome fusion?",
		slug: "does-human-chromosome-2-preserve-evidence-of-an-ancestral-chromosome-fusion",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Human chromosome 2 corresponds to two separate chromosomes in other living great apes and preserves the expected molecular traces of an ancestral end-to-end fusion, including internal telomere-like sequence and a remnant second centromere. The event occurred in the hominin lineage after it split from the lineage leading to chimpanzees and bonobos.",
		stableCore: [
			"Comparative chromosome maps align human chromosome 2 with two ape chromosomes in the expected order.",
			"The fusion region contains head-to-head telomeric repeats where chromosome ends would have joined.",
			"A disabled ancestral centromere remains in addition to the chromosome's active centromere."
		],
		openQuestions: [
			"Exactly when within early hominin population history did the fusion become fixed?",
			"Did nearby duplicated sequence or altered genome organization have later functional consequences?"
		],
		whatWouldChangeMinds: [
			"A complete primate genome comparison showing that the apparent fusion signals came from unrelated assembly or alignment artifacts.",
			"A better-supported chromosomal history that jointly explains the telomere, centromere, and synteny evidence."
		],
		misconceptions: [
			"The evidence does not say that a chimpanzee chromosome fused inside a modern human.",
			"Different chromosome counts do not prevent related populations from sharing ancestry.",
			"The fusion is one especially visible line of evidence, not the sole basis for human evolution."
		],
		editorSummary:
			"Chromosome 2 makes a testable evolutionary prediction unusually concrete: if two ancestral ape chromosomes joined, their order, old ends, and redundant centromere should still be detectable. They are.",
		uncertaintySummary:
			"The occurrence of the fusion is exceptionally well established. Its exact date, population dynamics, and any phenotypic consequences remain active research questions.",
		sources: [
			academiesEvolutionSource,
			["landmark_study", "Origin of human chromosome 2: an ancestral telomere-telomere fusion", "Proceedings of the National Academy of Sciences", 1991, "10.1073/pnas.88.20.9051", "Molecular analysis identified degenerate telomeric repeats in the predicted orientation at the human chromosome 2 fusion site."],
			["landmark_study", "Incomplete lineage sorting of segmental duplications defines the human chromosome 2 fusion site early during African great ape speciation", "Cell Genomics", 2026, "10.1016/j.xgen.2025.101079", "High-resolution ape genomes refine the complex duplicated sequence and lineage history surrounding the established fusion site."]
		]
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Do shared endogenous retroviral insertions support primate common ancestry?",
		slug: "do-shared-endogenous-retroviral-insertions-support-primate-common-ancestry",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Ancient retroviruses sometimes inserted DNA into germ cells, allowing descendants to inherit the insertion. Matching insertions at corresponding genomic locations across primates form nested patterns that agree with other phylogenetic evidence, making shared inheritance a far better explanation than repeated independent insertion at every matching site.",
		stableCore: [
			"Endogenous retroviral sequences are inherited genomic remnants of past germline infections.",
			"Orthologous insertions can be compared by both genomic position and accumulated sequence changes.",
			"Their branching patterns broadly agree with phylogenies inferred from independent genes, fossils, and anatomy."
		],
		openQuestions: [
			"How often did ancient retroviruses move between host lineages rather than track them vertically?",
			"Which inherited viral sequences were later co-opted for useful regulatory or developmental roles?"
		],
		whatWouldChangeMinds: [
			"Genome-wide evidence that matching primate insertions systematically fail to follow independently established relationships.",
			"A mechanistic alternative that explains shared sites, flanking sequence, and nested mutations more parsimoniously than inheritance."
		],
		misconceptions: [
			"The claim is not that every endogenous retrovirus entered the genome before all primates diverged.",
			"Insertion hotspots can occur, but they do not explain the complete matching sequence and branching pattern by themselves.",
			"Viral ancestry in part of a genome does not mean the organism itself is a virus."
		],
		editorSummary:
			"Shared viral insertions act like inherited historical markers. Their value comes from matching location, sequence, and nested distribution, not merely from finding viral-looking DNA in two species.",
		uncertaintySummary:
			"The common-ancestry inference is strong. Individual retroviral families can have complicated histories involving recombination, lineage-specific loss, incomplete lineage sorting, or cross-species transmission.",
		sources: [
			["landmark_study", "Constructing primate phylogenies from ancient retrovirus sequences", "Proceedings of the National Academy of Sciences", 1999, "10.1073/pnas.96.18.10254", "Shared endogenous retroviral loci were used as independent markers to reconstruct primate relationships."],
			["landmark_study", "Identification, characterization and comparative genomics of chimpanzee endogenous retroviruses", "Genome Biology", 2006, "10.1186/gb-2006-7-6-r51", "Comparative genomic analysis identified orthologous and lineage-specific retroviral families across chimpanzees and humans."],
			["systematic_review", "Origins and evolutionary consequences of ancient endogenous retroviruses", "Nature Reviews Microbiology", 2019, "10.1038/s41579-019-0189-2", "Review explains germline endogenization, inherited viral loci, long host-virus histories, and evolutionary co-option across vertebrates."]
		]
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Can gene duplication produce genuinely new biological functions?",
		slug: "can-gene-duplication-produce-genuinely-new-biological-functions",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. When a gene is duplicated, one copy can preserve an existing role while the other accumulates changes, divides the old role, changes dosage, or acquires a new function. Most duplicates are lost or constrained, so duplication is an opportunity for innovation rather than an automatic guarantee of improvement.",
		stableCore: [
			"Gene and whole-genome duplications are common, measurable events across the tree of life.",
			"Duplicated copies can be lost, remain redundant, split ancestral tasks, or evolve altered expression and biochemical activity.",
			"Comparative genomics and experiments document retained duplicates with lineage-specific functions."
		],
		openQuestions: [
			"Which ecological and genomic conditions make duplicate retention and innovation most likely?",
			"How often does apparent novelty come from a new biochemical activity versus new regulation or dosage?"
		],
		whatWouldChangeMinds: [
			"Broad comparative evidence showing retained duplicates never acquire functions distinguishable from their ancestral copy.",
			"Experimental reconstruction showing that accepted cases of neofunctionalization were misidentified."
		],
		misconceptions: [
			"A duplicated gene is not instantly useful merely because an extra copy exists.",
			"New function does not require creating a complex gene in one mutation.",
			"Loss of many duplicates is expected and does not negate the retained cases."
		],
		editorSummary:
			"Duplication supplies genetic redundancy that evolution can modify. The important evidence is not that every duplicate innovates, but that several measurable fates include new or partitioned functions.",
		uncertaintySummary:
			"The mechanism is well established. The relative importance of selection, drift, dosage balance, and regulatory change varies among organisms and duplicate families.",
		sources: [
			academiesEvolutionSource,
			["context", "The multiple fates of gene duplications: Deletion, hypofunctionalization, subfunctionalization, neofunctionalization, dosage balance constraints, and neutral variation", "The Plant Cell", 2022, "10.1093/plcell/koac076", "Review organizes the empirically observed outcomes of duplicated genes rather than treating novelty as their only possible fate."],
			["context", "Retention of duplicated genes in evolution", "Trends in Genetics", 2022, "10.1016/j.tig.2021.06.016", "Review explains how redundancy, dosage, entanglement, and functional divergence can retain duplicate genes over evolutionary time."]
		]
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Can new protein-coding genes arise from previously noncoding DNA?",
		slug: "can-new-protein-coding-genes-arise-from-previously-noncoding-dna",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Comparative genomics, transcript data, and functional studies show that some genes can emerge de novo from DNA that previously did not encode a protein. Establishing a particular case is difficult because old homology can be missed and many young transcripts are transient, but de novo gene birth is a documented route to genetic novelty.",
		stableCore: [
			"Mutation can create an open reading frame, regulatory access, and a translated product in previously noncoding sequence.",
			"Candidate de novo genes occur in multiple eukaryotic lineages and some have experimentally supported functions.",
			"Careful ancestry reconstruction is needed to distinguish true de novo origin from rapid divergence or incomplete genome data."
		],
		openQuestions: [
			"What fraction of young translated sequences become durable, functional genes?",
			"Which sequence, expression, and cellular features let a new peptide avoid toxicity and acquire a selectable role?"
		],
		whatWouldChangeMinds: [
			"Improved ancestral genomes and homology methods reclassifying all strong de novo candidates as modified older genes.",
			"Functional studies showing proposed young genes are consistently nontranslated noise without organismal effects."
		],
		misconceptions: [
			"De novo gene birth does not mean a complete optimized protein appears in one step.",
			"Most new transcripts need not survive for the mechanism to operate occasionally.",
			"Gene duplication, recombination, horizontal transfer, and de novo birth can all contribute to novelty."
		],
		editorSummary:
			"The modern question is no longer whether any gene can emerge from noncoding sequence, but how often candidates survive, become functional, and can be distinguished from very old or rapidly changing genes.",
		uncertaintySummary:
			"Existence is supported, while rates and individual classifications remain sensitive to genome quality, taxon sampling, homology detection, and definitions of function.",
		sources: [
			academiesEvolutionSource,
			["context", "Functional innovation through new genes as a general evolutionary process", "Nature Genetics", 2025, "10.1038/s41588-024-02059-0", "Review surveys mechanisms and evidence showing that newly originated genes can contribute to lineage-specific functions."],
			["context", "New genes from non-coding sequence: the role of de novo protein-coding genes in eukaryotic evolutionary innovation", "Philosophical Transactions of the Royal Society B", 2015, "10.1098/rstb.2014.0332", "Review evaluates de novo gene candidates across eukaryotes and the evidentiary challenges in establishing origin and function."]
		]
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Must a vestigial trait be completely useless to count as vestigial?",
		slug: "must-a-vestigial-trait-be-completely-useless-to-count-as-vestigial",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"No. In evolutionary biology, vestigial describes a trait reduced from an ancestral form or primary function, not necessarily a structure with zero present-day use. A reduced trait can retain a minor function, acquire a different function, vary among relatives, or continue disappearing over time.",
		stableCore: [
			"Vestigiality is established through comparative anatomy, development, genetics, and evolutionary history.",
			"Residual or repurposed function is compatible with reduction of the ancestral role.",
			"Researchers test particular structures rather than assuming every historically labeled example is correct."
		],
		openQuestions: [
			"Which reduced traits are maintained by weak selection, developmental constraint, or a secondary function?",
			"How quickly do anatomy and gene regulation change after an ancestral function becomes unnecessary?"
		],
		whatWouldChangeMinds: [
			"Comparative evidence showing a proposed vestige was never reduced from the inferred ancestral structure or function.",
			"Developmental and functional evidence supporting a different homology or evolutionary history."
		],
		misconceptions: [
			"Vestigial does not mean poorly designed, diseased, or literally functionless.",
			"Discovering a secondary function does not automatically erase evidence of ancestral reduction.",
			"A familiar textbook example can be revised without undermining the broader evolutionary framework."
		],
		editorSummary:
			"The apparent contradiction comes from defining vestigial as useless. Scientists instead compare the trait with its ancestral counterpart and ask what was reduced, retained, or repurposed.",
		uncertaintySummary:
			"The definition and general phenomenon are stable. The classification and remaining function of individual structures can change with better comparative or experimental evidence.",
		sources: [
			academiesEvolutionSource,
			["landmark_study", "Loss of ancestral function in duckweed roots is accompanied by progressive anatomical reduction and a re-distribution of nutrient transporters", "Current Biology", 2023, "10.1016/j.cub.2023.03.025", "Closely related duckweeds provide a living comparative sequence of anatomical reduction and loss of an ancestral root function."],
			["landmark_study", "Neural network detected in a presumed vestigial trait: ultrastructure of the salmonid adipose fin", "Proceedings of the Royal Society B", 2012, "10.1098/rspb.2011.1009", "Functional anatomy in a presumed vestige illustrates why residual function and evolutionary reduction must be assessed separately."]
		]
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Can complex eyes evolve through functional intermediate stages?",
		slug: "can-complex-eyes-evolve-through-functional-intermediate-stages",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Living organisms exhibit useful light-sensitive systems ranging from simple photoreceptor patches to directional cups, pinhole eyes, and focusing lenses. Comparative development, genetics, anatomy, and modeling show that small changes can improve visual performance at many intermediate stages, although eye types did not all follow one identical sequence.",
		stableCore: [
			"Even simple light detection can improve orientation, habitat choice, predator avoidance, or daily timing.",
			"Incremental changes in screening pigment, receptor arrangement, aperture, and optics can each provide function.",
			"Shared developmental genes coexist with repeated diversification and partial independent origins of eye structures."
		],
		openQuestions: [
			"How many times did major eye architectures arise or recruit shared ancient photoreceptor machinery?",
			"Which ecological conditions drove particular transitions in resolution, color vision, and image formation?"
		],
		whatWouldChangeMinds: [
			"Comparative evidence that proposed intermediate organizations provide no selectable sensory function.",
			"Developmental and genomic data incompatible with gradual modification of known photoreceptor and optical systems."
		],
		misconceptions: [
			"An intermediate eye need not provide modern human visual acuity to be useful.",
			"Modeling a possible path does not prove every lineage followed that exact path.",
			"Shared genes do not require every eye structure to have evolved only once."
		],
		editorSummary:
			"Complexity is not an all-or-nothing threshold. The relevant evidence asks whether intermediate changes improve a real sensory task, and multiple living systems demonstrate that they can.",
		uncertaintySummary:
			"The feasibility and evolutionary continuity of functional intermediates are strongly supported. Exact historical routes differ among lineages and are reconstructed with unequal detail.",
		sources: [
			academiesEvolutionSource,
			["context", "The evolution of eyes and visually guided behaviour", "Philosophical Transactions of the Royal Society B", 2009, "10.1098/rstb.2009.0083", "Comparative review identifies successive functional innovations in photoreception, directionality, receptor organization, and focusing optics."],
			["landmark_study", "A pessimistic estimate of the time required for an eye to evolve", "Proceedings of the Royal Society B", 1994, "10.1098/rspb.1994.0048", "Quantitative model demonstrates a plausible sequence of small, performance-improving morphological changes from a light-sensitive patch to a camera-type eye."]
		]
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Is cooperation incompatible with evolution by natural selection?",
		slug: "is-cooperation-incompatible-with-evolution-by-natural-selection",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. Cooperation can evolve when helping relatives, repeated interaction, reputation, partner choice, spatial structure, mutual benefit, or selection among groups links a cooperative act to greater transmission of the underlying traits. The relative importance of these mechanisms is debated, but cooperation is not a contradiction of natural selection.",
		stableCore: [
			"Natural selection tracks heritable differences in reproductive success, not a rule that every interaction must be immediately selfish.",
			"Kin selection, reciprocity, mutualism, assortment, and multilevel processes can each support cooperation under defined conditions.",
			"Theory, experiments, comparative evidence, and observed social systems test these conditions."
		],
		openQuestions: [
			"Which mechanisms best explain large-scale cooperation among unrelated humans across institutions and cultures?",
			"How should overlapping kin, reciprocity, partner-choice, and group-structure explanations be partitioned empirically?"
		],
		whatWouldChangeMinds: [
			"Evidence that cooperative traits cannot increase under any of the predicted genetic, ecological, or social conditions.",
			"A replacement framework that predicts observed cooperation more accurately without selection-based mechanisms."
		],
		misconceptions: [
			"Evolutionary fitness is not the same as greed, strength, or conscious self-interest.",
			"Explaining how cooperation evolves does not claim every helpful act is secretly calculated.",
			"Disagreement over mathematical accounting does not mean cooperation lacks evolutionary explanations."
		],
		editorSummary:
			"The puzzle of cooperation generated testable evolutionary mechanisms rather than refuting evolution. The live debate concerns which mechanism dominates in a particular system.",
		uncertaintySummary:
			"Multiple routes are well established. Their terminology, equivalence, and empirical contribution remain contested, especially for culture-rich human cooperation.",
		sources: [
			["landmark_study", "Five Rules for the Evolution of Cooperation", "Science", 2006, "10.1126/science.1133755", "Formal synthesis shows how kin selection, direct and indirect reciprocity, network structure, and group selection can favor cooperation."],
			["context", "The evolution of human cooperation", "Current Biology", 2019, "10.1016/j.cub.2019.03.036", "Review connects biological and cultural mechanisms to the unusually broad scale of human cooperation."],
			["context", "The evolution of cooperation and altruism: the basic conditions are simple and well known", "Journal of Evolutionary Biology", 2006, "10.1111/j.1420-9101.2006.01172.x", "Review clarifies fitness conditions and terminology behind mutualistic and altruistic helping."]
		]
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Can sexual selection favor traits that carry survival costs?",
		slug: "can-sexual-selection-favor-traits-that-carry-survival-costs",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. A trait can spread when it increases mating or fertilization success enough to offset costs such as energy use, predation, disease, or reduced survival. Costs are not universal, however, and condition-dependent individuals may both display larger traits and survive better, so each proposed tradeoff needs direct measurement.",
		stableCore: [
			"Sexual selection concerns differences in mating and fertilization success, which contribute to total reproductive success.",
			"Ornaments, weapons, displays, and mating effort can have context-dependent viability and reproductive effects.",
			"Net evolutionary change depends on the combined survival and reproductive consequences, not either outcome alone."
		],
		openQuestions: [
			"How often are apparent costs offset because high-condition individuals can afford both display and survival?",
			"When does intense sexual selection raise adaptation and population fitness versus increase demographic vulnerability?"
		],
		whatWouldChangeMinds: [
			"Longitudinal and experimental evidence showing sexually favored traits never impose energetic, ecological, or survival tradeoffs.",
			"A better model explaining ornament and weapon evolution without mating or fertilization advantages."
		],
		misconceptions: [
			"A costly-looking trait is not automatically evidence of a handicap mechanism.",
			"Survival cost does not mean a trait lowers total fitness after mating success is counted.",
			"Sexual selection and natural selection are not mutually exclusive forces."
		],
		editorSummary:
			"Selection does not maximize lifespan in isolation. It can favor a shorter-lived or energetically costly phenotype when the reproductive gain is larger, but observed traits often combine costs with condition-dependent benefits.",
		uncertaintySummary:
			"The mechanism is established, while the size and even direction of survival associations vary by trait, sex, environment, and study design.",
		sources: [
			["meta_analysis", "Sexually Selected Traits and Adult Survival: A Meta-Analysis", "The Quarterly Review of Biology", 2001, "10.1086/393743", "Synthesis finds that larger sexual traits do not uniformly predict lower survival, emphasizing condition dependence and the need to measure costs directly."],
			["meta_analysis", "Meta-analytic evidence that sexual selection improves population fitness", "Nature Communications", 2019, "10.1038/s41467-019-10074-7", "Experimental synthesis finds average population-fitness benefits while showing variation by sex and environment."],
			["landmark_study", "Environmental heterogeneity generates fluctuating selection on a secondary sexual trait", "Current Biology", 2008, "10.1016/j.cub.2008.04.059", "Wild-population data document changing fecundity and survival associations for a sexually selected trait across environments."]
		]
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Does horizontal gene transfer overturn evolutionary common descent?",
		slug: "does-horizontal-gene-transfer-overturn-evolutionary-common-descent",
		consensusBand: "strong",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"No. Horizontal gene transfer moves genes between lineages and makes parts of evolutionary history network-like, especially among microbes. It complicates a single tree for every gene, but the transfer itself is an evolutionary mechanism that can be detected against broader patterns of inheritance and does not erase common descent.",
		stableCore: [
			"Genes can cross lineage boundaries through transformation, viruses, mobile elements, endosymbiosis, and other mechanisms.",
			"Different genes can therefore have different histories even while cellular lineages reproduce by descent.",
			"Phylogenetic methods explicitly test discordant gene trees, transfer events, duplication, and loss."
		],
		openQuestions: [
			"How much deep microbial history can be represented by a dominant tree versus a network?",
			"How frequent and adaptively important is horizontal transfer in different multicellular eukaryotes?"
		],
		whatWouldChangeMinds: [
			"Genome-wide evidence that vertical inheritance contributes no stable recoverable structure to cellular evolution.",
			"A framework explaining gene distributions and sequence histories substantially better without descent or transfer."
		],
		misconceptions: [
			"A gene tree differing from a species tree is expected under several known evolutionary processes.",
			"Calling history network-like in microbes does not imply species appear without ancestors.",
			"Horizontal transfer adds mechanisms and evidence rather than replacing evolution."
		],
		editorSummary:
			"The tree-of-life metaphor is least literal when genes move sideways, but this is a refinement of evolutionary reconstruction. Scientists infer both vertical branches and lateral connections from sequence evidence.",
		uncertaintySummary:
			"Horizontal transfer is undisputed and especially important in prokaryotes. Its frequency, ancient reach, and best representation at the deepest branches remain debated.",
		sources: [
			academiesEvolutionSource,
			["context", "Horizontal gene transfer in evolution: facts and challenges", "Proceedings of the Royal Society B", 2010, "10.1098/rspb.2009.1679", "Review explains why pervasive transfer expands evolutionary theory and complicates universal-tree reconstruction without negating descent."],
			["context", "Horizontal gene transfer in eukaryotes: aligning theory with data", "Nature Reviews Genetics", 2024, "10.1038/s41576-023-00688-5", "Current review separates well-supported eukaryotic transfers from contamination, endosymbiosis, and overgeneralized claims."]
		]
	}),
	reviewedClaim({
		topicSlug: "biology-and-evolution",
		title: "Can unrelated lineages independently evolve similar traits?",
		slug: "can-unrelated-lineages-independently-evolve-similar-traits",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Convergent evolution occurs when separate lineages evolve similar solutions under comparable selection pressures or constraints, such as streamlined bodies, camera-type eyes, echolocation, or repeated biochemical adaptations. Similarity can arise through different genes, the same genes, or reused ancestral variation, so it does not always imply recent shared ancestry for the trait.",
		stableCore: [
			"Convergence is documented from molecules and physiology through anatomy and behavior.",
			"Natural selection can repeatedly favor similar functional solutions when organisms face similar problems.",
			"Developmental constraints and available genetic variation affect which solutions are reachable."
		],
		openQuestions: [
			"When will repeated adaptation use the same gene, pathway, or structural solution?",
			"How predictable is convergence after accounting for history, mutation supply, and developmental constraint?"
		],
		whatWouldChangeMinds: [
			"Phylogenetic and genomic reanalysis showing accepted convergent traits were consistently inherited from an unrecognized recent ancestor.",
			"Experimental evidence that similar environments do not repeatedly favor comparable functional outcomes."
		],
		misconceptions: [
			"Similar appearance alone cannot distinguish convergence from shared inheritance.",
			"Convergence does not mean evolution repeats identically or has a predetermined goal.",
			"Different genetic routes can reach similar outward traits."
		],
		editorSummary:
			"Evolution is historically contingent but not unconstrained. Convergence shows that selection can repeatedly find similar workable solutions while genetics and developmental history shape the exact route.",
		uncertaintySummary:
			"The phenomenon is extensively documented. Predicting when convergence will occur and whether it will reuse the same molecular path remains an active research frontier.",
		sources: [
			academiesEvolutionSource,
			["context", "Understanding natural selection and similarity: Convergent, parallel and repeated evolution", "Molecular Ecology", 2023, "10.1111/mec.17132", "Review provides a framework for separating convergence, parallelism, and repeated evolution across levels of biological similarity."],
			["context", "Convergence, adaptation, and constraint", "Evolution", 2011, "10.1111/j.1558-5646.2011.01289.x", "Comparative review examines how selection and constraint produce repeated phenotypes without requiring identical histories."]
		]
	})
];
