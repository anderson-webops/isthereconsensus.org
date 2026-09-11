export interface ComparisonEstimate {
	value: number;
	qualifier: "reported" | "approximately" | "less_than";
	sourceIds: string[];
	interpretation?: string;
	// The interval's metric is explicit: a standardized effect is not minutes.
	uncertainty?: {
		metric: string;
		estimate: number;
		lower: number;
		upper: number;
		level: 95;
	};
	pValue?: string;
}

export interface EvidenceComparison {
	slug: string;
	title: string;
	description: string;
	checkedAt: string;
	datasetLabel: string;
	measureNote: string;
	resultNote: string;
	protocolNote?: string;
	topics: string[];
	guidePath: string;
	reviews: Array<{ path: string; label: string }>;
	outcomes: Array<{ id: string; label: string; unit: string; explanation: string }>;
	contexts: Array<{ id: string; label: string; explanation: string; supportsEstimates: boolean }>;
	options: Array<{
		id: string;
		label: string;
		scope: string;
		estimates: Record<string, ComparisonEstimate>;
		// When present, never fall back to another context's estimates.
		estimatesByContext?: Record<string, Record<string, ComparisonEstimate>>;
	}>;
	limitations: string[];
	sources: Array<{ id: string; title: string; url: string; locator: string; note: string }>;
}
