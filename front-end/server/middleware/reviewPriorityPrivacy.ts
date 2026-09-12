export default defineEventHandler((event) => {
	if (getRequestURL(event).pathname.replace(/\/$/, "") !== "/account/editorial/review-priority") return;
	setResponseHeader(event, "Cache-Control", "private, no-store");
});
