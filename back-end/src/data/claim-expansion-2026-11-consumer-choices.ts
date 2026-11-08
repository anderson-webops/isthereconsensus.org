import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberConsumerChoicesResearchCheckedAt = "2026-11-08T13:06:14.080Z";

const sources = {
	price1: researchSource("The price-perceived quality relationship: A meta-analytic review and assessment of its determinants", "Marketing Letters", 2007, "https://doi.org/10.1007/s11002-007-9013-2", "10.1007/s11002-007-9013-2", "Synthesis of studies published from 1989 to 2006 on perceived quality, not objective performance. Price effects varied with design, familiarity and product type and were smaller in more recent studies.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	price2: researchSource("Quality cue or price anchoring: The effect of price on consumer behavior in repeat experiments", "Canadian Journal of Agricultural Economics/Revue canadienne d'agroeconomie", 2025, "https://doi.org/10.1111/cjag.12385", "10.1111/cjag.12385", "Four identical experiments conducted weeks apart examine appearance, taste ratings and willingness to pay. Repeated experiments are not assumed to be four independent participant samples. Quality information changes the proposed mediation.", "context", "supports", novemberConsumerChoicesResearchCheckedAt),
	price3: researchSource("Pricey therefore good? Price affects expectations, but not quality perceptions and liking", "Psychology & Marketing", 2023, "https://doi.org/10.1002/mar.21799", "10.1002/mar.21799", "Six studies with 2,842 participants found higher quality and liking expectations at higher prices, but no consistent experienced-quality or liking effect. This is an experimental program, not a meta-analysis despite the discovery index's label.", "context", "debate", novemberConsumerChoicesResearchCheckedAt),
	reviews4: researchSource("The Effect of Electronic Word of Mouth on Sales: A Meta-Analytic Review of Platform, Product, and Metric Factors", "Journal of Marketing Research", 2016, "https://doi.org/10.1509/jmr.14.0380", "10.1509/jmr.14.0380", "Synthesis of 96 studies, 1,532 effect estimates, 40 platforms and 26 product categories. The average sales correlation was 0.091, not a 9.1% sales increase. Much underlying evidence is observational.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	reviews2: researchSource("Do customer reviews drive purchase decisions? The moderating roles of review exposure and price", "Decision Support Systems", 2017, "https://doi.org/10.1016/j.dss.2017.03.010", "10.1016/j.dss.2017.03.010", "Observational data from two retailers show interactions among rating, review volume, actual exposure and relative price. Shopper selection and product differences limit causal interpretation.", "context", "supports", novemberConsumerChoicesResearchCheckedAt),
	reviews3: researchSource("Online reviews, customer Q&As, and product sales: A PVAR approach", "PLOS ONE", 2023, "https://doi.org/10.1371/journal.pone.0290674", "10.1371/journal.pone.0290674", "Three-month panel of 120 laptops, 7,205 reviews and customer questions and answers. A panel vector autoregression examines dynamic associations, not randomized review effects.", "context", "supports", novemberConsumerChoicesResearchCheckedAt),
	scarcity1: researchSource("Scarcity tactics in marketing: A meta-analysis of product scarcity effects on consumer purchase intentions", "Journal of Retailing", 2022, "https://doi.org/10.1016/j.jretai.2022.06.003", "10.1016/j.jretai.2022.06.003", "Synthesis of 131 studies and 416 effects on purchase intentions. Demand-, supply- and time-based cues differed by product. Intention effects do not verify actual stock shortages or completed purchases.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	scarcity2: researchSource("A meta‐analysis on the effects of product scarcity", "Psychology & Marketing", 2023, "https://doi.org/10.1002/mar.21816", "10.1002/mar.21816", "Product-scarcity synthesis reports differences by cue and product, without a uniform advantage for limited-time or limited-quantity urgency. It does not establish one scarcity effect across contexts.", "meta_analysis", "debate", novemberConsumerChoicesResearchCheckedAt),
	scarcity3: researchSource("Limited time or limited quantity? The impact of other consumer existence and perceived competition on the scarcity messaging - Purchase intention relation", "Journal of Hospitality and Tourism Management", 2021, "https://doi.org/10.1016/j.jhtm.2021.03.012", "10.1016/j.jhtm.2021.03.012", "Scenario-based travel experiment measures purchase intentions. Social cues changed perceived competition and intentions for quantity limits but not time limits; these were not observed bookings.", "context", "context", novemberConsumerChoicesResearchCheckedAt),
	labels4: researchSource("The Potential Effectiveness of Front-of-Pack Nutrition Labeling for Improving Population Diets", "Annual Review of Nutrition", 2024, "https://doi.org/10.1146/annurev-nutr-011224-030917", "10.1146/annurev-nutr-011224-030917", "Review of 221 articles, searched through July 2022, rates randomized evidence for understanding, choices and purchases as moderate certainty. Its authors used GRADE; this site's synthesis does not independently perform GRADE.", "systematic_review", "supports", novemberConsumerChoicesResearchCheckedAt),
	labels3: researchSource("Effects of front-of-pack labels on the nutritional quality of supermarket food purchases: evidence from a large-scale randomized controlled trial", "Journal of the Academy of Marketing Science", 2021, "https://doi.org/10.1007/s11747-020-00723-5", "10.1007/s11747-020-00723-5", "Trial across 60 supermarkets and four product categories analyzed 1,668,301 purchases. Effects averaged 17 times smaller than comparable laboratory studies. The 2.5% improvement concerns the labeled basket's nutrient-profile score, not calories or disease.", "landmark_study", "supports", novemberConsumerChoicesResearchCheckedAt),
	labels5: researchSource("Nutrition Info and Other Front-of-Package Labels and Simulated Food and Beverage Purchases", "JAMA Network Open", 2025, "https://doi.org/10.1001/jamanetworkopen.2025.37389", "10.1001/jamanetworkopen.2025.37389", "US simulated-shopping trial with 5,636 completers compares six labeling systems. Spectrum labels improved a 0-100 nutrient-profile score by 2.42 points versus positive-only labels; several other formats did not. The comparator was not no label.", "context", "debate", novemberConsumerChoicesResearchCheckedAt),
	cashless1: researchSource("Less cash, more splash? A meta-analysis on the cashless effect", "Journal of Retailing", 2024, "https://doi.org/10.1016/j.jretai.2024.05.003", "10.1016/j.jretai.2024.05.003", "2024 synthesis of 392 effect estimates from 71 papers finds a small average cashless spending effect that has weakened over time. Consumption context matters; tested payment-method features did not explain the variation.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	cashless3: researchSource("Digital Payments and Consumption: Evidence from the 2016 Demonetization in India", "The Review of Financial Studies", 2024, "https://doi.org/10.1093/rfs/hhae005", "10.1093/rfs/hhae005", "Indian demonetization study exploits a policy-induced switch to digital payments. Its 2.38% spending estimate is per additional ten percentage points of prior cash dependence, not a universal payment effect or a randomized individual assignment.", "context", "supports", novemberConsumerChoicesResearchCheckedAt),
	cashless4: researchSource("An empirical study of payment technologies, the psychology of consumption, and spending behavior in a retailing context", "Information & Management", 2019, "https://doi.org/10.1016/j.im.2018.07.007", "10.1016/j.im.2018.07.007", "Retail study compares cash, cards and stored-value contactless technology. It distinguishes subjective spending awareness, security and convenience; convenience and perceived security had little spending effect. The design does not establish one universal mechanism.", "context", "context", novemberConsumerChoicesResearchCheckedAt),
	foodAds1: researchSource("Association of Food and Nonalcoholic Beverage Marketing With Children and Adolescents’ Eating Behaviors and Health", "JAMA Pediatrics", 2022, "https://doi.org/10.1001/jamapediatrics.2022.1037", "10.1001/jamapediatrics.2022.1037", "Review of 96 articles, with 80 and 19,372 participants in meta-analysis. Intake, choice and preference rose with substantial heterogeneity. Purchasing evidence was unclear and body-weight and dental-health data were scarce.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	foodAds4: researchSource("Food marketing, eating and health outcomes in children and adults: a systematic review and meta-analysis", "British Journal of Nutrition", 2025, "https://doi.org/10.1017/s0007114524000102", "10.1017/s0007114524000102", "2025 review includes 82 studies, 23 in meta-analysis, with searches covering 2014-2021. It combines children and adults and promotion, product, price and place; pooled consumption is not a child-only television-ad effect.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	foodAds3: researchSource("Sustained impact of energy-dense TV and online food advertising on children’s dietary intake: a within-subject, randomised, crossover, counter-balanced trial", "International Journal of Behavioral Nutrition and Physical Activity", 2018, "https://doi.org/10.1186/s12966-018-0672-6", "10.1186/s12966-018-0672-6", "Randomized crossover study of 160 children aged 7-12 at four six-day Australian camps. The 194 kJ difference concerns short-term intake after multiple-media exposure without lunch compensation, not long-term weight gain. Registration was retrospective.", "landmark_study", "supports", novemberConsumerChoicesResearchCheckedAt),
	storeMusic1: researchSource("Setting the tone with the tune: A meta-analytic review of the effects of background music in retail settings", "Journal of Business Research", 2006, "https://doi.org/10.1016/j.jbusres.2006.01.013", "10.1016/j.jbusres.2006.01.013", "Historical synthesis of 32 studies reports small-to-moderate effects on varied shopping outcomes. The abstract's sample of 148 is not treated as a participant or study denominator without methods clarification.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	storeMusic2: researchSource("Calibrating 30 Years of Experimental Research: A Meta-Analysis of the Atmospheric Effects of Music, Scent, and Color", "Journal of Retailing", 2017, "https://doi.org/10.1016/j.jretai.2016.10.001", "10.1016/j.jretai.2016.10.001", "2017 review covers 66 studies, 135 effects and 15,621 people across music, scent and color, not music alone. Findings on pleasure, satisfaction and behavioral intentions are distinct from measured sales.", "meta_analysis", "context", novemberConsumerChoicesResearchCheckedAt),
	storeMusic3: researchSource("Understanding How Music Influences Shopping on Weekdays and Weekends", "Journal of Marketing Research", 2023, "https://doi.org/10.1177/00222437221150930", "10.1177/00222437221150930", "Published in 2023 despite a 2022 indexed year. The program combines a meta-analysis, field studies and experiments; supermarket sales rose with music on weekdays but not weekends. A contextual moderator is not a universal rule.", "context", "context", novemberConsumerChoicesResearchCheckedAt),
	returns1: researchSource("The Effect of Return Policy Leniency on Consumer Purchase and Return Decisions: A Meta-analytic Review", "Journal of Retailing", 2016, "https://doi.org/10.1016/j.jretai.2015.11.002", "10.1016/j.jretai.2015.11.002", "Meta-analysis of 21 papers distinguishes time, money, effort, scope and exchange leniency. Different features affect purchase and return decisions differently; greater purchasing does not establish profit or consumer benefit.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	returns2: researchSource("How consumers value retailer's return policy leniency levers: An empirical investigation", "Production and Operations Management", 2022, "https://doi.org/10.1111/poms.13640", "10.1111/poms.13640", "Published in 2022 despite the index's 2019 year. Randomized experiments test return-policy features through perceived service quality, transaction costs, value and purchase intentions, not observed long-term purchases.", "context", "supports", novemberConsumerChoicesResearchCheckedAt),
	returns3: researchSource("The point of no return? Restrictive changes to lenient return policies and consumer reactions to them", "Journal of Operations Management", 2025, "https://doi.org/10.1002/joom.1346", "10.1002/joom.1346", "Online in late 2024 and print in 2025. Experiments find that restricting established return policies can reduce trust and intentions, with attenuation from explanations. These are not measured long-term loyalty or sales effects.", "context", "context", novemberConsumerChoicesResearchCheckedAt),
	endowment1: researchSource("A new meta-analysis on the WTP/WTA disparity", "Journal of Environmental Economics and Management", 2014, "https://doi.org/10.1016/j.jeem.2014.06.001", "10.1016/j.jeem.2014.06.001", "Synthesis of willingness-to-pay and willingness-to-accept disparities across goods. Experience, incentive-compatible procedures and good type alter gaps. A valuation discrepancy alone does not isolate ownership or loss aversion.", "meta_analysis", "context", novemberConsumerChoicesResearchCheckedAt),
	endowment2: researchSource("Bad riddance or good rubbish? Ownership and not loss aversion causes the endowment effect", "Journal of Experimental Social Psychology", 2009, "https://doi.org/10.1016/j.jesp.2009.05.014", "10.1016/j.jesp.2009.05.014", "Two experiments separate ownership from buying and selling roles, including brokers. Results support an ownership account in these mug tasks, without proving one mechanism for every valuation disparity.", "landmark_study", "supports", novemberConsumerChoicesResearchCheckedAt),
	endowment4: researchSource("The Willingness to Pay–Willingness to Accept Gap, the “Endowment Effect,” Subject Misconceptions, and Experimental Procedures for Eliciting Valuations", "American Economic Review", 2005, "https://doi.org/10.1257/0002828054201387", "10.1257/0002828054201387", "Experiments use practice, training and modified value-elicitation procedures. Reported gap removal motivated debate about subject understanding; later reassessment distinguishes mug from lottery results.", "landmark_study", "debate", novemberConsumerChoicesResearchCheckedAt),
	endowment3: researchSource("The Willingness to Pay: Willingness to Accept Gap, the “Endowment Effect,” Subject Misconceptions, and Experimental Procedures for Eliciting Valuations: Comment", "American Economic Review", 2011, "https://doi.org/10.1257/aer.101.2.991", "10.1257/aer.101.2.991", "Reassessment includes previously unreported original lottery data and new data, confirming absent mug gaps but persistent lottery gaps under related procedures. Reused data are not counted as independent replications.", "context", "debate", novemberConsumerChoicesResearchCheckedAt),
	decoy1: researchSource("Asymmetric Decoy Effects on Lower-Quality Versus Higher-Quality Brands: Meta-Analytic and Experimental Evidence", "Journal of Consumer Research", 1995, "https://doi.org/10.1086/209449", "10.1086/209449", "Historical synthesis and experiment find brand-quality asymmetries and a reversal between participant populations. This supports context dependence rather than a general guarantee of steering consumers.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	decoy2: researchSource("More Evidence Challenging the Robustness and Usefulness of the Attraction Effect", "Journal of Marketing Research", 2014, "https://doi.org/10.1509/jmr.14.0020", "10.1509/jmr.14.0020", "Ninety-one attempts across 23 product classes and 73 choice sets yielded 11 reliable effects. Meaningful verbal and pictorial descriptions reduced effects. Attempts, choice sets and product classes are separate denominators.", "context", "debate", novemberConsumerChoicesResearchCheckedAt),
	decoy3: {
		...researchSource("How decoy options ferment choice biases in real-world consumer decision-making", "npj Science of Learning", 2025, "https://doi.org/10.1038/s41539-025-00341-2", "10.1038/s41539-025-00341-2", "Observational analysis of 3.6 million UK wine transactions finds a modest pattern, roughly 1% preference change, dependent on prior experience. Publisher correction 10.1038/s41539-025-00387-2 fixes incorrectly assigned figure legends.", "context", "supports", novemberConsumerChoicesResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1038/s41539-025-00341-2",
			"https://doi.org/10.1038/s41539-025-00387-2",
			"https://api.crossref.org/works?filter=updates%3A10.1038%2Fs41539-025-00341-2&rows=100"
		]
	},
	experiences1: researchSource("Re-examining the Experiential Advantage in Consumption: A Meta-Analysis and Review", "Journal of Consumer Research", 2021, "https://doi.org/10.1093/jcr/ucaa047", "10.1093/jcr/ucaa047", "Published in 2021, this synthesis contains 141 studies and 360 effects. Average advantage d=0.383 is qualified by publication bias, resources, social context and valence. It is not a percentage gain in overall happiness.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	experiences2: {
		...researchSource("Experiential or Material Purchases? Social Class Determines Purchase Happiness", "Psychological Science", 2018, "https://doi.org/10.1177/0956797617736386", "10.1177/0956797617736386", "Resource and social-class studies found no consistent experiential advantage for lower-resource consumers. Correction 10.1177/0956797618815623 removes a mismatched 7/9-point manipulation check and updates the remaining check; other conclusions were unchanged according to the notice.", "context", "debate", novemberConsumerChoicesResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1177/0956797617736386",
			"https://doi.org/10.1177/0956797618815623",
			"https://api.crossref.org/works?filter=updates%3A10.1177%2F0956797617736386&rows=100"
		]
	},
	experiences3: researchSource("Happiness for Sale: Do Experiential Purchases Make Consumers Happier than Material Purchases?", "Journal of Consumer Research", 2009, "https://doi.org/10.1086/597049", "10.1086/597049", "Experiments distinguish positive and negative purchases in retrospective happiness. Negative experiences have no advantage and can be worse. Purchase satisfaction is distinct from daily well-being or long-term clinical outcomes.", "context", "debate", novemberConsumerChoicesResearchCheckedAt),
	impulse1: researchSource("Online Impulse Buying: A Systematic Review of 25 Years of Research Using Meta Regression", "Journal of Consumer Behaviour", 2025, "https://doi.org/10.1002/cb.2418", "10.1002/cb.2418", "Published in 2025: 75 articles, 84 empirical results, 341 estimates and 139,545 participants through December 2023. Correlations among platform, marketing, situational and shopper factors do not establish causes.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	impulse2: researchSource("Understanding Online Impulse Buying Behavior in Social Commerce: A Systematic Literature Review", "IEEE Access", 2020, "https://doi.org/10.1109/access.2020.2993671", "10.1109/access.2020.2993671", "Review identified 68 online impulse-buying studies, with 24 specifically in social commerce. Among the relevant social-commerce studies, surveys accounted for 83% and experiments 17%; the whole set is not randomized evidence.", "systematic_review", "context", novemberConsumerChoicesResearchCheckedAt),
	impulse3: researchSource("A Meta-Analysis of Online Impulsive Buying and the Moderating Effect of Economic Development Level", "Information Systems Frontiers", 2022, "https://doi.org/10.1007/s10796-021-10170-4", "10.1007/s10796-021-10170-4", "Published in 2022 despite a 2021 indexed year. Review of 54 articles finds associations for many but not all factors; price, security, novelty and negative emotion were exceptions. Country-level moderators are not individual predictions.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	eco1: researchSource("The Effects of Environmental Sustainability Labels on Selection, Purchase, and Consumption of Food and Drink Products: A Systematic Review", "Environment and Behavior", 2021, "https://doi.org/10.1177/0013916521995473", "10.1177/0013916521995473", "Review of 56 studies and 42,768 participants uses vote counting, not a pooled effect size. Forty-one studies were hypothetical and 39 had unclear or high risk of bias. Favorable comparisons are not expert-agreement percentages.", "systematic_review", "supports", novemberConsumerChoicesResearchCheckedAt),
	eco2: researchSource("Effects of environmental impact labels on the sustainability of food purchases: A randomised controlled trial in an experimental online supermarket", "PLOS ONE", 2024, "https://doi.org/10.1371/journal.pone.0309386", "10.1371/journal.pone.0309386", "UK experimental online-supermarket trial with 1,051 participants. Selected-basket impact scores fell by about 3-4 percentiles across labels; these are score changes, not measured percentages of emissions avoided.", "context", "supports", novemberConsumerChoicesResearchCheckedAt),
	eco3: researchSource("The impact of an eco-score label on US consumers’ perceptions of environmental sustainability and intentions to purchase food: A randomized experiment", "PLOS ONE", 2024, "https://doi.org/10.1371/journal.pone.0306123", "10.1371/journal.pone.0306123", "US online experiment with 1,013 parents. Labels changed perceived sustainability more than purchase intentions. Eight food ratings are repeated observations, not eight independent participant samples or actual purchases.", "context", "context", novemberConsumerChoicesResearchCheckedAt),
	loyalty1: researchSource("40 years of loyalty programs: how effective are they? Generalizations from a meta-analysis", "Journal of the Academy of Marketing Science", 2022, "https://doi.org/10.1007/s11747-021-00804-z", "10.1007/s11747-021-00804-z", "Published in 2022, review synthesizes 429 effects available in 1990-2020. Behavioral loyalty responds more than attitudinal loyalty; program structure and industry moderate outcomes. Effects are not 429 independent studies.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	loyalty2: researchSource("Understanding Loyalty Program Effectiveness across the Customer Journey: A Meta-Analysis", "Journal of Retailing", 2026, "https://doi.org/10.1016/j.jretai.2026.07.006", "10.1016/j.jretai.2026.07.006", "2026 synthesis of 434 effects from 78 independent samples comparing members and nonmembers. Positive associations differ by customer-journey stage; enrollment comparisons do not eliminate member selection.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	loyalty3: researchSource("The Long-Term Impact of Loyalty Programs on Consumer Purchase Behavior and Loyalty", "Journal of Marketing", 2007, "https://doi.org/10.1509/jmkg.71.4.019", "10.1509/jmkg.71.4.019", "Longitudinal convenience-store data show different patterns by initial patronage. Heavy buyers claimed rewards without increasing purchases; lighter buyers changed more. Observational customer differences limit causal interpretation.", "landmark_study", "context", novemberConsumerChoicesResearchCheckedAt),
	discount1: researchSource("When do amount‐off discounts result in more positive consumer responses? Meta‐analytic evidence", "Psychology & Marketing", 2021, "https://doi.org/10.1002/mar.21572", "10.1002/mar.21572", "Nineteen studies, 86 estimates and 12,003 participants compare discount frames. Amount-off advantages vary with price, product and promotion mode. Effects concern responses, not a change in mathematically identical savings.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	discount2: researchSource("Amount off versus percentage off: when does it matter?", "Journal of Business Research", 2016, "https://doi.org/10.1016/j.jbusres.2015.08.014", "10.1016/j.jbusres.2015.08.014", "Three experiments favored amount-off descriptions for higher-priced products. The low-price opposite trend was not statistically significant. The US-dollar price boundary is not a cross-currency threshold.", "context", "supports", novemberConsumerChoicesResearchCheckedAt),
	discount3: researchSource("Effect of discount frame on consumer responses: moderation of psychological distance and product nature", "Marketing Intelligence & Planning", 2023, "https://doi.org/10.1108/mip-10-2022-0481", "10.1108/mip-10-2022-0481", "Five scenario experiments test psychological distance and product type. Spatial-distance interaction was observed; temporal, social and hypothetical-distance interactions were not. Intention, attitude and willingness-to-pay measures are not sales.", "context", "debate", novemberConsumerChoicesResearchCheckedAt),
	nine1: researchSource("A meta‐analysis on the effects of just‐below versus round prices", "Journal of Consumer Psychology", 2024, "https://doi.org/10.1002/jcpy.1353", "10.1002/jcpy.1353", "Published in 2024: preregistered synthesis of 69 studies, 362 effects and 40,541 people. The purchase effect g=0.13 is small and heterogeneous; publication-bias corrections sometimes make effects nonsignificant. Quality-image effect was null.", "meta_analysis", "context", novemberConsumerChoicesResearchCheckedAt),
	nine2: researchSource("How consumers evaluated precise, just-below, and round prices: evidence from two high-powered, preregistered experiments", "Frontiers in Behavioral Economics", 2026, "https://doi.org/10.3389/frbhe.2026.1828446", "10.3389/frbhe.2026.1828446", "Two preregistered 2026 experiments, total N=729, compare precise, just-below and round prices. Price image and recall differ, while purchase intentions and quality image do not reliably change.", "context", "debate", novemberConsumerChoicesResearchCheckedAt),
	nine3: researchSource("Price Endings, Left-Digit Effects, and Choice", "Journal of Consumer Research", 2009, "https://doi.org/10.1086/597215", "10.1086/597215", "Experiments link left digits and price endings with relative choices, moderated by price level and shopping goals. Specific choice shifts do not establish a universal retailer sales lift.", "landmark_study", "supports", novemberConsumerChoicesResearchCheckedAt),
	halo1: researchSource("A systematic review, and meta-analyses, of the impact of health-related claims on dietary choices", "International Journal of Behavioral Nutrition and Physical Activity", 2017, "https://doi.org/10.1186/s12966-017-0548-1", "10.1186/s12966-017-0548-1", "Review of 31 papers, with 17 in meta-analysis, reports an odds ratio of 1.75 for choice-related outcomes. Most work used artificial settings; natural-experiment effects were smaller. Persuasiveness does not verify a health claim.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	halo2: researchSource("Systematic review of the impact of nutrition claims related to fat, sugar and energy content on food choices and energy intake", "BMC Public Health", 2019, "https://doi.org/10.1186/s12889-019-7622-3", "10.1186/s12889-019-7622-3", "Eleven-study review of fat, sugar and energy claims finds changes in perceived healthiness, portion size and energy estimates, varying by product and shopper. These are not direct estimates of long-term weight effects.", "systematic_review", "supports", novemberConsumerChoicesResearchCheckedAt),
	halo3: researchSource("Tackling nutritional and health claims to disentangle their effects on consumer food choices and behaviour: A systematic review", "Food Quality and Preference", 2022, "https://doi.org/10.1016/j.foodqual.2022.104634", "10.1016/j.foodqual.2022.104634", "Review of 125 articles through September 2020, with substantial EU representation, identifies consumer, product and interpretation factors. It does not audit the legal validity or clinical efficacy of every claim.", "systematic_review", "context", novemberConsumerChoicesResearchCheckedAt),
	celebrity1: researchSource("The effectiveness of celebrity endorsements: a meta-analysis", "Journal of the Academy of Marketing Science", 2017, "https://doi.org/10.1007/s11747-016-0503-8", "10.1007/s11747-016-0503-8", "Published in 2017: 46 studies and 10,357 participants through April 2016. Effects can be positive or negative by fit and format; celebrities underperform some other endorsements. Extreme moderator estimates are not a general effect.", "meta_analysis", "context", novemberConsumerChoicesResearchCheckedAt),
	celebrity2: researchSource("#Instafame: exploring the endorsement effectiveness of influencers compared to celebrities", "International Journal of Advertising", 2022, "https://doi.org/10.1080/02650487.2021.1987041", "10.1080/02650487.2021.1987041", "Published in 2022: three studies compare macro-influencers and traditional celebrities across ad formats. Some comparisons are null. Relative effectiveness does not establish an advantage over no endorsement.", "context", "context", novemberConsumerChoicesResearchCheckedAt),
	celebrity3: researchSource("Media type congruence in the advertising effectiveness of celebrity vs. influencer endorsements", "Journal of Marketing Analytics", 2026, "https://doi.org/10.1057/s41270-025-00415-5", "10.1057/s41270-025-00415-5", "2026 issue paper, indexed as 2025, uses data from 430 Turkish consumers and structural equation modeling/MANOVA. Media-specific findings concern recall, attitudes and intentions; they do not prove causal sales effects.", "context", "context", novemberConsumerChoicesResearchCheckedAt),
	personalized1: researchSource("How Persuasive Is Personalized Advertising? A Meta-Analytic Review of Experimental Evidence of the Effects of Personalization on Ad Effectiveness", "Journal of Advertising Research", 2025, "https://doi.org/10.1080/00218499.2025.2467763", "10.1080/00218499.2025.2467763", "2025 review of 53 experimental studies finds greater average persuasion, attitudes and behavioral intentions. Its modeled relevance mechanism is not proof about every platform, purchase or user's interests.", "meta_analysis", "supports", novemberConsumerChoicesResearchCheckedAt),
	personalized2: researchSource("Social Networks, Personalized Advertising, and Privacy Controls", "Journal of Marketing Research", 2014, "https://doi.org/10.1509/jmr.10.0355", "10.1509/jmr.10.0355", "Published in 2014 despite the index's 2013 year. Ad text was randomized; the concurrent platform privacy-policy change was not. Click effects and nearly doubled relative response do not establish purchase effects.", "landmark_study", "context", novemberConsumerChoicesResearchCheckedAt),
	personalized3: {
		...researchSource("Is It Transparent or Surveillant? The Effects of Personalized Advertising and Privacy Policy on Advertising Effectiveness", "Journal of Interactive Advertising", 2025, "https://doi.org/10.1080/15252019.2024.2417422", "10.1080/15252019.2024.2417422", "2025 issue paper with two studies. Correction 10.1080/15252019.2025.2506340 fixes hypotheses and reported support; Hypothesis 6's predicted negative surveillance relationship was not supported. The older abstract should not override the corrected result.", "context", "debate", novemberConsumerChoicesResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1080/15252019.2024.2417422",
			"https://doi.org/10.1080/15252019.2025.2506340",
			"https://api.crossref.org/works?filter=updates%3A10.1080%2F15252019.2024.2417422&rows=100"
		]
	},
	shipping1: researchSource("Shipping fee schedules and return behavior", "Marketing Letters", 2019, "https://doi.org/10.1007/s11002-019-09486-8", "10.1007/s11002-019-09486-8", "Randomized field experiment assigns seven fee structures. Threshold shipping lowered order incidence, not purchase value, and raised strategic returns. Order size, order frequency and net value after returns are distinct.", "landmark_study", "context", novemberConsumerChoicesResearchCheckedAt),
	shipping2: researchSource("The Effectiveness of Membership-Based Free Shipping: An Empirical Investigation of Consumers’ Purchase Behaviors and Revenue Contribution", "Journal of Marketing", 2023, "https://doi.org/10.1177/00222429231158116", "10.1177/00222429231158116", "Retail transaction study uses stacked difference-in-differences for free-shipping membership enrollment. Average spending did not rise initially but changed later. Enrollment is not randomized and shipping costs alter retailer net revenue.", "context", "context", novemberConsumerChoicesResearchCheckedAt),
	shipping3: researchSource("An Empirical Study of the Impact of Nonlinear Shipping and Handling Fees on Purchase Incidence and Expenditure Decisions", "Marketing Science", 2006, "https://doi.org/10.1287/mksc.1050.0150", "10.1287/mksc.1050.0150", "Retailer fee-schedule data modeled purchase incidence and order size with consumer heterogeneity. Some promotions generated sales but were unprofitable after foregone shipping revenue. Findings do not establish customer savings or universal profitability.", "context", "supports", novemberConsumerChoicesResearchCheckedAt)
};

export const novemberConsumerChoicesClaims = [
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "does-a-higher-price-make-a-product-seem-better",
		title: "Does a higher price make a product seem better?",
		bottomLine: "A higher price often raises expectations of quality. Its effect on how much people like a product after trying it is less consistent. Price alone cannot establish that a product performs better.",
		stableCore: [
			"A review of price-quality studies found that price can act as a quality cue, especially when buyers know little about the product.",
			"Six studies involving 2,842 people found higher expectations at higher prices, but no consistent improvement in quality ratings or liking after the product was experienced."
		],
		openQuestions: [
			"Which products show lasting changes in experienced enjoyment rather than expectations?",
			"How do product knowledge and repeated purchases alter the effect?"
		],
		whatWouldChangeMinds: [
			"Preregistered trials across more product categories that separately measure expectations, experience and objective performance.",
			"Replications with ordinary purchases and repeated customers."
		],
		misconceptions: [
			"Expecting a costly product to be better does not demonstrate better ingredients, durability or performance.",
			"A price effect on expectations does not mean everyone enjoys an expensive version more."
		],
		editorSummary: "Price is a quality cue, with weaker evidence for a reliable change in experienced quality.",
		population: "Consumers and students evaluating products in pricing experiments and earlier price-quality studies.",
		scope: "Compare price information with expected quality, experienced quality and liking, keeping these outcomes separate from measured product performance.",
		excludedEvidence: [
			"Do not treat willingness to pay or expected quality as objective product quality.",
			"Do not count repeated experiments as independent participant samples without verified methods."
		],
		uncertainty: "Effects depend on familiarity, product type and whether the rating precedes or follows actual use.",
		band: "mixed",
		certainty: "moderate",
		sources: [
			sources.price1,
			sources.price2,
			sources.price3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "do-online-customer-reviews-influence-buying",
		title: "Do online customer reviews influence buying?",
		bottomLine: "Online reviews are linked to what people buy. Their number, tone and visibility matter, but the size of the relationship varies. Sales can also generate reviews, so a sales-review link does not by itself show cause.",
		stableCore: [
			"A synthesis of 96 studies found a small positive average relationship between electronic word of mouth and sales, with differences across products and platforms.",
			"Retailer data suggest that ratings matter more when shoppers actually read reviews. A laptop study also found two-way relationships among reviews, questions and sales."
		],
		openQuestions: [
			"How much do reviews change purchases after accounting for product popularity and advertising?",
			"How do fake reviews, platform sorting and verified-purchase rules alter their usefulness?"
		],
		whatWouldChangeMinds: [
			"Independent field experiments that vary review visibility while measuring completed purchases.",
			"Studies comparing review systems across different products and countries."
		],
		misconceptions: [
			"An average correlation of 0.091 is not a 9.1% sales increase.",
			"More positive reviews do not independently verify a product's quality or a reviewer's honesty."
		],
		editorSummary: "Reviews and sales move together, with effects shaped by visibility, volume and product context.",
		population: "Customers on retail and other online platforms, including observational retailer and laptop-sales datasets.",
		scope: "Assess review exposure, volume and tone against purchase probability and sales, distinguishing observational associations from randomized effects.",
		excludedEvidence: [
			"Do not turn sales correlations or elasticities into a universal percentage sales lift.",
			"Do not treat a panel model as a randomized experiment or a star rating as an independent quality test."
		],
		uncertainty: "Much of the evidence is observational; popular products attract both purchases and reviews.",
		band: "broad",
		certainty: "low",
		sources: [
			sources.reviews4,
			sources.reviews2,
			sources.reviews3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "do-scarcity-messages-make-products-more-appealing",
		title: "Do scarcity messages make products more appealing?",
		bottomLine: "They can. Messages about limited availability often raise interest or purchase intentions, but time limits and low-stock messages have different effects. A stronger urge to buy does not show that the offer is good value or genuinely scarce.",
		stableCore: [
			"A synthesis of 131 studies found that scarcity effects differ by product and by whether scarcity reflects demand, supply or time.",
			"Another synthesis found no uniform advantage for urgency cues. Travel scenarios found that messages about other buyers changed intentions under some quantity limits, but not time limits."
		],
		openQuestions: [
			"How much do laboratory intentions translate into completed purchases?",
			"How do repeated exposure, consumer skepticism and truthful availability information change responses?"
		],
		whatWouldChangeMinds: [
			"Transparent field experiments measuring purchases and later satisfaction, with verified stock and deadlines.",
			"Independent replications that distinguish urgency, limited supply and high demand."
		],
		misconceptions: [
			"A countdown is not independent evidence of a product's quality, scarcity or price advantage.",
			"An effect on stated intentions is not the same as a measured increase in purchases."
		],
		editorSummary: "Scarcity cues can influence appeal, with substantial differences between messages and settings.",
		population: "Consumers in product-scarcity studies and scenario-based online travel experiments.",
		scope: "Compare scarcity-message types and product contexts using appeal, purchase intentions and documented buying outcomes.",
		excludedEvidence: [
			"Do not equate a scenario intention with an actual booking.",
			"Do not infer that a retailer's scarcity statement is accurate from its persuasive effect."
		],
		uncertainty: "Cue definitions, product categories and outcome measures vary across studies.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.scarcity1,
			sources.scarcity2,
			sources.scarcity3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "do-front-of-pack-nutrition-labels-improve-food-choices",
		title: "Do front-of-pack nutrition labels improve food choices?",
		bottomLine: "On average, clear front-of-pack labels can help people choose foods with a healthier nutrient profile. Effects vary by label and are often smaller in real shops than in experiments. Better choices do not by themselves establish better long-term health.",
		stableCore: [
			"A 2024 review of 221 articles found moderate-certainty evidence that labels improve understanding, choices and purchases, with no single interpretive system consistently best.",
			"A large supermarket trial found small changes in the labeled basket. In a 5,636-person simulated shopping trial, spectrum labels outperformed positive-only labels, while several other formats did not."
		],
		openQuestions: [
			"Which systems work best over years and across local food markets?",
			"How much do changed purchases affect what households actually eat?"
		],
		whatWouldChangeMinds: [
			"Longer real-store trials reporting whole-basket nutrition, consumption and different income groups.",
			"Replications comparing the same label systems under ordinary shopping conditions."
		],
		misconceptions: [
			"A 2.5% improvement in a nutrient-profile score is not a 2.5% reduction in calories, body weight or disease.",
			"The 2025 simulated trial compared labels with positive-only labels, not with completely unlabeled packages."
		],
		editorSummary: "Nutrition labels can improve choices, with smaller and more variable effects at real checkouts.",
		population: "Adult shoppers in international reviews, French supermarkets and a US simulated online grocery trial.",
		scope: "Assess packaged-food nutrition labels against understanding and the nutrient quality of choices and purchases, separating real and simulated shopping.",
		excludedEvidence: [
			"Do not treat a basket score as measured calorie intake or a clinical outcome.",
			"Keep front-of-pack labels separate from restaurant menu calorie labels and selective health claims."
		],
		uncertainty: "Label formats, comparison groups and market conditions differ; long-term dietary effects remain less certain.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.labels4,
			sources.labels3,
			sources.labels5
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "do-cashless-payments-increase-spending",
		title: "Do cashless payments increase spending?",
		bottomLine: "On average, people tend to spend a little more with cashless payments than with cash. The effect has weakened over time and varies with the situation. It is not a fixed extra cost for every person or transaction.",
		stableCore: [
			"A 2024 synthesis of 71 papers found a small average cashless effect across 392 estimates, with differences by consumption context.",
			"An Indian policy-change study linked a greater switch to digital payments with higher spending. Other retail research separates spending awareness from convenience and perceived security."
		],
		openQuestions: [
			"How do newer wallets and familiar contactless payments compare with older card experiments?",
			"Which effects persist when budgets, spending alerts and payment access differ?"
		],
		whatWouldChangeMinds: [
			"Preregistered field trials measuring actual spending across payment methods and income groups.",
			"Evidence separating payment technology from credit access, rewards and income changes."
		],
		misconceptions: [
			"The Indian study's 2.38% estimate was tied to an additional ten percentage points of prior cash dependence, not to every card payment.",
			"Evidence for a spending effect does not mean that convenience or perceived security is its proven cause."
		],
		editorSummary: "Cashless payment is associated with a small average spending increase, with important context limits.",
		population: "Consumers in payment studies and retail datasets, including a policy-induced digital-payment shift in India.",
		scope: "Compare cash and non-cash payment with spending while distinguishing experimental evidence, policy changes and proposed psychological mechanisms.",
		excludedEvidence: [
			"Do not interpret a context-specific percentage as a universal payment surcharge.",
			"Do not use an introduction without reported results as evidence about low-income shoppers."
		],
		uncertainty: "Payment familiarity, transaction context and research design affect the size and explanation of the effect.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.cashless1,
			sources.cashless3,
			sources.cashless4
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "does-food-advertising-increase-childrens-food-intake",
		title: "Does food advertising increase children's food intake?",
		bottomLine: "Yes, exposure to food advertising can increase how much children eat soon afterward. Evidence is strongest for short-term intake and food choices. These studies do not establish how much advertising changes an individual child's long-term weight.",
		stableCore: [
			"A 2022 review found increased intake, choice and preference, while evidence about actual purchasing and body weight was much weaker.",
			"A randomized Australian study of 160 children found extra snack intake that was not offset at lunch. A later review also found increased consumption, but combined children and adults and several forms of marketing."
		],
		openQuestions: [
			"How do repeated digital exposures affect diets over months or years?",
			"How do effects differ across ages and social circumstances?"
		],
		whatWouldChangeMinds: [
			"Longer studies linking measured advertising exposure with total diet and growth, with credible comparison groups.",
			"Updated independent syntheses separating children, adolescents, adults and marketing media."
		],
		misconceptions: [
			"An immediate intake increase is not a measured amount of future weight gain.",
			"A later review covering several marketing methods and age groups is not a child-only estimate of television advertising."
		],
		editorSummary: "Advertising can increase children's immediate intake; long-term weight effects are harder to quantify.",
		population: "Children and adolescents in food-marketing reviews, with a 7-12-year-old Australian camp trial as direct experimental evidence.",
		scope: "Assess food-advertising exposure against children's immediate intake and choices, separating these endpoints from long-term health and broader marketing reviews.",
		excludedEvidence: [
			"Do not multiply an acute snack effect into an annual weight-gain estimate.",
			"Do not treat a review protocol or an unreviewed preprint as a completed peer-reviewed synthesis."
		],
		uncertainty: "Exposure methods and outcomes vary; evidence about sustained diets, purchasing and body weight is limited.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.foodAds1,
			sources.foodAds4,
			sources.foodAds3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "does-background-music-change-shopping-behavior",
		title: "Does background music change shopping behavior?",
		bottomLine: "It can change shoppers' mood, time spent and sometimes purchases. Effects on actual sales are less consistent than effects on feelings. Store type, music and the shopping situation all matter.",
		stableCore: [
			"A review of 32 studies found small-to-moderate effects across several shopping outcomes. A broader review of music, scent and color also found differences in pleasure, satisfaction and intentions.",
			"A supermarket research program found higher sales with pleasant music on weekdays, but not weekends, illustrating how context can change the result."
		],
		openQuestions: [
			"Which effects generalize beyond particular stores and customer groups?",
			"How do volume, accessibility needs and unwanted music affect shopping experiences?"
		],
		whatWouldChangeMinds: [
			"Independent multisite trials measuring purchases, returns and shopper comfort.",
			"Replications that separate music from staffing, crowding and other store changes."
		],
		misconceptions: [
			"A higher satisfaction rating is not the same as a larger purchase.",
			"The 66-study atmospheric review covered scent and color as well as music; its whole sample is not a music-only denominator."
		],
		editorSummary: "Music can affect shopping experiences, with context-dependent evidence for changes in sales.",
		population: "Shoppers in varied retail and service settings, including supermarket field studies.",
		scope: "Compare background music with mood, time, intentions and actual sales while distinguishing music-only results from broader store-atmosphere research.",
		excludedEvidence: [
			"Do not translate intentions into verified checkout behavior.",
			"Do not generalize a weekday finding to every store, customer or music selection."
		],
		uncertainty: "Outcomes and settings vary, and older and newer reviews can include overlapping studies.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.storeMusic1,
			sources.storeMusic2,
			sources.storeMusic3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "do-generous-return-policies-encourage-purchases",
		title: "Do generous return policies encourage purchases?",
		bottomLine: "They often make people more willing to buy. Refund amounts, return effort, deadlines and product eligibility have different effects. More purchases do not automatically mean greater profit or fewer unwanted products.",
		stableCore: [
			"A synthesis of 21 papers found that lenient policies increased purchase decisions more than return decisions overall, with different effects across policy features.",
			"Experiments link more generous policies with perceived service value. Other experiments found that restricting an existing policy could reduce trust and purchase intentions."
		],
		openQuestions: [
			"Which findings hold for observed purchases and returns over time?",
			"How do policy changes affect different products and customers with limited access to return services?"
		],
		whatWouldChangeMinds: [
			"Field studies measuring net purchases after returns, costs and customer experience.",
			"Independent replications that change one policy feature at a time."
		],
		misconceptions: [
			"A willingness-to-buy rating is not a completed transaction.",
			"A longer deadline and a broader range of returnable products are different policy changes and need not have the same effect."
		],
		editorSummary: "Return policies influence buying decisions, with different effects from each policy feature.",
		population: "Consumers in return-policy studies, experimental purchase scenarios and policy-change evaluations.",
		scope: "Assess monetary, time, effort, scope and exchange features against purchase and return decisions, trust and intentions.",
		excludedEvidence: [
			"Do not infer actual long-term loyalty from a scenario-based intention.",
			"Do not treat increased purchasing as proof of retailer profit, lower waste or greater consumer welfare."
		],
		uncertainty: "Policies have multiple features, and many experiments measure intentions rather than completed purchases.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.returns1,
			sources.returns2,
			sources.returns3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "does-owning-something-change-how-much-you-value-it",
		title: "Does owning something change how much you value it?",
		bottomLine: "Often, owners ask more to give up an item than nonowners offer to buy it. The size and explanation of this gap depend on the item and how values are measured. Training and trading experience can reduce or remove it in some experiments.",
		stableCore: [
			"A meta-analysis found smaller selling-buying gaps for ordinary private goods, experienced participants and some incentive-based procedures.",
			"Experiments separating ownership from the buyer or seller role support an ownership effect. Other work removed a mug-valuation gap with clearer procedures, while a reassessment found different results for mugs and lotteries."
		],
		openQuestions: [
			"How much of a particular gap reflects ownership, uncertainty, strategy or misunderstanding?",
			"Which effects persist for familiar goods traded in ordinary markets?"
		],
		whatWouldChangeMinds: [
			"Preregistered market studies that separate ownership from roles, information and valuation procedures.",
			"Replications measuring real trades after practice and clear comprehension checks."
		],
		misconceptions: [
			"A selling-buying gap is not by itself proof that loss aversion caused it.",
			"A disappearing mug effect does not establish that every valuation gap disappears for every good."
		],
		editorSummary: "Ownership-related valuation gaps are common, with important procedural and explanatory disputes.",
		population: "Participants valuing consumer goods, mugs and lotteries, and studies of market and non-market goods.",
		scope: "Compare willingness to accept and willingness to pay while distinguishing ownership, transaction roles, experience and elicitation procedures.",
		excludedEvidence: [
			"Do not use all valuation gaps as a direct measure of ownership or loss aversion.",
			"Do not count the reassessment's reused original data as an independent replication."
		],
		uncertainty: "Mechanisms remain debated, and laboratory procedures can substantially change the observed gap.",
		band: "mixed",
		certainty: "moderate",
		sources: [
			sources.endowment1,
			sources.endowment2,
			sources.endowment4,
			sources.endowment3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "can-an-inferior-decoy-option-change-what-people-choose",
		title: "Can an inferior decoy option change what people choose?",
		bottomLine: "Yes, in some settings. Adding an inferior option can shift preferences between the remaining choices, but many attempted demonstrations fail. Real-world effects can be small and depend on how options are described and compared.",
		stableCore: [
			"Early synthesis and experiments found context-dependent shifts, including reversals between participant groups.",
			"One investigation obtained only 11 reliable effects in 91 attempts. A later analysis of 3.6 million UK wine transactions found a modest pattern consistent with a decoy effect, using observational data."
		],
		openQuestions: [
			"How often do effects survive realistic product descriptions and large choice sets?",
			"How much do field patterns reflect decoys rather than unmeasured product and shopper differences?"
		],
		whatWouldChangeMinds: [
			"Independent field experiments that randomize available options and track actual choices.",
			"Preregistered replications using realistic descriptions and transparent null results."
		],
		misconceptions: [
			"An inferior option does not reliably steer every shopper toward a particular product.",
			"Millions of transactions do not turn an observational comparison into a randomized experiment."
		],
		editorSummary: "Decoy effects are possible, with substantial limits on robustness and real-world size.",
		population: "Consumers in choice experiments and UK grocery-store wine transaction records.",
		scope: "Assess preference shifts caused or associated with dominated alternatives, keeping laboratory manipulations separate from observational field comparisons.",
		excludedEvidence: [
			"Do not interpret the field study's roughly 1% preference change as a guaranteed sales lift.",
			"Do not collapse different populations, product descriptions and choice sets into a universal decoy rule."
		],
		uncertainty: "Replication success and effect size vary with descriptions, choice context and prior experience.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.decoy1,
			sources.decoy2,
			sources.decoy3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "do-experiences-bring-more-happiness-than-possessions",
		title: "Do experiences bring more happiness than possessions?",
		bottomLine: "On average, enjoyable experiences often bring more purchase-related happiness than possessions. The advantage is smaller for unpleasant or solitary experiences and for people with fewer resources. Buying an experience is not a reliable route to happiness regardless of circumstances.",
		stableCore: [
			"A synthesis of 141 studies found an average experiential advantage, with evidence that publication bias inflated part of the estimate.",
			"Studies of social class found no consistent advantage among people with fewer resources. Other experiments found that negative experiences could bring as much or more unhappiness than disappointing possessions."
		],
		openQuestions: [
			"How much of the benefit reflects social connection rather than the purchase category?",
			"Which effects last when studies track actual purchases instead of recalling selected ones?"
		],
		whatWouldChangeMinds: [
			"Larger preregistered studies spanning income levels and positive as well as negative outcomes.",
			"Longer studies separating purchase satisfaction, daily feelings and overall life satisfaction."
		],
		misconceptions: [
			"An average advantage does not mean that a needed household item is a worse choice than a trip.",
			"A standardized effect size is not a percentage increase in happiness."
		],
		editorSummary: "Experiential purchases often have an advantage, shaped by resources, company and how the experience turns out.",
		population: "Consumers reporting experiential and material purchases across experimental and survey studies.",
		scope: "Compare purchase-related happiness for experiences and possessions, retaining outcome valence, social context and resource constraints.",
		excludedEvidence: [
			"Do not infer that spending more raises happiness or improves mental health.",
			"Do not pool retrospective purchase satisfaction with overall life satisfaction as the same outcome."
		],
		uncertainty: "Publication bias, selective recall and differences in resources limit a universal spending recommendation.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.experiences1,
			sources.experiences2,
			sources.experiences3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "which-online-shopping-features-are-linked-to-impulse-buying",
		title: "Which online shopping features are linked to impulse buying?",
		bottomLine: "Enjoyable browsing, promotions and shopping-platform features are linked to online impulse buying. Most research uses surveys, so these links do not show that one feature caused an individual purchase. Results also vary across markets and shoppers.",
		stableCore: [
			"A synthesis of 75 articles found associations with situational, marketing, shopper and platform factors, using 341 estimates from 139,545 participants.",
			"An earlier social-commerce review found that 83% of its relevant studies used surveys. Another meta-analysis did not find significant relationships for every proposed factor, including price and website security."
		],
		openQuestions: [
			"Which platform changes alter actual unplanned purchases in controlled field studies?",
			"How do budgeting, repeated exposure and different definitions of impulse buying affect results?"
		],
		whatWouldChangeMinds: [
			"Independent randomized field studies measuring completed purchases, later regret and returns.",
			"Replications distinguishing self-reported buying tendencies from observed unplanned transactions."
		],
		misconceptions: [
			"A correlation between a feature and impulse buying does not establish a causal mechanism.",
			"Self-reported buying urges and completed purchases are different outcomes."
		],
		editorSummary: "Promotions and shopping experiences correlate with impulse buying; causal evidence is more limited.",
		population: "Online and social-commerce shoppers in international survey, experimental and review literature.",
		scope: "Assess associations between online shopping features and impulse-buying measures, separating intentions, traits and observed transactions.",
		excludedEvidence: [
			"Do not turn a pooled correlation into a percentage of purchases caused by a design feature.",
			"Do not treat all 68 studies in the social-commerce review as social-commerce-specific experiments."
		],
		uncertainty: "Surveys dominate, definitions differ and overlapping reviews are not independent sets of experiments.",
		band: "broad",
		certainty: "low",
		sources: [
			sources.impulse1,
			sources.impulse2,
			sources.impulse3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "do-environmental-food-labels-change-what-shoppers-choose",
		title: "Do environmental food labels change what shoppers choose?",
		bottomLine: "They can shift choices toward foods labeled as having a lower environmental impact. Evidence is strongest in experimental and simulated shopping. Effects on routine purchases, diets and actual environmental damage are less certain.",
		stableCore: [
			"A review of 56 studies generally favored environmental labels, but 41 studies used hypothetical settings and many had unclear or high risk of bias.",
			"A 1,051-person UK simulated supermarket trial found lower environmental-impact scores for selected baskets. A US experiment changed sustainability ratings more than purchase intentions."
		],
		openQuestions: [
			"How much do labels change repeated purchases with real household budgets?",
			"How do label credibility, price and the accuracy of environmental estimates affect results?"
		],
		whatWouldChangeMinds: [
			"Longer real-store trials measuring actual purchases and independently verified environmental impacts.",
			"Replications across label designs and different food markets."
		],
		misconceptions: [
			"A change in a basket's environmental-score percentile is not the same percentage cut in emissions.",
			"Saying one intends to buy a product does not establish an actual purchase or a measured environmental benefit."
		],
		editorSummary: "Environmental labels influence experimental food choices, with weaker evidence about routine checkout behavior.",
		population: "Shoppers in environmental-label reviews and UK and US online experiments.",
		scope: "Compare environmental labels with perceived sustainability, intentions and food selections, identifying hypothetical versus actual transactions.",
		excludedEvidence: [
			"Do not equate a label's modeled score with measured emissions avoided.",
			"Do not convert purchase-intention effects into verified sales or household dietary changes."
		],
		uncertainty: "Many studies are hypothetical, and label models and real-store responses differ.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.eco1,
			sources.eco2,
			sources.eco3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "do-loyalty-programs-change-customer-buying",
		title: "Do loyalty programs change customer buying?",
		bottomLine: "Loyalty programs are associated with more repeat buying, but they do not affect every customer equally. Changes in spending are clearer than changes in emotional attachment to a brand. Members may also differ from nonmembers before joining.",
		stableCore: [
			"A synthesis of 429 estimates found stronger results for buying behavior than for attitudes. A 2026 review of 78 independent samples also found variation across stages of the customer relationship.",
			"Longitudinal convenience-store data found little purchase change among already-heavy buyers, while initially light and moderate buyers increased their patronage."
		],
		openQuestions: [
			"How much of the member-nonmember gap is caused by joining rather than prior interest?",
			"How do fees, reward restrictions and unused points change the value to customers?"
		],
		whatWouldChangeMinds: [
			"Randomized enrollment offers with long-term purchase and customer-cost records.",
			"Independent comparisons separating new customers, existing frequent buyers and different reward systems."
		],
		misconceptions: [
			"A higher spending rate among members does not prove that the program created the whole difference.",
			"Buying repeatedly from a retailer is not the same as trusting or feeling attached to its brand."
		],
		editorSummary: "Repeat buying is associated with loyalty membership, with variation by program and prior shopping habits.",
		population: "Customers in loyalty-program reviews and longitudinal retail data.",
		scope: "Assess loyalty membership against buying behavior and attitudes, distinguishing member selection and pre-existing purchase patterns.",
		excludedEvidence: [
			"Do not call a comparison of members and nonmembers a randomized enrollment experiment.",
			"Do not interpret retailer loyalty or revenue as a demonstrated financial benefit to every member."
		],
		uncertainty: "Enrollment selection, reward design and earlier shopping habits complicate causal estimates.",
		band: "broad",
		certainty: "low",
		sources: [
			sources.loyalty1,
			sources.loyalty2,
			sources.loyalty3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "does-displaying-a-discount-as-money-or-percent-change-its-appeal",
		title: "Does displaying a discount as money or percent change its appeal?",
		bottomLine: "Yes, the same saving can feel different when shown as an amount of money or a percentage. Money-off offers often look more appealing on higher-priced products, but context matters. Neither format changes the actual amount saved.",
		stableCore: [
			"A synthesis of 19 studies found that responses to money-off discounts differed by price level, product and promotion type.",
			"Three experiments favored money-off descriptions for higher-priced items. A later five-experiment program found some context effects but did not support every predicted interaction."
		],
		openQuestions: [
			"How well do stated preferences predict checkout behavior?",
			"How do numeracy, currency and local price levels change framing effects?"
		],
		whatWouldChangeMinds: [
			"Field experiments comparing mathematically identical offers with actual purchases.",
			"Independent replications across currencies, products and price ranges."
		],
		misconceptions: [
			"A percentage-off label is not inherently a larger discount than a money-off label.",
			"A price threshold used in one experiment is not a universal rule across currencies and products."
		],
		editorSummary: "Discount presentation changes perceived value, with effects shaped by price and context.",
		population: "Consumers evaluating equivalent discount frames in experiments and pricing reviews.",
		scope: "Compare amount-off and percentage-off descriptions of equivalent savings using perceived value, attitudes and purchase intentions.",
		excludedEvidence: [
			"Do not confuse equal framing comparisons with genuinely different discount amounts.",
			"Do not treat a nonsignificant low-price trend as a demonstrated opposite effect."
		],
		uncertainty: "Experiments often measure intentions, and context-specific advantages do not establish one universally better format.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.discount1,
			sources.discount2,
			sources.discount3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "do-prices-ending-in-99-change-buying-decisions",
		title: "Do prices ending in .99 change buying decisions?",
		bottomLine: "They can make a price seem lower, but their effect on buying is small and inconsistent. Recent large experiments found changes in price judgments without reliable changes in purchase intentions. A .99 ending does not by itself identify a bargain.",
		stableCore: [
			"A preregistered synthesis of 69 studies found a small average purchase effect, with substantial variation and publication-bias adjustments that sometimes removed statistical significance.",
			"Two preregistered 2026 experiments involving 729 people found different price impressions and recall, but no reliable purchase-intention or quality-image effects."
		],
		openQuestions: [
			"When do price judgments translate into actual spending?",
			"How do local pricing habits and product categories change left-digit effects?"
		],
		whatWouldChangeMinds: [
			"High-powered field trials comparing near-identical prices and reporting actual purchases.",
			"Replications testing ordinary price ranges with preregistered analyses and null outcomes."
		],
		misconceptions: [
			"A price being underestimated in a memory task does not prove that more people buy it.",
			"A 0.13 standardized effect is not a 13% sales increase."
		],
		editorSummary: "Just-below prices affect some judgments more reliably than they affect purchases.",
		population: "Consumers in price-ending experiments, a 69-study synthesis and two recent preregistered studies.",
		scope: "Assess just-below versus round prices using price image, recall, quality perceptions and buying outcomes, keeping each endpoint distinct.",
		excludedEvidence: [
			"Do not substitute recall errors or a favorable price image for actual demand.",
			"Do not ignore the small monetary difference or publication-bias sensitivity in price-ending comparisons."
		],
		uncertainty: "Effects are heterogeneous, often small and sensitive to publication bias and outcome choice.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.nine1,
			sources.nine2,
			sources.nine3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "can-a-food-health-claim-change-how-healthy-it-seems",
		title: "Can a food health claim change how healthy it seems?",
		bottomLine: "Yes. A claim about one nutrient or health benefit can make a food seem healthier overall and influence choices. Some claims also lead people to underestimate energy content or accept larger portions. A specific claim does not summarize the whole food.",
		stableCore: [
			"A review of 31 papers found that health-related claims often increased product selection, with most evidence coming from artificial settings.",
			"An eleven-study review found healthiness, portion-size and energy judgments could shift. A broader review of 125 articles found that knowledge, price, taste and product context shaped responses."
		],
		openQuestions: [
			"Which claims change actual purchases and total intake over time?",
			"How do clear qualifying information and nutrition literacy affect health-halo judgments?"
		],
		whatWouldChangeMinds: [
			"Independent real-store trials measuring whole-basket purchases and consumption.",
			"Experiments separating the truth of a specific claim from broader assumptions about the food."
		],
		misconceptions: [
			"A true claim about one feature does not establish that a food is preferable on every nutritional measure.",
			"An odds ratio for choosing a claimed product is not a percentage increase in calories or a proven health benefit."
		],
		editorSummary: "Selective nutrition and health claims can create a broader health halo and change food judgments.",
		population: "Adults choosing packaged foods in international claim-labeling experiments and reviews, often in Europe and the US.",
		scope: "Assess selective nutrition and health claims against perceived healthiness, portions and choices, distinguishing these from complete nutrition-rating labels.",
		excludedEvidence: [
			"Do not use consumer persuasion as verification of the advertised medical or nutritional benefit.",
			"Do not turn mainly artificial choice experiments into established long-term dietary effects."
		],
		uncertainty: "Effects depend on the food, claim and shopper; natural-setting evidence is thinner than experimental evidence.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.halo1,
			sources.halo2,
			sources.halo3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "do-celebrity-endorsements-make-products-more-appealing",
		title: "Do celebrity endorsements make products more appealing?",
		bottomLine: "Sometimes. A celebrity can improve attitudes toward a product, but endorsements can also have little effect or backfire. The match, audience, medium and comparison matter. Familiarity or fame does not independently establish product quality.",
		stableCore: [
			"A meta-analysis of 46 studies found positive and negative effects under different conditions. Celebrity endorsements also performed worse than some alternative endorsements, such as quality seals.",
			"Three later studies and research with 430 Turkish consumers found that celebrity-versus-influencer responses differed across formats and media, with some null comparisons."
		],
		openQuestions: [
			"Which effects persist in actual purchases rather than attitudes or intentions?",
			"How do repeated exposure, disclosure and changing public reputations alter responses?"
		],
		whatWouldChangeMinds: [
			"Independent field experiments comparing celebrities with no endorsement and credible alternatives.",
			"Replications across media, products and audiences using completed transactions."
		],
		misconceptions: [
			"A celebrity's endorsement is not an independent product test.",
			"A comparison with an influencer does not by itself show an advantage over an unendorsed advertisement."
		],
		editorSummary: "Celebrity endorsement effects vary by audience, fit, medium and the alternative being compared.",
		population: "Participants in endorsement experiments and surveys, including international meta-analysis and Turkish consumer research.",
		scope: "Compare celebrity endorsements with consumer attitudes and intentions, identifying the comparison endorser and advertising medium.",
		excludedEvidence: [
			"Do not infer actual sales from recall, attitudes or purchase intentions alone.",
			"Do not treat correlational credibility models as randomized evidence or as judgments about demographic groups."
		],
		uncertainty: "Comparators and audiences differ, while much recent evidence concerns attitudes and self-reports.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.celebrity1,
			sources.celebrity2,
			sources.celebrity3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "are-personalized-ads-more-persuasive-than-generic-ads",
		title: "Are personalized ads more persuasive than generic ads?",
		bottomLine: "On average, personalized ads improve attitudes and stated intentions more than generic ads. Effects depend on relevance, context and privacy expectations. Evidence about persuasion does not establish that tracking benefits users or that clicks become purchases.",
		stableCore: [
			"A synthesis of 53 experimental studies found a positive average persuasion effect and a role for perceived relevance.",
			"A social-network field experiment found that personalized ad performance changed after privacy controls changed. A corrected two-study paper distinguishes transparency and surveillance perceptions; its predicted negative surveillance relationship was not supported."
		],
		openQuestions: [
			"How much of the average effect survives across current platforms and actual purchases?",
			"Which privacy controls change outcomes without requiring more personal data?"
		],
		whatWouldChangeMinds: [
			"Independent field trials measuring transactions and user experience with transparent data practices.",
			"Replications separating ad relevance, personalization, targeting and privacy-policy changes."
		],
		misconceptions: [
			"A click or a stated intention is not a completed purchase.",
			"Greater persuasive effect does not establish permission to collect data or show that personalization serves a person's interests."
		],
		editorSummary: "Personalization improves average persuasion measures, with important context and privacy limits.",
		population: "Participants in personalized-ad experiments and social-network field research.",
		scope: "Compare personalized and generic advertising using attitudes, intentions and clicks, distinguishing randomized ad text from concurrent privacy-policy changes.",
		excludedEvidence: [
			"Do not call the platform's privacy-policy change randomized because ad text was randomized.",
			"Do not describe the corrected paper's unsupported surveillance hypothesis as an established negative effect."
		],
		uncertainty: "Attitudes, clicks and purchases differ, and privacy context changes how people respond.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.personalized1,
			sources.personalized2,
			sources.personalized3
		]
	}, novemberConsumerChoicesResearchCheckedAt),
	reviewedEntry({
		topicSlug: "consumer-choices",
		slug: "how-do-free-shipping-offers-affect-online-purchases",
		title: "How do free-shipping offers affect online purchases?",
		bottomLine: "Shipping offers can change whether people order, how much they buy and what they later return. A minimum-spend offer can raise basket size without raising the number of orders. Membership-based free shipping is a different arrangement and can change shopping over time.",
		stableCore: [
			"A randomized seven-policy experiment found that threshold-based free shipping reduced purchase incidence and increased strategic returns, without reducing purchase value.",
			"Other retail data found additional sales under some free-shipping promotions. A membership study found no initial average spending increase, followed by changes in order frequency and spending over time."
		],
		openQuestions: [
			"Which effects generalize across products, delivery costs and household budgets?",
			"How do unwanted add-on purchases, returns and membership fees affect the shopper's total cost?"
		],
		whatWouldChangeMinds: [
			"Independent field experiments measuring net purchases after returns and all customer charges.",
			"Longer studies separating threshold, unconditional and membership-based offers."
		],
		misconceptions: [
			"A larger basket does not necessarily mean more customers ordered or that the shopper spent less overall.",
			"A free-shipping membership comparison is not the same intervention as removing a delivery fee from every order."
		],
		editorSummary: "Shipping policies shift baskets, order frequency and returns in different ways.",
		population: "Online retail customers in randomized shipping-policy experiments and longitudinal transaction datasets.",
		scope: "Compare shipping-fee structures with order incidence, basket value, later returns and membership-related buying patterns.",
		excludedEvidence: [
			"Do not equate pre-return sales with net purchases, profit or customer savings.",
			"Do not treat observational membership enrollment as a randomized offer or combine distinct shipping policies into one effect."
		],
		uncertainty: "Outcomes depend on policy design, product context, returns and the time since enrollment.",
		band: "mixed",
		certainty: "moderate",
		sources: [
			sources.shipping1,
			sources.shipping2,
			sources.shipping3
		]
	}, novemberConsumerChoicesResearchCheckedAt)
];
