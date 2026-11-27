import { defineEventHandler, setResponseHeader, setResponseStatus } from "h3";

export default defineEventHandler((event) => {
	setResponseHeader(event, "Cache-Control", "no-store");
	setResponseStatus(event, 200);
	return "";
});
