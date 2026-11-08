import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberSchoolsFamilyResearchCheckedAt = "2026-11-08T19:14:17.253Z";

const sources = {
	montessori1: researchSource("Montessori education's impact on academic and nonacademic outcomes: A systematic review", "Campbell Systematic Reviews: Better Evidence for a Better World", 2023, "https://doi.org/10.1002/cl2.1330", "10.1002/cl2.1330", "2023 Campbell synthesis of 32 studies and 204 effects finds modest average academic benefits. Its search ends in February 2020; 132,249 data points are not necessarily distinct children. Evidence quality varies by outcome, and publication bias is possible.", "meta_analysis", "supports", novemberSchoolsFamilyResearchCheckedAt),
	montessori2: researchSource("The Montessori Method Under Scrutiny: A Meta-Analytic and Metascientific Review for Greater Transparency in Education Research", "Review of Educational Research", 2026, "https://doi.org/10.3102/00346543261458396", "10.3102/00346543261458396", "2026 preregistered review identifies 198 studies, with 114 usable quantitatively. Positive pooled learning effects have substantial heterogeneity, small-study effects, publication bias and implementation-reporting limits. Large average estimates are not robust proof of a general Montessori advantage.", "meta_analysis", "debate", novemberSchoolsFamilyResearchCheckedAt),
	montessori3: researchSource("Montessori Preschool Elevates and Equalizes Child Outcomes: A Longitudinal Study", "Frontiers in Psychology", 2017, "https://doi.org/10.3389/fpsyg.2017.01783", "10.3389/fpsyg.2017.01783", "Lottery-admission study follows 141 children in two US public Montessori preschools for three years. Academic and some social outcomes improved, but the small set of schools and alternative school experiences limit transfer to all Montessori settings.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	montessori4: researchSource("Early Montessori education shows delayed benefits for mathematical problem-solving in a 5-year longitudinal randomized controlled trial", "Scientific Reports", 2025, "https://doi.org/10.1038/s41598-025-27687-2", "10.1038/s41598-025-27687-2", "2025 follow-up of an adapted French Montessori trial tests 97 children at ages 10–11. The earlier reading difference faded while a later mathematical problem-solving difference appeared. This is a follow-up of an earlier experiment, not an independent new preschool trial.", "landmark_study", "context", novemberSchoolsFamilyResearchCheckedAt),
	phones1: researchSource("To Ban or Not to Ban? A Rapid Review on the Impact of Smartphone Bans in Schools on Social Well-Being and Academic Performance", "Education Sciences", 2024, "https://doi.org/10.3390/educsci14080906", "10.3390/educsci14080906", "2024 rapid review pools five quantitative studies. The small combined effect includes social and academic outcomes and is more pronounced for social wellbeing. It is not a pooled test-score effect or strong proof that every ban improves grades.", "meta_analysis", "supports", novemberSchoolsFamilyResearchCheckedAt),
	phones2: researchSource("Evidence for and against banning mobile phones in schools: A scoping review", "Journal of Psychologists and Counsellors in Schools", 2024, "https://doi.org/10.1177/20556365241270394", "10.1177/20556365241270394", "2024 scoping review includes 22 studies and finds no randomized controlled trials. Different partial and complete bans, populations, outcomes and study designs make a single academic-effect estimate difficult to defend.", "systematic_review", "context", novemberSchoolsFamilyResearchCheckedAt),
	phones3: researchSource("Smartphone Bans, Student Outcomes and Mental Health", "Journal of Human Resources", 2026, "https://doi.org/10.3368/jhr.0224-13403r2", "10.3368/jhr.0224-13403r2", "2026 middle-school event study reports no average education or mental-health effect, alongside gains in girls' grades and academic placement and some bullying and healthcare outcomes. Subgroup findings do not establish a benefit for every pupil.", "landmark_study", "context", novemberSchoolsFamilyResearchCheckedAt),
	phones4: researchSource("“Phones off while school's on”: Evaluating problematic phone use and the social, wellbeing, and academic effects of banning phones in schools", "Journal of Behavioral Addictions", 2024, "https://doi.org/10.1556/2006.2024.00058", "10.1556/2006.2024.00058", "Preregistered South Australian study follows pupils in five secondary schools for one month. Ban and comparison groups did not differ significantly in problematic phone use, academic engagement or school belonging; bullying fell in both groups. Engagement is not a test-score measure.", "landmark_study", "debate", novemberSchoolsFamilyResearchCheckedAt),
	parent1: researchSource("Parental Technology Use in a Child’s Presence and Health and Development in the Early Years", "JAMA Pediatrics", 2025, "https://doi.org/10.1001/jamapediatrics.2025.0682", "10.1001/jamapediatrics.2025.0682", "2025 synthesis of 21 studies and 14,900 participants in ten countries finds small associations between parents' technology use near children under five and several developmental outcomes. No included study addressed motor development, physical activity or sleep; associations do not establish causality.", "meta_analysis", "supports", novemberSchoolsFamilyResearchCheckedAt),
	parent3: researchSource("Smartphones in the nursery: Parental smartphone use and parental sensitivity and responsiveness within parent–child interaction in early childhood (0–5 years): A scoping review", "Infant Mental Health Journal", 2021, "https://doi.org/10.1002/imhj.21908", "10.1002/imhj.21908", "2021 scoping review of 12 studies concerns parental sensitivity and responsiveness with children aged 0–5. Absorption in a device may differ from a brief interruption. The review calls for stronger longitudinal research and does not establish a harmful threshold.", "systematic_review", "supports", novemberSchoolsFamilyResearchCheckedAt),
	parent2: researchSource("Parental Technoference and Child Problematic Media Use: Meta-Analysis", "Journal of Medical Internet Research", 2025, "https://doi.org/10.2196/57636", "10.2196/57636", "2025 synthesis of 53 studies and 60,555 participants links parental technoference with problematic media use. The mean participant age was 13.84, unlike the preschool development literature. Associations were stronger in cross-sectional than longitudinal studies.", "meta_analysis", "context", novemberSchoolsFamilyResearchCheckedAt),
	parent4: researchSource("Effect of parent-focused interventions for screen use on developmental outcomes in young children: a systematic review and meta-analysis", "International Journal of Behavioral Nutrition and Physical Activity", 2026, "https://doi.org/10.1186/s12966-026-01919-8", "10.1186/s12966-026-01919-8", "2026 review includes ten parent-focused screen interventions, eight pooled with 1,776 participants. Most target children's screen duration; they do not isolate the effect of parents' own phone use. Some social and behavioral benefits therefore provide indirect context only.", "meta_analysis", "context", novemberSchoolsFamilyResearchCheckedAt),
	custody1: researchSource("Systematic review and theoretical comparison of children’s outcomes in post-separation living arrangements", "PLOS ONE", 2023, "https://doi.org/10.1371/journal.pone.0288112", "10.1371/journal.pone.0288112", "2023 review of 39 studies compares post-separation living arrangements across several child outcomes. Shared-care groups often fared better than sole-care groups, but resources, family relationships and selection into arrangements complicate causal interpretation.", "systematic_review", "supports", novemberSchoolsFamilyResearchCheckedAt),
	custody2: researchSource("Joint Physical Custody and Children’s Physical and Mental Health", "Child & Youth Care Forum", 2025, "https://doi.org/10.1007/s10566-025-09863-7", "10.1007/s10566-025-09863-7", "2025 Wisconsin survey compares 374 mothers reporting shared or sole placement. Better reported mental health in shared care persisted in weighted and regression analyses, but measured adjustment cannot eliminate all family selection or establish suitability for an individual child.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	custody3: researchSource("Children’s well-being in sole and joint physical custody families.", "Journal of Family Psychology", 2022, "https://doi.org/10.1037/fam0000875", "10.1037/fam0000875", "2022 German analysis includes up to 1,161 children aged 2–14. Apparent shared-custody advantages disappeared after adjustment including family relationships. The observational design cannot establish that a particular time split causes wellbeing.", "landmark_study", "debate", novemberSchoolsFamilyResearchCheckedAt),
	custody4: researchSource("Joint Physical Custody and Adolescents’ Life Satisfaction in 37 North American and European Countries", "Family Process", 2021, "https://doi.org/10.1111/famp.12536", "10.1111/famp.12536", "2021 article analyzes adolescent life satisfaction in 37 countries using 2002, 2006 and 2010 surveys. Initial shared-care advantages disappeared after family and child adjustment. The publication year does not make these contemporary custody data.", "landmark_study", "debate", novemberSchoolsFamilyResearchCheckedAt),
	only1: researchSource("A Systematic Review of the Outcomes for U.S. Only Children in the Last 40 Years", "The Family Journal", 2026, "https://doi.org/10.1177/10664807261440838", "10.1177/10664807261440838", "2026 review identifies 12 US articles on only-child outcomes and generally finds no broad disadvantage. Its limited, mostly younger samples and language, database and geographic scope leave important uncertainty about specific social outcomes and later life.", "systematic_review", "supports", novemberSchoolsFamilyResearchCheckedAt),
	only2: researchSource("Are Only Children Missing Out? Comparison of the Peer-Related Social Competence of Only Children and Siblings", "Journal of Social and Personal Relationships", 2002, "https://doi.org/10.1177/0265407502193001", "10.1177/0265407502193001", "2002 observational study of 139 elementary pupils finds similar close friendships and friendship quality but differences in peer acceptance and conflict-related measures. Popularity, aggression and the quality of close relationships are different outcomes.", "landmark_study", "debate", novemberSchoolsFamilyResearchCheckedAt),
	only3: researchSource("Number of Siblings and Social Skills Revisited Among American Fifth Graders", "Journal of Family Issues", 2015, "https://doi.org/10.1177/0192513x13507569", "10.1177/0192513x13507569", "2015 analysis follows 11,820 US children from the 1998–99 kindergarten cohort through fifth grade. The measured social-skills gap did not close as expected. Family size was not randomized, and the result concerns specific ratings in an older cohort.", "landmark_study", "debate", novemberSchoolsFamilyResearchCheckedAt),
	only4: researchSource("Being an only child and children’s prosocial behaviors: evidence from rural China and the role of parenting styles", "Humanities and Social Sciences Communications", 2024, "https://doi.org/10.1057/s41599-024-03078-2", "10.1057/s41599-024-03078-2", "2024 rural Chinese study reports more prosocial behavior among only children after statistical attempts to address selection. Cultural setting and measured prosocial behavior differ from US peer popularity; adjustment does not turn family size into a randomized exposure.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	vouchers1: researchSource("The participant effects of private school vouchers around the globe: a meta-analytic and systematic review", "School Effectiveness and School Improvement", 2021, "https://doi.org/10.1080/09243453.2021.1906283", "10.1080/09243453.2021.1906283", "2021 international review includes 21 randomized evaluations of 11 voucher programs. Average achievement effects are moderately positive but vary substantially across programs and years. Evaluations and outcomes are not independent program votes.", "meta_analysis", "context", novemberSchoolsFamilyResearchCheckedAt),
	vouchers2: researchSource("School Vouchers and Student Outcomes: Experimental Evidence from W ashington, DC", "Journal of Policy Analysis and Management", 2013, "https://doi.org/10.1002/pam.21691", "10.1002/pam.21691", "2013 Washington, DC lottery evaluation finds clear graduation benefits, suggestive reading benefits and no math effect. Test scores and graduation are distinct outcomes, and one program's estimates do not describe every voucher policy.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	vouchers3: researchSource("Free to Choose: Can School Choice Reduce Student Achievement?", "American Economic Journal: Applied Economics", 2018, "https://doi.org/10.1257/app.20160634", "10.1257/app.20160634", "2018 randomized Louisiana voucher evaluation finds substantial short-term losses in math and other subjects. Selection of participating private schools is a proposed explanation. The studied program and follow-up period cannot stand for every voucher program or long-term outcome.", "landmark_study", "debate", novemberSchoolsFamilyResearchCheckedAt),
	vouchers4: researchSource("Voucher Pathways and Student Achievement in Indiana’s Choice Scholarship Program", "RSF: The Russell Sage Foundation Journal of the Social Sciences", 2019, "https://doi.org/10.7758/rsf.2019.5.3.02", "10.7758/rsf.2019.5.3.02", "2019 Indiana matched longitudinal study finds achievement losses among public-to-private switchers but no significant change among pupils already in private school. Matching leaves possible unmeasured selection, unlike a voucher lottery.", "landmark_study", "debate", novemberSchoolsFamilyResearchCheckedAt),
	yearround1: {
		...researchSource("Single-track year-round education for improving academic achievement in U.S. K-12 schools: Results of a meta-analysis", "Campbell Systematic Reviews: Better Evidence for a Better World", 2019, "https://doi.org/10.1002/cl2.1053", "10.1002/cl2.1053", "2019 synthesis of 30 single-track studies finds modest achievement associations. Its 2020 corrigendum emphasizes that none of the studies was experimental, shorter-summer associations are not causal, and subgroup and moderator findings have lower certainty. Retain the correction when interpreting the review.", "meta_analysis", "supports", novemberSchoolsFamilyResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1002/cl2.1053",
			"https://doi.org/10.1002/cl2.1114",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2Fcl2.1053&rows=100",
			"https://pmc.ncbi.nlm.nih.gov/articles/PMC8988517/"
		]
	},
	yearround2: researchSource("Examining the Effectiveness of Year-Round School Calendars on Improving Educational Attainment Outcomes Within the Context of Advancement of Health Equity: A Community Guide Systematic Review", "Journal of Public Health Management and Practice", 2019, "https://doi.org/10.1097/phh.0000000000000860", "10.1097/phh.0000000000000860", "2019 Community Guide review finds insufficient evidence for single-track and multi-track calendars. Extra teaching during intersessions and unequal resources across tracks complicate comparison; redistributing school days differs from adding instruction.", "systematic_review", "debate", novemberSchoolsFamilyResearchCheckedAt),
	yearround3: researchSource("Meta-Analytic Evidence for Year-Round Education’s Effect on Science and Social Studies Achievement", "Middle Grades Research Journal", 2019, "https://doi.org/10.1108/mgrj-01-2019-0001", "10.1108/mgrj-01-2019-0001", "2019 synthesis reports small science and social-studies associations in grades 3–8. Its seven studies come from the same 30-study pool as the math/reading review, providing additional outcomes rather than independent replication.", "meta_analysis", "context", novemberSchoolsFamilyResearchCheckedAt),
	yearround6: researchSource("The Impact of Year-Round Schooling on Academic Achievement: Evidence from Mandatory School Calendar Conversions", "American Economic Journal: Economic Policy", 2012, "https://doi.org/10.1257/pol.4.4.230", "10.1257/pol.4.4.230", "2012 published study examines 22 mandatory Wake County calendar conversions with 180 instructional days. A fixed-effects analysis finds no average achievement benefit or clear benefit by racial subgroup. This final article replaces a DOI-less precursor.", "landmark_study", "debate", novemberSchoolsFamilyResearchCheckedAt),
	fourday1: researchSource("A multi-state, student-level analysis of the effects of the four-day school week on student achievement and growth", "Economics of Education Review", 2024, "https://doi.org/10.1016/j.econedurev.2024.102524", "10.1016/j.econedurev.2024.102524", "2024 multistate student-level difference-in-differences study finds small negative spring reading and within-year math/reading effects. Estimates differ by rural setting and subgroup. Observational policy changes still require assumptions about comparison trends.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	fourday2: researchSource("Impacts of the four-day school week on early elementary achievement", "Early Childhood Research Quarterly", 2023, "https://doi.org/10.1016/j.ecresq.2022.12.009", "10.1016/j.ecresq.2022.12.009", "2023 Oregon analysis follows kindergarten-entry cohorts to third-grade tests. Average differences were minimal, with important subgroup variation. Covariate adjustment is not random assignment and absence of a significant subgroup effect does not prove no effect.", "landmark_study", "context", novemberSchoolsFamilyResearchCheckedAt),
	fourday4: researchSource("Impacts of the four-day school week on high school achievement and educational engagement", "Education Economics", 2022, "https://doi.org/10.1080/09645292.2021.2006610", "10.1080/09645292.2021.2006610", "2022 Oregon high-school analysis reports lower eleventh-grade math achievement, more chronic absence and reduced on-time graduation after entering a four-day schedule. These are separate outcomes and overlap the regional evidence base.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	fourday5: researchSource("Is four less than five? Effects of four-day school weeks on student achievement in Oregon", "Journal of Public Economics", 2021, "https://doi.org/10.1016/j.jpubeco.2020.104308", "10.1016/j.jpubeco.2020.104308", "2021 published Oregon study uses 2005–2019 data and finds small math/reading declines after four-day adoption. Reduced weekly instructional hours are a proposed driver. The earlier SSRN version is not an independent study; the instrumental-variable interpretation has additional assumptions.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	singlesex1: researchSource("The effects of single-sex compared with coeducational schooling on students’ performance and attitudes: A meta-analysis.", "Psychological Bulletin", 2014, "https://doi.org/10.1037/a0035740", "10.1037/a0035740", "2014 synthesis of 184 studies across 21 countries finds that apparent single-sex advantages shrink markedly in controlled studies. Large pooled samples do not remove selection; the best-controlled comparisons generally show only small differences.", "meta_analysis", "context", novemberSchoolsFamilyResearchCheckedAt),
	singlesex2: researchSource("Between gendered walls: Assessing the impact of single-sex and co-education on student achievement, self-confidence, and communication skills", "Women's Studies International Forum", 2024, "https://doi.org/10.1016/j.wsif.2024.103003", "10.1016/j.wsif.2024.103003", "2024 synthesis reports no general attainment benefit of single-sex settings and some differences in confidence and communication. Country and outcome heterogeneity matter, and large literature counts do not make every comparison causal or independent of earlier reviews.", "meta_analysis", "context", novemberSchoolsFamilyResearchCheckedAt),
	singlesex3: researchSource("Same but Different: Differences in Academic Achievement Between Coed and Single-Sex Classrooms among Coeducational High Schools in South Korea", "Global Economic Review", 2024, "https://doi.org/10.1080/1226508x.2024.2449154", "10.1080/1226508x.2024.2449154", "Korean study uses an application-based assignment system to compare classroom composition within coeducational high schools. Some academic benefits differ by sex, subject and year. Canonical print issue is 2024 with online publication in January 2025; whole-school admissions are a different comparison.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	singlesex4: researchSource("Are single-sex schools more effective than the coed ones? The effect of single-sex schooling on achievement among female adolescents in Catholic schools", "Research Papers in Education", 2022, "https://doi.org/10.1080/02671522.2021.1886318", "10.1080/02671522.2021.1886318", "2022 issue article analyzes 4,787 Polish girls in ten Catholic-school cohorts. Adjusted science differences favored all-girls schools, while the humanities difference was not statistically clear. Religious-school selection and specific exams limit generalization.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	homeschool1: researchSource("A Systematic Review of the Empirical Research on Selected Aspects of Homeschooling: Updated 2017–2026", "Peabody Journal of Education", 2026, "https://doi.org/10.1080/0161956x.2025.2605900", "10.1080/0161956x.2025.2605900", "2026 selected-outcome review reports positive findings in many home-education studies and calls for better-controlled research. Its positive-study tallies are not pooled causal effects or expert agreement. Authors include researchers affiliated with the National Home Education Research Institute.", "systematic_review", "supports", novemberSchoolsFamilyResearchCheckedAt),
	homeschool2: researchSource("Homeschooling: What do we know and what do we need to learn?", "Child Development Perspectives", 2022, "https://doi.org/10.1111/cdep.12441", "10.1111/cdep.12441", "2022 developmental overview describes often favorable academic and social averages but identifies selection effects as a key obstacle to causal conclusions. Home education varies in instruction, family resources and access to comparison data.", "context", "context", novemberSchoolsFamilyResearchCheckedAt),
	homeschool3: researchSource("The impact of schooling on academic achievement: Evidence from homeschooled and traditionally schooled students.", "Canadian Journal of Behavioural Science / Revue canadienne des sciences du comportement", 2011, "https://doi.org/10.1037/a0022697", "10.1037/a0022697", "2011 comparison distinguishes structured from unstructured home education and finds different achievement patterns. The comparative design does not establish the effect of home education independent of family selection or teaching approach.", "landmark_study", "context", novemberSchoolsFamilyResearchCheckedAt),
	homeschool4: researchSource("Homeschooling in the United States: A review of select research topics", "Pro-Posições", 2017, "https://doi.org/10.1590/1980-6248-2015-0171", "10.1590/1980-6248-2015-0171", "2017 US research overview examines demographic, motivational and methodological issues alongside academic outcomes. It provides context for selection and measurement limits, not a pooled causal estimate or a description of every country's home-education system.", "context", "context", novemberSchoolsFamilyResearchCheckedAt),
	mindfulness1: researchSource("Effectiveness and cost-effectiveness of universal school-based mindfulness training compared with normal school provision in reducing risk of mental health problems and promoting well-being in adolescence: the MYRIAD cluster randomised controlled trial", "Evidence Based Mental Health", 2022, "https://doi.org/10.1136/ebmental-2021-300396", "10.1136/ebmental-2021-300396", "MYRIAD's 2022 cluster trial analyzes 84 UK schools and 8,376 pupils. Universal mindfulness lessons were not superior to normal social-emotional teaching on the three primary mental-health outcomes at one year. Cost-effectiveness probability is not clinical efficacy or the share of pupils helped.", "landmark_study", "debate", novemberSchoolsFamilyResearchCheckedAt),
	mindfulness2: researchSource("School-based mindfulness training in early adolescence: what works, for whom and how in the MYRIAD trial?", "Evidence Based Mental Health", 2022, "https://doi.org/10.1136/ebmental-2022-300439", "10.1136/ebmental-2022-300439", "Secondary MYRIAD analysis reports small worse symptom scores in pupils already at risk, described as not clinically relevant, and no reliable one-year implementation moderator. It is the same trial as the main report, not independent replication or a test of individual clinical treatment.", "landmark_study", "context", novemberSchoolsFamilyResearchCheckedAt),
	mindfulness3: researchSource("Mindfulness-Based School Interventions: a Systematic Review of Outcome Evidence Quality by Study Design", "Mindfulness", 2022, "https://doi.org/10.1007/s12671-022-01885-9", "10.1007/s12671-022-01885-9", "2022 review of 77 studies and 12,358 pupils finds outcome-specific promise, mixed wellbeing results and no depression effect in its highest-quality evidence. Its authors' evidence grades are not a site-performed GRADE assessment; active controls and later trial findings remain important.", "systematic_review", "supports", novemberSchoolsFamilyResearchCheckedAt),
	recess1: researchSource("How Elementary In‐School Play Opportunities Relate to Academic Achievement and Social‐Emotional Well‐Being : Systematic Review", "Journal of School Health", 2022, "https://doi.org/10.1111/josh.13217", "10.1111/josh.13217", "2022 review of 20 publications finds more consistent behavioral and social benefits than academic effects. More recess was not generally associated with lower attainment, but this is not proof of a guaranteed score gain or an optimal recess duration.", "systematic_review", "supports", novemberSchoolsFamilyResearchCheckedAt),
	recess2: researchSource("Educational outcomes of recess in elementary school children: A mixed-methods systematic review", "PLOS ONE", 2023, "https://doi.org/10.1371/journal.pone.0294340", "10.1371/journal.pone.0294340", "2023 mixed-method review includes eight quantitative and five qualitative studies, mostly from the US. Academic effects were positive or null, with limited causal designs and diverse measures. Teachers' qualitative reports are distinct from measured test-score improvements.", "systematic_review", "context", novemberSchoolsFamilyResearchCheckedAt),
	recess3: researchSource("The Impact of Recess on Students: A Scoping Review of Developmental Outcomes and Methodological Considerations", "Journal of Research in Childhood Education", 2024, "https://doi.org/10.1080/02568543.2024.2313021", "10.1080/02568543.2024.2313021", "2024 scoping review covers 73 studies of recess and physical, social, academic, injury and meal outcomes. Many designs are cross-sectional and US-based. Wide activity estimates and overlapping reviews cannot define a universal schedule or establish causality.", "systematic_review", "context", novemberSchoolsFamilyResearchCheckedAt),
	garden1: researchSource("Increasing Fruit and Vegetable Intake among Children and Youth through Gardening-Based Interventions: A Systematic Review", "Journal of the Academy of Nutrition and Dietetics", 2017, "https://doi.org/10.1016/j.jand.2016.10.014", "10.1016/j.jand.2016.10.014", "2017 review of 14 articles suggests small dietary benefits from gardening interventions but notes convenience samples, self-report and short follow-up. School, community and after-school settings differ, and favorable study tallies are not an independent causal estimate.", "systematic_review", "supports", novemberSchoolsFamilyResearchCheckedAt),
	garden2: researchSource("The effects of school gardens on fruit and vegetable consumption at school: A randomized controlled trial with low-income elementary schools in four U.S. states", "Preventive Medicine Reports", 2023, "https://doi.org/10.1016/j.pmedr.2022.102053", "10.1016/j.pmedr.2022.102053", "2023 two-year trial in 46 low-income US schools includes 2,767 children and uses photographed lunches. Gardens plus curriculum modestly increased fruit and low-fat vegetable consumption at school. This does not isolate a garden alone or establish whole-day dietary change.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	garden3: researchSource("Evaluating the impacts of school garden-based programmes on diet and nutrition-related knowledge, attitudes and practices among the school children: a systematic review", "BMC Public Health", 2022, "https://doi.org/10.1186/s12889-022-13587-x", "10.1186/s12889-022-13587-x", "2022 review covers 35 studies across 12 countries. Garden programs often combine nutrition, cooking and parent activities; knowledge, acceptance and actual consumption are different endpoints. Effects vary with implementation, age and program duration.", "systematic_review", "supports", novemberSchoolsFamilyResearchCheckedAt),
	garden4: researchSource("School-based gardening, cooking and nutrition intervention increased vegetable intake but did not reduce BMI: Texas sprouts - a cluster randomized controlled trial", "International Journal of Behavioral Nutrition and Physical Activity", 2021, "https://doi.org/10.1186/s12966-021-01087-x", "10.1186/s12966-021-01087-x", "2021 Texas Sprouts trial involves 16 schools and 3,135 children. A combined gardening, cooking and nutrition program improved reported vegetable intake frequency but not fruit intake, obesity measures or blood pressure. Frequency per day is not a standardized serving.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	breakfast1: researchSource("The Effects of Breakfast and Breakfast Composition on Cognition in Children and Adolescents: A Systematic Review", "Advances in Nutrition", 2016, "https://doi.org/10.3945/an.115.010256", "10.3945/an.115.010256", "2016 review includes 45 intervention studies, mostly testing a single morning. Attention, memory and executive tasks sometimes benefit, especially in undernourished children. Evidence for long-term programs and a best breakfast composition remains inconsistent.", "systematic_review", "supports", novemberSchoolsFamilyResearchCheckedAt),
	breakfast2: researchSource("Effects of eating breakfast on children and adolescents: A systematic review of potentially relevant outcomes in economic evaluations", "Food & Nutrition Research", 2019, "https://doi.org/10.29219/fnr.v63.1618", "10.29219/fnr.v63.1618", "2019 review of 26 studies concludes favorably across several outcomes, with a search ending in 2017 and selected high-income settings. Heterogeneous designs and outcomes limit causal claims about lasting school attainment.", "systematic_review", "supports", novemberSchoolsFamilyResearchCheckedAt),
	breakfast3: researchSource("Ready-to-eat cereal and milk for breakfast compared with no breakfast has a positive acute effect on cognitive function and subjective state in 11–13-year-olds: a school-based, randomised, controlled, parallel groups trial", "European Journal of Nutrition", 2021, "https://doi.org/10.1007/s00394-021-02506-2", "10.1007/s00394-021-02506-2", "2021 article reports a 234-pupil acute cereal-and-milk trial using data from 2011 and retrospective registration in 2019. Benefits differ by task and baseline performance. Kellogg funding and author employment links are disclosed; the trial does not establish a uniquely beneficial product or lasting grade gains.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	breakfast4: researchSource("School feeding programs for improving the physical and psychological health of school children experiencing socioeconomic disadvantage", "Cochrane Database of Systematic Reviews", 2025, "https://doi.org/10.1002/14651858.cd014794.pub2", "10.1002/14651858.cd014794.pub2", "2025 Cochrane school-feeding review includes 40 studies, mostly in low- and middle-income countries. Small math benefits differ from uncertain reading and attendance effects. Meals in general, not breakfast alone, are the intervention; certainty varies by outcome and setting.", "meta_analysis", "context", novemberSchoolsFamilyResearchCheckedAt),
	nature1: researchSource("The impacts of unstructured nature play on health in early childhood development: A systematic review", "PLOS ONE", 2020, "https://doi.org/10.1371/journal.pone.0229006", "10.1371/journal.pone.0229006", "2020 review of 16 studies concerns unstructured nature play in children aged 2–12. Imaginative play findings are promising, while the full report's physical-activity comparisons include positive, null and negative results. Different settings and weak designs limit causal conclusions.", "systematic_review", "supports", novemberSchoolsFamilyResearchCheckedAt),
	nature2: researchSource("Nature play in early childhood education: A systematic review and meta ethnography of qualitative research", "Frontiers in Psychology", 2022, "https://doi.org/10.3389/fpsyg.2022.995164", "10.3389/fpsyg.2022.995164", "2022 qualitative synthesis includes 28 studies and 998 children aged 2–8. It describes how natural settings and adult interaction may support play quality. Qualitative themes do not estimate a causal gain in intelligence or school attainment.", "systematic_review", "context", novemberSchoolsFamilyResearchCheckedAt),
	nature4: researchSource("How can nature connectedness and behaviours for learning be deliberately developed in children, adolescents and young adults? A systematic literature review", "Child and Adolescent Mental Health", 2025, "https://doi.org/10.1111/camh.12774", "10.1111/camh.12774", "2025 review includes 22 heterogeneous nature-based studies with participants aged 0–29. Activities extend beyond free play, including hiking and gardening, and many occur outside schools. Its broad scope cannot identify the best activity or establish the effect of nature play alone.", "systematic_review", "context", novemberSchoolsFamilyResearchCheckedAt),
	daycare1: researchSource("Do more hours in center-based care cause more externalizing problems? A cross-national replication study", "Child Development", 2023, "https://doi.org/10.1111/cdev.13871", "10.1111/cdev.13871", "2023 cross-national replication pools within-child analyses from seven studies and 10,105 children. Changes in center-care hours were not associated with externalizing problems. Data span 1993–2012; within-child comparisons address some stable selection factors but not every changing family circumstance.", "meta_analysis", "debate", novemberSchoolsFamilyResearchCheckedAt),
	daycare2: researchSource("Non-parental Childcare During Early Childhood and Problem Behaviour Trajectories from Ages 5 to 14 Years", "Child Psychiatry & Human Development", 2026, "https://doi.org/10.1007/s10578-024-01703-4", "10.1007/s10578-024-01703-4", "2026 issue article follows 6,194 English children from ages 5–14. More externalizing behavior at age five was associated with over 40 weekly childcare hours before age three, but socioeconomic and parental mental-health adjustment weakened findings. This is an association, not a universal harmful threshold.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	daycare4: researchSource("Do Effects of Early Child Care Extend to Age 15 Years? Results From the NICHD Study of Early Child Care and Youth Development", "Child Development", 2010, "https://doi.org/10.1111/j.1467-8624.2010.01431.x", "10.1111/j.1467-8624.2010.01431.x", "2010 US NICHD follow-up links more early nonrelative care with later impulsivity and risk-taking, while higher care quality predicts better academic outcomes and less externalizing behavior. Quantity, quality and different adolescent outcomes are distinct observational associations.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	sameparents1: researchSource("Family outcome disparities between sexual minority and heterosexual families: a systematic review and meta-analysis", "BMJ Global Health", 2023, "https://doi.org/10.1136/bmjgh-2022-010556", "10.1136/bmjgh-2022-010556", "2023 review of 34 articles, with 16 contributing to meta-analyses, finds mostly similar family outcomes and some small favorable differences for sexual-minority families. Its scope is broader than same-sex couples alone; selection, reporting, stigma and publication bias limit causal ranking of family types.", "meta_analysis", "supports", novemberSchoolsFamilyResearchCheckedAt),
	sameparents2: researchSource("Academic Achievement of Children in Same- and Different-Sex-Parented Families: A Population-Level Analysis of Linked Administrative Data From the Netherlands", "Demography", 2021, "https://doi.org/10.1215/00703370-8994569", "10.1215/00703370-8994569", "2021 Netherlands register study includes 1,454,577 children, of whom 3,006 had same-sex parents, with several educational outcomes. Favorable observed attainment does not show parental orientation causes an advantage, and one country's policy and family context limits transfer.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	sameparents3: researchSource("Behavioral Outcomes of Children with Same-Sex Parents in The Netherlands", "International Journal of Environmental Research and Public Health", 2022, "https://doi.org/10.3390/ijerph19105922", "10.3390/ijerph19105922", "2022 Dutch probability-sample study compares 62 children with same-sex parents and 72 with different-sex parents. Matched parent-reported behavior showed no significant disadvantage. The small sample and reporting source limit claims of exact equivalence for every outcome.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	sameparents4: researchSource("Same-Sex and Different-Sex Parent Families in Italy: Is Parents' Sexual Orientation Associated with Child Health Outcomes and Parental Dimensions?", "Journal of Developmental & Behavioral Pediatrics", 2018, "https://doi.org/10.1097/dbp.0000000000000583", "10.1097/dbp.0000000000000583", "2018 Italian comparison finds generally good reported adjustment in children with same-sex parents. Family-type associations did not predict outcomes after family-process adjustment. Online recruitment, parent report and distinct routes to parenthood limit causal inference.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	adoption1: researchSource("Adoption or Placement in Foster Care and Catch-up in Linear Growth and Development: A Meta-Analysis of Individual Participant Data", "Advances in Nutrition", 2025, "https://doi.org/10.1016/j.advnut.2025.100395", "10.1016/j.advnut.2025.100395", "2025 individual-data synthesis covers 485 children under five from nine adoption studies. Height deficits narrowed substantially, with less complete developmental catch-up. Linear growth and developmental scores are different outcomes, and adoption was not randomly assigned.", "meta_analysis", "supports", novemberSchoolsFamilyResearchCheckedAt),
	adoption2: researchSource("Adoption and development from infancy to adulthood: A systematic review of longitudinal studies and future directions", "Development and Psychopathology", 2026, "https://doi.org/10.1017/s0954579425100977", "10.1017/s0954579425100977", "2026 issue review follows 3,073 adoptees across 16 longitudinal studies. Developmental gains coexist with persistent difficulties in a subgroup. Heterogeneity prevented meta-analysis, and early adversity and later outcomes cannot be reduced to a uniform adoption effect.", "systematic_review", "context", novemberSchoolsFamilyResearchCheckedAt),
	adoption3: researchSource("Foster care leads to sustained cognitive gains following severe early deprivation", "Proceedings of the National Academy of Sciences", 2022, "https://doi.org/10.1073/pnas.2119318119", "10.1073/pnas.2119318119", "2022 Bucharest trial follow-up assesses 135 participants at age 18. Assignment to high-quality foster care rather than usual institutional care produced sustained cognitive gains. Stability analyses were exploratory, and the experiment does not compare foster care with safe birth-family care.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	adoption4: researchSource("The Emanuel Miller Memorial Lecture 2006: Adoption as intervention. Meta‐analytic evidence for massive catch‐up and plasticity in physical, socio‐emotional, and cognitive development", "Journal of Child Psychology and Psychiatry", 2006, "https://doi.org/10.1111/j.1469-7610.2006.01675.x", "10.1111/j.1469-7610.2006.01675.x", "2006 review of more than 270 studies reports substantial but uneven catch-up after adoption. Comparisons with children remaining in adverse care and with current peers answer different questions. Older observational pools overlap later reviews and do not determine individual placement decisions.", "meta_analysis", "supports", novemberSchoolsFamilyResearchCheckedAt),
	parentprogram1: researchSource("Have parenting programs for disruptive child behavior become less effective?", "Journal of Child Psychology and Psychiatry", 2026, "https://doi.org/10.1111/jcpp.70049", "10.1111/jcpp.70049", "2026 issue synthesis includes 244 trials and 28,916 families across 36 countries. Estimated parenting-program effects declined initially and then stabilized. The time trend is not a single benefit size, and different outcomes, controls and program delivery affect interpretation.", "meta_analysis", "supports", novemberSchoolsFamilyResearchCheckedAt),
	parentprogram2: researchSource("Individual Participant Data Meta-Analysis: Individual Differences in Mediators of Parenting Program Effects on Disruptive Behavior", "Journal of the American Academy of Child & Adolescent Psychiatry", 2025, "https://doi.org/10.1016/j.jaac.2024.10.003", "10.1016/j.jaac.2024.10.003", "2025 individual-data study combines 14 European trials and 3,252 families. Reduced harsh verbal discipline and more consistent follow-through partly explained benefits, with substantial family differences. The proposed mediators were not independently randomized treatment components.", "meta_analysis", "supports", novemberSchoolsFamilyResearchCheckedAt),
	parentprogram3: researchSource("The Effects of Online Behavioral Parenting Interventions on Child Outcomes, Parenting Ability and Parent Outcomes: A Systematic Review and Meta-analysis", "Clinical Child and Family Psychology Review", 2024, "https://doi.org/10.1007/s10567-024-00477-4", "10.1007/s10567-024-00477-4", "2024 review includes 14 randomized studies of self-directed online parenting interventions against inactive controls. Delivery format, screened child difficulties and limited relationship/emotion measures constrain generalization. An online program is not automatically equivalent to supported face-to-face care.", "meta_analysis", "context", novemberSchoolsFamilyResearchCheckedAt),
	parentprogram4: researchSource("Sustained, fade-out or sleeper effects? A systematic review and meta-analysis of parenting interventions for disruptive child behavior", "Clinical Psychology Review", 2017, "https://doi.org/10.1016/j.cpr.2016.11.006", "10.1016/j.cpr.2016.11.006", "2017 synthesis of 40 trials examines change after treatment for up to three years. A near-zero mean change indicates average maintenance, not zero benefit versus a control group. Some programs or settings showed fade-out or later gains, and follow-up beyond three years remains limited.", "meta_analysis", "supports", novemberSchoolsFamilyResearchCheckedAt),
	praise1: researchSource("Praise for intelligence can undermine children's motivation and performance.", "Journal of Personality and Social Psychology", 1998, "https://doi.org/10.1037/0022-3514.75.1.33", "10.1037/0022-3514.75.1.33", "1998 report of six experiments finds more favorable post-failure motivation after effort than intelligence praise among fifth graders. Brief tasks and specific wording do not establish effects on every child or lasting school achievement. The indexed DOI's doubled slash resolves to the canonical APA DOI.", "landmark_study", "supports", novemberSchoolsFamilyResearchCheckedAt),
	praise2: researchSource("The effects of praise on children's intrinsic motivation: A review and synthesis.", "Psychological Bulletin", 2002, "https://doi.org/10.1037/0033-2909.128.5.774", "10.1037/0033-2909.128.5.774", "2002 conceptual review argues that sincerity, autonomy, attainable standards, age and culture shape praise effects. It is a narrative synthesis rather than a pooled estimate proving one universally best phrase.", "context", "context", novemberSchoolsFamilyResearchCheckedAt),
	praise3: researchSource("Effects of praise and “easy” feedback on children’s persistence and self-evaluations", "Journal of Experimental Child Psychology", 2024, "https://doi.org/10.1016/j.jecp.2024.106032", "10.1016/j.jecp.2024.106032", "2024 preregistered experiment with 150 children finds no primary difference between process and person praise in persistence or self-evaluation. A process-praise benefit relative to no praise was exploratory. Primary and exploratory comparisons must remain distinct.", "landmark_study", "debate", novemberSchoolsFamilyResearchCheckedAt),
	praise4: researchSource("Parent praise to toddlers predicts fourth grade academic achievement via children’s incremental mindsets.", "Developmental Psychology", 2018, "https://doi.org/10.1037/dev0000444", "10.1037/dev0000444", "2018 follow-up of 53 children associates toddler process praise with later mindset and fourth-grade attainment. It follows an earlier cohort rather than independently replicating it, and observed praise was not randomly assigned. Correlation does not establish a long-term praise treatment effect.", "landmark_study", "context", novemberSchoolsFamilyResearchCheckedAt)
};

export const novemberSchoolsFamilyClaims = [
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-montessori-education-improve-academic-achievement",
		title: "Does Montessori education improve academic achievement?",
		bottomLine: "It can help in some settings, but the size and reliability of the benefit remain uncertain. Some school trials and reviews find gains. A newer review raises substantial concerns about bias, uneven study quality and differences in how Montessori is taught.",
		stableCore: [
			"A 2023 review found modest average academic gains, while a 2026 review found that large pooled effects were weakened by publication bias and inconsistent methods.",
			"A French trial follow-up found that an early reading advantage faded, while a later maths problem-solving difference appeared. Benefits can differ by skill and age."
		],
		openQuestions: [
			"Which parts of Montessori teaching produce repeatable gains?",
			"Do benefits last across different schools and later grades?"
		],
		whatWouldChangeMinds: [
			"Larger independent school trials with clear teaching descriptions and long follow-up.",
			"Similar results after accounting for publication bias and school selection."
		],
		misconceptions: [
			"A Montessori label does not mean every school uses the same teaching approach.",
			"The same study appearing in several reviews does not provide several independent tests."
		],
		editorSummary: "Montessori shows promise, with uncertain average benefits and important differences between studies.",
		population: "Preschool and school pupils in research syntheses and US and French school studies.",
		scope: "Compare Montessori with the actual alternative schooling, separating ages, subjects, program fidelity and later follow-up.",
		excludedEvidence: [
			"Keep a later follow-up distinct from a new independent trial.",
			"Separate a particular school's results from a universal ranking of school types."
		],
		uncertainty: "School selection, publication bias, varied teaching and uneven long-term evidence limit the estimated benefit.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.montessori1,
			sources.montessori2,
			sources.montessori3,
			sources.montessori4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "do-school-phone-bans-improve-grades",
		title: "Do school phone bans improve grades?",
		bottomLine: "Results are mixed. Some studies find benefits for particular pupils, while others find little average academic change. A ban's rules, enforcement and school setting matter. Evidence about bullying or wellbeing cannot by itself tell us what happens to grades.",
		stableCore: [
			"Reviews find a limited, varied evidence base. One small pooled benefit combines academic and social outcomes, rather than measuring grades alone.",
			"A middle-school policy study found some gains for girls alongside no average education effect. A short Australian study found no clear benefit for academic engagement, which is different from attainment."
		],
		openQuestions: [
			"Which restrictions improve measured learning over a full school year?",
			"How do enforcement and pupil circumstances affect results?"
		],
		whatWouldChangeMinds: [
			"Independent comparisons with matched schools, clear rules and longer academic follow-up.",
			"Replication of subgroup findings with results reported for all pupils."
		],
		misconceptions: [
			"Less phone use during lessons does not automatically mean higher exam scores.",
			"Partial restrictions and complete bans are different policies."
		],
		editorSummary: "Phone restrictions may help some pupils, with uncertain average effects on grades.",
		population: "Pupils in school-phone policy reviews, a middle-school event study and South Australian secondary schools.",
		scope: "Assess academic outcomes of school phone restrictions separately from wellbeing, bullying and general screen habits.",
		excludedEvidence: [
			"Keep engagement surveys separate from grades and standardized tests.",
			"Do not interpret a combined social-and-academic effect as a test-score gain."
		],
		uncertainty: "Few strong causal studies, varied policies and short follow-up leave important uncertainty.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.phones1,
			sources.phones2,
			sources.phones3,
			sources.phones4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "family-and-child-development",
		slug: "how-does-parental-phone-use-relate-to-child-development",
		title: "How does parental phone use relate to child development?",
		bottomLine: "Frequent distraction by devices is linked to slightly poorer parent–child interaction and some developmental outcomes. Most evidence shows associations, so it cannot tell us that phone use alone caused those differences. Brief interruptions and being absorbed in a device may also have different effects.",
		stableCore: [
			"A 2025 review of young children found small links with cognitive, emotional and behavioral measures. It found no studies of motor development, physical activity or sleep.",
			"Research on older children's problematic media use concerns a different age group and outcome. Trials targeting children's screen time do not isolate the effect of a parent's own phone use."
		],
		openQuestions: [
			"How much do family stress and children's existing needs explain the associations?",
			"Which kinds of interruption affect interaction over time?"
		],
		whatWouldChangeMinds: [
			"Longitudinal and experimental research separating parental distraction from family circumstances.",
			"Trials directly changing parents' device use while measuring child outcomes."
		],
		misconceptions: [
			"An association does not show that every phone interruption harms a child.",
			"Parents' phone use and children's own screen exposure are different questions."
		],
		editorSummary: "Parental device distraction has small developmental associations, with uncertain causal effects.",
		population: "Parents and young children in developmental studies, with older-child media-use findings treated separately.",
		scope: "Assess parental device distraction during interaction, distinguishing age, absorption, brief interruptions and child screen interventions.",
		excludedEvidence: [
			"Keep adolescent problematic media use separate from preschool cognitive development.",
			"Use child-screen interventions as indirect context, not trials of parental phone exposure."
		],
		uncertainty: "Self-report, family stress, reverse causation and varied exposure measures complicate interpretation.",
		band: "broad",
		certainty: "low",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.parent1,
			sources.parent3,
			sources.parent2,
			sources.parent4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "family-and-child-development",
		slug: "does-shared-physical-custody-improve-child-wellbeing",
		title: "Does shared physical custody improve child wellbeing?",
		bottomLine: "Children in shared-care arrangements often have better average outcomes than those in sole care, but shared time itself may not explain the difference. Family relationships, resources and the circumstances leading to each arrangement matter. These averages cannot determine a safe arrangement for an individual child.",
		stableCore: [
			"Reviews commonly find favorable shared-care associations across several outcomes.",
			"Some adjusted studies still find differences, while others find that they disappear after family and relationship factors are considered. None randomly assigns children to separated-family arrangements."
		],
		openQuestions: [
			"Which benefits arise from the time split rather than relationships or resources?",
			"How do age, conflict, travel and family circumstances change outcomes?"
		],
		whatWouldChangeMinds: [
			"Longitudinal studies with clear pre-separation measures and careful comparisons.",
			"Consistent findings across child-reported outcomes and different family circumstances."
		],
		misconceptions: [
			"Shared physical care and joint legal decision-making are different arrangements.",
			"Population averages cannot establish safety where abuse or coercive control is present."
		],
		editorSummary: "Shared-care outcomes are often favorable, with substantial uncertainty about cause and individual suitability.",
		population: "Children and adolescents in post-separation family studies, including Germany, Wisconsin and cross-national surveys.",
		scope: "Compare actual post-separation living arrangements and child wellbeing while considering family selection, resources and relationship quality.",
		excludedEvidence: [
			"Keep legal custody labels distinct from measured time living with each parent.",
			"Do not use these population comparisons to prescribe time splits or judge cases involving abuse."
		],
		uncertainty: "Families select arrangements for different reasons, and measured adjustment cannot capture every relevant circumstance.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.custody1,
			sources.custody2,
			sources.custody3,
			sources.custody4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "family-and-child-development",
		slug: "are-only-children-less-socially-skilled",
		title: "Are only children less socially skilled?",
		bottomLine: "There is little support for a broad stereotype that only children are socially worse off. Results for particular skills are mixed. Close friendships, popularity, conflict and helping behavior are different measures, and studies do not show the same pattern across all of them.",
		stableCore: [
			"A recent US review generally found no broad disadvantage, but its evidence base was small.",
			"Some older US studies found differences in peer acceptance or rated social skills. A rural Chinese study instead found more prosocial behavior among only children."
		],
		openQuestions: [
			"How much do family resources, culture and opportunities to meet peers explain the differences?",
			"Which childhood differences persist into later life?"
		],
		whatWouldChangeMinds: [
			"Larger longitudinal studies comparing the same social outcomes across settings.",
			"Stronger handling of family selection and differences in who reports behavior."
		],
		misconceptions: [
			"Having close friends is different from being popular with a whole class.",
			"A group average does not describe every only child or child with siblings."
		],
		editorSummary: "A general social deficit is unsupported; specific social findings vary by measure and setting.",
		population: "US only-child research, older school cohorts and a study of prosocial behavior in rural China.",
		scope: "Compare only children and children with siblings on distinct social outcomes, accounting for age, culture and family circumstances.",
		excludedEvidence: [
			"Keep social skills distinct from intelligence, educational achievement and birth-order personality claims.",
			"Do not treat an observational family-size comparison as random assignment."
		],
		uncertainty: "Small samples, older cohorts, varied social measures and family selection limit a single verdict.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.only1,
			sources.only2,
			sources.only3,
			sources.only4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "do-private-school-vouchers-improve-test-scores",
		title: "Do private-school vouchers improve test scores?",
		bottomLine: "Effects vary substantially by program. Some randomized evaluations find gains, some find little change and others find losses. The subject tested, participating schools and time since transfer matter. Graduation and test scores can also move differently.",
		stableCore: [
			"An international review found moderately positive average achievement effects across voucher programs, with substantial variation.",
			"The Washington, DC trial found different results for reading, maths and graduation. Louisiana's trial found substantial early achievement losses; an Indiana study found different patterns for school switchers and pupils already in private school."
		],
		openQuestions: [
			"Which program features explain gains or losses?",
			"Do early test-score changes predict later attainment and wellbeing?"
		],
		whatWouldChangeMinds: [
			"Long-term independent evaluations with clear eligibility, school participation and comparison groups.",
			"Similar findings across programs rather than repeated reports from the same program."
		],
		misconceptions: [
			"A voucher offer and actually using a voucher are different exposures.",
			"A higher graduation rate does not necessarily mean higher test scores."
		],
		editorSummary: "Voucher effects on achievement are program-specific, with positive, null and negative findings.",
		population: "Pupils in international randomized voucher evaluations and US studies in Washington, DC, Louisiana and Indiana.",
		scope: "Compare private-school voucher participation or offers with the relevant schooling alternative, separating programs, subjects and follow-up periods.",
		excludedEvidence: [
			"Keep matched observational estimates distinct from randomized voucher lotteries.",
			"Separate test achievement from graduation, parental satisfaction and choice itself."
		],
		uncertainty: "Participating schools, selection, implementation and overlapping evaluations limit a single policy-wide effect.",
		band: "mixed",
		certainty: "moderate",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.vouchers1,
			sources.vouchers2,
			sources.vouchers3,
			sources.vouchers4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "do-year-round-school-calendars-improve-achievement",
		title: "Do year-round school calendars improve achievement?",
		bottomLine: "Some studies find small gains, while others find little change. Evidence that rearranging the same school days causes better achievement remains limited. A shorter summer break, extra teaching and a calendar used to manage overcrowding are different changes.",
		stableCore: [
			"A single-track calendar review found modest average associations. Its included studies were not experiments, and its corrigendum qualified causal and subgroup conclusions.",
			"Another review judged the evidence insufficient. A study of mandatory calendar conversions in North Carolina found no average academic benefit."
		],
		openQuestions: [
			"Does calendar spacing help when teaching time and school resources stay comparable?",
			"Which pupils benefit from shorter breaks or optional intersession teaching?"
		],
		whatWouldChangeMinds: [
			"Stronger calendar-change studies separating extra teaching from rescheduled teaching.",
			"Replicated subject-specific gains with clear comparisons and reliable subgroup estimates."
		],
		misconceptions: [
			"Year-round schooling often redistributes existing school days rather than adding more.",
			"Single-track and staggered multi-track calendars address different needs."
		],
		editorSummary: "Year-round calendars have mixed academic findings and limited causal evidence.",
		population: "US primary and secondary pupils in calendar reviews and a North Carolina conversion study.",
		scope: "Assess redistribution of school days while separating single-track calendars, multi-track scheduling and additional instruction.",
		excludedEvidence: [
			"Keep science/social-studies results from an overlapping study pool distinct from independent replication.",
			"Do not infer that shortening summer causes gains from a non-experimental moderator association."
		],
		uncertainty: "Calendar definitions, extra lessons, school selection and weak subgroup evidence complicate comparison.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.yearround1,
			sources.yearround2,
			sources.yearround3,
			sources.yearround6
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "how-does-a-four-day-school-week-affect-learning",
		title: "How does a four-day school week affect learning?",
		bottomLine: "Recent US studies often find small academic losses after schools move to four days, though results vary by age and setting. Reduced weekly teaching time may explain part of the difference. Four longer days that preserve teaching hours are not the same policy as cutting those hours.",
		stableCore: [
			"A multistate study found lower reading achievement and smaller within-year gains. Oregon studies also found some negative test-score results.",
			"One early-primary analysis found little average difference but varied results across pupils. Older pupils' attendance and graduation outcomes are separate from test performance."
		],
		openQuestions: [
			"Can schools preserve learning when they keep the same effective teaching time?",
			"How do the effects change with age, rural setting and time since adoption?"
		],
		whatWouldChangeMinds: [
			"Independent studies measuring actual instruction, comparable prior trends and longer-term outcomes.",
			"Replication in schedules that preserve weekly hours and in different regions."
		],
		misconceptions: [
			"Fewer school days do not always mean the same reduction in teaching hours.",
			"Cost savings or family preferences do not establish an academic benefit."
		],
		editorSummary: "Four-day weeks often have modest academic costs, with important differences between schedules and pupils.",
		population: "US pupils in a multistate analysis and Oregon primary, middle and high-school studies.",
		scope: "Evaluate four-day schedules through measured learning while distinguishing teaching hours, pupil ages and policy setting.",
		excludedEvidence: [
			"Treat overlapping Oregon cohorts and earlier working-paper versions as related evidence.",
			"Keep attendance, graduation and financial outcomes separate from test-score effects."
		],
		uncertainty: "Observational policy changes, regional concentration and varied weekly hours limit causal and wider conclusions.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.fourday1,
			sources.fourday2,
			sources.fourday4,
			sources.fourday5
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "do-single-sex-schools-improve-academic-achievement",
		title: "Do single-sex schools improve academic achievement?",
		bottomLine: "A general academic advantage has not been established. Better-controlled studies usually find small differences, while some particular schools or classrooms show benefits. Family selection, subject, age and the way pupils are assigned can change the comparison.",
		stableCore: [
			"Large reviews find that apparent advantages tend to shrink when selection is addressed, with no consistent large attainment benefit.",
			"Korean classroom-assignment and Polish girls' school studies report some favorable results. These concern particular settings and outcomes, rather than every single-sex school."
		],
		openQuestions: [
			"Which classroom conditions explain context-specific effects?",
			"Do results transfer across ages, subjects and school systems?"
		],
		whatWouldChangeMinds: [
			"Well-controlled school and classroom comparisons with clear assignment rules.",
			"Independent replication of specific benefits alongside social and educational outcomes."
		],
		misconceptions: [
			"A single-sex classroom inside a mixed school differs from an entirely single-sex school.",
			"A school's high average scores can reflect who enrolls as well as what the school does."
		],
		editorSummary: "Broad academic superiority is unproven, with some context-specific differences.",
		population: "School pupils in international reviews, Korean classroom comparisons and Polish Catholic-school cohorts.",
		scope: "Compare single-sex and coeducational settings while separating whole schools, classrooms, enrollment selection and subject outcomes.",
		excludedEvidence: [
			"Keep controlled and uncontrolled comparisons distinct.",
			"Do not generalize a girls' science-exam result to every pupil or academic subject."
		],
		uncertainty: "Selection, school differences, overlapping reviews and context-specific findings limit a universal conclusion.",
		band: "mixed",
		certainty: "moderate",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.singlesex1,
			sources.singlesex2,
			sources.singlesex3,
			sources.singlesex4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "how-does-homeschooling-affect-academic-achievement",
		title: "How does homeschooling affect academic achievement?",
		bottomLine: "Some home-educated pupils perform well, but research cannot reliably separate the schooling format from family choices, resources and teaching. Structured and unstructured approaches also differ. The causal effect of homeschooling compared with attending school remains uncertain.",
		stableCore: [
			"Reviews often report favorable achievement among studied home-educated pupils, alongside major concerns about selection and comparison groups.",
			"Studies distinguish different teaching approaches. Results from families who choose to take part or sit particular tests need not describe every home-educated child."
		],
		openQuestions: [
			"How would otherwise similar pupils fare under different schooling arrangements?",
			"Which teaching and support features help across family circumstances?"
		],
		whatWouldChangeMinds: [
			"More representative longitudinal comparisons with strong prior achievement and family measures.",
			"Transparent outcome reporting across structured and unstructured home education."
		],
		misconceptions: [
			"A count of studies with favorable findings is not a causal effect size.",
			"Planned home education and emergency remote schooling are different experiences."
		],
		editorSummary: "Observed home-education achievement can be good; its independent causal effect is unresolved.",
		population: "Mostly US home-education research and a comparison distinguishing structured and unstructured approaches.",
		scope: "Assess academic achievement in deliberate home education while accounting for family selection, instruction and test participation.",
		excludedEvidence: [
			"Keep pandemic remote schooling separate from planned home education.",
			"Separate selected test-takers and positive-study tallies from representative causal estimates."
		],
		uncertainty: "Family self-selection, uneven outcome data and diverse teaching prevent a clear average causal estimate.",
		band: "unclear",
		certainty: "low",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.homeschool1,
			sources.homeschool2,
			sources.homeschool3,
			sources.homeschool4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "mental-health-and-treatment",
		slug: "does-mindfulness-at-school-improve-pupils-mental-health",
		title: "Does mindfulness at school improve pupils' mental health?",
		bottomLine: "Findings are mixed. Some studies report benefits for particular outcomes, but a large UK trial found no added mental-health benefit from universal mindfulness lessons over normal social-emotional teaching. Age, program and comparison activity matter.",
		stableCore: [
			"Reviews report different findings for anxiety, behavior, wellbeing and depression; a benefit on one measure does not establish benefits on all of them.",
			"The MYRIAD trial found no superiority on its three main outcomes at one year. A secondary analysis found small worse symptom scores among some at-risk pupils, described as not clinically important."
		],
		openQuestions: [
			"Which pupils, formats and teaching contexts benefit?",
			"How should programs identify and respond to unwanted effects?"
		],
		whatWouldChangeMinds: [
			"Independent trials with active comparisons, longer follow-up and careful adverse-effect monitoring.",
			"Replicated benefits for clearly defined age groups and outcomes."
		],
		misconceptions: [
			"Universal classroom lessons differ from targeted clinical treatment.",
			"A secondary analysis of one trial is not a new independent trial."
		],
		editorSummary: "Universal school mindfulness has mixed evidence, including a large trial with no added mental-health benefit.",
		population: "School pupils in intervention reviews and early adolescents in the UK MYRIAD trial.",
		scope: "Assess universal school mindfulness lessons against the actual comparison teaching, separating outcomes, ages and targeted treatment.",
		excludedEvidence: [
			"Keep the main MYRIAD report and its secondary analyses within one trial.",
			"Do not infer clinical efficacy from a cost-effectiveness probability or from adult meditation studies."
		],
		uncertainty: "Programs, controls and outcomes differ, and subgroup and unwanted-effect evidence remains limited.",
		band: "mixed",
		certainty: "moderate",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.mindfulness1,
			sources.mindfulness2,
			sources.mindfulness3
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "education-and-learning",
		slug: "does-recess-support-learning",
		title: "Does recess support learning?",
		bottomLine: "Recess can support classroom behavior and gives children time to play and move. Research generally finds positive or unchanged academic outcomes rather than a consistent loss from taking a break. Evidence for a particular score gain or an ideal schedule is less certain.",
		stableCore: [
			"Reviews find more consistent behavioral and social benefits than academic improvements.",
			"Academic findings include positive and null results. Many studies are observational, so they cannot show that recess alone caused a change in attainment."
		],
		openQuestions: [
			"Which schedules work best for different ages and school settings?",
			"How do play quality, inclusion and supervision affect outcomes?"
		],
		whatWouldChangeMinds: [
			"Controlled schedule changes measuring learning, behavior and pupil experience.",
			"More evidence from varied school systems with clear recess definitions."
		],
		misconceptions: [
			"More classroom time does not automatically mean more learning.",
			"Recess and a teacher-led exercise break are different activities."
		],
		editorSummary: "Recess can support behavior without a clear general academic cost; precise learning effects remain uncertain.",
		population: "Elementary and school-age pupils in mostly US recess studies and research reviews.",
		scope: "Assess school recess through behavior and academic outcomes, distinguishing free play from structured activity breaks.",
		excludedEvidence: [
			"Keep teachers' qualitative reports distinct from measured test-score changes.",
			"Do not count overlapping review samples as separate experiments or infer an optimal break length from them."
		],
		uncertainty: "Non-controlled designs, varied measures and regional concentration limit precise causal and scheduling claims.",
		band: "broad",
		certainty: "low",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.recess1,
			sources.recess2,
			sources.recess3
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "do-school-gardens-increase-vegetable-consumption",
		title: "Do school gardens increase vegetable consumption?",
		bottomLine: "Programs combining gardens with cooking or nutrition lessons can modestly increase children's vegetable intake. A garden alone may have different effects. Better knowledge or willingness to try vegetables is also different from eating more of them.",
		stableCore: [
			"Trials and reviews find some dietary benefits, with results depending on program activities and implementation.",
			"One US trial measured lunches directly. Texas Sprouts found more frequent vegetable intake but no detected improvement in obesity measures or blood pressure."
		],
		openQuestions: [
			"Do dietary changes last and extend beyond meals eaten at school?",
			"Which parts of the combined programs provide the benefit?"
		],
		whatWouldChangeMinds: [
			"Longer trials measuring actual intake at school and at home.",
			"Comparisons separating gardening from cooking lessons, tasting and other support."
		],
		misconceptions: [
			"Knowing about vegetables does not necessarily mean eating more.",
			"An increase in eating frequency is not the same as a measured extra serving."
		],
		editorSummary: "Combined school-garden programs can modestly improve intake, with uncertain long-term and garden-only effects.",
		population: "Schoolchildren in garden-program reviews and US trials, including low-income elementary schools.",
		scope: "Assess measured fruit and vegetable consumption from school garden programs while identifying accompanying teaching and parent components.",
		excludedEvidence: [
			"Separate dietary knowledge, preferences and reported intake frequency from directly measured consumption.",
			"Do not infer weight loss or blood-pressure improvement from better vegetable intake alone."
		],
		uncertainty: "Programs combine several activities, intake measures vary and long-term whole-day dietary evidence is limited.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.garden1,
			sources.garden2,
			sources.garden3,
			sources.garden4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "nutrition-and-diet",
		slug: "does-eating-breakfast-help-children-think-and-learn",
		title: "Does eating breakfast help children think and learn?",
		bottomLine: "Breakfast can help some attention and memory tasks during the same morning, especially when children would otherwise be hungry or undernourished. Evidence for large lasting gains in grades, or one best breakfast, is much less clear.",
		stableCore: [
			"Intervention reviews find some short-term cognitive benefits, but results vary by task, nutritional status and study design.",
			"A cereal-and-milk trial found task-specific benefits and disclosed industry funding. Broader school-feeding research concerns meals in general, not breakfast alone."
		],
		openQuestions: [
			"Which children benefit most over a full school year?",
			"How do food access, meal composition and the comparison breakfast affect results?"
		],
		whatWouldChangeMinds: [
			"Independently funded long-term trials with meaningful learning outcomes and clear comparisons.",
			"Consistent results across nutritional settings and ordinary school routines."
		],
		misconceptions: [
			"A better same-morning task score does not establish a lasting improvement in school grades.",
			"A trial of one breakfast product does not show that the product is uniquely beneficial."
		],
		editorSummary: "Breakfast can help short-term cognition, with uncertain long-term academic and meal-composition effects.",
		population: "Children and adolescents in breakfast interventions, with broader school-feeding evidence treated separately.",
		scope: "Compare breakfast with the relevant alternative through cognitive and academic outcomes, separating acute tasks from longer-term programs.",
		excludedEvidence: [
			"Keep general free-school-meal effects distinct from breakfast-specific effects and meal participation.",
			"Separate baseline-dependent exploratory results, retrospective registration and industry sponsorship from evidence of a uniquely effective product."
		],
		uncertainty: "Short trials, variable nutrition, task selection, funding and limited long-term comparisons constrain conclusions.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"Consensus.app targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.breakfast1,
			sources.breakfast2,
			sources.breakfast3,
			sources.breakfast4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "family-and-child-development",
		slug: "does-nature-play-support-child-development",
		title: "Does nature play support child development?",
		bottomLine: "Nature play offers opportunities for movement, imaginative play and social interaction. Research is promising, but evidence that it improves development more than other good play spaces is limited. The activities, children and comparison settings vary widely.",
		stableCore: [
			"A review of free nature play found encouraging cognitive-play findings, while physical-activity comparisons included positive, unchanged and negative results.",
			"Qualitative studies describe how natural settings support play. Broader nature-activity reviews cover other ages and activities, so they cannot isolate free play's effect."
		],
		openQuestions: [
			"Which outcomes improve beyond those from other engaging play settings?",
			"How do access, adult support and the kind of natural setting affect results?"
		],
		whatWouldChangeMinds: [
			"Better-controlled comparisons with clear play definitions and longer developmental follow-up.",
			"Similar findings across children and settings, including those less represented in current research."
		],
		misconceptions: [
			"Imaginative play behavior is different from a measured gain in intelligence.",
			"A nature walk, outdoor therapy and unstructured nature play are different exposures."
		],
		editorSummary: "Nature play is promising, with limited causal evidence of advantages over other good play settings.",
		population: "Children in free-play and early-education studies, with broader youth nature activities used as context.",
		scope: "Assess unstructured play in natural settings against relevant play alternatives, separating qualitative play quality and measured developmental outcomes.",
		excludedEvidence: [
			"Keep wider nature-based activities involving older participants distinct from child free-play evidence.",
			"Do not interpret qualitative themes or mixed activity findings as proven intelligence or clinical-treatment effects."
		],
		uncertainty: "Varied settings, weak comparisons, overlapping reviews and different outcome measures limit precise effects.",
		searchDatabases: [
			"PubMed targeted paper search",
			"Publisher and institutional article records"
		],
		band: "broad",
		certainty: "low",
		sources: [
			sources.nature1,
			sources.nature2,
			sources.nature4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "family-and-child-development",
		slug: "does-more-time-in-childcare-cause-behavior-problems",
		title: "Does more time in childcare cause behavior problems?",
		bottomLine: "A clear general causal effect has not been established. Some studies link more childcare hours with behavior differences, while stronger within-child comparisons find little association. Care quality, age, family circumstances and the behavior being measured all matter.",
		stableCore: [
			"A seven-study cross-national analysis found no link between changes in center-care hours and changes in externalizing behavior.",
			"English and US follow-ups report some associations at different ages, alongside links with care quality and family factors. These studies do not establish a universal harmful number of hours."
		],
		openQuestions: [
			"How do changing family circumstances affect the apparent hours–behavior relationship?",
			"Which care settings and age groups show meaningful differences?"
		],
		whatWouldChangeMinds: [
			"Replicated studies separating hours from quality, family changes and prior behavior.",
			"Clear findings across independent reporters and comparable care systems."
		],
		misconceptions: [
			"A rated behavior difference is not automatically a clinical disorder.",
			"The amount, quality and type of childcare are different exposures."
		],
		editorSummary: "Childcare-hour associations vary; a general causal behavior effect is unresolved.",
		population: "Children in cross-national center-care analyses and English and US longitudinal cohorts.",
		scope: "Assess childcare quantity through specific behavioral outcomes while distinguishing quality, age, family selection and study design.",
		excludedEvidence: [
			"Keep preschool externalizing ratings separate from adolescent impulsivity and risk-taking.",
			"Do not treat an observed high-hours category as a universal safety threshold or equate childcare with parental employment."
		],
		uncertainty: "Family selection, changing circumstances, different reporters and variation in care systems limit causal claims.",
		searchDatabases: [
			"PubMed targeted paper search",
			"Publisher and institutional article records"
		],
		band: "mixed",
		certainty: "moderate",
		sources: [
			sources.daycare1,
			sources.daycare2,
			sources.daycare4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "family-and-child-development",
		slug: "how-do-children-with-same-sex-parents-fare",
		title: "How do children with same-sex parents fare?",
		bottomLine: "Research generally finds similar child wellbeing across same-sex-parent and different-sex-parent families. Some studies find favorable differences, but they do not show that parental orientation itself causes better outcomes. Relationships, resources, stability and social support are important parts of the comparison.",
		stableCore: [
			"A review found mostly similar family outcomes, with some small favorable differences in child adjustment and parent–child relationships. Its sexual-minority-family category is broader than same-sex couples alone.",
			"Dutch educational records and smaller Dutch and Italian behavioral studies do not support a broad child-outcome deficit. The measures, recruitment and social settings differ."
		],
		openQuestions: [
			"How do stigma, legal protections and resources affect outcomes across settings?",
			"How well do findings cover different routes to parenthood and later life?"
		],
		whatWouldChangeMinds: [
			"More representative longitudinal studies with clear family histories and independent outcome measures.",
			"Consistent results across countries and less-studied family groups."
		],
		misconceptions: [
			"An observed group advantage does not show that parental orientation caused it.",
			"Family structure, family relationships and exposure to discrimination are different factors."
		],
		editorSummary: "The evidence does not support a broad wellbeing deficit among children with same-sex parents.",
		population: "Sexual-minority family research, Dutch educational and survey samples, and an Italian parent comparison.",
		scope: "Compare child adjustment and educational outcomes using clearly defined family groups, social contexts and routes to parenthood.",
		excludedEvidence: [
			"Keep a parent's orientation distinct from household composition and a child's history of family changes.",
			"Separate broader sexual-minority-family findings from evidence specifically comparing same-sex couples."
		],
		uncertainty: "Selection, parent report, small subgroups and uneven country coverage limit causal and subgroup conclusions.",
		searchDatabases: [
			"PubMed targeted paper search",
			"Publisher and institutional article records"
		],
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.sameparents1,
			sources.sameparents2,
			sources.sameparents3,
			sources.sameparents4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "family-and-child-development",
		slug: "can-children-catch-up-after-adoption-or-foster-placement",
		title: "Can children catch up after adoption or foster placement?",
		bottomLine: "Many children make substantial gains after moving from severe deprivation into supportive family care. Catch-up can differ for growth, thinking skills and emotional wellbeing, and some needs persist. Studies of institutional deprivation do not compare adoption with safe care in a child's birth family.",
		stableCore: [
			"Reviews find substantial but uneven recovery. A recent height analysis found more complete catch-up in growth than in developmental measures.",
			"A randomized Romanian foster-care study found lasting cognitive gains relative to usual institutional care. Longitudinal adoption research also identifies a subgroup with continuing emotional or behavioral difficulties."
		],
		openQuestions: [
			"Which supports help children with persistent needs over the longer term?",
			"How do prior adversity, age and placement stability shape different outcomes?"
		],
		whatWouldChangeMinds: [
			"Long-term comparisons with detailed early histories and clearly defined care alternatives.",
			"Replicated evidence separating placement support, stability and specific developmental outcomes."
		],
		misconceptions: [
			"Improved height does not mean every developmental difficulty has resolved.",
			"A benefit relative to institutional care does not settle an individual placement decision."
		],
		editorSummary: "Supportive family care can enable substantial catch-up after deprivation, with uneven and sometimes persistent needs.",
		population: "Previously deprived children in adoption studies and the Bucharest foster-care trial, including long-term follow-up.",
		scope: "Assess developmental recovery after adoption or foster placement against the actual earlier or comparison care, separating growth, cognition and wellbeing.",
		excludedEvidence: [
			"Keep non-randomized adoption comparisons separate from the randomized foster-care versus institutional-care trial.",
			"Do not generalize deprivation findings to every adoptee or use them to rank safe birth-family care against adoption."
		],
		uncertainty: "Early adversity, varied comparison groups, overlapping cohorts and long-term follow-up differences complicate average effects.",
		searchDatabases: [
			"PubMed targeted paper search",
			"Publisher and institutional article records"
		],
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.adoption1,
			sources.adoption2,
			sources.adoption3,
			sources.adoption4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "family-and-child-development",
		slug: "do-parenting-programs-reduce-disruptive-child-behavior",
		title: "Do parenting programs reduce disruptive child behavior?",
		bottomLine: "Yes, structured behavioral parenting programs can reduce disruptive behavior on average. Benefits vary between families and programs, and some children need other support as well. Evidence about these programs does not mean that parenting alone caused a child's difficulties.",
		stableCore: [
			"Trials and research syntheses support benefits, while estimates have become more cautious over time. A recent review found that average effect estimates had stabilized.",
			"Follow-up research suggests that improvements often persist for several years, with variation. Changes in consistent, less harsh parenting partly explain benefits, but proposed mechanisms are not separately randomized treatments."
		],
		openQuestions: [
			"How can programs better support families who benefit less?",
			"Which improvements persist beyond the usual follow-up period?"
		],
		whatWouldChangeMinds: [
			"Independent trials against credible active support, with multiple reporters and longer follow-up.",
			"Replicated evidence about which components work for which families."
		],
		misconceptions: [
			"A near-zero change after treatment can mean that gains were maintained, rather than that treatment had no benefit.",
			"Evidence for a structured program does not establish that any parenting app or advice course works."
		],
		editorSummary: "Structured programs can reduce disruptive behavior, with variable benefits and incomplete long-term evidence.",
		population: "Children with disruptive behavior and their families in international trials, including European and online programs.",
		scope: "Assess structured behavioral parenting interventions for disruptive behavior, distinguishing treatment effects, maintenance and proposed mechanisms.",
		excludedEvidence: [
			"Keep post-treatment maintenance separate from improvement relative to a control group.",
			"Separate general disruptive-behavior programs from ADHD-specific treatment, untested advice and claims that parents caused the difficulty."
		],
		uncertainty: "Controls, family circumstances, reporting and program delivery differ; some families benefit less and longer follow-up is limited.",
		searchDatabases: [
			"PubMed targeted paper search",
			"Publisher and institutional article records"
		],
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.parentprogram1,
			sources.parentprogram2,
			sources.parentprogram3,
			sources.parentprogram4
		]
	}, novemberSchoolsFamilyResearchCheckedAt),
	reviewedEntry({
		topicSlug: "family-and-child-development",
		slug: "is-praising-effort-better-than-praising-intelligence",
		title: "Is praising effort better than praising intelligence?",
		bottomLine: "Effort-focused praise can help motivation in some situations, but it is not consistently better in every direct comparison. The wording, child's age and task matter. Brief experiments and family observations do not establish a guaranteed long-term academic benefit.",
		stableCore: [
			"Classic experiments found better responses to failure after effort rather than intelligence praise. A newer preregistered experiment found no primary difference between process and person praise.",
			"A small family follow-up links early process praise with later mindset and attainment, but praise was not randomly assigned. Sincerity and context also shape how feedback is received."
		],
		openQuestions: [
			"When do different forms of praise help children respond to difficulty?",
			"Do short-term effects transfer to ordinary learning over time?"
		],
		whatWouldChangeMinds: [
			"Independent preregistered replications with clear comparison wording and meaningful outcomes.",
			"Longer trials separating praise from broader teaching and family support."
		],
		misconceptions: [
			"An exploratory benefit compared with no praise is different from a planned effort-versus-person comparison.",
			"A long-term association in one family cohort does not prove that changing praise causes better grades."
		],
		editorSummary: "Effort praise can help, with context-dependent comparisons and uncertain long-term causal benefits.",
		population: "School-age children in brief feedback experiments and a small longitudinal family cohort.",
		scope: "Compare effort/process and intelligence/person praise through motivation and responses to failure, distinguishing experimental and observational outcomes.",
		excludedEvidence: [
			"Keep this wording comparison separate from whole growth-mindset programs and instructional feedback in general.",
			"Treat the toddler follow-up as the same cohort and keep exploratory analyses distinct from preregistered primary tests."
		],
		uncertainty: "Small studies, specific tasks, mixed replications and non-randomized long-term evidence limit universal advice.",
		searchDatabases: [
			"PubMed targeted paper search",
			"Publisher and institutional article records"
		],
		band: "mixed",
		certainty: "low",
		sources: [
			sources.praise1,
			sources.praise2,
			sources.praise3,
			sources.praise4
		]
	}, novemberSchoolsFamilyResearchCheckedAt)
];
