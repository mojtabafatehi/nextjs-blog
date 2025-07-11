import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        // ❌ این خط رو کلاً حذف کن یا اصلاً ننویس:
        // "2xl": "1536px",
      },
    },
    extend: {
      fontFamily: {
        vazir: ["Vazir", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
