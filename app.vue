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
import { configure } from 'vee-validate';

watch(usePreferredColorScheme(), (value) => {
	document.documentElement.setAttribute('data-theme', value);
});

configure({
	validateOnBlur: true,
	validateOnChange: true,
	validateOnInput: true,
	validateOnModelUpdate: true
});
</script>
