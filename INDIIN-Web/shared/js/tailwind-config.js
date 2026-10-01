/**
 * @file tailwind.config.js
 * @description Paleta de colores universal para todas las invitaciones INDIIN.
 */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Paleta Bodas
        wedding: {
          bg: "#F6F4EE",
          card: "#FFFFFF",
          surface: "#FDFCF9",
          text: "#201D1A",
          muted: "#5C544B",
          border: "#E3DCD0",
        },
        // Paleta Graduaciones / Galas
        champagne: "#F4EBD9",
        ticket: "#151515",
        // Paleta XV Años
        xvbg: "#FDF7F2",
        roseGold: { light: "#F8D1C5", DEFAULT: "#E5A593", dark: "#B87261" },
        // Dorados Universales
        gold: { light: "#E2C785", DEFAULT: "#D4AF37", dark: "#997B1E" },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        serif: ['"Cormorant Garamond"', "serif"],
      },
      boxShadow: {
        "wedding-soft": "0 10px 35px -5px rgba(184, 147, 74, 0.15)",
        "gold-glow": "0 0 35px -5px rgba(212, 175, 55, 0.28)",
        "rose-glow": "0 0 35px -5px rgba(229, 165, 147, 0.35)",
        "card-soft": "0 6px 24px -2px rgba(0, 0, 0, 0.4)",
      },
    },
  },
};
