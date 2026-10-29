import type { SeedClaim } from "./claims.js";

export function legacyInclusionRules(seed: Pick<SeedClaim, "topicSlug">) {
	switch (seed.topicSlug) {
		case "active-debates": {
			return [
				"Prioritize current systematic reviews, pivotal controlled studies, independently measured operating data, and major assessments that state the evidence cutoff and maturity stage.",
				"Separate proof of mechanism, efficacy under selected conditions, real-world effectiveness, safety, scalability, affordability, governance, and net outcome rather than combining them into one verdict.",
				"Include credible competing interpretations and specify the exact unresolved quantity, subgroup, timescale, system boundary, or decision threshold."
			];
		}
		case "biology-and-evolution":
		case "human-origins-and-paleontology": {
			return [
				"Prioritize converging population-genetic, genomic, phylogenetic, experimental-evolution, paleontological, and field evidence appropriate to the timescale of the claim.",
				"Define the evolutionary mechanism, heritable unit, population, environment, comparison, and timescale before inferring selection, drift, mutation, gene flow, or speciation.",
				"Use major reviews to connect examples across taxa while preserving the difference between an observed process and its general frequency or importance."
			];
		}
		case "consensus-foundations": {
			return [
				"Use major methods statements, statistical guidance, systematic evaluations, and worked evidence examples that define the inferential question and assumptions.",
				"Separate estimate, uncertainty, model fit, causal identification, external validity, practical importance, and decision value rather than collapsing them into one verdict.",
				"Prefer converging demonstrations across disciplines and methods when the claim concerns a general research principle."
			];
		}
		case "media-misinformation": {
			return [
				"Prioritize preregistered experiments, field experiments, platform-scale audits, representative surveys, and meta-analyses with explicit content and audience samples.",
				"Keep exposure, attention, perceived accuracy, belief, sharing intention, actual sharing, reach, and downstream behavior as separate outcomes.",
				"Record platform, interface, language, political context, study period, source classification, and bot or account-detection limits."
			];
		}
		case "bias-incentives": {
			return [
				"Prioritize registry-to-publication audits, protocol comparisons, blinded or matched evaluations, correction records, and systematic reviews of research practice.",
				"Use a defined publication, trial, article, citation, or researcher denominator and distinguish detected cases from underlying prevalence.",
				"Separate system incentives and average risk from judgments about any named study, journal, institution, or researcher's intent."
			];
		}
		case "science-communication": {
			return [
				"Prioritize systematic reviews, preregistered audience experiments, field evaluations, and institutional guidance that specifies audience, goal, message, channel, and context.",
				"Measure calibrated comprehension, discernment, trust, decision quality, behavior, and durability separately from liking, recall, or stated intention.",
				"Preserve the underlying evidence, denominator, timeframe, uncertainty, options, and action feasibility while testing communication format."
			];
		}
		case "historical-case-studies": {
			return [
				"Combine contemporary primary records with later field-specific historical synthesis and current scientific understanding of the claimed mechanism or outcome.",
				"Build an explicit timeline that separates observation, intervention, publication, replication, professional acceptance, policy adoption, and later retelling.",
				"Prefer cases with converging population, experimental, mechanistic, archival, and policy evidence over single-hero or single-study narratives."
			];
		}
		case "public-policy-and-safety": {
			return [
				"Prioritize systematic reviews and credible randomized, controlled time-series, natural-experiment, or matched policy evaluations with a stated counterfactual.",
				"Report implementation, coverage, enforcement, uptake, intermediate behavior, final health or safety outcomes, displacement, and durability separately.",
				"Include subgroup, equity, cost, access, unintended-effect, and jurisdictional context when they can change the policy conclusion."
			];
		}
		case "sports-nutrition-and-supplements": {
			return [
				"Prioritize systematic reviews, meta-analyses, randomized trials, and major sports-nutrition consensus statements with explicit dose, duration, comparator, and training status.",
				"Separate biochemical response, laboratory capacity, soreness, recovery, body composition, and real competition performance.",
				"Report effect size, uncertainty, adverse effects, product quality, diet adequacy, event demands, and practical relevance together."
			];
		}
		case "infection-immunity-and-vaccines": {
			return [
				"Prioritize systematic reviews, surveillance, randomized or strong quasi-experimental evidence, outbreak investigations, and current public-health guidance.",
				"Separate infection, transmission, symptoms, severe disease, hospitalization, mortality, carriage, and population-level indirect effects.",
				"Record pathogen, variant or strain, vaccine or treatment, population, setting, follow-up, and changing background immunity."
			];
		}
		case "mental-health-and-treatment": {
			return [
				"Prioritize current guidelines, systematic reviews, randomized comparisons, and strong long-term observational evidence with explicit diagnosis, severity, treatment history, and comparator.",
				"Separate symptom response, remission, relapse, function, quality of life, suicide-related outcomes, discontinuation, withdrawal, and treatment burden.",
				"Report setting, delivery mode, dose or protocol, follow-up, adverse effects, patient preference, and access constraints alongside average efficacy."
			];
		}
		case "reproductive-and-sexual-health": {
			return [
				"Prioritize current WHO and professional guidance, systematic reviews, national surveillance, and comparative studies with explicit method, age, gestation, indication, and denominator.",
				"Separate efficacy, typical-use effectiveness, expected effects, uncommon complications, long-term outcomes, access, and patient-centered experience.",
				"Preserve autonomy and distinguish population averages from individualized decisions involving pregnancy goals, medical history, fertility, and risk tolerance."
			];
		}
		case "aging-and-longevity": {
			return [
				"Prioritize randomized human trials, systematic reviews, validated cohorts, and major healthy-aging guidance with explicit baseline function, frailty, dose, duration, and comparator.",
				"Separate target engagement, biomarkers, strength, function, disease, disability-free survival, mortality, quality of life, and adverse effects.",
				"Use animal and mechanistic evidence to justify hypotheses, not to establish healthy-human longevity or clinical utility."
			];
		}
		case "cancer-prevention-and-care": {
			return [
				"Prioritize current oncology and screening guidance, systematic reviews, randomized outcome trials, and strong prospective cohorts with explicit cancer type, stage, population, treatment, and comparator.",
				"Separate detection, stage shift, response, recurrence, symptom burden, quality of life, treatment complications, cancer-specific mortality, and overall survival.",
				"Report absolute benefit and harm, average-risk versus inherited-risk boundaries, treatment substitution, follow-up, and patient goals alongside relative effects."
			];
		}
		case "cardiovascular-metabolic-and-kidney-health": {
			return [
				"Prioritize current cardiovascular, kidney, and metabolic guidelines, randomized outcome trials, systematic reviews, and validated cohorts with explicit baseline risk and treatment context.",
				"Separate biomarkers, symptoms, filtration, albuminuria, hospitalization, heart failure, stroke, myocardial infarction, kidney failure, mortality, and treatment harms.",
				"Report absolute risk, duration, adherence, kidney and liver function, interactions, competing risks, and population eligibility alongside average effects."
			];
		}
		case "substance-use-and-addiction": {
			return [
				"Prioritize current addiction guidance, systematic reviews, randomized interventions, strong longitudinal cohorts, and implementation studies with explicit substance, severity, setting, goal, and comparator.",
				"Separate withdrawal, craving, verified use, retention, recovery, quality of life, nonfatal overdose, onsite reversal, population mortality, and treatment or policy harms.",
				"Report follow-up, co-use, changing drug supply, treatment access, adherence, stigma, legal context, and patient-defined goals without turning association into moral judgment."
			];
		}
		case "energy-and-infrastructure": {
			return [
				"Use consistent lifecycle and service boundaries when comparing fuels, infrastructure, storage, capture, or removal technologies.",
				"Prioritize major energy assessments, measured operating performance, and synthesis over nameplate, target-level, or promotional claims.",
				"Keep technical feasibility, commercial operation, system scale, reliability contribution, and full-chain emissions as separate milestones."
			];
		}
		case "agriculture-and-food-systems": {
			return [
				"Prefer systematic reviews and long-term field, farm, or watershed evidence that identifies crop, soil, climate, baseline, and co-practices.",
				"Report production and environmental outcomes with explicit per-area, per-output, and whole-system boundaries where they differ.",
				"Treat named farming systems as bundles of testable practices and measured outcomes rather than evidence-bearing labels."
			];
		}
		case "oceans-and-marine-science": {
			return [
				"Prioritize global assessments, long-term observing systems, mass balances, and ecological syntheses with explicit region, depth, compartment, and timescale.",
				"Separate pollutant input, environmental concentration, organism exposure, individual harm, population effect, and human-health evidence.",
				"For marine interventions, require net carbon or resource accounting, permanence, monitoring, ecological effects, governance, and scale."
			];
		}
		case "physics-and-chemistry": {
			return [
				"Require the complete diagnostic signature predicted by the claim, a closed system boundary, calibrated measurements, and independent replication.",
				"Use standards institutes, national laboratories, major technical reviews, and primary experiments with enough methods to evaluate artifacts.",
				"Distinguish observation, mechanism, target-level milestone, engineering breakeven, and commercial technology."
			];
		}
		case "economics-and-social-policy": {
			return [
				"Prioritize systematic reviews, administrative causal studies, randomized programs, and transparent quasi-experiments with a credible counterfactual.",
				"Report average, subgroup, distributional, behavioral-margin, and time-horizon effects rather than one headline coefficient.",
				"Keep estimated consequences separate from ethical judgments and flag when a local or temporary study cannot identify permanent economy-wide effects."
			];
		}
		default: {
			return [
				"Prioritize systematic reviews, meta-analyses, major guidelines, and consensus assessments.",
				"Use landmark primary studies only when they materially changed the field or clarify a live disagreement.",
				"Anchor the public bottom line in sources that describe methods, scope, and major limitations."
			];
		}
	}
}

export function legacyExclusionRules(seed: Pick<SeedClaim, "topicSlug">) {
	switch (seed.topicSlug) {
		case "active-debates": {
			return [
				"Do not turn a mechanism, biomarker, surrogate endpoint, cage experiment, pilot facility, modeled scenario, or vendor target into proven patient, population, environmental, or commercial benefit.",
				"Exclude forecasts and promotional claims that omit comparator, lifecycle or clinical boundary, external validation, harms, uncertainty, and the maturity milestone actually reached.",
				"Do not present absence of a definitive answer as equal support for every position; show which intermediate findings are established and which decision-critical link remains open."
			];
		}
		case "biology-and-evolution":
		case "human-origins-and-paleontology": {
			return [
				"Do not infer adaptation from existence, complexity, persistence, function, or a plausible just-so story without comparative or fitness evidence.",
				"Exclude claims that confuse mutation bias with foresight, individual acclimation with inherited population change, or partial reproductive isolation with one universal species boundary.",
				"Do not generalize one laboratory lineage, taxon, gene, fossil, or timescale into a universal rate or mechanism without converging evidence."
			];
		}
		case "consensus-foundations": {
			return [
				"Do not turn a threshold, checklist score, evidence hierarchy, or single design label into an automatic truth or importance verdict.",
				"Exclude examples that hide the model assumptions, selection process, comparison, estimand, denominator, or decision context needed to interpret them.",
				"Do not generalize a field-specific replication rate or bias audit into one universal rate for all science."
			];
		}
		case "media-misinformation": {
			return [
				"Do not infer population belief or causal platform effects from viral examples, convenience engagement counts, or content selected because it was already prominent.",
				"Exclude interventions that lower belief in true and false information equally when the claimed outcome is improved discernment.",
				"Do not transfer an effect across platforms, countries, languages, topics, or election periods without making that boundary visible."
			];
		}
		case "bias-incentives": {
			return [
				"Do not infer misconduct, falsity, or intent from funding, a null result, a correction, a retraction, journal venue, or one reporting discrepancy alone.",
				"Exclude prevalence claims without a defined denominator, detection process, time window, and account of missing or unresolved cases.",
				"Do not let proposed reforms count as proven solutions without comparative evidence on reliability, burden, gaming, and unintended effects."
			];
		}
		case "science-communication": {
			return [
				"Do not treat message popularity, self-reported liking, immediate recall, or stated intention as equivalent to accurate understanding or durable behavior.",
				"Exclude formats that gain simplicity by changing the claim, denominator, comparison, causal strength, uncertainty, or available options.",
				"Do not universalize one audience's response or assume that a trusted, vivid, emotional, visual, or plain message is necessarily accurate."
			];
		}
		case "historical-case-studies": {
			return [
				"Do not let a retrospective hero story, famous image, quotation, or institutional commemoration substitute for the contemporary evidence record.",
				"Exclude present-day causal certainty from claims about what historical actors knew, when they knew it, or why adoption was delayed.",
				"Do not infer that every rejected outsider, dramatic reversal, or temporally associated policy was scientifically vindicated."
			];
		}
		case "public-policy-and-safety": {
			return [
				"Do not treat a law on the books, modeled benefit, intermediate outcome, or participant-only estimate as proof of population implementation and final-outcome effect.",
				"Exclude before-after comparisons that lack a credible control for secular trends, regression to the mean, policy timing, displacement, and concurrent interventions.",
				"Do not export one jurisdiction's effect size without accounting for baseline risk, enforcement, market response, infrastructure, access, and equity."
			];
		}
		case "sports-nutrition-and-supplements": {
			return [
				"Do not turn a pathway, biomarker, acute laboratory change, or statistically significant result into meaningful performance or long-term health benefit.",
				"Exclude comparisons that do not control for total diet, protein, training, placebo, co-supplements, dose, or baseline deficiency when those factors can explain the result.",
				"Do not generalize one event, population, product, or sponsored protocol to every athlete or treat a modest average effect as guaranteed individual benefit."
			];
		}
		case "infection-immunity-and-vaccines": {
			return [
				"Do not infer causation from temporal anecdotes, passive reports, ecological correlations, pathogen detection alone, or a single outbreak.",
				"Exclude claims that merge protection against infection with protection against severe disease or transfer one pathogen's threshold and timing to another.",
				"Do not generalize evidence across variants, populations, settings, products, doses, or risk groups without making the boundary explicit."
			];
		}
		case "mental-health-and-treatment": {
			return [
				"Do not infer universal effectiveness or harm from one patient story, uncontrolled clinic series, symptom scale, commercial protocol, or diagnosis-free wellness claim.",
				"Exclude comparisons that hide severity, prior treatment, co-interventions, expectancy, withdrawal, adherence, crisis risk, or clinically important adverse effects.",
				"Do not generalize one therapy, medicine, diagnosis, delivery mode, or short-term response to every patient or to durable recovery."
			];
		}
		case "reproductive-and-sexual-health": {
			return [
				"Do not generalize across contraceptive methods, abortion methods, gestational ages, fertility diagnoses, hormone formulations, or patient risk profiles.",
				"Exclude claims that confuse relative with absolute risk, expected symptoms with complications, clinical thresholds with biological cliffs, or safe care with unsafe care.",
				"Do not use moral, political, marketing, or anecdotal assertions as evidence of medical efficacy, safety, fertility, or mental-health outcomes."
			];
		}
		case "aging-and-longevity": {
			return [
				"Do not turn an animal lifespan result, pathway, target-engagement marker, epigenetic score, or short pilot study into proven human age reversal or longevity.",
				"Exclude claims that omit baseline frailty, nutritional status, training, dose, follow-up, adverse effects, competing illness, or the difference between biomarker and clinical outcome.",
				"Do not treat commercial availability, regulatory approval for another disease, or a younger biological-age score as validated preventive treatment."
			];
		}
		case "cancer-prevention-and-care": {
			return [
				"Do not turn cell metabolism, animal tumor response, a testimonial, surrogate endpoint, stage shift, or response rate into a proven cure or survival benefit.",
				"Exclude claims that merge screening with diagnosis, average risk with inherited high risk, complementary symptom care with replacement therapy, or association with treatment effect.",
				"Do not generalize one cancer type, stage, molecular subtype, treatment, procedure, or patient population to all cancers."
			];
		}
		case "cardiovascular-metabolic-and-kidney-health": {
			return [
				"Do not turn a biomarker association, short physiologic response, device alert, or disease mechanism into proven event reduction or an individual treatment decision.",
				"Exclude comparisons that hide baseline cardiovascular risk, albuminuria, kidney function, bleeding, interactions, adherence, follow-up, or absolute benefit and harm.",
				"Do not generalize one drug, device, risk score, disease stage, or trial population to every patient with a similar label."
			];
		}
		case "substance-use-and-addiction": {
			return [
				"Do not treat withdrawal completion, self-report alone, treatment attendance, onsite overdose reversal, or a detected contaminant as equivalent to durable recovery or population mortality benefit.",
				"Exclude claims that hide co-use, tolerance, drug-supply changes, treatment access, attrition, stigma, legal context, or the difference between offering care and coercing it.",
				"Do not use moral labels, isolated testimonials, uncontrolled before-after changes, or one site's implementation as universal evidence of efficacy or harm."
			];
		}
		case "energy-and-infrastructure": {
			return [
				"Do not infer lifecycle or system performance from a combustion-only, component-only, target-only, or nameplate metric.",
				"Exclude vendor forecasts and modeled deployment claims that do not disclose energy, emissions, duration, storage, or reliability boundaries.",
				"Do not treat a less harmful option as impact-free or as the best choice for every region and service."
			];
		}
		case "agriculture-and-food-systems": {
			return [
				"Do not generalize one crop, soil depth, growing season, experimental station, or branded practice to all farming systems.",
				"Exclude comparisons that change yield, land, input, or co-practice boundaries without stating the denominator.",
				"Do not use a certification or umbrella label as a substitute for measured agronomic, ecological, health, or livelihood outcomes."
			];
		}
		case "oceans-and-marine-science": {
			return [
				"Do not convert one beach, gyre, species, depth, or regional record into a fixed global source share or trend.",
				"Exclude laboratory exposures that cannot be related to environmental dose from population or human-risk conclusions.",
				"Do not treat proposed carbon uptake, biomass growth, or gross capture as durable verified net removal."
			];
		}
		case "physics-and-chemistry": {
			return [
				"Do not let a video, patent, private demonstration, preprint, single curve, or unexplained anomaly carry an extraordinary physical claim.",
				"Exclude energy claims that omit inputs, depletion, calibration, thermal accounting, or complete facility boundaries.",
				"Do not equate one suggestive property with the full required signature of superconductivity, fusion, signalling, radioactivity, or another claimed phenomenon."
			];
		}
		case "economics-and-social-policy": {
			return [
				"Do not treat one city, subgroup, coefficient, short event window, or statistically insignificant estimate as a universal zero or inevitability.",
				"Exclude comparisons without a credible counterfactual or that conceal who gains, who loses, and which adjustment margins were measured.",
				"Do not present pilot partial-equilibrium estimates as complete permanent national effects without taxes, prices, supply, migration, and financing."
			];
		}
		default: {
			return [
				"Do not let isolated preprints, commentary, or anecdotal reports carry the public bottom line.",
				"Treat mechanistic or animal-only evidence as supporting context unless the page is specifically about mechanism.",
				"Exclude weak or redundant sources when a stronger synthesis already covers the same point."
			];
		}
	}
}

export function legacyAppraisalTools(topicSlug: string) {
	switch (topicSlug) {
		case "active-debates": {
			return ["Evidence-maturity and technology-readiness ladder", "Surrogate-to-patient-or-population directness audit", "Competing-hypothesis, lifecycle-boundary, and external-validity check"];
		}
		case "biology-and-evolution":
		case "human-origins-and-paleontology": {
			return ["Selection-drift-mutation-gene-flow mechanism audit", "Phylogenetic and population-structure check", "Cross-taxon, timescale, and experimental-field triangulation"];
		}
		case "consensus-foundations": {
			return ["Estimand, assumptions, and uncertainty audit", "Causal-identification and external-validity check", "Cross-method triangulation map"];
		}
		case "media-misinformation": {
			return ["Exposure-to-belief-to-behavior outcome ladder", "Platform, sample, and content-selection audit", "Discernment, durability, and spillover check"];
		}
		case "bias-incentives": {
			return ["Protocol, registry, and publication comparison", "Detection-process and denominator audit", "Incentive, intent, and outcome separation check"];
		}
		case "science-communication": {
			return ["Audience-goal-message-context matrix", "Comprehension, calibration, and behavior outcome check", "Framing, denominator, accessibility, and durability audit"];
		}
		case "historical-case-studies": {
			return ["Primary-record provenance and timeline audit", "Contemporary-versus-retrospective knowledge check", "Cross-source causal and adoption triangulation"];
		}
		case "public-policy-and-safety": {
			return ["Counterfactual and policy-timing review", "Implementation-to-final-outcome evidence chain", "Distributional, displacement, and unintended-effect audit"];
		}
		case "sports-nutrition-and-supplements": {
			return ["Supplement dose, formulation, and contamination audit", "Outcome-to-competition directness check", "Diet, training-status, placebo, and sponsorship risk-of-bias review"];
		}
		case "infection-immunity-and-vaccines": {
			return ["Pathogen, outcome, and case-definition audit", "Variant, immunity, and population transportability check", "Bias, surveillance denominator, and intervention-timing review"];
		}
		case "mental-health-and-treatment": {
			return ["Diagnosis, severity, and treatment-history audit", "Response-remission-relapse-function outcome ladder", "Blinding, expectancy, withdrawal, adverse-effect, and patient-burden review"];
		}
		case "reproductive-and-sexual-health": {
			return ["Method, age, gestation, and medical-eligibility audit", "Absolute-risk and denominator check", "Autonomy, access, comparator, and long-term outcome review"];
		}
		case "aging-and-longevity": {
			return ["Animal-to-human evidence-maturity ladder", "Biomarker-to-function-to-survival directness audit", "Frailty, adherence, competing-risk, and long-term safety review"];
		}
		case "cancer-prevention-and-care": {
			return ["Cancer-type, stage, and molecular-subtype transportability audit", "Detection-to-treatment-to-survival outcome ladder", "Absolute benefit, harm, competing-risk, and treatment-substitution review"];
		}
		case "cardiovascular-metabolic-and-kidney-health": {
			return ["Baseline-risk and absolute-event review", "Biomarker-to-organ-function-to-clinical-event ladder", "Bleeding, kidney function, interactions, adherence, and competing-risk audit"];
		}
		case "substance-use-and-addiction": {
			return ["Substance, severity, treatment-goal, and follow-up audit", "Withdrawal-to-use-to-retention-to-mortality outcome ladder", "Co-use, attrition, drug-supply, implementation, stigma, and policy-context review"];
		}
		case "energy-and-infrastructure": {
			return ["Lifecycle boundary audit", "Technology-readiness and operating-data check", "Reliability-service and duration check"];
		}
		case "agriculture-and-food-systems": {
			return ["Agronomic context and baseline check", "Area-versus-output denominator audit", "Soil depth, duration, and co-practice check"];
		}
		case "oceans-and-marine-science": {
			return ["Region-depth-timescale coverage check", "Exposure-to-effect evidence ladder", "Mass-balance, permanence, and ecosystem-risk audit"];
		}
		case "physics-and-chemistry": {
			return ["Complete diagnostic-signature check", "Energy and matter system-boundary audit", "Independent replication and integrity-status review"];
		}
		case "economics-and-social-policy": {
			return ["Counterfactual and identification-strategy review", "Average-versus-distributional effect audit", "Partial-versus-general-equilibrium boundary check"];
		}
		default: {
			return [
				"GRADE-style certainty check for the body of evidence",
				"Risk-of-bias review for key study designs",
				"Shared-baseline check when institutions disagree"
			];
		}
	}
}
