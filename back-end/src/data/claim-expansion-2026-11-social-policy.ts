import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberSocialPolicyResearchCheckedAt = "2026-11-07T06:10:26.463Z";

const sources = {
	rankedChoiceGroups: {
		...researchSource("Is Ranked‐Choice Voting Associated With Turnout Across Race/Ethnic Groups?", "Social Science Quarterly", 2025, "https://doi.org/10.1111/ssqu.70025", "10.1111/ssqu.70025", "Corrected 2025 voter-file study of US odd-year local elections. Associations favored turnout for several groups, but city adoption was not randomized and Latino results changed with New York City's coding. The correction changes an author name and removes proportional-comparison wording; it does not establish equal benefits across groups.", "landmark_study", "supports", novemberSocialPolicyResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1111/ssqu.70025",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fssqu.70025&rows=100",
			"https://doi.org/10.1111/ssqu.70044"
		]
	},
	rankedChoiceYouth: researchSource("Ranked Choice Voting and Youth Voter Turnout: The Roles of Campaign Civility and Candidate Contact", "Politics and Governance", 2021, "https://doi.org/10.17645/pag.v9i2.3914", "10.17645/pag.v9i2.3914", "Matched comparison of seven ranked-choice and 14 plurality local elections in 2013–2014. Overall turnout differences were not significant, while younger respondents reported higher participation. Nonrandom city selection and survey measurement limit causal interpretation.", "landmark_study", "debate", novemberSocialPolicyResearchCheckedAt),
	rankedChoiceSanFrancisco: researchSource("Writing the Rules to Rank the Candidates: Examining the Impact of Instant-Runoff Voting on Racial Group Turnout in San Francisco Mayoral Elections", "Journal of Urban Affairs", 2016, "https://doi.org/10.1111/juaf.12209", "10.1111/juaf.12209", "Precinct-level analysis of five San Francisco mayoral elections from 1995–2011 found lower turnout among Black and White voters after instant-runoff adoption. A single city's aggregate trends cannot establish the effect everywhere.", "landmark_study", "debate", novemberSocialPolicyResearchCheckedAt),
	voterIdNationwide: researchSource("Strict Id Laws Don’t Stop Voters: Evidence from a U.S. Nationwide Panel, 2008–2018", "The Quarterly Journal of Economics", 2021, "https://doi.org/10.1093/qje/qjab019", "10.1093/qje/qjab019", "2021 journal article using 1.6 billion voter-election observations from 2008–2018, not 1.6 billion distinct people. Estimated aggregate turnout effects were near zero, but the confidence interval still allowed changes of about three percentage points either way. Net turnout is different from the burden of obtaining identification.", "landmark_study", "debate", novemberSocialPolicyResearchCheckedAt),
	voterIdElectionTiming: researchSource("Strict voter identification laws and turnout: Differential effects by election type and adoption timing", "Research & Politics", 2025, "https://doi.org/10.1177/20531680251401762", "10.1177/20531680251401762", "2025 synthetic difference-in-differences study of US state turnout from 1984–2020. Aggregate effects were not significant; estimates differed between presidential and midterm elections and adoption cohorts. Some positive subgroup estimates were specification-sensitive.", "landmark_study", "debate", novemberSocialPolicyResearchCheckedAt),
	voterIdAdministrativeBurden: researchSource("Who Votes Without Identification? Using Individual‐Level Administrative Data to Measure the Burden of Strict Voter Identification Laws", "Journal of Empirical Legal Studies", 2021, "https://doi.org/10.1111/jels.12283", "10.1111/jels.12283", "Michigan's 2016 affidavit records showed that 0.45% of voters lacked identification at the polling place, often despite holding an active state-issued ID. Minority voters faced greater relative burden. Affidavits were available, so this is not an estimate of turnout loss under a strict no-alternative law.", "landmark_study", "context", novemberSocialPolicyResearchCheckedAt),
	voterIdMinority: researchSource("Voter Identification Laws and the Suppression of Minority Votes", "The Journal of Politics", 2017, "https://doi.org/10.1086/688343", "10.1086/688343", "2017 survey-based analysis reported disproportionate turnout reductions for racial and ethnic minority voters. A published replication disputed its data and model robustness; the original authors replied. Treat the exchange as a methodological disagreement rather than three independent experiments.", "landmark_study", "supports", novemberSocialPolicyResearchCheckedAt),
	voterIdEstimationCritique: researchSource("Obstacles to Estimating Voter ID Laws’ Effect on Turnout", "The Journal of Politics", 2018, "https://doi.org/10.1086/696618", "10.1086/696618", "2018 replication and critique of the 2017 minority-turnout analysis, identifying data and specification problems. It bears on interpretation of that study, not proof that identification requirements impose no burden.", "technical_reference", "debate", novemberSocialPolicyResearchCheckedAt),
	voterIdCritiqueResponse: researchSource("We All Agree: Strict Voter ID Laws Disproportionately Burden Minorities", "The Journal of Politics", 2018, "https://doi.org/10.1086/696617", "10.1086/696617", "2018 response defending the earlier minority-turnout findings and disputing the replication's interpretation. This is part of the same scholarly exchange rather than a new independent causal experiment.", "technical_reference", "context", novemberSocialPolicyResearchCheckedAt),
	schoolMealsReview: researchSource("Universal School Meals and Associations with Student Participation, Attendance, Academic Performance, Diet Quality, Food Security, and Body Mass Index: A Systematic Review", "Nutrients", 2021, "https://doi.org/10.3390/nu13030911", "10.3390/nu13030911", "2021 systematic review of 47 studies from economically developed countries. Meal participation generally increased, while attendance and other outcomes varied; lunch and breakfast-only programs differed. Studies were largely observational and partly overlap later syntheses.", "systematic_review", "supports", novemberSocialPolicyResearchCheckedAt),
	schoolMealsOutcomes: researchSource("Universal Free School Meals and School and Student Outcomes", "JAMA Network Open", 2024, "https://doi.org/10.1001/jamanetworkopen.2024.24082", "10.1001/jamanetworkopen.2024.24082", "2024 US systematic review included six nonrandomized longitudinal studies covering over 11,000 schools. Lunch participation evidence was rated moderate certainty by the review authors; other outcomes had low or very low certainty. Its restricted eligibility explains its smaller study count.", "systematic_review", "supports", novemberSocialPolicyResearchCheckedAt),
	schoolMealsAttendance: researchSource("Does the provision of universal free school meals improve school attendance?", "Economics of Education Review", 2024, "https://doi.org/10.1016/j.econedurev.2024.102597", "10.1016/j.econedurev.2024.102597", "2024 Scottish difference-in-differences study found a large increase in free-meal take-up without a meaningful attendance improvement. Alternative exposure definitions yielded small changes. More children eating school meals does not imply a comparable change in attendance.", "landmark_study", "context", novemberSocialPolicyResearchCheckedAt),
	neighborhoodChildrenWorkingPaper: researchSource("The Effects of Exposure to Better Neighborhoods on Children: New Evidence from the Moving to Opportunity Experiment", "American Economic Review", 2016, "https://doi.org/10.1257/aer.20150572", "10.1257/aer.20150572", "Final 2016 American Economic Review article from the randomized Moving to Opportunity voucher experiment. Younger children had better later economic outcomes; older children did not share the same gains. The fetched working paper is an earlier version, not an independent replication.", "landmark_study", "supports", novemberSocialPolicyResearchCheckedAt),
	neighborhoodLongTerm: researchSource("Long-Term Neighborhood Effects on Low-Income Families: Evidence from Moving to Opportunity", "American Economic Review", 2013, "https://doi.org/10.1257/aer.103.3.226", "10.1257/aer.103.3.226", "2013 follow-up of the same Moving to Opportunity experiment found adult health and wellbeing benefits but no detectable adult economic gains. Distinguish adults' outcomes from the later young-child earnings analysis.", "landmark_study", "context", novemberSocialPolicyResearchCheckedAt),
	neighborhoodExposure: researchSource("The Impacts of Neighborhoods on Intergenerational Mobility I: Childhood Exposure Effects*", "The Quarterly Journal of Economics", 2018, "https://doi.org/10.1093/qje/qjy007", "10.1093/qje/qjy007", "Final 2018 Quarterly Journal of Economics paper using over seven million US moving families. Sibling, timing and displacement analyses support childhood exposure effects. This is separate from the voucher experiment, but moving was not randomly assigned in the administrative study.", "landmark_study", "supports", novemberSocialPolicyResearchCheckedAt),
	financialEducationCausal: researchSource("Financial education affects financial knowledge and downstream behaviors", "Journal of Financial Economics", 2022, "https://doi.org/10.1016/j.jfineco.2021.09.022", "10.1016/j.jfineco.2021.09.022", "Final 2022 journal meta-analysis of 76 randomized experiments involving over 160,000 people found average improvements in knowledge and financial behavior. Its earlier NBER version describes the same synthesis. Program effects vary and do not guarantee wealth or investment returns.", "meta_analysis", "supports", novemberSocialPolicyResearchCheckedAt),
	financialEducationEarlier: researchSource("Financial Literacy, Financial Education, and Downstream Financial Behaviors", "Management Science", 2014, "https://doi.org/10.1287/mnsc.2013.1849", "10.1287/mnsc.2013.1849", "2014 synthesis of 201 studies in 168 papers found weak behavioral effects and decay over time. Its evidence mix differs from later randomized-only work. It remains relevant to durability and the gap between test knowledge and real decisions.", "meta_analysis", "debate", novemberSocialPolicyResearchCheckedAt),
	financialEducationSchools: researchSource("Financial education in schools: A meta-analysis of experimental studies", "Economics of Education Review", 2020, "https://doi.org/10.1016/j.econedurev.2019.101930", "10.1016/j.econedurev.2019.101930", "2020 synthesis of 37 school-based experiments and quasi-experiments found larger knowledge gains than behavior changes. The reported standardized effects were about 0.33 and 0.07 respectively; neither is a percentage increase in income.", "meta_analysis", "supports", novemberSocialPolicyResearchCheckedAt),
	retirementDefaultsDynamics: researchSource("Default Options and Retirement Saving Dynamics", "American Economic Review", 2025, "https://doi.org/10.1257/aer.20210881", "10.1257/aer.20210881", "2025 journal study of over 100 US retirement plans and a UK panel. Automatic enrollment raised short-run participation and contributions, but gains attenuated by 36 months. A separate lifetime model is a projection rather than observed retirement wealth.", "landmark_study", "supports", novemberSocialPolicyResearchCheckedAt),
	retirementSmallerEffects: researchSource("Smaller than We Thought? The Effect of Automatic Savings Policies", "National Bureau of Economic Research", 2024, "https://doi.org/10.3386/w32828", "10.3386/w32828", "2024 NBER working paper on nine 401(k) plans. Job exits, withdrawals, vesting and escalation opt-outs reduced estimated longer-run gains. Clearly identified working-paper evidence, not a peer-reviewed journal publication.", "technical_reference", "debate", novemberSocialPolicyResearchCheckedAt),
	paydayCosts: researchSource("The Real Costs of Credit Access: Evidence from the Payday Lending Market*", "The Quarterly Journal of Economics", 2011, "https://doi.org/10.1093/qje/qjq009", "10.1093/qje/qjq009", "2011 US geographic quasi-experiment associated payday access with difficulty paying essential bills. It measures household hardship rather than all dimensions of welfare or every present-day regulated lending market.", "landmark_study", "debate", novemberSocialPolicyResearchCheckedAt),
	paydayCreditAccess: researchSource("How Payday Credit Access Affects Overdrafts and Other Outcomes", "Journal of Money, Credit and Banking", 2012, "https://doi.org/10.1111/j.1538-4616.2011.00499.x", "10.1111/j.1538-4616.2011.00499.x", "2012 US study found that payday bans increased returned checks and overdraft-fee income, alongside less clear movements in bankruptcy and complaints. The substitution between borrowing options complicates claims about total welfare.", "landmark_study", "context", novemberSocialPolicyResearchCheckedAt),
	paydayUnitedKingdom: researchSource("How Do Payday Loans Affect Borrowers? Evidence from the U.K. Market", "The Review of Financial Studies", 2019, "https://doi.org/10.1093/rfs/hhy090", "10.1093/rfs/hhy090", "2019 journal issue, first published online in 2018. UK lender-threshold analysis found immediate liquidity benefits but later increases in defaults and overdraft problems. Effects near approval cutoffs and the historical market do not describe every borrower or current product.", "landmark_study", "debate", novemberSocialPolicyResearchCheckedAt),
	decriminalizationReview: researchSource("Impact evaluations of drug decriminalisation and legal regulation on drug use, health and social harms: a systematic review", "BMJ Open", 2020, "https://doi.org/10.1136/bmjopen-2019-035148", "10.1136/bmjopen-2019-035148", "2020 systematic review of 114 evaluations, dominated by US cannabis reforms and legal regulation. The authors found sparse evidence on wider social and health outcomes. Those studies cannot establish the overdose effect of decriminalizing possession of all drugs.", "systematic_review", "context", novemberSocialPolicyResearchCheckedAt),
	decriminalizationEarlyOregon: researchSource("Does drug decriminalization increase unintentional drug overdose deaths?", "Journal of Health Economics", 2023, "https://doi.org/10.1016/j.jhealeco.2023.102798", "10.1016/j.jhealeco.2023.102798", "2023 synthetic-control analysis estimated higher unintentional overdose mortality in Oregon in 2021. Later work disputes attribution and treatment of changing fentanyl supply. Model-based excess-death estimates are not individually identified deaths caused by a law.", "landmark_study", "supports", novemberSocialPolicyResearchCheckedAt),
	decriminalizationFentanyl: {
		...researchSource("Drug Decriminalization, Fentanyl, and Fatal Overdoses in Oregon", "JAMA Network Open", 2024, "https://doi.org/10.1001/jamanetworkopen.2024.31612", "10.1001/jamanetworkopen.2024.31612", "2024 Oregon analysis found that adjustment for fentanyl spread removed the statistically significant mortality association. The drug-supply proxy and its assumed causal role remain limitations. An October correction removed erroneous percent symbols from figure axes; rates are deaths per population, not percentages.", "landmark_study", "debate", novemberSocialPolicyResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1001/jamanetworkopen.2024.31612",
			"https://api.crossref.org/works?filter=updates%3A10.1001%2Fjamanetworkopen.2024.31612&rows=100",
			"https://doi.org/10.1001/jamanetworkopen.2024.43755"
		]
	},
	decriminalizationRecentSynthetic: researchSource("Did Drug Decriminalization Increase Overdoses", "National Bureau of Economic Research", 2026, "https://doi.org/10.3386/w35427", "10.3386/w35427", "July 2026 NBER working paper reported higher overdose mortality and lower arrests in Oregon and Washington. It challenges the fentanyl-share adjustment used in earlier work. Working-paper status and overlapping state data limit its independence and certainty.", "technical_reference", "supports", novemberSocialPolicyResearchCheckedAt),
	decriminalizationOpioidEstimate: researchSource("Estimated effect of decriminalization on opioid overdose mortality rates in Oregon, USA", "Academia Global and Public Health", 2026, "https://doi.org/10.20935/acadphealth8252", "10.20935/acadphealth8252", "2026 journal study used changepoint and neighboring-state comparisons and found no significant opioid mortality effect attributable to Oregon's policy. Outcomes, comparison states and identification assumptions differ from the all-drug synthetic-control analyses.", "landmark_study", "debate", novemberSocialPolicyResearchCheckedAt),
	proceduralJusticeReview: researchSource("Procedural justice and police legitimacy: a systematic review of the research evidence", "Journal of Experimental Criminology", 2013, "https://doi.org/10.1007/s11292-013-9175-2", "10.1007/s11292-013-9175-2", "2013 systematic review of dialogue-based policing interventions found improvements in satisfaction, confidence and cooperation. Its pooled police-legitimacy result was positive but not statistically significant; the outcomes should not be interchanged.", "systematic_review", "debate", novemberSocialPolicyResearchCheckedAt),
	proceduralJusticeMeta: researchSource("A systematic review and meta-analysis of procedural justice and legitimacy in policing: the effect of social identity and social contexts", "Journal of Experimental Criminology", 2025, "https://doi.org/10.1007/s11292-023-09595-5", "10.1007/s11292-023-09595-5", "2025 print issue, first online in 2023. Synthesis of 123 studies and 200,966 participants found correlations between procedural justice, identity and police legitimacy. Association and statistical mediation do not independently establish a causal training effect.", "meta_analysis", "context", novemberSocialPolicyResearchCheckedAt),
	proceduralJusticeTrial: researchSource("Reforming the police through procedural justice training: A multicity randomized trial at crime hot spots", "Proceedings of the National Academy of Sciences", 2022, "https://doi.org/10.1073/pnas.2118780119", "10.1073/pnas.2118780119", "2022 randomized field trial in 120 crime hot spots across three US cities. Intensive training improved observed conduct and some perceptions of harassment, but resident legitimacy measures did not show a significant benefit. Crime and conduct findings are separate outcomes.", "landmark_study", "debate", novemberSocialPolicyResearchCheckedAt),
	compulsoryVotingCrossNational: researchSource("Is compulsory voting a solution to low and declining turnout? Cross-national evidence since 1945", "Political Science Research and Methods", 2024, "https://doi.org/10.1017/psrm.2022.57", "10.1017/psrm.2022.57", "2024 journal issue, first online in 2022. Cross-national analysis since 1945 found that enforcement and state capacity shaped turnout differences. Country-level adjustment cannot eliminate every difference between political systems.", "landmark_study", "supports", novemberSocialPolicyResearchCheckedAt),
	compulsoryVotingAustria: researchSource("Compulsory voting, turnout, and government spending: Evidence from Austria", "Journal of Public Economics", 2017, "https://doi.org/10.1016/j.jpubeco.2016.10.002", "10.1016/j.jpubeco.2016.10.002", "2017 journal article, first online in 2016. Austrian changes from 1949–2010 were associated with turnout gains around ten percentage points despite weakly enforced fines. The same analysis found no detectable change in spending or electoral outcomes.", "landmark_study", "supports", novemberSocialPolicyResearchCheckedAt),
	compulsoryVotingEnforcement: researchSource("Voter turnout and abstention pricing: quasi-experimental evidence on the effects of a marginal increase in the monetary enforcement of compulsory voting", "Journal of Elections, Public Opinion and Parties", 2023, "https://doi.org/10.1080/17457289.2021.1994579", "10.1080/17457289.2021.1994579", "Swiss quasi-experiment found a temporary turnout increase after higher nonvoting fines. Some additional ballots were blank or invalid, and responses differed by income. Participation counts do not establish informed preferences or equal representation.", "landmark_study", "supports", novemberSocialPolicyResearchCheckedAt)
};

export const novemberSocialPolicyClaims = [
	reviewedEntry({
		topicSlug: "public-policy-and-safety",
		slug: "does-ranked-choice-voting-increase-voter-turnout",
		title: "Does ranked-choice voting increase voter turnout?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Some studies find higher turnout under ranked-choice voting, but the effect varies by place and election. The available comparisons do not establish a dependable increase everywhere.",
		stableCore: [
			"Research on US local elections has produced positive, null and negative turnout findings.",
			"Campaign activity, election timing and which cities adopt the system can affect comparisons.",
			"A corrected national study found group differences that changed with how New York City was classified."
		],
		openQuestions: [
			"How much of an observed increase comes from the ballot system itself rather than adoption campaigns?",
			"Do changes persist across many election cycles and settings?"
		],
		whatWouldChangeMinds: [
			"Consistent before-and-after results with credible comparison cities and turnout measured the same way.",
			"Replications that separate ballot rules from election timing and campaign mobilization."
		],
		misconceptions: [
			"A turnout association in adopting cities proves the same causal benefit in every election."
		],
		editorSummary: "Local turnout evidence depends on the comparison being made.",
		population: "US municipal elections, with especially limited evidence beyond those settings.",
		scope: "Assess turnout under ranked-choice versus plurality voting; distinguish local adoption, surveys and administrative voter files.",
		excludedEvidence: [
			"Candidate diversity, voter satisfaction and ballot exhaustion do not measure the same outcome as turnout.",
			"Related analyses and two voter-file samples do not automatically provide independent policy experiments."
		],
		uncertainty: "Adoption is not randomized, studies cover different elections, and subgroup results can change with coding decisions.",
		sources: [sources.rankedChoiceGroups, sources.rankedChoiceYouth, sources.rankedChoiceSanFrancisco]
	}, novemberSocialPolicyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "public-policy-and-safety",
		slug: "do-strict-voter-id-laws-reduce-turnout",
		title: "Do strict voter ID laws reduce turnout?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "US studies often find small average turnout changes, with differences across elections and groups. Identification requirements can still burden voters even when the estimated net turnout change is near zero.",
		stableCore: [
			"A large national panel estimated near-zero average effects, while allowing meaningful uncertainty.",
			"More recent analysis found effects that differed by election type and adoption timing.",
			"Records of voters arriving without ID measure an access burden, not by themselves how many people a strict law deters."
		],
		openQuestions: [
			"Which voters change participation after identification requirements change?",
			"How do administration, assistance and mobilization alter longer-run effects?"
		],
		whatWouldChangeMinds: [
			"Replicated designs that track actual requirements, eligible populations and changes in turnout.",
			"Administrative evidence that separates difficulty obtaining ID from changes in completed voting."
		],
		misconceptions: [
			"An average turnout estimate near zero means no voter faces an identification barrier."
		],
		editorSummary: "Net participation and the burden of meeting a rule are separate measurements.",
		population: "Historical US state elections; requirements and alternatives differ across jurisdictions.",
		scope: "Assess strict identification requirements and turnout, while distinguishing administrative burdens and disputed survey-based estimates.",
		excludedEvidence: [
			"This evidence summary is not a statement of current identification requirements for any election.",
			"Fraud, partisan advantage and normative judgments require separate evidence and questions."
		],
		uncertainty: "Laws, implementation and election contexts differ. Some prominent subgroup findings remain methodologically disputed.",
		sources: [
			sources.voterIdNationwide,
			sources.voterIdElectionTiming,
			sources.voterIdAdministrativeBurden,
			sources.voterIdMinority,
			sources.voterIdEstimationCritique,
			sources.voterIdCritiqueResponse
		]
	}, novemberSocialPolicyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "do-universal-free-school-meals-increase-meal-participation",
		title: "Do universal free school meals increase meal participation?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes. Making school meals free for all pupils generally increases the number eating those meals. Evidence is clearer for participation than for attendance, test scores or longer-term health.",
		stableCore: [
			"A recent US review found increased lunch participation across the eligible longitudinal studies.",
			"An international review reached a similar overall conclusion, although programs and evidence quality differed.",
			"A Scottish study found greater meal take-up without a meaningful attendance gain."
		],
		openQuestions: [
			"How do nutrition standards and program design affect diet and longer-term outcomes?",
			"Which benefits persist across income groups and different school systems?"
		],
		whatWouldChangeMinds: [
			"Consistent participation declines in well-measured, comparable universal programs.",
			"Longer follow-up that separates access, actual consumption, meal quality and health."
		],
		misconceptions: [
			"An increase in school-meal use establishes an equal improvement in attendance or academic results."
		],
		editorSummary: "The clearest finding concerns access and meal use.",
		population: "Schoolchildren in the studied high-income countries, including US lunch programs and Scottish primary schools.",
		scope: "Compare universal free provision with means-tested or paid access, using meal participation as the primary outcome.",
		excludedEvidence: [
			"Breakfast-only and lunch programs may have different effects.",
			"Overlapping studies in different reviews are not independent replications."
		],
		uncertainty: "Most evaluations are nonrandomized; evidence for outcomes beyond meal participation is less certain.",
		sources: [sources.schoolMealsOutcomes, sources.schoolMealsReview, sources.schoolMealsAttendance]
	}, novemberSocialPolicyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "economics-and-social-policy",
		slug: "does-growing-up-in-a-lower-poverty-neighborhood-improve-later-earnings",
		title: "Does growing up in a lower-poverty neighborhood improve later earnings?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "It can. US research finds better adult earnings for children who spend more of childhood in higher-opportunity neighborhoods. Benefits depend on age, destination and the circumstances of a move.",
		stableCore: [
			"A randomized voucher offer improved later outcomes for children who were young when their families moved.",
			"Older children and adults did not show the same economic gains in that experiment.",
			"A separate study of more than seven million moving families also supports the importance of childhood exposure."
		],
		openQuestions: [
			"Which neighborhood features produce the gains?",
			"How can families move without disrupting support networks or schooling?"
		],
		whatWouldChangeMinds: [
			"Independent long-term experiments showing no meaningful childhood exposure benefit across settings.",
			"Better evidence separating schools, safety, networks and other features of destinations."
		],
		misconceptions: [
			"Moving to any lower-poverty area benefits every family member in the same way."
		],
		editorSummary: "Age and years of childhood exposure matter.",
		population: "US families in the Moving to Opportunity experiment and large administrative studies of moving families.",
		scope: "Assess children's later earnings and childhood neighborhood exposure, distinguishing randomized offers from nonrandom moves.",
		excludedEvidence: [
			"Adult health improvements are not evidence of an adult earnings increase.",
			"Different reports from the same voucher experiment are follow-ups, not independent trials."
		],
		uncertainty: "Voucher offers and actual moves differ; destinations bundle many features, and effects need not transfer unchanged to other countries.",
		sources: [sources.neighborhoodChildrenWorkingPaper, sources.neighborhoodExposure, sources.neighborhoodLongTerm]
	}, novemberSocialPolicyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "economics-and-social-policy",
		slug: "does-financial-education-improve-financial-behavior",
		title: "Does financial education improve financial behavior?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "On average, well-tested programs can improve financial decisions, usually by a modest amount. Gains in knowledge are generally easier to achieve than lasting changes in behavior.",
		stableCore: [
			"A 2022 synthesis of randomized experiments found average improvements in knowledge and financial behavior.",
			"School-based research found much larger knowledge gains than behavior changes.",
			"Earlier research found weak, fading effects, highlighting the importance of design and follow-up."
		],
		openQuestions: [
			"Which teaching approaches produce durable behavior changes?",
			"How do effects differ when people lack income, affordable products or time to act?"
		],
		whatWouldChangeMinds: [
			"Large replications showing no lasting behavioral benefit despite good implementation.",
			"Long-term studies with independently measured outcomes and realistic program costs."
		],
		misconceptions: [
			"A higher financial-literacy test score guarantees more wealth or better investment returns."
		],
		editorSummary: "Useful learning and durable behavior change are different outcomes.",
		population: "Adults and school pupils in evaluated programs across several countries.",
		scope: "Prioritize experiments on financial education and downstream behavior, distinguishing knowledge scores and observational literacy associations.",
		excludedEvidence: [
			"The same meta-analysis's working-paper and journal versions count as one synthesis.",
			"Education does not remove income constraints or establish the quality of any financial product."
		],
		uncertainty: "Programs, populations and follow-up periods vary, and research syntheses include overlapping studies.",
		sources: [sources.financialEducationCausal, sources.financialEducationSchools, sources.financialEducationEarlier]
	}, novemberSocialPolicyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "economics-and-social-policy",
		slug: "does-automatic-retirement-enrollment-increase-saving",
		title: "Does automatic retirement enrollment increase saving?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Automatic enrollment usually increases early participation and contributions. Its effect on longer-term savings is smaller because people can opt out, change jobs or withdraw money.",
		stableCore: [
			"Recent US and UK data confirm an early participation benefit that weakens over several years.",
			"Contributions do not equal net savings after withdrawals, vesting rules and job changes.",
			"Longer-run projections depend on assumptions beyond the observed follow-up."
		],
		openQuestions: [
			"Which default rates and withdrawal rules produce durable net saving?",
			"How do effects differ for workers with low balances or frequent job changes?"
		],
		whatWouldChangeMinds: [
			"Long follow-up of total household wealth showing much larger or smaller gains than current estimates.",
			"Replications separating employer-plan balances, other saving and debt."
		],
		misconceptions: [
			"More people enrolled means an equally large increase in lifetime retirement wealth."
		],
		editorSummary: "Participation is easier to measure than lifetime net saving.",
		population: "Workers in studied US employer retirement plans and a UK household panel.",
		scope: "Assess automatic enrollment versus opting in, separating participation, contributions and sustained net savings.",
		excludedEvidence: [
			"Automatic contribution escalation is related but distinct from initial enrollment.",
			"A life-cycle model is not observed lifetime wealth, and working papers retain their publication status."
		],
		uncertainty: "Long-run outcomes depend on withdrawals, employee turnover, plan rules and model assumptions.",
		sources: [sources.retirementDefaultsDynamics, sources.retirementSmallerEffects]
	}, novemberSocialPolicyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "economics-and-social-policy",
		slug: "does-access-to-payday-loans-improve-borrowers-finances",
		title: "Does access to payday loans improve borrowers' finances?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Payday loans can cover an immediate cash shortage, but evidence also links them to later financial problems. Overall effects depend on borrowing costs, alternatives and the market being studied.",
		stableCore: [
			"Some US research found greater difficulty paying essential bills where payday credit was available.",
			"Other US research found that bans pushed some borrowers toward overdrafts and returned checks.",
			"UK threshold-based research found short-lived liquidity gains followed by more defaults and overdraft problems."
		],
		openQuestions: [
			"How do current price caps and affordable alternatives change outcomes?",
			"Which borrowers gain or lose over longer follow-up?"
		],
		whatWouldChangeMinds: [
			"Replicated comparisons measuring total costs, essential spending and later hardship under current rules.",
			"Evidence that separates a temporary cash benefit from repeated borrowing and default."
		],
		misconceptions: [
			"Access to an extra loan, or a ban on that loan, guarantees improved household finances."
		],
		editorSummary: "Immediate cash access and longer-term financial health can move differently.",
		population: "Borrowers and households in historical US and UK studies.",
		scope: "Assess access to short-term high-cost payday credit using hardship, substitution and credit-file outcomes.",
		excludedEvidence: [
			"Historical findings do not establish the safety of any current lender or product.",
			"Approval-cutoff estimates apply most directly to marginal applicants, not every borrower."
		],
		uncertainty: "Regulation, alternatives and borrower circumstances differ, and the studies measure different parts of financial wellbeing.",
		sources: [sources.paydayCosts, sources.paydayCreditAccess, sources.paydayUnitedKingdom]
	}, novemberSocialPolicyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "public-policy-and-safety",
		slug: "did-oregons-drug-decriminalization-increase-overdose-deaths",
		title: "Did Oregon's drug decriminalization increase overdose deaths?",
		band: "mixed",
		certainty: "low",
		bottomLine: "Research has not settled how much Oregon's policy changed overdose deaths. Studies reach different conclusions depending on comparison states, follow-up and how they account for the changing drug supply.",
		stableCore: [
			"Deaths rose after the 2021 policy, but timing alone cannot identify its effect.",
			"Published analyses disagree, and a 2026 working paper challenges how earlier studies adjusted for fentanyl.",
			"Removing possession penalties, expanding treatment and legally regulating supply are different interventions."
		],
		openQuestions: [
			"How well do drug-seizure measures capture changes in the underlying supply?",
			"Which comparison areas and follow-up periods give credible estimates?"
		],
		whatWouldChangeMinds: [
			"Independent replications that explain the conflicting estimates using transparent models and data.",
			"Better measures of supply changes and treatment implementation over longer follow-up."
		],
		misconceptions: [
			"An increase after a policy proves the policy caused it, or an adjusted nonsignificant result proves there was no effect."
		],
		editorSummary: "The main disagreement concerns causal attribution.",
		population: "Oregon and comparison US states during the studied 2021–2023 policy period.",
		scope: "Assess historical overdose mortality attribution; distinguish drug types, supply changes, comparison methods and peer-reviewed versus working-paper evidence.",
		excludedEvidence: [
			"This historical evidence summary does not state current possession law.",
			"Cannabis legalization studies and changes in arrests do not establish all-drug overdose effects."
		],
		uncertainty: "There is one treated state, imperfect supply measures, overlapping underlying data and conflicting identification assumptions.",
		sources: [
			sources.decriminalizationEarlyOregon,
			sources.decriminalizationFentanyl,
			sources.decriminalizationOpioidEstimate,
			sources.decriminalizationRecentSynthetic,
			sources.decriminalizationReview
		]
	}, novemberSocialPolicyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "public-policy-and-safety",
		slug: "does-procedural-justice-training-increase-trust-in-police",
		title: "Does procedural justice training increase trust in police?",
		band: "mixed",
		certainty: "moderate",
		bottomLine: "Fair, respectful police interactions can improve some public perceptions, but training has not consistently increased broader trust or perceived legitimacy. Improvements in conduct and trust need separate measurement.",
		stableCore: [
			"A review found benefits for several public-perception outcomes, with an inconclusive legitimacy result.",
			"A large later synthesis found correlations between fairness and legitimacy; those are not randomized training effects.",
			"A three-city trial improved observed conduct and perceptions of harassment without a significant legitimacy gain."
		],
		openQuestions: [
			"Which training and supervision approaches produce durable trust across communities?",
			"How do direct encounters and wider institutional experience affect results?"
		],
		whatWouldChangeMinds: [
			"Replicated long-term trials with predefined trust and legitimacy measures.",
			"Evidence distinguishing changes in observed conduct from changes in residents' broader beliefs."
		],
		misconceptions: [
			"A correlation between fair treatment and legitimacy proves any training course will increase trust."
		],
		editorSummary: "Better conduct and broader institutional trust are related, distinct outcomes.",
		population: "Studied police-community interventions, including US high-crime street segments.",
		scope: "Assess training and dialogue interventions, distinguishing satisfaction, harassment perceptions, legitimacy and observational associations.",
		excludedEvidence: [
			"Arrest and crime changes are not interchangeable with trust outcomes.",
			"Statistical mediation in observational data is not a demonstrated causal mechanism."
		],
		uncertainty: "Interventions, measurement scales, settings and follow-up differ; community legitimacy effects remain less consistent.",
		sources: [sources.proceduralJusticeReview, sources.proceduralJusticeMeta, sources.proceduralJusticeTrial]
	}, novemberSocialPolicyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "public-policy-and-safety",
		slug: "does-compulsory-voting-increase-turnout",
		title: "Does compulsory voting increase turnout?",
		band: "broad",
		certainty: "moderate",
		bottomLine: "Yes, especially where the requirement is enforced. The size and durability of the increase depend on the system, and higher turnout does not necessarily mean more valid votes or equal representation.",
		stableCore: [
			"Cross-national research finds that enforcement and state capacity matter.",
			"Austrian rule changes were associated with turnout gains of about ten percentage points.",
			"A Swiss fine increase raised participation temporarily, with some extra ballots left blank or invalid."
		],
		openQuestions: [
			"How do different enforcement approaches affect sustained participation and unequal burdens?",
			"When do higher participation rates improve meaningful representation?"
		],
		whatWouldChangeMinds: [
			"Consistent well-controlled evidence of no turnout gain under genuinely enforced requirements.",
			"Replications tracking valid ballots, participation and distributional effects separately."
		],
		misconceptions: [
			"Higher turnout alone proves more informed voting or a specific policy outcome."
		],
		editorSummary: "Enforcement and the definition of participation matter.",
		population: "Historical electoral systems in cross-national, Austrian and Swiss studies.",
		scope: "Assess compulsory-voting requirements and turnout, with enforcement, valid ballots and setting made explicit.",
		excludedEvidence: [
			"Historical effects are not a description of current voting duties in any jurisdiction.",
			"A turnout estimate does not by itself establish the desirability of a policy."
		],
		uncertainty: "Cross-country comparisons are confounded, and single-country reforms need not transfer to every electoral system.",
		sources: [sources.compulsoryVotingCrossNational, sources.compulsoryVotingAustria, sources.compulsoryVotingEnforcement]
	}, novemberSocialPolicyResearchCheckedAt)
];
