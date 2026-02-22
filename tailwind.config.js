/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnight': '#0f172a',
        'slate-900-custom': '#0f172a',
        'slate-800-custom': '#1e293b',
        'primary': '#38bdf8',
        'secondary': '#fbbf24',
        'status-approved': '#22c55e',
        'status-pending': '#eab308',
        'status-rejected': '#ef4444'
      },
      boxShadow: {
        'midnight-lg': '0 8px 32px rgba(0,0,0,0.4)'
      },
      backdropBlur: {
        md: '12px',
        lg: '20px'
      }
    },
  },
  plugins: [],
}
