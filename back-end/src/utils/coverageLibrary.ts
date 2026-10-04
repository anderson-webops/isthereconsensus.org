import type { publicCoverageRequest } from "./coverageRoadmap.js";
import { compareUpdatePosition } from "../data/comparisons/updates.js";

export function replacementCoverageRequests(incoming: string[] | undefined, current: string[] = []) {
	return incoming ?? current;
}

export function selectedCoverageUpdates(requests: ReturnType<typeof publicCoverageRequest>[], asOf: Date, windowStart: Date, cursor?: { before: string; id: string }) {
	const before = cursor && { date: new Date(cursor.before), id: cursor.id };
	return requests.flatMap(coverageRequest => coverageRequest.history
		.filter(event => event.status !== "published" || coverageRequest.answer !== null)
		.map(event => ({
			coverageRequest,
			update: { id: event.id, date: event.date, kind: event.status === "published" ? "requested_answer" as const : "coverage_progress" as const, summary: event.summary, bottomLineImpact: "not_assessed" as const }
		})))
		.filter(row => row.update.date >= windowStart && row.update.date <= asOf && (!before || compareUpdatePosition(row.update, before) > 0))
		.sort((first, second) => compareUpdatePosition(first.update, second.update));
}
