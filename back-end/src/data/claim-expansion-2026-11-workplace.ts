import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberWorkplaceResearchCheckedAt = "2026-11-08T09:52:13.789Z";

const sources = {
	monitoring1: researchSource("A meta‐analysis of the effects of electronic performance monitoring on work outcomes", "Personnel Psychology", 2023, "https://doi.org/10.1111/peps.12514", "10.1111/peps.12514", "Meta-analysis of 94 independent samples and 23,461 people found no evidence of an average performance benefit and a positive stress association. Monitoring types and study designs differ; pooled findings do not identify the effect of every implementation.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	monitoring3: researchSource("Electronic Monitoring at Work", "Annual Review of Organizational Psychology and Organizational Behavior", 2025, "https://doi.org/10.1146/annurev-orgpsych-110622-060758", "10.1146/annurev-orgpsych-110622-060758", "Research review in the 2025 journal volume describes a near-neutral overall performance relationship and small strain and job-attitude correlations. Its online-first date is earlier; moderators and countervailing pathways remain uncertain.", "context", "supports", novemberWorkplaceResearchCheckedAt),
	monitoring2: researchSource("Context Sensitive Technologies and Electronic Employee Monitoring: a Meta-Analytic Review", "2019 IEEE/SICE International Symposium on System Integration (SII)", 2019, "https://doi.org/10.1109/sii.2019.8700354", "10.1109/sii.2019.8700354", "IEEE conference review of 85 studies, with qualitative and meta-analytic synthesis. Performance findings were heterogeneous and most studies were cross-sectional or quasi-experimental; this is conference evidence, not a randomized journal trial.", "meta_analysis", "context", novemberWorkplaceResearchCheckedAt),
	interviewUpdates1: researchSource("Revisiting meta-analytic estimates of validity in personnel selection: Addressing systematic overcorrection for restriction of range.", "Journal of Applied Psychology", 2022, "https://doi.org/10.1037/apl0000994", "10.1037/apl0000994", "Reanalysis published in the 2022 journal issue revises overly large range-restriction corrections. Structured interviews remain highly ranked, but revised correlations are lower; a correlation reduction is not a percentage-point reduction in successful hiring.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	interviews2: researchSource("The validity of employment interviews: A comprehensive review and meta-analysis.", "Journal of Applied Psychology", 1994, "https://doi.org/10.1037/0021-9010.79.4.599", "10.1037/0021-9010.79.4.599", "Historical synthesis of 245 coefficients from 86,311 people found higher validity for structured interviews. These are not 245 independent experiments; older statistical corrections should be interpreted alongside the newer reanalysis.", "meta_analysis", "context", novemberWorkplaceResearchCheckedAt),
	interviews1: researchSource("Evaluating interview criterion‐related validity for distinct constructs: A meta‐analysis", "International Journal of Selection and Assessment", 2025, "https://doi.org/10.1111/ijsa.12494", "10.1111/ijsa.12494", "The 2025 issue reports 37 studies and 30,646 participants, falling to 4,449 after one large study is removed. Construct-specific validity and structure in scoring do not measure hiring accuracy or establish fair individual decisions.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	interviewUpdates3: researchSource("Hiring People in Organizations: The State and Future of the Science", "Annual Review of Organizational Psychology and Organizational Behavior", 2026, "https://doi.org/10.1146/annurev-orgpsych-020924-072127", "10.1146/annurev-orgpsych-020924-072127", "Review in the 2026 journal volume covers selection validity, measurement, fairness and applicant reactions. Its 2025 online publication is distinct from the issue year; reviewing automated tools does not validate every such tool.", "context", "context", novemberWorkplaceResearchCheckedAt),
	leadership1: researchSource("Leadership training design, delivery, and implementation: A meta-analysis.", "Journal of Applied Psychology", 2017, "https://doi.org/10.1037/apl0000241", "10.1037/apl0000241", "Meta-analysis of 335 independent employee samples separates reactions, learning, transfer and organizational results. Program-design moderators are associations across studies, not randomized causal tests of each training feature.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	leadership3: researchSource("Can Leadership Training Improve Organizational Effectiveness? Evidence from a Randomized Field Experiment on Transformational and Transactional Leadership", "Public Administration Review", 2022, "https://doi.org/10.1111/puar.13356", "10.1111/puar.13356", "Randomized leadership-training field experiment in the 2022 issue uses employee responses from 463 organizations. Objective education-performance findings concern the school-principal subsample, not profits or measured output across all organizations.", "context", "supports", novemberWorkplaceResearchCheckedAt),
	leadership2: researchSource("The effectiveness of managerial leadership development programs: A meta‐analysis of studies from 1982 to 2001", "Human Resource Development Quarterly", 2004, "https://doi.org/10.1002/hrdq.1099", "10.1002/hrdq.1099", "Review of 83 studies from 1982–2001 separates outcomes and research designs. Uncontrolled before-and-after studies had larger effects, limiting causal interpretation and historical comparisons of effect sizes.", "meta_analysis", "context", novemberWorkplaceResearchCheckedAt),
	teamTraining1: researchSource("The Effectiveness of Teamwork Training on Teamwork Behaviors and Team Performance: A Systematic Review and Meta-Analysis of Controlled Interventions", "PLOS ONE", 2017, "https://doi.org/10.1371/journal.pone.0169604", "10.1371/journal.pone.0169604", "Controlled-intervention review includes 51 articles, 72 unique interventions, 194 effects and 8,439 participants. Average teamwork and performance gains do not imply that every workplace activity or team-building event was tested.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	teamTraining2: researchSource("Does Team Training Improve Team Performance? A Meta-Analysis", "Human Factors: The Journal of the Human Factors and Ergonomics Society", 2008, "https://doi.org/10.1518/001872008x375009", "10.1518/001872008x375009", "Synthesis of 93 effect sizes representing 2,650 teams found positive training relationships. Effects, teams and independent trials are different units, and findings vary with content, membership stability and team size.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	teamTraining3: researchSource("Does Team Building Work?", "Small Group Research", 2009, "https://doi.org/10.1177/1046496408328821", "10.1177/1046496408328821", "Team-building synthesis combines 60 correlations, with stronger relationships for affective and process outcomes. Its broader interventions and potentially overlapping studies are not independent proof for every social outing.", "meta_analysis", "context", novemberWorkplaceResearchCheckedAt),
	coaching2: researchSource("What Can We Know about the Effectiveness of Coaching? A Meta-Analysis Based Only on Randomized Controlled Trials", "Academy of Management Learning & Education", 2023, "https://doi.org/10.5465/amle.2022.0107", "10.5465/amle.2022.0107", "Randomized-only synthesis includes 37 studies, 39 samples and 2,528 people, with positive average outcomes and indications of publication bias. Self-reported outcomes showed larger effects than observed outcomes; financial returns were not established.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	coaching1: researchSource("The effectiveness of workplace coaching: A meta‐analysis of learning and performance outcomes from coaching", "Journal of Occupational and Organizational Psychology", 2016, "https://doi.org/10.1111/joop.12119", "10.1111/joop.12119", "Seventeen-study review covers internal or external professional coaches and excludes manager-subordinate and peer coaching. Programs using multisource feedback showed smaller effects; comparisons between programs do not isolate feedback's causal contribution.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	coaching3: researchSource("Workplace coaching: a meta-analysis and recommendations for advancing the science of coaching", "Frontiers in Psychology", 2023, "https://doi.org/10.3389/fpsyg.2023.1204166", "10.3389/fpsyg.2023.1204166", "Updated coaching synthesis reports positive outcomes while emphasizing gaps in empirical research. It can share primary studies with the other reviews, so citation count is not independent replication count.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	psychologicalSafety1: researchSource("Psychological Safety: A Meta‐Analytic Review and Extension", "Personnel Psychology", 2017, "https://doi.org/10.1111/peps.12183", "10.1111/peps.12183", "Synthesis of 136 samples represents over 22,000 individuals and nearly 5,000 groups. Performance and work-behavior associations vary by research design and context; they do not establish the efficacy of a specific management intervention.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	psychologicalSafety2: researchSource("Psychological Safety and Learning Behavior in Work Teams", "Administrative Science Quarterly", 1999, "https://doi.org/10.2307/2666999", "10.2307/2666999", "Multimethod field study of 51 manufacturing teams links perceived safety with learning behavior. A statistical mediation model in observational data does not by itself establish the proposed causal pathway.", "context", "supports", novemberWorkplaceResearchCheckedAt),
	psychologicalSafety3: researchSource("How Psychological Safety Affects Team Performance: Mediating Role of Efficacy and Learning Behavior", "Frontiers in Psychology", 2020, "https://doi.org/10.3389/fpsyg.2020.01581", "10.3389/fpsyg.2020.01581", "Study of 104 South Korean sales and service teams finds an indirect relationship through learning and efficacy, without a direct performance association in its model. Survey mediation is not a randomized test of increasing psychological safety.", "context", "context", novemberWorkplaceResearchCheckedAt),
	teamDiversity1: researchSource("The Relationship Between Team Diversity and Team Performance: Reconciling Promise and Reality Through a Comprehensive Meta-Analysis Registered Report", "Journal of Business and Psychology", 2024, "https://doi.org/10.1007/s10869-024-09977-0", "10.1007/s10869-024-09977-0", "Registered meta-analysis includes 615 reports and 2,638 effects, with small positive average diversity-performance correlations below 0.1. Task and context matter; team-level associations do not support innate group-ability claims or individual hiring judgments.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	teamDiversity3: researchSource("It's about the process, not the product: A meta-analytic investigation of team demographic diversity and processes", "Organizational Psychology Review", 2024, "https://doi.org/10.1177/20413866241245312", "10.1177/20413866241245312", "Process synthesis includes 406 effects from 38,304 teams. Demographic diversity was associated with social categorization, without overall support for increased information elaboration; these associations do not determine the outcome of a particular team.", "meta_analysis", "context", novemberWorkplaceResearchCheckedAt),
	teamDiversity2: researchSource("The Effects of Team Diversity on Team Outcomes: A Meta-Analytic Review of Team Demography", "Journal of Management", 2007, "https://doi.org/10.1177/0149206307308587", "10.1177/0149206307308587", "Historical review distinguishes task-related and demographic diversity, finding different average performance patterns. Its studies can overlap with later reviews and should not be counted as another independent set of experiments.", "meta_analysis", "context", novemberWorkplaceResearchCheckedAt),
	mentoring1: researchSource("Career Benefits Associated With Mentoring for Proteges: A Meta-Analysis.", "Journal of Applied Psychology", 2004, "https://doi.org/10.1037/0021-9010.89.1.127", "10.1037/0021-9010.89.1.127", "Review of mentee career outcomes finds favorable associations but small effects for objective outcomes such as compensation. Mentored and unmentored people can differ before mentoring, limiting causal conclusions.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	mentoring2: researchSource("The effectiveness of mentoring programs in corporate settings: A meta-analytical review of the literature", "Journal of Vocational Behavior", 2006, "https://doi.org/10.1016/j.jvb.2005.05.003", "10.1016/j.jvb.2005.05.003", "Corporate mentoring review finds stronger informal than formal mentoring associations and highlights a lack of experimental comparisons. Selection into mentoring remains a possible explanation for part of the observed career advantage.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	mentoring3: researchSource("Workplace Mentorship: A Critical Review", "Journal of Career Development", 2022, "https://doi.org/10.1177/0894845320957737", "10.1177/0894845320957737", "Critical review in the 2022 issue examines benefits alongside risks, costs and unequal circumstances. It identifies substantial research gaps; it is a literature review, not an independent mentoring experiment.", "context", "context", novemberWorkplaceResearchCheckedAt),
	brainstorming1: researchSource("The medium matters: Mining the long-promised merit of group interaction in creative idea generation tasks in a meta-analysis of the electronic group brainstorming literature", "Computers in Human Behavior", 2007, "https://doi.org/10.1016/j.chb.2005.07.003", "10.1016/j.chb.2005.07.003", "Electronic-brainstorming synthesis distinguishes face-to-face, nominal and electronic nominal groups. Large electronic groups outperformed nominal groups, while small nominal groups outperformed electronic groups; format and equal-person comparisons matter.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	brainstorming2: researchSource("Productivity loss in brainstorming groups: Toward the solution of a riddle.", "Journal of Personality and Social Psychology", 1987, "https://doi.org/10.1037/0022-3514.53.3.497", "10.1037/0022-3514.53.3.497", "Four experiments investigate free riding, evaluation apprehension and production blocking. In the tested tasks, blocking accounted for much of the idea-generation loss in interacting groups; this does not measure all later collaborative work.", "context", "supports", novemberWorkplaceResearchCheckedAt),
	brainstorming3: researchSource("Alternating individual and group idea generation: Finding the elusive synergy", "Journal of Experimental Social Psychology", 2017, "https://doi.org/10.1016/j.jesp.2016.11.002", "10.1016/j.jesp.2016.11.002", "Three experiments favor alternating individual and group ideation for idea counts. The paper's pooled comparison combines those three experiments; it is not an independent comprehensive meta-analysis of the whole brainstorming field.", "context", "supports", novemberWorkplaceResearchCheckedAt),
	brainstorming4: researchSource("Comparing Virtual Brainwriting and Video‐Based Brainstorming in Groups With Perceived Functional Diversity or Similarity", "The Journal of Creative Behavior", 2025, "https://doi.org/10.1002/jocb.70058", "10.1002/jocb.70058", "Randomized study of 157 working students in 57 small groups compares virtual writing with video-based oral brainstorming. Originality and feasibility differed across stages; short student tasks do not establish lasting company innovation gains.", "context", "context", novemberWorkplaceResearchCheckedAt),
	conflict1: researchSource("The paradox of team conflict revisited: An updated meta-analysis of the team conflict–team performance relationships.", "Journal of Applied Psychology", 2026, "https://doi.org/10.1037/apl0001315", "10.1037/apl0001315", "Updated synthesis in the 2026 journal issue finds negative average performance relationships for task, relationship, process and status conflict, with substantial heterogeneity. Moderator patterns and average correlations do not prove causation or invalidate respectful challenge.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	conflict3: researchSource("The paradox of intragroup conflict: A meta-analysis.", "Journal of Applied Psychology", 2012, "https://doi.org/10.1037/a0024844", "10.1037/a0024844", "Review of 116 studies and 8,880 groups finds consistently negative relationship and process conflict links but more context-dependent task-conflict findings. Top-management and decision-quality results should not be generalized to every team.", "meta_analysis", "context", novemberWorkplaceResearchCheckedAt),
	conflict2: researchSource("Task versus relationship conflict, team performance, and team member satisfaction: A meta-analysis.", "Journal of Applied Psychology", 2003, "https://doi.org/10.1037/0021-9010.88.4.741", "10.1037/0021-9010.88.4.741", "Historical synthesis finds negative task and relationship conflict associations. Findings differ from some later task-conflict estimates, reflecting heterogeneity and overlapping but changing evidence bases.", "meta_analysis", "context", novemberWorkplaceResearchCheckedAt),
	jobCrafting1: researchSource("Effectiveness of job crafting interventions: a meta-analysis and utility analysis", "European Journal of Work and Organizational Psychology", 2019, "https://doi.org/10.1080/1359432x.2019.1646728", "10.1080/1359432x.2019.1646728", "Fourteen-study intervention review reports small average gains in crafting and engagement. Performance effects vary by outcome and setting; its modeled utility estimates are not independently observed financial returns for all workers.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	jobCrafting2: researchSource("Longitudinal Job Crafting Research: A Meta-Analysis", "International Journal of Applied Positive Psychology", 2024, "https://doi.org/10.1007/s41042-024-00159-0", "10.1007/s41042-024-00159-0", "Longitudinal synthesis includes 66 unique samples and distinguishes crafting facets. Reducing hindering demands shows a different pattern from other facets; prospective correlations still do not establish intervention effects.", "meta_analysis", "context", novemberWorkplaceResearchCheckedAt),
	jobCrafting3: researchSource("Testing the effectiveness of an online self-training job crafting intervention among remote workers: A randomized controlled study.", "International Journal of Stress Management", 2026, "https://doi.org/10.1037/str0000391", "10.1037/str0000391", "Randomized remote-work study of 87 participants found some behavior changes but no statistically clear gains in engagement, boredom or remote-work performance. Small sample size and specific setting limit both positive and null conclusions.", "context", "debate", novemberWorkplaceResearchCheckedAt),
	multisource1: researchSource("DOES PERFORMANCE IMPROVE FOLLOWING MULTISOURCE FEEDBACK? A THEORETICAL MODEL, META‐ANALYSIS, AND REVIEW OF EMPIRICAL FINDINGS", "Personnel Psychology", 2005, "https://doi.org/10.1111/j.1744-6570.2005.514_1.x", "10.1111/j.1744-6570.2005.514_1.x", "Review of 24 longitudinal studies finds generally small improvements in multisource ratings. A change following feedback does not isolate its causal effect from development activities, rater changes or time.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	multisource2: researchSource("Feedback and Managerial Performance: A Longitudinal Multilevel Field Experiment of Feedback Intervention Theory", "Global Business and Organizational Excellence", 2025, "https://doi.org/10.1002/joe.22299", "10.1002/joe.22299", "Six-year field experiment randomizes 331 managers across feedback-source and content conditions, with six waves. These active comparisons do not constitute 360-degree feedback versus no feedback, and later score convergence complicates interpretation.", "context", "context", novemberWorkplaceResearchCheckedAt),
	multisource3: researchSource("The impact of 360‐degree feedback on management skills development", "Human Resource Management", 1993, "https://doi.org/10.1002/hrm.3930320210", "10.1002/hrm.3930320210", "Only 48 of 198 original managers accepted the two-year reassessment. Reported skill gains among returners cannot be assumed to represent the original cohort or establish an uncontrolled causal training effect.", "context", "context", novemberWorkplaceResearchCheckedAt),
	engagement1: researchSource("The Link Between Work Engagement and Job Performance", "Journal of Personnel Psychology", 2023, "https://doi.org/10.1027/1866-5888/a000316", "10.1027/1866-5888/a000316", "Review identifies 174 studies, with the overall engagement-performance correlation based on 166 independent samples. Correlations do not express percent productivity gains, and subjective and objective performance measures differ.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	engagement2: researchSource("How work engagement relates to performance and absenteeism: a meta-analysis", "European Journal of Work and Organizational Psychology", 2022, "https://doi.org/10.1080/1359432x.2021.1953989", "10.1080/1359432x.2021.1953989", "Review in the 2022 issue includes 179 correlations representing 139,182 people and separate longitudinal analyses. Prediction of later performance or absence does not remove reverse effects, shared measurement or confounding.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	engagement3: researchSource("The Attitudinal, Behavioral, and Performance Outcomes of Work Engagement: A Comparative Meta-Analysis Across the Public, Semipublic, and Private Sector", "Review of Public Personnel Administration", 2020, "https://doi.org/10.1177/0734371x19840399", "10.1177/0734371x19840399", "Cross-sector synthesis of 130 studies distinguishes public, semipublic and private work. Sector differences in attitudes and intentions should not be treated as equivalent differences in objective productivity.", "meta_analysis", "context", novemberWorkplaceResearchCheckedAt),
	autonomy4: researchSource("Job autonomy and psychological well-being: A linear or a non-linear association?", "European Journal of Work and Organizational Psychology", 2022, "https://doi.org/10.1080/1359432x.2021.1972973", "10.1080/1359432x.2021.1972973", "Study starts with a survey of 4,340 people and a six-month follow-up. Positive prospective autonomy-well-being associations do not imply that all baseline respondents were retained or that autonomy was randomly assigned.", "context", "supports", novemberWorkplaceResearchCheckedAt),
	autonomy2: researchSource("Leader autonomy support in the workplace: A meta-analytic review", "Motivation and Emotion", 2018, "https://doi.org/10.1007/s11031-018-9698-y", "10.1007/s11031-018-9698-y", "Review of perceived leader autonomy support covers 72 studies and 83 samples, with 32,870 people. Supportive supervisory behavior is not identical to formal job discretion; path analyses do not establish every proposed causal mechanism.", "meta_analysis", "context", novemberWorkplaceResearchCheckedAt),
	autonomy1: researchSource("Integrating motivational, social, and contextual work design features: A meta-analytic summary and theoretical extension of the work design literature.", "Journal of Applied Psychology", 2007, "https://doi.org/10.1037/0021-9010.92.5.1332", "10.1037/0021-9010.92.5.1332", "Work-design synthesis covers 259 studies, 219,625 people and multiple job characteristics. Combined explained variance cannot be attributed to autonomy alone or read as a causal percent improvement in performance.", "meta_analysis", "context", novemberWorkplaceResearchCheckedAt),
	autonomy3: researchSource("Job autonomy as a double‐edged sword: Good for work performance, but bad for psychological detachment", "Journal of Occupational and Organizational Psychology", 2026, "https://doi.org/10.1111/joop.70087", "10.1111/joop.70087", "Three-wave, time-lagged, multisource study of 331 people links autonomy and work-related thinking with task performance and poorer detachment. Its mediation model is observational and does not establish a universal cost of autonomy.", "context", "context", novemberWorkplaceResearchCheckedAt),
	detachment1: researchSource("Interventions for improving psychological detachment from work: A meta-analysis.", "Journal of Occupational Health Psychology", 2021, "https://doi.org/10.1037/ocp0000280", "10.1037/ocp0000280", "Intervention synthesis includes 30 studies, 34 interventions and 3,725 people, with an average detachment effect of d=0.36. That standardized score change does not establish an equivalent improvement in every health or work outcome.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	detachment2: researchSource("A Meta-Analysis on Antecedents and Outcomes of Detachment from Work", "Frontiers in Psychology", 2017, "https://doi.org/10.3389/fpsyg.2016.02072", "10.3389/fpsyg.2016.02072", "Review includes 86 publications, 91 samples and 38,124 employees. Favorable self-reported recovery associations coexist with unclear physiological-stress and motivation links, heterogeneous results and some negative links with creativity or contextual performance.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	detachment3: researchSource("Facilitating detachment from work: A systematic review, evidence-based recommendations, and guide for future research.", "Journal of Occupational Health Psychology", 2023, "https://doi.org/10.1037/ocp0000353", "10.1037/ocp0000353", "Qualitative systematic review of 159 studies examines predictors and barriers to detachment. Organizational demands and personal conditions both matter; predictor evidence is not a separate trial of every recommended action.", "systematic_review", "supports", novemberWorkplaceResearchCheckedAt),
	commuting4: researchSource("Commuting demands and appraisals: A systematic review and meta-analysis of strain and wellbeing outcomes", "Organizational Psychology Review", 2023, "https://doi.org/10.1177/20413866221131404", "10.1177/20413866221131404", "Systematic review covers 109 studies, with 39 in the meta-analysis. Objective commuting demands had a small positive strain association but no clear pooled well-being relationship; a small correlation is not a universal causal penalty per minute of travel.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	commuting2: researchSource("Commuting and wellbeing: a critical overview of the literature with implications for policy and future research", "Transport Reviews", 2020, "https://doi.org/10.1080/01441647.2019.1649317", "10.1080/01441647.2019.1649317", "Critical overview in the 2020 journal issue distinguishes journey experience, spillover and longer-term well-being. It finds no consistent overall life-satisfaction link and retains trade-offs with employment and housing.", "context", "supports", novemberWorkplaceResearchCheckedAt),
	commuting1: researchSource("How commuting affects subjective wellbeing", "Transportation", 2020, "https://doi.org/10.1007/s11116-019-09983-9", "10.1007/s11116-019-09983-9", "Six-wave English panel analysis of over 26,000 workers, published in the 2020 issue, finds differing links with leisure, job satisfaction, strain and overall life satisfaction. Residential and job choices complicate causal attribution.", "context", "supports", novemberWorkplaceResearchCheckedAt),
	commuting3: researchSource("Exploring the relationships among commute, work and life satisfaction: A multiscale analysis in Beijing", "Journal of Transport Geography", 2024, "https://doi.org/10.1016/j.jtrangeo.2024.103946", "10.1016/j.jtrangeo.2024.103946", "Beijing survey analysis considers both bottom-up and top-down links between commute and life satisfaction. Structural pathways from cross-sectional data do not establish temporal direction or a universal travel-time penalty.", "context", "context", novemberWorkplaceResearchCheckedAt),
	plants1: researchSource("Effects of Indoor Plants on Human Functions: A Systematic Review with Meta-Analyses", "International Journal of Environmental Research and Public Health", 2022, "https://doi.org/10.3390/ijerph19127454", "10.3390/ijerph19127454", "Systematic review includes 42 records, with 16 used in separate meta-analyses and only two or three records per function. Attention and response-time effects were not statistically clear; pooled physiological outcomes are not workplace productivity.", "meta_analysis", "context", novemberWorkplaceResearchCheckedAt),
	plants2: researchSource("Do indoor plants improve performance and well-being in offices? Divergent results from laboratory and field studies", "Journal of Environmental Psychology", 2020, "https://doi.org/10.1016/j.jenvp.2020.101487", "10.1016/j.jenvp.2020.101487", "Three-study paper reports laboratory task benefits that were not reproduced in two call-center field studies lasting six and fourteen weeks. It preserves the difference between a lab task, worker perceptions and ordinary work performance.", "context", "debate", novemberWorkplaceResearchCheckedAt),
	plants3: researchSource("The restorative effects of working individually in a vegetated office space: A crossover controlled experimental study in real-life workplace setting", "WORK: A Journal of Prevention, Assessment & Rehabilitation", 2025, "https://doi.org/10.1177/10519815251323994", "10.1177/10519815251323994", "Controlled crossover study of 40 working people tests an hour of individual work in planted versus plant-free rooms. Immediate stress and fatigue findings and subgroup attention responses do not establish long-term productivity gains.", "context", "context", novemberWorkplaceResearchCheckedAt),
	plants4: researchSource("Nature-Based Solutions for Office Workers: A Randomized Controlled Trial on Indoor Plants to Enhance Well-Being and Productivity", "Environments", 2026, "https://doi.org/10.3390/environments13080457", "10.3390/environments13080457", "Randomized office study published in 2026 reports greater indoor-environment satisfaction and some physiological differences, with unchanged productivity. These findings do not establish whole-building air cleaning by ordinary office plants.", "context", "debate", novemberWorkplaceResearchCheckedAt),
	ownership1: researchSource("Employee ownership and firm performance: a meta‐analysis", "Human Resource Management Journal", 2016, "https://doi.org/10.1111/1748-8583.12115", "10.1111/1748-8583.12115", "Synthesis of 102 samples representing 56,984 firms finds a small positive performance correlation around 0.04. The association is not a guaranteed 4% productivity increase and does not establish individual investment suitability.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	ownership2: researchSource("Employee ownership and firm performance: A variance decomposition analysis of European firms", "Journal of Business Research", 2017, "https://doi.org/10.1016/j.jbusres.2016.08.014", "10.1016/j.jbusres.2016.08.014", "European panel study in the 2017 issue covers 12,648 firm-years from 1,797 firms. Standalone ownership variance was not statistically clear, while joint context contributions mattered; these variance shares are not causal output gains.", "context", "debate", novemberWorkplaceResearchCheckedAt),
	ownership3: researchSource("The Benefits and Costs of Employee Stock Ownership Plans in China", "Corporate Governance: An International Review", 2025, "https://doi.org/10.1111/corg.12585", "10.1111/corg.12585", "Study in the 2025 issue examines listed Chinese firms and ownership-plan adoption during 2014–2020. Productivity gains can be offset by compensation costs, and firm selection limits causal and cross-country generalization.", "context", "context", novemberWorkplaceResearchCheckedAt),
	businessTraining1: researchSource("Small business training to improve management practices in developing countries: re-assessing the evidence for ‘training doesn’t work’", "Oxford Review of Economic Policy", 2021, "https://doi.org/10.1093/oxrep/grab002", "10.1093/oxrep/grab002", "Published 2021 synthesis of randomized business-training estimates finds average sales and profit gains around 5–10%, often too small for individual trials to detect. It is the journal article, not the earlier working-paper discovery version.", "meta_analysis", "supports", novemberWorkplaceResearchCheckedAt),
	businessTraining2: researchSource("Growing Markets through Business Training for Female Entrepreneurs: A Market-Level Randomized Experiment in Kenya", "American Economic Journal: Applied Economics", 2021, "https://doi.org/10.1257/app.20180340", "10.1257/app.20180340", "Two-stage Kenyan market experiment, published in 2021, randomizes training across and within markets. Trained women-owned businesses gained after three years; small, imprecise competitor estimates do not prove zero displacement.", "context", "supports", novemberWorkplaceResearchCheckedAt),
	businessTraining3: researchSource("Business Training and Mentoring: Experimental Evidence from Women-Owned Microenterprises in Ethiopia", "Economic Development and Cultural Change", 2022, "https://doi.org/10.1086/714592", "10.1086/714592", "Ethiopian trial in the 2022 issue separates training from a subsequent mentoring component. Training profit and sales effects of 0.21 standard deviations are not 21% gains; mentoring practice changes lacked a statistically clear profit effect.", "context", "supports", novemberWorkplaceResearchCheckedAt),
	anonymousIzaV3: researchSource("Anonymous job applications and hiring discrimination", "IZA World of Labor", 2025, "https://doi.org/10.15185/izawol.48.v3", "10.15185/izawol.48.v3", "World of Labor evidence overview, version 3, is dated January 2025 by its publisher, while Crossref lists 2024. The citation uses the publisher's version date. It synthesizes context-dependent findings rather than supplying a new trial or legal standard.", "technical_reference", "supports", novemberWorkplaceResearchCheckedAt),
	anonymous1: researchSource("Unintended Effects of Anonymous Résumés", "American Economic Journal: Applied Economics", 2015, "https://doi.org/10.1257/app.20140185", "10.1257/app.20140185", "French randomized experiment in the 2015 issue found lower minority interview and hiring probabilities under anonymization among volunteering employers. Employer self-selection and the information removed limit generalization beyond that program.", "context", "debate", novemberWorkplaceResearchCheckedAt),
	anonymous2: researchSource("Do Anonymous Job Application Procedures Level the Playing Field?", "ILR Review", 2012, "https://doi.org/10.1177/001979391206500105", "10.1177/001979391206500105", "Swedish field evidence finds improved interview chances for women and applicants of non-Western origin, but job-offer improvements differ by group. The observed screening gains do not establish elimination of later hiring disparities.", "context", "supports", novemberWorkplaceResearchCheckedAt),
	anonymous3: researchSource("The effects of and support for anonymous job application procedures: evidence from a large-scale, multi-faceted study in the Netherlands", "Journal of Ethnic and Migration Studies", 2024, "https://doi.org/10.1080/1369183x.2023.2282385", "10.1080/1369183x.2023.2282385", "Dutch city pilot in the 2024 issue compares 2016–2017 outcomes with a 2015 reference period. Interview gains were clearer than consistent hiring gains; historical comparisons and redaction-method differences are not randomized causal contrasts.", "context", "supports", novemberWorkplaceResearchCheckedAt)
};

export const novemberWorkplaceClaims = [
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "does-employee-monitoring-improve-work-performance",
		title: "Does employee monitoring improve work performance?",
		bottomLine: "Monitoring does not show a dependable average boost in performance. It is linked to more stress and less positive feelings about work. Results vary with the task and how monitoring is used, so this does not show that every system has the same effect.",
		stableCore: [
			"A 2023 meta-analysis covering 94 independent samples and 23,461 people found no evidence of an average performance benefit from electronic performance monitoring. It also found an association with higher stress.",
			"A 2019 conference review of 85 studies found varied performance results and small adverse links with several worker outcomes. Most studies used surveys or designs that could not firmly establish cause and effect.",
			"A 2025 research review likewise described a near-neutral overall performance link, alongside small links with strain and job attitudes. Monitoring can mean very different things, from tracking output to recording detailed behavior."
		],
		openQuestions: [
			"Which specific uses improve useful output without increasing strain or unfair treatment?",
			"How do long-term effects differ across jobs, countries and workers with different levels of control?"
		],
		whatWouldChangeMinds: [
			"Independent workplace experiments showing lasting gains in objective performance, alongside worker well-being and privacy outcomes.",
			"Replications that separate monitoring itself from changes in staffing, targets, feedback and pay."
		],
		misconceptions: [
			"More recorded activity is not necessarily better work. A measurement system can miss quality, cooperation or work done away from a screen.",
			"A small average link with stress does not mean that every worker or monitoring system is affected equally."
		],
		editorSummary: "Evidence gives little support for treating surveillance as a general productivity tool. Its purpose, intrusiveness and effects on workers matter.",
		population: "Employees and experimental participants exposed to electronic performance monitoring in varied work settings.",
		scope: "Compare monitoring with less or no monitoring, distinguishing work performance from recorded activity, stress and attitudes.",
		excludedEvidence: [
			"Exclude claims that monitoring software guarantees productivity, and comparisons that treat recorded clicks as a complete measure of performance.",
			"Exclude jurisdiction-specific legal advice and assumptions that survey associations prove monitoring caused every reported outcome."
		],
		uncertainty: "Monitoring methods and performance measures differ. Many studies are observational, and changes in job demands or management can confound the results.",
		band: "mixed",
		sources: [
			sources.monitoring1,
			sources.monitoring3,
			sources.monitoring2
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "do-structured-job-interviews-predict-performance-better-than-unstructured-interviews",
		title: "Do structured job interviews predict performance better than unstructured interviews?",
		bottomLine: "Generally, yes. Interviews with consistent, job-related questions and scoring predict later performance better than free-form conversations. The predictions are still imperfect. A strong interview score is not a guarantee of success, and predictive value alone does not establish that a hiring process is fair.",
		stableCore: [
			"A large 1994 synthesis found higher predictive validity for structured than unstructured interviews. It combined 245 coefficients from 86,311 people; these are not 245 independent experiments.",
			"A 2022 reanalysis found that common statistical adjustments had overstated the validity of many selection tools. Structured interviews remained highly ranked, but revised correlations were lower than earlier estimates.",
			"A 2025 review of interview constructs covered 37 studies. One very large study dominated its participant count. It found that more structured scoring may especially help assessment of contextual performance, such as cooperation.",
			"A 2026 overview keeps predictive validity, measurement methods, applicant reactions and fairness as related but separate questions. Results for a particular job or interview design need their own evaluation."
		],
		openQuestions: [
			"How well do findings transfer to newer video, remote and automated interview formats?",
			"Which designs predict useful job outcomes while limiting unfair barriers for different applicants?"
		],
		whatWouldChangeMinds: [
			"Independent comparisons using later job outcomes, transparent scoring and current methods for statistical corrections.",
			"Replications across occupations and applicant groups that report validity, accessibility and fairness separately."
		],
		misconceptions: [
			"A correlation of 0.3 does not mean that 30% of hiring decisions are correct.",
			"Good prediction does not by itself prove that every question, score or hiring decision is justified."
		],
		editorSummary: "Structure improves the evidence base for interviews, while uncertainty about individual outcomes and fair use remains.",
		population: "Job applicants and employees studied in interview-validation research across occupations.",
		scope: "Compare interview structure and job-related scoring against later work outcomes, keeping statistical prediction separate from individual hiring judgments.",
		excludedEvidence: [
			"Exclude personality readings, unvalidated automated scores and claims that interview correlations are hiring-accuracy percentages.",
			"Exclude individual employment recommendations and assumptions that predictive validity establishes equal treatment."
		],
		uncertainty: "Studies differ in jobs, performance ratings and statistical corrections. A large sample can dominate a synthesis, and evidence on newer formats is still developing.",
		sources: [
			sources.interviewUpdates1,
			sources.interviews2,
			sources.interviews1,
			sources.interviewUpdates3
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "does-leadership-training-improve-how-managers-lead",
		title: "Does leadership training improve how managers lead?",
		bottomLine: "It can. Research finds gains in leadership knowledge, skills and behavior on average. Some workplace trials also find better results for the people being led. Gains depend on the program and setting; enjoying a course or rating it highly is not the same as leading better afterward.",
		stableCore: [
			"A 2017 meta-analysis of 335 independent employee samples found gains across course reactions, learning, transfer to work and organizational results. Those outcomes use different measures and should not be treated as interchangeable.",
			"A 2004 synthesis of 83 studies found larger effects in simple before-and-after designs. Such designs can mistake other changes for training effects, which makes comparisons across reviews risky.",
			"A randomized field experiment reported positive changes in leadership behavior using employee responses from 463 organizations. Its objective performance findings came from a school-principal subsample, rather than every participating organization."
		],
		openQuestions: [
			"Which gains last beyond the training period and appear in independent measures of leadership?",
			"How much benefit comes from practice, follow-up support or wider organizational changes?"
		],
		whatWouldChangeMinds: [
			"Replicated workplace trials with independent behavior ratings, long follow-up and relevant organizational outcomes.",
			"Comparisons that separate training content from attention, coaching and changes in managers' working conditions."
		],
		misconceptions: [
			"Positive course ratings do not measure changes in employee experience or organizational performance.",
			"A review's program-design moderators do not prove that changing any one feature will cause a larger benefit."
		],
		editorSummary: "Leadership can be developed, but evidence about course learning is stronger than a promise of improved results in every organization.",
		population: "Managers and employees in public and private organizations, with varying leadership-training programs.",
		scope: "Assess leadership training through learning, changed behavior and downstream work outcomes, distinguishing each stage of benefit.",
		excludedEvidence: [
			"Exclude testimonials, attendance totals and course satisfaction as sole proof of improved leadership.",
			"Exclude treating school performance results from a subsample as evidence of profit gains across all organizations."
		],
		uncertainty: "Programs and outcome measures vary. Some evidence comes from weak comparison designs, and durable organizational benefits are harder to establish than learning gains.",
		sources: [
			sources.leadership1,
			sources.leadership3,
			sources.leadership2
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "does-teamwork-training-improve-team-performance",
		title: "Does teamwork training improve team performance?",
		bottomLine: "Structured teamwork training can improve how teams coordinate and perform. The average benefit is positive in controlled studies, but it varies by task and program. These findings do not show that any social outing, icebreaker or activity called team building will improve results.",
		stableCore: [
			"A 2017 review of controlled interventions found positive average effects on teamwork and performance. Its 51 articles included 72 interventions, 194 effect estimates and 8,439 participants; those counts describe different units.",
			"A 2008 synthesis covering 93 effects and 2,650 teams found positive links with team knowledge, processes and performance. Training content, team stability and team size helped explain differences.",
			"A separate 2009 team-building review combined 60 correlations and found stronger relationships with attitudes and team processes than with some other outcomes. It does not validate every activity marketed as team building."
		],
		openQuestions: [
			"How long do gains persist when team membership or work demands change?",
			"Which programs improve independently measured work quality, rather than only teamwork ratings?"
		],
		whatWouldChangeMinds: [
			"Independent workplace trials comparing clear training programs with credible alternatives and measuring later performance.",
			"Replications showing which teams benefit and whether gains justify the time and resources used."
		],
		misconceptions: [
			"The number of effect estimates is not the number of independent teams or trials.",
			"Formal teamwork training and a general team-building event are different interventions."
		],
		editorSummary: "The evidence supports structured teamwork development, with benefits tied to the actual task and training rather than the activity's label.",
		population: "Teams and groups in controlled teamwork-training research and broader team-building studies.",
		scope: "Assess planned teamwork training through coordination and team performance, keeping broader team-building evidence as a related comparison.",
		excludedEvidence: [
			"Exclude assuming that all social events reproduce structured training effects.",
			"Exclude transferring results from one specialist team or simulated task to every workplace, or adding overlapping reviews as independent replications."
		],
		uncertainty: "Reviews combine diverse tasks and can share studies. Simulated performance, ratings and sustained workplace outcomes are different tests of benefit.",
		sources: [
			sources.teamTraining1,
			sources.teamTraining2,
			sources.teamTraining3
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "does-workplace-coaching-improve-performance",
		title: "Does workplace coaching improve performance?",
		bottomLine: "Coaching can help people meet work goals and develop skills. Controlled trials find positive average effects, but benefits often look larger in people's own ratings than in observations by others. Evidence does not establish that every coaching program improves productivity or pays for itself.",
		stableCore: [
			"A 2023 synthesis restricted to randomized studies included 37 studies, 39 samples and 2,528 people. It found a positive average effect across personal and leadership outcomes, alongside signs of publication bias.",
			"A 2016 meta-analysis of 17 studies found positive outcomes for coaching by internal or external coaches. It excluded manager-subordinate and peer coaching, so its findings do not cover all conversations called coaching.",
			"A separate 2023 review also found positive outcomes but highlighted the need for a stronger science of coaching. The same primary studies can appear in several reviews."
		],
		openQuestions: [
			"Which gains persist and appear in independent performance measures?",
			"How do costs, access, coach preparation and the worker's goals affect practical value?"
		],
		whatWouldChangeMinds: [
			"Larger preregistered trials with credible comparison groups, independent outcomes and longer follow-up.",
			"Replicated economic evaluations that measure costs and useful work outcomes rather than inferring returns from rating changes."
		],
		misconceptions: [
			"An average benefit is not a guarantee for a particular coach, client or commercial package.",
			"Evidence about coaching is not evidence that it can replace needed clinical care or fix harmful working conditions."
		],
		editorSummary: "Coaching has evidence of benefit, with the clearest limits around self-reports, publication bias and claims of financial return.",
		population: "Employees and leaders receiving workplace or executive coaching in the cited reviews.",
		scope: "Compare defined coaching programs with controls or other conditions, separating skill and goal outcomes from objective productivity and financial returns.",
		excludedEvidence: [
			"Exclude testimonials and commercial return estimates unsupported by measured costs and outcomes.",
			"Exclude treating internal professional coaching, manager conversations, peer mentoring and mental-health treatment as interchangeable."
		],
		uncertainty: "Trials vary in outcomes, coaching models and follow-up. Self-reported gains can be larger than observed gains, and selective publication may inflate estimates.",
		sources: [
			sources.coaching2,
			sources.coaching1,
			sources.coaching3
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "how-is-psychological-safety-linked-to-team-performance",
		title: "How is psychological safety linked to team performance?",
		bottomLine: "Teams where people feel able to speak up tend to learn and perform better. That pattern appears across many studies. Most evidence shows a link, though, rather than proving that a particular management program will cause better results. Feeling safe to raise a concern is also different from everyone agreeing.",
		stableCore: [
			"Psychological safety means a shared sense that interpersonal risks, such as admitting a mistake or asking a question, can be taken without feared repercussions. It does not mean freedom from standards or difficult discussions.",
			"A 2017 meta-analysis combined 136 samples representing more than 22,000 people and nearly 5,000 groups. It linked psychological safety with work outcomes while examining differences in design, culture and levels of analysis.",
			"Field studies of 51 manufacturing teams and 104 South Korean sales and service teams linked safety with learning behavior. The latter did not find a direct performance relationship once its proposed mediating variables were considered."
		],
		openQuestions: [
			"Which interventions build safety and improve independently measured outcomes over time?",
			"How well do team averages reflect the experience of members who feel less safe than their colleagues?"
		],
		whatWouldChangeMinds: [
			"Replicated team-level interventions showing changes in both speaking-up behavior and objective work outcomes.",
			"Longitudinal evidence separating supportive conditions, previous performance and psychological safety."
		],
		misconceptions: [
			"A statistical pathway in survey data does not prove the proposed causal mechanism.",
			"A team can have respectful disagreement and high standards while being safe to speak up."
		],
		editorSummary: "The association with learning is credible; claims that a specific safety initiative guarantees higher performance need stronger tests.",
		population: "Work teams and employees in organizational surveys and field studies, including manufacturing, sales and service settings.",
		scope: "Assess perceived safety in speaking up and its relationship with team learning and performance, distinguishing associations from intervention effects.",
		excludedEvidence: [
			"Exclude equating psychological safety with agreement, comfort at all times or removal of performance standards.",
			"Exclude interpreting survey mediation as proof that a branded management program causes better results."
		],
		uncertainty: "Shared surveys, prior team success and supportive management can influence both safety ratings and outcomes. Evidence for specific causal interventions is more limited.",
		sources: [
			sources.psychologicalSafety1,
			sources.psychologicalSafety2,
			sources.psychologicalSafety3
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "how-does-team-diversity-relate-to-performance",
		title: "How does team diversity relate to performance?",
		bottomLine: "The average link is small and depends on the task, the kind of diversity and how the team works. Different backgrounds can bring useful knowledge, but diversity alone does not guarantee higher performance. Findings about team averages cannot tell us how capable an individual is.",
		stableCore: [
			"A 2024 registered meta-analysis combined 615 reports and 2,638 effect estimates. Average links between team performance and demographic, job-related or cognitive diversity were positive but small, with correlations below 0.1.",
			"That review found more positive links for complex tasks or work requiring creativity and innovation. It also found substantial limits to broad promises of large performance gains.",
			"A 2024 process review of 406 effects from 38,304 teams linked demographic diversity with social categorization, but did not find an overall link with greater sharing and development of information.",
			"An earlier review distinguished task-related from demographic diversity, finding different performance patterns. Differences between reviews partly reflect the dimensions, tasks and studies they include."
		],
		openQuestions: [
			"Which team practices help varied expertise inform decisions and reduce exclusion?",
			"When do effects change over time, across contexts or at different levels of diversity?"
		],
		whatWouldChangeMinds: [
			"Replicated longitudinal and intervention studies separating team composition from management, resources and task assignment.",
			"Evidence that identifies practical conditions for benefit using independent performance measures and inclusive participation."
		],
		misconceptions: [
			"A small average performance link does not settle ethical or legal questions about equal opportunity.",
			"Team-level correlations do not measure innate differences between groups or justify predictions about an individual applicant."
		],
		editorSummary: "Task and team processes matter more than a simple claim that every diverse team will perform better or worse.",
		population: "Teams studied across organizations, occupations and countries, using varied demographic, knowledge and cognitive diversity measures.",
		scope: "Relate defined team-diversity measures to team outcomes, distinguishing types of diversity, task demands and group-level from individual conclusions.",
		excludedEvidence: [
			"Exclude claims of innate group superiority or inferiority and individual hiring decisions inferred from team averages.",
			"Exclude treating all diversity measures as one exposure or performance correlations as a complete argument about equal opportunity."
		],
		uncertainty: "Much evidence is observational, reviews overlap and contexts differ. Small average relationships leave substantial variation between teams and tasks.",
		band: "mixed",
		sources: [
			sources.teamDiversity1,
			sources.teamDiversity3,
			sources.teamDiversity2
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "does-workplace-mentoring-help-peoples-careers",
		title: "Does workplace mentoring help people's careers?",
		bottomLine: "People with mentors tend to report better career experiences, and some studies also find better career outcomes. The link is usually clearer for satisfaction than for objective gains such as pay. Much of the evidence cannot tell whether mentoring caused the difference or who gained access to a mentor.",
		stableCore: [
			"A 2004 meta-analysis found generally favorable associations with mentoring, while effects for objective career outcomes were small. Career support and personal support were not identical forms of mentoring.",
			"A 2006 review found larger associations for informal than formal mentoring. It also highlighted the shortage of experimental comparisons, leaving selection as a possible explanation for part of the benefit.",
			"A 2022 critical review examined possible costs, risks and unequal benefits. A good relationship can help, but mentoring is not automatically positive for every worker or organization."
		],
		openQuestions: [
			"How much do well-designed mentoring programs improve careers compared with equally accessible alternatives?",
			"Which workers have access, and who may be excluded or harmed by poor matches and unequal support?"
		],
		whatWouldChangeMinds: [
			"Independent randomized or credible quasi-experimental evaluations with pay, promotion, retention and worker-experience outcomes.",
			"Longer follow-up that measures access, relationship quality, costs and adverse experiences rather than only successful matches."
		],
		misconceptions: [
			"Informal mentoring's larger association does not prove that assigning no formal program would improve outcomes.",
			"A successful person's account of a mentor does not separate mentoring from their other advantages or opportunities."
		],
		editorSummary: "Mentoring is associated with career benefits, but evidence about causation, access and unsuccessful relationships is less complete.",
		population: "Employees and people receiving workplace mentoring, with a focus on mentees' career outcomes.",
		scope: "Assess workplace mentoring and mentee career outcomes, separating formal from informal relationships and objective outcomes from satisfaction.",
		excludedEvidence: [
			"Exclude counting mentoring for students or clinical trainees as direct evidence for every corporate program.",
			"Exclude attributing career success to mentoring alone or ignoring selection, unequal access and poor mentoring experiences."
		],
		uncertainty: "Many comparisons are observational. People who obtain mentors can differ before mentoring begins, and satisfaction, pay and promotion measure different outcomes.",
		band: "mixed",
		sources: [
			sources.mentoring1,
			sources.mentoring2,
			sources.mentoring3
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "is-group-brainstorming-better-than-working-alone",
		title: "Is group brainstorming better than working alone?",
		bottomLine: "Ordinary spoken brainstorming often produces fewer distinct ideas than pooling ideas from the same number of people working alone. Taking turns can block ideas. Written or electronic formats and a mix of individual and group work can change the result. More ideas do not automatically mean better business decisions.",
		stableCore: [
			"Four classic experiments in 1987 tested explanations for the loss of ideas in interacting groups. Waiting while someone else speaks accounted for much of the difference in those tasks.",
			"A 2007 meta-analysis found that electronic brainstorming outperformed face-to-face groups. Large electronic groups outperformed nominal groups, while small nominal groups did better than electronic groups; group size and format mattered.",
			"A 2017 paper reported three experiments favoring alternating individual and group ideation for idea counts. Its pooled comparison combined those three experiments, rather than an independent review of the entire field.",
			"A 2025 study randomly assigned 157 working students to 57 small groups. Virtual writing produced more ideas and more original ideas than video-based oral brainstorming, while selection also revealed a trade-off with feasibility."
		],
		openQuestions: [
			"Which formats improve useful, implemented ideas rather than only short-task idea counts?",
			"How do results transfer to established teams facing complex real work problems?"
		],
		whatWouldChangeMinds: [
			"Replicated workplace comparisons using equal numbers of people and time, with independent quality and implementation outcomes.",
			"Evidence separating idea generation, selection and execution across oral, written and mixed formats."
		],
		misconceptions: [
			"Comparing a group with one person is not the same as comparing it with the pooled output of all its members working separately.",
			"Fewer ideas during spoken brainstorming does not show that collaboration has no value in evaluating or implementing ideas."
		],
		editorSummary: "Brainstorming format matters. Equal-person comparisons often favor individual idea generation, while written and mixed formats can help groups.",
		population: "Participants in laboratory and virtual idea-generation studies, including small groups of working students.",
		scope: "Compare idea generation using equal-person nominal, oral, electronic and alternating formats, keeping idea counts separate from practical success.",
		excludedEvidence: [
			"Exclude comparing an entire group's output with a single individual's output as evidence of group synergy.",
			"Exclude treating short creative tasks, a three-experiment pooled comparison or perceived diversity as proof about all workplace innovation."
		],
		uncertainty: "Many studies use brief tasks and student samples. Originality, feasibility and later implementation are different outcomes, and digital formats vary.",
		sources: [
			sources.brainstorming1,
			sources.brainstorming2,
			sources.brainstorming3,
			sources.brainstorming4
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "how-does-conflict-affect-team-performance",
		title: "How does conflict affect team performance?",
		bottomLine: "Personal friction and disputes about how work is organized tend to go with worse team outcomes. Disagreement about the task has a more mixed history, but a recent large review also found a negative average link. Context matters, and these findings do not show that respectful challenge should be suppressed.",
		stableCore: [
			"A 2003 meta-analysis found negative average links for both relationship and task conflict, challenging the idea that more task conflict necessarily improves results.",
			"A 2012 review of 116 studies and 8,880 groups found a more mixed task-conflict relationship. More positive links appeared in some top-management and decision-quality settings, especially when personal conflict was less closely tied to task disagreement.",
			"An updated review published in 2026 found negative average links between performance and task, relationship, process and status conflict. Task and relationship findings varied substantially across situations and methods."
		],
		openQuestions: [
			"When does constructive challenge differ from conflict as measured by common surveys?",
			"Which team practices support useful disagreement without personal friction or disruption?"
		],
		whatWouldChangeMinds: [
			"Replicated studies tracking how disagreement unfolds before decisions and later independently measured outcomes.",
			"Interventions separating constructive examination of alternatives from personal, procedural and status disputes."
		],
		misconceptions: [
			"A negative average conflict correlation is not proof that agreement is always good or that silence improves decisions.",
			"Results from top-management or decision-quality studies do not generalize to every team and performance measure."
		],
		editorSummary: "Evidence gives little support for promoting conflict in general. Useful challenge and damaging disputes need to be distinguished.",
		population: "Teams across varied organizational settings in the cited conflict-performance syntheses.",
		scope: "Compare task, relationship, process and status conflict in relation to team performance, retaining context and measurement differences.",
		excludedEvidence: [
			"Exclude equating all respectful disagreement with damaging conflict or treating consensus within a team as proof of decision quality.",
			"Exclude turning moderator correlations into universal rules about when conflict will help."
		],
		uncertainty: "Much evidence is correlational. Poor performance can itself create conflict, and task demands, measures and cultures change the observed relationship.",
		band: "mixed",
		sources: [
			sources.conflict1,
			sources.conflict3,
			sources.conflict2
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "can-job-crafting-improve-work-engagement",
		title: "Can job crafting improve work engagement?",
		bottomLine: "Sometimes. Job crafting means changing aspects of a job, such as tasks or work relationships, from the worker's side. Some programs improve engagement, but effects vary. A recent small randomized trial found changes in some crafting behaviors without a clear improvement in engagement or work performance.",
		stableCore: [
			"A 2019 intervention review included 14 studies and found small average gains in overall job crafting and work engagement. Results for performance depended on the outcome and setting.",
			"A 2024 synthesis of 66 longitudinal samples linked many forms of crafting with favorable work outcomes. Reducing hindering demands showed a different pattern, and following people over time does not remove every source of confounding.",
			"A 2026 randomized remote-work study included 87 people. It found improvement in seeking social resources, but no statistically clear gains in engagement, boredom or remote-work performance."
		],
		openQuestions: [
			"Which changes help workers in jobs where they have little control over tasks or schedules?",
			"Do benefits last and appear in independent outcomes rather than only self-reported work experience?"
		],
		whatWouldChangeMinds: [
			"Larger independent trials comparing defined crafting interventions with credible alternatives over longer periods.",
			"Evidence that separates different forms of crafting and reports job quality, performance and unintended burdens."
		],
		misconceptions: [
			"Seeking useful challenges and reducing difficult demands are not the same behavior and need not have the same effects.",
			"Encouraging workers to reshape a job does not establish that they can resolve understaffing or harmful management on their own."
		],
		editorSummary: "Job crafting has some promising results, while intervention effects on engagement and performance remain uneven.",
		population: "Employees in job-crafting research, including a small randomized study of remote workers.",
		scope: "Assess worker-led job changes and defined crafting interventions, distinguishing changed behaviors from engagement and measured performance.",
		excludedEvidence: [
			"Exclude treating all crafting behaviors as equally beneficial or longitudinal correlations as randomized intervention effects.",
			"Exclude claims that individual job changes substitute for safe staffing, employer responsibilities or necessary workplace approvals."
		],
		uncertainty: "Intervention studies are limited and varied. Small trials can miss modest effects, while self-reports and changing job conditions complicate interpretation.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.jobCrafting1,
			sources.jobCrafting2,
			sources.jobCrafting3
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "does-360-degree-feedback-improve-managers-performance",
		title: "Does 360-degree feedback improve managers' performance?",
		bottomLine: "Ratings often improve a little after 360-degree feedback, which gathers views from several people. Evidence that feedback alone causes lasting performance gains is less clear. Follow-through, support, who returns for later surveys and what is being rated all affect the result.",
		stableCore: [
			"A 2005 meta-analysis of 24 longitudinal studies found generally small improvements in ratings from direct reports, peers and supervisors. Change after feedback is not automatically change caused by feedback.",
			"In a 1993 follow-up, only 48 of the original 198 managers accepted a second assessment two years later. Their gains cannot safely be assumed to represent everyone who received the initial feedback.",
			"A 2025 randomized field experiment followed 331 managers across six feedback waves. It compared feedback sources and content over time; it was not a simple test of 360-degree feedback versus no feedback."
		],
		openQuestions: [
			"How much do observed gains reflect changed behavior, rater changes or selective follow-up?",
			"Which combinations of feedback and support improve outcomes that matter to employees and organizations?"
		],
		whatWouldChangeMinds: [
			"Independent trials comparing multisource feedback with credible alternatives and measuring behavior beyond later rating scores.",
			"Long-term studies retaining most participants and separating feedback from coaching and other development activities."
		],
		misconceptions: [
			"More raters do not make a score an objective or bias-free measure of performance.",
			"A later rise in scores does not identify feedback as the cause or prove an improvement in organizational results."
		],
		editorSummary: "Multisource feedback can inform development, while average rating gains are small and evidence for feedback-alone effects is limited.",
		population: "Managers receiving multisource or related performance feedback in longitudinal studies and a field experiment.",
		scope: "Assess changes after multisource feedback, distinguishing ratings, later behavior, participant retention and active feedback comparisons.",
		excludedEvidence: [
			"Exclude interpreting an uncontrolled before-and-after rating change as the causal effect of feedback alone.",
			"Exclude treating active feedback-source comparisons or the returning minority of a cohort as a representative no-feedback experiment."
		],
		uncertainty: "Many studies lack a credible untreated comparison. Attrition, shared raters, coaching and ceiling effects can affect apparent improvement.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.multisource1,
			sources.multisource2,
			sources.multisource3
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "are-engaged-employees-more-productive",
		title: "Are engaged employees more productive?",
		bottomLine: "Engaged employees tend to receive better performance ratings, and some evidence links engagement with later performance. That does not prove that raising an engagement score will raise output. Good working conditions, resources and success at work can also help people feel more engaged.",
		stableCore: [
			"Work engagement usually refers to vigor, dedication and absorption in work. Those measures differ from job satisfaction, long hours or a company's own engagement survey.",
			"A 2023 synthesis identified 174 studies and reported a positive overall performance correlation using 166 independent samples. A separate 2022 review also found positive performance and negative absenteeism associations, including in longitudinal analyses.",
			"A 2020 comparison across public, semipublic and private sectors found that some engagement relationships differ by sector. Attitudes, intentions, attendance and work output are distinct outcomes."
		],
		openQuestions: [
			"Which workplace changes improve both engagement and independently measured performance?",
			"How much of the association is due to common surveys, earlier success or resources available to employees?"
		],
		whatWouldChangeMinds: [
			"Replicated interventions that change working conditions and track engagement alongside objective work quality and quantity.",
			"Longitudinal studies that test reverse effects and separate self-ratings from independent measures."
		],
		misconceptions: [
			"A correlation of 0.37 does not mean that engaged workers produce 37% more output.",
			"Enthusiasm, long hours and constant availability are not interchangeable measures of useful performance."
		],
		editorSummary: "The engagement-performance link is well documented, while the effect of trying to raise engagement scores requires separate evidence.",
		population: "Employees across organizational sectors in work-engagement and performance research.",
		scope: "Relate defined engagement measures to task performance and attendance, separating associations, prediction and tested interventions.",
		excludedEvidence: [
			"Exclude equating a commercial engagement score with a measured productivity increase.",
			"Exclude interpreting longitudinal prediction or corrected correlations as proof that requiring more enthusiasm causes better work."
		],
		uncertainty: "Shared ratings, job resources and reverse effects can contribute to the association. Performance measures and engagement definitions vary.",
		sources: [
			sources.engagement1,
			sources.engagement2,
			sources.engagement3
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "does-job-autonomy-improve-employee-wellbeing",
		title: "Does job autonomy improve employee well-being?",
		bottomLine: "More say over how work is done is generally linked to better well-being. The benefit is not simply unlimited freedom: resources, responsibilities and support still matter. Some workers with more autonomy also find it harder to stop thinking about work afterward.",
		stableCore: [
			"A study starting with a survey of 4,340 people found positive links between job autonomy and psychological well-being. Its prospective analysis used a six-month follow-up; the design still does not fully establish causation.",
			"A 2018 meta-analysis linked autonomy-supportive leadership with well-being and positive work behaviors. Supportive leadership and formal control over job decisions are related but different exposures.",
			"A broad work-design review combined 259 studies and many job characteristics. Its findings cannot attribute the combined influence of all those characteristics to autonomy alone.",
			"A 2026 three-wave study of 331 people linked autonomy with task performance through work-related thinking, but also with poorer detachment from work. It illustrates a possible trade-off rather than proving that autonomy harms everyone."
		],
		openQuestions: [
			"How do workload, support and work-home boundaries alter the benefits of more discretion?",
			"Which changes help workers with little control without shifting extra responsibility onto them?"
		],
		whatWouldChangeMinds: [
			"Replicated workplace interventions that change actual decision control and measure well-being, workload and later functioning.",
			"Longitudinal evidence separating formal autonomy, supportive management and the demands accompanying each."
		],
		misconceptions: [
			"Autonomy is not the same as leaving employees without guidance, resources or support.",
			"A review of many work characteristics does not show that autonomy alone explains all observed differences in well-being or performance."
		],
		editorSummary: "Employee discretion is usually associated with better well-being, with important limits around workload, support and switching off.",
		population: "Employees in surveys, prospective work-design studies and autonomy-supportive leadership research.",
		scope: "Assess decision control over work and employee well-being, keeping job autonomy distinct from leadership support and bundled job-design changes.",
		excludedEvidence: [
			"Exclude assigning all benefits of a multi-feature work-design model to autonomy alone.",
			"Exclude treating unsupervised work, unlimited responsibility and supportive discretion as the same condition."
		],
		uncertainty: "Much evidence is observational. Workers with greater control can also have more resources, status or demands, and supportive leadership is a separate construct.",
		sources: [
			sources.autonomy4,
			sources.autonomy2,
			sources.autonomy1,
			sources.autonomy3
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "does-switching-off-from-work-help-recovery",
		title: "Does switching off from work help recovery?",
		bottomLine: "Being able to put work aside during time off is linked to less exhaustion and better sleep and well-being. Programs can improve this sense of detachment on average. That does not mean every thought about work is harmful, or that employees can solve excessive job demands through individual habits alone.",
		stableCore: [
			"A 2017 meta-analysis of 91 samples linked detachment with several favorable self-reported health and recovery outcomes. Links with physiological stress and work motivation were not clearly different from zero.",
			"A 2021 intervention synthesis included 30 studies, 34 interventions and 3,725 people. It found a small-to-moderate average improvement in detachment, which is not the same as proving equivalent health or productivity gains.",
			"A 2023 systematic review of 159 studies examined what helps or hinders detachment. Job demands, communication practices and organizational conditions belong in the explanation alongside personal differences."
		],
		openQuestions: [
			"Which interventions produce lasting health gains beyond improved detachment scores?",
			"How do effects differ for workers with caring duties, insecure jobs or required on-call work?"
		],
		whatWouldChangeMinds: [
			"Larger trials measuring sleep, well-being and work outcomes over time, alongside actual changes in job demands.",
			"Evidence separating unwanted rumination from useful or positive thoughts about work."
		],
		misconceptions: [
			"Improving a detachment score does not prove an equally sized improvement in every health or performance outcome.",
			"Time away from work does not provide full recovery when high demands or required availability continue."
		],
		editorSummary: "Detachment is a useful part of recovery, with both work conditions and personal circumstances shaping whether it is possible.",
		population: "Employees studied during time away from work and participants in detachment interventions.",
		scope: "Assess psychological detachment outside work and recovery, distinguishing self-reported links from intervention effects on specific outcomes.",
		excludedEvidence: [
			"Exclude treating all work-related thoughts as equivalent to unwanted rumination.",
			"Exclude promising broad health or productivity gains solely from a changed detachment score, or assigning responsibility for excessive demands only to workers."
		],
		uncertainty: "Studies use varied measures, many outcomes are self-reported and effects differ across work conditions. Intervention gains in detachment do not settle every downstream outcome.",
		sources: [
			sources.detachment1,
			sources.detachment2,
			sources.detachment3
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "how-do-long-commutes-affect-wellbeing",
		title: "How do long commutes affect well-being?",
		bottomLine: "Long commutes are often linked to more strain and less satisfaction with leisure time. The link with overall life satisfaction is less consistent. People may accept a difficult journey for better pay, housing or work, and crowding, reliability and travel mode also matter.",
		stableCore: [
			"A meta-analysis pooling 39 studies found a small positive link between commuting demands and strain, but no clear pooled link with well-being. Its broader systematic review covered 109 studies.",
			"A panel study of more than 26,000 workers in England linked longer journeys with lower job and leisure satisfaction and poorer mental-health measures. It did not find a simple overall life-satisfaction penalty for everyone.",
			"A 2020 critical review found that congestion, crowding and uncertainty can make commuting unpleasant, with effects spilling into work and home. It also found no consistent overall life-satisfaction relationship.",
			"A 2024 Beijing survey study examined links between commute, job and life satisfaction. Its results also allowed for overall life satisfaction influencing how people rate their journeys, highlighting the possibility of reverse effects."
		],
		openQuestions: [
			"How do changes in reliability, mode or journey time affect different aspects of well-being over time?",
			"How much do housing costs, job opportunities and unequal travel options alter the trade-offs?"
		],
		whatWouldChangeMinds: [
			"Credible natural experiments tracking people before and after transport or work-location changes, with housing and employment outcomes included.",
			"Replications that separate journey experience, daily strain and overall life satisfaction rather than merging them into one measure."
		],
		misconceptions: [
			"A less pleasant commute does not necessarily mean lower overall life satisfaction after all other trade-offs.",
			"A survey relationship between travel and well-being does not establish which one caused the other."
		],
		editorSummary: "The clearest burden of a long commute concerns time and daily experience, while overall well-being depends on wider trade-offs.",
		population: "Workers in commuting research, including longitudinal data from England and survey evidence from Beijing.",
		scope: "Assess commute duration and experience in relation to strain and subjective well-being, separating journey, job, leisure and overall life satisfaction.",
		excludedEvidence: [
			"Exclude universal commute-time thresholds or assumptions that all travel modes and routes impose the same burden.",
			"Exclude treating active-travel exercise benefits or a cross-sectional satisfaction model as proof of the causal effect of journey time."
		],
		uncertainty: "People select jobs and homes under different constraints. Pay, housing, health and travel options confound comparisons, and well-being measures capture different outcomes.",
		band: "mixed",
		sources: [
			sources.commuting4,
			sources.commuting2,
			sources.commuting1,
			sources.commuting3
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "do-office-plants-make-people-more-productive",
		title: "Do office plants make people more productive?",
		bottomLine: "A dependable productivity benefit has not been established. Plants can make a room feel more pleasant, and some short studies find less stress or better task scores. Results in real offices are less consistent. Feeling better in a room is a different outcome from doing more or better work.",
		stableCore: [
			"A 2022 systematic review included 42 records, with only 16 contributing to its separate meta-analyses. Each pooled function used just two or three records, and attention and response-time effects were not statistically clear.",
			"A 2020 paper found improved task results in a laboratory but did not reproduce clear benefits in two call-center field studies lasting six and fourteen weeks.",
			"A 2025 crossover study of 40 workers found some immediate stress and fatigue benefits after an hour in a planted room. Attention findings differed by subgroup and do not establish lasting productivity gains.",
			"A 2026 randomized office study reported greater satisfaction with the indoor environment and some physiological differences, while productivity remained unchanged."
		],
		openQuestions: [
			"Do any benefits persist in ordinary offices over months, using independent measures of work quality?",
			"How do expectations, room design, daylight and plant maintenance contribute to observed differences?"
		],
		whatWouldChangeMinds: [
			"Larger independent field trials with comparable rooms, longer follow-up and objective performance outcomes.",
			"Replications that distinguish comfort and short-term attention from meaningful workplace productivity."
		],
		misconceptions: [
			"A positive laboratory task result does not establish a productivity gain in everyday work.",
			"Evidence about comfort or attention does not prove that ordinary houseplants meaningfully clean the air in a whole building."
		],
		editorSummary: "Office plants may improve the experience of a space, while claims of reliable productivity gains exceed the evidence.",
		population: "Participants in indoor-plant studies, including laboratory samples, call-center staff and small workplace experiments.",
		scope: "Assess ordinary indoor plants and work performance, keeping room satisfaction, stress measures and short attention tasks as separate outcomes.",
		excludedEvidence: [
			"Exclude converting room preference or short-term physiological changes into a proven productivity increase.",
			"Exclude air-purification claims, outdoor green-space benefits and subgroup findings presented as universal effects of office plants."
		],
		uncertainty: "Studies are often small, short and difficult to blind. Few records contribute to each pooled outcome, and laboratory gains have not consistently appeared in offices.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.plants1,
			sources.plants2,
			sources.plants3,
			sources.plants4
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "does-employee-ownership-improve-company-performance",
		title: "Does employee ownership improve company performance?",
		bottomLine: "Employee ownership has a small positive average link with company performance, but results vary widely. It is hard to separate ownership from the firms and practices that adopt it. Higher productivity, higher profits and a good financial outcome for workers are also different questions.",
		stableCore: [
			"A 2016 meta-analysis combined 102 samples representing 56,984 firms. Its average performance correlation was positive but small, around 0.04, with variation across settings.",
			"A European panel analysis published in 2017 found no statistically clear standalone variance contribution from ownership. Joint relationships with firm and other contextual factors were more important; those variance shares are not causal productivity gains.",
			"A Chinese study published in 2025 linked stock-ownership plans with higher productivity but found that compensation costs could offset gains in operating performance. Listed firms in that setting do not represent every ownership model."
		],
		openQuestions: [
			"Which ownership arrangements and participation practices produce lasting benefits for firms and workers?",
			"How much do selection, management quality and local institutions explain the average link?"
		],
		whatWouldChangeMinds: [
			"Credible quasi-experiments comparing similar firms before and after ownership changes, including costs and worker outcomes.",
			"Replicated evidence distinguishing broad worker ownership, concentrated executive awards and different levels of employee participation."
		],
		misconceptions: [
			"A correlation of 0.04 does not mean that adopting a plan increases every firm's productivity by 4%.",
			"Better firm performance does not establish that holding more of an employer's stock is a suitable personal investment."
		],
		editorSummary: "Ownership can be part of a productive organization, while the small average relationship and differences between plans limit simple promises.",
		population: "Firms with varied employee-ownership arrangements, including European firms and listed Chinese companies.",
		scope: "Relate employee ownership to company productivity and financial performance, distinguishing ownership design, firm selection and compensation costs.",
		excludedEvidence: [
			"Exclude treating a variance decomposition or performance correlation as a guaranteed causal percentage gain.",
			"Exclude personal investment advice, executive-only incentives treated as broad employee ownership and assumptions that productivity equals profit or worker welfare."
		],
		uncertainty: "Ownership adoption is often selective, institutions and plan designs differ, and performance gains can be offset by costs. Most evidence is not randomized.",
		band: "mixed",
		sources: [
			sources.ownership1,
			sources.ownership2,
			sources.ownership3
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "does-business-training-help-small-firms-grow",
		title: "Does business training help small firms grow?",
		bottomLine: "In studies from lower-income settings, business training produces modest average gains in sales and profits. Some well-designed programs help, while others show little clear effect. Results depend on the business, training and local market, and they do not guarantee that any course will pay for itself.",
		stableCore: [
			"A 2021 review of randomized evaluations estimated average profit and sales gains of roughly 5–10%. Effects of that size can be hard for small individual trials to detect.",
			"A Kenyan market-level experiment found higher sales and profits for trained women-owned businesses three years later. It did not detect clear losses among competitors, but uncertain spillover estimates are not proof of zero harm.",
			"An Ethiopian trial published in 2022 found benefits from formal business training. Its separate mentoring component improved some business practices without a statistically clear profit gain, showing that related interventions need separate evaluation."
		],
		openQuestions: [
			"Which programs are cost-effective at scale and help businesses facing credit, market or time constraints?",
			"How do benefits spread to competitors, workers and customers rather than only trained firms?"
		],
		whatWouldChangeMinds: [
			"Independent large-scale trials with reliable profit measures, full program costs and several years of follow-up.",
			"Replications across sectors and markets that measure spillovers and distinguish training from mentoring or finance."
		],
		misconceptions: [
			"Failure to detect a statistically clear effect in a small trial does not prove that the true effect is exactly zero.",
			"A standard-deviation effect is not a percentage profit increase, and average gains are not a promise for a particular firm."
		],
		editorSummary: "Evidence supports modest average gains in the studied settings, with program quality, costs and local constraints shaping practical value.",
		population: "Small and microenterprises in the developing-country training literature, including women-owned businesses in Kenya and Ethiopia.",
		scope: "Assess business-training effects on practices, sales and profits in the studied settings, separating mentoring, finance and market spillovers.",
		excludedEvidence: [
			"Exclude extrapolating an average trial effect to a guaranteed return from a commercial course or every national business environment.",
			"Exclude treating mentoring and training as one intervention or an uncertain competitor effect as proof of no displacement."
		],
		uncertainty: "Programs, markets and profit measures vary, and many trials are small. Scaling costs, selection and local constraints can change the value of training.",
		sources: [
			sources.businessTraining1,
			sources.businessTraining2,
			sources.businessTraining3
		]
	}, novemberWorkplaceResearchCheckedAt),
	reviewedEntry({
		topicSlug: "work-and-organizations",
		slug: "do-anonymous-applications-reduce-hiring-discrimination",
		title: "Do anonymous applications reduce hiring discrimination?",
		bottomLine: "They can reduce some early screening gaps, but results are mixed. Some studies find improved interview chances for disadvantaged applicants; a French randomized program found the opposite among participating firms. Anonymizing the first stage also does not ensure equal treatment at interviews or in final job offers.",
		stableCore: [
			"A French experiment published in 2015 randomly assigned participating employers to receive anonymous or named résumés. Minority applicants became less likely to be interviewed or hired in the anonymous condition. Employers' voluntary participation limits generalization.",
			"A 2012 Swedish field study found better interview chances for women and applicants of non-Western origin. Job-offer gains appeared for women, while ethnic-minority applicants remained disadvantaged at the offer stage.",
			"A Dutch city evaluation published in 2024 found improved interview chances for some minority groups. Hiring improvements were less consistent across years, and a comparison with an earlier reference period is weaker than randomized assignment.",
			"An evidence overview updated in January 2025 concludes that the effects depend on context and that later hiring outcomes remain mixed. It draws on existing studies rather than supplying an independent new experiment."
		],
		openQuestions: [
			"Which anonymization methods reduce unfair barriers without removing context that helps interpret an application fairly?",
			"Do any early gains persist through interviews, offers and later employment across different labor markets?"
		],
		whatWouldChangeMinds: [
			"Replicated randomized evaluations with interview and offer outcomes, transparent participation and attention to all stages of selection.",
			"Evidence comparing standardized anonymous forms with manual redaction while measuring unintended effects and applicant experience."
		],
		misconceptions: [
			"Removing names does not remove every cue to identity or eliminate later opportunities for discrimination.",
			"A favorable interview-rate result is not the same as a demonstrated improvement in final hiring outcomes for every group."
		],
		editorSummary: "Anonymous applications are a context-sensitive intervention, with contrasting field results and important differences between screening and final hiring.",
		population: "Applicants and employers in French, Swedish and Dutch hiring studies, with different participation and evaluation designs.",
		scope: "Assess anonymized initial applications through interview and job-offer outcomes, distinguishing randomized evidence from field and historical comparisons.",
		excludedEvidence: [
			"Exclude claims that one country's pilot guarantees fair hiring everywhere or that interview access establishes equal job-offer rates.",
			"Exclude individual hiring judgments, legal-compliance advice and treating a historical comparison as a randomized experiment."
		],
		uncertainty: "Applicant groups, employer participation, redaction methods and later selection stages differ. Some evaluations lack randomized controls, and the strongest trial had selective employer participation.",
		band: "mixed",
		sources: [
			sources.anonymousIzaV3,
			sources.anonymous1,
			sources.anonymous2,
			sources.anonymous3
		]
	}, novemberWorkplaceResearchCheckedAt)
];
