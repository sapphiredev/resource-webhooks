<template>
	<div class="form-control h-1/2">
		<label class="label">
			<span class="label-text">{{ label }}</span>
		</label>
		<textarea v-model="value" type="text" class="textarea-bordered textarea h-full" :class="{ 'input-error': !!errorMessage }" />
		<label class="label">
			<forms-error-message :name="name" :errorMessage="!!errorMessage" />
		</label>
	</div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps<{ name: string; label: string }>();

const { value, errorMessage } = useField<string>(props.name);
</script>
