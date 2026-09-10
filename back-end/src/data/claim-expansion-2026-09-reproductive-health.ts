import type { SeedClaim } from "./claims.js";
import { september2026HealthspanClaim as reviewedClaim } from "./claim-expansion-2026-09-healthspan-shared.js";

export const september2026ReproductiveHealthClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "reproductive-and-sexual-health",
		title: "Are IUDs and contraceptive implants among the most effective reversible contraceptives?",
		slug: "are-iuds-and-contraceptive-implants-among-the-most-effective-reversible-contraceptives",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Intrauterine devices and contraceptive implants are among the most effective reversible methods because they provide years of protection without requiring a daily or per-use action. They are not the right choice for everyone, do not prevent sexually transmitted infections, and differ in bleeding patterns, hormones, insertion, duration, and side effects.",
		stableCore: [
			"Typical-use pregnancy rates are very low because effectiveness does not depend on remembering a pill or using a method at each sexual encounter.",
			"Both IUDs and implants are reversible, and fertility generally returns promptly after removal.",
			"Method choice should include pregnancy goals, bleeding preferences, medical eligibility, insertion experience, access, and protection against infections."
		],
		openQuestions: [
			"Which counseling and pain-management approaches best improve informed choice and insertion experience without pressuring patients?",
			"How can health systems remove cost and access barriers while preserving easy, patient-requested removal?"
		],
		whatWouldChangeMinds: [
			"Large prospective studies finding substantially higher typical-use failure rates than current surveillance and trials show.",
			"Evidence that real-world burdens or serious harms outweigh the large contraceptive benefit for most medically eligible users."
		],
		misconceptions: [
			"Long-acting does not mean permanent; these methods can be removed when the patient wants.",
			"Very high contraceptive effectiveness does not provide protection against HIV or other sexually transmitted infections.",
			"A method's population-level ranking does not replace an individual's preferences or medical circumstances."
		],
		editorSummary:
			"The effectiveness consensus is unusually clear, but good counseling should never turn that ranking into coercion. A useful comparison includes reversibility, side effects, infection protection, insertion, and control over removal.",
		uncertaintySummary:
			"Contraceptive effectiveness is high-confidence. Continuation, satisfaction, bleeding, pain, and access vary across products, populations, and care settings.",
		sources: [
			["guideline", "About Contraception", "Centers for Disease Control and Prevention", 2024, "https://www.cdc.gov/contraception/about/index.html", "Current U.S. public-health overview compares contraceptive methods and identifies implants and IUDs among the most effective reversible options."],
			["meta_analysis", "Long-acting reversible contraception in adolescents: a systematic review and meta-analysis", "American Journal of Obstetrics and Gynecology", 2017, "10.1016/j.ajog.2016.12.024", "Synthesis finds strong contraceptive effectiveness and continuation in adolescents while documenting method-specific bleeding and insertion outcomes."],
			["systematic_review", "A systematic review on clinical effectiveness, side-effect profile and meta-analysis on continuation rate of etonogestrel contraceptive implant", "Reproductive Health", 2021, "10.1186/s12978-020-01054-y", "Implant review confirms high effectiveness and examines continuation and bleeding-related discontinuation."]
		]
	}),
	reviewedClaim({
		topicSlug: "reproductive-and-sexual-health",
		title: "Are IUDs safe for adolescents and people who have not given birth?",
		slug: "are-iuds-safe-for-adolescents-and-people-who-have-not-given-birth",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"Yes, for most medically eligible patients. Adolescence or never having given birth is not by itself a reason to avoid an IUD. Insertion can be painful, expulsion and perforation are uncommon, and infection risk is concentrated around insertion when an untreated cervical infection is present rather than caused by the device throughout use.",
		stableCore: [
			"Major contraceptive guidance considers IUDs appropriate for adolescents and nulliparous patients when no specific contraindication is present.",
			"Infertility is not a usual consequence of IUD use, and fertility returns after removal.",
			"Screening, infection prevention, informed pain planning, and prompt evaluation of concerning symptoms remain part of safe care."
		],
		openQuestions: [
			"Which analgesic, anesthetic, and communication strategies most reliably reduce insertion pain for different patients?",
			"How should counseling best explain uncommon expulsion and perforation risks without discouraging an otherwise preferred method?"
		],
		whatWouldChangeMinds: [
			"Large comparative cohorts showing clinically important excess infertility or serious complications specifically from adolescent or nulliparous use.",
			"New guideline reviews finding that age or parity alone changes net safety enough to reverse current eligibility recommendations."
		],
		misconceptions: [
			"A person does not need to have given birth before using an IUD.",
			"IUDs do not generally travel through the body, although rare uterine perforation can occur during insertion.",
			"A reassuring safety profile does not mean insertion is painless or that every patient's concerns should be minimized."
		],
		editorSummary:
			"The older parity restriction is not supported by modern evidence. The more useful conversation is about eligibility, insertion and pain, infection screening, bleeding, and patient control over continuation or removal.",
		uncertaintySummary:
			"Safety and eligibility are high-confidence. Individual insertion experience and the comparative effectiveness of pain-control strategies remain less predictable.",
		sources: [
			["guideline", "Intrauterine Contraception", "Centers for Disease Control and Prevention", 2024, "https://www.cdc.gov/contraception/hcp/usspr/intrauterine-contraception.html", "Current practice guidance covers initiation, infection screening, placement, bleeding, and management for copper and levonorgestrel IUDs."],
			["systematic_review", "Intrauterine device use is safe among nulligravidas and adolescent girls", "Acta Obstetricia et Gynecologica Scandinavica", 2021, "10.1111/aogs.14097", "Systematic review directly evaluates IUD safety among adolescents and people with no prior pregnancy."],
			["systematic_review", "Levonorgestrel-Releasing Intrauterine System as a Contraceptive Method in Nulliparous Women: A Systematic Review", "Journal of Clinical Medicine", 2020, "10.3390/jcm9072101", "Review finds high effectiveness and generally favorable continuation in nulliparous users while examining insertion and adverse events."]
		]
	}),
	reviewedClaim({
		topicSlug: "reproductive-and-sexual-health",
		title: "Does combined hormonal contraception increase the risk of venous blood clots?",
		slug: "does-combined-hormonal-contraception-increase-the-risk-of-venous-blood-clots",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Contraceptives containing estrogen increase the relative risk of venous thromboembolism compared with nonuse, although the absolute risk remains low for most healthy young users. Risk varies with estrogen dose, progestin, age, smoking, obesity, thrombophilia, recent childbirth, immobilization, and prior clot history, so eligibility and alternatives matter.",
		stableCore: [
			"The clot-risk increase is consistently observed across large studies and evidence syntheses.",
			"Pregnancy and the postpartum period generally carry a higher clot risk than combined hormonal contraception.",
			"Progestin-only and nonhormonal methods offer alternatives for many people whose estrogen-related risk is unacceptable."
		],
		openQuestions: [
			"How do newer estrogen formulations compare in rare-event risk under broad real-world use?",
			"Which individualized prediction tools improve method choice without generating unnecessary thrombophilia testing?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled studies consistently finding no venous-thromboembolism difference between estrogen-containing contraception and nonuse.",
			"Reliable formulation-specific evidence materially revising the current risk hierarchy."
		],
		misconceptions: [
			"An increased relative risk is not the same as a high absolute risk for every user.",
			"All hormonal methods do not carry the same clot risk.",
			"Discussing a real uncommon harm does not mean pregnancy prevention has no health benefit."
		],
		editorSummary:
			"This is a clear risk signal that is easy to distort in either direction. The useful comparison gives absolute baseline risk, formulation, personal risk factors, pregnancy risk, and non-estrogen alternatives.",
		uncertaintySummary:
			"The causal direction is high-confidence. Exact absolute rates and differences among newer formulations are less precise because the event is uncommon and prescribing is not random.",
		sources: [
			["meta_analysis", "A systematic review and meta-analysis of venous thrombosis risk among users of combined oral contraception", "International Journal of Gynecology & Obstetrics", 2018, "10.1002/ijgo.12455", "Meta-analysis quantifies the elevated venous-thrombosis risk among combined oral contraceptive users."],
			["meta_analysis", "Systematic review and meta-analysis of the association of combined oral contraceptives on the risk of venous thromboembolism: The role of the progestogen type and estrogen dose", "Thrombosis Research", 2018, "10.1016/j.thromres.2018.03.005", "Synthesis examines how estrogen dose and progestin type modify the relative risk."],
			["meta_analysis", "Are natural estrogens used in contraception at lower risk of venous thromboembolism than synthetic ones? A systematic literature review and meta-analysis", "Frontiers in Endocrinology", 2024, "10.3389/fendo.2024.1428597", "Review evaluates newer estrogen formulations while emphasizing limitations in comparative evidence."]
		]
	}),
	reviewedClaim({
		topicSlug: "reproductive-and-sexual-health",
		title: "Do hormonal contraceptives change cancer risks in different directions?",
		slug: "do-hormonal-contraceptives-change-cancer-risks-in-different-directions",
		consensusBand: "broad",
		confidenceScore: 86,
		evidenceCertainty: "moderate",
		bottomLine:
			"Yes. Hormonal contraceptive use is associated with a small temporary increase in breast-cancer risk and, with longer oral use, higher cervical-cancer risk, while reducing ovarian and endometrial cancer risk. Effects differ by method, duration, age, infection and screening history, and time since stopping, so saying that contraception simply causes or prevents cancer is misleading.",
		stableCore: [
			"Cancer associations are method- and site-specific rather than one uniform effect.",
			"The absolute breast-cancer increase is small for most reproductive-age users because baseline incidence is low.",
			"Protection against ovarian and endometrial cancer can persist after oral contraceptive use ends."
		],
		openQuestions: [
			"How do contemporary low-dose pills, implants, injections, and hormonal IUDs differ over decades of follow-up?",
			"How should personal and family cancer risk be incorporated into contraceptive decisions without overstating small population averages?"
		],
		whatWouldChangeMinds: [
			"Large prospective evidence showing no site-specific risk differences after robust adjustment and long follow-up.",
			"New method-specific data demonstrating substantially larger persistent harms or benefits than current estimates."
		],
		misconceptions: [
			"Cancer is not one outcome, and effects on one cancer cannot be generalized to all cancers.",
			"A relative increase can correspond to a small absolute change in a young population.",
			"Population associations do not predict an individual's outcome or replace screening and family-history assessment."
		],
		editorSummary:
			"The honest answer is a risk profile, not a pro- or anti-contraception slogan. Benefit-risk decisions should preserve both the modest adverse signals and the durable protection seen for some cancers.",
		uncertaintySummary:
			"Moderate certainty reflects consistent site-specific patterns but reliance on observational data, changing formulations, long latency, and confounding by reproductive and screening factors.",
		sources: [
			["systematic_review", "Assessing the impact of contraceptive use on reproductive cancer risk among women of reproductive age: a systematic review", "Frontiers in Global Women's Health", 2024, "10.3389/fgwh.2024.1487820", "Broad review maps method-specific associations across breast, cervical, ovarian, and endometrial cancers."],
			["meta_analysis", "Effect of duration of hormonal contraceptive use on breast cancer risk: a systematic review and meta-analysis of cohort studies", "Maturitas", 2025, "10.1016/j.maturitas.2025.108750", "Cohort synthesis examines the small breast-cancer association and how it varies with duration."],
			["meta_analysis", "Association of oral contraceptives and risk of endometrial cancer: A systematic review and meta-analysis", "Acta Obstetricia et Gynecologica Scandinavica", 2025, "10.1111/aogs.15043", "Updated synthesis supports lower endometrial-cancer risk after oral contraceptive use."]
		]
	}),
	reviewedClaim({
		topicSlug: "reproductive-and-sexual-health",
		title: "Is medication abortion safe and effective in early pregnancy?",
		slug: "is-medication-abortion-safe-and-effective-in-early-pregnancy",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Mifepristone followed by misoprostol is a highly effective and very safe way to end an early pregnancy when used with an evidence-based regimen and access to follow-up or emergency care when needed. Cramping and bleeding are expected, a small proportion need additional medication or aspiration, and ectopic pregnancy requires separate diagnosis and treatment.",
		stableCore: [
			"Decades of clinical evidence and major guidelines support mifepristone plus misoprostol in early pregnancy.",
			"Serious complications are rare, while predictable bleeding, pain, nausea, and transient symptoms are common.",
			"Medication abortion does not treat ectopic pregnancy, and warning signs require timely clinical evaluation."
		],
		openQuestions: [
			"Which follow-up pathways best preserve safety, privacy, access, and patient reassurance across health systems?",
			"How can unnecessary access barriers be reduced while ensuring prompt care for the uncommon patient with a complication or ectopic pregnancy?"
		],
		whatWouldChangeMinds: [
			"High-quality surveillance showing a substantially higher serious-complication or failure rate than current large evidence bases report.",
			"Comparative evidence demonstrating that recommended medication regimens no longer provide favorable safety and effectiveness in their indicated gestational range."
		],
		misconceptions: [
			"Expected cramping and bleeding are not by themselves evidence of a dangerous complication.",
			"Medication abortion and emergency contraception act at different stages and are not the same treatment.",
			"A strong average safety record does not eliminate the need to recognize ectopic pregnancy or emergency warning signs."
		],
		editorSummary:
			"The central clinical conclusion is settled: recommended medication abortion is safe and effective in early pregnancy. A responsible page also explains expected symptoms, uncommon failure, ectopic pregnancy, and access to care.",
		uncertaintySummary:
			"Effectiveness and serious-complication rates are high-confidence. Exact performance varies with gestational age, regimen, adherence, and follow-up pathway.",
		sources: [
			["guideline", "Abortion care guideline", "World Health Organization", 2022, "https://www.who.int/publications-detail-redirect/9789240039483/", "Global evidence-based guideline recommends medication and procedural abortion methods by gestational age and care context."],
			["guideline", "Medication Abortion Up to 70 Days of Gestation", "American College of Obstetricians and Gynecologists", 2020, "https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2020/10/medication-abortion-up-to-70-days-of-gestation", "Clinical bulletin reviews efficacy, contraindications, expected symptoms, follow-up, and uncommon complications."],
			["consensus_statement", "The Safety and Quality of Abortion Care in the United States", "National Academies of Sciences, Engineering, and Medicine", 2018, "10.17226/24950", "Independent evidence review finds legal abortion in the United States safe and effective, with serious complications rare."]
		]
	}),
	reviewedClaim({
		topicSlug: "reproductive-and-sexual-health",
		title: "Does an uncomplicated abortion generally cause infertility or poorer future pregnancy outcomes?",
		slug: "does-an-uncomplicated-abortion-generally-cause-infertility-or-poorer-future-pregnancy-outcomes",
		consensusBand: "strong",
		confidenceScore: 96,
		evidenceCertainty: "high",
		bottomLine:
			"No. An uncomplicated medication or procedural abortion performed with recommended care does not generally reduce future fertility or increase major adverse outcomes in later wanted pregnancies. Rare complications such as severe infection or uterine injury can affect reproductive health, and unsafe abortion is a different clinical situation from evidence-based care.",
		stableCore: [
			"Rigorous evidence reviews do not find increased secondary infertility after safe abortion.",
			"Most people can become pregnant again quickly because ovulation may resume within weeks.",
			"Method, gestational age, complications, and access to safe care must not be collapsed into a single undifferentiated exposure."
		],
		openQuestions: [
			"How can long-term studies better separate abortion effects from underlying health, pregnancy history, access, and socioeconomic factors?",
			"Which systems best prevent and rapidly treat the rare complications that could affect later fertility?"
		],
		whatWouldChangeMinds: [
			"Large, well-controlled prospective studies consistently finding clinically important infertility or adverse-pregnancy effects after uncomplicated evidence-based care.",
			"A major independent evidence review reversing the current conclusion after accounting for confounding and abortion method."
		],
		misconceptions: [
			"Safe abortion and unsafe abortion do not have the same risk profile.",
			"Becoming pregnant again soon is biologically possible even before the next menstrual period.",
			"A rare complication is not evidence that infertility is a usual outcome."
		],
		editorSummary:
			"The infertility claim is not supported for uncomplicated evidence-based abortion. The important boundary is safe care versus uncommon complications or unsafe procedures, not a blanket promise that no individual complication can occur.",
		uncertaintySummary:
			"The absence of a general infertility effect is high-confidence. Precise estimates for uncommon complications and some later obstetric outcomes vary by method and study design.",
		sources: [
			["consensus_statement", "The Safety and Quality of Abortion Care in the United States", "National Academies of Sciences, Engineering, and Medicine", 2018, "10.17226/24950", "Independent review concludes that abortion does not increase secondary infertility and distinguishes stronger from confounded long-term evidence."],
			["guideline", "Induced Abortion", "American College of Obstetricians and Gynecologists", 2024, "https://www.acog.org/womens-health/faqs/induced-abortion", "Patient guidance explains medication and procedural methods, recovery, complications, and return of fertility."],
			["guideline", "Abortion care guideline", "World Health Organization", 2022, "https://www.who.int/publications-detail-redirect/9789240039483/", "Global guideline distinguishes safe evidence-based abortion care from preventable harms associated with unsafe care."]
		]
	}),
	reviewedClaim({
		topicSlug: "reproductive-and-sexual-health",
		title: "Does abortion generally worsen long-term mental health compared with being denied a wanted abortion?",
		slug: "does-abortion-generally-worsen-long-term-mental-health-compared-with-being-denied-a-wanted-abortion",
		consensusBand: "broad",
		confidenceScore: 88,
		evidenceCertainty: "moderate",
		bottomLine:
			"No. The best available evidence does not show that receiving a wanted abortion causes worse long-term depression, anxiety, post-traumatic stress, or life satisfaction than being denied one. Emotional responses vary, preexisting mental health and life circumstances strongly matter, and some people need support without that experience establishing a general psychiatric harm.",
		stableCore: [
			"Studies with an appropriate comparison group do not support a general post-abortion mental-health disorder effect.",
			"Being denied a wanted abortion can itself create short-term anxiety and substantial social, health, and economic consequences.",
			"Relief, sadness, grief, mixed feelings, or no distress can all occur and should not be converted into a predetermined diagnosis."
		],
		openQuestions: [
			"Which supports are most helpful for patients facing stigma, coercion, pregnancy loss, prior trauma, or limited social support?",
			"How can future research reduce attrition and measure diverse experiences without implying that one emotional response is required?"
		],
		whatWouldChangeMinds: [
			"Low-bias prospective studies with appropriate comparators consistently finding a clinically important causal increase in long-term psychiatric disorders.",
			"Independent evidence reviews reversing the current conclusion after separating prior mental health, pregnancy intention, and social circumstances."
		],
		misconceptions: [
			"Individual regret or grief does not demonstrate a general causal mental-health syndrome.",
			"Comparing abortion recipients only with people who continued wanted pregnancies can produce serious selection bias.",
			"Finding no general disorder effect does not mean every person feels the same or should be denied support."
		],
		editorSummary:
			"This question demands both methodological care and compassion. The evidence does not support a general psychiatric penalty from receiving a wanted abortion, while individual emotional needs remain real and varied.",
		uncertaintySummary:
			"Moderate certainty reflects agreement across stronger reviews and prospective comparisons, with unavoidable nonrandomization, attrition, stigma, and variation in personal circumstances.",
		sources: [
			["landmark_study", "Women's Mental Health and Well-being 5 Years After Receiving or Being Denied an Abortion", "JAMA Psychiatry", 2017, "10.1001/jamapsychiatry.2016.3478", "Prospective Turnaway Study comparison finds no worse long-term mental-health trajectory after receiving versus being denied a wanted abortion."],
			["consensus_statement", "The Safety and Quality of Abortion Care in the United States", "National Academies of Sciences, Engineering, and Medicine", 2018, "10.17226/24950", "Independent review concludes that abortion does not increase risk of depression, anxiety, or post-traumatic stress disorder."],
			["guideline", "Identifying and Combating Abortion Myths and Misinformation", "American College of Obstetricians and Gynecologists", 2025, "https://www.acog.org/advocacy/facts-are-important/identifying-combating-abortion-myths-misinformation", "Clinical organization summarizes evidence against claims of a distinct post-abortion psychiatric syndrome."]
		]
	}),
	reviewedClaim({
		topicSlug: "reproductive-and-sexual-health",
		title: "Does female fertility decline gradually with age rather than falling at an exact age of 35?",
		slug: "does-female-fertility-decline-gradually-with-age-rather-than-falling-at-an-exact-age-of-35",
		consensusBand: "strong",
		confidenceScore: 94,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Fertility and the chance of live birth decline gradually as ovarian quantity and egg quality change with age, with the decline becoming steeper through the later thirties. Age 35 is a useful clinical threshold for earlier evaluation and risk discussion, not a biological cliff at which fertility suddenly disappears.",
		stableCore: [
			"Average time to pregnancy rises and miscarriage and chromosomal-abnormality risks increase with maternal age.",
			"There is wide individual variation, but no current test can guarantee how long one person's natural fertility will last.",
			"Clinical age thresholds organize screening and treatment decisions; they do not create a sudden change on a birthday."
		],
		openQuestions: [
			"Which combination of age, ovarian-reserve markers, reproductive history, and partner factors best predicts an individual's near-term chances?",
			"How can counseling communicate a real time-sensitive decline without panic, false precision, or age stigma?"
		],
		whatWouldChangeMinds: [
			"Large prospective cohorts finding no age-related decline in fecundability, miscarriage, or live birth after accounting for major confounders.",
			"A validated test that predicts individual reproductive lifespan far more accurately than age and history."
		],
		misconceptions: [
			"Fertility does not fall from normal to zero on a person's thirty-fifth birthday.",
			"A normal ovarian-reserve test does not guarantee egg quality, natural conception, or future live birth.",
			"Population averages cannot tell one person exactly when they will or will not conceive."
		],
		editorSummary:
			"The age effect is real but continuous. Replacing the cliff metaphor with a probability curve produces more accurate counseling while preserving the value of timely evaluation and reproductive planning.",
		uncertaintySummary:
			"The population-level age pattern is high-confidence. Individual prediction remains limited, and cohorts differ in pregnancy intention, frequency of intercourse, partner fertility, and treatment access.",
		sources: [
			["guideline", "Fertility evaluation of infertile women: a committee opinion", "American Society for Reproductive Medicine", 2021, "https://integration.asrm.org/practice-guidance/practice-committee-documents/fertility-evaluation-of-infertile-women-a-committee-opinion-2021/", "Clinical guidance uses age-sensitive evaluation timelines while emphasizing a complete reproductive history rather than one threshold."],
			["meta_analysis", "Age-related natural fertility outcomes in women over 35 years: a systematic review and individual participant data meta-analysis", "Human Reproduction", 2020, "10.1093/humrep/deaa129", "Individual-participant synthesis quantifies continuous age-related changes in natural conception and pregnancy outcomes."],
			["landmark_study", "Role of maternal age and pregnancy history in risk of miscarriage: prospective register based study", "BMJ", 2019, "10.1136/bmj.l869", "Large registry study shows miscarriage risk increasing progressively with maternal age and reproductive history."]
		]
	}),
	reviewedClaim({
		topicSlug: "reproductive-and-sexual-health",
		title: "Can IVF fully overcome age-related fertility decline?",
		slug: "can-ivf-fully-overcome-age-related-fertility-decline",
		consensusBand: "strong",
		confidenceScore: 93,
		evidenceCertainty: "high",
		bottomLine:
			"No. In vitro fertilization can help many people conceive, but it does not fully reverse the age-related decline in egg number, egg quality, embryo development, implantation, miscarriage, and cumulative live birth. Donor eggs can change the egg-age component substantially, but treatment burden, pregnancy health, cost, access, and uncertainty remain.",
		stableCore: [
			"Live-birth rates using a patient's own eggs generally decline with age despite IVF.",
			"Transferring a chromosomally screened embryo can reduce some embryo-selection uncertainty but cannot create additional viable embryos or guarantee birth.",
			"Clinic success rates depend on age, diagnosis, treatment history, embryo strategy, denominator, and whether outcomes are reported per transfer or per retrieval."
		],
		openQuestions: [
			"Which treatments improve cumulative live birth rather than only intermediate laboratory outcomes in older patients?",
			"How should clinics communicate personalized chances, multiple-cycle burden, and donor-egg alternatives without misleading marketing?"
		],
		whatWouldChangeMinds: [
			"Replicated trials showing that a treatment restores cumulative own-egg live-birth rates across ages to those of substantially younger patients.",
			"National outcome data showing that age no longer predicts own-egg IVF success after transparent adjustment for prognosis and cycle strategy."
		],
		misconceptions: [
			"IVF is not an insurance policy that guarantees a baby at any age.",
			"A high pregnancy rate per embryo transfer can omit retrievals that produced no transferable embryo.",
			"A euploid embryo can improve transfer prognosis without erasing age-related limits on obtaining that embryo."
		],
		editorSummary:
			"IVF is effective treatment, not a reset button for reproductive aging. Cumulative live birth per started retrieval is usually the clearest outcome for counseling because it keeps failed retrievals and transfers in the denominator.",
		uncertaintySummary:
			"The age gradient is high-confidence. Individual prognosis and the value of add-on procedures remain variable, and clinic-reported denominators can make comparisons difficult.",
		sources: [
			["guideline", "Success Rates", "Society for Assisted Reproductive Technology", 2026, "https://www.sart.org/patients/a-patients-guide-to-assisted-reproductive-technology/general-information/success-rates/", "Patient guidance explains how age, diagnosis, cycle stage, and reporting denominator shape assisted-reproduction success rates."],
			["meta_analysis", "Does maternal age affect assisted reproduction technology success rates after euploid embryo transfer? A systematic review and meta-analysis", "Fertility and Sterility", 2023, "10.1016/j.fertnstert.2023.02.036", "Synthesis examines residual age effects after transfer of embryos screened as euploid."],
			["meta_analysis", "A meta-analysis and systematic review of advanced maternal age patients in IVF", "Human Reproduction Update", 2025, "10.1093/humupd/dmaf020", "Updated review evaluates treatment outcomes and interventions among patients of advanced maternal age."]
		]
	}),
	reviewedClaim({
		topicSlug: "reproductive-and-sexual-health",
		title: "Is menopausal hormone therapy effective for hot flashes, with risks that should be individualized?",
		slug: "is-menopausal-hormone-therapy-effective-for-hot-flashes-with-risks-that-should-be-individualized",
		consensusBand: "strong",
		confidenceScore: 95,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Systemic menopausal hormone therapy is the most effective treatment for bothersome hot flashes and night sweats and also prevents bone loss while it is used. Its net benefit depends on age, time since menopause, symptoms, uterus status, formulation, route, dose, and personal risks such as breast cancer, blood clots, stroke, and cardiovascular disease.",
		stableCore: [
			"Estrogen, with a progestogen when the uterus is present, substantially reduces vasomotor symptoms.",
			"Starting before age 60 or within about ten years of menopause often has a more favorable benefit-risk profile for symptomatic, appropriate candidates.",
			"Hormone therapy should not be presented as a universal anti-aging drug or routinely started solely to prevent chronic disease."
		],
		openQuestions: [
			"How do lower doses, transdermal routes, and different progestogens compare for long-term patient-important outcomes?",
			"What is the best duration and discontinuation strategy for patients whose symptoms persist for many years?"
		],
		whatWouldChangeMinds: [
			"Large randomized evidence finding no clinically meaningful vasomotor-symptom benefit over placebo.",
			"New formulation-specific outcome data materially changing the current timing and risk-stratification framework."
		],
		misconceptions: [
			"The risks from one older regimen in one population should not be applied identically to every route, dose, age, or indication.",
			"Effective symptom treatment is not evidence that hormones extend lifespan or prevent every chronic disease.",
			"People with a uterus generally need endometrial protection when using systemic estrogen."
		],
		editorSummary:
			"The post-WHI consensus is neither 'hormones are harmless' nor 'hormones are always dangerous.' They are highly effective symptom treatment whose benefits and harms change with patient and regimen.",
		uncertaintySummary:
			"Symptom efficacy is high-confidence. Rare long-term harms and comparisons among modern routes and formulations are less precise because many outcome data come from older regimens or observational studies.",
		sources: [
			["systematic_review", "Management of Menopausal Symptoms", "JAMA", 2023, "10.1001/jama.2022.24140", "Evidence review identifies hormone therapy as the most effective treatment for vasomotor symptoms and summarizes individualized contraindications and alternatives."],
			["systematic_review", "Menopausal hormone therapy and women's health: An umbrella review", "PLOS Medicine", 2021, "10.1371/journal.pmed.1003731", "Umbrella review maps benefits and harms across randomized and observational syntheses, emphasizing differences by outcome and regimen."],
			["guideline", "Hormone Therapy", "The Menopause Society", 2026, "https://menopause.org/patient-education/menopause-topics/hormone-therapy", "Current patient guidance explains symptom benefit, uterus-specific regimens, routes, timing, and individualized risk assessment."]
		]
	})
];
