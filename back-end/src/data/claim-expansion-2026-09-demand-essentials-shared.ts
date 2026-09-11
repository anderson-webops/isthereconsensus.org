import type { SeedClaim } from "./claims.js";

export const september2026DemandEssentialsReviewTimestamp = "2026-09-11T04:55:00.000Z";

type DemandEssentialsSource = SeedClaim["sources"][number];

export type DemandEssentialsSourceTuple = readonly [
	kind: DemandEssentialsSource["kind"],
	title: string,
	publisher: string,
	year: number,
	locator: string,
	note: string,
	stance?: DemandEssentialsSource["stance"],
	citationStatus?: DemandEssentialsSource["citationStatus"]
];

type DemandEssentialsClaim = Omit<SeedClaim, "sources" | "status"> & {
	status?: SeedClaim["status"];
	sources: readonly DemandEssentialsSourceTuple[];
};

export function september2026DemandEssentialsClaim(seed: DemandEssentialsClaim): SeedClaim {
	return {
		...seed,
		status: seed.status ?? "published",
		searchCutoffAt: seed.searchCutoffAt ?? september2026DemandEssentialsReviewTimestamp,
		lastRetractionCheckAt: seed.lastRetractionCheckAt ?? september2026DemandEssentialsReviewTimestamp,
		changeLog: seed.changeLog ?? [
			{
				date: september2026DemandEssentialsReviewTimestamp,
				kind: "publication",
				summary: "Initial reviewed claim page published in the demand-informed evidence-atlas expansion."
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
				citationCheckedAt: september2026DemandEssentialsReviewTimestamp,
				statusSources: [url]
			};
		})
	};
}
