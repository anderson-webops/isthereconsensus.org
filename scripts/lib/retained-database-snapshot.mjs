import { createHash } from "node:crypto";

export async function snapshotRetainedDatabase(database, serialize) {
	const fingerprint = value => createHash("sha256").update(JSON.stringify(serialize(value, { relaxed: false }))).digest("hex");
	const collections = await database.listCollections({}, { nameOnly: false }).toArray();
	collections.sort((left, right) => left.name.localeCompare(right.name));
	const snapshot = [];
	for (const metadata of collections) {
		const collection = database.collection(metadata.name);
		const indexes = metadata.type === "view"
			? []
			: await collection.indexes();
		indexes.sort((left, right) => left.name.localeCompare(right.name));
		const documents = metadata.type === "view"
			? []
			: await collection.find().sort({ _id: 1 }).toArray();
		snapshot.push({
			name: metadata.name,
			metadata: fingerprint(metadata),
			indexes: fingerprint(indexes),
			documents: fingerprint(documents),
			count: documents.length
		});
	}
	return snapshot;
}
