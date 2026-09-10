import type { IClaim } from "../models/schemas/Claim.js";
import type { IClaimSource } from "../models/schemas/ClaimSource.js";
import type { ITopic } from "../models/schemas/Topic.js";
import { normalizeDoi } from "./sourceIntegrity.js";

interface CitationClaim extends Pick<IClaim, "lastReviewedAt" | "publishedAt" | "slug" | "title"> {}

interface CitationSource extends Pick<
	IClaimSource,
	"doi" | "kind" | "note" | "pmcid" | "pmid" | "publisher" | "title" | "url" | "year"
> {}

interface CitationTopic extends Pick<ITopic, "slug" | "title"> {}

const REVIEW_AUTHOR = "Is There Consensus editorial team";

export interface ClaimCitationBundle {
	plainText: string;
	reviewMarkdown: string;
	markdown: string;
	bibtex: string;
	ris: string;
	cslJson: Array<Record<string, unknown>>;
	reviewUrl: string;
	reviewedAt?: string;
	generatedAt: string;
}

function cleanText(value: unknown) {
	return typeof value === "string" ? value.replaceAll(/\s+/g, " ").trim() : "";
}

function citationDate(value: Date | string | undefined) {
	if (!value) return undefined;
	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? undefined : date;
}

function isoDate(value: Date | undefined) {
	return value?.toISOString().slice(0, 10);
}

function displayDate(value: Date | undefined) {
	if (!value) return "review date not recorded";
	return new Intl.DateTimeFormat("en-US", {
		day: "numeric",
		month: "long",
		timeZone: "UTC",
		year: "numeric"
	}).format(value);
}

function bibtexValue(value: unknown) {
	const replacements: Record<string, string> = {
		"\\": "\\textbackslash{}",
		"{": "\\{",
		"}": "\\}",
		"%": "\\%",
		"&": "\\&",
		"#": "\\#",
		"_": "\\_",
		"$": "\\$",
		"~": "\\textasciitilde{}",
		"^": "\\textasciicircum{}"
	};
	return cleanText(value).replaceAll(/[\\{}%&#_$~^]/g, character => replacements[character] ?? character);
}

function citationKey(value: string, fallback: string) {
	const normalized = value
		.toLowerCase()
		.replaceAll(/[^a-z0-9]+/g, "_")
		.replaceAll(/^_+|_+$/g, "")
		.slice(0, 48);
	return normalized || fallback;
}

function safeHttpUrl(value: unknown) {
	const candidate = cleanText(value);
	if (!candidate) return "";
	try {
		const parsed = new URL(candidate);
		return ["http:", "https:"].includes(parsed.protocol) && !parsed.username && !parsed.password
			? parsed.toString()
			: "";
	}
	catch {
		return "";
	}
}

function markdownText(value: unknown) {
	return cleanText(value).replaceAll(/[\\[\]]/g, character => `\\${character}`);
}

function sourceUrl(source: CitationSource) {
	const url = safeHttpUrl(source.url);
	if (url) return url;
	const doi = normalizeDoi(source.doi);
	if (doi) {
		const resolver = new URL("https://doi.org/");
		resolver.pathname = `/${doi}`;
		return resolver.toString();
	}
	const pmcid = /^PMC\d+$/iu.test(cleanText(source.pmcid)) ? cleanText(source.pmcid).toUpperCase() : "";
	if (pmcid) return `https://pmc.ncbi.nlm.nih.gov/articles/${pmcid}/`;
	const pmid = /^\d{1,12}$/u.test(cleanText(source.pmid)) ? cleanText(source.pmid) : "";
	return pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : "";
}

function bibtexEntry(key: string, fields: Array<[string, unknown]>, type = "misc") {
	const lines = fields
		.map(([name, value]) => {
			const escapedValue = bibtexValue(value);
			return [
				name,
				name === "author" && cleanText(value) === REVIEW_AUTHOR ? `{${escapedValue}}` : escapedValue
			] as const;
		})
		.filter(([, value]) => Boolean(value))
		.map(([name, value]) => `  ${name} = {${value}}`);
	return `@${type}{${key},\n${lines.join(",\n")}\n}`;
}

function risRecord(fields: Array<[string, unknown]>) {
	return [
		...fields
			.map(([name, value]) => [name, cleanText(value)] as const)
			.filter(([, value]) => Boolean(value))
			.map(([name, value]) => `${name}  - ${value}`),
		"ER  -"
	].join("\n");
}

export function buildClaimCitationBundle(params: {
	claim: CitationClaim;
	topic: CitationTopic;
	sources: CitationSource[];
	siteOrigin: string;
	generatedAt?: Date;
}): ClaimCitationBundle {
	const generatedAt = params.generatedAt ?? new Date();
	const reviewedDate = citationDate(params.claim.lastReviewedAt) ?? citationDate(params.claim.publishedAt);
	const reviewedAt = isoDate(reviewedDate);
	const origin = params.siteOrigin.replace(/\/+$/u, "");
	const reviewUrl = `${origin}/consensus/${encodeURIComponent(params.topic.slug)}/${encodeURIComponent(params.claim.slug)}`;
	const reviewKey = `isthereconsensus_${citationKey(params.claim.slug, "review")}_${reviewedDate?.getUTCFullYear() ?? "undated"}`;
	const reviewTitle = cleanText(params.claim.title);
	const reviewTitleSentence = /[.!?]$/u.test(reviewTitle) ? reviewTitle : `${reviewTitle}.`;
	const plainText = `${REVIEW_AUTHOR}. “${reviewTitleSentence}” Is There Consensus. Reviewed ${displayDate(reviewedDate)}. ${reviewUrl}`;
	const reviewMarkdown = `[${cleanText(params.claim.title)}](${reviewUrl}). *Is There Consensus*, reviewed ${displayDate(reviewedDate)}.`;
	const reviewBibtex = bibtexEntry(reviewKey, [
		["title", params.claim.title],
		["author", REVIEW_AUTHOR],
		["howpublished", "Is There Consensus"],
		["year", reviewedDate?.getUTCFullYear()],
		["url", reviewUrl],
		["note", `Reviewed ${displayDate(reviewedDate)}`]
	]);
	const reviewRis = risRecord([
		["TY", "ELEC"],
		["TI", params.claim.title],
		["AU", REVIEW_AUTHOR],
		["T2", "Is There Consensus"],
		["PY", reviewedDate?.getUTCFullYear()],
		["UR", reviewUrl],
		["Y2", reviewedAt]
	]);

	const sourceBibtex = params.sources.map((source, index) => {
		const doi = normalizeDoi(source.doi);
		const key = `itc_source_${citationKey(doi || source.pmid || source.title, `source_${index + 1}`)}_${source.year ?? "undated"}`;
		return bibtexEntry(key, [
			["title", source.title],
			["publisher", source.publisher],
			["year", source.year],
			["doi", doi],
			["url", sourceUrl(source)],
			["note", source.note]
		]);
	});
	const sourceRis = params.sources.map(source => risRecord([
		["TY", source.kind === "landmark_study" ? "JOUR" : "GEN"],
		["TI", source.title],
		["PB", source.publisher],
		["PY", source.year],
		["DO", normalizeDoi(source.doi)],
		["UR", sourceUrl(source)],
		["N1", source.note]
	]));
	const sourceMarkdown = params.sources.map((source, index) => {
		const link = sourceUrl(source);
		const linkedTitle = link ? `[${markdownText(source.title)}](<${link}>)` : markdownText(source.title);
		const details = [cleanText(source.publisher), source.year ? String(source.year) : "", normalizeDoi(source.doi)]
			.filter(Boolean)
			.join(", ");
		return `${index + 1}. ${linkedTitle}${details ? `. ${details}.` : "."}`;
	});
	const markdown = [
		`# ${cleanText(params.claim.title)}`,
		"",
		reviewMarkdown,
		"",
		"## Sources",
		"",
		...sourceMarkdown
	].join("\n");
	const cslJson: Array<Record<string, unknown>> = [
		{
			"id": reviewKey,
			"type": "webpage",
			"title": cleanText(params.claim.title),
			"container-title": "Is There Consensus",
			"author": [{ literal: REVIEW_AUTHOR }],
			"issued": reviewedDate ? { "date-parts": [[reviewedDate.getUTCFullYear(), reviewedDate.getUTCMonth() + 1, reviewedDate.getUTCDate()]] } : undefined,
			"URL": reviewUrl
		},
		...params.sources.map((source, index) => ({
			id: `itc-source-${index + 1}`,
			type: source.kind === "landmark_study" ? "article-journal" : "report",
			title: cleanText(source.title),
			publisher: cleanText(source.publisher) || undefined,
			issued: source.year ? { "date-parts": [[source.year]] } : undefined,
			DOI: normalizeDoi(source.doi) || undefined,
			URL: sourceUrl(source) || undefined,
			note: cleanText(source.note) || undefined
		}))
	];

	return {
		plainText,
		reviewMarkdown,
		markdown,
		bibtex: [reviewBibtex, ...sourceBibtex].join("\n\n"),
		ris: [reviewRis, ...sourceRis].join("\n\n"),
		cslJson,
		reviewUrl,
		reviewedAt,
		generatedAt: generatedAt.toISOString()
	};
}
