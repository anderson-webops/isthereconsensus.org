import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = fileURLToPath(new URL("../../", import.meta.url));

export const approvedScientificDataSha256 = Object.freeze({
	"back-end/src/data/claim-expansion-2026-07.ts": "3bd409741da69329850a9246cfd0a6f559150b648bac30c34b9f507307f217b1",
	"back-end/src/data/claim-expansion-2026-08-active-debates-final.ts": "5d901e0b6911a69dcb30e81ff6bf0a8b2bf290582df3a89a98d26cfe0e8ded05",
	"back-end/src/data/claim-expansion-2026-08-agriculture.ts": "7b1870c7bd47d68cbecffb53605efbd1286fe73c011c09866400afe12a3be984",
	"back-end/src/data/claim-expansion-2026-08-astronomy.ts": "c4eb320ff4e517797a9772813239fe45cb4ef86d641ce4d8f4547698ef56437e",
	"back-end/src/data/claim-expansion-2026-08-bias-incentives.ts": "df68e51d9e38220333138a159c36561cc4bd3d9e18297ec482d72a29a71a6f25",
	"back-end/src/data/claim-expansion-2026-08-biotechnology.ts": "0cc12d00318e6882e76a8844f8fad34759283f96981af516fb79fbf5ca20c958",
	"back-end/src/data/claim-expansion-2026-08-climate.ts": "ad7c5ad8d046e215a7c2f3377153d811fe6a956bfafaf45307f34413e22496a0",
	"back-end/src/data/claim-expansion-2026-08-consensus-foundations.ts": "6d9bbaea91df31d16520bcacc7e9ff13b7b277460e0162c6a2dc208b1cc4a90a",
	"back-end/src/data/claim-expansion-2026-08-crime-final.ts": "651b7cb2a81bc93a96837c45691240f6368ce085af08ab3c24b67b15eed25dcb",
	"back-end/src/data/claim-expansion-2026-08-ecology.ts": "c56044e09d136f11e39c6de3527e09895d0259c50e4e9a820055c1e041ea34f7",
	"back-end/src/data/claim-expansion-2026-08-education-final.ts": "8499c716de8c3fdd8db972dc2695c72e08c507ba8de072dc49a5fd5f83d639bc",
	"back-end/src/data/claim-expansion-2026-08-education.ts": "b9f2171a719c3543b6df767a475287e2bfef5cf96ba8ee7284c30509d26210bc",
	"back-end/src/data/claim-expansion-2026-08-energy.ts": "88c1d550e96d3322ec87293998fa4cca52ec8a966f47a4d87248201a5ce0bda6",
	"back-end/src/data/claim-expansion-2026-08-evolution-final.ts": "732121ffedc7568da68eacd9368cdd08248a2cc0888f91d52094e56a30f4a398",
	"back-end/src/data/claim-expansion-2026-08-exercise-final.ts": "bb875e0c63a8463c6977d895919e0f7e01fd7996a90284dc6adb80c60342acb9",
	"back-end/src/data/claim-expansion-2026-08-exercise.ts": "ff5478f899e3c802ebded59f00c4811707785b847f9b3f97cd86214489a9a845",
	"back-end/src/data/claim-expansion-2026-08-geoscience.ts": "83952e0ba6dce6c69dd0e55990a790056692cafc666d76579fc6947d2be8a3c0",
	"back-end/src/data/claim-expansion-2026-08-historical-case-studies.ts": "497bb41793b89012da3fc0fa4767d5be45192a82ab7ea432390b427a0435f500",
	"back-end/src/data/claim-expansion-2026-08-media-misinformation.ts": "3fc79172c6b9a544be35b569d9c1fd35cc8f1f0664c2cee51840661f1f9b1ab5",
	"back-end/src/data/claim-expansion-2026-08-nutrition.ts": "be5b1096b8505a837c58bbf468a963f2b55d0710ab3a1eda98208511dac0b0b9",
	"back-end/src/data/claim-expansion-2026-08-oceans.ts": "4acd278cd8b5308d0131ce47c4e64ef3f32e2f2e021076e3f58a7afcc670c0a1",
	"back-end/src/data/claim-expansion-2026-08-physics.ts": "964163631b849dba30b78b64543c2e28763375a943eed08d2ec52136ce27259d",
	"back-end/src/data/claim-expansion-2026-08-policy.ts": "99e097a7cdbd2d1f7230abe794da4ca8e3ca172f318d8b60d73081dc861f01ac",
	"back-end/src/data/claim-expansion-2026-08-public-policy-safety.ts": "35da3437fb36b66ee0106b5c0360a8902a4af4cfad318c765f07c4ebd385315e",
	"back-end/src/data/claim-expansion-2026-08-science-communication.ts": "ea09c5ddec94c8bdbe650ddeabe89e1b3643a2be7354163468177984e295801a",
	"back-end/src/data/claim-expansion-2026-08-sleep-final.ts": "81bae07164767b19c4f7223dca5d1ad44ec79a26a89349b6dda9da2dbdcf1505",
	"back-end/src/data/claim-expansion-2026-08-sleep.ts": "788f06c43659196d020b2a6eab278c7cdd886cfc2f59c4fecc72b6ec3159ea89",
	"back-end/src/data/claims.ts": "1085bfba564eb6054ee7404a35256971023df107ac56ba14b490fca54b67e194"
});

export function preserveApprovedScientificProse(rule) {
	return {
		...rule,
		create(context) {
			const relativePath = path.relative(repositoryRoot, context.filename).split(path.sep).join("/");
			const approvedDigest = approvedScientificDataSha256[relativePath];
			if (approvedDigest && createHash("sha256").update(context.sourceCode.text).digest("hex") === approvedDigest) return {};
			return rule.create(context);
		}
	};
}
