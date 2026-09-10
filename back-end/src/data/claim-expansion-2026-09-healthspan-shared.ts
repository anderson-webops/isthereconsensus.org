import type { SeedClaim } from "./claims.js";

export const september2026HealthspanReviewTimestamp = "2026-09-10T22:10:00.000Z";

type HealthspanSource = SeedClaim["sources"][number];

export type HealthspanSourceTuple = readonly [
	kind: HealthspanSource["kind"],
	title: string,
	publisher: string,
	year: number,
	locator: string,
	note: string,
	stance?: HealthspanSource["stance"]
];

type HealthspanClaim = Omit<SeedClaim, "sources" | "status"> & {
	status?: SeedClaim["status"];
	sources: readonly HealthspanSourceTuple[];
};

export function september2026HealthspanClaim(seed: HealthspanClaim): SeedClaim {
	return {
		...seed,
		status: seed.status ?? "published",
		searchCutoffAt: seed.searchCutoffAt ?? september2026HealthspanReviewTimestamp,
		lastRetractionCheckAt: seed.lastRetractionCheckAt ?? september2026HealthspanReviewTimestamp,
		changeLog: seed.changeLog ?? [
			{
				date: september2026HealthspanReviewTimestamp,
				kind: "publication",
				summary: "Initial reviewed claim page published in the healthspan evidence-atlas expansion."
			}
		],
		sources: seed.sources.map(([kind, title, publisher, year, locator, note, stance], index) => {
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
				citationStatus: "current",
				citationCheckedAt: september2026HealthspanReviewTimestamp,
				statusSources: [url]
			};
		})
	};
}
