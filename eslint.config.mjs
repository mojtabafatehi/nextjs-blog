import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn", // any → warning
      "@typescript-eslint/no-unused-vars": "warn", // متغیرهای استفاده نشده → warning
      "no-unused-vars": "off", // غیرفعال کردن نسخه JS
    },
  },
];

export default eslintConfig;
