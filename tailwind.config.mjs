import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
          light: '#eff6ff',
          dark: '#1e40af'
        },
        brand: {
          slate: '#0f172a',
          surface: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          text: '#1e293b',
          muted: '#64748b'
        }
      },
      maxWidth: {
        'content': '1200px',
        'reading': '820px'
      }
    },
  },
  plugins: [
    typography
  ],
};
