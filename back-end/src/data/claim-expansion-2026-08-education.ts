import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026EducationClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Do later school start times improve adolescent sleep and well-being?",
		slug: "do-later-school-start-times-improve-adolescent-sleep-and-well-being",
		consensusBand: "broad",
		confidenceScore: 89,
		evidenceCertainty: "moderate",
		bottomLine:
			"Starting middle and high school later generally gives adolescents more sleep and reduces daytime sleepiness; reviews also find better mood and some safety or attendance benefits. Academic effects are smaller and less consistent. Start time is one practical lever, not a substitute for healthy schedules, and transport, family, work, and extracurricular tradeoffs matter.",
		stableCore: [
			"Puberty shifts circadian timing later, so very early starts conflict with adolescent biology as well as bedtime choices.",
			"Across observational studies and natural experiments, later starts usually lengthen school-night sleep rather than simply moving bedtime equally later.",
			"Sleepiness and mood outcomes are more consistently favorable than grades or standardized test scores.",
			"Effects depend on how large the delay is and whether scheduling changes preserve the opportunity to sleep."
		],
		openQuestions: [
			"How durable are benefits across different transport systems, school types, latitudes, and socioeconomic groups?",
			"Which schedules best balance sleep with after-school work, athletics, family care, and staff constraints?"
		],
		whatWouldChangeMinds: [
			"Strong controlled evaluations consistently showing no additional sleep after meaningful start-time delays.",
			"Evidence that implementation burdens or displaced activities create harms as large as the sleep and well-being benefits."
		],
		misconceptions: [
			"Later starts do not guarantee higher grades, even when they improve sleep.",
			"Telling every teenager to go to bed earlier does not remove the biological shift in circadian timing.",
			"An 8:30 recommendation is a policy threshold, not a biological cliff that fits every student identically."
		],
		editorSummary:
			"The clearest consensus concerns sleep opportunity: later secondary-school starts usually produce more sleep. Claims about large academic gains should remain more cautious, and local implementation belongs in the policy discussion.",
		uncertaintySummary:
			"Random assignment is uncommon and schedules change alongside other school practices. The sleep result is convergent, while academic, equity, transport, and long-term health effects are more heterogeneous.",
		sources: [
			{
				kind: "guideline",
				title: "School Start Times for Adolescents",
				publisher: "American Academy of Pediatrics",
				year: 2014,
				url: "https://doi.org/10.1542/peds.2014-1697",
				doi: "10.1542/peds.2014-1697",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "AAP policy statement identifying starts before 8:30 a.m. as a modifiable contributor to adolescent sleep loss and recommending later schedules.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "School Start Times, Sleep, and Youth Outcomes: A Meta-analysis",
				publisher: "Pediatrics",
				year: 2022,
				url: "https://doi.org/10.1542/peds.2021-054068",
				doi: "10.1542/peds.2021-054068",
				appraisal: "high",
				stance: "supports",
				note: "Meta-analysis of 28 studies and roughly 1.77 million participants linking later starts with longer sleep, less sleepiness, and better overall developmental outcomes.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Later school start times for supporting the education, health, and well-being of high school students: a systematic review",
				publisher: "Campbell Systematic Reviews",
				year: 2017,
				url: "https://doi.org/10.4073/csr.2017.15",
				doi: "10.4073/csr.2017.15",
				appraisal: "high",
				stance: "context",
				note: "Systematic review finding positive sleep-related signals while emphasizing weak designs, variable outcomes, and low confidence in several non-sleep effects.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Does systematic phonics instruction help children learn to read?",
		slug: "does-systematic-phonics-instruction-help-children-learn-to-read",
		consensusBand: "broad",
		confidenceScore: 87,
		evidenceCertainty: "moderate",
		bottomLine:
			"Explicit, systematic teaching of letter-sound relationships improves early decoding and word reading compared with little or unsystematic phonics, especially for beginning readers and children at risk of reading difficulty. Phonics is one necessary component of literacy instruction—not a complete reading curriculum—and researchers still debate the size, durability, and superiority of particular phonics programs.",
		stableCore: [
			"Learning an alphabetic writing system requires understanding how written symbols map onto speech sounds.",
			"Systematic phonics produces its clearest benefits for decoding unfamiliar words, spelling, and early word recognition.",
			"Vocabulary, oral language, background knowledge, fluency, motivation, and comprehension instruction remain essential.",
			"Evidence for including explicit phonics is stronger than evidence that one branded sequence or synthetic-only mandate is best everywhere."
		],
		openQuestions: [
			"Which sequence, dosage, texts, and integration with language and comprehension work best for different learners and orthographies?",
			"How much of the early decoding advantage persists in broad comprehension outcomes over several years?"
		],
		whatWouldChangeMinds: [
			"Modern, well-powered trials consistently finding no decoding benefit over instruction without systematic letter-sound teaching.",
			"Comparative evidence showing a different integrated approach produces stronger and more durable reading outcomes across learner groups."
		],
		misconceptions: [
			"Support for phonics does not mean children should only read decontextualized word lists.",
			"A decoding benefit is not identical to complete reading comprehension.",
			"Disagreement over program design does not imply that letter-sound knowledge is irrelevant."
		],
		editorSummary:
			"The useful consensus is narrower than a culture-war slogan: systematic phonics belongs in early reading instruction, alongside rich language and comprehension work. Claims that phonics alone is sufficient or that one method has settled every comparison overreach the evidence.",
		uncertaintySummary:
			"The influential evidence base includes older trials with variable controls and outcome measures. Benefits are clearest for code-related skills; comparative program effects and long-term comprehension are less settled.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Report of the National Reading Panel: Phonics Instruction",
				publisher: "National Institute of Child Health and Human Development",
				year: 2000,
				url: "https://www.nichd.nih.gov/publications/pubs/nrp/Pages/findings.aspx",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Congressionally requested evidence review concluding that systematic phonics improves word reading and spelling, with effects varying by age and outcome.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Systematic Phonics Instruction Helps Students Learn to Read: Evidence from the National Reading Panel's Meta-Analysis",
				publisher: "Review of Educational Research",
				year: 2001,
				url: "https://doi.org/10.3102/00346543071003393",
				doi: "10.3102/00346543071003393",
				appraisal: "high",
				stance: "supports",
				note: "Detailed meta-analysis finding benefits for decoding, spelling, and early reading, particularly when instruction begins before reading difficulty is entrenched.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Reconsidering the Evidence That Systematic Phonics Is More Effective Than Alternative Methods of Reading Instruction",
				publisher: "Educational Psychology Review",
				year: 2020,
				url: "https://doi.org/10.1007/s10648-019-09515-y",
				doi: "10.1007/s10648-019-09515-y",
				appraisal: "moderate",
				stance: "debate",
				note: "Methodological critique arguing that stronger head-to-head evidence is needed before claiming systematic phonics outperforms common active alternatives on broad reading outcomes.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Do smaller classes substantially improve student achievement?",
		slug: "do-smaller-classes-substantially-improve-student-achievement",
		consensusBand: "broad",
		confidenceScore: 79,
		evidenceCertainty: "moderate",
		bottomLine:
			"Smaller classes can improve achievement, especially in early grades, for disadvantaged students, and when reductions are large enough to change teaching. Average gains are usually small relative to the cost, and trimming only a few students without changing instruction is unlikely to transform results.",
		stableCore: [
			"The strongest experimental evidence from early elementary grades found modest achievement gains from substantially smaller classes.",
			"Reviews outside that experiment find smaller, inconsistent, or near-zero average effects, particularly for mathematics and secondary grades.",
			"Class size matters partly through what teachers can do differently: feedback, interaction, grouping, and classroom management.",
			"Cost-effectiveness depends on the alternative use of teachers, space, and funding."
		],
		openQuestions: [
			"Which students, grade levels, subjects, and instructional changes benefit enough to justify the cost?",
			"When is targeted tutoring or additional classroom support more effective than reducing every class?"
		],
		whatWouldChangeMinds: [
			"Large modern experiments showing consistently large gains from modest class-size reductions across grades and subjects.",
			"Strong evidence that even substantial reductions do not improve outcomes for any identifiable student group."
		],
		misconceptions: [
			"A statistically detectable effect need not be large enough to justify a system-wide policy.",
			"Teacher-student ratio and the number of students physically present in one class are not always the same measure.",
			"Smaller classes create opportunity for different teaching; they do not guarantee that practice changes."
		],
		editorSummary:
			"Class-size reduction is a real but usually modest lever. The evidence rejects both extremes: class size never matters, and broadly shaving a few students from every room is an educational cure-all.",
		uncertaintySummary:
			"A large share of the literature is observational or reuses a few influential experiments. Effects vary by baseline size, reduction magnitude, teacher supply, age, disadvantage, subject, and implementation.",
		sources: [
			{
				kind: "systematic_review",
				title: "Reducing class size",
				publisher: "Education Endowment Foundation",
				year: 2025,
				url: "https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/reducing-class-size",
				isAnchor: true,
				appraisal: "high",
				stance: "context",
				note: "Living evidence toolkit rating average impact as small and cost as very high, with larger reductions and changed teaching practice central to benefit.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Small class sizes for improving student achievement in primary and secondary schools: a systematic review",
				publisher: "Campbell Systematic Reviews",
				year: 2018,
				url: "https://doi.org/10.4073/csr.2018.10",
				doi: "10.4073/csr.2018.10",
				appraisal: "high",
				stance: "context",
				note: "International review finding at best a small reading effect and no significant average mathematics benefit, with many studies excluded for bias.",
				order: 2
			},
			{
				kind: "systematic_review",
				title: "Class Size and Student Achievement",
				publisher: "Psychological Science in the Public Interest",
				year: 2001,
				url: "https://doi.org/10.1111/1529-1006.003",
				doi: "10.1111/1529-1006.003",
				appraisal: "moderate",
				stance: "context",
				note: "Broad review explaining plausible classroom mechanisms, the Project STAR evidence, heterogeneous effects, and resource tradeoffs.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Does making a student repeat a grade reliably improve long-term outcomes?",
		slug: "does-making-a-student-repeat-a-grade-reliably-improve-long-term-outcomes",
		consensusBand: "broad",
		confidenceScore: 81,
		evidenceCertainty: "low",
		bottomLine:
			"Making a student repeat a grade does not reliably improve long-term academic or social outcomes and can increase disengagement and dropout risk. Some students show short-term gains, and individual circumstances matter, but repeating the same year without substantially different support is generally a weak substitute for targeted intervention.",
		stableCore: [
			"Students who are retained differ from promoted students before the decision, which makes causal comparisons difficult.",
			"Short-term achievement gains sometimes appear because retained students are compared with younger classmates or receive the material again.",
			"Benefits often fade, while stigma, delayed completion, and dropout are important potential costs.",
			"Intensive tutoring, instructional changes, attendance support, and individualized plans address the underlying learning need more directly."
		],
		openQuestions: [
			"Which rare circumstances, ages, and accompanying supports make an additional year beneficial rather than harmful?",
			"How do modern promotion policies compare with well-funded targeted alternatives over many years?"
		],
		whatWouldChangeMinds: [
			"Strong quasi-experimental or randomized evidence showing durable net benefits across common retention policies.",
			"Reliable tools that identify in advance which students benefit, paired with evidence that alternatives perform worse."
		],
		misconceptions: [
			"Advancing a student and providing intensive support is not the same as ignoring a learning gap.",
			"A temporary test-score rise after repeating material does not establish a long-term benefit.",
			"An unfavorable average does not prove that repeating a year is wrong in every exceptional individual case."
		],
		editorSummary:
			"The evidence does not support grade retention as a dependable default remedy. Decisions should begin with the specific cause of difficulty and whether an additional year will actually provide different, effective support.",
		uncertaintySummary:
			"Certainty is limited by selection bias, inconsistent comparison groups, policy differences, and changing effects over time. Reviews range from average null effects to net harm, with little ability to predict individual benefit.",
		sources: [
			{
				kind: "systematic_review",
				title: "Repeating a year",
				publisher: "Education Endowment Foundation",
				year: 2025,
				url: "https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/repeating-a-year",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Living evidence summary reporting negative average progress, larger risks for disadvantaged students, high cost, and low overall evidence security.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Effectiveness of grade retention: A systematic review and meta-analysis",
				publisher: "Educational Research Review",
				year: 2021,
				url: "https://doi.org/10.1016/j.edurev.2021.100401",
				doi: "10.1016/j.edurev.2021.100401",
				appraisal: "high",
				stance: "context",
				note: "Updated synthesis estimating an average effect near zero while documenting large variation by outcome, design, timing, and educational context.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Meta-analysis of Grade Retention Research: Implications for Practice in the 21st Century",
				publisher: "School Psychology Review",
				year: 2001,
				url: "https://doi.org/10.1080/02796015.2001.12086124",
				doi: "10.1080/02796015.2001.12086124",
				appraisal: "moderate",
				stance: "supports",
				note: "Influential synthesis finding poorer academic and socioemotional outcomes on average and urging alternatives to a simple retention-versus-social-promotion choice.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Do school uniforms improve academic achievement or student behavior?",
		slug: "do-school-uniforms-improve-academic-achievement-or-student-behavior",
		consensusBand: "unclear",
		confidenceScore: 48,
		evidenceCertainty: "very_low",
		bottomLine:
			"There is not strong evidence that requiring school uniforms by itself improves grades, attendance, or behavior. Uniforms may support a broader school identity or simplify clothing decisions, but policies are usually adopted alongside other changes, and costs, comfort, enforcement, equity, and student expression can also affect outcomes.",
		stableCore: [
			"The evidence base is small, mostly observational, and vulnerable to differences between schools that do and do not adopt uniforms.",
			"Uniform policies are commonly bundled with discipline, leadership, safety, or culture initiatives, making the uniform's independent effect difficult to isolate.",
			"No robust synthesis establishes uniforms as a stand-alone academic intervention.",
			"Fit, affordability, climate, gender rules, physical activity, disability, and cultural inclusion are part of the policy's real effects."
		],
		openQuestions: [
			"Do flexible, affordable uniform policies affect belonging, bullying, attendance, or physical activity in particular settings?",
			"Which claimed benefits come from clothing rules and which come from simultaneous changes in school climate or enforcement?"
		],
		whatWouldChangeMinds: [
			"Well-designed natural experiments or randomized rollouts showing consistent academic or behavioral gains attributable to uniforms.",
			"Strong evidence that particular policy designs reliably cause material physical, financial, or exclusion harms."
		],
		misconceptions: [
			"A tidy appearance is not itself evidence of improved learning.",
			"A lack of proven academic benefit does not mean communities may have no other legitimate reasons for a dress policy.",
			"Comparing one uniform school with one non-uniform school cannot separate the policy from all their other differences."
		],
		editorSummary:
			"Uniform debates are often conducted with more certainty than the research allows. The defensible conclusion is that uniforms are not a proven stand-alone route to better grades or conduct; local goals and burdens should be evaluated directly.",
		uncertaintySummary:
			"Very low certainty reflects few causal studies, inconsistent outcomes, bundled school reforms, self-selection, and substantial variation in what counts as a uniform policy.",
		sources: [
			{
				kind: "systematic_review",
				title: "School uniform",
				publisher: "Education Endowment Foundation",
				year: 2025,
				url: "https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/school-uniform",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Living toolkit finding insufficient evidence for an average attainment effect and little robust support for stand-alone behavior or attendance gains.",
				order: 1
			},
			{
				kind: "systematic_review",
				title: "Reviewing School Uniform through a Public Health Lens: Evidence about the Impacts of School Uniform on Education and Health",
				publisher: "Public Health Reviews",
				year: 2021,
				url: "https://doi.org/10.3389/phrs.2021.1604212",
				doi: "10.3389/phrs.2021.1604212",
				appraisal: "moderate",
				stance: "context",
				note: "Review broadening the question beyond attainment to comfort, physical activity, gender, affordability, and other health or equity pathways.",
				order: 2
			},
			{
				kind: "landmark_study",
				title: "Effects of Student Uniforms on Attendance, Behavior Problems, Substance Use, and Academic Achievement",
				publisher: "Journal of Educational Research",
				year: 1998,
				url: "https://doi.org/10.1080/00220679809597575",
				doi: "10.1080/00220679809597575",
				appraisal: "moderate",
				stance: "context",
				note: "Frequently cited observational analysis illustrating why positive policy claims can weaken after student and school differences are considered.",
				order: 3
			}
		]
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Does homework improve academic achievement?",
		slug: "does-homework-improve-academic-achievement",
		consensusBand: "broad",
		confidenceScore: 77,
		evidenceCertainty: "low",
		bottomLine:
			"Purposeful homework is associated with better achievement on average, especially in secondary school, when it practices classroom learning and receives feedback. Benefits are smaller and less certain for young children, more time is not always better, and poorly designed assignments can increase stress and inequity without improving learning.",
		stableCore: [
			"Age is a major moderator: associations and intervention effects are generally stronger in secondary than primary school.",
			"Task quality, clear purpose, manageable dose, alignment with instruction, and feedback matter more than simply assigning many minutes.",
			"Much of the evidence is correlational, so motivated students and stronger schools can make homework look more effective than it is.",
			"Unequal access to time, quiet space, devices, adult help, and tutoring can turn homework into an equity issue."
		],
		openQuestions: [
			"What dosage and task design work best by age, subject, prior attainment, and learning need?",
			"How can schools preserve useful practice without shifting teaching costs and support demands onto families?"
		],
		whatWouldChangeMinds: [
			"High-quality trials consistently finding no benefit from well-designed, curriculum-linked homework in secondary students.",
			"Evidence that specific low-burden alternatives produce equal or greater learning with fewer stress and equity costs."
		],
		misconceptions: [
			"More homework is not automatically better homework.",
			"A positive average for older students does not justify heavy nightly assignments for young children.",
			"Students who complete more homework may differ in motivation and support before homework affects their grades."
		],
		editorSummary:
			"Homework is neither useless nor universally beneficial. The evidence supports selective, age-appropriate practice tied to instruction and feedback, while rejecting workload as a proxy for rigor.",
		uncertaintySummary:
			"Low certainty reflects reliance on correlational studies, inconsistent definitions and time measures, publication bias risk, and wide variation by age, subject, assignment, feedback, and home resources.",
		sources: [
			{
				kind: "systematic_review",
				title: "Homework",
				publisher: "Education Endowment Foundation",
				year: 2021,
				url: "https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/homework",
				isAnchor: true,
				appraisal: "high",
				stance: "supports",
				note: "Evidence toolkit reporting positive average effects, stronger secondary-school results, and the importance of quality, alignment, feedback, and access.",
				order: 1
			},
			{
				kind: "meta_analysis",
				title: "Homework and students' achievement in math and science: A 30-year meta-analysis, 1986-2015",
				publisher: "Educational Research Review",
				year: 2017,
				url: "https://doi.org/10.1016/j.edurev.2016.11.003",
				doi: "10.1016/j.edurev.2016.11.003",
				appraisal: "high",
				stance: "supports",
				note: "Long-run synthesis finding a positive but heterogeneous homework-achievement relationship in mathematics and science, moderated by grade and design.",
				order: 2
			},
			{
				kind: "meta_analysis",
				title: "Does Homework Improve Academic Achievement? A Synthesis of Research, 1987-2003",
				publisher: "Review of Educational Research",
				year: 2006,
				url: "https://doi.org/10.3102/00346543076001001",
				doi: "10.3102/00346543076001001",
				appraisal: "moderate",
				stance: "context",
				note: "Influential synthesis finding more consistent benefits in grades 7-12 than in elementary school and warning against simple time-equals-learning conclusions.",
				order: 3
			}
		]
	})
];
