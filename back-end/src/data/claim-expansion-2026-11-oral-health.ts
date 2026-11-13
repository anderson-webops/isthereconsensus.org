import type { SeedClaim } from "./claims.js";
import { reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberOralHealthResearchCheckedAt = "2026-11-13T17:36:54.749Z";

const sources: Record<string, SeedClaim["sources"][number]> = {
	"powered-1": {
		title: "Powered versus manual toothbrushing for oral health",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2014,
		url: "https://doi.org/10.1002/14651858.cd002281.pub3",
		doi: "10.1002/14651858.cd002281.pub3",
		note: "2014 Cochrane review includes 56 eligible trials and finds modest average improvements in plaque and gingivitis with powered brushes. Study differences are substantial and clinical importance remains uncertain. Follow-up described as long term can mean more than three months, rather than years. Some authors disclose Braun-related research or consulting relationships.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd002281.pub3",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd002281.pub3&rows=100"
		],
		order: 1
	},
	"powered-2": {
		title: "The efficacy of powered toothbrushes: A systematic review and network meta‐analysis",
		publisher: "International Journal of Dental Hygiene",
		year: 2022,
		url: "https://doi.org/10.1111/idh.12563",
		doi: "10.1111/idh.12563",
		note: "Network review examines plaque removal after a single brushing action in healthy adults. Its small differences between powered technologies do not establish prevention of cavities, periodontal disease or tooth loss over years.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1111/idh.12563",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fidh.12563&rows=100"
		],
		order: 1
	},
	"powered-3": {
		title: "Systematic review and meta-analysis of randomized controlled studies comparing oscillating-rotating and other powered toothbrushes",
		publisher: "The Journal of the American Dental Association",
		year: 2020,
		url: "https://doi.org/10.1016/j.adaj.2019.12.012",
		doi: "10.1016/j.adaj.2019.12.012",
		note: "Review compares oscillating-rotating with other powered technologies, rather than all powered brushes with manual brushing. Some plaque and bleeding measures favor one design, while not every gingival index differs. These overlapping technology comparisons do not identify a universally best brush.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1016/j.adaj.2019.12.012",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.adaj.2019.12.012&rows=100"
		],
		order: 1
	},
	"brushGuidance": {
		title: "Toothbrushes",
		publisher: "American Dental Association",
		year: 2026,
		url: "https://www.ada.org/resources/ada-library/oral-health-topics/toothbrushes",
		note: "ADA informational topic page, updated August 2026, describes both manual and powered toothbrushes as effective options and discusses individual needs. It supplies professional background rather than a formal practice standard or independent treatment trial.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://www.ada.org/resources/ada-library/oral-health-topics/toothbrushes"
		],
		order: 1
	},
	"interdental-1": {
		title: "Home use of interdental cleaning devices, in addition to toothbrushing, for preventing and controlling periodontal diseases and dental caries",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2019,
		url: "https://doi.org/10.1002/14651858.cd012018.pub2",
		doi: "10.1002/14651858.cd012018.pub2",
		note: "2019 Cochrane review includes 35 trials and 3,929 adults, mostly with short follow-up and little initial gum inflammation. Floss and interdental brushes may improve some gingivitis outcomes; plaque and bleeding results vary. Certainty is low or very low, and no trial measured interproximal caries. Several authors disclose editorial roles or participation in included trials.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd012018.pub2",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd012018.pub2&rows=100"
		],
		order: 1
	},
	"floss-1": {
		title: "Efficacy of flossing and mouth rinsing regimens on plaque and gingivitis: a randomized clinical trial",
		publisher: "BMC Oral Health",
		year: 2024,
		url: "https://doi.org/10.1186/s12903-024-03924-4",
		doi: "10.1186/s12903-024-03924-4",
		note: "Five-group trial follows 270 participants for 12 weeks after professional cleaning. Floss-only results vary by measure and follow-up, while some combined rinse regimens do better. Combined-care effects cannot be assigned to floss alone. The trial was funded by JJC and involved JJC and Salus Research investigators.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1186/s12903-024-03924-4",
			"https://api.crossref.org/works?filter=updates%3A10.1186%2Fs12903-024-03924-4&rows=100"
		],
		order: 1
	},
	"flossGuidance": {
		title: "Floss and Interdental Cleaners",
		publisher: "American Dental Association",
		url: "https://www.ada.org/resources/ada-library/oral-health-topics/floss",
		note: "ADA background page explains interdental cleaning options and acknowledges low or very low certainty in the cited Cochrane evidence. Device fit and dental condition matter. This is U.S. professional information, not independent proof of long-term cavity or tooth-loss prevention.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://www.ada.org/resources/ada-library/oral-health-topics/floss"
		],
		order: 1
	},
	"interdental-3": {
		title: "The efficacy of interdental brushes on plaque and parameters of periodontal inflammation: a systematic review",
		publisher: "International Journal of Dental Hygiene",
		year: 2008,
		url: "https://doi.org/10.1111/j.1601-5037.2008.00330.x",
		doi: "10.1111/j.1601-5037.2008.00330.x",
		note: "Older review of nine eligible publications reports favorable plaque outcomes with interdental brushes. The studies overlap later syntheses and concern selected short-term measures rather than demonstrated long-term tooth retention.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1111/j.1601-5037.2008.00330.x",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fj.1601-5037.2008.00330.x&rows=100"
		],
		order: 1
	},
	"irrigation-1": {
		title: "Oral Irrigation Devices: A Scoping Review",
		publisher: "Clinical and Experimental Dental Research",
		year: 2024,
		url: "https://doi.org/10.1002/cre2.912",
		doi: "10.1002/cre2.912",
		note: "Scoping review maps 275 heterogeneous sources, predominantly involving adults in North America. Inflammation outcomes are more favorable than plaque findings. Long-term clinical events, costs and patient experience remain less well studied; the source count is not a count of independent randomized trials.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/cre2.912",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2Fcre2.912&rows=100"
		],
		order: 1
	},
	"irrigation-2": {
		title: "Comparing the effectiveness of water flosser and dental floss in plaque reduction among adults: A systematic review",
		publisher: "Journal of Indian Society of Periodontology",
		year: 2023,
		url: "https://doi.org/10.4103/jisp.jisp_597_22",
		doi: "10.4103/jisp.jisp_597_22",
		note: "Review of seven selected randomized studies reports favorable plaque findings for water flossers in most included comparisons. That selected outcome and study set differ from the broader Cochrane evidence and do not establish superior long-term periodontal health.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.4103/jisp.jisp_597_22",
			"https://api.crossref.org/works?filter=updates%3A10.4103%2Fjisp.jisp_597_22&rows=100"
		],
		order: 1
	},
	"floss-2": {
		title: "The effectiveness of water jet flossing and interdental flossing for oral hygiene in orthodontic patients with fixed appliances: a randomized clinical trial",
		publisher: "BMC Oral Health",
		year: 2024,
		url: "https://doi.org/10.1186/s12903-024-04166-0",
		doi: "10.1186/s12903-024-04166-0",
		note: "Two-week randomized comparison in 30 people with fixed orthodontic appliances finds no clear between-group advantage of water jet or interdental floss. Improvement in both groups does not establish equivalence, long-term benefit or applicability to every dental population.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1186/s12903-024-04166-0",
			"https://api.crossref.org/works?filter=updates%3A10.1186%2Fs12903-024-04166-0&rows=100"
		],
		order: 1
	},
	"chlorhexidine-1": {
		title: "Chlorhexidine mouthrinse as an adjunctive treatment for gingival health",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2017,
		url: "https://doi.org/10.1002/14651858.cd008676.pub2",
		doi: "10.1002/14651858.cd008676.pub2",
		note: "Cochrane review of 51 studies finds substantial plaque reduction but a small average gingivitis change in mildly affected participants, judged clinically unimportant. Staining, taste changes and mucosal irritation are relevant harms. Evidence is insufficient to settle moderate or severe inflammation or an optimal regimen. Editorial and GSK-related relationships are disclosed.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd008676.pub2",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd008676.pub2&rows=100"
		],
		order: 1
	},
	"oil-1": {
		title: "The effect of oil pulling in comparison with chlorhexidine and other mouthwash interventions in promoting oral health: A systematic review and meta‐analysis",
		publisher: "International Journal of Dental Hygiene",
		year: 2024,
		url: "https://doi.org/10.1111/idh.12725",
		doi: "10.1111/idh.12725",
		note: "Review pools 25 short studies with differing oils and comparators. Some gingival measures favor oil pulling, while plaque comparisons can favor chlorhexidine. Evidence certainty is very low and follow-up is too brief to establish cavity prevention or tooth retention.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1111/idh.12725",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fidh.12725&rows=100"
		],
		order: 1
	},
	"mouthrinseGuidance": {
		title: "Mouthrinse (Mouthwash)",
		publisher: "American Dental Association",
		url: "https://www.ada.org/resources/ada-library/oral-health-topics/mouthrinse-mouthwash",
		note: "ADA informational page distinguishes therapeutic from cosmetic rinses and treats them as adjuncts to cleaning. It describes chlorhexidine-related staining and taste changes and advises against mouthrinse under age six without dental direction because of swallowing risk. Product and prescription rules are U.S.-specific.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://www.ada.org/resources/ada-library/oral-health-topics/mouthrinse-mouthwash"
		],
		order: 1
	},
	"varnish-1": {
		title: "Fluoride varnishes for preventing dental caries in children and adolescents",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2013,
		url: "https://doi.org/10.1002/14651858.cd002279.pub2",
		doi: "10.1002/14651858.cd002279.pub2",
		note: "2013 Cochrane review finds reduced decay increments in children's primary and permanent teeth, with moderate certainty and substantial study differences. Tooth-surface prevented fractions do not measure the percentage of children remaining cavity-free. Adverse-effect reporting is limited; trial-author participation is disclosed.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd002279.pub2",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd002279.pub2&rows=100"
		],
		order: 1
	},
	"varnish-2": {
		title: "Fluoride Varnish and Dental Caries in Preschoolers: A Systematic Review and Meta-Analysis",
		publisher: "Caries Research",
		year: 2019,
		url: "https://doi.org/10.1159/000499639",
		doi: "10.1159/000499639",
		note: "Preschool review includes 20 trials and finds a modest pooled benefit, with only one trial at low risk of bias. Prediction intervals include no effect, so the average benefit is not guaranteed in a new setting. Background fluoride exposure and baseline risk matter.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1159/000499639",
			"https://api.crossref.org/works?filter=updates%3A10.1159%2F000499639&rows=100"
		],
		order: 1
	},
	"varnish-3": {
		title: "Fissure Sealants or Fluoride Varnish? A Randomized Pragmatic Split-Mouth Trial",
		publisher: "Journal of Dental Research",
		year: 2024,
		url: "https://doi.org/10.1177/00220345241248630",
		doi: "10.1177/00220345241248630",
		note: "Norwegian paired-tooth trial compares varnish with sealants in high-risk children over three years. Sealants perform somewhat better on the specified outcome, but the difference is below the authors' clinical-importance threshold. This active comparison does not estimate varnish benefit against no prevention.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1177/00220345241248630",
			"https://api.crossref.org/works?filter=updates%3A10.1177%2F00220345241248630&rows=100"
		],
		order: 1
	},
	"sdf-3": {
		title: "Randomized Clinical Trial on Caries Prevention of Silver Diamine Fluoride",
		publisher: "Journal of Dental Research",
		year: 2026,
		url: "https://doi.org/10.1177/00220345251363837",
		doi: "10.1177/00220345251363837",
		note: "Thirty-month trial follows initially sound surfaces in primary anterior teeth and compares silver diamine fluoride with varnish. This is prevention of new lesions, not arrest of existing cavities, and its population and tooth surfaces limit broader extrapolation.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1177/00220345251363837",
			"https://api.crossref.org/works?filter=updates%3A10.1177%2F00220345251363837&rows=100"
		],
		order: 1
	},
	"varnishGuidance": {
		title: "Prevention of Dental Caries in Children Younger Than 5 Years: Screening and Interventions",
		publisher: "U.S. Preventive Services Task Force",
		year: 2021,
		url: "https://www.uspreventiveservicestaskforce.org/uspstf/index.php/recommendation/prevention-of-dental-caries-in-children-younger-than-age-5-years-screening-and-interventions1",
		note: "2021 U.S. USPSTF recommendation supports clinician-applied fluoride varnish for primary teeth in asymptomatic children younger than five, with moderate certainty of net benefit. Its separate uncertainty about primary-care screening does not mean dental examinations lack value. This is a U.S. task-force recommendation with a defined age and setting.",
		kind: "guideline",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://www.uspreventiveservicestaskforce.org/uspstf/index.php/recommendation/prevention-of-dental-caries-in-children-younger-than-age-5-years-screening-and-interventions1"
		],
		order: 1
	},
	"rinse-1": {
		title: "Fluoride mouthrinses for preventing dental caries in children and adolescents",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2016,
		url: "https://doi.org/10.1002/14651858.cd002284.pub2",
		doi: "10.1002/14651858.cd002284.pub2",
		note: "2016 Cochrane review includes 37 trials involving 15,813 children, all with supervised school use. Moderate-certainty findings concern new permanent-tooth decay; harms are poorly reported. Tooth-surface prevented fractions are different from the percentage of children avoiding every cavity, and unsupervised adult use is a separate question.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd002284.pub2",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd002284.pub2&rows=100"
		],
		order: 1
	},
	"rinse-2": {
		title: "Effectiveness of fluoride mouthrinse in prevention of demineralization during fixed orthodontic treatment: A systematic review and meta-analysis",
		publisher: "Journal of Orthodontic Science",
		year: 2024,
		url: "https://doi.org/10.4103/jos.jos_116_23",
		doi: "10.4103/jos.jos_116_23",
		note: "Review concerns enamel demineralization during fixed orthodontic treatment. Bracket-associated changes differ from general clinical cavity prevention, and this selected setting does not establish an identical benefit in every child or adult.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.4103/jos.jos_116_23",
			"https://api.crossref.org/works?filter=updates%3A10.4103%2Fjos.jos_116_23&rows=100"
		],
		order: 1
	},
	"xylitol-1": {
		title: "Xylitol-containing products for preventing dental caries in children and adults",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2015,
		url: "https://doi.org/10.1002/14651858.cd010743.pub2",
		doi: "10.1002/14651858.cd010743.pub2",
		note: "Cochrane review finds limited low-quality support for particular xylitol-containing fluoride toothpastes in children and insufficient evidence for most other products. Formulations and comparators differ. Favorable results from one product cannot establish a class-wide cavity-prevention effect.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd010743.pub2",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd010743.pub2&rows=100"
		],
		order: 1
	},
	"xylitol-4": {
		title: "Results from the Xylitol for Adult Caries Trial (X-ACT)",
		publisher: "The Journal of the American Dental Association",
		year: 2013,
		url: "https://doi.org/10.14219/jada.archive.2013.0010",
		doi: "10.14219/jada.archive.2013.0010",
		note: "X-ACT randomized 691 adults at elevated caries risk and followed them for 33 months. Xylitol lozenges did not produce a clear clinically useful overall benefit or a dose-response effect. This trial is included in later reviews and is not an additional replication each time it is cited.",
		kind: "context",
		stance: "debate",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.14219/jada.archive.2013.0010",
			"https://api.crossref.org/works?filter=updates%3A10.14219%2Fjada.archive.2013.0010&rows=100"
		],
		order: 1
	},
	"xylitol-5": {
		title: "The caries preventive effect of 1-year use of low-dose xylitol chewing gum. A randomized placebo-controlled clinical trial in high-caries-risk adults",
		publisher: "Clinical Oral Investigations",
		year: 2017,
		url: "https://doi.org/10.1007/s00784-017-2075-5",
		doi: "10.1007/s00784-017-2075-5",
		note: "Smaller gum trial randomized 179 high-risk adults, with 130 reevaluated after two years. It reports less new decay than another polyol gum, a different formulation and comparator from X-ACT. Attrition and Perfetti Van Melle co-funding affect interpretation; its number needed to treat is measured in teeth, not people.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1007/s00784-017-2075-5",
			"https://api.crossref.org/works?filter=updates%3A10.1007%2Fs00784-017-2075-5&rows=100"
		],
		order: 1
	},
	"oil-2": {
		title: "Effectiveness of Oil Pulling for Improving Oral Health: A Meta-Analysis",
		publisher: "Healthcare",
		year: 2022,
		url: "https://doi.org/10.3390/healthcare10101991",
		doi: "10.3390/healthcare10101991",
		note: "Synthesis reports some favorable bacterial-marker changes without consistent clinical plaque or gingival benefits. Changes in bacterial counts do not establish prevention of dental disease, and the findings do not justify replacing established care.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.3390/healthcare10101991",
			"https://api.crossref.org/works?filter=updates%3A10.3390%2Fhealthcare10101991&rows=100"
		],
		order: 1
	},
	"oil-3": {
		title: "The effect of oil pulling with coconut oil to improve dental hygiene and oral health: A systematic review",
		publisher: "Heliyon",
		year: 2020,
		url: "https://doi.org/10.1016/j.heliyon.2020.e04789",
		doi: "10.1016/j.heliyon.2020.e04789",
		note: "Coconut-oil review includes small short studies with substantial methodological limitations. Findings are insufficient to establish a durable clinical benefit or support claims about general health beyond the mouth.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1016/j.heliyon.2020.e04789",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.heliyon.2020.e04789&rows=100"
		],
		order: 1
	},
	"charcoal-1": {
		title: "Effectiveness and abrasiveness of activated charcoal as a whitening agent: A systematic review of in vitro studies",
		publisher: "Annals of Anatomy - Anatomischer Anzeiger",
		year: 2023,
		url: "https://doi.org/10.1016/j.aanat.2022.151998",
		doi: "10.1016/j.aanat.2022.151998",
		note: "This review concerns laboratory studies, not clinical patient trials. Findings about whitening and abrasion raise formulation-specific questions but do not quantify how often people experience enamel damage, sensitivity or useful whitening in practice.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1016/j.aanat.2022.151998",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.aanat.2022.151998&rows=100"
		],
		order: 1
	},
	"charcoal-2": {
		title: "Whitening efficacy of activated charcoal-based products: A single-blind randomized controlled clinical trial",
		publisher: "Journal of Dentistry",
		year: 2024,
		url: "https://doi.org/10.1016/j.jdent.2024.104877",
		doi: "10.1016/j.jdent.2024.104877",
		note: "Short randomized trial assigns 56 participants to four whitening approaches. Charcoal products do not show added color benefit over regular fluoride toothpaste, while bleaching produces more whitening and sensitivity. Small groups and brief follow-up limit conclusions about lasting benefit and harm.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1016/j.jdent.2024.104877",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.jdent.2024.104877&rows=100"
		],
		order: 1
	},
	"whiteningGuidance": {
		title: "Whitening",
		publisher: "American Dental Association",
		url: "https://www.ada.org/resources/ada-library/oral-health-topics/whitening",
		note: "ADA informational page distinguishes external stains, intrinsic discoloration and restorative materials. Natural-tooth whitening does not change fillings or crowns in the same way; sensitivity and gingival irritation can occur. It provides professional background rather than a product-specific efficacy or safety guarantee.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://www.ada.org/resources/ada-library/oral-health-topics/whitening"
		],
		order: 1
	},
	"bleaching-1": {
		title: "Home-based chemically-induced whitening (bleaching) of teeth in adults",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2018,
		url: "https://doi.org/10.1002/14651858.cd006202.pub2",
		doi: "10.1002/14651858.cd006202.pub2",
		note: "2018 Cochrane review of 71 trials supports short-term whitening with home chemical products compared with placebo, mainly at low or very low certainty. Sensitivity and irritation occur. Product differences and limited follow-up prevent a reliable best-regimen or long-term safety ranking.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd006202.pub2",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd006202.pub2&rows=100"
		],
		order: 1
	},
	"bleaching-2": {
		title: "At-home vs In-office Bleaching: An Updated Systematic Review and Meta-analysis",
		publisher: "Operative Dentistry",
		year: 2025,
		url: "https://doi.org/10.2341/24-078-lit",
		doi: "10.2341/24-078-lit",
		note: "Updated home-versus-office review includes 32 studies in its qualitative synthesis. Results differ across measures of color and sensitivity, with low certainty. No clear difference on one measure does not establish equivalence between all products or delivery approaches.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.2341/24-078-lit",
			"https://api.crossref.org/works?filter=updates%3A10.2341%2F24-078-lit&rows=100"
		],
		order: 1
	},
	"whiteningpaste-1": {
		title: "Whitening dentifrice and tooth surface discoloration: a systematic review and meta‐analysis",
		publisher: "International Journal of Dental Hygiene",
		year: 2018,
		url: "https://doi.org/10.1111/idh.12289",
		doi: "10.1111/idh.12289",
		note: "Clinical review of 21 publications and 32 comparisons supports extra removal of naturally occurring surface stains with some whitening toothpastes over at least six weeks. This concerns extrinsic staining rather than deep bleaching, restoration color or guaranteed benefit from every formulation.",
		kind: "meta_analysis",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1111/idh.12289",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fidh.12289&rows=100"
		],
		order: 1
	},
	"whiteningpaste-2": {
		title: "Effect of whitening toothpaste on surface roughness and microhardness of human teeth: a systematic review and meta-analysis",
		publisher: "F1000Research",
		year: 2022,
		url: "https://doi.org/10.12688/f1000research.76180.3",
		doi: "10.12688/f1000research.76180.3",
		note: "Seven laboratory studies examine extracted human tooth surfaces. Roughness and hardness findings are not measured injury or sensitivity rates in patients, and cannot establish the overall clinical safety of a toothpaste category.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.12688/f1000research.76180.3",
			"https://api.crossref.org/works?filter=updates%3A10.12688%2Ff1000research.76180.3&rows=100"
		],
		order: 1
	},
	"whiteningpaste-3": {
		title: "Whitening toothpastes with hydrogen peroxide concentrations vs. at-home bleaching",
		publisher: "Clinical Oral Investigations",
		year: 2024,
		url: "https://doi.org/10.1007/s00784-024-05823-y",
		doi: "10.1007/s00784-024-05823-y",
		note: "Laboratory experiment uses 49 premolars, not 49 patients. Permeability and color measurements do not establish symptoms, clinical injury rates or an appropriate home-bleaching schedule.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1007/s00784-024-05823-y",
			"https://api.crossref.org/works?filter=updates%3A10.1007%2Fs00784-024-05823-y&rows=100"
		],
		order: 1
	},
	"halitosis-1": {
		title: "Interventions for managing halitosis",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2019,
		url: "https://doi.org/10.1002/14651858.cd012213.pub2",
		doi: "10.1002/14651858.cd012213.pub2",
		note: "2019 Cochrane review includes 44 halitosis trials, mainly lasting one to four weeks. The direct tongue-cleaning comparison contains just two trials and 46 participants, with very low certainty. Patient-important outcomes and adverse-effect reporting are sparse.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd012213.pub2",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd012213.pub2&rows=100"
		],
		order: 1
	},
	"tongue-1": {
		title: "Effectiveness of mechanical tongue cleaning on breath odour and tongue coating: a systematic review",
		publisher: "International Journal of Dental Hygiene",
		year: 2010,
		url: "https://doi.org/10.1111/j.1601-5037.2010.00479.x",
		doi: "10.1111/j.1601-5037.2010.00479.x",
		note: "Older review includes five publications with seven experiments, including nonrandomized evidence. Some short-term odor or coating changes are favorable, but evidence is insufficient for lasting treatment of chronic bad breath.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1111/j.1601-5037.2010.00479.x",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Fj.1601-5037.2010.00479.x&rows=100"
		],
		order: 1
	},
	"tongue-2": {
		title: "Toothbrushing Versus Toothbrushing Plus Tongue Cleaning in Reducing Halitosis and Tongue Coating",
		publisher: "Nursing Research",
		year: 2013,
		url: "https://doi.org/10.1097/nnr.0b013e3182a53b3a",
		doi: "10.1097/nnr.0b013e3182a53b3a",
		note: "Review primarily measures odor-related chemical compounds and tongue coating. Short-term marker changes do not establish sustained patient-important benefit or a best technique or frequency. Included studies overlap related reviews.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1097/nnr.0b013e3182a53b3a",
			"https://api.crossref.org/works?filter=updates%3A10.1097%2Fnnr.0b013e3182a53b3a&rows=100"
		],
		order: 1
	},
	"tongue-3": {
		title: "Effects of oral prophylaxis including tongue cleaning on halitosis and gingival inflammation in gingivitis patients: a randomized controlled clinical trial",
		publisher: "Clinical Oral Investigations",
		year: 2019,
		url: "https://doi.org/10.1007/s00784-018-2617-5",
		doi: "10.1007/s00784-018-2617-5",
		note: "One-week trial involves 36 patients with gingivitis, all receiving professional cleaning. Improvement within the tongue-cleaning group does not alone establish superiority over the comparison group. Biomarker changes are different from a demonstrated clinical cure.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1007/s00784-018-2617-5",
			"https://api.crossref.org/works?filter=updates%3A10.1007%2Fs00784-018-2617-5&rows=100"
		],
		order: 1
	},
	"scaling-1": {
		title: "Routine scale and polish for periodontal health in adults",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2018,
		url: "https://doi.org/10.1002/14651858.cd004625.pub5",
		doi: "10.1002/14651858.cd004625.pub5",
		note: "Cochrane review of two U.K. trials finds little or no added gingivitis, pocket-depth or quality-of-life benefit from routine scheduling over two to three years in regular attenders without severe periodontitis. Calculus and perceived cleanliness improve. Review-author participation in included trials is disclosed; active periodontal treatment is a different question.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd004625.pub5",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd004625.pub5&rows=100"
		],
		order: 1
	},
	"scaling-2": {
		title: "Examining the impact of oral hygiene advice and/or scale and polish on periodontal disease: the IQuaD cluster factorial randomised controlled trial",
		publisher: "British Dental Journal",
		year: 2021,
		url: "https://doi.org/10.1038/s41415-021-2662-3",
		doi: "10.1038/s41415-021-2662-3",
		note: "IQuaD randomized 1,877 regular dental attenders and obtained clinical analyses for 1,327. Routine instrumentation did not produce an important bleeding benefit. Preference-based economic results differ from clinical health effects. This is overlapping trial evidence within the Cochrane synthesis.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1038/s41415-021-2662-3",
			"https://api.crossref.org/works?filter=updates%3A10.1038%2Fs41415-021-2662-3&rows=100"
		],
		order: 1
	},
	"scaling-3": {
		title: "Patient perceptions regarding benefits of single visit scale and polish: a randomised controlled trial",
		publisher: "BMC Oral Health",
		year: 2013,
		url: "https://doi.org/10.1186/1472-6831-13-50",
		doi: "10.1186/1472-6831-13-50",
		note: "Trial randomized 369 adults and reports greater perceived cleanliness with more frequent scale-and-polish care. Feeling cleaner differs from preventing periodontal disease. Follow-up loss and overlap with later reviews limit interpretation as independent supporting evidence.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1186/1472-6831-13-50",
			"https://api.crossref.org/works?filter=updates%3A10.1186%2F1472-6831-13-50&rows=100"
		],
		order: 1
	},
	"recallGuidance": {
		title: "Dental check-ups",
		publisher: "NHS",
		year: 2025,
		url: "https://www.nhs.uk/live-well/healthy-teeth-and-gums/dental-check-ups/",
		note: "NHS patient information, reviewed April 2025, describes dentist-assessed risk-based checkups and separate care for symptoms or treatment. Its longest adult intervals concern appropriate dental risk, while children have different limits. This is U.K. care guidance rather than a universal schedule.",
		kind: "context",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://www.nhs.uk/live-well/healthy-teeth-and-gums/dental-check-ups/"
		],
		order: 1
	},
	"diabetes-1": {
		title: "Treatment of periodontitis for glycaemic control in people with diabetes mellitus",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2022,
		url: "https://doi.org/10.1002/14651858.cd004714.pub4",
		doi: "10.1002/14651858.cd004714.pub4",
		note: "2022 Cochrane review of 35 trials finds a modest average HbA1c reduction after periodontal treatment, with moderate certainty at three to four months. Most participants have type 2 diabetes and periodontitis. Longer-term evidence is sparse and adverse effects incompletely reported. A short-term glucose-marker benefit does not establish prevention of diabetic complications. Editorial and trial-related relationships are disclosed.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd004714.pub4",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd004714.pub4&rows=100"
		],
		order: 1
	},
	"diabetes-2": {
		title: "Effectiveness of periodontal treatment to improve glycemic control: an umbrella review",
		publisher: "Acta Diabetologica",
		year: 2022,
		url: "https://doi.org/10.1007/s00592-022-01991-z",
		doi: "10.1007/s00592-022-01991-z",
		note: "Umbrella review reports average short-term glycemic improvement across overlapping periodontal-treatment syntheses. The included reviews are not independent sets of patients, and these data do not establish a cure or a clear added benefit from adjunctive antibiotics or laser treatment.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1007/s00592-022-01991-z",
			"https://api.crossref.org/works?filter=updates%3A10.1007%2Fs00592-022-01991-z&rows=100"
		],
		order: 1
	},
	"diabetes-3": {
		title: "Effect of periodontal treatment in patients with periodontitis and diabetes: systematic review and meta-analysis",
		publisher: "Journal of Applied Oral Science",
		year: 2020,
		url: "https://doi.org/10.1590/1678-7757-2019-0248",
		doi: "10.1590/1678-7757-2019-0248",
		note: "Earlier review of nine randomized trials supports short-term metabolic-marker improvement. The trials overlap later syntheses and do not establish fewer long-term diabetes complications.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1590/1678-7757-2019-0248",
			"https://api.crossref.org/works?filter=updates%3A10.1590%2F1678-7757-2019-0248&rows=100"
		],
		order: 1
	},
	"diabetes-4": {
		title: "The Effect of Nonsurgical Periodontal Therapy on Hemoglobin A 1c Levels in Persons With Type 2 Diabetes and Chronic Periodontitis",
		publisher: "JAMA",
		year: 2013,
		url: "https://doi.org/10.1001/jama.2013.282431",
		doi: "10.1001/jama.2013.282431",
		note: "DPTT randomized 514 people across five centers. Periodontal measures improved, but six-month HbA1c did not clearly improve relative to control; enrollment stopped for futility. This result demonstrates that better gum scores do not guarantee better glucose control in every trial or patient.",
		kind: "context",
		stance: "debate",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1001/jama.2013.282431",
			"https://api.crossref.org/works?filter=updates%3A10.1001%2Fjama.2013.282431&rows=100"
		],
		order: 1
	},
	"wisdom-1": {
		title: "Surgical removal versus retention for the management of asymptomatic disease-free impacted wisdom teeth",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2020,
		url: "https://doi.org/10.1002/14651858.cd003879.pub5",
		doi: "10.1002/14651858.cd003879.pub5",
		note: "2020 Cochrane review finds insufficient reliable evidence to favor routine removal or retention of asymptomatic disease-free impacted wisdom teeth. Only one high-bias randomized trial and one observational cohort inform key comparisons, with missing quality-of-life and sparse harm data. Currently diseased teeth are outside this question.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd003879.pub5",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd003879.pub5&rows=100"
		],
		order: 1
	},
	"wisdom-2": {
		title: "Wisdom teeth removal and anterior alignment stability after orthodontic treatment: a systematic review",
		publisher: "Clinical Oral Investigations",
		year: 2026,
		url: "https://doi.org/10.1007/s00784-026-06872-1",
		doi: "10.1007/s00784-026-06872-1",
		note: "2026 review of four studies finds very-low-certainty evidence and no consistent benefit of wisdom-tooth removal for anterior alignment after orthodontic treatment. Crowding is only one possible outcome and does not settle every clinical reason for extraction.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1007/s00784-026-06872-1",
			"https://api.crossref.org/works?filter=updates%3A10.1007%2Fs00784-026-06872-1&rows=100"
		],
		order: 1
	},
	"wisdom-3": {
		title: "Impact of third molars on mandibular relapse in post-orthodontic patients: A meta-analysis",
		publisher: "Journal of Dental Sciences",
		year: 2018,
		url: "https://doi.org/10.1016/j.jds.2017.10.005",
		doi: "10.1016/j.jds.2017.10.005",
		note: "Older synthesis of three retrospective studies favors extraction in its interpretation, but alignment findings vary and congenital absence is included as a comparison. Congenital absence, extraction and retention are not randomized interchangeable groups, so confounding limits causal conclusions.",
		kind: "meta_analysis",
		stance: "debate",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1016/j.jds.2017.10.005",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.jds.2017.10.005&rows=100"
		],
		order: 1
	},
	"wisdomGuidance": {
		title: "Wisdom tooth removal",
		publisher: "NHS",
		year: 2024,
		url: "https://www.nhs.uk/tests-and-treatments/wisdom-tooth-removal/",
		note: "NHS information, reviewed June 2024, describes assessment and monitoring for problem-free wisdom teeth and possible removal for defined problems. Surgical complications matter to individual decisions. This U.K. care context complements, rather than replaces, the uncertain direct comparative evidence.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://www.nhs.uk/tests-and-treatments/wisdom-tooth-removal/"
		],
		order: 1
	},
	"aligners-1": {
		title: "Treatment outcome with orthodontic aligners and fixed appliances: a systematic review with meta-analyses",
		publisher: "European Journal of Orthodontics",
		year: 2020,
		url: "https://doi.org/10.1093/ejo/cjz094",
		doi: "10.1093/ejo/cjz094",
		note: "Review combines four randomized and seven nonrandomized studies, mainly in adults. Some bite outcomes favor fixed appliances, with no clear treatment-duration difference. Selection, case complexity and device generation limit a universal device ranking.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1093/ejo/cjz094",
			"https://api.crossref.org/works?filter=updates%3A10.1093%2Fejo%2Fcjz094&rows=100"
		],
		order: 1
	},
	"aligners-2": {
		title: "EFFECTIVENESS OF CLEAR ORTHODONTIC ALIGNERS IN CORRECTING MALOCCLUSIONS: A SYSTEMATIC REVIEW AND META-ANALYSIS",
		publisher: "Journal of Evidence-Based Dental Practice",
		year: 2025,
		url: "https://doi.org/10.1016/j.jebdp.2024.102081",
		doi: "10.1016/j.jebdp.2024.102081",
		note: "Randomized-study review reports broadly comparable primary outcomes in mostly simple non-extraction cases, with low-quality evidence. Favorable comfort or gum outcomes concern different endpoints. These findings do not establish equivalence for complex treatment or all device systems.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1016/j.jebdp.2024.102081",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.jebdp.2024.102081&rows=100"
		],
		order: 1
	},
	"aligners-3": {
		title: "Quality and stability of orthodontic treatment outcomes with clear aligners versus fixed appliances: a systematic review and meta-analysis",
		publisher: "European Journal of Orthodontics",
		year: 2025,
		url: "https://doi.org/10.1093/ejo/cjaf091",
		doi: "10.1093/ejo/cjaf091",
		note: "2025 review of 15 trials distinguishes non-extraction and extraction cases and reports limited stability follow-up. Differences in complexity and outcomes prevent assuming equal effectiveness or faster treatment for everyone.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1093/ejo/cjaf091",
			"https://api.crossref.org/works?filter=updates%3A10.1093%2Fejo%2Fcjaf091&rows=100"
		],
		order: 1
	},
	"aligners-4": {
		title: "Clear Aligners in Extraction‐Based Orthodontic Treatment: A Systematic Review and Meta‐Analysis",
		publisher: "Orthodontics & Craniofacial Research",
		year: 2026,
		url: "https://doi.org/10.1111/ocr.70052",
		doi: "10.1111/ocr.70052",
		note: "Extraction-case review includes 20 predominantly retrospective studies and identifies limitations in some achieved movements and bite contacts. Predicted-versus-achieved movement is different from a randomized comparison of overall patient benefit.",
		kind: "meta_analysis",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1111/ocr.70052",
			"https://api.crossref.org/works?filter=updates%3A10.1111%2Focr.70052&rows=100"
		],
		order: 1
	},
	"bracesGuidance": {
		title: "Braces and orthodontics",
		publisher: "NHS",
		year: 2026,
		url: "https://www.nhs.uk/tests-and-treatments/braces/",
		note: "NHS information, reviewed June 2026, describes orthodontic assessment and retention after braces. Individual circumstances guide retainer decisions and follow-up. U.K. service eligibility and payment details are jurisdiction-specific and are separate from comparative device effectiveness.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://www.nhs.uk/tests-and-treatments/braces/"
		],
		order: 1
	},
	"retainers-1": {
		title: "Retention procedures for stabilising tooth position after treatment with orthodontic braces",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2023,
		url: "https://doi.org/10.1002/14651858.cd002283.pub5",
		doi: "10.1002/14651858.cd002283.pub5",
		note: "2023 Cochrane review includes 47 trials, with mostly low or very low certainty and follow-up of a year or less. Fixed and removable retainers have trade-offs, and some alignment differences are clinically small. The review excludes aligner-treatment studies. Trial involvement and manufacturer lecture or materials relationships are disclosed.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd002283.pub5",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd002283.pub5&rows=100"
		],
		order: 1
	},
	"retainers-3": {
		title: "A systematic review of orthodontic retention systems: The verdict",
		publisher: "International Orthodontics",
		year: 2018,
		url: "https://doi.org/10.1016/j.ortho.2018.06.023",
		doi: "10.1016/j.ortho.2018.06.023",
		note: "Older review of 17 articles finds weak heterogeneous evidence. Some short-term outcomes favor fixed retention, but the studies do not establish the best long-term approach or a universal wear schedule.",
		kind: "systematic_review",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1016/j.ortho.2018.06.023",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.ortho.2018.06.023&rows=100"
		],
		order: 1
	},
	"recall-1": {
		title: "Recall intervals for oral health in primary care patients",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2020,
		url: "https://doi.org/10.1002/14651858.cd004346.pub5",
		doi: "10.1002/14651858.cd004346.pub5",
		note: "2020 Cochrane review supports similar measured outcomes for risk-based and six-month recalls in regular adult attenders over four years, mainly from INTERVAL. Evidence in children is uncertain, and adverse events were not adequately assessed. Several authors disclose participation in included trials or editorial roles.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd004346.pub5",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd004346.pub5&rows=100"
		],
		order: 1
	},
	"recall-2": {
		title: "Risk-based, 6-monthly and 24-monthly dental check-ups for adults: the INTERVAL three-arm RCT",
		publisher: "Health Technology Assessment",
		year: 2020,
		url: "https://doi.org/10.3310/hta24600",
		doi: "10.3310/hta24600",
		note: "NIHR-funded INTERVAL enrolled 2,372 adults; only 648 were clinically eligible for its longest fixed-interval stratum. Outcomes were similar within the relevant eligibility comparisons over four years. Patient preferences affect economic results separately from clinical measures. It does not support universal self-selected delay.",
		kind: "context",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.3310/hta24600",
			"https://api.crossref.org/works?filter=updates%3A10.3310%2Fhta24600&rows=100"
		],
		order: 1
	},
	"recall-3": {
		title: "Examining the effectiveness of different dental recall strategies on maintenance of optimum oral health: the INTERVAL dental recalls randomised controlled trial",
		publisher: "British Dental Journal",
		year: 2021,
		url: "https://doi.org/10.1038/s41415-021-2612-0",
		doi: "10.1038/s41415-021-2612-0",
		note: "Another report of the same INTERVAL trial, rather than an independent replication. Dentist-assessed eligibility and prior regular attendance are important limits when interpreting longer recall intervals.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1038/s41415-021-2612-0",
			"https://api.crossref.org/works?filter=updates%3A10.1038%2Fs41415-021-2612-0&rows=100"
		],
		order: 1
	},
	"sdf-1": {
		title: "Topical silver diamine fluoride (SDF) for preventing and managing dental caries in children and adults",
		publisher: "Cochrane Database of Systematic Reviews",
		year: 2024,
		url: "https://doi.org/10.1002/14651858.cd012718.pub2",
		doi: "10.1002/14651858.cd012718.pub2",
		note: "2024 Cochrane review of 29 trials finds low-certainty benefit for arresting primary-tooth decay, with high risk of bias across the evidence. Prevention, arrest and adult root-caries outcomes differ. Staining and adverse effects are poorly reported. Trial/editorial involvement and unrestricted Colgate funding are disclosed.",
		kind: "systematic_review",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1002/14651858.cd012718.pub2",
			"https://api.crossref.org/works?filter=updates%3A10.1002%2F14651858.cd012718.pub2&rows=100"
		],
		order: 1
	},
	"sdf-2": {
		title: "Effect of Silver Diamine Fluoride on Caries Arrest and Prevention",
		publisher: "JAMA Network Open",
		year: 2023,
		url: "https://doi.org/10.1001/jamanetworkopen.2022.55458",
		doi: "10.1001/jamanetworkopen.2022.55458",
		note: "CariedAway enrolled 2,998 children at 47 schools and obtained follow-up for 1,398, with imputation. Two active care bundles both included fluoride varnish. Its chosen noninferiority margin does not establish identical effects or isolate SDF alone. Materials were donated by Colgate and GC America.",
		kind: "context",
		stance: "context",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1001/jamanetworkopen.2022.55458",
			"https://api.crossref.org/works?filter=updates%3A10.1001%2Fjamanetworkopen.2022.55458&rows=100"
		],
		order: 1
	},
	"sdf-4": {
		title: "A randomized clinical trial to arrest dentin caries in young children using silver diamine fluoride",
		publisher: "Journal of Dentistry",
		year: 2020,
		url: "https://doi.org/10.1016/j.jdent.2020.103375",
		doi: "10.1016/j.jdent.2020.103375",
		note: "Trial in 302 high-risk young children reports more arrested lesions with SDF than varnish after a year, with about 87 percent follow-up. The unit is lesions rather than children cured. No clear parental-satisfaction difference does not establish absence of an aesthetic cost from dark staining.",
		kind: "context",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://doi.org/10.1016/j.jdent.2020.103375",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fj.jdent.2020.103375&rows=100"
		],
		order: 1
	},
	"sdfGuidance": {
		title: "Use of Silver Diamine Fluoride for Dental Caries Management in Children and Adolescents, Including Those with Special Health Care Needs",
		publisher: "American Academy of Pediatric Dentistry",
		year: 2017,
		url: "https://www.aapd.org/research/oral-health-policies--recommendations/silver-diamine-fluoride-for-dental-caries-management-in-children-and-adolescents-including-those-with-special-health-care-needs/",
		note: "AAPD's 2017 evidence-based guideline conditionally supports professional SDF use to arrest cavities in primary teeth within wider caries care, based on low-quality evidence. Dark staining is an important limitation. This older U.S. recommendation is considered alongside the newer 2024 Cochrane synthesis; it does not establish success for every lesion.",
		kind: "guideline",
		stance: "supports",
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: "2026-11-13T17:36:54.749Z",
		statusSources: [
			"https://www.aapd.org/research/oral-health-policies--recommendations/silver-diamine-fluoride-for-dental-caries-management-in-children-and-adolescents-including-those-with-special-health-care-needs/"
		],
		order: 1
	}
};

export const novemberOralHealthClaims: SeedClaim[] = [
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "do-electric-toothbrushes-improve-gum-health-more-than-manual-brushing",
		title: "Do electric toothbrushes improve gum health more than manual brushing?",
		bottomLine: "They can offer a modest average advantage for plaque and gum inflammation. Both manual and powered brushes can work well, and how consistently someone cleans matters. Trials do not establish that every electric brush prevents more cavities or tooth loss, or that the most expensive model is best.",
		stableCore: [
			"The Cochrane review finds less plaque and gingivitis with powered brushes, with differences between studies and uncertain clinical importance.",
			"Some newer reviews compare only one brushing session or different powered technologies. Those results answer narrower questions than long-term gum health."
		],
		openQuestions: [
			"How much do small average index improvements reduce later gum disease or tooth loss?",
			"Which features help people sustain effective brushing, especially when hand movement is difficult?"
		],
		whatWouldChangeMinds: [
			"Independent long-term comparisons measuring tooth retention, disease progression and patient-important harms.",
			"Trials that separate brush design, coaching, adherence and differences between user groups."
		],
		misconceptions: [
			"A small average advantage does not make a manual brush ineffective.",
			"A ranking for plaque removal after one brushing is different from a proven long-term health advantage."
		],
		editorSummary: "Average gum and plaque benefits are modest, with stronger evidence for short-term indices than for preventing tooth loss.",
		population: "Children and adults in brushing trials, with some technology comparisons limited to healthy adults and a single brushing session.",
		scope: "Compare powered with manual toothbrushing for plaque and gingival inflammation, distinguishing clinical follow-up from single-session cleaning and device-to-device rankings.",
		excludedEvidence: [
			"Exclude claims that all powered models or price levels have the same effectiveness.",
			"Do not interpret changes in plaque indices as demonstrated reductions in cavities or long-term tooth loss."
		],
		uncertainty: "Heterogeneous trials, limited long-term clinical outcomes, differing brush designs and manufacturer relationships in parts of the evidence base.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["powered-1"],
			sources["powered-2"],
			sources["powered-3"],
			sources.brushGuidance
		]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "does-flossing-reduce-gum-inflammation-when-added-to-brushing",
		title: "Does flossing reduce gum inflammation when added to brushing?",
		bottomLine: "It may provide a small benefit, but the trial evidence is uncertain. Studies suggest less gingivitis when flossing is added to brushing, while plaque and bleeding results are less consistent. This evidence does not establish how much ordinary home flossing prevents cavities or tooth loss. The right interdental cleaner depends partly on the spaces between teeth and the person's needs.",
		stableCore: [
			"The 2019 Cochrane review rates the evidence low or very low certainty. Most studies are short, and many participants start with little gum inflammation.",
			"A newer supervised trial finds different results by outcome and time point. Benefits from adding a mouthrinse cannot be attributed to flossing alone."
		],
		openQuestions: [
			"How much does achievable home flossing reduce long-term disease rather than only short-term gum scores?",
			"Which people benefit most, and how does technique or sustained use change the result?"
		],
		whatWouldChangeMinds: [
			"Longer independent trials measuring cavities, periodontal progression, adherence and adverse effects.",
			"Clear comparisons that keep brushing, flossing and added rinses separate."
		],
		misconceptions: [
			"Uncertain clinical trial evidence is different from proof that cleaning between teeth has no benefit.",
			"Professional cleaning or a combined rinse-and-floss program does not measure the effect of ordinary home flossing alone."
		],
		editorSummary: "Short-term gum benefits are plausible, while larger long-term disease-prevention claims remain less well established.",
		population: "Adults in home-use interdental-cleaning trials, often with low baseline gingival inflammation; a newer trial involved supervised regimens after professional cleaning.",
		scope: "Compare adding home flossing to toothbrushing with brushing alone for gingivitis, separating plaque, bleeding and long-term disease outcomes.",
		excludedEvidence: [
			"Exclude attributing effects of a combined mouthrinse-and-floss intervention to floss alone.",
			"Keep professionally performed flossing, home use and studies in people wearing fixed braces distinct."
		],
		uncertainty: "Short follow-up, difficulty masking participants, variable technique, inconsistent indices and sparse long-term clinical outcomes.",
		band: "broad",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["interdental-1"], sources["floss-1"], sources.flossGuidance]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "do-interdental-brushes-improve-gum-health-more-than-floss",
		title: "Do interdental brushes improve gum health more than floss?",
		bottomLine: "They may reduce gum inflammation more than floss for some people, but confidence is limited. Small brushes need to fit the spaces between teeth; they are not a suitable choice for every tight contact. Most evidence concerns short-term plaque or gum scores, rather than preventing tooth loss over years.",
		stableCore: [
			"The Cochrane review finds a possible advantage for interdental brushes over floss, with low-certainty evidence and inconsistent plaque results.",
			"An earlier review also favors brushes on several indices, but its studies overlap the later review. These are not independent confirmations of long-term disease prevention."
		],
		openQuestions: [
			"Which tooth spacing, gum conditions and levels of hand skill predict the greatest benefit?",
			"Do early improvements translate into fewer periodontal problems or lost teeth?"
		],
		whatWouldChangeMinds: [
			"Larger trials comparing feasible, properly selected devices with consistent outcomes over several years.",
			"Better reporting of comfort, adherence, irritation and outcomes in different periodontal conditions."
		],
		misconceptions: [
			"A device that works well in open spaces does not necessarily suit tightly contacting teeth.",
			"A small change in a gum index is different from proven prevention of tooth loss."
		],
		editorSummary: "Device fit and patient context matter alongside a possible short-term advantage over floss.",
		population: "Adults using interdental devices, with clinical recommendations depending on tooth spacing and periodontal condition.",
		scope: "Compare interdental brushes with string floss for plaque and gingival outcomes, keeping anatomical suitability and long-term clinical events separate.",
		excludedEvidence: [
			"Exclude assuming that one brush size or cleaner suits every interdental space.",
			"Do not count the same underlying trials in older and newer reviews as separate replications."
		],
		uncertainty: "Mostly small short-term trials, low-certainty comparisons, overlapping reviews and limited long-term tooth-retention evidence.",
		band: "broad",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["interdental-1"], sources["interdental-3"], sources.flossGuidance]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "do-water-flossers-improve-gum-health-more-than-string-floss",
		title: "Do water flossers improve gum health more than string floss?",
		bottomLine: "Some studies favor water flossers for gum bleeding, but a consistent long-term advantage over string floss is not established. Results differ by population, device and outcome. Water flossers can be an alternative interdental aid, while evidence for plaque removal is less consistent than some advertising suggests.",
		stableCore: [
			"Reviews find possible short-term inflammation benefits but different results for plaque, bleeding and longer follow-up.",
			"A small two-week trial in people with fixed braces found no clear difference between water and string flossing. That does not establish equivalence for everyone."
		],
		openQuestions: [
			"Which users obtain a meaningful, sustained advantage over other interdental cleaners?",
			"How do adherence, cost, comfort and different gum conditions affect real-world results?"
		],
		whatWouldChangeMinds: [
			"Independent head-to-head trials with adequate follow-up and patient-important periodontal outcomes.",
			"Consistent results across bleeding measures, plaque indices and different patient groups."
		],
		misconceptions: [
			"Less bleeding and less plaque are related but distinct outcomes.",
			"A trial that finds no clear difference does not prove that two devices are interchangeable for every person."
		],
		editorSummary: "Short-term findings can be favorable, with uncertain durability and inconsistent plaque comparisons.",
		population: "Adults using home interdental aids; some comparisons concern orthodontic patients or people with selected levels of gingivitis.",
		scope: "Compare water irrigation with string floss for gum inflammation and related hygiene outcomes, separating orthodontic samples, review scope and follow-up duration.",
		excludedEvidence: [
			"Exclude turning scoping-review source counts into numbers of independent randomized trials.",
			"Do not generalize short-term orthodontic findings or laboratory markers to universal prevention of cavities or periodontal disease."
		],
		uncertainty: "Heterogeneous devices and populations, small trials, overlapping syntheses, inconsistent indices and limited long-term clinical evidence.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["interdental-1"],
			sources["irrigation-1"],
			sources["irrigation-2"],
			sources["floss-2"],
			sources.flossGuidance
		]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "does-chlorhexidine-mouthwash-improve-gum-inflammation",
		title: "Does chlorhexidine mouthwash improve gum inflammation?",
		bottomLine: "It can reduce plaque and gum inflammation when added to normal cleaning, but the average gum-score benefit in mildly affected people is small. Tooth staining, altered taste and irritation can limit its usefulness. It is not a replacement for brushing or treatment of established periodontal disease, and suitability depends on the person's dental condition.",
		stableCore: [
			"The Cochrane review finds a larger effect on plaque than on gum inflammation. It considered the average gingivitis change in mildly affected participants too small to be clinically important.",
			"Evidence is less clear for moderate or severe gum inflammation and for choosing between different rinse regimens. More plaque removal does not by itself establish prevention of tooth loss."
		],
		openQuestions: [
			"Which patients gain a meaningful benefit beyond effective brushing and interdental cleaning?",
			"What balance of symptom improvement, staining and irritation persists with longer use?"
		],
		whatWouldChangeMinds: [
			"Trials measuring patient-important periodontal outcomes and complete adverse effects in clearly defined disease groups.",
			"Reliable comparisons that separate added rinse benefit from professional cleaning and other treatments."
		],
		misconceptions: [
			"A large plaque-score change is different from a large improvement in gum disease.",
			"Mouthwash formulations and their prescription status differ; they are not interchangeable treatments."
		],
		editorSummary: "Plaque reduction is clearer than a large clinical improvement in mild gum inflammation.",
		population: "People in adjunctive mouthrinse trials, with the clearest gingivitis estimates coming from mild baseline inflammation.",
		scope: "Assess chlorhexidine rinse added to mechanical cleaning for gingival outcomes, distinguishing plaque, clinical importance and treatment harms.",
		excludedEvidence: [
			"Exclude replacing indicated periodontal treatment with mouthwash alone.",
			"Do not infer a best concentration, frequency or personal treatment duration from heterogeneous comparisons."
		],
		uncertainty: "Limited clinically important outcome data, uncertain benefit in more severe disease, variable regimens and frequent adverse effects.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["chlorhexidine-1"], sources["oil-1"], sources.mouthrinseGuidance]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "does-fluoride-varnish-help-prevent-tooth-decay-in-children",
		title: "Does fluoride varnish help prevent tooth decay in children?",
		bottomLine: "Yes, it can reduce new decay, although the size of the benefit varies. Reviews support prevention in children's teeth, with more modest and uncertain estimates in some preschool settings. U.S. USPSTF guidance recommends clinician-applied varnish for young children's primary teeth. Varnish, toothpaste, mouthrinse and water fluoridation are different forms of fluoride exposure.",
		stableCore: [
			"An older Cochrane review finds reduced decay increments with moderate-certainty evidence, but substantial differences between trials.",
			"A later preschool review finds a smaller average benefit and uncertainty about the effect in a new setting. Comparisons with sealants or silver diamine fluoride answer different questions from varnish versus no varnish."
		],
		openQuestions: [
			"Which children gain the largest additional benefit when fluoride toothpaste and other prevention are already available?",
			"How do baseline risk, tooth type and access to dental care affect sustained benefit?"
		],
		whatWouldChangeMinds: [
			"Independent contemporary trials with clear baseline fluoride exposure and clinically important decay outcomes.",
			"Better adverse-effect, acceptability and cost data across different child populations."
		],
		misconceptions: [
			"A reduction in the number of newly affected tooth surfaces is not the percentage of children guaranteed to stay cavity-free.",
			"Evidence about one fluoride product does not establish the same exposure or effect for every other product."
		],
		editorSummary: "Prevention is supported, with varying absolute benefit and less precise estimates for some preschool populations.",
		population: "Children and adolescents in varnish trials; the cited U.S. primary-care recommendation specifically concerns children younger than five without existing caries symptoms.",
		scope: "Assess professionally applied fluoride varnish for preventing new decay, separating ages, tooth surfaces, background exposure and active comparators.",
		excludedEvidence: [
			"Exclude treating prevention of new lesions as proof that existing cavities have been arrested or restored.",
			"Keep varnish, community water, supplements and rinses distinct, and avoid universal benefit percentages or self-application instructions."
		],
		uncertainty: "Older heterogeneous trials, varying baseline risk and fluoride exposure, modest preschool estimates and limited harms reporting.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["varnish-1"],
			sources["varnish-2"],
			sources["varnish-3"],
			sources["sdf-3"],
			sources.varnishGuidance
		]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "do-fluoride-mouthrinses-prevent-cavities-in-children-and-teenagers",
		title: "Do fluoride mouthrinses prevent cavities in children and teenagers?",
		bottomLine: "Yes, supervised use reduced new decay in permanent teeth in school-based trials. How much extra benefit home use adds is less certain. Mouthrinse is different from toothpaste and should not be swallowed. U.S. ADA information advises against use in children younger than six unless a dentist directs it because they may swallow too much.",
		stableCore: [
			"The Cochrane review includes 37 trials, all involving supervised school use, and rates the permanent-tooth prevention evidence moderate certainty.",
			"A smaller orthodontic review concerns demineralization around brackets. That setting and outcome differ from general prevention in every child or adult."
		],
		openQuestions: [
			"How large is the additional benefit with contemporary fluoride toothpaste use and different starting caries risks?",
			"Which supervised or home approaches maintain adherence while avoiding accidental swallowing?"
		],
		whatWouldChangeMinds: [
			"Contemporary comparisons measuring actual decay, adherence and adverse effects under clearly defined supervision.",
			"Better evidence distinguishing older children, adults and orthodontic populations."
		],
		misconceptions: [
			"A prevented fraction for affected tooth surfaces is different from the percentage of children who avoid every cavity.",
			"Evidence for school-aged children does not establish suitability for toddlers or for people unable to spit reliably."
		],
		editorSummary: "The strongest evidence concerns supervised school use and permanent teeth.",
		population: "Children and adolescents, mainly in supervised school programs; separate contextual evidence in fixed orthodontic treatment.",
		scope: "Compare fluoride mouthrinse with placebo or no rinse for new permanent-tooth decay, distinguishing supervision and orthodontic demineralization.",
		excludedEvidence: [
			"Exclude extrapolating supervised school trials to universal adult benefit or use in very young children.",
			"Do not convert study concentrations or frequencies into a personal rinse prescription."
		],
		uncertainty: "Mostly older supervised trials, limited adverse-effect data and uncertainty about the size of benefit in unsupervised contemporary use.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["rinse-1"], sources["rinse-2"], sources.mouthrinseGuidance]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "do-xylitol-products-help-prevent-cavities",
		title: "Do xylitol products help prevent cavities?",
		bottomLine: "The evidence is mixed and depends on the product. A large adult lozenge trial found no clear useful benefit, while a smaller chewing-gum trial reported fewer new lesions. Some toothpaste evidence in children is favorable but low quality. These findings do not establish that every xylitol sweet or supplement prevents cavities, and swallowed products can cause digestive symptoms.",
		stableCore: [
			"The Cochrane review finds limited low-quality evidence for some xylitol-containing fluoride toothpastes and insufficient evidence for most other products.",
			"The two adult trials tested different formulations and comparators. The favorable gum trial was smaller, had substantial loss to follow-up and received confectionery-industry funding."
		],
		openQuestions: [
			"Does a specific product provide a reproducible benefit beyond other sugar-free products and fluoride care?",
			"How do age, starting risk, background fluoride and long-term adherence affect results?"
		],
		whatWouldChangeMinds: [
			"Independent, adequately powered trials comparing well-described products and confirmed clinical decay outcomes.",
			"Updated syntheses that separate formulations, trial overlap and clinical outcomes from bacterial markers."
		],
		misconceptions: [
			"Being sugar-free does not establish a unique cavity-prevention effect from xylitol itself.",
			"A trial's number needed to treat measured in teeth is different from the number of people who benefit."
		],
		editorSummary: "Formulation-specific findings remain inconsistent, with no reliable benefit established across the product category.",
		population: "Children and adults in trials of xylitol toothpastes, lozenges and gum; adult trials enrolled people with elevated caries risk.",
		scope: "Assess clinical cavity prevention with xylitol products, separating formulations, ages, active comparators and fluoride background.",
		excludedEvidence: [
			"Exclude interpreting lower bacterial counts as demonstrated prevention of cavities.",
			"Do not pool product-specific findings into a universal dose recommendation or equate tooth-level benefits with people-level benefits."
		],
		uncertainty: "Product and comparator differences, high bias in much older evidence, attrition, industry funding and limited independent replication.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["xylitol-1"], sources["xylitol-4"], sources["xylitol-5"]]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "does-oil-pulling-improve-dental-health",
		title: "Does oil pulling improve dental health?",
		bottomLine: "There is no reliable evidence that oil pulling prevents cavities or serious gum disease. Small, short studies report inconsistent changes in plaque and gum scores. Their evidence is very uncertain, and lower bacterial counts alone do not show better dental health. It should not replace fluoride toothpaste, ordinary cleaning or indicated dental care.",
		stableCore: [
			"Reviews pool small studies with different oils, comparison groups and brief follow-up. Some gum-score findings are favorable, while other analyses find no clear clinical benefit.",
			"The available studies do not establish prevention of tooth loss or cavities, or show that oil pulling is as effective as established treatments."
		],
		openQuestions: [
			"Does an added benefit persist beyond a few weeks when both groups receive effective normal dental care?",
			"What adverse effects and patient-important outcomes occur with sustained use?"
		],
		whatWouldChangeMinds: [
			"Independent, adequately sized trials with confirmed clinical outcomes, an active comparison and longer follow-up.",
			"A consistent benefit that remains after accounting for study bias, background cleaning and selective reporting."
		],
		misconceptions: [
			"A change in a laboratory bacterial count is different from preventing a cavity.",
			"A favorable result in a small short trial does not establish a safe or effective replacement for routine care."
		],
		editorSummary: "Short-term findings are inconsistent, with very uncertain evidence for meaningful dental benefit.",
		population: "Mostly healthy people and people with mild gum inflammation in small, short oral-care studies.",
		scope: "Assess oil pulling for clinical plaque, gingival and decay outcomes, keeping bacterial markers separate from dental disease.",
		excludedEvidence: [
			"Exclude detoxification claims and claims of benefits outside the mouth.",
			"Avoid extrapolating short-term scores to cavity prevention, tooth retention or a home-treatment protocol."
		],
		uncertainty: "Very low evidence certainty, brief follow-up, small samples and heterogeneous interventions and comparators.",
		band: "unclear",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["oil-1"],
			sources["oil-2"],
			sources["oil-3"],
			sources.brushGuidance
		]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "does-charcoal-toothpaste-whiten-teeth-better-than-regular-toothpaste",
		title: "Does charcoal toothpaste whiten teeth better than regular toothpaste?",
		bottomLine: "A clear extra whitening benefit has not been established. A small clinical trial found charcoal products no better than regular fluoride toothpaste for color change, while professional bleaching produced more whitening. Laboratory studies raise concerns about abrasion, but they cannot tell us how often people develop damage in everyday use. Products also differ in fluoride content.",
		stableCore: [
			"Removing surface stains differs from bleaching the tooth itself. Charcoal marketing often blends these outcomes.",
			"A short trial involving 56 people provides limited direct evidence. Laboratory abrasion findings are useful warnings to study, rather than measured rates of clinical injury."
		],
		openQuestions: [
			"How do particular products compare for visible stain reduction and enamel wear over months or years?",
			"How do formulation, fluoride content and existing tooth sensitivity affect the balance of effects?"
		],
		whatWouldChangeMinds: [
			"Independent longer-term human trials using objective color measurements and complete adverse-effect assessment.",
			"Evidence of useful added whitening without a trade-off in enamel wear or cavity protection."
		],
		misconceptions: [
			"Dark powder and a strong cleaning sensation do not measure whitening effectiveness.",
			"An extracted-tooth abrasion test cannot establish a person's future risk of enamel damage."
		],
		editorSummary: "Direct clinical evidence is small and does not establish superior whitening.",
		population: "Adults in a small short whitening trial; additional laboratory studies of tooth surfaces and formulations.",
		scope: "Compare charcoal products with regular fluoride toothpaste for clinical color change, using laboratory findings only as contextual evidence about abrasion.",
		excludedEvidence: [
			"Exclude treating laboratory tooth wear as a quantified harm rate in patients.",
			"Do not infer cavity protection from whitening claims or assume every charcoal product contains fluoride."
		],
		uncertainty: "Few direct human comparisons, short follow-up, product differences and limited clinical harm data.",
		band: "unclear",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["charcoal-1"], sources["charcoal-2"], sources.whiteningGuidance]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "do-home-tooth-bleaching-products-whiten-teeth",
		title: "Do home tooth-bleaching products whiten teeth?",
		bottomLine: "Yes, peroxide-based home products can lighten natural teeth in the short term. Tooth sensitivity and gum irritation can occur, and results vary by product and starting discoloration. Evidence does not identify one best home regimen or establish that it is better than dentist-delivered bleaching for everyone. Fillings, crowns and veneers do not whiten in the same way.",
		stableCore: [
			"The Cochrane review supports short-term whitening compared with placebo, but rates much of the evidence low or very low certainty.",
			"An updated comparison with office treatment finds different results depending on the color measurement used. That uncertainty prevents a universal best-method ranking."
		],
		openQuestions: [
			"Which effects remain visible in the longer term, and how often do sensitivity and irritation persist?",
			"Which patients and types of discoloration benefit most from each delivery method?"
		],
		whatWouldChangeMinds: [
			"Independent head-to-head trials with standardized visible-color outcomes, longer follow-up and complete adverse-effect reporting.",
			"Reliable evidence separating product effects from baseline discoloration and differences in professional supervision."
		],
		misconceptions: [
			"Whitening natural teeth does not change the color of existing restorations.",
			"A study finding no clear difference between methods does not prove that every product is equivalent or harmless."
		],
		editorSummary: "Short-term whitening is supported; the best method and long-term benefit are less certain.",
		population: "Adults with natural teeth in home-bleaching trials, with varying products, delivery methods and starting tooth color.",
		scope: "Assess short-term whitening and adverse effects of home bleaching, distinguishing placebo comparisons from home-versus-office care.",
		excludedEvidence: [
			"Exclude extrapolating natural-tooth effects to crowns, fillings or veneers.",
			"Do not supply concentrations, application schedules or DIY treatment instructions."
		],
		uncertainty: "Mostly short follow-up, low-certainty evidence, differing color measures and incomplete long-term harm data.",
		band: "broad",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["bleaching-1"], sources["bleaching-2"], sources.whiteningGuidance]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "does-whitening-toothpaste-remove-surface-stains",
		title: "Does whitening toothpaste remove surface stains?",
		bottomLine: "Yes, some whitening toothpastes reduce surface stains more than regular toothpaste over several weeks. That is different from changing deep tooth color or whitening a filling or crown. The effect depends on the formulation, and a whitening label alone does not show superior cavity protection or long-term safety.",
		stableCore: [
			"A review of clinical comparisons supports better removal of natural external stains with some whitening formulations.",
			"Laboratory studies of roughness, hardness or permeability cannot establish how often users develop clinical damage or sensitivity."
		],
		openQuestions: [
			"How visible and lasting is the extra stain removal for different products and starting stain levels?",
			"Which formulations provide a useful balance of stain removal, cavity protection and tolerability with sustained use?"
		],
		whatWouldChangeMinds: [
			"Independent clinical comparisons measuring visible color, patient satisfaction and adverse effects over longer periods.",
			"Evidence connecting laboratory surface changes with meaningful outcomes in actual users."
		],
		misconceptions: [
			"Surface-stain removal and bleaching deep discoloration are different outcomes.",
			"A study using extracted teeth is not a trial in people and cannot measure their symptoms."
		],
		editorSummary: "The clearest evidence concerns external stain removal, rather than deep bleaching.",
		population: "People with naturally occurring surface stains in clinical toothpaste comparisons; laboratory tooth-surface findings provide context only.",
		scope: "Assess whitening toothpaste for extrinsic stain reduction and distinguish clinical outcomes from laboratory surface measurements.",
		excludedEvidence: [
			"Exclude interpreting extracted-tooth findings as patient sensitivity or injury rates.",
			"Keep stain reduction separate from restoration color change and cavity prevention."
		],
		uncertainty: "Formulation differences, limited longer-term clinical safety comparisons and uncertainty about noticeable benefit for each user.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["whiteningpaste-1"],
			sources["whiteningpaste-2"],
			sources["whiteningpaste-3"],
			sources.whiteningGuidance
		]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "does-tongue-cleaning-reduce-bad-breath",
		title: "Does tongue cleaning reduce bad breath?",
		bottomLine: "It may help briefly, but reliable evidence for lasting improvement is limited. Small studies suggest changes in breath-related chemicals and tongue coating, while the Cochrane review rates the direct tongue-cleaning evidence very uncertain. Persistent bad breath can have several causes, so cleaning the tongue does not replace assessment of an ongoing problem.",
		stableCore: [
			"Most trials are short and measure odor scores or chemical markers. They provide little information about lasting patient-reported improvement.",
			"Older reviews and newer small studies overlap or use different comparisons, so they do not establish one best device or routine."
		],
		openQuestions: [
			"Does any improvement remain over months and matter to the person or people around them?",
			"Which causes of bad breath respond, and what harms or discomfort occur with sustained cleaning?"
		],
		whatWouldChangeMinds: [
			"Larger independent trials with appropriate control groups, meaningful breath outcomes and longer follow-up.",
			"Evidence separating tongue-cleaning effects from professional cleaning, mouthrinse and other simultaneous care."
		],
		misconceptions: [
			"Lower concentrations of an odor-related chemical do not establish a lasting cure.",
			"A change within a treatment group does not by itself demonstrate an advantage over the comparison group."
		],
		editorSummary: "Short-term benefit is possible, with very uncertain evidence for durable improvement.",
		population: "People with oral-origin bad breath in small trials; systemic causes and advanced periodontal disease are outside much of this evidence.",
		scope: "Assess tongue cleaning for bad-breath outcomes, distinguishing patient experience, odor scores and chemical markers.",
		excludedEvidence: [
			"Exclude diagnosing the cause of persistent breath symptoms from response to cleaning.",
			"Do not infer an optimal technique or frequency from heterogeneous short studies."
		],
		uncertainty: "Small samples, brief follow-up, overlapping reviews and sparse patient-reported outcomes or adverse-effect data.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["halitosis-1"],
			sources["tongue-1"],
			sources["tongue-2"],
			sources["tongue-3"]
		]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "do-routine-scale-and-polish-cleanings-improve-gum-health-in-regular-dental-attenders",
		title: "Do routine scale-and-polish cleanings improve gum health in regular dental attenders?",
		bottomLine: "For adults who already attend dental care and do not have severe gum disease, scheduled scale-and-polish visits show little or no added improvement in gum inflammation over two to three years. They do reduce hardened deposits and can make teeth feel cleaner. These findings do not apply to treatment of established periodontal disease or remove the need for dental checkups.",
		stableCore: [
			"The Cochrane review finds little or no difference in measured gingivitis, pocket depth or oral-health quality of life between routine cleaning schedules and no scheduled cleaning.",
			"Trial participants and care settings matter. Regular U.K. dental attenders without severe disease differ from people with untreated periodontitis or limited access to care."
		],
		openQuestions: [
			"Which higher-risk groups benefit from a particular maintenance schedule after periodontal treatment?",
			"How should clinical effects, patient preferences and costs be weighed across different care settings?"
		],
		whatWouldChangeMinds: [
			"Longer trials with clearly defined disease risk, tooth retention and complete harms assessment.",
			"Evidence that a specific schedule produces important additional health benefits beyond assessment and individually indicated treatment."
		],
		misconceptions: [
			"Feeling cleaner and having less calculus are valuable to some people but differ from preventing periodontal disease.",
			"No scheduled scale-and-polish comparison is different from receiving no dental assessment or ignoring disease."
		],
		editorSummary: "Routine scheduling adds little measured gum-health benefit in the studied low-risk regular attenders.",
		population: "Regular adult dental attenders without severe periodontitis, mainly in U.K. primary dental care.",
		scope: "Compare routine scale-and-polish schedules with no scheduled instrumentation for gum health, deposits and patient experience.",
		excludedEvidence: [
			"Exclude extrapolating these findings to treatment of active periodontal disease or individualized maintenance after treatment.",
			"Keep routine cleaning intervals separate from dental examination, symptom assessment and needed treatment."
		],
		uncertainty: "Only a few overlapping trials, limited follow-up beyond three years and uncertain applicability to higher-risk or underserved populations.",
		band: "broad",
		certainty: "high",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["scaling-1"],
			sources["scaling-2"],
			sources["scaling-3"],
			sources.recallGuidance
		]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "does-treating-gum-disease-improve-blood-sugar-in-people-with-type-2-diabetes",
		title: "Does treating gum disease improve blood sugar in people with type 2 diabetes?",
		bottomLine: "On average, treatment of periodontitis can modestly improve blood sugar in people with type 2 diabetes, especially over the first few months. Individual trials have different results, and longer-term evidence is thinner. Better gum health remains a reason to treat periodontitis; the treatment complements diabetes care and has not been shown here to cure diabetes or prevent its long-term complications.",
		stableCore: [
			"The 2022 Cochrane review reports an average HbA1c improvement of about 0.43 percentage points at three to four months, with moderate-certainty evidence.",
			"A large multicenter trial improved gum measures without a clear six-month HbA1c benefit. Pooled averages therefore do not predict every patient's response, and review overlap does not create independent replications."
		],
		openQuestions: [
			"Which patients gain a sustained blood-sugar benefit beyond improvement in their gums?",
			"Do any benefits persist over years or translate into fewer diabetes complications?"
		],
		whatWouldChangeMinds: [
			"Independent longer-term trials with stable background diabetes care, patient-important outcomes and complete harms reporting.",
			"Reliable evidence explaining differences by starting HbA1c, periodontal severity and treatment intensity."
		],
		misconceptions: [
			"A 0.43 percentage-point HbA1c reduction is different from a 43 percent reduction.",
			"Improved gum scores do not automatically establish improved glucose control or fewer diabetic complications."
		],
		editorSummary: "A modest average short-term glucose benefit is supported, with variable trial results and less long-term evidence.",
		population: "People with diabetes and diagnosed periodontitis, overwhelmingly type 2 diabetes in the available randomized trials.",
		scope: "Assess periodontal treatment added to ongoing diabetes care for HbA1c, separating short-term averages, individual trials and long-term clinical outcomes.",
		excludedEvidence: [
			"Exclude extrapolating these results to people without periodontitis or treating periodontal care as a substitute for diabetes treatment.",
			"Do not infer prevention of complications from a short-term HbA1c change or count overlapping reviews as separate trials."
		],
		uncertainty: "Variable trial effects, treatment differences, sparse long-term outcomes and incomplete adverse-effect reporting.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["diabetes-1"],
			sources["diabetes-2"],
			sources["diabetes-3"],
			sources["diabetes-4"]
		]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "should-disease-free-impacted-wisdom-teeth-be-removed-to-prevent-future-problems",
		title: "Should disease-free impacted wisdom teeth be removed to prevent future problems?",
		bottomLine: "Evidence does not establish one best choice for everyone. Preventive removal has possible benefits and surgical harms, while keeping the teeth may also carry future risks. The available direct comparisons are very uncertain. U.K. NHS information describes monitoring when wisdom teeth are not causing problems; symptoms, disease and individual risk can change the decision.",
		stableCore: [
			"The Cochrane review finds insufficient reliable evidence to choose routine removal over retention of asymptomatic, disease-free impacted teeth.",
			"Evidence that removal prevents later front-tooth crowding is also very weak. Studies comparing people born without wisdom teeth with those who have them cannot isolate the effect of surgery."
		],
		openQuestions: [
			"Which initially disease-free teeth are most likely to cause important future problems?",
			"How do long-term benefits and harms of removal compare with monitoring across ages and risk groups?"
		],
		whatWouldChangeMinds: [
			"Better comparative long-term studies with clear starting disease status, surgical harms and quality-of-life outcomes.",
			"Reliable risk prediction that distinguishes teeth likely to benefit from removal from those suitable for monitoring."
		],
		misconceptions: [
			"An impacted tooth is not automatically diseased, and absence of pain does not establish absence of disease.",
			"Evidence about disease-free teeth does not settle care for infection, decay or damage to an adjacent tooth."
		],
		editorSummary: "The evidence supports individualized decisions, with substantial uncertainty about routine preventive removal.",
		population: "People with asymptomatic, disease-free impacted wisdom teeth; much of the evidence is indirect or at high risk of bias.",
		scope: "Compare preventive removal and retention with monitoring, distinguishing future disease, crowding and surgical outcomes.",
		excludedEvidence: [
			"Exclude applying this question to currently diseased teeth or using congenital absence as an unconfounded substitute for extraction.",
			"Avoid treating retention as absence of follow-up or providing a personal surgical recommendation."
		],
		uncertainty: "Very few reliable comparisons, confounded observational evidence, incomplete harms and missing quality-of-life outcomes.",
		band: "unclear",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["wisdom-1"],
			sources["wisdom-2"],
			sources["wisdom-3"],
			sources.wisdomGuidance
		]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "are-clear-aligners-as-effective-as-fixed-braces",
		title: "Are clear aligners as effective as fixed braces?",
		bottomLine: "They can work well for selected cases, but the evidence does not show equal effectiveness for every orthodontic problem. Many trials concern relatively simple cases that do not require extractions. Complex tooth movements and bite correction can be harder to achieve with aligners. Comfort, cleaning and appearance are separate considerations from the quality and stability of the final result.",
		stableCore: [
			"Reviews differ because they include different treatment complexity, device generations and study designs. Some find similar results in selected simple cases; other measures favor fixed braces.",
			"Most comparative evidence is limited by bias and short follow-up. Findings about comfort or gum scores do not establish equal control of every planned tooth movement."
		],
		openQuestions: [
			"Which specific treatment problems have comparable final bite and long-term stability with each approach?",
			"How much do adherence, clinician experience and changing device systems affect results?"
		],
		whatWouldChangeMinds: [
			"Independent randomized comparisons within clearly matched treatment complexity, with long-term stability and adverse-effect assessment.",
			"Evidence connecting predicted tooth movements with achieved patient-important outcomes across current systems."
		],
		misconceptions: [
			"Similar average scores in selected simple cases do not establish equivalence for complex treatment.",
			"A less visible device does not necessarily produce faster treatment or a better final bite."
		],
		editorSummary: "Both approaches can be useful, with effectiveness depending on treatment complexity and limited comparative evidence.",
		population: "Mainly adults in comparative orthodontic studies, with much randomized evidence limited to simple non-extraction treatment.",
		scope: "Compare clear aligners and fixed braces for achieved alignment, bite and stability, distinguishing simple and extraction cases from comfort or cleaning outcomes.",
		excludedEvidence: [
			"Exclude treating observational selection differences as causal device superiority.",
			"Do not infer suitability for a person's bite or provide unsupervised orthodontic mechanics."
		],
		uncertainty: "Low-quality comparisons, case selection, device changes, adherence differences and limited long-term stability data.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["aligners-1"],
			sources["aligners-2"],
			sources["aligners-3"],
			sources["aligners-4"],
			sources.bracesGuidance
		]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "are-fixed-retainers-better-than-removable-retainers-after-braces",
		title: "Are fixed retainers better than removable retainers after braces?",
		bottomLine: "There is no clearly best option for everyone. Fixed and removable retainers have different trade-offs in keeping teeth aligned, cleaning, breakage and adherence. Some short-term alignment measures favor fixed retainers, but evidence is mostly low or very low certainty and often lasts a year or less. The choice and follow-up depend on the person's teeth and ability to use and maintain the retainer.",
		stableCore: [
			"The Cochrane review finds many small, heterogeneous trials and limited confidence in comparisons between retention approaches.",
			"Differences in short-term alignment can be small, while cleaning and device failures matter too. Evidence after fixed braces does not automatically apply to every aligner-treatment case."
		],
		openQuestions: [
			"Which approach best balances stable alignment, gum health, device failures and comfort over many years?",
			"Which patient and treatment characteristics should guide retainer selection and follow-up?"
		],
		whatWouldChangeMinds: [
			"Independent longer-term trials measuring clinically important relapse, oral health, failures and patient experience together.",
			"Reliable evidence accounting for adherence and the different designs within each retainer category."
		],
		misconceptions: [
			"A fixed retainer still requires care and assessment, while a removable one depends on consistent use.",
			"A small difference in an alignment score does not by itself establish the best overall option."
		],
		editorSummary: "Each approach has trade-offs, and evidence does not establish one universally superior retainer.",
		population: "People completing orthodontic treatment, largely fixed-brace patients in short comparative retention studies.",
		scope: "Compare fixed and removable retention for alignment, oral health, failure and patient experience after braces.",
		excludedEvidence: [
			"Exclude deriving a lifetime wear schedule or an individual retainer choice from short-term trial averages.",
			"Keep different retainer designs and prior treatment types distinct rather than assuming category-wide equivalence."
		],
		uncertainty: "Low or very low certainty, short follow-up, heterogeneous devices and adherence-dependent outcomes.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [sources["retainers-1"], sources["retainers-3"], sources.bracesGuidance]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "do-all-adults-need-a-dental-checkup-every-six-months",
		title: "Do all adults need a dental checkup every six months?",
		bottomLine: "The evidence supports choosing intervals by dental risk rather than giving every adult the same schedule. In regular U.K. dental attenders, risk-based checkups produced similar measured oral-health outcomes to six-month checkups over four years. Longer fixed intervals were tested only in adults a dentist considered suitable. New symptoms and needed treatment require separate attention between routine checks.",
		stableCore: [
			"The Cochrane review and the main INTERVAL trial support similar outcomes for risk-based and six-month schedules in the adults studied.",
			"The longest fixed-interval comparison involved a selected lower-risk subgroup. Reports from the same trial are overlapping evidence, and child recall evidence is much less certain."
		],
		openQuestions: [
			"How well do risk-based schedules work in people with irregular access to care or higher disease risk?",
			"What are the longer-term effects on tooth retention, uncommon missed disease and inequalities in access?"
		],
		whatWouldChangeMinds: [
			"Longer independent trials across different care systems, with high-risk groups and complete adverse-outcome assessment.",
			"Reliable risk tools that identify who benefits from earlier assessment while measuring clinical outcomes and patient preferences separately."
		],
		misconceptions: [
			"A risk-based schedule means a clinician assesses risk; it is not a universal recommendation to delay care.",
			"Routine checkup intervals are separate from appointments for symptoms, active treatment or periodontal maintenance."
		],
		editorSummary: "Risk-based intervals are supported for regular adult attenders; individual eligibility matters.",
		population: "Regular adult dental attenders in U.K. primary care; selected adults were eligible for the longest fixed-interval comparison.",
		scope: "Compare risk-based and fixed routine examination intervals for oral-health outcomes, retaining the trial's clinical eligibility limits.",
		excludedEvidence: [
			"Exclude applying adult trial findings to children or people with new symptoms.",
			"Do not turn selected lower-risk follow-up into a universal self-chosen delay or count multiple reports of INTERVAL as independent trials."
		],
		uncertainty: "Limited independent trial replication, selected participants, care-system differences and sparse rare-harm assessment.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["recall-1"],
			sources["recall-2"],
			sources["recall-3"],
			sources.recallGuidance
		]
	}, novemberOralHealthResearchCheckedAt),
	reviewedEntry({
		topicSlug: "oral-and-dental-health",
		slug: "can-silver-diamine-fluoride-arrest-cavities-in-childrens-baby-teeth",
		title: "Can silver diamine fluoride arrest cavities in children's baby teeth?",
		bottomLine: "It can help stop some existing decay, but treatment success varies and the evidence has important limits. Silver diamine fluoride darkens treated decayed areas, which matters when weighing options. U.S. pediatric dental guidance supports selected use within a wider caries-care plan. Arresting decay is different from restoring a tooth's shape, treating every cavity successfully or preventing all new decay.",
		stableCore: [
			"The 2024 Cochrane review finds low-certainty evidence for arresting decay in primary teeth, with many studies at high risk of bias.",
			"A school trial found an SDF-based care package was not substantially worse than another active package within its chosen margin. Both groups received other prevention, so the comparison does not isolate SDF alone or prove identical effects."
		],
		openQuestions: [
			"Which lesions and children gain the most durable benefit, and how often is further treatment needed?",
			"How do staining, acceptability, pain and longer-term tooth outcomes compare across realistic treatment choices?"
		],
		whatWouldChangeMinds: [
			"Independent trials with clear lesion activity, complete follow-up, patient-important outcomes and transparent adverse-effect reporting.",
			"Reliable comparisons that distinguish prevention from arrest and isolate each treatment's contribution within combined care."
		],
		misconceptions: [
			"A percentage of arrested lesions is different from the percentage of children whose dental problems are all resolved.",
			"A treatment that arrests decay does not necessarily rebuild the tooth or eliminate the need for follow-up."
		],
		editorSummary: "Some primary-tooth decay can be arrested, with low-certainty evidence and an important staining trade-off.",
		population: "Children with carious primary teeth in dental and school-based trials; different evidence concerns prevention on sound teeth and adult root decay.",
		scope: "Assess professional silver diamine fluoride treatment for arrest of existing primary-tooth decay, distinguishing lesions, children, prevention and combined-care comparisons.",
		excludedEvidence: [
			"Exclude using prevention trials on initially sound teeth as direct evidence of cavity arrest.",
			"Keep the professional treatment choice separate from a home-application protocol and preserve dark staining as a material limitation."
		],
		uncertainty: "High study bias, variable lesions and comparators, attrition, incomplete staining and adverse-effect measurement, and limited long-term patient outcomes.",
		band: "broad",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources["sdf-1"],
			sources["sdf-2"],
			sources["sdf-4"],
			sources.sdfGuidance
		]
	}, novemberOralHealthResearchCheckedAt)
];
