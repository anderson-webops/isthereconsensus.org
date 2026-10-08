import path from "node:path";
import process from "node:process";
import { verifyWorkerArtifact } from "./search-worker-artifact-lib.mjs";

const manifest = await verifyWorkerArtifact(path.resolve(process.argv[2] || ".search-worker-artifact"), { expectedCommit: process.env.SEARCH_WORKER_EXPECT_COMMIT, requireClean: process.env.SEARCH_WORKER_REQUIRE_CLEAN === "true" });
process.stdout.write(`Verified independent worker artifact: ${manifest.files.length} hashed entries. Native host capacity and activation are separate gates.\n`);
