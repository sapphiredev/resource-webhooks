<template>
	<span v-for="(error, index) in state.meta.touchedErrors" :key="index" class="label-text-alt text-red-500">{{ error }}</span>
</template>

<script setup lang="ts">
import type { FieldApi } from '@tanstack/vue-form';

defineProps<{
	state: FieldApi<any, any, any, any>['state'];
}>();
</script>
