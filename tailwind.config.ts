import type { Config } from 'tailwindcss'

export default {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1c6187',
        secundary: '#1fb6ff',
        bgdark: '#1a1a1e',
        bgdarksecundary: '#1a1a1e',
        textdark: '#EEEEEE',
        bglight: '#F4F4F5',
        bglightsecundary: '#E4E4E7',
        textlight: '#262626',
      },
      fontFamily: {
        Roboto: ['var(--font-roboto)'],
      },
    },
  },
  plugins: [],
} satisfies Config
