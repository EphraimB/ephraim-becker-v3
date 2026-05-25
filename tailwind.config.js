/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.css",
  ],
  theme: {
    extend: {
      colors: {
        mars: {
          rust: '#e05624',
          dark: '#060810',
        }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        tech: ['var(--font-tech)', 'monospace'],
      },
      animation: {
        'radar-sweep': 'radar-spin 5s linear infinite',
        'fade-in-up': 'fade-up 0.4s cubic-bezier(0.25, 0.8, 0.25, 1) forwards',
      },
      keyframes: {
        'radar-spin': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'fade-up': {
          from: { opacity: 0, transform: 'translateY(8px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
