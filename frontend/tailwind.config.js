import defaultTheme from "tailwindcss/defaultTheme";
import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  darkMode: "class",
  theme: {
    // 📱 Добавляем xs breakpoint для очень маленьких экранов (320-479px)
    screens: {
      'xs': '475px',     // Маленькие телефоны -> обычные телефоны
      'sm': '640px',     // Телефоны -> планшеты (портрет)
      'md': '768px',     // Планшеты (портрет) -> планшеты (альбом)
      'lg': '1024px',    // Планшеты (альбом) -> ноутбуки
      'xl': '1280px',    // Ноутбуки -> мониторы
      '2xl': '1536px',   // Большие мониторы
    },
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Roboto', ...defaultTheme.fontFamily.sans],
        'display': ['Montserrat', 'Inter', ...defaultTheme.fontFamily.sans],
        'mono': ['JetBrains Mono', ...defaultTheme.fontFamily.mono],
      },
      animation: {
        aurora: "aurora 60s linear infinite",
        beam: "beam 3s ease-in-out infinite",
      },
      keyframes: {
        aurora: {
          from: {
            "background-position": "50% 50%, 50% 50%",
          },
          to: {
            "background-position": "350% 50%, 350% 50%",
          },
        },
        beam: {
          "0%": {
            opacity: "0",
            transform: "translateX(-100%)",
          },
          "50%": {
            opacity: "1",
          },
          "100%": {
            opacity: "0",
            transform: "translateX(100%)",
          },
        },
      },
    },
  },
  plugins: [addVariablesForColors],
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
