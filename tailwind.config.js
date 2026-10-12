/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Archivo Variable"', 'Archivo', 'system-ui', 'sans-serif'],
      },
      colors: {
        ground: 'var(--ground)',
        ink: 'var(--ink)',
        muted: 'var(--muted)',
        rule: 'var(--rule)',
        field: 'var(--field)',
        'on-field': 'var(--on-field)',
        'on-field-muted': 'var(--on-field-muted)',
      },
      maxWidth: {
        measure: '68ch',
      },
    },
  },
  plugins: [],
};
