import process from "node:process";

let corpus;
let corpusHash;
process.on("message", (message) => {
	if (message.kind === "warm") {
		if ("query" in message || "payload" in message) process.exit(1);
		corpus = message.corpus;
		corpusHash = message.corpusHash;
		const passages = corpus.flatMap((claim) => {
			const fields = [["bottomLine", 0, claim.bottomLine], ["editorSummary", 0, claim.editorSummary], ...claim.stableCore.map((text, index) => ["stableCore", index, text])].filter(([, , text]) => text.trim());
			return fields.length ? fields.map(([field, index]) => ({ id: `${claim.slug}:${field}:${index}`, slug: claim.slug })) : [{ id: `${claim.slug}:title:0`, slug: claim.slug }];
		});
		const vectors = message.vectors ?? passages.map(row => ({ ...row, vector: [1, ...Array.from({ length: 383 }).fill(0)] }));
		setTimeout(() => process.send({ kind: "warm", corpusHash, vectors }), 20);
	}
	else if (message.kind === "rank") {
		if (message.payload.query === "HOLD_INFERENCE") {
			return;
		}
		process.send({ kind: "reply", job: message.job, response: { protocol: 1, candidate: message.payload.candidate, corpusHash, queryHash: message.payload.queryHash, referenceDate: message.payload.referenceDate, rows: [{ slug: corpus[0].slug, kind: "native" }] } });
	}
});
process.send({ kind: "boot" });
process.on("disconnect", () => process.exit(0));
