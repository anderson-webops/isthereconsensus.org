export interface GuideParagraph {
	text: string;
	sources: string[];
}

export interface ReadingGuideContent {
	takeaway: string;
	scope: string;
	sections: Array<{ id: string; title: string; paragraphs: GuideParagraph[] }>;
	questions: string[];
	sources: Array<{
		id: string;
		title: string;
		url: string;
		kind: string;
		note: string;
	}>;
}

export interface ReadingGuideSummary {
	slug: string;
	title: string;
	summary: string;
	checkedAt: string;
	topics: string[];
	reviews: Array<{ path: string; label: string }>;
}
