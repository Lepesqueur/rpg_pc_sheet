/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
        display: ['Orbitron', 'sans-serif', 'Cinzel'],
        body: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        medieval: ['Cinzel', 'serif'],
        blackletter: ['"Pirata One"', 'cursive'],
        classic: ['MedievalSharp', 'cursive'],
      },
      colors: {
        cyber: {
          bg: 'rgb(var(--bg-color) / <alpha-value>)',
          card: 'rgb(var(--card-bg) / <alpha-value>)',
          pink: 'rgb(var(--accent-pink) / <alpha-value>)',
          purple: 'rgb(var(--accent-purple) / <alpha-value>)',
          yellow: 'rgb(var(--accent-yellow) / <alpha-value>)',
          green: 'rgb(var(--accent-green) / <alpha-value>)',
          red: 'rgb(var(--accent-red) / <alpha-value>)',
          cyan: 'rgb(var(--accent-cyan) / <alpha-value>)',
          blue: 'rgb(var(--accent-blue) / <alpha-value>)',
          gray: '#888899',
          dark: '#0d0d10',
          panel: '#16161c',
        },
        accent: {
          pink: 'rgb(var(--accent-pink) / <alpha-value>)',
          purple: 'rgb(var(--accent-purple) / <alpha-value>)',
          yellow: 'rgb(var(--accent-yellow) / <alpha-value>)',
          green: 'rgb(var(--accent-green) / <alpha-value>)',
          red: 'rgb(var(--accent-red) / <alpha-value>)',
          cyan: 'rgb(var(--accent-cyan) / <alpha-value>)',
          blue: 'rgb(var(--accent-blue) / <alpha-value>)',
        },
        rpg: {
          dark: '#0f0f13',
          panel: '#151520',
          border: '#2a2a35',
          pink: '#ff007f',
          purple: '#bd00ff',
          gold: '#ffd700',
          text: '#e0e0e0',
          muted: '#8a8a9b'
        },
        neon: {
          pink: '#d633ff',
          yellow: '#f2ff00',
          green: '#66fcf1',
          purple: '#9d4edd',
        }
      },
      boxShadow: {
        'neon-pink': '0 0 5px rgb(var(--accent-pink)), 0 0 10px rgb(var(--accent-pink))',
        'neon-purple': '0 0 5px rgb(var(--accent-purple)), 0 0 10px rgb(var(--accent-purple))',
        'neon-yellow': '0 0 5px rgb(var(--accent-yellow)), 0 0 10px rgb(var(--accent-yellow))',
        'neon-green': '0 0 5px rgb(var(--accent-green)), 0 0 10px rgb(var(--accent-green))',
        'neon-red': '0 0 5px rgb(var(--accent-red)), 0 0 10px rgb(var(--accent-red))',
        'neon-cyan': '0 0 5px rgb(var(--accent-cyan)), 0 0 10px rgb(var(--accent-cyan))',
        'glow-pink': '0 0 5px rgb(var(--accent-pink)), 0 0 10px rgb(var(--accent-pink)), inset 0 0 2px rgb(var(--accent-pink))',
        'glow-yellow': '0 0 5px rgb(var(--accent-yellow)), 0 0 10px rgb(var(--accent-yellow)), inset 0 0 2px rgb(var(--accent-yellow))',
      },
      backgroundImage: {
        'scanline': 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
        'radial-cyber': 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #0b0b0f 90%)',
      }
    },
  },
  plugins: [],
}
