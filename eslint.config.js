// ./eslint.config.js -- monorepo root
import antfu from "@antfu/eslint-config";
import { preserveApprovedScientificProse } from "./scripts/lib/approved-data-prose.mjs";

export default antfu(
	{
		root: true,
		env: { browser: true, node: true, es2021: true },
		unocss: true,
		antislop: true,
		stylistic: {
			indent: "tab",
			quotes: "double",
			semi: true,
			linebreak: "unix"
		},
		formatters: {
			css: true,
			html: true,
			prettierOptions: {
				tabWidth: 4,
				useTabs: true,
				trailingComma: "none",
				printWidth: 120,
				endOfLine: "lf"
			}
		},
		ignores: ["**/*.d.ts"],
		rules: {
			"no-console": "off",
			"antfu/if-newline": "off",
			"style/comma-dangle": "off"
		}
	},
	{
		files: [
			"scripts/content-first-smoke.mjs",
			"scripts/public-search-worker-smoke.mjs",
			"scripts/editorial-audit-smoke.mjs",
			"scripts/editorial-completion-smoke.mjs"
		],
		rules: {
			"antfu/no-import-dist": "off"
		}
	},
	{
		files: ["README.md", "README.zh-CN.md"],
		rules: {
			"markdown/heading-increment": "off"
		}
	}
).override("antfu/antislop/setup", (config) => {
	const slop = config.plugins.slop;
	return {
		...config,
		plugins: {
			...config.plugins,
			slop: {
				...slop,
				rules: {
					...slop.rules,
					"no-em-dash": preserveApprovedScientificProse(slop.rules["no-em-dash"])
				}
			}
		}
	};
});
