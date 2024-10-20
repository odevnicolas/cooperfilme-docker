/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FDFDFD',
        brand: '#1C3D6C',
        grays: {
          10: '#FAFAFA',
          20: '#F8FAFC',
          30: '#DAE4ED',
          50: '#909090',
          90: '#777777',
          60: '#5A5C70',
          65: '#49657E',
          70: '#707070',
          40: '#333333',
          80: '#1F1F1F',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
