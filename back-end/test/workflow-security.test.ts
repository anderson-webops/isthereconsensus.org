import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import process from "node:process";
import { afterEach, describe, it } from "node:test";
import { fileURLToPath } from "node:url";
import { claimWorkflowTransitionAllowed } from "../src/utils/claimWorkflow.js";
import { resolveMongoConfiguration } from "../src/utils/mongoConfiguration.js";
import { summarizeClaimSourceReadiness } from "../src/utils/publicClaimReadiness.js";

const originalEnvironment = {
	mongoUri: process.env.MONGODB_URI,
	vaultRoleId: process.env.VAULT_ROLE_ID,
	vaultSecretId: process.env.VAULT_SECRET_ID
};
const testDir = dirname(fileURLToPath(import.meta.url));
const backendRoot = join(testDir, "..");
const serverSource = readFileSync(join(backendRoot, "src", "server.ts"), "utf8");
const seedSource = readFileSync(join(backendRoot, "src", "data", "seedClaims.ts"), "utf8");

function restoreEnvironment(name: keyof typeof process.env, value: string | undefined) {
	if (value === undefined) delete process.env[name];
	else process.env[name] = value;
}

afterEach(() => {
	restoreEnvironment("MONGODB_URI", originalEnvironment.mongoUri);
	restoreEnvironment("VAULT_ROLE_ID", originalEnvironment.vaultRoleId);
	restoreEnvironment("VAULT_SECRET_ID", originalEnvironment.vaultSecretId);
});

describe("workflow security", () => {
	it("allows only explicit claim lifecycle transitions", () => {
		assert.equal(claimWorkflowTransitionAllowed("draft", "publish"), true);
		assert.equal(claimWorkflowTransitionAllowed("needs_update", "publish"), true);
		assert.equal(claimWorkflowTransitionAllowed("archived", "publish"), false);
		assert.equal(claimWorkflowTransitionAllowed("published", "request_update"), true);
		assert.equal(claimWorkflowTransitionAllowed("draft", "request_update"), false);
		assert.equal(claimWorkflowTransitionAllowed("published", "review"), true);
		assert.equal(claimWorkflowTransitionAllowed("archived", "restore_draft"), true);
		assert.equal(claimWorkflowTransitionAllowed("published", "restore_draft"), false);
	});

	it("fails closed on partial Vault configuration and uses the environment only when Vault is disabled", async () => {
		process.env.MONGODB_URI = "mongodb://127.0.0.1:27017/test";
		process.env.VAULT_ROLE_ID = "configured-role";
		delete process.env.VAULT_SECRET_ID;
		await assert.rejects(resolveMongoConfiguration(), /configured together/);

		delete process.env.VAULT_ROLE_ID;
		const configuration = await resolveMongoConfiguration();
		assert.deepEqual(configuration, {
			source: "env",
			uri: "mongodb://127.0.0.1:27017/test"
		});
	});

	it("requires production session and captcha secrets before listening", () => {
		assert.match(serverSource, /if \(!SESSION_SECRET\) throw new Error\("Missing SESSION_SECRET"\)/);
		assert.match(serverSource, /SESSION_SECRET must be a unique production secret of at least 32 characters/);
		assert.match(serverSource, /CAPTCHA_SECRET is required in production/);
	});

	it("does not treat retracted sources as a publish-ready source stack", () => {
		const counts = summarizeClaimSourceReadiness([
			{
				kind: "systematic_review",
				url: "https://example.com/current"
			},
			{
				citationStatus: "retracted",
				kind: "meta_analysis",
				url: "https://example.com/retracted"
			},
			{
				evidenceProfile: {
					publicationIntegrity: {
						retracted: true
					}
				} as any,
				kind: "guideline",
				url: "https://example.com/retracted-profile"
			}
		]);

		assert.deepEqual(counts, {
			decisionWeightSourceCount: 1,
			linkedSourceCount: 1,
			sourceCount: 1
		});
	});

	it("keeps restart seeding insert-only unless synchronization is explicitly selected", () => {
		assert.match(seedSource, /existingClaim && !synchronizeExisting/);
		assert.match(seedSource, /if \(synchronizeExisting\) \{\s+await archiveRetiredSeedClaims/);
		assert.match(serverSource, /SEED_CONTENT_MODE must be either insert or sync/);
		assert.match(serverSource, /seedClaims\(\{ synchronizeExisting: seedContentMode === "sync" \}\)/);
	});

	it("requires protected notes for evidence demotion and public reasons for claim demotion", () => {
		assert.match(
			serverSource,
			/\/evidence-landscape\/request-changes"[\s\S]+A private change-request note is required/
		);
		assert.match(serverSource, /\/request-update"[\s\S]+A public update rationale is required/);
		assert.match(serverSource, /\/archive"[\s\S]+A public archival rationale is required/);
	});

	it("does not accept source reviewer identities or timestamps from editorial request bodies", () => {
		assert.match(serverSource, /codedById: defaults\.reviewer\.codedById/);
		assert.match(serverSource, /codedAt: defaults\.reviewer\.codedAt/);
		assert.match(serverSource, /reviewedById: defaults\.reviewer\.reviewedById/);
		assert.match(serverSource, /reviewedAt: defaults\.reviewer\.reviewedAt/);
		assert.match(
			serverSource,
			/source\.evidenceProfile\.reviewer\.codedById = new mongoose\.Types\.ObjectId\(actor\.id\)/
		);
		assert.match(serverSource, /source\.evidenceProfile\.reviewer\.reviewedById = undefined/);
	});

	it("removes question content without erasing moderation evidence", () => {
		assert.match(serverSource, /question\.title = "Removed question"/);
		assert.match(serverSource, /question\.author = undefined/);
		assert.match(serverSource, /question\.linkedBy = undefined/);
		assert.match(serverSource, /question\.status = "archived"/);
		assert.match(serverSource, /preservedModerationFlags: "true"/);
		assert.doesNotMatch(serverSource, /QuestionFlag\.deleteMany/);
	});

	it("rate-limits both general reads and expensive search suggestions", () => {
		assert.match(serverSource, /const readLimiter = rateLimit/);
		assert.match(serverSource, /app\.use\("\/api", readLimiter\)/);
		assert.match(serverSource, /api\.get\("\/search\/suggestions", searchSuggestionLimiter/);
	});
});
