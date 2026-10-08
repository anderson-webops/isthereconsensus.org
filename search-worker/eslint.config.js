import parser from "@typescript-eslint/parser";
import globals from "globals";
import base from "../eslint.config.js";

export default base.append(
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser,
			parserOptions: { project: "./tsconfig.eslint.json", sourceType: "module" },
			globals: { ...globals.node }
		},
		rules: { "new-cap": "off", "test/no-import-node-test": "off" }
	},
	{ files: ["**/*.mjs"], languageOptions: { globals: { ...globals.node } } },
	{ ignores: ["dist/**"] }
);
