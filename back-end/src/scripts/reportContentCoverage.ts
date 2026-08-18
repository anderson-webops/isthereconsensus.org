import process from "node:process";
import { defaultClaims } from "../data/claims.js";
import {
	CONTENT_COVERAGE_TARGET,
	summarizeContentCoverage
} from "../data/contentCoverage.js";
import { defaultTopics } from "../data/topics.js";

const report = summarizeContentCoverage(defaultClaims, defaultTopics);
const wantsJson = process.argv.includes("--json");
const requiresTarget = process.argv.includes("--require-target");

if (wantsJson) {
	console.log(JSON.stringify({ target: CONTENT_COVERAGE_TARGET, ...report }, null, 2));
}
else {
	console.log(
		`Evidence encyclopedia: ${report.reviewedClaimCount}/${CONTENT_COVERAGE_TARGET.minimumReviewedClaims} reviewed claims across ${report.activeTopicCount}/${CONTENT_COVERAGE_TARGET.minimumActiveTopics} active topics.`
	);
	console.log(
		`Remaining target gap: ${report.claimGap} claims and ${report.activeTopicGap} active topics.`
	);
	for (const topic of report.topics) {
		console.log(`${String(topic.reviewedClaimCount).padStart(3)}  ${topic.title} (${topic.slug})`);
	}
	if (report.unlistedTopicSlugs.length > 0) {
		console.error(`Claims reference undefined topics: ${report.unlistedTopicSlugs.join(", ")}`);
	}
}

if (requiresTarget && !report.targetReached) {
	process.exitCode = 1;
}
