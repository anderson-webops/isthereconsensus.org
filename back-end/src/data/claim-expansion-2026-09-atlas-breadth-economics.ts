import type { AtlasBreadthSourceTuple } from "./claim-expansion-2026-09-atlas-breadth-shared.js";
import type { SeedClaim } from "./claims.js";
import { september2026AtlasBreadthClaim as reviewedClaim } from "./claim-expansion-2026-09-atlas-breadth-shared.js";

const microcreditReview = [
	"meta_analysis",
	"Is microcredit a blessing for the poor? A meta-analysis examining development outcomes and contextual considerations",
	"Journal of Business Venturing",
	2015,
	"10.1016/j.jbusvent.2014.10.003",
	"Meta-analysis of 545 estimates from 90 studies finds average effects are modest rather than transformative and vary by outcome, program, borrower, and research design."
] as const satisfies AtlasBreadthSourceTuple;

const housingFirstReview = [
	"meta_analysis",
	"Effects of Housing First approaches on health and well-being of adults who are homeless or at risk of homelessness: systematic review and meta-analysis of randomised controlled trials",
	"Journal of Epidemiology and Community Health",
	2019,
	"10.1136/jech-2018-210981",
	"Review of randomized trials finds large improvements in housing stability, but less consistent or precise effects on health, substance use, and quality-of-life outcomes."
] as const satisfies AtlasBreadthSourceTuple;

const paidSickLeaveReview = [
	"systematic_review",
	"The Economics of Paid Sick Leave",
	"Journal of Economic Perspectives",
	2026,
	"10.1257/jep.20251479",
	"Current economics review synthesizes contagious-presenteeism, leave-taking, worker health and security, firm costs, labor-market effects, and policy-design tradeoffs."
] as const satisfies AtlasBreadthSourceTuple;

const childPovertyAssessment = [
	"consensus_statement",
	"A Roadmap to Reducing Child Poverty",
	"National Academies of Sciences, Engineering, and Medicine",
	2019,
	"10.17226/25246",
	"National Academies models evidence-backed benefit and work-policy packages, finding that refundable credits and allowances can materially reduce child poverty while costs and labor responses depend on design."
] as const satisfies AtlasBreadthSourceTuple;

const unemploymentInsuranceReview = [
	"systematic_review",
	"The Effects of Unemployment Insurance Benefits: New Evidence and Interpretation",
	"Annual Review of Economics",
	2016,
	"10.1146/annurev-economics-080614-115758",
	"Review synthesizes job-search duration, consumption smoothing, liquidity, job match, macroeconomic stabilization, and optimal-design evidence rather than reducing unemployment insurance to one labor-supply effect."
] as const satisfies AtlasBreadthSourceTuple;

const carbonPricingReview = [
	"systematic_review",
	"Does carbon pricing reduce emissions? A review of ex-post analyses",
	"Environmental Research Letters",
	2021,
	"10.1088/1748-9326/abdae9",
	"Review of implemented carbon-pricing systems finds emissions reductions in most ex-post studies, with magnitude varying by price, coverage, complementary policy, economy, and evaluation method."
] as const satisfies AtlasBreadthSourceTuple;

const congestionPricingReview = [
	"systematic_review",
	"Reducing Urban Road Transportation Externalities: Road Pricing in Theory and in Practice",
	"Review of Environmental Economics and Policy",
	2011,
	"10.1093/reep/req019",
	"Review of theory and implemented schemes finds congestion relief benefits, while distribution, public acceptance, transit alternatives, technology, and revenue use are central design issues."
] as const satisfies AtlasBreadthSourceTuple;

const inducedDemandReview = [
	"systematic_review",
	"A review of the evidence for induced travel and changes in transportation and environmental policy in the US and the UK",
	"Transportation Research Part D: Transport and Environment",
	2002,
	"10.1016/S1361-9209(01)00009-8",
	"Review finds strong evidence that added road capacity induces additional travel through route, time, mode, destination, trip, and longer-run land-use responses."
] as const satisfies AtlasBreadthSourceTuple;

const unionInequalityStudy = [
	"landmark_study",
	"Unions and Inequality over the Twentieth Century: New Evidence from Survey Data",
	"The Quarterly Journal of Economics",
	2021,
	"10.1093/qje/qjab012",
	"Long-run U.S. evidence links union membership with wage premiums and reduced wage inequality, especially through larger gains for lower-paid and less-educated workers."
] as const satisfies AtlasBreadthSourceTuple;

const childcareMetaAnalysis = [
	"meta_analysis",
	"Child Care Prices and Maternal Employment: A Meta-Analysis",
	"Journal of Economic Surveys",
	2018,
	"10.1111/joes.12192",
	"Meta-analysis of 36 studies finds maternal employment generally responds to child-care prices, while effect size varies and has declined in newer estimates and different labor-market contexts."
] as const satisfies AtlasBreadthSourceTuple;

export const september2026AtlasBreadthEconomicsClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Does microcredit reliably lift most borrowers out of poverty?",
		slug: "does-microcredit-reliably-lift-most-borrowers-out-of-poverty",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "high",
		bottomLine:
			"No. Expanding access to small loans can help some borrowers start or expand businesses, manage cash flow, or exercise more choice, but randomized evaluations and syntheses do not find transformative average reductions in poverty, consumption gains, or women's empowerment for most participants. Effects vary substantially with prior business ownership, borrower goals, product terms, market opportunities, repayment pressure, and available alternatives.",
		stableCore: [
			"Average take-up is often limited, so an offer of credit and the effect on actual borrowers are different estimands.",
			"Credit can finance productive investment, consumption smoothing, emergencies, or existing debt; those uses have different welfare implications.",
			"A modest average can conceal larger gains and losses for different borrowers without proving universal success or failure."
		],
		openQuestions: [
			"Which borrower characteristics, flexible repayment designs, savings products, grants, training, or market access produce durable gains?",
			"How should lenders and regulators measure over-indebtedness, coercive collection, business risk, household bargaining, and consumer welfare?"
		],
		whatWouldChangeMinds: [
			"A new generation of multi-site randomized and administrative evidence showing large persistent poverty gains for most eligible borrowers.",
			"Evidence that apparently modest averages are caused primarily by measurement windows or low take-up and become transformative under realistic scale."
		],
		misconceptions: [
			"Lack of transformative average poverty reduction does not mean no borrower benefits.",
			"High repayment rates do not by themselves establish profitable investment or improved welfare.",
			"Microcredit is not the same intervention as a cash grant, savings account, insurance, or full small-business service package."
		],
		editorSummary:
			"Microcredit is a useful financial tool for some households, not a reliable mass escape hatch from poverty. Product design and borrower circumstances determine who gains.",
		uncertaintySummary:
			"Modest non-transformative average effects are well supported for studied products. Long-run heterogeneity, digital credit, consumer protection, and better product bundles remain active questions.",
		sources: [
			microcreditReview,
			[
				"systematic_review",
				"Six Randomized Evaluations of Microcredit: Introduction and Further Steps",
				"American Economic Journal: Applied Economics",
				2015,
				"10.1257/app.20140287",
				"Cross-site synthesis of six randomized evaluations finds consistent modestly positive but non-transformative average effects and highlights take-up, power, and borrower heterogeneity."
			],
			[
				"meta_analysis",
				"Understanding the Average Impact of Microcredit Expansions: A Bayesian Hierarchical Analysis of Seven Randomized Experiments",
				"American Economic Journal: Applied Economics",
				2019,
				"10.1257/app.20170299",
				"Hierarchical reanalysis estimates small average household-business outcomes and finds much of the cross-site heterogeneity among households already operating businesses."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Does Housing First improve housing stability for people experiencing homelessness?",
		slug: "does-housing-first-improve-housing-stability-for-people-experiencing-homelessness",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Programs that offer rapid access to permanent housing without making sobriety or treatment completion a precondition generally improve housing stability compared with treatment-as-usual or staircase approaches, particularly for people with long-term homelessness and complex needs. Effects on health, substance use, employment, service use, and total public cost are more mixed and should not be assumed from housing retention alone.",
		stableCore: [
			"Housing First combines a housing offer with voluntary, person-centered support; it is not simply a key with no services.",
			"Housing stability is the most consistently improved outcome in randomized evidence.",
			"Local housing supply, rent levels, support fidelity, participant needs, and comparison services affect implementation and cost."
		],
		openQuestions: [
			"Which support intensity, housing model, and community services improve health, recovery, employment, and social connection after housing?",
			"How can programs scale in high-cost markets with severe housing shortages and serve groups underrepresented in trials?"
		],
		whatWouldChangeMinds: [
			"New randomized and quasi-experimental syntheses consistently finding no housing-retention advantage under faithful implementation.",
			"Evidence that serious harms or displacement systematically outweigh stable-housing gains across target populations."
		],
		misconceptions: [
			"Housing First does not require providers to ignore substance use, safety, or mental-health needs.",
			"Improved housing stability does not guarantee rapid recovery on every other outcome.",
			"Cost offsets vary and should not be promised as universal budget savings."
		],
		editorSummary:
			"Housing First reliably improves the outcome named in the model: stable housing. Its broader human and fiscal effects require continued services and local evaluation.",
		uncertaintySummary:
			"Housing stability evidence is strong. Health, substance-use, quality-of-life, service, cost, and subgroup outcomes are more variable.",
		sources: [
			housingFirstReview,
			[
				"systematic_review",
				"Accommodation-based interventions for individuals experiencing, or at risk of experiencing, homelessness",
				"Campbell Systematic Reviews",
				2021,
				"10.1002/cl2.1165",
				"Network meta-analysis compares accommodation models and finds stable housing combined with support improves housing outcomes relative to basic or conditional approaches."
			],
			[
				"systematic_review",
				"Housing First Impact on Costs and Associated Cost Offsets: A Review of the Literature",
				"The Canadian Journal of Psychiatry",
				2015,
				"10.1177/070674371506001103",
				"Cost review finds frequent offsets in crisis and institutional services but wide variation by participant need, program, costing perspective, and local system."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Can paid sick leave improve health access without causing large job losses?",
		slug: "can-paid-sick-leave-improve-health-access-without-causing-large-job-losses",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"Generally yes in the mandates studied. Access to paid sick leave is associated with more preventive and timely care, less working while contagious, and greater income security. Quasi-experimental and review evidence has not found large average employment losses from typical U.S. mandates, though employers incur direct costs and effects may differ by firm size, labor market, benefit generosity, enforcement, worker eligibility, and the outcome window.",
		stableCore: [
			"Without paid leave, workers may face a real choice between income or job security and staying home when ill.",
			"More legitimate absence can coexist with less presenteeism, workplace transmission, injury, turnover, or delayed care.",
			"Mandate effects depend on whether workers know, qualify for, accrue, can use, and are protected when taking leave."
		],
		openQuestions: [
			"What benefit design best balances access, replacement income, employer burden, verification, and return-to-work support?",
			"How do effects differ for small firms, gig workers, part-time workers, caregivers, and prolonged illness?"
		],
		whatWouldChangeMinds: [
			"High-quality multi-jurisdiction evidence finding typical paid-sick-leave access does not improve care, contagious presenteeism, or worker security.",
			"Robust causal evidence of large persistent job, hour, wage, or firm-exit losses across common policy designs."
		],
		misconceptions: [
			"More days recorded as absence do not by themselves prove a policy reduced productivity or welfare.",
			"An average labor-market result can conceal burdens on particular employers or workers.",
			"Short sick leave and long-term disability or medical leave are different programs."
		],
		editorSummary:
			"Paid sick leave addresses the health and income costs of contagious presenteeism. Evidence is more consistent with modest manageable business effects than mass job loss.",
		uncertaintySummary:
			"Health-access and presenteeism benefits are credible. Net productivity, firm-level burden, enforcement, and longer-term labor effects remain less precisely estimated.",
		sources: [
			paidSickLeaveReview,
			[
				"meta_analysis",
				"Paid Sick Leave and Healthcare Utilization in Adults: A Systematic Review and Meta-analysis",
				"American Journal of Preventive Medicine",
				2021,
				"10.1016/j.amepre.2021.01.009",
				"Synthesis finds greater use of primary and preventive healthcare among workers with paid sick leave, while noting high heterogeneity and mostly observational evidence."
			],
			[
				"systematic_review",
				"Is paid sick leave bad for business? A systematic review",
				"American Journal of Industrial Medicine",
				2023,
				"10.1002/ajim.23469",
				"Systematic review finds more favorable than unfavorable business associations and identifies substantial gaps in net productivity, profit, and causal evidence."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Do child benefits reduce child poverty without any labor-supply tradeoff?",
		slug: "do-child-benefits-reduce-child-poverty-without-any-labor-supply-tradeoff",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"Cash child benefits and refundable credits can substantially reduce measured child poverty when they reach families and are large enough. It is too broad to claim they never affect work. Income, eligibility, phase-in or phaseout, tax filing, benefit frequency, child-care access, and household structure can create different labor incentives. Studies find effects ranging from little detectable change to reduced work for some caregivers.",
		stableCore: [
			"A cash transfer mechanically raises disposable resources for recipients before behavioral responses are considered.",
			"Take-up gaps, exclusions, payment delays, debt offsets, and benefit cliffs can weaken intended poverty reduction.",
			"Poverty, material hardship, child development, parental time, earnings, and employment are different outcomes."
		],
		openQuestions: [
			"Which universal, targeted, refundable, and work-linked designs best support children while limiting exclusion and abrupt cliffs?",
			"What are long-term effects on health, schooling, family stability, caregiver work, and public budgets across groups?"
		],
		whatWouldChangeMinds: [
			"Representative causal evaluations showing substantial delivered child benefits do not reduce poverty or material hardship after net taxes and take-up are counted.",
			"Consistent evidence that labor responses are always zero, or always large, regardless of benefit design and labor-market context."
		],
		misconceptions: [
			"A modeled poverty reduction is not identical to an observed rollout with incomplete take-up.",
			"Any reduction in paid work is not automatically a social loss if caregiving and child outcomes change too.",
			"One country's universal allowance does not identify the effect of every tax credit."
		],
		editorSummary:
			"Child benefits are a direct and effective poverty lever, but good analysis includes delivery, incentives, caregiver time, and long-term child outcomes rather than assuming no tradeoffs.",
		uncertaintySummary:
			"Poverty reduction is well grounded. Labor supply, take-up, long-term returns, and the best mix of universal and targeted design vary.",
		sources: [
			childPovertyAssessment,
			[
				"landmark_study",
				"Effects of Child Tax Benefits on Poverty and Labor Supply: Evidence from the Canada Child Benefit and Universal Child Care Benefit",
				"Journal of Labor Economics",
				2023,
				"10.1086/721379",
				"Canadian policy evaluation separates poverty and labor-supply outcomes across two benefit reforms and illustrates how design and household group shape response."
			],
			[
				"landmark_study",
				"Labor supply effects of a universal cash transfer",
				"Journal of Public Economics",
				2024,
				"10.1016/j.jpubeco.2024.105248",
				"Polish child-benefit study finds increased consumption and savings alongside larger medium-term labor responses among lower-socioeconomic-status households."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Does unemployment insurance only delay people's return to work?",
		slug: "does-unemployment-insurance-only-delay-peoples-return-to-work",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"No. More generous or longer benefits modestly lengthen unemployment spells on average, especially near benefit exhaustion, but that is only one effect. Insurance stabilizes consumption after job loss, prevents hardship, supports aggregate demand during downturns, and may allow better job search or matching. Net value depends on replacement rate, duration, eligibility, labor demand, liquidity, administration, and reemployment support.",
		stableCore: [
			"Observed duration effects combine reduced search urgency, greater financial ability to search, reporting rules, and hiring conditions.",
			"Liquidity-constrained households reduce consumption when benefits are weak or expire.",
			"The socially appropriate benefit can differ in a recession with few vacancies from a tight labor market."
		],
		openQuestions: [
			"How should benefits respond automatically to labor-market conditions while avoiding administrative delay and coverage gaps?",
			"Which combinations of replacement, duration, partial benefits, training, and job-search support improve welfare and match quality?"
		],
		whatWouldChangeMinds: [
			"Causal evidence showing benefits provide no consumption, hardship, macroeconomic, or job-search value beyond delaying work.",
			"Evidence that carefully designed benefit changes never alter unemployment duration in any labor-market setting."
		],
		misconceptions: [
			"A longer measured spell does not reveal whether the worker had enough vacancies or found a better match.",
			"A small average duration response does not imply unlimited benefits have no incentive cost.",
			"Fraud, administrative error, and lawful insurance use are different categories."
		],
		editorSummary:
			"Unemployment insurance creates a real search-duration tradeoff while insuring consumption and stabilizing downturns. Evaluating only time to reemployment misses most of the policy.",
		uncertaintySummary:
			"Consumption smoothing and modest average duration effects are well supported. Match quality, macro effects, and optimal state-contingent design are less settled.",
		sources: [
			unemploymentInsuranceReview,
			[
				"meta_analysis",
				"Disemployment Effects of Unemployment Insurance: A Meta-analysis",
				"American Economic Review: Insights",
				2026,
				"10.1257/aeri.20240441",
				"Meta-analysis quantifies variation in reemployment responses across benefit changes, study designs, time periods, and labor-market conditions."
			],
			[
				"landmark_study",
				"Reexamining the consumption smoothing benefits of Unemployment Insurance",
				"Journal of Public Economics",
				2015,
				"10.1016/j.jpubeco.2015.09.008",
				"Household evidence identifies substantial consumption declines at benefit exhaustion and shows why liquidity belongs in welfare analysis."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Does putting a price on carbon reduce greenhouse-gas emissions?",
		slug: "does-putting-a-price-on-carbon-reduce-greenhouse-gas-emissions",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, implemented carbon taxes and emissions-trading systems generally reduce covered emissions relative to credible counterfactuals, though observed effects vary. A low price with narrow coverage and loopholes does less than a durable, rising, enforceable signal. Distribution, industrial competitiveness, innovation, revenue use, complementary standards, electricity markets, and political stability determine overall effectiveness and fairness.",
		stableCore: [
			"A carbon price changes the relative cost of emissions-intensive choices but does not remove every market, infrastructure, information, or behavior barrier.",
			"Tax and cap-and-trade designs differ in price certainty, quantity certainty, allowance allocation, volatility, and administration.",
			"Rebates or public investment can make household distribution more progressive even when the price alone is regressive."
		],
		openQuestions: [
			"Which combinations of pricing, standards, investment, innovation, trade policy, and removals achieve rapid durable cuts at acceptable cost?",
			"How should systems address imported emissions, carbon leakage, volatile energy prices, and hard-to-measure sectors?"
		],
		whatWouldChangeMinds: [
			"A larger body of credible ex-post studies finding meaningful carbon prices do not reduce covered emissions after other policies and trends are controlled.",
			"Evidence that non-price measures consistently achieve the same cuts at lower total social cost in all major sectors."
		],
		misconceptions: [
			"Finding a modest historical effect does not prove an ambitious future price is ineffective.",
			"A carbon price is not necessarily a new net tax if revenue is returned or other taxes change.",
			"Pricing alone is not the only policy supported by climate-economics evidence."
		],
		editorSummary:
			"Carbon pricing works as an emissions signal, but price level, coverage, durability, complementary infrastructure, and revenue design decide how much and for whom.",
		uncertaintySummary:
			"Direction of average emissions impact is well supported. Magnitude, innovation, leakage, distribution, and optimal policy combinations vary.",
		sources: [
			carbonPricingReview,
			[
				"meta_analysis",
				"Distributional Impacts of Carbon Pricing: A Meta-Analysis",
				"Environmental and Resource Economics",
				2021,
				"10.1007/s10640-020-00521-1",
				"Meta-analysis shows incidence varies with policy, household, region, metric, and revenue recycling, so an unqualified fairness verdict is misleading."
			],
			[
				"consensus_statement",
				"Climate Change 2022: Mitigation of Climate Change, Chapter 13: National and Sub-national Policies and Institutions",
				"Intergovernmental Panel on Climate Change",
				2022,
				"10.1017/9781009157926.015",
				"IPCC assesses carbon pricing within broader policy packages, institutions, distribution, political economy, innovation, and implementation evidence."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Can congestion pricing reduce urban traffic without creating equity concerns?",
		slug: "can-congestion-pricing-reduce-urban-traffic-without-creating-equity-concerns",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"Congestion charges can reduce vehicle entries, delays, and some pollution in crowded zones, but equity concerns do not disappear automatically. Who pays and benefits depends on driving patterns, income, disability, work schedules, transit access, geography, exemptions, and how revenue is used. A charge can be regressive, progressive, or mixed under different designs, so distribution should be measured rather than inferred from the policy label.",
		stableCore: [
			"Peak road space is scarce, and a time- or location-specific charge can reduce demand and improve travel speed.",
			"Travel-time gains benefit remaining road users, while better transit or rebates can broaden benefits beyond drivers.",
			"Boundary traffic, rerouting, enforcement, privacy, commercial deliveries, and neighborhood exposure require monitoring."
		],
		openQuestions: [
			"Which credits, exemptions, revenue investments, and geographic designs best protect people with few alternatives?",
			"How durable are traffic, air-quality, safety, land-use, and public-acceptance effects as travelers and businesses adapt?"
		],
		whatWouldChangeMinds: [
			"Implemented-zone evaluations consistently showing no reduction in congestion or vehicle demand relative to credible controls.",
			"Distributional evidence showing revenue and access design cannot mitigate substantial harms to constrained low-income travelers."
		],
		misconceptions: [
			"Car ownership and peak-zone driving are not distributed evenly by income.",
			"A faster trip for drivers does not by itself establish a fair policy.",
			"A cordon charge, distance charge, dynamic toll, parking price, and fuel tax have different effects."
		],
		editorSummary:
			"Congestion pricing is effective demand management, not an equity-free instrument. Revenue and access design are part of the policy, not afterthoughts.",
		uncertaintySummary:
			"Traffic reduction is well supported in implemented systems. Distribution, spillovers, political durability, and transferability depend heavily on local design.",
		sources: [
			congestionPricingReview,
			[
				"systematic_review",
				"The effects of road pricing on transportation and health equity: a scoping review",
				"Transport Reviews",
				2021,
				"10.1080/01441647.2021.1898488",
				"Scoping review maps distributional pathways and finds that equity conclusions depend on population, mobility, exposure, accessibility, and revenue design."
			],
			[
				"landmark_study",
				"A cost-benefit analysis of the Stockholm congestion charging system",
				"Transportation Research Part A: Policy and Practice",
				2009,
				"10.1016/j.tra.2008.11.014",
				"Ex-post Stockholm analysis quantifies traffic, travel-time, revenue, operating, environmental, and adaptation effects in an implemented system."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Does adding highway lanes permanently eliminate traffic congestion?",
		slug: "does-adding-highway-lanes-permanently-eliminate-traffic-congestion",
		consensusBand: "broad",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"Usually not on congested urban networks. Added lanes can relieve a bottleneck and improve access initially, but lower travel time encourages route changes, peak-time shifts, additional trips, longer travel, development, and relocation. This induced demand often consumes a substantial share of new capacity over time. That does not make every road project useless; safety, freight, connectivity, resilience, and a specific bottleneck may still justify investment.",
		stableCore: [
			"Travel demand responds to the generalized cost of driving, including time, reliability, fuel, tolls, and parking.",
			"Short-run responses include routes, times, modes, and trip frequency; land use and location choices add longer-run response.",
			"Vehicle-kilometers traveled, travel speed, accessibility, total delay, emissions, and welfare are distinct project outcomes."
		],
		openQuestions: [
			"Which network designs, pricing, land-use rules, transit, walking, cycling, and demand management best preserve accessibility gains?",
			"How do induced travel, construction emissions, safety, freight, neighborhood exposure, and development vary across project types and regions?"
		],
		whatWouldChangeMinds: [
			"Long-term causal studies consistently showing major urban capacity expansions preserve free-flow travel without proportional traffic growth or displacement.",
			"Evidence that route, time, mode, trip, and land-use responses are too small to affect congestion forecasts."
		],
		misconceptions: [
			"Induced demand does not mean every new trip is socially worthless; some reflects valuable access people previously could not use.",
			"A lane can solve a local merge or safety problem without permanently reducing region-wide congestion.",
			"Removing a bottleneck may shift delay downstream if the rest of the network remains constrained."
		],
		editorSummary:
			"Road capacity can move a bottleneck and unlock access, but it rarely freezes travel demand. Lasting congestion plans account for how people and land use respond.",
		uncertaintySummary:
			"Induced travel is well supported. Its size, speed, welfare value, and relevance to a particular project depend on network, pricing, land use, and alternatives.",
		sources: [
			inducedDemandReview,
			[
				"landmark_study",
				"The Fundamental Law of Road Congestion: Evidence from US Cities",
				"American Economic Review",
				2011,
				"10.1257/aer.101.6.2616",
				"U.S. city analysis finds vehicle-kilometers traveled rises approximately proportionally with interstate lane-kilometers and investigates route, commercial, and migration mechanisms."
			],
			[
				"systematic_review",
				"Latest evidence on induced travel demand: an evidence review",
				"United Kingdom Department for Transport",
				2018,
				"https://www.gov.uk/government/publications/induced-travel-demand-an-evidence-review",
				"Government evidence review assesses the existence, scale, timing, settings, and appraisal implications of traffic generated after road-capacity improvements."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Do labor unions raise members' wages and reduce wage inequality without tradeoffs?",
		slug: "do-labor-unions-raise-members-wages-and-reduce-wage-inequality-without-tradeoffs",
		consensusBand: "broad",
		confidenceScore: 91,
		evidenceCertainty: "moderate",
		bottomLine:
			"Unions generally raise pay and benefits for covered workers and compress wage differences, especially toward the lower and middle parts of the wage distribution. It is too strong to say there are no tradeoffs. Effects on hiring, investment, productivity, profits, firm survival, flexibility, nonunion workers, and total employment vary by bargaining structure, labor market, industry, management relations, law, and economic conditions.",
		stableCore: [
			"A union wage premium combines bargaining power, workplace selection, job composition, contracts, and spillovers, so causal estimation is difficult.",
			"Unions may raise productivity through voice, retention, training, and coordination or reduce it through restrictive practices and conflict.",
			"Sectoral bargaining and enterprise bargaining distribute bargaining power and adjustment costs differently."
		],
		openQuestions: [
			"Which institutions preserve worker voice and wage compression while supporting entry, innovation, investment, and adaptation?",
			"How do contemporary unions affect contractors, gig workers, monopsonistic labor markets, automation, and nonunion wage norms?"
		],
		whatWouldChangeMinds: [
			"Modern matched and quasi-experimental evidence consistently finding no compensation or wage-compression effect for covered workers.",
			"Cross-setting evidence establishing one invariant direction and magnitude for productivity, employment, and investment effects."
		],
		misconceptions: [
			"Higher wages for union members do not prove every worker or firm is better off.",
			"A negative firm-level profit effect is not identical to a negative social-welfare or productivity effect.",
			"Results from one country's legal and bargaining system may not transfer to another."
		],
		editorSummary:
			"Unions reliably shift compensation and wage distribution toward covered workers. Their wider economic effects depend on how bargaining power is organized and used.",
		uncertaintySummary:
			"Wage premiums and compression are well supported. Causal productivity, investment, employment, and spillover effects are more heterogeneous.",
		sources: [
			unionInequalityStudy,
			[
				"meta_analysis",
				"A Meta-Analysis of the Union-Nonunion Wage Gap",
				"Industrial and Labor Relations Review",
				1990,
				"10.1177/001979399004400104",
				"Meta-regression across 114 studies confirms a union wage premium while showing that estimates depend on period, data, outcome, and specification."
			],
			[
				"meta_analysis",
				"What Do Unions Do to Productivity? A Meta-Analysis",
				"Industrial Relations",
				2003,
				"10.1111/1468-232X.00310",
				"Meta-analysis finds substantial specification and country heterogeneity, including differing average productivity associations in U.S. and U.K. evidence."
			]
		]
	}),
	reviewedClaim({
		topicSlug: "economics-and-social-policy",
		title: "Do child-care subsidies always cause large increases in maternal employment?",
		slug: "do-child-care-subsidies-always-cause-large-increases-in-maternal-employment",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. Lower child-care prices generally increase mothers' employment on average, but estimated responses vary from substantial to near zero. Effects are larger where care costs constrain work and smaller where employment is already high or low, informal care is readily available, or subsidies mainly replace existing arrangements. Supply, quality, hours, location, eligibility, taxes, wages, partner income, and child age all matter.",
		stableCore: [
			"A subsidy can increase formal-care use without creating an equal increase in total parental employment.",
			"Expanding demand without enough workers and places can raise prices, reduce quality, or create waiting lists.",
			"Employment, child development, affordability, provider pay, and family choice are distinct policy outcomes."
		],
		openQuestions: [
			"Which supply investments, provider compensation, quality rules, schedules, and subsidy structures best serve children and working families?",
			"How do effects differ for single parents, shift workers, rural families, infants, disabled children, and informal caregivers?"
		],
		whatWouldChangeMinds: [
			"A broad updated causal literature finding maternal employment never responds to child-care prices or availability in constrained populations.",
			"Evidence that large subsidies always generate the same employment response regardless of baseline care, supply, and labor market."
		],
		misconceptions: [
			"More subsidized enrollment does not necessarily mean an equal number of new jobs held by parents.",
			"A near-zero effect in one universal expansion does not prove care costs never constrain anyone.",
			"Maximizing parental employment and maximizing child-development quality may require overlapping but additional investments."
		],
		editorSummary:
			"Affordable child care often supports maternal employment, but response size comes from the actual family constraint, available supply, and labor-market opportunity.",
		uncertaintySummary:
			"Average price responsiveness is supported. Magnitude, crowd-out, supply, quality, distribution, and effects of specific policy designs vary widely.",
		sources: [
			childcareMetaAnalysis,
			[
				"landmark_study",
				"Money for nothing? Universal child care and maternal employment",
				"Journal of Public Economics",
				2011,
				"10.1016/j.jpubeco.2011.05.016",
				"Norwegian rollout study finds little maternal-employment increase because subsidized places largely displaced informal care in that setting."
			],
			[
				"landmark_study",
				"Subsidized child care, maternal employment and access to quality, affordable child care",
				"Early Childhood Research Quarterly",
				2013,
				"10.1016/j.ecresq.2013.07.008",
				"Family survey evidence illustrates how subsidy receipt, affordability, quality, program type, and waiting-list status interact in access outcomes."
			]
		]
	})
];
