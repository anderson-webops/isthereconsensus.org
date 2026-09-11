import type { SeedClaim } from "./claims.js";
import { september2026AtlasBreadthAgricultureClaims } from "./claim-expansion-2026-09-atlas-breadth-agriculture.js";
import { september2026AtlasBreadthAstronomyClaims } from "./claim-expansion-2026-09-atlas-breadth-astronomy.js";
import { september2026AtlasBreadthEcologyClaims } from "./claim-expansion-2026-09-atlas-breadth-ecology.js";
import { september2026AtlasBreadthEconomicsClaims } from "./claim-expansion-2026-09-atlas-breadth-economics.js";
import { september2026AtlasBreadthGeoscienceClaims } from "./claim-expansion-2026-09-atlas-breadth-geoscience.js";
import { september2026AtlasBreadthOceansClaims } from "./claim-expansion-2026-09-atlas-breadth-oceans.js";
import { september2026AtlasBreadthPhysicsClaims } from "./claim-expansion-2026-09-atlas-breadth-physics.js";

export const september2026AtlasBreadthClaims: SeedClaim[] = [
	...september2026AtlasBreadthAstronomyClaims,
	...september2026AtlasBreadthGeoscienceClaims,
	...september2026AtlasBreadthEcologyClaims,
	...september2026AtlasBreadthAgricultureClaims,
	...september2026AtlasBreadthOceansClaims,
	...september2026AtlasBreadthPhysicsClaims,
	...september2026AtlasBreadthEconomicsClaims
];
