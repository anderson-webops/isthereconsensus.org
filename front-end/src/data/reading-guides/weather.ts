import type { ReadingGuideContent } from "./types";

export const weatherGuide: ReadingGuideContent = {
	takeaway:
		"A forecast, measurement and feels-like index answer different questions. Name the event, interval, sampled layer and reference conditions before translating a weather number into a claim about your surroundings.",
	scope: "An original conceptual guide based on original NOAA/NWS/NESDIS and NSIDC explanations checked on 2026-10-05. U.S. forecast and sleet definitions are identified rather than imposed on every country or app. Most sources share agency provenance; they are not independent trials or measured scientific votes. This guide is not a live forecast, warning service, travel clearance, crop assessment, medical advice or safe-exposure schedule. Use current official local forecasts and warnings for hazardous conditions. Undated references are not assigned invented publication years; independent expert review has not been completed.",
	sections: [
		{
			id: "event-not-duration",
			title: "Chance, time and amount are separate questions",
			paragraphs: [
				{
					text: "Imagine planning an afternoon outdoors. The percentage beside a rain icon cannot by itself tell you whether a shower would last five minutes or most of the afternoon. In the cited NWS convention it describes measurable precipitation at the forecast point during a specified interval. The event includes its location, period and threshold. A brief shower and a long wet spell can both satisfy it. The percentage is not the fraction of the day that must be wet, and it is not a promise that exactly that fraction of streets will receive rain. Check the product definition before importing this convention into an undocumented app.",
					sources: ["pop", "terms"]
				},
				{
					text: "Now change the question from whether rain occurs to whether a large total occurs. Those are different thresholds. As an explicitly invented mathematical example, suppose one distribution assigns an 80% chance to a small wet amount and another assigns a 30% chance to a much larger amount. The higher ordinary rain chance belongs to the lighter event. These are not observed forecast results. They illustrate why a small-threshold probability does not determine the amount distribution. A published amount forecast also needs its accumulation period and whether it is conditional on rain occurring. Historical example formulas do not establish every provider's present algorithm.",
					sources: ["amount", "pop"]
				}
			]
		},
		{
			id: "moisture-reference",
			title: "A humidity percentage needs its temperature context",
			paragraphs: [
				{
					text: "A relative number contains a reference, and here the reference changes with temperature. Consider an unsaturated parcel cooling at specified pressure without gaining water vapor. Its relative humidity can increase because it is moving closer to saturation, not because new water entered. Once condensation begins, the unchanged-vapor assumption must be reconsidered. Real air can also mix or exchange moisture. A rising nighttime RH graph therefore does not by itself identify the process that changed it. Compare matching temperature and moisture observations rather than assuming each percentage increase represents atmospheric transport of additional vapor into the location.",
					sources: ["humidity", "dewpoint"]
				},
				{
					text: "Comparing two different days raises another issue. Equal RH values at different temperatures need not represent equal vapor conditions. Absolute humidity uses air volume as its denominator; specific humidity uses air mass. Dew point relates to vapor pressure and provides useful context, but pressure is still relevant when comparing some moisture quantities across elevation. None is simply a universal comfort score. RH remains valuable for proximity-to-saturation questions. The lesson is not to discard it, but to name what is being compared. A station observation and a household sensor can also describe different air, so equal display numbers are not proof of equal physical states.",
					sources: ["dewpoint", "humidity"]
				}
			]
		},
		{
			id: "surfaces-and-phases",
			title: "Water at a surface does not identify a falling event",
			paragraphs: [
				{
					text: "Saturated vapor, suspended droplets and falling rain are distinct. A surface RH measurement does not describe every level above it. Fog can occur without measurable rain, and precipitation from a higher cloud can fall through unsaturated air below. Dew introduces another route: vapor condenses at a sufficiently cool surface rather than arriving as rain from overhead. That recent phase change does not identify the vapor's entire history; it may have been transported or evaporated from different sources. Nor does every wet leaf prove dew formed. Rain, irrigation and other local processes can leave water there too. Appearance alone is not a complete attribution.",
					sources: ["humidity", "cycle"]
				},
				{
					text: "Surface ice adds the distinction between a local surface and an air measurement at observation height. On suitable clear, calm nights the surface can be colder than the reported air and support frost even when that air value is above freezing. This is not frost forming on a surface that stays warm. Vapor deposition directly into ice and liquid dew that later freezes are different histories. Local terrain, moisture, mixing and radiative exchange matter. A weather report and a frosted windshield can therefore agree about different objects. An actual discrepancy still calls for checking time, location and instruments instead of automatically explaining every mismatch as the same mechanism.",
					sources: ["frost", "cycle"]
				}
			]
		},
		{
			id: "exposure-not-thermometer",
			title: "Feels-like indices are models of particular exposures",
			paragraphs: [
				{
					text: "Wind chill is not the eventual temperature of a dry garden object. In a convection-only comparison, wind can accelerate a warmer object's approach to the same ambient air temperature without creating a colder endpoint. This does not mean outdoor surfaces can never be colder than the air. Radiation and, for wet objects, evaporation belong in a fuller energy balance. The frost example is a useful counterexample to that overgeneralization. Faster cooling also can matter even when the convective limit is unchanged. The human index, a material temperature and a safe-exposure judgment must remain separate rather than sharing one feels-like number.",
					sources: ["chill", "frost"]
				},
				{
					text: "At the hot end, the cited heat index assumes shade and light wind while combining air temperature and RH. Full sunshine and activity can change exposure without being represented by that number alone. WBGT includes additional environmental factors, but its scale is not interchangeable with heat index and it is not ordinary psychrometric wet-bulb temperature. Neither value directly measures every person's body temperature or certifies a safe duration of work. An undocumented application's feels-like calculation remains unsupported here. For hazardous conditions use current official information and appropriate professional guidance, rather than converting this conceptual comparison into a medical conclusion or a work/rest schedule.",
					sources: ["heat", "wbgt"]
				}
			]
		},
		{
			id: "snow-quantities",
			title: "Snow depth, water content, arrival and persistence differ",
			paragraphs: [
				{
					text: "A snow depth includes spaces between grains as well as ice. Equal-depth layers can therefore hold different water amounts. The familiar ten-to-one snow/water conversion is not a conservation law. Conditions during growth and descent can affect newly fallen structure, while settling and later changes alter snowpack. A fresh snowfall forecast, a total settled depth and a sample's liquid equivalent also have different timing and sampling boundaries. Do not silently convert among them. If the sample and density are unknown, multiplying by a familiar ratio supplies an assumption, not an observation. A regional historical average on an educational page is not a new universal constant.",
					sources: ["ratio", "snow"]
				},
				{
					text: "An air temperature above freezing at the ground does not tell you the entire path followed by a flake. Snow can form aloft and survive a warmer near-surface layer without completely melting before arrival. The vertical profile, particle history and exchanges of heat matter. A diagram with below-freezing air throughout is a sufficient example, not the only possible arrangement. Arrival then differs from accumulation: snow that reaches a warm surface may melt instead of persisting. These explanations do not forecast how much snow will stick locally, establish a hard temperature cutoff, or assess roof loading and travel safety. Those questions need their own observations and appropriate current information.",
					sources: ["snow", "profile"]
				}
			]
		},
		{
			id: "ice-histories",
			title: "The route to ice matters as much as the final phase",
			paragraphs: [
				{
					text: "For the cited U.S. meaning of sleet, liquid drops refreeze into ice pellets before reaching the ground. Freezing rain instead arrives as liquid, which can be supercooled, and freezes on sufficiently cold surfaces. NOAA's illustrative profiles show snow melting in an elevated warm layer and encountering colder air below. The amount of cooling during descent affects whether pellets form before arrival. Actual events can be mixed or change with time; no universal layer thickness follows from the pictures. The word sleet also has different international uses. First establish the convention before assuming two forecasts name the same particle type or history.",
					sources: ["profile", "precip"]
				},
				{
					text: "Hail belongs to another growth setting. A warm observer can be underneath a thunderstorm whose elevated cold region supports ice growth and supercooled liquid. Updraft support and particle growth occur there, not in the observer's warm surface air. Some stones survive the subsequent warmer descent, while others melt before arrival. Thunderstorm occurrence therefore neither guarantees hail nor makes it impossible on a warm day. Idealized repeated trajectories are not a description of every stone. Snow, sleet and hail can all arrive as ice without sharing a formation mechanism. This guide predicts no storm, hail size or exposure tolerance; current official warnings remain important.",
					sources: ["hail", "precip"]
				}
			]
		},
		{
			id: "radar-volumes",
			title: "A radar pixel is not a rain gauge on every street",
			paragraphs: [
				{
					text: "A reflectivity image represents returned radar energy from sampled volumes. Beam height and the selected scan or composite matter. Actual precipitation detected aloft can evaporate before ground arrival, producing virga; other circumstances can make shallow or blocked precipitation hard to detect. Thus neither a colored patch nor its absence gives an unconditional direct reading of rainfall on the pavement. Processed surface estimates combine information and assumptions, rather than placing a physical gauge beneath every pixel. The limit does not make radar useless. It tells you which additional observations and product definitions are needed when a local observation appears to conflict with an image.",
					sources: ["radar-errors", "radar"]
				},
				{
					text: "There is a separate identity question even before asking whether precipitation reaches the ground. Birds, clutter and other targets can return energy, while processing and dual-polarization information help distinguish them from precipitation. Color alone is not a universal classification. A reflectivity palette encodes a different quantity from a velocity palette, and a modern filtered product need not expose all raw returns. Read the variable, units, legend, timestamp and processing context. This guide does not classify an unfamiliar current image, measure filtering performance or establish that an official warning is false. A general counterexample is not permission to replace current local hazard information with a guessed pattern interpretation.",
					sources: ["radar", "radar-errors"]
				}
			]
		},
		{
			id: "satellite-targets",
			title: "Radiation and cloud tops are not surface air readings",
			paragraphs: [
				{
					text: "Infrared weather imagery can be useful at night because it detects emitted radiation rather than relying only on reflected sunlight. Its brightness temperature belongs to the radiating scene under the product's assumptions. Clouds, Earth's surface and intervening atmosphere can contribute. An opaque cloud can hide the ground and make its top dominate the signal. Even where the surface is visible, its radiating temperature need not equal the nearby air thermometer's reading. Check the channel and target before calling a map a temperature measurement. Enhancement colors are particular to the viewer, not universal natural colors or a single shared scale of danger.",
					sources: ["satellite", "ir"]
				},
				{
					text: "Colder cloud tops can contribute to meteorological interpretation, but the Climate Prediction Center explicitly cautions that colder displayed temperatures do not always correspond to precipitation. A cold surface or a cloud that is not precipitating can defeat an oversimplified cold-color-to-rain rule. This does not remove the usefulness of satellite observations; it distinguishes a signal, a retrieval and the conclusion drawn from them. Combining radar, satellite and surface evidence can address different questions, but agreement cannot simply be assumed. The library does not establish a present storm's intensity, local rainfall or retrieval accuracy from these general explanations, nor rank weather applications by an unmeasured skill score.",
					sources: ["ir", "satellite"]
				}
			]
		},
		{
			id: "maps-and-datums",
			title: "A weather map needs a reference level and valid time",
			paragraphs: [
				{
					text: "Station pressure and reduced sea-level pressure are different quantities. A mountain station samples its actual elevation, while a sea-level adjustment supplies a common reference for weather comparison. It is not a direct observation beneath the mountain. Raw low pressure at altitude does not by itself establish an unusually strong weather low. Upper-air constant-pressure charts add another distinction: their contours can describe the height at which a selected pressure occurs, rather than surface pressure. Keep units, datum, elevation and product name with the number. No adjustment formula, aviation decision or modern forecasting law is inferred from historical pressure folklore quoted in an educational source.",
					sources: ["pressure", "datum"]
				},
				{
					text: "A surface front line likewise compresses a three-dimensional boundary into a map symbol. Air masses meet across a sloping structure, so lifting, clouds and precipitation need not be confined exactly to the drawn trace. The symbol identifies a convention about the boundary and its motion, not an infinitely thin wall of instant weather. Typical patterns depend on moisture and the atmospheric context; example compass directions are not universal paths. An analyzed position and a forecast position also concern different valid times. Check the map legend, time and associated observations. Without current local profiles, the library does not establish which clouds, rain or exact arrival a named front will produce.",
					sources: ["fronts", "map"]
				}
			]
		}
	],
	questions: [
		"What event, accumulation threshold and interval does the forecast describe?",
		"Which physical quantity and denominator are being compared?",
		"Which height, surface, atmospheric layer or radiating target was sampled?",
		"What index assumptions and map reference level apply?",
		"Which present local question remains unsupported and needs current official information?"
	],
	sources: [
		{
			id: "pop",
			title: "NWS Louisville: Probability of precipitation",
			url: "https://www.weather.gov/lmk/pops",
			kind: "Forecast definition",
			note: "Original point, threshold and period explanation checked; historical grid/clock examples are not universal app conventions."
		},
		{
			id: "terms",
			title: "NWS Pago Pago: Forecast terms",
			url: "https://www.weather.gov/ppg/forecast_terms",
			kind: "Regional product definitions",
			note: "Original liquid-equivalent probability scope checked; regional times and warning thresholds are not exported to every service."
		},
		{
			id: "amount",
			title: "NWS Tulsa: Probabilistic precipitation amounts",
			url: "https://www.weather.gov/tsa/pqpf_explaination",
			kind: "Forecast-method explanation",
			note: "Original probability/amount and conditional quantity distinction checked; example distributions are not universal current algorithms."
		},
		{
			id: "humidity",
			title: "NWS Louisville: Humidity, dew point and precipitation",
			url: "https://www.weather.gov/lmk/humidity",
			kind: "Physical-quantity reference",
			note: "Original relative/absolute/specific moisture and saturation distinctions checked; regional comfort categories are not safety thresholds."
		},
		{
			id: "dewpoint",
			title: "NWS La Crosse: Dew point versus humidity",
			url: "https://www.weather.gov/arx/why_dewpoint_vs_humidity",
			kind: "Quantity comparison",
			note: "Original constant-pressure definition checked; individual comfort and building decisions require separate evidence."
		},
		{
			id: "cycle",
			title: "NOAA Education: Condensation and deposition",
			url: "https://www.noaa.gov/education/resource-collections/freshwater/water-cycle",
			kind: "Phase and transport reference",
			note: "Original locally formed dew and vapor-to-ice distinction checked; appearance does not identify the full history of water."
		},
		{
			id: "frost",
			title: "NWS Charleston: Frost and observation height",
			url: "https://www.weather.gov/rlx/frost-freeze-information",
			kind: "Surface-measurement explanation",
			note: "Original surface/air-height and two phase pathways checked; local agricultural thresholds and historical dates are excluded."
		},
		{
			id: "chill",
			title: "NWS: Wind chill and inanimate objects",
			url: "https://www.weather.gov/safety/cold-faqs",
			kind: "Index-scope explanation",
			note: "Original convection-rate boundary checked; medical advice, warning criteria and safe-exposure times are not adopted."
		},
		{
			id: "heat",
			title: "NWS: Heat forecast tools",
			url: "https://www.weather.gov/safety/heat-index",
			kind: "Index-scope explanation",
			note: "Original shade/light-wind and additional WBGT input distinctions checked; no individualized safety schedule follows."
		},
		{
			id: "wbgt",
			title: "NWS Wichita: WBGT versus heat index",
			url: "https://www.weather.gov/ict/wbgt",
			kind: "Exposure-model comparison",
			note: "Original differing environmental assumptions checked; these indices and ordinary wet-bulb temperature are not interchangeable."
		},
		{
			id: "ratio",
			title: "NWS La Crosse: Snow ratios",
			url: "https://www.weather.gov/arx/why_snowratios",
			kind: "Snow-density explanation",
			note: "Original within-event variable ratios checked; an uncited historical regional average is not a universal replacement constant."
		},
		{
			id: "snow",
			title: "NSIDC: Science of snow",
			url: "https://nsidc.org/learn/parts-cryosphere/snow/science-snow",
			kind: "Cryosphere explanation",
			note: "Original warm-surface arrival and changing snow structure checked; rules of thumb are not hard forecast thresholds."
		},
		{
			id: "profile",
			title: "NOAA JetStream: Example precipitation profiles",
			url: "https://www.noaa.gov/jetstream/upperair/skewt_samples",
			kind: "Illustrative vertical profiles",
			note: "Original snow, pellets and liquid-on-contact freezing mechanisms checked; diagram heights and road-icing claims are not universal."
		},
		{
			id: "precip",
			title: "NASA/JPL for NESDIS: Precipitation types (2025)",
			url: "https://www.nesdis.noaa.gov/about/k-12-education/atmosphere/what-precipitation",
			kind: "Educational definitions",
			note: "Original August 27, 2025 page identifies NOAA program funding; simplified snow diagrams are not necessary-condition proofs."
		},
		{
			id: "hail",
			title: "NOAA JetStream: Hail growth and descent",
			url: "https://www.noaa.gov/jetstream/hail",
			kind: "Conditional mechanism",
			note: "Original cold growth aloft and melting distinctions checked; idealized trajectories, size tables and regional frequencies are excluded."
		},
		{
			id: "radar",
			title: "NWS Melbourne: Weather radar quantities and targets",
			url: "https://www.weather.gov/mlb/Doppler_Dual_Pol_Weather_Radar",
			kind: "Instrument/product explanation",
			note: "Original scan-height, target and variable distinctions checked; historical installation dates and palettes are not universal."
		},
		{
			id: "radar-errors",
			title: "NWS ABRFC: Precipitation-processing limits",
			url: "https://www.weather.gov/abrfc/pcpn_methods",
			kind: "Measurement limitations",
			note: "Original virga, blockage, range and target ambiguity checked; no error rate for a contemporary radar application is inferred."
		},
		{
			id: "satellite",
			title: "NOAA NESDIS: Interpreting infrared imagery",
			url: "https://www.nesdis.noaa.gov/imagery/interactive-maps/how-use-the-interactive-satellite-maps",
			kind: "Radiance interpretation",
			note: "Original surface/cloud/atmosphere emission scope checked; brightness temperature is not automatically near-surface air temperature."
		},
		{
			id: "ir",
			title: "NOAA CPC: Infrared imagery caveats",
			url: "https://www.cpc.ncep.noaa.gov/products/humanitarian/IRinfo.html",
			kind: "Interpretation limits",
			note: "Original cold-surface and non-precipitating-cloud caveats checked; historical viewer timing is not a current global guarantee."
		},
		{
			id: "pressure",
			title: "NOAA JetStream: Station and sea-level pressure",
			url: "https://www.noaa.gov/jetstream/atmosphere/air-pressure",
			kind: "Reference-level explanation",
			note: "Original altitude and common-reference distinction checked; quoted historical forecasting folklore is not adopted."
		},
		{
			id: "datum",
			title: "NOAA JetStream: Pressure versus elevation charts",
			url: "https://www.noaa.gov/jetstream/upper-air-charts/verses",
			kind: "Chart-variable explanation",
			note: "Original surface isobars versus upper-air height contours checked; no instrument reduction or aviation decision prescribed."
		},
		{
			id: "fronts",
			title: "NOAA JetStream: Three-dimensional air-mass boundaries",
			url: "https://www.noaa.gov/jetstream/synoptic/air-masses",
			kind: "Geometry and mechanism",
			note: "Original sloping frontal geometry and conditional lifting checked; cloud/rain patterns are not exact arrival guarantees."
		},
		{
			id: "map",
			title: "NOAA NESDIS: Reading weather-map symbols",
			url: "https://www.nesdis.noaa.gov/about/k-12-education/weather-forecasting/how-read-weather-map",
			kind: "Representation conventions",
			note: "Original air-mass replacement and frontal symbols checked; simplified compass directions are not universal motion laws."
		}
	]
};
