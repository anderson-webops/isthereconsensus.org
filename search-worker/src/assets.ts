import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { lstat, readFile, realpath } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import modelLock from "../models.lock.json" with { type: "json" };

export { modelLock };

export async function verifyModelAssets(directory: string) {
	assert.ok(path.isAbsolute(directory) && path.normalize(directory) === directory, "A normalized absolute model directory is required.");
	const root = await realpath(directory);
	const paths: Record<string, string> = {};
	for (const entry of modelLock.files) {
		const parent = await lstat(path.join(root, path.dirname(entry.path)));
		assert.ok(parent.isDirectory() && !parent.isSymbolicLink(), "Model directories cannot be symlinks.");
		const filename = path.join(root, entry.path);
		const metadata = await lstat(filename);
		assert.ok(metadata.isFile() && !metadata.isSymbolicLink(), "Model assets must be regular files.");
		assert.equal(metadata.size, entry.size, "Pinned model asset size mismatch.");
		const hash = createHash("sha256");
		for await (const chunk of createReadStream(filename)) hash.update(chunk);
		assert.equal(hash.digest("hex"), entry.sha256, "Pinned model asset digest mismatch.");
		paths[entry.path] = filename;
	}
	return paths;
}

export async function verifyRuntimeVersions() {
	const require = createRequire(import.meta.url);
	for (const [name, version] of Object.entries(modelLock.runtime)) {
		let directory = path.dirname(require.resolve(name));
		let found = false;
		for (let depth = 0; depth < 6; depth++) {
			try {
				const metadata = JSON.parse(await readFile(path.join(directory, "package.json"), "utf8")) as { name: string; version: string };
				if (metadata.name === name) {
					assert.equal(metadata.version, version, "Pinned inference runtime version mismatch.");
					found = true;
					break;
				}
			}
			catch (error) {
				if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
			}
			directory = path.dirname(directory);
		}
		assert.ok(found, "Pinned inference runtime metadata is missing.");
	}
}
