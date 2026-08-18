export interface TopicGuideResource {
	title: string;
	note: string;
}

export interface TopicGuide {
	slug: string;
	consensusScore: number;
	consensusLabel: string;
	snapshot: string;
	stableCore: string[];
	openQuestions: string[];
	whatWouldChangeMinds: string[];
	commonMisreads: string[];
	starterQuestions: string[];
	evidenceTrail: TopicGuideResource[];
}

const fallbackGuide: TopicGuide = {
	slug: "fallback",
	consensusScore: 50,
	consensusLabel: "Mixed and still taking shape",
	snapshot: "This topic still needs a clearer consensus summary before it can be treated as settled.",
	stableCore: [
		"Separate the broad claim from the exact mechanism being debated.",
		"Look for replication and synthesis before treating a new result as decisive."
	],
	openQuestions: [
		"Which parts of the claim are evidence-backed and which are still inference?",
		"Where are experts mostly aligned, and where are they arguing about specifics?"
	],
	whatWouldChangeMinds: [
		"Consistent results across methods, labs, and populations.",
		"A stronger model that predicts more accurately than the current explanation."
	],
	commonMisreads: [
		"A new study can sharpen the edges of a topic without overturning the center.",
		"Public certainty and expert certainty are often very different."
	],
	starterQuestions: [
		"What part of this claim is actually settled?",
		"What evidence would raise or lower confidence here?"
	],
	evidenceTrail: [
		{ title: "Systematic reviews", note: "Useful for checking the overall direction of the literature." },
		{ title: "Consensus statements", note: "Helpful for seeing where institutions or expert bodies converge." }
	]
};

export const topicGuides: Record<string, TopicGuide> = {
	"health-and-medicine": {
		slug: "health-and-medicine",
		consensusScore: 93,
		consensusLabel: "Strong consensus on the core interventions",
		snapshot:
			"Public-health topics often look more contested in public than they do inside the evidence stack, especially when anecdotes and distrust outrun large population data.",
		stableCore: [
			"Safety questions in medicine usually require population-scale evidence, not isolated personal experience.",
			"Clinical guidance rests more on systematic review and post-market monitoring than on dramatic individual stories.",
			"When misinformation spreads here, the practical harm can be immediate."
		],
		openQuestions: [
			"Which communication styles improve trust without flattening uncertainty?",
			"How should institutions explain risk when communities already distrust them?"
		],
		whatWouldChangeMinds: [
			"Repeated evidence across large populations showing a real, replicable harm signal.",
			"A stronger mechanism that fits both clinical and epidemiological evidence."
		],
		commonMisreads: [
			"Correlation in time is often mistaken for causation.",
			"Anecdotes feel stronger than surveillance data even when they are not."
		],
		starterQuestions: [
			"What do the large population studies say here?",
			"Is this a public-health consensus or a frontier research question?"
		],
		evidenceTrail: [
			{ title: "Systematic reviews", note: "Best for checking whether the effect holds up across many studies." },
			{
				title: "Clinical guidelines",
				note: "Important when the question affects current care or public-health advice."
			}
		]
	},
	"climate-and-environment": {
		slug: "climate-and-environment",
		consensusScore: 98,
		consensusLabel: "Overwhelming agreement on the core drivers",
		snapshot:
			"The strongest climate debates are usually about pace, impacts, and regional effects, not about whether human greenhouse emissions are warming the planet.",
		stableCore: [
			"Greenhouse gases trap heat, and human activity has sharply raised their concentration.",
			"Observed warming, physical theory, and attribution models point in the same broad direction.",
			"Fake-expert arguments and cherry-picked weather events do not overturn the climate evidence stack."
		],
		openQuestions: [
			"How fast will specific regional impacts unfold?",
			"Which feedback loops matter most on different timescales?"
		],
		whatWouldChangeMinds: [
			"A better model that explains the observed warming trend without anthropogenic forcing.",
			"Robust contradictory evidence across physics, observations, and attribution studies."
		],
		commonMisreads: [
			"A local cold spell is often mistaken for evidence against a long-term climate trend.",
			"People frequently confuse public controversy with scientific disagreement."
		],
		starterQuestions: [
			"What part of climate science is actually settled?",
			"What are experts still debating at the edges?"
		],
		evidenceTrail: [
			{ title: "Assessment reports", note: "Useful for seeing where large literatures converge." },
			{ title: "Observation records", note: "Helpful when grounding claims in measurement rather than rhetoric." }
		]
	},
	"nutrition-and-diet": {
		slug: "nutrition-and-diet",
		consensusScore: 74,
		consensusLabel: "Broad guidance with high headline churn",
		snapshot:
			"Nutrition coverage often makes moderate refinements sound like total reversals, even when the broad guidance changes slowly and cautiously.",
		stableCore: [
			"Nutritional science leans heavily on observational evidence, so overstatement is easy.",
			"Broad dietary guidance usually changes by refinement, not by sudden collapse.",
			"Context matters: whole dietary patterns tell you more than isolated nutrient panic."
		],
		openQuestions: [
			"Which dietary substitutions matter most for long-term outcomes?",
			"How much do individual metabolic differences change the practical takeaway?"
		],
		whatWouldChangeMinds: [
			"Better-controlled long-term evidence that shifts the effect size or direction materially.",
			"A more predictive model linking intake patterns to clinical outcomes."
		],
		commonMisreads: [
			"One nutrition headline is often treated like a complete rewrite of prior guidance.",
			"People routinely confuse mechanistic speculation with large real-world risk."
		],
		starterQuestions: [
			"Is this headline based on a single study or a broader review?",
			"What is the real-world risk change, not just the relative risk?"
		],
		evidenceTrail: [
			{ title: "Guidelines", note: "Important when checking what major medical societies currently advise." },
			{ title: "Meta-analyses", note: "Useful for separating noisy single-study signals from broader patterns." }
		]
	},
	"biology-and-evolution": {
		slug: "biology-and-evolution",
		consensusScore: 96,
		consensusLabel: "Strong consensus on the core framework",
		snapshot:
			"Many public disputes about evolution come from language confusion or impossible expectations rather than from serious cracks in the biological evidence.",
		stableCore: [
			"The scientific meaning of theory is much stronger than the everyday meaning.",
			"Common descent is supported across fossils, genetics, and comparative biology.",
			"The active research lives more in mechanism and timing than in whether evolution happened."
		],
		openQuestions: [
			"How should educators explain theory without triggering everyday-language confusion?",
			"Which misconceptions are hardest to correct once they become identity-linked?"
		],
		whatWouldChangeMinds: [
			"Evidence that breaks common descent across multiple independent lines of biology.",
			"A more predictive framework that explains the same evidence better."
		],
		commonMisreads: [
			"'Just a theory' imports everyday speech into a technical scientific context.",
			"People often demand a perfectly complete fossil record before accepting a historical explanation."
		],
		starterQuestions: [
			"What does theory mean in science here?",
			"What evidence would actually break the current evolutionary framework?"
		],
		evidenceTrail: [
			{ title: "Comparative genetics", note: "Useful for seeing why multiple lines of biology converge." },
			{ title: "Fossil and geological records", note: "Helpful when addressing historical evidence claims." }
		]
	},
	"genetics-and-biotechnology": {
		slug: "genetics-and-biotechnology",
		consensusScore: 89,
		consensusLabel: "Strong consensus on current commercial safety assessments",
		snapshot:
			"Public fear around GMOs and biotechnology often blends safety, agriculture, business practices, and ethics into one argument, even when the scientific questions are more specific.",
		stableCore: [
			"Major scientific and public-health bodies treat currently approved GM foods as no more inherently dangerous to eat than comparable conventional foods.",
			"Safety claims about biotechnology belong apart from wider debates about patents, farming policy, or corporate power.",
			"Gene-editing tools can have real benefits and real risks, but those risks need to be assessed claim by claim rather than by panic about the category itself."
		],
		openQuestions: [
			"Which governance rules best handle ecological, ethical, and market concerns around new biotech tools?",
			"How should regulators communicate the difference between product risk and production politics?"
		],
		whatWouldChangeMinds: [
			"Repeated, high-quality human or ecological evidence showing that approved biotech products create harms not caught by current safety assessments.",
			"A better risk model demonstrating systematic failure in existing regulatory review."
		],
		commonMisreads: [
			"People often treat 'GMO' as a single hazard rather than a set of different techniques and products.",
			"Arguments about pesticides or corporate control are often confused with the narrower question of whether the food itself is unsafe to eat."
		],
		starterQuestions: [
			"What exactly is being genetically changed here, and what was actually tested?",
			"Is the argument about health risk, ecological risk, or agricultural policy?"
		],
		evidenceTrail: [
			{
				title: "WHO and FAO safety assessments",
				note: "Useful for international consensus on the safety of approved GM foods."
			},
			{
				title: "National Academies and major regulator reviews",
				note: "Helpful when showing how biotechnology claims are assessed across evidence types."
			}
		]
	},
	"neuroscience-and-psychology": {
		slug: "neuroscience-and-psychology",
		consensusScore: 79,
		consensusLabel: "Clear expert patterns against popular myths",
		snapshot:
			"Brain and behavior myths spread easily because they sound personal, intuitive, and identity-relevant even when the evidence behind them is weak.",
		stableCore: [
			"Pop-psychology claims often outrun the evidence base.",
			"Preferences and intuitions are not the same as tested learning or clinical outcomes.",
			"The strongest debunks usually come from controlled comparisons rather than from anecdotes."
		],
		openQuestions: [
			"Which communication approaches best replace neuromyths with better models?",
			"How can education and mental-health practice shed weak frameworks without confusing the public?"
		],
		whatWouldChangeMinds: [
			"Repeated, better-controlled evidence that a popular brain claim reliably improves outcomes.",
			"A stronger model that predicts learning or behavior better than the current evidence-backed alternatives."
		],
		commonMisreads: [
			"Self-description is often mistaken for evidence.",
			"People like fixed categories, even when the underlying science is more dynamic."
		],
		starterQuestions: [
			"Is this a tested effect or just an appealing label?",
			"Does the claim improve outcomes outside of a narrow lab task?"
		],
		evidenceTrail: [
			{ title: "Educational psychology reviews", note: "Useful when the claim affects teaching or training." },
			{
				title: "Behavioral science consensus",
				note: "Helpful when separating pop-psychology from durable findings."
			}
		]
	},
	"historical-case-studies": {
		slug: "historical-case-studies",
		consensusScore: 92,
		consensusLabel: "Strong lessons from past consensus shifts",
		snapshot:
			"Historical case studies show that science does change, but usually when better evidence, better measurements, and better models outperform the old story over time.",
		stableCore: [
			"Many famous consensus shifts did not happen because people suddenly became open-minded; they happened because new evidence held up under challenge.",
			"Industry pressure, media confusion, and professional inertia can delay consensus without defeating it forever.",
			"These stories are useful because they show both why science can be trusted and why public confusion can last for years."
		],
		openQuestions: [
			"Which historical examples best help people understand self-correction without encouraging false balance?",
			"How should past reversals be explained so they strengthen trust instead of feeding cynicism?"
		],
		whatWouldChangeMinds: [
			"Historical evidence showing that a supposed consensus shift was actually much less settled than commonly described.",
			"New scholarship clarifying how institutional incentives distorted the pace of change."
		],
		commonMisreads: [
			"People often use one real historical correction to argue that every current consensus is probably wrong.",
			"Past scientific error is often treated as proof that expertise itself is worthless, instead of proof that scrutiny and evidence matter."
		],
		starterQuestions: [
			"What evidence finally broke the old view here?",
			"What does this case teach about how long real consensus change can take?"
		],
		evidenceTrail: [
			{
				title: "Landmark studies and trials",
				note: "Useful for showing the specific evidence that shifted expert judgment."
			},
			{
				title: "Government reports and retrospective reviews",
				note: "Helpful when tracing how institutions changed guidance over time."
			}
		]
	},
	"consensus-foundations": {
		slug: "consensus-foundations",
		consensusScore: 94,
		consensusLabel: "Strong consensus on the basic process",
		snapshot:
			"Scientific knowledge becomes trustworthy through criticism, replication, converging evidence, and better predictive models, not by charisma or repetition.",
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
		commonMisreads: [
			"Consensus is mistaken for groupthink rather than an evidence-backed process.",
			"People treat disagreement at the frontier as if it invalidates the settled center."
		],
		starterQuestions: [
			"What makes a scientific claim feel settled instead of speculative?",
			"Why doesn’t one new study usually overturn a field?"
		],
		evidenceTrail: [
			{
				title: "Philosophy of science overviews",
				note: "Good for framing model-building, inference, and falsifiability."
			},
			{ title: "Replication crisis reporting", note: "Useful when discussing how correction mechanisms work." }
		]
	},
	"active-debates": {
		slug: "active-debates",
		consensusScore: 56,
		consensusLabel: "Active debate around mechanisms and magnitude",
		snapshot:
			"Many scientific fights are not about whether something exists at all, but about effect size, mechanism, boundary conditions, or which model predicts best.",
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
		commonMisreads: [
			"Media often compresses nuanced disagreement into a fake yes/no battle.",
			"People assume an active debate means experts have no useful provisional view."
		],
		starterQuestions: [
			"What exactly are experts arguing about here?",
			"Is the disagreement about whether the effect exists or how strong it is?"
		],
		evidenceTrail: [
			{ title: "Meta-analyses", note: "Helpful when the dispute is about magnitude across many studies." },
			{ title: "Methods papers", note: "Useful when the fight is really about measurement or model fit." }
		]
	},
	"media-misinformation": {
		slug: "media-misinformation",
		consensusScore: 82,
		consensusLabel: "Strong agreement that framing distorts public understanding",
		snapshot:
			"Scientific communication often breaks when headlines flatten uncertainty, exaggerate novelty, or present fringe disagreement as balanced controversy.",
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
		commonMisreads: [
			"People confuse louder coverage with stronger evidence.",
			"Correction stories often travel less than the original overstatement."
		],
		starterQuestions: [
			"What does this headline leave out about scale or uncertainty?",
			"Is this a genuine consensus update or just a media spike?"
		],
		evidenceTrail: [
			{ title: "Science journalism analyses", note: "Useful for spotting patterns in headline inflation." },
			{
				title: "Risk communication research",
				note: "Helpful when translating percentages into real-world scale."
			}
		]
	},
	"bias-incentives": {
		slug: "bias-incentives",
		consensusScore: 76,
		consensusLabel: "Substantial agreement that incentives shape research behavior",
		snapshot:
			"Publication pressure, funding structure, prestige incentives, and selective reporting can bend what gets studied, published, and amplified without invalidating science as a whole.",
		stableCore: [
			"Researchers respond to incentives just like everyone else.",
			"Bias can enter through study design, analysis choices, publication, and media amplification.",
			"Transparent methods and preregistration are partial defenses, not magic shields."
		],
		openQuestions: [
			"Which reforms improve reliability without creating new bureaucratic failure modes?",
			"How much bias comes from institutions versus from measurement limits and noisy data?"
		],
		whatWouldChangeMinds: [
			"Strong comparative evidence showing which institutional reforms improve reproducibility.",
			"Better auditing data that separates publication bias from true underlying uncertainty."
		],
		commonMisreads: [
			"Finding incentives or bias is not the same as proving all results are fake.",
			"Critiquing incentives should lead to better guardrails, not total distrust."
		],
		starterQuestions: [
			"What incentives might be shaping this result or headline?",
			"What checks are in place to reduce bias here?"
		],
		evidenceTrail: [
			{
				title: "Reproducibility studies",
				note: "Useful for grounding the conversation in measured failure rates."
			},
			{ title: "Open science frameworks", note: "Helpful when discussing mitigations rather than only problems." }
		]
	},
	"science-communication": {
		slug: "science-communication",
		consensusScore: 71,
		consensusLabel: "Clear patterns, with room for experimentation",
		snapshot:
			"Good science communication makes uncertainty legible, keeps scale intact, and preserves curiosity without pretending every topic is equally unsettled.",
		stableCore: [
			"Clear explanations outperform jargon-heavy certainty theater.",
			"Audience trust improves when uncertainty is named precisely instead of hidden.",
			"Narrative can help understanding if it does not distort the evidence hierarchy."
		],
		openQuestions: [
			"Which formats help people remember the right lesson rather than just the most dramatic example?",
			"How much simplification is too much before a teaching aid becomes misleading?"
		],
		whatWouldChangeMinds: [
			"Comparative evidence on which formats create durable understanding across audiences.",
			"Better measures of whether a communication style improves calibration, not just engagement."
		],
		commonMisreads: [
			"Engaging storytelling is sometimes mistaken for dumbing things down.",
			"Exact wording matters when communicating risk, uncertainty, and causation."
		],
		starterQuestions: [
			"Did this explainer preserve the scale of the evidence?",
			"What tradeoff did the communicator make between clarity and precision?"
		],
		evidenceTrail: [
			{
				title: "Communication design research",
				note: "Useful when comparing visual, textual, and interactive explainers."
			},
			{ title: "Educational psychology", note: "Helpful for understanding memory, misconceptions, and transfer." }
		]
	},
	"public-policy-and-safety": {
		slug: "public-policy-and-safety",
		consensusScore: 86,
		consensusLabel: "Strong evidence for several prevention tools",
		snapshot:
			"Policy evidence can estimate whether an intervention reduces harm, while legal rights, costs, fairness, and acceptable tradeoffs remain public judgments rather than laboratory results.",
		stableCore: [
			"Well-designed natural experiments and program reviews can identify meaningful population effects even when randomized policy trials are impossible.",
			"Implementation quality and local context often determine how much of an average benefit a community realizes.",
			"Evidence that a policy works does not by itself settle whether its burdens, enforcement, or distribution are acceptable."
		],
		openQuestions: [
			"Which implementation details preserve benefit while reducing inequitable burdens and unintended effects?",
			"How well do results transfer across jurisdictions with different laws, services, institutions, and baseline risks?"
		],
		whatWouldChangeMinds: [
			"Stronger controlled evaluations showing that a reported population benefit disappears after accounting for trends and selection.",
			"Evidence that a feasible alternative achieves greater harm reduction with fewer costs or inequities."
		],
		commonMisreads: [
			"A measured average effect is not a guarantee that every local program works equally well.",
			"Scientific evidence can inform a policy choice without resolving its legal or moral dimensions."
		],
		starterQuestions: [
			"What outcome changed after the intervention, compared with what would otherwise have happened?",
			"Which tradeoffs are empirical questions, and which require a public value judgment?"
		],
		evidenceTrail: [
			{
				title: "Systematic reviews of programs",
				note: "Useful for checking whether effects repeat across jurisdictions and implementation models."
			},
			{
				title: "Controlled natural experiments",
				note: "Important when random assignment is impractical but timing and comparison groups can strengthen causal inference."
			}
		]
	},
	"education-and-learning": {
		slug: "education-and-learning",
		consensusScore: 76,
		consensusLabel: "Evidence varies sharply by intervention",
		snapshot:
			"Education research supports some practical improvements, but effects often depend on age, teaching quality, implementation, and what outcome is measured. Familiar policies can sound more certain than the evidence warrants.",
		stableCore: [
			"Learning interventions should be judged against a credible comparison, not only by whether students improved over time.",
			"Average effects can hide important differences by age, subject, baseline need, and implementation quality.",
			"A useful component such as phonics or homework is not automatically a complete curriculum or a universal prescription."
		],
		openQuestions: [
			"Which combinations of curriculum, teacher support, and school conditions produce durable learning gains?",
			"How well do results transfer across countries, age groups, and students with different learning needs?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled replications showing that an intervention's gains persist and transfer beyond the tested task.",
			"Stronger evidence that a widely used policy either delivers meaningful benefits or imposes overlooked harms across settings."
		],
		commonMisreads: [
			"A statistically detectable school effect may still be modest in practice.",
			"Evidence for one instructional ingredient does not establish that every program using its label works equally well."
		],
		starterQuestions: [
			"Compared with what, for which students, and on which outcome did this approach work?",
			"Did the improvement last after the study or transfer to broader learning?"
		],
		evidenceTrail: [
			{
				title: "Systematic education reviews",
				note: "Useful for comparing interventions across schools while keeping effect size and study quality visible."
			},
			{
				title: "Evidence-practice guides",
				note: "Helpful for translating an average result into the implementation conditions schools actually need."
			}
		]
	},
	"sleep-and-circadian-health": {
		slug: "sleep-and-circadian-health",
		consensusScore: 88,
		consensusLabel: "Strong foundations with individual variation",
		snapshot:
			"Sleep duration, timing, and regularity have durable biological foundations. The largest uncertainty usually concerns individual need, treatment choice, and the size of long-term risks—not whether chronic sleep disruption matters.",
		stableCore: [
			"Most healthy adults function best with at least seven hours of regular sleep, although individual need varies.",
			"Light, behavior, work schedules, and internal circadian timing all shape when sleep occurs.",
			"Persistent insomnia or warning signs of sleep apnea deserve proper evaluation rather than indefinite self-treatment."
		],
		openQuestions: [
			"Which people recover most fully from short sleep, and how much recovery is possible after repeated restriction?",
			"How can shift schedules reduce circadian disruption while remaining workable for essential services?"
		],
		whatWouldChangeMinds: [
			"Longer randomized or quasi-experimental studies that materially revise the health effects attributed to sleep duration or timing.",
			"Better biomarkers that reliably distinguish harmless individual variation from clinically important sleep disruption."
		],
		commonMisreads: [
			"Feeling accustomed to short sleep does not prove that attention, metabolism, and performance have fully adapted.",
			"Blue light is one part of evening screen use, not a complete explanation for every sleep problem."
		],
		starterQuestions: [
			"Is this claim about sleep duration, circadian timing, sleep quality, or a diagnosed disorder?",
			"Does the evidence measure how people feel, how they perform, or long-term health outcomes?"
		],
		evidenceTrail: [
			{ title: "Sleep-medicine guidelines", note: "Best for diagnosis and treatment boundaries." },
			{
				title: "Controlled sleep and circadian studies",
				note: "Useful for separating short-term mechanisms from longer-term observational risk."
			}
		]
	},
	"exercise-and-sports-science": {
		slug: "exercise-and-sports-science",
		consensusScore: 90,
		consensusLabel: "Strong consensus on movement, qualified at the margins",
		snapshot:
			"Regular movement reliably benefits health, and useful gains begin below ideal targets. More specific claims about routines, supplements, injury prevention, and body composition need narrower evidence and often produce smaller effects.",
		stableCore: [
			"Some activity is better than none, and benefits accumulate across a range of realistic weekly doses.",
			"Progressive resistance training can be safe and beneficial across ages when technique, load, and supervision are appropriate.",
			"Training adaptations are specific: a method can improve one outcome without being best for every goal."
		],
		openQuestions: [
			"Which combinations of intensity, volume, and recovery are most sustainable for different people?",
			"How should research results for trained athletes be translated for beginners, older adults, and clinical populations?"
		],
		whatWouldChangeMinds: [
			"Large comparative trials showing that a popular training or recovery claim produces meaningful outcomes beyond ordinary progressive exercise.",
			"Consistent safety evidence that changes current boundaries for a supplement or training method."
		],
		commonMisreads: [
			"A precise target such as 10,000 steps can be motivational without being a biological threshold.",
			"Short-term soreness, calorie use, or performance changes do not automatically establish long-term fat loss, injury prevention, or health benefit."
		],
		starterQuestions: [
			"What outcome is this supposed to improve: health, strength, endurance, body composition, recovery, or performance?",
			"Was the effect tested against a realistic alternative in people like the intended user?"
		],
		evidenceTrail: [
			{ title: "Physical-activity guidelines", note: "Useful for the durable population-health baseline." },
			{
				title: "Training and sports-medicine syntheses",
				note: "Important for outcome-specific effects, supervision, and injury boundaries."
			}
		]
	},
	"crime-and-justice": {
		slug: "crime-and-justice",
		consensusScore: 72,
		consensusLabel: "Useful evidence, with major design and value limits",
		snapshot:
			"Justice research can test deterrence, recidivism, police practices, and witness accuracy. It cannot by itself decide what punishments, risks, rights, or inequities a society should accept.",
		stableCore: [
			"The strongest conclusions compare outcomes against a plausible counterfactual rather than relying on before-and-after impressions.",
			"Implementation, local institutions, and who is affected can change both benefits and harms.",
			"A policy's empirical effect and its legal or moral legitimacy are related but distinct questions."
		],
		openQuestions: [
			"Which interventions preserve public-safety gains while reducing coercion, error, and unequal burdens?",
			"How reliably do findings transfer across jurisdictions with different laws, crime patterns, and institutions?"
		],
		whatWouldChangeMinds: [
			"Stronger replicated natural experiments or randomized evaluations that reverse an intervention's current estimated effect.",
			"Better evidence about downstream harms, distributional effects, and long-term outcomes rather than only immediate enforcement metrics."
		],
		commonMisreads: [
			"An absence of credible evidence for deterrence is not proof that an effect is exactly zero.",
			"A reduction in one measured outcome does not settle displacement, fairness, legitimacy, or community harm."
		],
		starterQuestions: [
			"What outcome was measured, and what is the credible comparison for what would have happened otherwise?",
			"Which part of this dispute is empirical, and which part depends on rights or values?"
		],
		evidenceTrail: [
			{
				title: "Systematic crime and justice reviews",
				note: "Useful for comparing interventions while checking displacement, recidivism, and implementation."
			},
			{
				title: "National evidence assessments",
				note: "Important when methods are contested or the available studies cannot support a precise causal conclusion."
			}
		]
	},
	"astronomy-and-space": {
		slug: "astronomy-and-space",
		consensusScore: 91,
		consensusLabel: "Strong observations, open frontiers",
		snapshot:
			"Astronomy combines exceptionally stable observations about Earth, the Moon, stars, galaxies, and cosmic history with genuine frontiers such as dark matter's identity and the search for life. An unexplained observation is not automatically evidence for an extraordinary explanation.",
		stableCore: [
			"Independent measurements of geometry, motion, light, gravity, and returned material reinforce the field's foundational conclusions.",
			"The expanding-universe and hot-Big-Bang framework is strongly supported even though early-universe physics and the expansion rate remain active research areas.",
			"Searches for extraterrestrial life and dark-matter particles are scientifically serious without yet amounting to confirmed detections."
		],
		openQuestions: [
			"What physical process drove the universe's earliest expansion, and why do current expansion-rate measurements disagree?",
			"What is dark matter made of, and will a credible biosignature or technosignature be found?"
		],
		whatWouldChangeMinds: [
			"Independent observations that repeatedly fail where the current cosmological or gravitational models make precise predictions.",
			"A life-detection or UAP claim supported by calibrated, shareable data that excludes plausible non-biological or ordinary explanations."
		],
		commonMisreads: [
			"The Big Bang describes an expanding hot early universe, not an explosion from one location into empty space.",
			"Unidentified means that available data do not identify an object; it does not mean extraterrestrial."
		],
		starterQuestions: [
			"Is this conclusion based on one image, or on several independent kinds of measurement?",
			"Does the claim distinguish evidence for a phenomenon from identification of its underlying cause?"
		],
		evidenceTrail: [
			{
				title: "NASA, ESA, and observatory archives",
				note: "Primary mission data and calibrated observational context."
			},
			{
				title: "Major collaboration papers and field reviews",
				note: "Best for separating established observations from unsettled interpretation."
			}
		]
	},
	"earth-and-geoscience": {
		slug: "earth-and-geoscience",
		consensusScore: 89,
		consensusLabel: "Strong foundations, probabilistic hazards",
		snapshot:
			"Earth science establishes the planet's age, layered interior, moving plates, and many human influences on geologic systems. Hazard monitoring can materially improve forecasts and warnings, but it rarely provides exact deterministic predictions.",
		stableCore: [
			"Radiometric dating, seafloor records, satellite geodesy, seismology, and field geology converge across independent methods.",
			"Earth's mantle is overwhelmingly solid rock that deforms over long timescales; localized melting produces magma.",
			"Earthquake probabilities, earthquake early warning, and volcano forecasts answer different questions and have different limits."
		],
		openQuestions: [
			"How can probabilistic hazard forecasts become more local, timely, and useful without implying false precision?",
			"How will groundwater use, subsurface energy operations, and volcanic unrest interact with local geology over time?"
		],
		whatWouldChangeMinds: [
			"Replicable measurements that contradict radiometric, geodetic, seismic, or stratigraphic evidence across methods.",
			"Validated precursors that predict specific earthquakes or eruptions prospectively and outperform probability-based baselines."
		],
		commonMisreads: [
			"Slowly flowing solid rock is not a global ocean of liquid magma.",
			"An average interval between rare eruptions is not a countdown clock."
		],
		starterQuestions: [
			"Is the statement a long-term hazard estimate, a short-term forecast, or an alert after an event has begun?",
			"Which independent measurement methods support the geologic interpretation?"
		],
		evidenceTrail: [
			{
				title: "USGS monitoring and assessment pages",
				note: "Authoritative U.S. observations, definitions, and hazard boundaries."
			},
			{
				title: "Geophysical reviews and global datasets",
				note: "Useful for mechanisms, uncertainty, and evidence beyond one location."
			}
		]
	},
	"ecology-and-conservation": {
		slug: "ecology-and-conservation",
		consensusScore: 86,
		consensusLabel: "Strong decline signals, context-dependent remedies",
		snapshot:
			"Biodiversity loss is measurable and consequential, while conservation outcomes depend on place, enforcement, governance, and what pressure is reduced. The evidence supports action without pretending every intervention or species introduction has the same effect.",
		stableCore: [
			"Biodiversity contributes to ecosystem functioning and resilience, although the contribution of any one species or trait varies.",
			"Habitat loss, overexploitation, pollution, climate change, and harmful invasive species are major pressures with interacting effects.",
			"Protected areas, restoration, invasive-species control, and sustainable management often help when they are well designed and maintained."
		],
		openQuestions: [
			"Which combinations of protection, restoration, and working-land management deliver durable ecological and social outcomes?",
			"How should conservation prioritize total habitat, connectivity, representation, climate refuges, and local stewardship?"
		],
		whatWouldChangeMinds: [
			"Global counterfactual studies showing that well-implemented conservation generally fails to slow losses.",
			"Long-term evidence that materially changes estimates of extinction rates, ecosystem-function effects, or major pressure pathways."
		],
		commonMisreads: [
			"Non-native does not automatically mean invasive; harm and spread must be evaluated.",
			"Planting trees can be useful without making a plantation ecologically equivalent to a natural forest."
		],
		starterQuestions: [
			"Compared with what counterfactual, and over what timescale, did the conservation action help?",
			"Is the claim about species richness, abundance, ecological function, carbon, or human well-being?"
		],
		evidenceTrail: [
			{
				title: "IPBES global and thematic assessments",
				note: "Best broad synthesis of biodiversity status, drivers, and response options."
			},
			{
				title: "Counterfactual conservation meta-analyses",
				note: "Useful for distinguishing genuine outcomes from simple inside-outside comparisons."
			}
		]
	},
	"other-questions": {
		slug: "other-questions",
		consensusScore: 43,
		consensusLabel: "Exploratory and mixed",
		snapshot:
			"This lane catches questions that do not yet map cleanly onto one of the core consensus themes, so triage and framing matter more here.",
		stableCore: [
			"Precise phrasing matters because broad questions can hide several separate claims.",
			"Early sorting helps prevent unrelated debates from being bundled together."
		],
		openQuestions: [
			"What is the smallest version of the question we can answer well?",
			"Does this belong with foundations, debate, incentives, communication, or misinformation instead?"
		],
		whatWouldChangeMinds: [
			"A cleaner problem statement or source claim that narrows the evidence search.",
			"A better topic fit that reveals the relevant consensus context."
		],
		commonMisreads: [
			"People often ask one question while actually needing help with a different underlying confusion.",
			"Broad topics feel urgent but are harder to answer responsibly without narrowing scope."
		],
		starterQuestions: [
			"What exact claim are you trying to check?",
			"Which source, quote, or example kicked off the question?"
		],
		evidenceTrail: [
			{ title: "Primary source first", note: "Start with the actual claim, quote, or paper being discussed." },
			{ title: "Topic triage", note: "Then route the question to the lane with the right consensus context." }
		]
	}
};

export function getTopicGuide(slug: string) {
	return topicGuides[slug] ?? fallbackGuide;
}
