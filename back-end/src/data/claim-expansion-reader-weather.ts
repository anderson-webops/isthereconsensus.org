import type { SeedClaim } from "./claims.js";

export const weatherCheckedAt = "2026-10-05T16:44:10.000Z";

function reference(title: string, publisher: string, url: string, note: string, year?: number): SeedClaim["sources"][number] {
	return { kind: "technical_reference", title, publisher, url, note, year, stance: "supports", order: 1 };
}

export const readerWeatherSources = {
	pop: reference("What Does Probability of Precipitation Mean?", "NOAA National Weather Service, Louisville", "https://www.weather.gov/lmk/pops", "Original point, measurable-threshold and valid-period definitions checked. Historical map/grid and clock examples are not asserted as every current app's convention."),
	terms: reference("Forecast Terms: Precipitation Probability", "NOAA National Weather Service, Pago Pago", "https://www.weather.gov/ppg/forecast_terms", "Original measurable liquid-equivalent threshold and point/period scope checked. Regional time and warning tables are not generalized to every forecast service."),
	amount: reference("Probabilistic Quantitative Precipitation Forecasting", "NOAA National Weather Service, Tulsa", "https://www.weather.gov/tsa/pqpf_explaination", "Original distinction between event probability and amount-threshold exceedance checked. Historical example distributions and product computations are not assumed universal or current app algorithms."),
	humidity: reference("A Discussion of Water Vapor, Humidity, Dewpoint and Precipitation", "NOAA National Weather Service, Louisville", "https://www.weather.gov/lmk/humidity", "Original relative/absolute/specific humidity and saturation-versus-precipitation distinctions checked. No regional comfort scale, storm forecast or air-as-a-sponge mechanism adopted."),
	dewpoint: reference("Dew Point vs. Humidity", "NOAA National Weather Service, La Crosse", "https://www.weather.gov/arx/why_dewpoint_vs_humidity", "Original constant-pressure dew-point definition and temperature-dependent RH examples checked. Comfort categories are not physiological safety thresholds or universal individual responses."),
	cycle: reference("The Water Cycle: Condensation and Deposition", "NOAA Education", "https://www.noaa.gov/education/resource-collections/freshwater/water-cycle", "Original condensation onto surfaces, vapor/liquid/ice and atmospheric transport distinctions checked. Pool percentages and linked external studies are not used as new evidence."),
	frost: reference("Frost-Freeze Climatology and Information", "NOAA National Weather Service, Charleston", "https://www.weather.gov/rlx/frost-freeze-information", "Original deposition/frozen-dew and observation-height/radiative-cooling explanations checked. Local forecast criteria, historical dates and agricultural damage predictions are excluded."),
	chill: reference("Wind Chill Questions: Inanimate Objects", "NOAA National Weather Service", "https://www.weather.gov/safety/cold-faqs", "Original convective cooling-rate versus air-temperature distinction checked. Historical warning criteria, medical advice and exposure-time tables are not adopted; other heat-transfer processes remain distinct."),
	heat: reference("Heat Forecast Tools: Heat Index and WBGT", "NOAA National Weather Service", "https://www.weather.gov/safety/heat-index", "Original shade/light-wind heat-index assumptions and additional WBGT inputs checked. No personal safe-work duration, medical diagnosis or current warning threshold inferred."),
	wbgt: reference("Wet Bulb Globe Temperature vs. Heat Index", "NOAA National Weather Service, Wichita", "https://www.weather.gov/ict/wbgt", "Original different inputs, sunlight and exposure assumptions checked. WBGT is not ordinary psychrometric wet-bulb temperature, a universal health verdict or an interchangeable heat-index number."),
	ratio: reference("What Are Snow Ratios?", "NOAA National Weather Service, La Crosse", "https://www.weather.gov/arx/why_snowratios", "Original variable snow-depth/liquid-water ratio and within-event changes checked. The uncited historical Upper Midwest average is not adopted as a new universal ratio."),
	snow: reference("Science of Snow", "NSIDC, CIRES at the University of Colorado Boulder", "https://nsidc.org/learn/parts-cryosphere/snow/science-snow", "Original snow aloft, above-freezing surface arrival and snowpack-change distinctions checked. Educational temperature rules are not hard impossibility thresholds or a local accumulation forecast."),
	profile: reference("Skew-T Examples: Snow, Ice Pellets and Freezing Rain", "NOAA JetStream", "https://www.noaa.gov/jetstream/upperair/skewt_samples", "Original illustrative vertical temperature profiles and supercooled liquid versus refrozen pellets checked. Example heights, road-icing temperatures and casualty claims are not universal rules."),
	precip: reference("What Is Precipitation?", "NASA Space Place team at JPL for NOAA NESDIS", "https://www.nesdis.noaa.gov/about/k-12-education/atmosphere/what-precipitation", "Original August 27, 2025 educational precipitation-type definitions checked. Simplified all-below-freezing snow diagram is a sufficient example, not a necessary surface-temperature condition.", 2025),
	hail: reference("Thunderstorm Hazards: Hail", "NOAA JetStream", "https://www.noaa.gov/jetstream/hail", "Original elevated cold-growth region, updraft support and melting on descent checked. Regional frequencies, idealized repeated trajectories and size/speed tables are not generalized or used as a forecast."),
	radar: reference("Doppler and Dual-Polarization Weather Radar", "NOAA National Weather Service, Melbourne", "https://www.weather.gov/mlb/Doppler_Dual_Pol_Weather_Radar", "Original reflectivity, scan height and non-precipitation target explanations checked. Legacy radar dates and example color scales do not define every modern processed product."),
	radarErrors: reference("Precipitation Processing Methodology: Sources of Error", "NOAA National Weather Service, Arkansas-Red Basin River Forecast Center", "https://www.weather.gov/abrfc/pcpn_methods", "Original virga, blockage, anomalous propagation, range and reflectivity/rainfall-relation limits checked. Historical method descriptions are not an audit of a current app or an all-radar error rate."),
	satellite: reference("How to Use the Interactive Satellite Maps: Infrared Imagery", "NOAA NESDIS", "https://www.nesdis.noaa.gov/imagery/interactive-maps/how-use-the-interactive-satellite-maps", "Original emitted-infrared brightness-temperature and surface/cloud-top interpretation checked. Sensor examples and palette meanings are product-specific, not universal colors or a surface air-thermometer reading."),
	ir: reference("Infrared Imagery Explanation", "NOAA Climate Prediction Center", "https://www.cpc.ncep.noaa.gov/products/humanitarian/IRinfo.html", "Original cold-cloud versus precipitation caveat and cold-surface ambiguity checked. Historical regional viewer and refresh timing are not treated as current global product guarantees."),
	pressure: reference("Air Pressure: Height and Sea-Level Reduction", "NOAA JetStream", "https://www.noaa.gov/jetstream/atmosphere/air-pressure", "Original altitude, measured station pressure and common-datum explanations checked. Quoted nineteenth-century forecasting folklore and fixed-container examples are not adopted as modern forecast laws."),
	datum: reference("Constant Pressure vs. Constant Elevation", "NOAA JetStream", "https://www.noaa.gov/jetstream/upper-air-charts/verses", "Original surface isobars versus upper-air constant-pressure height charts checked. Simplified density examples do not prescribe a station correction or establish a specific forecast."),
	fronts: reference("Air Masses: Air Mass Boundaries", "NOAA JetStream", "https://www.noaa.gov/jetstream/synoptic/air-masses", "Original three-dimensional sloping fronts and associated lifting checked. Typical cloud/precipitation patterns are conditional, not guaranteed arrival times or storm intensities."),
	map: reference("How to Read a Weather Map", "NOAA NESDIS", "https://www.nesdis.noaa.gov/about/k-12-education/weather-forecasting/how-read-weather-map", "Original surface frontal symbols and replacement-of-air-mass definitions checked. Simplified cardinal movement examples and forecast horizons are not universal laws or current product rankings.")
} satisfies Record<string, SeedClaim["sources"][number]>;

interface WeatherReview {
	key: string;
	title: string;
	slug: string;
	bottomLine: string;
	stableCore: string[];
	editorSummary: string;
	qualification: string;
	question: string;
	gap: string;
	tags: string[];
	sources: Array<keyof typeof readerWeatherSources>;
}

const reviews: WeatherReview[] = [
	{
		key: "chance",
		title: "Does a 40% chance of rain mean rain for 40% of the day?",
		slug: "does-a-40-percent-chance-of-rain-mean-rain-for-40-percent-of-the-day",
		bottomLine: "No. In the cited National Weather Service definition, the percentage estimates whether measurable precipitation will occur at the forecast point during the stated period. It does not specify how much of that period will be wet, nor promise that exactly that fraction of the surrounding area receives rain. The point, event threshold and valid period matter.",
		stableCore: ["The same probability can accompany a brief shower or a longer wet spell. Those outcomes differ in duration while both meet the event definition. A forecast map can assign different point probabilities across a region; an individual number is not a literal map of which streets will be wet. The cited NWS threshold is at least 0.01 inches of liquid or liquid-equivalent precipitation. Other services may define a displayed chance differently, so their own legend remains necessary.", "The period also changes the question. A forecast for an afternoon concerns precipitation during that afternoon, not necessarily at its opening minute or throughout every hour. A daily forecast and an hourly product can have different valid periods, update times or calculations. Their numbers cannot be compared as though every label meant the same event. The institutional examples explain interpretation; they are not evidence that a particular weather application is calibrated, current or displaying that exact NWS product."],
		editorSummary: "Before interpreting a 40 percent rain chance, identify where, when and what counts as precipitation. Then seek separate timing and accumulation information if those are the questions that matter. This review does not predict tomorrow's weather or supply a tested rain-app ranking. It adds the event-definition boundary to existing general probability content rather than claiming a new statistical law. An isolated dry outcome does not tell you the duration the forecast predicted, because this percentage never specified that duration.",
		qualification: "Cited U.S. NWS point/event/period convention; not every app's definition, forecast verification or location-specific prediction.",
		question: "Which location, threshold and valid period does the displayed probability describe?",
		gap: "Adds the weather-product reference event and duration boundary; existing climate or generic percentage reviews do not define a displayed rain chance.",
		tags: ["chance rain forty percent day duration forecast", "probability precipitation point time threshold"],
		sources: ["pop", "terms"]
	},
	{
		key: "amount",
		title: "Does a higher chance of rain necessarily mean heavier rainfall?",
		slug: "does-a-higher-chance-of-rain-necessarily-mean-heavier-rainfall",
		bottomLine: "No. The probability of exceeding a small measurable-precipitation threshold and the amount that might fall are different forecast quantities. A likely light-rain event can have a higher ordinary rain chance than a less likely heavy shower. To compare heavy-rain possibilities, use an amount forecast or a probability tied to an explicitly larger accumulation threshold.",
		stableCore: ["The Tulsa NWS explanation distinguishes ordinary precipitation probability from probabilities of exceeding larger totals. For a common location and period, exceeding a larger total also requires exceeding the smaller one, but knowing the small-threshold probability does not identify the whole distribution of amounts. Many possible distributions share that same number. A percentage cannot be converted directly into inches by adding a unit or assuming that twice the chance means twice the rain.", "Conditional and unconditional amounts also answer different questions. An amount given that rain occurs is not necessarily an expected amount averaged over both wet and dry outcomes. Read a product's definitions before comparing them. Historical equations on an educational page illustrate one method; they do not establish every contemporary forecast algorithm or justify applying a particular distribution to your street. A high chance alone says nothing complete about the runoff response of a connected river basin."],
		editorSummary: "Ask for the location, accumulation interval, amount threshold and whether the forecast is conditional on precipitation. These details help distinguish an almost certain drizzle from a smaller chance of a downpour. This review does not decide whether a trip, road or river is safe. Follow current official local forecasts and warnings for hazardous conditions. The addition concerns rainfall-event magnitude, not another attribution of extreme rain to climate change or a claim that a low probability makes a damaging outcome impossible.",
		qualification: "Comparison of event probability and amount for matched locations/periods; no actual rainfall, flood-risk or model-distribution prediction.",
		question: "What accumulation threshold and conditioning does the relevant amount product use?",
		gap: "Adds rain-event likelihood versus accumulation magnitude and conditional amount; existing climate rainfall trends concern a different timescale and question.",
		tags: ["higher rain chance heavier rainfall amount", "precipitation threshold conditional accumulation"],
		sources: ["amount", "pop"]
	},
	{
		key: "cooling",
		title: "Can relative humidity rise without adding water vapor to the air?",
		slug: "can-relative-humidity-rise-without-adding-water-vapor-to-the-air",
		bottomLine: "Yes. Cooling unsaturated air can increase its relative humidity without adding vapor, because the saturation reference changes with temperature. Warming the same air can lower relative humidity while leaving its vapor amount unchanged. The statement requires a specified moisture measure and conditions; real outdoor air can simultaneously mix, gain moisture or lose it through condensation.",
		stableCore: ["Relative humidity compares vapor conditions with saturation at the current temperature. It is not simply a count of water molecules. In a conceptual constant-pressure parcel with unchanged vapor mixing ratio, lowering temperature moves the parcel closer to saturation. The NWS humidity and dew-point explanations identify this dependence. Thinking of air as an absorbent sponge that must acquire water whenever its percentage rises confuses a changing denominator with an added amount of vapor.", "The qualification unsaturated matters. Once condensation changes vapor into droplets, the vapor amount no longer remains unchanged even if the parcel's total water is retained. A real parcel can also exchange water or change pressure. Overnight relative-humidity increases therefore need not be evidence of incoming moisture, but the mechanism alone does not establish that a particular night involved only cooling. Temperature, dew point and the measurement context provide more information than an isolated RH percentage."],
		editorSummary: "Compare temperature and moisture together rather than treating every RH increase as water being added. Heating a room without adding vapor is a useful conceptual contrast, not a measurement of a house's ventilation, leakage or comfort. This review offers no humidity setting, mold diagnosis or health recommendation. Its new question is the temperature-dependent saturation reference, not the earlier claim about a warmer global atmosphere and heavy-rain trends. A local time series still needs matching observations to determine which processes actually changed it.",
		qualification: "Unsaturated conceptual parcel at specified pressure and unchanged vapor mixing ratio; condensation, mixing and real measurement changes need separate evidence.",
		question: "Did temperature change, or did a matched moisture measure also change?",
		gap: "Adds temperature-dependent relative humidity without moisture addition; prior warming/rainfall reviews do not distinguish a parcel's relative and absolute moisture measures.",
		tags: ["relative humidity rise cooling no water vapor", "heating air humidity dew point"],
		sources: ["humidity", "dewpoint"]
	},
	{
		key: "equalHumidity",
		title: "Do two days with the same relative humidity contain the same amount of water vapor?",
		slug: "do-two-days-with-the-same-relative-humidity-contain-the-same-amount-of-water-vapor",
		bottomLine: "Not necessarily. Relative humidity is a fraction of a temperature-dependent saturation reference. The same fraction at different temperatures can describe different vapor conditions. Compare a named moisture quantity, such as vapor pressure or specific humidity, with its needed context instead of assuming that equal percentages mean equal water amounts or equal personal comfort.",
		stableCore: ["A cool saturated morning and a warm partly humid afternoon can have very different vapor amounts even though the morning has the higher RH. NWS educational examples make this distinction. Absolute humidity is vapor mass per air volume, while specific humidity expresses vapor mass relative to air mass; those denominators are not interchangeable. An unspecified amount of moisture can therefore be ambiguous even before two weather observations are compared across temperature or elevation.", "Dew point is useful because it identifies the temperature of saturation under the stated conditions and relates to vapor pressure. It is not a complete replacement for pressure information when comparing vapor mixing ratios between elevations, and it is not a universal comfort score. Relative humidity remains useful for processes dependent on proximity to saturation. Its temperature dependence is a reason to interpret the measure correctly, not evidence that meteorologists should discard it."],
		editorSummary: "When comparing two days, keep the air temperature alongside RH and identify the moisture quantity you actually want. Do not combine a household sensor's reading with an unrelated station as though they sampled identical air. This review does not determine whether a building needs humidification or whether someone can safely exercise outdoors. It adds a comparison-of-measures question distinct from humidity changing during cooling. Equal numbers can refer to different physical states when the reference conditions or denominators differ.",
		qualification: "Named moisture quantities and matched temperature/pressure context; no individualized comfort, building-health or exercise assessment.",
		question: "Which moisture quantity and denominator are being compared across the two observations?",
		gap: "Adds equal-RH cross-temperature comparison and moisture denominators, rather than another review of whether a single cooling parcel's RH can rise.",
		tags: ["same relative humidity water vapor amount", "dew point absolute specific humidity compare"],
		sources: ["dewpoint", "humidity"]
	},
	{
		key: "saturation",
		title: "Does 100% relative humidity mean that rain must be falling?",
		slug: "does-100-percent-relative-humidity-mean-that-rain-must-be-falling",
		bottomLine: "No. Saturation describes vapor conditions relative to temperature at the sampled level. Rain requires precipitation particles to form, grow and reach the ground. Saturated air can contain suspended fog or cloud droplets without measurable rain falling there. Conversely, rain can fall through unsaturated air below a cloud, so a surface RH reading is not a rain detector.",
		stableCore: ["Tiny droplets suspended in a cloud or fog differ from falling precipitation that reaches the surface. The NWS humidity discussion separates saturation from the processes that grow droplets or ice particles large enough to precipitate. A surface observation also does not report humidity at every height overhead. Air at one level can be unsaturated while a higher cloud supplies falling particles. A single local vapor ratio cannot describe the entire atmospheric column.", "As particles descend through drier air, evaporation can change their size and whether they survive to the ground. The water-cycle explanation distinguishes condensation from precipitation and includes phase changes during movement. It follows that neither a saturated surface observation nor an unsaturated one by itself proves the ground is wet. Real measurements have rounding, exposure and instrument limits, so a displayed 100% should not be interpreted as infinitely precise evidence about every nearby surface or cloud."],
		editorSummary: "Ask whether the observation concerns vapor, suspended cloud water or precipitation at the ground, and at which height it was taken. The question is distinct from how much vapor two equal RH readings represent. This review does not identify the cause of low visibility, certify a sensor or forecast the next shower. A foggy photograph and a humidity percentage can be consistent without implying a downpour. Actual rainfall observations and current official forecasts remain separate evidence sources for what is happening locally.",
		qualification: "Saturation at a sampled level versus particle growth and surface precipitation; no cloud microphysics simulation or current local observation.",
		question: "Where is saturation measured, and is falling precipitation actually observed at the ground?",
		gap: "Adds saturation versus suspended and falling water at distinct atmospheric levels; earlier weather/climate and humidity comparisons do not establish rain occurrence.",
		tags: ["100 percent relative humidity rain fog", "saturation precipitation suspended droplets ground"],
		sources: ["humidity", "cycle"]
	},
	{
		key: "dew",
		title: "Is morning dew simply rain that fell overnight?",
		slug: "is-morning-dew-simply-rain-that-fell-overnight",
		bottomLine: "No. Dew can form when water vapor condenses onto a sufficiently cool surface, without rain falling from a cloud. Water already on grass can have other sources, including rain, irrigation or plant processes, so not every wet morning surface is necessarily dew. The relevant distinction is formation at the surface versus falling precipitation.",
		stableCore: ["The NOAA water-cycle explanation identifies condensation as vapor becoming liquid, including droplets on surfaces. A surface can cool to a temperature at which nearby vapor condenses. Its temperature may differ from the air thermometer's reading, particularly on a calm clear night. The frost discussion connects dew development with local cooling, wind and moisture conditions. Nothing in this mechanism requires a rain cloud to supply the droplets immediately before they appear.", "Water vapor can have arrived by atmospheric transport or evaporation from many sources. Saying dew condensed locally does not establish that all its water originally came from the patch of soil underneath. Distinguish the recent phase change from the water's longer history. Nor does a wet leaf by itself distinguish condensation from liquid deposited by another route. Timing, surrounding observations and the particular surface matter before attributing an actual wet patch to dew."],
		editorSummary: "Separate where droplets formed from where the vapor originated and whether liquid fell from above. This review adds a surface phase-change explanation, not a new rainfall forecast or a complete explanation of plant water movement. It offers no dew-harvesting recipe, drinking-water safety claim or agricultural guarantee. A rain gauge's lack of measurable precipitation and visible dew can agree because they concern different processes. Missing local evidence should remain uncertainty about that wet surface rather than proof that the weather instrument was wrong.",
		qualification: "Surface condensation mechanism; actual wetness attribution, vapor origin and water quality are not established by appearance alone.",
		question: "Did water condense on the surface, arrive as liquid, or emerge through another local process?",
		gap: "Adds locally formed dew versus falling rain and earlier vapor origin, distinct from atmospheric saturation or river-water movement in existing reviews.",
		tags: ["morning dew rain overnight condensation", "wet grass surface vapor origin"],
		sources: ["cycle", "frost"]
	},
	{
		key: "frost",
		title: "Can frost form when the reported air temperature is above freezing?",
		slug: "can-frost-form-when-the-reported-air-temperature-is-above-freezing",
		bottomLine: "Yes. A surface and the air at a weather station's observation height need not have the same temperature. On suitable nights, surfaces or near-ground air can become colder than the reported air reading and support frost. That does not mean ordinary frost crystals form on a surface that itself remains above the relevant freezing conditions.",
		stableCore: ["Radiative energy loss, limited mixing and local terrain can produce temperature differences near the ground. The NWS frost explanation explicitly notes frost while standard-height air measurements remain above freezing. A roof, leaf, windshield and station thermometer sample different physical objects or heights. Their readings can legitimately differ. The report does not identify the coldest nearby surface, and a rounded regional forecast value adds another distinction from an actual local surface measurement.", "Frost formed by vapor deposition and previously liquid dew that subsequently freezes are different pathways to surface ice. The NOAA water-cycle reference distinguishes deposition from condensation, while the NWS explanation discusses both. Finding ice does not determine its entire history or tell you the temperature of every surrounding air layer. Clouds, wind, moisture and surface exposure affect the conditions, so clear and calm is a common context rather than a guarantee that frost occurs everywhere."],
		editorSummary: "Compare the measured object, height, location and time before concluding that a frost observation disproves an air-temperature report. This review does not predict crop damage, certify a road as ice-free or provide a threshold for travel decisions. It extends the dew question to surface ice and observation-height differences. Current official local warnings remain important; the general mechanism cannot substitute for them. A real inconsistency still warrants checking instruments and timing instead of automatically explaining every mismatch away as radiative cooling.",
		qualification: "Surface/observation-height and phase-pathway distinction; no crop, road, travel or local frost forecast.",
		question: "Which surface or air layer was measured, and at what time and location?",
		gap: "Adds above-freezing station readings versus colder local surfaces and deposition/frozen-dew pathways, without republishing a generic heat-transfer review.",
		tags: ["frost above freezing reported temperature", "surface air thermometer radiative cooling"],
		sources: ["frost", "cycle"]
	},
	{
		key: "windChill",
		title: "Does wind chill make a dry object colder than the actual air temperature?",
		slug: "does-wind-chill-make-a-dry-object-colder-than-the-actual-air-temperature",
		bottomLine: "Not through wind-driven convection alone. Wind can make a warmer dry object approach the air temperature faster; the human wind-chill index is not its eventual temperature. Real objects can become colder than the air through other processes, such as radiation or evaporation, so the statement is not a claim that all outdoor surfaces always match air temperature.",
		stableCore: ["The NWS explanation distinguishes increased heat-loss rate from a lower surrounding-air temperature. In a simplified model with only heat exchange with the same ambient air, wind changes the rate of approach rather than creating a new colder endpoint. A displayed feels-like value is based on an exposure model, not a thermometer in every pipe, car or garden object. Reading that number as the temperature of the air or an inanimate object answers the wrong question.", "Actual objects need a fuller energy balance. A surface losing radiation to its surroundings may be colder than nearby air, as the frost example shows. Evaporation also requires separate consideration if the object is wet. Internal heating, sunlight and contact with other materials matter too. These qualifications preserve the convective distinction without asserting that a single effect controls every object's temperature. They also prevent using the simplified explanation as a universal claim about when plumbing or road surfaces can freeze."],
		editorSummary: "Name the process before translating a weather index into a material temperature. Faster cooling can still matter even if the eventual convective limit does not change. This review does not calculate a person's safe exposure time, diagnose cold injury or certify a water system. Follow current official weather warnings for hazardous cold. The addition concerns the meaning of the human index compared with a dry object's thermal endpoint, not another general explanation of heat versus temperature or a prediction for a particular radiator.",
		qualification: "Dry-object convection-only model, separate from full outdoor energy balances and human cold-risk assessment.",
		question: "Which heat-transfer processes and exposure assumptions apply to the actual object?",
		gap: "Adds wind-chill exposure-index interpretation and the dry-object convective endpoint; generic temperature/heat content does not define this weather index.",
		tags: ["wind chill dry object air temperature", "feels like convection radiative cooling"],
		sources: ["chill", "frost"]
	},
	{
		key: "heatIndex",
		title: "Does the heat index describe every outdoor exposure, including full sun?",
		slug: "does-the-heat-index-describe-every-outdoor-exposure-including-full-sun",
		bottomLine: "No. The NWS heat-index explanation uses air temperature and relative humidity under shade and light-wind assumptions. Full sun and other exposure differences can change heat stress without being represented by that number alone. WBGT incorporates additional environmental factors, but neither index is a universal personal safety certificate or a direct measurement of body temperature.",
		stableCore: ["Two people can encounter the same reported air temperature and RH while one receives more solar radiation or performs more strenuous work. A shade-based index does not encode every difference. The NWS comparison identifies sunlight, wind and other inputs used in WBGT, alongside differing model assumptions. The numbers describe different constructs; seeing a lower WBGT number does not necessarily establish a cooler environment or less risk than a larger heat-index number on a different scale.", "Exposure includes location, activity, clothing and individual circumstances as well as weather. A regional forecast cannot measure each person's complete condition. WBGT is also not identical to the ordinary psychrometric wet-bulb temperature, which addresses a different measurement. General explanations of these indices should not be converted into safe work/rest schedules or medical conclusions without the appropriate current guidance and context. A single simple feels-like label can conceal which index or proprietary calculation an application actually displays."],
		editorSummary: "Check the index's name, inputs and exposure assumptions before comparing values. Use current official heat information and applicable professional guidance for hazardous conditions; this library does not determine a safe duration for exercise or work. The new review addresses index scope, not whether climate change increases heat extremes. An index can be useful within its scope even though it is incomplete. A product that does not disclose what feels-like means remains an unsupported application-specific question rather than an assumed NWS heat-index implementation.",
		qualification: "NWS heat-index and WBGT definitions; no individual health, safe-work duration or proprietary app assessment.",
		question: "Which index, exposure setting and inputs does the displayed value actually represent?",
		gap: "Adds shade/light-wind assumptions and heat-index versus WBGT construct boundaries, rather than another long-term extreme-heat attribution review.",
		tags: ["heat index full sun shade WBGT", "feels like wet bulb globe exposure"],
		sources: ["heat", "wbgt"]
	},
	{
		key: "snowRatio",
		title: "Does ten inches of snow always equal one inch of water?",
		slug: "does-ten-inches-of-snow-always-equal-one-inch-of-water",
		bottomLine: "No. Snow depth and the depth of liquid water obtained from that snow are different quantities. Their ratio depends on snow structure, density and conditions, and it can change during an event or after settling. The familiar ten-to-one rule is a shortcut, not a universal conversion or a substitute for a matched snow-water measurement.",
		stableCore: ["Snow includes ice and spaces between grains. Two layers with the same depth can contain different amounts of water if their densities differ. The NWS snow-ratio explanation describes effects of cloud conditions, temperature and wind on newly falling snow. NSIDC describes later changes in snowpack structure. These explanations distinguish an initial snowfall ratio from the water represented by an older or compacted layer; neither quantity should silently be substituted for the other.", "Timing and the sampled material matter. A forecast of new accumulation, a measured total snowpack depth and the liquid equivalent of a collected sample are not automatically interchangeable. Melting, refreezing, compaction and additional snowfall can alter the layer being compared. A model conversion must name its assumptions and the time interval. The institutional page's historical regional average is not adopted here as a supposedly better constant applicable to every storm or every location."],
		editorSummary: "Ask whether the number concerns fresh snowfall, settled depth or water equivalent, and whether both measurements refer to the same sample and time. This review offers no local snow forecast, structural load calculation or assessment of a roof. It adds a snow-volume versus water-content boundary, not a restatement of global ice loss. Equal depths need not imply equal stored water. If the relevant density or sample is unknown, multiplying by a familiar ratio does not turn that missing information into an observation.",
		qualification: "Matched snow-depth and liquid-equivalent quantities; no universal ratio, snow-load assessment or actual accumulation forecast.",
		question: "Is this new snow or settled snowpack, and what establishes its water equivalent?",
		gap: "Adds fresh/settled snow depth versus liquid-equivalent density and timing; previous ice-loss and water-cycle content does not establish a snow conversion.",
		tags: ["ten inches snow one inch water ratio", "snow density liquid equivalent settled"],
		sources: ["ratio", "snow"]
	},
	{
		key: "snowAboveFreezing",
		title: "Can snow reach the ground when surface air is above freezing?",
		slug: "can-snow-reach-the-ground-when-surface-air-is-above-freezing",
		bottomLine: "Yes, under suitable conditions. Snow can form in colder air aloft and pass through a warmer near-surface layer without completely melting before arrival. The temperature profile, particle history and heat exchange matter. Snow arriving at the ground also does not guarantee that it will accumulate or persist on a particular surface.",
		stableCore: ["NSIDC's explanation explicitly distinguishes temperatures aloft from conditions at the ground and notes above-freezing arrival. Melting changes particles while they fall, rather than occurring instantaneously at an imaginary temperature line. The NOAA sample profiles show why the vertical path matters, although their all-below-freezing snow example is only one sufficient arrangement. Treating that diagram as a necessary condition would incorrectly turn a simplified example into an impossibility rule for other profiles.", "Arrival and accumulation are separate outcomes. A flake can survive the descent yet melt on a warm surface, while other conditions permit a layer to build. Precipitation intensity, humidity and changing surface conditions contribute to the result. This review does not supply a universal surface temperature above which snow is impossible; educational rules of thumb are not hard boundaries for every particle and atmosphere. A forecast needs more information than one rounded air temperature on a phone screen."],
		editorSummary: "Distinguish the formation level, falling path, surface-air measurement and material on which the snow lands. Those four contexts can differ without violating freezing physics. The addition is not another answer about a snowy winter and global warming, nor a prediction that snow will stick in your neighborhood. Follow current official local forecasts and warnings for hazardous weather. If a specific location's profile and surface observations are missing, the library does not establish arrival, accumulation or travel conditions there.",
		qualification: "Conditional survival of snow through a warm layer; no hard temperature threshold, local accumulation or travel prediction.",
		question: "What vertical profile and surface conditions affect the snow along its path?",
		gap: "Adds aloft formation, survival during descent and accumulation as separate snow outcomes; existing climate cold-snap content concerns a different inference.",
		tags: ["snow above freezing surface air", "snowflakes melt warm layer accumulation"],
		sources: ["snow", "profile"]
	},
	{
		key: "sleet",
		title: "Are sleet and freezing rain the same because both involve ice?",
		slug: "are-sleet-and-freezing-rain-the-same-because-both-involve-ice",
		bottomLine: "No. In the cited U.S. meteorological usage, sleet consists of ice pellets that freeze before reaching the ground. Freezing rain arrives as liquid drops that freeze on sufficiently cold surfaces. Similar surface-air temperatures can accompany different precipitation types because the temperature layers above the ground and the particles' histories differ.",
		stableCore: ["The NOAA sample profiles illustrate snow melting in a warm layer aloft, followed by a colder layer near the surface. With enough cooling during descent, drops can refreeze into pellets. With a shallower or otherwise insufficiently cooling layer, liquid drops can remain supercooled until contact. The examples show a mechanism, not universal layer heights or a rule that a single surface temperature diagnoses every event. Mixed types and changing profiles require actual observations and forecasts.", "Freezing rain is not simply rain formed as ice throughout its entire path, and sleet is not interchangeable with hail formed in a thunderstorm's growth region. Terminology also differs internationally: this review uses the U.S. ice-pellet meaning of sleet rather than assuming every country uses that word identically. A photograph of ice accumulation cannot establish the complete profile that produced it. Particle phase during descent and the receiving surface are important distinctions even when the end result looks icy."],
		editorSummary: "Read the forecast's definition and vertical context instead of treating all icy precipitation as one category. This conceptual review does not identify a current storm, certify a road or prescribe driving actions. Use current official local forecasts and warnings for hazardous conditions. It adds when and where freezing occurs along the path, a different question from snow-water density or snow reaching warm surface air. The same final phase does not imply the same formation process, exposure or local consequences.",
		qualification: "U.S. sleet terminology and illustrative vertical profiles; no universal layer depth, road-icing threshold or local hazard diagnosis.",
		question: "Did liquid freeze before arrival or on contact, and which meaning of sleet is being used?",
		gap: "Adds ice-pellet versus on-contact freezing and explicit U.S. word scope; prior snow and water measurements do not distinguish these precipitation histories.",
		tags: ["sleet freezing rain ice pellets difference", "warm layer supercooled liquid profile"],
		sources: ["profile", "precip"]
	},
	{
		key: "hail",
		title: "Can hail fall on a warm day?",
		slug: "can-hail-fall-on-a-warm-day",
		bottomLine: "Yes. Hail grows in cold regions within thunderstorms, not necessarily in cold air at ground level. Some hailstones can survive passage through warmer air before they arrive. Surface warmth alone neither rules out hail nor establishes that a thunderstorm will produce it; growth aloft and melting during descent both matter.",
		stableCore: ["NOAA describes updrafts supporting growing ice particles in regions containing supercooled water. The location where ice grows can be far above a warm observer. A warm surface measurement therefore does not show that the entire storm is above freezing. Nor does a hailstone's presence require every drop in the storm to be frozen: supercooled liquid and ice interact during growth. This is a distinction between conditions in different parts of the atmospheric column.", "The falling particle can melt on its route. The NOAA hail explanation notes that a high freezing level can reduce how much hail reaches the surface even where thunderstorms occur. Growth, particle size and the descent environment affect survival, so a storm's existence is not itself a guarantee of ground-level hail. The educational account includes idealized trajectories; the library does not assert that every hailstone repeatedly cycles through an identical path or derive a precise size from one updraft estimate."],
		editorSummary: "Compare surface conditions with the elevated growth region and the path to the ground. That resolves the apparent contradiction of ice during warm weather without predicting hail for a particular storm. This review gives no storm-chasing guidance, exposure tolerance or personal safety clearance. Follow current official local forecasts and warnings for severe weather. It adds thunderstorm ice-growth and survival rather than another snow-temperature review: snowflakes, sleet and hail have different histories even though each can arrive as ice.",
		qualification: "Thunderstorm growth region and conditional hail survival; no size, frequency, route or current storm forecast.",
		question: "What growth and descent conditions establish whether hail actually reaches the surface?",
		gap: "Adds warm-surface hail through cold thunderstorm growth and survival, distinct from winter precipitation profiles and existing climate trend reviews.",
		tags: ["hail warm day summer ice thunderstorm", "updraft supercooled melting freezing level"],
		sources: ["hail", "precip"]
	},
	{
		key: "radarGround",
		title: "Does a precipitation echo on radar prove that rain is reaching the ground there?",
		slug: "does-a-precipitation-echo-on-radar-prove-that-rain-is-reaching-the-ground-there",
		bottomLine: "Not by itself. A radar samples returned energy from a volume above or around its beam, and precipitation can change before reaching the surface. Rain can evaporate during descent, producing virga, while blockage and sampling height also affect what is detected. A processed rainfall estimate and a direct ground observation are different evidence types.",
		stableCore: ["The NWS radar explanation distinguishes scan elevations and notes increasing sampling height with distance. A reflectivity patch is not a rain gauge placed at every point underneath. The precipitation-processing reference lists virga, meaning precipitation that evaporates before surface arrival, as one reason an echo does not establish rain on the ground. Composite reflectivity can use an elevated strong return, so the identity of the displayed product is important before interpreting its map footprint.", "The reverse implication also fails: an empty or weak echo does not universally establish no precipitation below. Terrain blockage, distant shallow precipitation and other sampling limits can affect detection. Forecasters use multiple measurements and processing methods to estimate surface rainfall; those improve the information but do not turn every image into a direct measurement. The technical examples identify possible limits, not a numerical error rate for all radars, all seasons or a named phone application."],
		editorSummary: "Check the product, scan time, sampled height and available ground observations. A dry observation can be consistent with precipitation detected aloft, but the library does not automatically attribute every mismatch to evaporation. This review does not determine flood safety or reinterpret a current warning. It adds where an atmospheric instrument samples versus where rain arrives, not another discussion of rain probability. For present hazardous weather, current official local information remains necessary rather than a general conceptual explanation of a radar image.",
		qualification: "Radar volume/product versus ground arrival; no universal error rate, app audit, current rainfall or hazard assessment.",
		question: "Which volume and product were sampled, and what independent surface evidence is available?",
		gap: "Adds radar sampling height and evaporating precipitation versus surface rainfall, distinct from rain-event forecasts or river flooding without local rain.",
		tags: ["radar echo rain not ground virga", "beam height composite reflectivity surface"],
		sources: ["radarErrors", "radar"]
	},
	{
		key: "radarTargets",
		title: "Is every colored return on a weather-radar image precipitation?",
		slug: "is-every-colored-return-on-a-weather-radar-image-precipitation",
		bottomLine: "No. Raw or insufficiently filtered weather-radar returns can come from non-precipitation targets and ground clutter as well as rain, snow or hail. Processed products use additional information to distinguish them. A color represents a value under that product's legend; it is not a universal label proving rain, wind speed or storm severity.",
		stableCore: ["The Melbourne NWS reference describes returns from birds and other targets, as well as atmospheric conditions that direct energy toward the ground. Radar receives scattered electromagnetic energy; it does not attach the word rain to each object independently of interpretation. The processing-method reference documents non-precipitation echoes and anomalous propagation. These are observational counterexamples to the universal claim, not instructions to interfere with radar or a claim that all unusual patterns have the same cause.", "Different radar products also assign colors to different quantities. Reflectivity concerns returned power under its conventions, while a velocity display concerns movement toward or away from the radar. Additional dual-polarization information can help distinguish target types. The presence of filtering means a particular modern precipitation product need not expose every raw return. Product name, units, legend and processing are therefore essential; a generic green patch cannot establish which quantity or classification is being displayed."],
		editorSummary: "Read the radar layer's legend before interpreting colors or assuming every visible patch is rain. This review neither classifies a current image nor estimates the success rate of its filtering. It adds target identity and display-variable boundaries, distinct from whether actual precipitation aloft survives to the surface. Radar remains useful despite these limits; the existence of clutter does not establish that an official storm warning is false. Current local forecasts and warnings should not be replaced by an unsupported interpretation of an unfamiliar image.",
		qualification: "Return identity and product/legend distinction; no current image classification, interference instructions or measured filtering performance.",
		question: "Which radar variable and processing layer do the colors describe?",
		gap: "Adds non-precipitation targets and radar variable/legend interpretation, not another explanation of actual precipitation evaporating below a radar beam.",
		tags: ["colored radar returns birds ground clutter", "radar reflectivity velocity legend precipitation"],
		sources: ["radar", "radarErrors"]
	},
	{
		key: "satellite",
		title: "Does infrared weather-satellite imagery directly measure the air temperature at ground level?",
		slug: "does-infrared-weather-satellite-imagery-directly-measure-the-air-temperature-at-ground-level",
		bottomLine: "No. An infrared image measures radiation and represents a brightness temperature under its processing assumptions. The radiation can originate from clouds, surfaces and the intervening atmosphere. An opaque cloud can make its top dominate the view rather than the ground below. Even a visible surface's radiating temperature is not automatically the nearby air thermometer's temperature.",
		stableCore: ["The NESDIS explanation describes an infrared window and emissions from Earth's surface, atmosphere and clouds. Infrared sensing can work at night because it does not depend on reflected sunlight in the same way as a visible-light image. But a radiating body and the surrounding air remain different measurement targets. A color enhancement applies a palette to the selected data; blue, red or white is not a universal temperature or weather category across all viewers.", "The Climate Prediction Center explanation cautions that colder indicated temperatures do not always correspond to precipitation. Cold surface regions and clouds that are not precipitating provide different interpretations from a simple colder-means-heavier-rain shortcut. A cold cloud top can be useful evidence within a meteorological assessment without measuring rainfall at every point below it. Retrieval assumptions and other observations matter before translating a radiation signal into cloud properties, surface conditions or a specific forecast."],
		editorSummary: "Identify the sensor channel, radiating target, derived quantity and legend before comparing a satellite image with a surface-air report. This review does not evaluate a current image, estimate a storm's intensity or certify that no rain is present. It adds weather-radiance versus near-surface air measurement, distinct from the earlier question about a handheld thermal camera and an opaque wall. Remotely inferred properties are useful but should not be described as direct readings of every atmospheric layer or an independently observed ground temperature.",
		qualification: "Infrared radiance/brightness-temperature interpretation; no universal palette, current retrieval accuracy or ground-air/weather prediction.",
		question: "Which radiating target and derived quantity does this channel actually represent?",
		gap: "Adds weather-satellite radiance, cloud-top/surface ambiguity and near-surface air as distinct targets, rather than republishing a generic thermal-camera question.",
		tags: ["infrared weather satellite ground air temperature", "brightness temperature cloud top radiation"],
		sources: ["satellite", "ir"]
	},
	{
		key: "pressure",
		title: "Is sea-level pressure the same as the pressure measured at a mountain weather station?",
		slug: "is-sea-level-pressure-the-same-as-the-pressure-measured-at-a-mountain-weather-station",
		bottomLine: "No. Station pressure refers to pressure at the station's elevation. Sea-level pressure is a reduced or adjusted value intended to provide a common reference for comparing locations at different elevations. The adjustment is not a direct instrument reading beneath the mountain, and its assumptions matter. Always identify the quantity before comparing barometer values.",
		stableCore: ["Atmospheric pressure generally decreases with height. Comparing raw station readings from a mountain and a coast can therefore mix elevation differences with weather-pattern differences. NOAA explains why surface weather analyses use a common sea-level reference. A high-altitude station's relatively low measured pressure does not by itself show that an unusually intense low-pressure weather system is present. That inference requires the appropriately defined comparison and other meteorological context.", "An upper-air constant-pressure chart presents another quantity: the height at which a selected pressure occurs. It is not simply a sea-level pressure map drawn higher on the same scale. The reference distinguishes surface isobars from upper-air height contours. Other products, such as aviation altimeter settings, also have particular definitions rather than being silently interchangeable with sea-level pressure. This review supplies no reduction formula, instrument calibration or claim that every adjustment is equally accurate under every atmospheric profile."],
		editorSummary: "Keep units, elevation, datum and product name together when comparing pressure. A converted value can be useful without being a direct measurement at the reference level. This adds meteorological station/reference distinctions to the existing general pressure-versus-force review; it does not determine tomorrow's weather from a household barometer. Quoted historical pressure folklore on an educational page is not adopted as a modern forecasting law. If a device's displayed quantity is undocumented, the library does not establish which comparison is valid.",
		qualification: "Station, reduced surface and upper-air chart quantities; no pressure-reduction formula, aviation decision or specific instrument/forecast audit.",
		question: "Which elevation and reference quantity does each pressure value use?",
		gap: "Adds measured station versus reduced sea-level pressure and constant-pressure height charts; generic fluid pressure content does not define weather-map datums.",
		tags: ["sea level pressure mountain station elevation", "barometer datum upper air height isobars"],
		sources: ["pressure", "datum"]
	},
	{
		key: "front",
		title: "Is a weather front just the thin line drawn on a surface map?",
		slug: "is-a-weather-front-just-the-thin-line-drawn-on-a-surface-map",
		bottomLine: "No. The mapped line represents the surface position of a boundary between air masses; the atmospheric boundary has vertical structure and often slopes with height. Cloud and precipitation regions need not lie exactly on that line. The symbol is an analysis shorthand, not a wall of weather or a guarantee of conditions at one precise instant.",
		stableCore: ["NOAA's air-mass explanation describes colder and warmer air interacting across a three-dimensional frontal boundary. Lift along a sloping boundary can occur over a broader region than its surface map trace. Warm and cold fronts have characteristic structures and typical cloud patterns, but those descriptions retain moisture and atmospheric context. A line's width on a printed map does not measure the physical transition's thickness or make every location on one side have identical weather.", "The NESDIS map explanation defines frontal symbols through the replacement or relative motion of air masses. The symbol's triangles or semicircles convey a convention, not a forecast that a storm must begin as soon as the drawn edge crosses a street. An analyzed position and a later forecast position also refer to different times and uncertainties. Typical cardinal motion examples are not universal laws. The boundary can influence weather while other mechanisms contribute to local conditions."],
		editorSummary: "Read the map's time, symbol convention and associated observations instead of treating a two-dimensional line as the complete atmosphere. This review adds frontal geometry and map representation, not another climate-attribution answer or an exact storm-timing forecast. It provides no travel clearance or claim that one map disproves a warning. Current official forecasts and warnings remain the relevant source for hazardous local weather. Without the current humidity and vertical profile, the library does not establish which clouds or precipitation a named front will produce.",
		qualification: "Three-dimensional air-mass boundary versus surface trace and time; no exact arrival, universal movement direction or guaranteed precipitation.",
		question: "What atmospheric structure and valid time lie behind the mapped surface boundary?",
		gap: "Adds sloping frontal geometry and surface-map trace versus cloud/precipitation location, absent from existing climate, flood and physical-pressure reviews.",
		tags: ["weather front thin surface map line", "air mass boundary slope cloud precipitation"],
		sources: ["fronts", "map"]
	}
];

export const readerWeatherSlugs: Record<string, string> = Object.fromEntries(reviews.map(review => [review.key, review.slug]));

export const readerWeatherClaims: SeedClaim[] = reviews.map((review, index) => ({
	topicSlug: "earth-and-geoscience",
	title: review.title,
	slug: review.slug,
	status: "published",
	reviewMode: "standard",
	consensusBand: "broad",
	agreementLevel: "broad_qualified",
	evidenceCertainty: "moderate",
	confidenceScore: 75,
	bottomLine: review.bottomLine,
	stableCore: review.stableCore,
	editorSummary: review.editorSummary,
	openQuestions: [review.question],
	whatWouldChangeMinds: [`A verified source correction, changed product definition or applicable observation that alters this stated boundary requires reassessment. ${review.qualification}`],
	misconceptions: [review.title, "A weather label, index or image does not measure every part of the atmosphere or certify local safety."],
	misconceptionTags: review.tags,
	uncertaintySummary: review.qualification,
	uncertaintyDrivers: [{ type: "generalizability", detail: review.qualification }],
	searchDatabases: ["Original NOAA, NWS and NESDIS educational and measurement references", "Original NSIDC explanation", "Consensus.app communication discovery; inaccessible original paper excluded"],
	searchCutoffAt: weatherCheckedAt,
	inclusionRules: ["Specify the event, physical quantity, sampled location/height, valid period and reference conditions.", "Retain conditional mechanisms, original provenance and product-specific interpretation limits."],
	exclusionRules: ["No live forecasts, app rankings, warning thresholds, road/crop safety, medical diagnosis or safe exposure times.", "No invented reader demand, scientist votes, universal weather ratios or conclusions from inaccessible original research."],
	appraisalTools: ["Original definition, measurement-boundary and physical-counterexample checks; not a formal study appraisal", "Original source-context check, not exhaustive integrity clearance"],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Primary sources checked by an AI agent; independent expert review not completed.",
	independenceSummary: "Most references share NOAA institutional provenance; related educational explanations are not independent experiments. NSIDC supplies separately hosted scientific explanation, not an expert-agreement poll. The legacy confidence score is editorial, not a measured fraction of researchers agreeing or forecasts succeeding. No actual reader demand was measured.",
	coiSummary: "Public agency and university provenance is identified, not assumed to remove every institutional interest. The NASA/JPL precipitation page identifies NOAA program funding. Funding and conflicts were not exhaustively audited; no weather vendor is endorsed.",
	lastRetractionCheckAt: weatherCheckedAt,
	evidenceSummaries: [{ question: review.title, population: review.qualification, finding: review.bottomLine, effectDirection: "supports", magnitude: "A defined quantity or conditional physical relationship, not a measured local forecast skill or researcher-agreement percentage.", certainty: "moderate", limitations: [review.qualification, "No current local observations, forecast verification or app comparison"] }],
	institutionalAnchors: [{ name: readerWeatherSources[review.sources[0]!].publisher, role: "Definition and measurement-scope reference, not a formal consensus statement or local safety forecast" }],
	changeLog: [{ date: weatherCheckedAt, kind: "publication", summary: `New review: ${review.title}` }],
	readerAnnouncement: { id: `0aa86e93-24ea-46fc-8be9-47d3a669${String(index + 1).padStart(4, "0")}`, date: weatherCheckedAt, kind: "new_review", bottomLineImpact: "new", summary: `New review: ${review.title}` },
	surveillanceSpec: { focus: review.title, cadenceDays: 90, watchTerms: review.tags, integrityMonitors: ["Original corrections and errata for cited references"], guidelineMonitors: ["NOAA/NWS and NSIDC definition and source-scope revisions"], triggerRules: ["Reassess a verified correction or product-scope change that alters the stated interpretation."] },
	sources: review.sources.map((key, sourceIndex) => ({ ...readerWeatherSources[key], order: sourceIndex + 1, isAnchor: sourceIndex === 0, appraisal: "not_appraised", citationStatus: "current", citationCheckedAt: weatherCheckedAt, statusSources: [readerWeatherSources[key].url!] }))
}));

export const readerWeatherGaps = reviews.map(review => ({ slug: review.slug, gap: review.gap, relatedExistingSlugs: ["is-recent-global-warming-mainly-caused-by-human-activity", "do-cold-snaps-or-snowy-winters-disprove-global-warming"] }));
