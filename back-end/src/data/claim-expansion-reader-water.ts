import type { SeedClaim } from "./claims.js";

export const waterCheckedAt = "2026-10-05T01:37:44.227Z";
export const readerWaterSlugs = {
	floodProbability: "does-a-100-year-flood-occur-only-once-every-hundred-years",
	stage: "does-the-same-river-level-always-mean-the-same-water-flow",
	recharge: "does-one-rainy-season-quickly-refill-every-aquifer",
	pumping: "can-groundwater-pumping-reduce-flow-in-rivers-and-streams",
	artesian: "does-every-artesian-well-flow-above-ground-without-a-pump",
	springs: "are-springs-an-unlimited-source-of-groundwater",
	porosity: "does-a-porous-rock-necessarily-make-a-productive-aquifer",
	exchange: "are-rivers-always-fed-by-groundwater-rather-than-recharging-aquifers",
	upstream: "can-flooding-occur-without-rain-at-that-location",
	levees: "do-levees-eliminate-all-flood-risk",
	waves: "do-ocean-waves-carry-the-same-water-all-the-way-from-origin-to-shore",
	cycles: "does-every-coast-have-two-equal-high-tides-each-day",
	springTides: "do-spring-tides-happen-only-in-spring",
	neap: "are-neap-tides-the-same-thing-as-low-tide",
	tidalCurrent: "is-high-tide-always-the-time-of-strongest-tidal-current",
	surge: "does-wind-alone-determine-storm-surge-height",
	vertical: "do-ocean-currents-move-water-only-horizontally",
	saltOrigin: "does-ocean-salt-come-only-from-rivers",
	salinity: "does-all-seawater-have-the-same-salinity",
	temperature: "is-ocean-temperature-uniform-from-surface-to-seafloor"
};

function source(entry: Omit<SeedClaim["sources"][number], "order">): SeedClaim["sources"][number] {
	return {
		order: 1,
		appraisal: "not_appraised",
		citationStatus: "current",
		citationCheckedAt: waterCheckedAt,
		statusSources: [entry.url!],
		isAnchor: false,
		...entry
	};
}

export const readerWaterSources = {
	flood: source({
		kind: "technical_reference",
		title: "The 100-Year Flood",
		publisher: "U.S. Geological Survey",
		url: "https://www.usgs.gov/water-science-school/science/100-year-flood",
		stance: "supports",
		note: "Original explanation checked for annual exceedance probability and consecutive events. A frequency estimate is not a schedule or a guarantee that risk is stationary. No local probability or insurance determination made."
	}),
	stream: source({
		kind: "technical_reference",
		title: "How Streamflow is Measured",
		publisher: "U.S. Geological Survey",
		url: "https://www.usgs.gov/water-science-school/science/how-streamflow-measured",
		stance: "supports",
		note: "Original rating-curve and discharge-measurement explanation checked. Channel changes, debris and ice can change the relation. Historical gauge counts are not repeated as current; no particular station was calibrated."
	}),
	aquifer: source({
		kind: "technical_reference",
		title: "Aquifers and Groundwater",
		publisher: "U.S. Geological Survey",
		url: "https://www.usgs.gov/water-science-school/science/aquifers-and-groundwater",
		stance: "supports",
		note: "Original explanation checked for connected pores, permeability, confinement and recharge variation. Educational examples do not certify a well's yield or universal refill time. Some direct fetches were denied; original browser-reader content was available."
	}),
	flow: source({
		kind: "technical_reference",
		title: "Groundwater Flow and the Water Cycle",
		publisher: "U.S. Geological Survey",
		url: "https://www.usgs.gov/index.php/special-topics/water-science-school/science/groundwater-flow-and-water-cycle",
		stance: "supports",
		note: "Original conceptual flow and travel-time explanation checked. Diagram ages illustrate different pathways, not the refill time of every aquifer or a measurement of a specific well's water."
	}),
	storage: source({
		kind: "technical_reference",
		title: "Groundwater Storage and the Water Cycle",
		publisher: "U.S. Geological Survey",
		url: "https://www.usgs.gov/water-science-school/science/groundwater-storage-and-water-cycle",
		stance: "supports",
		note: "Original storage, porosity, permeability and recharge distinctions checked. Historical global volume tables are not adopted as current estimates. Storage and transmission are not interchangeable measures of water availability."
	}),
	depletion: source({
		kind: "technical_reference",
		title: "Groundwater Decline and Depletion",
		publisher: "U.S. Geological Survey",
		url: "https://www.usgs.gov/water-science-school/science/groundwater-decline-and-depletion",
		stance: "supports",
		note: "Original explanation checked for reduced groundwater discharge and induced stream infiltration. Regional examples establish possible mechanisms, not a universal depletion rate. Direct HTTP access was limited; original reader content was checked."
	}),
	capture: source({
		kind: "context",
		title: "A New Capture Fraction Method to Map How Pumpage Affects Surface Water Flow",
		publisher: "Ground Water",
		year: 2010,
		doi: "10.1111/j.1745-6584.2010.00701.x",
		url: "https://www.usgs.gov/publications/a-new-capture-fraction-method-map-how-pumpage-affects-surface-water-flow",
		stance: "context",
		note: "Original USGS abstract, Consensus record and matching DOI metadata checked. Model-method examples, not a forecast for every basin. Full paper, supplements and acknowledgements not audited; no independent reanalysis. No linked updates returned by Crossref."
	}),
	artesian: source({
		kind: "technical_reference",
		title: "Artesian Water and Artesian Wells",
		publisher: "U.S. Geological Survey",
		url: "https://www.usgs.gov/water-science-school/science/artesian-water-and-artesian-wells",
		stance: "supports",
		note: "Original distinction between artesian head and a flowing artesian well checked. Depth alone is not the criterion. Use hydraulic head and confinement, not a literal rock-weight-only explanation or a well-design recommendation."
	}),
	spring: source({
		kind: "technical_reference",
		title: "Springs and the Water Cycle",
		publisher: "U.S. Geological Survey",
		url: "https://www.usgs.gov/water-science-school/science/springs-and-water-cycle?page=1",
		stance: "supports",
		note: "Original spring-flow factors checked: head, geology, recharge and nearby withdrawals. Flowing or clear water does not establish safe drinking water. Original content was available through the reader; no spring tested or perpetual yield certified."
	}),
	exchange: source({
		kind: "technical_reference",
		title: "Rivers Contain Groundwater",
		publisher: "U.S. Geological Survey",
		url: "https://www.usgs.gov/special-topics/water-science-school/science/rivers-contain-groundwater",
		stance: "supports",
		note: "Original gaining, losing and seasonally changing stream explanation checked. A schematic shows possible exchange, not the measured direction of every reach. Water-level relations and local connection matter."
	}),
	interaction: source({
		kind: "context",
		title: "Groundwater and Surface-Water Interactions",
		publisher: "U.S. Geological Survey",
		url: "https://water.usgs.gov/ogw/gwsw.html",
		stance: "supports",
		note: "Original institutional overview checked for connected resources and exchange in either direction. Same agency as the detailed teaching page, not an independent basin dataset or a contemporary regional water budget."
	}),
	hazards: source({
		kind: "technical_reference",
		title: "Flood Related Hazards",
		publisher: "National Weather Service",
		url: "https://www.weather.gov/safety/flood-hazards",
		stance: "supports",
		note: "Original upstream rainfall, snowmelt and river-ice examples checked. Mechanisms are not a current local warning, evacuation instruction or property-risk assessment. Historical casualty and disaster percentages are not reused."
	}),
	levee: source({
		kind: "technical_reference",
		title: "What is a Levee?",
		publisher: "U.S. Army Corps of Engineers",
		url: "https://levees.sec.usace.army.mil/levee-basics/what-is-a-levee/",
		stance: "supports",
		note: "Original definition and residual-risk explanation checked. Reduces flooding frequency; does not eliminate overtopping or failure. No engineering specifications, diagnostic certification or intervention instructions supplied."
	}),
	leveeHistory: source({
		kind: "context",
		title: "History of Levees",
		publisher: "U.S. Army Corps of Engineers",
		url: "https://levees.sec.usace.army.mil/levee-basics/history-of-levees/",
		stance: "supports",
		note: "Original risk-reduction versus risk-elimination framing checked. Same agency and program as the definition, not independent proof of a particular system's condition or an insurance/legal determination."
	}),
	waves: source({
		kind: "technical_reference",
		title: "What causes ocean waves?",
		publisher: "NOAA National Ocean Service",
		url: "https://oceanservice.noaa.gov/facts/wavesinocean.html",
		stance: "supports",
		note: "Original energy-propagation explanation checked. Its simple energy-not-water wording is qualified by drift, currents and breaking; not adopted as a universal zero-transport rule. No surf or vessel forecast made."
	}),
	drift: source({
		kind: "context",
		title: "Observation and Estimation of Lagrangian, Stokes, and Eulerian Currents Induced by Wind and Waves at the Sea Surface",
		publisher: "Journal of Physical Oceanography",
		year: 2009,
		doi: "10.1175/2009JPO4169.1",
		url: "https://arxiv.org/abs/0810.3537",
		stance: "context",
		note: "Original author abstract and DOI identity checked for wave-related Stokes drift and current decomposition. Site-specific magnitudes not generalized. Full analysis, disclosures and raw data not audited; manuscript and journal article are one study."
	}),
	cycles: source({
		kind: "technical_reference",
		title: "Types and Causes of Tidal Cycles",
		publisher: "NOAA National Ocean Service",
		url: "https://oceanservice.noaa.gov/education/tutorial_tides/tides07_cycles.html",
		stance: "supports",
		note: "Original diurnal, semidiurnal and mixed-cycle explanations checked. Local geography and timing matter; historical regional illustrations are not a tide prediction for an unspecified coast."
	}),
	springTides: source({
		kind: "technical_reference",
		title: "What are spring and neap tides?",
		publisher: "NOAA National Ocean Service",
		url: "https://oceanservice.noaa.gov/facts/springtide.html",
		stance: "supports",
		note: "Original lunar-alignment and high-to-low range explanation checked. Spring is not the season and neap is not a synonym for low water. No fixed local height, hour or safe-crossing rule inferred."
	}),
	tideFaq: source({
		kind: "technical_reference",
		title: "Tides and Currents Frequently Asked Questions",
		publisher: "NOAA Center for Operational Oceanographic Products and Services",
		url: "https://tidesandcurrents.noaa.gov/faq.html",
		stance: "supports",
		note: "Original tide-height versus current-speed and location-dependent phase explanation checked. No general high-water-to-slack or maximum-current rule. Tidal patterns need station-specific products, not this educational review."
	}),
	products: source({
		kind: "context",
		title: "Tides and Currents Products",
		publisher: "NOAA Center for Operational Oceanographic Products and Services",
		url: "https://tidesandcurrents.noaa.gov/products.html",
		stance: "supports",
		note: "Original product descriptions distinguish water-level predictions from current speed/direction predictions. Same program as FAQ, not another independent experiment. Current station counts and predictions not used."
	}),
	surge: source({
		kind: "technical_reference",
		title: "Storm Surge Overview",
		publisher: "NOAA National Hurricane Center",
		url: "https://www.nhc.noaa.gov/surge/",
		stance: "supports",
		note: "Original surge, storm tide, total-water-level and geometry factors checked by direct HTTP 200. Illustrative simulations are not forecasts. Wind is important but intensity category alone does not specify surge at every shore."
	}),
	surgeDefinition: source({
		kind: "context",
		title: "What is storm surge?",
		publisher: "NOAA National Ocean Service",
		url: "https://oceanservice.noaa.gov/facts/stormsurge-stormtide.html",
		stance: "supports",
		note: "Original surge-versus-astronomical-tide definitions checked. Same parent agency as NHC, not an independent hazard model. The page does not supply a current local total-water-level forecast."
	}),
	upwelling: source({
		kind: "technical_reference",
		title: "What is upwelling?",
		publisher: "NOAA National Ocean Service",
		url: "https://oceanservice.noaa.gov/facts/upwelling.html",
		stance: "supports",
		note: "Original wind-driven displacement, deeper-water replacement and downwelling explanation checked. Vertical motion does not require a wave parcel to travel with its crest; no fixed local rate or AMOC collapse prediction inferred."
	}),
	salt: source({
		kind: "technical_reference",
		title: "Why is the ocean salty?",
		publisher: "NOAA National Ocean Service",
		url: "https://oceanservice.noaa.gov/facts/whysalty.html",
		stance: "supports",
		note: "Original weathering and seafloor-exchange explanation checked. The page's erroneous magma-from-Earth's-core phrase is not adopted. No exact global ion budget or implication that every hydrothermal process adds every salt."
	}),
	vents: source({
		kind: "technical_reference",
		title: "Hydrothermal Vents Fact Sheet",
		publisher: "NOAA Ocean Exploration",
		url: "https://oceanexplorer.noaa.gov/wp-content/uploads/2022/10/hydrothermal-vents-fact-sheet.pdf",
		stance: "supports",
		note: "Original PDF's physical seawater-crust exchange section checked: some ions removed, others transferred and minerals precipitated. No biological methods or vent sampling procedure used. Not a whole-ocean salt-budget measurement."
	}),
	salinity: source({
		kind: "technical_reference",
		title: "Salinity / Density",
		publisher: "NASA Jet Propulsion Laboratory PO.DAAC",
		url: "https://podaac.jpl.nasa.gov/SeaSurfaceSalinity",
		stance: "supports",
		note: "Original freshwater, evaporation, ice and salinity-variation explanation checked. Dated mission forecasts and oversimplified PSU-to-mass wording not adopted. No new global salinity map or site-specific concentration produced."
	}),
	thermocline: source({
		kind: "technical_reference",
		title: "What is a thermocline?",
		publisher: "NOAA National Ocean Service",
		url: "https://oceanservice.noaa.gov/facts/thermocline.html",
		stance: "supports",
		note: "Original mixed-layer and variable thermocline explanation checked. Illustrated depths and temperatures are not universal; latitude, season and mixing matter. No current heat-content trend inferred from one profile."
	}),
	surfaceTemperature: source({
		kind: "context",
		title: "Sea Surface Temperature",
		publisher: "NASA Earth Observatory",
		url: "https://science.nasa.gov/earth/earth-observatory/global-maps/sea-surface-temperature/",
		stance: "supports",
		note: "Original MODIS surface-measurement explanation checked. A top-millimeter temperature map is not a full-depth profile. Historical weather examples and map values are not repeated as current observations."
	})
};

const common = {
	status: "published",
	reviewMode: "standard",
	consensusBand: "broad",
	agreementLevel: "broad_qualified",
	evidenceCertainty: "moderate",
	confidenceScore: 85,
	searchDatabases: [
		"USGS original water-science and publication pages",
		"NOAA, NWS and USACE original measurement explanations",
		"NASA original measurement descriptions",
		"Consensus.app targeted groundwater discovery",
		"Original author abstracts and Crossref linked-update metadata"
	],
	searchCutoffAt: waterCheckedAt,
	inclusionRules: [
		"Separate measured quantity, mechanism and site-specific prediction.",
		"Retain variable geography, time scale and shared institutional provenance."
	],
	exclusionRules: [
		"No invented expert vote, reader request or independent reanalysis.",
		"No current local warning, safe-navigation rule, engineering instruction, drinking-water certification or biological procedure."
	],
	appraisalTools: [
		"Structured measurement-definition, applicability and institutional-dependence check; no formal risk-of-bias score",
		"DOI identity and linked-update checks for cited papers, not exhaustive integrity clearance"
	],
	authorLine: "AI-assisted synthesis prepared for Is There Consensus.",
	reviewerLine: "Primary sources checked by an AI agent; independent expert review not completed.",
	independenceSummary:
		"Related agency teaching pages are not independent datasets or a formal consensus poll. The legacy confidence score is editorial, not a measured fraction of researchers agreeing. No raw observations, local hazard model or well yield was independently analyzed.",
	lastRetractionCheckAt: waterCheckedAt
} satisfies Partial<SeedClaim>;

function sourcesFor(...entries: SeedClaim["sources"][number][]) {
	return entries.map((entry, index) => ({ ...entry, order: index + 1, isAnchor: index === 0 }));
}

function publication(
	id: string,
	focus: string
): Pick<SeedClaim, "changeLog" | "readerAnnouncement" | "surveillanceSpec"> {
	const summary = `New review: ${focus}.`;
	return {
		changeLog: [{ date: waterCheckedAt, kind: "publication", summary }],
		readerAnnouncement: { id, date: waterCheckedAt, kind: "new_review", bottomLineImpact: "new", summary },
		surveillanceSpec: {
			focus,
			cadenceDays: 90,
			watchTerms: [focus],
			integrityMonitors: ["Corrections and notices for cited original papers"],
			guidelineMonitors: ["USGS, NOAA and USACE measurement explanations"],
			triggerRules: [
				"Reassess when definitions, applicable observations or source qualifications change the scoped interpretation."
			]
		}
	};
}

export const readerWaterClaims: SeedClaim[] = [
	{
		...common,
		topicSlug: "earth-and-geoscience",
		title: "Does a 100-year flood occur only once every hundred years?",
		slug: readerWaterSlugs.floodProbability,
		bottomLine:
			"No. The term conventionally means a flood magnitude with an estimated 1% chance of being equaled or exceeded in a given year. It is not an appointment every hundred years. Comparable floods can occur in consecutive years, and having one does not make the next year immune. The estimate depends on the place, data and assumptions.",
		stableCore: [
			"An annual exceedance probability describes a threshold and a chance, not the interval that must separate actual events.",
			"USGS explicitly distinguishes the recurrence terminology from a fixed schedule; observations over a limited record inform an estimate rather than a guarantee.",
			"A probability assigned to one river reach cannot simply be transferred to another river, property or future period with different conditions."
		],
		editorSummary:
			"When reading a flood headline, ask whether the label refers to flow, water level or another mapped threshold, and where that threshold was estimated. Several damaging floods close together do not by themselves disprove the probabilistic definition. Nor does a quiet recent decade prove that the remaining decades are protected. Changing catchments and updated observations can require a different estimate; this review does not calculate a property's risk.",
		openQuestions: ["How well does a local estimate represent present and changing catchment conditions?"],
		whatWouldChangeMinds: [
			"New station data and defensible frequency analyses can change a local threshold or probability, not convert probability into a calendar."
		],
		misconceptions: [
			"A recent flood does not reset a hundred-year safety clock.",
			"The label is not a guarantee of only one event per century."
		],
		misconceptionTags: [
			"100 year flood",
			"hundred year flood",
			"annual exceedance",
			"return period",
			"flood probability"
		],
		uncertaintySummary:
			"The probability definition is clear; site-specific estimates carry sampling and model uncertainty and may not remain stationary. No insurance, legal or emergency determination is made.",
		uncertaintyDrivers: [
			{
				type: "imprecision",
				detail: "Short records and changing conditions affect an estimated local frequency."
			}
		],
		evidenceSummaries: [
			{
				question: "Is a return period a fixed event schedule?",
				population: "Flood-frequency terminology for a specified location",
				finding: "It describes annual exceedance probability, not guaranteed spacing.",
				effectDirection: "supports",
				magnitude: "1% annual exceedance convention, not a property prediction.",
				certainty: "high",
				limitations: ["Local threshold", "Finite observations", "Possible nonstationarity"]
			}
		],
		institutionalAnchors: [{ name: "USGS Water Science School", role: "Flood-frequency definition" }],
		coiSummary:
			"USGS and NWS explain definitions and hazards. These are institutional references, not an independent appraisal of a particular flood map.",
		...publication("21460a90-58e7-4a00-9fd4-6d00b97dc1f3", "annual flood probability versus a calendar"),
		sources: sourcesFor(readerWaterSources.flood, readerWaterSources.hazards)
	},
	{
		...common,
		topicSlug: "earth-and-geoscience",
		title: "Does the same river level always mean the same water flow?",
		slug: readerWaterSlugs.stage,
		bottomLine:
			"No universal relation exists. Stage is water level relative to a reference; discharge is water volume passing per unit time. A station's rating curve relates them using measurements, but channel changes and other conditions can alter that relation. Equal heights at different rivers, or under changed conditions at one station, do not guarantee equal discharge.",
		stableCore: [
			"A height measurement and a flow measurement have different units and answer different questions about a river.",
			"USGS derives station-specific stage-discharge relations from flow measurements rather than treating one water height as a universal amount of passing water.",
			"Erosion, deposition, debris and ice can change channel conditions and require updating or qualifying a rating relation."
		],
		editorSummary:
			"A graph of river level is useful without being a direct photograph of every component of flow. The reference datum, location and measurement period belong with the number. Compare like quantities before announcing that two rivers carry the same amount of water. If a channel has changed, a previous calibration needs scrutiny rather than automatic reuse. This distinction also prevents mixing a probability assigned to a flow threshold with an unrelated height elsewhere.",
		openQuestions: ["Which rating and channel conditions apply to a specific station and observation?"],
		whatWouldChangeMinds: [
			"Fresh discharge measurements can revise a station's rating; they do not erase the distinction between height and volume per time."
		],
		misconceptions: [
			"The same height in two rivers is not necessarily the same flow.",
			"A rating curve is a measured relationship, not a permanent universal constant."
		],
		misconceptionTags: ["river level", "stream stage", "discharge", "rating curve", "water flow"],
		uncertaintySummary:
			"The definitions are established. Converting an observed level to flow requires the applicable local relation and its uncertainty; no live gauge reading is interpreted here.",
		uncertaintyDrivers: [
			{ type: "indirectness", detail: "A level-to-flow conversion depends on measured local channel conditions." }
		],
		evidenceSummaries: [
			{
				question: "Can height alone specify discharge everywhere?",
				population: "Stream-gauge measurements",
				finding: "Discharge is inferred with a site-specific, maintained relation.",
				effectDirection: "supports",
				magnitude: "Measurement distinction, not a universal conversion factor.",
				certainty: "high",
				limitations: ["Changing channel", "Station datum", "Calibration uncertainty"]
			}
		],
		institutionalAnchors: [{ name: "USGS stream gauging", role: "Stage-discharge measurement methods" }],
		coiSummary:
			"The two USGS explanations share institutional provenance. No raw station observations, current ratings or local flood assessment were independently checked.",
		...publication("dadee950-06e1-48a2-bb43-9c8181b2ba5d", "river height versus measured discharge"),
		sources: sourcesFor(readerWaterSources.stream, readerWaterSources.flood)
	},
	{
		...common,
		topicSlug: "earth-and-geoscience",
		title: "Does one rainy season quickly refill every aquifer?",
		slug: readerWaterSlugs.recharge,
		bottomLine:
			"No. Rain falling on the surface is not automatically aquifer recharge. Some water runs off or returns to the atmosphere, while infiltrating water must follow local pathways to groundwater. Geology, confinement, depth and existing withdrawals influence response. A wet season can help some shallow systems without rapidly replacing water removed from every deep or slowly recharged aquifer.",
		stableCore: [
			"Infiltration into soil and recharge reaching an aquifer are different steps; a rainfall total alone does not measure the second.",
			"Groundwater pathways and residence times differ across geologic settings, so one conceptual water-cycle arrow does not imply one universal refill time.",
			"A water-level response should be interpreted alongside the connected aquifer, recharge processes and withdrawals, not as proof that an entire reserve has been restored."
		],
		editorSummary:
			"Ask what recovered: rainfall, near-surface soil wetness, the level in one well or a basin water balance. Those are related observations, not synonyms. A shallow response and a deep supply can follow different time scales. The amount available also depends on how much continues to be removed. This review explains why a reassuring seasonal headline cannot certify every aquifer's recovery; it offers neither a drought forecast nor a well-management prescription.",
		openQuestions: ["What recharge pathways, delays and withdrawals control a particular aquifer?"],
		whatWouldChangeMinds: [
			"Site-specific levels and a defensible water balance could establish recovery in that aquifer, not universal rapid recovery."
		],
		misconceptions: [
			"A wet soil surface is not a direct measurement of deep recharge.",
			"A rainy year does not cancel every legacy of groundwater withdrawal."
		],
		misconceptionTags: ["aquifer recharge", "rainy season", "groundwater refill", "infiltration", "recharge lag"],
		uncertaintySummary:
			"Response time and the amount recharged are site-dependent. Conceptual diagram ages are illustrative, not a clock assigned to every water reserve.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail: "Different depths, pathways and geology prevent a universal recovery time."
			}
		],
		evidenceSummaries: [
			{
				question: "Does surface rain establish rapid aquifer replenishment?",
				population: "Aquifers with different recharge pathways",
				finding: "Recharge and recovery depend on the local system and water balance.",
				effectDirection: "supports",
				magnitude: "No universal refill time.",
				certainty: "high",
				limitations: ["Geologic variation", "Withdrawals", "No local water budget"]
			}
		],
		institutionalAnchors: [{ name: "USGS groundwater science", role: "Recharge and flow-path distinctions" }],
		coiSummary:
			"USGS teaching resources provide conceptual mechanisms, not multiple independent recovery studies. No present basin budget or well record was reanalyzed.",
		...publication("b4971581-04d5-43ba-9546-ed61630bb29a", "rainfall, recharge pathways and aquifer recovery"),
		sources: sourcesFor(readerWaterSources.flow, readerWaterSources.aquifer)
	},
	{
		...common,
		topicSlug: "earth-and-geoscience",
		title: "Can groundwater pumping reduce flow in rivers and streams?",
		slug: readerWaterSlugs.pumping,
		bottomLine:
			"Yes. Pumping a connected aquifer can reduce groundwater discharge to a stream or induce stream water to enter the aquifer. Streamflow depletion can therefore occur without a pump sitting in the river. Its size, location and timing depend on the aquifer, connection and pumping history; the effect is not identical or instantaneous at every well.",
		stableCore: [
			"USGS distinguishes water taken from groundwater storage from changes in exchanges with streams and other discharge boundaries.",
			"Reducing groundwater head can intercept water that otherwise would have supported streamflow or change the direction and amount of exchange.",
			"The cited capture-method paper illustrates model-based spatial differences; one method or basin example does not provide a transferable numerical depletion rate."
		],
		editorSummary:
			"The useful comparison is not underground water versus river water as permanently separate inventories. It is the linked system with and without a particular withdrawal over a specified period. A delayed response can be relevant even when the river looks unchanged immediately after pumping starts. To quantify it requires observations and an applicable model, not just measuring the distance from a well to the bank. No pumping allocation or local ecological impact is calculated here.",
		openQuestions: ["How much depletion occurs, where, and on what time scale in the specified connected basin?"],
		whatWouldChangeMinds: [
			"Local observations and validated models can revise estimated capture and delays without overturning the established possibility of streamflow depletion."
		],
		misconceptions: [
			"A pump need not be in the river to affect river flow.",
			"An effect that is delayed is not necessarily absent."
		],
		misconceptionTags: ["groundwater pumping", "streamflow depletion", "capture", "rivers", "recharge lag"],
		uncertaintySummary:
			"The mechanism is established; attribution and rates require a local analysis. The original paper was checked at abstract and metadata level, not independently appraised in full.",
		uncertaintyDrivers: [{ type: "indirectness", detail: "Model examples do not measure every well's effect." }],
		evidenceSummaries: [
			{
				question: "Can aquifer withdrawals change connected streamflow?",
				population: "Hydraulically connected aquifer-stream systems",
				finding: "Reduced discharge or induced infiltration can deplete streamflow.",
				effectDirection: "supports",
				magnitude: "Site- and time-dependent; no universal fraction.",
				certainty: "high",
				limitations: ["Hydraulic connection", "Pumping history", "Abstract-only paper check"]
			}
		],
		institutionalAnchors: [
			{ name: "USGS groundwater research", role: "Connected-system mechanism and capture methods" }
		],
		coiSummary:
			"The teaching explanation and cited paper's USGS record share agency involvement. Full paper funding and acknowledgements were not audited. Consensus discovery and the original abstract are one publication, not independent studies.",
		...publication("6691e073-d956-4afc-a987-c6cd96b084fb", "pumping-related streamflow depletion and timing"),
		sources: sourcesFor(readerWaterSources.depletion, readerWaterSources.capture)
	},
	{
		...common,
		topicSlug: "earth-and-geoscience",
		title: "Does every artesian well flow above ground without a pump?",
		slug: readerWaterSlugs.artesian,
		bottomLine:
			"No. Artesian conditions mean water in a confined aquifer rises in a well above the top of that aquifer because of hydraulic head. It is a flowing artesian well only if that head raises water above the outlet. The level can remain below the ground surface, so artesian does not automatically mean a self-flowing fountain.",
		stableCore: [
			"Confinement and hydraulic head distinguish artesian conditions; the drilled depth by itself does not define an artesian well.",
			"The level water would rise to and the elevation of the ground or well outlet are separate reference points.",
			"A well can show artesian pressure relative to its aquifer while still requiring a pump to deliver water at the surface."
		],
		editorSummary:
			"A diagram should identify both the aquifer and the possible standing water level. Without those references, the word pressure can sound like a promise of unlimited water at any elevation. Regional recharge and head explain the physical setting better than a rock-weight-only story. Changing head can also change whether a particular outlet flows. This interpretation does not establish water quality, yield, permanence or how a well should be constructed or operated.",
		openQuestions: ["Where is the current hydraulic head relative to a particular well outlet?"],
		whatWouldChangeMinds: [
			"Measured head and outlet elevation can establish flowing conditions at that site; they do not make every artesian well self-flowing."
		],
		misconceptions: [
			"Artesian and flowing artesian are not identical labels.",
			"A deeper hole is not automatically an artesian supply."
		],
		misconceptionTags: ["artesian well", "flowing artesian", "hydraulic head", "confined aquifer", "well pressure"],
		uncertaintySummary:
			"The definitions are established; head, outlet elevation and changes over time are local observations. No well condition or drinking-water quality is certified.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail: "One illustrated flowing well does not represent all confined aquifers."
			}
		],
		evidenceSummaries: [
			{
				question: "Does artesian head necessarily reach above ground?",
				population: "Wells intersecting confined aquifers",
				finding: "Only sufficient head relative to the outlet produces surface flow.",
				effectDirection: "supports",
				magnitude: "Elevation comparison, not a yield estimate.",
				certainty: "high",
				limitations: ["Outlet elevation", "Changing head", "Local aquifer geometry"]
			}
		],
		institutionalAnchors: [{ name: "USGS Water Science School", role: "Artesian and flowing-well definitions" }],
		coiSummary:
			"Both educational references are from USGS. They explain terms, not independently tested performance claims for a named well or commercial water source.",
		...publication("8bd50a4f-9d41-489c-ad0e-9fe167a789d0", "artesian head versus surface flow"),
		sources: sourcesFor(readerWaterSources.artesian, readerWaterSources.aquifer)
	},
	{
		...common,
		topicSlug: "earth-and-geoscience",
		title: "Are springs an unlimited source of groundwater?",
		slug: readerWaterSlugs.springs,
		bottomLine:
			"No. A spring is groundwater discharging where local conditions provide a path to the surface. Flow depends on recharge, hydraulic head, geology and withdrawals. Some springs flow persistently; others are intermittent, weaken during dry periods or respond to nearby pumping. Seeing water emerge naturally is not proof of an unlimited reserve or guaranteed future flow.",
		stableCore: [
			"A spring is an outlet of a groundwater system, not an independent source that creates water as it emerges.",
			"USGS distinguishes intermittent seeps from persistent flows and identifies recharge and withdrawals among the factors affecting discharge.",
			"The condition observed during a visit is one point in a variable flow record; appearance does not establish sustainable yield or water purity."
		],
		editorSummary:
			"Ask which connected system supplies the outlet and how its flow varies over time. A photograph can show discharge while telling little about the balance between recharge and losses. The same connected-resource reasoning used for streams helps explain why a nearby withdrawal may matter. A source described as perennial can still change. This review is about physical supply and variability, not a drinking-water endorsement, a contamination test or advice for modifying a spring.",
		openQuestions: ["How stable is discharge under the spring's actual recharge and withdrawal conditions?"],
		whatWouldChangeMinds: [
			"A long flow record and local water budget could establish a bounded supply estimate, not an unlimited resource."
		],
		misconceptions: [
			"Natural emergence does not imply endless supply.",
			"Clear flowing water is not a drinking-water certificate."
		],
		misconceptionTags: ["spring water", "groundwater spring", "perennial spring", "drought", "spring flow"],
		uncertaintySummary:
			"Flow sensitivity and persistence differ by spring and aquifer. No local flow series or quality analysis was performed.",
		uncertaintyDrivers: [
			{ type: "imprecision", detail: "An isolated observation does not establish long-term supply." }
		],
		evidenceSummaries: [
			{
				question: "Does a natural spring imply unlimited water?",
				population: "Groundwater discharge outlets",
				finding: "Spring flow depends on the supplying system's conditions and water balance.",
				effectDirection: "supports",
				magnitude: "Variable discharge, not perpetual yield.",
				certainty: "high",
				limitations: ["Recharge variation", "Withdrawals", "No water-quality inference"]
			}
		],
		institutionalAnchors: [
			{ name: "USGS groundwater education", role: "Spring discharge and groundwater storage" }
		],
		coiSummary:
			"The references share USGS provenance. No vendor claim, spring-specific monitoring dataset or independently verified resource estimate is endorsed.",
		...publication("9132abd3-8989-46ba-b2a8-bfca782e175b", "spring discharge and finite groundwater supply"),
		sources: sourcesFor(readerWaterSources.spring, readerWaterSources.storage)
	},
	{
		...common,
		topicSlug: "earth-and-geoscience",
		title: "Does high porosity necessarily make a productive aquifer?",
		slug: readerWaterSlugs.porosity,
		bottomLine:
			"No. Porosity describes the fraction of space available in a material; permeability describes how readily connected pathways transmit water. A rock or sediment can contain water without delivering it readily to a well. Aquifer productivity depends on transmission, saturation, geometry and local conditions, not pore space alone. Water stored underground and water practically supplied are different quantities.",
		stableCore: [
			"USGS distinguishes the ability to hold water from the ability to move it through a material.",
			"Pore connectivity and the characteristics of the flow paths matter, so a porosity number alone does not establish a useful flow rate.",
			"Being water-bearing is not sufficient evidence that a particular well can sustain a specified withdrawal or that recharge can replace it."
		],
		editorSummary:
			"The everyday sponge analogy helps explain storage but can hide the difference between holding water and transmitting it. Geological names and broad material descriptions are not substitutes for observations of the actual formation. A claim about underground volume should not silently become a claim about a usable supply rate. Nor does a demonstrated short-term well yield establish a permanent water budget. This review explains two properties rather than recommending drilling, pumping or engineering tests.",
		openQuestions: ["What transmission and storage properties characterize the specific saturated formation?"],
		whatWouldChangeMinds: [
			"Local measurements can establish productive conditions; a storage-only statistic cannot settle yield."
		],
		misconceptions: [
			"Many pores do not necessarily make fast connected flow paths.",
			"A water volume and a water-supply rate are not the same measurement."
		],
		misconceptionTags: ["porosity", "permeability", "aquifer productivity", "groundwater storage", "well yield"],
		uncertaintySummary:
			"The property distinction is established; formation-scale properties, yield and recharge require local evidence. No drilling or yield certification is supplied.",
		uncertaintyDrivers: [
			{ type: "indirectness", detail: "Storage properties alone do not measure transmission or sustained yield." }
		],
		evidenceSummaries: [
			{
				question: "Does pore volume alone establish productive groundwater flow?",
				population: "Water-bearing geologic materials",
				finding: "Connectivity and permeability are necessary to interpret transmission.",
				effectDirection: "supports",
				magnitude: "Separate physical properties, not a universal yield cutoff.",
				certainty: "high",
				limitations: ["Formation heterogeneity", "Saturation", "Local geometry"]
			}
		],
		institutionalAnchors: [{ name: "USGS Water Science School", role: "Storage versus transmission definitions" }],
		coiSummary:
			"USGS supplies both conceptual references. These are not two independent commercial aquifer surveys or endorsements of a particular groundwater-development claim.",
		...publication("a1f77489-f613-4165-b41d-8f07f6bb3166", "porosity versus groundwater transmission"),
		sources: sourcesFor(readerWaterSources.storage, readerWaterSources.aquifer)
	},
	{
		...common,
		topicSlug: "earth-and-geoscience",
		title: "Are rivers always gaining groundwater rather than losing water to aquifers?",
		slug: readerWaterSlugs.exchange,
		bottomLine:
			"No. A gaining reach receives groundwater, while a losing reach sends stream water into the ground. Different reaches of one river can do different things, and direction can change over time with water levels and local connection. Groundwater and rivers are linked resources, but that does not mean exchange always runs from the aquifer into the river.",
		stableCore: [
			"USGS describes gaining, losing and mixed river reaches rather than one universal direction of exchange.",
			"The relation between stream-water level and nearby groundwater head helps explain exchange in hydraulically connected settings.",
			"A reach can change between gaining and losing conditions over a seasonal cycle; a schematic or regional label is not a measurement of every section."
		],
		editorSummary:
			"Ask where along the river and when the observation was made. A river's name identifies neither one hydraulic relation nor a single underground connection along its entire course. A local water-level comparison belongs in a broader account of the geometry and permeability, not a universal rule that every river recharges every aquifer. This distinction matters when interpreting statements about water availability, but it does not supply a basin budget or a current measurement at an unspecified reach.",
		openQuestions: ["Which reaches exchange water in which direction during the specified period?"],
		whatWouldChangeMinds: [
			"Reach-specific levels and flow observations can revise an exchange estimate; they cannot establish a universal direction for all rivers."
		],
		misconceptions: [
			"A river may gain in one reach and lose in another.",
			"A seasonal observation is not a permanent direction label."
		],
		misconceptionTags: [
			"gaining stream",
			"losing stream",
			"groundwater river exchange",
			"baseflow",
			"river recharge"
		],
		uncertaintySummary:
			"Local connection and flow direction need observations. The established possibility of exchange in either direction does not prove every stream is equally connected.",
		uncertaintyDrivers: [{ type: "generalizability", detail: "Exchange varies across reaches, geology and time." }],
		evidenceSummaries: [
			{
				question: "Is river-groundwater exchange always outward from the aquifer?",
				population: "Stream reaches in different hydraulic settings",
				finding: "Streams can gain, lose or change direction with conditions.",
				effectDirection: "supports",
				magnitude: "Directional distinction, not a measured basin balance.",
				certainty: "high",
				limitations: ["Hydraulic connection", "Reach specificity", "Seasonality"]
			}
		],
		institutionalAnchors: [
			{ name: "USGS groundwater and surface-water science", role: "Bidirectional exchange framework" }
		],
		coiSummary:
			"The detailed explanation and overview share USGS provenance. They do not constitute independent measurements of a particular river's present groundwater contribution.",
		...publication("d3416f62-c88e-4615-b043-6dac5c8a9c3b", "gaining and losing river reaches"),
		sources: sourcesFor(readerWaterSources.exchange, readerWaterSources.interaction)
	},
	{
		...common,
		topicSlug: "earth-and-geoscience",
		title: "Can flooding occur without rain at that location?",
		slug: readerWaterSlugs.upstream,
		bottomLine:
			"Yes. Water from upstream rainfall can reach a place where the sky is clear. Snowmelt and river-ice effects can also contribute to flooding without rain falling at the flooded location. The relevant system is the connected catchment and water movement, not only today's weather overhead. A dry local observation does not establish that a river is safe.",
		stableCore: [
			"NWS describes river flooding from rain far upstream as well as flooding associated with snowmelt and ice jams.",
			"A river conveys water across a catchment, so the location generating runoff and the place where high water occurs need not coincide.",
			"Level and flow are local observations with an upstream context; a clear sky is not a replacement for that information."
		],
		editorSummary:
			"The question is where the water came from and how it moves through the connected system. A local rain gauge cannot observe every part of a basin, and sunshine does not undo runoff already traveling downstream. Different mechanisms also imply different timing and spatial patterns. This review provides the conceptual distinction rather than a warning service. It does not infer that flooding is happening at a named river, estimate its arrival time or provide emergency-response instructions.",
		openQuestions: ["What upstream inputs and river conditions explain a particular high-water event?"],
		whatWouldChangeMinds: [
			"A basin-specific event analysis could change attribution and timing, not the possibility of flooding without local rain."
		],
		misconceptions: [
			"Flood-producing rain need not fall where flooding is observed.",
			"A blue sky is not a river-flow measurement."
		],
		misconceptionTags: ["flooding without rain", "upstream rain", "snowmelt", "ice jam", "river flood"],
		uncertaintySummary:
			"Event timing and cause require current catchment and river information. No present hazard or safe condition is determined here.",
		uncertaintyDrivers: [
			{ type: "indirectness", detail: "Local weather alone does not observe a connected upstream water system." }
		],
		evidenceSummaries: [
			{
				question: "Must flood-producing rain fall at the flooded site?",
				population: "Connected river catchments",
				finding: "Upstream inputs and non-rainfall mechanisms can cause local high water.",
				effectDirection: "supports",
				magnitude: "Mechanism distinction, not a local forecast.",
				certainty: "high",
				limitations: ["Travel time", "Upstream conditions", "Current observations required"]
			}
		],
		institutionalAnchors: [{ name: "National Weather Service", role: "Flood-generating mechanisms" }],
		coiSummary:
			"NWS hazard education and USGS gauging methods are complementary agency references, not independent forecasts for a named river or current emergency advice.",
		...publication("1e7aa713-ddd4-4197-82d4-862b7ab8173b", "upstream and nonlocal causes of flooding"),
		sources: sourcesFor(readerWaterSources.hazards, readerWaterSources.stream)
	},
	{
		...common,
		topicSlug: "earth-and-geoscience",
		title: "Do levees eliminate all flood risk?",
		slug: readerWaterSlugs.levees,
		bottomLine:
			"No. Levees can reduce the frequency or intensity of flooding in a protected area, but residual risk remains. Water can exceed the system's capacity, and a system can fail. Other flooding mechanisms can also matter. A levee's presence is not proof that every possible flood has been prevented or that a particular property faces zero risk.",
		stableCore: [
			"USACE defines a levee as a barrier intended to reduce flooding frequency, not eliminate every flood possibility.",
			"The agency's explanation explicitly retains overtopping and failure among the residual hazards even when a levee benefits a community.",
			"Performance depends on the system and the event; a generic description cannot certify a particular levee's condition or today's level of protection."
		],
		editorSummary:
			"Read protected as a bounded risk-reduction claim rather than an absolute promise. The relevant questions include which water source and event range the system addresses, and what evidence supports its assessed condition. A historical success does not demonstrate immunity to every future event. Equally, recognizing residual risk does not mean levees provide no benefit. This review offers neither a design standard nor inspection, modification, insurance or legal advice about a named system or property.",
		openQuestions: [
			"What residual flood pathways and bounded performance assessment apply to this particular system?"
		],
		whatWouldChangeMinds: [
			"System-specific assessments can change a bounded protection estimate, not justify a universal zero-risk claim."
		],
		misconceptions: [
			"Risk reduction is not risk elimination.",
			"A levee's existence does not certify every structure behind it."
		],
		misconceptionTags: ["levee", "floodwall", "residual flood risk", "flood protection", "overtopping"],
		uncertaintySummary:
			"System condition and event-specific performance require appropriate local assessment. No technical certification, current safety judgment or intervention instructions are supplied.",
		uncertaintyDrivers: [
			{ type: "generalizability", detail: "A general risk framework cannot certify an individual system." }
		],
		evidenceSummaries: [
			{
				question: "Does a levee establish zero remaining flood risk?",
				population: "Areas receiving levee-system protection",
				finding: "Useful risk reduction coexists with residual hazards.",
				effectDirection: "supports",
				magnitude: "Bounded protection, not zero probability.",
				certainty: "high",
				limitations: ["System condition", "Event magnitude", "Other flooding pathways"]
			}
		],
		institutionalAnchors: [
			{ name: "USACE National Levee Database", role: "Definition and residual-risk explanation" }
		],
		coiSummary:
			"Both references are from the same USACE program. They describe limitations, not an outside audit or certification of any named levee.",
		...publication("0fcdd7f4-9941-43ba-bbd7-947b5b915ed6", "levee protection and residual flood risk"),
		sources: sourcesFor(readerWaterSources.levee, readerWaterSources.leveeHistory)
	},
	{
		...common,
		topicSlug: "oceans-and-marine-science",
		title: "Do ocean waves carry the same water all the way from origin to shore?",
		slug: readerWaterSlugs.waves,
		bottomLine:
			"Not generally. A traveling wave pattern transfers energy while water parcels mainly oscillate locally; the pattern is not a conveyor carrying one fixed parcel across the ocean. This is not a zero-transport rule: wave-related Stokes drift, underlying currents and breaking can move water. The motion of a crest and the trajectory of a parcel must be distinguished.",
		stableCore: [
			"NOAA's wave explanation separates propagation of a disturbance from moving the entire water mass with that disturbance.",
			"The simple oscillating-parcel picture is an approximation, not proof that waves can never contribute to net water movement.",
			"The cited original current-study abstract distinguishes a wave-related drift component from other current components, without establishing a universal drift speed."
		],
		editorSummary:
			"Watching a crest move along a photograph does not track a labeled water parcel. Conversely, a floating object can drift without traveling at the crest's propagation speed. Both observations can be real because they measure different motions. The distinction is especially important before extending a simple deep-water illustration to breaking waves or coastal circulation. This review does not reproduce a transport calculation, forecast surf conditions or supply a safe swimming or vessel-navigation rule.",
		openQuestions: [
			"How large are drift and other current contributions in the specified wave field and location?"
		],
		whatWouldChangeMinds: [
			"Parcel tracking and applicable wave-current analysis can revise a transport estimate without equating every crest with one traveling parcel."
		],
		misconceptions: [
			"Energy propagation does not mean a fixed water parcel crosses with each crest.",
			"An educational oscillation diagram is not proof of zero net transport."
		],
		misconceptionTags: ["ocean waves", "water particles", "Stokes drift", "wave energy", "crest motion"],
		uncertaintySummary:
			"Exact parcel motion depends on waves, currents, depth and breaking. The cited study was checked at abstract level; its site-specific magnitudes were not generalized.",
		uncertaintyDrivers: [
			{
				type: "generalizability",
				detail: "A simplified parcel path does not encompass all coastal wave-current conditions."
			}
		],
		evidenceSummaries: [
			{
				question: "Does a crest track the same water from origin to shore?",
				population: "Traveling ocean wave fields",
				finding: "Pattern propagation and parcel motion differ; drift can coexist with oscillation.",
				effectDirection: "supports",
				magnitude: "No universal zero-transport or drift-speed claim.",
				certainty: "high",
				limitations: ["Currents", "Breaking", "Abstract-only supplementary study"]
			}
		],
		institutionalAnchors: [{ name: "NOAA ocean education", role: "Wave propagation versus parcel motion" }],
		coiSummary:
			"NOAA provides the basic explanation; the original paper abstract provides a bounded drift qualification. Full funding and disclosures were not audited; manuscript and journal article are one study.",
		...publication("70416737-ce21-4708-b519-8146a6e3532b", "wave propagation versus water-parcel transport"),
		sources: sourcesFor(readerWaterSources.waves, readerWaterSources.drift)
	},
	{
		...common,
		topicSlug: "oceans-and-marine-science",
		title: "Does every coast have two equal high tides each day?",
		slug: readerWaterSlugs.cycles,
		bottomLine:
			"No. Coasts can have diurnal, semidiurnal or mixed tidal patterns. Some have one principal high and low tide in a tidal day; others have two, which may differ substantially in height. Basin shape and local geography modify the response. A familiar two-high-tide diagram is not a universal schedule for every coast or every civil day.",
		stableCore: [
			"NOAA distinguishes one-cycle, two-cycle and unequal mixed tidal patterns rather than assigning one pattern to all shores.",
			"The response of water to tidal forcing depends on basin and coastal characteristics, not only the position of the Moon.",
			"The applicable local observation or prediction matters; a generic classroom diagram cannot establish a particular coast's heights and times."
		],
		editorSummary:
			"A tide chart should identify the station and date before its pattern is compared with another location. Counting peaks over a calendar day is not identical to defining a tidal cycle, and two peaks need not be equal. One illustrated cycle therefore teaches a possible pattern, not a global timetable. The same care is needed before translating water-level changes into currents, which are separate observations. No current local tide table, station coverage count or navigation recommendation is supplied.",
		openQuestions: ["Which cycle and unequal-height pattern apply to the specified coast and period?"],
		whatWouldChangeMinds: [
			"Local records can refine the pattern and prediction without establishing two equal high tides everywhere."
		],
		misconceptions: [
			"Two daily high tides need not be equal.",
			"One coast's tidal pattern is not a universal timetable."
		],
		misconceptionTags: ["diurnal tide", "semidiurnal tide", "mixed tide", "high tides", "tidal day"],
		uncertaintySummary:
			"Cycle types are established; heights, timing and non-tidal changes are local. No unspecified shore's tide schedule is predicted.",
		uncertaintyDrivers: [
			{ type: "generalizability", detail: "Geography changes the local response to tidal forcing." }
		],
		evidenceSummaries: [
			{
				question: "Is one two-equal-high-tides diagram universal?",
				population: "Coastal tidal regimes",
				finding: "Diurnal, semidiurnal and mixed patterns differ.",
				effectDirection: "supports",
				magnitude: "Cycle classification, not local predicted heights.",
				certainty: "high",
				limitations: ["Local geometry", "Tidal versus civil day", "Non-tidal water levels"]
			}
		],
		institutionalAnchors: [{ name: "NOAA National Ocean Service", role: "Tidal-cycle classification" }],
		coiSummary:
			"NOAA teaching and product descriptions share agency provenance. They are not independent new tidal records, and no current station series was analyzed.",
		...publication("6889914d-8a5c-47eb-9a3a-2c55e4103956", "local tidal cycles and unequal high waters"),
		sources: sourcesFor(readerWaterSources.cycles, readerWaterSources.products)
	},
	{
		...common,
		topicSlug: "oceans-and-marine-science",
		title: "Do spring tides happen only in spring?",
		slug: readerWaterSlugs.springTides,
		bottomLine:
			"No. Spring tides describe relatively large high-to-low tidal ranges associated with the Sun and Moon's aligned forcing near new and full moon. They occur through the year, not only during the spring season. The label describes the range pattern; it does not provide a fixed high-water height or exact time at an unspecified coast.",
		stableCore: [
			"NOAA uses spring tide for enhanced tidal range, not a calendar-season category.",
			"New- and full-moon geometry contributes to this range cycle while the coastal response determines local details.",
			"Range means the difference between high and low water, not the same quantity as one high-tide elevation above an unspecified datum."
		],
		editorSummary:
			"Separate the lunar-cycle label from the season and from the predicted height at a station. A large range involves both ends of a water-level cycle, so quoting only a high-water number without its reference can obscure the definition. The lunar explanation also does not erase variations among coasts. A source about forcing is not a replacement for locally applicable predictions or current conditions. This review does not identify a safe time to cross a shoreline or navigate an inlet.",
		openQuestions: ["How does the range cycle appear in the specified local observations and predictions?"],
		whatWouldChangeMinds: [
			"Local records can revise detailed timing and range, not make spring tide exclusive to the spring season."
		],
		misconceptions: [
			"Spring tide is not a tide season.",
			"Large range does not mean a single universal high-water elevation."
		],
		misconceptionTags: ["spring tide", "full moon", "new moon", "tidal range", "spring season"],
		uncertaintySummary:
			"The naming and forcing distinction is established. Local range and timing depend on the coastal response; no universal exact height or hour is asserted.",
		uncertaintyDrivers: [
			{ type: "generalizability", detail: "A forcing pattern does not specify every coast's height and phase." }
		],
		evidenceSummaries: [
			{
				question: "Is spring tide confined to one season?",
				population: "Astronomical tidal-range cycles",
				finding: "The term describes aligned-forcing range patterns throughout the year.",
				effectDirection: "supports",
				magnitude: "Relative range, not a fixed local elevation.",
				certainty: "high",
				limitations: ["Geography", "Local timing", "Water-level datum"]
			}
		],
		institutionalAnchors: [{ name: "NOAA tide education", role: "Lunar-cycle terminology" }],
		coiSummary:
			"The NOAA range and cycle explanations are complementary resources within one agency, not independent estimates of researcher agreement or new local measurements.",
		...publication("c6d896a5-e309-493e-8b7d-355c8229f980", "spring-tide range versus the spring season"),
		sources: sourcesFor(readerWaterSources.springTides, readerWaterSources.cycles)
	},
	{
		...common,
		topicSlug: "oceans-and-marine-science",
		title: "Are neap tides the same thing as low tide?",
		slug: readerWaterSlugs.neap,
		bottomLine:
			"No. A neap tide is a period of relatively reduced high-to-low tidal range, associated with the Sun and Moon's partly offsetting tidal effects near quarter moon. Low tide is a low point in a local water-level cycle. Both high and low tides occur during neap periods; a smaller range does not mean permanent low water.",
		stableCore: [
			"NOAA defines neap tides through reduced range, not through a single low-water phase.",
			"High tide, low tide and the range between them describe different aspects of a water-level record.",
			"The quarter-moon relationship explains a forcing pattern; actual coastal heights and times still require local information."
		],
		editorSummary:
			"When someone says the tide is neap, ask whether they are discussing the range cycle across days or the present water level at one station. Those are not interchangeable questions. A reduced range also does not establish weak motion everywhere, because current response is location-specific and a separate quantity. Use the chart's references and measured variable before inferring conditions from a label alone. This review provides terminology, not a safe-water rule or current coastal prediction.",
		openQuestions: ["What range and phase does the local water-level series show during the specified period?"],
		whatWouldChangeMinds: [
			"Local observations can refine the range and timing; they do not equate reduced range with an unchanging low-water phase."
		],
		misconceptions: [
			"Neap periods still contain high tides.",
			"Reduced range is not the same as a current low-water reading."
		],
		misconceptionTags: ["neap tide", "low tide", "quarter moon", "reduced tidal range", "high water"],
		uncertaintySummary:
			"The definition is established; exact local range, phase and current response vary. No safe navigation or crossing condition follows from the name.",
		uncertaintyDrivers: [
			{ type: "indirectness", detail: "A range label does not measure the present level or current." }
		],
		evidenceSummaries: [
			{
				question: "Does neap mean low water throughout the period?",
				population: "Tidal-range and phase terminology",
				finding: "Reduced range still includes high- and low-water phases.",
				effectDirection: "supports",
				magnitude: "Different descriptors, not a local height estimate.",
				certainty: "high",
				limitations: ["Coastal response", "Phase", "Currents separately measured"]
			}
		],
		institutionalAnchors: [{ name: "NOAA tidal science", role: "Range, phase and current distinctions" }],
		coiSummary:
			"NOAA educational references define the variables. They do not provide independent local measurements or certify low-risk coastal conditions.",
		...publication("5040deaa-0744-4b0e-ba46-fc92decb6841", "neap range versus the low-water phase"),
		sources: sourcesFor(readerWaterSources.springTides, readerWaterSources.tideFaq)
	},
	{
		...common,
		topicSlug: "oceans-and-marine-science",
		title: "Is high tide always the time of strongest tidal current?",
		slug: readerWaterSlugs.tidalCurrent,
		bottomLine:
			"No universal timing rule applies. Tide height is a vertical water-level measure; tidal current is horizontal movement measured by speed and direction. The phase relation depends on local conditions. High water may be near weak or strong flow in different settings, so a tide-height prediction alone cannot establish the time of maximum current or slack water.",
		stableCore: [
			"NOAA explicitly distinguishes tidal water levels from currents and cautions against a general rule linking their maxima and slack times.",
			"Different tidal regimes and coastal geometries can produce different phase relations between the level and motion of water.",
			"NOAA provides separate water-level and current prediction products because the measured variables and their timing are not interchangeable."
		],
		editorSummary:
			"The useful question is what a chart actually predicts: a height relative to a datum, or a speed and direction at a current station. Similar station names do not turn one product into the other. A locally valid phase relation should not be exported to another inlet or coastline without evidence. Even a prediction is not a complete account of all present water motion. This review makes no safe passage recommendation and calculates no current at an unspecified site.",
		openQuestions: ["What phase relation and non-tidal influences apply to the particular current station?"],
		whatWouldChangeMinds: [
			"Local measured and predicted currents can establish an applicable timing relation, not a universal high-water rule."
		],
		misconceptions: ["High tide is not always maximum current.", "High tide is not always slack water either."],
		misconceptionTags: ["high tide current", "slack water", "maximum tidal current", "tide height", "tidal phase"],
		uncertaintySummary:
			"Timing and actual current depend on location and conditions. The distinction is clear; no navigation rule or local current forecast is supplied.",
		uncertaintyDrivers: [
			{ type: "generalizability", detail: "The phase relation differs among locations and regimes." }
		],
		evidenceSummaries: [
			{
				question: "Does high water determine maximum tidal current everywhere?",
				population: "Water-level and tidal-current observations",
				finding: "Their phase relation is local; separate products are needed.",
				effectDirection: "supports",
				magnitude: "No universal time offset.",
				certainty: "high",
				limitations: ["Local geometry", "Non-tidal currents", "Prediction applicability"]
			}
		],
		institutionalAnchors: [
			{ name: "NOAA CO-OPS", role: "Separate tide-height and current definitions and products" }
		],
		coiSummary:
			"Both resources come from the same NOAA measurement program. They are not independent phase-relation experiments or an audit of a specific current prediction.",
		...publication("e56b5a6d-428e-42c3-a665-b882be195442", "tidal height versus current speed and phase"),
		sources: sourcesFor(readerWaterSources.tideFaq, readerWaterSources.products)
	},
	{
		...common,
		topicSlug: "oceans-and-marine-science",
		title: "Does wind alone determine storm-surge height?",
		slug: readerWaterSlugs.surge,
		bottomLine:
			"No. Wind is a major driver, but surge at a coast also depends on storm size, movement and approach, offshore depth and the shape of the coast. A wind-intensity category alone does not determine local surge. Surge is the storm-driven departure from predicted astronomical tide; storm tide combines the two, and waves and other inputs can further affect total water level.",
		stableCore: [
			"NHC describes several storm and coastal characteristics that modify surge, rather than using wind speed as a complete local prediction.",
			"The agency separates surge from storm tide and notes additional contributions to total water level, including waves and freshwater flow.",
			"Illustrative model comparisons explain sensitivity; they do not provide a current forecast or a guarantee that one coast responds like another."
		],
		editorSummary:
			"A headline about a storm's category measures one aspect of its intensity. It does not specify the complete coastal flooding process. Before comparing quoted heights, identify whether each number is surge, storm tide, a wave measure or total water level, and note the location and reference. Confusing these quantities can make two reports appear inconsistent when they describe different things. This review explains interpretation without forecasting an event, certifying a building or giving emergency or engineering instructions.",
		openQuestions: ["How do the actual storm, shelf and coastline combine at the specified location?"],
		whatWouldChangeMinds: [
			"Applicable observations and models can revise a local surge estimate, not establish wind category as its sole determinant."
		],
		misconceptions: [
			"A hurricane's wind category is not a complete local surge forecast.",
			"Surge, storm tide and total water level are not identical quantities."
		],
		misconceptionTags: [
			"storm surge",
			"hurricane category",
			"storm tide",
			"continental shelf",
			"total water level"
		],
		uncertaintySummary:
			"Local surge is sensitive to storm and coastal characteristics. No current track, numerical forecast or safety assessment was performed.",
		uncertaintyDrivers: [
			{
				type: "imprecision",
				detail: "Small changes in relevant storm and coastal inputs can affect a local estimate."
			}
		],
		evidenceSummaries: [
			{
				question: "Does wind intensity alone set coastal surge?",
				population: "Storm-coast interactions",
				finding: "Storm geometry, movement and coastal bathymetry modify the response.",
				effectDirection: "supports",
				magnitude: "Multifactor mechanism, not a local height prediction.",
				certainty: "high",
				limitations: ["Location", "Storm evolution", "Separate water-level components"]
			}
		],
		institutionalAnchors: [
			{ name: "NOAA National Hurricane Center", role: "Surge sensitivity and water-level definitions" }
		],
		coiSummary:
			"NHC and NOS share NOAA provenance. Their explanations are not two independent surge models or a present-day forecast evaluation.",
		...publication("1bd2efbf-104a-47c2-a4ec-0a0a72159a91", "storm-surge factors and total-water-level definitions"),
		sources: sourcesFor(readerWaterSources.surge, readerWaterSources.surgeDefinition)
	},
	{
		...common,
		topicSlug: "oceans-and-marine-science",
		title: "Do ocean currents move water only horizontally?",
		slug: readerWaterSlugs.vertical,
		bottomLine:
			"No. Ocean water also moves vertically. Upwelling brings deeper water toward the surface; downwelling moves surface water downward. Wind-driven displacement can contribute to these motions, alongside other circulation processes. A map of horizontal arrows is a useful projection, not proof that all movement stays at the same depth or that the whole ocean behaves as one uniform conveyor.",
		stableCore: [
			"NOAA describes both upward replacement of displaced surface water and downward movement in appropriate settings.",
			"A horizontal current map omits the depth dimension unless the visualization or data explicitly includes it.",
			"Vertical exchange can bring water with different temperature and salinity properties into a layer; movement and those properties are related but different measurements."
		],
		editorSummary:
			"Ask whether an image represents surface motion, one depth layer or a full three-dimensional interpretation. A missing vertical arrow may be a display choice rather than an observed absence of vertical transport. Likewise, the definition of upwelling supplies a direction, not a fixed speed or intensity everywhere. Local wind and coastal conditions matter. This mechanism review does not settle current AMOC forecasts, calculate a specific upwelling rate or assess the biology of a changing marine environment.",
		openQuestions: ["What vertical motion and water properties characterize the specified place and period?"],
		whatWouldChangeMinds: [
			"Depth-resolved observations can refine the local circulation, not restrict every current to a horizontal plane."
		],
		misconceptions: [
			"A two-dimensional map need not show all water motion.",
			"Upwelling is a direction of exchange, not one universal rate."
		],
		misconceptionTags: ["upwelling", "downwelling", "vertical ocean current", "ocean circulation", "surface water"],
		uncertaintySummary:
			"Vertical-motion magnitude and timing depend on local conditions. No present regional circulation rate or collapse probability is inferred.",
		uncertaintyDrivers: [
			{ type: "indirectness", detail: "A surface map does not by itself resolve full-depth motion." }
		],
		evidenceSummaries: [
			{
				question: "Is ocean movement confined to horizontal currents?",
				population: "Ocean circulation with upwelling and downwelling",
				finding: "Vertical exchanges also occur.",
				effectDirection: "supports",
				magnitude: "Three-dimensional motion, not a fixed rate.",
				certainty: "high",
				limitations: ["Local forcing", "Depth resolution", "No regional forecast"]
			}
		],
		institutionalAnchors: [{ name: "NOAA ocean science", role: "Upwelling and downwelling mechanisms" }],
		coiSummary:
			"NOAA's circulation and temperature explanations are institutional references, not separate measurements of the same location or a new circulation-model comparison.",
		...publication("76a2d490-28aa-41af-ba88-f51401cd7219", "vertical ocean motion and depth-resolved observations"),
		sources: sourcesFor(readerWaterSources.upwelling, readerWaterSources.thermocline)
	},
	{
		...common,
		topicSlug: "oceans-and-marine-science",
		title: "Does ocean salt come only from rivers?",
		slug: readerWaterSlugs.saltOrigin,
		bottomLine:
			"No. Weathering on land and river transport are important sources of dissolved material, but seawater also exchanges chemicals with the oceanic crust through hydrothermal circulation. Some constituents enter the water, others are removed, and minerals can precipitate. Ocean chemistry reflects multiple inputs, exchanges and sinks, not simply accumulation of everything rivers deliver without any removal.",
		stableCore: [
			"NOAA identifies land weathering and seafloor processes in its explanation of dissolved salts.",
			"The original hydrothermal fact sheet specifies that interaction with hot crust can remove some ions while adding other dissolved constituents.",
			"Mineral precipitation is a removal pathway, so showing a transfer at one vent does not establish that all processes increase all salts everywhere."
		],
		editorSummary:
			"Ask which dissolved constituent and which part of its budget a source describes. The familiar river-to-ocean arrow is one pathway, not a complete mass balance. Hydrothermal exchange likewise is not a universal additive faucet for every ion. Chemistry at an individual vent must not silently become an exact global proportion. This review uses the physical exchange section only; it offers no biological method, mineral-extraction technique or quantitative present-day whole-ocean budget, and does not adopt erroneous core-magma wording.",
		openQuestions: ["What are the input, removal and exchange budgets for a specified dissolved constituent?"],
		whatWouldChangeMinds: [
			"Constituent-specific budget measurements can revise contributions while retaining the distinction between multiple sources and sinks."
		],
		misconceptions: [
			"River delivery is not the only seawater chemical pathway.",
			"Hydrothermal exchange does not add every ion without removing anything."
		],
		misconceptionTags: ["ocean salt origin", "rivers", "weathering", "hydrothermal exchange", "dissolved salts"],
		uncertaintySummary:
			"Exact constituent budgets require dedicated measurements. The institutional explanation establishes pathways, not fixed current global fractions.",
		uncertaintyDrivers: [
			{
				type: "imprecision",
				detail: "A qualitative process description does not measure a whole-ocean chemical budget."
			}
		],
		evidenceSummaries: [
			{
				question: "Is river input the only source or exchange of seawater chemicals?",
				population: "Ocean dissolved constituents",
				finding: "Land input coexists with seafloor exchange and removal processes.",
				effectDirection: "supports",
				magnitude: "Multiple pathways, not a global percentage budget.",
				certainty: "high",
				limitations: ["Constituent specificity", "Sinks", "No full budget calculation"]
			}
		],
		institutionalAnchors: [
			{ name: "NOAA NOS and Ocean Exploration", role: "Physical salt pathways and crust-water exchange" }
		],
		coiSummary:
			"Both references share NOAA provenance and are educational explanations. No whole-ocean budget dataset was independently analyzed; source errors are explicitly excluded rather than reproduced.",
		...publication(
			"3144e7f9-e498-458e-b9f2-78b00e76191a",
			"river inputs, seafloor exchange and dissolved-salt sinks"
		),
		sources: sourcesFor(readerWaterSources.salt, readerWaterSources.vents)
	},
	{
		...common,
		topicSlug: "oceans-and-marine-science",
		title: "Does all seawater have the same salinity?",
		slug: readerWaterSlugs.salinity,
		bottomLine:
			"No. Salinity variation occurs among places and depths as evaporation, precipitation, river input, ice processes and mixing alter dissolved-salt concentration. An ocean-wide average is not every sample's value. A surface map is also not a complete vertical profile. Comparisons should identify the location, depth, time and salinity convention rather than assume all ocean water has one concentration.",
		stableCore: [
			"NASA's measurement description links salinity variation to the water cycle, including rain, evaporation, runoff and ice melt.",
			"Removing or adding freshwater changes concentration even when the total dissolved-salt amount is not changing in the same way.",
			"NOAA's salt explanation provides background pathways, but a generic typical value does not establish uniform local or depth-resolved salinity."
		],
		editorSummary:
			"Separate how salt reaches the ocean from why one sample is saltier than another. Those questions concern different parts of a chemical and water balance. A freshwater plume, an evaporative region and water at depth need not share one number. Measurement conventions and depth information matter before comparing a satellite product with an in-water observation. This review does not issue a new global salinity estimate, endorse an oversimplified unit conversion or infer a local drinking-water or marine-health conclusion.",
		openQuestions: ["How does salinity vary through the specified location, depth range and period?"],
		whatWouldChangeMinds: [
			"Appropriate measurements can revise a local distribution; an average cannot demonstrate uniformity in every sample."
		],
		misconceptions: [
			"A typical ocean value is not a constant at every location.",
			"Salt input and salinity concentration are different questions."
		],
		misconceptionTags: [
			"seawater salinity",
			"salt concentration",
			"freshwater input",
			"evaporation",
			"salinity profile"
		],
		uncertaintySummary:
			"The variation mechanisms are established; exact distributions require applicable observations and measurement conventions. No new current map or universal number is supplied.",
		uncertaintyDrivers: [
			{ type: "indirectness", detail: "Surface observations alone do not establish the full-depth distribution." }
		],
		evidenceSummaries: [
			{
				question: "Does every seawater sample share one salinity?",
				population: "Ocean waters under varying water-cycle and mixing conditions",
				finding: "Concentrations vary spatially and vertically.",
				effectDirection: "supports",
				magnitude: "No universal concentration.",
				certainty: "high",
				limitations: ["Depth", "Time", "Measurement convention"]
			}
		],
		institutionalAnchors: [{ name: "NASA JPL PO.DAAC", role: "Salinity variation and measurement context" }],
		coiSummary:
			"NASA and NOAA institutional resources explain processes, not independent analyses of one present salinity product. Historical mission projections are not presented as current capability claims.",
		...publication("9a1fc102-f6c4-4f98-97a9-e1937183219d", "variable seawater salinity and measurement scope"),
		sources: sourcesFor(readerWaterSources.salinity, readerWaterSources.salt)
	},
	{
		...common,
		topicSlug: "oceans-and-marine-science",
		title: "Is ocean temperature uniform from surface to seafloor?",
		slug: readerWaterSlugs.temperature,
		bottomLine:
			"No. Ocean temperature commonly changes with depth, with a mixed upper layer, a thermocline where temperature changes rapidly, and colder deep water in many settings. Layer structure varies with latitude, season and mixing; illustrated depths are not universal. A satellite surface-temperature map measures a near-surface layer, not every depth or the ocean's entire heat content.",
		stableCore: [
			"NOAA describes a thermocline as a rapid temperature transition and explicitly notes variation in its structure and presence.",
			"NASA's cited satellite map description identifies a top-millimeter measurement, so its colors do not constitute a full-depth temperature profile.",
			"Depth, season and location belong with the observation; one attractive layered illustration cannot assign fixed temperatures to every ocean basin."
		],
		editorSummary:
			"Ask whether a source reports a surface temperature, a vertical profile or an integrated measure of heat. Each can be informative while answering a different question. A cold deep layer does not imply that every surface value is stable, and a surface anomaly alone does not specify the complete column. Polar and seasonally mixed settings also resist a universal three-layer diagram. This review interprets measurement scope without calculating current ocean warming, forecasting a storm or declaring a fixed thermocline depth.",
		openQuestions: [
			"What temperature profile and mixed-layer structure were observed in the specified place and season?"
		],
		whatWouldChangeMinds: [
			"Depth-resolved observations can revise a local profile; surface-only imagery cannot establish uniform temperature at every depth."
		],
		misconceptions: [
			"A sea-surface color map is not a temperature map of the entire water column.",
			"A textbook thermocline depth is not universal."
		],
		misconceptionTags: ["ocean temperature", "thermocline", "mixed layer", "deep water", "sea surface temperature"],
		uncertaintySummary:
			"Profile structure varies by location and time. The cited historical map description explains the measurement layer, not current values or a new whole-ocean warming trend.",
		uncertaintyDrivers: [
			{ type: "generalizability", detail: "Latitude, season and mixing affect vertical structure." }
		],
		evidenceSummaries: [
			{
				question: "Does one surface temperature describe the whole ocean column?",
				population: "Depth-varying ocean temperature profiles",
				finding: "Vertical structure and a surface measurement have different scope.",
				effectDirection: "supports",
				magnitude: "No universal layer depths or current temperature values.",
				certainty: "high",
				limitations: ["Depth coverage", "Seasonality", "Polar and mixed settings"]
			}
		],
		institutionalAnchors: [
			{ name: "NOAA and NASA ocean measurement education", role: "Thermocline structure versus surface sensing" }
		],
		coiSummary:
			"The institutional explanations provide complementary measurement context, not two independent full-depth temperature datasets or a reanalysis of present global heat content.",
		...publication("7e5e8ef1-3f0a-43b6-aec6-0da8115c77bd", "ocean temperature profiles versus surface maps"),
		sources: sourcesFor(readerWaterSources.thermocline, readerWaterSources.surfaceTemperature)
	}
];

export const readerWaterGaps = readerWaterClaims.map(claim => ({
	slug: claim.slug,
	gap: `Adds the distinct question "${claim.title}" with its measurement definitions and local-applicability limits; existing storage and climate reviews do not answer this proposition.`,
	relatedExistingSlugs: [
		claim.topicSlug === "earth-and-geoscience"
			? "is-most-groundwater-stored-in-vast-underground-lakes-and-rivers"
			: "does-melting-floating-sea-ice-directly-drive-most-sea-level-rise"
	]
}));
