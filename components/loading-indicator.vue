<template>
	<div v-if="loadingStorage.isLoading" class="bg-base-300 fixed z-[1200] block h-full w-full opacity-75">
		<div class="absolute top-1/2 left-1/2 z-[1200]">
			<div class="loading loading-bars loading-lg"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
const loadingStorage = useLoadingStore();
</script>
