import type { SeedClaim } from "./claims.js";
import { readerDigitalClaims, readerDigitalGaps } from "./claim-expansion-reader-digital.js";
import { readerElectricityClaims, readerElectricityGaps } from "./claim-expansion-reader-electricity.js";
import { readerMechanicsClaims, readerMechanicsGaps } from "./claim-expansion-reader-mechanics.js";
import { readerOriginsClaims, readerOriginsGaps } from "./claim-expansion-reader-origins.js";
import { readerPhysicsClaims, readerPhysicsGaps } from "./claim-expansion-reader-physics.js";
import { readerPrivacyClaims, readerPrivacyGaps } from "./claim-expansion-reader-privacy.js";
import { readerProbabilityClaims, readerProbabilityGaps } from "./claim-expansion-reader-probability.js";
import { readerSpaceClaims, readerSpaceGaps } from "./claim-expansion-reader-space.js";
import { readerWaterClaims, readerWaterGaps } from "./claim-expansion-reader-water.js";
import { readerWeatherClaims, readerWeatherGaps } from "./claim-expansion-reader-weather.js";

export const readerExpansionClaims: SeedClaim[] = [
	...readerPrivacyClaims,
	...readerOriginsClaims,
	...readerSpaceClaims,
	...readerWaterClaims,
	...readerPhysicsClaims,
	...readerProbabilityClaims,
	...readerElectricityClaims,
	...readerMechanicsClaims,
	...readerDigitalClaims,
	...readerWeatherClaims
];
export const readerExpansionGaps = [...readerPrivacyGaps, ...readerOriginsGaps, ...readerSpaceGaps, ...readerWaterGaps, ...readerPhysicsGaps, ...readerProbabilityGaps, ...readerElectricityGaps, ...readerMechanicsGaps, ...readerDigitalGaps, ...readerWeatherGaps];
