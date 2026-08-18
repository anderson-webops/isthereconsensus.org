import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheTwoClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026EcologyClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Does biodiversity support ecosystem functioning and stability?",
		slug: "does-biodiversity-support-ecosystem-functioning-and-stability",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Across many experiments and natural systems, communities with more species or functional diversity tend to use resources more completely, sustain more ecosystem processes, and resist or recover from some disturbances better. The size and mechanism of the benefit vary by ecosystem, species identities, spatial scale, and which function is measured.",
		stableCore: [
			"Different species can contribute complementary traits, occupy different niches, or provide ecological insurance when conditions change.",
			"Biodiversity effects become especially important when several ecosystem functions, places, or years are considered rather than one process at one moment.",
			"Losing a locally dominant or functionally distinctive species can matter more immediately than losing a redundant species, so species identity and abundance remain important."
		],
		openQuestions: [
			"How strongly do results from controlled experiments generalize to large, complex ecosystems under multiple real-world pressures?",
			"Which dimensions of diversity—species, genes, traits, or interactions—best predict particular ecosystem services and thresholds?"
		],
		whatWouldChangeMinds: [
			"Large, replicated syntheses showing that biodiversity loss usually leaves multiple ecosystem functions and resilience unchanged after confounding factors are addressed.",
			"Mechanistic evidence that apparent diversity benefits are consistently explained by one productive species rather than complementarity or insurance."
		],
		misconceptions: [
			"The relationship does not mean every added species increases every ecosystem function by the same amount.",
			"High biodiversity cannot make an ecosystem immune to severe disturbance, climate change, pollution, or habitat destruction.",
			"A diverse ecosystem can still contain rare, vulnerable, or declining species."
		],
		editorSummary:
			"The broad conclusion is well established, while effect size and mechanism remain context dependent. Diversity matters most clearly when society asks ecosystems to maintain many functions across variable conditions.",
		uncertaintySummary:
			"Evidence is strongest for productivity, resource use, multifunctionality, and resistance to some forms of environmental variation. Results differ among taxa, trophic levels, functions, and spatial scales.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Global Assessment Report on Biodiversity and Ecosystem Services",
				publisher: "IPBES",
				year: 2019,
				url: "https://www.ipbes.net/global-assessment",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Intergovernmental assessment synthesizing how biodiversity underpins ecosystem functions, services, resilience, and human well-being.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Biodiversity loss and its impact on humanity",
				publisher: "Nature",
				year: 2012,
				url: "https://doi.org/10.1038/nature11148",
				doi: "10.1038/nature11148",
				appraisal: "high",
				stance: "supports",
				note: "Influential synthesis finding broad links between biodiversity and ecosystem productivity, stability, and services while identifying limits and research gaps.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Biodiversity increases the resistance of ecosystem productivity to climate extremes",
				publisher: "Nature",
				year: 2015,
				url: "https://doi.org/10.1038/nature15374",
				doi: "10.1038/nature15374",
				appraisal: "high",
				stance: "supports",
				note: "Synthesis across grassland experiments linking plant diversity to greater resistance of productivity during climatic extremes.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Are current species extinction rates above natural background rates?",
		slug: "are-current-species-extinction-rates-above-natural-background-rates",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Multiple lines of evidence indicate that human-driven extinction rates are already tens to hundreds of times above long-term background rates, with many more species threatened. Exact multipliers are uncertain because most species have not been formally described and both ancient and modern rates must be estimated.",
		stableCore: [
			"Documented extinctions undercount the true total because many species disappear before they are described or monitored.",
			"Habitat conversion, direct exploitation, invasive species, pollution, and climate change are major interacting drivers of elevated extinction risk.",
			"Uncertainty in the exact background rate does not erase the large gap between current estimates and ordinary long-term turnover."
		],
		openQuestions: [
			"How many poorly studied invertebrates, plants, fungi, and microorganisms are being lost without detection?",
			"Which combinations of conservation action can prevent threatened species from progressing to extinction most efficiently?"
		],
		whatWouldChangeMinds: [
			"Comprehensive monitoring showing that apparent modern losses were mostly taxonomic error or rediscovery and that rates match fossil-background estimates.",
			"Independent reconstructions demonstrating that current threat and extinction estimates are systematically inflated by orders of magnitude."
		],
		misconceptions: [
			"Species have always gone extinct, but that does not imply the present rate is natural.",
			"The phrase 'sixth mass extinction' describes a trajectory and rate; it does not mean the same fraction of species has already vanished as in the five completed geological events.",
			"A species can be at high extinction risk even while it remains locally common in part of its range."
		],
		editorSummary:
			"The central conclusion is robust: modern human pressures have sharply accelerated biological loss. Responsible summaries distinguish observed extinctions, modeled rates, threatened-species counts, and future projections.",
		uncertaintySummary:
			"The magnitude varies with taxonomy, time window, baseline, and treatment of data-deficient species. These uncertainties affect the multiplier, not the conclusion that current rates are substantially elevated.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Summary for policymakers of the global assessment report on biodiversity and ecosystem services",
				publisher: "IPBES",
				year: 2019,
				url: "https://doi.org/10.5281/zenodo.3553458",
				doi: "10.5281/zenodo.3553458",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Government-approved synthesis concluding that extinction rates are already at least tens to hundreds of times above the average over the past ten million years.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "The biodiversity of species and their rates of extinction, distribution, and protection",
				publisher: "Science",
				year: 2014,
				url: "https://doi.org/10.1126/science.1246752",
				doi: "10.1126/science.1246752",
				appraisal: "high",
				stance: "supports",
				note: "Global review comparing present extinction estimates with background rates and mapping major knowledge and protection gaps.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Accelerated modern human-induced species losses: Entering the sixth mass extinction",
				publisher: "Science Advances",
				year: 2015,
				url: "https://doi.org/10.1126/sciadv.1400253",
				doi: "10.1126/sciadv.1400253",
				appraisal: "moderate",
				stance: "supports",
				note: "Conservative vertebrate analysis showing modern losses remain far above background even under assumptions chosen to minimize the difference.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Does breaking habitat into smaller, isolated patches harm biodiversity?",
		slug: "does-breaking-habitat-into-smaller-isolated-patches-harm-biodiversity",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"Usually, habitat loss combined with smaller patches, isolation, and more edge habitat harms many species and ecological interactions. But 'fragmentation per se'—dividing the same total habitat amount into more patches—can have positive, negative, or neutral effects depending on habitat amount, species movement, patch quality, and scale. Habitat loss is the clearest general threat.",
		stableCore: [
			"Reducing total habitat generally reduces population sizes, local persistence, and the number of species a landscape can support.",
			"Isolation can block dispersal and recolonization, while edges can alter temperature, moisture, predation, disturbance, and species composition.",
			"At a fixed habitat amount, more patches can sometimes spread risk or increase access, so patch number alone is not a universal measure of ecological damage."
		],
		openQuestions: [
			"When does connectivity help target species without also spreading predators, disease, fire, or invasive species?",
			"How do long extinction debts and adaptation change outcomes that short studies may miss?"
		],
		whatWouldChangeMinds: [
			"Landscape-scale syntheses showing that habitat amount, isolation, and edge exposure do not predict persistence after species traits and study design are considered.",
			"Long-term evidence that small isolated populations generally maintain genetic diversity and recolonization as effectively as connected populations."
		],
		misconceptions: [
			"Habitat loss and fragmentation are related but analytically distinct; studies can reach different conclusions by holding different variables constant.",
			"A wildlife corridor is not automatically beneficial for every species or every disturbance regime.",
			"Counting patches without measuring their area, quality, configuration, and surrounding land use can mislead."
		],
		editorSummary:
			"The public shorthand 'fragmentation is bad' is directionally useful when real landscapes are losing habitat and connectivity, but it hides an active technical debate. This page keeps the stable concern—habitat loss, isolation, and edge effects—separate from context-dependent fragmentation per se.",
		uncertaintySummary:
			"Responses vary substantially among species, landscapes, and time scales. The strongest certainty concerns habitat amount; configuration effects are conditional and can reverse under some ecological mechanisms.",
		sources: [
			{
				kind: "systematic_review",
				title: "Habitat fragmentation and its lasting impact on Earth's ecosystems",
				publisher: "Science Advances",
				year: 2015,
				url: "https://doi.org/10.1126/sciadv.1500052",
				doi: "10.1126/sciadv.1500052",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Synthesis of long-running fragmentation experiments documenting persistent changes in biodiversity and ecosystem processes.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Ecological Responses to Habitat Fragmentation Per Se",
				publisher: "Annual Review of Ecology, Evolution, and Systematics",
				year: 2017,
				url: "https://doi.org/10.1146/annurev-ecolsys-110316-022612",
				doi: "10.1146/annurev-ecolsys-110316-022612",
				appraisal: "high",
				stance: "context",
				note: "Review separating fragmentation per se from habitat amount and finding that configuration effects are often weak or positive when amount is controlled.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Habitat amount modulates biodiversity responses to fragmentation",
				publisher: "Nature Ecology & Evolution",
				year: 2024,
				url: "https://doi.org/10.1038/s41559-024-02445-1",
				doi: "10.1038/s41559-024-02445-1",
				appraisal: "high",
				stance: "context",
				note: "Model and global-data reanalysis showing why fragmentation effects can change direction as total habitat loss changes.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Are all non-native species invasive?",
		slug: "are-all-non-native-species-invasive",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"No. A non-native, alien, or introduced species occurs outside its native range because of human activity. It is called invasive when it establishes and spreads in ways that cause harmful ecological or socioeconomic impacts. Many introduced species never establish, remain localized, or persist without documented harm.",
		stableCore: [
			"Introduction, establishment, spread, and harmful impact are different stages of a biological invasion.",
			"Risk varies with species traits, introduction pressure, recipient ecosystem, pathways, and time since arrival.",
			"Management prioritization generally considers actual or credible impact rather than treating origin alone as proof of harm."
		],
		openQuestions: [
			"Which currently low-impact introduced species may become harmful as climate, land use, or ecological interactions change?",
			"How should ecological, economic, health, cultural, and animal-welfare impacts be compared in management decisions?"
		],
		whatWouldChangeMinds: [
			"A coherent evidence-based definition under which geographic origin alone reliably predicts harmful spread.",
			"Long-term global evidence showing that introduced species do not differ meaningfully in establishment, spread, or impact."
		],
		misconceptions: [
			"Non-native and invasive are not synonyms.",
			"A native species can become locally overabundant or harmful without becoming an invasive alien species.",
			"A useful crop or ornamental species can still become invasive elsewhere; labels depend on place and impact."
		],
		editorSummary:
			"Using the terms precisely improves both science and policy. Origin identifies an introduction; invasiveness requires evidence about establishment, spread, and adverse impact.",
		uncertaintySummary:
			"Definitions differ slightly among legal systems and scientific frameworks, especially over how much impact is required. The distinction between alien status and harmful invasion is nevertheless standard.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Thematic Assessment Report on Invasive Alien Species and their Control",
				publisher: "IPBES",
				year: 2023,
				url: "https://www.ipbes.net/ias",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Global assessment distinguishing alien species from the subset whose establishment and spread produce negative impacts.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Invasive Alien Species",
				publisher: "International Union for Conservation of Nature",
				year: 2026,
				url: "https://iucn.org/our-work/topic/invasive-alien-species",
				appraisal: "high",
				stance: "supports",
				note: "Current institutional overview of invasive alien species, their impacts, and evidence-led prevention and management.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "A proposed unified framework for biological invasions",
				publisher: "Trends in Ecology & Evolution",
				year: 2011,
				url: "https://doi.org/10.1016/j.tree.2011.03.023",
				doi: "10.1016/j.tree.2011.03.023",
				appraisal: "high",
				stance: "context",
				note: "Framework separating transport, introduction, establishment, and spread barriers rather than treating all alien taxa as equivalent.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Do invasive alien species cause major ecological and economic harm?",
		slug: "do-invasive-alien-species-cause-major-ecological-and-economic-harm",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Invasive alien species are a major driver of biodiversity loss and have caused extinctions, altered ecosystems, damaged agriculture and infrastructure, and imposed large health and economic costs. Harms are concentrated in a subset of introduced species and vary greatly by place, pathway, and management response.",
		stableCore: [
			"Invasive predators, pathogens, competitors, and ecosystem engineers have contributed to many documented native-species declines and extinctions.",
			"Economic impacts include crop and forestry losses, disease, infrastructure damage, control costs, and lost ecosystem services.",
			"Prevention and early detection are generally more feasible and less costly than trying to eradicate a widespread established invader."
		],
		openQuestions: [
			"How can regions detect and prioritize emerging invasions before impacts become severe or irreversible?",
			"Which control approaches deliver durable ecological recovery without creating unacceptable non-target harms?"
		],
		whatWouldChangeMinds: [
			"Global impact assessments showing that attributed extinctions, ecosystem changes, and costs largely disappear after attribution and reporting biases are corrected.",
			"Long-term counterfactual studies finding no meaningful ecological or economic improvement from effective prevention and control."
		],
		misconceptions: [
			"The documented harm from invasive species does not mean every introduced species is harmful.",
			"Economic cost estimates are uncertain and should not be read as precise annual invoices, but their scale and growth are well supported.",
			"Climate and land-use change can interact with invasions rather than acting as mutually exclusive explanations."
		],
		editorSummary:
			"The consensus concerns the global importance of harmful invasions, not a blanket judgment about every organism outside its historical range. Prevention, pathway management, and targeted control require species- and place-specific evidence.",
		uncertaintySummary:
			"Many impacts and costs remain underreported, while methods for monetizing damage vary. Attribution is strongest for well-studied invasions, islands, agriculture, disease, and clearly measured ecosystem changes.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Thematic Assessment Report on Invasive Alien Species and their Control",
				publisher: "IPBES",
				year: 2023,
				url: "https://www.ipbes.net/ias",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Assessment of more than 13,000 references identifying invasive alien species as a major global driver of biodiversity loss and socioeconomic harm.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Alien species as a driver of recent extinctions",
				publisher: "Biology Letters",
				year: 2016,
				url: "https://doi.org/10.1098/rsbl.2015.0623",
				doi: "10.1098/rsbl.2015.0623",
				appraisal: "high",
				stance: "supports",
				note: "Global analysis of the role alien species played in documented animal and plant extinctions.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "High and rising economic costs of biological invasions worldwide",
				publisher: "Nature",
				year: 2021,
				url: "https://doi.org/10.1038/s41586-021-03405-6",
				doi: "10.1038/s41586-021-03405-6",
				appraisal: "moderate",
				stance: "supports",
				note: "Global cost-database synthesis showing large and increasing reported economic losses while documenting major geographic and taxonomic gaps.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Do pollinator declines threaten crop production?",
		slug: "do-pollinator-declines-threaten-crop-production",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, especially for fruits, vegetables, nuts, seeds, and other crops that depend partly on animal pollination. Lower pollinator abundance or diversity can reduce yield, quality, and stability. Most global calories come from crops that are wind- or self-pollinated, so pollinator decline threatens the diversity and nutritional quality of food more directly than it threatens all food production equally.",
		stableCore: [
			"Roughly three-quarters of leading crop types benefit to some degree from animal pollination, although their degree of dependence varies widely.",
			"Wild pollinator diversity can improve crop fruit set even where managed honey bees are present.",
			"Pollination affects not only quantity but also the size, shape, shelf life, and marketability of many fruits and vegetables."
		],
		openQuestions: [
			"Where are pollination deficits already limiting yields, and how rapidly are those deficits changing?",
			"Which combinations of habitat, farm practice, managed pollinators, and pesticide reduction are most reliable in different crops and regions?"
		],
		whatWouldChangeMinds: [
			"Large field datasets showing that pollinator abundance and diversity do not affect yield or quality in crops classified as pollinator dependent.",
			"Long-term production trends showing no growing vulnerability as demand for pollinator-dependent crops rises and pollinator communities change."
		],
		misconceptions: [
			"A world without animal pollinators would not mean literally zero food, because wheat, rice, maize, and several other staples do not depend on them.",
			"Managed honey bees cannot substitute perfectly for all wild pollinator species, crops, climates, or flower structures.",
			"Evidence of local or taxon-specific declines should not be presented as one uniform global trend for every pollinator."
		],
		editorSummary:
			"Pollinator loss is a serious food-system risk, but the clearest explanation is about crop mix, nutrition, quality, and resilience—not the claim that every calorie requires bees.",
		uncertaintySummary:
			"Pollinator trends and deficits are unevenly monitored across regions and taxa. Crop dependence and the capacity of managed or wild pollinators to compensate also vary substantially.",
		sources: [
			{
				kind: "consensus_statement",
				title: "The Assessment Report on Pollinators, Pollination and Food Production",
				publisher: "IPBES",
				year: 2016,
				url: "https://files.ipbes.net/ipbes-web-prod-public-files/downloads/pdf/2017_pollination_full_report_book_v12_pages.pdf",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Global assessment of pollinator status, crop dependence, drivers, economic value, and implications for food production.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "A global synthesis reveals biodiversity-mediated benefits for crop production",
				publisher: "Science Advances",
				year: 2019,
				url: "https://doi.org/10.1126/sciadv.aax0121",
				doi: "10.1126/sciadv.aax0121",
				appraisal: "high",
				stance: "supports",
				note: "Global field synthesis linking pollinator richness and abundance to pollination and crop production outcomes.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Global meta-analysis shows reduced quality of food crops under inadequate animal pollination",
				publisher: "Nature Communications",
				year: 2023,
				url: "https://doi.org/10.1038/s41467-023-40231-y",
				doi: "10.1038/s41467-023-40231-y",
				appraisal: "high",
				stance: "supports",
				note: "Meta-analysis quantifying how animal pollination improves multiple commercial and nutritional quality traits across food crops.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Do pesticides contribute to pollinator declines?",
		slug: "do-pesticides-contribute-to-pollinator-declines",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Pesticides can kill pollinators directly or impair navigation, reproduction, immunity, development, and colony performance, and exposure can combine with poor nutrition, pathogens, and climate stress. Risk differs greatly among compounds, doses, formulations, application methods, species, and real-world exposure, so 'pesticides' should not be treated as one uniform hazard.",
		stableCore: [
			"Laboratory, semi-field, and field studies show harmful effects from some insecticides and other pesticide exposures.",
			"Systemic chemicals can expose pollinators through pollen, nectar, dust, water, or contaminated wild plants beyond the treated crop.",
			"Habitat loss, floral scarcity, parasites, disease, climate change, and invasive species also contribute; pesticide exposure is one interacting driver rather than the sole explanation."
		],
		openQuestions: [
			"How do chronic mixtures, metabolites, and realistic low-dose exposures affect different wild pollinators over complete life cycles?",
			"Which regulatory tests and farm practices best predict and reduce population-level harm without creating larger substitute risks?"
		],
		whatWouldChangeMinds: [
			"Well-powered field studies across taxa and landscapes showing no population-relevant effects at measured exposure levels for compounds currently implicated.",
			"Improved monitoring demonstrating that pesticide-use changes do not track exposure or pollinator outcomes after other drivers are controlled."
		],
		misconceptions: [
			"Evidence that a compound is toxic does not by itself establish field risk; exposure and dose matter.",
			"Evidence for pesticide contribution does not imply that pesticides explain every pollinator decline.",
			"Honey-bee colonies are not a complete proxy for solitary bees, bumblebees, butterflies, moths, flies, beetles, or vertebrate pollinators."
		],
		editorSummary:
			"The broad causal contribution is supported, while risk assessment must remain chemical-, use-, and species-specific. Strong public explanations avoid both 'all pesticides are equally catastrophic' and 'field uncertainty means no concern.'",
		uncertaintySummary:
			"Population-level field effects are harder to estimate than individual toxicity, and evidence is geographically and taxonomically uneven. Mixtures, chronic exposure, and interactions remain important gaps.",
		sources: [
			{
				kind: "consensus_statement",
				title: "The Assessment Report on Pollinators, Pollination and Food Production",
				publisher: "IPBES",
				year: 2016,
				url: "https://files.ipbes.net/ipbes-web-prod-public-files/downloads/pdf/2017_pollination_full_report_book_v12_pages.pdf",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Global assessment identifying pesticide exposure among multiple direct threats to wild and managed pollinators.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Pesticide impacts on insect pollinators: Current knowledge and future research challenges",
				publisher: "Science of the Total Environment",
				year: 2024,
				url: "https://doi.org/10.1016/j.scitotenv.2024.176656",
				doi: "10.1016/j.scitotenv.2024.176656",
				appraisal: "high",
				stance: "supports",
				note: "Recent review integrating evidence across pesticide classes, pollinator groups, regions, exposure routes, and research gaps.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Country-specific effects of neonicotinoid pesticides on honey bees and wild bees",
				publisher: "Science",
				year: 2017,
				url: "https://doi.org/10.1126/science.aaa1190",
				doi: "10.1126/science.aaa1190",
				appraisal: "moderate",
				stance: "context",
				note: "Large multi-country field experiment illustrating adverse effects, species differences, and strong environmental context.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Do protected areas generally improve conservation outcomes?",
		slug: "do-protected-areas-generally-improve-conservation-outcomes",
		consensusBand: "broad",
		confidenceScore: 89,
		evidenceCertainty: "moderate",
		bottomLine:
			"Generally yes, when protected areas are well located, governed, resourced, and enforced. On average they retain more biodiversity or slow habitat loss relative to comparable unprotected places, but outcomes vary widely. A boundary on a map cannot compensate for weak management, displacement of pressure, climate change, or protection of land with little development threat.",
		stableCore: [
			"Comparisons that account for where protected areas are placed generally find positive but heterogeneous effects on habitat and biodiversity.",
			"Effectiveness improves with adequate staffing, enforcement, local legitimacy, ecological representation, connectivity, and long-term funding.",
			"Coverage percentages alone say little about whether protection includes threatened species and ecosystems or changes what happens on the ground."
		],
		openQuestions: [
			"Which governance models best combine biodiversity gains, Indigenous and local rights, livelihoods, and durable compliance?",
			"How much pressure is displaced outside protected boundaries, and how can landscape-scale planning reduce leakage?"
		],
		whatWouldChangeMinds: [
			"Broad counterfactual studies finding no average biodiversity or habitat benefit after placement, enforcement, and baseline threats are addressed.",
			"Evidence that alternative measures consistently achieve equal conservation outcomes at lower social and ecological cost in the same settings."
		],
		misconceptions: [
			"Designation is not the same as effective protection.",
			"A protected area can produce real gains without becoming pristine or reversing every external pressure.",
			"Poor performance by some sites does not show that the entire conservation tool is ineffective; it shows design and implementation matter."
		],
		editorSummary:
			"Protected areas are a useful and generally effective conservation instrument, not a self-executing guarantee. The meaningful question is additional ecological benefit relative to a credible no-protection counterfactual.",
		uncertaintySummary:
			"Studies differ in outcomes, baselines, time spans, and ability to correct placement bias. Evidence is stronger for average local benefits than for global coverage targets or universal success.",
		sources: [
			{
				kind: "meta_analysis",
				title: "The positive impact of conservation action",
				publisher: "Science",
				year: 2024,
				url: "https://doi.org/10.1126/science.adj6598",
				doi: "10.1126/science.adj6598",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Meta-analysis of counterfactual conservation trials finding that actions, including protected areas, usually improve biodiversity or slow decline relative to no action.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Local scale comparisons of biodiversity as a test for global protected area ecological performance: a meta-analysis",
				publisher: "PLOS ONE",
				year: 2014,
				url: "https://doi.org/10.1371/journal.pone.0105824",
				doi: "10.1371/journal.pone.0105824",
				appraisal: "high",
				stance: "supports",
				note: "Global local-scale comparison finding higher species richness and abundance inside terrestrial protected areas on average.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Local biodiversity is higher inside than outside terrestrial protected areas worldwide",
				publisher: "Nature Communications",
				year: 2016,
				url: "https://doi.org/10.1038/ncomms12306",
				doi: "10.1038/ncomms12306",
				appraisal: "high",
				stance: "supports",
				note: "Large global analysis comparing abundance and species richness inside and outside protected areas while examining land-use intensity.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Do well-enforced no-take marine reserves increase fish biomass and biodiversity?",
		slug: "do-well-enforced-no-take-marine-reserves-increase-fish-biomass-and-biodiversity",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"Usually yes within their boundaries. Fully protected, well-enforced marine reserves tend to increase the abundance, biomass, size, and sometimes diversity of exploited species compared with fished areas or partially protected zones. Benefits take time and depend on reserve size, age, habitat, connectivity, compliance, and pressures outside the boundary.",
		stableCore: [
			"Removing extraction allows many targeted fish and invertebrate populations to survive longer, grow larger, and rebuild biomass.",
			"Older, well-enforced, fully protected reserves generally perform better than young, poorly enforced, or partially protected areas.",
			"Ecological gains inside a reserve do not guarantee equal fishery gains outside it; spillover and larval export depend on species and design."
		],
		openQuestions: [
			"Which networks, sizes, and locations best protect climate refuges while sustaining fisheries and equitable access?",
			"How far do reserve benefits extend beyond boundaries after displaced fishing effort and wider ocean pressures are counted?"
		],
		whatWouldChangeMinds: [
			"Global counterfactual analyses showing that enforced no-take status does not improve targeted populations relative to otherwise comparable fished areas.",
			"Long-term evidence that reported gains are explained mainly by reserve placement rather than protection."
		],
		misconceptions: [
			"Not every area labeled a marine protected area prohibits fishing.",
			"Reserve benefits are not instantaneous and can be overwhelmed by warming, pollution, habitat loss, or illegal extraction.",
			"Higher biomass inside a boundary does not by itself prove a net increase in every surrounding fishery."
		],
		editorSummary:
			"The evidence is strongest for ecological recovery inside genuinely no-take, enforced reserves. Claims about fishery yield, social outcomes, or the entire seascape require additional evidence beyond the within-boundary comparison.",
		uncertaintySummary:
			"Effect sizes vary by taxon, baseline depletion, enforcement, reserve age, habitat, and outside pressure. Selection of high-quality sites can exaggerate naive comparisons, so counterfactual design matters.",
		sources: [
			{
				kind: "meta_analysis",
				title: "No-take marine reserves are the most effective protected areas in the ocean",
				publisher: "ICES Journal of Marine Science",
				year: 2018,
				url: "https://doi.org/10.1093/icesjms/fsx059",
				doi: "10.1093/icesjms/fsx059",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Meta-analytic comparison finding substantially higher fish biomass in no-take reserves than in unprotected and partially protected areas.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Effects of marine reserve age on fish populations: a global meta-analysis",
				publisher: "Journal of Applied Ecology",
				year: 2009,
				url: "https://doi.org/10.1111/j.1365-2664.2009.01662.x",
				doi: "10.1111/j.1365-2664.2009.01662.x",
				appraisal: "high",
				stance: "supports",
				note: "Global synthesis showing fish density benefits strengthen with reserve age, especially for larger harvested species.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Ecological success of no-take marine protected areas: Using population dynamics theory to inform a global meta-analysis",
				publisher: "Ecological Applications",
				year: 2024,
				url: "https://doi.org/10.1002/eap.3027",
				doi: "10.1002/eap.3027",
				appraisal: "high",
				stance: "context",
				note: "Bayesian global synthesis of 264 no-take areas quantifying heterogeneous fish and invertebrate responses and the conditions associated with success.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "ecology-and-conservation",
		title: "Are tree plantations equivalent to natural forests for biodiversity and carbon storage?",
		slug: "are-tree-plantations-equivalent-to-natural-forests-for-biodiversity-and-carbon-storage",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"No. Tree plantations can produce wood, store carbon, stabilize some soils, and provide more habitat than many degraded or agricultural alternatives, but they usually support less biodiversity and store less ecosystem carbon than intact or naturally regenerating forests. Outcomes depend on prior land cover, species mix, management, harvest, and what would have happened otherwise.",
		stableCore: [
			"Natural forests usually contain greater structural complexity, dead wood, old trees, understory, soils, and species interactions than even-aged monocultures.",
			"Fast-growing plantations can accumulate aboveground carbon rapidly, but harvest cycles and lower soil or biomass stocks affect long-term storage.",
			"Planting trees on native grasslands, peatlands, or savannas can damage existing biodiversity and carbon stores; 'more tree cover' is not a universal restoration rule."
		],
		openQuestions: [
			"Which mixed-species, native, longer-rotation, and retention practices can narrow plantation biodiversity and carbon gaps while meeting wood demand?",
			"How should carbon accounting include harvest products, substitution, fire, drought, soil change, and leakage across complete life cycles?"
		],
		whatWouldChangeMinds: [
			"Broad paired-site syntheses showing that typical plantations match natural forests in native biodiversity, structural complexity, and durable total ecosystem carbon.",
			"Long-term landscape evidence showing that replacing natural forest with plantations produces no net ecological or carbon loss after harvested products and leakage are included."
		],
		misconceptions: [
			"A satellite map may classify both systems as forest even when their ecological qualities differ greatly.",
			"Saying plantations are not equivalent does not mean they have no value or are always worse than the land use they replace.",
			"Carbon uptake rate and total long-term carbon stock are different measurements."
		],
		editorSummary:
			"Plantations are production systems that can contribute to restoration and climate strategies when placed and managed well; they are not substitutes for protecting natural forests. Baseline land cover and full life-cycle accounting decide whether a specific project helps.",
		uncertaintySummary:
			"Comparisons vary by forest age, climate, plantation type, prior land use, harvest, taxon, and carbon pool. The average natural-forest advantage is clear even though some well-designed plantations provide meaningful benefits.",
		sources: [
			{
				kind: "systematic_review",
				title: "The biodiversity and ecosystem service contributions and trade-offs of forest restoration approaches",
				publisher: "Science",
				year: 2022,
				url: "https://doi.org/10.1126/science.abl4649",
				doi: "10.1126/science.abl4649",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Global synthesis comparing native forests and plantations across biodiversity, carbon, water, soil, and wood-production outcomes.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Ecosystem carbon stock influenced by plantation practice: Implications for planting forests as a measure of climate change mitigation",
				publisher: "PLOS ONE",
				year: 2010,
				url: "https://doi.org/10.1371/journal.pone.0010867",
				doi: "10.1371/journal.pone.0010867",
				appraisal: "high",
				stance: "supports",
				note: "Paired-site meta-analysis finding lower total ecosystem carbon in plantations than adjacent natural forests on average.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Plantation forests and biodiversity: oxymoron or opportunity?",
				publisher: "Biodiversity and Conservation",
				year: 2008,
				url: "https://doi.org/10.1007/s10531-008-9380-x",
				doi: "10.1007/s10531-008-9380-x",
				appraisal: "moderate",
				stance: "context",
				note: "Review explaining why plantations generally support less biodiversity than natural forests while sometimes improving on degraded non-forest baselines.",
				order: 3
			}
		]
	})
];
