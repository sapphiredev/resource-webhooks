<template>
	<button class="btn-ghost btn" @click="currentColor = currentColor === 'dark' ? 'light' : 'dark'">
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
