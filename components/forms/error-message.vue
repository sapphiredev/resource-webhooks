<template>
	<VeeErrorMessage :name="name" class="label-text-alt" :class="{ 'text-red-500': !!hasErrorMessage }" />
</template>

<script setup lang="ts">
defineProps<{ name: string; hasErrorMessage: boolean }>();
</script>
