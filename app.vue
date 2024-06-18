<template>
	<VitePwaManifest />
	<LoadingIndicator />
	<NuxtLayout name="main">
		<NuxtPage />
	</NuxtLayout>
</template>

<script setup lang="ts">
watch(usePreferredColorScheme(), (value) => {
	document.documentElement.setAttribute('data-theme', value);
});
</script>
