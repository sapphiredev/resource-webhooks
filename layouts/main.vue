<template>
	<div class="h-full px-2 py-2 pb-20" @click="mobileMenuDropdown?.close()">
		<div class="grid-layout grid min-h-full">
			<sections-app-navbar ref="mobileMenuDropdown" />
			<main
				class="grid-rows-[1fr 0.2fr] grid h-[calc(100vh_-_64px)] gap-0 overflow-auto pb-20 [grid-template-areas:'sp-grid-content''sp-grid-footer'] lg:pb-0"
			>
				<slot class="sp-grid-content"></slot>
				<sections-app-footer class="sp-grid-footer" />
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { HTMLDetailsNavbarElement } from '~~/lib/types/HTMLDetailsElement';

const mobileMenuDropdown = ref<HTMLDetailsNavbarElement | null>(null);
</script>
