import type { SeedClaim } from "./claims.js";
import { reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberDigestiveHealthResearchCheckedAt = "2026-11-13T19:30:14.913Z";

const sources: Record<string, SeedClaim["sources"][number]> = {
	"acid-1": {
		title: "Short-term treatment with proton pump inhibitors, H2-receptor antagonists and prokinetics for gastro-oesophageal reflux disease-like symptoms and endoscopy negative reflux disease",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2013,
		url: "https://doi.org/10.1002/14651858.cd002095.pub5",
		doi: "10.1002/14651858.cd002095.pub5",
		note: "2013 Cochrane review compares short-term treatment of adult reflux-like and endoscopy-negative symptoms. PPIs generally provide more relief than H2 blockers or placebo. It does not establish the cause of every case of heartburn or long-term comparative safety. Inconsistent indexed totals and event wording are not used for numerical claims here.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd002095.pub5",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd002095.pub5&rows=100"
		],
		order: 1
	},
	"acid-2": {
		title: "Comparison of acid‐lowering drugs for endoscopy negative reflux disease: Systematic review and network Meta‐Analysis",
		publisher: "Neurogastroenterology & Motility",
		year: 2023,
		url: "https://doi.org/10.1111/nmo.14469",
		doi: "10.1111/nmo.14469",
		note: "Network review of 23 trials in adults with endoscopy-negative reflux disease distinguishes complete from adequate symptom relief. Rankings depend on outcome and follow-up; they are not percentages of patients helped. Short-term tolerability does not settle rare or long-term harms.",
		kind: "meta_analysis",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1111/nmo.14469",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fnmo.14469&rows=100"
		],
		order: 1
	},
	"gerd-guideline": {
		title: "ACG Clinical Guideline for the Diagnosis and Management of Gastroesophageal Reflux Disease",
		publisher: "American Journal of Gastroenterology",
		year: 2022,
		url: "https://doi.org/10.14309/ajg.0000000000001538",
		doi: "10.14309/ajg.0000000000001538",
		note: "2022 ACG guidance supports PPIs for relevant reflux disease and selected lifestyle measures. Weight-loss advice has stronger evidence than bed elevation or meal-timing advice. Its GRADE judgments belong to the guideline, not a new site assessment. Author disclosures include pharmaceutical/device consulting, research support, royalties, advisory work and stock options.",
		kind: "guideline",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.14309/ajg.0000000000001538",
			"https://api.crossref.org/works?filter=updates%3A10.14309%2Fajg.0000000000001538&rows=100"
		],
		order: 1
	},
	"gerd-review": {
		title: "Gastroesophageal Reflux Disease",
		publisher: "JAMA",
		year: 2020,
		url: "https://doi.org/10.1001/jama.2020.21360",
		doi: "10.1001/jama.2020.21360",
		note: "Clinical narrative review explains reflux treatment, diagnostic uncertainty and warning symptoms. It is not a systematic pooled treatment-effect estimate. Observational associations between PPI use and harms require causal caution, and intentional weight loss in selected patients differs from unexplained weight loss.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1001/jama.2020.21360",
			"https://api.crossref.org/works?filter=updates%3A10.1001%2Fjama.2020.21360&rows=100"
		],
		order: 1
	},
	"lifestyle-2": {
		title: "Systematic review: Clinical effectiveness of interventions for the treatment of nocturnal gastroesophageal reflux",
		publisher: "Neurogastroenterology & Motility",
		year: 2022,
		url: "https://doi.org/10.1111/nmo.14385",
		doi: "10.1111/nmo.14385",
		note: "Narrative synthesis of 31 studies examines nighttime reflux. It finds limited support for some measures, while evidence for bedtime H2 add-on treatment is insufficient. Populations and endpoints differ. Disclosed author relationships include pharmaceutical, nutrition and device companies; broad response ranges are not head-to-head comparisons.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1111/nmo.14385",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fnmo.14385&rows=100"
		],
		order: 1
	},
	"lifestyle-1": {
		title: "Lifestyle Intervention in Gastroesophageal Reflux Disease",
		publisher: "Clinical Gastroenterology and Hepatology",
		year: 2016,
		url: "https://doi.org/10.1016/j.cgh.2015.04.176",
		doi: "10.1016/j.cgh.2015.04.176",
		note: "Mixed-design review combines small trials and observational evidence for lifestyle measures. Acid-exposure markers and lasting symptom relief are different outcomes; weight change often occurs alongside other behavior changes. The 2016 publication searched through 2014, and its studies overlap later syntheses.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1016/j.cgh.2015.04.176",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.cgh.2015.04.176&rows=100"
		],
		order: 1
	},
	"weight-1": {
		title: "Weight loss can lead to resolution of gastroesophageal reflux disease symptoms: A prospective intervention trial",
		publisher: "Obesity",
		year: 2013,
		url: "https://doi.org/10.1002/oby.20279",
		doi: "10.1002/oby.20279",
		note: "Prospective program study follows 332 adults while weight, diet and activity change together. Symptom improvements support possible benefit but cannot isolate weight loss as a randomized intervention. Response denominators are not sufficiently clear for an individual success percentage.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1002/oby.20279",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2Foby.20279&rows=100"
		],
		order: 1
	},
	"weight-2": {
		title: "Weight Loss and Reduction in Gastroesophageal Reflux. A Prospective Population-Based Cohort Study: The HUNT Study",
		publisher: "American Journal of Gastroenterology",
		year: 2013,
		url: "https://doi.org/10.1038/ajg.2012.466",
		doi: "10.1038/ajg.2012.466",
		note: "Population-based HUNT cohort links weight loss with less reflux, with differences across medication and symptom groups. The observational design leaves residual confounding and does not establish one treatment target or a universal effect.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1038/ajg.2012.466",
			"https://api.crossref.org/works?filter=updates%3A10.1038%2Fajg.2012.466&rows=100"
		],
		order: 1
	},
	"bed-1": {
		title: "Head of bed elevation to relieve gastroesophageal reflux symptoms: a systematic review",
		publisher: "BMC Family Practice",
		year: 2021,
		url: "https://doi.org/10.1186/s12875-021-01369-0",
		doi: "10.1186/s12875-021-01369-0",
		note: "Five controlled studies involving 228 patients suggest possible symptom benefit, but most use crossover designs and all have important bias concerns. Different bed or support designs and short follow-up prevent a reliable best-setup or lasting-benefit conclusion. Symptom outcomes and acid exposure are distinct.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1186/s12875-021-01369-0",
			"https://api.crossref.org/works?filter=updates%3A10.1186%2Fs12875-021-01369-0&rows=100"
		],
		order: 1
	},
	"meal-1": {
		title: "Nocturnal Reflux Episodes Following the Administration of a Standardized Meal. Does Timing Matter?",
		publisher: "The American Journal of Gastroenterology",
		year: 2007,
		url: "https://doi.org/10.1111/j.1572-0241.2007.01348.x",
		doi: "10.1111/j.1572-0241.2007.01348.x",
		note: "Small unblinded crossover study enrolled 32 people, with 30 completing two study nights. A later meal increased acid exposure while lying down without a clear difference in total symptoms. It does not establish long-term benefit from a particular eating schedule or test weight loss.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1111/j.1572-0241.2007.01348.x",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fj.1572-0241.2007.01348.x&rows=100"
		],
		order: 1
	},
	"fodmap-1": {
		title: "Efficacy of a low FODMAP diet in irritable bowel syndrome: systematic review and network meta-analysis",
		publisher: "Gut",
		year: 2022,
		url: "https://doi.org/10.1136/gutjnl-2021-325214",
		doi: "10.1136/gutjnl-2021-325214",
		note: "Earlier network review includes 13 trials, mainly in specialty IBS settings. Global symptoms, bowel habit and other outcomes give different comparisons. Most trials do not establish long-term nutrition or outcomes after food reintroduction. Its trial base overlaps the newer dietary synthesis.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1136/gutjnl-2021-325214",
			"https://api.crossref.org/works?filter=updates%3A10.1136%2Fgutjnl-2021-325214&rows=100"
		],
		order: 1
	},
	"fodmap-2": {
		title: "Efficacy of dietary interventions in irritable bowel syndrome: a systematic review and network meta-analysis",
		publisher: "The Lancet Gastroenterology & Hepatology",
		year: 2025,
		url: "https://doi.org/10.1016/s2468-1253(25)00054-8",
		doi: "10.1016/s2468-1253(25)00054-8",
		note: "2025 network review includes 28 dietary trials. Low-FODMAP care has the largest evidence base, while some highly ranked alternatives rely on very few studies. Most comparisons have low or very low confidence; selected direct comparisons with habitual diet have moderate confidence. Ranking does not identify one best diet for everyone.",
		kind: "meta_analysis",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1016/s2468-1253(25)00054-8",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fs2468-1253%2825%2900054-8&rows=100"
		],
		order: 1
	},
	"fodmap-3": {
		title: "A Diet Low in FODMAPs Reduces Symptoms of Irritable Bowel Syndrome",
		publisher: "Gastroenterology",
		year: 2014,
		url: "https://doi.org/10.1053/j.gastro.2013.09.046",
		doi: "10.1053/j.gastro.2013.09.046",
		note: "Short crossover trial studied 30 IBS patients and eight healthy comparators, with most food supplied. IBS symptom benefit does not establish a benefit for healthy people or long-term real-world feasibility. Individual bowel outcomes vary by IBS subtype.",
		kind: "context",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1053/j.gastro.2013.09.046",
			"https://api.crossref.org/works?filter=updates%3A10.1053%2Fj.gastro.2013.09.046&rows=100"
		],
		order: 1
	},
	"diet-guidance": {
		title: "AGA Clinical Practice Update on the Role of Diet in Irritable Bowel Syndrome: Expert Review",
		publisher: "Gastroenterology",
		year: 2022,
		url: "https://doi.org/10.1053/j.gastro.2021.12.248",
		doi: "10.1053/j.gastro.2021.12.248",
		note: "AGA expert practice advice supports individualized dietary care, nutrition assessment and dietitian involvement. It distinguishes limited restriction from reintroduction and personalization. Food insecurity, malnutrition and eating disorders affect suitability. The document explicitly does not perform a systematic review or formal evidence grading.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1053/j.gastro.2021.12.248",
			"https://api.crossref.org/works?filter=updates%3A10.1053%2Fj.gastro.2021.12.248&rows=100"
		],
		order: 1
	},
	"ibs-guideline": {
		title: "ACG Clinical Guideline: Management of Irritable Bowel Syndrome",
		publisher: "American Journal of Gastroenterology",
		year: 2021,
		url: "https://doi.org/10.14309/ajg.0000000000001036",
		doi: "10.14309/ajg.0000000000001036",
		note: "ACG guidance supports selected dietary and gut-directed psychological care. Its conditional recommendation against antispasmodics concerns global IBS symptoms and drugs available in the United States, with low-certainty evidence. Guideline financial support is reported as none, alongside extensive author consulting, research, equity, licensing and professional-board interests.",
		kind: "guideline",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.14309/ajg.0000000000001036",
			"https://api.crossref.org/works?filter=updates%3A10.14309%2Fajg.0000000000001036&rows=100"
		],
		order: 1
	},
	"peppermint-1": {
		title: "Systematic review and meta‐analysis: efficacy of peppermint oil in irritable bowel syndrome",
		publisher: "Alimentary Pharmacology & Therapeutics",
		year: 2022,
		url: "https://doi.org/10.1111/apt.17179",
		doi: "10.1111/apt.17179",
		note: "Ten-trial synthesis finds average symptom benefit but judges the evidence very low certainty and reports more adverse effects. Products and endpoints vary. Included trials overlap other citations; favorable pooled findings need consideration alongside newer trials with null primary outcomes.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1111/apt.17179",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fapt.17179&rows=100"
		],
		order: 1
	},
	"peppermint-2": {
		title: "Peppermint Oil Treatment for Irritable Bowel Syndrome: A Randomized Placebo-Controlled Trial",
		publisher: "American Journal of Gastroenterology",
		year: 2021,
		url: "https://doi.org/10.14309/ajg.0000000000001395",
		doi: "10.14309/ajg.0000000000001395",
		note: "Six-week randomized placebo-controlled trial found improvement in both groups without clear between-group benefit on primary or secondary outcomes. Sensitivity analyses did not change that conclusion. Improvement during treatment alone does not establish specific efficacy. Indexed support includes an NCCIH grant.",
		kind: "context",
		stance: "debate",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.14309/ajg.0000000000001395",
			"https://api.crossref.org/works?filter=updates%3A10.14309%2Fajg.0000000000001395&rows=100"
		],
		order: 1
	},
	"peppermint-3": {
		title: "Efficacy and Safety of Peppermint Oil in a Randomized, Double-Blind Trial of Patients With Irritable Bowel Syndrome",
		publisher: "Gastroenterology",
		year: 2020,
		url: "https://doi.org/10.1053/j.gastro.2019.08.026",
		doi: "10.1053/j.gastro.2019.08.026",
		note: "Dutch trial randomized 190 patients to two peppermint formulations or placebo. Neither formulation clearly improved the prespecified primary response outcomes. Some secondary scores favored one formulation, and mild adverse effects were more common. Secondary benefits do not replace the null main comparisons.",
		kind: "context",
		stance: "debate",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1053/j.gastro.2019.08.026",
			"https://api.crossref.org/works?filter=updates%3A10.1053%2Fj.gastro.2019.08.026&rows=100"
		],
		order: 1
	},
	"behavior-1": {
		title: "Efficacy of psychological therapies for irritable bowel syndrome: systematic review and network meta-analysis",
		publisher: "Gut",
		year: 2020,
		url: "https://doi.org/10.1136/gutjnl-2020-321191",
		doi: "10.1136/gutjnl-2020-321191",
		note: "Network review of 41 adult IBS trials finds support for several psychological therapies, including CBT and gut-directed hypnotherapy. Bias and possible publication effects may inflate benefits. Similar estimates do not prove that therapies are equivalent, and the trials overlap newer reviews.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1136/gutjnl-2020-321191",
			"https://api.crossref.org/works?filter=updates%3A10.1136%2Fgutjnl-2020-321191&rows=100"
		],
		order: 1
	},
	"behavior-2": {
		title: "Effect of Brain-Gut Behavioral Treatments on Abdominal Pain in Irritable Bowel Syndrome: Systematic Review and Network Meta-Analysis",
		publisher: "Gastroenterology",
		year: 2024,
		url: "https://doi.org/10.1053/j.gastro.2024.05.010",
		doi: "10.1053/j.gastro.2024.05.010",
		note: "Network review examines abdominal pain, not every global IBS outcome. Some approaches show benefit, while no treatment is clearly superior. No trial has low risk of bias across every domain, and publication effects are possible. Active controls and selected refractory populations affect interpretation.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1053/j.gastro.2024.05.010",
			"https://api.crossref.org/works?filter=updates%3A10.1053%2Fj.gastro.2024.05.010&rows=100"
		],
		order: 1
	},
	"behavior-3": {
		title: "Efficacy of behavioural therapies for irritable bowel syndrome: a systematic review and network meta-analysis",
		publisher: "The Lancet Gastroenterology & Hepatology",
		year: 2025,
		url: "https://doi.org/10.1016/s2468-1253(25)00238-9",
		doi: "10.1016/s2468-1253(25)00238-9",
		note: "2025 review covers 67 behavioral-treatment trials. All direct and indirect comparisons have low or very low confidence, with no trial at low risk of bias across all domains. Waiting-list and attention-control comparisons differ, and publication bias is possible. Tested IBS programs are distinct from general stress advice.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1016/s2468-1253(25)00238-9",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fs2468-1253%2825%2900238-9&rows=100"
		],
		order: 1
	},
	"cbt-1": {
		title: "Internet-Delivered Cognitive Behavioral Therapy in Patients With Irritable Bowel Syndrome: Systematic Review and Meta-Analysis",
		publisher: "Journal of Medical Internet Research",
		year: 2022,
		url: "https://doi.org/10.2196/35260",
		doi: "10.2196/35260",
		note: "Nine-trial review supports symptom and quality-of-life benefits from some internet-delivered IBS-focused CBT programs. Follow-up effects are smaller, programs differ and high-quality studies are limited. The pooled anxiety and depression findings are not clearly positive, so gastrointestinal benefit is a separate outcome.",
		kind: "meta_analysis",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.2196/35260",
			"https://api.crossref.org/works?filter=updates%3A10.2196%2F35260&rows=100"
		],
		order: 1
	},
	"hypnosis-1": {
		title: "Gut‐Directed Hypnotherapy for Irritable Bowel Syndrome: A Systematic Review and Meta‐Analysis",
		publisher: "Neurogastroenterology & Motility",
		year: 2025,
		url: "https://doi.org/10.1111/nmo.70037",
		doi: "10.1111/nmo.70037",
		note: "2025 synthesis finds an imprecise overall global-symptom estimate whose confidence interval crosses no effect, despite favorable subgroup and pain findings. Heterogeneity is high. This does not identify a universally effective format or intensity. Indexed support includes Kaiser Permanente.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1111/nmo.70037",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fnmo.70037&rows=100"
		],
		order: 1
	},
	"hypnosis-2": {
		title: "Randomised clinical trial: individual versus group hypnotherapy for irritable bowel syndrome",
		publisher: "Alimentary Pharmacology & Therapeutics",
		year: 2022,
		url: "https://doi.org/10.1111/apt.16934",
		doi: "10.1111/apt.16934",
		note: "Trial compares individual with group nurse-administered hypnotherapy in 119 patients. Both groups improve, without a clear between-format difference. There is no untreated or placebo arm, so it cannot alone isolate specific efficacy or prove equivalence. Follow-up extends to six months.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1111/apt.16934",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fapt.16934&rows=100"
		],
		order: 1
	},
	"constipation-1": {
		title: "Efficacy and Safety of Over-the-Counter Therapies for Chronic Constipation: An Updated Systematic Review",
		publisher: "American Journal of Gastroenterology",
		year: 2021,
		url: "https://doi.org/10.14309/ajg.0000000000001222",
		doi: "10.14309/ajg.0000000000001222",
		note: "Review of 41 over-the-counter treatment trials supports some PEG and senna benefits, with varied outcomes and limited harms evidence. Its evidence categories are the authors' assessment, not site-performed GRADE. Bayer funded manuscript development, BioCentric supported writing/search, and author disclosures include relevant industry consulting and research ties.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.14309/ajg.0000000000001222",
			"https://api.crossref.org/works?filter=updates%3A10.14309%2Fajg.0000000000001222&rows=100"
		],
		order: 1
	},
	"constipation-2": {
		title: "Efficacy of drugs in chronic idiopathic constipation: a systematic review and network meta-analysis",
		publisher: "The Lancet Gastroenterology & Hepatology",
		year: 2019,
		url: "https://doi.org/10.1016/s2468-1253(19)30246-8",
		doi: "10.1016/s2468-1253(19)30246-8",
		note: "Network review of 33 adult trials compares drugs using different bowel-movement definitions and follow-up periods. Baseline severity and previous laxative response vary, and direct comparisons are scarce. Short-term rankings do not establish one best long-term medicine or equal tolerability.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1016/s2468-1253(19)30246-8",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fs2468-1253%2819%2930246-8&rows=100"
		],
		order: 1
	},
	"peg-1": {
		title: "Lactulose versus Polyethylene Glycol for Chronic Constipation",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2010,
		url: "https://doi.org/10.1002/14651858.cd007570.pub2",
		doi: "10.1002/14651858.cd007570.pub2",
		note: "2010 Cochrane review of ten trials compares PEG with lactulose in mixed adult and pediatric populations. Some stool and additional-treatment outcomes favor PEG; abdominal-pain subgroup results differ. This active-treatment comparison is not a placebo-only estimate for every adult cause of constipation.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd007570.pub2",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd007570.pub2&rows=100"
		],
		order: 1
	},
	"constipation-guideline": {
		title: "American Gastroenterological Association-American College of Gastroenterology Clinical Practice Guideline: Pharmacological Management of Chronic Idiopathic Constipation",
		publisher: "American Journal of Gastroenterology",
		year: 2023,
		url: "https://doi.org/10.14309/ajg.0000000000002227",
		doi: "10.14309/ajg.0000000000002227",
		note: "Joint 2023 AGA/ACG guideline strongly recommends PEG and conditionally recommends senna for adult chronic idiopathic constipation. Different medicines have different evidence. The societies funded development without industry support, while multiple authors disclose managed commercial relationships. Guideline recommendation strength and evidence certainty are separate judgments.",
		kind: "guideline",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.14309/ajg.0000000000002227",
			"https://api.crossref.org/works?filter=updates%3A10.14309%2Fajg.0000000000002227&rows=100"
		],
		order: 1
	},
	"antispasmodic-1": {
		title: "Efficacy of soluble fibre, antispasmodic drugs, and gut–brain neuromodulators in irritable bowel syndrome: a systematic review and network meta-analysis",
		publisher: "The Lancet Gastroenterology & Hepatology",
		year: 2020,
		url: "https://doi.org/10.1016/s2468-1253(19)30324-3",
		doi: "10.1016/s2468-1253(19)30324-3",
		note: "Network review combines short trials across several treatment categories, with only 13 of 51 trials at low risk of bias. Rankings differ between overall IBS symptoms and pain, and active treatments are not clearly separated by direct or indirect comparisons. Results do not establish a best drug class or long-term superiority.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1016/s2468-1253(19)30324-3",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fs2468-1253%2819%2930324-3&rows=100"
		],
		order: 1
	},
	"ibs-diarrhea-guideline": {
		title: "AGA Clinical Practice Guideline on the Pharmacological Management of Irritable Bowel Syndrome With Diarrhea",
		publisher: "Gastroenterology",
		year: 2022,
		url: "https://doi.org/10.1053/j.gastro.2022.04.017",
		doi: "10.1053/j.gastro.2022.04.017",
		note: "2022 AGA guidance on IBS with diarrhea gives conditional support for antispasmodics based on low-certainty evidence. Its subtype and treatment scope differ from the ACG recommendation about US-available drugs for overall symptoms. The conditional position does not establish strong class-wide efficacy.",
		kind: "guideline",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1053/j.gastro.2022.04.017",
			"https://api.crossref.org/works?filter=updates%3A10.1053%2Fj.gastro.2022.04.017&rows=100"
		],
		order: 1
	},
	"ibs-constipation-guideline": {
		title: "AGA Clinical Practice Guideline on the Pharmacological Management of Irritable Bowel Syndrome With Constipation",
		publisher: "Gastroenterology",
		year: 2022,
		url: "https://doi.org/10.1053/j.gastro.2022.04.016",
		doi: "10.1053/j.gastro.2022.04.016",
		note: "2022 AGA guidance on IBS with constipation conditionally supports antispasmodics with low-certainty evidence. IBS subtype, pain and overall symptom endpoints matter. This is distinct from proving that all available drugs work equally well or that a network rank identifies a best choice.",
		kind: "guideline",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1053/j.gastro.2022.04.016",
			"https://api.crossref.org/works?filter=updates%3A10.1053%2Fj.gastro.2022.04.016&rows=100"
		],
		order: 1
	},
	"stimulant-1": {
		title: "Senna Versus Magnesium Oxide for the Treatment of Chronic Constipation: A Randomized, Placebo-Controlled Trial",
		publisher: "American Journal of Gastroenterology",
		year: 2021,
		url: "https://doi.org/10.14309/ajg.0000000000000942",
		doi: "10.14309/ajg.0000000000000942",
		note: "Four-week placebo-controlled trial enrolled 90 adults, mostly women. Senna and magnesium oxide each improved selected symptom, bowel-movement and quality-of-life outcomes. A small short trial with no severe treatment-related events cannot settle long-term or uncommon harms; the active medicines have different mechanisms and suitability.",
		kind: "context",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.14309/ajg.0000000000000942",
			"https://api.crossref.org/works?filter=updates%3A10.14309%2Fajg.0000000000000942&rows=100"
		],
		order: 1
	},
	"probiotic-2": {
		title: "Probiotics and synbiotics in chronic constipation in adults: A systematic review and meta-analysis of randomized controlled trials",
		publisher: "Clinical Nutrition",
		year: 2022,
		url: "https://doi.org/10.1016/j.clnu.2022.10.015",
		doi: "10.1016/j.clnu.2022.10.015",
		note: "Review includes 30 probiotic and four synbiotic trials. Average response and stool-frequency findings are favorable for some products, while stool consistency and other comparisons remain unclear. Bias and heterogeneity limit confidence. Disclosures include food/probiotic research, education and consulting relationships, alongside other commercial interests.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1016/j.clnu.2022.10.015",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.clnu.2022.10.015&rows=100"
		],
		order: 1
	},
	"probiotic-3": {
		title: "Usefulness of Bifidobacterium longum BB536 in Elderly Individuals With Chronic Constipation: A Randomized Controlled Trial",
		publisher: "American Journal of Gastroenterology",
		year: 2023,
		url: "https://doi.org/10.14309/ajg.0000000000002028",
		doi: "10.14309/ajg.0000000000002028",
		note: "Small four-week trial in older Japanese adults found no clear between-group benefit on its primary total symptom score. A bowel-frequency subscale improved, but this and within-group changes do not replace the primary finding. Product specificity, short follow-up and disclosed funding/departmental relationships constrain interpretation.",
		kind: "context",
		stance: "debate",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.14309/ajg.0000000000002028",
			"https://api.crossref.org/works?filter=updates%3A10.14309%2Fajg.0000000000002028&rows=100"
		],
		order: 1
	},
	"constipation-diet-guidance": {
		title: "British Dietetic Association Guidelines for the Dietary Management of Chronic Constipation in Adults",
		publisher: "Journal of Human Nutrition and Dietetics",
		year: 2025,
		url: "https://doi.org/10.1111/jhn.70133",
		doi: "10.1111/jhn.70133",
		note: "2025 British Dietetic Association guideline draws on four reviews and 75 trials. Most underlying evidence is low or very low certainty, despite some strong recommendations. This citation provides dietary-evidence context rather than a product-specific endorsement. Disclosures include food/probiotic grants, consulting, educational roles and intellectual-property interests.",
		kind: "guideline",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1111/jhn.70133",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fjhn.70133&rows=100"
		],
		order: 1
	},
	"lactose-3": {
		title: "Systematic Review: Effective Management Strategies for Lactose Intolerance",
		publisher: "Annals of Internal Medicine",
		year: 2010,
		url: "https://doi.org/10.7326/0003-4819-152-12-201006150-00241",
		doi: "10.7326/0003-4819-152-12-201006150-00241",
		note: "Review of 36 randomized studies finds some lactose tolerance in many adults, but most studies concern malabsorption rather than confirmed symptomatic intolerance. Variable enrollment and food comparisons prevent a universal symptom limit. Evidence for several supplements or adaptation strategies is insufficient.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.7326/0003-4819-152-12-201006150-00241",
			"https://api.crossref.org/works?filter=updates%3A10.7326%2F0003-4819-152-12-201006150-00241&rows=100"
		],
		order: 1
	},
	"lactose-1": {
		title: "Lactose Maldigestion, Malabsorption, and Intolerance: A Comprehensive Review with a Focus on Current Management and Future Perspectives",
		publisher: "Nutrients",
		year: 2018,
		url: "https://doi.org/10.3390/nu10111599",
		doi: "10.3390/nu10111599",
		note: "Narrative review distinguishes lactose digestion, absorption and symptoms, with substantial individual variation. It is not a systematic proof of every proposed supplement or product. Funding, employment and consulting relationships involving Allergy Therapeutics Italia are disclosed and matter when interpreting product-oriented claims.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.3390/nu10111599",
			"https://api.crossref.org/works?filter=updates%3A10.3390%2Fnu10111599&rows=100"
		],
		order: 1
	},
	"lactose-2": {
		title: "Lactose Malabsorption and Presumed Related Disorders: A Review of Current Evidence",
		publisher: "Nutrients",
		year: 2022,
		url: "https://doi.org/10.3390/nu14030584",
		doi: "10.3390/nu14030584",
		note: "Narrative review discusses lactose malabsorption alongside IBS and other digestive conditions. These diagnoses and symptomatic intolerance are distinct. Dietary restriction needs individual clinical and nutritional context; this is not a new pooled treatment-effect estimate or support for attributing every symptom to lactose.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.3390/nu14030584",
			"https://api.crossref.org/works?filter=updates%3A10.3390%2Fnu14030584&rows=100"
		],
		order: 1
	},
	"hemorrhoid-1": {
		title: "Fiber for the Treatment of Hemorrhoids Complications: A Systematic Review and Meta-Analysis",
		publisher: "The American Journal of Gastroenterology",
		year: 2006,
		url: "https://doi.org/10.1111/j.1572-0241.2005.00359.x",
		doi: "10.1111/j.1572-0241.2005.00359.x",
		note: "Seven small older trials support fiber for persistent hemorrhoid symptoms and bleeding. Pain, itching and prolapse estimates are imprecise. Relative reductions are not percentages of people cured, and longer-term outcomes are limited. An overlapping Cochrane synthesis is not an independent replication.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1111/j.1572-0241.2005.00359.x",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fj.1572-0241.2005.00359.x&rows=100"
		],
		order: 1
	},
	"hemorrhoid-2": {
		title: "AGA Clinical Practice Update on Diagnosis and Treatment of Hemorrhoids: Expert Review",
		publisher: "Clinical Gastroenterology and Hepatology",
		year: 2026,
		url: "https://doi.org/10.1016/j.cgh.2026.04.008",
		doi: "10.1016/j.cgh.2026.04.008",
		note: "2026 AGA expert practice update includes fiber and lifestyle measures as initial care, with clinical diagnosis and additional care when needed. It explicitly does not formally grade evidence. The advice is not a new randomized efficacy estimate, and it does not establish that unexplained bleeding is caused by hemorrhoids.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1016/j.cgh.2026.04.008",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.cgh.2026.04.008&rows=100"
		],
		order: 1
	},
	"diverticulitis-1": {
		title: "Antibiotics for uncomplicated diverticulitis",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2022,
		url: "https://doi.org/10.1002/14651858.cd009092.pub3",
		doi: "10.1002/14651858.cd009092.pub3",
		note: "2022 Cochrane review includes a small randomized evidence base for antibiotics versus no antibiotics in selected uncomplicated diverticulitis. Low-certainty, imprecise findings do not settle uncommon complications or apply to every patient with abdominal pain. Confirmed diagnosis and patient selection are essential.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd009092.pub3",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd009092.pub3&rows=100"
		],
		order: 1
	},
	"diverticulitis-2": {
		title: "Randomized clinical trial of antibiotics in acute uncomplicated diverticulitis13",
		publisher: "British Journal of Surgery",
		year: 2012,
		url: "https://doi.org/10.1002/bjs.8688",
		doi: "10.1002/bjs.8688",
		note: "AVOD randomized 623 patients with confirmed uncomplicated diverticulitis. It did not establish a routine antibiotic benefit on the studied outcomes. Low numbers of rare events do not prove identical complication risks, and complicated disease or higher-risk patients are different populations.",
		kind: "context",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1002/bjs.8688",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2Fbjs.8688&rows=100"
		],
		order: 1
	},
	"diverticulitis-3": {
		title: "Efficacy and Safety of Nonantibiotic Outpatient Treatment in Mild Acute Diverticulitis (DINAMO-study)",
		publisher: "Annals of Surgery",
		year: 2021,
		url: "https://doi.org/10.1097/sla.0000000000005031",
		doi: "10.1097/sla.0000000000005031",
		note: "DINAMO randomized 480 selected patients with mild confirmed disease to monitored outpatient strategies. Hospital admission was the primary noninferiority outcome, rather than every future complication. Unclear indexed confidence-interval wording is not used here. A noninferiority finding does not establish identical risks.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1097/sla.0000000000005031",
			"https://api.crossref.org/works?filter=updates%3A10.1097%2Fsla.0000000000005031&rows=100"
		],
		order: 1
	},
	"diverticulitis-guideline": {
		title: "ACG Clinical Guideline: Colonic Diverticulitis",
		publisher: "American Journal of Gastroenterology",
		year: 2026,
		url: "https://doi.org/10.14309/ajg.0000000000004047",
		doi: "10.14309/ajg.0000000000004047",
		note: "2026 ACG guidance supports selective non-antibiotic management for low-risk confirmed uncomplicated disease, while retaining exceptions for high-risk features, immune compromise, frailty or unsuitable follow-up. The recommendation does not apply to undiagnosed abdominal pain or every acute episode.",
		kind: "guideline",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.14309/ajg.0000000000004047",
			"https://api.crossref.org/works?filter=updates%3A10.14309%2Fajg.0000000000004047&rows=100"
		],
		order: 1
	},
	"appendicitis-1": {
		title: "Appendectomy versus antibiotic treatment for acute appendicitis",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2024,
		url: "https://doi.org/10.1002/14651858.cd015038.pub2",
		doi: "10.1002/14651858.cd015038.pub2",
		note: "2024 Cochrane review compares antibiotics with surgery across 13 studies, mostly in adults. Eligibility and success definitions vary, with later surgery sometimes omitted from initial success. Rare serious harms remain uncertain. Disclosures include editorial/research involvement and industry support in two included trials.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd015038.pub2",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd015038.pub2&rows=100"
		],
		order: 1
	},
	"appendicitis-2": {
		title: "Antibiotic Therapy for Uncomplicated Acute Appendicitis",
		publisher: "JAMA",
		year: 2026,
		url: "https://doi.org/10.1001/jama.2025.25921",
		doi: "10.1001/jama.2025.25921",
		note: "Ten-year APPAC follow-up concerns selected Finnish adults aged 18 to 60. Recurrent appendicitis and any later appendectomy have different event definitions and denominators. The original open-surgery era limits transfer to current practice. Authors disclose several outside-work commercial relationships; this follow-up is not a new randomized comparison.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1001/jama.2025.25921",
			"https://api.crossref.org/works?filter=updates%3A10.1001%2Fjama.2025.25921&rows=100"
		],
		order: 1
	},
	"appendicitis-guideline": {
		title: "Diagnosis and Treatment of Acute Appendicitis",
		publisher: "JAMA Surgery",
		year: 2026,
		url: "https://doi.org/10.1001/jamasurg.2025.6218",
		doi: "10.1001/jamasurg.2025.6218",
		note: "WSES guidance, published in 2026 as the 2025 edition, supports nonoperative care in selected patients while retaining surgical and higher-risk distinctions. Its search cutoff precedes some newer follow-up evidence. A clinical treatment option is different from self-treatment or a reason to delay urgent assessment.",
		kind: "guideline",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1001/jamasurg.2025.6218",
			"https://api.crossref.org/works?filter=updates%3A10.1001%2Fjamasurg.2025.6218&rows=100"
		],
		order: 1
	},
	"celiac-2": {
		title: "Systematic review with meta-analysis: Dietary adherence influences normalization of health-related quality of life in coeliac disease",
		publisher: "Clinical Nutrition",
		year: 2017,
		url: "https://doi.org/10.1016/j.clnu.2016.04.021",
		doi: "10.1016/j.clnu.2016.04.021",
		note: "Review of 18 studies finds improved adult quality of life after gluten-free dietary treatment, with some measures remaining below those of non-celiac controls. Before-and-after and adherence comparisons do not isolate every causal contribution. Symptom improvement, adherence and full intestinal recovery are different outcomes.",
		kind: "meta_analysis",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1016/j.clnu.2016.04.021",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.clnu.2016.04.021&rows=100"
		],
		order: 1
	},
	"celiac-1": {
		title: "Current guidelines for the management of celiac disease: A systematic review with comparative analysis",
		publisher: "World Journal of Gastroenterology",
		year: 2022,
		url: "https://doi.org/10.3748/wjg.v28.i1.154",
		doi: "10.3748/wjg.v28.i1.154",
		note: "2022 systematic comparison examines seven societies' celiac guidelines, mainly diagnostic and follow-up approaches, using evidence available through 2021. It is not a randomized dietary efficacy estimate. Agreement on disease-specific care does not imply that healthy people benefit from elective gluten avoidance.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.3748/wjg.v28.i1.154",
			"https://api.crossref.org/works?filter=updates%3A10.3748%2Fwjg.v28.i1.154&rows=100"
		],
		order: 1
	},
	"niddk-celiac": {
		title: "Treatment for Celiac Disease",
		publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
		year: 2020,
		url: "https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease/treatment",
		note: "Official patient information, reviewed in October 2020, explains gluten-free dietary treatment for confirmed celiac disease, intestinal recovery, nutrition and follow-up. It does not promise that all symptoms resolve or replace evaluation of persistent problems. The review date is distinct from this site's source-check date.",
		kind: "context",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: ["https://www.niddk.nih.gov/health-information/digestive-diseases/celiac-disease/treatment"],
		order: 1
	},
	"exercise-1": {
		title: "Exercise therapy in patients with constipation: a systematic review and meta-analysis of randomized controlled trials",
		publisher: "Scandinavian Journal of Gastroenterology",
		year: 2019,
		url: "https://doi.org/10.1080/00365521.2019.1568544",
		doi: "10.1080/00365521.2019.1568544",
		note: "Nine small exercise trials suggest constipation symptom benefit, with very large differences between studies and substantial bias concerns. Different activities and populations prevent a reliable best-program conclusion. The pooled estimate does not establish sustained benefit for every cause of constipation.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1080/00365521.2019.1568544",
			"https://api.crossref.org/works?filter=updates%3A10.1080%2F00365521.2019.1568544&rows=100"
		],
		order: 1
	},
	"exercise-4": {
		title: "An assessment of nutrition and physical activity guidelines for adult patients with chronic constipation: A systematic review",
		publisher: "Clinical Nutrition ESPEN",
		year: 2025,
		url: "https://doi.org/10.1016/j.clnesp.2025.06.009",
		doi: "10.1016/j.clnesp.2025.06.009",
		note: "2025 systematic assessment of ten expert-group guidelines finds limited or conflicting recommendations about physical activity for adult constipation. It reviews guidance, not new randomized treatment effects. Uncertain or inconsistent advice does not demonstrate that exercise has no benefit.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1016/j.clnesp.2025.06.009",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.clnesp.2025.06.009&rows=100"
		],
		order: 1
	},
	"niddk-constipation": {
		title: "Treatment for Constipation",
		publisher: "National Institute of Diabetes and Digestive and Kidney Diseases",
		year: 2018,
		url: "https://www.niddk.nih.gov/health-information/digestive-diseases/constipation/treatment",
		note: "Official patient information, reviewed in May 2018, includes regular physical activity as a possible way to relieve constipation. This dated general advice is not a new treatment trial or evidence for one specific program. Persistent symptoms and treatment changes require suitable clinical assessment.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: ["https://www.niddk.nih.gov/health-information/digestive-diseases/constipation/treatment"],
		order: 1
	},
	"followup-1": {
		title: "Association Between Time to Colonoscopy After Positive Fecal Testing and Colorectal Cancer Outcomes: A Systematic Review",
		publisher: "Clinical Gastroenterology and Hepatology",
		year: 2021,
		url: "https://doi.org/10.1016/j.cgh.2020.09.048",
		doi: "10.1016/j.cgh.2020.09.048",
		note: "Review of eight observational studies finds consistent associations between longer follow-up delays and worse colorectal cancer outcomes after positive stool tests. It does not pool a meta-analysis or randomly assign delays. Proposed timing thresholds do not define a personally safe waiting period.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1016/j.cgh.2020.09.048",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.cgh.2020.09.048&rows=100"
		],
		order: 1
	},
	"followup-2": {
		title: "Non-compliance with colonoscopy after a positive faecal immunochemical test doubles the risk of dying from colorectal cancer",
		publisher: "Gut",
		year: 2022,
		url: "https://doi.org/10.1136/gutjnl-2020-322192",
		doi: "10.1136/gutjnl-2020-322192",
		note: "Retrospective Italian program study links non-completion of follow-up after positive FIT with more colorectal cancer deaths. Health differences, access and colonoscopy outside the program can affect the comparison. Its hazard ratio is neither an individual probability nor a randomized causal estimate. No competing interests are declared.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1136/gutjnl-2020-322192",
			"https://api.crossref.org/works?filter=updates%3A10.1136%2Fgutjnl-2020-322192&rows=100"
		],
		order: 1
	},
	"followup-3": {
		title: "Association Between Time to Colonoscopy After a Positive Fecal Test Result and Risk of Colorectal Cancer and Cancer Stage at Diagnosis",
		publisher: "JAMA",
		year: 2017,
		url: "https://doi.org/10.1001/jama.2017.3634",
		doi: "10.1001/jama.2017.3634",
		note: "Large retrospective US cohort links longer waits after positive FIT with more cancers and later-stage disease at diagnosis. It includes people who eventually completed colonoscopy and does not measure mortality. The authors leave causality unresolved. Indexed disclosures report no conflicts and list NCI support.",
		kind: "context",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T19:30:14.913Z",
		statusSources: [
			"https://doi.org/10.1001/jama.2017.3634",
			"https://api.crossref.org/works?filter=updates%3A10.1001%2Fjama.2017.3634&rows=100"
		],
		order: 1
	}
};

export const novemberDigestiveHealthClaims: SeedClaim[] = [
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "do-proton-pump-inhibitors-relieve-reflux-symptoms",
			title: "Do proton pump inhibitors relieve reflux symptoms?",
			bottomLine:
				"Yes, proton pump inhibitors, or PPIs, often reduce heartburn caused by acid reflux. Short-term trials generally find more relief than with placebo or H2 blockers. They do not work equally well for every cause of heartburn, and symptom relief is different from proving a diagnosis. The reason for ongoing treatment and its benefits and harms need clinical review.",
			stableCore: [
				"Adult trials support short-term relief, with different results in people treated for typical symptoms and those without visible esophageal injury.",
				"Healing erosive disease, relieving heartburn and controlling every throat or chest symptom are different outcomes. More acid suppression does not guarantee greater benefit for every symptom."
			],
			openQuestions: [
				"Which people with persistent symptoms have acid-related disease that will respond to further treatment?",
				"How do benefits and harms compare across longer treatment periods and different patient groups?"
			],
			whatWouldChangeMinds: [
				"Independent trials with well-defined diagnoses, meaningful symptom outcomes and complete longer-term harms assessment.",
				"Better evidence separating acid-related symptoms from other causes without relying on drug response alone."
			],
			misconceptions: [
				"Improvement after a medicine does not by itself establish the cause of the symptoms.",
				"A network ranking is different from a person's chance of getting relief or a percentage of expert agreement."
			],
			editorSummary:
				"Short-term benefit is established for many acid-reflux symptoms, with important diagnostic and long-term limits.",
			population:
				"Adults with typical reflux symptoms or endoscopy-negative reflux disease; separate guidance concerns confirmed erosive disease.",
			scope: "Compare PPIs with placebo or other acid-lowering treatments for adult reflux symptoms, keeping healing, diagnosis and symptom endpoints distinct.",
			excludedEvidence: [
				"Exclude extending adult findings to infants, pregnancy or every unexplained cough, throat symptom or chest symptom.",
				"Exclude inferring long-term comparative safety or individual treatment suitability from short symptom trials."
			],
			uncertainty:
				"Different symptom definitions, heterogeneous diagnoses, mostly short comparative trials and uncertain long-term relative effects.",
			band: "broad",
			certainty: "moderate",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [
				sources["acid-1"],
				sources["acid-2"],
				sources["gerd-guideline"],
				sources["gerd-review"]
			]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "do-h2-blockers-relieve-heartburn",
			title: "Do H2 blockers relieve heartburn?",
			bottomLine:
				"They can help, particularly for short-term acid-reflux symptoms. Older trials find benefit over placebo, but proton pump inhibitors generally provide more relief and are preferred for healing erosive reflux disease. Evidence for adding an H2 blocker to another medicine at night is a separate, less certain question. Different causes of heartburn can respond differently.",
			stableCore: [
				"The Cochrane comparison supports some short-term symptom benefit from H2 blockers, with larger average benefit from PPIs.",
				"Nocturnal acid measurements and symptom relief are different outcomes. Evidence about an add-on treatment cannot be treated as a trial of the same medicine used alone."
			],
			openQuestions: [
				"Which symptom patterns and patient groups gain the most useful benefit from H2 blockers?",
				"How well do benefits persist with sustained use and in direct longer-term comparisons?"
			],
			whatWouldChangeMinds: [
				"Contemporary independent trials with defined diagnoses, patient-important relief and complete adverse-effect assessment.",
				"Reliable comparisons separating stand-alone use from combinations and nighttime add-on care."
			],
			misconceptions: [
				"Acid-lowering drugs do not all have the same effect on symptoms or healing.",
				"An acid-suppression ranking does not establish that a treatment is best for every person."
			],
			editorSummary:
				"Short-term relief is supported, with less benefit than PPIs on average and different evidence for add-on use.",
			population:
				"Adults with typical or endoscopy-negative reflux symptoms; healing recommendations concern confirmed erosive disease.",
			scope: "Assess H2 blockers for adult heartburn relief, distinguishing monotherapy, add-on care and healing of erosive disease.",
			excludedEvidence: [
				"Exclude pooling pregnancy, infancy and adult uncomplicated symptoms into one universal treatment claim.",
				"Exclude inferring clinical symptom benefit solely from acid-exposure measurements or from add-on therapy studies."
			],
			uncertainty:
				"Older comparisons, variable diagnoses and endpoints, and limited long-term or add-on symptom evidence.",
			band: "broad",
			certainty: "moderate",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [sources["acid-1"], sources["gerd-guideline"], sources["lifestyle-2"]]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "can-weight-loss-improve-reflux-symptoms-in-adults-with-excess-weight",
			title: "Can weight loss improve reflux symptoms in adults with excess weight?",
			bottomLine:
				"Yes, intentional weight loss can help some adults with excess weight and reflux symptoms. Guidelines support it for this group, but much of the symptom evidence comes from studies in which diet, activity and weight changed together. It is not a guaranteed cure or advice for everyone to lose weight. Unexplained weight loss is a different clinical concern.",
			stableCore: [
				"Prospective cohorts associate weight reduction with less reflux, while some smaller trials measure changes in acid exposure.",
				"Structured programs change several behaviors at once. Their results cannot show exactly how much benefit came from weight change itself rather than other changes or participant differences."
			],
			openQuestions: [
				"How much symptom improvement is attributable to weight change itself?",
				"Which patient groups maintain relief over years, and how does this interact with other care?"
			],
			whatWouldChangeMinds: [
				"Better controlled studies separating weight change from dietary composition, activity and medication use.",
				"Longer follow-up with meaningful symptom outcomes and complete assessment of unintended effects."
			],
			misconceptions: [
				"An association between weight change and symptoms is not a guaranteed individual causal effect.",
				"Intentional weight loss in selected adults differs from unplanned weight loss accompanying illness."
			],
			editorSummary:
				"Benefit is supported for selected adults, with uncertainty about individual response and the contribution of other changes.",
			population:
				"Adults with overweight or obesity and reflux symptoms, with observational context from a Norwegian population cohort.",
			scope: "Assess intentional weight reduction for reflux symptoms in adults with excess weight, distinguishing clinical symptoms from acid-exposure markers and treatment bundles.",
			excludedEvidence: [
				"Exclude treating lifestyle programs as isolated randomized tests of weight alone.",
				"Exclude generalizing selected excess-weight populations to everyone or equating intentional with unexplained weight loss."
			],
			uncertainty:
				"Predominantly observational symptom evidence, bundled lifestyle changes, residual confounding and variable starting risk or medication use.",
			band: "broad",
			certainty: "moderate",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [
				sources["lifestyle-1"],
				sources["weight-1"],
				sources["weight-2"],
				sources["gerd-guideline"]
			]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "does-raising-the-head-of-the-bed-help-nighttime-reflux",
			title: "Does raising the head of the bed help nighttime reflux?",
			bottomLine:
				"It may help some people, but the evidence is small and mostly short term. Trials suggest fewer nighttime symptoms or less acid exposure, and guidelines offer a conditional recommendation. Different bed or support designs were studied, with substantial risk of bias. The studies do not establish one best setup or show that it replaces indicated treatment.",
			stableCore: [
				"A review of five controlled trials finds generally favorable symptom results but cannot pool them because methods and outcomes differ.",
				"Changes in measured acid exposure support a possible effect, but they do not measure every symptom or establish long-term prevention of complications."
			],
			openQuestions: [
				"Which patients have a meaningful and lasting symptom benefit?",
				"How do comfort, adherence and unwanted effects compare across different approaches?"
			],
			whatWouldChangeMinds: [
				"Larger independent trials with useful symptom outcomes, clear comparators and longer follow-up.",
				"Reliable evidence linking physiological changes to better sleep and daily function."
			],
			misconceptions: [
				"Less measured acid exposure is different from a proven reduction in every reflux symptom.",
				"A low-cost intervention is not automatically effective or suitable for every patient."
			],
			editorSummary:
				"A possible nighttime benefit is supported by small, biased trials rather than definitive long-term evidence.",
			population:
				"Adults with reflux, particularly nighttime symptoms, in small controlled and crossover studies.",
			scope: "Assess head-of-bed elevation for nighttime reflux symptoms, distinguishing clinical relief, acid markers and different intervention designs.",
			excludedEvidence: [
				"Exclude applying findings from reflux trials to unrelated respiratory or postsurgical conditions.",
				"Exclude equating different support designs or short acid-exposure changes with proven long-term clinical benefit."
			],
			uncertainty:
				"Small short trials, high performance and selection bias, inconsistent outcomes and limited long-term data.",
			band: "broad",
			certainty: "low",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [
				sources["bed-1"],
				sources["lifestyle-1"],
				sources["lifestyle-2"],
				sources["gerd-guideline"]
			]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "do-late-evening-meals-make-nighttime-reflux-worse",
			title: "Do late-evening meals make nighttime reflux worse?",
			bottomLine:
				"They can increase acid reflux while lying down, but the size of any lasting symptom benefit from eating earlier is less certain. A small crossover trial found more acid exposure after a later meal without a clear difference in total symptoms over the two study nights. Guidelines support avoiding meals close to bedtime with low-certainty evidence.",
			stableCore: [
				"The direct meal-timing trial measured physiological reflux over a brief period in selected adults.",
				"Later reviews support meal timing as a possible part of nighttime care, but much of the evidence overlaps and does not establish a universal symptom response."
			],
			openQuestions: [
				"How much does changing meal timing improve symptoms and sleep over months?",
				"How do meal size, composition, medication and the underlying diagnosis affect the result?"
			],
			whatWouldChangeMinds: [
				"Larger randomized studies separating timing from food composition and measuring meaningful symptom outcomes.",
				"Longer pragmatic comparisons with adherence and complete unintended-effect assessment."
			],
			misconceptions: [
				"More acid exposure does not automatically mean a larger measured symptom burden in the same study.",
				"A specific interval used in one trial is not a universal personal rule."
			],
			editorSummary: "Physiological effects are clearer than precise estimates of sustained symptom improvement.",
			population:
				"Adults with reflux symptoms, including a small short crossover study and broader nocturnal-reflux reviews.",
			scope: "Assess late-versus-earlier meals for nighttime reflux, separating acid exposure from clinical symptoms and longer-term effects.",
			excludedEvidence: [
				"Exclude interpreting short-term acid-exposure findings as proof of long-term complication prevention.",
				"Exclude attributing weight-loss effects to a small meal-timing experiment or assuming that physiological changes guarantee symptom relief."
			],
			uncertainty:
				"Few direct studies, small samples, short follow-up, overlapping syntheses and different physiological or symptom outcomes.",
			band: "broad",
			certainty: "low",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [
				sources["meal-1"],
				sources["lifestyle-1"],
				sources["lifestyle-2"],
				sources["gerd-guideline"]
			]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "does-a-low-fodmap-diet-improve-irritable-bowel-syndrome-symptoms",
			title: "Does a low-FODMAP diet improve irritable bowel syndrome symptoms?",
			bottomLine:
				"Yes, it can reduce overall IBS symptoms and bloating for some adults. The clearest comparisons are with a usual diet; evidence that it is better than every other dietary approach is weaker. It is a structured, individualized treatment rather than permanent avoidance of all restricted foods. Nutritional risk, eating disorders and access to dietitian support affect suitability.",
			stableCore: [
				"The 2025 research synthesis finds the largest dietary trial base for low-FODMAP care, with different results for overall symptoms, pain, bloating and bowel habit.",
				"Many studies test a short restriction phase in selected patients. They provide less information about reintroduction, long-term nutrition or which people can maintain benefit."
			],
			openQuestions: [
				"Which people gain sustained benefit after food reintroduction and personalization?",
				"How do less restrictive diets compare for symptoms, nutrition, cost and quality of life?"
			],
			whatWouldChangeMinds: [
				"Independent longer-term comparisons including reintroduction and meaningful nutritional and symptom outcomes.",
				"Reliable evidence identifying useful benefits without unnecessary restriction or harm."
			],
			misconceptions: [
				"A high network ranking does not establish one best diet for every person.",
				"Symptom benefit in diagnosed IBS does not show that healthy people should avoid the same foods."
			],
			editorSummary:
				"Symptom benefit is supported, while superiority over all diets and sustained effects are less certain.",
			population:
				"Adults with diagnosed IBS, often treated in specialty settings; healthy participants and other intestinal diseases are different populations.",
			scope: "Assess low-FODMAP dietary care for adult IBS symptoms, distinguishing comparators, individual outcomes and short restriction from longer-term personalized eating.",
			excludedEvidence: [
				"Exclude extrapolating trial benefits to healthy people, confirmed celiac disease or inflammatory bowel disease.",
				"Exclude treating a temporary studied restriction phase as proof of the safety or benefit of permanent broad food avoidance."
			],
			uncertainty:
				"Limited long-term evidence, difficult blinding, varied comparators, selected patients and less study of reintroduction or nutritional effects.",
			band: "broad",
			certainty: "moderate",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [
				sources["fodmap-1"],
				sources["fodmap-2"],
				sources["fodmap-3"],
				sources["diet-guidance"],
				sources["ibs-guideline"]
			]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "does-peppermint-oil-improve-irritable-bowel-syndrome-symptoms",
			title: "Does peppermint oil improve irritable bowel syndrome symptoms?",
			bottomLine:
				"It may help some people, but results are mixed. A review favors peppermint oil over placebo with very low confidence, while two more rigorous trials found no clear advantage on their main outcomes. Some secondary symptom scores improved, and adverse effects were more common in pooled evidence. The findings concern studied oral products, not every peppermint preparation or home remedy.",
			stableCore: [
				"The favorable pooled estimate combines small studies with different products and outcomes, and the review rates the evidence very low certainty.",
				"The newer trials show why improvements within a treatment group or on secondary scores do not establish success on a trial's main comparison."
			],
			openQuestions: [
				"Which formulations and patient groups have a reproducible, clinically meaningful benefit?",
				"How do symptom relief and adverse effects compare over longer use?"
			],
			whatWouldChangeMinds: [
				"Independent adequately powered trials meeting prespecified symptom endpoints with complete harms assessment.",
				"Updated analyses that explain differences between older studies and newer controlled trials."
			],
			misconceptions: [
				"Improving during treatment does not establish that the treatment outperformed placebo.",
				"A secondary finding does not erase a null primary result, and different preparations are not interchangeable evidence."
			],
			editorSummary: "Favorable pooled findings coexist with null primary outcomes in newer trials.",
			population: "Adults with diagnosed IBS in short trials of specific oral peppermint-oil products.",
			scope: "Assess peppermint oil for IBS symptom relief, retaining product differences, primary endpoints, placebo response and harms.",
			excludedEvidence: [
				"Exclude treating tea, cosmetic oils and different release formulations as the same intervention.",
				"Exclude replacing null primary comparisons with favorable within-group or secondary findings."
			],
			uncertainty:
				"Very low certainty in pooled evidence, heterogeneous products, newer null primary comparisons and limited longer-term outcomes.",
			band: "mixed",
			certainty: "low",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [sources["peppermint-1"], sources["peppermint-2"], sources["peppermint-3"]]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "does-cognitive-behavioral-therapy-improve-irritable-bowel-syndrome-symptoms",
			title: "Does cognitive behavioral therapy improve irritable bowel syndrome symptoms?",
			bottomLine:
				"IBS-focused cognitive behavioral therapy can help reduce symptoms and improve quality of life for some adults. Results vary by program and comparison group, and study bias limits confidence. Evidence for a tested IBS program does not establish that every general therapy app works. Gastrointestinal improvement and improvement in anxiety or depression are also different outcomes.",
			stableCore: [
				"Research syntheses and clinical guidance support IBS-focused behavioral care, including some therapist-supported and online approaches.",
				"The newest network review rates comparisons low or very low confidence. Waiting-list comparisons, attention controls and usual care can produce different effect estimates."
			],
			openQuestions: [
				"Which delivery methods maintain useful symptom benefits across different patients and care settings?",
				"How do accessibility, therapist support, adherence and cost affect real-world outcomes?"
			],
			whatWouldChangeMinds: [
				"Independent trials with appropriate attention controls, prespecified patient-important outcomes and longer follow-up.",
				"Reliable evidence showing which tested programs work beyond selected study populations."
			],
			misconceptions: [
				"A behavioral treatment benefit does not mean IBS symptoms are imagined.",
				"An effective studied program does not validate every app or guarantee improvement in every psychological outcome."
			],
			editorSummary:
				"IBS-focused CBT can help, with low-certainty comparisons and important program and setting differences.",
			population:
				"Adults with diagnosed IBS, including selected patients with persistent symptoms, in varied behavioral-treatment trials.",
			scope: "Assess IBS-specific CBT for gastrointestinal symptoms and quality of life, separating delivery formats, control groups and mood outcomes.",
			excludedEvidence: [
				"Exclude treating all digital programs or general stress advice as equivalent to tested IBS-specific CBT.",
				"Exclude equating gastrointestinal symptom improvement with a proven mood benefit or the absence of physical disease."
			],
			uncertainty:
				"High risk of bias, publication bias, varied controls and delivery methods, and incomplete long-term or real-world evidence.",
			band: "broad",
			certainty: "low",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [
				sources["behavior-1"],
				sources["behavior-2"],
				sources["behavior-3"],
				sources["cbt-1"],
				sources["ibs-guideline"]
			]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "does-gut-directed-hypnotherapy-improve-irritable-bowel-syndrome-symptoms",
			title: "Does gut-directed hypnotherapy improve irritable bowel syndrome symptoms?",
			bottomLine:
				"It may reduce IBS symptoms or pain for some adults, but confidence is limited. Reviews differ by outcome and comparison group, and one pooled global-symptom estimate is too imprecise to show a clear benefit. Evidence is more useful for considering a tested clinical program than for claiming a cure or choosing one universally best delivery format.",
			stableCore: [
				"Several syntheses support possible benefit, while high study bias and variation in comparators reduce confidence.",
				"A trial comparing individual and group care tests two active formats. Improvement in both groups does not isolate the treatment's effect against no therapy or establish that the formats are equivalent."
			],
			openQuestions: [
				"Which patients gain meaningful lasting benefit beyond attention, expectations and usual care?",
				"How do therapist training, group care and validated digital programs compare over time?"
			],
			whatWouldChangeMinds: [
				"Larger independent controlled trials with clear primary outcomes, appropriate comparators and longer follow-up.",
				"Reliable evidence separating pain relief, global symptoms and the effects of different delivery formats."
			],
			misconceptions: [
				"A favorable subgroup finding does not establish a clear overall benefit in the same analysis.",
				"A comparison of two active treatments cannot by itself show how either compares with no treatment."
			],
			editorSummary:
				"Possible benefit is supported with low certainty, and outcomes and comparators explain some conflicting findings.",
			population:
				"Adults with diagnosed IBS in clinical gut-directed hypnotherapy studies, including persistent-symptom populations.",
			scope: "Assess gut-directed hypnotherapy for IBS symptoms and pain, distinguishing global outcomes, active formats and controlled comparisons.",
			excludedEvidence: [
				"Exclude claims of a cure or generalizing clinical programs to every hypnosis recording or app.",
				"Exclude inferring equivalence between formats from a null comparison or treating active-format comparisons as placebo-controlled efficacy tests."
			],
			uncertainty:
				"Low or very low confidence, heterogeneous outcomes, imprecise estimates, publication bias and limited independent longer-term comparisons.",
			band: "broad",
			certainty: "low",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [
				sources["behavior-3"],
				sources["hypnosis-1"],
				sources["hypnosis-2"],
				sources["ibs-guideline"]
			]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "does-polyethylene-glycol-help-chronic-constipation-in-adults",
			title: "Does polyethylene glycol help chronic constipation in adults?",
			bottomLine:
				"Yes. Polyethylene glycol (PEG) can help adults with long-lasting constipation that has no clear cause. Guidelines support it, and some comparisons favor it over lactulose. It can also cause bloating, diarrhea or discomfort. It does not treat every cause of constipation, and suitability depends on the patient.",
			stableCore: [
				"The joint AGA and ACG guideline makes a strong recommendation for PEG in adult chronic idiopathic constipation.",
				"Older comparative evidence includes both adults and children, while newer reviews retain differences in symptom definitions, starting risk and treatment duration."
			],
			openQuestions: [
				"Which patients maintain meaningful symptom and quality-of-life benefits over longer treatment periods?",
				"How do benefits, tolerability and costs compare with alternatives in different clinical groups?"
			],
			whatWouldChangeMinds: [
				"Independent longer-term comparisons with patient-important outcomes and complete adverse-effect reporting.",
				"Better evidence defining which causes and patient groups need a different treatment approach."
			],
			misconceptions: [
				"Improved stool frequency does not mean the underlying cause has been cured.",
				"Evidence in adult chronic idiopathic constipation is different from evidence about children, bowel obstruction or other diagnoses."
			],
			editorSummary:
				"Benefit is established for adult chronic idiopathic constipation, with individual suitability and tolerability limits.",
			population:
				"Adults with chronic idiopathic constipation; mixed-age lactulose comparisons provide additional contextual evidence.",
			scope: "Assess PEG for adult chronic idiopathic constipation, distinguishing stool outcomes, comparative treatments and other causes of constipation.",
			excludedEvidence: [
				"Exclude applying these findings to bowel obstruction, severe new abdominal symptoms or every drug-related or neurological cause.",
				"Exclude pooling adult and pediatric results without retaining age limits or equating stool improvement with cure of the underlying cause."
			],
			uncertainty:
				"Varying outcomes and follow-up, mixed populations in older comparisons and less precise longer-term comparative harms evidence.",
			band: "broad",
			certainty: "moderate",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [
				sources["constipation-1"],
				sources["constipation-2"],
				sources["peg-1"],
				sources["constipation-guideline"]
			]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "do-antispasmodic-drugs-improve-irritable-bowel-syndrome-symptoms",
			title: "Do antispasmodic drugs improve irritable bowel syndrome symptoms?",
			bottomLine:
				"Some may help, but evidence varies by drug and symptom. Guidelines also differ. The American Gastroenterological Association gives conditional support based on low-certainty evidence. The American College of Gastroenterology advises against drugs available in the United States for overall IBS symptoms, also with low certainty. These positions do not establish that every drug works or that none can relieve pain.",
			stableCore: [
				"Antispasmodics are a group of different medicines. Trials use different drugs, definitions and outcomes, often over only a few weeks.",
				"The ACG recommendation concerns overall IBS symptoms and medicines available in the United States. Its discussion distinguishes agents used elsewhere. The AGA guidance separately addresses IBS with constipation and IBS with diarrhea."
			],
			openQuestions: [
				"Which individual medicines produce a useful, lasting improvement in pain or overall symptoms?",
				"How do benefits and adverse effects compare across IBS subtypes, ages and available products?"
			],
			whatWouldChangeMinds: [
				"Independent modern trials of individual medicines with clear IBS definitions and patient-important outcomes.",
				"Longer comparisons that separate pain relief, overall response and harms rather than ranking a drug class as one treatment."
			],
			misconceptions: [
				"A recommendation about US-available medicines is not evidence about every product used worldwide.",
				"A difference between guidelines can reflect different drugs, outcomes and judgments about uncertain evidence."
			],
			editorSummary: "Guideline differences and weak drug-specific evidence limit a single class-wide answer.",
			population:
				"Adults with diagnosed IBS in short studies of individual medicines; product availability and IBS subtype matter.",
			scope: "Assess antispasmodics for adult IBS, separating abdominal pain from global symptoms and US-available agents from the broader international class.",
			excludedEvidence: [
				"Exclude treating all agents or international formulations as interchangeable.",
				"Exclude equating a high network rank with established superiority when direct comparisons are scarce."
			],
			uncertainty:
				"Older small trials, inconsistent diagnostic criteria, short follow-up, different agents and low-certainty recommendations with different scopes.",
			band: "mixed",
			certainty: "low",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [
				sources["antispasmodic-1"],
				sources["ibs-guideline"],
				sources["ibs-diarrhea-guideline"],
				sources["ibs-constipation-guideline"]
			]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "does-senna-help-chronic-constipation-in-adults",
			title: "Does senna help chronic constipation in adults?",
			bottomLine:
				"Senna can help adults with long-lasting constipation when no underlying cause has been identified. A small study supports short-term symptom and bowel-movement benefits. Joint US guidelines give conditional support because the evidence is limited. A few weeks of benefit do not settle long-term safety or show that senna suits every cause of constipation.",
			stableCore: [
				"A four-week randomized study found better symptom, bowel movement and quality-of-life outcomes than placebo. It included mostly women and was too small to resolve uncommon harms.",
				"The AGA and ACG guideline treats senna separately from other laxatives and gives a conditional recommendation. A broader review of over-the-counter care also identifies a limited short-term trial base."
			],
			openQuestions: [
				"How durable are symptom benefits during longer use in different adult populations?",
				"How do tolerability, uncommon harms and patient satisfaction compare with other established options?"
			],
			whatWouldChangeMinds: [
				"Larger independent comparisons with longer follow-up and complete adverse-effect reporting.",
				"Better evidence in older adults, people with other illnesses and patients poorly represented in the short trials."
			],
			misconceptions: [
				"Different stimulant laxatives have different trial evidence and guideline recommendations.",
				"No severe adverse events in a small short study does not demonstrate zero long-term risk."
			],
			editorSummary: "Short-term benefit is supported, with limited evidence on durability and uncommon harms.",
			population:
				"Adults with chronic idiopathic constipation; the small senna trial included predominantly women.",
			scope: "Assess senna for adult chronic idiopathic constipation, with short-term benefits separated from longer-term comparative safety.",
			excludedEvidence: [
				"Exclude applying senna trial results to every stimulant laxative or to pediatric treatment.",
				"Exclude extrapolating findings to obstruction, unexplained severe symptoms or all secondary causes of constipation."
			],
			uncertainty:
				"Few small short-term comparisons, selected participants and inadequate power for uncommon or long-term harms.",
			band: "broad",
			certainty: "low",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [sources["stimulant-1"], sources["constipation-1"], sources["constipation-guideline"]]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "do-probiotics-help-chronic-constipation-in-adults",
			title: "Do probiotics help chronic constipation in adults?",
			bottomLine:
				"Some studied products may improve bowel frequency or symptoms, but results are mixed and product-specific. A review found average benefits on some outcomes, with substantial differences and risk of bias across studies. A trial in older adults found no clear benefit on its main overall symptom score, despite improvement in one bowel-frequency measure. These findings do not support treating all probiotic products as equivalent.",
			stableCore: [
				"The 2022 review found benefits for treatment response and stool frequency, while stool consistency did not clearly improve. Individual products and mixtures gave different results.",
				"The older-adult trial illustrates an important distinction: improvement from a person's own starting score or on a secondary measure can coexist with a null primary comparison against placebo."
			],
			openQuestions: [
				"Which specific products give a reproducible and meaningful benefit, and for which patients?",
				"How durable are benefits, and what harms or costs emerge outside short selected trials?"
			],
			whatWouldChangeMinds: [
				"Independent replication of the same clearly defined product with prespecified symptom and quality-of-life outcomes.",
				"Longer trials separating isolated probiotic effects from other ingredients or accompanying treatments."
			],
			misconceptions: [
				"A favorable result for one studied product does not establish a benefit for every probiotic.",
				"A mixture containing an effective laxative cannot establish the probiotic's separate contribution."
			],
			editorSummary:
				"Possible benefits vary by product and outcome, with inconsistent trial quality and results.",
			population:
				"Adults with chronic constipation, including a small trial in older Japanese patients; products and diagnostic criteria differ.",
			scope: "Assess isolated probiotic products for adult constipation outcomes, separating primary from secondary endpoints and probiotics from combination treatments.",
			excludedEvidence: [
				"Exclude attributing a combination's benefit to the probiotic when another active treatment is present.",
				"Exclude transferring a product-specific effect to all organisms, mixtures or patient groups."
			],
			uncertainty:
				"Product and outcome heterogeneity, risk of bias, selected populations, short follow-up and some null primary comparisons.",
			band: "mixed",
			certainty: "low",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [sources["probiotic-2"], sources["probiotic-3"], sources["constipation-diet-guidance"]]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "can-people-with-lactose-intolerance-still-eat-dairy",
			title: "Can people with lactose intolerance still eat dairy?",
			bottomLine:
				"Many adults can tolerate some lactose, so complete dairy avoidance is not necessary for everyone. Tolerance varies, and difficulty absorbing lactose does not always cause symptoms. Older randomized evidence supports some tolerance in many adults, but much of it studied malabsorption rather than confirmed symptomatic intolerance. A person's symptoms, other diagnoses and nutritional needs affect their choices.",
			stableCore: [
				"Lactose malabsorption describes incomplete digestion or absorption; lactose intolerance refers to resulting symptoms. A test finding alone does not establish the person's symptom limit.",
				"The systematic review found substantial differences in enrollment and symptom measures. It also found insufficient evidence for several proposed treatments, so a tolerance finding is not proof that every supplement or adaptation strategy works."
			],
			openQuestions: [
				"Which clinical measures best predict symptoms during ordinary mixed meals?",
				"Which approaches preserve diet quality while reducing symptoms in different adult populations?"
			],
			whatWouldChangeMinds: [
				"Better trials in clearly diagnosed symptomatic patients using everyday meals and meaningful nutritional outcomes.",
				"Independent evidence that particular interventions give consistent benefit beyond individual tolerance and changes in total lactose intake."
			],
			misconceptions: [
				"Lactose malabsorption and symptoms after eating are related but different findings.",
				"Lactose intolerance is different from milk-protein allergy and does not establish that all dairy products have the same effect."
			],
			editorSummary:
				"Many adults retain some lactose tolerance, with individual symptoms and nutrition defining the useful limits.",
			population:
				"Adults with lactose malabsorption or intolerance; much of the randomized evidence concerns malabsorption and may not represent severe symptomatic intolerance.",
			scope: "Assess whether adult lactose intolerance requires complete dairy avoidance, separating malabsorption, symptoms and nutritional consequences.",
			excludedEvidence: [
				"Exclude applying adult tolerance estimates to infants or people with milk-protein allergy.",
				"Exclude treating all persistent digestive symptoms as proof of lactose intolerance or transferring supplement claims between products."
			],
			uncertainty:
				"Older small trials, differing enrollment and food comparisons, variable symptoms and limited evidence for several proposed treatments.",
			band: "broad",
			certainty: "moderate",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [sources["lactose-3"], sources["lactose-1"], sources["lactose-2"]]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "does-fiber-improve-hemorrhoid-symptoms",
			title: "Does fiber improve hemorrhoid symptoms?",
			bottomLine:
				"Yes, fiber can reduce bleeding and persistent symptoms in people with hemorrhoids. The randomized evidence is small and old, and benefits for pain, itching or prolapse are less clear. Current clinical guidance still includes fiber among first-line measures. Rectal bleeding has other possible causes, so these findings do not establish a diagnosis or replace assessment when bleeding is new or concerning.",
			stableCore: [
				"A systematic review of seven small trials found fewer persistent symptoms and less bleeding with fiber. Estimates for several other symptoms were too imprecise to establish a clear benefit.",
				"The 2026 AGA expert review includes fiber and lifestyle care as initial management. That advice is an expert practice update rather than a new randomized trial or a formally graded systematic review."
			],
			openQuestions: [
				"Which patients maintain useful benefits over longer follow-up?",
				"How do symptom severity and different fiber products affect benefits and tolerability?"
			],
			whatWouldChangeMinds: [
				"Larger independent trials measuring separate symptoms, patient satisfaction and longer-term recurrence.",
				"Reliable evidence clarifying which patients need additional treatment despite adequate initial care."
			],
			misconceptions: [
				"Reducing bleeding does not establish that every hemorrhoid symptom improves equally.",
				"A symptom response does not prove that hemorrhoids caused the bleeding."
			],
			editorSummary:
				"Bleeding and persistent symptoms improve on average; effects on other symptoms are less certain.",
			population:
				"People with diagnosed symptomatic hemorrhoids in small randomized trials; severity and other causes of rectal bleeding matter.",
			scope: "Assess fiber for hemorrhoid symptoms, separating bleeding and persistent symptoms from pain, itching, prolapse and diagnosis.",
			excludedEvidence: [
				"Exclude treating pooled symptom improvement as proof that all individual symptoms respond.",
				"Exclude using these trials to diagnose unexplained rectal bleeding or infer the effects of procedures."
			],
			uncertainty:
				"Small older trials, imprecise symptom-specific estimates and limited longer-term comparative evidence.",
			band: "broad",
			certainty: "moderate",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [sources["hemorrhoid-1"], sources["hemorrhoid-2"]]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "do-antibiotics-improve-outcomes-in-uncomplicated-diverticulitis",
			title: "Do antibiotics improve outcomes in uncomplicated diverticulitis?",
			bottomLine:
				"For selected low-risk adults, routine antibiotics have not shown a clear benefit over monitored care without them. This applies to clinically confirmed uncomplicated diverticulitis, not all abdominal pain. Guidelines support selective use: people with immune suppression, frailty or other high-risk features may still need antibiotics. Rare complications remain too uncommon in trials to prove that the strategies have identical risks.",
			stableCore: [
				"Randomized comparisons and the Cochrane review concern selected patients with confirmed disease. Their findings do not extend to complicated infection or every patient seen in routine care.",
				"The outpatient DINAMO trial tested hospital admission as its main outcome under a noninferiority design. That does not establish equality on every complication or remove the need for suitable follow-up."
			],
			openQuestions: [
				"Which higher-risk groups benefit from antibiotics, and how can their risks be identified reliably?",
				"How do uncommon complications and recurrence compare over longer follow-up in ordinary clinical settings?"
			],
			whatWouldChangeMinds: [
				"Reliable evidence of a meaningful reduction in complications for a clearly defined patient group.",
				"Larger comparisons with complete follow-up that clarify rare harms and practical limits of selected non-antibiotic care."
			],
			misconceptions: [
				"Uncomplicated diverticulitis is a clinical diagnosis, not a label for any episode of abdominal pain.",
				"No clear trial difference does not prove identical risks or justify stopping a prescribed medicine without clinical review."
			],
			editorSummary:
				"Selective non-antibiotic care is supported for low-risk confirmed disease, with higher-risk exceptions.",
			population:
				"Selected adults with clinically confirmed uncomplicated diverticulitis, commonly defined by imaging; high-risk and complicated cases are different populations.",
			scope: "Assess routine antibiotics versus monitored non-antibiotic care in low-risk uncomplicated diverticulitis, with admission, complications and recurrence kept distinct.",
			excludedEvidence: [
				"Exclude extrapolation to abscess, perforation, immune compromise or undiagnosed abdominal pain.",
				"Exclude interpreting an admission-based noninferiority finding as equality on all future clinical outcomes."
			],
			uncertainty:
				"Low-certainty pooled evidence, selected populations, open-label care and imprecise estimates for rare complications.",
			band: "broad",
			certainty: "low",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [
				sources["diverticulitis-1"],
				sources["diverticulitis-2"],
				sources["diverticulitis-3"],
				sources["diverticulitis-guideline"]
			]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "can-uncomplicated-appendicitis-be-treated-without-surgery",
			title: "Can uncomplicated appendicitis be treated without surgery?",
			bottomLine:
				"Yes, some adults with confirmed uncomplicated appendicitis can initially be treated with antibiotics instead of surgery. Many avoid an operation, while a substantial share later need one. Long-term follow-up shows why initial treatment success and lasting avoidance of surgery are different outcomes. Suspected appendicitis needs urgent assessment; eligibility and treatment choice depend on clinical findings and access to follow-up.",
			stableCore: [
				"The Cochrane review finds that nonoperative treatment can avoid immediate surgery in selected patients. Definitions of success vary, and estimates for uncommon serious harms remain uncertain.",
				"Ten-year APPAC follow-up reports both recurrent appendicitis and later appendectomy, using different denominators. Its selected Finnish adults and older open-surgery comparison limit transfer to every modern patient or setting."
			],
			openQuestions: [
				"Which patients can most reliably avoid surgery over the long term?",
				"How do modern surgical and nonoperative choices compare for serious harms, recurrence, time away from work and quality of life?"
			],
			whatWouldChangeMinds: [
				"Longer contemporary comparisons with clear eligibility, recurrence and surgery outcomes.",
				"Reliable evidence identifying patient groups with meaningfully different benefits, risks or preferences."
			],
			misconceptions: [
				"Avoiding surgery during the first episode is different from never needing an appendectomy.",
				"Evidence in selected confirmed uncomplicated cases does not establish safe self-treatment or a reason to delay urgent assessment."
			],
			editorSummary:
				"Initial nonoperative treatment is an option for selected adults, with a meaningful chance of later surgery.",
			population:
				"Selected adults with confirmed uncomplicated appendicitis; the APPAC follow-up concerns Finnish adults aged 18 to 60 and an older surgical era.",
			scope: "Assess initial antibiotic treatment versus appendectomy for selected uncomplicated appendicitis, separating recurrence, later surgery, complications and quality of life.",
			excludedEvidence: [
				"Exclude applying adult uncomplicated-disease findings to perforation, all children, pregnancy or every high-risk patient.",
				"Exclude treating recurrent appendicitis and any later appendectomy as the same event or denominator."
			],
			uncertainty:
				"Different success definitions, selected populations, changing surgical practice, incomplete long-term comparisons and uncertain rare serious harms.",
			band: "broad",
			certainty: "moderate",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [sources["appendicitis-1"], sources["appendicitis-2"], sources["appendicitis-guideline"]]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "does-a-gluten-free-diet-help-people-with-celiac-disease",
			title: "Does a gluten-free diet help people with celiac disease?",
			bottomLine:
				"Yes. A gluten-free diet is the main treatment for confirmed celiac disease. It helps most people control symptoms and allows the damaged small intestine to heal. Quality of life often improves, though some people still have symptoms or other health needs. This is different from avoiding gluten for general wellness without a celiac diagnosis. Diet quality and clinical follow-up still matter.",
			stableCore: [
				"Celiac disease involves an immune reaction to gluten that damages the small intestine. Official patient guidance identifies a gluten-free diet as treatment, with nutrition support and follow-up.",
				"The quality-of-life review finds improvement after dietary treatment, but some measures remain below those of people without celiac disease. Most comparisons are before-and-after or observational, rather than long-term randomized gluten exposure."
			],
			openQuestions: [
				"Which forms of nutrition and follow-up support best improve lasting quality of life?",
				"How can persistent symptoms be evaluated and treated without unnecessary extra food restriction?"
			],
			whatWouldChangeMinds: [
				"Better comparative evidence on nutritional adequacy, sustained quality of life and clinically important recovery.",
				"Reliable evidence identifying why some people remain unwell despite appropriate dietary treatment."
			],
			misconceptions: [
				"An effective treatment for confirmed celiac disease does not establish a general benefit from gluten avoidance for everyone.",
				"Improved symptoms and complete intestinal healing are different outcomes; persistent symptoms still need assessment."
			],
			editorSummary:
				"Dietary treatment is established for confirmed celiac disease, while recovery and quality of life vary.",
			population:
				"People with confirmed celiac disease; the cited quality-of-life synthesis concerns adults and is not a trial of gluten avoidance in the general population.",
			scope: "Assess gluten-free dietary treatment for confirmed celiac disease, separating symptom relief, intestinal recovery, nutrition and quality of life.",
			excludedEvidence: [
				"Exclude extrapolating disease-specific benefit to people without celiac disease or a separately evaluated gluten-related condition.",
				"Exclude treating self-reported symptom improvement as proof of a diagnosis or complete intestinal healing."
			],
			uncertainty:
				"Variable adherence and nutritional support, mostly observational quality-of-life comparisons and persistent symptoms in some treated patients.",
			band: "strong",
			certainty: "moderate",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [sources["celiac-2"], sources["celiac-1"], sources["niddk-celiac"]]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "does-exercise-help-chronic-constipation-in-adults",
			title: "Does exercise help chronic constipation in adults?",
			bottomLine:
				"It may help some people, but the treatment evidence is uncertain. A review of small trials found symptom benefits, with large differences between studies and substantial risk of bias. A newer review found inconsistent advice across clinical guidelines. Official patient guidance includes regular activity as one possible help. The evidence does not establish one best exercise program or a reliable effect for every cause of constipation.",
			stableCore: [
				"The randomized-trial review concerns different activities and patient groups. A favorable pooled average does not settle the size or reliability of the benefit in a new setting.",
				"The 2025 guideline assessment found conflicting or limited recommendations about physical activity. Advice to be active and strong evidence for a specific constipation treatment are different claims."
			],
			openQuestions: [
				"Which activities provide a meaningful benefit beyond attention, education or other care?",
				"Do benefits last, and which causes of constipation or patient groups respond?"
			],
			whatWouldChangeMinds: [
				"Larger well-controlled trials with clear diagnoses, symptom outcomes and longer follow-up.",
				"Consistent independent findings that explain differences between programs and patient groups."
			],
			misconceptions: [
				"Being physically active does not guarantee freedom from constipation.",
				"A treatment effect cannot be assigned to exercise alone when a program also changes diet, education or other care."
			],
			editorSummary: "Possible symptom benefits coexist with weak trials and inconsistent guideline advice.",
			population:
				"Adults with chronic constipation in varied exercise studies; different diagnoses, activity levels and other care limit transfer.",
			scope: "Assess physical activity for adult chronic constipation symptoms, distinguishing randomized treatment evidence from associations and general activity advice.",
			excludedEvidence: [
				"Exclude treating lower constipation rates among active people as proof that exercise caused the difference.",
				"Exclude transferring bundled-program or disease-specific results to every adult with constipation."
			],
			uncertainty:
				"Small heterogeneous trials, risk of bias, inconsistent guidelines, varied causes and limited sustained clinical outcomes.",
			band: "mixed",
			certainty: "low",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [sources["exercise-1"], sources["exercise-4"], sources["niddk-constipation"]]
		},
		novemberDigestiveHealthResearchCheckedAt
	),
	reviewedEntry(
		{
			topicSlug: "digestive-health",
			slug: "do-delays-after-a-positive-stool-screening-test-matter",
			title: "Do delays after a positive stool screening test matter?",
			bottomLine:
				"Long delays after a positive stool screening test are linked with worse colorectal cancer outcomes. Large studies find more cancers or later-stage disease when follow-up takes longer. A separate study links failure to complete follow-up with more colorectal cancer deaths. These are observational findings, so they do not define one safe waiting period for everyone. A positive result needs timely clinical follow-up and does not itself mean cancer.",
			stableCore: [
				"The systematic review and large US study find associations between longer waits and cancer detected at a more advanced stage. They do not randomly assign people to delay care.",
				"The Italian screening-program study compares people who completed colonoscopy within the program with those who did not. Access, health differences and care outside the program can affect such comparisons; its relative risk estimate is not an individual prediction."
			],
			openQuestions: [
				"How can screening programs most effectively provide timely follow-up across different access barriers?",
				"Which factors explain differences in observed risk, beyond the delay itself?"
			],
			whatWouldChangeMinds: [
				"Better prospective program evaluations with complete follow-up and careful adjustment for differences between patients.",
				"Reliable evidence that practical changes in follow-up access improve clinical outcomes and reduce inequities."
			],
			misconceptions: [
				"A positive stool screening result is a reason for further evaluation, not a cancer diagnosis.",
				"A study threshold is not a guarantee that waiting up to that point is safe, and relative risks do not predict one person's outcome."
			],
			editorSummary: "Long delays are associated with worse outcomes, with causal and individual-timing limits.",
			population:
				"Screening-eligible adults with positive stool blood tests in observational cohorts, including US and Italian programs; ages, tests and care systems vary.",
			scope: "Assess follow-up delay after a positive colorectal stool screening test, separating diagnosis, stage and cancer mortality from causal or individual timing claims.",
			excludedEvidence: [
				"Exclude treating observational associations as a randomized estimate of the harm from a particular delay.",
				"Exclude equating lack of follow-up within one program with proof that a person received no care anywhere."
			],
			uncertainty:
				"Observational designs, residual confounding, different timing definitions, incomplete capture of outside care and limited evidence for an exact universal interval.",
			band: "broad",
			certainty: "moderate",
			searchDatabases: [
				"PubMed targeted paper search",
				"PubMed official abstract records",
				"Publisher and institutional article records"
			],
			sources: [sources["followup-1"], sources["followup-2"], sources["followup-3"]]
		},
		novemberDigestiveHealthResearchCheckedAt
	)
];
