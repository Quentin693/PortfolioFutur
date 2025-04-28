/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        display: ['var(--font-display)'],
      },
      colors: {
        'cyber-black': '#000000',
        'cyber-dark': '#0A0A0A',
        'cyber-surface': '#111111',
        'cyber-blue': {
          100: '#E6F6FF',
          200: '#BAE3FF',
          300: '#7CC4FA',
          400: '#47A3F3',
          500: '#2196F3',
          600: '#0C7CD5',
          700: '#0062B1',
          800: '#004C8C',
          900: '#003A75',
        },
        'cyber-cyan': {
          400: '#00E5FF',
          500: '#00B8D4',
          600: '#0097A7',
        },
        'neon': {
          blue: '#00a2ff',
          cyan: '#00f2ff',
          purple: '#8B5CF6',
        },
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(90deg, var(--grid-lines) 1px, transparent 1px), linear-gradient(var(--grid-lines) 1px, transparent 1px)',
        'cyber-glow': 'radial-gradient(circle at center, rgba(0, 162, 255, 0.15), transparent 70%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'neon-blue': '0 0 5px rgba(0, 162, 255, 0.5), 0 0 20px rgba(0, 162, 255, 0.3)',
        'neon-cyan': '0 0 5px rgba(0, 242, 255, 0.5), 0 0 20px rgba(0, 242, 255, 0.3)',
        'neon-purple': '0 0 5px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)',
        'inner-glow': 'inset 0 0 10px rgba(0, 162, 255, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'blink': 'blink 1s steps(1) infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundSize: {
        'grid-sm': '40px 40px',
        'grid-md': '60px 60px',
        'grid-lg': '100px 100px',
      },
    },
  },
  plugins: [],
}