<template>
	<VitePwaManifest />
	<NuxtLoadingIndicator />
	<NuxtLayout name="main">
		<NuxtPage />
	</NuxtLayout>
	<Teleport to="body">
		<LoadingIndicator />
	</Teleport>
</template>

<script setup lang="ts">
watch(usePreferredColorScheme(), (value) => {
	document.documentElement.setAttribute('data-theme', value);
});
</script>
