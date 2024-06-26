import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
	plugins: [require('daisyui')],
	content: ['node_modules/tailvue/dist/tailvue.es.js'],
	darkMode: ['class', '[data-theme="dark"]'],
	daisyui: {
		themes: [
			{
				dark: {
					...require('daisyui/src/theming/themes')['dark'],
					primary: '#0F52BA',
					secondary: '#57B8FF',
					accent: '#F4D58D',
					'accent-content': '#000000',
					info: '#2599B9',
					success: '#84E296',
					warning: '#FBBD23',
					error: '#ED474A'
				}
			},
			{
				light: {
					...require('daisyui/src/theming/themes')['light'],
					primary: '#0F52BA',
					secondary: '#57B8FF',
					accent: '#F4D58D',
					info: '#2599B9',
					success: '#84E296',
					warning: '#FBBD23',
					error: '#ED474A'
				}
			}
		]
	}
};
