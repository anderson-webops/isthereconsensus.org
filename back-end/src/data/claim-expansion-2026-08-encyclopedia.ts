import type { SeedClaim } from "./claims.js";
import { august2026CrimeClaims } from "./claim-expansion-2026-08-crime.js";
import { august2026EducationClaims } from "./claim-expansion-2026-08-education.js";
import { august2026ExerciseClaims } from "./claim-expansion-2026-08-exercise.js";
import { august2026SleepClaims } from "./claim-expansion-2026-08-sleep.js";

export const august2026EncyclopediaClaims: SeedClaim[] = [
	...august2026EducationClaims,
	...august2026SleepClaims,
	...august2026ExerciseClaims,
	...august2026CrimeClaims
];
