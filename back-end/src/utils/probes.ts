import type { Request, Response } from "express";
import { Router } from "express";

export type ReadinessCheck = () => boolean | Promise<boolean>;

function sendProbe(res: Response, ok: boolean, method: Request["method"]): void {
	res.status(ok ? 200 : 503).set("Cache-Control", "no-store");
	if (method === "HEAD") {
		res.end();
		return;
	}

	res.json({ ok });
}

export function createProbeRouter(checkReadiness: ReadinessCheck): Router {
	const router = Router();
	const readinessHandler = async (req: Request, res: Response) => {
		let ready = false;
		try {
			ready = await checkReadiness();
		}
		catch {
			ready = false;
		}
		sendProbe(res, ready, req.method);
	};

	router.head("/healthz", (req, res) => sendProbe(res, true, req.method));
	router.get("/healthz", (req, res) => sendProbe(res, true, req.method));
	router.head("/readyz", readinessHandler);
	router.get("/readyz", readinessHandler);

	return router;
}
