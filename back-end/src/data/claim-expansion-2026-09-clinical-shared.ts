import type { SeedClaim } from "./claims.js";

export const september2026ClinicalReviewTimestamp = "2026-09-10T23:30:00.000Z";

type ClinicalSource = SeedClaim["sources"][number];

export type ClinicalSourceTuple = readonly [
	kind: ClinicalSource["kind"],
	title: string,
	publisher: string,
	year: number,
	locator: string,
	note: string,
	stance?: ClinicalSource["stance"],
	citationStatus?: ClinicalSource["citationStatus"]
];

type ClinicalClaim = Omit<SeedClaim, "sources" | "status"> & {
	status?: SeedClaim["status"];
	sources: readonly ClinicalSourceTuple[];
};

export function september2026ClinicalClaim(seed: ClinicalClaim): SeedClaim {
	return {
		...seed,
		status: seed.status ?? "published",
		searchCutoffAt: seed.searchCutoffAt ?? september2026ClinicalReviewTimestamp,
		lastRetractionCheckAt: seed.lastRetractionCheckAt ?? september2026ClinicalReviewTimestamp,
		changeLog: seed.changeLog ?? [
			{
				date: september2026ClinicalReviewTimestamp,
				kind: "publication",
				summary: "Initial reviewed claim page published in the clinical evidence-atlas expansion."
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
				citationCheckedAt: september2026ClinicalReviewTimestamp,
				statusSources: [url]
			};
		})
	};
}
