import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				admin: '#00b14f',
				primary: '#54151C',
				secondary: '#121212',
				third: '#dedede',
				'text-nav': '#a6a6a6',
				'border-custom': '#ffffff1a',
			},

			backgroundImage: {
				'custom-gradient': 'linear-gradient(269.85deg, #54151C 0%, #121212 54.89%)',
			},

			//animation
			//ripple write
			// animation
			keyframes: {
				ripple: {
				  '0%': {
					transform: 'scale(1)',
					opacity: '1',
				  },
				  '100%': {
					transform: 'scale(3)',
					opacity: '0',
				  },
				},
				fadeIn: {
				  '0%': { opacity: '0' },
				  '100%': { opacity: '1' },
				},
				fadeInCollapse: {
				  '0%': { maxHeight: '0' },
				  '100%': { maxHeight: '7700px' },  
				},

				fadeOutCollapse: {
					'0%': {  maxHeight: '7700px' },
					'100%': {  maxHeight: '0' },
				  },
			  },
			  animation: {
				ripple: 'ripple 1.5s infinite',
				fadeIn: 'fadeIn 1s ease-in-out',
				fadeInCollapse: 'fadeInCollapse 1s ease-in-out',  
				fadeOutCollapse: 'fadeOutCollapse 2s ease-in-out',
			  },
		},
	},
	plugins: [],
};
export default config;
