/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",             // ✅ Root app file
    "./screens/**/*.{js,jsx,ts,tsx}",     // ✅ Screens folder
    "./components/**/*.{js,jsx,ts,tsx}",  // ✅ Components folder
  ],
  theme: {
    extend: {}, // ✅ Optional customizations
  },
  plugins: [], // ✅ No web-only plugins
};
