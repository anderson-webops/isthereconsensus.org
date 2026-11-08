import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberVisionHearingResearchCheckedAt = "2026-11-08T20:46:31.833Z";

const sources = {
	outdoor1: researchSource("Interventions to increase time spent outdoors for preventing incidence and progression of myopia in children", "Cochrane Database of Systematic Reviews", 2024, "https://doi.org/10.1002/14651858.cd013549.pub2", "10.1002/14651858.cd013549.pub2", "2024 Cochrane review includes five randomized trials and 10,733 children. Evidence is more persuasive for reducing new myopia than slowing existing myopia, and certainty differs by outcome and follow-up. Its trials overlap later pooled reviews.", "systematic_review", "supports", novemberVisionHearingResearchCheckedAt),
	outdoor3: researchSource("Time Outdoors in Reducing Myopia", "Ophthalmology", 2022, "https://doi.org/10.1016/j.ophtha.2022.06.024", "10.1016/j.ophtha.2022.06.024", "Shanghai cluster trial assigns 6,295 children in 24 schools to additional outdoor time or usual practice. The two assigned intervention durations produced similar actual outdoor exposure, so this is not proof of a precise dose-response or a universally effective daily duration.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	outdoor4: researchSource("Influence of outdoor time on the spherical equivalent and axial length in childhood myopia: A meta‐analysis", "Acta Ophthalmologica", 2025, "https://doi.org/10.1111/aos.17478", "10.1111/aos.17478", "2025 synthesis combines nine randomized and six observational studies. Prevention and progression findings differ, with heterogeneity, publication-bias concerns and low certainty for progression. Overlapping trial reports are not independent confirmations.", "meta_analysis", "context", novemberVisionHearingResearchCheckedAt),
	outdoorSafety: researchSource("RANZCO Position Statement: Progressive Myopia in Childhood", "Royal Australian and New Zealand College of Ophthalmologists", 2025, "https://ranzco.edu/wp-content/uploads/2023/05/RANZCO-Position-Statement-Progressive-Myopia-in-Childhood_2025.pdf", "", "RANZCO's 2025 position statement supports outdoor activity while retaining protection from UV exposure, including sunglasses, hats and skin protection. It distinguishes visible daylight from harmful ultraviolet exposure. This safety context is not an independent trial or a personal exposure prescription.", "context", "context", novemberVisionHearingResearchCheckedAt),
	bluelens1: researchSource("Blue-light filtering spectacle lenses for visual performance, sleep, and macular health in adults", "Cochrane Database of Systematic Reviews", 2023, "https://doi.org/10.1002/14651858.cd013244.pub2", "10.1002/14651858.cd013244.pub2", "2023 Cochrane review of 17 randomized trials finds little clear short-term eye-strain benefit from blue-light-filtering lenses. Trials were small, often at risk of bias and too heterogeneous for a pooled meta-analysis; longer-term and retinal outcomes were poorly studied.", "systematic_review", "supports", novemberVisionHearingResearchCheckedAt),
	bluelens3: researchSource("Do Blue-blocking Lenses Reduce Eye Strain From Extended Screen Time? A Double-Masked Randomized Controlled Trial", "American Journal of Ophthalmology", 2021, "https://doi.org/10.1016/j.ajo.2021.02.010", "10.1016/j.ajo.2021.02.010", "Double-masked trial of 120 computer users found no clear eye-strain or flicker-threshold advantage during a two-hour task. This short experiment is included in the Cochrane review and is not an independent additional review-level vote.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	bluelens4: researchSource("The effect of blue‐light blocking spectacle lenses on visual performance, macular health and the sleep‐wake cycle: a systematic review of the literature", "Ophthalmic and Physiological Optics", 2017, "https://doi.org/10.1111/opo.12406", "10.1111/opo.12406", "2017 review includes three small studies and finds limited evidence for subjective eye-strain improvement. It predates and overlaps the later Cochrane synthesis; experimental visual measures are not the same as durable symptom relief.", "systematic_review", "context", novemberVisionHearingResearchCheckedAt),
	dryeye1: researchSource("Oral Nutritional Supplements for Dry Eye Disease. A Systematic Review with Pairwise and Exploratory Network Meta-Analysis of Randomized Controlled Trials", "Seminars in Ophthalmology", 2026, "https://doi.org/10.1080/08820538.2026.2753569", "10.1080/08820538.2026.2753569", "2026 review includes 57 trials overall and 29 in its primary analyses. Average omega-3 symptom changes were small or imprecise, and most comparisons had very low certainty. Its indirect comparisons do not support ranking supplement classes or routine use.", "meta_analysis", "supports", novemberVisionHearingResearchCheckedAt),
	dryeye2: researchSource("n−3 Fatty Acid Supplementation for the Treatment of Dry Eye Disease", "New England Journal of Medicine", 2018, "https://doi.org/10.1056/nejmoa1709691", "10.1056/nejmoa1709691", "DREAM randomized 535 adults with moderate-to-severe dry eye to fish-derived omega-3 or olive-oil control. Primary symptoms and measured tear signs did not differ clearly over a year. Improvement within both groups is not evidence of an omega-3 advantage.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	dryeye3: researchSource("Re-Esterified Triglyceride ω-3 Fatty Acids in Dry Eye Disease With Meibomian Gland Dysfunction", "JAMA Ophthalmology", 2024, "https://doi.org/10.1001/jamaophthalmol.2024.1482", "10.1001/jamaophthalmol.2024.1482", "2024 masked trial enrolled 132 people with dry eye and meibomian-gland dysfunction. Re-esterified omega-3 did not clearly improve the primary symptom score versus grape-seed oil at six or twelve weeks. A LYS PHARMA grant to an author is disclosed; secondary findings are exploratory.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	dryeye4: researchSource("Efficacy of Omega-3 Intake in Managing Dry Eye Disease: A Systematic Review and Meta-Analysis of Randomized Controlled Trials", "Journal of Clinical Medicine", 2023, "https://doi.org/10.3390/jcm12227026", "10.3390/jcm12227026", "2023 meta-analysis of 19 trials reports favorable pooled symptoms and tear signs, but combines heterogeneous causes and regimens. Its cross-trial associations with dose and duration do not establish a randomized dose-response. It overlaps trials in the newer review.", "meta_analysis", "debate", novemberVisionHearingResearchCheckedAt),
	glaucoma1: researchSource("Reduction of Intraocular Pressure and Glaucoma Progression", "Archives of Ophthalmology", 2002, "https://doi.org/10.1001/archopht.120.10.1268", "10.1001/archopht.120.10.1268", "Early Manifest Glaucoma Trial randomized 255 people with early open-angle glaucoma to immediate pressure-lowering treatment or no initial treatment. Over roughly six years, progression occurred in 45% versus 62%; treatment also had cataract-related effects. These results concern preservation, not restoration, of vision.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	glaucoma4: researchSource("Prognostic factors associated with progression of open-angle glaucoma in adults", "Cochrane Database of Systematic Reviews", 2025, "https://doi.org/10.1002/14651858.cd015436.pub2", "10.1002/14651858.cd015436.pub2", "2025 Cochrane prognostic-factor review considers randomized-trial and longitudinal evidence. Treatment is associated with less visual-field progression, with low certainty in that factor analysis. Prognostic associations and pooled hazard ratios are not randomized comparisons of pressure targets or individual treatment choices.", "systematic_review", "context", novemberVisionHearingResearchCheckedAt),
	glaucomaGuidance: researchSource("Glaucoma", "National Eye Institute", 2026, "https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/glaucoma", "", "National Eye Institute guidance updated in August 2026 states that lowering eye pressure can slow glaucoma, while treatment cannot reverse existing damage. Glaucoma can occur at ordinary pressure levels; treatment and monitoring depend on the individual diagnosis.", "context", "supports", novemberVisionHearingResearchCheckedAt),
	macular1: researchSource("Antioxidant vitamin and mineral supplements for slowing the progression of age-related macular degeneration", "Cochrane Database of Systematic Reviews", 2023, "https://doi.org/10.1002/14651858.cd000254.pub5", "10.1002/14651858.cd000254.pub5", "2023 Cochrane review of 26 studies finds that AREDS-type antioxidant/mineral formulations probably reduce progression to late AMD. Absolute benefit is greater with intermediate than early disease. Most evidence comes from AREDS; supplement components, disease stages and outcomes are not interchangeable.", "systematic_review", "supports", novemberVisionHearingResearchCheckedAt),
	macular2: {
		...researchSource("Lutein + Zeaxanthin and Omega-3 Fatty Acids for Age-Related Macular Degeneration", "JAMA", 2013, "https://doi.org/10.1001/jama.2013.4997", "10.1001/jama.2013.4997", "AREDS2 randomized 4,203 higher-risk participants. Adding lutein/zeaxanthin or omega-3 did not clearly improve the primary progression outcome over the background AREDS formulation. The 2013 correction changes lung-neoplasm table information; beta-carotene safety and substitution analyses require separate interpretation.", "landmark_study", "context", novemberVisionHearingResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1001/jama.2013.4997",
			"https://api.crossref.org/works?filter=updates%3A10.1001%2Fjama.2013.4997&rows=100",
			"https://doi.org/10.1001/jama.2013.6403",
			"https://jamanetwork.com/journals/jama/fullarticle/1710434"
		]
	},
	macular3: researchSource("Long-term Outcomes of Adding Lutein/Zeaxanthin and ω-3 Fatty Acids to the AREDS Supplements on Age-Related Macular Degeneration Progression", "JAMA Ophthalmology", 2022, "https://doi.org/10.1001/jamaophthalmol.2022.1640", "10.1001/jamaophthalmol.2022.1640", "Ten-year follow-up of AREDS2 supports replacing beta-carotene with lutein/zeaxanthin and retains the lung-cancer signal. Everyone was offered AREDS2 supplements during the later observational follow-up, so it is not a new ten-year randomized comparison. NIH's former royalty license and supplied supplements are disclosed.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	macular4: researchSource("Oral Antioxidant and Lutein/Zeaxanthin Supplements Slow Geographic Atrophy Progression to the Fovea in Age-Related Macular Degeneration", "Ophthalmology", 2025, "https://doi.org/10.1016/j.ophtha.2024.07.014", "10.1016/j.ophtha.2024.07.014", "Post-hoc analysis of existing AREDS cohorts was online in 2024 and printed in 2025. Supplements were associated with slower movement of noncentral atrophy toward the center, without a clear overall atrophy-area effect. This is neither an independent new trial nor evidence of restored vision.", "landmark_study", "context", novemberVisionHearingResearchCheckedAt),
	macularGuidance: researchSource("AREDS/AREDS2 Clinical Trials", "National Eye Institute", 2025, "https://www.nei.nih.gov/eye-health-information/clinical-trials/age-related-eye-disease-studies-aredsareds2/about-areds-and-areds2", "", "National Eye Institute guidance distinguishes intermediate AMD and a higher-risk fellow eye from prevention in people without AMD. It warns about beta-carotene for current/former smokers. AREDS2 formulations are distinct from ordinary multivitamins, with individual medication and safety considerations.", "context", "supports", novemberVisionHearingResearchCheckedAt),
	hearingaid5: researchSource("Hearing aids for mild to moderate hearing loss in adults", "Cochrane Database of Systematic Reviews", 2026, "https://doi.org/10.1002/14651858.cd012023.pub3", "10.1002/14651858.cd012023.pub3", "Updated 2026 Cochrane review includes 16 randomized trials and 2,261 adults. Hearing-related participation and listening probably improve; general wellbeing, loneliness, cognition and harms have different certainty. This replaces the 2017 version rather than adding an independent review vote.", "systematic_review", "supports", novemberVisionHearingResearchCheckedAt),
	hearingaid1: researchSource("Effects of Hearing Devices for Adults With Mild-to-Severe Hearing Loss: A Systematic Review and Meta-Analysis of Randomized Controlled Trials", "Journal of Speech, Language, and Hearing Research", 2026, "https://doi.org/10.1044/2026_jslhr-25-00737", "10.1044/2026_jslhr-25-00737", "2026 review includes 33 hearing-device trials with varied active and passive controls. Hearing-related self-reports often improve, but high heterogeneity and incomplete reporting limit pooling. Device comparisons and placebo effects are distinct; this review does not establish dementia prevention.", "meta_analysis", "context", novemberVisionHearingResearchCheckedAt),
	hearingaid4: {
		...researchSource("The Effects of Service-Delivery Model and Purchase Price on Hearing-Aid Outcomes in Older Adults: A Randomized Double-Blind Placebo-Controlled Clinical Trial", "American Journal of Audiology", 2017, "https://doi.org/10.1044/2017_aja-16-0111", "10.1044/2017_aja-16-0111", "2017 randomized service-model trial supports hearing-aid benefit in older volunteers. Its 2019 erratum corrects calibration of the secondary speech test: actual signal-to-noise ratio was +1 rather than +3 dB. Authors expect relative benefit to be similar, while absolute scores differ.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1044/2017_aja-16-0111",
			"https://api.crossref.org/works?filter=updates%3A10.1044%2F2017_aja-16-0111&rows=100",
			"https://doi.org/10.1044/2019_aja-19-0087",
			"https://pubs.asha.org/doi/10.1044/2019_AJA-19-0087"
		]
	},
	tinnitus1: researchSource("Cognitive behavioural therapy for tinnitus", "Cochrane Database of Systematic Reviews", 2020, "https://doi.org/10.1002/14651858.cd012614.pub2", "10.1002/14651858.cd012614.pub2", "2020 Cochrane review includes 28 trials and 2,733 adults. CBT can reduce tinnitus-related disruption, with effects varying by comparison group. Its main estimates are end-of-treatment outcomes, and evidence at six or twelve months was absent. Distress scores do not demonstrate elimination of the sound.", "systematic_review", "supports", novemberVisionHearingResearchCheckedAt),
	tinnitus4: researchSource("Internet-Based Audiologist-Guided Cognitive Behavioral Therapy for Tinnitus: Randomized Controlled Trial", "Journal of Medical Internet Research", 2022, "https://doi.org/10.2196/27584", "10.2196/27584", "2022 trial randomized 158 help-seeking adults to audiologist-guided internet CBT or weekly monitoring. Distress improved more with guided CBT. Short follow-up, unmasked treatment and substantial missing questionnaires limit precision and generalization.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	tinnitus3: researchSource("Single versus combination treatment in tinnitus: an international, multicentre, parallel-arm, superiority, randomised controlled trial", "Nature Communications", 2025, "https://doi.org/10.1038/s41467-025-66165-1", "10.1038/s41467-025-66165-1", "UNITI randomized 461 adults across active single and combination treatments for chronic tinnitus. Combination treatments had a modest average advantage, without clear synergy. This comparison does not isolate every treatment against no care and measures tinnitus handicap rather than a cure.", "landmark_study", "context", novemberVisionHearingResearchCheckedAt),
	vertigo2: researchSource("Epley manoeuvre’s efficacy for benign paroxysmal positional vertigo (BPPV) in primary-care and subspecialty settings: a systematic review and meta-analysis", "BMC Primary Care", 2023, "https://doi.org/10.1186/s12875-023-02217-z", "10.1186/s12875-023-02217-z", "2023 review of 27 sham-controlled trials supports Epley treatment for posterior-canal BPPV in primary and specialist care. Effects on symptoms, diagnostic findings and harms differ in certainty. These studies do not establish a treatment for every cause of dizziness.", "meta_analysis", "supports", novemberVisionHearingResearchCheckedAt),
	vertigo1: researchSource("Comparative efficacy and safety of repositioning maneuvers for posterior canal benign paroxysmal positional vertigo: a network meta-analysis", "Frontiers in Neurology", 2026, "https://doi.org/10.3389/fneur.2026.1762375", "10.3389/fneur.2026.1762375", "2026 network review of 20 trials finds short-term benefits for established posterior-canal repositioning approaches. Recurrence evidence is weaker. Rankings combine direct and indirect comparisons and are not an individual's probability of cure; trials overlap earlier reviews.", "meta_analysis", "supports", novemberVisionHearingResearchCheckedAt),
	vertigo5: researchSource("Clinical Practice Guideline: Benign Paroxysmal Positional Vertigo (Update)", "Otolaryngology–Head and Neck Surgery", 2017, "https://doi.org/10.1177/0194599816689667", "10.1177/0194599816689667", "2017 AAO-HNSF clinical guideline recommends clinician diagnosis and appropriate repositioning for posterior-canal BPPV. It emphasizes distinguishing other causes, mobility/fall risks, reassessment and recurrence. A guideline recommendation is not an additional randomized experiment.", "consensus_statement", "supports", novemberVisionHearingResearchCheckedAt),
	vertigo4: researchSource("Treatment Maneuvers in Cupulolithiasis of the Posterior Canal Benign Paroxysmal Positional Vertigo", "JAMA Network Open", 2025, "https://doi.org/10.1001/jamanetworkopen.2025.0972", "10.1001/jamanetworkopen.2025.0972", "2025 masked Korean trial studied a specific posterior-canal cupulolithiasis variant. Next-day improvement differed between selected maneuvers and sham; immediate improvement did not clearly differ. Its uncommon subtype and very short follow-up cannot be generalized to all BPPV.", "landmark_study", "context", novemberVisionHearingResearchCheckedAt),
	screentime1: researchSource("Digital Screen Time and Myopia", "JAMA Network Open", 2025, "https://doi.org/10.1001/jamanetworkopen.2024.60026", "10.1001/jamanetworkopen.2024.60026", "2025 review combines 45 mainly observational studies. More screen time is associated with higher odds of myopia, but dose-response modeling does not establish causation or a safe personal cutoff. Its different myopia outcomes and shared confounders require care.", "meta_analysis", "supports", novemberVisionHearingResearchCheckedAt),
	screentime2: researchSource("The association between screen time exposure and myopia in children and adolescents: a meta-analysis", "BMC Public Health", 2024, "https://doi.org/10.1186/s12889-024-19113-5", "10.1186/s12889-024-19113-5", "2024 review of 19 epidemiological studies finds associations that vary by device and design, with publication-bias concerns. Odds ratios from different exposure definitions are not directly comparable, and the synthesis overlaps the newer review.", "meta_analysis", "context", novemberVisionHearingResearchCheckedAt),
	screentime3: researchSource("The association between digital screen time and myopia: A systematic review", "Ophthalmic and Physiological Optics", 2020, "https://doi.org/10.1111/opo.12657", "10.1111/opo.12657", "2020 review finds mixed results across 15 studies; its five-study pooled estimate does not show a clear association. Reliance on reported exposure and a smaller, earlier evidence base help explain differences from later reviews.", "systematic_review", "debate", novemberVisionHearingResearchCheckedAt),
	screentime4: researchSource("Screen Time and Myopia-Related Outcomes in European Children: A Systematic Review", "Vision", 2026, "https://doi.org/10.3390/vision10030043", "10.3390/vision10030043", "2026 European review includes 14 heterogeneous, mostly observational studies and rates certainty low to very low. Screen-related proxies, near work, parental myopia and outdoor time complicate causal interpretation.", "systematic_review", "context", novemberVisionHearingResearchCheckedAt),
	myopiaglasses5: researchSource("Interventions for myopia control in children: a living systematic review and network meta-analysis", "Cochrane Database of Systematic Reviews", 2025, "https://doi.org/10.1002/14651858.cd014758.pub3", "10.1002/14651858.cd014758.pub3", "2025 living Cochrane review replaces its earlier version and includes 104 trials across multiple myopia interventions. Optical approaches may slow progression, with differing designs, often low certainty and limited longer-term data. Poorly connected networks limit treatment rankings.", "systematic_review", "supports", novemberVisionHearingResearchCheckedAt),
	myopiaglasses1: researchSource("Defocus Incorporated Multiple Segments (DIMS) spectacle lenses slow myopia progression: a 2-year randomised clinical trial", "British Journal of Ophthalmology", 2020, "https://doi.org/10.1136/bjophthalmol-2018-313739", "10.1136/bjophthalmol-2018-313739", "DIMS trial randomized 183 Chinese children, with 160 completing two years. Refractive progression and eye growth were lower than with single-vision lenses. The result concerns a specific lens design and age range; patents are disclosed.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	myopiaglasses2: researchSource("Spectacle Lenses With Aspherical Lenslets for Myopia Control vs Single-Vision Spectacle Lenses", "JAMA Ophthalmology", 2022, "https://doi.org/10.1001/jamaophthalmol.2022.0401", "10.1001/jamaophthalmol.2022.0401", "Two-year Chinese trial finds less refractive progression and axial growth with aspherical lenslets than single-vision lenses. Lens designs differ, and longer-wear subgroup associations are not separately randomized. Manufacturer employment and device patents are disclosed.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	myopiaglasses3: researchSource("Spectacle Lenses With Highly Aspherical Lenslets for Myopia Control", "JAMA Ophthalmology", 2026, "https://doi.org/10.1001/jamaophthalmol.2026.3288", "10.1001/jamaophthalmol.2026.3288", "2026 report of a 159-child US randomized trial finds slower refractive progression and eye growth over two years with one highly aspherical lenslet design. Sustained effects and later adult eye disease were not established. Manufacturer and research-company employment and patents are disclosed.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	amblyopia1: researchSource("A Randomized Trial to Evaluate 2 Hours of Daily Patching for Strabismic and Anisometropic Amblyopia in Children", "Ophthalmology", 2006, "https://doi.org/10.1016/j.ophtha.2006.01.069", "10.1016/j.ophtha.2006.01.069", "Randomized trial of 180 children aged three to seven finds added visual improvement from patching with near activities after spectacle correction. It tests a supervised combined regimen, with modest average gains rather than universal normal vision.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	amblyopia2: researchSource("Randomized Trial of Treatment of Amblyopia in Children Aged 7 to 17 Years", "Archives of Ophthalmology", 2005, "https://doi.org/10.1001/archopht.123.4.437", "10.1001/archopht.123.4.437", "Trial of 507 older children compares optical correction with a treatment bundle including patching, near activities and atropine for younger participants. Benefits differ by age and prior treatment. The bundle does not isolate patching alone.", "landmark_study", "context", novemberVisionHearingResearchCheckedAt),
	amblyopia3: researchSource("Alternative therapies versus patching for childhood amblyopia: a modality-stratified meta-analysis", "Strabismus", 2026, "https://doi.org/10.1080/09273972.2026.2746556", "10.1080/09273972.2026.2746556", "2026 review compares alternatives with patching across 11 trials. Pooled lack of difference is not proof of equivalence; device-generation comparisons are exploratory. These are mainly younger children, and it is not a review of patching versus no treatment.", "meta_analysis", "context", novemberVisionHearingResearchCheckedAt),
	cataract1: researchSource("Patient-reported outcome measures in cataract surgery: systematic review and meta-analysis of visual function and quality of life", "Canadian Journal of Ophthalmology", 2026, "https://doi.org/10.1016/j.jcjo.2026.07.001", "10.1016/j.jcjo.2026.07.001", "2026 review includes 122 studies and finds average improvements in reported visual function after cataract surgery. Much evidence is before-and-after, with extreme heterogeneity and possible small-study effects. Average questionnaire gains do not predict a particular patient's result.", "meta_analysis", "supports", novemberVisionHearingResearchCheckedAt),
	cataract2: researchSource("The consequences of waiting for cataract surgery: a systematic review", "Canadian Medical Association Journal", 2007, "https://doi.org/10.1503/cmaj.060962", "10.1503/cmaj.060962", "2007 review of 27 studies associates prolonged waiting with worse vision-related outcomes. It uses qualitative synthesis rather than a pooled effect and cannot establish a universal deadline for surgery.", "systematic_review", "supports", novemberVisionHearingResearchCheckedAt),
	cataract3: {
		...researchSource("Randomised trial of effectiveness of second eye cataract surgery", "The Lancet", 1998, "https://doi.org/10.1016/s0140-6736(97)12536-3", "10.1016/s0140-6736(97)12536-3", "Randomized trial of 208 patients finds benefits from expedited second-eye surgery compared with waiting. Reading difficulties, symptoms and depth perception differ from distance-acuity outcomes. The trial concerns the second eye, not first-eye surgery or modern lens selection.", "landmark_study", "context", novemberVisionHearingResearchCheckedAt),
		statusSources: [
			"https://doi.org/10.1016/s0140-6736(97)12536-3",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fs0140-6736%2897%2912536-3&rows=100"
		]
	},
	cataractGuidance: researchSource("Cataract Surgery", "National Eye Institute", 2024, "https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/cataracts/cataract-surgery", "", "National Eye Institute patient guidance describes improved vision for most patients after cataract surgery, alongside infection, retinal and other surgical risks. Other causes of vision loss and continued need for glasses can affect the result.", "context", "supports", novemberVisionHearingResearchCheckedAt),
	lasik1: researchSource("Symptoms and Satisfaction of Patients in the Patient-Reported Outcomes With Laser In Situ Keratomileusis (PROWL) Studies", "JAMA Ophthalmology", 2017, "https://doi.org/10.1001/jamaophthalmol.2016.4587", "10.1001/jamaophthalmol.2016.4587", "PROWL prospectively followed 262 military and 312 civilian patients. Satisfaction was high, while some participants without prior symptoms reported new glare, halos or dry eye at three months. Symptom-specific denominators differ from all treated patients, and long-term effects were not established.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	lasik2: researchSource("LASIK World Literature Review", "Ophthalmology", 2009, "https://doi.org/10.1016/j.ophtha.2008.12.037", "10.1016/j.ophtha.2008.12.037", "2009 review's satisfaction analysis uses 19 articles and 2,198 patients, with procedures from 1995–2003. High average satisfaction is distinct from absence of symptoms and does not describe all modern devices or later complications.", "systematic_review", "context", novemberVisionHearingResearchCheckedAt),
	lasik3: researchSource("Patient Reported Visual Outcomes, Dry Eye Symptoms, and Satisfaction Following Topography-Guided LASIK", "Clinical Ophthalmology", 2025, "https://doi.org/10.2147/opth.s542097", "10.2147/opth.s542097", "2025 single-site before-and-after study of 50 people reports improved satisfaction and symptoms after one topography-guided approach. It has no randomized comparison and short follow-up. A manufacturer's consultancy is disclosed; results are device- and setting-specific.", "landmark_study", "context", novemberVisionHearingResearchCheckedAt),
	lasikGuidance: researchSource("LASIK Quality of Life Collaboration Project", "U.S. Food and Drug Administration", undefined, "https://www.fda.gov/medical-devices/lasik/lasik-quality-life-collaboration-project", "", "FDA's PROWL summary distinguishes high satisfaction, new symptoms among previously symptom-free participants and much less common severe activity limitations. These are different outcomes from the same studies, not independent trial replications.", "context", "context", novemberVisionHearingResearchCheckedAt),
	contactsleep1: researchSource("Acanthamoeba Keratitis Risk Factors for Daily Wear Contact Lens Users", "Ophthalmology", 2023, "https://doi.org/10.1016/j.ophtha.2022.08.002", "10.1016/j.ophtha.2022.08.002", "UK case-control study finds overnight wear associated with Acanthamoeba keratitis even among daily-disposable users. It concerns a particular infection, has wide subgroup intervals and relies on reported habits; its odds ratios are not absolute infection probabilities.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	contactsleep2: researchSource("Risk factors for contact lens-related microbial keratitis in Singapore", "Eye", 2016, "https://doi.org/10.1038/eye.2015.250", "10.1038/eye.2015.250", "Singapore case-control study of 58 keratitis cases and 152 controls associates even occasional overnight wear with infection. Lens care and other habits also matter. This population estimate does not establish the same risk multiplier for every lens or wearer.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	contactsleep3: researchSource("Corneal Infections Associated with Sleeping in Contact Lenses: Six Cases, United States, 2016–2018", "MMWR. Morbidity and Mortality Weekly Report", 2018, "https://doi.org/10.15585/mmwr.mm6732a2", "10.15585/mmwr.mm6732a2", "CDC describes six US infections linked to sleeping in contact lenses, including serious corneal damage. This selected case series illustrates possible severity, not incidence or a causal risk estimate; the cited six-to-eightfold figure comes from earlier research. Industry support for CDC's lens-safety program is disclosed.", "context", "supports", novemberVisionHearingResearchCheckedAt),
	multifocal1: researchSource("Multifocal versus monofocal intraocular lenses after cataract extraction", "Cochrane Database of Systematic Reviews", 2016, "https://doi.org/10.1002/14651858.cd003169.pub4", "10.1002/14651858.cd003169.pub4", "2016 Cochrane review includes 20 randomized lens trials. Multifocal lenses can reduce spectacle dependence and improve near vision, with more glare or halos in some comparisons. Certainty varies and the different lens generations and trials are not interchangeable.", "systematic_review", "supports", novemberVisionHearingResearchCheckedAt),
	multifocal2: researchSource("Effectiveness of multifocal and monofocal intraocular lenses for cataract surgery and lens replacement: a systematic review and meta-analysis", "Graefe's Archive for Clinical and Experimental Ophthalmology", 2019, "https://doi.org/10.1007/s00417-018-04218-6", "10.1007/s00417-018-04218-6", "2019 review of 25 trials finds better near vision and less spectacle dependence with multifocal lenses, alongside more unwanted visual phenomena. It overlaps the earlier evidence base and distinguishes newer diffractive designs from older technologies.", "meta_analysis", "supports", novemberVisionHearingResearchCheckedAt),
	multifocal3: researchSource("Visual Outcomes and Optical Quality of Accommodative, Multifocal, Extended Depth-of-Focus, and Monofocal Intraocular Lenses in Presbyopia-Correcting Cataract Surgery", "JAMA Ophthalmology", 2022, "https://doi.org/10.1001/jamaophthalmol.2022.3667", "10.1001/jamaophthalmol.2022.3667", "2022 network analysis of 27 bilateral cataract trials supports differences in near and intermediate vision by lens type. It did not detect clear differences in some glare/halo comparisons; this does not establish equal safety or absence of these symptoms. Reviews reuse many trials.", "meta_analysis", "context", novemberVisionHearingResearchCheckedAt),
	otchearing1: researchSource("Self-Fitting Versus Professional-Fitting Hearing Aids: A Systematic Review and Meta-Analysis of Randomized Controlled Trials", "Audiology Research", 2026, "https://doi.org/10.3390/audiolres16050139", "10.3390/audiolres16050139", "2026 meta-analysis of seven trials finds no clear average self-fitting versus professional-fitting difference, but rates benefit evidence very low certainty with substantial heterogeneity and sparse safety data. A pooled null does not establish equivalence for all products or users.", "meta_analysis", "context", novemberVisionHearingResearchCheckedAt),
	otchearing2: researchSource("Effectiveness of an Over-the-Counter Self-fitting Hearing Aid Compared With an Audiologist-Fitted Hearing Aid", "JAMA Otolaryngology–Head & Neck Surgery", 2023, "https://doi.org/10.1001/jamaoto.2023.0376", "10.1001/jamaoto.2023.0376", "2023 trial analyzes 64 adults using the same device with self-fitting/remote support or professional fitting. Six-week outcomes were broadly similar. Short follow-up, a selected population and manufacturer-related consulting, equity and support limit generalization.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	otchearing3: researchSource("Self-Fit vs. Professional-Fit Over-the-Counter Hearing Aids: A Randomized Clinical Trial", "Journal of the American Academy of Audiology", 2026, "https://doi.org/10.3766/jaaa.250047", "10.3766/jaaa.250047", "2026 trial enrolled 71 adults, with 64 completing one month. Aided benefit did not clearly differ, but professional fitting produced some acoustic-output differences. Its clinic sample and app-threshold variability do not establish universal interchangeability.", "landmark_study", "context", novemberVisionHearingResearchCheckedAt),
	otcGuidance: researchSource("OTC Hearing Aids: What You Should Know", "U.S. Food and Drug Administration", undefined, "https://www.fda.gov/medical-devices/hearing-aids/otc-hearing-aids-what-you-should-know", "", "FDA guidance defines the US OTC category for adults at least 18 with perceived mild-to-moderate hearing loss. Severe loss, sudden or asymmetric changes, pain, drainage and other warning signs can call for clinical assessment. Regulatory access differs from proof that all fitting approaches are equally effective.", "context", "context", novemberVisionHearingResearchCheckedAt),
	cochlear1: researchSource("The Benefits of Cochlear Implantation for Adults: A Systematic Umbrella Review", "Ear & Hearing", 2024, "https://doi.org/10.1097/aud.0000000000001473", "10.1097/aud.0000000000001473", "2024 umbrella review includes 42 review articles and finds improved speech-related outcomes for many adult implant users. Review quality and underlying designs vary; its reviews overlap and are not 42 new experiments.", "systematic_review", "supports", novemberVisionHearingResearchCheckedAt),
	cochlear2: researchSource("Assessment of Speech Understanding After Cochlear Implantation in Adult Hearing Aid Users", "JAMA Otolaryngology–Head & Neck Surgery", 2020, "https://doi.org/10.1001/jamaoto.2020.1584", "10.1001/jamaoto.2020.1584", "2020 multicenter nonrandomized study follows selected adults with limited benefit from optimized hearing aids. Speech scores improved after implantation, but there was no randomized untreated comparison. Three revision surgeries and multiple industry relationships are reported.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt),
	cochlear3: researchSource("Cochlear Implantation in Adults", "JAMA Otolaryngology–Head & Neck Surgery", 2013, "https://doi.org/10.1001/jamaoto.2013.1744", "10.1001/jamaoto.2013.1744", "2013 synthesis includes 42 primary studies, distinct from the later umbrella review's 42 reviews. Speech and quality-of-life findings generally favor implantation, with variable designs, follow-up and bilateral comparisons. It does not establish identical results for every candidate.", "meta_analysis", "supports", novemberVisionHearingResearchCheckedAt),
	cochlearGuidance: researchSource("Cochlear Implants", "National Institute on Deafness and Other Communication Disorders", 2024, "https://www.nidcd.nih.gov/health/cochlear-implants", "", "NIDCD guidance describes useful sound and speech access without restoring typical hearing. Implantation involves surgery, adaptation and professional rehabilitation; results and personal preferences differ. Candidacy is an individualized clinical decision.", "context", "context", novemberVisionHearingResearchCheckedAt),
	earwax1: researchSource("Ear drops for the removal of ear wax", "Cochrane Database of Systematic Reviews", 2018, "https://doi.org/10.1002/14651858.cd012171.pub2", "10.1002/14651858.cd012171.pub2", "2018 Cochrane review includes ten mostly old studies. One small comparison suggests better clearance with drops than no treatment, with low certainty. Commercial agents are not established as superior to water or saline, and limited harms reporting does not establish universal safety.", "systematic_review", "supports", novemberVisionHearingResearchCheckedAt),
	earwax2: researchSource("Unpacking cerumen impaction: a systematic review of clinical practice guidelines to support the development of the world health organization package of ear and hearing care interventions", "BMC Primary Care", 2026, "https://doi.org/10.1186/s12875-026-03325-2", "10.1186/s12875-026-03325-2", "2026 review examines clinical guidelines rather than new treatment trials. It identifies common management approaches and differences between AAO-HNS and NICE recommendations. Guidelines and the trials they cite do not add independent efficacy evidence.", "systematic_review", "context", novemberVisionHearingResearchCheckedAt),
	earwax3: {
		...researchSource("Clinical Practice Guideline (Update): Earwax (Cerumen Impaction)", "Otolaryngology–Head and Neck Surgery", 2017, "https://doi.org/10.1177/0194599816671491", "10.1177/0194599816671491", "AAO-HNSF guideline addresses symptomatic or examination-blocking wax, with modifying conditions such as an abnormal eardrum and previous treatment. Its 2017 corrigendum corrects evidence counts and search-method descriptions. A treatment option in guidance is not proof that a particular drop is best.", "consensus_statement", "context", novemberVisionHearingResearchCheckedAt),
		citationStatus: "corrected" as const,
		statusSources: [
			"https://doi.org/10.1177/0194599816671491",
			"https://doi.org/10.1177/0194599817725542",
			"https://api.crossref.org/works?filter=updates%3A10.1177%2F0194599816671491&rows=100",
			"https://aao-hnsfjournals.onlinelibrary.wiley.com/doi/10.1177/0194599817725542"
		]
	},
	otitis1: researchSource("Antibiotics for acute otitis media in children", "Cochrane Database of Systematic Reviews", 2023, "https://doi.org/10.1002/14651858.cd000219.pub5", "10.1002/14651858.cd000219.pub5", "2023 Cochrane review finds modest average pain benefit over placebo at two to three days, with more vomiting, diarrhea or rash. Its NNT of 20 and additional-harm estimate of one per 14 treated describe different outcomes; most evidence comes from high-income countries.", "systematic_review", "supports", novemberVisionHearingResearchCheckedAt),
	otitis2: researchSource("Adverse Events of Antibiotics Used to Treat Acute Otitis Media in Children: A Systematic Meta-Analysis", "The Journal of Pediatrics", 2019, "https://doi.org/10.1016/j.jpeds.2019.08.043", "10.1016/j.jpeds.2019.08.043", "2019 synthesis of 82 studies finds adverse-event rates vary by antibiotic, regimen and how symptoms are collected. These across-study rates are not randomized head-to-head safety rankings or personal treatment recommendations.", "meta_analysis", "context", novemberVisionHearingResearchCheckedAt),
	otitis3: {
		...researchSource("Antibiotics for acute otitis media: a meta-analysis with individual patient data", "The Lancet", 2006, "https://doi.org/10.1016/s0140-6736(06)69606-2", "10.1016/s0140-6736(06)69606-2", "Individual-patient analysis of six trials and 1,643 children finds greater benefit for children under two with bilateral disease and for those with ear discharge. Age alone did not explain the subgroup difference. These trials overlap the broader evidence base.", "meta_analysis", "context", novemberVisionHearingResearchCheckedAt),
		statusSources: [
			"https://doi.org/10.1016/s0140-6736(06)69606-2",
			"https://api.crossref.org/works?filter=updates%3A10.1016%2Fs0140-6736%2806%2969606-2&rows=100"
		]
	},
	otitis4: researchSource("Antibiotic treatment to prevent pediatric acute otitis media infectious complications: A meta-analysis", "PLOS ONE", 2024, "https://doi.org/10.1371/journal.pone.0304742", "10.1371/journal.pone.0304742", "2024 review includes observational data to study rare complications. Antibiotics are associated with fewer mastoiditis cases, but many children would need treatment to prevent one rare event, while common adverse effects increase. Diagnostic misclassification and nonrandomized evidence limit causal precision.", "meta_analysis", "context", novemberVisionHearingResearchCheckedAt),
	soundtherapy1: researchSource("Sound therapy (using amplification devices and/or sound generators) for tinnitus", "Cochrane Database of Systematic Reviews", 2018, "https://doi.org/10.1002/14651858.cd013094.pub2", "10.1002/14651858.cd013094.pub2", "2018 Cochrane review includes eight studies but lacks usable outcome data for its main no-device/placebo comparisons. Device-to-device evidence is limited and low certainty, and harms were not assessed. Missing comparisons establish uncertainty, not proof of no benefit.", "systematic_review", "context", novemberVisionHearingResearchCheckedAt),
	soundtherapy2: researchSource("Chronic tinnitus is quietened by sound therapy using a novel cross-frequency de-correlating stimulus modulation", "Hearing Research", 2025, "https://doi.org/10.1016/j.heares.2025.109335", "10.1016/j.heares.2025.109335", "2025 blinded crossover trial has 53 completers. Its abstract reports improved loudness during the active period and reduced distress in both periods, using within-period significance tests. Those p values alone do not establish an active-versus-sham difference or durable benefit.", "landmark_study", "context", novemberVisionHearingResearchCheckedAt),
	soundtherapy3: researchSource("Tinnitus Sound Therapy Trial Shows Effectiveness for Those with Tinnitus", "Journal of the American Academy of Audiology", 2020, "https://doi.org/10.3766/jaaa.18027", "10.3766/jaaa.18027", "Small crossover study has 15 completers, with five showing benefit on its total tinnitus questionnaire. Additional derived subgroup measures suggest possible benefits for some functions. The small, unmasked design and selective outcome analysis limit generalization.", "landmark_study", "supports", novemberVisionHearingResearchCheckedAt)
};

export const novemberVisionHearingClaims = [
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "does-outdoor-time-help-prevent-childhood-nearsightedness",
		title: "Does outdoor time help prevent childhood nearsightedness?",
		bottomLine: "Yes. More time outdoors can reduce the chance that children develop nearsightedness. The evidence is stronger for preventing new cases than for slowing myopia once it has started. Outdoor activity still calls for sun protection; looking at the sun is harmful.",
		stableCore: [
			"Randomized school studies support a preventive effect, especially in younger children.",
			"Studies of children who already have myopia give less certain results. Outdoor time does not replace an eye examination or prescribed vision correction."
		],
		openQuestions: [
			"How much of the benefit persists outside the mainly Asian school settings studied?",
			"Which practical outdoor changes best prevent onset without adding harmful UV exposure?"
		],
		whatWouldChangeMinds: [
			"Longer randomized studies separating new myopia from progression in children already affected.",
			"Objective exposure measurements and consistent findings across different school and family settings."
		],
		misconceptions: [
			"Preventing new myopia is different from reversing existing nearsightedness.",
			"Outdoor daylight and ultraviolet exposure are not interchangeable treatments."
		],
		editorSummary: "Prevention findings are strongest in young schoolchildren; evidence for controlling established myopia is less secure.",
		population: "Mostly school-age children in randomized school studies and observational cohorts, many from Asia.",
		scope: "Assess outdoor activity and objectively measured myopia onset, distinguishing prevention from progression and actual exposure from assigned school time.",
		excludedEvidence: [
			"Keep prevention of new myopia separate from treatment of existing myopia.",
			"Do not turn assigned outdoor periods or observational light measurements into a personal exposure prescription."
		],
		uncertainty: "Setting, achieved outdoor exposure, follow-up and progression outcomes vary; pooled reviews reuse several of the same trials.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.outdoor1,
			sources.outdoor3,
			sources.outdoor4,
			sources.outdoorSafety
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "do-blue-light-glasses-reduce-computer-eye-strain",
		title: "Do blue-light glasses reduce computer eye strain?",
		bottomLine: "A clear short-term benefit has not been shown. Randomized trials generally find little difference in eye strain between blue-light-filtering and ordinary lenses. The studies are often small and short, so they leave uncertainty about lasting benefits and which users might respond differently.",
		stableCore: [
			"The largest evidence review found limited clinical support for buying blue-light-filtering lenses specifically to relieve computer eye strain.",
			"A masked computer-task trial found no clear advantage. Changes in laboratory visual tests do not automatically mean people feel or function better."
		],
		openQuestions: [
			"Would longer, well-masked trials find a meaningful symptom benefit?",
			"Do people with specific eye conditions respond differently from general computer users?"
		],
		whatWouldChangeMinds: [
			"Larger masked trials measuring symptoms and daily function over months.",
			"Reproducible benefits against an otherwise comparable ordinary lens."
		],
		misconceptions: [
			"A lens changing the light spectrum does not by itself show that it relieves symptoms.",
			"The separate question of sleep effects cannot establish an eye-strain benefit."
		],
		editorSummary: "Much of the evidence comes from brief tests rather than months of everyday computer use.",
		population: "Adults in short randomized lens studies, including computer users and people with differing eye symptoms.",
		scope: "Compare blue-light-filtering spectacle lenses with ordinary lenses for reported computer eye strain, keeping symptom outcomes separate from laboratory proxies.",
		excludedEvidence: [
			"Keep sleep outcomes and laboratory retinal-cell experiments outside the eye-strain verdict.",
			"Count reviews and the trials they include as overlapping evidence rather than independent replications."
		],
		uncertainty: "Small samples, short follow-up, variable masking and different symptom measures limit precision.",
		band: "broad",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.bluelens1,
			sources.bluelens3,
			sources.bluelens4
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "do-omega-3-supplements-help-dry-eyes",
		title: "Do omega-3 supplements help dry eyes?",
		bottomLine: "A dependable benefit has not been established. Some pooled reviews report improvement, but large masked trials found little extra symptom relief compared with control oils. Differences in the supplements, dry-eye causes and study methods leave uncertainty about whether any particular group benefits.",
		stableCore: [
			"The DREAM trial and a later trial in meibomian-gland dysfunction found no clear primary symptom advantage for omega-3 supplements.",
			"A 2026 review rated most comparisons very uncertain and found average symptom changes that were small or imprecise."
		],
		openQuestions: [
			"Are there well-defined dry-eye subgroups with a meaningful, reproducible benefit?",
			"How do active control oils and differing formulations affect trial results?"
		],
		whatWouldChangeMinds: [
			"Well-masked trials with prespecified symptom outcomes and clinically meaningful between-group differences.",
			"Consistent findings within clearly defined dry-eye causes, rather than only favorable secondary tear tests."
		],
		misconceptions: [
			"Symptoms improving during a study does not establish an advantage over its comparison treatment.",
			"A better tear-test result and noticeable relief for the person are different outcomes."
		],
		editorSummary: "The strongest trials and some pooled estimates give different impressions; supplement classes cannot be reliably ranked.",
		population: "Adults with dry-eye disease, including moderate-to-severe symptoms and meibomian-gland dysfunction.",
		scope: "Assess oral omega-3 against randomized control treatments for dry-eye symptoms, distinguishing formulations, diagnoses, tear signs and primary outcomes.",
		excludedEvidence: [
			"Keep dietary associations and nonrandomized dose comparisons separate from supplement treatment effects.",
			"Use exploratory secondary outcomes as hypotheses rather than proof of symptom relief."
		],
		uncertainty: "Different control oils, dry-eye causes, formulations and heterogeneous small trials complicate pooling.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.dryeye1,
			sources.dryeye2,
			sources.dryeye3,
			sources.dryeye4
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "does-lowering-eye-pressure-slow-glaucoma",
		title: "Does lowering eye pressure slow glaucoma?",
		bottomLine: "Yes. Lowering eye pressure can slow further vision damage in open-angle glaucoma. It does not restore sight already lost, and some people still progress despite treatment. The right treatment and pressure target depend on the person's disease, risks and response over time.",
		stableCore: [
			"A randomized trial of early glaucoma found less progression with immediate pressure-lowering treatment than with no initial treatment.",
			"Current clinical guidance treats pressure reduction as a way to preserve sight. Normal-range pressure does not rule out glaucoma."
		],
		openQuestions: [
			"Which pressure target best balances preservation and treatment harms for each patient?",
			"How can clinicians identify people who will progress despite apparently well-controlled pressure?"
		],
		whatWouldChangeMinds: [
			"Longer randomized comparisons using visual-field loss and daily function, not pressure readings alone.",
			"Reliable ways to tailor targets while preserving vision and reducing treatment burden."
		],
		misconceptions: [
			"A lower pressure reading is useful, but preserving vision is the clinical goal.",
			"Treatment can slow damage without reversing existing loss."
		],
		editorSummary: "Pressure targets need monitoring and adjustment because progression and treatment burdens vary between people.",
		population: "Adults with diagnosed open-angle glaucoma, with randomized early-disease and longitudinal progression evidence.",
		scope: "Assess whether pressure-lowering treatment slows established open-angle glaucoma, separating measured vision preservation from pressure-only comparisons and ocular-hypertension prevention.",
		excludedEvidence: [
			"Keep established glaucoma separate from elevated pressure without diagnosed nerve or visual-field damage.",
			"Do not infer a universal pressure target or restored sight from average treatment effects."
		],
		uncertainty: "Individual progression varies, and many newer comparisons measure pressure rather than long-term visual function.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.glaucoma1,
			sources.glaucoma4,
			sources.glaucomaGuidance
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "can-areds2-supplements-slow-macular-degeneration",
		title: "Can AREDS2 supplements slow macular degeneration?",
		bottomLine: "Yes, for some people at higher risk of advanced age-related macular degeneration. The benefit depends on disease stage and the exact supplement formula. AREDS2 supplements do not prevent AMD from starting or restore lost sight. Older formulas containing beta-carotene carry a lung-cancer risk for current and former smokers.",
		stableCore: [
			"The strongest benefit is for intermediate AMD or a higher-risk eye when the other eye already has advanced disease.",
			"AREDS2 is a specific high-dose formulation, not an ordinary multivitamin. Its main trial tested additions and substitutions on top of an existing formulation.",
			"Later analysis suggests some supplements may slow atrophy moving toward central vision. It does not show that damaged retina regrows."
		],
		openQuestions: [
			"Which patients with existing geographic atrophy gain useful long-term preservation?",
			"How do benefits and safety vary with disease stage and other medicines?"
		],
		whatWouldChangeMinds: [
			"Prospective trials confirming the later atrophy findings with meaningful vision outcomes.",
			"Reliable stage-specific comparisons of current formulations, harms and daily function."
		],
		misconceptions: [
			"A supplement helping intermediate AMD does not establish prevention in healthy eyes.",
			"Adding a component, replacing beta-carotene and taking a complete formula are different comparisons."
		],
		editorSummary: "Disease stage and the exact formulation determine whether the trial findings apply.",
		population: "Mostly older adults with diagnosed AMD, particularly intermediate disease or advanced disease in one eye.",
		scope: "Assess AREDS-type formulations for AMD progression, separating prevention, disease stages, primary comparisons and later analyses of the same cohorts.",
		excludedEvidence: [
			"Keep ordinary multivitamins and dietary associations separate from the tested formulations.",
			"Do not count AREDS2 follow-up and post-hoc reports as new independent trials or infer restored sight."
		],
		uncertainty: "Stage-specific benefits and the newer atrophy findings are less certain than the main higher-risk progression evidence.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.macular1,
			sources.macular2,
			sources.macular3,
			sources.macular4,
			sources.macularGuidance
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "do-hearing-aids-improve-everyday-communication",
		title: "Do hearing aids improve everyday communication?",
		bottomLine: "Yes. Trials show better listening and everyday participation, on average, for adults with mild to moderate hearing loss. Hearing aids do not recreate ordinary hearing or remove every difficulty with background noise. Benefits vary, and a usable fit and continued support matter.",
		stableCore: [
			"The updated 2026 Cochrane review finds meaningful average improvements in listening and hearing-related daily life.",
			"General wellbeing, loneliness and memory are separate outcomes with less certain evidence. Better communication alone does not establish dementia prevention."
		],
		openQuestions: [
			"Which fitting and support approaches produce lasting benefits for different users?",
			"How do results vary across languages, income, hearing-loss patterns and longer follow-up?"
		],
		whatWouldChangeMinds: [
			"Longer controlled studies measuring communication in daily life and consistently recording harms.",
			"Reproducible differences between clearly defined fitting and support approaches."
		],
		misconceptions: [
			"Making sound louder and making speech easier to follow are different goals.",
			"Device trials and later reviews of those same trials do not supply independent votes about efficacy."
		],
		editorSummary: "Listening benefits are better established than claims about memory, loneliness or long-term brain health.",
		population: "Mainly older adults seeking help for mild to moderate hearing loss, with varied devices and service settings.",
		scope: "Assess acoustic hearing aids for listening and daily participation, distinguishing hearing-related function from cognition and comparisons among devices.",
		excludedEvidence: [
			"Keep communication outcomes separate from the site's hearing-loss and cognitive-decline question.",
			"Do not generalize comparisons between fitting services or device types to every hearing aid versus no aid."
		],
		uncertainty: "Masking is difficult, many outcomes are self-reported, and devices, controls and follow-up differ.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.hearingaid5,
			sources.hearingaid1,
			sources.hearingaid4
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "does-cbt-help-with-tinnitus-distress",
		title: "Does CBT help with tinnitus distress?",
		bottomLine: "Yes. Cognitive behavioral therapy can reduce the distress and daily disruption caused by tinnitus. The clearest evidence concerns how people cope and function, not a cure for the ringing itself. Benefits vary by comparison treatment, and longer-term results are less well established.",
		stableCore: [
			"Randomized trials support an average reduction in tinnitus-related distress after CBT.",
			"Guided online CBT can also help some people, although missing follow-up data and access to support affect interpretation.",
			"Comparing combined active treatments does not prove that each component works equally well or that combining them creates extra synergy."
		],
		openQuestions: [
			"How long do benefits last after a course ends?",
			"Who benefits most from guided online, individual or group delivery?"
		],
		whatWouldChangeMinds: [
			"Larger trials with active comparisons, complete follow-up and consistent daily-function outcomes.",
			"Reproducible long-term benefits and better measurement of unwanted effects."
		],
		misconceptions: [
			"Tinnitus-related distress and perceived sound loudness are different outcomes.",
			"Evidence for therapist-guided treatment does not automatically apply to every self-help app."
		],
		editorSummary: "Follow-up and the amount of professional guidance matter when interpreting treatment results.",
		population: "Adults with persistent, bothersome subjective tinnitus in clinical and guided online treatment studies.",
		scope: "Assess CBT for tinnitus-related distress and functioning, keeping loudness, elimination of tinnitus and combined interventions separate.",
		excludedEvidence: [
			"Keep tinnitus handicap and distress distinct from perceived sound loudness or disappearance.",
			"Do not attribute a combined-treatment result to a single component or count the same trial twice."
		],
		uncertainty: "Treatment formats, comparators and missing questionnaires vary; long-term and harms evidence is thinner.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.tinnitus1,
			sources.tinnitus4,
			sources.tinnitus3
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "do-repositioning-maneuvers-help-positional-vertigo",
		title: "Do repositioning maneuvers help positional vertigo?",
		bottomLine: "Yes, for correctly diagnosed benign paroxysmal positional vertigo, or BPPV. Appropriate repositioning movements often relieve the short bursts of spinning. The best-studied form affects the posterior canal of the inner ear. Other causes of dizziness need different assessment, and BPPV can return after successful treatment.",
		stableCore: [
			"Sham-controlled trials support short-term improvement with established posterior-canal repositioning approaches.",
			"Different canals and less common BPPV variants can need different approaches. A clinician's diagnosis helps determine which findings apply.",
			"Short-term symptom relief is better established than preventing future recurrences."
		],
		openQuestions: [
			"Which approaches best reduce recurrence and help less common variants?",
			"How do mobility limitations, fall risk and care setting affect results?"
		],
		whatWouldChangeMinds: [
			"Better direct comparisons with sustained symptom and recurrence follow-up.",
			"Reliable subtype-specific trials that also measure harms and everyday function."
		],
		misconceptions: [
			"Dizziness during a head movement does not by itself establish BPPV.",
			"A network-analysis ranking is not a personal chance of cure."
		],
		editorSummary: "The affected inner-ear canal and the type of BPPV determine which treatment evidence applies.",
		population: "Mostly adults with confirmed posterior-canal BPPV in primary and specialist care; uncommon variants are considered separately.",
		scope: "Assess repositioning for diagnosed BPPV, distinguishing affected canals, short-term relief, recurrence and mobility-related suitability.",
		excludedEvidence: [
			"Keep other vestibular, neurological and cardiovascular causes of dizziness outside the BPPV treatment verdict.",
			"Do not generalize a rare cupulolithiasis trial or a treatment ranking to all patients or unsupervised movements."
		],
		uncertainty: "Reviews overlap, long-term recurrence data are limited, and rare variants have small or short trials.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.vertigo2,
			sources.vertigo1,
			sources.vertigo5,
			sources.vertigo4
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "is-screen-time-linked-to-childhood-nearsightedness",
		title: "Is more screen time linked to childhood nearsightedness?",
		bottomLine: "Often, yes, but the evidence does not show how much screens themselves cause nearsightedness. Many studies find an association, while others do not. Close work, schooling, time indoors and family history also matter. The research has not established a safe daily screen-time cutoff for preventing myopia.",
		stableCore: [
			"Newer pooled reviews find associations between longer screen use and myopia, with substantial variation between studies.",
			"Most evidence is observational and often relies on reported screen use. It cannot cleanly separate screens from the activities and environments that go with them."
		],
		openQuestions: [
			"How much of the association remains after objective measures of outdoor time and close work?",
			"Do device type, viewing habits or age change any causal effect?"
		],
		whatWouldChangeMinds: [
			"Longitudinal studies with objective exposure and standardized eye measurements.",
			"Well-designed interventions separating screen reduction from changes in outdoor activity."
		],
		misconceptions: [
			"Higher odds in a pooled study are not a child's absolute chance of becoming myopic.",
			"A modeled curve does not validate a safe threshold for an individual child."
		],
		editorSummary: "Reported exposure and related near-work habits make a screen-specific causal estimate difficult.",
		population: "Children and adolescents in largely observational studies across different devices, school settings and regions.",
		scope: "Assess screen exposure and measured myopia, distinguishing association, incidence, prevalence, progression and related lifestyle factors.",
		excludedEvidence: [
			"Keep dry-eye symptoms and short-term eye strain separate from persistent refractive change.",
			"Do not interpret pooled observational odds or curve shapes as causal personal risk or validated limits."
		],
		uncertainty: "Confounding, self-report, mixed outcomes and heterogeneous devices limit certainty about cause and size.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.screentime1,
			sources.screentime2,
			sources.screentime3,
			sources.screentime4
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "can-myopia-control-glasses-slow-childhood-nearsightedness",
		title: "Can myopia-control glasses slow childhood nearsightedness?",
		bottomLine: "Yes. Some specially designed spectacle lenses slow nearsightedness and eye growth in children compared with ordinary single-vision lenses. Results depend on the lens design and the children studied. The lenses do not reverse existing myopia, and their effects on eye disease decades later remain uncertain.",
		stableCore: [
			"Randomized trials support benefits for several defocus and lenslet designs over one or two years.",
			"A US trial adds evidence beyond the mainly Asian studies. A result for one design does not establish equal benefit for every myopia-control product."
		],
		openQuestions: [
			"How long do benefits persist and what happens after treatment ends?",
			"Which designs work best across ages, prescriptions and populations?"
		],
		whatWouldChangeMinds: [
			"Longer independent comparisons measuring sustained progression, safety and later visual health.",
			"Reproducible benefits for clearly specified designs across diverse children."
		],
		misconceptions: [
			"Ordinary glasses correct blurry vision; specialized control designs also aim to slow progression.",
			"A relative reduction in eye growth is not the same as eliminating future myopia-related disease."
		],
		editorSummary: "Trials support particular optical designs, with less evidence about sustained effects and later eye disease.",
		population: "Mostly schoolchildren with existing myopia, including Chinese trials and a recent US trial.",
		scope: "Compare specified myopia-control spectacle designs with single-vision lenses for refractive progression and eye growth.",
		excludedEvidence: [
			"Keep specialized spectacles distinct from ordinary correction, contact lenses and drug treatment.",
			"Do not infer a universal product effect or reduced adult blindness from short-term eye-growth differences."
		],
		uncertainty: "Lens generations, age, geography, adherence and industry involvement vary; long-term outcomes are limited.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.myopiaglasses5,
			sources.myopiaglasses1,
			sources.myopiaglasses2,
			sources.myopiaglasses3
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "does-patching-improve-childhood-amblyopia",
		title: "Does patching improve vision in children with amblyopia?",
		bottomLine: "Yes. Patching the better-seeing eye can improve vision in the weaker eye in children with amblyopia. Glasses may provide part of the improvement first. Age, the cause of amblyopia and previous treatment matter, and patching needs an eye clinician's supervision and follow-up.",
		stableCore: [
			"A randomized trial found added improvement after patching and near activities in younger children whose glasses correction had stabilized.",
			"Some older children also improve, but treatment bundles and previous experience affect the results. Complete recovery is not guaranteed."
		],
		openQuestions: [
			"Which children benefit most after glasses alone stop improving vision?",
			"How do newer digital approaches compare over longer follow-up?"
		],
		whatWouldChangeMinds: [
			"Well-controlled comparisons that separate patching from accompanying treatments and measure lasting vision.",
			"Reliable age- and cause-specific results with adherence and harms recorded."
		],
		misconceptions: [
			"Amblyopia treatment is different from simply straightening a visibly turned eye.",
			"No detectable difference between treatments does not prove that every alternative is equivalent."
		],
		editorSummary: "Glasses, age and previous treatment help determine the likely added benefit.",
		population: "Children with strabismic, anisometropic or mixed amblyopia, with different ages and treatment histories.",
		scope: "Assess supervised patching for amblyopic-eye visual improvement after appropriate optical correction, distinguishing age and combined regimens.",
		excludedEvidence: [
			"Keep patching alone separate from bundles including near activities or atropine.",
			"Do not generalize early-childhood trials to adults or use experimental dose comparisons as personal schedules."
		],
		uncertainty: "Adherence, previous treatment and accompanying therapies complicate estimates of the patching-only effect.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.amblyopia1,
			sources.amblyopia2,
			sources.amblyopia3
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "does-cataract-surgery-improve-everyday-vision",
		title: "Does cataract surgery improve everyday vision?",
		bottomLine: "Yes. Removing a vision-limiting cataract usually improves sight and everyday visual tasks. The gain depends on how much of the problem comes from the cloudy lens and whether other eye disease is present. Surgery has risks, and some people still need glasses afterward.",
		stableCore: [
			"Studies consistently report average improvements in vision-related daily life, although the size varies greatly.",
			"Second-eye surgery can add benefits such as easier reading and better depth perception even when standard distance tests change only slightly."
		],
		openQuestions: [
			"Which symptoms and eye conditions best predict an individual's useful improvement?",
			"How can timing and lens selection balance visual needs and surgical risks?"
		],
		whatWouldChangeMinds: [
			"Better comparative studies linking baseline symptoms and eye disease to meaningful long-term outcomes.",
			"Consistent patient-reported outcomes alongside vision tests and complete harms follow-up."
		],
		misconceptions: [
			"Removing a cataract does not reverse damage from glaucoma or retinal disease.",
			"Good distance acuity alone does not capture every difficulty with reading or depth perception."
		],
		editorSummary: "Other eye disease, everyday visual needs and the second eye influence the expected gain.",
		population: "Adults with cataracts affecting vision, including patients considering first- or second-eye surgery.",
		scope: "Assess cataract extraction for visual function and daily life, distinguishing before-and-after evidence, waiting comparisons and second-eye benefits.",
		excludedEvidence: [
			"Keep cataract-related impairment separate from retinal, optic-nerve and other causes of sight loss.",
			"Do not turn pooled questionnaire changes or older waiting comparisons into a guaranteed result or universal deadline."
		],
		uncertainty: "Patient selection, other eye disease, surgical choices and extremely heterogeneous outcome measures affect expected benefit.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.cataract1,
			sources.cataract2,
			sources.cataract3,
			sources.cataractGuidance
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "how-satisfied-are-people-after-lasik",
		title: "How satisfied are people after LASIK?",
		bottomLine: "Most studied patients report being satisfied after LASIK. High satisfaction can still coexist with new dry-eye symptoms, halos, glare or difficulty in particular situations. Some people have lasting problems, and short follow-up studies cannot fully describe those risks or predict an individual's result.",
		stableCore: [
			"Reviews and prospective studies generally report high average satisfaction with vision after surgery.",
			"PROWL measured symptoms before and after surgery and found new symptoms in some people who had none beforehand. Satisfaction and symptom-free vision are different outcomes."
		],
		openQuestions: [
			"Which preoperative features best predict troublesome long-term symptoms?",
			"How do modern devices compare over years using the same patient-reported measures?"
		],
		whatWouldChangeMinds: [
			"Longer prospective follow-up with complete symptom, daily-function and adverse-event reporting.",
			"Independent device comparisons that measure baseline symptoms as well as satisfaction."
		],
		misconceptions: [
			"The percentage developing a new symptom among symptom-free patients is not the rate among everyone treated.",
			"A high satisfaction score does not mean every visual symptom is absent."
		],
		editorSummary: "Overall satisfaction and new symptoms need to be considered separately when judging results.",
		population: "Selected adult LASIK patients, including military/civilian PROWL cohorts and small modern device-specific studies.",
		scope: "Assess reported satisfaction and symptom changes after LASIK, keeping baseline symptoms, follow-up length and specific devices distinct.",
		excludedEvidence: [
			"Keep satisfaction separate from absence of dry eye, halos or other visual symptoms.",
			"Do not generalize short uncontrolled results or symptom-free subgroup percentages to lifetime risk for all patients."
		],
		uncertainty: "Selection, changing technology, incomplete long-term follow-up and different questionnaires limit individual prediction.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.lasik1,
			sources.lasik2,
			sources.lasik3,
			sources.lasikGuidance
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "does-sleeping-in-contact-lenses-increase-infection-risk",
		title: "Does sleeping in contact lenses increase infection risk?",
		bottomLine: "Yes. Sleeping in contact lenses raises the risk of a corneal infection, including when overnight wear is only occasional. Infection is uncommon, but it can seriously damage sight. Lenses prescribed for overnight wear still carry infection risk, so that authorization should not be read as a guarantee of safety.",
		stableCore: [
			"Case-control studies repeatedly identify overnight wear as a risk factor alongside lens-care and water-exposure habits.",
			"Serious infection can affect daily-disposable users too. Selected case reports show possible harms but cannot tell us how often they occur."
		],
		openQuestions: [
			"How do absolute risks vary across current lens designs and patterns of wear?",
			"Which practical safety changes most reliably reduce infections?"
		],
		whatWouldChangeMinds: [
			"Large prospective studies with verified wear patterns and lens-specific infection rates.",
			"Consistent reductions in infection from well-evaluated safety interventions."
		],
		misconceptions: [
			"Daily-disposable lenses do not make sleeping in lenses risk-free.",
			"A relative-risk multiplier does not mean the same percentage of all wearers will get an infection."
		],
		editorSummary: "Even occasional overnight use is associated with infection; individual absolute risk varies.",
		population: "Contact-lens wearers in UK and Singapore case-control studies and selected US infection reports.",
		scope: "Assess overnight contact-lens wear and corneal infection, distinguishing lens types, infection types, reported habits and absolute versus relative risks.",
		excludedEvidence: [
			"Keep Acanthamoeba-specific estimates separate from all microbial keratitis.",
			"Do not estimate incidence or a causal risk multiplier from the CDC's six selected cases."
		],
		uncertainty: "Habit reporting, differences in lens care and regional infection patterns limit precise risk estimates.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.contactsleep1,
			sources.contactsleep2,
			sources.contactsleep3
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "do-multifocal-cataract-lenses-reduce-glasses-use",
		title: "Do multifocal cataract lenses reduce the need for glasses?",
		bottomLine: "Yes, on average. Compared with standard monofocal implants, multifocal lenses can make near tasks easier without glasses. They also involve trade-offs, including halos or glare for some people. The balance depends on the lens design, other eye conditions and the person's visual needs.",
		stableCore: [
			"Randomized trials generally find less spectacle dependence and better unaided near vision with multifocal designs.",
			"Distance vision is often similar. Estimates of glare, halos and visual quality differ between lens generations and analyses."
		],
		openQuestions: [
			"Which current designs best fit different tasks and eye conditions?",
			"How do long-term visual quality and lens-exchange risks compare?"
		],
		whatWouldChangeMinds: [
			"Independent modern lens trials using consistent measures of glasses use, night vision and patient priorities.",
			"Complete long-term reporting of unwanted visual effects and additional procedures."
		],
		misconceptions: [
			"Less need for glasses does not guarantee the best vision for every activity.",
			"A study finding no detectable difference in halos does not prove equal risk or absence of halos."
		],
		editorSummary: "Near-vision gains and unwanted optical effects can matter differently to different people.",
		population: "Mostly adults receiving lens implants after cataract removal, with varying lens generations and implantation strategies.",
		scope: "Compare multifocal with monofocal cataract implants for glasses dependence, near vision and optical trade-offs.",
		excludedEvidence: [
			"Keep near acuity, spectacle independence and overall visual quality as separate outcomes.",
			"Do not treat partial-range-of-focus, monovision or clear-lens replacement studies as interchangeable multifocal-versus-monofocal evidence."
		],
		uncertainty: "Older and newer designs, overlapping trial pools and inconsistent harms measurement limit a universal best-lens claim.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.multifocal1,
			sources.multifocal2,
			sources.multifocal3
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "do-self-fitting-hearing-aids-match-professional-fitting",
		title: "Do self-fitting hearing aids work as well as professional fitting?",
		bottomLine: "Some studied devices give similar short-term benefits in selected adults, but the evidence is too uncertain to establish general equivalence. Support and fitting methods differ. The US over-the-counter category is for adults with perceived mild to moderate hearing loss; it does not cover every hearing problem or age group.",
		stableCore: [
			"Small randomized studies report broadly similar average benefit with some self-fitting and professional-fitting approaches.",
			"A 2026 review rates the pooled evidence very uncertain. Professional fitting can produce different acoustic results even when symptom scores look similar."
		],
		openQuestions: [
			"Which users and devices benefit most from professional fitting or follow-up?",
			"How do long-term use, harms and communication compare in ordinary settings?"
		],
		whatWouldChangeMinds: [
			"Larger, longer trials designed to test meaningful equivalence or noninferiority for specific pathways.",
			"Consistent results across diverse users, support needs and devices with complete safety reporting."
		],
		misconceptions: [
			"A nonsignificant difference is not proof that all fitting approaches are equivalent.",
			"US OTC rules concern access and eligibility, not a claim that severe or sudden hearing loss needs no assessment."
		],
		editorSummary: "The studied device, support pathway and severity of hearing loss determine how far results can be generalized.",
		population: "Selected adults with uncomplicated mild-to-moderate hearing loss, mainly in small short-term fitting studies.",
		scope: "Compare defined self-fitting and professional-fitting approaches, retaining remote support, device identity and the US adult OTC category's limits.",
		excludedEvidence: [
			"Keep self-fitting with available remote support distinct from every unsupervised retail device.",
			"Do not extend adult mild-to-moderate findings to children, severe loss or sudden/asymmetric changes and other clinical warning signs."
		],
		uncertainty: "Very low-certainty pooling, short follow-up, sparse safety data and selected clinic populations limit equivalence claims.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.otchearing1,
			sources.otchearing2,
			sources.otchearing3,
			sources.otcGuidance
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "do-cochlear-implants-improve-adult-speech-understanding",
		title: "Do cochlear implants improve speech understanding in adults?",
		bottomLine: "Yes, for many appropriately selected adults with severe hearing loss who get limited help from hearing aids. Speech understanding often improves after implantation, but results vary and typical hearing is not restored. Surgery and learning to interpret the new sounds are important parts of the decision.",
		stableCore: [
			"Reviews and prospective adult studies generally find better speech understanding and hearing-related quality of life after implantation.",
			"Much evidence compares the same people before and after surgery rather than randomly assigning implantation. Expected benefit depends on hearing history and other individual factors."
		],
		openQuestions: [
			"Which factors best predict useful speech understanding for a particular adult?",
			"How do long-term outcomes and rehabilitation needs vary across different hearing histories?"
		],
		whatWouldChangeMinds: [
			"Higher-quality long-term comparisons with consistent speech and daily-life outcomes.",
			"Reliable prediction and complete reporting of surgical, device and rehabilitation burdens."
		],
		misconceptions: [
			"A cochlear implant provides a different sound signal rather than recreating typical hearing.",
			"Improved speech scores in selected candidates do not establish the same benefit for every person with hearing loss."
		],
		editorSummary: "Hearing history, candidacy and rehabilitation influence the expected benefit and burden.",
		population: "Adults with severe or profound sensorineural hearing loss, especially those with limited benefit from well-fitted hearing aids.",
		scope: "Assess adult cochlear implantation for speech understanding and daily function, distinguishing selected pre/post cohorts, device configurations and individual candidacy.",
		excludedEvidence: [
			"Keep adult speech outcomes separate from childhood language, cognitive decline and experimental hearing-restoration therapies.",
			"Do not count umbrella reviews and their component reviews as independent studies or label nonrandomized comparisons randomized."
		],
		uncertainty: "Selection, heterogeneous hearing histories, industry involvement and variable follow-up limit precise individual predictions.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.cochlear1,
			sources.cochlear2,
			sources.cochlear3,
			sources.cochlearGuidance
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "do-ear-drops-clear-impacted-earwax",
		title: "Do ear drops help clear impacted earwax?",
		bottomLine: "They may help, but the evidence is limited. Drops can soften blocked wax and sometimes help it clear, while studies have not established one best preparation. Commercial products are not clearly better than water or saline in the available trials. The ear's condition affects which options are suitable.",
		stableCore: [
			"The main trial review found only a small, low-certainty comparison of drops with no treatment.",
			"Wax is normally protective and does not always need removal. Symptoms, an obstructed examination, eardrum problems and previous ear surgery can change management."
		],
		openQuestions: [
			"Which preparations produce meaningful clearance and symptom relief most reliably?",
			"How do safety and effectiveness differ in children and people with modifying ear conditions?"
		],
		whatWouldChangeMinds: [
			"Larger trials measuring complete clearance, symptom relief, further treatment and harms.",
			"Reliable comparisons of commonly used products in clearly defined ear conditions."
		],
		misconceptions: [
			"A product being sold for wax removal does not establish superiority over simpler comparisons.",
			"Hearing difficulty or ear pain does not by itself show that wax is the cause."
		],
		editorSummary: "The limited clearance evidence is separate from deciding whether a particular ear needs treatment.",
		population: "Adults and children with obstructing or symptomatic earwax, with special ear conditions considered separately.",
		scope: "Assess wax-softening drops for impacted wax, distinguishing clearance, symptom relief, preparation comparisons and conditions that modify treatment suitability.",
		excludedEvidence: [
			"Keep normal asymptomatic wax separate from symptomatic or examination-blocking impaction.",
			"Do not generalize routine-ear studies to nonintact eardrums or previous ear surgery, or infer safe home instrumentation."
		],
		uncertainty: "Mostly small older studies, heterogeneous treatments and incomplete harms reporting leave low certainty.",
		band: "mixed",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.earwax1,
			sources.earwax2,
			sources.earwax3
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "how-much-do-antibiotics-help-childrens-middle-ear-infections",
		title: "How much do antibiotics help acute middle-ear infections in children?",
		bottomLine: "The average benefit is modest. In high-income-country trials, treating about 20 children prevented pain in one extra child after two to three days. About one extra child had an adverse effect for every 14 treated. Some groups benefit more, so age, symptoms and examination findings matter.",
		stableCore: [
			"Antibiotics provide little early pain benefit for many children, while vomiting, diarrhea and rash become more common.",
			"Benefits can be greater with ear discharge or bilateral infection in children under two. Age alone does not identify the same subgroup.",
			"Serious complications are rare. Studies of those events often need observational data and have different uncertainties from pain trials."
		],
		openQuestions: [
			"Which children have a high enough complication risk to gain more from immediate treatment?",
			"How do local risks and reliable follow-up affect treatment decisions?"
		],
		whatWouldChangeMinds: [
			"Better validated subgroup evidence linking diagnosis, symptoms and rare complications.",
			"Large comparative studies with consistent adverse-event reporting and appropriate follow-up."
		],
		misconceptions: [
			"A modest average benefit does not mean no child benefits from antibiotics.",
			"The number needed to prevent pain and the number with an extra adverse effect describe different outcomes and time frames."
		],
		editorSummary: "Clinical diagnosis, severity and particular subgroups matter more than a single average treatment effect.",
		population: "Children with clinician-diagnosed acute otitis media, with randomized evidence mainly from high-income countries.",
		scope: "Assess antibiotics for acute middle-ear infection, separating pain timing, age/bilateral and discharge subgroups, common harms and rare complications.",
		excludedEvidence: [
			"Keep acute middle-ear infection separate from ear-canal infection and persistent fluid without acute infection.",
			"Do not apply differing NNTs interchangeably or turn population findings into personal antibiotic selection or dosing."
		],
		uncertainty: "Diagnostic differences, setting, comparator, subgroup precision and rare-event observational data limit individualized estimates.",
		band: "broad",
		certainty: "moderate",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.otitis1,
			sources.otitis2,
			sources.otitis3,
			sources.otitis4
		]
	}, novemberVisionHearingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "vision-and-hearing",
		slug: "does-sound-therapy-help-tinnitus",
		title: "Does sound therapy help tinnitus?",
		bottomLine: "The evidence remains uncertain. Some people find background sound helpful, and small studies report benefits, but reliable comparisons with placebo or advice alone are limited. Studies use different sounds, devices and support. Changes in perceived loudness and distress are separate outcomes, and lasting benefit is not well established.",
		stableCore: [
			"The main device review had little usable evidence for its key no-device or placebo comparisons.",
			"Small later studies suggest possible benefits, but their designs and analyses leave uncertainty about specific treatment effects."
		],
		openQuestions: [
			"Which approaches improve daily life beyond an appropriate comparison treatment?",
			"How long do benefits last and which people are most likely to benefit?"
		],
		whatWouldChangeMinds: [
			"Larger preregistered trials with credible sham controls and direct between-group comparisons.",
			"Consistent, sustained improvements in distress or function with complete safety reporting."
		],
		misconceptions: [
			"Improvement during treatment does not by itself establish an advantage over sham or comparison care.",
			"One period being statistically significant and another not significant does not establish a significant difference between periods."
		],
		editorSummary: "Differences in sound methods, comparison groups and measured outcomes make a single effect estimate unreliable.",
		population: "Adults with subjective tinnitus in device studies, small crossover experiments and limited controlled trials.",
		scope: "Assess sound-based tinnitus interventions, distinguishing masking, device comparisons, loudness, distress and active-versus-sham effects.",
		excludedEvidence: [
			"Keep sound alone separate from CBT or counseling bundles unless component effects are identified.",
			"Do not infer a specific advantage from within-period p values, derived small subgroups or missing control comparisons."
		],
		uncertainty: "Small samples, inadequate masking, missing comparison data and sparse long-term harms evidence limit conclusions.",
		band: "unclear",
		certainty: "low",
		searchDatabases: [
			"PubMed targeted paper search",
			"PubMed official abstract records",
			"Publisher and institutional article records"
		],
		sources: [
			sources.soundtherapy1,
			sources.soundtherapy2,
			sources.soundtherapy3
		]
	}, novemberVisionHearingResearchCheckedAt)
];
