import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        customBlack: '#181d1e',
        customGray: '#2c2d33',
        customGreen: '#2d3336',
      },
      flex: {
        // "0.35" というカスタム名で登録。
        // 値は "grow shrink basis" の形式で記述する必要があります。
        "0.35": "0.35 0.35 0%"
      }
    },
  },
  plugins: [],
} satisfies Config;
