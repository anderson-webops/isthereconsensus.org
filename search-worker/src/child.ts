import assert from "node:assert/strict";
import process from "node:process";
import { z } from "zod";
import { publicSearchWorkerRequestSchema } from "../../back-end/src/utils/publicSearchWorker.js";
import { verifyModelAssets } from "./assets.js";
import { createPinnedRuntime } from "./runtime.js";

const messageSchema = z.discriminatedUnion("kind", [
	z.object({ kind: z.literal("warm"), corpusHash: z.string(), corpus: publicSearchWorkerRequestSchema.shape.corpus, vectors: z.unknown().optional() }).strict(),
	z.object({ kind: z.literal("rank"), job: z.number().int().positive(), payload: publicSearchWorkerRequestSchema }).strict()
]);

async function main() {
	assert.ok(process.send && process.argv[2], "The model child requires an owned IPC parent.");
	globalThis.fetch = async () => {
		throw new Error("Model runtime networking is disabled.");
	};
	let activeJob: number | undefined;
	const runtime = await createPinnedRuntime(await verifyModelAssets(process.argv[2]), () => {
		if (activeJob !== undefined) process.send?.({ kind: "scoring", job: activeJob });
	});
	let corpusHash: string | undefined;
	let warmed: Awaited<ReturnType<typeof runtime.warm>> | undefined;
	let busy = false;
	process.on("disconnect", () => process.exit(0));
	process.on("message", async (value: unknown) => {
		try {
			assert.ok(!busy, "The model child accepts only one operation.");
			busy = true;
			const message = messageSchema.parse(value);
			if (message.kind === "warm") {
				assert.ok(!warmed);
				const cached = message.vectors as Parameters<typeof runtime.warm>[1];
				warmed = await runtime.warm(message.corpus, cached);
				corpusHash = message.corpusHash;
				busy = false;
				process.send!({ kind: "warm", corpusHash, vectors: warmed.vectors });
			}
			else {
				assert.ok(warmed && message.payload.corpusHash === corpusHash);
				activeJob = message.job;
				const response = await warmed.rank(message.payload);
				activeJob = undefined;
				busy = false;
				process.send!({ kind: "reply", job: message.job, response });
			}
		}
		catch {
			process.send?.({ kind: "fault" }, () => process.exit(1));
		}
	});
	process.send({ kind: "boot" });
}

main().catch(() => {
	process.send?.({ kind: "fault" }, () => process.exit(1));
	if (!process.send) process.exitCode = 1;
});
