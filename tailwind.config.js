const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
 

/** @type {import('tailwindcss').Config} */
module.exports = {
  
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        violet: {
          100: "#A5B4FB",
          200: "#A8A6FF",
          300: "#918efa",
          400: "#807dfa",
        },
        pink: {
          200: "#FFA6F6",
          300: "#fa8cef",
          400: "#fa7fee",
        },
        red: {
          200: "#FF9F9F",
          300: "#fa7a7a",
          400: "#f76363",
        },
        orange: {
          200: "#FFC29F",
          300: "#FF965B",
          400: "#fa8543",
        },
        yellow: {
          200: "#FFF59F",
          300: "#FFF066",
          400: "#FFE500",
        },
        lime: {
          100: "#c6fab4",
          200: "#B8FF9F",
          300: "#9dfc7c",
          400: "#7df752",
        },
        cyan: {
          200: "#A6FAFF",
          300: "#79F7FF",
          400: "#53f2fc",
        },
      },
      backgroundImage: (theme) => ({
        desktop: "url('/assets/neo-brutalism-image1.webp')",
        mobile: "url('/assets/neo-brutalism-image1-mobile.webp')",
      }),
    },
  },
  plugins: [
    addVariablesForColors,
    function ({ addUtilities }) {
      const newUtilities = {
        ".bg-desktop": {
          "background-image": "url('/src/assets/neo-brutalism-image1.webp')",
        },
        ".bg-mobile": {
          "background-image":
            "url('/src/assets/neo-brutalism-image1-mobile.webp')",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}