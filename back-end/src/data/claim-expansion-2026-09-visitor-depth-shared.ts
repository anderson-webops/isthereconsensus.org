import type { SeedClaim } from "./claims.js";

export const september2026VisitorDepthReviewTimestamp = "2026-09-11T00:35:00.000Z";

type VisitorDepthSource = SeedClaim["sources"][number];

export type VisitorDepthSourceTuple = readonly [
	kind: VisitorDepthSource["kind"],
	title: string,
	publisher: string,
	year: number,
	locator: string,
	note: string,
	stance?: VisitorDepthSource["stance"],
	citationStatus?: VisitorDepthSource["citationStatus"]
];

type VisitorDepthClaim = Omit<SeedClaim, "sources" | "status"> & {
	status?: SeedClaim["status"];
	sources: readonly VisitorDepthSourceTuple[];
};

export function september2026VisitorDepthClaim(seed: VisitorDepthClaim): SeedClaim {
	return {
		...seed,
		status: seed.status ?? "published",
		searchCutoffAt: seed.searchCutoffAt ?? september2026VisitorDepthReviewTimestamp,
		lastRetractionCheckAt: seed.lastRetractionCheckAt ?? september2026VisitorDepthReviewTimestamp,
		changeLog: seed.changeLog ?? [
			{
				date: september2026VisitorDepthReviewTimestamp,
				kind: "publication",
				summary: "Initial reviewed claim page published in the visitor-informed evidence-atlas expansion."
			}
		],
		sources: seed.sources.map(([kind, title, publisher, year, locator, note, stance, citationStatus], index) => {
			const url = locator.startsWith("http") ? locator : `https://doi.org/${locator}`;
			return {
				kind,
				title,
				publisher,
				year,
				...(locator.startsWith("http") ? {} : { doi: locator }),
				url,
				note,
				order: index + 1,
				stance: stance ?? "supports",
				isAnchor: index === 0,
				appraisal: index === 0 ? "high" : "moderate",
				citationStatus: citationStatus ?? "current",
				citationCheckedAt: september2026VisitorDepthReviewTimestamp,
				statusSources: [url]
			};
		})
	};
}
