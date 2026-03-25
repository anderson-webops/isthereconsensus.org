const quotePattern = /['"]/g;
const nonAlphaNumericPattern = /[^a-z0-9]+/g;
const edgeDashPattern = /^-+|-+$/g;

export function slugify(value: string): string {
	return value
		.toLowerCase()
		.trim()
		.replace(quotePattern, "")
		.replace(nonAlphaNumericPattern, "-")
		.replace(edgeDashPattern, "");
}
