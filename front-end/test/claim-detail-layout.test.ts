import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const testDir = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(testDir, "..", "src/pages/consensus/[topicSlug]/[claimSlug].vue"), "utf8");

describe("claim detail layout", () => {
	it("keeps the source stack scannable without hiding the top evidence tier", () => {
		assert.match(source, /<details\s+v-for="group in sourceGroups"[\s\S]*:open="group\.key === 'tier1'"/);
		assert.match(source, /class="source-group__summary"/);
		assert.match(source, /formatCountLabel\(group\.items\.length, "source"\)/);
		assert.match(source, /class="source-list"[\s\S]*<article v-for="source in group\.items"/);
		assert.doesNotMatch(source, /<section v-for="group in sourceGroups"/);
	});

	it("keeps the uncertainty summary at a readable measure", () => {
		assert.match(source, /\.uncertainty-strip > div > p:not\(\.eyebrow\):not\(\.field-label\) \{/);
		assert.match(source, /max-width: 68ch;/);
	});

	it("keeps the mobile claim answer visible without hiding trust cues", () => {
		assert.match(source, /@media \(max-width: 860px\) \{[\s\S]*\.claim-page \{[\s\S]*gap: 14px;/);
		assert.match(
			source,
			/\.claim-page__header,[\s\S]*\.bottom-line,[\s\S]*\.uncertainty-strip,[\s\S]*\.content-panel,[\s\S]*\.queue-note \{[\s\S]*padding: 14px;/
		);
		assert.match(source, /\.claim-page__hero \{[\s\S]*gap: 7px;/);
		assert.match(source, /\.claim-page__header h1 \{[\s\S]*font-size: clamp\(1\.72rem, 7\.2vw, 2\.05rem\);/);
		assert.match(source, /\.bottom-line \.bottom-line__text \{[\s\S]*font-size: 1\.02rem;/);
		assert.match(
			source,
			/@media \(max-width: 560px\) \{[\s\S]*\.bottom-line__actions \{[\s\S]*display: flex;[\s\S]*flex-wrap: wrap;/
		);
		assert.match(source, /\.bottom-line__actions \.button \{[\s\S]*flex: 1 1 140px;/);
		assert.match(source, /formatCountLabel\(sourceCount\.value, "source"\)/);
		assert.match(source, /`Reviewed \$\{formatDate\(claim\.value\?\.lastReviewedAt, "Pending"\)\}`/);
	});

	it("splits long bottom-line copy into a lead answer and supporting context", () => {
		assert.match(source, /const bottomLineParts = computed/);
		assert.ok(source.includes("const sentenceEnd = text.match(/[.!?](?:\\s|$)/);"));
		assert.match(source, /class="bottom-line__text bottom-line__text--lead"/);
		assert.match(source, /v-if="bottomLineParts\.context" class="bottom-line__context"/);
		assert.match(source, /\.bottom-line__text--lead \{[\s\S]*font-weight: 700;/);
		assert.match(source, /\.bottom-line__context \{[\s\S]*color: var\(--consensus-muted\);/);
	});
});

describe("breadcrumbs layout", () => {
	const breadcrumbsSource = readFileSync(join(testDir, "..", "src/components/PageBreadcrumbs.vue"), "utf8");

	it("keeps long current-page labels from widening mobile breadcrumbs", () => {
		assert.match(breadcrumbsSource, /:title="item\.label"/);
		assert.match(breadcrumbsSource, /\.breadcrumbs__current \{[\s\S]*text-overflow: ellipsis;/);
		assert.match(
			breadcrumbsSource,
			/@media \(max-width: 560px\) \{[\s\S]*\.breadcrumbs__item--current \{[\s\S]*position: absolute;/
		);
		assert.match(
			breadcrumbsSource,
			/\.breadcrumbs li:nth-last-child\(2\) \.breadcrumbs__divider \{[\s\S]*display: none;/
		);
	});
});
