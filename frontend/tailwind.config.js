/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
<<<<<<< HEAD
        // Google Earth-like palette: Deep darks, crisp whites, subtle borders
        surface: {
          900: '#050505', // Almost black background
          800: '#1A1A1A', // Secondary panels
          glass: 'rgba(20, 20, 20, 0.6)', // Floating panel bg
        },
        // Semantic colors
        primary: '#4285F4', // Google/Tech Blue
        danger: '#EA4335',  // Alert Red
        success: '#34A853', // Safe Green
        text: {
          main: '#E8EAED',  // High contrast white/grey
          muted: '#9AA0A6', // Secondary text
        }
      },
      fontFamily: {
        // "SF Pro" aesthetic: System fonts first, then Inter as fallback
        sans: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"SF Pro Text"', 
          '"Segoe UI"', 
          'Roboto', 
          'Helvetica', 
          'Arial', 
          'sans-serif'
        ],
        display: [
          '-apple-system', 
          'BlinkMacSystemFont', 
          '"SF Pro Display"', 
          'sans-serif'
        ],
      },
      backdropBlur: {
        'xs': '2px',
=======
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
>>>>>>> frontend
      }
    },
  },
  plugins: [],
}