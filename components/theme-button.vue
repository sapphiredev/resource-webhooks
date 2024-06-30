<template>
	<label class="flex cursor-pointer gap-2">
		<MoonIcon class="h-5 w-5" />
		<input
			aria-label="Theme Switcher toggle"
			type="checkbox"
			:value="currentColor"
			class="theme-controller toggle"
			@change="currentColor = currentColor === 'dark' ? 'light' : 'dark'"
		/>
		<SunIcon class="h-5 w-5" />
	</label>
</template>

<script setup lang="ts">
import { MoonIcon, SunIcon } from '@heroicons/vue/24/solid';

const currentColor = useColorMode({
	selector: 'html',
	attribute: 'data-theme'
});
</script>
