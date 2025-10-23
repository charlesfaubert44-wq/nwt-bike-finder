import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Aurora-inspired color palette (True North Trips brand)
        aurora: {
          50: '#e6fff5',
          100: '#b3ffe0',
          200: '#80ffcc',
          300: '#4dffb8',
          400: '#1affa3',
          500: '#00e68a',
          600: '#00b36b',
          700: '#00804d',
          800: '#004d2e',
          900: '#001a0f',
          green: '#00ff88',   // CTAs, energy, success
          blue: '#4d94ff',    // Trust, secondary actions
          purple: '#a366ff',  // Culture, premium
          pink: '#ff66cc',    // Accents, warmth
        },
        northern: {
          sky: '#87ceeb',
          ice: '#e0f2ff',      // Ice White - light backgrounds
          midnight: '#0a1128', // Northern Midnight - backgrounds
          snow: '#f0f9ff',     // Ice White variant
          forest: '#1a3d2e',
        },
        // Territory-specific accent colors (for future expansion)
        territory: {
          yukon: '#fbbf24',    // Yukon Gold
          nunavut: '#1e3a8a',  // Nunavut Navy
          nwt: '#059669',      // NWT Forest
        },
        dark: {
          900: '#0a0e1a',
          800: '#151b2e',
          700: '#1f2937',
        },
        slate: {
          DEFAULT: '#64748b', // Slate Gray - body text
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'aurora-gradient': 'linear-gradient(135deg, #00ff88 0%, #4d94ff 50%, #a366ff 100%)',
        'night-sky': 'linear-gradient(to bottom, #0a1128 0%, #1a2844 100%)',
        'winter-gradient': 'linear-gradient(to bottom, #e0f2ff 0%, #ffffff 100%)',
      },
      boxShadow: {
        'aurora': '0 0 30px rgba(0, 255, 136, 0.3)',
        'glow': '0 0 20px rgba(77, 148, 255, 0.4)',
      },
    },
  },
  plugins: [],
};

export default config;
