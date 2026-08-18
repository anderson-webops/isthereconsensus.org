import type { SeedClaim } from "./claims.js";
import { august2026ReviewedClaim as reviewedClaim } from "./claim-expansion-2026-08-shared.js";

export const august2026PolicyClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Do publicized sobriety checkpoints reduce alcohol-related crashes and deaths?",
		slug: "do-publicized-sobriety-checkpoints-reduce-alcohol-related-crashes-and-deaths",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Well-publicized sobriety-checkpoint programs reduce alcohol-impaired crashes and related deaths on average. Their main effect is deterrence—raising the perceived chance of detection across a community—not merely the number of impaired drivers arrested at a checkpoint. Results depend on sustained visibility, lawful implementation, staffing, and local driving patterns.",
		stableCore: [
			"Systematic reviews consistently find fewer alcohol-related crashes after publicized checkpoint programs begin.",
			"Frequent publicity and visible enforcement are central parts of the intervention because deterrence extends beyond drivers who pass through a checkpoint.",
			"Both selective breath testing based on suspicion and random testing programs can work, although legal frameworks differ by jurisdiction.",
			"Checkpoint effectiveness does not settle separate legal and civil-liberty questions about how stops should be authorized and conducted."
		],
		openQuestions: [
			"Which frequency, location, publicity strategy, and staffing model produces the greatest sustained benefit per resource used?",
			"How do rideshare availability, cannabis use, passive alcohol sensors, and changing travel behavior affect modern programs?"
		],
		whatWouldChangeMinds: [
			"Modern controlled evaluations consistently finding no crash reduction after accounting for trends, enforcement changes, and regression to the mean.",
			"Evidence that equally resourced alternatives produce substantially larger and more equitable safety gains with fewer burdens."
		],
		misconceptions: [
			"A checkpoint does not need a large arrest count to deter impaired driving across a community.",
			"Evidence of crash reduction does not mean every checkpoint design is lawful, fair, or equally effective.",
			"Checkpoints complement rather than replace blood-alcohol limits, transportation alternatives, treatment, and other prevention measures."
		],
		editorSummary:
			"This is a policy intervention with a replicated population-level effect. The evidence supports publicized programs as a deterrent while leaving implementation, proportionality, and legal safeguards open to public judgment.",
		uncertaintySummary:
			"The direction is well supported, but most evidence comes from quasi-experimental program evaluations. Effect size varies with publicity, frequency, baseline enforcement, measurement, and jurisdiction.",
		sources: [
			{
				kind: "guideline",
				title: "Motor Vehicle Injury — Alcohol-Impaired Driving: Publicized Sobriety Checkpoint Programs",
				publisher: "The Community Guide",
				year: 2014,
				url: "https://www.thecommunityguide.org/findings/motor-vehicle-injury-alcohol-impaired-driving-publicized-sobriety-checkpoint-programs.html",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Independent U.S. public-health recommendation based on systematic evidence that publicized checkpoint programs reduce alcohol-impaired driving and crash outcomes.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Publicized sobriety checkpoint programs: a Community Guide systematic review",
				publisher: "American Journal of Preventive Medicine",
				year: 2014,
				url: "https://doi.org/10.1016/j.amepre.2014.01.018",
				doi: "10.1016/j.amepre.2014.01.018",
				appraisal: "high",
				stance: "supports",
				note: "Program-evaluation synthesis finding reductions in alcohol-related crash outcomes across checkpoint designs and implementation settings.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Effects of interventions for preventing road traffic crashes: an overview of systematic reviews",
				publisher: "BMC Public Health",
				year: 2022,
				url: "https://doi.org/10.1186/s12889-021-12253-y",
				doi: "10.1186/s12889-021-12253-y",
				appraisal: "high",
				stance: "context",
				note: "Overview placing sobriety checkpoints within the broader evidence for speed, restraint, licensing, road, vehicle, and impaired-driving interventions.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Does comprehensive sexuality education increase teen sexual activity?",
		slug: "does-comprehensive-sexuality-education-increase-teen-sexual-activity",
		consensusBand: "broad",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Comprehensive sexuality education does not generally make adolescents start sex earlier or have more sex. Well-designed programs can delay initiation, reduce frequency or number of partners, increase condom or contraceptive use, and improve knowledge. Effects vary by curriculum and implementation, and education alone cannot remove barriers to confidential health services.",
		stableCore: [
			"Reviews across many countries do not find that age-appropriate comprehensive education increases sexual activity or sexual risk-taking.",
			"Programs are more effective when they are medically accurate, skill-based, inclusive, sequenced over time, and implemented as designed.",
			"Teaching both abstinence and risk-reduction information gives students options without assuming that every student is already sexually active.",
			"Knowledge gains are more consistent than changes in pregnancy or infection rates, which also depend on service access, relationships, and social conditions."
		],
		openQuestions: [
			"Which program components best improve consent, healthy relationships, digital safety, and outcomes for LGBTQ+ and disabled students?",
			"How much do teacher preparation, family engagement, local adaptation, and confidential service access influence long-term outcomes?"
		],
		whatWouldChangeMinds: [
			"High-quality evaluations consistently showing earlier initiation or greater risky behavior caused by comprehensive programs.",
			"Evidence that a narrower curriculum produces equal or better health and relationship outcomes across diverse students without withholding medically relevant information."
		],
		misconceptions: [
			"Providing accurate information about contraception is not the same as encouraging students to have sex.",
			"Comprehensive education can include abstinence as a valid way to avoid pregnancy and infection.",
			"One weakly implemented or poorly matched curriculum does not determine the effect of the whole intervention class."
		],
		editorSummary:
			"The feared backfire effect is not supported. The better policy debate concerns curriculum quality, age appropriateness, inclusion, family and community context, and whether students can act on what they learn.",
		uncertaintySummary:
			"The absence of increased sexual activity is well supported. The size of positive behavioral and health effects varies substantially across programs, populations, follow-up periods, and implementation quality.",
		sources: [
			{
				kind: "guideline",
				title: "What Works in Schools: Sexual Health Education",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/healthy-youth/what-works-in-schools/sexual-health-education.html",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Current public-health guidance describing medically accurate, developmentally appropriate education and the evidence-linked characteristics of effective programs.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Three Decades of Research: The Case for Comprehensive Sex Education",
				publisher: "Journal of Adolescent Health",
				year: 2020,
				url: "https://doi.org/10.1016/j.jadohealth.2020.07.036",
				doi: "10.1016/j.jadohealth.2020.07.036",
				appraisal: "high",
				stance: "supports",
				note: "Broad review concluding that comprehensive programs support multiple health and social outcomes without increasing adolescent sexual activity.",
				order: 2
			},
			{
				kind: "consensus_statement",
				title: "International technical guidance on sexuality education: an evidence-informed approach",
				publisher: "UNESCO",
				year: 2018,
				url: "https://unesdoc.unesco.org/ark:/48223/pf0000260770",
				appraisal: "high",
				stance: "supports",
				note: "International evidence synthesis reporting that curriculum-based education does not hasten sexual activity and can improve protective behaviors when comprehensive and well implemented.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Do school-based anti-bullying programs reduce bullying?",
		slug: "do-school-based-anti-bullying-programs-reduce-bullying",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "high",
		bottomLine:
			"School-based anti-bullying programs reduce bullying perpetration and victimization on average, but effects are usually modest and vary substantially. Programs work better when they are sustained, school-wide, age-appropriate, implemented faithfully, and paired with a supportive climate rather than relying on a one-time assembly or slogan.",
		stableCore: [
			"Large meta-analyses find average reductions in both bullying perpetration and being bullied.",
			"Whole-school policies, staff training, classroom work, supervision, reporting, and family engagement often function as a package.",
			"Implementation quality, duration, age, local norms, and the program model explain part of the wide variation in results.",
			"Cyberbullying overlaps with in-person relationships but also requires attention to digital platforms, persistence, audience, and off-campus behavior."
		],
		openQuestions: [
			"Which components are necessary, which are burdensome without benefit, and which work best for adolescents rather than younger children?",
			"How can programs reduce identity-based and online harassment without increasing surveillance, exclusionary discipline, or underreporting?"
		],
		whatWouldChangeMinds: [
			"Updated preregistered syntheses finding no reduction after correcting for publication bias and implementation differences.",
			"Consistent evidence that less intensive alternatives produce greater durable reductions with fewer unintended consequences."
		],
		misconceptions: [
			"An average benefit does not mean every branded program works.",
			"A one-day awareness event is not equivalent to a sustained whole-school intervention.",
			"Lower reported incidents can reflect either real improvement or reduced willingness to report, so multiple outcome measures matter."
		],
		editorSummary:
			"The evidence supports action but not complacency. Schools can reduce bullying, yet the typical effect is not a cure and depends heavily on sustained implementation, climate, and attention to unintended harms.",
		uncertaintySummary:
			"Average effects are supported with high certainty, while the best component mix and transfer across ages, cultures, online settings, and disciplinary systems remain less certain.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Youth Violence Prevention Research Priorities and Recommendations",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://stacks.cdc.gov/view/cdc/168632",
				doi: "10.15620/cdc/168632",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "Current U.S. prevention context identifying bullying and school climate within a broader evidence agenda for reducing youth violence and inequity.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Effectiveness of school-based programs to reduce bullying perpetration and victimization: An updated systematic review and meta-analysis",
				publisher: "Campbell Systematic Reviews",
				year: 2021,
				url: "https://doi.org/10.1002/cl2.1143",
				doi: "10.1002/cl2.1143",
				appraisal: "high",
				stance: "supports",
				note: "Large updated synthesis finding significant average reductions in perpetration and victimization while documenting heterogeneity among programs and settings.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Evaluating the effectiveness of school-bullying prevention programs: An updated meta-analytical review",
				publisher: "Aggression and Violent Behavior",
				year: 2019,
				url: "https://doi.org/10.1016/j.avb.2018.07.001",
				doi: "10.1016/j.avb.2018.07.001",
				appraisal: "high",
				stance: "supports",
				note: "Program synthesis estimating average reductions of roughly one-fifth in perpetration and one-sixth in victimization and exploring moderators of effectiveness.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Does secure firearm storage reduce youth firearm injury and suicide?",
		slug: "does-secure-firearm-storage-reduce-youth-firearm-injury-and-suicide",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"Households that keep firearms locked, unloaded, and inaccessible to children and adolescents have lower risks of youth firearm suicide and unintentional injury than households with unsecured firearms. Evidence is largely observational and modeled rather than randomized, but it is consistent, shows stronger protection when multiple practices are combined, and aligns with the immediate-access mechanism.",
		stableCore: [
			"Youth firearm suicide often involves a gun from the home or another known household, making access during a short crisis consequential.",
			"Case-control studies associate locked guns, unloaded guns, locked ammunition, and ammunition stored separately with lower youth injury risk.",
			"Locking and unloading address different failure pathways and are most protective when combined.",
			"Secure storage reduces access; it does not eliminate every risk or substitute for mental-health care, supervision, and crisis response."
		],
		openQuestions: [
			"Which counseling, device-distribution, legal, and community approaches produce durable changes in real household storage behavior?",
			"How do quick-access safes and different storage configurations balance emergency-access preferences with measurable youth safety?"
		],
		whatWouldChangeMinds: [
			"Strong prospective evidence finding no injury or suicide difference after detailed measurement of ownership, household risk, and storage behavior.",
			"Evidence that a common recommended storage method creates offsetting harms equal to or greater than the youth injuries it prevents."
		],
		misconceptions: [
			"Teaching a child not to touch a gun is not as reliable as physically preventing unsupervised access.",
			"Hiding a loaded firearm is not the same as locking it.",
			"The lack of randomized injury trials reflects ethical and practical limits, not an absence of relevant evidence."
		],
		editorSummary:
			"The causal evidence is necessarily less direct than for a randomized medication trial, but several converging lines support a practical safety conclusion: adding time and barriers between a young person and a loaded firearm reduces preventable harm.",
		uncertaintySummary:
			"Moderate certainty reflects observational designs, self-reported storage, rare outcomes, and household confounding. Consistency, dose-like patterns across practices, and a direct access mechanism strengthen inference.",
		sources: [
			{
				kind: "guideline",
				title: "Preventing Firearm Injury and Death",
				publisher: "Centers for Disease Control and Prevention",
				year: 2026,
				url: "https://www.cdc.gov/firearm-violence/prevention/index.html",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Current public-health framework identifying secure storage as part of a layered strategy to prevent firearm suicide, unintentional injury, and unauthorized access.",
				order: 1
			},
			{
				kind: "landmark_study",
				title: "Association of Increased Safe Household Firearm Storage With Firearm Suicide and Unintentional Death Among US Youths",
				publisher: "JAMA Pediatrics",
				year: 2019,
				url: "https://doi.org/10.1001/jamapediatrics.2019.1078",
				doi: "10.1001/jamapediatrics.2019.1078",
				appraisal: "moderate",
				stance: "context",
				note: "National modeling analysis estimating how youth firearm suicide and unintentional deaths would change under plausible increases in locked household storage.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Gun Storage Practices and Risk of Youth Suicide and Unintentional Firearm Injuries",
				publisher: "JAMA",
				year: 2005,
				url: "https://pubmed.ncbi.nlm.nih.gov/15701912/",
				doi: "10.1001/jama.293.6.707",
				pmid: "15701912",
				appraisal: "moderate",
				stance: "supports",
				note: "Case-control study finding lower youth suicide and unintentional-injury risk when firearms were locked, unloaded, and stored separately from ammunition.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "public-policy-and-safety",
		title: "Do smoke-free indoor laws reduce heart attacks and other cardiovascular events?",
		slug: "do-smoke-free-indoor-laws-reduce-heart-attacks-and-other-cardiovascular-events",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Comprehensive smoke-free indoor laws reduce secondhand-smoke exposure and are followed by fewer heart attacks and other cardiovascular events. The evidence comes mainly from natural experiments rather than randomized laws, but the timing, consistency, exposure reductions, dose-response by policy strength, and known acute cardiovascular effects of smoke support a causal benefit.",
		stableCore: [
			"Secondhand smoke rapidly affects platelets, blood vessels, inflammation, and oxygen delivery in ways that can trigger acute cardiovascular events.",
			"Biomarkers and air measurements fall after comprehensive indoor smoking restrictions.",
			"Meta-analyses of jurisdictions implementing laws find reductions in acute coronary events, with broader laws generally associated with larger benefits.",
			"Smoke-free laws protect nonsmokers and can also encourage quitting without eliminating every exposure in homes or outdoor spaces."
		],
		openQuestions: [
			"How much additional benefit comes from extending protection to multiunit housing, casinos, vehicles with children, and emerging nicotine products?",
			"How should studies separate policy effects from changing smoking prevalence, health care, air pollution, and preexisting cardiovascular trends?"
		],
		whatWouldChangeMinds: [
			"Large controlled natural experiments repeatedly showing no exposure or cardiovascular change after comprehensive laws.",
			"A convincing alternative explanation that accounts for timing, policy-strength gradients, biomarkers, and similar findings across jurisdictions."
		],
		misconceptions: [
			"A population decline after a law is not automatically causal, which is why comparisons, timing, biomarkers, and replication matter.",
			"Ventilation and designated smoking areas do not provide the same protection as eliminating indoor smoke.",
			"Cardiovascular benefits can appear quickly because smoke can trigger acute events; not every policy effect requires decades."
		],
		editorSummary:
			"Randomizing communities to continued smoke exposure would be impractical and unethical, so the evidence rests on converging natural experiments. That convergence strongly supports fewer cardiovascular events after comprehensive protection.",
		uncertaintySummary:
			"The direction is high-confidence. Exact effect sizes vary with policy scope, compliance, baseline exposure, smoking trends, comparison regions, and outcome coding.",
		sources: [
			{
				kind: "guideline",
				title: "Protecting people from tobacco smoke",
				publisher: "World Health Organization",
				year: 2026,
				url: "https://www.who.int/activities/protecting-people-from-tobacco-smoke/",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Global public-health guidance concluding that comprehensive smoke-free environments are the effective way to protect people from secondhand tobacco smoke.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Does legislation to ban smoking reduce exposure to secondhand smoke and smoking behaviour?",
				publisher: "Cochrane",
				year: 2016,
				url: "https://www.cochrane.org/evidence/CD005992_does-legislation-ban-smoking-reduce-exposure-secondhand-smoke-and-smoking-behaviour",
				doi: "10.1002/14651858.CD005992.pub3",
				appraisal: "high",
				stance: "supports",
				note: "Systematic review finding reduced secondhand-smoke exposure and evidence of lower cardiovascular morbidity after legislative smoking bans.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Cardiovascular events after smoke-free laws: an updated systematic review and meta-analysis",
				publisher: "Current Environmental Health Reports",
				year: 2014,
				url: "https://doi.org/10.1007/s40572-014-0020-1",
				doi: "10.1007/s40572-014-0020-1",
				appraisal: "high",
				stance: "supports",
				note: "Updated natural-experiment synthesis finding fewer acute coronary and other cardiovascular events after smoke-free laws, with greater protection under more comprehensive policies.",
				order: 3
			}
		]
	})
];
