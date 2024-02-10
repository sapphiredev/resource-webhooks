<template>
	<button
		aria-label="Theme Switcher Button"
		class="btn-ghost btn content-center"
		@click="currentColor = currentColor === 'dark' ? 'light' : 'dark'"
	>
		<moon-icon v-if="currentColor === 'dark'" />
		<sun-icon v-else />
	</button>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';
const currentColor = useColorMode({
	selector: 'html',
	attribute: 'data-theme'
});
</script>
