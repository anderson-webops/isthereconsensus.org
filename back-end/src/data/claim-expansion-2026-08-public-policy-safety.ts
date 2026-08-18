import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheFourSourcedClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026PublicPolicySafetyClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Do lower legal blood-alcohol limits reduce alcohol-related crashes?",
		slug: "do-lower-legal-blood-alcohol-limits-reduce-alcohol-related-crashes",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Lower per-se blood-alcohol concentration limits are associated with reductions in alcohol-related fatal and injury crashes, especially when the rule is publicized and enforced. A legal limit is not a safety threshold—driving performance can deteriorate below it—and the size of policy benefit depends on enforcement, sanctions, transport alternatives, and the starting limit.",
		stableCore: [
			"Systematic reviews support 0.08 limits relative to 0.10 and very low limits for young or novice drivers.",
			"Risk rises continuously with alcohol concentration; crossing a statutory number is not when impairment begins.",
			"Law, visible enforcement, testing certainty, and social norms operate as a policy package."
		],
		openQuestions: [
			"How large is the incremental benefit of moving from 0.08 to 0.05 in each enforcement and drinking context?",
			"Which enforcement practices deter impaired driving without inequitable or abusive implementation?"
		],
		whatWouldChangeMinds: [
			"High-quality controlled time-series evidence showing no crash reduction after lower limits across comparable jurisdictions.",
			"Evidence that observed changes are fully explained by unrelated road-safety trends despite policy-timing and dose-response analyses."
		],
		misconceptions: [
			"Below the legal limit does not mean unimpaired or safe to drive.",
			"A lower limit without awareness or enforcement may produce less benefit than the rule alone suggests.",
			"Population-level crash reduction does not reveal the exact impairment of every individual driver."
		],
		editorSummary:
			"Legal BAC limits reduce risk as part of an enforced system, while the scientifically safest message remains not to drive after drinking.",
		uncertaintySummary:
			"The direction is high-certainty for established lower-limit policies. Incremental effect size varies by baseline law, enforcement, mobility, and alcohol use.",
		sources: [
			{
				kind: "systematic_review",
				title: "Reviews of evidence regarding interventions to reduce alcohol-impaired driving",
				publisher: "American Journal of Preventive Medicine",
				year: 2001,
				url: "https://doi.org/10.1016/S0749-3797(01)00381-6",
				doi: "10.1016/S0749-3797(01)00381-6",
				note: "Community Guide systematic reviews supporting lower BAC laws, minimum drinking age laws, and sobriety checkpoints."
			},
			{
				kind: "meta_analysis",
				title: "A meta-analysis of .08 BAC laws in 19 jurisdictions in the United States",
				publisher: "Accident Analysis & Prevention",
				year: 2004,
				url: "https://doi.org/10.1016/j.aap.2004.02.006",
				doi: "10.1016/j.aap.2004.02.006",
				note: "Pooled policy evaluation estimating alcohol-related fatal-crash changes after 0.08 laws."
			},
			{
				kind: "guideline",
				title: "Drink-driving: a road safety manual for decision-makers and practitioners",
				publisher: "World Health Organization",
				year: 2022,
				url: "https://www.who.int/publications/i/item/9789240045989",
				note: "Global implementation guidance covering BAC limits, enforcement, publicity, sanctions, and complementary transport measures."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Do alcohol ignition interlocks reduce repeat impaired driving?",
		slug: "do-alcohol-ignition-interlocks-reduce-repeat-impaired-driving",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, while installed. Ignition interlocks prevent a vehicle from starting after a failed breath test and substantially reduce re-arrest among participating convicted drivers during the installation period. Benefits often weaken after removal, so program coverage, monitoring, duration, treatment links, and licensing policy matter.",
		stableCore: [
			"Systematic reviews find lower recidivism during mandatory interlock use than under license suspension alone.",
			"The device controls vehicle access; it does not by itself treat alcohol-use disorder or permanently change behavior.",
			"Loopholes, noninstallation, access to another vehicle, maintenance costs, and program dropout reduce real-world effectiveness."
		],
		openQuestions: [
			"Which duration, monitoring, treatment, and removal criteria produce durable post-interlock effects?",
			"How can programs maximize installation while avoiding cost barriers for low-income participants?"
		],
		whatWouldChangeMinds: [
			"Updated controlled evaluations showing no recidivism reduction while correctly installed interlocks are required and monitored.",
			"Evidence that comparable license sanctions alone achieve equal prevention with fewer harms and implementation failures."
		],
		misconceptions: [
			"An interlock is not a cure for alcohol dependence.",
			"Effectiveness among installers can overstate a weak program in which many eligible drivers never install.",
			"Reduced re-arrest is not identical to eliminating all impaired driving or crashes."
		],
		editorSummary:
			"Interlocks are effective incapacitation while present; durable policy adds broad installation, monitoring, affordability, and behavior-change support.",
		uncertaintySummary:
			"During-installation recidivism reduction is well supported. Crash outcomes and persistence after removal are less certain and program-dependent.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Alcohol ignition interlock programmes for reducing drink driving recidivism",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2004,
				url: "https://doi.org/10.1002/14651858.CD004168.pub2",
				doi: "10.1002/14651858.CD004168.pub2",
				note: "Controlled-study synthesis finding recidivism reductions during installation but limited persistence after removal."
			},
			{
				kind: "systematic_review",
				title: "Effectiveness of ignition interlocks for preventing alcohol-impaired driving and alcohol-related crashes: a Community Guide systematic review",
				publisher: "American Journal of Preventive Medicine",
				year: 2011,
				url: "https://doi.org/10.1016/j.amepre.2010.11.012",
				doi: "10.1016/j.amepre.2010.11.012",
				note: "Systematic policy review of recidivism, crashes, installation, and implementation."
			},
			{
				kind: "guideline",
				title: "Alcohol Ignition Interlocks",
				publisher: "National Highway Traffic Safety Administration",
				year: 2024,
				url: "https://www.nhtsa.gov/book/countermeasures-that-work/alcohol-impaired-driving/countermeasures/other-strategies-behavior-change/alcohol-ignition-interlocks",
				note: "Current implementation guidance on effectiveness, installation, monitoring, and program design."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Does converting suitable intersections to roundabouts reduce severe crashes?",
		slug: "does-converting-suitable-intersections-to-roundabouts-reduce-severe-crashes",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Converting appropriate stop- or signal-controlled intersections to modern roundabouts generally reduces fatal and serious-injury crashes by lowering speeds and replacing right-angle and head-on conflict points. Total minor crashes can rise in some designs, and pedestrian and cyclist safety depends on geometry, speed, visibility, crossings, and user familiarity.",
		stableCore: [
			"Roundabouts change crash type and energy, not merely the number of vehicles entering an intersection.",
			"The largest and most consistent benefit is for fatal and serious injury outcomes.",
			"Multilane, high-speed, poorly marked, or inaccessible designs do not inherit every benefit of a compact well-designed roundabout."
		],
		openQuestions: [
			"Which designs best protect blind pedestrians, cyclists, children, and older drivers at complex sites?",
			"Where do traffic volume, land constraints, transit, or emergency access make another intersection design preferable?"
		],
		whatWouldChangeMinds: [
			"Updated controlled before-after studies finding no reduction in severe crashes after appropriate conversions.",
			"Evidence that observed benefits disappear after regression-to-the-mean, site selection, and traffic changes are addressed."
		],
		misconceptions: [
			"Fewer severe crashes does not guarantee fewer property-damage crashes.",
			"A modern roundabout is not the same design as every large traffic circle or rotary.",
			"Roundabouts are not the best solution for every intersection."
		],
		editorSummary:
			"Roundabouts are an injury-severity intervention: slow the conflict and remove the most dangerous collision angles, then design explicitly for every road user.",
		uncertaintySummary:
			"Severe-crash reduction is robust. Effects on total crashes and vulnerable users vary by conversion type, geometry, traffic, and evaluation design.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Road safety effects of roundabouts: A meta-analysis",
				publisher: "Accident Analysis & Prevention",
				year: 2017,
				url: "https://doi.org/10.1016/j.aap.2016.12.018",
				doi: "10.1016/j.aap.2016.12.018",
				note: "Meta-analysis separating fatal, injury, property-damage, conversion, and design effects."
			},
			{
				kind: "systematic_review",
				title: "Effects of interventions for preventing road traffic crashes: an overview of systematic reviews",
				publisher: "BMC Public Health",
				year: 2022,
				url: "https://doi.org/10.1186/s12889-021-12253-y",
				doi: "10.1186/s12889-021-12253-y",
				note: "Review-of-reviews placing roundabouts among evidence-based road-infrastructure interventions."
			},
			{
				kind: "guideline",
				title: "Roundabouts with Pedestrians and Bicycles",
				publisher: "Federal Highway Administration",
				year: 2023,
				url: "https://highways.dot.gov/safety/intersection-safety/intersection-types/roundabouts/roundabouts-pedestrians-and-bicycles",
				note: "Federal design guidance emphasizing speed, crossings, accessibility, cyclists, and site-specific tradeoffs."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Do area-wide traffic-calming schemes reduce road injuries?",
		slug: "do-area-wide-traffic-calming-schemes-reduce-road-injuries",
		consensusBand: "broad",
		confidenceScore: 93,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, when they actually lower speeds. Area-wide combinations such as humps, raised crossings, narrowed entries, filtered streets, and self-enforcing low-speed zones reduce road injuries on average. A posted speed-limit sign without street redesign or enforcement is a different, often weaker intervention.",
		stableCore: [
			"Speed affects both crash probability and the energy transferred when a crash occurs.",
			"Area-wide designs can prevent traffic displacement from one treated block to the next better than isolated measures.",
			"Emergency response, transit, accessibility, noise, diversion, and neighborhood equity require explicit design evaluation."
		],
		openQuestions: [
			"Which measure bundles produce the largest injury reduction with acceptable access and displacement effects?",
			"How should benefits and burdens be distributed across high-injury and historically underinvested neighborhoods?"
		],
		whatWouldChangeMinds: [
			"Controlled area-wide evaluations showing no speed or injury reduction from self-enforcing traffic calming.",
			"Evidence that collision migration, emergency delay, or other harms consistently exceed prevented injuries."
		],
		misconceptions: [
			"A 20 mph or 30 km/h sign alone is not equivalent to an engineered low-speed zone.",
			"Fewer injuries may occur even if every minor collision is not eliminated.",
			"One street treatment can shift traffic; area-level outcomes matter."
		],
		editorSummary:
			"Judge traffic calming by measured speed and area-wide injury outcomes, not the posted number or one intersection alone.",
		uncertaintySummary:
			"Average injury reduction is supported, but older observational studies dominate parts of the evidence and designs vary substantially.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Traffic calming for the prevention of road traffic injuries: systematic review and meta-analysis",
				publisher: "Injury Prevention",
				year: 2003,
				url: "https://doi.org/10.1136/ip.9.3.200",
				doi: "10.1136/ip.9.3.200",
				note: "Controlled-study synthesis of injury and crash changes following area-wide traffic calming."
			},
			{
				kind: "systematic_review",
				title: "Area-wide traffic calming for preventing traffic related injuries",
				publisher: "Cochrane Database of Systematic Reviews",
				year: 2003,
				url: "https://doi.org/10.1002/14651858.CD003110",
				doi: "10.1002/14651858.CD003110",
				note: "Systematic review finding area-wide schemes can reduce traffic injuries and deaths."
			},
			{
				kind: "landmark_study",
				title: "Effect of 20 mph traffic speed zones on road injuries in London, 1986-2006: controlled interrupted time series analysis",
				publisher: "BMJ",
				year: 2009,
				url: "https://doi.org/10.1136/bmj.b4469",
				doi: "10.1136/bmj.b4469",
				note: "Long-running city evaluation examining casualties, children, severe outcomes, and displacement."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Did child-resistant packaging laws reduce fatal medicine poisonings in young children?",
		slug: "did-child-resistant-packaging-laws-reduce-fatal-medicine-poisonings-in-young-children",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Requiring child-resistant packaging for many medicines and hazardous products substantially reduced fatal unintentional poisonings among young children. The packages are resistant, not childproof: adults must reclose them correctly, medicines still need secure storage, and accessible or noncompliant products still cause poisoning.",
		stableCore: [
			"Time-series evaluations found large mortality reductions after U.S. packaging requirements took effect.",
			"Passive product design protects during brief lapses when education or supervision alone may fail.",
			"Usability matters because difficult closures may be left open or medicines transferred to unsafe containers."
		],
		openQuestions: [
			"How should standards adapt to concentrated nicotine, cannabis edibles, detergent packets, and older-adult accessibility?",
			"Which package designs best combine child resistance, adult usability, adherence, and environmental goals?"
		],
		whatWouldChangeMinds: [
			"Reanalysis showing no mortality change attributable to packaging after medicine consumption and secular safety trends are controlled.",
			"Evidence that compliant child-resistant designs do not delay access by young children relative to conventional packaging."
		],
		misconceptions: [
			"Child-resistant does not mean impossible for a child to open.",
			"Packaging does not replace locked or out-of-sight storage.",
			"Education alone is not equivalent to a safety feature built into every covered package."
		],
		editorSummary:
			"Child-resistant packaging is a successful passive-safety regulation, with benefit maintained only when packages remain compliant, usable, and correctly closed.",
		uncertaintySummary:
			"Historical mortality reduction is high-certainty. Current product classes, misuse patterns, and design tradeoffs require ongoing surveillance.",
		sources: [
			{
				kind: "guideline",
				title: "Poison Prevention Packaging Act",
				publisher: "U.S. Consumer Product Safety Commission",
				year: 1970,
				url: "https://www.cpsc.gov/Regulations-Laws--Standards/Statutes/Poison-Prevention-Packaging-Act",
				note: "Official statutory and standards context for covered household substances and child-resistant packaging."
			},
			{
				kind: "landmark_study",
				title: "The safety effects of child-resistant packaging for oral prescription drugs: Two decades of experience",
				publisher: "JAMA",
				year: 1996,
				url: "https://doi.org/10.1001/jama.1996.03530450051032",
				doi: "10.1001/jama.1996.03530450051032",
				note: "Time-series analysis estimating a large reduction in young-child prescription-drug poisoning mortality."
			},
			{
				kind: "systematic_review",
				title: "Updating the evidence: A systematic review of what works in preventing childhood unintentional injuries. Part 2",
				publisher: "Injury Prevention",
				year: 2001,
				url: "https://doi.org/10.1136/ip.7.3.249",
				doi: "10.1136/ip.7.3.249",
				note: "Review of passive injury-prevention measures including poison packaging and remaining implementation limits."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Do residential fire sprinklers reduce deaths and injuries when home fires occur?",
		slug: "do-residential-fire-sprinklers-reduce-deaths-and-injuries-when-home-fires-occur",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Residential sprinklers usually control a fire near its origin, reducing heat, smoke, flashover, deaths, injuries, and property loss. The strongest real-world evidence is observational because homes are not randomized; benefits depend on installation, water supply, maintenance, coverage, and pairing sprinklers with working smoke alarms and escape planning.",
		stableCore: [
			"Sprinklers respond individually to sufficient heat; a small fire does not normally activate every head in a home.",
			"Containing the fire buys escape time and reduces dangerous conditions before firefighters arrive.",
			"Smoke alarms warn occupants while sprinklers control fire growth, so the systems are complementary."
		],
		openQuestions: [
			"Which code, retrofit, subsidy, and rural-water approaches produce the greatest equitable benefit per cost?",
			"How should performance be monitored in aging housing and homes with disabled or mobility-limited residents?"
		],
		whatWouldChangeMinds: [
			"Comparable fire-incident data showing no reduction in lethal conditions, deaths, or injuries when functioning sprinklers are present.",
			"Evidence that installation, maintenance, water, and property harms routinely outweigh prevented fire losses."
		],
		misconceptions: [
			"Smoke from cooking usually does not activate a heat-triggered sprinkler.",
			"Sprinklers do not make smoke alarms or escape plans unnecessary.",
			"An average effectiveness estimate assumes a functioning, appropriately designed system."
		],
		editorSummary:
			"Sprinklers change the fire before people and responders must survive it; alarms, maintenance, and accessible escape remain essential layers.",
		uncertaintySummary:
			"Fire control and direction of life-safety benefit are strong. Exact population effect and cost-effectiveness vary with codes, housing, data quality, and system reliability.",
		sources: [
			{
				kind: "consensus_statement",
				title: "U.S. Experience with Sprinklers",
				publisher: "National Fire Protection Association",
				year: 2024,
				url: "https://www.nfpa.org/education-and-research/research/nfpa-research/fire-statistical-reports/us-experience-with-sprinklers",
				note: "National fire-incident synthesis comparing death, injury, fire spread, and property outcomes with and without sprinklers."
			},
			{
				kind: "landmark_study",
				title: "Comparing the performance of residential fire sprinklers with other life-safety technologies",
				publisher: "Accident Analysis & Prevention",
				year: 2012,
				url: "https://doi.org/10.1016/j.aap.2012.03.006",
				doi: "10.1016/j.aap.2012.03.006",
				note: "Comparative incident analysis of sprinklers, alarms, and combined life-safety protection."
			},
			{
				kind: "systematic_review",
				title: "Interventions for Preventing Residential Fires in Vulnerable Neighbourhoods and Indigenous Communities: A Systematic Review of the Literature",
				publisher: "International Journal of Environmental Research and Public Health",
				year: 2022,
				url: "https://doi.org/10.3390/ijerph19095434",
				doi: "10.3390/ijerph19095434",
				note: "Review placing suppression systems within layered prevention and identifying evidence and equity gaps."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Do higher tobacco excise taxes reduce smoking?",
		slug: "do-higher-tobacco-excise-taxes-reduce-smoking",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Raising the real price of tobacco through excise taxes reduces consumption, encourages quitting, and discourages initiation, with particularly strong price responsiveness among young people and lower-income groups. Avoidance, substitution, illicit supply, and financially regressive payments among people who continue smoking require complementary policy and equity measures.",
		stableCore: [
			"Demand for cigarettes falls as price rises across countries and study designs.",
			"Health gains can be progressive because smoking burden and price responsiveness are often greater in lower-income populations.",
			"Specific taxes adjusted for inflation, broad product coverage, enforcement, and cessation support reduce substitution and erosion."
		],
		openQuestions: [
			"How should taxes cover cigarettes, cigars, heated tobacco, nicotine products, and cross-border sales as relative harms differ?",
			"Which use of revenue best offsets short-run financial burden and expands effective cessation support?"
		],
		whatWouldChangeMinds: [
			"Robust natural experiments and syntheses showing no consumption, initiation, or cessation response to sustained real-price increases.",
			"Evidence that avoidance and illicit markets routinely erase population health gains under well-enforced comprehensive taxes."
		],
		misconceptions: [
			"Addiction reduces price responsiveness but does not make demand perfectly fixed.",
			"Regressive payment incidence is not the same as regressive health impact.",
			"A tax is not a substitute for smoke-free rules, marketing controls, treatment, and product regulation."
		],
		editorSummary:
			"Tobacco tax is one of the strongest population levers when it raises real prices broadly and funds equitable support rather than standing alone.",
		uncertaintySummary:
			"The direction is high-certainty. Effect size, substitution, illicit trade, and distributional outcomes vary by market and policy design.",
		sources: [
			{
				kind: "guideline",
				title: "Tobacco Use: Interventions to Increase the Unit Price for Tobacco Products",
				publisher: "The Community Guide",
				year: 2012,
				url: "https://www.thecommunityguide.org/findings/tobacco-use-interventions-increase-unit-price-tobacco.html",
				note: "Independent public-health recommendation based on initiation, quitting, prevalence, and consumption evidence."
			},
			{
				kind: "meta_analysis",
				title: "A systematic review and network meta-analysis of population-level interventions to tackle smoking behaviour",
				publisher: "Nature Human Behaviour",
				year: 2024,
				url: "https://doi.org/10.1038/s41562-024-02002-7",
				doi: "10.1038/s41562-024-02002-7",
				note: "Current comparative synthesis of pricing and other population tobacco-control measures."
			},
			{
				kind: "systematic_review",
				title: "The Use of Excise Taxes to Reduce Tobacco, Alcohol, and Sugary Beverage Consumption",
				publisher: "Annual Review of Public Health",
				year: 2019,
				url: "https://doi.org/10.1146/annurev-publhealth-040218-043816",
				doi: "10.1146/annurev-publhealth-040218-043816",
				note: "Cross-product review of price responsiveness, health rationale, administration, and distributional issues."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Do taxes on sugar-sweetened beverages reduce purchases?",
		slug: "do-taxes-on-sugar-sweetened-beverages-reduce-purchases",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Implemented sugar-sweetened beverage taxes raise taxed-product prices and reduce purchases or sales on average, often while encouraging manufacturers to reformulate. Evidence for long-term body weight, diabetes, and cardiovascular outcomes is promising but less direct and slower to accumulate than purchase evidence.",
		stableCore: [
			"Systematic reviews across jurisdictions find price pass-through and reduced demand for taxed drinks.",
			"Responses vary with tax size and design, product coverage, cross-border shopping, substitution, and industry reformulation.",
			"Purchase changes are an intermediate outcome; health impact also depends on replacement drinks and sustained consumption."
		],
		openQuestions: [
			"How much do specific volume, sugar-content, and tiered taxes differ in reformulation and health impact?",
			"How should revenue use and access to safe water shape equity outcomes?"
		],
		whatWouldChangeMinds: [
			"Updated controlled evaluations showing no reduction in taxed-beverage purchases after meaningful price pass-through.",
			"Evidence that substitution consistently leaves total added-sugar intake unchanged under comprehensive designs."
		],
		misconceptions: [
			"A purchase reduction does not instantly prove a population obesity decline.",
			"Not every beverage tax has the same base, rate, or incentive for reformulation.",
			"Consumers can respond without completely stopping consumption."
		],
		editorSummary:
			"The strongest evidence is on price and purchasing; treat long-term health effects as a plausible downstream pathway that needs continued measurement.",
		uncertaintySummary:
			"Purchase reduction is high-certainty. Long-term health magnitude, substitution, industry response, and equity vary by design and setting.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Impact of sugar-sweetened beverage taxes on purchases and dietary intake: Systematic review and meta-analysis",
				publisher: "Obesity Reviews",
				year: 2019,
				url: "https://doi.org/10.1111/obr.12868",
				doi: "10.1111/obr.12868",
				note: "Pooled evidence on price pass-through, purchases, consumption, substitution, and tax design."
			},
			{
				kind: "systematic_review",
				title: "Outcomes Following Taxation of Sugar-Sweetened Beverages: A Systematic Review and Meta-analysis",
				publisher: "JAMA Network Open",
				year: 2022,
				url: "https://doi.org/10.1001/jamanetworkopen.2022.15276",
				doi: "10.1001/jamanetworkopen.2022.15276",
				note: "Updated synthesis of implemented taxes, sales, consumption, reformulation, and body-weight evidence."
			},
			{
				kind: "guideline",
				title: "WHO manual on sugar-sweetened beverage taxation policies to promote healthy diets",
				publisher: "World Health Organization",
				year: 2022,
				url: "https://www.who.int/publications/i/item/9789240056299",
				note: "Implementation guidance on tax objectives, design, administration, evaluation, and equity."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Do industrial trans-fat restrictions reduce cardiovascular harm?",
		slug: "do-industrial-trans-fat-restrictions-reduce-cardiovascular-harm",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Mandatory limits or bans sharply reduce industrial trans fat in the food supply, and policy evaluations associate restrictions with fewer cardiovascular events and deaths. Replacement fat matters: substituting unsaturated oils improves the risk profile, whereas replacing trans fat with saturated fat yields less benefit.",
		stableCore: [
			"Industrial trans fat raises LDL, lowers HDL, and increases coronary risk without a known health requirement.",
			"Mandatory policies achieve broader and more equitable exposure reduction than voluntary labeling alone.",
			"Monitoring must include imports, restaurants, small producers, and the composition of replacement fats."
		],
		openQuestions: [
			"How can countries verify elimination where laboratory and regulatory capacity are limited?",
			"Which supports help small producers reformulate without shifting to high saturated-fat alternatives?"
		],
		whatWouldChangeMinds: [
			"Biomarker and food-supply surveillance showing no industrial trans-fat reduction after enforced restrictions.",
			"Robust controlled evaluations finding no cardiovascular improvement despite replacement with unsaturated fats."
		],
		misconceptions: [
			"The policy targets industrially produced trans fat, not every naturally occurring trace amount.",
			"Removing trans fat does not make every reformulated food nutritious.",
			"Existing causal evidence on trans-fat harm is stronger than any one policy time series."
		],
		editorSummary:
			"Elimination works when the rule covers the food supply and replaces industrial trans fat with healthier oils, then verifies exposure and outcomes.",
		uncertaintySummary:
			"Exposure reduction and causal cardiovascular rationale are high-certainty. Policy effect size varies with baseline intake, enforcement, and replacement fats.",
		sources: [
			{
				kind: "guideline",
				title: "REPLACE trans fat: an action package to eliminate industrially produced trans-fatty acids",
				publisher: "World Health Organization",
				year: 2018,
				url: "https://www.who.int/teams/nutrition-and-food-safety/replace-trans-fat",
				note: "Global policy framework for review, replacement, legislation, monitoring, awareness, and enforcement."
			},
			{
				kind: "systematic_review",
				title: "The Impact of Policies to Reduce trans Fat Consumption: A Systematic Review of the Evidence",
				publisher: "Current Developments in Nutrition",
				year: 2017,
				url: "https://doi.org/10.3945/cdn.117.000778",
				doi: "10.3945/cdn.117.000778",
				note: "Systematic review comparing voluntary, labeling, local, and national policy effects on food and exposure."
			},
			{
				kind: "landmark_study",
				title: "Trans fat and cardiovascular disease mortality: Evidence from bans in restaurants in New York",
				publisher: "Journal of Health Economics",
				year: 2016,
				url: "https://doi.org/10.1016/j.jhealeco.2015.09.005",
				doi: "10.1016/j.jhealeco.2015.09.005",
				note: "Quasi-experimental policy evaluation of cardiovascular mortality after local restaurant restrictions."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Does minimum unit pricing reduce alcohol consumption and harm?",
		slug: "does-minimum-unit-pricing-reduce-alcohol-consumption-and-harm",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, the best evaluated national case indicates that setting a floor price per unit of alcohol reduced purchases and alcohol-attributable deaths, with larger benefits among groups experiencing the greatest alcohol harm. Evidence for hospital admissions is more mixed, and transferability depends on the price, market, enforcement, income, and other alcohol policies.",
		stableCore: [
			"Minimum unit pricing targets the cheapest high-strength alcohol rather than raising every product by the same amount.",
			"Controlled interrupted time-series analyses in Scotland found reduced alcohol-attributable mortality after implementation.",
			"Policy evaluation must track substitution, cross-border purchases, household hardship, retailer revenue, hospital outcomes, and unequal effects."
		],
		openQuestions: [
			"How durable are mortality effects and what explains weaker or heterogeneous hospital findings?",
			"How should the floor be indexed and paired with treatment and income support to limit hardship among dependent drinkers?"
		],
		whatWouldChangeMinds: [
			"Independent reanalysis or later controlled series showing no purchase or alcohol-attributable mortality reduction in Scotland.",
			"Comparable implementations consistently producing no health benefit or greater net harm after distributional effects are included."
		],
		misconceptions: [
			"Minimum unit pricing is not the same as an alcohol tax; additional revenue initially goes to retailers unless policy recaptures it.",
			"One strong national evaluation does not establish an identical effect in every country.",
			"Population benefit can coexist with financial strain or limited change among some people with dependence."
		],
		editorSummary:
			"Scotland provides credible evidence of reduced consumption and deaths, with enough implementation and equity uncertainty to avoid claiming a universal effect size.",
		uncertaintySummary:
			"The Scottish mortality result is persuasive and triangulated; cross-jurisdiction generalization, hospital effects, and long-run distributional impacts remain less certain.",
		sources: [
			{
				kind: "landmark_study",
				title: "Evaluating the impact of alcohol minimum unit pricing on deaths and hospitalisations in Scotland: a controlled interrupted time series study",
				publisher: "The Lancet",
				year: 2023,
				url: "https://doi.org/10.1016/S0140-6736(23)00497-X",
				doi: "10.1016/S0140-6736(23)00497-X",
				note: "National controlled time-series evaluation of alcohol-attributable deaths and hospitalizations."
			},
			{
				kind: "systematic_review",
				title: "Evaluating the impact of minimum unit pricing for alcohol in Scotland: a theory-based synthesis of the evidence",
				publisher: "The Lancet",
				year: 2023,
				url: "https://doi.org/10.1016/S0140-6736(23)02065-2",
				doi: "10.1016/S0140-6736(23)02065-2",
				note: "Program-wide synthesis linking implementation, price, purchasing, consumption, health, economy, and subgroup outcomes."
			},
			{
				kind: "systematic_review",
				title: "Impact of minimum unit pricing on alcohol-related hospital outcomes: systematic review",
				publisher: "BMJ Open",
				year: 2023,
				url: "https://doi.org/10.1136/bmjopen-2022-065220",
				doi: "10.1136/bmjopen-2022-065220",
				note: "Focused review preserving uncertainty and heterogeneity in hospital-use outcomes."
			}
		]
	})
];
