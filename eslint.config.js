import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";

export default [
  { ignores: [ "dist/"]},
  {files: ["**/*.{js,mjs,cjs,ts,vue}"]},
  {languageOptions: { globals: 
    {
      ...globals.browser,
      ...globals.node,
      ...globals.amd,
    }
                    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {files: ["**/*.vue"], languageOptions: {parserOptions: {parser: tseslint.parser}}},
];