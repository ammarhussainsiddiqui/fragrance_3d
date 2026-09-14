/** @type {import('tailwindcss').Config} */
// Note: Tailwind v4 reads design tokens from `@theme` in app/globals.css.
// This file is kept in sync for tooling that still reads a v3-style config.
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0e0d0b',
        'ink-soft': '#16140f',
        'ink-line': '#2a2620',
        ivory: '#f4efe6',
        cream: '#e9e2d4',
        taupe: '#a89d8d',
        stone: '#6f6659',
        champagne: '#cdb98e',
        'champagne-deep': '#a8925f',
        charcoal: '#1c1a17',
      },
      fontFamily: {
        sans: ['var(--font-jost)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
