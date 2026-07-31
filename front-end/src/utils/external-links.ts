function normalizedIdentifier(value: unknown) {
	return typeof value === "string" ? value.trim() : "";
}

export function safeExternalHttpUrl(value: unknown) {
	const candidate = normalizedIdentifier(value);
	if (!candidate) return "";

	try {
		const parsed = new URL(candidate);
		if (!["http:", "https:"].includes(parsed.protocol) || parsed.username || parsed.password) {
			return "";
		}
		return parsed.toString();
	} catch {
		return "";
	}
}

export function doiResolverUrl(value: unknown) {
	const candidate = normalizedIdentifier(value);
	if (!/^10\.\d{4,9}\/[^\s\\]+$/.test(candidate)) return "";

	const [prefix, ...suffixParts] = candidate.split("/");
	const encodedSuffix = suffixParts.map((part) => encodeURIComponent(part)).join("/");
	return `https://doi.org/${encodeURIComponent(prefix || "")}/${encodedSuffix}`;
}

export function pubMedUrl(value: unknown) {
	const candidate = normalizedIdentifier(value);
	return /^\d{1,40}$/.test(candidate) ? `https://pubmed.ncbi.nlm.nih.gov/${encodeURIComponent(candidate)}/` : "";
}

export function pubMedCentralUrl(value: unknown) {
	const candidate = normalizedIdentifier(value);
	return /^PMC\d{1,36}$/i.test(candidate)
		? `https://pmc.ncbi.nlm.nih.gov/articles/${encodeURIComponent(candidate.toUpperCase())}/`
		: "";
}
