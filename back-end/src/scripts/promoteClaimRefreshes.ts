import type { RefreshPlan } from "../utils/claimRefreshPromotion.js";
import { createHash } from "node:crypto";
import { constants } from "node:fs";
import { open } from "node:fs/promises";
import process from "node:process";
import { parseArgs } from "node:util";
import mongoose from "mongoose";
import { applyClaimRefreshes, canonicalRefreshJSON, prepareClaimRefreshes, RefreshConflict, refreshDigest } from "../utils/claimRefreshPromotion.js";
import { resolveMongoConfiguration } from "../utils/mongoConfiguration.js";
import { logError } from "../utils/safeLog.js";

async function readPlan(path: string): Promise<RefreshPlan> {
	const file = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
	try {
		const stat = await file.stat();
		if (!stat.isFile() || stat.size > 8 * 1024 * 1024 || (stat.mode & 0o077) !== 0) {
			throw new RefreshConflict("Plan must be an owner-only regular file no larger than 8 MiB.");
		}
		return JSON.parse(await file.readFile("utf8"));
	}
	finally { await file.close(); }
}

async function verifyBackup(path: string, expected: string) {
	if (!/^[a-f0-9]{64}$/.test(expected)) throw new RefreshConflict("Supply the reviewed backup SHA-256.");
	const file = await open(path, constants.O_RDONLY | constants.O_NOFOLLOW);
	try {
		const stat = await file.stat();
		if (!stat.isFile() || !stat.size) throw new RefreshConflict("The backup must be a nonempty regular file.");
		const hash = createHash("sha256");
		for await (const chunk of file.createReadStream({ autoClose: false })) hash.update(chunk);
		if (hash.digest("hex") !== expected) throw new RefreshConflict("The backup digest does not match the reviewed artifact.");
	}
	finally { await file.close(); }
}

async function main() {
	const { values } = parseArgs({ options: {
		"help": { type: "boolean" },
		"preview": { type: "boolean" },
		"apply": { type: "boolean" },
		"review": { type: "string", multiple: true },
		"plan": { type: "string" },
		"plan-sha256": { type: "string" },
		"backup-file": { type: "string" },
		"backup-sha256": { type: "string" },
		"operator-note": { type: "string" }
	} });
	if (values.help) {
		console.log("Preview: --preview --review topic/claim [--review topic/claim] --plan /private/plan.json\nApply: --apply --plan /private/plan.json --plan-sha256 <reviewed-digest> --backup-file /private/backup.archive --backup-sha256 <reviewed-digest> --operator-note <backup-restore-check-and-content-review-record>\nUses protected runtime MongoDB configuration. Read docs/claim-refresh-promotion.md first. A backup digest identifies an artifact; it does not verify restoration or authorize editorial changes.");
		return;
	}
	if (Boolean(values.preview) === Boolean(values.apply) || !values.plan) throw new RefreshConflict("Choose exactly one of --preview or --apply and supply --plan.");
	let reviewed: RefreshPlan | undefined;
	if (values.apply) {
		if (values.review || !values["plan-sha256"] || !values["backup-file"] || !values["backup-sha256"] || !values["operator-note"]) throw new RefreshConflict("Apply requires the reviewed plan, backup digests and operator note; selection comes only from that plan.");
		reviewed = await readPlan(values.plan);
		if (refreshDigest(reviewed) !== values["plan-sha256"]) throw new RefreshConflict("The reviewed plan digest does not match.");
		await verifyBackup(values["backup-file"], values["backup-sha256"]);
	}
	else if (!values.review?.length || values["plan-sha256"] || values["backup-file"] || values["backup-sha256"] || values["operator-note"]) {
		throw new RefreshConflict("Preview requires an explicit review selection and no apply options.");
	}
	const { uri } = await resolveMongoConfiguration();
	// Preview must not implicitly create collections or indexes via model initialization.
	await mongoose.connect(uri, { autoCreate: false, autoIndex: false, connectTimeoutMS: 10_000, serverSelectionTimeoutMS: 10_000, socketTimeoutMS: 70_000 });
	if (reviewed) {
		const result = await applyClaimRefreshes(reviewed, { planSha256: values["plan-sha256"]!, backupSha256: values["backup-sha256"]!, operatorNote: values["operator-note"]! });
		console.log(JSON.stringify(result));
	}
	else {
		const plan = await prepareClaimRefreshes(values.review!);
		const file = await open(values.plan, "wx", 0o600);
		try {
			await file.writeFile(canonicalRefreshJSON(plan));
		}
		finally { await file.close(); }
		console.log(JSON.stringify({ status: "preview", selection: plan.selection, planSha256: refreshDigest(plan) }));
	}
}

main().catch((error) => {
	if (error instanceof RefreshConflict) console.error(error.message);
	else logError("Claim refresh promotion failed", error);
	process.exitCode = 1;
}).finally(async () => {
	if (mongoose.connection.readyState !== 0) await mongoose.disconnect();
});
