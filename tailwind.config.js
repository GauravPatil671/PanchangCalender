/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        vedic: {
          saffron: {
            50: '#fff8f0',
            100: '#feeddb',
            200: '#fdd3b6',
            300: '#fbb387',
            400: '#f88c52',
            500: '#f56221',
            600: '#e64714',
            700: '#bf3310',
            800: '#982914',
            900: '#7b2414',
          },
          gold: {
            50: '#fdfbe8',
            100: '#faf5c5',
            200: '#f6ea8e',
            300: '#f0d94f',
            400: '#eabf1f',
            500: '#d4a211',
            600: '#b7800c',
            700: '#925c0d',
            800: '#794812',
            900: '#673c14',
          },
          maroon: {
            50: '#fdf2f2',
            100: '#fae3e3',
            200: '#f6cbcb',
            300: '#efa8a8',
            400: '#e37777',
            500: '#d24d4d',
            600: '#ba3636',
            700: '#9c2a2a',
            800: '#751a1a',
            900: '#5c1414',
          },
          cream: '#FAF7F2',
          sand: '#F3EDE2',
          parchment: '#EBE3D5',
          charcoal: '#1C1917',
          night: '#0C0A09',
          nightCard: '#181512',
          celestial: '#100e17',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Cinzel', 'Merriweather', 'serif'],
        devanagari: ['Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        'soft-warm': '0 4px 20px -2px rgba(230, 81, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'glow-saffron': '0 0 15px rgba(245, 98, 33, 0.25)',
        'glow-gold': '0 0 15px rgba(212, 162, 17, 0.3)',
      }
    },
  },
  plugins: [],
}
