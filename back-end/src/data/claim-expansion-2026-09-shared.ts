import type { SeedClaim } from "./claims.js";

export const september2026TrafficReviewTimestamp = "2026-09-10T21:00:00.000Z";

type TrafficSource = SeedClaim["sources"][number];

export type TrafficSourceTuple = readonly [
	kind: TrafficSource["kind"],
	title: string,
	publisher: string,
	year: number,
	doi: string,
	note: string,
	stance?: TrafficSource["stance"]
];

type TrafficClaim = Omit<SeedClaim, "sources" | "status"> & {
	status?: SeedClaim["status"];
	sources: readonly TrafficSourceTuple[];
};

export function september2026TrafficClaim(seed: TrafficClaim): SeedClaim {
	return {
		...seed,
		status: seed.status ?? "published",
		searchCutoffAt: seed.searchCutoffAt ?? september2026TrafficReviewTimestamp,
		lastRetractionCheckAt: seed.lastRetractionCheckAt ?? september2026TrafficReviewTimestamp,
		changeLog: seed.changeLog ?? [
			{
				date: september2026TrafficReviewTimestamp,
				kind: "publication",
				summary: "Initial reviewed claim page published in the traffic-informed evidence-atlas expansion."
			}
		],
		sources: seed.sources.map(([kind, title, publisher, year, doi, note, stance], index) => ({
			kind,
			title,
			publisher,
			year,
			doi,
			url: `https://doi.org/${doi}`,
			note,
			order: index + 1,
			stance: stance ?? "supports",
			isAnchor: index === 0,
			appraisal: index === 0 ? "high" : "moderate",
			citationStatus: "current",
			citationCheckedAt: september2026TrafficReviewTimestamp,
			statusSources: [`https://doi.org/${doi}`]
		}))
	};
}
