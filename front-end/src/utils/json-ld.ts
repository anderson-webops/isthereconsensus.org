export function serializeJsonLd(value: unknown) {
	const serialized = JSON.stringify(value) ?? "null";
	return serialized
		.replaceAll("&", "\\u0026")
		.replaceAll("<", "\\u003c")
		.replaceAll(">", "\\u003e")
		.replaceAll("\u2028", "\\u2028")
		.replaceAll("\u2029", "\\u2029");
}
