<template>
	<ErrorMessage :name="name" class="label-text-alt" :class="{ 'text-red-500': !!hasErrorMessage }" />
</template>

<script setup lang="ts">
import { ErrorMessage } from 'vee-validate';

defineProps<{ name: string; hasErrorMessage: boolean }>();
</script>
