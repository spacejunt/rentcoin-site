/**
 * Tailwind CSS Configuration for the $RENT project website.
 *
 * This file tells Tailwind what files to scan for class names
 * and sets up a minimal theme. You can extend the theme later to
 * include custom colors (e.g. landlord gold, SOL purple, eviction red).
 */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Custom palette for the $RENT brand
        landlordGold: '#F1C40F',
        solPurple: '#9945FF',
        evictionRed: '#E74C3C',
      },
    },
  },
  plugins: [],
};