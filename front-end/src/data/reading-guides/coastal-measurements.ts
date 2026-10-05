import type { ReadingGuideContent } from "./types";

export const coastalMeasurementsGuide: ReadingGuideContent = {
	takeaway:
		"A crest is not a tracked water parcel, tide height is not current speed, and a surface map is not a full-depth profile. Coastal claims become clearer when the measured variable, reference and local conditions stay attached to the conclusion.",
	scope: "An educational guide to waves, tides and ocean measurements, source-checked October 5, 2026 UTC. It is not a navigation rule, surf forecast, emergency warning, engineering manual or biological procedure. Original institutional descriptions and one original research abstract were checked; independent expert review has not been completed.",
	sections: [
		{
			id: "pattern-and-parcel",
			title: "1. Watch the pattern without mistaking it for a parcel",
			paragraphs: [
				{
					text: "A traveling wave pattern and a water parcel do not follow the same trajectory. NOAA's basic explanation emphasizes energy propagation rather than transporting one fixed mass all the way across the ocean. The oscillating-parcel picture helps explain this distinction, but it is not a universal zero-transport theorem. Waves coexist with currents, wave-related drift and breaking. An attractive crest photograph therefore cannot establish the full movement of a particular parcel.",
					sources: ["waves"]
				},
				{
					text: "The original Ardhuin and colleagues abstract explicitly separates a wave-related Stokes component from other contributions to observed surface currents. Its local magnitudes are not applied here to every coast. The useful takeaway is the distinction between pattern speed and parcel movement, not a promised drift value. The abstract and DOI metadata were checked, but the full analysis and disclosures were not audited. The manuscript and journal paper describe one study, not two independent confirmations.",
					sources: ["drift"]
				}
			]
		},
		{
			id: "local-tidal-cycles",
			title: "2. A familiar tide diagram is not a global timetable",
			paragraphs: [
				{
					text: "NOAA distinguishes diurnal, semidiurnal and mixed tidal patterns. One coast can have a principal high and low water in a tidal day; another can have two, with unequal heights. Basin and coastal response modify the pattern. A classroom sketch with two equal highs is therefore one illustration, not an observation of every shore. A civil-day window and a tidal-cycle definition also need not count the same events.",
					sources: ["cycles"]
				},
				{
					text: "To interpret a tide chart, identify the station, date, height reference and whether it contains observations or predictions. A regional pattern explains something useful without supplying an exact local height at an unspecified time. Separate products exist for different quantities. A historical teaching page should not be used as a current station inventory or a promise about conditions today. This guide deliberately provides no crossing, swimming or vessel-passage recommendation.",
					sources: ["products", "cycles"]
				}
			]
		},
		{
			id: "range-versus-phase",
			title: "3. Range, phase and season are different labels",
			paragraphs: [
				{
					text: "Spring tides describe relatively enhanced high-to-low range associated with aligned lunar and solar forcing. The name does not restrict them to springtime. Neap tides describe relatively reduced range near quarter-moon geometry; they are not simply low tide. High and low water both occur during neap periods. The distinction prevents a label for a pattern across days from becoming an assertion about the present water level at one location.",
					sources: ["range"]
				},
				{
					text: "A range is the difference between high and low water, while a high-water elevation uses a specified datum. Quoting one without the other can make a large number difficult to interpret. The forcing geometry also does not establish a universal local hour or elevation. Ask which variable a headline describes before comparing it with another chart. A reduced range alone is not proof of weak currents everywhere, because height and water movement are separately defined and locally related.",
					sources: ["range", "tide-faq"]
				}
			]
		},
		{
			id: "height-and-current",
			title: "4. High water is not a universal current-speed marker",
			paragraphs: [
				{
					text: "A tide height measures vertical water level. A tidal current measures horizontal speed and direction. NOAA's FAQ cautions against a general rule that turns high water into maximum flow or slack water everywhere. The phase relation depends on the location and tidal regime. That is why reading a water-level table cannot, by itself, establish when a current reaches its largest speed at a different station or inlet.",
					sources: ["tide-faq"]
				},
				{
					text: "Check that a product predicts the variable you are asking about. A water-level station and current station can be related without providing interchangeable outputs. Even an applicable astronomical prediction does not describe every non-tidal contribution to present motion. A local phase relation should not be exported to another coastline merely because both have tides. The linked review explains this measurement boundary without calculating a current or declaring a safe passage time.",
					sources: ["products", "tide-faq"]
				}
			]
		},
		{
			id: "storm-water-components",
			title: "5. Wind category is not a complete coastal water-level forecast",
			paragraphs: [
				{
					text: "NHC describes surge as the storm-driven departure from predicted astronomical tide, and storm tide as the combination. Waves and freshwater inputs can further affect total water level. Wind is important, but storm size, movement, approach and coastal shape and depth modify the response. One wind-intensity category is therefore not a complete local surge forecast. A model illustration showing these sensitivities is not a prediction for an actual event at an unspecified shore.",
					sources: ["surge", "surge-definition"]
				},
				{
					text: "Before comparing two reported heights, identify whether each means surge, storm tide, a wave measure or total water level, and note the reference used. Different quantities can yield different numbers without a contradiction. Location also belongs with the statement: offshore and coastal geometry matter. This guide gives no live track, projected inundation, building-performance judgment or emergency instructions. Its contribution is to keep a bounded mechanism claim from being mistaken for an operational forecast.",
					sources: ["surge", "surge-definition"]
				}
			]
		},
		{
			id: "vertical-motion-and-layers",
			title: "6. A surface view omits a depth dimension",
			paragraphs: [
				{
					text: "Ocean movement is three-dimensional. Upwelling brings deeper water upward, and downwelling moves surface water downward. A flat current map may omit those motions because of its chosen view, not because vertical exchange is absent. Direction is also not a universal rate. The relevant observation must identify its depth coverage and local forcing before a surface picture becomes a claim about the entire circulation or an unrelated regional collapse forecast.",
					sources: ["upwelling"]
				},
				{
					text: "Temperature commonly changes through a mixed layer, a thermocline and deeper water, but the structure varies with latitude, season and mixing. NOAA's illustration does not supply fixed depths everywhere. NASA's cited surface map describes a top-millimeter measurement, not a full water-column profile or integrated heat content. These are separate useful products. A surface anomaly and a cold deep layer can coexist without either one alone establishing the whole column's temperature history.",
					sources: ["thermocline", "surface-temperature"]
				}
			]
		},
		{
			id: "salt-inputs-and-concentration",
			title: "7. Salt pathways are not one universal salinity value",
			paragraphs: [
				{
					text: "Land weathering and river transport are important salt pathways, but the ocean also exchanges chemicals with its crust. NOAA's physical hydrothermal explanation specifies that some dissolved constituents enter the fluid, others are removed, and minerals can precipitate. Do not turn that exchange into a claim that every ion only accumulates. The erroneous core-magma wording on a separate summary page is not adopted; the fact sheet's crust-water mechanism provides the relevant bounded explanation.",
					sources: ["salt", "vents"]
				},
				{
					text: "Salinity is a concentration, not simply the total salt delivered by rivers. NASA describes variation with freshwater input, evaporation and ice processes; mixing and depth also matter. A typical ocean value is not every sample's concentration, and a surface map is not a complete profile. Ask where, when and how the measurement was made. These institutional explanations are not formal consensus polls or independent datasets simply because several URLs appear; uncertainty and source dependence remain part of the answer.",
					sources: ["salinity", "thermocline"]
				}
			]
		}
	],
	questions: [
		"Is the chart measuring level, speed, direction, temperature or concentration?",
		"Which location, depth, period and reference apply?",
		"Is this an observation, an illustration or a prediction?",
		"Does the cited source justify moving from a surface view to a full-depth claim?",
		"Does a general mechanism get mistaken for a current local safety forecast?"
	],
	sources: [
		{
			id: "waves",
			title: "What causes ocean waves?",
			url: "https://oceanservice.noaa.gov/facts/wavesinocean.html",
			kind: "Technical reference",
			note: "Original NOAA energy-propagation explanation checked and explicitly qualified against a universal zero-water-transport interpretation."
		},
		{
			id: "drift",
			title: "Observation and Estimation of Lagrangian, Stokes, and Eulerian Currents Induced by Wind and Waves at the Sea Surface",
			url: "https://arxiv.org/abs/0810.3537",
			kind: "Original research abstract, 2009",
			note: "Original author abstract and DOI 10.1175/2009JPO4169.1 checked; full analysis and disclosures not audited; local magnitudes not generalized."
		},
		{
			id: "cycles",
			title: "Types and Causes of Tidal Cycles",
			url: "https://oceanservice.noaa.gov/education/tutorial_tides/tides07_cycles.html",
			kind: "Technical reference",
			note: "Original NOAA cycle definitions checked; local geometry and a tidal-versus-civil-day distinction retained."
		},
		{
			id: "products",
			title: "Tides and Currents Products",
			url: "https://tidesandcurrents.noaa.gov/products.html",
			kind: "Institutional product reference",
			note: "Original separate height and current product descriptions checked; no current station counts or live predictions adopted."
		},
		{
			id: "range",
			title: "What are spring and neap tides?",
			url: "https://oceanservice.noaa.gov/facts/springtide.html",
			kind: "Technical reference",
			note: "Original NOAA range and lunar-cycle definitions checked; not a universal height, timing or coastal safety rule."
		},
		{
			id: "tide-faq",
			title: "Tides and Currents Frequently Asked Questions",
			url: "https://tidesandcurrents.noaa.gov/faq.html",
			kind: "Technical reference",
			note: "Original NOAA variable and phase distinctions checked; no generic high-water-to-maximum-current or slack rule inferred."
		},
		{
			id: "surge",
			title: "Storm Surge Overview",
			url: "https://www.nhc.noaa.gov/surge/",
			kind: "Technical reference",
			note: "Original NHC factors and water-level definitions checked by direct HTTP 200; illustrations not used as live forecasts."
		},
		{
			id: "surge-definition",
			title: "What is storm surge?",
			url: "https://oceanservice.noaa.gov/facts/stormsurge-stormtide.html",
			kind: "Institutional explanation",
			note: "Original NOAA surge and astronomical-tide distinction checked; same parent agency as NHC, not an independent model."
		},
		{
			id: "upwelling",
			title: "What is upwelling?",
			url: "https://oceanservice.noaa.gov/facts/upwelling.html",
			kind: "Technical reference",
			note: "Original vertical-motion explanation checked, not a present rate estimate or regional circulation forecast."
		},
		{
			id: "thermocline",
			title: "What is a thermocline?",
			url: "https://oceanservice.noaa.gov/facts/thermocline.html",
			kind: "Technical reference",
			note: "Original NOAA depth-structure explanation checked; illustrated depths and temperatures not generalized to all oceans."
		},
		{
			id: "surface-temperature",
			title: "Sea Surface Temperature",
			url: "https://science.nasa.gov/earth/earth-observatory/global-maps/sea-surface-temperature/",
			kind: "Measurement description",
			note: "Original NASA top-millimeter sensing description checked; historical map is not a current full-depth temperature product."
		},
		{
			id: "salt",
			title: "Why is the ocean salty?",
			url: "https://oceanservice.noaa.gov/facts/whysalty.html",
			kind: "Technical reference",
			note: "Original pathways checked; erroneous core-magma wording excluded, and no quantitative whole-ocean salt budget adopted."
		},
		{
			id: "vents",
			title: "Hydrothermal Vents Fact Sheet",
			url: "https://oceanexplorer.noaa.gov/wp-content/uploads/2022/10/hydrothermal-vents-fact-sheet.pdf",
			kind: "Technical reference",
			note: "Original physical seawater-crust exchange section checked; biological sections and procedures not used."
		},
		{
			id: "salinity",
			title: "Salinity / Density",
			url: "https://podaac.jpl.nasa.gov/SeaSurfaceSalinity",
			kind: "Measurement description",
			note: "Original NASA variation mechanisms checked; dated mission projections and oversimplified PSU-to-mass wording not adopted."
		}
	]
};
