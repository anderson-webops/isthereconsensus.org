import type { ClaimConsensusBand, ClaimStatus } from "../models/schemas/Claim.js";
import type { ClaimSourceKind, ClaimSourceStance } from "../models/schemas/ClaimSource.js";

interface SeedClaimSource {
	kind: ClaimSourceKind;
	title: string;
	publisher: string;
	stance: ClaimSourceStance;
	note: string;
	order: number;
}

export interface SeedClaim {
	topicSlug: string;
	title: string;
	slug: string;
	status: ClaimStatus;
	consensusBand: ClaimConsensusBand;
	confidenceScore: number;
	bottomLine: string;
	stableCore: string[];
	openQuestions: string[];
	whatWouldChangeMinds: string[];
	misconceptions: string[];
	editorSummary: string;
	sources: SeedClaimSource[];
}

export const defaultClaims: SeedClaim[] = [
	{
		topicSlug: "health-and-medicine",
		title: "Do childhood vaccines cause autism?",
		slug: "do-childhood-vaccines-cause-autism",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"No. Large epidemiological studies and major public-health bodies agree that childhood vaccines do not cause autism. The timing overlap between vaccination and autism diagnosis does not establish causation.",
		stableCore: [
			"Vaccine schedules have been studied across very large populations without finding a causal autism signal.",
			"Autism traits typically become noticeable around the same age vaccines are administered, which makes correlation easy to overread.",
			"Safety monitoring continues, but the core autism claim is treated as settled by major health institutions."
		],
		openQuestions: [
			"How can public-health communication address anxiety without accidentally amplifying the myth?",
			"Which trust-building interventions work best in communities that already distrust medical institutions?"
		],
		whatWouldChangeMinds: [
			"Repeated, well-designed evidence across independent populations showing a replicable causal pathway.",
			"A credible mechanism that survives epidemiology, pharmacovigilance, and replication."
		],
		misconceptions: [
			"Temporal sequence is often mistaken for causation because autism signs emerge in early childhood.",
			"Individual anecdotes can feel decisive even when large population data show no causal relationship."
		],
		editorSummary:
			"This is a flagship example of a strong public-health consensus with a persistent gap between expert evidence and public belief.",
		sources: [
			{
				kind: "guideline",
				title: "CDC vaccine safety guidance",
				publisher: "CDC",
				stance: "supports",
				note: "Used to anchor current public-health guidance and safety summaries.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "WHO vaccine safety resources",
				publisher: "World Health Organization",
				stance: "supports",
				note: "Useful for international consensus framing and public-health messaging.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Large pooled epidemiological studies on vaccines and autism",
				publisher: "Evidence synthesis",
				stance: "supports",
				note: "The key source type for separating anecdote from broad population outcomes.",
				order: 3
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Is recent global warming mainly caused by human activity?",
		slug: "is-recent-global-warming-mainly-caused-by-human-activity",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"Yes. The current scientific consensus is that recent global warming is driven primarily by human greenhouse gas emissions, especially from fossil fuels.",
		stableCore: [
			"Greenhouse gases trap heat, and human activity has sharply raised atmospheric concentrations.",
			"Instrumental records, climate models, and paleoclimate evidence converge on the same broad explanation.",
			"The serious debate is mostly about timing, impacts, and feedback size, not about whether human-caused warming is real."
		],
		openQuestions: [
			"How fast will specific regional impacts unfold under different emissions paths?",
			"Which feedback loops will matter most at local scales and over which time horizons?"
		],
		whatWouldChangeMinds: [
			"A better model that explains the observed warming trend without requiring anthropogenic greenhouse forcing.",
			"Robust contradictory evidence across atmospheric physics, instrumental data, and attribution studies."
		],
		misconceptions: [
			"A cold day or cold winter is often mistaken for evidence against long-term warming trends.",
			"Public discussions regularly treat fringe contrarian voices as if they reflected the center of the expert literature."
		],
		editorSummary:
			"This should be treated as a canonical strong-consensus page where public misunderstanding comes largely from media distortion and fake-expert framing.",
		sources: [
			{
				kind: "consensus_statement",
				title: "IPCC assessment reports",
				publisher: "IPCC",
				stance: "supports",
				note: "The main synthesis resource for the full climate evidence stack.",
				order: 1
			},
			{
				kind: "guideline",
				title: "NASA and NOAA climate summaries",
				publisher: "NASA / NOAA",
				stance: "supports",
				note: "Useful for observational records and clear public-facing summaries.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Consensus-in-the-literature assessments",
				publisher: "Peer-reviewed literature",
				stance: "supports",
				note: "Useful when showing how agreement is measured among domain experts.",
				order: 3
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Are dietary cholesterol and saturated fat the same kind of risk?",
		slug: "are-dietary-cholesterol-and-saturated-fat-the-same-kind-of-risk",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 78,
		bottomLine:
			"No. The current picture is more nuanced than older public advice suggested. Saturated fat still matters for cardiovascular risk, but dietary cholesterol is not a one-to-one proxy for blood cholesterol in the way many people were taught.",
		stableCore: [
			"Extremely high intakes remain a bad idea, but the risk story is more complex than 'all cholesterol in food is dangerous.'",
			"Saturated fat still carries more weight in current cardiovascular guidance than dietary cholesterol alone.",
			"Nutritional headlines often overstate findings from observational studies that cannot cleanly isolate cause."
		],
		openQuestions: [
			"How much do individual metabolic differences change the effect of specific foods?",
			"Which substitution patterns matter most in real diets, not just isolated nutrients?"
		],
		whatWouldChangeMinds: [
			"Large, better-controlled dietary evidence that shifts the size or direction of observed cardiovascular risk.",
			"A clearer mechanistic and clinical picture linking intake patterns to long-term outcomes across diverse populations."
		],
		misconceptions: [
			"Old nutrition messaging left many people with the impression that all fats and all cholesterol behave the same way.",
			"Single nutrition studies are often reported as if they erase decades of guidance all at once."
		],
		editorSummary:
			"This page should show how real scientific updating works: the broad dietary picture changes by refinement more often than by total reversal.",
		sources: [
			{
				kind: "guideline",
				title: "AHA and ACC dietary guidance",
				publisher: "AHA / ACC",
				stance: "supports",
				note: "Important for cardiovascular framing and public-health guidance.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Systematic reviews on saturated fat and cardiovascular outcomes",
				publisher: "Evidence synthesis",
				stance: "supports",
				note: "Useful for separating nutrient panic from evidence-based risk assessment.",
				order: 2
			}
		]
	},
	{
		topicSlug: "biology-and-evolution",
		title: "Is evolution 'just a theory'?",
		slug: "is-evolution-just-a-theory",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"No. In science, a theory is a well-supported explanatory framework, not a casual guess. Evolution by common descent and natural selection is one of the core organizing theories of modern biology.",
		stableCore: [
			"The scientific meaning of theory is much stronger than the everyday meaning.",
			"Fossils, genetics, comparative anatomy, and biogeography all converge on common descent.",
			"Debates inside evolutionary biology usually concern mechanisms, rates, and details, not whether evolution happened."
		],
		openQuestions: [
			"Which evolutionary mechanisms dominate in specific edge cases or time scales?",
			"How should educators explain theory in a way that avoids everyday-language confusion?"
		],
		whatWouldChangeMinds: [
			"Repeated evidence that fundamentally breaks common descent across independent lines of biological data.",
			"A better framework that explains the fossil, genetic, and comparative record more successfully."
		],
		misconceptions: [
			"The phrase 'just a theory' imports the everyday meaning of theory into a technical scientific context.",
			"People sometimes expect an impossibly complete fossil record before accepting a historical scientific explanation."
		],
		editorSummary:
			"This claim is useful for teaching both the public meaning of theory and the difference between impossible expectations and legitimate scientific scrutiny.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Major biology society statements on evolution",
				publisher: "Scientific societies",
				stance: "supports",
				note: "Useful for clarifying that this is a foundational biological consensus, not a marginal view.",
				order: 1
			},
			{
				kind: "context",
				title: "Comparative genetics and fossil evidence overviews",
				publisher: "Biology education references",
				stance: "supports",
				note: "Helpful when explaining why the evidence is cumulative across multiple fields.",
				order: 2
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Do learning styles improve educational outcomes?",
		slug: "do-learning-styles-improve-educational-outcomes",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 88,
		bottomLine:
			"Not in the way the popular myth suggests. There is no strong evidence that matching instruction to a student's self-described learning style reliably improves outcomes.",
		stableCore: [
			"The learning-styles idea is intuitive, but it has not held up well under stronger testing.",
			"Students may have preferences, but preference is not the same thing as evidence for better learning.",
			"Instructional quality and content structure matter more than sorting students into fixed sensory categories."
		],
		openQuestions: [
			"Which evidence-based teaching adaptations matter most for specific subjects and age groups?",
			"How can educators replace the learning-styles myth with strategies that are actually supported?"
		],
		whatWouldChangeMinds: [
			"Repeated controlled evidence showing that matching instruction to declared styles produces reliable performance gains.",
			"A stronger framework that distinguishes preference from measurable learning benefit."
		],
		misconceptions: [
			"The idea survives partly because people like personality categories that feel personal and intuitive.",
			"Teacher training often repeated the concept long after the research support failed to materialize."
		],
		editorSummary:
			"This is a flagship neuromyth page. It should model how an intuitive idea can spread widely without earning strong empirical support.",
		sources: [
			{
				kind: "systematic_review",
				title: "Educational reviews on learning styles",
				publisher: "Education research",
				stance: "supports",
				note: "Useful for showing that the empirical case for style-matching remains weak.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Psychology and education commentary on neuromyths",
				publisher: "Behavioral science references",
				stance: "context",
				note: "Helpful for explaining why the myth persists despite weak evidence.",
				order: 2
			}
		]
	},
	{
		topicSlug: "health-and-medicine",
		title: "Does antibiotic overuse drive antibiotic resistance?",
		slug: "does-antibiotic-overuse-drive-antibiotic-resistance",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 97,
		bottomLine:
			"Yes. Overuse and misuse of antibiotics accelerate antimicrobial resistance, which is why stewardship is treated as a core public-health priority by major medical institutions.",
		stableCore: [
			"Antibiotic exposure creates selection pressure that helps resistant strains spread.",
			"Resistance is a population-level problem driven by clinical overuse, agricultural use, and weak stewardship systems.",
			"Experts are not debating whether resistance is real; they are debating which interventions work best in different settings."
		],
		openQuestions: [
			"Which stewardship interventions reduce unnecessary prescribing most effectively across different health systems?",
			"How should policy balance immediate treatment needs with long-term resistance pressure?"
		],
		whatWouldChangeMinds: [
			"Robust evidence showing that common patterns of antibiotic overuse do not create measurable resistance pressure in the real world.",
			"A stronger alternative model that explains the global resistance trend without antibiotic selection pressure."
		],
		misconceptions: [
			"People often treat resistance as if the patient's body becomes resistant rather than the microbes.",
			"Individual misuse can feel trivial even though the core harm appears at the population level."
		],
		editorSummary:
			"This is a strong-consensus health page where the basic mechanism is settled and the live debate is mostly about implementation and stewardship design.",
		sources: [
			{
				kind: "guideline",
				title: "CDC antimicrobial resistance guidance",
				publisher: "CDC",
				stance: "supports",
				note: "Useful for public-health framing and current stewardship guidance.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "WHO antimicrobial resistance resources",
				publisher: "World Health Organization",
				stance: "supports",
				note: "Useful for the global burden and international consensus on stewardship.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Reviews on stewardship interventions and resistance outcomes",
				publisher: "Evidence synthesis",
				stance: "supports",
				note: "Helpful for showing that the question is about reducing a known risk, not discovering whether the risk exists.",
				order: 3
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Does saturated fat still raise LDL and heart risk?",
		slug: "does-saturated-fat-still-raise-ldl-and-heart-risk",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 84,
		bottomLine:
			"Yes, in the broad mainstream view. Major cardiovascular guidelines still treat saturated fat reduction as a useful way to lower LDL cholesterol and reduce long-term cardiovascular risk, even though nutrition research contains real nuance and substitution effects matter.",
		stableCore: [
			"Saturated fat raises LDL in ways that still matter to current cardiovascular guidance.",
			"The strongest nutrition questions usually depend on what replaces the saturated fat, not on pretending the whole issue disappeared.",
			"New nutrition papers often refine risk estimates or subgroups rather than overturning the broad lipid-and-cardiovascular picture."
		],
		openQuestions: [
			"Which replacement patterns matter most for people at different baseline risk levels?",
			"How should nutrition communication separate mechanistic certainty from messier real-world diet patterns?"
		],
		whatWouldChangeMinds: [
			"A large, durable body of evidence showing lower cardiovascular events despite high saturated fat intake and unchanged or lower-risk lipid profiles.",
			"A stronger model that explains current LDL and cardiovascular findings without saturated fat playing the role assigned in major guidelines."
		],
		misconceptions: [
			"People often hear 'the topic is more nuanced' as if it means the core risk disappeared.",
			"Nutrition headlines regularly hide what food or nutrient is actually replacing the saturated fat in question."
		],
		editorSummary:
			"This page should model how to explain a broad mainstream conclusion without pretending nutrition science is cleaner than it is.",
		sources: [
			{
				kind: "guideline",
				title: "American Heart Association dietary guidance",
				publisher: "AHA",
				stance: "supports",
				note: "Important for the current mainstream cardiovascular baseline.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Systematic reviews on saturated fat, LDL, and cardiovascular outcomes",
				publisher: "Evidence synthesis",
				stance: "supports",
				note: "Useful for separating the broad consensus from narrower controversies over diet pattern and substitution.",
				order: 2
			},
			{
				kind: "context",
				title: "Nutrition journalism and guideline interpretation pieces",
				publisher: "Context references",
				stance: "context",
				note: "Helpful for showing why the public often experiences this topic as a series of fake reversals.",
				order: 3
			}
		]
	},
	{
		topicSlug: "nutrition-and-diet",
		title: "Do dietary supplements usually improve health in otherwise healthy adults?",
		slug: "do-dietary-supplements-usually-improve-health-in-healthy-adults",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 82,
		bottomLine:
			"Usually not. For otherwise healthy adults without a documented deficiency or specific medical indication, most supplements do not have strong evidence for broad health improvement and some can cause harm or waste money.",
		stableCore: [
			"Supplements can matter when a deficiency, pregnancy, disease state, or clinician guidance makes them relevant.",
			"The broad mainstream view is not that supplements are useless in every case; it is that they are often oversold for general wellness.",
			"Marketing language often outruns what trials and reviews actually support."
		],
		openQuestions: [
			"Which subgroups truly benefit from targeted supplementation beyond standard deficiency treatment?",
			"How should public guidance balance low-probability harms, placebo effects, and consumer demand?"
		],
		whatWouldChangeMinds: [
			"Repeated, high-quality trials showing broad long-term benefit in otherwise healthy adults without targeted indications.",
			"A stronger evidence base showing that commonly marketed supplement stacks improve meaningful clinical outcomes."
		],
		misconceptions: [
			"'Natural' is often treated like proof of safety or effectiveness.",
			"People often mistake biochemical plausibility for demonstrated benefit in real humans."
		],
		editorSummary:
			"This is a useful nutrition page for separating deficiency treatment and targeted clinical use from the much broader wellness marketing around supplements.",
		sources: [
			{
				kind: "guideline",
				title: "NIH Office of Dietary Supplements fact sheets and evidence summaries",
				publisher: "NIH",
				stance: "supports",
				note: "Useful for separating established indications from overgeneralized claims.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Reviews on multivitamins and supplement outcomes in general populations",
				publisher: "Evidence synthesis",
				stance: "supports",
				note: "Helpful when summarizing the broad lack of benefit for healthy adults without specific indications.",
				order: 2
			}
		]
	},
	{
		topicSlug: "climate-and-environment",
		title: "Is nuclear power more dangerous than fossil-fuel energy?",
		slug: "is-nuclear-power-more-dangerous-than-fossil-fuel-energy",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 83,
		bottomLine:
			"No, not in the way public fear often suggests. Major energy and climate analyses treat nuclear power as a low-carbon source with risks that are real but generally smaller than the sustained health and climate harms tied to fossil-fuel energy.",
		stableCore: [
			"Nuclear accidents are dramatic and memorable, but routine fossil-fuel pollution kills far more people over time.",
			"Nuclear power is usually treated as low-carbon in climate mitigation analyses.",
			"The live debates are more about cost, waste handling, build timelines, and governance than about whether fossil fuels are safer overall."
		],
		openQuestions: [
			"Which energy mixes are most realistic under different grid, cost, and political constraints?",
			"How should countries weigh build speed, waste policy, and local safety culture when comparing low-carbon options?"
		],
		whatWouldChangeMinds: [
			"Robust comparative evidence showing nuclear's full health and climate burden exceeds the fossil-fuel alternatives it replaces.",
			"A stronger systems analysis demonstrating that nuclear's risks systematically outweigh its low-carbon benefits under modern operating conditions."
		],
		misconceptions: [
			"People often compare the vivid image of a rare nuclear disaster to the invisible background damage of air pollution.",
			"Arguments about waste, weapons, cost, and corruption are often blended into the narrower empirical question of comparative public-health harm."
		],
		editorSummary:
			"This claim is useful because it separates visceral public fear from comparative risk and climate evidence.",
		sources: [
			{
				kind: "consensus_statement",
				title: "IPCC energy-system assessments",
				publisher: "IPCC",
				stance: "supports",
				note: "Useful for comparing low-carbon pathways and energy-system tradeoffs.",
				order: 1
			},
			{
				kind: "guideline",
				title: "IAEA safety and nuclear energy overviews",
				publisher: "IAEA",
				stance: "supports",
				note: "Important for operational safety framing and reactor context.",
				order: 2
			},
			{
				kind: "context",
				title: "Comparative energy mortality analyses",
				publisher: "Energy and public-health research",
				stance: "supports",
				note: "Helpful for comparing routine fossil-fuel harms to nuclear risk in the same frame.",
				order: 3
			}
		]
	},
	{
		topicSlug: "genetics-and-biotechnology",
		title: "Are commercial GMO foods unsafe to eat?",
		slug: "are-commercial-gmo-foods-unsafe-to-eat",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 92,
		bottomLine:
			"No. Major scientific and public-health bodies treat currently approved GMO foods as no more inherently dangerous to eat than comparable conventional foods, even though broader agricultural and policy debates remain active.",
		stableCore: [
			"Safety assessment is done product by product rather than by assuming every GMO is identical.",
			"Approved GM foods have not earned a scientific consensus that they are uniquely harmful to human health.",
			"Health-risk arguments should be separated from wider debates about pesticides, patents, and agricultural policy."
		],
		openQuestions: [
			"How should regulation communicate differences between consumer safety, ecological impact, and economic power?",
			"Which biotechnology governance models best handle future gene-editing applications?"
		],
		whatWouldChangeMinds: [
			"Repeated, high-quality evidence showing approved GM foods create reproducible health harms not seen in comparable conventional foods.",
			"A stronger model demonstrating that existing safety review systems systematically miss important risks."
		],
		misconceptions: [
			"'GMO' is often used as if it names one single hazard rather than a broad class of techniques and products.",
			"Arguments about industrial agriculture are often treated like direct proof that the food itself is unsafe."
		],
		editorSummary:
			"This page should separate biotechnology safety from the broader political and ecological debates that often get bundled into the same public argument.",
		sources: [
			{
				kind: "consensus_statement",
				title: "WHO and FAO statements on approved GM food safety",
				publisher: "WHO / FAO",
				stance: "supports",
				note: "Useful for an international baseline on current safety assessments.",
				order: 1
			},
			{
				kind: "guideline",
				title: "National Academies and national regulator reviews",
				publisher: "National Academies / regulators",
				stance: "supports",
				note: "Helpful when explaining how safety judgments are made across institutions.",
				order: 2
			}
		]
	},
	{
		topicSlug: "neuroscience-and-psychology",
		title: "Do we only use 10 percent of our brain?",
		slug: "do-we-only-use-10-percent-of-our-brain",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 98,
		bottomLine:
			"No. Humans use brain systems broadly and continuously. The popular '10 percent' claim is a myth, not a serious neuroscientific position.",
		stableCore: [
			"Brain imaging, lesion studies, and everyday neurobiology do not support the idea that most of the brain sits unused.",
			"Different tasks recruit different networks, but that is not the same thing as saying 90 percent is dormant.",
			"The myth persists because it flatters people with the idea of huge hidden reserves waiting to be unlocked."
		],
		openQuestions: [
			"Which public-facing explanations best replace simple brain myths without making neuroscience feel inaccessible?",
			"How should educators distinguish between neural efficiency and the false idea of vast unused capacity?"
		],
		whatWouldChangeMinds: [
			"Direct, repeatable evidence showing that large regions of healthy human brains serve no function across normal life.",
			"A better neuroscientific model that explains brain injury, imaging, and cognition while still implying most tissue is unused."
		],
		misconceptions: [
			"People often confuse 'not active in every task at every second' with 'unused.'",
			"Pop culture treats motivational myths like neuroscience because they are rhetorically appealing."
		],
		editorSummary:
			"This is a clean neuromyth page that helps demonstrate how an intuitive idea can thrive without earning serious empirical support.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Neuroscience outreach and society explainers",
				publisher: "Brain science organizations",
				stance: "supports",
				note: "Useful for a public-facing explanation anchored in mainstream neuroscience.",
				order: 1
			},
			{
				kind: "context",
				title: "Neuroimaging and lesion evidence overviews",
				publisher: "Neuroscience references",
				stance: "supports",
				note: "Helpful when showing why unused-brain claims fail against multiple evidence types.",
				order: 2
			}
		]
	},
	{
		topicSlug: "historical-case-studies",
		title: "Did smoking cause lung cancer?",
		slug: "did-smoking-cause-lung-cancer",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 99,
		bottomLine:
			"Yes. The causal link between cigarette smoking and lung cancer is one of the clearest historical examples of scientific consensus emerging against organized doubt.",
		stableCore: [
			"Large epidemiological studies, mechanistic evidence, and public-health data converged over time on the same conclusion.",
			"Industry-funded doubt delayed public understanding, but it did not defeat the evidence base.",
			"This case is useful because it shows how consensus can become extremely strong even when public messaging remains contested."
		],
		openQuestions: [
			"Which parts of the tobacco-doubt playbook still show up in modern misinformation campaigns?",
			"How should this history be used without implying every current controversy is equally mature?"
		],
		whatWouldChangeMinds: [
			"Credible historical evidence showing the causal signal was an artifact across epidemiology, toxicology, and population trends.",
			"A better explanatory framework that fits the full lung-cancer and smoking record without smoking as a primary cause."
		],
		misconceptions: [
			"People sometimes remember the past debate and mistakenly conclude the science was weak rather than politically resisted.",
			"Historical controversy is often confused with the absence of a strong eventual evidence base."
		],
		editorSummary:
			"This page should show how consensus can harden over time despite organized campaigns to manufacture uncertainty.",
		sources: [
			{
				kind: "landmark_study",
				title: "Landmark smoking and cancer epidemiology",
				publisher: "Public-health research",
				stance: "supports",
				note: "Useful for showing how the causal signal emerged across multiple study designs.",
				order: 1
			},
			{
				kind: "consensus_statement",
				title: "Surgeon General reports on smoking and health",
				publisher: "U.S. Surgeon General",
				stance: "supports",
				note: "Important for documenting how institutional consensus formed and strengthened.",
				order: 2
			}
		]
	},
	{
		topicSlug: "historical-case-studies",
		title: "Were most stomach ulcers caused by stress rather than bacteria?",
		slug: "were-most-stomach-ulcers-caused-by-stress-rather-than-bacteria",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 95,
		bottomLine:
			"No. The dominant consensus shifted when strong evidence showed that many peptic ulcers are caused by Helicobacter pylori infection rather than by stress or spicy food alone.",
		stableCore: [
			"H. pylori transformed ulcer treatment because it explained a large share of cases that older narratives did not handle well.",
			"This was not a case of science randomly flipping; it was a case of new evidence outperforming an older model.",
			"The old stress-and-lifestyle story had some intuitive appeal, but the bacterial evidence changed the causal center of the field."
		],
		openQuestions: [
			"How should historical reversals be explained so people learn from them without assuming every modern consensus is equally fragile?",
			"Which institutional or cultural habits made the older ulcer model so sticky?"
		],
		whatWouldChangeMinds: [
			"Strong contradictory evidence showing H. pylori is not a major causal contributor across ulcer populations.",
			"A better model that explains treatment success and ulcer recurrence without bacterial infection playing a central role."
		],
		misconceptions: [
			"People often retell this case as if stress had nothing to do with symptoms or healing, when the real shift was about the primary cause of many ulcers.",
			"A real historical correction is sometimes used to imply that current expert consensus is always likely to be overturned just as easily."
		],
		editorSummary:
			"This is one of the clearest examples of evidence changing minds for the right reason: the new explanation fit the data and changed treatment outcomes.",
		sources: [
			{
				kind: "landmark_study",
				title: "Marshall and Warren era ulcer research",
				publisher: "Clinical research",
				stance: "supports",
				note: "Useful for showing how the bacterial model established itself.",
				order: 1
			},
			{
				kind: "guideline",
				title: "Modern gastroenterology guidance on H. pylori and ulcer care",
				publisher: "Clinical guidelines",
				stance: "supports",
				note: "Helpful for showing how the new causal model became routine clinical practice.",
				order: 2
			}
		]
	},
	{
		topicSlug: "consensus-foundations",
		title: "How does scientific consensus form?",
		slug: "how-does-scientific-consensus-form",
		status: "published",
		consensusBand: "strong",
		confidenceScore: 94,
		bottomLine:
			"Scientific consensus forms when multiple lines of evidence survive criticism, replication, and time. It is not a vote. It is the durable result of repeated testing and challenge.",
		stableCore: [
			"Consensus is the residue of repeated challenge, not the absence of disagreement.",
			"Methods, measurement, and replication matter more than a single flashy result.",
			"Stable claims usually survive because many lines of evidence point in the same direction."
		],
		openQuestions: [
			"How should we explain uncertainty without making everything sound equally weak?",
			"Which teaching metaphors help people understand evidence accumulation instead of memorizing conclusions?"
		],
		whatWouldChangeMinds: [
			"Large bodies of contradictory evidence that survive scrutiny and replication.",
			"New methods that reveal systematic measurement errors in the old foundation."
		],
		misconceptions: [
			"Consensus is often mistaken for groupthink rather than an evidence-backed process.",
			"Disagreement at the frontier is often misread as if it invalidates the settled center."
		],
		editorSummary:
			"Use this claim as the public-facing explanation of how science moves from uncertainty to reliable consensus.",
		sources: [
			{
				kind: "context",
				title: "Philosophy of science overviews",
				publisher: "Background reading",
				stance: "context",
				note: "Useful for framing model-building, inference, and falsifiability.",
				order: 1
			},
			{
				kind: "context",
				title: "Replication crisis reporting",
				publisher: "Background reading",
				stance: "context",
				note: "Useful when discussing how correction mechanisms work.",
				order: 2
			}
		]
	},
	{
		topicSlug: "media-misinformation",
		title: "Why does one study rarely change everything?",
		slug: "why-does-one-study-rarely-change-everything",
		status: "published",
		consensusBand: "broad",
		confidenceScore: 82,
		bottomLine:
			"One study rarely changes a field because scientific conclusions rest on the weight of evidence, not novelty alone. New papers usually add detail, scope, or uncertainty rather than replacing the whole picture.",
		stableCore: [
			"Relative risk without baseline context is easy to overread.",
			"Single studies are regularly framed as if they replace a broader evidence base.",
			"False balance can make fringe claims look equal to well-supported positions."
		],
		openQuestions: [
			"Which explanations actually improve public calibration instead of just increasing attention?",
			"How should platforms show uncertainty without encouraging cynicism?"
		],
		whatWouldChangeMinds: [
			"Clearer evidence on which communication patterns reliably improve public understanding.",
			"Platform experiments showing durable gains in source literacy and risk interpretation."
		],
		misconceptions: [
			"People often confuse louder coverage with stronger evidence.",
			"Correction stories usually travel less than the original overstatement."
		],
		editorSummary:
			"Anchor the basketball-versus-bumps framing here. This page should explain why media spikes are not the same thing as consensus shifts.",
		sources: [
			{
				kind: "context",
				title: "Science journalism analyses",
				publisher: "Background reading",
				stance: "context",
				note: "Useful for spotting patterns in headline inflation.",
				order: 1
			},
			{
				kind: "context",
				title: "Risk communication research",
				publisher: "Background reading",
				stance: "supports",
				note: "Helpful when translating percentages into real-world scale.",
				order: 2
			}
		]
	},
	{
		topicSlug: "active-debates",
		title: "What counts as an active scientific debate?",
		slug: "what-counts-as-an-active-scientific-debate",
		status: "published",
		consensusBand: "mixed",
		confidenceScore: 56,
		bottomLine:
			"An active scientific debate usually means experts are arguing about mechanism, effect size, edge cases, or model fit, not necessarily about whether the core phenomenon exists at all.",
		stableCore: [
			"Competing models can coexist while evidence is still being sorted.",
			"Debate often narrows over time from huge claims to precise technical disagreements.",
			"An unresolved mechanism does not automatically mean the entire phenomenon is doubtful."
		],
		openQuestions: [
			"Which results are robust across populations, instruments, and labs?",
			"Are researchers arguing about the effect itself or only about how large it is?",
			"Which edge cases matter enough to change the practical takeaway?"
		],
		whatWouldChangeMinds: [
			"Better-powered studies that adjudicate between competing models.",
			"Independent replications that consistently favor one mechanism over another."
		],
		misconceptions: [
			"Media often compresses nuanced disagreement into a fake yes-or-no battle.",
			"People assume an active debate means experts have no useful provisional view."
		],
		editorSummary:
			"Use this as the main explainer for how frontier disagreement differs from the stable core of consensus.",
		sources: [
			{
				kind: "context",
				title: "Meta-analyses",
				publisher: "Background reading",
				stance: "supports",
				note: "Helpful when the dispute is about magnitude across many studies.",
				order: 1
			},
			{
				kind: "context",
				title: "Methods papers",
				publisher: "Background reading",
				stance: "context",
				note: "Useful when the fight is really about measurement or model fit.",
				order: 2
			}
		]
	}
];
