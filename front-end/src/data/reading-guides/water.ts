import type { ReadingGuideContent } from "./types";

export const waterGuide: ReadingGuideContent = {
	takeaway:
		"Choose a water-treatment method for a confirmed problem, not for a general promise of purity. Microbial control, chemical reduction and hardness control require different evidence.",
	scope: "This guide explains treatment evidence and labels. It cannot test your supply, certify drinking-water safety, replace an active public-health advisory or recommend a product for an unknown contamination problem.",
	sections: [
		{
			id: "identify-the-problem",
			title: "Start with the water, not the device",
			paragraphs: [
				{
					text: "Water can taste or smell different without being harmful, and harmful contamination may have no noticeable taste or appearance. CDC therefore starts with supply information and appropriate testing. For a public supply, the utility's water-quality report is useful context. For a private well, testing needs are different and local health authorities can help identify the relevant concerns. Neither an attractive device nor a broad laboratory panel automatically answers the question of which treatment is needed at a particular tap.",
					sources: ["filters"]
				},
				{
					text: "Keep the treatment objective specific. Reducing a named chemical, controlling microorganisms, improving taste and reducing scale are separate goals. A product may address more than one, but that needs evidence for each claim. If reliable testing and supply information show no harmful contamination, extra treatment may not be necessary. Some filters also remove useful residual disinfectant or fluoride. More treatment stages are not automatically better, especially when they add maintenance requirements that will be difficult to sustain.",
					sources: ["filters", "systems"]
				}
			]
		},
		{
			id: "read-the-claim",
			title: "Read the claim behind the certification mark",
			paragraphs: [
				{
					text: "A certification mark is most useful when it leads to a precise performance claim. A taste-and-odor standard does not establish that a filter removes lead, PFAS or every pathogen. Even within a broader health-effects standard, products can hold different reduction claims. Check the exact model in the certifier's listing and read its performance data sheet. A listing for a similar-looking cartridge or another model is not interchangeable. NSF's contaminant directory illustrates this claim-by-claim approach; it is one certifier, not an endorsement from this site.",
					sources: ["nsf", "filters"]
				},
				{
					text: "Conditions matter after purchase as well. The rated capacity, incoming water chemistry, flow, installation and replacement schedule help define what the tested claim means in practice. A cartridge does not remain effective indefinitely because it once passed a test. Nor is water flowing through it evidence that every target chemical is still being reduced. EPA warns that unmaintained systems can worsen water quality. A useful comparison therefore includes the work needed to sustain performance, not only the claims made for new equipment.",
					sources: ["filters", "guide"]
				}
			]
		},
		{
			id: "separate-mechanisms",
			title: "Separate removal from disinfection and softening",
			paragraphs: [
				{
					text: "UV disinfection inactivates microorganisms but does not remove dissolved lead, nitrate or PFAS. Cloudiness can shield organisms, so suitable pre-treatment and operation are part of the process. A membrane-based system can create a physical barrier, while a carbon medium can capture selected chemicals. A conventional softener primarily removes calcium and magnesium. These descriptions explain mechanisms, not guaranteed outcomes for every product. If a unit combines several stages, identify which stage or complete-system certification supports each advertised benefit.",
					sources: ["systems", "guide"]
				},
				{
					text: "Boiling and distillation also need separating. Ordinary boiling treats the liquid for germs; distillation collects condensed vapor in another place. Many substances can remain behind during distillation, but some volatile chemicals can carry over. Neither description is permission to improvise treatment for an unknown spill. CDC explicitly warns that boiling or disinfecting cannot make fuel-, toxic-chemical- or radioactively contaminated water safe. Follow current local advice and use an alternative safe supply where advised. An emergency notice takes precedence over a general comparison page.",
					sources: ["emergency", "systems"]
				}
			]
		},
		{
			id: "count-resources",
			title: "Count water use separately from contaminant reduction",
			paragraphs: [
				{
					text: "Reverse osmosis produces treated water and a concentrate stream. A reject-to-treated ratio of two to one means two units are rejected for every treated unit, so three units entered the process. It does not mean two units entered, or that two-thirds of a particular contaminant was removed. WaterSense's 30% minimum efficiency threshold corresponds to 70 units rejected for 30 treated, approximately 2.3 to one. This is a certification-threshold illustration, not a measurement or savings promise for every home.",
					sources: ["spec", "clarifications"]
				},
				{
					text: "EPA's August 2026 clarification matters when comparing labels: efficiency testing accounts for storage-tank back-pressure and automatic flushing, whereas a tank-bypassed recovery rating can look better than normal operation. Another clarification allows alternative packaging language directing readers to the performance sheet, so the older summary table need not appear on every package. Beyond RO, softeners use regeneration water and salt, distillers use heat, and cartridges need replacement. Compare these real trade-offs without combining them into a made-up universal score.",
					sources: ["clarifications", "guide"]
				}
			]
		}
	],
	questions: [
		"Which contaminant or nuisance has actually been identified?",
		"Is this exact model certified for that specific reduction claim?",
		"Does the finding concern removal, inactivation, hardness or a measured health outcome?",
		"What maintenance and resource use does the complete system require?",
		"Is an active local warning asking for an alternative supply instead of household treatment?"
	],
	sources: [
		{
			id: "filters",
			title: "CDC: About Choosing Home Water Filters",
			url: "https://www.cdc.gov/drinking-water/prevention/about-choosing-home-water-filters.html",
			kind: "Institutional guidance",
			note: "Full April 2024 page checked for testing, claim-specific certification and maintenance; not a head-to-head product trial."
		},
		{
			id: "systems",
			title: "CDC: About Home Water Treatment Systems",
			url: "https://www.cdc.gov/drinking-water/about/about-home-water-treatment-systems.html",
			kind: "Institutional guidance",
			note: "Treatment targets and limits checked; general technology descriptions do not certify a particular installation or supply."
		},
		{
			id: "nsf",
			title: "NSF: Contaminant Reduction Claims",
			url: "https://www.nsf.org/consumer-resources/articles/contaminant-reduction-claims-guide",
			kind: "Certifier's primary directory",
			note: "Shows contaminant-specific listing routes. NSF provides certification services; other accredited certifiers exist, and this is not a brand endorsement."
		},
		{
			id: "guide",
			title: "EPA: WaterSense Guide to Selecting Water Treatment Systems",
			url: "https://www.epa.gov/system/files/documents/2025-01/ws-products-home-water-treatment-guide_v2_508.pdf",
			kind: "Institutional technical guidance",
			note: "November 2024 guide; treatment table, softening, certification and maintenance checked. File path and webpage refresh dates are not study dates."
		},
		{
			id: "emergency",
			title: "CDC: How to Make Water Safe in an Emergency",
			url: "https://www.cdc.gov/water-emergency/about/index.html",
			kind: "Emergency public-health guidance",
			note: "September 2024 guidance checked for chemical-contamination exclusions, UV limitations and the role of current local advice."
		},
		{
			id: "spec",
			title: "EPA: WaterSense RO specification, Version 1.0",
			url: "https://www.epa.gov/system/files/documents/2024-11/ws-products-watersense-ro-systems-specification.pdf",
			kind: "Certification specification",
			note: "November 2024 efficiency threshold and reject-ratio formula checked, read together with the newer technical clarifications."
		},
		{
			id: "clarifications",
			title: "EPA: August 2026 RO technical clarifications",
			url: "https://www.epa.gov/system/files/documents/2021-12/ws_technical_clarifications.xlsx",
			kind: "Primary clarification workbook",
			note: "Active Clarification Detail rows 33–35 checked read-only, including efficiency testing and alternative packaging. Full underlying NSF standard not independently appraised."
		}
	]
};
