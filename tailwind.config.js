/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        baza: {
          navy: '#082F49',
          green: {
            DEFAULT: '#10B981',
            dark: '#047857',
            light: '#D1FAE5',
          },
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          text: {
            primary: '#0F172A',
            secondary: '#64748B',
          },
          border: '#E2E8F0',
          error: '#DC2626',
          warning: '#D97706',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        baza: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        'baza-lg': '0 10px 15px -3px rgba(8, 47, 73, 0.08), 0 4px 6px -4px rgba(8, 47, 73, 0.04)',
      },
      borderRadius: {
        baza: '0.75rem',
      },
    },
  },
  plugins: [],
};
