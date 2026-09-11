import type { SeedClaim } from "./claims.js";

export const september2026DemandDepthReviewTimestamp = "2026-09-10T23:45:00.000Z";

type DemandDepthSource = SeedClaim["sources"][number];

export type DemandDepthSourceTuple = readonly [
	kind: DemandDepthSource["kind"],
	title: string,
	publisher: string,
	year: number,
	locator: string,
	note: string,
	stance?: DemandDepthSource["stance"],
	citationStatus?: DemandDepthSource["citationStatus"]
];

type DemandDepthClaim = Omit<SeedClaim, "sources" | "status"> & {
	status?: SeedClaim["status"];
	sources: readonly DemandDepthSourceTuple[];
};

export function september2026DemandDepthClaim(seed: DemandDepthClaim): SeedClaim {
	return {
		...seed,
		status: seed.status ?? "published",
		searchCutoffAt: seed.searchCutoffAt ?? september2026DemandDepthReviewTimestamp,
		lastRetractionCheckAt: seed.lastRetractionCheckAt ?? september2026DemandDepthReviewTimestamp,
		changeLog: seed.changeLog ?? [
			{
				date: september2026DemandDepthReviewTimestamp,
				kind: "publication",
				summary: "Initial reviewed claim page published in the demand-depth evidence-atlas expansion."
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
				citationCheckedAt: september2026DemandDepthReviewTimestamp,
				statusSources: [url]
			};
		})
	};
}
