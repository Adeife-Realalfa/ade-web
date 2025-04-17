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
          whisper:   '#e2d9e5',  // a soft off-white
          silver:    '#aba1ab',  // mid-tone gray
          steel:     '#786b80',  // darker gray for text
          graphite:  '#4c3751',  // very dark gray
          night:     '#200c1a',  // near-black, high contrast

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
      gridTemplateColumns: {
        // Define a 20 column grid: each column will be 1 fraction of the available space
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      screens: {
        'xs': '320px',   // iPhone SE and up
        'xsm': '390px',  // iPhone 14 and up
        'sm': '640px',   // tailwind’s default
        // …
      },
    },
  },
  plugins: [],
}
