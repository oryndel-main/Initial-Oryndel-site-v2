import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        black: "#050505",
        charcoal: "#0d0d0f",
        graphite: "#18181b",
        line: "#2a2a2e",
        bone: "#f5f3ef",
        dim: "#9a978f",
        bronze: {
          DEFAULT: "#c9a06a",
          light: "#e8cfa0",
          deep: "#8a6a3f",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "-apple-system", "sans-serif"],
        body: ["var(--font-body)", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "bronze-gradient": "linear-gradient(135deg, #e8cfa0 0%, #c9a06a 45%, #8a6a3f 100%)",
        "radial-glow": "radial-gradient(circle at 50% 0%, rgba(201,160,106,0.14), transparent 60%)",
      },
      keyframes: {
        ticker: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
      },
      animation: {
        ticker: "ticker 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
