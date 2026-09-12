export default defineEventHandler((event) => {
	if (
		!["/account/editorial/review-priority", "/account/editorial/source-integrity"].includes(
			getRequestURL(event).pathname.replace(/\/$/, "")
		)
	) {
		return;
	}
	setResponseHeader(event, "Cache-Control", "private, no-store");
});
