/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          // Neutrals
          alabaster: '#faf9fc',  // very light, good for subtle backgrounds
          whisper:   '#d9dde5',  // a soft off-white
          silver:    '#b6bfc9',  // mid-tone gray
          steel:     '#6b7280',  // darker gray for text
          graphite:  '#374151',  // very dark gray
          night:     '#111827',  // near-black, high contrast

          // Reds
          blush:     '#fda4af',  // softer red/pink for friendly alerts
          fire:      '#d94545',  // bold red for errors or emphasis

          // Yellows
          sun:       '#fde047',  // sunny yellow for highlights
          amber:     '#f59e0b',  // deeper yellow/orange for warnings

          // Greens
          leaf:      '#bbf7d0',  // light mint for success backgrounds
          forest:    '#10b981',  // richer green for strong success messages

          //gradient colours
          pink:       '#f93f9b',
          purple:     '#8d37de',
      },
      fontFamily: {
              sans: ['IBM Plex Sans', 'sans-serif'],
              display: ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
