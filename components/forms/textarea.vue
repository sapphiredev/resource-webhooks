<template>
	<div class="form-control h-1/2">
		<label class="label">
			<span class="label-text">{{ label }}</span>
			<span v-if="lengthCount.length" class="label-text text-slate-600 dark:text-gray-400">Length per part: {{ lengthCount.join(', ') }}</span>
		</label>
		<textarea
			v-model="value"
			type="text"
			class="textarea-bordered textarea h-full font-mono shadow-md"
			:class="{ 'input-error': !!errorMessage }"
		/>
		<label class="label">
			<forms-error-message :name="name" :hasErrorMessage="!!errorMessage" />
		</label>
	</div>
</template>

<script setup lang="ts">
import { useField, useFieldValue } from 'vee-validate';

const props = defineProps<{ name: string; label: string }>();

const { value, errorMessage } = useField<string>(toRef(props, 'name'));

const lengthCount = ref<number[]>([]);

watch(useFieldValue<string>('text'), (textValue) => (lengthCount.value = textValue.split(/\n\s*\n/).map((section) => section.length)));
</script>
