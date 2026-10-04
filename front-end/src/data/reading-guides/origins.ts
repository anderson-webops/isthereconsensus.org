import type { ReadingGuideContent } from "./types";

export const originsEvidenceGuide: ReadingGuideContent = {
	takeaway:
		"A fossil headline is a chain of claims: what survived, how it was dated, what it can reveal and where the reconstruction stops. Check each link rather than treating one discovery as a complete history of humanity.",
	scope: "An educational guide to fossil, archaeological and ancestry evidence, checked October 4, 2026. It is not a laboratory protocol, medical diet recommendation, individual ancestry assessment or claim about recreating extinct organisms. The linked reviews disclose source access and interpretation limits; independent expert review has not been completed.",
	sections: [
		{
			id: "identify-the-clock",
			title: "1. An age belongs to a material and a clock",
			paragraphs: [
				{
					text: "Suppose a headline says a fossil is millions of years old. Before asking whether you believe the number, ask what was actually measured. It might be the fossil, a volcanic layer above or below it, or another material securely associated with its context. Smithsonian's dating explanation distinguishes clocks suited to different timescales. Carbon dating is not a catch-all name for every radiometric method, so a limit of one clock does not automatically invalidate the others.",
					sources: ["dating"]
				},
				{
					text: "Next separate the measurement from its interpretation. A radiocarbon age needs appropriate calendar calibration, and IntCal20's published scope does not promise that every specimen is usable at the curve's oldest endpoint. For an indirectly dated fossil, the association with the layer matters too. A useful account makes those links explicit and retains an interval or qualification instead of presenting every reported number as a perfectly known date of an organism's death.",
					sources: ["intcal", "dating"]
				}
			]
		},
		{
			id: "separate-the-traits",
			title: "2. Human traits did not arrive as one package",
			paragraphs: [
				{
					text: "Upright walking and major brain enlargement are different evolutionary changes. The Smithsonian's fossil-based timelines place early walking adaptations before the later large increase in brain size. That order is informative without supplying one exact first-walking date or one reason the change occurred. A reconstruction can also retain climbing abilities rather than treating every early upright walker as a modern person in miniature. Ask which movement the anatomy supports, not simply whether the species was 'advanced'.",
					sources: ["walking", "brains"]
				},
				{
					text: "A skull interior supplies another kind of evidence. Gunz and colleagues' endocast study separates brain organization and growth from adult size; an endocast is not the brain itself. If a headline moves from a reconstructed feature to a claim about an individual's intelligence, notice the extra inference. Comparing traits and their dates can improve an evolutionary account without assuming that every change happened together or that every surviving fossil lies on our direct ancestral path.",
					sources: ["endocasts"]
				}
			]
		},
		{
			id: "name-the-ancestry",
			title: "3. A marker lineage is not the whole family tree",
			paragraphs: [
				{
					text: "When a story names a common ancestor, ask which ancestry definition it uses. A mitochondrial lineage follows a restricted maternal path, whereas a family tree includes many parental paths. Imagine tracing only mothers on your own tree: that exercise would not make your other ancestors cease to exist. The distinction explains why mitochondrial Eve is not evidence of the first woman, the only woman alive at the time or the only woman who contributed to later people.",
					sources: ["lineages", "genealogy"]
				},
				{
					text: "The dating question is separate again. Sequence sampling and mutation-rate assumptions affect estimates of when a marker's surviving branches meet. Genealogical models answer a different question and depend on their population assumptions. The linked review does not adopt either historical paper's numbers as fixed present-day dates. Nor does putting the labels Eve and Adam beside one another demonstrate a mating pair: matching names are not evidence that the two ancestry paths identify an original couple.",
					sources: ["lineages", "genealogy"]
				}
			]
		},
		{
			id: "read-ancient-menus",
			title: "4. Ancient foods are evidence, not a modern prescription",
			paragraphs: [
				{
					text: "A food residue can help establish that a plant was used in a particular context. It cannot by itself provide a complete menu or a precise daily calorie share for everyone living there. The Ohalo II cereal evidence and Franchthi/Shanidar plant-food evidence illustrate why pre-farming should not be translated into meat-only. They also illustrate a sampling problem: we observe what survived and was found, not every meal that people prepared over an entire period.",
					sources: ["cereals", "cooking"]
				},
				{
					text: "Taforalt's multi-isotope reconstruction adds a different evidence stream, but its plant-rich interpretation still includes animal foods. Preserve that qualification rather than turning an interesting local result into an ancient vegetarian identity or a universal rule. Then keep a third question separate: whether a present-day diet benefits health requires modern health evidence. Archaeological consumption is neither a clinical trial nor permission to assume that an unfamiliar wild plant is safe to eat.",
					sources: ["taforalt", "cooking"]
				}
			]
		},
		{
			id: "preservation-is-not-a-promise",
			title: "5. Exceptional DNA does not guarantee ordinary recovery",
			paragraphs: [
				{
					text: "An exceptionally old DNA discovery establishes that interpretable material survived in the reported context. It does not give a recovery probability for every fossil of a similar age. The mammoth study and Greenland sediment study concern different materials and preservation histories. Their success is valuable without making preservation of a recognizable shape equivalent to preservation of genetic information. Read the material and context before treating the age in a headline as a universal biological deadline.",
					sources: ["mammoths", "greenland"]
				},
				{
					text: "Also distinguish detecting fragments, assigning them to a lineage, reconstructing an ecosystem and obtaining an intact genome for an individual. Those are not interchangeable achievements. Greenland's environmental record can illuminate a past community without providing every organism's complete genome. The linked review deliberately avoids a fixed universal DNA half-life, a current oldest-record ranking and instructions for obtaining genetic material. A discovery can extend knowledge while leaving these other questions unanswered.",
					sources: ["greenland", "mammoths"]
				}
			]
		},
		{
			id: "keep-the-chain-visible",
			title: "6. Use uncertainty to locate the next question",
			paragraphs: [
				{
					text: "A useful reading habit is to rewrite the claim in four parts: this material, from this context, supports this inference, with these limits. If a limit concerns the sample's age, do not silently transfer it to the ancestry conclusion; if it concerns dietary proportions, do not erase the evidence that a food was present. Different links can have different strengths. The accompanying reviews show those distinctions instead of treating all uncertainty as either complete ignorance or complete certainty.",
					sources: ["dating", "lineages", "taforalt"]
				},
				{
					text: "Finally check what kind of source you are reading. A museum explanation, a primary reconstruction and a model address different needs. Several pages can repeat the same underlying evidence, and a preprint plus its final article is not two independent studies. The site exposes the access limits and absence of independent expert review rather than turning a source count or editorial score into a measured fraction of scientists. Start with the relevant linked question, then follow the actual evidence.",
					sources: ["walking", "genealogy", "taforalt"]
				}
			]
		}
	],
	questions: [
		"Which material and clock establish the age, and how is it associated with the fossil?",
		"Does the observation establish anatomy, behavior or only a more limited reconstruction?",
		"Does common ancestor mean a marker lineage, a genealogy or a population claim?",
		"Is a dietary finding regional presence, an inferred proportion or an actual modern health comparison?",
		"Does an exceptional DNA result concern fragments, an ecosystem or an individual's genome?"
	],
	sources: [
		{
			id: "dating",
			title: "Smithsonian: dating materials and fossil contexts",
			url: "https://humanorigins.si.edu/evidence/dating",
			kind: "Institutional method explanation",
			note: "Clock applicability and fossil-layer association checked. Educational context, not certification of an individual sample or a laboratory protocol."
		},
		{
			id: "intcal",
			title: "IntCal20 atmospheric calendar calibration",
			url: "https://doi.org/10.1017/RDC.2020.41",
			kind: "Primary calibration paper",
			note: "Reference-data and uncertainty scope checked; Northern Hemisphere atmospheric calibration is not a guarantee for every specimen."
		},
		{
			id: "walking",
			title: "Smithsonian: upright walking",
			url: "https://humanorigins.si.edu/human-characteristics/walking-upright",
			kind: "Institutional fossil synthesis",
			note: "Locomotion timeline and retained climbing context checked. Same museum program as the brain page, not an independent researcher poll."
		},
		{
			id: "brains",
			title: "Smithsonian: brain evolution",
			url: "https://humanorigins.si.edu/human-characteristics/brains",
			kind: "Institutional fossil synthesis",
			note: "Chronology of major brain enlargement checked. Does not supply an intelligence ranking for individuals or fossil species."
		},
		{
			id: "endocasts",
			title: "A. afarensis endocasts, organization and growth",
			url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7112758/",
			kind: "Primary fossil reconstruction",
			note: "Original abstract, discussion and disclosures checked through the Europe PMC archive. No independent reconstruction or raw-data reanalysis."
		},
		{
			id: "lineages",
			title: "Poznik et al.: inherited lineage coalescence",
			url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC4032117/",
			kind: "Primary ancestry study",
			note: "Lineage definitions, sampling and calibration dependence checked. Historical numerical dates are not adopted as fixed current estimates."
		},
		{
			id: "genealogy",
			title: "Rohde et al.: structured genealogical models",
			url: "https://www.nature.com/articles/nature02842",
			kind: "Primary modeling paper",
			note: "Abstract, model scope and disclosures checked; full model and supplements not independently audited. Not a mitochondrial date measurement."
		},
		{
			id: "cereals",
			title: "Ohalo II wild-cereal residues",
			url: "https://www.nature.com/articles/nature02734",
			kind: "Primary archaeological paper",
			note: "Abstract, context and disclosures checked; subscription body not fully reviewed. Local food-use evidence, not a complete diet or health trial."
		},
		{
			id: "cooking",
			title: "Franchthi and Shanidar plant-food remains",
			url: "https://doi.org/10.15184/aqy.2022.143",
			kind: "Primary archaeological paper",
			note: "Original publisher PDF checked for regional context, preservation limits and funding. No recipe or wild-food safety inference provided."
		},
		{
			id: "taforalt",
			title: "Taforalt dietary isotope reconstruction",
			url: "https://www.nature.com/articles/s41559-024-02382-z",
			kind: "Primary multi-isotope study",
			note: "Publisher PDF checked for plant reliance, animal-food qualification and disclosures. Preprint and final article are one study, not two votes."
		},
		{
			id: "mammoths",
			title: "Ancient mammoth genetic evidence",
			url: "https://www.nature.com/articles/s41586-021-03224-9",
			kind: "Primary palaeogenomic paper",
			note: "Abstract, specimen context and disclosures checked; subscription methods not fully reviewed. Exceptional recovery, not a universal success rate."
		},
		{
			id: "greenland",
			title: "Greenland's ancient environmental record",
			url: "https://www.nature.com/articles/s41586-022-05453-y",
			kind: "Primary environmental reconstruction",
			note: "Geological age, preservation interpretation and disclosures checked. Sediment fragments do not establish intact genomes for every organism."
		}
	]
};
