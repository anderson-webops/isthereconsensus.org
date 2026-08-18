import type { SeedClaim } from "./claims.js";
import { august2026EncyclopediaTrancheFourSourcedClaim as reviewedClaim } from "./claim-expansion-2026-08-encyclopedia-shared.js";

export const august2026HistoricalCaseStudyClaims: SeedClaim[] = [
	reviewedClaim({
		topicSlug: "historical-case-studies",
		title: "Did Semmelweis's hand-disinfection rule sharply reduce childbed fever?",
		slug: "did-semmelweisss-hand-disinfection-rule-sharply-reduce-childbed-fever",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. In 1847, Ignaz Semmelweis required clinicians in Vienna's First Obstetrical Clinic to disinfect their hands with chlorinated lime, after which maternal mortality from puerperal fever fell dramatically. The evidence was not a modern randomized trial, but the timing, clinic comparisons, repeated decline, and later germ-based understanding strongly support transmission on clinicians' contaminated hands.",
		stableCore: [
			"Mortality had been much higher in the physician-staffed clinic than in the midwife clinic before the intervention.",
			"The sharp decline followed a specific hygiene rule aimed at material carried from autopsies and infected patients.",
			"Modern infection prevention rests on a broader microbial model, better antiseptics, surveillance, and a full set of hand-hygiene indications."
		],
		openQuestions: [
			"How should historians quantify the roles of case mix, record quality, concurrent changes, and enforcement in the exact effect size?",
			"Why did persuasive local evidence fail to produce faster and wider professional adoption?"
		],
		whatWouldChangeMinds: [
			"Clinic records showing that the mortality decline preceded or was unrelated to the disinfection intervention.",
			"A better explanation accounting for the between-clinic pattern, intervention timing, recurrence, and modern infection mechanism."
		],
		misconceptions: [
			"Semmelweis did not possess today's germ theory, culture methods, or randomized-trial framework.",
			"The case does not show that every rejected idea is a future scientific breakthrough.",
			"Modern hand hygiene is not limited to washing after autopsies or using chlorinated lime."
		],
		editorSummary:
			"Semmelweis is a strong historical intervention case: a large, repeated mortality change preceded the mechanism's full acceptance, but it still requires careful design and context appraisal.",
		uncertaintySummary:
			"The direction and historical importance are secure. Exact effect estimates and explanations for delayed adoption depend on imperfect nineteenth-century records.",
		sources: [
			{
				kind: "guideline",
				title: "WHO Guidelines on Hand Hygiene in Health Care",
				publisher: "World Health Organization",
				year: 2009,
				url: "https://www.who.int/publications/i/item/9789241597906",
				note: "Global evidence guideline placing Semmelweis's clinic intervention in the development of modern hand-hygiene practice."
			},
			{
				kind: "context",
				title: "Historical perspective on hand hygiene in health care",
				publisher: "National Center for Biotechnology Information",
				year: 2009,
				url: "https://www.ncbi.nlm.nih.gov/books/NBK144018/",
				note: "Evidence history describing the clinic comparison, chlorinated-lime intervention, and mortality change."
			},
			{
				kind: "landmark_study",
				title: "A twenty-first century perspective on concepts of modern epidemiology in Ignaz Philipp Semmelweis’ work on puerperal sepsis",
				publisher: "European Journal of Epidemiology",
				year: 2022,
				url: "https://doi.org/10.1007/s10654-022-00871-8",
				doi: "10.1007/s10654-022-00871-8",
				note: "Modern epidemiological reassessment of Semmelweis's evidence, causal reasoning, and potential biases."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "historical-case-studies",
		title: "Did one famous map by itself establish that contaminated water spread cholera?",
		slug: "did-one-famous-map-by-itself-establish-that-contaminated-water-spread-cholera",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"No. John Snow's 1854 Broad Street map was an important visualization, but his waterborne-cholera argument also used interviews, case locations, exposure exceptions, pump use, prior outbreak patterns, and a natural comparison between London water suppliers. The case is powerful because multiple observations converged, not because dots clustered on one map.",
		stableCore: [
			"Snow developed and defended a waterborne theory before the famous Soho map was produced.",
			"The South London comparison linked cholera mortality to households served by different water sources.",
			"Removing the Broad Street pump handle became iconic, but the local outbreak was already declining and cannot carry the full causal argument alone."
		],
		openQuestions: [
			"How much did pump closure affect the tail of the outbreak relative to its natural epidemic trajectory?",
			"Which later retellings overstate the map, the handle, or Snow's immediate influence on public health?"
		],
		whatWouldChangeMinds: [
			"Historical records showing Snow relied only on map proximity and had no exposure or water-supplier evidence.",
			"A competing account that better explains household, institutional, and supplier-linked patterns without contaminated water."
		],
		misconceptions: [
			"The case was not a single-data-point eureka moment.",
			"Snow did not identify Vibrio cholerae with the methods used in the investigation.",
			"A compelling map can organize evidence without proving causation by itself."
		],
		editorSummary:
			"Snow's achievement was an evidence network—hypothesis, exposure tracing, comparison, exceptions, and visualization—not one picture or one pump handle.",
		uncertaintySummary:
			"The waterborne conclusion is settled. Historical debate concerns the relative weight of each analysis and how later narratives simplified the episode.",
		sources: [
			{
				kind: "consensus_statement",
				title: "John Snow and the Broad Street Pump: On the Trail of an Epidemic",
				publisher: "Centers for Disease Control and Prevention",
				year: 2004,
				url: "https://www.cdc.gov/mmwr/preview/mmwrhtml/mm5334a1.htm",
				note: "Public-health reconstruction of Snow's local investigation, pump evidence, and historical limits."
			},
			{
				kind: "guideline",
				title: "Principles of Epidemiology: The Beginnings of Epidemiology",
				publisher: "Centers for Disease Control and Prevention",
				year: 2012,
				url: "https://archive.cdc.gov/www_cdc_gov/csels/dsepd/ss1978/lesson1/section2.html",
				note: "Training account emphasizing Snow's population comparisons and natural experiment beyond the map."
			},
			{
				kind: "landmark_study",
				title: "On the Mode of Communication of Cholera",
				publisher: "John Churchill, London",
				year: 1855,
				url: "https://archive.org/details/b28985266",
				note: "Snow's second-edition primary account presenting the full chain of waterborne-cholera evidence."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "historical-case-studies",
		title: "Did prenatal thalidomide exposure cause severe birth defects?",
		slug: "did-prenatal-thalidomide-exposure-cause-severe-birth-defects",
		consensusBand: "strong",
		confidenceScore: 100,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Thalidomide taken during a narrow early-pregnancy window caused a characteristic pattern of limb, ear, eye, cardiac, and internal-organ malformations, as well as fetal loss. The tragedy transformed drug-safety regulation; thalidomide now has restricted medical uses under stringent pregnancy-prevention controls.",
		stableCore: [
			"The timing and distinctive malformation pattern appeared across countries after thalidomide entered use for nausea and sedation.",
			"Withdrawal was followed by disappearance of the epidemic pattern, and developmental biology later clarified mechanisms.",
			"Modern therapeutic value for selected conditions does not reduce the established teratogenic danger."
		],
		openQuestions: [
			"Which molecular pathways explain the full organ- and timing-specific spectrum of thalidomide embryopathy?",
			"How can access for legitimate indications be balanced with effective pregnancy prevention in every health system?"
		],
		whatWouldChangeMinds: [
			"Credible evidence that the exposure timing, international case pattern, withdrawal response, and experimental mechanisms arose without thalidomide.",
			"Reproducible developmental studies showing no teratogenic effect during the known sensitive window."
		],
		misconceptions: [
			"The United States largely avoided widespread marketing because FDA reviewer Frances Kelsey withheld approval, but trial exposure still occurred.",
			"A drug's current approved use does not imply safety during pregnancy.",
			"The case supports stronger testing and surveillance, not the claim that all medicines are equally dangerous."
		],
		editorSummary:
			"Thalidomide is a definitive causal and regulatory case: distinctive timing, pattern, cross-national evidence, withdrawal, and mechanism all converge.",
		uncertaintySummary:
			"Causation is not in doubt. Mechanistic detail, complete global case counts, and optimal modern risk controls retain uncertainty.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Frances Oldham Kelsey: Medical reviewer famous for averting a public health tragedy",
				publisher: "U.S. Food and Drug Administration",
				year: 2018,
				url: "https://www.fda.gov/about-fda/fda-history-exhibits/frances-oldham-kelsey-medical-reviewer-famous-averting-public-health-tragedy",
				note: "Official regulatory history of the U.S. review, evidence concerns, and thalidomide tragedy."
			},
			{
				kind: "systematic_review",
				title: "Thalidomide-induced teratogenesis: History and mechanisms",
				publisher: "Birth Defects Research Part C",
				year: 2015,
				url: "https://doi.org/10.1002/bdrc.21096",
				doi: "10.1002/bdrc.21096",
				note: "Review of the human malformation pattern, sensitive period, animal models, and mechanisms."
			},
			{
				kind: "systematic_review",
				title: "Thalidomide: The tragedy of birth defects and the effective treatment of disease",
				publisher: "Toxicological Sciences",
				year: 2011,
				url: "https://doi.org/10.1093/toxsci/kfr088",
				doi: "10.1093/toxsci/kfr088",
				note: "Historical and mechanistic review balancing established embryotoxicity with later controlled indications."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "historical-case-studies",
		title: "Did mandatory folic-acid fortification reduce neural-tube defects?",
		slug: "did-mandatory-folic-acid-fortification-reduce-neural-tube-defects",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Countries that required folic acid in enriched cereal grains saw substantial declines in neural-tube defects such as spina bifida and anencephaly. Fortification reaches pregnancies before many people know they are pregnant, but it does not prevent every case and does not replace recommended periconceptional supplementation for people who may become pregnant.",
		stableCore: [
			"Neural-tube closure occurs very early, making population exposure before pregnancy recognition important.",
			"Interrupted time-series, surveillance, and international syntheses consistently find post-fortification declines.",
			"Effect size depends on baseline folate status, fortification dose, food coverage, supplement use, surveillance, and case definition."
		],
		openQuestions: [
			"Which fortification levels and food vehicles optimize prevention while monitoring possible harms?",
			"How can programs reach populations outside centrally processed grain systems?"
		],
		whatWouldChangeMinds: [
			"Comparable surveillance showing no decline after well-implemented fortification across previously deficient populations.",
			"A competing secular trend that explains the timing and dose-response pattern better than increased folic-acid intake."
		],
		misconceptions: [
			"Fortification and individual preconception supplementation are complementary rather than interchangeable.",
			"A population decline does not mean every neural-tube defect is folate-preventable.",
			"The policy evidence is not based only on changes in diagnosis or pregnancy termination."
		],
		editorSummary:
			"Fortification is a population-level prevention success built around an early developmental window, with remaining work on coverage, dose, and inequity.",
		uncertaintySummary:
			"The direction and substantial benefit are high-certainty. Exact preventable fraction and optimal implementation vary by setting.",
		sources: [
			{
				kind: "guideline",
				title: "Folic Acid: Sources and Recommended Intake",
				publisher: "Centers for Disease Control and Prevention",
				year: 2025,
				url: "https://www.cdc.gov/folic-acid/about/intake-and-sources.html",
				note: "Current public-health guidance connecting early pregnancy timing, supplementation, fortification, and prevention."
			},
			{
				kind: "meta_analysis",
				title: "The effectiveness of mandatory folic acid fortification compared with pre-fortification periods on reducing neural tube defects (NTDs): a systematic review and meta-analysis",
				publisher: "BMC Nutrition",
				year: 2026,
				url: "https://doi.org/10.1186/s40795-026-01244-0",
				doi: "10.1186/s40795-026-01244-0",
				note: "International synthesis estimating changes in neural-tube-defect prevalence after mandatory fortification."
			},
			{
				kind: "systematic_review",
				title: "Global heterogeneity in folic acid fortification policies and implications for prevention of neural tube defects and stroke: a systematic review",
				publisher: "eClinicalMedicine",
				year: 2023,
				url: "https://doi.org/10.1016/j.eclinm.2023.102366",
				doi: "10.1016/j.eclinm.2023.102366",
				note: "Recent global synthesis examining effectiveness and variation across fortification programs."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "historical-case-studies",
		title: "Did niacin enrichment help eliminate endemic pellagra in the United States?",
		slug: "did-niacin-enrichment-help-eliminate-endemic-pellagra-in-the-united-states",
		consensusBand: "strong",
		confidenceScore: 97,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Pellagra—caused mainly by severe niacin or tryptophan deficiency—declined after the dietary cause was established and enriched flour and bread supplied niacin widely beginning in the 1940s. Economic improvement, dietary diversification, public-health work, and treatment also contributed, so fortification was central but not the only change.",
		stableCore: [
			"Pellagra was epidemic in poor, maize-dependent populations in the U.S. South and was wrongly attributed to infection before dietary evidence prevailed.",
			"Niacin can prevent and treat deficiency, and enrichment expanded access through staple foods.",
			"Pellagra still occurs where severe malnutrition, malabsorption, alcoholism, medication effects, or restricted diets create deficiency."
		],
		openQuestions: [
			"What share of the historical decline should be attributed to enrichment versus income, diet, and targeted treatment?",
			"Where do modern surveillance and clinical recognition miss vulnerable populations?"
		],
		whatWouldChangeMinds: [
			"Historical analyses showing no timing or exposure relationship between dietary niacin, enrichment, and pellagra decline.",
			"Clinical evidence that correcting niacin deficiency does not prevent or reverse deficiency-caused pellagra."
		],
		misconceptions: [
			"The case was not resolved by one heroic experiment; dietary, institutional, economic, and policy evidence accumulated.",
			"Fortification did not make every cause of dermatitis, diarrhea, or dementia disappear.",
			"Rare modern cases do not negate elimination of endemic population-level disease."
		],
		editorSummary:
			"Pellagra shows how causal nutrition research and staple-food policy can remove an epidemic while leaving room for social and economic co-causes.",
		uncertaintySummary:
			"Niacin deficiency and the success of prevention are settled; precise attribution among simultaneous historical changes is less certain.",
		sources: [
			{
				kind: "landmark_study",
				title: "Effectiveness of food fortification in the United States: the case of pellagra",
				publisher: "American Journal of Public Health",
				year: 2000,
				url: "https://doi.org/10.2105/AJPH.90.5.727",
				doi: "10.2105/AJPH.90.5.727",
				note: "Historical population analysis linking enrichment policy with the disappearance of endemic pellagra."
			},
			{
				kind: "guideline",
				title: "Niacin: Fact Sheet for Health Professionals",
				publisher: "National Institutes of Health Office of Dietary Supplements",
				year: 2025,
				url: "https://ods.od.nih.gov/factsheets/Niacin-HealthProfessional/",
				note: "Current institutional account of niacin biology, deficiency, pellagra, food sources, enrichment, and treatment context."
			},
			{
				kind: "systematic_review",
				title: "Pellagra in Contemporary Clinical Practice (2000-2023): A Systematic Review",
				publisher: "International Journal of Dermatology",
				year: 2026,
				url: "https://doi.org/10.1111/ijd.70398",
				doi: "10.1111/ijd.70398",
				note: "Modern review clarifying that elimination of endemic disease did not remove individual deficiency risk."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "historical-case-studies",
		title: "Did sulfur-emission controls reduce acid rain and begin ecosystem recovery?",
		slug: "did-sulfur-emission-controls-reduce-acid-rain-and-begin-ecosystem-recovery",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Cap-and-trade and conventional controls sharply reduced sulfur dioxide emissions and sulfate deposition in the United States and Europe, with widespread improvements in rain, streams, and lakes. Biological and soil recovery is slower and uneven because ecosystems retain acidification legacies and also face nitrogen deposition, land use, and climate change.",
		stableCore: [
			"Emission monitoring and atmospheric chemistry show large reductions following sulfur-control programs.",
			"Surface waters across many monitored regions became less acidic as sulfate deposition declined.",
			"Chemical response can precede biological recovery, and depleted base cations or accumulated sulfur can delay restoration."
		],
		openQuestions: [
			"How long will soil, forest, fish, and invertebrate communities take to recover in the most sensitive catchments?",
			"Where are additional sulfur, nitrogen, or direct restoration measures needed?"
		],
		whatWouldChangeMinds: [
			"Long-term monitoring showing no relationship among controlled emissions, deposition decline, and water-chemistry recovery.",
			"An alternative driver that better explains coordinated regional changes after policy implementation."
		],
		misconceptions: [
			"Acid rain was not a hoax simply because successful regulation made it less visible.",
			"Lower emissions do not mean every damaged ecosystem has fully recovered.",
			"The U.S. trading program was one implementation tool, not evidence that every pollutant problem has the same policy solution."
		],
		editorSummary:
			"Acid rain is both a pollution-control success and a lesson in ecological lag: atmospheric inputs can fall quickly while soils and food webs recover over decades.",
		uncertaintySummary:
			"Emission and deposition reductions are measured with high confidence. Recovery rate and completeness remain ecosystem-specific.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Acid Rain Program Results",
				publisher: "U.S. Environmental Protection Agency",
				year: 2026,
				url: "https://www.epa.gov/acidrain/acid-rain-program-results",
				note: "Official emissions, deposition, air-quality, visibility, health, and ecosystem outcome monitoring."
			},
			{
				kind: "systematic_review",
				title: "Acid rain and its environmental effects: Recent scientific advances",
				publisher: "Atmospheric Environment",
				year: 2016,
				url: "https://doi.org/10.1016/j.atmosenv.2016.10.019",
				doi: "10.1016/j.atmosenv.2016.10.019",
				note: "Review of changing deposition, ecosystem effects, recovery, and remaining global problems."
			},
			{
				kind: "systematic_review",
				title: "Recovery from Acidification in European Surface Waters: A View to the Future",
				publisher: "Ambio",
				year: 2003,
				url: "https://doi.org/10.1579/0044-7447-32.3.170",
				doi: "10.1579/0044-7447-32.3.170",
				note: "Long-term synthesis of chemical recovery and the factors that delay biological restoration."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "historical-case-studies",
		title: "Did magnetic stripes alone establish the modern theory of plate tectonics?",
		slug: "did-magnetic-stripes-alone-establish-the-modern-theory-of-plate-tectonics",
		consensusBand: "strong",
		confidenceScore: 98,
		evidenceCertainty: "high",
		bottomLine:
			"No. Symmetric magnetic stripes on the seafloor provided a decisive quantitative test of seafloor spreading, but modern plate tectonics emerged from convergence among continental fit, fossils and rocks, earthquake and volcano belts, ocean-floor age and topography, paleomagnetism, subduction, heat flow, and global plate-motion geometry.",
		stableCore: [
			"Vine and Matthews connected alternating magnetic anomalies with geomagnetic reversals and new crust formed at ridges.",
			"Ocean-floor ages increase away from spreading centers and old lithosphere is recycled at subduction zones.",
			"A successful theory had to explain both continental observations and the global distribution of oceanic geophysics."
		],
		openQuestions: [
			"When and how did plate tectonics begin on the early Earth?",
			"How should historians apportion credit among observations, instruments, researchers, and institutions?"
		],
		whatWouldChangeMinds: [
			"Global measurements showing no relation among magnetic reversals, stripe symmetry, seafloor age, ridges, and plate motions.",
			"A competing framework that predicts earthquakes, volcanism, crustal age, paleomagnetism, and measured motions more accurately."
		],
		misconceptions: [
			"Alfred Wegener proposed continental drift but did not possess the later seafloor mechanism and evidence network.",
			"No single graph or expedition created the entire theory.",
			"Open questions about plate initiation do not undermine present-day plate motion."
		],
		editorSummary:
			"Magnetic stripes mattered because they locked into a wider, risky, quantitative evidence network. Plate tectonics is a convergence story, not a lone clue.",
		uncertaintySummary:
			"Modern plate motion is settled. Early-Earth onset, mantle coupling details, and the sociology of acceptance remain active research areas.",
		sources: [
			{
				kind: "consensus_statement",
				title: "Developing the theory of plate tectonics",
				publisher: "U.S. Geological Survey",
				year: 1999,
				url: "https://pubs.usgs.gov/gip/dynamic/developing.html",
				note: "Institutional synthesis of continental drift, seafloor spreading, global seismicity, and theory development."
			},
			{
				kind: "consensus_statement",
				title: "Magnetic stripes and isotopic clocks",
				publisher: "U.S. Geological Survey",
				year: 1999,
				url: "https://pubs.usgs.gov/gip/dynamic/stripes.html",
				note: "Official explanation of magnetic reversal stripes and independent ocean-floor age evidence."
			},
			{
				kind: "landmark_study",
				title: "Magnetic Anomalies Over Oceanic Ridges",
				publisher: "Nature",
				year: 1963,
				url: "https://doi.org/10.1038/199947a0",
				doi: "10.1038/199947a0",
				note: "Landmark quantitative hypothesis linking seafloor spreading to observed magnetic reversal patterns."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "historical-case-studies",
		title: "Did combination antiretroviral therapy transform survival with HIV?",
		slug: "did-combination-antiretroviral-therapy-transform-survival-with-hiv",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Effective combination antiretroviral therapy turned HIV from a rapidly fatal infection for many people into a manageable chronic condition for those diagnosed, treated early, and able to sustain viral suppression. Survival and life expectancy improved dramatically, although they remain unequal and are not identical to those of people without HIV in every population.",
		stableCore: [
			"A sharp fall in AIDS illness and mortality followed the introduction and uptake of potent combination therapy in the mid-1990s.",
			"Successive treatment eras brought better viral suppression, tolerability, resistance profiles, and life expectancy.",
			"Late diagnosis, interrupted access, comorbidities, stigma, and structural inequity still cause preventable illness and death."
		],
		openQuestions: [
			"How can systems close survival gaps by sex, race, region, income, substance use, and timing of diagnosis?",
			"Which cure or remission strategies can safely eliminate lifelong treatment for substantial populations?"
		],
		whatWouldChangeMinds: [
			"Cohort and trial evidence showing no survival change with suppressive combination therapy after treatment-era confounding is addressed.",
			"Mechanistic evidence that sustained viral suppression does not prevent immune destruction and AIDS outcomes."
		],
		misconceptions: [
			"Effective treatment is not a population-level cure and usually must continue.",
			"Near-normal life expectancy in some treated cohorts does not erase global access gaps.",
			"This historical survival claim is distinct from the equally strong evidence that viral suppression prevents sexual transmission."
		],
		editorSummary:
			"Combination therapy is one of medicine's clearest survival transformations, while access and early diagnosis determine who receives the full benefit.",
		uncertaintySummary:
			"The survival transformation is high-certainty. Remaining gaps and long-run outcomes vary by treatment history, population, health system, and comorbidity.",
		sources: [
			{
				kind: "guideline",
				title: "HIV Treatment: The Basics",
				publisher: "National Institutes of Health HIVinfo",
				year: 2025,
				url: "https://hivinfo.nih.gov/understanding-hiv/fact-sheets/hiv-treatment-basics",
				note: "Current institutional treatment summary covering suppression, health, transmission prevention, and lifelong care."
			},
			{
				kind: "meta_analysis",
				title: "Survival of HIV-positive patients starting antiretroviral therapy between 1996 and 2013: a collaborative analysis of cohort studies",
				publisher: "The Lancet HIV",
				year: 2017,
				url: "https://doi.org/10.1016/S2352-3018(17)30066-8",
				doi: "10.1016/S2352-3018(17)30066-8",
				note: "Large international cohort collaboration documenting survival gains across successive treatment eras."
			},
			{
				kind: "meta_analysis",
				title: "Life expectancy after 2015 of adults with HIV on long-term antiretroviral therapy in Europe and North America: a collaborative analysis of cohort studies",
				publisher: "The Lancet HIV",
				year: 2023,
				url: "https://doi.org/10.1016/S2352-3018(23)00028-0",
				doi: "10.1016/S2352-3018(23)00028-0",
				note: "Current large-cohort estimates of life expectancy and persistent subgroup gaps during modern therapy."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "historical-case-studies",
		title: "Did insulin transform type 1 diabetes from a rapidly fatal disease?",
		slug: "did-insulin-transform-type-1-diabetes-from-a-rapidly-fatal-disease",
		consensusBand: "strong",
		confidenceScore: 100,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. Before insulin treatment, children with type 1 diabetes usually died after months or a few years despite starvation diets. Beginning in 1922, insulin rescued patients from fatal metabolic decompensation and enabled long-term survival; later purification, formulations, monitoring, education, and delivery technology progressively improved outcomes.",
		stableCore: [
			"The immediate reversal of severe hyperglycemia and ketoacidosis produced an unusually visible treatment effect.",
			"Insulin replaces a hormone that people with type 1 diabetes cannot produce in sufficient quantity.",
			"Insulin is life-sustaining, not a cure, and access, hypoglycemia, complications, and treatment burden remain major problems."
		],
		openQuestions: [
			"How can universal affordable access to insulin, monitoring, education, and emergency supplies be achieved?",
			"Which immune, cell-replacement, or closed-loop strategies can safely remove or automate lifelong treatment?"
		],
		whatWouldChangeMinds: [
			"Historical and physiological evidence showing no survival or metabolic effect when insulin was introduced to insulin-deficient patients.",
			"A mechanism demonstrating that untreated absolute insulin deficiency does not cause ketoacidosis and death."
		],
		misconceptions: [
			"Insulin does not cause type 1 diabetes; it treats the hormone deficiency.",
			"The 1921 discovery and 1922 clinical introduction involved a team and prior scientific work, not one isolated inventor.",
			"A century of improvement does not make insulin affordable or accessible everywhere."
		],
		editorSummary:
			"Insulin is a definitive large-effect treatment case: survival changed immediately, then a century of incremental technologies made that rescue safer and more durable.",
		uncertaintySummary:
			"The life-saving causal effect is certain. Historical credit, present access, comparative technologies, and routes to cure remain contested or evolving.",
		sources: [
			{
				kind: "consensus_statement",
				title: "The miracle discovery that reversed the diabetes death sentence",
				publisher: "Nobel Prize Outreach",
				year: 2021,
				url: "https://www.nobelprize.org/the-miracle-discovery-that-reversed-the-diabetes-death-sentence/",
				note: "Institutional history of pre-insulin prognosis, discovery, early treatment, and the 1923 prize."
			},
			{
				kind: "systematic_review",
				title: "100 years of insulin: celebrating the past, present and future of diabetes therapy",
				publisher: "Nature Medicine",
				year: 2021,
				url: "https://doi.org/10.1038/s41591-021-01418-2",
				doi: "10.1038/s41591-021-01418-2",
				note: "Century review of insulin's discovery, clinical transformation, technology, and remaining inequities."
			},
			{
				kind: "systematic_review",
				title: "100 years on: the impact of the discovery of insulin on clinical outcomes",
				publisher: "BMJ Open Diabetes Research & Care",
				year: 2021,
				url: "https://doi.org/10.1136/bmjdrc-2021-002373",
				doi: "10.1136/bmjdrc-2021-002373",
				note: "Clinical review connecting the original survival change to later complications, formulations, monitoring, and access."
			}
		]
	}),
	reviewedClaim({
		topicSlug: "historical-case-studies",
		title: "Did the 1952 Great Smog demonstrate that severe air pollution can rapidly kill?",
		slug: "did-the-1952-great-smog-demonstrate-that-severe-air-pollution-can-rapidly-kill",
		consensusBand: "strong",
		confidenceScore: 99,
		evidenceCertainty: "high",
		bottomLine:
			"Yes. A cold, stagnant December 1952 episode trapped coal smoke and sulfur pollution over London, coinciding with a sharp rise in deaths and respiratory illness and excess mortality that continued after the visible fog. The disaster helped drive Britain's 1956 Clean Air Act and became a foundational acute air-pollution case.",
		stableCore: [
			"Daily smoke and sulfur dioxide rose dramatically while visibility collapsed and mortality surged.",
			"Deaths were concentrated among infants, older adults, and people with respiratory or cardiovascular disease, but exposure affected the whole city.",
			"Later evidence confirms that particulate air pollution can cause acute and chronic harm at concentrations far below the 1952 extreme."
		],
		openQuestions: [
			"What was the complete excess-death toll once delayed effects and diagnostic limitations are included?",
			"How should historians separate the smog's political effect from earlier clean-air advocacy and later implementation?"
		],
		whatWouldChangeMinds: [
			"Reanalysis showing the mortality spike did not align with pollution exposure after weather, season, and epidemic disease are considered.",
			"A competing cause explaining the timing, vulnerable groups, dose pattern, and delayed mortality more completely."
		],
		misconceptions: [
			"The event was not merely natural fog; combustion pollution made it toxic.",
			"The initial official death estimate did not capture all delayed excess mortality.",
			"One extreme event did not by itself establish every modern estimate of lower-dose air-pollution risk."
		],
		editorSummary:
			"The Great Smog made acute pollution mortality impossible to dismiss and helped turn urban smoke from an accepted nuisance into a preventable public-health hazard.",
		uncertaintySummary:
			"The causal episode and large mortality burden are secure; the exact total and pollutant-specific shares remain estimated from historical data.",
		sources: [
			{
				kind: "systematic_review",
				title: "A Look Back at the London Smog of 1952 and the Half Century Since",
				publisher: "Environmental Health Perspectives",
				year: 2002,
				url: "https://doi.org/10.1289/ehp.110-a734",
				doi: "10.1289/ehp.110-a734",
				note: "Fiftieth-anniversary synthesis of exposure, mortality, regulation, and subsequent air-pollution science."
			},
			{
				kind: "landmark_study",
				title: "Reassessment of the lethal London fog of 1952: novel indicators of acute and chronic consequences of acute exposure to air pollution",
				publisher: "Environmental Health Perspectives",
				year: 2001,
				url: "https://doi.org/10.1289/ehp.01109s3389",
				doi: "10.1289/ehp.01109s3389",
				note: "Historical epidemiology review connecting the episode to modern time-series and air-quality research."
			},
			{
				kind: "consensus_statement",
				title: "Air quality and the 1952 London smog",
				publisher: "UK Parliament Environmental Audit Committee",
				year: 2011,
				url: "https://publications.parliament.uk/pa/cm201012/cmselect/cmenvaud/1024/102407.htm",
				note: "Parliamentary history of the disaster, Clean Air Act response, and continuing policy relevance."
			}
		]
	})
];
