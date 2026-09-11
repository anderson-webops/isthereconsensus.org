import type { ReadingGuideContent } from "./types";

export const climateGuide: ReadingGuideContent = {
	takeaway:
		"Human influence on recent global warming is established. Asking how warming changed a particular heatwave or storm is a separate, more specific attribution question, with uncertainty that depends on the event, observations, and methods.",
	scope: "An explanation of climate attribution, not a live weather forecast or a new analysis of a recent disaster. Historical temperature figures retain their assessment period and baseline. Event examples below are hypothetical unless a particular study is explicitly identified.",
	sections: [
		{
			id: "global-change",
			title: "Keep the period and the cause attached to the temperature",
			paragraphs: [
				{
					text: "The IPCC's 2023 synthesis concludes that human activities, principally greenhouse-gas emissions, caused global warming. Its 1.1°C figure compares global surface temperature in 2011-2020 with 1850-1900. It is not a measurement of today's weather or the latest individual year's temperature. Keeping those dates visible avoids an apparent contradiction when another report uses a different averaging period. The assessment's central attribution conclusion is about the long-term global change, not a claim that every place warms equally or every day is hotter.",
					sources: ["ipcc"]
				}
			]
		},
		{
			id: "test-explanations",
			title: "An alternative cause must fit the observations",
			paragraphs: [
				{
					text: "NASA's explanation of the Sun's role illustrates how competing explanations can be tested. Incoming solar energy has not shown the sustained rise needed to explain recent warming; satellite measurements since 1978 show no upward trend. The atmosphere's vertical pattern provides another check: surface warming alongside stratospheric cooling does not match what a simple increase in solar input would predict. Saying that the Sun affects climate is true, but does not establish that it caused the change in question.",
					sources: ["nasa"]
				},
				{
					text: "This is stronger reasoning than selecting two curves that happen to move together for a short interval. A proposed explanation needs to account for the timing and the physical pattern of change. Multiple observations can distinguish causes even though no single chart contains the entire climate system.",
					sources: ["nasa"]
				}
			]
		},
		{
			id: "event-comparison",
			title: "A changed probability is not the same as an exclusive cause",
			paragraphs: [
				{
					text: "The Met Office describes event attribution as a comparison involving observations and simulations of climates with and without human influence. Researchers define an event, such as a temperature threshold over a specified area and duration, then ask whether its likelihood or intensity changed. Natural variability and human influence can both contribute. An event need not be impossible in the earlier climate for warming to have made it substantially more likely or more severe.",
					sources: ["method"]
				},
				{
					text: "The definition matters. A three-day regional heat event and a single station's hottest hour are not interchangeable measurements. Likewise, a finding about rainfall intensity is not automatically a finding about the number of storms. Read the event boundary and the quantity estimated before translating an attribution statement into a broader headline about all extreme weather.",
					sources: ["method"]
				}
			]
		},
		{
			id: "confidence",
			title: "Confidence depends on the question and the available record",
			paragraphs: [
				{
					text: "The Met Office's methods discussion identifies several constraints: the quality of historical observations, how well models reproduce the relevant event, and understanding of the underlying physical processes. Rapid studies may have less opportunity for additional simulations than a longer investigation. That calls for reading the stated limitations, not assuming that every quick analysis is wrong or that every dramatic event has an equally precise attribution estimate.",
					sources: ["limits"]
				},
				{
					text: "Geographical coverage is uneven as well. Regions with sparse records or fewer research resources can be harder to assess. A lack of local attribution studies is therefore not evidence that a region is unaffected. Conversely, confidence in the global warming explanation cannot be transferred unchanged to every individual event. These are different levels of question, and the strength of the answer should remain matched to the evidence supporting it.",
					sources: ["limits"]
				}
			]
		},
		{
			id: "probability-exercise",
			title: "Translate an attribution headline without exaggerating it",
			paragraphs: [
				{
					text: "An original hypothetical exercise: suppose a precisely defined event has a one-in-100 annual chance in one climate and a one-in-50 chance in another. The probability has doubled, from 1% to 2%; the increase is one percentage point. Those invented values do not mean the event happens on a schedule, that half of each storm is human-made, or that damage necessarily doubles. Ask which probability, intensity, or impact the actual study estimated before repeating its headline.",
					sources: []
				}
			]
		}
	],
	questions: [
		"Which averaging period and temperature baseline are being compared?",
		"Does the proposed cause fit more than one kind of observation?",
		"What event, location, duration, and outcome did the attribution study define?",
		"Which limitations affect the event estimate, and which broader conclusions remain established?"
	],
	sources: [
		{
			id: "ipcc",
			title: "IPCC (2023): AR6 Synthesis Report, Summary for Policymakers",
			url: "https://www.ipcc.ch/report/ar6/syr/summary-for-policymakers/",
			kind: "International scientific assessment",
			note: "Official indexed statement A.1 and its temperature periods checked. The historical 1.1°C figure is not presented as a current annual measurement."
		},
		{
			id: "nasa",
			title: "NASA: Is the Sun causing global warming?",
			url: "https://science.nasa.gov/climate-change/faq/is-the-sun-causing-global-warming/",
			kind: "Institutional physical-evidence explanation",
			note: "Solar observations and the atmospheric-temperature comparison checked. This is an explanation of evidence, not a new attribution analysis."
		},
		{
			id: "method",
			title: "Met Office: Attributing extreme weather to climate change",
			url: "https://www.metoffice.gov.uk/research/climate/understanding-climate/attributing-extreme-weather-to-climate-change",
			kind: "Research-methods explanation",
			note: "Event definitions and comparisons with and without human influence checked. The guide does not substitute a generic result for an event-specific study."
		},
		{
			id: "limits",
			title: "Met Office (2023): The science of linking climate change to extreme weather",
			url: "https://www.metoffice.gov.uk/blog/2023/the-science-of-linking-climate-change-to-extreme-weather-events",
			kind: "Institutional methods and limitations explanation",
			note: "Observation quality, model performance, rapid-study limits, and uneven geographical coverage checked. No current universal hazard ranking is asserted."
		}
	]
};
