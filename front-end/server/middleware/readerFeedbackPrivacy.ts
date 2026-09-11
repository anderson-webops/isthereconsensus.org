export default defineEventHandler((event) => {
	if (getRequestURL(event).pathname.replace(/\/$/, "") !== "/account/editorial/reader-feedback") return;
	setResponseHeader(event, "Cache-Control", "private, no-store");
	setResponseHeader(event, "X-Robots-Tag", "noindex, nofollow");
});
