import process from "node:process";
import { defaultClaims } from "../data/claims.js";
import { auditClaimCatalog } from "../utils/editorialAudit.js";

const year = process.argv[2];
if (!year || !/^\d{4}$/.test(year) || process.argv.length !== 3) {
	throw new Error("Usage: tsx src/scripts/auditEditorialCatalog.ts YYYY");
}
process.stdout.write(`${JSON.stringify(auditClaimCatalog(defaultClaims, Number(year)), null, 2)}\n`);
