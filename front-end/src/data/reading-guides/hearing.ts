import type { ReadingGuideContent } from "./types";

export const hearingGuide: ReadingGuideContent = {
	takeaway:
		"Start with actual exposure and fit. Package ratings, perceived quiet and a successful training session each answer only part of the protection question.",
	scope: "A guide to interpreting hearing-protection evidence and the comparison's limits. It does not calculate personal safe exposure, select a product for a particular job, diagnose symptoms or determine legal compliance.",
	sections: [
		{
			id: "rating-and-fit",
			title: "Separate the label from the fit",
			paragraphs: [
				{
					text: "A noise reduction rating describes a protector's laboratory performance. It cannot tell you whether it seals correctly for a particular wearer. NIOSH's January 2025 update makes this distinction practical: it recommends individual quantitative fit testing in place of its older generic adjustment to package ratings. The resulting personal attenuation rating estimates the protection achieved in that test. It supplies information about a wearer and device together, rather than treating every wearer as if they received the same fraction of a label number.",
					sources: ["policy"]
				},
				{
					text: "A test is still a sample of performance. Removing and replacing a plug, changing eyewear or wearing other equipment can change the fit during later use. That is why the useful question is not just which package has the largest number. It is whether the selected protector achieves appropriate attenuation and can be worn correctly and consistently for the actual task. The comparison keeps personal safe-duration and injury-risk contexts unavailable because it lacks the measurements required to answer them.",
					sources: ["policy", "ppe"]
				}
			]
		},
		{
			id: "training-and-time",
			title: "Distinguish learning a fit from retaining it",
			paragraphs: [
				{
					text: "The randomized training evidence concerns specific earplug users and measured attenuation. Cochrane found that extensive fitting instruction improved immediate results relative to simpler instruction. That supports checking a fit, giving useful feedback and checking again. It does not establish a matching percentage reduction in hearing loss, or show that the same intervention works identically for every type of protector. A leaflet, a fit test and individual instruction are different components and should not be treated as interchangeable.",
					sources: ["cochrane"]
				},
				{
					text: "Retention is a separate question. A later study followed Marine recruits after two different initial training methods. Individualized training performed better, but later success declined. Some recruits were lost to follow-up, and failure ended quarterly testing, so raw pass rates should not be plotted as though every original participant was remeasured each time. No booster training was tested. The linked review therefore supports reassessing fit while leaving the best refresher schedule unresolved; it also withholds inconsistent numbers from a newer observational synthesis.",
					sources: ["retention"]
				}
			]
		},
		{
			id: "device-and-task",
			title: "Choose the role before comparing the product",
			paragraphs: [
				{
					text: "Foam plugs, preformed or custom plugs and protective muffs can suit different patterns of use. Handling, repeated removal, heat, confined spaces and other equipment affect convenience and consistent wearing. Muffs can be easy to put on, yet their seal may interact with eyewear or helmets. A reusable or custom plug still needs appropriate fit. NIOSH also includes communication in selection: people need arrangements that let them receive necessary information without repeatedly removing their protection in noise.",
					sources: ["ppe"]
				},
				{
					text: "Ordinary active-noise-cancelling headphones occupy a different category. Perceived quiet is not proof of protective performance. NIOSH distinguishes the ANC feature from NRR-labeled hearing protection, while recognizing that genuine protectors may include electronic communication or sound-restoration features. Neither electronics nor the absence of electronics determines suitability alone. Evaluate the intended protective role, relevant performance and individual fit, rather than inferring a safety promise from a feature name or a more expensive product.",
					sources: ["ppe", "policy"]
				}
			]
		},
		{
			id: "combination-and-controls",
			title: "Keep combined protection within a wider plan",
			paragraphs: [
				{
					text: "Wearing plugs and muffs together can be useful, but the ratings are not additive. The combination interacts with frequency-dependent performance, seal and other routes by which sound reaches the ear. A technical rule of thumb is not the same as a measurement of a fitted combination. The comparison therefore provides no automatic sum, universal added-decibel value or personal time limit. More equipment is not a substitute for establishing what the combination actually achieves in its setting.",
					sources: ["handbook", "policy"]
				},
				{
					text: "Protection worn by a person is one part of prevention. Quieter equipment and changes that reduce noise at its source can protect people without relying on perfect fitting throughout every exposure. NIOSH places those controls ahead of relying on protective equipment alone. Reading the evidence well means keeping these different jobs visible: reducing the hazard, selecting suitable equipment, verifying fit, maintaining skills and assessing actual outcomes. No single package number or training result completes that whole chain.",
					sources: ["ppe"]
				}
			]
		}
	],
	questions: [
		"Is this a product label, a personal fit measurement or a hearing-health outcome?",
		"Does the evidence match the device, instruction and setting?",
		"Was fit tested once or maintained during later use?",
		"Are changing denominators or follow-up rules hidden by a simple percentage?",
		"Can the protector be worn with the other equipment and communication the task requires?"
	],
	sources: [
		{
			id: "policy",
			title: "NIOSH: individual fit-testing policy, January 2025",
			url: "https://www.cdc.gov/niosh/docs/2025-104/pdfs/2025-104.pdf",
			kind: "Institutional policy",
			note: "Two-page update checked, recommendation visually inspected. Supersedes the 1998 NIOSH derating recommendation; the underlying standard was not independently reviewed."
		},
		{
			id: "ppe",
			title: "NIOSH: provide hearing protection",
			url: "https://www.cdc.gov/niosh/noise/prevent/ppe.html",
			kind: "Prevention guidance",
			note: "Device types, ANC, fit, compatibility, communication and hierarchy of controls checked; historical derating wording is read with the 2025 update."
		},
		{
			id: "cochrane",
			title: "Cochrane: fit testing and instruction for noise-exposed workers",
			url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11099959/",
			kind: "Systematic review",
			note: "Primary methods, findings tables and disclosures checked. Three randomized trials; immediate attenuation is not long-term injury prevention. No independent trial reappraisal."
		},
		{
			id: "retention",
			title: "Federman et al.: longer-term earplug fit training in Marine recruits",
			url: "https://www.tandfonline.com/doi/full/10.1080/14992027.2025.2568647",
			kind: "Randomized training study",
			note: "Primary indexed methods, results and attrition passages checked; PDF unavailable. Later denominators and failure-stopping rules differ; no booster intervention or independent data reanalysis."
		},
		{
			id: "handbook",
			title: "Byrne and Michael: noise and hearing conservation",
			url: "https://stacks.cdc.gov/view/cdc/226371/cdc_226371_DS1.pdf",
			kind: "Technical synthesis",
			note: "2021 chapter sections 8.6–8.8 checked for combined protection and communication; older rules of thumb are not used as personal exposure calculations."
		}
	]
};
