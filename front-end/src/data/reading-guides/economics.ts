import type { ReadingGuideContent } from "./types";

export const economicsGuide: ReadingGuideContent = {
	takeaway:
		"Identify the measured object, population, units, denominator, price treatment and period before interpreting an economic headline.",
	scope: "Original technical references were checked; independent expert review has not been completed. This is measurement literacy, not a numerical economist vote, current country-performance assessment, causal policy audit or financial advice. All numerical illustrations are independently constructed and hypothetical. Related BLS, BEA and World Bank sources share provenance rather than represent independent trials. Historical tables, prototype program plans and the Federal Reserve essay's historical charts are not current observations. Private household records, investment decisions, contracts and benefit eligibility are not evaluated.",
	sections: [
		{
			id: "prices-and-rates",
			title: "Slower price growth is not a return to old prices",
			paragraphs: [
				{
					text: "Start by separating the level from its rate of change. A positive inflation rate can get smaller while the measured price level keeps rising. An independently invented index moving from 100 to 106 and then 109.18 has successive equal-period increases of six and three percent. The second increase is slower, not a reversal of the first. Disinflation names that slowdown; deflation concerns a falling level. The example is not a country's recent experience and does not imply all products move together. Keep the actual comparison endpoints beside the percentage. A latest monthly decline can coexist with a positive twelve-month change because those rates look across different intervals.",
					sources: ["disinflation", "cpi"]
				},
				{
					text: "A shopper notices particular products and transactions, while a broad index summarizes a defined collection. Some prices can fall while the aggregate rises, and a grocery expense can remain high even when its growth slows. Neither observation alone audits the whole series. Ask whether the claim concerns one item, an average basket or a cumulative change since a named date. Do not assume that a rate returning to an earlier value restores an earlier price level. Conversely, do not infer that a particular falling price rules out aggregate inflation. The Federal Reserve educational explanation supports the conceptual distinction; its historical charts and institutional attribution are not imported as current performance evidence.",
					sources: ["disinflation", "personal"]
				}
			]
		},
		{
			id: "baskets-and-housing",
			title: "A consumption basket is not every household's whole budget",
			paragraphs: [
				{
					text: "Household weights matter even when the item-price changes are identical. Suppose an invented fixed basket has one price rising ten percent and another unchanged. Assigning half the original spending to each gives a five-percent increase; assigning a fifth to the rising item gives two percent. These are transparent counterexamples, not the CPI production estimator or actual national weights. Real spending also changes with quantities, quality, new obligations and substitutions. A household buying less can hold spending steady while prices rise. One buying more can spend more without the same proportional inflation. The official population average and an individual's legitimate experience therefore need not agree exactly, and neither is automatically fictional because they differ.",
					sources: ["personal", "cpi"]
				},
				{
					text: "Housing makes the measured object especially important. A dwelling is an asset that supplies shelter services over time. The U.S. CPI uses rent and rental equivalence for the shelter-service question, not each buyer's complete purchase and financing budget. Owners' equivalent rent is not the owner's actual mortgage installment. This does not mean housing is absent or that home-sale prices are irrelevant to affordability. A prospective buyer, an existing owner and a renter can face different conditions. Identify which series is being discussed instead of replacing a service index with an asset-price chart and claiming they measure the same thing. This guide does not advise anyone to buy, borrow, invest or resolve a tenancy dispute.",
					sources: ["shelter", "cpi"]
				}
			]
		},
		{
			id: "reference-and-real-pay",
			title: "A changed ruler is not a changed economy",
			paragraphs: [
				{
					text: "Reference values put index movements on a display scale. An invented series rising from 200 to 210 can be divided throughout by two and shown as 100 to 105. The index-point change differs, but the percentage change is five in either representation. Matching a reference base does not make unrelated baskets comparable, and separate local CPI indexes cannot simply rank absolute living costs between cities. Each can start at 100 despite different initial prices. An expenditure weight reference and an index display reference also serve different roles. Read the series legend rather than interpreting a taller line or a larger index-point increase as a greater economic change without checking its ruler.",
					sources: ["cpi", "income"]
				},
				{
					text: "For real pay, match the pay concept to the price adjustment and interval. In an invented example, a five-percent nominal increase divided by a six-percent price increase gives a growth factor of 1.05 over 1.06, approximately 0.9906. Real pay decreases about 0.94 percent. Subtracting the rates is a nearby approximation, not the exact ratio. Hourly wages, annual earnings and disposable household resources answer different questions. Working more hours can raise income without raising real hourly pay. An average earnings series can also move when workforce composition changes. A price-adjusted measure remains informative but does not certify exact personal welfare, adequate compensation, legal entitlements or the value of an investment.",
					sources: ["income", "personal"]
				}
			]
		},
		{
			id: "periods-and-processing",
			title: "Match periods, processing and vintages before comparing rates",
			paragraphs: [
				{
					text: "Seasonal adjustment estimates recurring patterns so short-period changes can be interpreted apart from those patterns. It does not remove every surprise, cause or measurement error. The unadjusted series retains the patterns and has its own appropriate uses. Different changes in the two versions need not conflict. Read whether a figure is adjusted, which items and geography it covers and when its factors were produced. Some series lack adjusted counterparts; that does not prove seasonal behavior is absent. Factors can change as data accumulate. The BLS documentation's specific historical interruption procedures are not universal rules. This guide supplies a comparison checklist, not instructions to alter a contract or proof that every adjustment is accurate.",
					sources: ["seasonal", "cpi"]
				},
				{
					text: "Data vintage is another dimension, not merely a footnote. Benchmark information and additional observations can change estimates without making every earlier release dishonest or every newer one perfect. Keep the release date, coverage, units and uncertainty alongside the comparison. A change between vintages should not silently be presented as a change between calendar periods. BLS's employment comparison describes sampling, population and benchmark differences; BEA's conventions distinguish several update stages. Their explanations are not a completed audit of any current release. When a discrepancy matters, trace the exact series and processing documentation rather than use either the word revised or the agency name as a universal verdict about integrity.",
					sources: ["surveys", "gdp"]
				}
			]
		},
		{
			id: "labor-force-ratios",
			title: "The unemployment denominator is a defined labor force",
			paragraphs: [
				{
					text: "The U.S. headline unemployment rate does not divide everyone lacking employment by all residents. Use an invented covered population of 100 people, with 54 employed, six unemployed under the defined rules and forty outside the labor force. Its unemployment rate is six divided by sixty, or ten percent, not forty-six percent. Employment and participation supply different views of that population. Unemployment generally involves availability and active search, but specified temporary-layoff exceptions mean a blanket recent-search requirement is inaccurate. Benefit receipt is a different administrative question. A statistic with a deliberate denominator can be useful without being an exhaustive description of every person's work needs or a census of all residents.",
					sources: ["cps", "cps-faq"]
				},
				{
					text: "A falling ratio does not uniquely identify people finding jobs. Keep the same invented population and employed count, but let two unemployed people leave the labor force. Four unemployed divided by 58 is about 6.90 percent, lower than ten, without new employment in this scenario. Actual declines can of course include employment growth; the counterexample rejects an unconditional inference, not the relevance of the rate. Participation exits need not all reflect discouragement. Wider measures also have defined rules. U-6 adds marginally attached people to its denominator and includes qualifying economic part-time workers in its numerator. It is not simply U-3 with extra people divided by the identical labor force, nor everyone's preference for a better job.",
					sources: ["cps", "cps-faq"]
				}
			]
		},
		{
			id: "jobs-and-surveys",
			title: "A position is not the same unit as a person",
			paragraphs: [
				{
					text: "A worker holding two covered payroll positions contributes two jobs to that concept and one employed person to a household concept. Taking a second job can increase positions without increasing employed persons. Scope also differs: qualifying self-employment can appear in household employment without a corresponding nonfarm payroll position. The reference week, pay period and absence rules matter. These are conceptual examples, not a reconstruction of an employment release or an estimate of multiple jobholding. Label the unit before interpreting how many new people entered work. A headline about jobs can describe a valid positions series while answering a different question from a headline about people employed.",
					sources: ["surveys", "cps"]
				},
				{
					text: "Apparently conflicting surveys require more than a unit correction. Their covered categories, sampling, timing, population controls and updates differ too. A research bridge that removes some scope differences need not harmonize every feature. BLS describes uncertainty and benchmark processes, not an assurance that every discrepancy has one known cause. A short-run divergence alone therefore proves neither fraud nor complete accuracy. Reconcile concepts and intervals, then examine the persistence, magnitude and uncertainty of the actual difference. If someone attributes the gap to a named mechanism, ask whether evidence shows that mechanism accounts for its size. A possible explanation and a demonstrated explanation are different levels of support.",
					sources: ["surveys", "cps-faq"]
				}
			]
		},
		{
			id: "national-output",
			title: "Domestic output is neither every sale nor every currency increase",
			paragraphs: [
				{
					text: "GDP's production boundary differs from a sum of all receipts. In an invented closed three-stage chain, a raw input sells for four, a processed intermediate for seven and the final product for twelve. Gross sales total 23, but value added totals four plus three plus five, or twelve. The example excludes other inputs, taxes and inventories to expose repeated counting. Intermediate does not mean unimportant; the value is already carried into later production. Gross output is another legitimate measure with another purpose. Likewise, ten identical units valued at eight each and later ten each create nominal growth without quantity growth. Real output needs documented price and quantity aggregation, not automatic deflation by CPI.",
					sources: ["value", "primer", "gdp"]
				},
				{
					text: "Imports are subtracted because spending components include purchased content regardless of origin. An invented final purchase of 100 containing eighty of foreign production and twenty of domestic distribution cannot all count as domestic production. Subtracting eighty leaves twenty; it does not demonstrate that importing destroyed eighty of existing domestic output. Real timing and valuation are more complex. The causal consequences of trade require separate evidence about substitution, costs, demand and other adjustments. A descriptive net-export contribution is not automatically a feasible policy counterfactual. Conversely, understanding the identity does not establish that trade never harms particular producers. Accounting and causal questions belong beside one another, not silently in place of one another.",
					sources: ["primer", "gdp"]
				}
			]
		},
		{
			id: "annual-and-chain",
			title: "Annualized growth and chained dollars need their own arithmetic",
			paragraphs: [
				{
					text: "An invented real-output index increasing from 100 to 101 in a quarter grows one percent over that quarter. Compounding 1.01 four times gives about 4.0604 percent at an annualized rate. That is what continuation at the same pace would imply, not an observed full year or a forecast. Dividing an annualized percentage by four is only an approximation; the exact inverse uses a fourth root. A seasonally adjusted annual-rate output level, a year-over-year quarter comparison and annual-average growth are different conventions. BEA's older FAQ contains an inconsistent introductory rounded example; the explicit formula, its exceptions and independent arithmetic are used here instead. Read which annual convention the chart actually states.",
					sources: ["annual", "gdp"]
				},
				{
					text: "Chained-dollar components generally cannot be added outside the reference period as though they were ordinary current-price receipts. A hypothetical one-link Fisher index with changing relative prices gives an aggregate reference-dollar value near 22.36 while its separately scaled components sum to 25. The review supplies the complete invented prices and quantities; the mismatch is not country data or a missing industry. BEA provides contribution measures for real-growth attribution. Current-dollar shares and the reference-period reconciliation remain distinct cases, so neither always add nor never add is a sufficient rule. Check the intended aggregation before interpreting a residual, a pie chart or a component's chained-dollar change as a share of aggregate real growth.",
					sources: ["chain", "gdp", "primer"]
				}
			]
		},
		{
			id: "welfare-and-conversion",
			title: "Per-person output and international dollars are not personal certificates",
			paragraphs: [
				{
					text: "GDP per capita scales measured domestic output by population. It does not create a median paycheck, disposable household income or complete welfare score. Distribution and the income recipients matter, while nonmarket activities and other dimensions of living conditions can remain outside the aggregate. This does not make GDP useless or unrelated to material circumstances. It limits which conclusion follows from that one quantity. BEA's well-being background and World Bank methodology support a multi-measure reading; historical prototype plans are not asserted as current program achievements. Ask which income concept or distributional evidence supports a statement about typical residents rather than treating every increase in output per person as a universal personal benefit.",
					sources: ["welfare", "ppp-method", "primer"]
				},
				{
					text: "PPP conversion adds another purpose-specific boundary. The ICP combines prices, expenditure weights and comparable accounts to compare output volumes across economies. Its coverage includes nontraded services, not only internationally purchased products. The resulting international-dollar values are not cash balances or forecasts of market exchange rates. The World Bank explicitly rejects interpreting ICP PPPs as the correct equilibrium currency rate or a misvaluation signal. Actual financial flows require an appropriate transaction-rate comparison. This does not settle separate long-run exchange-rate theories, which need their own assumptions and evidence. Keep the measured bundle, reference period and use visible before turning a conversion factor into a travel budget, trade conclusion or investment recommendation.",
					sources: ["ppp", "ppp-method"]
				}
			]
		}
	],
	questions: [
		"What object, population and unit does the number describe?",
		"Do baskets, denominators, price treatment, processing and periods match?",
		"Is the claim descriptive accounting, a causal explanation or a forecast?",
		"Which household, distributional or uncertainty evidence is still missing?",
		"Does the source revision change the definition or only the data vintage?"
	],
	sources: [
		{
			id: "cpi",
			title: "BLS: Consumer Price Index frequently asked questions",
			url: "https://www.bls.gov/cpi/questions-and-answers.htm",
			kind: "Price-index definitions",
			note: "Original reference, population and coverage checked; no historical counts or complete household welfare guarantee."
		},
		{
			id: "personal",
			title: "BLS: Published averages and individual inflation experiences",
			url: "https://www.bls.gov/cpi/factsheets/averages-and-individual-experiences-differ.htm",
			kind: "Expenditure-weight explanation",
			note: "Original average-versus-individual distinction checked; historical 2001 weights excluded."
		},
		{
			id: "shelter",
			title: "BLS: Rent and rental equivalence",
			url: "https://www.bls.gov/cpi/factsheets/owners-equivalent-rent-and-rent.htm",
			kind: "Shelter measurement",
			note: "Original service-versus-investment boundary checked; not individual mortgage payments or property advice."
		},
		{
			id: "income",
			title: "BLS: Income and the Consumer Price Index",
			url: "https://www.bls.gov/cpi/factsheets/income.htm",
			kind: "Real-income ratio",
			note: "September 2026 update observed; exact-standard-of-living wording and historical numerical table are not adopted."
		},
		{
			id: "seasonal",
			title: "BLS: CPI seasonal adjustment questions and answers",
			url: "https://www.bls.gov/cpi/seasonal-adjustment/questions-and-answers.htm",
			kind: "Processing methodology",
			note: "Original adjustment and use limits checked; no universal factor, historical interruption rule or contract instruction."
		},
		{
			id: "cps",
			title: "BLS: CPS concepts and definitions",
			url: "https://www.bls.gov/cps/definitions.htm",
			kind: "Labor classifications and denominators",
			note: "Original unemployment, layoff exception and U-3/U-6 scope checked; not benefit eligibility."
		},
		{
			id: "cps-faq",
			title: "BLS: Current Population Survey frequently asked questions",
			url: "https://www.bls.gov/cps/faq.htm",
			kind: "Labor-survey explanation",
			note: "Original classification and broader work-needs distinctions checked; no current rates or individual records."
		},
		{
			id: "surveys",
			title: "BLS: Household and payroll employment comparisons",
			url: "https://www.bls.gov/web/empsit/ces_cps_trends.htm",
			kind: "Survey comparability and uncertainty",
			note: "Original units, scope, timing and benchmark limitations checked; historical studies not independently appraised."
		},
		{
			id: "disinflation",
			title: "Mary Clare Peate: The inflation rate is falling, but prices are not",
			url: "https://www.stlouisfed.org/publications/page-one-economics/2024/03/01/the-inflation-rate-is-falling-but-prices-are-not",
			kind: "2024 Federal Reserve educational explanation",
			note: "Original level/rate distinction checked; historical charts excluded and institutional views disclaimer retained."
		},
		{
			id: "primer",
			title: "BEA: Measuring the economy, a primer on GDP and the NIPAs",
			url: "https://www.bea.gov/sites/default/files/methodologies/nipa_primer.pdf",
			kind: "National-account methodology",
			note: "Original output, price/quantity and import-origin boundaries checked; historical tables are not current country estimates."
		},
		{
			id: "annual",
			title: "BEA: Quarterly percent changes at annual rates",
			url: "https://www.bea.gov/help/faq/122",
			kind: "2006 annualization explanation",
			note: "Explicit compounding formula and exceptions checked; inconsistent introductory rounding not adopted."
		},
		{
			id: "gdp",
			title: "BEA: GDP release additional information",
			url: "https://www.bea.gov/news/gdp-release-additional-information",
			kind: "Statistical conventions",
			note: "Original nominal/real and period conventions checked; no current release values or forecast."
		},
		{
			id: "chain",
			title: "BEA: Chained-dollar estimates",
			url: "https://www.bea.gov/help/glossary/chained-dollar-estimates",
			kind: "Index aggregation definition",
			note: "Original nonadditivity and reference-period boundary checked; no ordinary chained component shares."
		},
		{
			id: "value",
			title: "BEA: Value added",
			url: "https://www.bea.gov/help/glossary/value-added",
			kind: "Production accounting definition",
			note: "Original intermediate-input distinction checked; all production examples here are hypothetical."
		},
		{
			id: "welfare",
			title: "BEA: Measures of economic well-being and growth background",
			url: "https://apps.bea.gov/well-being/docs/background-materials-prototype-measures-of-economic-well-being-and-growth.pdf",
			kind: "Output and welfare limits",
			note: "Original distribution/nonmarket limitations checked; historical prototype plans are not current achievements."
		},
		{
			id: "ppp",
			title: "World Bank: International Comparison Program FAQ",
			url: "https://www.worldbank.org/en/programs/icp/faq",
			kind: "PPP purpose and conversion limits",
			note: "Original non-equilibrium and transaction-rate distinctions checked; no cash quote, misvaluation claim or trading advice."
		},
		{
			id: "ppp-method",
			title: "World Bank: International Comparison Program methodology",
			url: "https://www.worldbank.org/en/programs/icp/methodology",
			kind: "Comparable price and volume methods",
			note: "Original expenditure weighting and account comparability checked; historical cycle details are not universal future methods."
		}
	]
};
