import type { CompleteSeedClaim } from "./claims.js";

const preparedAt = "2026-09-13T02:59:43.000Z";
type Source = CompleteSeedClaim["sources"][number];
const noticeChecks: Record<string, string> = {
	"10.17226/11876": "2026-09-13T02:59:03.835Z",
	"10.1126/science.1070315": "2026-09-13T02:59:08.466Z",
	"10.1038/nature04639": "2026-09-13T02:59:11.275Z"
};
const additions: Source[] = [
	{
		kind: "landmark_study",
		title: "Unpredictable Evolution in a 30-Year Study of Darwin's Finches",
		publisher: "Science",
		year: 2002,
		url: "https://faculty.uca.edu/benw/biol4415/papers/GrantGrant2002b.pdf",
		doi: "10.1126/science.1070315",
		pmid: "11976447",
		stance: "supports",
		order: 4,
		note: "University-hosted original scan: selected design, findings, figures, limitations and support on printed pages 707, 709 and 711 visually assessed. Not every page, underlying dataset or analysis independently appraised."
	},
	{
		kind: "landmark_study",
		title: "A Devonian tetrapod-like fish and the evolution of the tetrapod body plan",
		publisher: "Nature",
		year: 2006,
		url: "https://pubmed.ncbi.nlm.nih.gov/16598249/",
		doi: "10.1038/nature04639",
		pmid: "16598249",
		stance: "supports",
		order: 5,
		note: "Original author abstract and bibliographic record assessed through PubMed. Publisher retrieval failed and two university full-text links returned 404. Full methods, figures, character coding, supplements and disclosures not appraised."
	}
];

export function refreshEvolutionClaim(seed: CompleteSeedClaim): CompleteSeedClaim {
	if (seed.topicSlug !== "biology-and-evolution" || seed.slug !== "is-evolution-just-a-theory") return seed;
	const announcement: NonNullable<CompleteSeedClaim["readerAnnouncement"]> = {
		id: "13787386-07e3-44bc-846c-17c2959eaee9",
		date: preparedAt,
		kind: "evidence_update",
		bottomLineImpact: "unchanged",
		summary: "Added observable finch changes and a fossil example, separating evidence from terminology, broad evolutionary explanations from specific predictions, and transitional traits from a proven direct ancestor."
	};
	return {
		...seed,
		bottomLine: "No. Evolution is not merely a guess: it is a well-supported explanation of biological change and common ancestry. Calling something a theory does not establish its truth; evidence does. Modern observations and historical traces test different parts of that explanation, while many details of particular lineages remain open to revision.",
		stableCore: [
			"A scientific theory explains observations; it is not a stage that eventually graduates into a fact or law.",
			"Changes within populations can be observed over generations, while past relationships are inferred from surviving evidence.",
			"Natural selection is important, but evolutionary explanation also includes processes such as genetic drift and gene flow. Not every trait is an adaptation.",
			"A strong general explanation does not guarantee that every proposed mechanism, family tree or long-range forecast is correct."
		],
		openQuestions: [
			"How do the contributions of different processes vary between populations and through time?",
			"Which branching relationships and trait histories will new fossils or better analyses revise?",
			"How far can predictions extend when environments and population histories change?"
		],
		whatWouldChangeMinds: [
			"Repeated, well-verified contradictions that a competing testable explanation accounts for better across independent evidence streams.",
			"A revised fossil placement or a failed narrow prediction can change a specific account without invalidating every evolutionary explanation."
		],
		misconceptions: [
			"The scientific label is not proof by itself, and an institutional statement does not replace evidence.",
			"A transitional fossil need not be a demonstrated direct ancestor of a living species.",
			"An incomplete fossil record and uncertainty about a branch are not equivalent to having no evidence.",
			"Evolution is not a ladder toward superior organisms, and individuals do not acquire inherited adaptations simply because they need them."
		],
		editorSummary: "The earlier answer relied mainly on the meaning of theory and institutional statements. The revision connects that explanation to two concrete evidence types and their limits. It is a conceptual review, not a duplicate fossil catalog, a complete phylogenetic analysis or a guide to manipulating organisms.",
		uncertaintySummary: "High overall certainty is an editorial judgment about the broad explanation, not a new formal evidence grade. Individual examples remain unrated. The agreement label is not a newly measured survey, and the selected studies do not independently establish every evolutionary claim.",
		uncertaintyDrivers: [
			{ type: "generalizability", detail: "An island population and one fossil discovery are examples, not a complete sample of biological history." },
			{ type: "timing", detail: "Long-term trajectories depend on future environmental conditions that are not fully predictable." },
			{ type: "other", detail: "Fossil preservation, character interpretation and incomplete access limit scrutiny of specific historical reconstructions." }
		],
		evidenceCertainty: "high",
		reviewMode: "living",
		searchCutoffAt: preparedAt,
		lastRetractionCheckAt: "2026-09-13T02:59:11.275Z",
		searchDatabases: [
			"Targeted original educational synthesis, field observations and fossil report; not an exhaustive systematic search",
			"Consensus discovery, fetched records and original-source verification",
			"Crossref and Europe PMC publication-notice metadata"
		],
		inclusionRules: [
			"Explain what was observed, what was inferred and which proposition an example supports.",
			"Preserve publication dates, access limitations and uncertainty about specific predictions."
		],
		exclusionRules: [
			"Do not mistake a fossil's intermediate traits for proof of direct ancestry or a fixed evolutionary ladder.",
			"Do not turn a conceptual explanation into experimental biological instructions."
		],
		appraisalTools: ["Narrative assessment of observation, inference, generalization and access; no independent formal risk-of-bias or character-matrix appraisal"],
		authorLine: "Source-controlled synthesis prepared with AI assistance.",
		reviewerLine: "Scoped source verification; no independent expert approval recorded.",
		coiSummary: "Grant and Grant acknowledge McGill University, NSERC and NSF support; the selected scan does not establish a modern no-conflicts declaration. The National Academies report identifies Council, Christian A. Johnson Endeavor Foundation and Biotechnology Institute support. The fossil abstract does not expose full disclosures. These are reported funding/access observations, not an independent conflicts audit.",
		independenceSummary: "Repeated annual observations of the same finch populations are not separate independent replications. The fossil record and educational statements have different evidential roles. Five successful notice checks found no registered updates across three DOIs; Europe PMC did not index the book. None of these metadata outcomes certifies scientific validity.",
		institutionalAnchors: [],
		evidenceSummaries: [
			{
				question: "What does theory mean in this question?",
				population: "National Academies 2008 explanatory synthesis, printed page 11",
				finding: "The report distinguishes explanatory frameworks from observations and describes evolution as both a well-supported account and an established occurrence. Its account still permits refinement rather than claiming completeness.",
				effectDirection: "supports",
				magnitude: "A clarification of scientific reasoning, not a numerical effect estimate.",
				limitations: ["The publication is from 2008. Selected conceptual sections and funding were assessed, not every example, illustration or underlying reference."]
			},
			{
				question: "Can change actually be observed in the wild?",
				population: "Grant and Grant 2002: two finch populations on Daphne Major over 1972–2001",
				finding: "Body and beak traits changed repeatedly. Selection varied through time, and occasional natural interbreeding also contributed. Some short-term responses were predictable, but the final state was not predictable at the outset.",
				effectDirection: "supports",
				magnitude: "Repeated population observations, not a universal rate of evolution.",
				limitations: ["Successive yearly samples were not independent, some traits were correlated, and an island study cannot alone reconstruct all common ancestry."]
			},
			{
				question: "What does a fossil contribute that living observations do not?",
				population: "Daeschler and colleagues 2006: Late Devonian fish fossils from Arctic Canada",
				finding: "The reported animal, Tiktaalik, combined scales and fin rays with features such as a mobile neck and wrist-like joint. This combination informs the transition of body features between fish and limbed vertebrates.",
				effectDirection: "supports",
				magnitude: "An anatomical and historical inference, not direct observation of an ancestor giving rise to a descendant.",
				limitations: ["Only the original author abstract was available for this assessment. It does not independently establish a complete sequence, exact ancestry or every proposed habitat interpretation."]
			},
			{
				question: "Does uncertainty about a detail undermine the whole explanation?",
				population: "UC Berkeley's original educational guidance on evidence and evolutionary trees",
				finding: "The resource distinguishes incomplete knowledge from no support and branching relationships from a ladder of progress. These distinctions help readers identify whether new evidence challenges a particular reconstruction or the broader framework.",
				effectDirection: "supports",
				magnitude: "Interpretive guidance, not additional participants or fossils.",
				limitations: ["Selected misconceptions and tree explanations were read; linked lessons and research references were not all assessed. No new publication date is inferred from access."]
			}
		],
		surveillanceSpec: {
			focus: "Evidence for evolution, explanatory limits and public misconceptions",
			cadenceDays: 365,
			watchTerms: ["evolution natural populations long term observations", "tetrapod transition fossil phylogeny correction", "evolution scientific theory misconceptions"],
			integrityMonitors: ["Crossref and Europe PMC publication-notice metadata", "Original publisher corrections"],
			guidelineMonitors: ["National Academies and UC Berkeley educational resources"],
			triggerRules: ["Review material corrections or findings that change an included example; keep the coverage conceptual and observational."]
		},
		sources: [
			...seed.sources.map((source): Source => ({
				...source,
				appraisal: "not_appraised",
				isAnchor: false,
				citationCheckedAt: source.doi ? noticeChecks[source.doi.toLowerCase()] : source.citationCheckedAt,
				note: source.doi
					? "Original 2008 book via a museum-hosted PDF: selected conceptual passages on printed pages 11 and 39 plus funding assessed. The current publisher reader exposed no chapter body. Not a full reappraisal of the book or its references."
					: source.publisher === "American Association for the Advancement of Science"
						? "Original citation and 2006 date retained. Current full-text retrieval failed; an indexed primary-source snippet corroborates the date but is not a fresh full assessment. No new integrity-check date inferred."
						: "Selected original explanations of theory, evidence, mechanisms and evolutionary trees read. Linked lessons and every example not appraised; no new publication date inferred."
			})),
			...additions.map((source): Source => ({
				...source,
				appraisal: "not_appraised",
				isAnchor: false,
				citationStatus: "current",
				citationCheckedAt: noticeChecks[source.doi!.toLowerCase()]
			}))
		],
		readerAnnouncement: announcement,
		changeLog: [...seed.changeLog, { date: preparedAt, kind: "update", summary: announcement.summary }]
	};
}
