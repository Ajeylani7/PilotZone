const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      colors: {
        background: "#f9fafb",
        "primary-button": "#1a73e8",
        "secondary-button": "#e8eaed",
        text: "#202124",
        "heading-home": "#3c4043",
        "heading-listing": "#5f6368",
        "heading-form": "#80868b",
        accent: "#4285f4",
        border: "#dadce0",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
