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
            50:  '#fff8f0',
            100: '#feeddb',
            200: '#fdd3b6',
            300: '#fbb387',
            400: '#f88c52',
            500: '#f56221',
            600: '#e64714',
            700: '#bf3310',
            800: '#982914',
            900: '#7b2414',
            950: '#3d0f06',
          },
          gold: {
            50:  '#fdfbe8',
            100: '#faf5c5',
            200: '#f6ea8e',
            300: '#f0d94f',
            400: '#eabf1f',
            500: '#d4a211',
            600: '#b7800c',
            700: '#925c0d',
            800: '#794812',
            900: '#673c14',
            950: '#3a1f06',
          },
          maroon: {
            50:  '#fdf2f2',
            100: '#fae3e3',
            200: '#f6cbcb',
            300: '#efa8a8',
            400: '#e37777',
            500: '#d24d4d',
            600: '#ba3636',
            700: '#9c2a2a',
            800: '#751a1a',
            900: '#5c1414',
            950: '#300808',
          },
          // Surface palette — warm ivory base
          cream:     '#FAF7F2',
          sand:      '#F3EDE2',
          parchment: '#EBE3D5',
          linen:     '#F6F1E9',
          // Dark surface palette
          charcoal:   '#1C1917',
          night:      '#0C0A09',
          nightCard:  '#181512',
          nightBorder:'#2C2620',
          celestial:  '#100e17',
        }
      },
      fontFamily: {
        sans:        ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif:       ['Cinzel', 'Merriweather', 'Georgia', 'serif'],
        display:     ['Cinzel', 'serif'],
        devanagari:  ['Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        // Flat, warm shadows — no glows
        'card-sm':  '0 1px 4px 0 rgba(28,25,23,0.06), 0 1px 2px -1px rgba(28,25,23,0.04)',
        'card-md':  '0 4px 16px -2px rgba(28,25,23,0.08), 0 2px 6px -2px rgba(28,25,23,0.04)',
        'card-lg':  '0 8px 32px -4px rgba(28,25,23,0.10), 0 4px 8px -2px rgba(28,25,23,0.05)',
        // Legacy compat — kept but not recommended
        'soft-warm':   '0 4px 20px -2px rgba(230, 81, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'glow-saffron': '0 0 0 rgba(0,0,0,0)',
        'glow-gold':    '0 0 0 rgba(0,0,0,0)',
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        DEFAULT: '8px',
        'md': '10px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
}
