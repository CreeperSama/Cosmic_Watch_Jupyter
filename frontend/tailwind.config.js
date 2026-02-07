/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
      }
    },
  },
  plugins: [],
}