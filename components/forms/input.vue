<template>
	<div class="form-control w-full">
		<label class="label">
			<span class="label-text">{{ label }}</span>
		</label>
		<input v-model="value" type="text" class="input-bordered input w-full shadow-md" :class="{ 'input-error': !!errorMessage }" />
		<label class="label">
			<forms-error-message :name="name" :hasErrorMessage="!!errorMessage" />
		</label>
	</div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{ name: string; label: string }>();

const { value, errorMessage } = useField<string>(props.name);
</script>
