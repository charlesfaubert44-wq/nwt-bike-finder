/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D5F5D',      // Deep Aurora Green
        secondary: '#4A90A4',    // Arctic Blue
        accent: '#E8B44F',       // Aurora Gold
        danger: '#C84630',       // Tundra Red
        success: '#3D7C47',      // Pine Green
        'snow-white': '#F8F9FA', // Snow White
        'slate-gray': '#2C3E50', // Slate Gray
        'frost-gray': '#E5E9EC', // Frost Gray
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
