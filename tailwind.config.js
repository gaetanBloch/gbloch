import tailwind from '@astrojs/tailwind';

/** @type {import("tailwindcss").Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', // or 'media' or 'class'
  integrations: [tailwind({ applyBaseStyles: false })],
  theme: {
    colors: {
      primary: 'var(--primary)',
      'primary-bright': 'var(--primary-bright)',
      'primary-light': 'var(--primary-light)',
      'primary-lighter': 'var(--primary-lighter)',
      'primary-lightest': 'var(--primary-lightest)',
      secondary: 'var(--secondary)',
      'secondary-bright': 'var(--secondary-bright)',
      'secondary-light': 'var(--secondary-light)',
      'secondary-lighter': 'var(--secondary-lighter)',
      'secondary-lightest': 'var(--secondary-lightest)',
      neutral: 'var(--neutral)',
      'neutral-bright': 'var(--neutral-bright)',
      'neutral-light': 'var(--neutral-light)',
      'neutral-lighter': 'var(--neutral-lighter)',
      'neutral-lightest': 'var(--neutral-lightest)',
      background: 'var(--background)',
      'background-dark': 'var(--background-dark)',
      white: 'var(--white)',
      black: 'var(--black)',
      'black-background': 'var(--black-background)',
      'black-background-dark': 'var(--black-background-dark)',
      'backdrop-color': 'var(--backdrop-color)',
      transparent: 'var(--transparent)',
    },
    fontFamily: {
      logo: ['Audiowide', 'cursive'],
      primary: ['Open Sans', 'sans-serif'],
      writing: ['Lobster', 'cursive'],
    },
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '2000px',
      // => @media (min-width: 2000px) { ... }
    },
  },
  plugins: [],
};
