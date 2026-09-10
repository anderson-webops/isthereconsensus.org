import type { SeedClaim } from "./claims.js";
import { september2026TrafficClaim as reviewedClaim } from "./claim-expansion-2026-09-shared.js";

export const september2026HumanOriginsClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "human-origins-and-paleontology",
		title: "Did modern humans interbreed with Neanderthals?",
		slug: "did-modern-humans-interbreed-with-neanderthals",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Ancient and present-day genomes show repeated gene flow between Neanderthals and Homo sapiens. Most people with substantial ancestry outside Africa carry roughly one to two percent Neanderthal-derived DNA, although ancestry varies among populations and the surviving fragments are only a filtered remnant of past interbreeding.",
		stableCore: [
			"Neanderthal-derived sequence fragments occur in predictable patterns across many modern human genomes.",
			"Ancient genomes show gene flow in both directions and more than one contact episode.",
			"Natural selection removed many introgressed variants while retaining some neutral or adaptive ones."
		],
		openQuestions: [
			"Where and how often did distinct contact episodes occur?",
			"Which surviving archaic variants have meaningful effects in present-day environments?"
		],
		whatWouldChangeMinds: [
			"A technically credible explanation for the shared long genomic segments that does not involve gene flow.",
			"Independent ancient-genome analyses consistently failing to reproduce the admixture signal."
		],
		misconceptions: [
			"Interbreeding does not mean Neanderthals and modern humans were identical populations.",
			"A small percentage in one person does not mean only that percentage of the Neanderthal genome survives across humanity.",
			"People with recent African ancestry can also carry Neanderthal-derived DNA through later population movements."
		],
		editorSummary:
			"Interbreeding is no longer inferred from a suggestive fossil alone. It is measured repeatedly in ancient and living genomes. The live scientific questions concern timing, geography, selection, and consequences rather than whether contact occurred.",
		uncertaintySummary:
			"The existence of admixture is high-confidence. Exact event counts, locations, sex bias, and phenotype effects remain model-dependent.",
		sources: [
			["systematic_review", "Something old, something borrowed: admixture and adaptation in human evolution", "Current Opinion in Genetics & Development", 2018, "10.1016/j.gde.2018.05.009", "Review of archaic admixture evidence and the uncertain functional consequences of surviving introgressed DNA."],
			["landmark_study", "Multiple episodes of interbreeding between Neanderthal and modern humans", "Nature Ecology & Evolution", 2018, "10.1038/s41559-018-0735-8", "Population-genetic modeling supports multiple contributions rather than a single simple admixture event."],
			["landmark_study", "Recurrent gene flow between Neanderthals and modern humans over the past 200,000 years", "Science", 2024, "10.1126/science.adi1768", "Ancient and modern genomes indicate recurrent gene flow in both directions."]
		]
	}),
	reviewedClaim({
		topicSlug: "human-origins-and-paleontology",
		title: "Did Denisovans contribute ancestry to living human populations?",
		slug: "did-denisovans-contribute-ancestry-to-living-human-populations",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Genomes from a small number of Denisovan remains, compared with diverse living populations, reveal multiple episodes of interbreeding. Denisovan-related ancestry is especially substantial in many Papuan and Indigenous Oceanian populations, with additional signals across parts of Asia.",
		stableCore: [
			"Denisovan ancestry is identified through reproducible genomic similarity to sequenced archaic remains.",
			"At least several genetically distinct Denisovan-related populations contributed to modern humans.",
			"The sparse fossil record understates the former geographic and genetic diversity of Denisovans."
		],
		openQuestions: [
			"Which fossils and archaeological sites belonged to the different Denisovan-related populations?",
			"When and where did each introgression episode occur?"
		],
		whatWouldChangeMinds: [
			"Independent genomic pipelines showing the apparent Denisovan segments are systematic contamination or alignment artifacts.",
			"New high-coverage archaic genomes demonstrating a different source for the attributed ancestry."
		],
		misconceptions: [
			"Denisovans are not known only from a single finger bone; teeth, jaw, skull fragments, proteins, and DNA now contribute evidence.",
			"One sequenced cave population does not define the full Denisovan range.",
			"Archaic ancestry is not a ranking of living populations or cultures."
		],
		editorSummary:
			"Denisovan introgression is a striking case where genomes reveal a broad population history from a very limited fossil sample. The evidence supports multiple contacts, not one isolated encounter.",
		uncertaintySummary:
			"Gene flow is secure, while the number, identity, geography, and dates of contributing Denisovan populations continue to be refined.",
		sources: [
			["systematic_review", "Archaic hominin introgression into modern human genomes", "American Journal of Physical Anthropology", 2019, "10.1002/ajpa.23951", "Review synthesizing multiple archaic gene-flow events and their genomic signatures."],
			["systematic_review", "A history of multiple Denisovan introgression events in modern humans", "Nature Genetics", 2024, "10.1038/s41588-024-01960-y", "Recent review concludes that distinct Denisovan populations introgressed into modern humans multiple times."],
			["landmark_study", "Analysis of human sequence data reveals two pulses of archaic Denisovan admixture", "Cell", 2018, "10.1016/j.cell.2018.02.031", "Genome analysis identifies at least two Denisovan-related admixture pulses from differentiated sources."]
		]
	}),
	reviewedClaim({
		topicSlug: "human-origins-and-paleontology",
		title: "Did Homo sapiens originate in Africa?",
		slug: "did-homo-sapiens-originate-in-africa",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Fossils, archaeology, and genomes place the origin and early diversification of Homo sapiens in Africa. The older cartoon of one tiny birthplace and one clean exodus is too simple: populations across Africa were structured, connected by gene flow, and dispersed beyond the continent more than once.",
		stableCore: [
			"The oldest widely accepted Homo sapiens fossils and the deepest living human genetic diversity are African.",
			"Modern human ancestry reflects long-standing population structure and exchange within Africa.",
			"Later dispersals outside Africa included interbreeding with Neanderthals and Denisovans."
		],
		openQuestions: [
			"How much did different African regions and populations contribute to the species-wide lineage?",
			"Which early dispersals left descendants in later populations?"
		],
		whatWouldChangeMinds: [
			"Reliably dated non-African fossils and genomes showing a deeper Homo sapiens lineage than the African evidence.",
			"A coherent demographic model fitting global genomic diversity substantially better without an African origin."
		],
		misconceptions: [
			"African origin does not require a single isolated Garden of Eden population.",
			"Out of Africa was not necessarily one migration wave.",
			"Later archaic admixture does not erase the African origin of Homo sapiens."
		],
		editorSummary:
			"The central conclusion is robust, but the model has matured from a single-point origin to a connected African population network whose branches later expanded and mixed.",
		uncertaintySummary:
			"Confidence is high in African origin and lower in the exact population structure, geographic centers, and contribution of poorly sampled regions.",
		sources: [
			["systematic_review", "The origin and evolution of Homo sapiens", "Philosophical Transactions of the Royal Society B", 2016, "10.1098/rstb.2015.0237", "Review integrates African fossils, genetics, and later archaic gene flow while rejecting a simple linear sequence."],
			["landmark_study", "A weakly structured stem for human origins in Africa", "Nature", 2023, "10.1038/s41586-023-06055-y", "Demographic modeling supports connected ancestral African populations rather than one sharply isolated stem."],
			["systematic_review", "Rethinking the dispersal of Homo sapiens out of Africa", "Evolutionary Anthropology", 2015, "10.1002/evan.21455", "Review of fossil, archaeological, environmental, and genomic evidence for complex dispersals from an African origin."]
		]
	}),
	reviewedClaim({
		topicSlug: "human-origins-and-paleontology",
		title: "Was human evolution a straight ladder toward modern humans?",
		slug: "was-human-evolution-a-straight-ladder-toward-modern-humans",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. Human evolution was a branching, sometimes reconnecting history with several hominin species and populations coexisting. Traits such as upright walking, brain size, tools, faces, teeth, and social behavior changed at different rates rather than appearing as one inevitable package.",
		stableCore: [
			"The fossil record contains contemporaneous hominin lineages, not one species replacing the previous rung in sequence.",
			"Different anatomical and behavioral traits evolved mosaically.",
			"Ancient DNA adds episodes of interbreeding to the branching pattern."
		],
		openQuestions: [
			"How should fragmentary fossils be grouped into species and populations?",
			"Which apparent trait transitions reflect ancestry, convergence, or incomplete sampling?"
		],
		whatWouldChangeMinds: [
			"A greatly expanded fossil and genomic record collapsing the observed contemporaneous lineages into one direct sequence.",
			"Evidence that the mosaic pattern is primarily a dating or classification artifact."
		],
		misconceptions: [
			"Evolution does not plan toward a predetermined modern endpoint.",
			"An extinct cousin can share ancestors with us without being our direct ancestor.",
			"Branching does not mean scientists know nothing about relationships."
		],
		editorSummary:
			"The familiar march-of-progress image is memorable but scientifically misleading. A branching tree with occasional gene flow better matches fossils, dates, anatomy, and genomes.",
		uncertaintySummary:
			"The branching and mosaic framework is secure; particular branch placements and species labels remain actively revised.",
		sources: [
			["systematic_review", "Reconstructing human evolution: Achievements, challenges, and opportunities", "Proceedings of the National Academy of Sciences", 2010, "10.1073/pnas.1001649107", "Review explains the resolved branching structure and the taxonomic limits of a fragmentary hominin record."],
			["systematic_review", "Mosaic evolution and the pattern of transitions in the hominin lineage", "Philosophical Transactions of the Royal Society B", 2016, "10.1098/rstb.2015.0244", "Review finds continuous, cumulative, mosaic change rather than one bundled leap."],
			["context", "Trees and ladders: A critique of the theory of human cognitive and behavioural evolution in Palaeolithic archaeology", "Quaternary International", 2011, "10.1016/j.quaint.2011.03.007", "Critique of ladder-like narratives in archaeological accounts of cognition and behavior."]
		]
	}),
	reviewedClaim({
		topicSlug: "human-origins-and-paleontology",
		title: "Were Neanderthals unintelligent and without complex culture?",
		slug: "were-neanderthals-unintelligent-and-without-complex-culture",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Neanderthals made varied tools, controlled fire, organized subsistence, used pigments and ornaments in some settings, and sometimes produced deliberately marked objects. Evidence does not make every Neanderthal group culturally identical to contemporary Homo sapiens, and claims about language, art, burial, or symbolic intent must still be evaluated case by case.",
		stableCore: [
			"Neanderthal technology and behavior varied across time and place.",
			"Several finds support planning, teaching, care, and at least occasional symbolic behavior.",
			"Older stereotypes were shaped partly by early reconstructions and one-dimensional comparisons with modern humans."
		],
		openQuestions: [
			"How frequent and socially shared were symbolic practices?",
			"What kinds of language and long-distance networks did different populations maintain?"
		],
		whatWouldChangeMinds: [
			"Robust redating or contextual analyses showing that key complex behaviors were consistently misattributed.",
			"A broader record demonstrating that apparently planned or symbolic artifacts arose through noncultural processes."
		],
		misconceptions: [
			"Rejecting the brutish stereotype does not prove Neanderthals behaved exactly like recent humans.",
			"One spectacular artifact cannot describe every population over hundreds of thousands of years.",
			"A large brain alone does not measure a species' culture."
		],
		editorSummary:
			"The evidence has moved well beyond the caricature. The responsible conclusion is behavioral complexity with uneven preservation and real debate over the interpretation and prevalence of particular practices.",
		uncertaintySummary:
			"Tools and flexible behavior are well supported. Symbolic intent, language, burial, and population-wide prevalence carry greater inferential uncertainty.",
		sources: [
			["systematic_review", "The cultural capacities of Neandertals: a review and re-evaluation", "Journal of Human Evolution", 1993, "10.1006/jhev.1993.1010", "Early comprehensive reassessment challenged simplistic claims of categorical cultural inferiority."],
			["systematic_review", "Behavioural Complexity in Eurasian Neanderthal Populations: a Chronological Examination of the Archaeological Evidence", "Cambridge Archaeological Journal", 2008, "10.1017/S0959774308000371", "Chronological review documents variation and increasing evidence for complex practices."],
			["landmark_study", "A 51,000-year-old engraved bone reveals Neanderthals' capacity for symbolic behaviour", "Nature Ecology & Evolution", 2021, "10.1038/s41559-021-01487-z", "Contextual analysis supports deliberate production of an engraved object before modern humans arrived locally."]
		]
	}),
	reviewedClaim({
		topicSlug: "human-origins-and-paleontology",
		title: "Are living birds dinosaurs?",
		slug: "are-living-birds-dinosaurs",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. In modern evolutionary classification, birds are the surviving branch of theropod dinosaurs. This relationship is supported by many shared derived features, nested fossil series, growth and reproductive biology, feathers, and quantitative family-tree analyses.",
		stableCore: [
			"Birds nest within theropod dinosaurs in repeated phylogenetic analyses.",
			"Non-avian theropods possessed feathers and many anatomical features once treated as uniquely avian.",
			"The bird body plan assembled gradually before and during the origin of flight."
		],
		openQuestions: [
			"How did competing aerodynamic behaviors contribute to the origin of powered flight?",
			"Where do fragmentary early paravians fit within the detailed branching order?"
		],
		whatWouldChangeMinds: [
			"A reproducible phylogeny placing birds outside dinosaurs while better explaining the full anatomical and fossil dataset.",
			"Discovery that key feathered theropod fossils or shared characters were systematically misidentified."
		],
		misconceptions: [
			"Saying birds are dinosaurs does not mean they are unchanged copies of Jurassic species.",
			"Non-avian dinosaur extinction and bird survival are compatible.",
			"Classification follows ancestry, not everyday size or appearance."
		],
		editorSummary:
			"Birds did not merely resemble or replace dinosaurs. They evolved within one dinosaur lineage, making sparrows and chickens living dinosaurs in the same ancestry-based sense that humans are primates.",
		uncertaintySummary:
			"The theropod origin is exceptionally well supported. Debate concerns detailed branching and the sequence of flight-related adaptations.",
		sources: [
			["systematic_review", "An integrative approach to understanding bird origins", "Science", 2014, "10.1126/science.1253293", "Review integrates fossils, development, biomechanics, and phylogeny across the dinosaur-bird transition."],
			["systematic_review", "Paravian Phylogeny and the Dinosaur-Bird Transition: An Overview", "Frontiers in Earth Science", 2019, "10.3389/feart.2018.00252", "Overview of competing detailed trees within the established theropod framework."],
			["landmark_study", "Gradual assembly of avian body plan culminated in rapid rates of evolution across the dinosaur-bird transition", "Current Biology", 2014, "10.1016/j.cub.2014.08.034", "Large comparative analysis finds gradual trait assembly and rapid evolution along the avian stem."]
		]
	}),
	reviewedClaim({
		topicSlug: "human-origins-and-paleontology",
		title: "Did the Chicxulub asteroid impact drive the end-Cretaceous mass extinction?",
		slug: "did-the-chicxulub-asteroid-impact-drive-the-end-cretaceous-mass-extinction",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. The Chicxulub impact occurred at the Cretaceous-Paleogene boundary about 66 million years ago and triggered darkness, cooling, disrupted photosynthesis, fires, acidification, and food-web collapse. Large volcanic eruptions and preexisting environmental stress may have affected ecosystems, but the impact is the principal trigger of the abrupt global extinction.",
		stableCore: [
			"Impact ejecta and geochemical markers occur globally at the extinction boundary.",
			"The crater age matches the boundary within modern dating precision.",
			"Impact-winter mechanisms explain the abrupt timing and selective ecological losses."
		],
		openQuestions: [
			"How did Deccan volcanism alter vulnerability and recovery before and after impact?",
			"Why did particular lineages survive while ecologically similar groups disappeared?"
		],
		whatWouldChangeMinds: [
			"High-precision dating separating the impact from the extinction interval.",
			"A better-supported mechanism explaining the global boundary markers and abrupt ecological collapse without the impact."
		],
		misconceptions: [
			"The event did not kill every organism immediately.",
			"Birds survived, so not every dinosaur lineage vanished.",
			"Recognizing a primary trigger does not imply volcanism or climate background were irrelevant."
		],
		editorSummary:
			"Multiple independent lines of evidence converge on impact as the main trigger. Current research focuses on the kill mechanisms, ecological selectivity, and interaction with volcanism rather than reopening the basic impact link.",
		uncertaintySummary:
			"Cause, timing, and broad mechanism are high-confidence. Regional severity, exact atmospheric loading, and interacting stresses retain uncertainty.",
		sources: [
			["consensus_statement", "The Chicxulub Asteroid Impact and Mass Extinction at the Cretaceous-Paleogene Boundary", "Science", 2010, "10.1126/science.1177265", "International synthesis concludes that Chicxulub triggered the boundary mass extinction."],
			["systematic_review", "The Chicxulub impact and its environmental consequences", "Nature Reviews Earth & Environment", 2022, "10.1038/s43017-022-00283-y", "Review connects crater physics, ejecta, darkness, cooling, ocean change, and extinction selectivity."],
			["systematic_review", "From impact to extinction to recovery: Discoveries of IODP-ICDP Expedition 364 to the Chicxulub impact structure", "Marine Geology", 2025, "10.1016/j.margeo.2025.107661", "Recent synthesis of direct crater-core evidence and recovery after impact."]
		]
	}),
	reviewedClaim({
		topicSlug: "human-origins-and-paleontology",
		title: "Did feathers evolve only after birds began to fly?",
		slug: "did-feathers-evolve-only-after-birds-began-to-fly",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. Diverse feathers and feather-like coverings evolved in non-avian dinosaurs before birds and before powered flight. Early functions likely included insulation, display, sensing, brooding, or maneuvering; aerodynamic flight feathers were later refinements of an existing structure.",
		stableCore: [
			"Fossils preserve simple filaments and complex vaned feathers on non-avian dinosaurs.",
			"Complex feather types predate crown birds and powered flight.",
			"Feathers were co-opted for additional functions through evolutionary time."
		],
		openQuestions: [
			"How deep in the archosaur family tree did feather-like structures originate?",
			"Which original functions applied to each early feather form?"
		],
		whatWouldChangeMinds: [
			"Reanalysis showing purported non-avian feathers are preservation artifacts or unrelated structures.",
			"A revised phylogeny consistently placing all complex feathers after the origin of flight."
		],
		misconceptions: [
			"A structure's current function need not be the function for which it first evolved.",
			"Not every dinosaur species had the same covering.",
			"Feathered dinosaurs do not make the fossil record less dinosaur-like; they clarify bird origins."
		],
		editorSummary:
			"The evidence is a textbook example of evolutionary co-option: feathers diversified before flight, then some lineages recruited particular forms into aerodynamic surfaces.",
		uncertaintySummary:
			"Pre-flight feather diversity is well established. The deepest origin and first function remain debated because skin impressions preserve unevenly.",
		sources: [
			["systematic_review", "The origin and early evolution of feathers: implications, uncertainties and future prospects", "Biology Letters", 2025, "10.1098/rsbl.2024.0517", "Current review of fossil, developmental, chemical, and preservation evidence."],
			["systematic_review", "The Evolutionary Origin And Diversification Of Feathers", "The Quarterly Review of Biology", 2002, "10.1086/341993", "Classic synthesis documents feather diversification in non-avian theropods before birds and flight."],
			["systematic_review", "The Early Origin of Feathers", "Trends in Ecology & Evolution", 2019, "10.1016/j.tree.2019.04.018", "Review considers evidence that feather-like coverings may extend deeper than Theropoda."]
		]
	}),
	reviewedClaim({
		topicSlug: "human-origins-and-paleontology",
		title: "Is Archaeopteryx evidence of the dinosaur-bird transition?",
		slug: "is-archaeopteryx-evidence-of-the-dinosaur-bird-transition",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Archaeopteryx combines flight feathers and other avian features with teeth, a long bony tail, clawed fingers, and a theropod-like skeleton. It need not be the direct ancestor of every later bird to document a close, mosaic stage near the dinosaur-bird transition.",
		stableCore: [
			"Multiple specimens preserve a reproducible mixture of derived and ancestral traits.",
			"Comparative analyses place Archaeopteryx among early avialans or their nearest paravian relatives.",
			"Transitional evidence is about trait combinations and ancestry, not a half-formed organism."
		],
		openQuestions: [
			"How capable was Archaeopteryx of sustained powered flight?",
			"Which early paravian branches lie immediately inside or outside Avialae?"
		],
		whatWouldChangeMinds: [
			"Reliable anatomical evidence placing Archaeopteryx far outside paravian dinosaurs.",
			"Demonstration that the feather impressions or key skeletal traits were misassociated with the specimens."
		],
		misconceptions: [
			"A transitional fossil need not be a direct ancestor.",
			"Mosaic features are expected during branching evolution.",
			"Finding other feathered dinosaurs strengthens rather than makes Archaeopteryx irrelevant."
		],
		editorSummary:
			"Archaeopteryx is no longer the only fossil illuminating bird origins, but its exceptionally preserved mix of traits remains important evidence within a much richer transition.",
		uncertaintySummary:
			"Its broad evolutionary placement is secure. Fine phylogenetic position and flight performance shift with new specimens and methods.",
		sources: [
			["systematic_review", "The origin and early evolution of birds", "Biological Reviews", 1998, "10.1111/j.1469-185X.1997.tb00024.x", "Broad review locates Archaeopteryx within theropod ancestry and the staged assembly of the avian body plan."],
			["landmark_study", "Archaeopteryx and the origin of birds", "Biological Journal of the Linnean Society", 1976, "10.1111/j.1095-8312.1976.tb00244.x", "Foundational anatomical comparison established close affinities with small theropod dinosaurs."],
			["landmark_study", "Chicago Archaeopteryx informs on the early evolution of the avian bauplan", "Nature", 2025, "10.1038/s41586-025-08912-4", "A newly described specimen refines the mosaic of skull, foot, tail, and plumage traits."]
		]
	}),
	reviewedClaim({
		topicSlug: "human-origins-and-paleontology",
		title: "Did whales evolve from land-dwelling mammals?",
		slug: "did-whales-evolve-from-land-dwelling-mammals",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. A dense Eocene fossil sequence documents the transition from four-legged terrestrial relatives to amphibious and then fully aquatic whales. Anatomy, isotopes, and genomes independently place cetaceans within even-toed hoofed mammals, with hippopotamuses as their closest living relatives.",
		stableCore: [
			"Successive fossils document changes in limbs, spine, hearing, nostrils, and swimming.",
			"Distinctive ankle anatomy links early whales to artiodactyl mammals.",
			"Molecular family trees independently agree with the fossil relationship."
		],
		openQuestions: [
			"How did ecology and geography shape the earliest dispersal of whale lineages?",
			"Which locomotor and sensory changes evolved in parallel among early groups?"
		],
		whatWouldChangeMinds: [
			"Consistent anatomical and genomic analyses placing cetaceans outside terrestrial mammals.",
			"Redating the major fossil sequence into an order incompatible with the inferred transition."
		],
		misconceptions: [
			"Modern whales did not evolve from modern hippos.",
			"Transitional whales were functional animals adapted to their own environments.",
			"Losing external hind limbs does not erase inherited mammalian anatomy."
		],
		editorSummary:
			"Whale origins are unusually well documented: fossils show a rapid land-to-water transition, and molecular evidence identifies the same broader mammal branch.",
		uncertaintySummary:
			"The terrestrial origin and broad sequence are high-confidence. Exact relationships among some early families remain revisable.",
		sources: [
			["systematic_review", "From Land to Water: the Origin of Whales, Dolphins, and Porpoises", "Evolution: Education and Outreach", 2009, "10.1007/s12052-009-0135-2", "Review synthesizes transitional families and organ-system changes across the aquatic transition."],
			["systematic_review", "The origin and early evolution of whales: macroevolution documented on the Indian Subcontinent", "Journal of Biosciences", 2009, "10.1007/s12038-009-0060-0", "Review of the exceptionally informative South Asian fossil sequence."],
			["context", "The Walking Whales: From Land to Water in Eight Million Years", "University of California Press", 2014, "10.1525/9780520959415", "Book-length synthesis by a leading researcher connects fossil discovery, anatomy, and environmental reconstruction."]
		]
	})
];
