import type { ReadingGuideContent } from "./types";

export const evolutionGuide: ReadingGuideContent = {
	takeaway:
		"Evolution describes heritable change across generations and the branching history of life. Common ancestry, natural selection, and random genetic drift are related ideas, but they answer different questions. Evidence comes from observations, genetics, and fossils, not the word ‘theory’ alone.",
	scope: "An introduction to the biological evidence and common misunderstandings, not a complete history of life. It does not use biological findings to assign moral worth or prescribe social policy. Details of particular evolutionary histories can remain uncertain without undoing the broader evidence.",
	sections: [
		{
			id: "across-generations",
			title: "Populations change across generations",
			paragraphs: [
				{
					text: "Berkeley's Understanding Evolution defines biological evolution in terms of inherited change across generations. An individual becoming stronger through exercise or adjusting to a season is not, by itself, evidence that the population evolved. The key question is whether heritable characteristics changed in the population over generations. This distinction also prevents a common mistake: assuming that an organism's need automatically creates a useful inherited trait that it can pass to its offspring.",
					sources: ["inheritance"]
				}
			]
		},
		{
			id: "mechanisms",
			title: "Random variation does not make the whole process random",
			paragraphs: [
				{
					text: "Natural selection concerns differences in survival and reproduction associated with heritable traits in a particular environment. Mutations do not arise because an organism knows which change it needs. Yet the sorting of variants through selection is not equivalent to drawing survivors without regard to their traits. Genetic drift is different: chance can also change how common variants become. Evolution is therefore neither entirely random nor a plan that anticipates future needs.",
					sources: ["misconceptions"]
				},
				{
					text: "In science, a theory is an explanatory framework that can organize observations and generate testable expectations, not simply an unsupported guess. Evolutionary theory does not require every feature to be a perfect adaptation or every historical detail to be known. The claim ‘scientists debate this branch of the family tree’ must be distinguished from the much broader claim that there is no evidence for evolutionary change or shared ancestry.",
					sources: ["misconceptions"]
				}
			]
		},
		{
			id: "branching-history",
			title: "Living chimpanzees are relatives, not our ancestors",
			paragraphs: [
				{
					text: "Smithsonian's human-origins explanation compares genetic relationships among humans and other primates. Humans share a common ancestor with chimpanzees and bonobos; we did not descend from chimpanzees living today. Both lineages have histories after their divergence. A family tree is a branching model, not a ladder on which each living species is waiting to become the next. DNA similarity percentages also depend on what differences are counted, so an isolated percentage is not a complete account of biological kinship.",
					sources: ["genetics"]
				}
			]
		},
		{
			id: "observable-change",
			title: "Antibiotic resistance makes inherited change consequential",
			paragraphs: [
				{
					text: "CDC explains that antimicrobial exposure can favor resistant microbes that survive, multiply, and spread. Resistance traits can be carried in DNA and can also move between microbes. The resistance belongs to the microbes, not to a person's body becoming resistant to the medicine. This is a practical example of why inherited variation and changing populations matter outside a discussion of ancient fossils. It does not imply that every resistance mechanism originated during one patient's treatment.",
					sources: ["resistance"]
				}
			]
		},
		{
			id: "independent-evidence",
			title: "Different evidence answers different parts of the history",
			paragraphs: [
				{
					text: "Smithsonian distinguishes fossil evidence about physical form and timing, artifacts that illuminate behavior, and genetic evidence about relationships and population history. These records are complementary, not interchangeable. A stone tool cannot supply the same information as a genome, and a living genome is not a photograph of an ancient organism. A stronger explanation connects independent observations while stating where the record remains incomplete. Finding a new fossil can revise a particular relationship or date without making the existence of evolution an open question.",
					sources: ["evidence"]
				}
			]
		},
		{
			id: "reading-exercise",
			title: "Replace a story about purpose with a testable explanation",
			paragraphs: [
				{
					text: "An original reading exercise: a headline says an organism ‘evolved a trait because it wanted to survive.’ Rewrite it as questions. What inherited differences existed? Did they affect reproduction in the environment studied? Could chance or movement between populations explain the change? What observations would distinguish these possibilities? The exercise does not decide the answer in advance. It turns a memorable story into a claim that can be checked against evidence rather than intention attributed to nature.",
					sources: []
				}
			]
		}
	],
	questions: [
		"Is this inherited population change or change within one individual?",
		"Is the proposed mechanism selection, drift, or something else?",
		"Does the family-tree claim confuse a common ancestor with a living species?",
		"Which observations support the explanation, and which details remain unresolved?"
	],
	sources: [
		{
			id: "inheritance",
			title: "UC Berkeley: Descent with modification",
			url: "https://evolution.berkeley.edu/evolution-101/mechanisms-the-processes-of-evolution/descent-with-modification/",
			kind: "University science education",
			note: "Inherited change across generations checked. Individual development and evolutionary population change are distinguished."
		},
		{
			id: "misconceptions",
			title: "UC Berkeley: Misconceptions about evolution",
			url: "https://evolution.berkeley.edu/teach-evolution/misconceptions-about-evolution/",
			kind: "University science education",
			note: "Selection, chance, adaptation, and scientific-theory explanations checked. The guide does not claim every historical detail is settled."
		},
		{
			id: "genetics",
			title: "Smithsonian Human Origins: Genetics",
			url: "https://humanorigins.si.edu/evidence/genetics",
			kind: "Institutional evidence explanation",
			note: "Primate relationships and the dependence of DNA percentages on comparison methods checked. No universal similarity percentage is asserted."
		},
		{
			id: "resistance",
			title: "CDC: About antimicrobial resistance",
			url: "https://www.cdc.gov/antimicrobial-resistance/about/index.html",
			kind: "Public health mechanism explanation",
			note: "Selection, inheritance, and spread of resistance traits checked. This is not advice to alter an antibiotic prescription."
		},
		{
			id: "evidence",
			title: "Smithsonian Human Origins: Evidence",
			url: "https://humanorigins.si.edu/evidence",
			kind: "Institutional evidence overview",
			note: "The roles of fossils, artifacts, and genetics checked. This introductory guide does not reconstruct individual fossil lineages."
		}
	]
};
