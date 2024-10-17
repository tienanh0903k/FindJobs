import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#54151C',
        secondary: '#121212',
        third: '#dedede',
        'text-nav': '#a6a6a6;',
        'border-custom': '#ffffff1a',
      },

      backgroundImage: {
       'custom-gradient': 'linear-gradient(269.85deg, #54151C 0%, #121212 54.89%)',
      },
    },
  },
  plugins: [],
};
export default config;
