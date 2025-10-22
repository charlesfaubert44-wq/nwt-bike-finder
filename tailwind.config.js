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
        primary: {
          DEFAULT: '#2D5F5D',
          light: '#3D7F7D',
          dark: '#1D4F4D',
        },
        secondary: {
          DEFAULT: '#4A90A4',
          light: '#6AB0C4',
          dark: '#2A7084',
        },
        accent: {
          DEFAULT: '#E8B44F',
          light: '#F8C46F',
          dark: '#D8A43F',
        },
        danger: {
          DEFAULT: '#C84630',
          light: '#E86650',
          dark: '#A83620',
        },
        success: {
          DEFAULT: '#3D7C47',
          light: '#5D9C67',
          dark: '#2D6C37',
        },
        'snow-white': '#F8F9FA',
        'slate-gray': {
          DEFAULT: '#2C3E50',
          light: '#4C5E70',
          dark: '#1C2E40',
        },
        'frost-gray': '#E5E9EC',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        border: '#E5E9EC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'Consolas', 'Monaco', 'monospace'],
      },
      borderRadius: {
        'lg': '12px',
        'md': '8px',
        'sm': '4px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'nwt': '0 8px 16px rgba(45, 95, 93, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
