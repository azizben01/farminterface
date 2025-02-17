import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "Form-color": "#161616",
        "dashboard-color": "#B58863",
        "custom-hover": "#373B4D",
        "custom-bg": "#676f9d",
        "custom-green": "#0D5B11",
        "custom-yellow": "#FFDA03",
        "custom-red": "#E70000",
        "custom-button": "#2E4E3A",
        "custom-beige": "#F5F5DC",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [],
} satisfies Config;
