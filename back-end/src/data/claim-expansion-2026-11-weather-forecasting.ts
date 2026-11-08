import { researchSource, reviewedEntry } from "./claim-expansion-2026-11-shared.js";

export const novemberWeatherForecastingResearchCheckedAt = "2026-11-08T17:48:07.165Z";

const sources = {
	wmo: researchSource("WMO Statement on Weather Modification", "World Meteorological Organization", 2025, "https://public.wmo.int/content/wmo-statement-weather-modification", "", "WMO's 2025 statement contains information through June 2024. It recognizes causal evidence for suitable winter mountain seeding, while stressing uncertainty in yields, transfer between cloud types and environmental effects. It neither promotes nor discourages weather modification.", "consensus_statement", "supports", novemberWeatherForecastingResearchCheckedAt),
	cloud4: researchSource("Quantifying snowfall from orographic cloud seeding", "Proceedings of the National Academy of Sciences", 2020, "https://doi.org/10.1073/pnas.1917204117", "10.1073/pnas.1917204117", "Radar and gauges isolated seeded snowfall in selected winter mountain cases with little natural precipitation. Directly detected snow establishes a physical effect in those conditions, not a universal annual catchment yield or drought solution.", "landmark_study", "supports", novemberWeatherForecastingResearchCheckedAt),
	cloud3: researchSource("The Israel 4 Cloud Seeding Experiment: Primary Results", "Journal of Applied Meteorology and Climatology", 2023, "https://doi.org/10.1175/jamc-d-22-0077.1", "10.1175/jamc-d-22-0077.1", "Randomized Israel-4 experiment, 2013-2020: estimated rain increase 1.8%, p=.4, 95% CI -11% to 16%. It ended early with disappointing results. This regional result does not establish that every cloud-seeding method is ineffective.", "landmark_study", "debate", novemberWeatherForecastingResearchCheckedAt),
	cloud1: researchSource("Wintertime Orographic Cloud Seeding: A Review", "Journal of Applied Meteorology and Climatology", 2019, "https://doi.org/10.1175/jamc-d-18-0341.1", "10.1175/jamc-d-18-0341.1", "Research review of six decades of winter mountain cloud-seeding work, including physical observations, statistics and modeling. It is a narrative synthesis, not a pooled estimate of a universal seasonal water-supply increase.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	cloud2: researchSource("Glaciogenic Seeding of Cold-Season Orographic Clouds to Enhance Precipitation: Status and Prospects", "Bulletin of the American Meteorological Society", 2022, "https://doi.org/10.1175/bams-d-21-0279.1", "10.1175/bams-d-21-0279.1", "Plain-language expert essay on cold-season mountain seeding. Physical-process evidence is distinguished from the harder task of estimating catchment-wide precipitation gains. The essay is not a formal systematic review or an economic guarantee.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	forecast2: researchSource("Learning skillful medium-range global weather forecasting", "Science", 2023, "https://doi.org/10.1126/science.adi2336", "10.1126/science.adi2336", "GraphCast benchmark reports wins on 90% of 1,380 verification targets against deterministic operational systems. This is a fraction of evaluated targets, not a 90% probability that an individual weather forecast will be correct.", "landmark_study", "supports", novemberWeatherForecastingResearchCheckedAt),
	forecast3: researchSource("Probabilistic weather forecasting with machine learning", "Nature", 2025, "https://doi.org/10.1038/s41586-024-08252-9", "10.1038/s41586-024-08252-9", "GenCast's probabilistic forecasts beat ECMWF ENS on 97.2% of 1,320 evaluated targets. Ensemble and deterministic benchmarks differ. Journal issue 2025, online 2024; the reported percentage is not the accuracy of every forecast or record-breaking extreme.", "landmark_study", "supports", novemberWeatherForecastingResearchCheckedAt),
	forecast1: researchSource("Physics-based models outperform AI weather forecasts of record-breaking extremes", "Science Advances", 2026, "https://doi.org/10.1126/sciadv.aec1433", "10.1126/sciadv.aec1433", "2026 record-extremes comparison found larger errors in named GraphCast, Pangu-Weather and Fuxi variants than ECMWF HRES for record heat, cold and wind. It does not test every later AI model, ensemble or forecast target.", "context", "debate", novemberWeatherForecastingResearchCheckedAt),
	forecast4: researchSource("End-to-end data-driven weather prediction", "Nature", 2025, "https://doi.org/10.1038/s41586-025-08897-0", "10.1038/s41586-025-08897-0", "Aardvark replaces the forecasting pipeline from observations to global and local outputs. It outperforms specified operational baselines for selected variables and leads, with useful local forecasts up to ten days. Baseline choice and target remain central.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	warning3: researchSource("Public alert and warning system literature review in the USA: identifying research gaps and lessons for practice", "Natural Hazards", 2023, "https://doi.org/10.1007/s11069-023-05926-x", "10.1007/s11069-023-05926-x", "Structured review includes 156 US alert-and-warning studies across multiple hazards and designs. Its themes address effectiveness and practical barriers; these are not 156 independent trials measuring tornado mortality.", "systematic_review", "supports", novemberWeatherForecastingResearchCheckedAt),
	warning1: researchSource("WSR-88D Radar, Tornado Warnings, and Tornado Casualties", "Weather and Forecasting", 2005, "https://doi.org/10.1175/waf857.1", "10.1175/waf857.1", "US 1986-1999 observational analysis compares tornadoes before and after local Doppler-radar installation. Adjusted expected fatalities and injuries were lower. Radar changes, warning changes and other conditions were not randomly assigned; the reported reductions are not universal treatment effects.", "landmark_study", "supports", novemberWeatherForecastingResearchCheckedAt),
	warning2: researchSource("False Alarms, Tornado Warnings, and Tornado Casualties", "Weather, Climate, and Society", 2009, "https://doi.org/10.1175/2009wcas1005.1", "10.1175/2009wcas1005.1", "US 1986-2004 regression links higher historical false-alarm ratios with more tornado casualties. It overlaps the earlier authors' research and cannot establish that a particular warning should be ignored or quantify a universal causal false-alarm penalty.", "context", "debate", novemberWeatherForecastingResearchCheckedAt),
	warning4: researchSource("Rethinking Warning Compliance and Complacency by Examining How People Manage Risk and Vulnerability during Real-World Tornado Threats", "Bulletin of the American Meteorological Society", 2022, "https://doi.org/10.1175/bams-d-21-0072.1", "10.1175/bams-d-21-0072.1", "Interviews with 23 survivors of two EF3 tornadoes found active risk management alongside barriers to reaching safe shelter. The qualitative sample challenges simplistic complacency explanations but does not estimate a population mortality effect.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	urban1: researchSource("Meta-analysis of urbanization impact on rainfall modification", "Scientific Reports", 2019, "https://doi.org/10.1038/s41598-019-42494-2", "10.1038/s41598-019-42494-2", "Quantitative synthesis of 85 studies from 48 papers reports spatially varying average rainfall changes. The 18% downwind and 16% over-city averages combine varied observational/modeling settings and do not predict every city, storm or rainfall intensity.", "meta_analysis", "supports", novemberWeatherForecastingResearchCheckedAt),
	urban2: researchSource("Global scale assessment of urban precipitation anomalies", "Proceedings of the National Academy of Sciences", 2024, "https://doi.org/10.1073/pnas.2311496121", "10.1073/pnas.2311496121", "Global satellite-based analysis of over 1,000 cities found more precipitation in over 60% of cities and downwind regions than surrounding rural areas. Warm, humid climates showed larger anomalies; urban-rural comparisons require geographic and climatic controls.", "landmark_study", "supports", novemberWeatherForecastingResearchCheckedAt),
	urban3: researchSource("Re-examining urban rainfall enhancement over North America", "Environmental Research Letters", 2025, "https://doi.org/10.1088/1748-9326/adb507", "10.1088/1748-9326/adb507", "Analysis of 47 North American conurbations found more frequent or greater total rain in many cities, but generally weaker upper-percentile rates and no systematic increase in matched-duration totals. Results depend strongly on the surrounding hydroclimate.", "context", "debate", novemberWeatherForecastingResearchCheckedAt),
	urban4: researchSource("Global Urban‐Rural Differences in Precipitation: Cities See More Light Rain But Milder Extremes", "Earth's Future", 2026, "https://doi.org/10.1029/2025ef007370", "10.1029/2025ef007370", "Global intensity-specific analysis found increased light-rain frequency in 70.1% of large cities but milder extreme magnitudes in 69.9%. Downwind effects and idealized simulations differ from a claim that cities intensify all rainfall.", "context", "debate", novemberWeatherForecastingResearchCheckedAt),
	turbulence2: researchSource("Evidence for Large Increases in Clear‐Air Turbulence Over the Past Four Decades", "Geophysical Research Letters", 2023, "https://doi.org/10.1029/2023gl103814", "10.1029/2023gl103814", "1979-2020 reanalysis with 21 turbulence diagnostics finds increased conducive conditions. The North Atlantic 55% severe-duration example is one location's diagnostic trend, not a global increase in every flight encounter, injury or accident.", "landmark_study", "supports", novemberWeatherForecastingResearchCheckedAt),
	turbulence1: researchSource("Past and Future Trends in Clear‐Air Turbulence Over the Northern Hemisphere", "Journal of Geophysical Research: Atmospheres", 2024, "https://doi.org/10.1029/2023jd040261", "10.1029/2023jd040261", "Multiple reanalyses and models show regional clear-air turbulence trends. Anthropogenic signals are detectable in some regions, but weak signal-to-noise in the North Atlantic/Pacific and uncertain North Atlantic projections limit universal attribution statements.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	turbulence4: researchSource("Can a climate model successfully diagnose clear‐air turbulence and its response to climate change?", "Quarterly Journal of the Royal Meteorological Society", 2022, "https://doi.org/10.1002/qj.4270", "10.1002/qj.4270", "Seven diagnostics compare 38 years of modeled and reanalysis turbulence. Diagnostic spread exceeds model-versus-reanalysis differences. Validation supports climate-model use but does not remove uncertainty in diagnostic choice, region or future changes.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	turbulence3: researchSource("Clear-Air Turbulence and Aviation Operations: A Literature Review", "Sustainability", 2025, "https://doi.org/10.3390/su17094065", "10.3390/su17094065", "Aviation literature review describes turbulence science, detection and operational mitigation. It is a contextual review, not an independently pooled analysis of worldwide injury or crash trends.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	ecmwf: researchSource("Forecast Ensemble (ENS): Rationale and Construction", "European Centre for Medium-Range Weather Forecasts", 2026, "https://confluence.ecmwf.int/spaces/FUG/pages/673550730/Section+5+Forecast+Ensemble+ENS+-+Rationale+and+Construction", "", "ECMWF's forecast user guide, updated June 2026, explains ensemble uncertainty, probabilistic products and calibration requirements. Ensemble spread provides information; biased or unrepresentative ensembles can still misstate risk. Operational guidance is distinct from a universal skill guarantee.", "guideline", "supports", novemberWeatherForecastingResearchCheckedAt),
	ensemble3: researchSource("Probability forecasts – Part 1: ensembles and probabilistic forecasts", "Weather", 2026, "https://doi.org/10.1002/wea.70015", "10.1002/wea.70015", "Explanatory article on ensemble rationale, postprocessing and decision support, not a systematic meta-analysis. Journal issue 2026, indexed 2025. Predictive skill, useful risk information and understandable communication are distinct requirements.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	ensemble2: researchSource("Are we misdiagnosing ensemble forecast reliability? On the insufficiency of spread–error and rank‐based reliability metrics", "Quarterly Journal of the Royal Meteorological Society", 2026, "https://doi.org/10.1002/qj.70186", "10.1002/qj.70186", "Reliability analysis shows that spread-error equality and flat rank histograms can falsely indicate reliability when climatological variance is biased. Journal issue 2026, indexed 2025. Passing one diagnostic is not proof that event probabilities are calibrated.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	ensemble1: researchSource("Ensemble forecasting: A foray of dynamics into the realm of statistics", "Quarterly Journal of the Royal Meteorological Society", 2024, "https://doi.org/10.1002/qj.4745", "10.1002/qj.4745", "2024 theoretical and information-metric critique questions claimed ensemble benefits and reports an 18-hour information loss in its evaluation. Its metric and comparison differ from probabilistic operational products and do not settle every ensemble application.", "context", "debate", novemberWeatherForecastingResearchCheckedAt),
	seasonal2: researchSource("Impact‐Based Skill Evaluation of Seasonal Precipitation Forecasts", "Earth's Future", 2024, "https://doi.org/10.1029/2024ef004936", "10.1029/2024ef004936", "Global evaluation of five C3S models, 1993-2016, uses 14 precipitation indices. Skill varies by region, season, threshold and model, with generally stronger tropical than extratropical performance. It is an evaluated hindcast comparison, not a prospective guarantee.", "landmark_study", "supports", novemberWeatherForecastingResearchCheckedAt),
	seasonal1: researchSource("Initialized Earth System prediction from subseasonal to decadal timescales", "Nature Reviews Earth & Environment", 2021, "https://doi.org/10.1038/s43017-021-00155-x", "10.1038/s43017-021-00155-x", "Research review spans subseasonal to decadal initialized predictions. It identifies useful signals alongside model drift, initialization and mechanism limits. Skill for a climate mode or seasonal average does not establish an exact daily weather sequence.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	seasonal5: researchSource("Assessing the Skill and Reliability of Seasonal Climate Forecasts in Sahelian West Africa", "Weather and Forecasting", 2020, "https://doi.org/10.1175/waf-d-19-0168.1", "10.1175/waf-d-19-0168.1", "Twenty-year assessment of regional Sahel outlooks and dynamical models found positive but geographically varying skill and reliability, with probability biases. Model rankings depend on the weather situation and should not be generalized worldwide.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	seasonal6: researchSource("Literature survey of subseasonal‐to‐seasonal predictions in the southern hemisphere", "Meteorological Applications", 2024, "https://doi.org/10.1002/met.2170", "10.1002/met.2170", "Southern Hemisphere subseasonal-to-seasonal literature survey finds temperature generally more skillful than rain and many studied local predictions limited to about two weeks. This does not set a universal limit for seasonal averages or ENSO prediction.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	enso1: researchSource("Real-time ENSO forecast skill evaluated over the last two decades, with focus on the onset of ENSO events", "npj Climate and Atmospheric Science", 2024, "https://doi.org/10.1038/s41612-024-00845-5", "10.1038/s41612-024-00845-5", "Assessment of 253 real-time IRI forecasts issued 2002-2023 finds model-, event- and lead-dependent skill. Dynamical models were more useful for phase onsets, often months ahead; skill falls with lead time and spring remains challenging.", "landmark_study", "supports", novemberWeatherForecastingResearchCheckedAt),
	enso2: researchSource("Multi-decadal variation of ENSO forecast skill since the late 1800s", "npj Climate and Atmospheric Science", 2023, "https://doi.org/10.1038/s41612-023-00417-z", "10.1038/s41612-023-00417-z", "Model-analog hindcasts since the late 1800s show variable second-year ENSO skill and a persistent spring barrier. Historical reconstructions and hindcast skill are distinct from a demonstrated two-year operational forecast for every event.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	enso3: researchSource("Tropical basin interactions reduce spring predictability barrier of ENSO in a deep learning model", "Science Advances", 2026, "https://doi.org/10.1126/sciadv.aeb0901", "10.1126/sciadv.aeb0901", "2026 GL-Geoformer study reports skill to 16 months for selected spring starts by representing tropical-basin interactions. This is a model evaluation; it does not establish guaranteed 16-month operational onset prediction.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	enso4: researchSource("Identifying key convection-sensitive oceanic regions to weaken the ENSO spring predictability barrier", "Proceedings of the National Academy of Sciences", 2026, "https://doi.org/10.1073/pnas.2512725123", "10.1073/pnas.2512725123", "2026 study develops a convection-sensitive sea-temperature index and a deep-learning model, improving evaluated ENSO skill especially for multiyear La Nina. Promising model benchmarks require independent prospective validation.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	tornado4: researchSource("Increased variability of tornado occurrence in the United States", "Science", 2014, "https://doi.org/10.1126/science.1257460", "10.1126/science.1257460", "Analysis excluding the weakest reports found relatively stable mean annual US tornado numbers but fewer tornado days and more days with many tornadoes since the 1970s. It does not establish a simple national increase in total frequency.", "landmark_study", "context", novemberWeatherForecastingResearchCheckedAt),
	tornado1: researchSource("Improving Estimates of U.S. Tornado Frequency by Accounting for Unreported and Underrated Tornadoes", "Journal of Applied Meteorology and Climatology", 2022, "https://doi.org/10.1175/jamc-d-21-0225.1", "10.1175/jamc-d-21-0225.1", "Bayesian correction for population-linked reporting biases in central US data, 1975-2018, estimates substantial underreporting but little change in total frequency. Its approximate threefold F2+ estimate is model-dependent, not a directly observed national count.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	tornado2: researchSource("Spatial trends in United States tornado frequency", "npj Climate and Atmospheric Science", 2018, "https://doi.org/10.1038/s41612-018-0048-2", "10.1038/s41612-018-0048-2", "US reports since 1979 show relatively stable national totals with declining Great Plains and increasing Midwest/Southeast occurrence. Environmental covariates support regional patterns, but reporting practices and attribution remain separate issues.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	tornado3: researchSource("The regionality and seasonality of tornado trends in the United States", "npj Climate and Atmospheric Science", 2024, "https://doi.org/10.1038/s41612-024-00698-y", "10.1038/s41612-024-00698-y", "Disaggregated US 1960-2022 reports show fewer summer tornado days in parts of the Great Plains and more outbreak days in the Southeast. Some trends relaxed recently. Days, outbreaks, individual tornadoes and climate attribution are different measures.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	intensity2: researchSource("Operational Forecasting of Tropical Cyclone Rapid Intensification at the National Hurricane Center", "Atmosphere", 2021, "https://doi.org/10.3390/atmos12060683", "10.3390/atmos12060683", "NHC operational performance analysis documents limited earlier rapid-intensification utility and improvements after about 2015. The reported 20-25% progress uses a specified error metric and baseline, not the percentage of all rapid intensifications successfully predicted.", "landmark_study", "supports", novemberWeatherForecastingResearchCheckedAt),
	intensity1: researchSource("A review of recent advances (2018–2021) on tropical cyclone intensity change from operational perspectives, part 2: Forecasts by operational centers", "Tropical Cyclone Research and Review", 2023, "https://doi.org/10.1016/j.tcrr.2023.05.003", "10.1016/j.tcrr.2023.05.003", "International operational-center review, covering 2018-2021, describes improving intensity and rapid-intensification guidance alongside continuing challenges. It is a rapporteur synthesis of center performance, not a universal event-detection accuracy estimate.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	intensity4: researchSource("Updates to the Rapid Intensification Deterministic Ensemble (RIDE) for the Joint Typhoon Warning Center’s Area of Responsibility", "Weather and Forecasting", 2026, "https://doi.org/10.1175/waf-d-26-0037.1", "10.1175/waf-d-26-0037.1", "RIDE update addresses missing input forecasts in JTWC operations. Independent evaluation across 2025 cyclone seasons supports useful guidance and availability. A 40% model decision threshold is not a physical certainty or universal user-action threshold.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	intensity3: researchSource("Advancing forecasting capabilities: A contrastive learning model for forecasting tropical cyclone rapid intensification", "Proceedings of the National Academy of Sciences", 2025, "https://doi.org/10.1073/pnas.2415501122", "10.1073/pnas.2415501122", "Satellite/data model tested on 1,149 northwest Pacific cyclone periods in 2020-2021 reports improved detection and false-alarm metrics. These regional retrospective benchmarks are not a guarantee of equal operational skill in other basins or seasons.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	frequency1: researchSource("Tropical Cyclones and Climate Change Assessment: Part I: Detection and Attribution", "Bulletin of the American Meteorological Society", 2019, "https://doi.org/10.1175/bams-d-18-0189.1", "10.1175/bams-d-18-0189.1", "Expert detection-and-attribution assessment explicitly reports divided author views and historical data limits. Its strict-detection and weaker balance-of-evidence approaches differ. The paper does not establish that global storm counts have risen uniformly.", "consensus_statement", "context", novemberWeatherForecastingResearchCheckedAt),
	frequency2: researchSource("Declining tropical cyclone frequency under global warming", "Nature Climate Change", 2022, "https://doi.org/10.1038/s41558-022-01388-4", "10.1038/s41558-022-01388-4", "Long-term reconstructed cyclone proxy and high-resolution model experiments suggest declining twentieth-century global and regional storm frequency. Pre-satellite reconstruction and natural variability limit direct comparison with modern observations or individual ocean basins.", "context", "debate", novemberWeatherForecastingResearchCheckedAt),
	frequency3: researchSource("Decreasing global tropical cyclone frequency in CMIP6 historical simulations", "Science Advances", 2024, "https://doi.org/10.1126/sciadv.adl2142", "10.1126/sciadv.adl2142", "Historical CMIP6 simulations show declining global cyclone frequency in 75% of 20 models. A proportion of models is not a proportion of scientists, and modeled historical changes are not a complete observational storm count.", "context", "debate", novemberWeatherForecastingResearchCheckedAt),
	frequency4: researchSource("Atlantic tropical cyclones downscaled from climate reanalyses show increasing activity over past 150 years", "Nature Communications", 2021, "https://doi.org/10.1038/s41467-021-27364-8", "10.1038/s41467-021-27364-8", "Downscaling three climate analyses finds increasing long-term Atlantic activity but weak or insignificant trends for many all-tropics metrics. Atlantic behavior, regional forcing and historical undercounting cannot be treated as a uniform global trend.", "context", "debate", novemberWeatherForecastingResearchCheckedAt),
	frequency5: researchSource("Tropical Cyclones and Climate Change Assessment: Part II: Projected Response to Anthropogenic Warming", "Bulletin of the American Meteorological Society", 2020, "https://doi.org/10.1175/bams-d-18-0194.1", "10.1175/bams-d-18-0194.1", "Expert projection assessment distinguishes frequency, intensity, rainfall, storm surge and the proportion of very intense storms. Confidence is lower and author views more mixed on total global frequency than on several damage-relevant metrics. Projections are conditional, not observed counts.", "consensus_statement", "context", novemberWeatherForecastingResearchCheckedAt),
	dust3: researchSource("When Does the Saharan Air Layer Impede the Intensification of Tropical Cyclones?", "Journal of Climate", 2020, "https://doi.org/10.1175/jcli-d-19-0854.1", "10.1175/jcli-d-19-0854.1", "Observational analysis of 52 named Atlantic cyclones, 2004-2017, finds dust abundance alone a poor indicator of failure to intensify. Some storms intensified despite Saharan air; dryness, shear, storm location and stage modify the association.", "landmark_study", "context", novemberWeatherForecastingResearchCheckedAt),
	dust2: researchSource("Radiative and Microphysical Impacts of the Saharan Dust on Two Concurrent Tropical Cyclones: Danielle and Earl (2010)", "Journal of Geophysical Research: Atmospheres", 2024, "https://doi.org/10.1029/2023jd039245", "10.1029/2023jd039245", "WRF sensitivity experiments for Danielle and Earl in 2010 find stage-dependent radiative and microphysical dust effects. Two simulated storms do not establish that dust always weakens hurricanes or that modeled effect sizes apply universally.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	dust1: researchSource("Leading role of Saharan dust on tropical cyclone rainfall in the Atlantic Basin", "Science Advances", 2024, "https://doi.org/10.1126/sciadv.adn6106", "10.1126/sciadv.adn6106", "Nineteen-year satellite/weather dataset and XGBoost analysis relate dust optical depth nonlinearly to cyclone rain. Rainfall is distinct from wind intensity or storm formation, and a fitted relationship does not isolate every causal dust mechanism.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	dust4: researchSource("Exploring the Impact of Dust on North Atlantic Hurricanes in a High‐Resolution Climate Model", "Geophysical Research Letters", 2019, "https://doi.org/10.1029/2018gl080642", "10.1029/2018gl080642", "One high-resolution climate model compares standard and reduced-dust simulations. Reduced dust increases modeled Atlantic cyclone activity, with smaller intensity changes. Simulation differences are not an observed universal dust-protection effect for coastal communities.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	heat1: researchSource("A Systematic Review of Heat Health Warning Systems: Enhancing the Framework Towards Effective Health Outcomes", "Current Environmental Health Reports", 2025, "https://doi.org/10.1007/s40572-025-00496-5", "10.1007/s40572-025-00496-5", "Systematic review examines heat-warning thresholds, local epidemiology, built environment and personalization. It supports targeted systems but is not a pooled causal mortality estimate for warnings alone or proof of equal effects across cities.", "systematic_review", "supports", novemberWeatherForecastingResearchCheckedAt),
	heat3: researchSource("The effectiveness of heat prevention plans in reducing heat-related mortality across Europe", "Environmental Research Letters", 2025, "https://doi.org/10.1088/1748-9326/ae2775", "10.1088/1748-9326/ae2775", "Observational analysis of 102 locations in 14 European countries associates heat-prevention plans with lower heat-attributable mortality. Plans combine warnings and actions. The estimated 25.2% reduction is a modeled attribution, not an isolated warning-only treatment effect.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	heat2: researchSource("Assessing the effectiveness of the heat health warning system in preventing mortality in 15 German cities: A difference-in-differences approach", "Environment International", 2025, "https://doi.org/10.1016/j.envint.2025.109746", "10.1016/j.envint.2025.109746", "Difference-in-differences analysis across 15 German cities finds substantial variation. The pooled estimate showed no overall benefit before specified city-level adjustments; adjusted results differed. Model specification and accompanying protections affect interpretation.", "context", "debate", novemberWeatherForecastingResearchCheckedAt),
	heat4: researchSource("The Use of a Quasi-Experimental Study on the Mortality Effect of a Heat Wave Warning System in Korea", "International Journal of Environmental Research and Public Health", 2019, "https://doi.org/10.3390/ijerph16122245", "10.3390/ijerph16122245", "Quasi-experimental Korean seven-city study, 2009-2014, finds benefits in some causes/subgroups but no reduction in population all-cause mortality. Subgroup estimates do not establish that alerts have the same benefit for every population.", "context", "debate", novemberWeatherForecastingResearchCheckedAt),
	flood1: researchSource("Economic Value of Flood Forecasts and Early Warning Systems: A Review", "Natural Hazards Review", 2024, "https://doi.org/10.1061/nhrefo.nheng-2094", "10.1061/nhrefo.nheng-2094", "Systematic search identifies 66 articles/reports from more than 15 countries. Only 15 use value-of-information approaches; much evidence relies on surveys or expert judgment. Evidence isolating monetary damage avoided by warnings remains limited, especially for the US.", "systematic_review", "context", novemberWeatherForecastingResearchCheckedAt),
	flood2: researchSource("Knowing What to Do Substantially Improves the Effectiveness of Flood Early Warning", "Bulletin of the American Meteorological Society", 2021, "https://doi.org/10.1175/bams-d-20-0262.1", "10.1175/bams-d-20-0262.1", "Retrospective interviews cover 4,468 German loss cases across six floods, 2002-2013. Lower losses were linked to knowing how to respond and preparedness. Observational associations do not establish a fixed causal percentage reduction from every warning.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	flood3: researchSource("Does the Performance of a Flood Early Warning System Affect Casualties and Economic Losses? Empirical Analysis Using Open Data from the 2018 Japan Floods", "Journal of the Meteorological Society of Japan. Ser. II", 2025, "https://doi.org/10.2151/jmsj.2025-025", "10.2151/jmsj.2025-025", "Bayesian analysis of 127 municipalities in Japan's 2018 floods links prior false-alarm ratios with casualties and general-asset losses. Available open data and a single event limit causal and geographic generalization; crop and asset losses remain distinct.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	flood4: researchSource("Designing Effective Flood Early Warning Systems: A Review of Barriers, Best Practices, and Key Characteristics", "Journal of Flood Risk Management", 2025, "https://doi.org/10.1111/jfr3.70145", "10.1111/jfr3.70145", "Narrative review combines system design and social dimensions with selected examples across six continents. It is not a quantitative synthesis of independently measured property-loss reductions or a test of every system in its repository.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	pyro2: researchSource("Wildfire-driven thunderstorms cause a volcano-like stratospheric injection of smoke", "npj Climate and Atmospheric Science", 2018, "https://doi.org/10.1038/s41612-018-0039-3", "10.1038/s41612-018-0039-3", "Observations of five near-simultaneous August 2017 western North American fire storms show a large stratospheric smoke injection. Comparison with a moderate volcanic eruption concerns aerosol mass, not identical chemistry, causes or climate effects.", "landmark_study", "supports", novemberWeatherForecastingResearchCheckedAt),
	pyro3: researchSource("Worldwide inventory reveals the frequency and variability of pyrocumulonimbus and stratospheric smoke plumes during 2013–2023", "npj Climate and Atmospheric Science", 2025, "https://doi.org/10.1038/s41612-025-01188-5", "10.1038/s41612-025-01188-5", "Global inventory confirms 761 events in 2013-2023, with 169 in 2023. Its short record and changing detection are not a definitive long-term trend. Tropopause-level smoke injection and all confirmed fire storms are different subsets.", "landmark_study", "supports", novemberWeatherForecastingResearchCheckedAt),
	pyro1: researchSource("Understanding the critical elements of the pyrocumulonimbus storm sparked by high-intensity wildland fire", "Communications Earth & Environment", 2022, "https://doi.org/10.1038/s43247-022-00566-8", "10.1038/s43247-022-00566-8", "Review and 2013-2021 record describe fire-generated deep storms and their hazards. The authors explicitly found the record insufficient to identify a trend. Pyrocumulonimbus often produces little useful rainfall despite its thunderstorm characteristics.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	pyro4: researchSource("Impact of Smoke Aerosol Loading on Lightning Characteristics of Pyrocumulonimbus Compared With Other High‐Based Thunderstorms", "Journal of Geophysical Research: Atmospheres", 2025, "https://doi.org/10.1029/2024jd042285", "10.1029/2024jd042285", "Five British Columbia 2021 fire-storm cases show very uneven lightning, including one with 5,600 strikes and others with minimal or no detected activity. A smoky cloud or a fire storm does not imply a fixed lightning output.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	aerosol1: researchSource("A Systematic Review of the Potential Influence of Urbanization on the Regional Thunderstorm Process and Lightning Activity", "Atmosphere", 2024, "https://doi.org/10.3390/atmos15030374", "10.3390/atmos15030374", "Review of urban thunderstorm/lightning research finds no consensus that aerosols uniformly enhance or suppress lightning. Heat, buildings, circulation and pollution can co-vary. The synthesis is not a pooled causal estimate for every pollutant or city.", "systematic_review", "context", novemberWeatherForecastingResearchCheckedAt),
	aerosol2: researchSource("The influence of aerosols on lightning activity in the Pearl River Delta of China", "Atmospheric Research", 2025, "https://doi.org/10.1016/j.atmosres.2025.108066", "10.1016/j.atmosres.2025.108066", "Pearl River Delta 2013-2021 observational analysis links aerosols and lightning nonlinearly, with different effects across pollution and convection conditions. Aerosol optical depth and weather co-vary; modeled mechanism interpretation is distinct from random pollution exposure.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	aerosol3: researchSource("The climate impact of aerosols on the lightning flash rate: is it detectable from long-term measurements?", "Atmospheric Chemistry and Physics", 2018, "https://doi.org/10.5194/acp-18-12797-2018", "10.5194/acp-18-12797-2018", "Eleven-year African lightning/aerosol analysis finds different nonlinear patterns for dust and smoke, humidity and atmospheric instability. A single concentration threshold is not a global causal tipping point; the physical mechanisms remain hypotheses supported by multiple analyses.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	aerosol4: researchSource("The impacts of shipping emissions on lightning: roles of aerosol-radiation-interactions and aerosol-cloud-interactions", "Environmental Research Letters", 2024, "https://doi.org/10.1088/1748-9326/ad2aba", "10.1088/1748-9326/ad2aba", "Shipping-lane observations and three WRF-Chem case simulations link emissions to lightning changes. Simulations overestimate counts; radiative effects change sign across cases. The 6.2-22.3% case estimates are not a worldwide shipping-lightning effect.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	forest2: researchSource("Tropical deforestation causes large reductions in observed precipitation", "Nature", 2023, "https://doi.org/10.1038/s41586-022-05690-1", "10.1038/s41586-022-05690-1", "Pan-tropical 2003-2017 forest-loss comparison finds larger-scale satellite rainfall reductions, especially beyond 50 km. Station and reanalysis products disagree on direction. Scale, sparse observations and a space-for-time design limit a universal causal interpretation.", "landmark_study", "supports", novemberWeatherForecastingResearchCheckedAt),
	forest1: researchSource("Reviewing the Impact of Land Use and Land‐Use Change on Moisture Recycling and Precipitation Patterns", "Water Resources Research", 2021, "https://doi.org/10.1029/2020wr029234", "10.1029/2020wr029234", "Scoping review covers observations and models of land-use change and moisture recycling. It identifies strong geographic knowledge gaps, especially temperate regions and drylands. It is not a pooled estimate that each additional tree produces a fixed amount of rain.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	forest3: researchSource("Impact of Amazonian deforestation on precipitation reverses between seasons", "Nature", 2025, "https://doi.org/10.1038/s41586-024-08570-y", "10.1038/s41586-024-08570-y", "2025 Amazon analysis finds local wet-season rain increases but dry-season decreases and reductions farther downwind of deforestation. Local circulation and broader moisture recycling can produce different seasonal and spatial responses.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	forest4: researchSource("Historical deforestation drives strong rainfall decline across the southern Amazon basin", "Nature Communications", 2026, "https://doi.org/10.1038/s41467-026-68361-z", "10.1038/s41467-026-68361-z", "Satellite observations plus moisture tracking attribute part of southern Amazon 1980-2019 drying to deforestation and upwind moisture changes. The estimated 52-72% attribution is model-assisted and regional, not a directly measured universal deforestation fraction.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	irrigation1: researchSource("Observational evidence of increased afternoon rainfall downwind of irrigated areas", "Nature Communications", 2025, "https://doi.org/10.1038/s41467-025-58729-y", "10.1038/s41467-025-58729-y", "Two global precipitation datasets show more afternoon rain events 10-50 km downwind of irrigated land, but less heavy-afternoon-rain volume than upwind. Observed frequency, total rainfall and heavy rainfall are different outcomes.", "landmark_study", "supports", novemberWeatherForecastingResearchCheckedAt),
	irrigation2: researchSource("Differential impacts of irrigation on precipitation across the United States", "Environmental Research Letters", 2026, "https://doi.org/10.1088/1748-9326/ae929d", "10.1088/1748-9326/ae929d", "2026 US Earth-system-model comparison finds regional and seasonal increases, decreases and near-zero responses to irrigation. Simulated differences do not establish that added irrigation water returns as rain locally or offsets groundwater extraction.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	irrigation3: researchSource("Irrigation impact on boundary layer and precipitation characteristics in Weather Research and Forecasting model simulations during LIAISE‐2021", "Quarterly Journal of the Royal Meteorological Society", 2024, "https://doi.org/10.1002/qj.4756", "10.1002/qj.4756", "LIAISE July 2021 simulations give opposite rain responses with parameterized versus explicitly resolved convection. Irrigation improves several near-surface weather variables but not the observed precipitation field. Numerical representation is a major source of uncertainty.", "context", "debate", novemberWeatherForecastingResearchCheckedAt),
	irrigation4: researchSource("Intense agricultural irrigation induced contrasting precipitation changes in Saudi Arabia", "Environmental Research Letters", 2021, "https://doi.org/10.1088/1748-9326/ac002e", "10.1088/1748-9326/ac002e", "Three regional models and observational contrasts in Saudi Arabia suggest local rain suppression and enhancement to the west of irrigated areas. Dry-region dynamics and shifting moisture transport limit generalization to other irrigation regions.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	nws: researchSource("Outdoor Warning Sirens: Frequently Asked Questions", "US National Weather Service, Quad Cities", undefined, "https://www.weather.gov/dvn/sirenFAQ", "", "Undated US National Weather Service Quad Cities guidance describes sirens as outdoor alerts and recommends indoor warning channels. Activation criteria vary locally. This is safety guidance, not an experiment or a worldwide specification for every siren installation.", "guideline", "supports", novemberWeatherForecastingResearchCheckedAt),
	siren1: researchSource("Outdoor siren systems: a review of technology, usage, and public response during emergencies", "National Institute of Standards and Technology", 2017, "https://doi.org/10.6028/nist.tn.1950", "10.6028/nist.tn.1950", "NIST technical review follows the 2011 Joplin investigation and examines siren technology, policies and public response. It identifies varied US practices and communication limits; it is not a trial proving uniform indoor audibility or mortality effects.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	siren2: researchSource("“You’ve Been Warned?”", "International Journal of Information Systems for Crisis Response and Management", 2013, "https://doi.org/10.4018/ijiscram.2013070103", "10.4018/ijiscram.2013070103", "Before/after surveys at an Alabama university around the 2011 tornado found difficulty interpreting siren tones/messages. The specific student/staff sample is not a national population estimate or a controlled siren-coverage experiment.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	siren3: researchSource("Are sirens effective tools to alert the population in France?", "Natural Hazards and Earth System Sciences", 2021, "https://doi.org/10.5194/nhess-21-2899-2021", "10.5194/nhess-21-2899-2021", "French geographic analysis, surveys and a mock emergency found uneven siren coverage and gaps between stated knowledge and response. Different national policies and the exercise setting limit transfer to every US tornado-warning system.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	arctic4: researchSource("Robust but weak winter atmospheric circulation response to future Arctic sea ice loss", "Nature Communications", 2022, "https://doi.org/10.1038/s41467-022-28283-y", "10.1038/s41467-022-28283-y", "Sixteen PAMIP models show a robust but weak circulation response to sea-ice loss, with individual-year variability much larger. Constraints and observed correlations matter. The approximate 10% variability example is not the share of all cold events caused by Arctic warming.", "landmark_study", "context", novemberWeatherForecastingResearchCheckedAt),
	arctic1: researchSource("Divergent consensuses on Arctic amplification influence on midlatitude severe winter weather", "Nature Climate Change", 2020, "https://doi.org/10.1038/s41558-019-0662-y", "10.1038/s41558-019-0662-y", "Review describes divergent observational and modeling conclusions about Arctic warming and severe midlatitude winters. Canonical issue year 2020, online 2019. It records a debate rather than a measured percentage of all scientists agreeing on a mechanism.", "context", "context", novemberWeatherForecastingResearchCheckedAt),
	arctic2: researchSource("Linking Arctic variability and change with extreme winter weather in the United States", "Science", 2021, "https://doi.org/10.1126/science.abi9167", "10.1126/science.abi9167", "Observational analysis and forced model experiments link a particular stretched polar-vortex pattern to cold outbreaks in parts of Asia/North America. The mechanism is not a universal explanation of all winter cold or proof that warming increases cold everywhere.", "context", "supports", novemberWeatherForecastingResearchCheckedAt),
	arctic5: researchSource("Causes and consequences of Arctic amplification elucidated by coordinated multimodel experiments", "Communications Earth & Environment", 2025, "https://doi.org/10.1038/s43247-025-03052-z", "10.1038/s43247-025-03052-z", "Coordinated-model review reports small but robust responses, including fewer/milder North American cold extremes in its experiments. It overlaps the PAMIP research program and is not wholly independent of earlier model studies. Different forcing experiments and outcomes must remain distinct.", "context", "debate", novemberWeatherForecastingResearchCheckedAt),
	arctic6: researchSource("Insignificant effect of Arctic amplification on the amplitude of midlatitude atmospheric waves", "Science Advances", 2020, "https://doi.org/10.1126/sciadv.aay2880", "10.1126/sciadv.aay2880", "Observed waviness trends reverse despite continued Arctic amplification, while imposed temperature-gradient experiments do not produce larger wave amplitude. Covariation and forced responses differ; this tests one proposed pathway rather than disproving every Arctic influence.", "context", "debate", novemberWeatherForecastingResearchCheckedAt)
};

export const novemberWeatherForecastingClaims = [
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "can-cloud-seeding-increase-precipitation",
		title: "Can cloud seeding increase precipitation?",
		bottomLine: "Yes, under suitable conditions. Researchers have directly measured extra snow from some winter mountain clouds. The size of the wider water-supply benefit is harder to establish, and results from one cloud type or region do not apply everywhere.",
		stableCore: [
			"Radar and ground measurements can distinguish seeded snowfall from nearby natural precipitation in carefully selected conditions. WMO recognizes causal evidence for this specific winter mountain method.",
			"A randomized trial in northern Israel found no statistically clear rain increase and the operational program ended. Physical success in selected clouds does not establish a reliable seasonal yield in every setting."
		],
		openQuestions: [
			"How much extra usable water results over a whole catchment and season?",
			"Which cloud conditions produce repeatable benefits without important downwind or environmental costs?"
		],
		whatWouldChangeMinds: [
			"Independent randomized and process-based evaluations that agree on catchment-scale gains.",
			"Repeated measurements across seasons and cloud types, with uncertainty and environmental effects reported."
		],
		misconceptions: [
			"Seeding needs suitable existing clouds; it cannot simply create a rain system in clear, dry air.",
			"An observed snowfall increase is different from proving that a program can end a drought or pay for itself."
		],
		editorSummary: "Cloud seeding can increase precipitation in suitable clouds; dependable regional water yields remain harder to quantify.",
		population: "Winter mountain cloud studies, a northern Israeli randomized rain trial and WMO weather-modification guidance.",
		scope: "Distinguish direct precipitation formation in suitable seeded clouds from seasonal catchment yield and transfer to other weather systems.",
		excludedEvidence: [
			"Keep mountain snowfall, complex convective rain clouds and large-scale drought relief separate.",
			"Do not treat an operational program's popularity or an economic projection as proof of extra precipitation."
		],
		uncertainty: "Natural rainfall varies greatly, effects can be small, and clouds, catchments and evaluation methods differ.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.wmo,
			sources.cloud4,
			sources.cloud3,
			sources.cloud1,
			sources.cloud2
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "are-ai-weather-forecasts-more-accurate-than-traditional-models",
		title: "Are AI weather forecasts more accurate than traditional models?",
		bottomLine: "Some are better on many tested measures, but there is no single winner for every forecast. Results depend on the model, weather variable, lead time and comparison system. Record-breaking extremes can expose weaknesses that average scores miss.",
		stableCore: [
			"GraphCast and GenCast outperformed specified operational baselines on many benchmark targets. A win across targets is different from the probability that each forecast will be right.",
			"A 2026 comparison found larger errors for several earlier AI models than a physics-based system on record-breaking heat, cold and wind. It did not test every newer model or ensemble."
		],
		openQuestions: [
			"How well do newer systems predict unprecedented extremes and small-scale local hazards?",
			"Do benchmark gains persist in independent, real-time operational comparisons?"
		],
		whatWouldChangeMinds: [
			"Prospective comparisons using matched starting data, lead times and difficult event sets.",
			"Transparent verification of both average skill and calibrated extreme-event probabilities."
		],
		misconceptions: [
			"Winning 90% of evaluated targets does not mean a forecast has 90% accuracy for every event.",
			"A deterministic forecast and an ensemble that estimates probabilities answer different questions."
		],
		editorSummary: "AI weather models have substantial benchmark gains, with important model- and event-specific limits.",
		population: "Global medium-range model evaluations, probabilistic ensembles, local station outputs and record-extreme comparisons.",
		scope: "Compare named AI and numerical systems on matched forecast targets, separating average scores, probabilities and unprecedented events.",
		excludedEvidence: [
			"Keep performance of older named models separate from untested later AI systems.",
			"Do not equate faster computation, benchmark wins or selected local results with universal forecast superiority."
		],
		uncertainty: "Models evolve quickly, benchmarks and baselines differ, and rare extremes are difficult to evaluate reliably.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.forecast2,
			sources.forecast3,
			sources.forecast1,
			sources.forecast4
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "do-tornado-warnings-reduce-deaths",
		title: "Do tornado warnings reduce deaths?",
		bottomLine: "US research supports a life-saving role for effective warnings, especially when people can receive them and reach shelter. The size of the benefit is uncertain. Radar, communication, shelter access and other changes often occur together.",
		stableCore: [
			"Historical US studies link improved radar and warning performance with lower expected casualties after accounting for several storm and exposure factors. These comparisons were observational.",
			"Warning research also shows that receiving a message is only one step. Interviews describe people actively managing tornado risk while facing barriers to finding a safe place."
		],
		openQuestions: [
			"Which warning and shelter improvements save the most lives in current systems?",
			"How do nighttime risk, disability, housing and language affect warning access and response?"
		],
		whatWouldChangeMinds: [
			"Independent evaluations that separate communication changes from radar, exposure and shelter improvements.",
			"Current, geographically varied evidence linking warning receipt and feasible protective actions to outcomes."
		],
		misconceptions: [
			"A historical false-alarm association does not establish that a new warning is safe to ignore.",
			"A person may understand a warning yet lack time, transport or safe shelter."
		],
		editorSummary: "Effective tornado warnings can save lives, with benefits shaped by communication and access to protection.",
		population: "US tornado records, alert-system research and qualitative survivor studies; effects are not assumed identical worldwide.",
		scope: "Assess warning-system contributions to tornado casualties while distinguishing receipt, response, shelter access and accompanying technology changes.",
		excludedEvidence: [
			"Do not interpret before-and-after radar comparisons as randomized warning-only treatment effects.",
			"Keep tornado fatalities, injuries, reported intentions and qualitative accounts as distinct outcomes."
		],
		uncertainty: "Warning technologies, exposure, housing and response vary, and much mortality evidence is historical and observational.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.warning3,
			sources.warning1,
			sources.warning2,
			sources.warning4
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "do-cities-change-rainfall",
		title: "Do cities change rainfall?",
		bottomLine: "Yes, cities can change where and how often rain falls. Many studies find more rain over or downwind of cities, but heavier downpours do not increase everywhere. Climate, wind direction and the measure of rainfall all matter.",
		stableCore: [
			"A meta-analysis and a global city comparison support urban rainfall changes, with substantial differences across locations and climate zones.",
			"Newer studies distinguish more frequent light rain from the intensity of the heaviest rain. Some find weaker extremes within cities alongside enhancement farther downwind."
		],
		openQuestions: [
			"How much of each city's rain pattern comes from urban surfaces rather than its location?",
			"Which city features alter heavy-rain risk under different weather conditions?"
		],
		whatWouldChangeMinds: [
			"Consistent results across radar, gauges and satellite measurements with carefully matched rural comparisons.",
			"Long-term observations and realistic model experiments that separate heat, roughness, pollution and terrain."
		],
		misconceptions: [
			"More annual rain, more rainy hours and stronger extreme rainfall are different findings.",
			"Flood damage also depends on drainage, buildings and exposure, not only rainfall changes."
		],
		editorSummary: "Urban rainfall effects are real but vary by location, storm conditions and rainfall intensity.",
		population: "Global urban-rural analyses, a quantitative literature synthesis and North American conurbations.",
		scope: "Distinguish urban changes in rain frequency, total amount and extremes, including upwind and downwind differences.",
		excludedEvidence: [
			"Do not apply an average city effect to every city or individual storm.",
			"Separate urban precipitation changes from runoff increases caused by paved surfaces."
		],
		uncertainty: "Urban and rural areas differ in terrain and climate, and datasets, comparison boundaries and intensity measures vary.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.urban1,
			sources.urban2,
			sources.urban3,
			sources.urban4
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "is-climate-change-increasing-clear-air-turbulence",
		title: "Is climate change increasing clear-air turbulence?",
		bottomLine: "Research points to greater clear-air turbulence risk in several regions as warming changes upper-level winds. Atmospheric analyses show increases, and many models project more. The size and human contribution vary by region; these results are not a count of every bumpy flight.",
		stableCore: [
			"Long-term atmospheric analyses find increases in conditions linked to clear-air turbulence at cruising altitudes. Estimates depend on the diagnostic used.",
			"Models generally project increases in several regions, but attribution and regional agreement differ. North Atlantic and North Pacific changes can be hard to separate from natural variability."
		],
		openQuestions: [
			"How closely do atmospheric indicators track actual aircraft encounters across changing routes?",
			"Which regional future changes remain robust across models and turbulence diagnostics?"
		],
		whatWouldChangeMinds: [
			"Independent aircraft measurements and atmospheric analyses that agree on regional trends.",
			"Improved turbulence diagnostics and models that narrow attribution and projection uncertainty."
		],
		misconceptions: [
			"A change in one location's modeled severe-turbulence duration is not a worldwide change in accidents.",
			"Clear-air turbulence, storm turbulence and a particular flight's conditions are different questions."
		],
		editorSummary: "Warming-related changes in upper-level winds support increasing turbulence risk, with substantial regional uncertainty.",
		population: "Cruising-altitude atmospheric reanalyses, turbulence diagnostics and regional climate-model projections.",
		scope: "Assess clear-air turbulence conditions and projected risk while separating diagnostic trends, regional attribution and observed flight outcomes.",
		excludedEvidence: [
			"Keep clear-air turbulence separate from turbulence generated directly by thunderstorms.",
			"Do not convert a diagnostic trend into an identical trend in flight encounters, injuries or crashes."
		],
		uncertainty: "Diagnostics differ, aircraft exposure changes, and natural variability can obscure regional human-caused signals.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.turbulence2,
			sources.turbulence1,
			sources.turbulence4,
			sources.turbulence3
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "do-ensemble-forecasts-improve-weather-predictions",
		title: "Do ensemble forecasts improve weather predictions?",
		bottomLine: "Ensembles can improve forecasts of risk by showing a range of possible weather outcomes. Their value depends on the model, calibration and decision. More model runs do not automatically give a better forecast or trustworthy probabilities.",
		stableCore: [
			"Operational guidance uses ensembles to represent uncertainty and produce probabilities rather than relying on one detailed scenario. Calibration and comparison with observed outcomes remain essential.",
			"Research questions some common reliability tests and claimed benefits under particular information metrics. A useful probability forecast and an accurate single best guess need different evaluations."
		],
		openQuestions: [
			"Which ensemble designs provide the most useful information for rare local hazards?",
			"How should calibration account for changing models, climates and forecast lead times?"
		],
		whatWouldChangeMinds: [
			"Independent comparisons with well-calibrated alternatives using matched events and decision costs.",
			"Reliability tests that examine both average behavior and event-specific probability errors."
		],
		misconceptions: [
			"Models can agree because they share a bias; small spread alone does not prove low risk.",
			"The ensemble mean can smooth out a local extreme that appears in individual scenarios."
		],
		editorSummary: "Ensembles support weather-risk prediction when their probabilities and comparisons are well evaluated.",
		population: "Operational ensemble guidance, forecast-reliability research and methodological critiques of forecast information.",
		scope: "Evaluate probabilistic ensemble information separately from single-forecast accuracy, calibration and decision value.",
		excludedEvidence: [
			"Do not infer calibrated probabilities from member agreement or a flat rank histogram alone.",
			"Keep an information-metric critique of a particular comparison separate from every operational ensemble use."
		],
		uncertainty: "Ensembles share model errors, reliability metrics can be misleading, and benefits depend on the forecast target and user decision.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.ecmwf,
			sources.ensemble3,
			sources.ensemble2,
			sources.ensemble1
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "how-reliable-are-seasonal-weather-forecasts",
		title: "How reliable are seasonal weather forecasts?",
		bottomLine: "They can provide useful odds for seasonal averages, but skill varies greatly by place, season and weather measure. Some regions and climate patterns are easier to predict than others. A seasonal outlook does not specify the weather on each day months ahead.",
		stableCore: [
			"Global model comparisons find different levels of skill across regions and precipitation thresholds. Strong performance in one region or season does not establish strong performance everywhere.",
			"Sahel outlooks show useful but uneven rainfall skill, while a Southern Hemisphere review finds many shorter-range temperature and rain forecasts lose skill quickly. Forecast timescale and the variable being predicted matter."
		],
		openQuestions: [
			"Which regional forecasts remain reliable when tested on new seasons?",
			"How much can better observations, bias correction and model combinations improve difficult rainfall forecasts?"
		],
		whatWouldChangeMinds: [
			"Long prospective verification showing calibrated probabilities for specific regions and seasons.",
			"Consistent improvements across independent observations and clearly defined rainfall or temperature outcomes."
		],
		misconceptions: [
			"Predicting a wetter season does not predict which particular days will be wet.",
			"Skill measured on past model runs can differ from skill in future operational forecasts."
		],
		editorSummary: "Seasonal outlooks offer conditional skill for climate averages, with strong regional and outcome differences.",
		population: "Global seasonal-model evaluations, Sahel outlook verification and Southern Hemisphere subseasonal research.",
		scope: "Separate seasonal-average and event probabilities from daily weather detail and distinguish region, variable and forecast timescale.",
		excludedEvidence: [
			"Do not transfer one region's model ranking or skill score to the whole world.",
			"Keep short-range weather-sequence limits separate from predictability of broader seasonal climate patterns."
		],
		uncertainty: "Model errors, regional climate drivers, observational differences and limited independent verification affect forecast skill.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.seasonal2,
			sources.seasonal1,
			sources.seasonal5,
			sources.seasonal6
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "can-el-nino-be-predicted-months-in-advance",
		title: "Can El Niño be predicted months in advance?",
		bottomLine: "Yes, useful forecasts are often possible months ahead, but the start and strength of each event remain uncertain. Skill depends on the season, model and event. Forecasts that cross northern spring are especially challenging.",
		stableCore: [
			"An assessment of more than two decades of real-time forecasts found useful advance information, particularly from dynamical models, with accuracy declining at longer leads.",
			"New models and historical experiments show ways to improve longer-range predictions. Promising test results do not establish the same skill for every future El Niño or La Niña onset."
		],
		openQuestions: [
			"How consistently can newer models predict onset across the spring barrier in real time?",
			"Which ocean-basin interactions most improve forecasts of event strength and multiyear La Niña?"
		],
		whatWouldChangeMinds: [
			"Prospective tests on new ENSO events with clearly reported onset, strength and probability accuracy.",
			"Independent replication of longer-lead gains across models and observation datasets."
		],
		misconceptions: [
			"A model showing skill at sixteen months does not guarantee sixteen months of useful warning for every event.",
			"An ENSO forecast does not determine the exact local weather in every country."
		],
		editorSummary: "ENSO forecasts can be useful months ahead, with persistent seasonal and event-specific limits.",
		population: "Real-time IRI ENSO forecasts, long historical model experiments and newer tropical-ocean prediction models.",
		scope: "Assess advance prediction of ENSO state, onset and strength, separating operational forecasts from retrospective model tests.",
		excludedEvidence: [
			"Keep El Niño and La Niña onset skill distinct from prediction of their local weather impacts.",
			"Do not treat hindcast performance or selected spring starts as a guaranteed lead time."
		],
		uncertainty: "Forecast errors vary with springtime conditions, event type, model training and the limited number of independent ENSO transitions.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.enso1,
			sources.enso2,
			sources.enso3,
			sources.enso4
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "are-tornadoes-becoming-more-common-in-the-united-states",
		title: "Are tornadoes becoming more common in the United States?",
		bottomLine: "A simple nationwide increase has not been established. Records show shifts in where and when tornadoes occur, with more tornadoes clustering on some busy days. Changing detection and damage reports make long-term totals difficult to compare.",
		stableCore: [
			"Studies find relatively stable national annual counts in several analyses, alongside changes in regional occurrence, tornado days and outbreak days.",
			"Better reporting can raise recorded counts without an equal rise in actual storms. Bias-corrected estimates and recent regional analyses still leave uncertainty about long-term changes and their causes."
		],
		openQuestions: [
			"How much do regional trends reflect climate changes, natural variability or reporting practices?",
			"Can more consistent observations improve estimates of weak, rural and poorly documented tornadoes?"
		],
		whatWouldChangeMinds: [
			"Long, consistently observed records showing robust changes after reporting-bias correction.",
			"Agreement between observed tornado behavior, environmental changes and physically credible attribution studies."
		],
		misconceptions: [
			"More tornadoes on an outbreak day can occur alongside fewer tornado days in a year.",
			"A rising regional trend does not establish a rising national total or its cause."
		],
		editorSummary: "US tornado records show regional and clustering changes; a simple national frequency trend remains uncertain.",
		population: "US tornado reports, central-US reporting-bias models and national/regional analyses spanning different historical periods.",
		scope: "Distinguish individual tornado counts, tornado days, outbreak clustering, regional shifts and attribution in US records.",
		excludedEvidence: [
			"Do not treat improved detection of weak storms as an equal increase in actual tornado occurrence.",
			"Keep damage ratings, population exposure and climate attribution separate from raw report totals."
		],
		uncertainty: "Observation practices, rural underreporting, damage surveys, regional variability and record length complicate trends.",
		band: "unclear",
		certainty: "low",
		sources: [
			sources.tornado4,
			sources.tornado1,
			sources.tornado2,
			sources.tornado3
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "can-forecasters-predict-rapid-hurricane-intensification",
		title: "Can forecasters predict rapid hurricane intensification?",
		bottomLine: "Yes, some rapid intensification can be predicted, and guidance has improved. It remains much harder than predicting many routine changes in storm strength. Useful probabilities do not remove the risk of a missed event or false alarm.",
		stableCore: [
			"Operational reviews document improving intensity and rapid-intensification guidance, including gains after about 2015. Progress depends on the model, ocean basin and verification measure.",
			"New satellite and ensemble methods show better detection or more reliable availability in evaluated settings. Regional test performance does not establish equal skill for every future storm."
		],
		openQuestions: [
			"Which gains transfer across basins, unusual storms and missing observation data?",
			"How well do new tools balance detection, false alarms and useful warning time in real operations?"
		],
		whatWouldChangeMinds: [
			"Independent real-time verification across multiple seasons and ocean basins.",
			"Consistent improvements using matched intensification thresholds, lead times and false-alarm definitions."
		],
		misconceptions: [
			"A percentage improvement in an error metric is different from the percentage of events correctly predicted.",
			"Different studies can use different thresholds for rapid intensification, which changes apparent skill."
		],
		editorSummary: "Rapid-intensification guidance is improving while remaining a difficult and consequential forecasting problem.",
		population: "Operational tropical-cyclone centers and retrospective or independent evaluations of intensity guidance.",
		scope: "Assess useful prediction of rapid intensity increases, separating operational performance, model benchmarks and guidance availability.",
		excludedEvidence: [
			"Do not equate overall intensity forecast error with skill at detecting rapid intensification.",
			"Keep northwest Pacific test results and center-specific decision thresholds separate from universal forecast accuracy."
		],
		uncertainty: "Rare events, changing definitions, basin differences, observation gaps and operational baselines limit comparisons.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.intensity2,
			sources.intensity1,
			sources.intensity4,
			sources.intensity3
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "are-tropical-cyclones-becoming-more-frequent-worldwide",
		title: "Are tropical cyclones becoming more frequent worldwide?",
		bottomLine: "Evidence does not show a uniform worldwide rise in the number of tropical cyclones. Trends depend on the ocean basin, period and method. Storm frequency is also separate from intensity, rainfall and coastal flooding risk, which can change in different directions.",
		stableCore: [
			"Historical records and reconstructions have uneven coverage, especially before satellites. Some reconstructions and model studies suggest declining global frequency, while Atlantic analyses can show increasing activity.",
			"Expert assessments distinguish observed changes from future projections. A rising share of very intense storms or heavier storm rain does not require a rise in the total number of storms."
		],
		openQuestions: [
			"How reliably can early storm counts be reconstructed across all ocean basins?",
			"How will storm formation, tracks and survival change under future warming and aerosol changes?"
		],
		whatWouldChangeMinds: [
			"Independent reconstructions that agree after accounting for historical observation gaps.",
			"Consistent observed and modeled changes with clear separation of global and basin-specific effects."
		],
		misconceptions: [
			"Hurricane counts in one basin do not represent the whole world's tropical cyclones.",
			"Fewer storms overall can coexist with greater rainfall or a higher proportion of intense storms."
		],
		editorSummary: "Global cyclone frequency is uncertain and region-dependent; other hazard measures can increase independently.",
		population: "Global and Atlantic historical reconstructions, climate simulations and expert tropical-cyclone assessments.",
		scope: "Assess total tropical-cyclone frequency, separating basin trends, observational reconstruction and conditional future projections.",
		excludedEvidence: [
			"Keep total storm count distinct from accumulated energy, peak intensity and the proportion of intense storms.",
			"Do not interpret a share of models or an assessment team's confidence as a population survey of scientists."
		],
		uncertainty: "Incomplete historical observations, reconstruction methods, model resolution and large natural variability affect trend attribution.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.frequency1,
			sources.frequency2,
			sources.frequency3,
			sources.frequency4,
			sources.frequency5
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "does-saharan-dust-weaken-hurricanes",
		title: "Does Saharan dust weaken hurricanes?",
		bottomLine: "It can contribute to conditions that hinder storm growth, but the effect is not a dependable rule. Dry air, changing winds, storm stage and cloud processes matter. Some hurricanes continue to intensify despite nearby Saharan air.",
		stableCore: [
			"An Atlantic storm analysis found dust abundance alone was a poor indicator that a storm would fail to intensify. Dryness and winds changing with height also mattered.",
			"Model experiments show different effects across storm stages and dust processes. A satellite-based rainfall study finds a nonlinear relationship, but rainfall is a different outcome from wind intensity."
		],
		openQuestions: [
			"Which dust effects can be separated from the surrounding dry air and wind conditions?",
			"How well do these mechanisms improve independent operational hurricane forecasts?"
		],
		whatWouldChangeMinds: [
			"Independent observations and model tests that isolate dust processes across many storm stages.",
			"Prospective forecast improvements that remain useful after accounting for humidity, winds and ocean conditions."
		],
		misconceptions: [
			"Nearby dust does not establish that a storm will weaken or fail to form.",
			"A change in cyclone rainfall is not automatically the same change in peak wind speed."
		],
		editorSummary: "Saharan dust effects on hurricanes depend on the storm and environment; dust alone is a poor predictor of weakening.",
		population: "Atlantic named storms, paired hurricane simulations, satellite rainfall data and high-resolution climate experiments.",
		scope: "Separate dust, dry-air and wind effects on storm intensification from effects on rainfall and storm frequency.",
		excludedEvidence: [
			"Do not infer an individual storm's future strength from a dust map alone.",
			"Keep correlations, two-storm sensitivity experiments and climate-average simulations as different evidence types."
		],
		uncertainty: "Dust and weather conditions co-vary, effects can change sign, and observational and model comparisons measure different outcomes.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.dust3,
			sources.dust2,
			sources.dust1,
			sources.dust4
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "do-heat-health-warnings-reduce-deaths",
		title: "Do heat-health warnings reduce deaths?",
		bottomLine: "They can help, especially as part of a plan that enables protective action, but benefits vary. Studies of broader heat-prevention plans often find lower deaths. Evidence isolating the effect of an alert alone is less consistent.",
		stableCore: [
			"A large European analysis links heat-prevention plans with lower heat-related mortality. Such plans combine alerts with actions and support, so their benefit cannot be assigned entirely to warning messages.",
			"German and Korean studies find varying results across cities, statistical models and population groups. An average or adjusted benefit does not establish equal protection for everyone."
		],
		openQuestions: [
			"Which warning features and practical support reduce deaths most effectively?",
			"How do housing, health, city infrastructure and access to cooling affect the benefit?"
		],
		whatWouldChangeMinds: [
			"Independent evaluations that separate alert messages from accompanying heat-protection measures.",
			"Replicated effects across cities and populations using prespecified models and meaningful health outcomes."
		],
		misconceptions: [
			"Fewer deaths after a whole prevention plan does not isolate the effect of a warning alone.",
			"A useful warning still depends on people being able to act on it."
		],
		editorSummary: "Heat-warning benefits depend on local conditions and accompanying protections; alert-only mortality evidence is mixed.",
		population: "Heat-warning and prevention-plan studies in European and Korean cities, plus a systematic review of warning design.",
		scope: "Distinguish alert-only effects from broader heat-health plans and preserve city, subgroup and statistical-model differences.",
		excludedEvidence: [
			"Do not treat observational plan effects as randomized estimates for warning messages alone.",
			"Keep heat-attributable mortality, all-cause mortality and subgroup findings as separate outcomes."
		],
		uncertainty: "Plans contain several actions, cities differ, and observational estimates can change with model adjustment and the outcome studied.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.heat1,
			sources.heat3,
			sources.heat2,
			sources.heat4
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "do-flood-warnings-reduce-property-damage",
		title: "Do flood warnings reduce property damage?",
		bottomLine: "They can help when people have time, knowledge and practical ways to respond. The size of the benefit remains uncertain. Much evidence relies on surveys or observational comparisons that cannot fully separate warnings from preparedness and other flood protection.",
		stableCore: [
			"A systematic review finds limited evidence isolating the monetary value of flood warnings. Many studies estimate actions or avoided losses through surveys, expert judgment or models.",
			"German property-level data link better outcomes to knowing how to act on warnings. A Japanese flood analysis links warning-performance history with losses, but one event cannot establish a universal causal effect."
		],
		openQuestions: [
			"Which warning improvements reduce measured losses after response costs are included?",
			"How do housing, warning time, flood type and practical support affect what people can protect?"
		],
		whatWouldChangeMinds: [
			"Independent property-level evaluations with credible comparisons and measured response costs.",
			"Consistent benefits across different flood events, communities and warning technologies."
		],
		misconceptions: [
			"Receiving a warning does not establish that a household could take an effective protective action.",
			"Reported actions, modeled avoided damage and directly measured losses are different forms of evidence."
		],
		editorSummary: "Flood warnings can support damage reduction, with benefit depending on preparedness and feasible response.",
		population: "International economic reviews, German household loss surveys and Japanese municipal flood data.",
		scope: "Assess property-loss reduction and response costs while separating warning receipt, preparedness and other protection measures.",
		excludedEvidence: [
			"Keep property-damage findings separate from mortality or evacuation outcomes.",
			"Do not treat survey estimates, modeled benefits and one-event regressions as interchangeable causal measurements."
		],
		uncertainty: "Warning systems and floods differ, response options are unequal, and measured economic effects are difficult to isolate.",
		band: "broad",
		certainty: "low",
		sources: [
			sources.flood1,
			sources.flood2,
			sources.flood3,
			sources.flood4
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "can-wildfires-create-thunderstorms",
		title: "Can wildfires create thunderstorms?",
		bottomLine: "Yes. Intense fires can drive deep storm clouds called pyrocumulonimbus, sometimes producing lightning and sending smoke high into the atmosphere. Many fires do not do this, and not every fire-generated storm produces much lightning or useful rain.",
		stableCore: [
			"Satellite and ground observations document fire-generated storms in multiple regions. A global inventory confirmed hundreds of events during 2013-2023.",
			"These storms can loft smoke near or above the tropopause. Lightning varies greatly between events, and the presence of a tall smoke plume alone does not establish the same storm behavior."
		],
		openQuestions: [
			"Which fire and atmospheric conditions best predict the development and behavior of these storms?",
			"How are long-term occurrence and smoke impacts changing once differences in observation are accounted for?"
		],
		whatWouldChangeMinds: [
			"Sustained global observations that improve event identification and resolve long-term changes.",
			"Independent tests of forecasts for storm formation, lightning and smoke-injection height."
		],
		misconceptions: [
			"A thunderstorm cloud does not guarantee enough rain to extinguish the fire beneath it.",
			"A volcano-like mass of smoke does not mean fire smoke has the same composition or climate effects as volcanic material."
		],
		editorSummary: "Fire-generated thunderstorms are directly observed, with varied lightning, rainfall and smoke-injection behavior.",
		population: "Observed fire storms in North America and other regions, global event inventories and targeted lightning studies.",
		scope: "Establish the observed fire-thunderstorm phenomenon while distinguishing storm formation, lightning, rainfall and smoke injection.",
		excludedEvidence: [
			"Keep ordinary smoke plumes and shallow fire clouds separate from confirmed deep thunderstorms.",
			"Do not infer a long-term trend or a fixed lightning output from a record season or a few events."
		],
		uncertainty: "Occurrence and individual storm behavior remain harder to predict than the existence of the phenomenon itself.",
		band: "strong",
		certainty: "high",
		sources: [
			sources.pyro2,
			sources.pyro3,
			sources.pyro1,
			sources.pyro4
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "does-air-pollution-change-lightning-activity",
		title: "Does air pollution change lightning activity?",
		bottomLine: "It can affect storms, but there is no simple rule that more pollution means more lightning. Effects depend on particle type, amount, humidity and storm conditions. Studies find both enhancement and suppression, with important limits on separating pollution from weather.",
		stableCore: [
			"Reviews and observations support interactions between particles, clouds and storm electricity. Urban heat, buildings and weather patterns also change alongside pollution.",
			"Studies in African, Chinese and shipping-lane settings find nonlinear or case-dependent effects. Dust and smoke can behave differently, and model estimates do not transfer automatically across regions."
		],
		openQuestions: [
			"Which particle effects can be isolated from humidity, atmospheric instability and urban heat?",
			"Do observed relationships persist across independent lightning networks and cleaner-air policy changes?"
		],
		whatWouldChangeMinds: [
			"Independent long-term observations and well-constrained experiments that separate competing processes.",
			"Consistent predictions across particle types, pollution levels and weather conditions."
		],
		misconceptions: [
			"A particle-cloud mechanism can strengthen a storm under one set of conditions and weaken it under another.",
			"Lightning counts along shipping lanes do not isolate emissions from every other environmental difference."
		],
		editorSummary: "Pollution-lightning relationships are complex, with conditional effects and uncertain causal size.",
		population: "Urban and regional lightning observations, aerosol research and shipping-emission model experiments.",
		scope: "Assess aerosol influences on lightning while distinguishing particle type, pollution level, thermodynamics and urban co-factors.",
		excludedEvidence: [
			"Do not apply one region's aerosol threshold or three-case model percentage worldwide.",
			"Keep cloud-to-ground lightning, all detected flashes and inferred storm mechanisms as distinct measures."
		],
		uncertainty: "Weather and pollution co-vary, lightning observations differ, and competing cloud and radiation processes can change the response.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.aerosol1,
			sources.aerosol2,
			sources.aerosol3,
			sources.aerosol4
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "do-forests-support-regional-rainfall",
		title: "Do forests support regional rainfall?",
		bottomLine: "Yes, forests recycle water into the air and can support regional rain, especially in the tropics. Local effects vary by season and scale. A cleared patch may receive more wet-season rain even while the wider region loses moisture and becomes drier.",
		stableCore: [
			"Moisture-recycling research and broad tropical comparisons link forest loss with reduced rain at larger scales. Results differ across observation datasets and regions.",
			"Amazon studies show that local circulation can raise wet-season rain over cleared land while dry-season rain and rain farther away decline. Local and regional effects need not point in the same direction."
		],
		openQuestions: [
			"How large are rainfall effects outside tropical forests, including drylands and temperate regions?",
			"How much do different patterns of forest loss or recovery affect downwind moisture and seasonal rainfall?"
		],
		whatWouldChangeMinds: [
			"Independent observations and moisture-tracking analyses that agree across spatial scales and seasons.",
			"Credible comparisons of forest change that account for background climate variability and measurement limits."
		],
		misconceptions: [
			"More rain over a cleared patch does not establish a benefit to the whole region's water cycle.",
			"A forest-rainfall relationship does not mean any tree-planting project will produce a fixed local rain increase."
		],
		editorSummary: "Forests contribute to regional moisture recycling, with season- and scale-dependent rainfall effects.",
		population: "Tropical forest-loss observations, Amazon moisture tracking and a broader land-use scoping review.",
		scope: "Distinguish local circulation effects from regional moisture recycling across forest-change scales and seasons.",
		excludedEvidence: [
			"Keep pan-tropical satellite associations separate from universal causal effects in every forest biome.",
			"Do not transfer regional model-assisted attribution percentages directly to individual restoration projects."
		],
		uncertainty: "Measurements can disagree, forest loss and climate co-vary, and evidence is less complete outside tropical regions.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.forest2,
			sources.forest1,
			sources.forest3,
			sources.forest4
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "does-irrigation-change-regional-rainfall",
		title: "Does irrigation change regional rainfall?",
		bottomLine: "It can, but it does not reliably increase rain where water is applied. Irrigation changes moisture, surface cooling and winds. Rain may increase downwind, decrease locally or change little, depending on the region, season and weather conditions.",
		stableCore: [
			"Global observations find more afternoon rain events downwind of heavily irrigated areas, alongside differences in heavy-rain amounts. Frequency and total water are different outcomes.",
			"Regional models show varied responses, including local suppression and downwind increases. Different ways of representing convection can even reverse the modeled sign of the effect."
		],
		openQuestions: [
			"How much rainfall redistribution can be attributed to irrigation in different regions?",
			"Which model representations best match observations of local and downwind rain?"
		],
		whatWouldChangeMinds: [
			"Independent observations and realistic model experiments that converge on regional effects.",
			"Evaluations separating irrigation changes from natural weather variability and other land-use changes."
		],
		misconceptions: [
			"Water added to a field does not necessarily return as rain over the same field.",
			"More frequent rain events do not necessarily mean more heavy rain or enough water to offset extraction."
		],
		editorSummary: "Irrigation can redistribute rainfall, with regional effects that vary in size and direction.",
		population: "Global rainfall observations and regional model studies in the United States, Spain and Saudi Arabia.",
		scope: "Assess irrigation-driven rainfall changes separately from crop production, groundwater use and local cooling benefits.",
		excludedEvidence: [
			"Do not treat regional model differences as directly measured universal irrigation effects.",
			"Keep rainfall frequency, intensity, total amount and the wider water budget separate."
		],
		uncertainty: "Competing moisture and cooling effects, convection schemes, background weather and observation limits change estimated responses.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.irrigation1,
			sources.irrigation2,
			sources.irrigation3,
			sources.irrigation4
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "are-outdoor-warning-sirens-reliable-indoors",
		title: "Are outdoor warning sirens reliable indoors?",
		bottomLine: "No. US outdoor warning sirens are primarily designed to alert people outside and should not be relied on as an indoor warning channel. Their meaning and activation rules vary by community. Indoor alerts need a suitable channel, such as NOAA Weather Radio.",
		stableCore: [
			"National Weather Service guidance describes outdoor sirens as alerts for people outside. Local officials set activation policies, and hearing a siren does not provide the full warning message.",
			"US and French research finds gaps in coverage, interpretation and response. Hearing, understanding and being able to act on an alert are separate parts of an effective warning system."
		],
		openQuestions: [
			"Which combinations of warning channels best reach people indoors, asleep or with sensory impairments?",
			"How can local testing and communication reduce confusion about siren meanings?"
		],
		whatWouldChangeMinds: [
			"Independent tests of indoor reception and comprehension under realistic weather and building conditions.",
			"Evaluations showing which warning combinations improve timely, accessible protective response."
		],
		misconceptions: [
			"Hearing a siren indoors once does not establish that it will reliably reach that room during every storm.",
			"A siren's tone, test schedule or activation criteria may differ between neighboring communities."
		],
		editorSummary: "Outdoor sirens complement other warning channels; dependable indoor reception requires appropriate alerts.",
		population: "US outdoor-warning guidance, a NIST technical review, an Alabama university survey and French alert-system research.",
		scope: "Assess the intended reach and limitations of outdoor sirens while retaining local policy and national-system differences.",
		excludedEvidence: [
			"Do not generalize one community's siren thresholds or testing schedule nationwide.",
			"Keep audibility, message comprehension, reported preferences and demonstrated response as distinct outcomes."
		],
		uncertainty: "Indoor sound levels, building insulation, hearing, weather and local system design differ; survey samples do not represent every household.",
		band: "broad",
		certainty: "moderate",
		sources: [
			sources.nws,
			sources.siren1,
			sources.siren2,
			sources.siren3
		]
	}, novemberWeatherForecastingResearchCheckedAt),
	reviewedEntry({
		topicSlug: "weather-and-forecasting",
		slug: "is-arctic-warming-making-midlatitude-winters-more-extreme",
		title: "Is Arctic warming making midlatitude winters more extreme?",
		bottomLine: "This remains debated. Arctic warming can influence atmospheric circulation, but scientists disagree about how much it drives severe winters farther south. Effects vary by region and process, while large natural swings make the human-caused signal hard to isolate.",
		stableCore: [
			"Some observations and model experiments link Arctic changes to polar-vortex disruptions and regional cold outbreaks. Other work finds weak responses or no sustained increase in the proposed wave pattern.",
			"Coordinated model studies find small but robust circulation responses, sometimes alongside fewer or milder cold extremes. Different mechanisms, forcing experiments and winter outcomes should not be treated as one result."
		],
		openQuestions: [
			"Which Arctic-driven mechanisms materially change regional cold risk beyond natural variability?",
			"How can observations constrain the strength and regional pattern of modeled circulation responses?"
		],
		whatWouldChangeMinds: [
			"Independent observations and large model experiments that converge on mechanism, direction and effect size.",
			"Replicated attribution that separates sea-ice changes, ocean influences, snow cover and other climate drivers."
		],
		misconceptions: [
			"A correlation between low Arctic sea ice and a cold winter does not by itself establish causation.",
			"A change in jet-stream behavior is different from an identical change in every region's cold extremes."
		],
		editorSummary: "Arctic influences on severe midlatitude winters remain an active debate about mechanisms, size and regional effects.",
		population: "Northern Hemisphere winter observations, polar-vortex studies and coordinated sea-ice-forcing model experiments.",
		scope: "Assess specific Arctic-to-midlatitude winter mechanisms while distinguishing circulation responses, local cold extremes and internal variability.",
		excludedEvidence: [
			"Do not treat one cold outbreak or a short correlation period as proof of a general forced trend.",
			"Keep overlapping coordinated-model research, distinct forcing experiments and observational associations separate."
		],
		uncertainty: "The forced response is often small relative to natural variability, mechanisms differ, and observations and models can disagree.",
		band: "mixed",
		certainty: "low",
		sources: [
			sources.arctic4,
			sources.arctic1,
			sources.arctic2,
			sources.arctic5,
			sources.arctic6
		]
	}, novemberWeatherForecastingResearchCheckedAt)
];
