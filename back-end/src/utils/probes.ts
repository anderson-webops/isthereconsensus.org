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
	let cachedReadiness: { ready: boolean; expiresAt: number } | undefined;
	let pendingReadiness: Promise<boolean> | undefined;
	const getReadiness = (): Promise<boolean> => {
		if (cachedReadiness && Date.now() < cachedReadiness.expiresAt) {
			return Promise.resolve(cachedReadiness.ready);
		}
		if (!pendingReadiness) {
			pendingReadiness = Promise.resolve()
				.then(checkReadiness)
				.then(ready => ready, () => false)
				.then((ready) => {
					cachedReadiness = { ready, expiresAt: Date.now() + 1_000 };
					return ready;
				})
				.finally(() => {
					pendingReadiness = undefined;
				});
		}
		return pendingReadiness;
	};
	const readinessHandler = async (req: Request, res: Response) => {
		const ready = await getReadiness();
		sendProbe(res, ready, req.method);
	};

	router.head("/healthz", (req, res) => sendProbe(res, true, req.method));
	router.get("/healthz", (req, res) => sendProbe(res, true, req.method));
	router.head("/readyz", readinessHandler);
	router.get("/readyz", readinessHandler);

	return router;
}
