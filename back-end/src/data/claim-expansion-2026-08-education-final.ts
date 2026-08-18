import type { SeedClaim } from "./claims.js";
import {
	august2026EncyclopediaTrancheFiveSourcedClaim as reviewedClaim,
	encyclopediaDoiSources as sources
} from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026EducationFinalClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Does retrieval practice improve long-term learning?",
		slug: "does-retrieval-practice-improve-long-term-learning",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Trying to recall material—through low-stakes quizzes, practice questions, or self-testing—usually produces better delayed retention than spending the same time rereading. Feedback, spacing, question quality, and alignment with the learning goal matter, and testing should support learning rather than merely add grades or pressure.",
		stableCore: [
			"Retrieval strengthens later access to learned information and exposes gaps that passive review can hide.",
			"Benefits appear across laboratory and classroom studies, subjects, ages, and test formats, although effect sizes vary.",
			"Corrective feedback is especially important when initial recall is difficult or errors are likely."
		],
		openQuestions: [
			"Which schedules and question formats best promote transfer to complex reasoning rather than recall alone?",
			"How should retrieval practice be adapted for novices, anxious learners, and students with different support needs?"
		],
		whatWouldChangeMinds: [
			"Large classroom trials finding no delayed-learning advantage over equally engaging non-retrieval activities.",
			"Evidence that apparent gains disappear when time on task, feedback, and initial difficulty are matched."
		],
		misconceptions: [
			"Retrieval practice is not the same as frequent high-stakes exams.",
			"A quiz can be a learning event, not only a measurement event.",
			"Rote recall alone is not a complete curriculum for understanding or transfer."
		],
		editorSummary:
			"Use frequent, low-stakes opportunities to recall important ideas, then give useful feedback and revisit them over time.",
		uncertaintySummary:
			"The average retention benefit is robust. Optimal spacing, difficulty, feedback, transfer, and classroom implementation remain context dependent.",
		sources: sources([
			["systematic_review", "Retrieval Practice Consistently Benefits Student Learning: a Systematic Review of Applied Research in Schools and Classrooms", "Educational Psychology Review", 2021, "10.1007/s10648-021-09595-9", "Systematic review of classroom research finding consistent learning benefits across educational settings."],
			["meta_analysis", "The effect of testing versus restudy on retention: a meta-analytic review of the testing effect", "Psychological Bulletin", 2014, "10.1037/a0037559", "Meta-analysis quantifying the delayed-retention advantage of retrieval over restudy and its moderators."],
			["meta_analysis", "Rethinking the Use of Tests: A Meta-Analysis of Practice Testing", "Review of Educational Research", 2017, "10.3102/0034654316689306", "Broad synthesis of practice testing across learner, test, feedback, and outcome conditions."]
		])
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Does spacing study sessions improve retention?",
		slug: "does-spacing-study-sessions-improve-retention",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Distributing study across multiple sessions generally produces better long-term retention than massing the same practice into one sitting. The most useful interval depends on how long the material must be remembered, and spacing works best with meaningful practice and retrieval—not simply leaving long gaps without re-engagement.",
		stableCore: [
			"The spacing effect is one of the most replicated findings in learning science.",
			"Cramming can raise immediate familiarity while producing faster forgetting after the test.",
			"Longer retention goals usually call for wider review intervals, although no single schedule fits every task."
		],
		openQuestions: [
			"Which adaptive schedules best balance forgetting, difficulty, and curriculum constraints for individual learners?",
			"How should spacing be combined with interleaving and retrieval for complex, cumulative skills?"
		],
		whatWouldChangeMinds: [
			"Well-controlled syntheses showing that massed practice retains an advantage on delayed tests across domains.",
			"Evidence that spacing benefits are entirely explained by unequal time, attention, or test exposure."
		],
		misconceptions: [
			"Spacing does not mean studying less; it redistributes practice.",
			"Feeling fluent during a cram session does not guarantee durable memory.",
			"The ideal interval is not a fixed number of days for every goal."
		],
		editorSummary:
			"Revisit important material before it is permanently forgotten, and spread those encounters across the period in which the knowledge must last.",
		uncertaintySummary:
			"The directional effect is highly secure. Exact scheduling, transfer to complex performance, and implementation across courses remain active design questions.",
		sources: sources([
			["meta_analysis", "A Meta-Analytic Review of the Benefit of Spacing Out Retrieval Practice Episodes on Retention", "Educational Psychology Review", 2021, "10.1007/s10648-020-09572-8", "Classroom-relevant synthesis of spacing between retrieval episodes and later retention."],
			["meta_analysis", "Distributed practice in verbal recall tasks: A review and quantitative synthesis", "Psychological Bulletin", 2006, "10.1037/0033-2909.132.3.354", "Large quantitative review establishing how study and test intervals shape the spacing advantage."],
			["systematic_review", "Improving Students' Learning With Effective Learning Techniques: Promising Directions From Cognitive and Educational Psychology", "Psychological Science in the Public Interest", 2013, "10.1177/1529100612453266", "Evidence review rating distributed practice among the most broadly useful study techniques."]
		])
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Does matching instruction to a student's learning style improve achievement?",
		slug: "does-matching-instruction-to-a-students-learning-style-improve-achievement",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"There is no good evidence that assigning students as visual, auditory, or kinesthetic learners and matching instruction to that label improves learning. Teaching should vary with the material and use multiple useful representations; preferences can matter for engagement, but a preference is not a fixed cognitive type or a demonstrated matching prescription.",
		stableCore: [
			"A valid matching claim requires a crossover interaction: each labeled group must learn better from its supposedly matched method than from the alternative.",
			"Properly designed studies have not produced a consistent pattern supporting that interaction.",
			"Different content genuinely calls for different modes—for example, maps are visual and pronunciation is auditory—without sorting students into types."
		],
		openQuestions: [
			"Which learner characteristics do predict who benefits from particular forms of scaffolding or practice?",
			"How can teachers honor preferences without cementing limiting beliefs about ability?"
		],
		whatWouldChangeMinds: [
			"Preregistered crossover trials repeatedly finding the predicted aptitude-by-treatment interaction with durable learning outcomes.",
			"A validated classification that predicts instructional response beyond prior knowledge, ability, motivation, and task demands."
		],
		misconceptions: [
			"Enjoying diagrams does not prove a person learns all subjects best visually.",
			"Rejecting learning-style matching does not support one-mode lectures.",
			"Individual differences are real even though this popular taxonomy performs poorly."
		],
		editorSummary:
			"Match representation to the idea and use evidence-based supports; do not restrict students to a self-reported sensory label.",
		uncertaintySummary:
			"Evidence against the common matching hypothesis is strong. Research continues on more defensible interactions among prior knowledge, cognition, task, and instruction.",
		sources: sources([
			["systematic_review", "Learning Styles: Concepts and Evidence", "Psychological Science in the Public Interest", 2009, "10.1111/j.1539-6053.2009.01038.x", "Foundational review specifying the required test and finding inadequate evidence for learning-style matching."],
			["landmark_study", "Another Nail in the Coffin for Learning Styles? Disparities among Undergraduate Anatomy Students' Study Strategies, Class Performance, and Reported VARK Attributes", "Anatomical Sciences Education", 2019, "10.1002/ase.1777", "Study finding no performance support for matching study strategies to reported VARK categories."],
			["systematic_review", "How Common Is Belief in the Learning Styles Neuromyth, and Does It Matter? A Pragmatic Systematic Review", "Frontiers in Education", 2020, "10.3389/feduc.2020.602451", "Review documenting widespread continued belief and reported use despite the absence of a validated matching benefit."]
		])
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Do brief growth-mindset interventions produce large, reliable academic gains?",
		slug: "do-brief-growth-mindset-interventions-produce-large-reliable-academic-gains",
		consensusBand: "broad",
		confidenceScore: 85,
		evidenceCertainty: "moderate",
		bottomLine:
			"Usually not large gains. Growth-mindset interventions can produce small average improvements, with more promise for some lower-achieving or supportive school contexts, but effects are heterogeneous and sensitive to study quality. Teaching that abilities can develop is not a substitute for strong curriculum, instruction, resources, or concrete opportunities to improve.",
		stableCore: [
			"The intervention changes beliefs more reliably than it changes grades or test scores.",
			"Large representative experiments find small average academic effects rather than the dramatic gains sometimes advertised.",
			"Context matters: a message about improvement is less useful where students lack effective strategies, support, or opportunity."
		],
		openQuestions: [
			"Which students and school climates convert a mindset change into durable academic behavior and achievement?",
			"How much of the published average remains after accounting for researcher allegiance, publication bias, and implementation quality?"
		],
		whatWouldChangeMinds: [
			"Independent multisite trials finding large durable gains from brief interventions alone across ordinary school contexts.",
			"High-quality replications consistently finding no belief or outcome effect in any prespecified subgroup."
		],
		misconceptions: [
			"A small average effect is neither a miracle nor necessarily zero value.",
			"Growth mindset does not mean effort always overcomes structural barriers or ineffective practice.",
			"Praising effort without feedback or strategy is not the tested intervention."
		],
		editorSummary:
			"Treat growth mindset as a potentially useful, low-intensity component whose academic effect is usually small and context dependent.",
		uncertaintySummary:
			"Meta-analyses disagree in emphasis because inclusion rules and bias adjustments differ. Large trials support small, uneven effects rather than universal transformation.",
		sources: sources([
			["meta_analysis", "Do Growth Mindset Interventions Impact Students' Academic Achievement? A Systematic Review and Meta-Analysis With Recommendations for Best Practices", "Psychological Bulletin", 2023, "10.1037/bul0000352", "Critical meta-analysis finding very small effects that shrink under higher-quality design and bias controls."],
			["meta_analysis", "A systematic review and meta-analysis of growth mindset interventions: For whom, how, and why might such interventions work?", "Psychological Bulletin", 2023, "10.1037/bul0000368", "Synthesis reporting small average benefits with theoretically relevant moderators.", "debate"],
			["landmark_study", "A national experiment reveals where a growth mindset improves achievement", "Nature", 2019, "10.1038/s41586-019-1466-y", "Large U.S. experiment finding a small average grade benefit concentrated in particular students and school contexts."]
		])
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Does intensive tutoring improve student achievement?",
		slug: "does-intensive-tutoring-improve-student-achievement",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Frequent, sustained tutoring in very small groups—especially during the school day and aligned with classroom work—can produce substantial learning gains. Effects are smaller when programs are infrequent, poorly attended, weakly trained, or scaled without the conditions that made the original model effective.",
		stableCore: [
			"Meta-analyses find tutoring among the more effective educational interventions, with especially strong average mathematics effects.",
			"High dosage, consistent tutor-student relationships, structured materials, feedback, and curriculum alignment support effectiveness.",
			"A program's label does not guarantee quality; staffing, scheduling, attendance, and implementation determine realized benefit."
		],
		openQuestions: [
			"Which lower-cost staffing and technology supports preserve effectiveness at district or national scale?",
			"How should tutoring be targeted without stigmatizing students or replacing strong core instruction?"
		],
		whatWouldChangeMinds: [
			"Large randomized implementations finding no meaningful gains despite high dosage, attendance, and instructional quality.",
			"Evidence that comparable resources consistently produce larger and more equitable gains through another scalable intervention."
		],
		misconceptions: [
			"Occasional homework help is not the same intervention as high-dosage tutoring.",
			"Large efficacy effects do not automatically survive weak scale-up.",
			"Tutoring supplements rather than excuses poor classroom instruction."
		],
		editorSummary:
			"Tutoring works best as protected instructional time with a coherent model, not as an optional add-on students rarely attend.",
		uncertaintySummary:
			"Average effects are robust, but costs, staffing, fidelity, subject, tutor type, and student attendance produce substantial variation.",
		sources: sources([
			["meta_analysis", "The Promise of Tutoring for PreK–12 Learning: A Systematic Review and Meta-Analysis of the Experimental Evidence", "American Educational Research Journal", 2024, "10.3102/00028312231208687", "Large synthesis finding substantial average effects and identifying design features associated with stronger programs."],
			["meta_analysis", "Academic Interventions for Elementary and Middle School Students With Low Socioeconomic Status: A Systematic Review and Meta-Analysis", "Review of Educational Research", 2017, "10.3102/0034654316687036", "Review finding tutoring and feedback-oriented approaches among effective supports for disadvantaged students."],
			["landmark_study", "Not Too Late: Improving Academic Outcomes among Adolescents", "American Economic Review", 2023, "10.1257/aer.20210434", "Randomized evaluation showing intensive individualized instruction can improve adolescent mathematics outcomes."]
		])
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Do universal school social-emotional learning programs improve outcomes?",
		slug: "do-universal-school-social-emotional-learning-programs-improve-outcomes",
		consensusBand: "broad",
		confidenceScore: 90,
		evidenceCertainty: "moderate",
		bottomLine:
			"On average, well-implemented universal social-emotional learning programs produce small-to-moderate improvements in social-emotional skills, behavior, well-being, and sometimes academic performance. Programs vary widely, effects are not universal, and SEL should not be presented as therapy or as a substitute for safe schools and mental-health care.",
		stableCore: [
			"Large syntheses find favorable average effects across several student outcomes compared with usual practice.",
			"Implementation quality, cultural fit, staff support, and program design are important moderators.",
			"Universal prevention and classroom skill-building serve different needs from diagnosis and individual treatment."
		],
		openQuestions: [
			"Which specific components produce durable benefits across cultures, ages, and school conditions?",
			"How can schools monitor unintended burden, inequity, superficial compliance, or displacement of academic and clinical supports?"
		],
		whatWouldChangeMinds: [
			"Independent updated syntheses finding no benefit after restricting to low-bias trials and durable outcomes.",
			"Evidence that broad implementation routinely creates harms or opportunity costs larger than measured benefits."
		],
		misconceptions: [
			"SEL is an umbrella category, not one standardized program.",
			"An average benefit does not mean every curriculum works for every child.",
			"Classroom lessons cannot replace clinical care for a student who needs it."
		],
		editorSummary:
			"Universal SEL can help, but the useful question is which program, implemented how well, for which outcomes and students.",
		uncertaintySummary:
			"Positive average effects recur across reviews; heterogeneity, outcome reporting, long-term durability, and implementation at scale reduce certainty about any one program.",
		sources: sources([
			["meta_analysis", "The State of Evidence for Social and Emotional Learning: A Contemporary Meta-Analysis of Universal School-Based SEL Interventions", "Child Development", 2023, "10.1111/cdev.13968", "Contemporary synthesis of universal school-based programs across skills, behavior, well-being, and academic outcomes."],
			["meta_analysis", "The Impact of Enhancing Students' Social and Emotional Learning: A Meta-Analysis of School-Based Universal Interventions", "Child Development", 2011, "10.1111/j.1467-8624.2010.01564.x", "Landmark review finding positive average student effects and the importance of sound program practices."],
			["meta_analysis", "Promoting Positive Youth Development Through School-Based Social and Emotional Learning Interventions: A Meta-Analysis of Follow-Up Effects", "Child Development", 2017, "10.1111/cdev.12864", "Follow-up synthesis examining whether benefits persist beyond the immediate program period."]
		])
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Does active learning outperform traditional lecture in undergraduate STEM?",
		slug: "does-active-learning-outperform-traditional-lecture-in-undergraduate-stem",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, on average. Undergraduate STEM courses that require students to solve, discuss, explain, retrieve, or apply ideas during class produce higher exam performance and lower failure rates than lecture-dominant instruction. Active learning is a family of practices, and poorly designed activity is not automatically effective.",
		stableCore: [
			"Meta-analysis across many STEM disciplines finds improved performance and reduced course failure.",
			"Well-structured active learning can narrow achievement gaps for students from underrepresented or disadvantaged groups.",
			"Expert explanation remains useful; the contrast is sustained cognitive participation versus mostly passive reception, not activity versus any teaching."
		],
		openQuestions: [
			"Which combinations of explanation, practice, peer interaction, and feedback work best for different disciplines and class sizes?",
			"How can institutions help instructors implement active learning with high fidelity and accessibility?"
		],
		whatWouldChangeMinds: [
			"Large multisite comparisons finding no performance or failure-rate advantage after matching assessment and instructor support.",
			"Evidence that observed benefits mainly reflect easier exams, selective reporting, or unequal instructional time."
		],
		misconceptions: [
			"Active learning does not require abandoning lectures entirely.",
			"Students may feel they learned less from a more effortful lesson even when testing shows they learned more.",
			"Any group activity is not automatically evidence-based active learning."
		],
		editorSummary:
			"Build class time around guided thinking and feedback, using concise explanation where it supports that work.",
		uncertaintySummary:
			"The average advantage in undergraduate STEM is robust. Practice quality, assessment alignment, instructor support, and institutional context determine magnitude.",
		sources: sources([
			["meta_analysis", "Active learning increases student performance in science, engineering, and mathematics", "Proceedings of the National Academy of Sciences", 2014, "10.1073/pnas.1319030111", "Large meta-analysis finding higher exam performance and lower failure under active learning."],
			["meta_analysis", "Active learning narrows achievement gaps for underrepresented students in undergraduate science, technology, engineering, and math", "Proceedings of the National Academy of Sciences", 2020, "10.1073/pnas.1916903117", "Synthesis showing that high-intensity active learning can reduce achievement gaps."],
			["landmark_study", "Measuring actual learning versus feeling of learning in response to being actively engaged in the classroom", "Proceedings of the National Academy of Sciences", 2019, "10.1073/pnas.1821936116", "Controlled classroom study separating subjective fluency from measured learning."]
		])
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Does high-quality preschool improve later educational outcomes?",
		slug: "does-high-quality-preschool-improve-later-educational-outcomes",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"High-quality early-childhood programs improve school readiness and can improve later educational and social outcomes, especially for disadvantaged children. Early test-score advantages often shrink as comparison children enter school, while some longer-run benefits persist; quality, dosage, the alternative care available, and later schooling all matter.",
		stableCore: [
			"Average immediate gains in language, literacy, mathematics, and school readiness are well supported.",
			"Long-term effects are smaller and more variable than short-term effects, and fadeout of test-score differences is common.",
			"Historical intensive programs do not establish that every modern universal or low-quality program will yield the same benefit."
		],
		openQuestions: [
			"Which structural and instructional features define quality strongly enough to predict durable effects at scale?",
			"How do elementary-school quality and alignment sustain, replace, or erase early gains?"
		],
		whatWouldChangeMinds: [
			"Modern low-bias syntheses finding no readiness or later-outcome benefit from well-implemented programs compared with realistic alternatives.",
			"Evidence that observed long-run benefits are fully explained by selection, attrition, or unrelated services."
		],
		misconceptions: [
			"Preschool is not one uniform treatment.",
			"Fadeout on one test does not prove that every later benefit vanished.",
			"Benefits for high-need children do not by themselves determine the best design of a universal program."
		],
		editorSummary:
			"Preschool can be valuable, but quality and the educational path that follows are more informative than the label alone.",
		uncertaintySummary:
			"Short-term readiness gains are clear; long-run magnitude and transfer vary with program, population, counterfactual care, later schools, and outcome.",
		sources: sources([
			["meta_analysis", "Impacts of Early Childhood Education on Medium- and Long-Term Educational Outcomes", "Educational Researcher", 2017, "10.3102/0013189X17737739", "Meta-analysis finding improved graduation and reduced grade retention and special-education placement."],
			["meta_analysis", "Do children benefit from universal early childhood education and care? A meta-analysis of evidence from natural experiments", "Economics of Education Review", 2018, "10.1016/j.econedurev.2018.08.001", "Synthesis of population programs showing average benefits with variation by age, quality, and family background."],
			["meta_analysis", "Meta-Analysis of the Effects of Early Education Interventions on Cognitive and Social Development", "Teachers College Record", 2010, "10.1177/016146811011200303", "Broad review of program features and cognitive and social outcomes across early-education interventions."]
		])
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Does giving every student a laptop reliably improve learning?",
		slug: "does-giving-every-student-a-laptop-reliably-improve-learning",
		consensusBand: "mixed",
		confidenceScore: 68,
		evidenceCertainty: "low",
		bottomLine:
			"Not by itself. One-to-one devices improve access and can support writing, feedback, research, and digital skills, but average academic effects are modest and inconsistent. Benefits depend on curriculum, teacher preparation, classroom use, technical support, home access, and whether devices add effective practice or distraction.",
		stableCore: [
			"Hardware access removes one barrier but does not specify how students will learn with the device.",
			"Research syntheses find some positive outcomes alongside weak designs, varied programs, and inconsistent subject effects.",
			"Technology can widen or narrow inequity depending on connectivity, accessibility, support, and instructional design."
		],
		openQuestions: [
			"Which uses produce durable subject learning rather than short-term engagement or technology proficiency?",
			"How do device rules, software quality, teacher workload, distraction, repair, and home connectivity affect net benefit?"
		],
		whatWouldChangeMinds: [
			"Large randomized or strong quasi-experimental programs showing substantial durable gains from device provision across ordinary implementation settings.",
			"Evidence that well-supported one-to-one programs consistently harm learning even when curriculum and access are strong."
		],
		misconceptions: [
			"Digital access and academic achievement are different outcomes.",
			"A device is infrastructure, not a pedagogy.",
			"An average small effect can hide useful and harmful implementations."
		],
		editorSummary:
			"Judge a laptop program by what students do with it, what teachers can support, and which measured outcomes improve—not by device counts.",
		uncertaintySummary:
			"Studies mix devices, software, subjects, ages, training, and access conditions. Selection and rapidly changing technology further limit one universal estimate.",
		sources: sources([
			["meta_analysis", "Learning in One-to-One Laptop Environments: A Meta-Analysis and Research Synthesis", "Review of Educational Research", 2016, "10.3102/0034654316628645", "Synthesis finding generally positive but heterogeneous outcomes and important implementation limits."],
			["systematic_review", "One-to-One Technology in K–12 Classrooms: A Review of the Literature From 2004 Through 2014", "Journal of Research on Technology in Education", 2016, "10.1080/15391523.2016.1146564", "Review of uses and outcomes across a decade of one-to-one device programs."],
			["systematic_review", "Upgrading Education with Technology: Insights from Experimental Research", "Journal of Economic Literature", 2020, "10.1257/jel.20191507", "Broad evidence review showing that access alone is less reliable than targeted, well-implemented educational uses."]
		])
	}),
	reviewedClaim({
		topicSlug: "education-and-learning",
		title: "Does formative assessment improve K–12 learning?",
		slug: "does-formative-assessment-improve-k12-learning",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"Formative assessment can improve learning when teachers elicit evidence of understanding and use it to adapt instruction while students still have time to respond. Merely adding more tests, scores, dashboards, or generic feedback is not the intervention; effects vary with feedback quality, teacher action, subject, and study design.",
		stableCore: [
			"The defining feature is an instructional decision based on evidence, not the format or frequency of a quiz.",
			"Reviews generally find positive average effects but with substantial heterogeneity and methodological limitations.",
			"Feedback is most useful when it clarifies the goal, current understanding, and a feasible next step."
		],
		openQuestions: [
			"Which classroom routines and professional supports make evidence-responsive teaching sustainable at scale?",
			"How much do effects persist and transfer beyond the specific tasks used for assessment?"
		],
		whatWouldChangeMinds: [
			"High-quality syntheses finding no learning benefit when assessment information actually changes subsequent instruction.",
			"Evidence that positive averages are fully attributable to publication bias, extra instructional time, or weak control groups."
		],
		misconceptions: [
			"Formative assessment is not synonymous with frequent grading.",
			"Data do not improve learning unless someone uses them well.",
			"More detailed feedback can overwhelm learners if it offers no clear next action."
		],
		editorSummary:
			"Use evidence of current understanding to choose the next teaching and learning move; otherwise the assessment is only measurement.",
		uncertaintySummary:
			"The practical principle is well supported, while effect estimates vary because definitions, implementation, controls, and outcomes differ widely.",
		sources: sources([
			["meta_analysis", "The impact of formative assessment on K-12 learning: a meta-analysis", "Educational Research and Evaluation", 2024, "10.1080/13803611.2024.2363831", "Recent quantitative synthesis of formative-assessment effects and moderators across K–12 studies."],
			["systematic_review", "Assessment and Classroom Learning", "Assessment in Education: Principles, Policy & Practice", 1998, "10.1080/0969595980050102", "Foundational review defining formative use and synthesizing classroom evidence."],
			["meta_analysis", "Formative Assessment: A Meta-Analysis and a Call for Research", "Educational Measurement: Issues and Practice", 2011, "10.1111/j.1745-3992.2011.00220.x", "Meta-analysis reporting positive average effects while stressing definitional and design weaknesses."]
		])
	})
];
