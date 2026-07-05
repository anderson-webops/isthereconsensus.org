import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const accountDeletionSource = readFileSync(join(testDir, "..", "src/pages/account-deletion-and-retention.vue"), "utf8");

describe("account deletion layout", () => {
	it("keeps the account deletion request path concise without hiding retention limits", () => {
		assert.match(
			accountDeletionSource,
			/Use this request-based process for account closure, public-content handling, and retained records\./
		);
		assert.match(accountDeletionSource, /There is no self-serve deletion portal yet/);
		assert.match(
			accountDeletionSource,
			/Public questions and threads can be removed, disassociated, or retained when integrity requires it\./
		);
		assert.match(
			accountDeletionSource,
			/Deletion and erasure rights may be limited by legal, fraud-prevention, security, and recordkeeping exceptions\./
		);
		assert.match(accountDeletionSource, /<strong>Account deletion request<\/strong>/);
		assert.doesNotMatch(accountDeletionSource, /There is not currently a self-serve deletion portal/);
		assert.doesNotMatch(accountDeletionSource, /The current request-based process covers account closure/);
	});
});
