<template>
	<span v-if="required" class="ml-1 font-bold text-red-600">*</span>
</template>

<script lang="ts" setup>
defineProps<{ required?: boolean }>();
</script>
