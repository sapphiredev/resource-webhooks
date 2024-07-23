<template>
	<div class="form-control h-1/2">
		<label class="label">
			<span class="label-text">{{ label }}<FormsRequiredStar :required="required" /></span>
			<span v-if="lengthCount.length" class="label-text text-slate-600 dark:text-gray-400">Length per part: {{ lengthCount.join(', ') }}</span>
		</label>
		<textarea
			v-model="value"
			type="text"
			class="textarea textarea-bordered h-full font-mono shadow-md"
			:class="{ 'input-error': !!errorMessage }"
		/>
		<label class="label">
			<FormsErrorMessage :name="name" :has-error-message="!!errorMessage" />
		</label>
	</div>
</template>

<script setup lang="ts">
const props = defineProps<{ name: string; label: string; required?: boolean }>();

const { value, errorMessage } = useField<string>(toRef(props, 'name'));

const lengthCount = ref<number[]>([]);

watch(useFieldValue<string>('text'), (textValue) => (lengthCount.value = textValue.split(/\n\s*\n/).map((section) => section.length)));
</script>
