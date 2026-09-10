import type { SeedClaim } from "./claims.js";
import { september2026AgingLongevityClaims } from "./claim-expansion-2026-09-aging-longevity.js";
import { september2026MentalHealthClaims } from "./claim-expansion-2026-09-mental-health.js";
import { september2026ReproductiveHealthClaims } from "./claim-expansion-2026-09-reproductive-health.js";

export const september2026HealthspanClaims: SeedClaim[] = [
	...september2026MentalHealthClaims,
	...september2026ReproductiveHealthClaims,
	...september2026AgingLongevityClaims
];
