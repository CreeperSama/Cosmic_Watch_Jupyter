/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Space Backgrounds
        space: {
          950: '#020408', // Main background (almost black)
          900: '#050A14',
          800: '#0B1221',
          700: '#151E32',
          accent: '#38BDF8', // Light blue text accent
        },
        // Semantic Colors for UI
        primary: '#0A84FF', // iOS Blue
        danger: '#FF453A',  // iOS Red
        success: '#30D158', // iOS Green
        warning: '#FFD60A', // iOS Yellow
        
        // Text Colors
        text: {
          main: '#FFFFFF',
          muted: '#94A3B8',
        }
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'], // For headers
        sans: ['Inter', 'sans-serif'],       // For body text
      },
      backgroundImage: {
        'surface-glass': 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.03) 100%)',
      }
    },
  },
  plugins: [],
}