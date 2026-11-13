import type { SeedClaim } from "./claims.js";
import { reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberKidneyUrinaryResearchCheckedAt = "2026-11-13T16:11:24.949Z";

const sources: Record<string, SeedClaim["sources"][number]> = {
	"stonewater-1": {
		title: "Water for preventing urinary stones",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2020,
		url: "https://doi.org/10.1002/14651858.cd004292.pub4",
		doi: "10.1002/14651858.cd004292.pub4",
		note: "2020 Cochrane review finds one recurrence trial with 220 randomized participants and 199 analyzed over five years. Increased water intake may reduce recurrence, with low certainty. No first-stone prevention trial was found, and absence of adverse-event evidence does not establish universal safety.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd004292.pub4",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd004292.pub4&rows=100"
		],
		order: 1
	},
	"stonewater-2": {
		title: "Treatment effect, adherence, and safety of high fluid intake for the prevention of incident and recurrent kidney stones: a systematic review and meta-analysis",
		publisher: "Journal of Nephrology",
		year: 2016,
		url: "https://doi.org/10.1007/s40620-015-0210-4",
		doi: "10.1007/s40620-015-0210-4",
		note: "2016 review combines two randomized trials and seven observational studies. Higher fluid intake is associated with fewer stones, but study design, prevention setting and outcomes differ. Safety and adherence reporting are limited, particularly for fluid overload and low blood sodium.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1007/s40620-015-0210-4",
			"https://api.crossref.org/works?filter=updates%3A10.1007%2Fs40620-015-0210-4&rows=100"
		],
		order: 1
	},
	"stoneGuidance": {
		title: "EAU Guidelines on Urolithiasis: Metabolic Evaluation and Recurrence Prevention",
		publisher: "European Association of Urology",
		year: 2026,
		url: "https://uroweb.org/guidelines/urolithiasis/chapter/metabolic-evaluation-and-recurrence-prevention",
		note: "EAU guidance supports individualized stone prevention, ordinary food calcium and suitable hydration, with citrate and selected thiazide use based on metabolic findings. Its thiazide recommendations differ from the recent placebo evidence. A page sentence claiming a NOSTONE dose-response was demonstrated conflicts with the primary trial and is not repeated.",
		kind: "guideline",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://uroweb.org/guidelines/urolithiasis/chapter/metabolic-evaluation-and-recurrence-prevention"
		],
		order: 1
	},
	"stonecalcium-1": {
		title: "Comparison of Two Diets for the Prevention of Recurrent Stones in Idiopathic Hypercalciuria",
		publisher: "New England Journal of Medicine",
		year: 2002,
		url: "https://doi.org/10.1056/nejmoa010369",
		doi: "10.1056/nejmoa010369",
		note: "Five-year randomized comparison enrolled 120 men with recurrent calcium oxalate stones and high urine calcium. Recurrence occurred in 12 of 60 on normal calcium plus lower animal protein/salt versus 23 of 60 on low calcium. This is a dietary bundle, not a randomized estimate of calcium alone.",
		kind: "landmark_study",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1056/nejmoa010369",
			"https://api.crossref.org/works?filter=updates%3A10.1056%2Fnejmoa010369&rows=100"
		],
		order: 1
	},
	"stonecalcium-3": {
		title: "Comparison of Dietary Calcium with Supplemental Calcium and Other Nutrients as Factors Affecting the Risk for Kidney Stones in Women",
		publisher: "Annals of Internal Medicine",
		year: 1997,
		url: "https://doi.org/10.7326/0003-4819-126-7-199704010-00001",
		doi: "10.7326/0003-4819-126-7-199704010-00001",
		note: "Prospective Nurses' Health Study followed 91,731 women without previous stones. Food calcium was associated with lower stone risk, while supplements had a different association. This observational first-stone evidence cannot isolate causation or establish the best supplement strategy for recurrent stone formers.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.7326/0003-4819-126-7-199704010-00001",
			"https://api.crossref.org/works?filter=updates%3A10.7326%2F0003-4819-126-7-199704010-00001&rows=100"
		],
		order: 1
	},
	"citrate-1": {
		title: "Citrate salts for preventing and treating calcium containing kidney stones in adults",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2015,
		url: "https://doi.org/10.1002/14651858.cd010057.pub2",
		doi: "10.1002/14651858.cd010057.pub2",
		note: "2015 Cochrane review includes seven trials and 477 participants, mainly calcium oxalate stone formers. Citrate reduced new formation or growth in small studies, but reporting was moderate to poor and withdrawals from adverse effects were more common. The results do not apply equally to every formulation or stone type.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd010057.pub2",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd010057.pub2&rows=100"
		],
		order: 1
	},
	"citrate-2": {
		title: "Effect of potassium citrate supplement on stone recurrence before or after lithotripsy: systematic review and meta-analysis",
		publisher: "Urolithiasis",
		year: 2017,
		url: "https://doi.org/10.1007/s00240-016-0950-1",
		doi: "10.1007/s00240-016-0950-1",
		note: "2017 synthesis covers four low-quality trials and 374 participants after shock-wave lithotripsy. Citrate was associated with fewer recurrences over about a year. Residual-fragment management and overlapping older trials limit generalization to all stone formers.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1007/s00240-016-0950-1",
			"https://api.crossref.org/works?filter=updates%3A10.1007%2Fs00240-016-0950-1&rows=100"
		],
		order: 1
	},
	"citrate-3": {
		title: "Long-term citrate treatment in high-risk kidney stone formers is not associated with metabolic adverse effects",
		publisher: "Clinical Kidney Journal",
		year: 2026,
		url: "https://doi.org/10.1093/ckj/sfag058",
		doi: "10.1093/ckj/sfag058",
		note: "2026 Swiss observational cohort compares 110 citrate-treated and 544 untreated stone formers. Two-year glucose/lipid and body-measure outcomes did not clearly differ between groups. Higher recurrence among treated patients may reflect baseline risk; these data do not establish randomized efficacy or universal electrolyte safety. Several pharmaceutical and institutional relationships are disclosed.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1093/ckj/sfag058",
			"https://api.crossref.org/works?filter=updates%3A10.1093%2Fckj%2Fsfag058&rows=100"
		],
		order: 1
	},
	"thiazide-1": {
		title: "Hydrochlorothiazide and Prevention of Kidney-Stone Recurrence",
		publisher: "New England Journal of Medicine",
		year: 2023,
		url: "https://doi.org/10.1056/nejmoa2209275",
		doi: "10.1056/nejmoa2209275",
		note: "NOSTONE randomized 416 recurrent calcium-stone patients to hydrochlorothiazide or placebo. Its main combined clinical/radiological recurrence outcome showed no clear dose-response or overall treatment advantage; several metabolic and other adverse effects were more common with treatment. Secondary imaging results are distinct from the primary outcome.",
		kind: "landmark_study",
		stance: "debate",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1056/nejmoa2209275",
			"https://api.crossref.org/works?filter=updates%3A10.1056%2Fnejmoa2209275&rows=100"
		],
		order: 1
	},
	"thiazide-2": {
		title: "Thiazides for kidney stone recurrence prevention",
		publisher: "Current Opinion in Nephrology & Hypertension",
		year: 2024,
		url: "https://doi.org/10.1097/mnh.0000000000000990",
		doi: "10.1097/mnh.0000000000000990",
		note: "2024 review and placebo-controlled trial synthesis finds no clear recurrence benefit for thiazide monotherapy and discusses harms. Earlier trials had substantial design limitations. This interpretation differs from selected clinical recommendations and should not be treated as an independent new treatment trial.",
		kind: "meta_analysis",
		stance: "debate",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1097/mnh.0000000000000990",
			"https://api.crossref.org/works?filter=updates%3A10.1097%2Fmnh.0000000000000990&rows=100"
		],
		order: 1
	},
	"thiazide-3": {
		title: "Thiazide Dose, Urine Calcium, and Symptomatic Kidney Stone Events",
		publisher: "JAMA Network Open",
		year: 2024,
		url: "https://doi.org/10.1001/jamanetworkopen.2024.28953",
		doi: "10.1001/jamanetworkopen.2024.28953",
		note: "Full 2024 research report, read separately from PubMed's plain-language summary, analyzes 634 mostly older US thiazide users. Larger urine-calcium reductions correlate with fewer subsequent symptomatic events. Treatment and calcium-response groups were not randomized; residual confounding and the predominantly White, older sample limit causal interpretation.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1001/jamanetworkopen.2024.28953",
			"https://api.crossref.org/works?filter=updates%3A10.1001%2Fjamanetworkopen.2024.28953&rows=100"
		],
		order: 1
	},
	"stonealpha-1": {
		title: "Alpha-blockers as medical expulsive therapy for ureteral stones",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2018,
		url: "https://doi.org/10.1002/14651858.cd008509.pub3",
		doi: "10.1002/14651858.cd008509.pub3",
		note: "2018 Cochrane review suggests alpha-blockers improve ureteral stone clearance. Higher-quality placebo comparisons show a smaller effect than the full pool, with greater benefit for stones larger than 5 mm. Adverse effects and uncertainty about surgery remain important. Its trials overlap other syntheses.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd008509.pub3",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd008509.pub3&rows=100"
		],
		order: 1
	},
	"stonealpha-2": {
		title: "Alpha blockers for treatment of ureteric stones: systematic review and meta-analysis",
		publisher: "BMJ",
		year: 2016,
		url: "https://doi.org/10.1136/bmj.i6112",
		doi: "10.1136/bmj.i6112",
		note: "2016 synthesis of 55 trials finds passage benefit concentrated in larger ureteral stones, with variable study quality. It overlaps the later Cochrane review and does not establish benefit for every stone or safe observation of infected obstruction.",
		kind: "meta_analysis",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1136/bmj.i6112",
			"https://api.crossref.org/works?filter=updates%3A10.1136%2Fbmj.i6112&rows=100"
		],
		order: 1
	},
	"stonealpha-3": {
		title: "Effect of Tamsulosin on Passage of Symptomatic Ureteral Stones",
		publisher: "JAMA Internal Medicine",
		year: 2018,
		url: "https://doi.org/10.1001/jamainternmed.2018.2259",
		doi: "10.1001/jamainternmed.2018.2259",
		note: "Placebo-controlled trial randomized 512 adults, with mean stone diameter 3.8 mm. Passage occurred in 50% with tamsulosin and 47% with placebo, without a clear difference. Its predominantly small stones limit comparison with evidence favoring selected larger distal stones.",
		kind: "landmark_study",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1001/jamainternmed.2018.2259",
			"https://api.crossref.org/works?filter=updates%3A10.1001%2Fjamainternmed.2018.2259&rows=100"
		],
		order: 1
	},
	"ureterGuidance": {
		title: "EAU Guidelines on Urolithiasis: Disease Management",
		publisher: "European Association of Urology",
		year: 2026,
		url: "https://uroweb.org/guidelines/urolithiasis/chapter/guidelines",
		note: "EAU guidance supports selected alpha-blocker use for larger distal ureteral stones, with off-label status and suitability for observation explicit. Infection with obstruction, uncontrolled symptoms and deteriorating kidney function require a separate clinical response.",
		kind: "guideline",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://uroweb.org/guidelines/urolithiasis/chapter/guidelines"
		],
		order: 1
	},
	"cranberry-1": {
		title: "Cranberries for preventing urinary tract infections",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2023,
		url: "https://doi.org/10.1002/14651858.cd001321.pub7",
		doi: "10.1002/14651858.cd001321.pub7",
		note: "Updated 2023 Cochrane review includes 50 trials and 8,857 participants. Recurrent-UTI women have a modest average reduction in symptomatic culture-confirmed infections, while pregnancy, institutional care and impaired emptying show less convincing benefit. Products and active-ingredient content vary; prevention is not active infection treatment.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd001321.pub7",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd001321.pub7&rows=100"
		],
		order: 1
	},
	"cranberry-2": {
		title: "Cranberry Juice, Cranberry Tablets, or Liquid Therapies for Urinary Tract Infection: A Systematic Review and Network Meta-analysis",
		publisher: "European Urology Focus",
		year: 2024,
		url: "https://doi.org/10.1016/j.euf.2024.07.002",
		doi: "10.1016/j.euf.2024.07.002",
		note: "2024 network synthesis of 20 trials favors cranberry juice in some comparisons. Network assumptions, differing comparators and overlapping trials limit product rankings and generalization. It is not independent replication of every trial in the Cochrane review.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1016/j.euf.2024.07.002",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.euf.2024.07.002&rows=100"
		],
		order: 1
	},
	"cranberry-3": {
		title: "Whole cranberry fruit powder supplement reduces the incidence of culture-confirmed urinary tract infections in females with a history of recurrent urinary tract infection: A 6-month multicenter, randomized, double-blind, placebo-controlled trial",
		publisher: "The American Journal of Clinical Nutrition",
		year: 2025,
		url: "https://doi.org/10.1016/j.ajcnut.2025.01.022",
		doi: "10.1016/j.ajcnut.2025.01.022",
		note: "Trial of a proprietary cranberry preparation in 150 women reports fewer culture-confirmed symptomatic infections, but the suspected-symptom outcome alone was not clearly reduced. Swisse Wellness funded the work through CSIRO. One preparation's result does not establish a class-wide percentage benefit.",
		kind: "landmark_study",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1016/j.ajcnut.2025.01.022",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.ajcnut.2025.01.022&rows=100"
		],
		order: 1
	},
	"rutireview-1": {
		title: "Non-antibiotic interventions to prevent recurrent urinary tract infections in women: overview of systematic reviews of randomised controlled trials",
		publisher: "British Journal of General Practice",
		year: 2026,
		url: "https://doi.org/10.3399/bjgp.2026.0055",
		doi: "10.3399/bjgp.2026.0055",
		note: "2026 overview includes 27 systematic reviews of non-antibiotic recurrent-UTI prevention in women. It supports cranberry, methenamine and local estrogen in appropriate groups while finding uncertainty around D-mannose and several alternatives. Its overlapping reviews are not 27 independent clinical trials, and its search ended in May 2025.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.3399/bjgp.2026.0055",
			"https://api.crossref.org/works?filter=updates%3A10.3399%2Fbjgp.2026.0055&rows=100"
		],
		order: 1
	},
	"mannose-1": {
		title: "d -Mannose for Prevention of Recurrent Urinary Tract Infection Among Women",
		publisher: "JAMA Internal Medicine",
		year: 2024,
		url: "https://doi.org/10.1001/jamainternmed.2024.0264",
		doi: "10.1001/jamainternmed.2024.0264",
		note: "2024 double-blind primary-care trial randomized 598 women. Medically attended suspected infections occurred in 51.0% versus 55.7% with placebo; the confidence interval included no benefit. This large direct comparison weighs against routine preventive claims.",
		kind: "landmark_study",
		stance: "debate",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1001/jamainternmed.2024.0264",
			"https://api.crossref.org/works?filter=updates%3A10.1001%2Fjamainternmed.2024.0264&rows=100"
		],
		order: 1
	},
	"mannose-2": {
		title: "Efficacy of D-mannose as prophylaxis of recurrent urinary tract infection: a systematic review and meta-analysis of randomized controlled trials",
		publisher: "Brazilian Journal of Nephrology",
		year: 2025,
		url: "https://doi.org/10.1590/2175-8239-jbn-2025-0169en",
		doi: "10.1590/2175-8239-jbn-2025-0169en",
		note: "2025 synthesis of six randomized trials includes 1,167 participants and does not establish a clear preventive advantage. Its abstract contains a p-value inconsistent with a confidence interval spanning the null; the site does not reproduce that p-value as proof of efficacy.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1590/2175-8239-jbn-2025-0169en",
			"https://api.crossref.org/works?filter=updates%3A10.1590%2F2175-8239-jbn-2025-0169en&rows=100"
		],
		order: 1
	},
	"mannose-3": {
		title: "Comparison of increased hydration, d-mannose, and antibiotic prophylaxis for recurrent urinary tract infection prevention in premenopausal women: a three-arm randomized-controlled study",
		publisher: "International Urology and Nephrology",
		year: 2026,
		url: "https://doi.org/10.1007/s11255-025-04747-0",
		doi: "10.1007/s11255-025-04747-0",
		note: "Small three-arm trial of 75 participants compares D-mannose, antibiotic prevention and increased water, without a placebo comparison. The abstract describes D-mannose versus water as trending rather than conclusive. PubMed identifies the March 2026 journal issue and August 2025 online publication; this citation uses the verified 2026 issue year rather than Crossref's conflicting print year.",
		kind: "landmark_study",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1007/s11255-025-04747-0",
			"https://api.crossref.org/works?filter=updates%3A10.1007%2Fs11255-025-04747-0&rows=100"
		],
		order: 1
	},
	"mannose-4": {
		title: "Nonantibiotic prophylaxis for urinary tract infections: a network meta-analysis of randomized controlled trials",
		publisher: "Infection",
		year: 2025,
		url: "https://doi.org/10.1007/s15010-024-02357-z",
		doi: "10.1007/s15010-024-02357-z",
		note: "Network analysis of 50 trials reports favorable rankings for some non-antibiotic strategies, including D-mannose. Indirect comparisons, heterogeneous treatments and study quality limit causal ranking. It does not override a large direct placebo-controlled trial by counting reviews as independent experiments.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1007/s15010-024-02357-z",
			"https://api.crossref.org/works?filter=updates%3A10.1007%2Fs15010-024-02357-z&rows=100"
		],
		order: 1
	},
	"methenamine-1": {
		title: "Alternative to prophylactic antibiotics for the treatment of recurrent urinary tract infections in women: multicentre, open label, randomised, non-inferiority trial",
		publisher: "BMJ",
		year: 2022,
		url: "https://doi.org/10.1136/bmj-2021-0068229",
		doi: "10.1136/bmj-2021-0068229",
		note: "ALTAR randomized 240 women to methenamine or daily low-dose antibiotics for a year; 205 entered the modified intention-to-treat analysis. Rates were 1.38 versus 0.89 infections per person-year, meeting a predefined one-episode noninferiority margin. The open-label design, crossover and allowed difference do not establish identical efficacy.",
		kind: "landmark_study",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1136/bmj-2021-0068229",
			"https://api.crossref.org/works?filter=updates%3A10.1136%2Fbmj-2021-0068229&rows=100"
		],
		order: 1
	},
	"methenamine-2": {
		title: "Methenamine for urinary tract infection prophylaxis: A systematic review",
		publisher: "Pharmacotherapy: The Journal of Human Pharmacology and Drug Therapy",
		year: 2024,
		url: "https://doi.org/10.1002/phar.2895",
		doi: "10.1002/phar.2895",
		note: "Review of 11 articles supports methenamine as an antibiotic-sparing option while including different designs and populations. One author reports Merck and Melinta relationships. It adds synthesis, rather than independent replication of ALTAR or certainty in every special population.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/phar.2895",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2Fphar.2895&rows=100"
		],
		order: 1
	},
	"methenamine-3": {
		title: "Methenamine hippurate as prophylaxis for recurrent urinary tract infections in older women: a triple-blind, randomised, placebo-controlled, phase IV trial (ImpresU)",
		publisher: "Clinical Microbiology and Infection",
		year: 2025,
		url: "https://doi.org/10.1016/j.cmi.2025.07.006",
		doi: "10.1016/j.cmi.2025.07.006",
		note: "ImpresU recruited 289 women aged at least 70 and analyzed 281 in a triple-blind placebo-controlled comparison. Treatment-period infections were modestly lower, with a borderline confidence interval, while infections rose in follow-up after stopping. Placebo efficacy does not establish superiority to antibiotics or durable post-treatment protection.",
		kind: "landmark_study",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1016/j.cmi.2025.07.006",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.cmi.2025.07.006&rows=100"
		],
		order: 1
	},
	"utiwater-1": {
		title: "Effect of Increased Daily Water Intake in Premenopausal Women With Recurrent Urinary Tract Infections",
		publisher: "JAMA Internal Medicine",
		year: 2018,
		url: "https://doi.org/10.1001/jamainternmed.2018.4204",
		doi: "10.1001/jamainternmed.2018.4204",
		note: "Open-label trial in 140 premenopausal women with low baseline fluid intake reports 1.7 versus 3.2 cystitis episodes over a year. Danone employees and consulting relationships are disclosed. Selected low-intake participants, lack of masking and fluid-sensitive conditions limit generalization.",
		kind: "landmark_study",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1001/jamainternmed.2018.4204",
			"https://api.crossref.org/works?filter=updates%3A10.1001%2Fjamainternmed.2018.4204&rows=100"
		],
		order: 1
	},
	"utiwater-2": {
		title: "Increased fluid intake to prevent urinary tract infections: systematic review and meta-analysis",
		publisher: "British Journal of General Practice",
		year: 2020,
		url: "https://doi.org/10.3399/bjgp20x708125",
		doi: "10.3399/bjgp20x708125",
		note: "2020 review includes eight studies, seven pooled. Episode rates and the proportion with any recurrence give different results, including no clear 12-month difference for any recurrence. Mixed interventions and overlapping evidence limit a universal hydration claim.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.3399/bjgp20x708125",
			"https://api.crossref.org/works?filter=updates%3A10.3399%2Fbjgp20x708125&rows=100"
		],
		order: 1
	},
	"utiwater-3": {
		title: "A systematic review of behavioural interventions for prevention of recurrent urinary tract infections",
		publisher: "BJGP Open",
		year: 2026,
		url: "https://doi.org/10.3399/bjgpo.2026.0222",
		doi: "10.3399/bjgpo.2026.0222",
		note: "2026 behavioral-intervention review includes ten studies, only two randomized. Evidence is low or very low certainty and the strongest water result comes from the same 140-person trial. It does not independently establish that all hygiene or voiding practices prevent infections.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.3399/bjgpo.2026.0222",
			"https://api.crossref.org/works?filter=updates%3A10.3399%2Fbjgpo.2026.0222&rows=100"
		],
		order: 1
	},
	"asymptomatic-1": {
		title: "Antibiotics for asymptomatic bacteriuria",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2015,
		url: "https://doi.org/10.1002/14651858.cd009534.pub2",
		doi: "10.1002/14651858.cd009534.pub2",
		note: "2015 Cochrane review of nine studies and 1,614 adults finds no clear clinical benefit from antibiotics for usual asymptomatic bacteriuria populations, despite improved culture clearance, and more adverse effects. Pregnancy, procedures and inadequately studied special populations require separate evidence.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd009534.pub2",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd009534.pub2&rows=100"
		],
		order: 1
	},
	"asymptomatic-2": {
		title: "Clinical Practice Guideline for the Management of Asymptomatic Bacteriuria: 2019 Update by the Infectious Diseases Society of America",
		publisher: "Clinical Infectious Diseases",
		year: 2019,
		url: "https://doi.org/10.1093/cid/ciy1121",
		doi: "10.1093/cid/ciy1121",
		note: "IDSA's 2019 guideline distinguishes asymptomatic bacteriuria from symptomatic infection, with pregnancy and selected invasive urologic procedures as important treatment exceptions. It addresses transplant, catheter and immune-suppressed groups separately; the general conclusion must not be extended automatically to every high-risk setting.",
		kind: "guideline",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1093/cid/ciy1121",
			"https://api.crossref.org/works?filter=updates%3A10.1093%2Fcid%2Fciy1121&rows=100"
		],
		order: 1
	},
	"asymptomatic-3": {
		title: "Screening for Asymptomatic Bacteriuria in Adults",
		publisher: "JAMA",
		year: 2019,
		url: "https://doi.org/10.1001/jama.2019.10060",
		doi: "10.1001/jama.2019.10060",
		note: "USPSTF evidence review finds no clinical benefit in five treatment trials involving 777 nonpregnant adults. Pregnancy evidence is different and largely old. No screening trials in nonpregnant populations were found, so treatment and screening evidence must remain distinct.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1001/jama.2019.10060",
			"https://api.crossref.org/works?filter=updates%3A10.1001%2Fjama.2019.10060&rows=100"
		],
		order: 1
	},
	"estrogen-1": {
		title: "Estrogen for the prevention of recurrent urinary tract infections in postmenopausal women: a meta-analysis of randomized controlled trials",
		publisher: "International Urogynecology Journal",
		year: 2021,
		url: "https://doi.org/10.1007/s00192-020-04397-z",
		doi: "10.1007/s00192-020-04397-z",
		note: "Eight-trial synthesis separates five vaginal-estrogen trials from three oral-estrogen trials. Local treatment reduced recurrence on average; oral treatment did not show the same benefit. Formulation differences and imprecise adverse-event estimates prevent universal safety conclusions.",
		kind: "meta_analysis",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1007/s00192-020-04397-z",
			"https://api.crossref.org/works?filter=updates%3A10.1007%2Fs00192-020-04397-z&rows=100"
		],
		order: 1
	},
	"estrogen-2": {
		title: "Vaginal Estrogen for the Prevention of Recurrent Urinary Tract Infection in Postmenopausal Women: A Randomized Clinical Trial",
		publisher: "Female Pelvic Medicine & Reconstructive Surgery",
		year: 2021,
		url: "https://doi.org/10.1097/spv.0000000000000749",
		doi: "10.1097/spv.0000000000000749",
		note: "Small contemporary trial randomized 35 women, with nine early dropouts and revised combined-estrogen comparisons after slow recruitment. Fewer women had an infection with vaginal estrogen at six months. Attrition and sample size limit precision and long-term generalization.",
		kind: "landmark_study",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1097/spv.0000000000000749",
			"https://api.crossref.org/works?filter=updates%3A10.1097%2Fspv.0000000000000749&rows=100"
		],
		order: 1
	},
	"estrogen-3": {
		title: "A Controlled Trial of Intravaginal Estriol in Postmenopausal Women with Recurrent Urinary Tract Infections",
		publisher: "New England Journal of Medicine",
		year: 1993,
		url: "https://doi.org/10.1056/nejm199309093291102",
		doi: "10.1056/nejm199309093291102",
		note: "1993 blinded trial randomized 93 postmenopausal women to intravaginal estriol or placebo and found fewer infections. Only 60 completed eight-month follow-up, with adverse effects contributing to discontinuation. This study overlaps later reviews and does not establish efficacy of systemic estrogen.",
		kind: "landmark_study",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1056/nejm199309093291102",
			"https://api.crossref.org/works?filter=updates%3A10.1056%2Fnejm199309093291102&rows=100"
		],
		order: 1
	},
	"training-1": {
		title: "Bladder training for treating overactive bladder in adults",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2023,
		url: "https://doi.org/10.1002/14651858.cd013571.pub2",
		doi: "10.1002/14651858.cd013571.pub2",
		note: "2023 Cochrane review includes 15 trials and 2,007 participants, nearly 90% women. Most estimates are low or very low certainty with small no-treatment comparisons and substantial bias concerns. Common use does not establish a precise effect or clear superiority to other active therapies.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd013571.pub2",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd013571.pub2&rows=100"
		],
		order: 1
	},
	"training-2": {
		title: "Isolated bladder training or in combination with other therapies to improve overactive bladder symptoms: a systematic review and meta-analysis of randomized controlled trials",
		publisher: "Brazilian Journal of Physical Therapy",
		year: 2024,
		url: "https://doi.org/10.1016/j.bjpt.2024.101102",
		doi: "10.1016/j.bjpt.2024.101102",
		note: "2024 review of 14 randomized trials examines isolated and combined bladder training. Some added therapies improve short-term outcomes over training alone, but heterogeneity and limited trials leave the effect of training itself uncertain. It overlaps earlier reviews.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1016/j.bjpt.2024.101102",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.bjpt.2024.101102&rows=100"
		],
		order: 1
	},
	"training-3": {
		title: "Bladder training compared to bladder training associated with pelvic floor muscle training for overactive bladder symptoms in women: A randomized clinical trial",
		publisher: "Neurourology and Urodynamics",
		year: 2023,
		url: "https://doi.org/10.1002/nau.25285",
		doi: "10.1002/nau.25285",
		note: "Trial of 63 women compared bladder training with training plus pelvic-floor muscle treatment. Adding the exercises did not clearly improve outcomes at 12 weeks. Both groups received training, so within-group improvement cannot isolate its causal effect against no treatment.",
		kind: "landmark_study",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/nau.25285",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2Fnau.25285&rows=100"
		],
		order: 1
	},
	"oabguideline-1": {
		title: "The AUA/SUFU guideline on the diagnosis and treatment of idiopathic overactive bladder",
		publisher: "Neurourology and Urodynamics",
		year: 2024,
		url: "https://doi.org/10.1002/nau.25532",
		doi: "10.1002/nau.25532",
		note: "2024 AUA/SUFU guideline describes 33 statements based on evidence through November 2023, emphasizing individualized treatment and shared decisions for idiopathic overactive bladder. The official author abstract was read; the blocked AUA PDF was not treated as full-text evidence or as an independent efficacy trial.",
		kind: "guideline",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/nau.25532",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2Fnau.25532&rows=100"
		],
		order: 1
	},
	"caffeine-1": {
		title: "Effectiveness of Fluid and Caffeine Modifications on Symptoms in Adults With Overactive Bladder: A Systematic Review",
		publisher: "International Neurourology Journal",
		year: 2023,
		url: "https://doi.org/10.5213/inj.2346014.007",
		doi: "10.5213/inj.2346014.007",
		note: "2023 review includes eight studies, seven randomized, but does not pool outcomes because they differ. Caffeine reduction appears favorable for urgency and frequency; fluid and caffeine changes are not equivalent. Long-term adherence and sustained benefit remain uncertain.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.5213/inj.2346014.007",
			"https://api.crossref.org/works?filter=updates%3A10.5213%2Finj.2346014.007&rows=100"
		],
		order: 1
	},
	"caffeine-2": {
		title: "What do we really know about the role of caffeine on urinary tract symptoms? A scoping review on caffeine consumption and lower urinary tract symptoms in adults",
		publisher: "Neurourology and Urodynamics",
		year: 2020,
		url: "https://doi.org/10.1002/nau.24344",
		doi: "10.1002/nau.24344",
		note: "Scoping review covers 14 intervention and 12 observational studies. It identifies promising urgency findings alongside heterogeneous exposure measures and unknown or high bias in many studies. Observational associations are unclear and do not establish a universal caffeine threshold.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/nau.24344",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2Fnau.24344&rows=100"
		],
		order: 1
	},
	"caffeine-3": {
		title: "The Effect of Caffeinated Versus Decaffeinated Drinks on Overactive Bladder",
		publisher: "Journal of Wound, Ostomy & Continence Nursing",
		year: 2014,
		url: "https://doi.org/10.1097/won.0000000000000040",
		doi: "10.1097/won.0000000000000040",
		note: "Blinded crossover pilot recruited 14 women, with 11 completing caffeinated and decaffeinated periods. Some diary urgency and frequency outcomes improved during decaffeinated intake. Small size, short periods and multiple outcomes limit a reliable population-wide effect estimate.",
		kind: "landmark_study",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1097/won.0000000000000040",
			"https://api.crossref.org/works?filter=updates%3A10.1097%2Fwon.0000000000000040&rows=100"
		],
		order: 1
	},
	"anticholinergic-1": {
		title: "Oral anticholinergic drugs versus placebo or no treatment for managing overactive bladder syndrome in adults",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2023,
		url: "https://doi.org/10.1002/14651858.cd003781.pub3",
		doi: "10.1002/14651858.cd003781.pub3",
		note: "2023 Cochrane review includes 104 studies, with 47,106 participants in those reporting sample size. Anticholinergics provide modest average symptom improvements with more dry mouth, retention and adverse-effect withdrawals. Much of the underlying search predates publication and long-term persistence is uncertain.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd003781.pub3",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd003781.pub3&rows=100"
		],
		order: 1
	},
	"anticholinergic-2": {
		title: "Risk of dementia associated with anticholinergic drugs for overactive bladder in adults aged ≥55 years: nested case-control study",
		publisher: "BMJ Medicine",
		year: 2024,
		url: "https://doi.org/10.1136/bmjmed-2023-000799",
		doi: "10.1136/bmjmed-2023-000799",
		note: "English nested case-control study includes 170,742 dementia cases and 804,385 controls aged at least 55. Some bladder anticholinergics show stronger associations than others. Residual confounding, prior treatment and prodromal illness limit causal interpretation; a null drug-specific association is not proof of zero risk.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1136/bmjmed-2023-000799",
			"https://api.crossref.org/works?filter=updates%3A10.1136%2Fbmjmed-2023-000799&rows=100"
		],
		order: 1
	},
	"beta3-1": {
		title: "Mirabegron and Anticholinergics in the Treatment of Overactive Bladder Syndrome: A Meta-analysis",
		publisher: "Revista Brasileira de Ginecologia e Obstetrícia / RBGO Gynecology and Obstetrics",
		year: 2023,
		url: "https://doi.org/10.1055/s-0043-1770093",
		doi: "10.1055/s-0043-1770093",
		note: "Meta-analysis of 14 studies and 10,774 participants compares mirabegron with antimuscarinics. Average efficacy and adherence did not clearly differ, while dry mouth and some other adverse events were less frequent with mirabegron. Comparable averages do not prove universal equivalence.",
		kind: "meta_analysis",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1055/s-0043-1770093",
			"https://api.crossref.org/works?filter=updates%3A10.1055%2Fs-0043-1770093&rows=100"
		],
		order: 1
	},
	"beta3-2": {
		title: "International Phase III, Randomized, Double-Blind, Placebo and Active Controlled Study to Evaluate the Safety and Efficacy of Vibegron in Patients with Symptoms of Overactive Bladder: EMPOWUR",
		publisher: "Journal of Urology",
		year: 2020,
		url: "https://doi.org/10.1097/ju.0000000000000807",
		doi: "10.1097/ju.0000000000000807",
		note: "EMPOWUR randomized 1,518 adults for 12 weeks. Vibegron reduced daily urinations by 1.8 versus 1.3 with placebo, with similarly modest placebo-adjusted leakage improvements. Its active comparator and short follow-up do not establish a universal best drug or identical long-term cardiovascular safety.",
		kind: "landmark_study",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1097/ju.0000000000000807",
			"https://api.crossref.org/works?filter=updates%3A10.1097%2Fju.0000000000000807&rows=100"
		],
		order: 1
	},
	"beta3-3": {
		title: "Efficacy of Vibegron in Overactive Bladder: A Bayesian Cross‐Trial Synthesis of Benefit Probabilities and Decision Thresholds",
		publisher: "LUTS: Lower Urinary Tract Symptoms",
		year: 2026,
		url: "https://doi.org/10.1111/luts.70095",
		doi: "10.1111/luts.70095",
		note: "2026 Bayesian analysis combines three existing phase-III placebo-controlled trials. Vibegron has a high modeled probability of some symptom benefit, with smaller probabilities of crossing larger thresholds. Those probabilities are not expert-agreement percentages or new independent treatment trials. Pharmaceutical relationships are disclosed.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1111/luts.70095",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fluts.70095&rows=100"
		],
		order: 1
	},
	"palmetto-1": {
		title: "Serenoa repens for the treatment of lower urinary tract symptoms due to benign prostatic enlargement",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2023,
		url: "https://doi.org/10.1002/14651858.cd001423.pub4",
		doi: "10.1002/14651858.cd001423.pub4",
		note: "2023 Cochrane review includes 27 studies and emphasizes placebo comparisons and low-bias sensitivity analyses. Saw palmetto alone produces little or no meaningful symptom benefit with high-certainty findings for several outcomes. Combination products and particular extracts need separate interpretation.",
		kind: "systematic_review",
		stance: "debate",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd001423.pub4",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd001423.pub4&rows=100"
		],
		order: 1
	},
	"palmetto-2": {
		title: "Efficacy and safety of Serenoa repens in benign prostatic disorders: a systematic review of recent clinical evidence",
		publisher: "Drugs in Context",
		year: 2026,
		url: "https://doi.org/10.7573/dic.2025-10-2",
		doi: "10.7573/dic.2025-10-2",
		note: "2026 review includes 16 studies of mixed design through May 2025 and reaches a more favorable view, particularly for selected extracts. Observational cohorts, open-label comparisons, post hoc work and combination treatments limit inference about a placebo-controlled effect of saw palmetto alone.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.7573/dic.2025-10-2",
			"https://api.crossref.org/works?filter=updates%3A10.7573%2Fdic.2025-10-2&rows=100"
		],
		order: 1
	},
	"palmetto-3": {
		title: "Saw Palmetto for Benign Prostatic Hyperplasia",
		publisher: "New England Journal of Medicine",
		year: 2006,
		url: "https://doi.org/10.1056/nejmoa053085",
		doi: "10.1056/nejmoa053085",
		note: "2006 double-blind trial randomized 225 men and found no clear difference from placebo in symptoms, flow or several secondary outcomes over a year. It tests one extract, and overlaps the placebo-focused Cochrane evidence rather than adding independent replication to that review.",
		kind: "landmark_study",
		stance: "debate",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1056/nejmoa053085",
			"https://api.crossref.org/works?filter=updates%3A10.1056%2Fnejmoa053085&rows=100"
		],
		order: 1
	},
	"maleLutsGuidance": {
		title: "EAU Guidelines on Non-neurogenic Male LUTS: Disease Management",
		publisher: "European Association of Urology",
		year: 2026,
		url: "https://uroweb.org/guidelines/management-of-non-neurogenic-male-luts/chapter/disease-management",
		note: "European guidance distinguishes rapid alpha-blocker symptom relief from slower 5-alpha-reductase inhibitor effects on progression in enlarged prostates. It weakly offers a specified hexane saw-palmetto extract, describing modest expected benefit. Extract-specific guidance does not validate all supplements.",
		kind: "guideline",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://uroweb.org/guidelines/management-of-non-neurogenic-male-luts/chapter/disease-management"
		],
		order: 1
	},
	"bphalpha-1": {
		title: "Comparative efficacy and safety of alpha-blockers as monotherapy for benign prostatic hyperplasia: a systematic review and network meta-analysis",
		publisher: "Scientific Reports",
		year: 2024,
		url: "https://doi.org/10.1038/s41598-024-61977-5",
		doi: "10.1038/s41598-024-61977-5",
		note: "2024 network synthesis of 22 trials supports alpha-blocker symptom benefit, with limited direct comparisons. Its correction fixes switched legends for Figures 2 and 3; the notice does not establish a new treatment effect. Indirect ranking scores are not a universal prescribing hierarchy.",
		kind: "meta_analysis",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "corrected",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1038/s41598-024-61977-5",
			"https://doi.org/10.1038/s41598-024-63406-z",
			"https://api.crossref.org/works?filter=updates%3A10.1038%2Fs41598-024-61977-5&rows=100",
			"https://www.nature.com/articles/s41598-024-63406-z"
		],
		order: 1
	},
	"finasteride-2": {
		title: "The Long-Term Effect of Doxazosin, Finasteride, and Combination Therapy on the Clinical Progression of Benign Prostatic Hyperplasia",
		publisher: "New England Journal of Medicine",
		year: 2003,
		url: "https://doi.org/10.1056/nejmoa030656",
		doi: "10.1056/nejmoa030656",
		note: "MTOPS randomized 3,047 men and followed them for an average of 4.5 years. Finasteride and combination treatment reduced retention and invasive-treatment risk; doxazosin improved symptoms and a broader composite but not those two outcomes clearly. Relative reductions in the composite are not universal absolute benefits.",
		kind: "landmark_study",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1056/nejmoa030656",
			"https://api.crossref.org/works?filter=updates%3A10.1056%2Fnejmoa030656&rows=100"
		],
		order: 1
	},
	"finasteride-1": {
		title: "Finasteride for benign prostatic hyperplasia",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2010,
		url: "https://doi.org/10.1002/14651858.cd006015.pub3",
		doi: "10.1002/14651858.cd006015.pub3",
		note: "2010 Cochrane review supports long-term finasteride symptom and progression effects, with benefits differing by prostate size and comparison. Sexual adverse effects are more common than with placebo. An older efficacy synthesis cannot resolve current uncommon safety concerns on its own.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd006015.pub3",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd006015.pub3&rows=100"
		],
		order: 1
	},
	"finasteride-4": {
		title: "Efficacy and safety of dutasteride for the treatment of symptomatic benign prostatic hyperplasia (BPH): a systematic review and meta-analysis",
		publisher: "World Journal of Urology",
		year: 2014,
		url: "https://doi.org/10.1007/s00345-014-1258-9",
		doi: "10.1007/s00345-014-1258-9",
		note: "Nine-trial dutasteride synthesis finds symptom and prostate-volume benefits with more drug-related adverse events. Comparators differ and the abstract has inconsistent units in one combination-treatment estimate, which is not reproduced here. It overlaps major earlier trials.",
		kind: "meta_analysis",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1007/s00345-014-1258-9",
			"https://api.crossref.org/works?filter=updates%3A10.1007%2Fs00345-014-1258-9&rows=100"
		],
		order: 1
	},
	"emaSafety": {
		title: "Finasteride- and dutasteride-containing medicinal products: safety referral",
		publisher: "European Medicines Agency",
		year: 2025,
		url: "https://www.ema.europa.eu/en/medicines/human/referrals/finasteride-dutasteride-containing-medicinal-products",
		note: "EMA's 2025 review confirms suicidal thoughts as an adverse effect of finasteride tablets, with unknown frequency and most reports involving hair-loss use. It finds no established direct link for dutasteride, whose warning is precautionary. Approved-use benefits continue to outweigh risks; formulations and indications differ.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://www.ema.europa.eu/en/medicines/human/referrals/finasteride-dutasteride-containing-medicinal-products"
		],
		order: 1
	},
	"salt-1": {
		title: "Altered dietary salt intake for people with chronic kidney disease",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2021,
		url: "https://doi.org/10.1002/14651858.cd010070.pub3",
		doi: "10.1002/14651858.cd010070.pub3",
		note: "2021 Cochrane review of 21 CKD studies finds clear short-term blood-pressure and early-stage albuminuria reductions with lower salt intake. Trials last 1 to 36 weeks, too short for reliable death or kidney-failure conclusions. Symptomatic hypotension can increase; dialysis and transplant subgroups differ.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd010070.pub3",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd010070.pub3&rows=100"
		],
		order: 1
	},
	"salt-2": {
		title: "Effect of a Low Salt Diet on the Progression of Chronic Kidney Disease: A Prospective, Open-Label, Randomized Controlled Trial",
		publisher: "Journal of Primary Care & Community Health",
		year: 2024,
		url: "https://doi.org/10.1177/21501319241297766",
		doi: "10.1177/21501319241297766",
		note: "Open-label randomized study of 194 adults with stages 1 to 3 CKD reports lower blood pressure over three months. Short-term filtration results and limited follow-up do not establish prevention of kidney failure or death. Its abstract's numerical reporting is uneven, so no precise filtration benefit is reproduced.",
		kind: "landmark_study",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1177/21501319241297766",
			"https://api.crossref.org/works?filter=updates%3A10.1177%2F21501319241297766&rows=100"
		],
		order: 1
	},
	"salt-3": {
		title: "A Randomized Trial of Dietary Sodium Restriction in CKD",
		publisher: "Journal of the American Society of Nephrology",
		year: 2013,
		url: "https://doi.org/10.1681/asn.2013030285",
		doi: "10.1681/asn.2013030285",
		note: "Small randomized crossover trial in 20 adults with hypertensive stage 3 to 4 CKD found lower ambulatory pressure and urine protein with sodium restriction. It is short-term and overlaps the Cochrane evidence, with no basis for a long-term clinical-event estimate.",
		kind: "landmark_study",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1681/asn.2013030285",
			"https://api.crossref.org/works?filter=updates%3A10.1681%2Fasn.2013030285&rows=100"
		],
		order: 1
	},
	"kdigoGuidance": {
		title: "Executive summary of the KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease",
		publisher: "Kidney Disease: Improving Global Outcomes",
		year: 2024,
		url: "https://kdigo.org/wp-content/uploads/2017/02/KDIGO-2024-CKD-Guideline-Executive-Summary.pdf",
		note: "KDIGO's 2024 CKD guideline supports individualized sodium reduction and activity compatible with cardiovascular health, physical tolerance and frailty. Salt-wasting nephropathy is an important exception to routine sodium restriction. This guideline excludes dialysis and transplant care and does not turn functional gains into proven prevention of kidney failure.",
		kind: "guideline",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://kdigo.org/wp-content/uploads/2017/02/KDIGO-2024-CKD-Guideline-Executive-Summary.pdf"
		],
		order: 1
	},
	"exercise-1": {
		title: "Effects of exercise on kidney and physical function in patients with non-dialysis chronic kidney disease: a systematic review and meta-analysis",
		publisher: "Scientific Reports",
		year: 2020,
		url: "https://doi.org/10.1038/s41598-020-75405-x",
		doi: "10.1038/s41598-020-75405-x",
		note: "Review of 18 randomized trials and 848 non-dialysis CKD participants supports better aerobic and walking capacity. Effects on mortality and estimated filtration were not clearly different from usual care. Functional gains do not establish kidney repair or survival benefit.",
		kind: "meta_analysis",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1038/s41598-020-75405-x",
			"https://api.crossref.org/works?filter=updates%3A10.1038%2Fs41598-020-75405-x&rows=100"
		],
		order: 1
	},
	"exercise-2": {
		title: "Effects of aerobic exercise on patients with pre-dialysis chronic kidney disease: a systematic review of randomized controlled trials",
		publisher: "Disability and Rehabilitation",
		year: 2022,
		url: "https://doi.org/10.1080/09638288.2021.1900929",
		doi: "10.1080/09638288.2021.1900929",
		note: "Review of ten trials and 365 pre-dialysis participants supports improved peak oxygen uptake and functional capacity with aerobic exercise. Programs and outcomes vary and the trials overlap broader reviews. The manuscript does not reproduce malformed duplicated text in the indexed abstract.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1080/09638288.2021.1900929",
			"https://api.crossref.org/works?filter=updates%3A10.1080%2F09638288.2021.1900929&rows=100"
		],
		order: 1
	},
	"exercise-3": {
		title: "Home‐based exercise programs in patients with chronic kidney disease: A systematic review and META‐analysis",
		publisher: "Worldviews on Evidence-Based Nursing",
		year: 2022,
		url: "https://doi.org/10.1111/wvn.12579",
		doi: "10.1111/wvn.12579",
		note: "Eight-study home-exercise review covers broader stage III to V CKD populations. Walking and some quality-of-life outcomes improve, but reporting no adverse effects does not prove universal safety. An internally inconsistent handgrip confidence-interval/p-value pair is not used as a positive strength finding.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T16:11:24.949Z",
		statusSources: [
			"https://doi.org/10.1111/wvn.12579",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fwvn.12579&rows=100"
		],
		order: 1
	}
};

export const novemberKidneyUrinaryClaims = [
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "does-drinking-more-water-prevent-repeat-kidney-stones",
		title: "Does drinking more water prevent repeat kidney stones?",
		bottomLine: "Probably, for some people who have already had calcium stones. A trial found fewer recurrences with increased water intake, and clinical guidelines support staying well hydrated. The direct trial evidence is limited, and a suitable fluid intake depends on kidney function, heart health and any prescribed fluid restriction.",
		stableCore: [
			"Diluting urine can reduce the conditions that allow some stones to form. The clearest randomized evidence concerns people with previous calcium stones who were stone-free at the start.",
			"The main Cochrane review rests on one older trial. Larger observational studies add context but cannot establish the same causal certainty."
		],
		openQuestions: [
			"How much benefit persists across different stone types, climates and starting fluid intakes?",
			"Which approaches maintain hydration over years while avoiding fluid overload or low blood sodium?"
		],
		whatWouldChangeMinds: [
			"Larger randomized prevention studies with clear recurrence definitions and sustained adherence.",
			"Better reporting of adverse effects and outcomes in people with different kidney and heart conditions."
		],
		misconceptions: [
			"A prevention study does not establish that forcing fluids will treat a blocked ureter or an acute infection.",
			"A study's target urine volume is different from a universal drinking prescription."
		],
		editorSummary: "Guideline support is stronger than the small body of direct randomized recurrence evidence.",
		population: "Adults with previous urinary stones, mainly calcium-stone formers; direct recurrence evidence largely comes from an older trial.",
		scope: "Compare sustained increased water intake with usual intake for future stone recurrence, keeping first-stone prevention and acute stone treatment separate.",
		excludedEvidence: [
			"Keep observational fluid associations distinct from randomized recurrence prevention.",
			"Exclude forced-fluid treatment of acute obstruction and universal intake targets for people with fluid restrictions."
		],
		uncertainty: "One small randomized evidence base, incomplete safety reporting, differences in stone type and limited evidence in people at risk of fluid overload.",
		band: "broad",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["stonewater-1"], sources["stonewater-2"], sources.stoneGuidance]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "does-a-low-calcium-diet-prevent-calcium-kidney-stones",
		title: "Does a low-calcium diet prevent calcium kidney stones?",
		bottomLine: "Usually not. Cutting calcium from food is not a general prevention strategy for calcium oxalate stones. In a trial, a normal-calcium diet with less salt and animal protein prevented more recurrences than a low-calcium diet. Food calcium and calcium supplements can have different effects, and individual stone chemistry matters.",
		stableCore: [
			"Food calcium can bind oxalate in the gut, reducing how much reaches the urine. Lower calcium intake can therefore have effects beyond lowering urine calcium.",
			"The key five-year trial changed salt and animal protein as well as calcium. Its benefit cannot be assigned to calcium alone."
		],
		openQuestions: [
			"How well do the dietary trial findings generalize beyond men with recurrent calcium oxalate stones and high urine calcium?",
			"How should advice differ for other stone types, intestinal disease, osteoporosis and supplement use?"
		],
		whatWouldChangeMinds: [
			"Trials that separate calcium intake from salt, protein and fluid changes.",
			"Long-term studies reporting both stone recurrence and bone outcomes across diverse patient groups."
		],
		misconceptions: [
			"The word calcium in a stone's name does not establish that removing calcium-containing foods prevents it.",
			"Findings about calcium in food do not establish that every supplement is helpful or harmful."
		],
		editorSummary: "Stone prevention depends on the whole diet and stone type, with dietary calcium distinct from supplement use.",
		population: "Adults with calcium stones; the landmark randomized comparison enrolled 120 men with recurrent calcium oxalate stones and hypercalciuria.",
		scope: "Assess restricting calcium from food for prevention of calcium-stone recurrence, distinguishing bundled dietary changes, supplements and observational first-stone risk.",
		excludedEvidence: [
			"Keep calcium oxalate evidence separate from every calcium-containing or non-calcium stone subtype.",
			"Do not attribute a combined normal-calcium, lower-salt, lower-protein intervention entirely to one nutrient."
		],
		uncertainty: "The central randomized study is small, male-only and tests a dietary bundle; cohort associations and supplement findings have separate limitations.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["stonecalcium-1"], sources["stonecalcium-3"], sources.stoneGuidance]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "can-citrate-treatment-prevent-repeat-calcium-kidney-stones",
		title: "Can citrate treatment prevent repeat calcium kidney stones?",
		bottomLine: "It can help selected patients, but the trial evidence has important limits. Citrate treatment reduced new stones or further growth in several small studies, mostly involving calcium oxalate stones. Side effects and kidney function affect suitability. Tested medicines, ordinary supplements and citrus drinks are not interchangeable treatments.",
		stableCore: [
			"Older randomized studies generally favor citrate treatment for selected calcium-stone patients, including some with residual fragments after stone procedures.",
			"Reporting quality and follow-up are limited. Gastrointestinal effects and treatment withdrawals matter alongside stone outcomes."
		],
		openQuestions: [
			"Which stone and urine profiles predict a worthwhile long-term benefit?",
			"How do formulations compare for sustained benefit, adherence and adverse effects?"
		],
		whatWouldChangeMinds: [
			"Larger multicenter trials with well-defined symptomatic recurrence and long-term adverse-event reporting.",
			"Randomized comparisons that separate additional drug benefit from individualized dietary counseling."
		],
		misconceptions: [
			"Changing a urine chemistry measurement does not guarantee fewer painful stone episodes.",
			"More recurrences among treated patients in an observational cohort can reflect their higher starting risk."
		],
		editorSummary: "Benefit is plausible and supported by small trials, while formulation, stone type and treatment burden affect the balance.",
		population: "Adults with mainly calcium oxalate stones, including selected people with residual stones after treatment; observational safety data concern high-risk stone formers.",
		scope: "Assess prescribed citrate formulations for calcium-stone recurrence and growth, separating stone subtypes, biochemical measures and actual clinical outcomes.",
		excludedEvidence: [
			"Keep calcium oxalate, calcium phosphate and uric acid stone outcomes separate.",
			"Exclude assumed equivalence between prescribed citrate, over-the-counter products and citrus drinks, and avoid generalizing metabolic safety to all adverse effects."
		],
		uncertainty: "Trials are mostly older and small, with moderate-to-poor reporting, overlapping reviews and limited evidence on long-term comparative safety.",
		band: "broad",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["citrate-1"],
			sources["citrate-2"],
			sources["citrate-3"],
			sources.stoneGuidance
		]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "do-thiazide-medicines-prevent-repeat-calcium-kidney-stones",
		title: "Do thiazide medicines prevent repeat calcium kidney stones?",
		bottomLine: "The evidence is contested. Older studies and some clinical guidance favor treatment for selected patients. A large recent placebo-controlled trial found no clear overall recurrence benefit from hydrochlorothiazide and more adverse effects. Lower urine calcium alone does not prove fewer painful stones, and different drugs and patient groups may have different results.",
		stableCore: [
			"NOSTONE tested hydrochlorothiazide in 416 people and found no clear dose-response for its main combined recurrence outcome.",
			"Observational data link larger urine-calcium reductions to fewer later stone events, but those associations do not resolve the randomized trial's findings."
		],
		openQuestions: [
			"Do other thiazide-like drugs or carefully selected high-urine-calcium groups obtain a clearer clinical benefit?",
			"How do salt intake, treatment adherence and adverse effects change long-term outcomes?"
		],
		whatWouldChangeMinds: [
			"Well-powered placebo-controlled trials of specific drugs reporting symptomatic and imaging outcomes separately.",
			"Prespecified patient-group analyses and comparative safety results that can be replicated independently."
		],
		misconceptions: [
			"A benefit for blood pressure does not automatically establish a benefit for stone recurrence.",
			"A favorable imaging or urine marker result is different from the trial's primary outcome or a reduction in painful stone episodes."
		],
		editorSummary: "Trials, observational findings and clinical recommendations differ, with outcomes and patient selection central to interpretation.",
		population: "Adults with recurrent calcium stones; NOSTONE participants differ from some selected clinical groups, and the urine-calcium cohort mainly comprised older US adults.",
		scope: "Assess thiazide medicines for future calcium-stone recurrence, distinguishing drug-specific trials, clinical versus radiological outcomes and urine-calcium associations.",
		excludedEvidence: [
			"Keep hydrochlorothiazide, longer-acting drugs and different clinical subgroups distinct rather than assuming a uniform class effect.",
			"Do not treat within-cohort calcium-response associations or a secondary imaging result as randomized proof of clinical recurrence prevention."
		],
		uncertainty: "Older trials have substantial design limitations; the newer large trial is not clearly positive, while guidelines and nonrandomized findings support differing interpretations.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["thiazide-1"],
			sources["thiazide-2"],
			sources["thiazide-3"],
			sources.stoneGuidance
		]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "do-alpha-blockers-help-ureteral-stones-pass",
		title: "Do alpha-blockers help ureteral stones pass?",
		bottomLine: "Sometimes. Alpha-blockers can help selected stones pass through the ureter, with a clearer benefit for larger stones near the bladder than for very small stones. Many small stones pass without them. These medicines can cause dizziness or low blood pressure, and an infected or persistently blocked kidney needs a different response.",
		stableCore: [
			"The Cochrane review finds a smaller average benefit in its higher-quality placebo-controlled trials than across all studies.",
			"A 512-person trial with mostly small stones found no clear benefit. Stone size and location help explain why trials can reach different conclusions."
		],
		openQuestions: [
			"Which combinations of stone size and location predict a worthwhile benefit?",
			"How much does treatment reduce the need for a procedure rather than only the time to passage?"
		],
		whatWouldChangeMinds: [
			"Large blinded trials with prespecified size and location groups and confirmed stone passage.",
			"Consistent reporting of procedures, pain, fainting and treatment discontinuation."
		],
		misconceptions: [
			"Helping a stone move through the ureter does not mean dissolving it.",
			"Fever with a suspected blocked urinary tract requires prompt medical assessment; passage medicines do not treat sepsis."
		],
		editorSummary: "The strongest case concerns selected larger distal stones, rather than every ureteral stone.",
		population: "Adults with ureteral stones considered suitable for observation; evidence differs by stone size and location.",
		scope: "Assess passage of existing ureteral stones with alpha-blockers versus placebo or usual care, distinct from recurrence prevention.",
		excludedEvidence: [
			"Exclude alpha-blocker treatment of prostate symptoms and long-term stone prevention.",
			"Do not extend observation-trial results to infected obstruction, uncontrolled pain or worsening kidney function."
		],
		uncertainty: "Variable stone size, location, outcome confirmation and trial quality; surgery reduction is less certain than passage benefit.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["stonealpha-1"],
			sources["stonealpha-2"],
			sources["stonealpha-3"],
			sources.ureterGuidance
		]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "do-cranberry-products-prevent-recurrent-urinary-tract-infections",
		title: "Do cranberry products prevent recurrent urinary tract infections?",
		bottomLine: "They can reduce recurrences in some groups, including women with repeated urinary tract infections. The average benefit is modest and depends on the population and product. Evidence is less convincing for care-home residents, pregnancy and people who cannot fully empty their bladder. Cranberry products do not treat an active infection.",
		stableCore: [
			"The updated Cochrane review finds fewer culture-confirmed symptomatic infections in women with recurrent infections, while results differ across other groups.",
			"Juice, capsules and extracts vary in their ingredients. A positive trial of one preparation does not establish that every cranberry product works."
		],
		openQuestions: [
			"Which preparations provide reliable benefit without excessive sugar, cost or poor adherence?",
			"Which groups benefit most, and how long does protection last?"
		],
		whatWouldChangeMinds: [
			"Independent trials using standardized products and confirmed symptomatic infections.",
			"Head-to-head comparisons with adequate adherence and adverse-event reporting."
		],
		misconceptions: [
			"Cranberry prevention is different from treating burning, fever or a current infection.",
			"Several reviews can include the same trials; their number is not a count of separate replications."
		],
		editorSummary: "Prevention evidence is population-specific, and products are not interchangeable.",
		population: "Mainly women with recurrent uncomplicated urinary tract infections; separate results for pregnancy, institutional care and impaired bladder emptying.",
		scope: "Compare cranberry products with placebo, no cranberry or other prevention for future symptomatic urinary tract infections.",
		excludedEvidence: [
			"Exclude cranberry as treatment for an established urinary infection.",
			"Keep urine culture outcomes distinct from symptoms alone and avoid applying one proprietary extract result to all products."
		],
		uncertainty: "Differences in formulation, active ingredients, adherence, outcome definitions and baseline risk.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["cranberry-1"],
			sources["cranberry-2"],
			sources["cranberry-3"],
			sources["rutireview-1"]
		]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "does-d-mannose-prevent-recurrent-urinary-tract-infections",
		title: "Does D-mannose prevent recurrent urinary tract infections?",
		bottomLine: "A useful preventive benefit remains unproven. A large placebo-controlled trial found no clear reduction in infections needing medical attention. Smaller trials and some pooled analyses report benefits, but their methods and comparisons vary. The evidence does not support treating D-mannose as a reliable substitute for established prevention or treatment.",
		stableCore: [
			"The 2024 primary-care trial randomized 598 women. Its results did not show a clear advantage over placebo during six months.",
			"A later small three-group trial and favorable network estimates do not remove the uncertainty from the larger blinded trial. Water, antibiotics and placebo are different comparisons."
		],
		openQuestions: [
			"Is there a reproducible benefit in a clearly defined subgroup?",
			"How do product composition, adherence and infection definitions affect conflicting results?"
		],
		whatWouldChangeMinds: [
			"Independent, adequately powered placebo-controlled trials with confirmed symptomatic infections.",
			"Updated syntheses that assess bias, direct comparisons and the large negative trial explicitly."
		],
		misconceptions: [
			"A plausible bacterial-attachment mechanism does not establish fewer clinical infections.",
			"A trend favoring treatment, with uncertainty spanning no benefit, does not prove prevention."
		],
		editorSummary: "The strongest recent placebo-controlled trial is less favorable than several smaller or indirect comparisons.",
		population: "Adults, predominantly women, with recurrent urinary tract infections; pregnancy and complicated urinary conditions are not established indications.",
		scope: "Assess D-mannose prevention of future symptomatic urinary infections, emphasizing placebo-controlled clinical outcomes over laboratory mechanisms.",
		excludedEvidence: [
			"Exclude claims that D-mannose treats an active infection.",
			"Do not treat network rankings, within-group improvements or inconsistent abstract p values as definitive comparative efficacy."
		],
		uncertainty: "Conflicting designs and comparators, imprecise pooled estimates and limited long-term safety evidence.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["mannose-1"],
			sources["mannose-2"],
			sources["mannose-3"],
			sources["mannose-4"],
			sources["rutireview-1"]
		]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "can-methenamine-prevent-recurrent-urinary-tract-infections",
		title: "Can methenamine prevent recurrent urinary tract infections?",
		bottomLine: "Yes, it can be a preventive option for selected women with recurrent infections. In the ALTAR trial it met a preset comparison with daily low-dose antibiotics, although infections were somewhat more frequent with methenamine. That result does not mean the treatments are identical. Suitability depends on the urinary condition, kidney function and other medicines.",
		stableCore: [
			"ALTAR compared two prevention strategies over a year. Its noninferiority margin allowed a difference in infection rates, rather than requiring equal outcomes.",
			"A later placebo-controlled trial in women aged 70 or older found a modest reduction during treatment. Infections increased after treatment stopped, so persistence of benefit remains uncertain."
		],
		openQuestions: [
			"Which groups obtain enough benefit to prefer methenamine over antibiotic prevention?",
			"What treatment duration, adherence and follow-up best balance recurrences, adverse effects and resistance?"
		],
		whatWouldChangeMinds: [
			"Further blinded trials with consistent symptomatic infection definitions and post-treatment follow-up.",
			"Comparative evidence in clinically distinct populations, with kidney safety and treatment interactions reported."
		],
		misconceptions: [
			"Meeting a noninferiority margin does not establish equal efficacy or superiority.",
			"Prevention with methenamine is different from treatment of a current infection."
		],
		editorSummary: "Evidence supports selected preventive use, with trade-offs against antibiotic prevention and uncertainty after stopping.",
		population: "Mainly adult women with recurrent infections eligible for preventive treatment; separate evidence in older women.",
		scope: "Assess methenamine prevention versus antibiotics or placebo, distinguishing active-treatment and post-treatment periods.",
		excludedEvidence: [
			"Exclude automatic extension to pregnancy, catheter-associated infection, severe renal disease or complicated urinary anatomy.",
			"Do not present cross-over adverse-event denominators as fixed randomized groups or noninferiority as identical efficacy."
		],
		uncertainty: "An unmasked antibiotic comparison, selected populations, differing comparators and limited evidence after discontinuation.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["methenamine-1"],
			sources["methenamine-2"],
			sources["methenamine-3"],
			sources["rutireview-1"]
		]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "does-drinking-more-water-prevent-recurrent-urinary-tract-infections",
		title: "Does drinking more water prevent recurrent urinary tract infections?",
		bottomLine: "It may help women who have recurrent infections and usually drink little fluid. A randomized trial in that group found fewer infections over a year. This does not establish that everyone should drink more, especially people with a fluid restriction. Extra water does not replace treatment of an active infection.",
		stableCore: [
			"The best-known trial enrolled 140 premenopausal women with low baseline fluid intake. Average infections were 1.7 versus 3.2 over a year.",
			"Broader reviews find different results for the number of infection episodes and the chance of having any recurrence. Much of the strongest evidence still comes from the same trial."
		],
		openQuestions: [
			"Does increasing water help people who already drink enough or who differ from the trial population?",
			"How well do people maintain the change, and what adverse effects occur in fluid-sensitive groups?"
		],
		whatWouldChangeMinds: [
			"Independent trials that measure baseline intake, adherence and confirmed symptomatic infections.",
			"Longer studies separating the number of episodes from the proportion with any recurrence."
		],
		misconceptions: [
			"More water is not necessarily better when someone has a prescribed fluid restriction.",
			"An association between hydration and infections does not prove every hygiene or voiding recommendation prevents infections."
		],
		editorSummary: "The direct evidence concerns low fluid intake, with limited independent replication.",
		population: "Predominantly premenopausal women with recurrent uncomplicated infections and low usual fluid intake.",
		scope: "Compare sustained increased water intake with usual intake for future urinary infections, with baseline intake and outcome type explicit.",
		excludedEvidence: [
			"Exclude treating current urinary infection with water alone.",
			"Do not generalize a low-intake trial to unrestricted drinking targets for heart failure, advanced kidney disease or other fluid-sensitive conditions."
		],
		uncertainty: "One influential open-label trial, industry relationships, limited generalizability and inconsistent recurrence outcomes across reviews.",
		band: "broad",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["utiwater-1"],
			sources["utiwater-2"],
			sources["utiwater-3"],
			sources["rutireview-1"]
		]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "do-antibiotics-help-nonpregnant-adults-with-asymptomatic-bacteriuria",
		title: "Do antibiotics help nonpregnant adults with bacteria in urine but no symptoms?",
		bottomLine: "Usually not. For most nonpregnant adults without urinary symptoms, treating a positive urine culture has not improved important health outcomes and can cause harm. Pregnancy and certain invasive urinary procedures have different recommendations. New urinary symptoms, fever or systemic illness require assessment rather than applying this rule automatically.",
		stableCore: [
			"Trials distinguish removing bacteria from urine from preventing illness. Better culture results have not translated into clear clinical benefit in the usual nonpregnant groups studied.",
			"IDSA guidance makes specific exceptions and addresses special populations separately. A positive test alone does not establish a symptomatic urinary infection."
		],
		openQuestions: [
			"What is the best approach in less-studied high-risk groups, including some early transplant or severe immune-suppression settings?",
			"Which diagnostic strategies reduce unnecessary treatment while reliably identifying true infection?"
		],
		whatWouldChangeMinds: [
			"Trials showing improved symptomatic infection, hospitalization or survival in a clearly defined untreated-risk group.",
			"Better harm reporting, including adverse drug effects and antibiotic resistance."
		],
		misconceptions: [
			"A positive urine culture and a symptomatic infection are different findings.",
			"This evidence does not apply to pregnancy or automatically cover invasive urinary procedures."
		],
		editorSummary: "Clinical outcomes support avoiding routine treatment in the usual nonpregnant asymptomatic groups, with important exceptions.",
		population: "Nonpregnant adults without urinary infection symptoms, mainly those without known major urinary tract abnormalities.",
		scope: "Compare antibiotics with no treatment for asymptomatic bacteriuria using illness, function and harms rather than culture clearance alone.",
		excludedEvidence: [
			"Exclude symptomatic infection, sepsis and pregnancy from the general conclusion.",
			"Keep procedure-related prevention and inadequately studied transplant or neutropenia groups separate."
		],
		uncertainty: "Older trials, limited data in special high-risk populations and incomplete reporting of some antibiotic harms.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["asymptomatic-1"], sources["asymptomatic-2"], sources["asymptomatic-3"]]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "does-vaginal-estrogen-prevent-recurrent-urinary-infections-after-menopause",
		title: "Does vaginal estrogen prevent recurrent urinary infections after menopause?",
		bottomLine: "Yes, it can reduce recurrences in postmenopausal women. The evidence concerns local vaginal estrogen; oral estrogen has not shown the same preventive benefit. Irritation and other adverse effects can occur, and personal medical history affects whether treatment is suitable. It is a prevention option, rather than treatment for a current infection.",
		stableCore: [
			"A randomized-trial synthesis finds fewer recurrent infections with vaginal estrogen but no clear benefit from oral estrogen.",
			"Both an older placebo-controlled trial and a small more recent trial support benefit. Formulations, follow-up and dropout rates differ."
		],
		openQuestions: [
			"Which local formulations best balance benefit, tolerability and long-term adherence?",
			"How do results compare with other prevention options in different risk groups?"
		],
		whatWouldChangeMinds: [
			"Larger modern comparative trials reporting confirmed infections and treatment discontinuation.",
			"Better long-term data in populations with relevant contraindications or complex medical histories."
		],
		misconceptions: [
			"Evidence for local vaginal treatment does not establish that systemic hormone therapy prevents infections.",
			"A pooled reduction in recurrence does not guarantee complete prevention for an individual."
		],
		editorSummary: "Local and systemic estrogen have different evidence for preventing recurrent urinary infections.",
		population: "Postmenopausal women with recurrent urinary tract infections considered eligible for vaginal estrogen.",
		scope: "Assess local vaginal estrogen versus placebo for recurrence prevention, with oral estrogen analyzed separately.",
		excludedEvidence: [
			"Exclude hormone treatment of an active infection and extrapolation to systemic therapy.",
			"Do not infer safety for every personal cancer, bleeding or other medical history from small prevention trials."
		],
		uncertainty: "Different products, small contemporary trials, attrition and limited long-term comparative safety data.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["estrogen-1"],
			sources["estrogen-2"],
			sources["estrogen-3"],
			sources["rutireview-1"]
		]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "does-bladder-training-help-overactive-bladder",
		title: "Does bladder training help overactive bladder?",
		bottomLine: "It may improve symptoms, but the direct trial evidence is uncertain. Bladder training is commonly offered as a non-drug option, while studies differ in the training, comparison and outcomes. Evidence that it is better than another active treatment is less secure than its routine use might suggest.",
		stableCore: [
			"The Cochrane review includes 15 trials, mostly in women, and rates much of the evidence low or very low certainty.",
			"Trials comparing training alone with added exercises or other therapy answer different questions from a comparison with no treatment. Improvement in both groups does not establish how much training itself caused."
		],
		openQuestions: [
			"Which training approach provides meaningful, lasting symptom relief?",
			"How do adherence, coaching and added therapies affect benefit across different populations?"
		],
		whatWouldChangeMinds: [
			"Larger trials with transparent allocation, consistent outcomes and longer follow-up.",
			"Comparisons that separate training from other behavioral or drug treatments and report burden and adverse effects."
		],
		misconceptions: [
			"Common guideline use does not mean the size of benefit is known precisely.",
			"Bladder training for diagnosed overactive bladder is different from ignoring pain, infection or inability to pass urine."
		],
		editorSummary: "A widely used option has a smaller and less certain direct trial base than readers may expect.",
		population: "Adults with non-neurogenic overactive bladder, predominantly women in the available trials.",
		scope: "Assess bladder training for urgency, frequency and urgency incontinence, separating no-treatment and active-treatment comparisons.",
		excludedEvidence: [
			"Exclude neurologic bladder disease and training as a substitute for assessment of infection or retention.",
			"Keep the effects of added pelvic-floor, stimulation and drug treatments distinct from training alone."
		],
		uncertainty: "Small trials, high risk of bias, varied interventions and sparse long-term or male-specific evidence.",
		band: "unclear",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["training-1"],
			sources["training-2"],
			sources["training-3"],
			sources["oabguideline-1"]
		]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "does-reducing-caffeine-help-overactive-bladder-symptoms",
		title: "Does reducing caffeine help overactive bladder symptoms?",
		bottomLine: "It may reduce urgency and frequent urination for some people. Small studies and reviews suggest a benefit, but the size and durability are uncertain. Cutting caffeine is different from cutting all fluid: excessive fluid restriction can create other problems. New or changing urinary symptoms still need an appropriate assessment.",
		stableCore: [
			"A 2023 review found favorable urgency and frequency results, but the studies were too different for a pooled estimate.",
			"A blinded crossover pilot had only 11 completers. It supports further research, rather than a reliable estimate of benefit for everyone."
		],
		openQuestions: [
			"Who benefits most, and how much caffeine reduction is enough?",
			"Are improvements sustained when overall fluid intake and other treatment stay consistent?"
		],
		whatWouldChangeMinds: [
			"Larger blinded substitution trials with measured caffeine intake and symptom diaries.",
			"Long-term studies separating caffeine reduction, fluid changes and other behavioral interventions."
		],
		misconceptions: [
			"Coffee is not the only source of caffeine, and caffeine effects differ between people.",
			"Advice about caffeine does not establish that people should become dehydrated to reduce urinary frequency."
		],
		editorSummary: "A plausible low-burden change has promising but limited symptom evidence.",
		population: "Adults with lower urinary tract symptoms or overactive bladder, with intervention studies often small and female-predominant.",
		scope: "Assess caffeine reduction or decaffeinated substitution for urinary urgency and frequency, separating changes in total fluid intake.",
		excludedEvidence: [
			"Exclude caffeine effects on alertness, athletic performance and kidney-stone recurrence.",
			"Do not treat observational coffee associations as randomized evidence or generalize to universal fluid restriction."
		],
		uncertainty: "Small samples, heterogeneous caffeine exposure, bundled fluid changes and limited long-term follow-up.",
		band: "broad",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["caffeine-1"], sources["caffeine-2"], sources["caffeine-3"]]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "do-antimuscarinic-medicines-help-overactive-bladder",
		title: "Do antimuscarinic medicines help overactive bladder?",
		bottomLine: "Yes, they provide a modest average improvement in urgency, frequency and leakage. Dry mouth, constipation and difficulty emptying the bladder can limit their usefulness. Long-term cognitive risks also matter, especially in older adults. An observational link with dementia raises concern but does not prove that a medicine caused dementia in an individual.",
		stableCore: [
			"A large Cochrane review finds about one fewer urgency episode and one fewer urination per day on average compared with placebo, with variation between outcomes and trials.",
			"An English observational study links some bladder anticholinergics more strongly than others with later dementia. It cannot remove all differences between people who receive different medicines."
		],
		openQuestions: [
			"How do long-term symptom benefits compare with cognitive and other harms for different patients?",
			"Which drugs and treatment durations have the best balance of benefit and tolerability?"
		],
		whatWouldChangeMinds: [
			"Longer comparative studies measuring cognition, daily function and symptom benefit together.",
			"Better causal evidence accounting for previous treatment, other anticholinergic drugs and early dementia symptoms."
		],
		misconceptions: [
			"Statistical symptom improvement does not mean most patients become symptom-free.",
			"No statistically clear dementia association for one drug does not establish that drug has zero cognitive risk."
		],
		editorSummary: "Modest symptom benefit needs to be weighed against immediate adverse effects and uncertain long-term cognitive harms.",
		population: "Adults with non-neurogenic overactive bladder; cognitive safety evidence particularly concerns older adults.",
		scope: "Compare oral antimuscarinics with placebo for symptoms, keeping randomized efficacy evidence separate from observational dementia associations.",
		excludedEvidence: [
			"Exclude diagnosing drug-caused dementia from an observational association.",
			"Do not transfer a safety estimate from one drug, age group or duration to the entire class."
		],
		uncertainty: "Mostly short efficacy trials, limited long-term benefit data, and confounding in dementia studies.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["anticholinergic-1"], sources["anticholinergic-2"], sources["oabguideline-1"]]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "do-beta-3-agonists-help-overactive-bladder",
		title: "Do beta-3 agonists help overactive bladder?",
		bottomLine: "Yes. Medicines such as mirabegron and vibegron can modestly reduce urgency, frequency and leakage. They tend to cause less dry mouth than antimuscarinic medicines, while other risks and interactions depend on the drug. Their benefit is an average improvement, rather than a guarantee of complete bladder control.",
		stableCore: [
			"The 12-week EMPOWUR trial found about half a fewer daily urinations with vibegron beyond the placebo improvement.",
			"A mirabegron comparison review found similar average efficacy to antimuscarinics and fewer dry-mouth events. A later vibegron synthesis largely reuses existing trials."
		],
		openQuestions: [
			"How do benefits, persistence and adverse effects compare over years rather than weeks?",
			"Which patients gain a meaningful benefit from one drug or combination over another?"
		],
		whatWouldChangeMinds: [
			"Long-term direct comparisons with patient-important outcomes and complete adverse-event reporting.",
			"Independent studies in frail adults and people with relevant cardiovascular conditions or multiple medicines."
		],
		misconceptions: [
			"A lower dry-mouth rate does not mean a medicine has no adverse effects.",
			"A very high statistical probability of some benefit is different from a large benefit or a measured percentage of expert agreement."
		],
		editorSummary: "Average symptom benefit is established, with treatment choice shaped by tolerability and individual risk.",
		population: "Adults with idiopathic overactive bladder; most efficacy evidence comes from selected short-term trial populations.",
		scope: "Assess beta-3 agonist symptom treatment, distinguishing placebo-controlled effects, antimuscarinic comparisons and repeated analyses of the same trials.",
		excludedEvidence: [
			"Exclude universal drug rankings based only on indirect comparisons.",
			"Do not infer equal cardiovascular safety or interactions across mirabegron and vibegron from one short trial."
		],
		uncertainty: "Short follow-up, selected populations, varying comparators and industry relationships in parts of the evidence base.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["beta3-1"],
			sources["beta3-2"],
			sources["beta3-3"],
			sources["oabguideline-1"]
		]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "does-saw-palmetto-improve-urinary-symptoms-from-an-enlarged-prostate",
		title: "Does saw palmetto improve urinary symptoms from an enlarged prostate?",
		bottomLine: "For commonly studied products, good placebo-controlled evidence finds little or no meaningful benefit. Some European guidance offers a weak recommendation for a particular extract, and newer mixed-design reviews are more favorable. Products are not interchangeable. This disagreement does not justify assuming that an over-the-counter saw palmetto supplement works.",
		stableCore: [
			"The 2023 Cochrane review finds little or no symptom benefit from saw palmetto alone, including its low-bias trial analyses.",
			"A newer review includes observational and combination-treatment studies. Those designs and extract differences help explain why its conclusion is more favorable than the placebo-focused review."
		],
		openQuestions: [
			"Do specific standardized extracts provide a meaningful benefit in well-designed independent trials?",
			"How much of the favorable evidence reflects formulation differences, combined treatment or study bias?"
		],
		whatWouldChangeMinds: [
			"Adequately powered blinded trials of clearly specified extracts with clinically important symptom outcomes.",
			"Reproducible comparisons against placebo and established treatments, with transparent funding and adverse-event reporting."
		],
		misconceptions: [
			"Saw palmetto is not one standardized product across studies or shops.",
			"Improvement while taking a supplement does not establish an effect beyond placebo or normal symptom fluctuation."
		],
		editorSummary: "Placebo-focused evidence is largely negative, while extract-specific recommendations remain contested.",
		population: "Men with lower urinary tract symptoms attributed to benign prostatic enlargement, mainly with moderate symptoms.",
		scope: "Assess saw palmetto alone for patient-important symptom improvement, with specific extracts and mixed-design evidence distinguished.",
		excludedEvidence: [
			"Exclude treating every proprietary extract as equivalent.",
			"Do not attribute combination-treatment gains or uncontrolled before-and-after changes to saw palmetto alone."
		],
		uncertainty: "Formulation differences, disagreement between study selections and guidelines, and limited reliable evidence for extract-specific claims.",
		band: "mixed",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["palmetto-1"],
			sources["palmetto-2"],
			sources["palmetto-3"],
			sources.maleLutsGuidance
		]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "do-alpha-blockers-improve-urinary-symptoms-from-an-enlarged-prostate",
		title: "Do alpha-blockers improve urinary symptoms from an enlarged prostate?",
		bottomLine: "Yes. Alpha-blockers can improve bothersome urinary symptoms, often sooner than medicines that shrink the prostate. They do not reliably prevent future urinary retention or prostate surgery. Dizziness, low blood pressure and ejaculation changes can affect the choice of treatment, and planned eye surgery is relevant to prescribing.",
		stableCore: [
			"Randomized evidence supports symptom relief, while head-to-head rankings between drugs are less secure.",
			"In MTOPS, doxazosin reduced a composite progression outcome, largely distinct from preventing retention or invasive treatment. Finasteride and combination treatment affected those harder outcomes differently."
		],
		openQuestions: [
			"Which drug best balances symptom relief, falls risk and sexual adverse effects for a particular patient?",
			"How long do benefits persist, and when does adding another treatment improve important outcomes?"
		],
		whatWouldChangeMinds: [
			"Long-term direct comparisons with retention, procedures, falls and patient-reported function.",
			"Independent replication of drug rankings with clinically meaningful differences rather than ranking scores alone."
		],
		misconceptions: [
			"Relieving urinary symptoms is different from shrinking the prostate or preventing surgery.",
			"A network ranking does not establish a single best drug for every patient."
		],
		editorSummary: "Symptom relief is well supported, with a different evidence base for preventing retention and surgery.",
		population: "Men with bothersome urinary symptoms attributed to benign prostatic enlargement, after assessment for other causes.",
		scope: "Assess alpha-blocker symptom treatment separately from prostate size and long-term retention or surgery outcomes.",
		excludedEvidence: [
			"Exclude alpha-blocker use for ureteral stone passage from the prostate efficacy conclusion.",
			"Do not convert a corrected network figure or indirect ranking into a universal prescribing recommendation."
		],
		uncertainty: "Drug-specific adverse effects, indirect comparisons and limited head-to-head long-term evidence.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["bphalpha-1"], sources["finasteride-2"], sources.maleLutsGuidance]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "do-finasteride-and-dutasteride-reduce-enlarged-prostate-progression",
		title: "Do finasteride and dutasteride reduce enlarged-prostate progression?",
		bottomLine: "Yes, in appropriately selected men, especially those with an enlarged prostate. These medicines can reduce the long-term chance of urinary retention or surgery, with benefits developing over months. Sexual adverse effects and other safety concerns matter. European regulators also warn about suicidal thoughts with finasteride tablets; the frequency is unknown.",
		stableCore: [
			"Long-term finasteride trials support fewer retention and invasive-treatment events, rather than just better symptom scores.",
			"Dutasteride evidence and European guidance support a similar role in enlarged prostates. Short-term symptom relief and long-term progression prevention are different outcomes."
		],
		openQuestions: [
			"Which patients have enough progression risk to gain a worthwhile absolute benefit?",
			"How do sexual, mood and other adverse effects compare across drugs, durations and combinations?"
		],
		whatWouldChangeMinds: [
			"Long-term comparative studies reporting absolute progression benefits alongside patient-important harms.",
			"Better evidence on mood-related risks, without treating spontaneous-report counts as incidence estimates."
		],
		misconceptions: [
			"A slowly developing preventive benefit is different from immediate relief of urinary obstruction.",
			"Safety findings in hair-loss treatment, different doses or different formulations cannot be transferred without qualification."
		],
		editorSummary: "Long-term benefit is clearest in enlarged prostates, with sexual and mood-related safety considerations.",
		population: "Men with benign prostatic enlargement and an elevated risk of progression; benefits are less applicable to small prostates.",
		scope: "Assess 5-alpha-reductase inhibitors for progression, retention and surgery, distinguishing symptom relief, prostate size and regulatory safety observations.",
		excludedEvidence: [
			"Exclude using hair-loss populations to estimate prostate-treatment efficacy.",
			"Do not imply a proven direct causal link between dutasteride and suicidal thoughts when the regulator describes a precautionary warning."
		],
		uncertainty: "Variation in baseline prostate size and risk, older pivotal trials, and incomplete estimates of uncommon or persistent adverse effects.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["finasteride-1"],
			sources["finasteride-2"],
			sources["finasteride-4"],
			sources.maleLutsGuidance,
			sources.emaSafety
		]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "does-reducing-salt-lower-blood-pressure-in-chronic-kidney-disease",
		title: "Does reducing salt lower blood pressure in chronic kidney disease?",
		bottomLine: "Yes. Trials show lower blood pressure when people with chronic kidney disease reduce dietary salt. Urine protein can also fall, but these short-term changes do not establish how much treatment prevents kidney failure or death. Advice should reflect the person's condition, including low blood pressure, salt-wasting disease and other dietary needs.",
		stableCore: [
			"The Cochrane review finds a clear short-term blood-pressure reduction, while its studies are too short to establish major long-term clinical outcomes.",
			"A later three-month trial supports a blood-pressure benefit. Short-term kidney filtration changes are not proof that long-term kidney failure has been prevented."
		],
		openQuestions: [
			"How much of the benefit persists for years, and does it reduce kidney failure or cardiovascular events?",
			"Which approaches maintain a suitable sodium intake without symptomatic low blood pressure or poor nutrition?"
		],
		whatWouldChangeMinds: [
			"Longer randomized studies with measured sodium intake and clinical kidney and cardiovascular outcomes.",
			"Better reporting of hypotension, adherence and effects across CKD stages and treatment regimens."
		],
		misconceptions: [
			"Sodium and table salt are different quantities; their weights are not interchangeable.",
			"Potassium-containing salt substitutes are not automatically suitable for kidney disease."
		],
		editorSummary: "Blood-pressure benefit is clearer than evidence for preventing long-term kidney failure.",
		population: "Adults with chronic kidney disease, with blood-pressure evidence across stages and individualized guidance for non-dialysis care.",
		scope: "Compare lower with higher dietary sodium for blood pressure in CKD, distinguishing proteinuria and filtration markers from long-term kidney outcomes.",
		excludedEvidence: [
			"Exclude treating short-term eGFR changes as proven prevention of kidney failure.",
			"Do not transfer routine restriction to sodium-wasting disease or assume potassium-containing substitutes are suitable for every person with CKD."
		],
		uncertainty: "Short trials, adherence difficulties, stage-specific differences and limited evidence for hard long-term outcomes.",
		band: "broad",
		certainty: "high",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["salt-1"],
			sources["salt-2"],
			sources["salt-3"],
			sources.kdigoGuidance
		]
	}, novemberKidneyUrinaryResearchCheckedAt),
	reviewedEntry({
		topicSlug: "kidney-and-urinary-health",
		slug: "does-exercise-improve-fitness-in-nondialysis-chronic-kidney-disease",
		title: "Does exercise improve fitness in non-dialysis chronic kidney disease?",
		bottomLine: "Yes. Suitable exercise can improve walking capacity and aerobic fitness in adults with chronic kidney disease who are not receiving dialysis. Evidence for preventing kidney failure or extending life is much less certain. The activity needs to fit cardiovascular health, physical ability and falls risk; a study program is not a universal exercise prescription.",
		stableCore: [
			"Randomized-trial reviews support improvements in exercise capacity compared with usual care, although programs and participants vary.",
			"Home-based studies suggest practical benefits, but incomplete adverse-event reporting does not establish safety for every patient. Review populations and underlying trials overlap."
		],
		openQuestions: [
			"Which accessible programs maintain fitness gains over the long term?",
			"Do sustained improvements translate into fewer hospitalizations, kidney failure events or deaths?"
		],
		whatWouldChangeMinds: [
			"Larger long-term randomized studies with functional outcomes, adherence and complete safety reporting.",
			"Direct comparisons of feasible programs across frailty, cardiovascular disease and CKD severity."
		],
		misconceptions: [
			"Better walking or exercise-test performance does not mean damaged kidneys have been repaired.",
			"No adverse events reported in a small study is different from proof that all exercise is safe."
		],
		editorSummary: "Functional gains are better established than effects on kidney progression or survival.",
		population: "Adults with non-dialysis CKD, with separate contextual evidence from home-based programs covering broader CKD stages.",
		scope: "Assess exercise training for physical capacity in non-dialysis CKD, keeping dialysis populations and kidney-progression outcomes separate.",
		excludedEvidence: [
			"Exclude presenting exercise as a cure for CKD or as proven prevention of kidney failure.",
			"Keep mixed-stage home-program evidence distinct from non-dialysis randomized trials and avoid universal intensity targets."
		],
		uncertainty: "Small heterogeneous trials, overlapping evidence, sparse hard outcomes and incomplete adverse-event reporting.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["exercise-1"],
			sources["exercise-2"],
			sources["exercise-3"],
			sources.kdigoGuidance
		]
	}, novemberKidneyUrinaryResearchCheckedAt)
];
