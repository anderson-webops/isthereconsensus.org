import type { SeedClaim } from "./claims.js";
import { september2026HealthspanClaim as reviewedClaim } from "./claim-expansion-2026-09-healthspan-shared.js";

export const september2026MentalHealthClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "mental-health-and-treatment",
		title: "Is electroconvulsive therapy effective for severe depression?",
		slug: "is-electroconvulsive-therapy-effective-for-severe-depression",
		consensusBand: "broad",
		confidenceScore: 89,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Electroconvulsive therapy is one of the most effective and fastest treatments for severe major depression, particularly depression with psychosis, catatonia, profound functional impairment, or urgent risk. It requires anesthesia, can cause short-term confusion and memory problems, and relapse is common without continuation treatment, so benefit and cognitive risk must be weighed individually.",
		stableCore: [
			"ECT produces response and remission in many people whose severe depression has not improved with other treatments.",
			"Psychotic features and greater severity often predict a stronger response rather than treatment futility.",
			"Continuation medication, psychotherapy, or additional ECT is often needed because an acute response does not guarantee lasting remission."
		],
		openQuestions: [
			"Which electrode placement, pulse width, dose, and continuation plan best preserve benefit while minimizing cognitive effects?",
			"How can clinicians predict durable response and individual memory risk more accurately?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled comparative trials finding no meaningful advantage for severe or psychotic depression.",
			"Better long-term evidence showing that cognitive harms consistently outweigh symptom and survival benefits in the patients currently most likely to receive ECT."
		],
		misconceptions: [
			"Modern ECT is performed under anesthesia with muscle relaxation, not as portrayed in many historical films.",
			"A rapid response does not mean depression is permanently cured after one treatment course.",
			"Memory effects are real and deserve informed discussion, but they do not make ECT uniformly harmful or ineffective."
		],
		editorSummary:
			"ECT is a high-benefit, high-burden treatment used where severity and urgency change the balance. The evidence supports efficacy while requiring honest discussion of anesthesia, memory, access, and relapse prevention.",
		uncertaintySummary:
			"Clinical effectiveness is well established, but comparative trials are often small and estimates of autobiographical memory effects and long-term relapse vary by technique and follow-up.",
		sources: [
			["meta_analysis", "Comparative efficacy and acceptability of non-surgical brain stimulation for the acute treatment of major depressive episodes in adults: systematic review and network meta-analysis", "The BMJ", 2019, "10.1136/bmj.l1079", "Network meta-analysis supports several ECT approaches for acute major depressive episodes while grading much of the comparison evidence as low certainty."],
			["meta_analysis", "Prediction of electroconvulsive therapy response and remission in major depression: meta-analysis", "The British Journal of Psychiatry", 2018, "10.1192/bjp.2017.28", "Meta-analysis finds particularly favorable response patterns in severe depression with psychotic features and in older adults."],
			["meta_analysis", "Continuation electroconvulsive therapy combined with pharmacotherapy for depression relapse prevention: A systematic review and meta-analysis", "Psychological Medicine", 2025, "10.1017/s0033291725101608", "Randomized evidence shows that continuation ECT plus medication can reduce relapse after an acute response, while the evidence base remains small."]
		]
	}),
	reviewedClaim({
		topicSlug: "mental-health-and-treatment",
		title: "Does repetitive transcranial magnetic stimulation help treatment-resistant depression?",
		slug: "does-repetitive-transcranial-magnetic-stimulation-help-treatment-resistant-depression",
		consensusBand: "broad",
		confidenceScore: 85,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes, for some patients. Repetitive transcranial magnetic stimulation is more effective than sham treatment for major depression that has not responded adequately to medication, and it avoids anesthesia and the broader cognitive effects associated with ECT. Average response is not universal, treatment requires repeated clinic visits, and protocols and durability differ.",
		stableCore: [
			"Repeated stimulation of targeted cortical networks can improve depressive symptoms beyond sham treatment.",
			"Benefits are supported after one or more antidepressant failures, with generally favorable short-term tolerability.",
			"rTMS is not interchangeable with ECT for every severely ill, psychotic, catatonic, or urgently suicidal patient."
		],
		openQuestions: [
			"Which stimulation target and schedule best matches a patient's depression subtype and prior treatment history?",
			"How durable are accelerated protocols, and what maintenance schedule is worth the time and cost?"
		],
		whatWouldChangeMinds: [
			"Large sham-controlled trials consistently finding no clinically meaningful response or remission benefit.",
			"Long-term comparative evidence showing that treatment burden outweighs benefit across current responder groups."
		],
		misconceptions: [
			"rTMS is not electroconvulsive therapy and ordinarily does not require anesthesia or induce a seizure.",
			"Regulatory clearance does not mean every commercial protocol is equally supported.",
			"A noninvasive treatment can still cause discomfort, headache, rare serious events, and substantial time burden."
		],
		editorSummary:
			"rTMS is an evidence-based option between another medication trial and more intensive somatic treatment for many patients. Its real benefit is meaningful but less universal than promotional response rates can suggest.",
		uncertaintySummary:
			"Moderate certainty reflects consistent sham-controlled benefit alongside protocol heterogeneity, imperfect blinding, variable definitions of treatment resistance, and limited maintenance evidence.",
		sources: [
			["meta_analysis", "Efficacy of repetitive transcranial magnetic stimulation (rTMS) adjunctive therapy for major depressive disorder (MDD) after two antidepressant treatment failures: meta-analysis of randomized sham-controlled trials", "BMC Psychiatry", 2023, "10.1186/s12888-023-05033-y", "Sham-controlled synthesis finds higher response and remission when rTMS is added after two antidepressant failures."],
			["meta_analysis", "Comparative efficacy and acceptability of non-surgical brain stimulation for the acute treatment of major depressive episodes in adults: systematic review and network meta-analysis", "The BMJ", 2019, "10.1136/bmj.l1079", "Broad network analysis places several rTMS protocols above sham while documenting differences in evidence certainty."],
			["meta_analysis", "Repetitive Transcranial Magnetic Stimulation for Major Depressive Disorder in Older Adults: Systematic Review and Meta-Analysis", "The Journals of Gerontology: Series A", 2021, "10.1093/gerona/glab235", "Age-focused synthesis finds active rTMS superior to sham and examines response and remission in older adults."]
		]
	}),
	reviewedClaim({
		topicSlug: "mental-health-and-treatment",
		title: "Can ketamine or esketamine rapidly reduce treatment-resistant depression?",
		slug: "can-ketamine-or-esketamine-rapidly-reduce-treatment-resistant-depression",
		consensusBand: "broad",
		confidenceScore: 84,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Ketamine and intranasal esketamine can reduce depressive symptoms within hours or days for some people with treatment-resistant depression. A single dose often fades within days, repeated or maintenance treatment may be required, and dissociation, blood-pressure changes, misuse risk, monitoring, cost, and uncertain long-term outcomes prevent this from being a simple at-home cure.",
		stableCore: [
			"Randomized evidence supports a rapid average antidepressant effect beyond placebo or active control.",
			"Response after one administration is often temporary, so induction and maintenance are separate evidence questions.",
			"Clinical formulations, routes, doses, supervision, and evidence are not interchangeable with unregulated products."
		],
		openQuestions: [
			"Which maintenance schedules preserve benefit without increasing urinary, cognitive, cardiovascular, or misuse harms?",
			"Which patients obtain durable functional recovery rather than a short symptom-score change?"
		],
		whatWouldChangeMinds: [
			"Well-powered active-control trials finding that expectancy and transient subjective effects explain the apparent rapid benefit.",
			"Long-term surveillance showing that cumulative harms exceed benefit in the populations now treated."
		],
		misconceptions: [
			"Rapid action is not the same as permanent remission.",
			"Evidence for supervised psychiatric use does not establish the safety of unsupervised or recreational ketamine.",
			"Racemic ketamine and esketamine differ in route, approval, evidence, and dosing and should not be treated as identical products."
		],
		editorSummary:
			"The rapid signal is real and clinically important, especially after failed standard treatments. The central uncertainty has shifted from whether an acute effect exists to how to maintain it safely and affordably.",
		uncertaintySummary:
			"Acute efficacy has moderate support. Durability, optimal maintenance, comparative effectiveness, rare harms, and outcomes beyond rating scales remain less certain.",
		sources: [
			["meta_analysis", "Ketamine for the treatment of major depression: a systematic review and meta-analysis", "eClinicalMedicine", 2023, "10.1016/j.eclinm.2023.102127", "Comprehensive synthesis separates formulation, dose, acute response, ongoing treatment, and persistence after the last dose."],
			["meta_analysis", "Efficacy of single and repeated administration of ketamine in unipolar and bipolar depression: a meta-analysis of randomized clinical trials", "Pharmacological Reports", 2020, "10.1007/s43440-020-00097-z", "Randomized evidence finds the largest effect near 24 hours and a diminishing single-dose benefit over the following week."],
			["systematic_review", "Maintenance ketamine treatment for depression: a systematic review of efficacy, safety, and tolerability", "The Lancet Psychiatry", 2022, "10.1016/s2215-0366(22)00317-0", "Maintenance review finds promising sustained benefit but limited evidence on long-term strategy and uncommon harms."]
		]
	}),
	reviewedClaim({
		topicSlug: "mental-health-and-treatment",
		title: "Do trauma-focused psychotherapies reduce PTSD symptoms?",
		slug: "do-trauma-focused-psychotherapies-reduce-ptsd-symptoms",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Trauma-focused cognitive behavioral therapies, cognitive processing therapy, prolonged exposure, and EMDR reduce PTSD symptoms and can produce remission for many adults. No one method works for everyone, dropout occurs, and treatment should be paced and adapted to safety, comorbidity, culture, and patient preference rather than reduced to simply reliving trauma.",
		stableCore: [
			"Multiple trauma-focused therapies outperform waiting-list and usual-care controls across many trauma populations.",
			"Effective treatment combines structured processing or exposure with skills, monitoring, and a therapeutic relationship.",
			"Temporary distress during treatment is not evidence that evidence-based trauma therapy generally worsens PTSD."
		],
		openQuestions: [
			"Which adaptations improve completion and outcomes for complex trauma, marginalization, dissociation, or severe comorbidity?",
			"How should patients choose among similarly effective approaches with different procedures and burdens?"
		],
		whatWouldChangeMinds: [
			"Independent networks of randomized trials finding no durable advantage over credible non-trauma-focused care.",
			"Evidence that harms or deterioration exceed remission benefits across current first-line populations."
		],
		misconceptions: [
			"Exposure therapy is not uncontrolled confrontation with the worst memory on the first visit.",
			"EMDR's eye movements are not the only active ingredient established by the broader PTSD evidence.",
			"A first-line treatment can still be declined, adapted, paused, or changed through shared decision-making."
		],
		editorSummary:
			"The field agrees that structured trauma-focused psychotherapy is a core first-line treatment. The live debate concerns matching, delivery, dropout, and augmentation rather than whether these therapies can work.",
		uncertaintySummary:
			"High confidence in overall symptom benefit coexists with moderate or low certainty for precise rankings among therapies and for some underrepresented groups.",
		sources: [
			["meta_analysis", "Trauma-focused psychotherapies for post-traumatic stress disorder: A systematic review and network meta-analysis", "Acta Psychiatrica Scandinavica", 2021, "10.1111/acps.13366", "Network of 82 trials compares efficacy and attrition across established trauma-focused psychotherapies."],
			["meta_analysis", "Psychological treatments for post-traumatic stress disorder in adults: a network meta-analysis", "Psychological Medicine", 2020, "10.1017/s0033291720000070", "Ninety-trial synthesis supports EMDR, trauma-focused CBT, and related interventions while noting moderate-to-low comparison certainty."],
			["systematic_review", "State of the Science: Prolonged exposure therapy for the treatment of posttraumatic stress disorder", "Journal of Traumatic Stress", 2024, "10.1002/jts.23046", "Review documents prolonged exposure across civilian, military, adolescent, and comorbid populations and identifies remaining access gaps."]
		]
	}),
	reviewedClaim({
		topicSlug: "mental-health-and-treatment",
		title: "Does maintenance antipsychotic treatment reduce relapse in schizophrenia?",
		slug: "does-maintenance-antipsychotic-treatment-reduce-relapse-in-schizophrenia",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. For people with schizophrenia who have stabilized after an episode, continuing antipsychotic medication substantially reduces relapse and hospitalization compared with withdrawal or placebo. Benefits must be balanced against metabolic, movement, hormonal, cardiovascular, and subjective adverse effects, and the best drug, dose, and duration depend on the person and illness course.",
		stableCore: [
			"Randomized maintenance trials show a large reduction in one-year relapse compared with placebo or withdrawal.",
			"Stopping abruptly can add withdrawal effects and make relapse estimates harder to interpret.",
			"Differences in tolerability often matter more than small or uncertain differences in relapse prevention among drugs."
		],
		openQuestions: [
			"Who can safely use a lower dose or carefully supervised discontinuation after a first episode?",
			"How should long-acting injections, oral medication, psychosocial care, and patient preference be combined?"
		],
		whatWouldChangeMinds: [
			"Long-duration randomized evidence showing similar relapse and functional outcomes after careful discontinuation in broad stabilized populations.",
			"Comparative evidence demonstrating that current adverse-effect burdens outweigh relapse prevention for most patients."
		],
		misconceptions: [
			"Relapse prevention does not mean medication alone restores housing, relationships, cognition, or employment.",
			"A strong average benefit does not justify ignoring an individual's adverse effects or treatment goals.",
			"Evidence against abrupt withdrawal is not evidence that every patient must stay on the same dose forever."
		],
		editorSummary:
			"Maintenance antipsychotics have one of the clearest relapse-prevention effects in psychiatry. Good care preserves that benefit while treating adverse effects, supporting autonomy, and revisiting dose and formulation.",
		uncertaintySummary:
			"Relapse and hospitalization effects are high-confidence. Functional recovery, very long-term comparative effects, withdrawal-sensitive designs, and individualized discontinuation remain less certain.",
		sources: [
			["meta_analysis", "Maintenance Treatment With Antipsychotic Drugs in Schizophrenia: A Cochrane Systematic Review and Meta-analysis", "Schizophrenia Bulletin", 2022, "10.1093/schbul/sbac041", "Seventy-five trials show one-year relapse of about 24% with medication versus 61% with placebo and fewer hospitalizations."],
			["meta_analysis", "Comparative efficacy and tolerability of 32 oral and long-acting injectable antipsychotics for the maintenance treatment of adults with schizophrenia: a systematic review and network meta-analysis", "The Lancet", 2022, "10.1016/s0140-6736(21)01997-8", "Network comparison supports maintenance efficacy while emphasizing tolerability in choosing among medicines."],
			["meta_analysis", "Oral and long-acting antipsychotics for relapse prevention in schizophrenia-spectrum disorders: a network meta-analysis of 92 randomized trials including 22,645 participants", "World Psychiatry", 2022, "10.1002/wps.20972", "Large network finds most maintenance treatments outperform placebo and evaluates oral and injectable options."]
		]
	}),
	reviewedClaim({
		topicSlug: "mental-health-and-treatment",
		title: "Does clozapine reduce suicidal behavior in schizophrenia or schizoaffective disorder?",
		slug: "does-clozapine-reduce-suicidal-behavior-in-schizophrenia-or-schizoaffective-disorder",
		consensusBand: "broad",
		confidenceScore: 87,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Clozapine has stronger evidence than other antipsychotics for reducing suicidal behavior in people with schizophrenia or schizoaffective disorder at high risk, and it is also important for treatment-resistant illness. It can cause agranulocytosis, myocarditis, seizures, severe constipation, and metabolic harm, so required monitoring and careful clinical management are central to the benefit.",
		stableCore: [
			"Randomized and large observational evidence support a specific reduction in suicidal behavior compared with other antipsychotic strategies.",
			"Clozapine is not a general first response to every suicidal thought or every mental disorder.",
			"Blood monitoring and active management of cardiac, gastrointestinal, neurologic, and metabolic risks are necessary."
		],
		openQuestions: [
			"How can health systems reduce dangerous delays in offering clozapine while maintaining safe monitoring?",
			"Which biological and care-system mechanisms account for its anti-suicidal effect?"
		],
		whatWouldChangeMinds: [
			"Large comparative studies eliminating the anti-suicidal advantage after careful control of indication and adherence.",
			"Surveillance showing that monitored real-world harms outweigh the reduction in suicide attempts and deaths."
		],
		misconceptions: [
			"Clozapine's effectiveness does not make it safe to use without blood tests and adverse-effect monitoring.",
			"An anti-suicidal association is not a guarantee that an individual crisis is resolved.",
			"Its special role in schizophrenia does not establish the same benefit across unrelated diagnoses."
		],
		editorSummary:
			"Clozapine is unusually important because the evidence concerns both treatment resistance and suicide prevention. Its underuse and its serious monitoring burden should be discussed together.",
		uncertaintySummary:
			"Moderate certainty reflects convergence across randomized and nationwide observational evidence, with residual confounding and rare-event imprecision around completed suicide.",
		sources: [
			["systematic_review", "Prevention of suicide by clozapine in mental disorders: systematic review", "European Neuropsychopharmacology", 2023, "10.1016/j.euroneuro.2022.12.011", "Systematic review finds a superior anti-suicide effect in schizophrenia and schizoaffective disorder while treating evidence outside those diagnoses as preliminary."],
			["meta_analysis", "Pharmacological and somatic treatment effects on suicide in adults: A systematic review and meta-analysis", "Depression and Anxiety", 2021, "10.1002/da.23222", "Comparative synthesis associates clozapine with lower suicide odds in psychotic disorders."],
			["landmark_study", "Comparative Effectiveness of Antipsychotics for Risk of Attempted or Completed Suicide Among Persons With Schizophrenia", "Schizophrenia Bulletin", 2020, "10.1093/schbul/sbaa111", "Within-person analyses in Finnish and Swedish national cohorts find clozapine uniquely associated with lower attempted or completed suicide risk."]
		]
	}),
	reviewedClaim({
		topicSlug: "mental-health-and-treatment",
		title: "Does lithium prevent relapse and reduce suicide risk in bipolar disorder?",
		slug: "does-lithium-prevent-relapse-and-reduce-suicide-risk-in-bipolar-disorder",
		consensusBand: "broad",
		confidenceScore: 85,
		evidenceCertainty: "moderate",
		bottomLine:
			"Lithium is an effective maintenance treatment for bipolar disorder and is associated with fewer suicides in several evidence syntheses. The relapse-prevention conclusion is stronger than the precise anti-suicide estimate because suicide is rare in trials. Kidney and thyroid effects, toxicity, pregnancy considerations, interactions, and a narrow therapeutic range require blood monitoring and individualized decisions.",
		stableCore: [
			"Lithium reduces new mood episodes and remains a central long-term treatment for many people with bipolar disorder.",
			"Observational and some randomized evidence support an anti-suicidal effect, but estimates vary with comparator and method.",
			"Stopping lithium rapidly can increase relapse risk, and toxicity can become a medical emergency."
		],
		openQuestions: [
			"How large is the suicide-specific effect compared with other active mood stabilizers under modern care?",
			"Which monitoring and lower-dose strategies best preserve benefit over decades while reducing kidney and endocrine harm?"
		],
		whatWouldChangeMinds: [
			"Modern long-term randomized evidence finding no maintenance advantage over appropriate active comparators.",
			"Large, bias-resistant studies consistently eliminating the suicide association or documenting greater net mortality harm."
		],
		misconceptions: [
			"Lithium treatment is not the same as exposure to trace lithium in drinking water.",
			"A possible anti-suicide effect does not replace crisis assessment, psychotherapy, or other supports.",
			"Effective maintenance does not mean lithium is the right or safest medicine for every person with bipolar disorder."
		],
		editorSummary:
			"Lithium's maintenance role is durable; its suicide-prevention reputation is plausible and important but should be described with rarer-outcome uncertainty. Safe use is inseparable from monitoring.",
		uncertaintySummary:
			"Bipolar maintenance benefit has broad support. Suicide estimates are less certain because trials are underpowered for deaths and observational comparisons can retain treatment-selection bias.",
		sources: [
			["systematic_review", "Lithium treatment of Bipolar disorder in adults: A systematic review of randomized trials and meta-analyses", "European Neuropsychopharmacology", 2022, "10.1016/j.euroneuro.2021.10.003", "Review supports lithium across acute and maintenance bipolar treatment while comparing efficacy and safety with newer agents."],
			["meta_analysis", "Pharmacological and somatic treatment effects on suicide in adults: A systematic review and meta-analysis", "Depression and Anxiety", 2021, "10.1002/da.23222", "Meta-analysis finds lower suicide odds with lithium in bipolar disorder and several broader comparisons."],
			["meta_analysis", "Effects of lithium on suicide and suicidal behaviour: a systematic review and meta-analysis of randomised trials", "Epidemiology and Psychiatric Sciences", 2022, "10.1017/s204579602200049x", "Updated randomized-trial analysis highlights the imprecision and method sensitivity created by rare suicide events.", "debate"]
		]
	}),
	reviewedClaim({
		topicSlug: "mental-health-and-treatment",
		title: "Can live video psychotherapy work about as well as in-person therapy?",
		slug: "can-live-video-psychotherapy-work-about-as-well-as-in-person-therapy",
		consensusBand: "broad",
		confidenceScore: 82,
		evidenceCertainty: "moderate",
		bottomLine:
			"Often yes, for the studied conditions and patients. Therapist-guided psychotherapy delivered by live video generally produces outcomes close to in-person care, particularly for structured CBT and PTSD treatment. Digital access, privacy, crisis response, sensory or cognitive needs, technology, therapeutic fit, and the thinner evidence for some diagnoses still determine whether remote care is appropriate.",
		stableCore: [
			"Direct randomized comparisons usually find small or negligible average differences between guided remote and in-person CBT.",
			"Live clinical care should be distinguished from unguided wellness apps or automated chat tools.",
			"Remote delivery can expand access but can also exclude people without private space, broadband, devices, or digital confidence."
		],
		openQuestions: [
			"Which severe, complex, pediatric, cognitive, or crisis presentations need in-person or hybrid care?",
			"How do alliance, dropout, equity, and long-term outcomes compare outside tightly supported trials?"
		],
		whatWouldChangeMinds: [
			"Large pragmatic trials showing clinically important inferiority across the conditions where current comparisons are close.",
			"Evidence that access gains do not translate into completed treatment or patient-important outcomes."
		],
		misconceptions: [
			"Teletherapy evidence does not validate every mental-health app or AI chatbot.",
			"Similar average outcomes do not mean every patient has the same preference, safety, or privacy needs.",
			"Remote care still requires licensed practice, confidentiality, emergency planning, and appropriate clinical assessment."
		],
		editorSummary:
			"For many structured therapies, video is a delivery mode rather than a weaker imitation. The claim should stay bounded to therapist-guided care and diagnoses with direct comparative evidence.",
		uncertaintySummary:
			"Moderate confidence reflects reassuring head-to-head evidence alongside varied modalities, small condition-specific samples, and limited data for higher-risk or digitally excluded patients.",
		sources: [
			["meta_analysis", "Therapist-guided remote versus in-person cognitive behavioural therapy: a systematic review and meta-analysis of randomized controlled trials", "CMAJ", 2024, "10.1503/cmaj.230274", "Direct randomized comparisons find remote and in-person therapist-guided CBT similarly effective across several clinical conditions."],
			["meta_analysis", "Live psychotherapy by video versus in-person: A meta-analysis of efficacy and its relationship to types and targets of treatment", "Clinical Psychology & Psychotherapy", 2021, "10.1002/cpp.2594", "Meta-analysis finds large within-video improvements and negligible average difference from in-person psychotherapy."],
			["meta_analysis", "Evidence-based telehealth interventions for post-traumatic stress disorder, depression, and anxiety: A systematic review and meta-analysis", "Journal of Telemedicine and Telecare", 2024, "10.1177/1357633x231224491", "Condition-specific review finds close PTSD outcomes while grading depression and anxiety comparisons as less certain."]
		]
	}),
	reviewedClaim({
		topicSlug: "mental-health-and-treatment",
		title: "Does collaborative care improve depression and anxiety treatment in primary care?",
		slug: "does-collaborative-care-improve-depression-and-anxiety-treatment-in-primary-care",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Collaborative care, typically combining a primary-care clinician, care manager, psychiatric consultation, structured follow-up, and treatment adjustment, produces modest but reliable improvements in depression and anxiety compared with usual primary care. It is a care system rather than a single therapy, and benefits depend on implementation, follow-up, specialist support, and access.",
		stableCore: [
			"Randomized trials show better symptom outcomes than usual primary care across many health systems.",
			"Systematic case review, measurement-based follow-up, and treatment adjustment are important components.",
			"Collaborative care can improve access without turning every primary-care visit into specialist psychiatric treatment."
		],
		openQuestions: [
			"Which components and staffing models produce the largest durable benefit at sustainable cost?",
			"How well do results transfer to under-resourced settings, severe illness, substance use, and culturally diverse populations?"
		],
		whatWouldChangeMinds: [
			"Large pragmatic trials finding no patient-important benefit after accounting for extra clinical contact.",
			"Implementation studies showing that benefits disappear outside unusually resourced research systems."
		],
		misconceptions: [
			"Collaborative care is more than giving a primary-care clinician a screening questionnaire.",
			"A modest average effect can matter at population scale without curing every patient.",
			"Integration does not eliminate the need for specialty or emergency care when severity requires it."
		],
		editorSummary:
			"This is one of the clearer examples where organizing care changes outcomes. The benefit is not a miracle treatment but a repeatable improvement over fragmented usual care.",
		uncertaintySummary:
			"The direction is consistent, while effect size, active components, durability, cost, and transfer across systems remain heterogeneous.",
		sources: [
			["meta_analysis", "Effective Components of Collaborative Care for Depression in Primary Care", "JAMA Psychiatry", 2025, "10.1001/jamapsychiatry.2025.0183", "Individual-participant synthesis identifies effective components across randomized primary-care depression programs."],
			["meta_analysis", "Collaborative Care for Depression", "Archives of Internal Medicine", 2006, "10.1001/archinte.166.21.2314", "Large cumulative review finds improved depression outcomes through six months and examines longer follow-up."],
			["meta_analysis", "Collaborative care for anxiety disorders in primary care: a systematic review and meta-analysis", "BMC Family Practice", 2016, "10.1186/s12875-016-0466-3", "Seven randomized trials show a small overall anxiety benefit and a larger estimate in panic-disorder studies."]
		]
	}),
	reviewedClaim({
		topicSlug: "mental-health-and-treatment",
		title: "Can benzodiazepines relieve acute anxiety, and should regular use be stopped abruptly?",
		slug: "can-benzodiazepines-relieve-acute-anxiety-and-should-regular-use-be-stopped-abruptly",
		consensusBand: "strong",
		confidenceScore: 92,
		evidenceCertainty: "high",
		bottomLine:
			"Benzodiazepines can relieve acute anxiety quickly, but regular use can produce physical dependence, and abrupt discontinuation can cause severe withdrawal, including seizures. Long-term benefit and risk vary by patient and indication, so continued use should be reviewed periodically and any reduction should usually be gradual, individualized, and supervised rather than sudden.",
		stableCore: [
			"Randomized evidence supports short-term symptom relief for anxiety-spectrum conditions.",
			"Physical dependence can occur during prescribed use and is not the same as addiction or misuse.",
			"Abrupt cessation after regular use can be dangerous; tapering pace should respond to dose, duration, symptoms, comorbidity, and patient experience."
		],
		openQuestions: [
			"Which long-term patients retain net benefit, and which deprescribing supports best prevent severe withdrawal or relapse?",
			"How much observed cognitive decline or mortality risk is causal rather than confounded by illness and co-prescribing?"
		],
		whatWouldChangeMinds: [
			"Long-duration randomized evidence establishing broad sustained benefit without increasing dependence, falls, accidents, or cognitive harm.",
			"Controlled discontinuation studies showing that abrupt cessation is as safe and successful as individualized tapering."
		],
		misconceptions: [
			"Physical dependence during prescribed use does not automatically mean a person has a substance-use disorder.",
			"A medicine that works within hours is not necessarily the best long-term strategy.",
			"Patients should not be shamed or forced into a rapid taper because a population guideline favors shorter use."
		],
		editorSummary:
			"The honest consensus has two parts: benzodiazepines work acutely, and physiological adaptation makes long-term management and discontinuation consequential. Both blanket reassurance and forced abrupt stopping are unsafe simplifications.",
		uncertaintySummary:
			"Acute efficacy and withdrawal risk are high-confidence. Evidence about selected long-term responders and the causal size of cognitive harms is thinner and more confounded.",
		sources: [
			["meta_analysis", "Minor tranquillizers for short-term treatment of newly onset symptoms of anxiety and distress: a systematic review with network meta-analysis of randomized trials", "European Archives of Psychiatry and Clinical Neuroscience", 2023, "10.1007/s00406-023-01680-0", "Short-term network meta-analysis supports symptom reduction while finding sparse evidence for several important harms."],
			["systematic_review", "Effectiveness and safety of long-term benzodiazepine use in anxiety disorders", "International Clinical Psychopharmacology", 2019, "10.1097/yic.0000000000000276", "Limited maintenance evidence finds selected initial responders may retain benefit but cannot settle broad long-term safety."],
			["guideline", "Joint Clinical Practice Guideline on Benzodiazepine Tapering: Considerations When Risks Outweigh Benefits", "Journal of General Internal Medicine", 2025, "10.1007/s11606-025-09499-2", "Multisociety guideline recommends ongoing risk-benefit review, shared decisions, and individualized tapering rather than abrupt discontinuation."]
		]
	})
];
