<template>
	<button
		aria-label="Theme Switcher Button"
		class="btn-ghost btn content-center"
		@click="currentColor = currentColor === 'dark' ? 'light' : 'dark'"
	>
		<hero-icons-moon v-if="currentColor === 'dark'" />
		<hero-icons-sun v-else />
	</button>
</template>

<script setup lang="ts">
const currentColor = useColorMode({
	selector: 'html',
	attribute: 'data-theme'
});
</script>
