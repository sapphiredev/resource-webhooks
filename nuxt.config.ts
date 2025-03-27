import '@pinia/nuxt';
import '@vite-pwa/nuxt';
import 'nuxt';
import tailwindcss from '@tailwindcss/vite';

const manifestIcons = [
	{
		src: 'https://webhooks.sapphirejs.dev/icons/android-chrome-36x36.png',
		sizes: '36x36',
		type: 'image/png'
	},
	{
		src: 'https://webhooks.sapphirejs.dev/icons/android-chrome-48x48.png',
		sizes: '48x48',
		type: 'image/png'
	},
	{
		src: 'https://webhooks.sapphirejs.dev/icons/android-chrome-72x72.png',
		sizes: '72x72',
		type: 'image/png'
	},
	{
		src: 'https://webhooks.sapphirejs.dev/icons/android-chrome-96x96.png',
		sizes: '96x96',
		type: 'image/png'
	},
	{
		src: 'https://webhooks.sapphirejs.dev/icons/android-chrome-144x144.png',
		sizes: '144x144',
		type: 'image/png'
	},
	{
		src: 'https://webhooks.sapphirejs.dev/icons/android-chrome-192x192.png',
		sizes: '192x192',
		type: 'image/png'
	},
	{
		src: 'https://webhooks.sapphirejs.dev/icons/android-chrome-256x256.png',
		sizes: '256x256',
		type: 'image/png'
	},
	{
		src: 'https://webhooks.sapphirejs.dev/icons/android-chrome-384x384.png',
		sizes: '384x384',
		type: 'image/png'
	},
	{
		src: 'https://webhooks.sapphirejs.dev/icons/android-chrome-512x512.png',
		sizes: '512x512',
		type: 'image/png'
	}
];

export default defineNuxtConfig({
	vue: {
		compilerOptions: {
			isCustomElement: (tag) => tag.startsWith('discord-')
		}
	},
	vite: {
		plugins: [tailwindcss()]
	},
	css: ['~/assets/app.css'],

	modules: [
		'@vueuse/nuxt',
		'@nuxt/eslint',
		'@vite-pwa/nuxt',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@tailvue/nuxt',
		'@vee-validate/nuxt'
	],

	typescript: {
		shim: false
	},

	imports: {
		dirs: ['lib/utils']
	},

	nitro: {
		preset: 'cloudflare-pages'
	},

	veeValidate: {
		componentNames: {
			ErrorMessage: 'VeeErrorMessage'
		}
	},

	pwa: {
		registerType: 'autoUpdate',
		includeManifestIcons: false,
		devOptions: {
			enabled: false,
			type: 'module'
		},
		manifest: {
			background_color: '#131516',
			categories: ['discord', 'bot', 'framework', 'documentation', 'guide', 'sapphire'],
			description: 'A webhooks UI to easily send announcements and messages to a Discord server',
			display: 'minimal-ui',
			lang: 'en',
			name: 'Webhooks Dashboard',
			orientation: 'portrait-primary',
			scope: '/',
			short_name: 'Webhooks',
			start_url: '/',
			theme_color: '#23529B',
			icons: manifestIcons,
			dir: 'ltr',
			shortcuts: [
				{
					name: 'Webhooks Dashboard',
					short_name: 'Webhooks',
					description: 'Go to Webhooks Dashboard',
					url: '/',
					icons: manifestIcons
				}
			],
			screenshots: [
				{
					src: 'https://webhooks.sapphirejs.dev/icons/pwa-richinstall-screenshot-desktop.png',
					sizes: '1280x640',
					type: 'image/png',
					form_factor: 'wide',
					label: 'Sapphire Webhooks Dashboard'
				},
				{
					src: 'https://webhooks.sapphirejs.dev/icons/pwa-richinstall-screenshot-mobile.png',
					sizes: '390x844',
					type: 'image/png',
					form_factor: 'narrow',
					label: 'Sapphire Webhooks Dashboard'
				}
			]
		}
	},

	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1',
			title: 'Webhook Dashboard',
			htmlAttrs: { lang: 'en' },
			link: [
				{ rel: 'alternate', href: 'https://webhooks.sapphirejs.dev' },
				{ rel: 'canonical', href: 'https://webhooks.sapphirejs.dev' },
				{ rel: 'apple-touch-icon', href: '/icons/apple-touch-icon.png' },
				{ rel: 'apple-touch-startup-image', href: '/icons/apple-startup.png' },
				{ rel: 'icon', href: '/icons/android-chrome-192x192.png' },
				{ rel: 'icon', href: '/favicon.ico' },
				{ rel: 'icon', href: '/icons/favicon-16x16.png' },
				{ rel: 'icon', href: '/icons/android-chrome-192x192.png' },
				{ rel: 'icon', href: '/icons/favicon-32x32.png' },
				{ rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg' },
				{ rel: 'shortcut icon', href: '/favicon.ico' }
			],
			meta: [
				{ 'http-equiv': 'Cache-Control', content: '1y' },
				{ 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
				{ 'http-equiv': 'Expires', content: '1y' },
				{ 'http-equiv': 'Page-Enter', content: 'RevealTrans(Duration=2.0,Transition=2)' },
				{ 'http-equiv': 'Page-Exit', content: 'RevealTrans(Duration=3.0,Transition=12)' },
				{ 'http-equiv': 'Pragma', content: '1y' },
				{ name: 'apple-mobile-web-app-capable', content: 'yes' },
				{ name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
				{ name: 'apple-mobile-web-app-title', content: 'Webhook Dashboard' },
				{ name: 'application-name', content: 'Webhook Dashboard' },
				{ name: 'audience', content: 'all' },
				{ name: 'author', content: 'Sapphire Community, contact@sapphirejs.dev' },
				{ name: 'coverage', content: 'Worldwide' },
				{ name: 'description', content: 'A webhooks UI to easily send announcements and messages to a Discord server' },
				{ name: 'designer', content: 'Sapphire Community, contact@sapphirejs.dev' },
				{ name: 'distribution', content: 'Global' },
				{ name: 'googlebot', content: 'index,follow' },
				{ name: 'HandheldFriendly', content: 'True' },
				{ name: 'identifier-URL', content: 'https://webhooks.sapphirejs.dev' },
				{ name: 'keywords', content: 'discord, webhooks, dashboard' },
				{ name: 'msapplication-config', content: '/browserconfig.xml' },
				{ name: 'msapplication-TileColor', content: '#23529B' },
				{ name: 'msapplication-TileImage', content: '/icons/mstile-144x144.png' },
				{ name: 'owner', content: 'Sapphire Community, contact@sapphirejs.dev' },
				{ name: 'rating', content: 'safe for kids' },
				{ name: 'reply-to', content: 'contact@sapphirejs.dev' },
				{ name: 'revisit-after', content: '7 days' },
				{ name: 'robots', content: 'archive,follow,imageindex,index,odp,snippet,translate' },
				{ name: 'shortlink', content: 'https://webhooks.sapphirejs.dev' },
				{ name: 'subject', content: 'A webhooks UI to easily send announcements and messages to a Discord server' },
				{ name: 'summary', content: 'A webhooks UI to easily send announcements and messages to a Discord server.' },
				{ name: 'target', content: 'all' },
				{ name: 'theme-color', content: '#23529B' },
				{ name: 'twitter:card', content: 'summary' },
				{ name: 'twitter:creator', content: '@Favna_' },
				{ name: 'twitter:image', content: 'https://webhooks.sapphirejs.dev/icons/opengraph.png' },
				{ name: 'twitter:site', content: '@Favna_' },
				{ name: 'url', content: 'https://webhooks.sapphirejs.dev' },
				{ property: 'og:description', content: 'A webhooks UI to easily send announcements and messages to a Discord server' },
				{ property: 'og:email', content: 'contact@sapphirejs.dev' },
				{ property: 'og:image:alt', content: 'OpenGraphImage' },
				{ property: 'og:image:height', content: '512' },
				{ property: 'og:image:width', content: '1024' },
				{ property: 'og:image', content: 'https://webhooks.sapphirejs.dev/icons/opengraph.png' },
				{ property: 'og:locale', content: 'en_GB' },
				{ property: 'og:site_name', content: 'Webhook Dashboard' },
				{ property: 'og:title', content: 'Home | Sapphire' },
				{ property: 'og:type', content: 'website' },
				{ property: 'og:url', content: 'https://webhooks.sapphirejs.dev' }
			]
		}
	},

	compatibilityDate: '2024-07-23'
});
