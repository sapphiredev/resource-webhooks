import daisyui from 'daisyui';
import daisyuiThemes from 'daisyui/src/theming/themes.js';
import type { Config } from 'tailwindcss';

export default {
	plugins: [daisyui],
	darkMode: ['class', '[data-theme="dark"]'],
	content: ['node_modules/tailvue/dist/tailvue.es.js'],
	daisyui: {
		themes: [
			{
				dark: {
					...daisyuiThemes.dark,
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
					...daisyuiThemes.light,
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
} satisfies Partial<Config>;
