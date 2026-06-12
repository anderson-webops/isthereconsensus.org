export function formatCountLabel(
	count: number | null | undefined,
	singularLabel: string,
	pluralLabel = `${singularLabel}s`
) {
	const normalizedCount = typeof count === "number" && Number.isFinite(count) ? count : 0;
	return `${normalizedCount} ${normalizedCount === 1 ? singularLabel : pluralLabel}`;
}
