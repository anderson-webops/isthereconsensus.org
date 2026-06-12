const separatorPattern = /[-_]+/g;

export function formatSlugTitle(slug: string | null | undefined, fallback = "Topic") {
	const words = String(slug ?? "")
		.trim()
		.replace(separatorPattern, " ")
		.split(/\s+/)
		.filter(Boolean);

	if (!words.length) return fallback;

	return words
		.map((word, index) => {
			const lower = word.toLowerCase();
			if (index > 0 && ["and", "or", "of", "the"].includes(lower)) return lower;
			return `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;
		})
		.join(" ");
}
