import { createHash } from "node:crypto";
import { completeEditorialCopy, editorialCopy } from "../data/claim-editorial-completion.js";
import { claimsBeforeEditorialCompletion } from "../data/claims.js";
import { editorialConcerns, estimatedReadingGrade } from "./editorialAudit.js";

export function editorialCompletionReview(referenceYear: number) {
	if (!Number.isInteger(referenceYear) || referenceYear < 2000 || referenceYear > 2200) throw new Error("Use an explicit reference year.");
	const rows = claimsBeforeEditorialCompletion.map((before) => {
		const after = completeEditorialCopy(before);
		const concerns = editorialConcerns(before, referenceYear);
		const dispositions = Object.fromEntries(concerns.reasons.map((reason) => {
			if (reason === "bundled_question_check") return [reason, "Narrowed the main question; retained separate outcome and safety qualifications."];
			if (reason === "jurisdiction_label_check") return [reason, "Added explicit U.S. jurisdiction to the question."];
			if (reason === "revision_commentary") return [reason, "Replaced the internal revision summary with a factual evidence point; retained change history."];
			if (reason === "absolute_wording_check") {
				return [
					reason,
					after.title !== before.title
						? "Reframed the empirical question without a leading universal claim."
						: "Retained the quantifier where it defines the mathematical proposition, measurement limit or safety claim being tested."
				];
			}
			if (reason === "health_followup_not_scheduled") return [reason, "Added a living-maintenance classification and a source-bound first-follow-up rule for known default schedules; custom dates remain protected. This is not a completed review."];
			if (reason === "health_source_age_check") return [reason, "Verified the cited public guidance date or added the specified contemporary surveillance analysis. No systematic literature search or independent appraisal is claimed."];
			if (reason === "answer_readability_check") {
				return [
					reason,
					editorialCopy[before.slug] ? "Revised the lead into shorter, plainer sentences while retaining the scientific conclusion and important limits." : "Retained the lead after copy screening. Technical definitions, stated assumptions and worked quantities were not removed merely to lower a heuristic score."
				];
			}
			if (reason === "source_coverage_check") return [reason, "Retained the scoped reference set. Citation count alone is not a quality test; no padding with redundant citations."];
			if (reason === "source_years_not_recorded") return [reason, "Retained undated reference metadata rather than invent publication years or use the access date as publication."];
			return [reason, "Retained the dated historical, methodological or foundational references. Age alone does not establish that a conclusion has expired; a new comprehensive search is not claimed."];
		}));
		return {
			key: `${before.topicSlug}/${before.slug}`,
			titleBefore: before.title,
			titleAfter: after.title,
			leadDisposition: editorialCopy[before.slug] ? "revised" : "retained_after_copy_screening",
			baselineSha256: createHash("sha256").update(JSON.stringify(before)).digest("hex"),
			proposedSha256: createHash("sha256").update(JSON.stringify(after)).digest("hex"),
			readingGradeBefore: estimatedReadingGrade(before.bottomLine),
			readingGradeAfter: estimatedReadingGrade(after.bottomLine),
			sourceCountBefore: before.sources.length,
			sourceCountAfter: after.sources.length,
			dispositions
		};
	});
	return {
		schemaVersion: 1,
		referenceYear,
		scope: "Lead-answer and question wording screening, recorded metadata and bibliography candidates in the source-controlled catalog.",
		limitations: "Not an independent expert review, a new systematic evidence search for every article, reader-comprehension certification, private database inventory or publication receipt. Heuristic reading grades remain above ten in some technical material; the pass does not claim otherwise.",
		claims: rows.length,
		leadsRevised: rows.filter(row => row.leadDisposition === "revised").length,
		leadsRetained: rows.filter(row => row.leadDisposition !== "revised").length,
		rows
	};
}
