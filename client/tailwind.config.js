/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Nouvelle palette rose élégante
        primary: '#4A3B37',      // Texte principal / Titre / Boutons foncés
        secondary: '#CFA5A0',    // Accent premium - Rose gold métallique
        angel: {
          background: '#F8E6E0', // Background principal - Rose poudré
          card: '#FAF9F7',       // Sections / cartes / blocs - Blanc cassé
          border: '#D8C4C0',     // Texte secondaire / bordures - Gris rosé
          gold: '#CFA5A0',       // Rose gold métallique
          dark: '#4A3B37',       // Texte principal
          light: '#FAF9F7',      // Blanc cassé
          pink: '#F8E6E0'        // Rose poudré
        }
      },
      fontFamily: {
        'angel': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif']
      },
      backgroundImage: {
        'gradient-angel': 'linear-gradient(135deg, #CFA5A0 0%, #755C55 100%)',
      }
    },
  },
  plugins: [],
}