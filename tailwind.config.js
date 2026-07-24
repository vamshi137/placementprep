/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Base surfaces — night-bus navy in dark mode, soft paper in light mode
        base: {
          DEFAULT: '#F7F8FC',
          dark: '#0F1420'
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#171F2E',
          raised: '#EEF1F8',
          'raised-dark': '#1F2A3D'
        },
        ink: {
          DEFAULT: '#1B2233',
          dark: '#E7ECF5',
          muted: '#6B7488',
          'muted-dark': '#8B95AA'
        },
        // Route/journey accent — headlight amber, the app's signature color
        route: {
          50: '#FFF6E8',
          100: '#FFE9C2',
          300: '#FFCB70',
          500: '#FFB454',
          600: '#F59B2D',
          700: '#C97A1B'
        },
        // Correct / fresh-mint teal, like a route line on a map
        transit: {
          100: '#D3FBF3',
          300: '#8FF0DE',
          500: '#5EEAD4',
          600: '#2DBFA8',
          700: '#1B8F7E'
        },
        // Weak areas / incorrect — soft coral, never alarmist
        alert: {
          100: '#FFE3E1',
          300: '#FCA5A0',
          500: '#FB6F6F',
          600: '#E4514F'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      borderRadius: {
        xl2: '1.25rem'
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 20, 32, 0.04), 0 8px 24px -8px rgba(15, 20, 32, 0.10)',
        'card-dark': '0 1px 2px rgba(0,0,0,0.2), 0 8px 24px -8px rgba(0,0,0,0.5)'
      },
      backgroundImage: {
        'dotted-route': 'radial-gradient(circle, currentColor 1.5px, transparent 1.5px)'
      }
    }
  },
  plugins: []
}
