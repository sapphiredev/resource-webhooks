<template>
	<div class="form-control w-full">
		<label class="label">
			<span class="label-text">{{ label }}<FormsRequiredStar :required="required" /></span>
		</label>
		<input v-model="value" type="text" class="input input-bordered w-full shadow-md" :class="{ 'input-error': !!errorMessage }" />
		<label class="label">
			<FormsErrorMessage :name="name" :has-error-message="!!errorMessage" />
		</label>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string; label: string; required?: boolean }>();

const { value, errorMessage } = useField<string>(toRef(props, 'name'));
</script>
