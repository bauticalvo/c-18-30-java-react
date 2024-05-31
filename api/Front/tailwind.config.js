/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'xxl': '1600px',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        sans2: ['DM Sans', 'sans-serif'],
      },
      colors: {
        'custom-blue': 'rgba(64, 123, 255, 0.06)',
        'custom-gray': 'rgba(217, 217, 217, 0.17)',
        'border-gray-custom': 'rgba(223, 223, 223, 0.5)',
        'black-60': 'rgba(0, 0, 0, 0.6)',
      },
      boxShadow: {
        'custom-shadow': '4px 5px 5.2px 0px #00000014',
        'custom-shadow-strong': '8px 8px 13.9px 0px #00000014',
        'register-field': '0px 2px 3.8px 0px #0000001C',
      }
    },
  },
  plugins: [],
}