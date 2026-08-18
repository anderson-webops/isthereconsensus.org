import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheThreeSourcedClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026AgricultureClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Did synthetic nitrogen fertilizer increase crop yields and nitrogen pollution?",
		slug: "did-synthetic-nitrogen-fertilizer-increase-crop-yields-and-nitrogen-pollution",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Industrial nitrogen fertilizer helped produce large twentieth-century yield gains and supports food production for billions of people. Crops do not absorb all applied nitrogen, however; losses as nitrate, ammonia, nitrous oxide, and other reactive compounds pollute water and air, damage ecosystems, and warm the climate.",
		stableCore: [
			"The Haber-Bosch process made biologically available nitrogen at a scale far beyond natural fixation and traditional manure supplies.",
			"Yield response declines as nitrogen application rises, so excess application produces relatively little extra crop while increasing losses.",
			"Better timing, placement, crop matching, soil testing, rotations, inhibitors, and nutrient recovery can raise nitrogen-use efficiency without simply abandoning fertilizer."
		],
		openQuestions: [
			"Which combinations of agronomy, incentives, regulation, and monitoring reduce losses while protecting food access in each farming system?",
			"How quickly can low-emission fertilizer production and circular nutrient sources scale without shifting burdens elsewhere?"
		],
		whatWouldChangeMinds: [
			"Historical and field evidence showing that synthetic nitrogen made little contribution to observed crop production.",
			"Representative nitrogen budgets finding that agricultural surpluses do not materially contribute to water, air, climate, or ecosystem impacts."
		],
		misconceptions: [
			"A technology can be central to food security and still create serious preventable pollution.",
			"More fertilizer does not keep producing proportional yield gains.",
			"The solution is not identical for high-input surplus regions and places where crops remain nitrogen-limited."
		],
		editorSummary:
			"Synthetic nitrogen is a classic dual-impact technology: foundational to modern yields and a major driver of reactive-nitrogen pollution. Useful policy starts from both facts rather than choosing one.",
		uncertaintySummary:
			"The global direction is established. Farm-level losses, yield response, and the best mitigation package vary with crop, soil, weather, management, and local nutrient scarcity.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Sustainable Nitrogen Management in Agrifood Systems",
				publisher: "Food and Agriculture Organization of the United Nations",
				year: 2025,
				url: "https://www.fao.org/newsroom/detail/FAO-nitrogen-use-efficiency-report/",
				note: "Global assessment of nitrogen's production benefits, low use efficiency, pollution pathways, and agrifood mitigation options."
			},
			{
				kind: "systematic_review",
				title: "How a century of ammonia synthesis changed the world",
				publisher: "Nature Geoscience",
				year: 2008,
				url: "https://doi.org/10.1038/ngeo325",
				doi: "10.1038/ngeo325",
				note: "Historical synthesis connecting industrial nitrogen fixation to food production, population support, and environmental disruption."
			},
			{
				kind: "systematic_review",
				title: "Managing nitrogen for sustainable development",
				publisher: "Nature",
				year: 2015,
				url: "https://doi.org/10.1038/nature15743",
				doi: "10.1038/nature15743",
				note: "Cross-system review of nitrogen benefits, cascading harms, regional inequality, and management priorities."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Does agricultural antibiotic use contribute to antimicrobial resistance?",
		slug: "does-agricultural-antibiotic-use-contribute-to-antimicrobial-resistance",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Antibiotic use in food-producing animals selects for resistant bacteria and resistance genes that can spread among animals, people, food, and the environment. Veterinary treatment remains important for animal welfare, but routine growth promotion and unnecessary group use increase avoidable selection pressure.",
		stableCore: [
			"Resistance evolves wherever antimicrobial exposure gives resistant organisms a survival advantage.",
			"Transmission pathways are complex and differ by drug, organism, production system, hygiene, waste management, and human antibiotic use.",
			"Reducing medically important antibiotic use in animals is associated with lower resistance in animal populations and, in the available evidence, in exposed humans."
		],
		openQuestions: [
			"Which stewardship, vaccination, husbandry, diagnostics, and surveillance packages best preserve animal health while reducing use?",
			"What fraction of resistance burden in different human infections is attributable to each animal, human, food, and environmental pathway?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled surveillance showing no resistance change when animal antibiotic exposure changes substantially.",
			"Genomic and epidemiological evidence consistently excluding movement of relevant resistance between animal, food, environmental, and human reservoirs."
		],
		misconceptions: [
			"Bacteria become resistant; a person or animal does not become resistant to the medicine.",
			"Recognizing agricultural contribution does not imply that all human resistance originates on farms.",
			"Responsible disease treatment is different from routine use to compensate for preventable husbandry problems."
		],
		editorSummary:
			"This is a One Health problem with multiple sources. Agricultural use is a documented contributor, while exact attribution differs among pathogens and places and does not erase the major role of human prescribing and infection control.",
		uncertaintySummary:
			"Selection biology and animal resistance effects are strong. Quantifying the downstream human burden is harder because organisms and genes move through overlapping pathways.",
		sources: [
			{
				kind: "guideline",
				title: "WHO Guidelines on Use of Medically Important Antimicrobials in Food-Producing Animals",
				publisher: "World Health Organization",
				year: 2017,
				url: "https://www.who.int/publications/i/item/9789241550130",
				note: "Evidence-based guideline recommending restrictions on routine medically important antimicrobial use to reduce resistance."
			},
			{
				kind: "systematic_review",
				title: "Restricting the use of antibiotics in food-producing animals and its associations with antibiotic resistance in food-producing animals and human beings",
				publisher: "The Lancet Planetary Health",
				year: 2017,
				url: "https://doi.org/10.1016/S2542-5196(17)30141-9",
				doi: "10.1016/S2542-5196(17)30141-9",
				note: "Systematic review and meta-analysis linking use restrictions with lower resistance in animals and available human groups."
			},
			{
				kind: "consensus_statement",
				title: "Antimicrobial Resistance and the United Nations Sustainable Development Cooperation Framework",
				publisher: "World Health Organization, FAO, UNEP and WOAH",
				year: 2021,
				url: "https://www.who.int/publications/i/item/9789240036024",
				note: "One Health framework describing linked human, animal, food, plant, and environmental resistance pathways."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Does organic farming generally trade lower yields for higher on-farm biodiversity?",
		slug: "does-organic-farming-generally-trade-lower-yields-for-higher-on-farm-biodiversity",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"Often. Across broad comparisons, organic farms tend to support greater on-farm biodiversity and avoid most synthetic pesticides, while average yields are lower than conventional yields. Both gaps vary widely by crop, management, landscape, and whether outcomes are measured per hectare, per unit of food, or across a whole food system.",
		stableCore: [
			"Organic fields commonly have greater plant, invertebrate, and some microbial diversity, though effects differ among groups and surrounding landscapes.",
			"Global meta-analyses usually find an average yield gap, with smaller gaps for some crops, rotations, and well-managed diversified systems.",
			"Lower per-hectare impacts can be offset if lower yields require more land, so comparisons need both area- and output-based metrics."
		],
		openQuestions: [
			"Which organic and conventional practices can be combined to improve biodiversity without expanding agricultural land?",
			"How do long-term soil, pesticide, profitability, labor, animal-welfare, and landscape outcomes compare in representative farming systems?"
		],
		whatWouldChangeMinds: [
			"Updated, crop-balanced meta-analyses finding no average biodiversity advantage or no yield gap under comparable conditions.",
			"Whole-system studies showing that current land-use and production tradeoffs reverse once diets, waste, and landscape design are included."
		],
		misconceptions: [
			"Organic is a certification system, not a guarantee that every practice or outcome is environmentally superior.",
			"Conventional farming is not one fixed system and can use rotations, biological controls, and precision nutrient management.",
			"A percentage yield gap does not by itself determine nutrition, profitability, biodiversity, or climate impact."
		],
		editorSummary:
			"The recurring pattern is a biodiversity benefit paired with a variable yield penalty, not a universal verdict on either system. The most useful comparisons separate practices and use multiple metrics.",
		uncertaintySummary:
			"Meta-analytic averages are reasonably stable, but heterogeneity is large and publication, geography, crop mix, certification, and measurement choices influence effect sizes.",
		sources: [
			{
				kind: "systematic_review",
				title: "Evaluating the benefits of farming practices on ecosystem services: a review of meta-analyses",
				publisher: "npj Sustainable Agriculture",
				year: 2024,
				url: "https://doi.org/10.1038/s44185-023-00034-2",
				doi: "10.1038/s44185-023-00034-2",
				note: "Review of agricultural meta-analyses comparing biodiversity, soil, production, and other ecosystem-service outcomes."
			},
			{
				kind: "meta_analysis",
				title: "Diversification practices reduce organic to conventional yield gap",
				publisher: "Proceedings of the Royal Society B",
				year: 2015,
				url: "https://doi.org/10.1098/rspb.2014.1396",
				doi: "10.1098/rspb.2014.1396",
				note: "Meta-analysis estimating the average organic yield gap and how rotations and multi-cropping narrow it."
			},
			{
				kind: "meta_analysis",
				title: "Comparing the yields of organic and conventional agriculture",
				publisher: "Nature",
				year: 2012,
				url: "https://doi.org/10.1038/nature11069",
				doi: "10.1038/nature11069",
				note: "Global synthesis documenting lower average organic yields and strong variation by crop and growing conditions."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Does no-till farming reliably store large amounts of additional soil carbon?",
		slug: "does-no-till-farming-reliably-store-large-amounts-of-additional-soil-carbon",
		consensusBand: "mixed",
		confidenceScore: 72,
		evidenceCertainty: "moderate",
		bottomLine:
			"Not reliably. No-till often increases carbon near the soil surface and provides important erosion, water, and soil-structure benefits, but deeper sampling frequently finds smaller whole-profile gains or carbon redistributed from deeper layers. Climate benefit also depends on yield, nitrous oxide, fuel use, duration, and whether carbon persists.",
		stableCore: [
			"Sampling only the top few centimeters can overstate sequestration if carbon is redistributed rather than added across the full soil profile.",
			"No-till outcomes vary with climate, soil, crop rotation, residue, cover crops, and how long the practice has been maintained.",
			"Reduced erosion and improved infiltration can justify no-till even when additional carbon storage is modest."
		],
		openQuestions: [
			"Which combinations of reduced disturbance, cover crops, roots, residues, and rotations create durable whole-profile carbon gains?",
			"How should studies account for equivalent soil mass, bulk density, nitrous oxide, displaced production, and carbon saturation?"
		],
		whatWouldChangeMinds: [
			"Long-term, deep, equivalent-mass sampling across representative systems showing consistently large additional carbon stocks from no-till alone.",
			"Conversely, broad evidence that no-till delivers no meaningful erosion, infiltration, or soil-structure benefits outside carbon accounting."
		],
		misconceptions: [
			"More carbon at the surface does not necessarily mean more carbon in the entire profile.",
			"Questioning a large sequestration claim does not mean no-till has no agronomic or conservation value.",
			"Soil carbon is reversible and cannot be counted like permanent geological storage."
		],
		editorSummary:
			"No-till is valuable soil management, but the simple claim that it always stores large amounts of new carbon is too strong. Carbon accounting must sample deeply and include the whole production system.",
		uncertaintySummary:
			"The evidence is sensitive to depth, baseline, equivalent soil mass, duration, climate, and co-practices. Whole-profile sequestration estimates remain heterogeneous and often smaller than topsoil-only figures.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Can no-tillage stimulate carbon sequestration in agricultural soils? A meta-analysis of paired experiments",
				publisher: "Agriculture, Ecosystems & Environment",
				year: 2010,
				url: "https://doi.org/10.1016/j.agee.2010.08.006",
				doi: "10.1016/j.agee.2010.08.006",
				note: "Meta-analysis showing that apparent gains depend strongly on sampling depth and may reflect vertical redistribution."
			},
			{
				kind: "systematic_review",
				title: "Limited potential of no-till agriculture for climate change mitigation",
				publisher: "Nature Climate Change",
				year: 2014,
				url: "https://doi.org/10.1038/nclimate2292",
				doi: "10.1038/nclimate2292",
				note: "Critical synthesis explaining depth, permanence, nitrous-oxide, and production boundaries in climate claims."
			},
			{
				kind: "systematic_review",
				title: "Conservation agriculture and soil carbon sequestration: Between myth and farmer reality",
				publisher: "Agriculture, Ecosystems & Environment",
				year: 2017,
				url: "https://doi.org/10.1016/j.agee.2017.03.001",
				doi: "10.1016/j.agee.2017.03.001",
				note: "Review separating context-specific soil and livelihood benefits from overgeneralized sequestration promises."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Do cover crops improve soil and reduce nitrate losses without always increasing yields?",
		slug: "do-cover-crops-improve-soil-and-reduce-nitrate-losses-without-always-increasing-yields",
		consensusBand: "broad",
		confidenceScore: 89,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Cover crops commonly reduce erosion and nitrate leaching and can add organic matter, protect soil, and suppress weeds. Their effect on the following cash-crop yield ranges from negative to positive because species, termination, water, nitrogen, weather, and management determine the outcome.",
		stableCore: [
			"Non-legume cover crops can retain residual nitrate that might otherwise leach; legumes can add biologically fixed nitrogen.",
			"Living cover and roots protect soil between cash crops and can build carbon gradually, though gains vary and can saturate.",
			"Poor timing can consume scarce water, immobilize nitrogen, delay planting, or create pest and termination problems."
		],
		openQuestions: [
			"Which species mixtures, planting windows, and termination rules maximize benefits in water-limited and short-season regions?",
			"How persistent are soil-carbon and profitability gains after accounting for seed, labor, equipment, and learning costs?"
		],
		whatWouldChangeMinds: [
			"Cross-system trials showing no average reduction in erosion or nitrate loss under properly established cover crops.",
			"Long-term evidence showing that yield and environmental effects are uniform enough to support one prescription across climates and crops."
		],
		misconceptions: [
			"A practice can provide water-quality and erosion benefits without increasing the next crop's yield.",
			"Legume and grass cover crops do not have identical nitrogen effects.",
			"A national average does not substitute for local water balance and planting constraints."
		],
		editorSummary:
			"Cover crops have a strong conservation rationale, but they are management-intensive rather than universally yield-boosting. The environmental outcome and the farm business outcome should both be reported.",
		uncertaintySummary:
			"Direction is strongest for soil cover, erosion, and nitrate retention. Yield, carbon, water, and profit outcomes are more variable and may take years to emerge.",
		sources: [
			{
				kind: "meta_analysis",
				title: "A meta-analysis of the role of cover crops in U.S. conservation agriculture",
				publisher: "U.S. Department of Agriculture Agricultural Research Service",
				year: 2019,
				url: "https://www.ars.usda.gov/research/publications/publication/?seqNo115=352581",
				note: "USDA synthesis of cover-crop effects on yield, soil, nutrients, and water across U.S. studies."
			},
			{
				kind: "meta_analysis",
				title: "Carbon sequestration in agricultural soils via cultivation of cover crops: A meta-analysis",
				publisher: "Agriculture, Ecosystems & Environment",
				year: 2015,
				url: "https://doi.org/10.1016/j.agee.2014.10.024",
				doi: "10.1016/j.agee.2014.10.024",
				note: "Global meta-analysis estimating soil-carbon changes while documenting climate and management heterogeneity."
			},
			{
				kind: "meta_analysis",
				title: "Replacing bare fallows with cover crops in fertilizer-intensive cropping systems: A meta-analysis of crop yield and N dynamics",
				publisher: "Agriculture, Ecosystems & Environment",
				year: 2006,
				url: "https://doi.org/10.1016/j.agee.2005.10.003",
				doi: "10.1016/j.agee.2005.10.003",
				note: "Synthesis of nitrate leaching, nitrogen retention, and cash-crop yield tradeoffs for legume and non-legume covers."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Do diverse crop rotations improve yields and ecosystem services compared with monoculture?",
		slug: "do-diverse-crop-rotations-improve-yields-and-ecosystem-services-compared-with-monoculture",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "high",
		bottomLine:
			"Generally yes. Rotating crops—especially with legumes, cover crops, or other functionally different species—often improves yields over continuous monoculture while supporting soil, nutrient cycling, weed and pest control, and resilience. Benefits depend on sequence, environment, markets, and management.",
		stableCore: [
			"Rotation interrupts some crop-specific pest, pathogen, and weed cycles and changes rooting and nutrient demand.",
			"Legumes can supply nitrogen to later crops, while diverse roots and residues influence soil structure and biology.",
			"The benefit is not simply the number of crops; functional diversity, sequence, duration, and local adaptation matter."
		],
		openQuestions: [
			"Which rotations remain profitable where infrastructure and contracts strongly favor one or two commodity crops?",
			"How do rotation benefits change under warming, drought, new pests, and reduced pesticide or fertilizer inputs?"
		],
		whatWouldChangeMinds: [
			"Long-term multisite trials showing diversified rotations generally underperform matched monocultures across yield and ecosystem outcomes.",
			"Mechanistic evidence showing that observed benefits arise from unrelated input differences rather than rotation itself."
		],
		misconceptions: [
			"A two-crop rotation is not equivalent to every more diverse sequence.",
			"Higher average yield does not guarantee every crop in every year will yield more.",
			"Ecological benefits do not remove logistical, knowledge, equipment, or market barriers."
		],
		editorSummary:
			"Crop diversification is one of the better-supported ways to improve multiple farm outcomes, but implementation is a system design problem. Counting crop names without examining sequence and function is too crude.",
		uncertaintySummary:
			"Average benefits are supported across many studies. Magnitude varies with baseline monoculture, crop combination, climate, soil, time horizon, and whether input use changes too.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Crop rotations synergize yield, nutrition, and revenue: a global meta-analysis",
				publisher: "Nature Communications",
				year: 2025,
				url: "https://doi.org/10.1038/s41467-025-64567-9",
				doi: "10.1038/s41467-025-64567-9",
				note: "Large global synthesis of rotation effects on crop production, nutritional output, and farm revenue."
			},
			{
				kind: "meta_analysis",
				title: "Agricultural diversification promotes multiple ecosystem services without compromising yield",
				publisher: "Science Advances",
				year: 2020,
				url: "https://doi.org/10.1126/sciadv.aba1715",
				doi: "10.1126/sciadv.aba1715",
				note: "Second-order meta-analysis across diversification practices and multiple ecosystem services."
			},
			{
				kind: "systematic_review",
				title: "Long-term evidence for ecological intensification as a pathway to sustainable agriculture",
				publisher: "Nature Sustainability",
				year: 2022,
				url: "https://doi.org/10.1038/s41893-022-00911-x",
				doi: "10.1038/s41893-022-00911-x",
				note: "Long-term evidence synthesis placing crop rotation within diversified systems and identifying context and transition constraints."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Can integrated pest management reduce pesticide use without sacrificing crop yields?",
		slug: "can-integrated-pest-management-reduce-pesticide-use-without-sacrificing-crop-yields",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"Often yes. Integrated pest management combines monitoring, thresholds, resistant varieties, crop practices, biological controls, and targeted pesticides. Well-designed programs can reduce pesticide use and risk while maintaining yields, but results depend on pest pressure, farmer support, available alternatives, and what is counted as pesticide reduction.",
		stableCore: [
			"IPM is a decision framework, not a promise to eliminate every pesticide application.",
			"Prevention and monitoring can avoid routine treatment when pest abundance is below an economically damaging threshold.",
			"Reducing kilograms applied is not identical to reducing toxicity, exposure, resistance pressure, or ecological harm."
		],
		openQuestions: [
			"Which advisory, insurance, market, and policy systems make knowledge-intensive IPM durable at large scale?",
			"How should programs measure total human and ecological risk rather than only application counts or mass?"
		],
		whatWouldChangeMinds: [
			"Representative controlled programs finding that IPM usually lowers yield or fails to reduce pesticide use and risk.",
			"Long-term evidence that pest resistance and secondary pest outbreaks erase the benefits of diversified control."
		],
		misconceptions: [
			"IPM does not mean never using synthetic pesticides.",
			"One successful demonstration does not guarantee adoption without training, monitoring, and economic support.",
			"A lower application mass can still involve a more hazardous compound, and the reverse can also occur."
		],
		editorSummary:
			"IPM is a supported route to reducing unnecessary pesticide dependence, but it succeeds through repeated observation and adaptive decisions rather than a universal input recipe.",
		uncertaintySummary:
			"Many programs preserve yield while reducing use, but study definitions, crops, pests, baseline practice, toxicity metrics, and adoption conditions vary widely.",
		sources: [
			{
				kind: "guideline",
				title: "Understanding the Context: Integrated Pest Management",
				publisher: "Food and Agriculture Organization of the United Nations",
				year: 2025,
				url: "https://www.fao.org/pest-and-pesticide-management/about/understanding-the-context/en/",
				note: "Institutional definition of IPM as ecosystem-based prevention, monitoring, thresholds, and least-disruptive intervention."
			},
			{
				kind: "systematic_review",
				title: "Integrated Pest Management for Sustainable Intensification of Agriculture in Asia and Africa",
				publisher: "Insects",
				year: 2015,
				url: "https://doi.org/10.3390/insects6010152",
				doi: "10.3390/insects6010152",
				note: "Review of ecological, agronomic, and institutional evidence for IPM under diverse farming conditions."
			},
			{
				kind: "landmark_study",
				title: "Reducing pesticide use while preserving crop productivity and profitability on arable farms",
				publisher: "Nature Plants",
				year: 2017,
				url: "https://doi.org/10.1038/nplants.2017.8",
				doi: "10.1038/nplants.2017.8",
				note: "Large farm-network analysis showing substantial pesticide-use reductions were compatible with productivity and profitability in many cases."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Is regenerative agriculture one standardized, uniformly proven farming system?",
		slug: "is-regenerative-agriculture-one-standardized-uniformly-proven-farming-system",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"No. Regenerative agriculture is an umbrella label with no single accepted definition, required practice set, or outcome standard. Many practices associated with it—rotations, cover crops, reduced soil disturbance, agroforestry, and managed grazing—have evidence, but their effects must be evaluated individually and in local systems.",
		stableCore: [
			"Definitions variously emphasize practices, soil health, carbon, biodiversity, farmer livelihoods, or broad social outcomes.",
			"The same named practice can help, harm, or do little depending on baseline, climate, soil, crop, intensity, and implementation.",
			"Outcome-based claims require measured baselines, counterfactuals, time horizons, leakage, and permanence rather than branding alone."
		],
		openQuestions: [
			"Can credible outcome standards preserve local flexibility without enabling vague or misleading environmental claims?",
			"Which bundled practice changes produce durable climate, biodiversity, production, and livelihood benefits in each region?"
		],
		whatWouldChangeMinds: [
			"Broad scientific and certification convergence on one precise definition with comparable, validated outcome requirements.",
			"Replicated systems evidence showing that a specified regenerative package produces uniform benefits across representative contexts."
		],
		misconceptions: [
			"Positive evidence for one associated practice does not validate every product marketed as regenerative.",
			"A lack of one definition does not mean every underlying practice is unstudied.",
			"Soil carbon is only one outcome and can trade off with land use, methane, nitrous oxide, yield, or biodiversity."
		],
		editorSummary:
			"The label is too broad to carry a single consensus verdict. The site should translate it into testable practices and outcomes, then show where evidence is strong, conditional, or missing.",
		uncertaintySummary:
			"Uncertainty is partly definitional and partly empirical. Evidence quality ranges from strong meta-analyses for specific practices to weak promotional claims about whole branded systems.",
		sources: [
			{
				kind: "systematic_review",
				title: "What Is Regenerative Agriculture? A Review of Scholar and Practitioner Definitions Based on Processes and Outcomes",
				publisher: "Frontiers in Sustainable Food Systems",
				year: 2020,
				url: "https://doi.org/10.3389/fsufs.2020.577723",
				doi: "10.3389/fsufs.2020.577723",
				note: "Systematic review demonstrating substantial variation between practice-based and outcome-based definitions."
			},
			{
				kind: "systematic_review",
				title: "Regenerative agriculture—a literature review on the practices and mechanisms used to improve soil health",
				publisher: "Environmental Research Communications",
				year: 2023,
				url: "https://doi.org/10.1088/2515-7620/acd6dc",
				doi: "10.1088/2515-7620/acd6dc",
				note: "Evidence review separating common practices, proposed mechanisms, measured soil outcomes, and research gaps."
			},
			{
				kind: "systematic_review",
				title: "Regenerative Agriculture: An agronomic perspective",
				publisher: "Outlook on Agriculture",
				year: 2021,
				url: "https://doi.org/10.1177/0030727021998063",
				doi: "10.1177/0030727021998063",
				note: "Critical agronomic review of definitions, evidence, yield, soil carbon, livestock, and scaling claims."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Are food miles usually the largest part of a food's greenhouse-gas footprint?",
		slug: "are-food-miles-usually-the-largest-part-of-a-foods-greenhouse-gas-footprint",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"Usually not for an individual food product. Farming method, land-use change, methane, fertilizer, and processing often dominate, while transport can be crucial for air-freighted, refrigerated, or very low-production-impact foods. Distance alone is a poor proxy because transport mode and supply chain matter.",
		stableCore: [
			"A tonne-kilometer moved by cargo ship has a very different footprint from the same weight moved by air.",
			"For high-impact products such as ruminant meat, production and land-use emissions usually outweigh ordinary surface transport.",
			"When aggregated across the entire global food system, transport remains substantial because food and inputs move through multiple supply-chain stages."
		],
		openQuestions: [
			"How can product labels communicate mode, season, storage, and production impacts without creating false precision?",
			"How will electrified freight, cleaner shipping fuels, cold-chain expansion, and regionalized production change the comparison?"
		],
		whatWouldChangeMinds: [
			"Product-level lifecycle inventories showing distance is generally the dominant component across representative foods and transport modes.",
			"Improved global supply-chain models finding that production and land use were systematically overstated relative to logistics."
		],
		misconceptions: [
			"Local food is not automatically low-carbon, and imported food is not automatically high-carbon.",
			"Food miles measure distance, not vehicle efficiency, load factor, refrigeration, storage, or production method.",
			"A global transport share and the dominant component of one product's footprint are different statistics."
		],
		editorSummary:
			"Food miles are intuitive but incomplete. Diet choice and production practice usually reveal more about climate impact, while air freight and complex cold chains are important exceptions.",
		uncertaintySummary:
			"Lifecycle databases support the general hierarchy, but estimates change with land-use allocation, co-products, spoilage, storage, freight mode, and whether upstream transport is fully traced.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Reducing food's environmental impacts through producers and consumers",
				publisher: "Science",
				year: 2018,
				url: "https://doi.org/10.1126/science.aaq0216",
				doi: "10.1126/science.aaq0216",
				note: "Large harmonized dataset showing dominant production and land-use differences across foods and producers."
			},
			{
				kind: "landmark_study",
				title: "Food-Miles and the Relative Climate Impacts of Food Choices in the United States",
				publisher: "Environmental Science & Technology",
				year: 2008,
				url: "https://doi.org/10.1021/es702969f",
				doi: "10.1021/es702969f",
				note: "Influential U.S. input-output analysis distinguishing production emissions from final delivery distance."
			},
			{
				kind: "landmark_study",
				title: "Global food-miles account for nearly 20% of total food-systems emissions",
				publisher: "Nature Food",
				year: 2022,
				url: "https://doi.org/10.1038/s43016-022-00531-w",
				doi: "10.1038/s43016-022-00531-w",
				stance: "context",
				note: "Global supply-chain model showing that cumulative transport is substantial when upstream movement and the whole food system are counted."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "agriculture-and-food-systems",
		title: "Does excess fertilizer runoff cause eutrophication and coastal dead zones?",
		slug: "does-excess-fertilizer-runoff-cause-eutrophication-and-coastal-dead-zones",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Excess nitrogen and phosphorus from farms, wastewater, and other sources stimulate algal growth; decomposition then consumes dissolved oxygen, creating hypoxic waters that stress or kill aquatic life. Nutrient runoff is a major cause of many lake, river, estuary, and coastal dead zones.",
		stableCore: [
			"Nutrient enrichment can shift food webs, reduce water clarity, promote harmful algal blooms, and create oxygen depletion.",
			"Nitrogen is often especially important in estuaries and coastal waters, while phosphorus commonly limits freshwater systems; both can matter together.",
			"Weather, water residence time, stratification, wetlands, legacy nutrients, and climate warming affect how a given nutrient load translates into hypoxia."
		],
		openQuestions: [
			"How quickly will ecosystems recover when external loads fall but stored soil and sediment nutrients continue to leak?",
			"Which mix of farm practices, wastewater controls, wetlands, and enforceable load limits delivers durable watershed-scale reductions?"
		],
		whatWouldChangeMinds: [
			"Watershed experiments showing that large nutrient-load changes do not affect algal production, oxygen depletion, or dead-zone extent.",
			"Mechanistic evidence identifying a different dominant cause across systems currently attributed to eutrophication."
		],
		misconceptions: [
			"Fertilizer is not the only nutrient source; sewage, manure, atmospheric deposition, and urban runoff can also matter.",
			"A dead zone is low in oxygen, not necessarily literally devoid of every organism.",
			"Reducing one nutrient may be insufficient where both nitrogen and phosphorus constrain different stages of a bloom."
		],
		editorSummary:
			"The nutrient-to-eutrophication pathway is established. The difficult work is allocating sources and sustaining watershed-scale reductions despite weather variability and legacy pollution.",
		uncertaintySummary:
			"Causation is strong, while the response size and recovery time vary among water bodies because physical mixing, nutrient limitation, food webs, and historical loading differ.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Hypoxia",
				publisher: "National Oceanic and Atmospheric Administration",
				year: 2026,
				url: "https://coastalscience.noaa.gov/crp/hypoxia/",
				note: "Current federal synthesis linking human nutrient inputs, eutrophication, stratification, and coastal hypoxia."
			},
			{
				kind: "systematic_review",
				title: "Spreading Dead Zones and Consequences for Marine Ecosystems",
				publisher: "Science",
				year: 2008,
				url: "https://doi.org/10.1126/science.1156401",
				doi: "10.1126/science.1156401",
				note: "Global review documenting the expansion, nutrient drivers, and ecological consequences of coastal oxygen depletion."
			},
			{
				kind: "systematic_review",
				title: "Controlling harmful cyanobacterial blooms in a climatically more extreme world: management options and research needs",
				publisher: "Environmental Science & Technology",
				year: 2019,
				url: "https://doi.org/10.1021/acs.est.8b02448",
				doi: "10.1021/acs.est.8b02448",
				note: "Review of nitrogen, phosphorus, climate interactions, and management implications for harmful blooms and eutrophication."
			}
		]
	})
];
