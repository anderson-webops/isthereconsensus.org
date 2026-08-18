import type { SeedClaim } from "./claims.js";

export const august2026EncyclopediaReviewTimestamp = "2026-08-18T18:00:00.000Z";
export const august2026EncyclopediaTrancheTwoReviewTimestamp = "2026-08-18T20:00:00.000Z";
export const august2026EncyclopediaTrancheThreeReviewTimestamp = "2026-08-18T22:00:00.000Z";

type EncyclopediaClaim = Omit<SeedClaim, "status"> & {
	status?: SeedClaim["status"];
};

type EncyclopediaSource = SeedClaim["sources"][number];
type EncyclopediaSourceSeed = Omit<
	EncyclopediaSource,
	"appraisal" | "citationCheckedAt" | "citationStatus" | "isAnchor" | "order" | "stance" | "statusSources"
> & {
	appraisal?: EncyclopediaSource["appraisal"];
	isAnchor?: boolean;
	stance?: EncyclopediaSource["stance"];
};

type EncyclopediaTrancheThreeClaim = Omit<EncyclopediaClaim, "sources"> & {
	sources: EncyclopediaSourceSeed[];
};

function encyclopediaClaimAt(seed: EncyclopediaClaim, reviewTimestamp: string): SeedClaim {
	return {
		...seed,
		status: seed.status ?? "published",
		searchCutoffAt: seed.searchCutoffAt ?? reviewTimestamp,
		lastRetractionCheckAt: seed.lastRetractionCheckAt ?? reviewTimestamp,
		changeLog: seed.changeLog ?? [
			{
				date: reviewTimestamp,
				kind: "publication",
				summary: "Initial reviewed claim page published in the evidence-encyclopedia expansion."
			}
		]
	};
}

export function august2026EncyclopediaClaim(seed: EncyclopediaClaim): SeedClaim {
	return encyclopediaClaimAt(seed, august2026EncyclopediaReviewTimestamp);
}

export function august2026EncyclopediaTrancheTwoClaim(seed: EncyclopediaClaim): SeedClaim {
	return encyclopediaClaimAt(seed, august2026EncyclopediaTrancheTwoReviewTimestamp);
}

export function august2026EncyclopediaTrancheThreeClaim(seed: EncyclopediaClaim): SeedClaim {
	return encyclopediaClaimAt(seed, august2026EncyclopediaTrancheThreeReviewTimestamp);
}

export function august2026EncyclopediaTrancheThreeSourcedClaim(
	seed: EncyclopediaTrancheThreeClaim
): SeedClaim {
	return august2026EncyclopediaTrancheThreeClaim({
		...seed,
		sources: seed.sources.map((source, index) => {
			const primaryLink = source.url ?? (source.doi ? `https://doi.org/${source.doi}` : undefined);

			return {
				...source,
				order: index + 1,
				stance: source.stance ?? "supports",
				isAnchor: source.isAnchor ?? index === 0,
				appraisal: source.appraisal ?? "high",
				citationStatus: "current",
				citationCheckedAt: august2026EncyclopediaTrancheThreeReviewTimestamp,
				statusSources: primaryLink ? [primaryLink] : ["Editorial identifier review"]
			};
		})
	});
}
