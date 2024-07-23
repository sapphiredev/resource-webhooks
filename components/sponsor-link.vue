<template>
	<NuxtLink :aria-label="`Sponsor link to ${title}`" :to="href" target="_blank">
		<slot></slot>
	</NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ title: string; href: string }>();
</script>
