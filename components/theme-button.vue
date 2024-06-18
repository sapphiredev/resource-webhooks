<template>
	<button
		aria-label="Theme Switcher Button"
		class="btn btn-ghost content-center"
		@click="currentColor = currentColor === 'dark' ? 'light' : 'dark'"
	>
		<MoonIcon v-if="currentColor === 'dark'" class="h-6 w-6" />
		<SunIcon v-else class="h-6 w-6" />
	</button>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';
const currentColor = useColorMode({
	selector: 'html',
	attribute: 'data-theme'
});
</script>
