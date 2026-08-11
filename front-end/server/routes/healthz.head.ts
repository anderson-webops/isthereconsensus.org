export default defineEventHandler((event) => {
	setResponseHeader(event, "Cache-Control", "no-store");
	setResponseStatus(event, 200);
});
