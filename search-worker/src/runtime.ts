import type { PublicSearchWorkerRequest, PublicSearchWorkerResponse } from "../../back-end/src/utils/publicSearchWorker.js";
import type { PassageVector, Prediction } from "./pipeline.js";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { Tokenizer } from "@huggingface/tokenizers";
import * as cpu from "onnxruntime-node";
import * as wasm from "onnxruntime-web";
import { verifyRuntimeVersions } from "./assets.js";
import { createAcceptedPipeline, publicPassages } from "./pipeline.js";

export async function createPinnedRuntime(paths: Record<string, string>, onNativeBatch?: () => void) {
	await verifyRuntimeVersions();
	const readJson = async (filename: string) => JSON.parse(await readFile(paths[filename], "utf8"));
	const bgeDefinition = await readJson("bge/tokenizer.json");
	const bgeTokenizer = new Tokenizer(bgeDefinition, await readJson("bge/tokenizer_config.json"));
	const gteTokenizer = new Tokenizer(await readJson("gte/tokenizer.json"), await readJson("gte/tokenizer_config.json"));
	const gteConfiguration = await readJson("gte/config.json");
	assert.equal(gteConfiguration.pad_token_id, 50283);
	wasm.env.wasm.numThreads = 1;
	const embedding = await wasm.InferenceSession.create(await readFile(paths["bge/model.onnx"]), { executionProviders: ["wasm"], logSeverityLevel: 3 });
	let scoring: cpu.InferenceSession;
	try {
		scoring = await cpu.InferenceSession.create(paths["gte/model.onnx"], { executionProviders: ["cpu"], intraOpNumThreads: 2, interOpNumThreads: 1, logSeverityLevel: 3 });
		assert.deepEqual(scoring.inputNames.toSorted(), ["attention_mask", "input_ids"]);
		assert.deepEqual(scoring.outputNames, ["logits"]);
	}
	catch (error) {
		await embedding.release();
		throw error;
	}
	const diagnostics = { embeddingCalls: 0, scoringBatches: 0, scoringPairs: 0, maximumPairTokens: 0 };
	function embeddingInput(text: string) {
		const content = bgeTokenizer.encode(text, { add_special_tokens: false }).ids;
		assert.ok(content.length <= 510, "A complete paragraph or query exceeds the embedding bound.");
		return [bgeDefinition.model.vocab["[CLS]"], ...content, bgeDefinition.model.vocab["[SEP]"]] as number[];
	}
	async function encode(text: string) {
		const identifiers = embeddingInput(text);
		const dimensions = [1, identifiers.length];
		const tensors = {
			input_ids: new wasm.Tensor("int64", BigInt64Array.from(identifiers, identifier => BigInt(identifier)), dimensions),
			attention_mask: new wasm.Tensor("int64", new BigInt64Array(identifiers.length).fill(1n), dimensions),
			token_type_ids: new wasm.Tensor("int64", new BigInt64Array(identifiers.length), dimensions)
		};
		let output: wasm.InferenceSession.OnnxValueMapType | undefined;
		try {
			const feeds = Object.fromEntries(embedding.inputNames.map(name => [name, tensors[name as keyof typeof tensors]]));
			assert.ok(Object.values(feeds).every(Boolean));
			output = await embedding.run(feeds);
			assert.deepEqual(output.last_hidden_state.dims, [1, identifiers.length, 384]);
			const vector = Array.from((output.last_hidden_state.data as Float32Array).slice(0, 384));
			const norm = Math.hypot(...vector);
			assert.ok(norm > 0 && Number.isFinite(norm));
			diagnostics.embeddingCalls++;
			return vector.map(value => value / norm);
		}
		finally {
			for (const tensor of [...Object.values(tensors), ...Object.values(output ?? {})]) tensor.dispose();
		}
	}
	function pairInput(query: string, document: string) {
		const encoded = gteTokenizer.encode(query, { text_pair: document, add_special_tokens: true });
		assert.ok(encoded.ids.length <= 8192, "The complete paired input exceeds the scoring bound.");
		return { inputIds: encoded.ids, attentionMask: encoded.attention_mask };
	}
	function paddedInput(pairs: Array<{ query: string; document: string }>) {
		assert.ok(pairs.length > 0 && pairs.length <= 8);
		const rows = pairs.map(pair => pairInput(pair.query, pair.document));
		const length = Math.max(...rows.map(row => row.inputIds.length));
		return {
			length,
			inputIds: rows.map(row => [...row.inputIds, ...Array.from({ length: length - row.inputIds.length }).fill(50283)]),
			attentionMask: rows.map(row => [...row.attentionMask, ...Array.from({ length: length - row.attentionMask.length }).fill(0)])
		};
	}
	async function score(query: string, documents: string[]) {
		const results: Prediction[] = [];
		for (let first = 0; first < documents.length; first += 8) {
			const rows = documents.slice(first, first + 8).map(document => ({ query, document }));
			const padded = paddedInput(rows);
			const dimensions = [rows.length, padded.length];
			const tensors = {
				input_ids: new cpu.Tensor("int64", BigInt64Array.from(padded.inputIds.flat(), value => BigInt(value)), dimensions),
				attention_mask: new cpu.Tensor("int64", BigInt64Array.from(padded.attentionMask.flat(), value => BigInt(value)), dimensions)
			};
			let output: cpu.InferenceSession.OnnxValueMapType | undefined;
			try {
				const inference = scoring.run(tensors, ["logits"]);
				onNativeBatch?.();
				output = await inference;
				assert.deepEqual(output.logits.dims, [rows.length, 1]);
				for (const raw of output.logits.data as Float32Array) {
					const rawLogit = Number(raw);
					assert.ok(Number.isFinite(rawLogit));
					results.push({ rawLogit, relevance: 1 / (1 + Math.exp(-rawLogit)) });
				}
				diagnostics.scoringBatches++;
				diagnostics.scoringPairs += rows.length;
				diagnostics.maximumPairTokens = Math.max(diagnostics.maximumPairTokens, padded.length);
			}
			finally {
				for (const tensor of [...Object.values(tensors), ...Object.values(output ?? {})]) tensor.dispose();
			}
		}
		return results;
	}
	async function warm(corpus: PublicSearchWorkerRequest["corpus"], cached?: PassageVector[]) {
		const passages = publicPassages(corpus);
		for (const passage of passages) embeddingInput(passage.text);
		let vectors: PassageVector[];
		if (cached) {
			assert.equal(cached.length, passages.length);
			for (const [index, row] of cached.entries()) {
				assert.equal(row.id, passages[index].id);
				assert.equal(row.slug, passages[index].slug);
				assert.equal(row.vector.length, 384);
				assert.ok(row.vector.every(Number.isFinite) && Math.abs(Math.hypot(...row.vector) - 1) < 0.001);
			}
			vectors = cached;
		}
		else {
			vectors = [];
			for (const passage of passages) vectors.push({ id: passage.id, slug: passage.slug, vector: await encode(passage.text) });
		}
		return {
			vectors,
			async rank(payload: PublicSearchWorkerRequest): Promise<PublicSearchWorkerResponse> {
				const pipeline = createAcceptedPipeline(corpus, passages, vectors, new Date(payload.referenceDate));
				const terminal = pipeline.terminal(payload.query);
				let rows: PublicSearchWorkerResponse["rows"];
				if (terminal.terminal) {
					rows = terminal.results.map(row => ({ slug: row.claim.slug, kind: "native" }));
				}
				else {
					const vector = await encode(`Represent this sentence for searching relevant passages: ${payload.query}`);
					const prepared = pipeline.prepare(payload.query, vector);
					const predictions = await score(payload.query, prepared.candidates.map(row => row.document));
					rows = pipeline.finish(prepared, predictions);
				}
				return { protocol: payload.protocol, candidate: payload.candidate, corpusHash: payload.corpusHash, queryHash: payload.queryHash, referenceDate: payload.referenceDate, rows };
			}
		};
	}
	return { encode, embeddingInput, pairInput, paddedInput, score, warm, diagnostics, release: async () => {
		await scoring.release();
		await embedding.release();
	} };
}
