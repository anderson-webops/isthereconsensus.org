interface PublicRequestError {
	message: string;
	status: 400 | 413 | 415;
}

function requestErrorType(error: unknown) {
	if (typeof error !== "object" || !error || !("type" in error)) return "";
	return typeof error.type === "string" ? error.type : "";
}

export function classifyPublicRequestError(error: unknown): PublicRequestError | undefined {
	switch (requestErrorType(error)) {
		case "encoding.unsupported":
			return { message: "Request encoding is not supported.", status: 415 };
		case "entity.parse.failed":
			return { message: "Request body must contain valid JSON.", status: 400 };
		case "entity.too.large":
			return { message: "Request body is too large.", status: 413 };
		default:
			return undefined;
	}
}
