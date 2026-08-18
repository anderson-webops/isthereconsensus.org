import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheThreeSourcedClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026EconomicsClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Do modest minimum-wage increases always cause large job losses?",
		slug: "do-modest-minimum-wage-increases-always-cause-large-job-losses",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Across many studied increases from prevailing wage levels, average employment effects are small or difficult to distinguish from zero, while pay rises for affected workers. Effects can be less favorable for some groups, sectors, regions, or unusually large increases, so evidence does not imply that any minimum wage is costless.",
		stableCore: [
			"Employers can adjust through prices, productivity, turnover, profits, hours, hiring, benefits, and employment rather than one channel alone.",
			"Estimated effects depend on the wage increase relative to local wages, exposure, enforcement, time horizon, and comparison group.",
			"A small average employment effect can coexist with gains for many workers and losses or reduced entry for particular workers."
		],
		openQuestions: [
			"How do high minimum-to-median wage ratios affect teenagers, disabled workers, small firms, and low-wage regions over longer periods?",
			"How much adjustment occurs through hours, scheduling, automation, benefits, prices, and business entry rather than headcount?"
		],
		whatWouldChangeMinds: [
			"Updated design-robust meta-analyses finding large negative employment effects are the usual result of modest increases.",
			"Conversely, credible evidence that employment and all other margins remain unaffected even at very high binding wage floors."
		],
		misconceptions: [
			"Finding no large average job loss does not mean demand curves or tradeoffs disappear.",
			"A statistically insignificant estimate is not proof of exactly zero effect.",
			"One city, age group, or restaurant study cannot settle every wage level and labor market."
		],
		editorSummary:
			"The old categorical claim of large inevitable job loss is not supported by the modern empirical record. The evidence instead supports context- and magnitude-sensitive estimates with distributional winners and possible losers.",
		uncertaintySummary:
			"Research designs and meta-analyses converge on muted average effects for many observed changes, but high policy levels, long-run capital adjustment, subgroup effects, and publication choices remain debated.",
		sources: [
			{
				kind: "meta_analysis",
				title: "The effect of minimum wages on employment in emerging economies: a survey and meta-analysis",
				publisher: "Oxford Development Studies",
				year: 2017,
				url: "https://doi.org/10.1080/13600818.2017.1279134",
				doi: "10.1080/13600818.2017.1279134",
				note: "Meta-analysis finding generally small employment effects while documenting heterogeneity across countries and study designs."
			},
			{
				kind: "systematic_review",
				title: "The impact of the minimum wage on employment: a meta-analysis",
				publisher: "RAND Europe",
				year: 2017,
				url: "https://www.rand.org/content/dam/rand/pubs/research_reports/RR1800/RR1807/RAND_RR1807.pdf",
				note: "Systematic review of minimum-wage employment estimates, methods, publication bias, and policy context."
			},
			{
				kind: "landmark_study",
				title: "The Effects of Minimum Wages on Low-Wage Jobs",
				publisher: "The Quarterly Journal of Economics",
				year: 2019,
				url: "https://doi.org/10.1093/qje/qjz014",
				doi: "10.1093/qje/qjz014",
				note: "High-resolution U.S. analysis finding earnings gains and little net change in low-wage employment after many state increases."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Does rent control help covered tenants without affecting housing supply or mobility?",
		slug: "does-rent-control-help-covered-tenants-without-affecting-housing-supply-or-mobility",
		consensusBand: "broad",
		confidenceScore: 89,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Rent regulation can lower rents and reduce displacement for tenants who receive and keep covered units, but empirical studies also find reduced mobility, conversion away from rental housing, lower maintenance or construction in some designs, and spillovers to uncontrolled rents. Policy design and housing scarcity strongly affect the tradeoff.",
		stableCore: [
			"Benefits are concentrated among incumbent covered tenants and may not be well targeted by income or need.",
			"When a below-market unit is valuable only if retained, households may stay even after their housing needs or job location change.",
			"Exemptions, vacancy rules, construction incentives, enforcement, tenant protections, and complementary supply policy can change outcomes."
		],
		openQuestions: [
			"Which modern regulation designs preserve tenant stability while minimizing conversion, misallocation, and supply loss?",
			"How should immediate anti-displacement benefits be compared with long-run effects on future renters and neighborhood access?"
		],
		whatWouldChangeMinds: [
			"Cross-jurisdiction causal studies showing strong rent controls consistently aid covered tenants with no housing-supply, quality, mobility, or spillover effects.",
			"Evidence that adverse effects attributed to controls are entirely explained by pre-existing scarcity or concurrent policies."
		],
		misconceptions: [
			"Benefits to current tenants and costs to future or uncovered tenants can both be real.",
			"First-generation price freezes and modern rent stabilization are not identical policies.",
			"Finding adverse supply effects does not answer the ethical question of how to protect residents during a housing shortage."
		],
		editorSummary:
			"Rent control is distributional, not consequence-free: it protects some incumbents while changing landlord and tenant behavior elsewhere. A serious review reports who gains, who loses, and over what time horizon.",
		uncertaintySummary:
			"The literature repeatedly finds controlled-rent benefits and several adverse margins, but their size varies with design, enforcement, market conditions, and the available counterfactual.",
		sources: [
			{
				kind: "systematic_review",
				title: "Rent control effects through the lens of empirical research: An almost complete review of the literature",
				publisher: "Journal of Housing Economics",
				year: 2024,
				url: "https://doi.org/10.1016/j.jhe.2024.101983",
				doi: "10.1016/j.jhe.2024.101983",
				note: "Broad empirical review documenting lower controlled rents alongside recurring mobility, supply, quality, and allocation effects."
			},
			{
				kind: "landmark_study",
				title: "The Effects of Rent Control Expansion on Tenants, Landlords, and Inequality: Evidence from San Francisco",
				publisher: "American Economic Review",
				year: 2019,
				url: "https://doi.org/10.1257/aer.20181289",
				doi: "10.1257/aer.20181289",
				note: "Natural-experiment study finding tenant stability benefits, reduced rental supply, and citywide rent spillovers."
			},
			{
				kind: "systematic_review",
				title: "Rent control: What does the research tell us about the effectiveness of local action?",
				publisher: "Urban Institute",
				year: 2019,
				url: "https://www.urban.org/research/publication/rent-control-what-does-research-tell-us-about-effectiveness-local-action",
				appraisal: "moderate",
				note: "Policy synthesis distinguishing tenant protection goals, empirical tradeoffs, and variation among local designs."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Does adding housing supply reduce rents or rent growth across a city?",
		slug: "does-adding-housing-supply-reduce-rents-or-rent-growth-across-a-city",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"Generally yes. More homes increase vacancy options and trigger chains of moves that loosen competition beyond the new buildings, reducing rents or slowing rent growth relative to what would otherwise occur. Effects take time and vary by location and segment; new market-rate supply does not by itself ensure deeply affordable homes for everyone.",
		stableCore: [
			"The relevant comparison is rent with added supply versus rent under the same demand without it, not whether nominal rent fell during a growing city's boom.",
			"Households moving into new units leave vacancies that are reoccupied, propagating availability through multiple price and income segments.",
			"Subsidies, vouchers, public or nonprofit housing, tenant protections, and homelessness services address needs that market supply alone may not reach quickly."
		],
		openQuestions: [
			"How quickly and how far do moving-chain and rent effects travel in highly segregated or supply-constrained markets?",
			"Which mix of market-rate, social, subsidized, and supportive housing best serves different income and vulnerability groups?"
		],
		whatWouldChangeMinds: [
			"Strong causal evidence across cities showing additional comparable housing consistently raises regional rents after demand and location are addressed.",
			"Moving-chain data showing new units do not release meaningful vacancies outside their initial income segment."
		],
		misconceptions: [
			"New expensive units can affect older units through vacancies even if low-income households never occupy the new building.",
			"Supply reducing rent pressure does not mean developers build at prices the poorest household can afford.",
			"A nearby amenity or redevelopment effect can differ from the broader citywide supply effect."
		],
		editorSummary:
			"Housing supply is not a complete housing policy, but it is part of affordability arithmetic. The evidence supports regional easing through added units and moving chains while preserving a distinct role for targeted assistance.",
		uncertaintySummary:
			"Direction is increasingly supported, while effect size and speed depend on demand growth, market segmentation, location, vacancy, regulation, and the amount and type of construction.",
		sources: [
			{
				kind: "systematic_review",
				title: "Supply Skepticism Revisited",
				publisher: "NYU Furman Center",
				year: 2025,
				url: "https://www.furmancenter.org/publication/supply-skepticism-revisited-update/",
				appraisal: "moderate",
				note: "Research synthesis covering regional rent, neighborhood, displacement, and moving-chain evidence and its limits."
			},
			{
				kind: "landmark_study",
				title: "JUE Insight: City-wide effects of new housing supply: Evidence from moving chains",
				publisher: "Journal of Urban Economics",
				year: 2023,
				url: "https://doi.org/10.1016/j.jue.2022.103528",
				doi: "10.1016/j.jue.2022.103528",
				note: "Administrative-data study tracing moves from new market-rate units into middle- and lower-income neighborhoods."
			},
			{
				kind: "landmark_study",
				title: "The Effect of New Market-Rate Housing Construction on the Low-Income Housing Market",
				publisher: "Journal of Urban Economics",
				year: 2023,
				url: "https://doi.org/10.1016/j.jue.2021.103383",
				doi: "10.1016/j.jue.2021.103383",
				note: "Moving-chain analysis showing how new market-rate occupancy generates vacancies that reach lower-income neighborhoods."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Do cash transfers make low-income recipients spend more on alcohol or tobacco?",
		slug: "do-cash-transfers-make-low-income-recipients-spend-more-on-alcohol-or-tobacco",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "high",
		bottomLine:
			"Generally no. Across cash-transfer evaluations in low- and middle-income countries, recipients do not systematically increase spending on alcohol or tobacco; many estimates are zero or negative. This does not mean no individual ever spends transfer money that way, only that the common population-level claim is unsupported.",
		stableCore: [
			"Households commonly use transfers for food, housing, health, education, productive assets, debt, and other locally important needs.",
			"Results are similar across many conditional and unconditional programs despite differences in recipient, payment size, and setting.",
			"Self-report can understate stigmatized consumption, but household expenditure and experimental studies do not reveal the predicted systematic increase."
		],
		openQuestions: [
			"Do very large, long-duration, or crisis-time payments affect temptation-good use differently from the programs studied so far?",
			"How do transfers interact with local alcohol availability, mental health, gender dynamics, and targeted treatment services?"
		],
		whatWouldChangeMinds: [
			"Updated preregistered multi-program evidence showing a consistent increase in alcohol or tobacco purchases after transfers.",
			"Objective sales or biomarker data revealing substantial increases missed by existing expenditure and survey measures."
		],
		misconceptions: [
			"Anecdotes about one recipient do not estimate the average effect of a program.",
			"No average increase is not the same as no harmful use among any participant.",
			"Conditionality is not required to assume recipients can make purposeful spending choices."
		],
		editorSummary:
			"The 'cash will be wasted' prediction has been tested repeatedly and does not describe average recipient behavior. Debate should move to program goals, adequacy, design, and local services rather than stereotype.",
		uncertaintySummary:
			"The direction is stable across the reviewed programs, while measurement of stigmatized goods and generalization to every country, transfer size, and duration remain imperfect.",
		sources: [
			{
				kind: "meta_analysis",
				title: "Cash Transfers and Temptation Goods: A Review of Global Evidence",
				publisher: "The World Bank Research Observer",
				year: 2017,
				url: "https://doi.org/10.1093/wbro/lky005",
				doi: "10.1093/wbro/lky005",
				note: "Meta-analysis and review finding no systematic increase in alcohol or tobacco spending and often a small decrease."
			},
			{
				kind: "systematic_review",
				title: "Cash transfers and temptation goods: A review of global evidence",
				publisher: "Economic Development and Cultural Change",
				year: 2017,
				url: "https://doi.org/10.1086/689575",
				doi: "10.1086/689575",
				note: "Peer-reviewed synthesis explaining mechanisms, measurement concerns, and the consistency of null or negative effects."
			},
			{
				kind: "consensus_statement",
				title: "The State of Social Safety Nets 2018",
				publisher: "World Bank",
				year: 2018,
				url: "https://openknowledge.worldbank.org/handle/10986/29115",
				note: "Global institutional context on cash-transfer reach, design, evidence, and recurring misconceptions about recipient behavior."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Do unconditional cash transfers reduce poverty and improve well-being?",
		slug: "do-unconditional-cash-transfers-reduce-poverty-and-improve-well-being",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"Generally yes. Giving low-income households money without behavioral conditions improves income and food security and often improves assets, health-service use, schooling, or psychological well-being. Effects vary by amount, duration, delivery, prices, local services, and outcome, and short trials do not prove every permanent national program will pay for itself.",
		stableCore: [
			"Cash directly relaxes a household budget constraint while allowing recipients to choose among needs that programs cannot fully observe.",
			"Evidence does not show a general rise in spending on alcohol or tobacco, and labor effects are usually small or context-specific.",
			"Cash cannot create absent clinics, safe housing, schools, infrastructure, legal rights, or functioning markets, so services and institutions remain complements."
		],
		openQuestions: [
			"Which payment size, frequency, duration, and targeting approach produces the most durable gains for each policy objective?",
			"How do large-scale programs affect local prices, wages, migration, social relations, taxation, and political support over decades?"
		],
		whatWouldChangeMinds: [
			"Updated high-quality syntheses finding cash generally fails to improve income, food security, assets, or well-being among low-income recipients.",
			"Long-run population programs showing harms consistently exceed benefits after financing and market effects are included."
		],
		misconceptions: [
			"A positive average does not mean every recipient or every measured outcome improves.",
			"Evidence for transfers in low-income settings does not determine the exact design of a rich-country universal program.",
			"Cash and public services are not inherently substitutes."
		],
		editorSummary:
			"Unconditional cash is a well-supported poverty tool, not a complete social system. The mature question is which design works for which outcome and how it interacts with services, markets, and financing.",
		uncertaintySummary:
			"Near-term household benefits are supported across many trials, while long-run macroeconomic, fiscal, political, and general-equilibrium effects are less directly observed.",
		sources: [
			{
				kind: "systematic_review",
				title: "Unconditional cash transfers for reducing poverty and vulnerabilities: effect on use of health services and health outcomes in low- and middle-income countries",
				publisher: "Cochrane",
				year: 2022,
				url: "https://www.cochrane.org/evidence/CD011135_does-giving-money-people-low-and-middle-income-countries-without-conditions-attached-lead-better",
				note: "Systematic review of randomized and quasi-experimental evidence on health, food security, schooling, and economic outcomes."
			},
			{
				kind: "landmark_study",
				title: "The Short-Term Impact of Unconditional Cash Transfers to the Poor: Experimental Evidence from Kenya",
				publisher: "The Quarterly Journal of Economics",
				year: 2016,
				url: "https://doi.org/10.1093/qje/qjw025",
				doi: "10.1093/qje/qjw025",
				note: "Randomized study measuring consumption, assets, food security, psychological well-being, and temptation goods."
			},
			{
				kind: "meta_analysis",
				title: "The Impact of Cash Transfers on Subjective Well-Being and Mental Health in Low- and Middle-Income Countries",
				publisher: "Nature Human Behaviour",
				year: 2022,
				url: "https://doi.org/10.1038/s41562-021-01252-z",
				doi: "10.1038/s41562-021-01252-z",
				note: "Meta-analysis finding average improvements in subjective well-being and mental health with variation by design and follow-up."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Does immigration substantially lower wages and employment for native-born workers overall?",
		slug: "does-immigration-substantially-lower-wages-and-employment-for-native-born-workers-overall",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"Generally no. Immigration expands labor supply but also demand, investment, specialization, and business formation, so estimated average wage and employment effects on native-born workers are small over the long run. Particular earlier immigrants, similarly skilled workers, regions, or short adjustment periods can experience different effects.",
		stableCore: [
			"Immigrants are workers and consumers, and firms and capital adjust rather than holding the rest of the economy fixed.",
			"Skill complementarity can raise productivity and wages for some native-born workers while close substitutes face more competition.",
			"Fiscal effects vary strongly by age, education, legal status, generation, tax system, and level of government and are distinct from wage effects."
		],
		openQuestions: [
			"Which place-based, training, labor-standard, and integration policies best support workers and communities facing rapid local adjustment?",
			"How will aging populations, remote work, automation, housing constraints, and migrant selection change future effects?"
		],
		whatWouldChangeMinds: [
			"Broad longitudinal evidence finding large persistent wage or employment losses for native-born workers overall after demand and capital adjustment.",
			"Credible subgroup studies showing impacts now considered localized are instead common across skills, regions, and time."
		],
		misconceptions: [
			"A fixed number of jobs is not a good model of a growing economy.",
			"A small overall average can conceal meaningful effects for particular workers or towns.",
			"Economic evidence does not settle separate legal, humanitarian, cultural, or border-governance values."
		],
		editorSummary:
			"The aggregate labor-market story is modest, not zero or uniformly shared. Honest summaries pair small average native-born effects with subgroup, timing, housing, service, and distributional realities.",
		uncertaintySummary:
			"Natural experiments, structural models, and national studies differ in assumptions and subgroup estimates. Long-run averages are more stable than local short-run effects.",
		sources: [
			{
				kind: "consensus_statement",
				title: "The Economic and Fiscal Consequences of Immigration",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2017,
				url: "https://doi.org/10.17226/23550",
				doi: "10.17226/23550",
				note: "Independent U.S. assessment of wages, employment, growth, innovation, public finance, generations, and distribution."
			},
			{
				kind: "meta_analysis",
				title: "A Meta-Analytic Assessment of the Effect of Immigration on Wages",
				publisher: "Journal of Economic Surveys",
				year: 2005,
				url: "https://doi.org/10.1111/j.0950-0804.2005.00255.x",
				doi: "10.1111/j.0950-0804.2005.00255.x",
				note: "Meta-analysis finding small average wage effects and documenting how estimates vary with country, skill, and method."
			},
			{
				kind: "landmark_study",
				title: "The Effect of Immigration along the Distribution of Wages",
				publisher: "Review of Economic Studies",
				year: 2013,
				url: "https://doi.org/10.1093/restud/rds019",
				doi: "10.1093/restud/rds019",
				note: "Distributional analysis showing why average effects can coexist with different effects across workers, occupations, and wage levels."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Does international trade create broad gains while imposing concentrated local losses?",
		slug: "does-international-trade-create-broad-gains-while-imposing-concentrated-local-losses",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Trade can raise aggregate income and consumer purchasing power through specialization, scale, competition, and access to goods and inputs. Import competition and offshoring can also produce severe, persistent job and earnings losses in exposed industries and communities, while gains are spread broadly and adjustment support is often weak.",
		stableCore: [
			"Aggregate gains do not imply that every worker, region, firm, or country gains from every trade change.",
			"Local labor markets can adjust slowly because skills, housing, family, networks, health, and place-specific capital are not frictionless.",
			"Technology, macroeconomic policy, exchange rates, domestic institutions, and trade shocks often occur together, complicating attribution."
		],
		openQuestions: [
			"Which wage insurance, mobility, place-based investment, labor standards, and training policies deliver durable adjustment rather than temporary relief?",
			"How should resilience, security, carbon leakage, market power, and strategic supply chains be valued alongside efficiency?"
		],
		whatWouldChangeMinds: [
			"Comparable economy-wide evidence showing trade integration usually lowers total real income after all gains and losses are counted.",
			"Longitudinal local studies showing concentrated import shocks do not persistently affect employment, earnings, health, or public finance."
		],
		misconceptions: [
			"A positive national total does not compensate a displaced worker automatically.",
			"Documented local harm does not prove the country received no consumer, export, productivity, or input benefits.",
			"Trade agreements and trade itself are related but not identical objects of evaluation."
		],
		editorSummary:
			"The apparent contradiction disappears when distribution is visible: gains can be broad and diffuse while losses are deep and local. Policy failure often lies in pretending aggregate welfare performs the compensation.",
		uncertaintySummary:
			"The qualitative distribution is well supported. Magnitudes depend on the trade episode, counterfactual, market power, adjustment horizon, consumer measurement, and interacting technology and policy changes.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Making Trade an Engine of Growth for All: The Case for Trade and for Policies to Facilitate Adjustment",
				publisher: "International Monetary Fund, World Bank and World Trade Organization",
				year: 2017,
				url: "https://www.wto.org/english/res_e/booksp_e/wto_wbjointpublication_e.pdf",
				note: "Joint institutional synthesis of aggregate benefits, dislocation, distribution, and adjustment policy."
			},
			{
				kind: "systematic_review",
				title: "The China Shock: Learning from Labor-Market Adjustment to Large Changes in Trade",
				publisher: "Annual Review of Economics",
				year: 2016,
				url: "https://doi.org/10.1146/annurev-economics-080315-015041",
				doi: "10.1146/annurev-economics-080315-015041",
				note: "Review of geographically concentrated import exposure, slow adjustment, worker outcomes, and policy implications."
			},
			{
				kind: "landmark_study",
				title: "On the Persistence of the China Shock",
				publisher: "The Review of Economic Studies",
				year: 2023,
				url: "https://doi.org/10.1093/restud/rdac020",
				doi: "10.1093/restud/rdac020",
				note: "Long-run regional analysis documenting persistent employment and income adjustment in exposed U.S. labor markets."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Does the earned income tax credit reduce poverty and increase employment?",
		slug: "does-the-earned-income-tax-credit-reduce-poverty-and-increase-employment",
		consensusBand: "broad",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, particularly for single parents. The U.S. earned income tax credit raises after-tax income for low- and moderate-income workers, reduces poverty, and has increased employment on the decision to work. Effects on hours among people already working are smaller or mixed, and phaseouts can reduce incentives for some secondary earners.",
		stableCore: [
			"The credit is refundable and tied to earnings, with benefits rising, plateauing, and then phasing out according to family structure and income.",
			"Major expansions increased labor-force participation especially among single mothers, a group with large credit changes and clearer causal evidence.",
			"Payment timing, complexity, take-up, audit burden, employer wage capture, marriage interactions, and limited benefits for adults without children affect performance."
		],
		openQuestions: [
			"How should the credit be redesigned for workers without qualifying children, caregivers, secondary earners, and volatile gig income?",
			"Which payment frequency and filing supports reduce hardship without causing reconciliation debt or administrative burden?"
		],
		whatWouldChangeMinds: [
			"Administrative causal evidence showing expansions do not raise after-tax resources, reduce poverty, or increase employment among targeted groups.",
			"Long-run studies finding phaseout and employer responses consistently erase the documented participation and income gains."
		],
		misconceptions: [
			"Increasing entry into work does not mean every recipient increases weekly hours.",
			"A refundable tax credit can reduce poverty even when a household owes little federal income tax.",
			"Strong evidence for single mothers should not be copied mechanically to every household type."
		],
		editorSummary:
			"The EITC is among the better-supported U.S. antipoverty and work-support policies, with its clearest labor response at workforce entry. Design gaps and phaseout effects remain important rather than invalidating the core result.",
		uncertaintySummary:
			"Income and participation effects are strong for historically studied groups. Hours, wages, marriage, health, children, compliance, and newer recipient groups have more varied estimates.",
		sources: [
			{
				kind: "consensus_statement",
				title: "A Roadmap to Reducing Child Poverty",
				publisher: "National Academies of Sciences, Engineering, and Medicine",
				year: 2019,
				url: "https://doi.org/10.17226/25246",
				doi: "10.17226/25246",
				note: "Independent synthesis comparing poverty reduction, employment, cost, and family impacts of tax and transfer options."
			},
			{
				kind: "systematic_review",
				title: "The Effects of the Earned Income Tax Credit and Recent Reforms",
				publisher: "Tax Policy and the Economy",
				year: 2010,
				url: "https://doi.org/10.1086/649831",
				doi: "10.1086/649831",
				note: "Review of after-tax income, labor-supply responses, incidence, and distributional effects."
			},
			{
				kind: "landmark_study",
				title: "Effective Policy for Reducing Poverty and Inequality? The Earned Income Tax Credit and the Distribution of Income",
				publisher: "Journal of Human Resources",
				year: 2018,
				url: "https://doi.org/10.3368/jhr.53.4.1115-7494R1",
				doi: "10.3368/jhr.53.4.1115-7494R1",
				note: "Empirical assessment combining mechanical credit payments and behavioral employment responses across the income distribution."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Does paid parental leave improve parent and infant health?",
		slug: "does-paid-parental-leave-improve-parent-and-infant-health",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"Generally yes. Access to paid leave is associated with better maternal mental and physical health, more breastfeeding and preventive care, and lower infant hospitalization or mortality in many quasi-experimental studies. Effects vary with length, payment, job protection, eligibility, take-up, health systems, and which parent can use it.",
		stableCore: [
			"Paid time can support recovery, bonding, feeding, sleep, appointments, and household income during a medically and financially demanding period.",
			"Unpaid leave is not equivalent when low-income workers cannot afford to take it or lack job protection.",
			"Very long or poorly designed leave can affect career progression and employer behavior, while nontransferable partner leave can redistribute caregiving."
		],
		openQuestions: [
			"What combination of duration, replacement rate, job protection, and partner allocation maximizes health and equity while limiting career penalties?",
			"How do benefits differ for preterm infants, single parents, self-employed workers, and families without stable jobs?"
		],
		whatWouldChangeMinds: [
			"Updated quasi-experimental syntheses showing paid leave produces no parent or infant health benefit across policy designs.",
			"Evidence that apparent health gains are consistently driven by simultaneous healthcare, income, or labor-market reforms."
		],
		misconceptions: [
			"A positive average does not identify one universally optimal leave length.",
			"Offering leave on paper is not the same as equitable access and take-up.",
			"Health benefits do not settle every financing, small-employer, gender-equity, or career-design question."
		],
		editorSummary:
			"Paid parental leave is best understood as a health and income intervention whose design determines access and magnitude. The evidence supports benefits while leaving real economic and equity design choices.",
		uncertaintySummary:
			"Randomized national policies are rare, so evidence relies heavily on policy changes and natural experiments. Direction is favorable, but outcomes and external validity vary across systems.",
		sources: [
			{
				kind: "systematic_review",
				title: "The impact of paid family leave on parent and infant health outcomes: a systematic review of quasi-experimental research",
				publisher: "BMC Public Health",
				year: 2026,
				url: "https://doi.org/10.1186/s12889-026-27709-2",
				doi: "10.1186/s12889-026-27709-2",
				note: "Current systematic review focused on policy-based causal evidence for maternal, paternal, and infant health."
			},
			{
				kind: "systematic_review",
				title: "The Impact of Parental and Medical Leave Policies on Socioeconomic and Health Outcomes in OECD Countries",
				publisher: "Milbank Quarterly",
				year: 2018,
				url: "https://doi.org/10.1111/1468-0009.12340",
				doi: "10.1111/1468-0009.12340",
				note: "Systematic review of leave policies, maternal and child health, labor outcomes, and policy heterogeneity."
			},
			{
				kind: "landmark_study",
				title: "The impact of paid family leave in the United States on birth outcomes and mortality in the first year of life",
				publisher: "Health Services Research",
				year: 2020,
				url: "https://doi.org/10.1111/1475-6773.13288",
				doi: "10.1111/1475-6773.13288",
				note: "Quasi-experimental state-policy study of birth outcomes and infant mortality in the first year of life."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Does basic income make most recipients stop working?",
		slug: "does-basic-income-make-most-recipients-stop-working",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Basic-income and large unconditional-transfer trials do not show most recipients leaving work. Average employment or hours often change little or fall modestly, with variation by caregiver status, education, health, age, and program design. No trial fully reproduces a permanent tax-financed national universal basic income.",
		stableCore: [
			"Guaranteed income can reduce the need to accept any job immediately, while also financing search, education, care, health, transport, or entrepreneurship.",
			"Labor-force participation, hours, earnings, job quality, caregiving, and well-being are different outcomes and can move in different directions.",
			"Pilots usually have limited duration, partial population coverage, and external funding, so they cannot directly reveal full national tax, wage, price, and political effects."
		],
		openQuestions: [
			"How would a permanent program affect wages, prices, migration, family formation, tax behavior, bargaining power, and public services over decades?",
			"Which benefit level and financing system balances security, work incentives, administrative simplicity, distribution, and fiscal sustainability?"
		],
		whatWouldChangeMinds: [
			"Large, representative long-duration trials showing a majority of working-age recipients leave employment because of the payment.",
			"National implementation evidence revealing labor effects far outside the zero-to-modest range seen in existing programs."
		],
		misconceptions: [
			"A small decline in average hours is not most people quitting work.",
			"Temporary pilot behavior may differ from behavior under a permanent program with explicit taxes.",
			"Whether reduced paid work is harmful can depend on whether time shifts to caregiving, education, health, or involuntary unemployment."
		],
		editorSummary:
			"The apocalyptic labor-supply claim is not supported by trials, but the evidence also cannot certify every permanent national design. Report labor changes with their size, subgroup, duration, and financing boundary.",
		uncertaintySummary:
			"Existing experiments provide useful individual responses but limited general-equilibrium evidence. Program duration, benefit size, baseline safety net, taxes, and labor market produce heterogeneous results.",
		sources: [
			{
				kind: "systematic_review",
				title: "Is There Empirical Evidence on How the Implementation of a Universal Basic Income Affects Labour Supply? A Systematic Review",
				publisher: "Sustainability",
				year: 2020,
				url: "https://doi.org/10.3390/su12229459",
				doi: "10.3390/su12229459",
				note: "Systematic review finding no clear evidence of large general labor-supply withdrawal while emphasizing thin and heterogeneous evidence."
			},
			{
				kind: "landmark_study",
				title: "The Employment Effects of a Guaranteed Income: Experimental Evidence from Two U.S. States",
				publisher: "National Bureau of Economic Research",
				year: 2024,
				url: "https://www.nber.org/papers/w32719",
				note: "Large U.S. randomized trial estimating modest average reductions in employment and hours rather than mass withdrawal."
			},
			{
				kind: "landmark_study",
				title: "Basic Income and Labor Supply: Evidence from an RCT in Germany",
				publisher: "German Institute for Economic Research",
				year: 2025,
				url: "https://ideas.repec.org/p/diw/diwwpp/dp2123.html",
				note: "Three-year randomized trial measuring labor supply, job changes, education, time use, and well-being in a high-income welfare state."
			}
		]
	})
];
