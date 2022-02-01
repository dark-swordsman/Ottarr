const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      maxWidth: {
        "sidebar": "15rem",
      },
      colors: {
        "primary": colors.sky,
        "sky": {
          "925": "#043958",
          "975": "#02273D"
        }
      }
    },
  },
  plugins: [],
}
