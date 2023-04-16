module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      xl: { max: "1279px" },
      lg: { max: "1023px" },
      md: { max: "767px" },
      sm: { max: "639px" }
    },

  },
  plugins: [
    require("@tailwindcss/typography")({
      modifiers: ["light", "sm", "md", "lg"]
    }),
    require("daisyui")
  ]
};
