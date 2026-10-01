/**
 * @file tailwind-landing.js
 * @description Configuración de Tailwind CSS exclusiva para la Landing Page de INDIIN.
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        champagne: "#F4EBD9",
        gold: {
          light: "#E8CA65",
          DEFAULT: "#D4AF37",
          dark: "#997B1E",
        },
        dark: {
          950: "#080808",
          900: "#111111",
          800: "#1A1A1A",
          700: "#262626",
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        serif: ['"Cormorant Garamond"', "serif"],
      },
      boxShadow: {
        "gold-glow": "0 0 35px -5px rgba(212, 175, 55, 0.25)",
        "gold-glow-lg": "0 0 50px -10px rgba(212, 175, 55, 0.3)",
      },
    },
  },
};
