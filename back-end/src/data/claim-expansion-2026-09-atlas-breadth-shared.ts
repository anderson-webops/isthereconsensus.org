import type { SeedClaim } from "./claims.js";

export const september2026AtlasBreadthReviewTimestamp = "2026-09-11T05:17:10.000Z";

type AtlasBreadthSource = SeedClaim["sources"][number];

export type AtlasBreadthSourceTuple = readonly [
	kind: AtlasBreadthSource["kind"],
	title: string,
	publisher: string,
	year: number,
	locator: string,
	note: string,
	stance?: AtlasBreadthSource["stance"],
	citationStatus?: AtlasBreadthSource["citationStatus"]
];

type AtlasBreadthClaim = Omit<SeedClaim, "sources" | "status"> & {
	status?: SeedClaim["status"];
	sources: readonly AtlasBreadthSourceTuple[];
};

export function september2026AtlasBreadthClaim(seed: AtlasBreadthClaim): SeedClaim {
	return {
		...seed,
		status: seed.status ?? "published",
		searchCutoffAt: seed.searchCutoffAt ?? september2026AtlasBreadthReviewTimestamp,
		lastRetractionCheckAt: seed.lastRetractionCheckAt ?? september2026AtlasBreadthReviewTimestamp,
		changeLog: seed.changeLog ?? [
			{
				date: september2026AtlasBreadthReviewTimestamp,
				kind: "publication",
				summary: "Initial reviewed claim page published in the cross-domain atlas-breadth expansion."
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
				citationCheckedAt: september2026AtlasBreadthReviewTimestamp,
				statusSources: [url]
			};
		})
	};
}
