import { Buffer } from "node:buffer";
import { randomUUID } from "node:crypto";
import { z } from "zod";

export interface IReaderUpdate {
	id: string;
	date: Date;
	kind: "new_review" | "evidence_update" | "correction";
	summary: string;
	bottomLineImpact: "new" | "changed" | "unchanged" | "not_assessed";
}

const updateChoice = z
	.object({
		kind: z.enum(["none", "evidence_update", "correction"]),
		bottomLineImpact: z.enum(["changed", "unchanged", "not_assessed"]).optional()
	})
	.strict();

export function planReaderPublication(input: {
	previouslyPublished: boolean;
	kind: unknown;
	bottomLineImpact: unknown;
	summary: string;
	now?: Date;
}): { ok: true; update?: IReaderUpdate } | { ok: false; error: string } {
	const date = input.now ?? new Date();
	if (!input.previouslyPublished) {
		return {
			ok: true,
			update: {
				id: randomUUID(),
				date,
				kind: "new_review",
				bottomLineImpact: "new",
				summary: input.summary
			}
		};
	}
	const choice = updateChoice.safeParse({ kind: input.kind, bottomLineImpact: input.bottomLineImpact });
	if (!choice.success)
		return { ok: false, error: "Choose whether this publication contains a substantive reader update." };
	if (choice.data.kind === "none") return { ok: true };
	if (!choice.data.bottomLineImpact) {
		return { ok: false, error: "State whether the bottom line changed for the reader update." };
	}
	if (!input.summary.trim()) return { ok: false, error: "A public summary is required for a reader update." };
	return {
		ok: true,
		update: {
			id: randomUUID(),
			date,
			kind: choice.data.kind,
			bottomLineImpact: choice.data.bottomLineImpact,
			summary: input.summary
		}
	};
}

const cursorShape = z
	.object({
		before: z.iso.datetime(),
		id: z.uuid(),
		asOf: z.iso.datetime()
	})
	.strict();

export function decodeReaderUpdateCursor(value: string, now: Date) {
	if (value.length > 400 || !/^[\w-]+$/.test(value)) throw new Error("Invalid cursor");
	const cursor = cursorShape.parse(JSON.parse(Buffer.from(value, "base64url").toString("utf8")));
	if (new Date(cursor.asOf) > now || new Date(cursor.before) > new Date(cursor.asOf))
		throw new Error("Invalid cursor");
	return cursor;
}

export function encodeReaderUpdateCursor(before: Date, id: string, asOf: Date) {
	return Buffer.from(JSON.stringify({ before: before.toISOString(), id, asOf: asOf.toISOString() })).toString(
		"base64url"
	);
}
