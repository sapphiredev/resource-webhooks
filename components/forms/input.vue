<template>


	<div class="form-control w-full">
		<label :htmlFor="name" class="label">
			<span class="label-text">{{ label }}</span>
		</label>
		<input
			type="text"
			:name="name"
			:value="state.value"
			class="input input-bordered w-full shadow-md"
			:class="{ 'input-error': Boolean(state.meta.errors.length) }"
			@blur="handleBlur"
			@input="(e) => $emit('input', (e.target as HTMLInputElement).value)"
		/>
		<label class="label">
			<FormsErrorMessage :state="state" />
		</label>
	</div>
</template>

<script setup lang="ts">
defineEmits<{
	(e: 'input', value: any): void;
}>();

defineProps<{ handleBlur: any; state: FieldApi<any, any, any, any>['state']; name: string; label: string }>();
</script>
