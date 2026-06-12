import { securityTxtBody, securityTxtRoutes } from "../utils/securityTxt";

export default defineEventHandler((event) => {
	const pathname = getRequestURL(event).pathname;
	if (!securityTxtRoutes.has(pathname)) return;

	setHeader(event, "content-type", "text/plain; charset=utf-8");
	setHeader(event, "cache-control", "public, max-age=3600");
	return securityTxtBody;
});
