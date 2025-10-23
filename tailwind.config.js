export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunrice: {
          yellow: "#FFD878",
          cream: "#F8F1E5",
          brown: "#6F4E37",
          green: "#A8D5BA",
        },
        moonrice: {
          silver: "#C0C6D9",   // bluish silver-grey for the moon
          night: "#0F172A",    // deep navy/charcoal background
          brown: "#4B3621",    // darker cup brown for contrast
          teal: "#1E3A3A",     // muted teal accent
        }
      },
    },
  },
  plugins: [],
}