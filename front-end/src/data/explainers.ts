export interface ExplainerExample {
	title: string;
	body: string;
}

export interface ExplainerItem {
	slug: string;
	title: string;
	summary: string;
	whyItMatters: string;
	keyPoints: string[];
	whatPeopleGetWrong: string;
	coreConcept: string;
	howScientistsHandleIt: string[];
	commonTraps: string[];
	workedExamples: ExplainerExample[];
	goodSources: string[];
	relatedMisconceptions: string[];
}

export const evergreenExplainers: ExplainerItem[] = [
	{
		slug: "how-consensus-forms",
		title: "How scientific consensus forms",
		summary:
			"Consensus is not a vote. It is what remains after criticism, replication, and multiple lines of evidence keep pointing in the same direction.",
		whyItMatters:
			"People often mistake consensus for groupthink or popularity. This explainer shows why consensus is a structured process tied to evidence and expert evaluation.",
		keyPoints: [
			"Consensus builds from converging evidence, not from slogans.",
			"Qualified expert agreement matters because domain knowledge matters.",
			"Strong consensus can coexist with open questions at the edges."
		],
		whatPeopleGetWrong:
			"People often assume consensus means politics, pressure, or simple majority opinion. In practice, consensus forms when repeated criticism and multiple methods keep landing in the same place.",
		coreConcept:
			"Consensus is best understood as the field-level picture after evidence accumulation, review, challenge, and synthesis. It is not identical to public opinion, media attention, or a single institution's statement.",
		howScientistsHandleIt: [
			"They compare evidence from multiple methods, not just one design.",
			"They use reviews, assessments, and guidelines to summarize a literature instead of improvising from isolated papers.",
			"They revise consensus when better evidence consistently outperforms the older view."
		],
		commonTraps: [
			"treating one dissenter as proof the field is split",
			"confusing public controversy with expert disagreement",
			"flattening settled core and frontier questions into one blurry debate"
		],
		workedExamples: [
			{
				title: "Consensus versus popularity",
				body: "A claim can be widely doubted in public and still be strongly supported in the literature if qualified experts keep reaching the same conclusion."
			},
			{
				title: "Stable core, open edge",
				body: "Experts can strongly agree on the direction of a phenomenon while still debating exact timing, magnitude, or local effects."
			}
		],
		goodSources: [
			"consensus-body methods pages",
			"evidence synthesis handbooks",
			"research on consensus perception and public understanding"
		],
		relatedMisconceptions: ["false-balance-misleads", "uncertainty-isnt-ignorance"]
	},
	{
		slug: "hierarchy-of-evidence",
		title: "How to weigh evidence across a whole literature",
		summary:
			"Not every study carries the same weight. Reviews, meta-analyses, guidelines, and consensus statements usually tell you more than a single paper.",
		whyItMatters:
			"Public confusion often starts when a small or narrow study gets treated like a field-wide verdict.",
		keyPoints: [
			"Study design matters.",
			"High-level syntheses usually beat ad hoc study selection.",
			"Certainty is about the whole body of evidence, not one citation."
		],
		whatPeopleGetWrong:
			"Readers often imagine that 'a study is a study.' In practice, different designs answer different questions and carry different bias risks.",
		coreConcept:
			"A literature should be read as a stack: context and mechanism at the base, higher-quality human studies above that, and systematic summaries near the top. The best public summary usually starts from the top of that stack.",
		howScientistsHandleIt: [
			"They ask what kind of study each source is and what it can actually show.",
			"They use systematic search and inclusion rules to avoid cherry-picking.",
			"They grade the certainty of the body of evidence, not just whether one result was positive."
		],
		commonTraps: [
			"treating mechanism or animal work like direct proof in people",
			"using one study to outrank a systematic review",
			"counting citations instead of weighting them"
		],
		workedExamples: [
			{
				title: "The lone paper problem",
				body: "A new study may be newsworthy, but if several prior reviews already summarize dozens of relevant studies, the new paper joins the stack rather than replacing it."
			},
			{
				title: "Different questions, different evidence",
				body: "A mechanistic study can tell you how something might work, while a trial or population study tells you whether the outcome actually happens in people."
			}
		],
		goodSources: [
			"evidence-synthesis methods guidance",
			"reporting-bias and certainty frameworks",
			"major guidelines and consensus assessments"
		],
		relatedMisconceptions: [
			"one-study-doesnt-overturn-evidence",
			"cherry-picking-distorts-the-evidence",
			"mechanism-is-not-real-world-effect"
		]
	},
	{
		slug: "correlation-vs-causation",
		title: "Causation toolkit for real-world science",
		summary:
			"When two things move together, that does not prove one directly causes the other. Confounders, reverse causation, and selection effects matter.",
		whyItMatters:
			"A large share of misleading advice begins when an association is translated into a causal story too quickly.",
		keyPoints: [
			"Associations can be real without being causal.",
			"Better causal claims need stronger designs.",
			"Observational evidence is useful, but rarely final on its own."
		],
		whatPeopleGetWrong:
			"People often hear 'linked to' and mentally upgrade it to 'caused by.' That shortcut ignores confounding, reverse causation, and measurement artifacts.",
		coreConcept:
			"Causation is a harder claim than association. Scientists get closer to causation by using stronger designs, checking alternative explanations, and looking for converging evidence across methods.",
		howScientistsHandleIt: [
			"They ask what else could create the observed pattern.",
			"They use randomization, quasi-experiments, or triangulation when they can.",
			"They avoid turning every observational signal into advice without stronger support."
		],
		commonTraps: [
			"ignoring confounding variables",
			"mistaking timing for proof of cause",
			"repeating press-release language that overstates the finding"
		],
		workedExamples: [
			{
				title: "Lifestyle confounding",
				body: "If one dietary pattern is more common among wealthier or healthier groups, the apparent health effect may partly reflect those background differences rather than the food alone."
			},
			{
				title: "Reverse direction",
				body: "People with early symptoms may change behavior because they are already getting sick, making it look as if the behavior caused the illness."
			}
		],
		goodSources: [
			"epidemiology guidance",
			"causal inference primers",
			"research on causal overstatement in science communication"
		],
		relatedMisconceptions: ["correlation-isnt-causation"]
	},
	{
		slug: "relative-vs-absolute-risk",
		title: "Risk, benefit, and denominators",
		summary:
			"Doubling a tiny risk can still leave the actual danger small. Always ask what the baseline risk was before the headline.",
		whyItMatters:
			"Risk reporting is one of the easiest places for technically accurate language to leave readers with the wrong impression.",
		keyPoints: [
			"Relative risk can sound dramatic.",
			"Absolute risk anchors the real-world scale.",
			"Time period and baseline risk change the meaning."
		],
		whatPeopleGetWrong:
			"A percentage change sounds precise, but without a denominator it can exaggerate harms or benefits badly.",
		coreConcept:
			"Good risk communication pairs relative changes with absolute numbers and a time horizon. That lets readers judge practical significance rather than just emotional impact.",
		howScientistsHandleIt: [
			"They report baseline risk and absolute change when possible.",
			"They compare harms and benefits on the same scale.",
			"They translate risk into frequencies so real-world meaning stays visible."
		],
		commonTraps: [
			"reporting only relative change",
			"leaving out the time period",
			"treating a rare-event increase like a common-event catastrophe"
		],
		workedExamples: [
			{
				title: "Big percentage, small baseline",
				body: "A 100 percent increase sounds huge, but if the risk moves from 1 in 10,000 to 2 in 10,000, the real-world scale is still small."
			},
			{
				title: "Benefit depends on baseline",
				body: "The same treatment can have a much larger absolute benefit in a high-risk group than in a low-risk group."
			}
		],
		goodSources: [
			"risk communication guidance",
			"evidence-based medicine tools",
			"patient decision-support examples"
		],
		relatedMisconceptions: ["relative-risk-can-mislead", "anecdotes-are-not-population-evidence"]
	},
	{
		slug: "replication-and-correction",
		title: "Replication, correction, and why self-correction matters",
		summary:
			"Science can contain weak papers, publication bias, and failed replications without collapsing as a method. Correction is part of the system.",
		whyItMatters:
			"People often treat a failed replication or retraction as proof that the whole field is fake, when it is often evidence that scrutiny is working.",
		keyPoints: [
			"Single studies are vulnerable to noise and bias.",
			"Replication helps separate durable findings from fragile ones.",
			"Corrections should change confidence, but not automatically erase an entire literature."
		],
		whatPeopleGetWrong:
			"The existence of weak papers or retractions is sometimes used as proof that science has no quality control. In practice, the presence of correction systems is part of the quality control.",
		coreConcept:
			"Science becomes more reliable when results are checked, criticized, replicated, corrected, and summarized across a wider literature. Self-correction is slow and imperfect, but it is central to the method.",
		howScientistsHandleIt: [
			"They replicate key results and compare them to the original claim.",
			"They monitor retractions, major corrections, and expressions of concern.",
			"They update reviews and guidelines when the balance of evidence changes."
		],
		commonTraps: [
			"equating one failed study with a dead field",
			"ignoring the broader literature after a headline correction",
			"treating post-publication criticism like definitive guilt or definitive innocence"
		],
		workedExamples: [
			{
				title: "Retraction changes a source stack",
				body: "A retracted paper should trigger review of any page that cites it, but the page may still stand if the broader evidence remains strong without that source."
			},
			{
				title: "Replication narrows confidence",
				body: "A flashy original result may shrink or disappear under larger, cleaner follow-up work, which is exactly why replication matters."
			}
		],
		goodSources: [
			"replicability reports",
			"retraction and correction guidance",
			"evidence update and living-review methods"
		],
		relatedMisconceptions: [
			"one-study-doesnt-overturn-evidence",
			"scientists-changing-their-minds-is-normal",
			"p-values-are-not-the-whole-story"
		]
	},
	{
		slug: "falsifiability-and-mind-changes",
		title: "Falsifiability and what would change minds",
		summary:
			"A strong claim should say what evidence could prove it wrong. This is how science avoids turning into dogma.",
		whyItMatters:
			"Readers trust explanations more when the conditions for revision are explicit rather than hidden.",
		keyPoints: [
			"Good claims identify what would count against them.",
			"A claim that can explain any result is hard to test.",
			"Revision thresholds should be explicit."
		],
		whatPeopleGetWrong:
			"People sometimes imagine that a consensus claim must be defended no matter what. Good scientific claims instead name the kind of evidence that would lower confidence or force a rewrite.",
		coreConcept:
			"Scientific confidence is strongest when a claim has survived serious opportunities to fail. That is why pages should say what would actually change the current conclusion.",
		howScientistsHandleIt: [
			"They make claims specific enough to be challenged.",
			"They separate stable core from unresolved edge cases.",
			"They keep revision criteria visible in reviews and guidelines."
		],
		commonTraps: [
			"using vague language that cannot be tested",
			"moving the goalposts after contradictory evidence appears",
			"treating every possible counterexample as irrelevant by definition"
		],
		workedExamples: [
			{
				title: "What would really change this page?",
				body: "A page is more trustworthy when it says which kind of contradictory evidence would actually lower confidence and which kind would not."
			},
			{
				title: "Core versus edge",
				body: "A claim can be falsifiable at its core while still leaving room for open questions about magnitude, timing, or mechanism."
			}
		],
		goodSources: [
			"science process education",
			"philosophy of science primers",
			"methods guidance on hypothesis testing and review thresholds"
		],
		relatedMisconceptions: ["scientists-changing-their-minds-is-normal", "uncertainty-isnt-ignorance"]
	},
	{
		slug: "preprints-press-releases-and-headlines",
		title: "Paper, preprint, press release, headline: the science-news pipeline",
		summary:
			"A study result changes as it moves from manuscript to press release to headline. Each step can introduce more certainty, advice, and drama than the original evidence supports.",
		whyItMatters: "Many readers first meet a science claim through media packaging, not through the paper itself.",
		keyPoints: [
			"Preprints are preliminary.",
			"Press releases can add spin.",
			"Headlines often compress uncertainty and context out of the story."
		],
		whatPeopleGetWrong:
			"A headline can be technically related to the paper and still mislead badly by dropping design limits, uncertainty, or the type of evidence involved.",
		coreConcept:
			"Science communication is a pipeline. The further a finding travels from the original methods, the more readers need to inspect what was added, removed, or overstated.",
		howScientistsHandleIt: [
			"They distinguish preprints from peer-reviewed work.",
			"They compare the coverage to the original paper when stakes are high.",
			"They ask whether a media takeaway matches the study design and outcome measures."
		],
		commonTraps: [
			"peer-review status not being mentioned",
			"causal language added to correlational research",
			"animal or mechanistic findings retold as direct human proof"
		],
		workedExamples: [
			{
				title: "Headline drift",
				body: "A careful paper may say 'associated with' while the headline says 'causes,' turning a tentative signal into advice."
			},
			{
				title: "Preprint to policy leap",
				body: "A preliminary paper can be used rhetorically as if it should immediately change behavior long before it survives scrutiny."
			}
		],
		goodSources: [
			"research on preprint interpretation",
			"science journalism best practices",
			"studies of exaggeration in press releases and news"
		],
		relatedMisconceptions: [
			"preprints-are-preliminary",
			"correlation-isnt-causation",
			"one-study-doesnt-overturn-evidence"
		]
	},
	{
		slug: "statistics-beyond-p-values",
		title: "Statistics for readers: beyond p < 0.05",
		summary:
			"A significant p-value does not tell you whether an effect is important, well estimated, or likely to replicate.",
		whyItMatters:
			"Weak statistical reasoning makes noisy findings look stronger and stable findings look more mysterious than they really are.",
		keyPoints: [
			"Effect size matters.",
			"Intervals show uncertainty.",
			"Replication and design quality matter more than one threshold."
		],
		whatPeopleGetWrong:
			"Many readers were taught to treat significance as a verdict instead of one limited statistic inside a larger reasoning process.",
		coreConcept:
			"Statistics help quantify uncertainty and compare competing explanations. They do not remove the need to inspect design, bias, effect size, and replication.",
		howScientistsHandleIt: [
			"They compare effect size, uncertainty, and study quality together.",
			"They worry about multiple testing and selective reporting.",
			"They use replication and synthesis to stabilize what one result cannot settle alone."
		],
		commonTraps: [
			"equating statistical significance with practical significance",
			"treating a null result as proof of no effect",
			"ignoring wide intervals or tiny effects"
		],
		workedExamples: [
			{
				title: "Tiny but significant",
				body: "A huge sample can make a trivial effect statistically significant without making it practically meaningful."
			},
			{
				title: "Interesting but underpowered",
				body: "A small sample may miss a threshold even when the estimated effect is large, leaving uncertainty rather than a clean 'no effect' conclusion."
			}
		],
		goodSources: [
			"statistical society guidance",
			"reproducibility reports",
			"meta-research on p-hacking and selective reporting"
		],
		relatedMisconceptions: ["p-values-are-not-the-whole-story", "cherry-picking-distorts-the-evidence"]
	},
	{
		slug: "hazard-vs-risk-and-exposure",
		title: "Hazard, exposure, dose-response, and safety margins",
		summary:
			"Something can be hazardous in principle and still pose low real-world risk at the doses people actually encounter.",
		whyItMatters:
			"Chemical, additive, vaccine ingredient, and biotechnology claims often collapse possibility into certainty by skipping the exposure question.",
		keyPoints: [
			"Hazard is not the same as risk.",
			"Dose and exposure matter.",
			"Trace presence does not automatically mean meaningful danger."
		],
		whatPeopleGetWrong:
			"Readers often hear 'can cause harm' and assume 'is causing harm now,' even though real-world risk depends on exposure level, route, and context.",
		coreConcept:
			"Good risk assessment separates what could happen in principle from what is likely under actual exposure. That is why hazard identification is only one step in a broader process.",
		howScientistsHandleIt: [
			"They separate hazard identification from exposure assessment.",
			"They model dose-response and compare it to real-world use patterns.",
			"They explain safety margins instead of treating all exposure as equal."
		],
		commonTraps: [
			"equating detectability with danger",
			"ignoring route, frequency, or dose",
			"using the most extreme possible exposure as if it were ordinary"
		],
		workedExamples: [
			{
				title: "Trace is not catastrophic",
				body: "Finding a substance in trace amounts is not the same as showing the exposure is high enough to create meaningful harm."
			},
			{
				title: "Possible versus likely",
				body: "A material may be hazardous at high doses while remaining low-risk in ordinary use because actual exposure is far lower."
			}
		],
		goodSources: [
			"risk-assessment frameworks",
			"food and chemical safety guidance",
			"public-health plain-language explainers"
		],
		relatedMisconceptions: ["hazard-is-not-the-same-as-risk", "mechanism-is-not-real-world-effect"]
	},
	{
		slug: "reading-science-news",
		title: "How to read science news without getting lost",
		summary:
			"Good science reporting still needs context. Check the source type, the study population, the baseline risk, and whether the claim fits inside a broader literature.",
		whyItMatters: "Public confusion often starts with framing, not outright fabrication.",
		keyPoints: [
			"Ask what kind of evidence this is.",
			"Check whether the claim is stronger than the study design allows.",
			"Look for scale, uncertainty, and independent confirmation."
		],
		whatPeopleGetWrong:
			"A headline can sound informative while quietly dropping the evidence type, uncertainty, funding context, or whether the result is new, replicated, or still preliminary.",
		coreConcept:
			"Good reading habits let you inspect a claim before you believe or share it. The goal is not cynicism. The goal is to read scientific claims in proportion to the evidence under them.",
		howScientistsHandleIt: [
			"They ask whether a headline reflects the actual study design.",
			"They look for review status, source quality, and independent agreement.",
			"They treat dramatic coverage as a prompt to inspect, not as a verdict."
		],
		commonTraps: [
			"thinking louder coverage means stronger evidence",
			"treating a preprint like a guideline",
			"sharing the headline without checking the original source"
		],
		workedExamples: [
			{
				title: "Headline first, method never",
				body: "A claim can sound settled until you discover it came from a small observational study or early preprint."
			},
			{
				title: "Missing denominator",
				body: "A risk headline may sound alarming until you translate the claim into absolute numbers and see the scale."
			}
		],
		goodSources: [
			"science communication research",
			"media literacy guidance",
			"editorial standards for evidence-heavy reporting"
		],
		relatedMisconceptions: [
			"one-study-doesnt-overturn-evidence",
			"correlation-isnt-causation",
			"preprints-are-preliminary",
			"relative-risk-can-mislead"
		]
	},
	{
		slug: "uncertainty-and-trust",
		title: "Why uncertainty does not make science unreliable",
		summary:
			"Science can be uncertain and still highly trustworthy. Confidence is about how much evidence points in one direction, not about pretending nothing could ever change.",
		whyItMatters:
			"People often hear honest uncertainty as weakness, when it is usually a sign that the explanation is staying tethered to the evidence.",
		keyPoints: [
			"Confidence ranges are not the same as ignorance.",
			"Strong agreement can coexist with uncertainty about scale or timing.",
			"Trust improves when uncertainty is named precisely instead of hidden."
		],
		whatPeopleGetWrong:
			"Readers often imagine that uncertainty cancels the evidence. In reality, experts often know the direction of a claim more confidently than they know its exact magnitude, local effects, or timetable.",
		coreConcept:
			"Good scientific communication separates what looks stable from what still has wide ranges. That helps people act under uncertainty without collapsing into either overconfidence or cynicism.",
		howScientistsHandleIt: [
			"They separate agreement from certainty.",
			"They use calibrated language when possible.",
			"They update ranges and confidence as methods and evidence improve."
		],
		commonTraps: [
			"treating every unknown as a reason to ignore the evidence",
			"demanding perfect certainty before any action",
			"hiding uncertainty until critics expose it"
		],
		workedExamples: [
			{
				title: "Direction is clearer than magnitude",
				body: "A field may strongly agree that an effect exists while still debating exactly how large it is in different contexts."
			},
			{
				title: "Risk management under uncertainty",
				body: "Policy and personal decisions often have to be made before every interval narrows, which is why calibrated uncertainty matters more than false certainty."
			}
		],
		goodSources: [
			"consensus assessment guidance",
			"risk-management frameworks",
			"public understanding of science research"
		],
		relatedMisconceptions: ["uncertainty-isnt-ignorance", "false-balance-misleads"]
	}
];

export function getExplainer(slug: string) {
	return evergreenExplainers.find((item) => item.slug === slug);
}
