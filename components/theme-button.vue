<template>
	<!-- <button
		aria-label="Theme Switcher Button"
		class="btn btn-ghost content-center"
		@click="currentColor = currentColor === 'dark' ? 'light' : 'dark'"
	>
		<moon-icon v-if="currentColor === 'dark'" />
		<sun-icon v-else />
	</button> -->

	<label class="flex cursor-pointer gap-2">
		<MoonIcon />
		<input aria-label="Theme Switcher toggle" type="checkbox" value="light" class="theme-controller toggle" />
		<SunIcon />
	</label>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';
// const currentColor = useColorMode({
// 	selector: 'html',
// 	attribute: 'data-theme'
// });
</script>
