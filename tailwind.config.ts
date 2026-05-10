import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:    '#1a1f5e',
        indigo:  '#3b3fa0',
        violet:  '#6c5ce7',
        lavender:'#a29bfe',
        sky:     '#74b9ff',
        ice:     '#dfe6fd',
      },
      fontFamily: {
        sans:    ['DM Sans', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
export default config
