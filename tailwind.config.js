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
          alabaster: '#ddfaff',  // very light, good for subtle backgrounds
          whisper:   '#bbf3fa',  // a soft off-white
          silver:    '#9eafc4',  // mid-tone gray
          steel:     '#6492a8',  // darker gray for text
          graphite:  '#1f3047',  // very dark gray
          night:     '#011227',  // near-black, high contrast

          // Reds
          blush:     '#fda4af',  // softer red/pink for friendly alerts
          fire:      '#d94545',  // bold red for errors or emphasis

          // Yellows
          sun:       '#f8e78c',  // sunny yellow for highlights
          amber:     '#f59e0b',  // deeper yellow/orange for warnings

          // Greens
          leaf:      '#88ffa6',  // light mint for success backgrounds
          forest:    '#10b981',  // richer green for strong success messages

          //gradient colours
          neonIndigo: '#00fdc8',
          electricBlue: '#00cfff',
          skyGlow: '#bcfdff',
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
