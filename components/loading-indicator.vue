<template>
	<div v-if="loadingStorage.isLoading" class="fixed z-[1200] block h-full w-full bg-base-300 opacity-75">
		<div class="absolute left-1/2 top-1/2 z-[1200]">
			<div class="loading loading-bars loading-lg"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
const loadingStorage = useLoadingStore();
</script>
