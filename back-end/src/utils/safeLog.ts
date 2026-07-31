export function errorCategory(error: unknown): string {
	if (error instanceof Error) return error.name || "Error";
	if (typeof error === "object" && error && "code" in error) {
		return `Error:${String((error as { code?: unknown }).code).slice(0, 40)}`;
	}
	return "UnknownError";
}

export function logError(context: string, error: unknown) {
	console.error(`${context}: ${errorCategory(error)}`);
}
