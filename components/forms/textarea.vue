<template>
	<form.Field :name="name">
		<template #default="{ field, state }">
			<div class="form-control h-1/2">
				<label class="label">
					<span class="label-text">{{ label }}</span>
					<span v-if="lengthCount.length" class="label-text text-slate-600 dark:text-gray-400"
						>Length per part: {{ lengthCount.join(', ') }}</span
					>
				</label>
				<textarea
					type="text"
					:name="field.name"
					:value="state.value"
					:onBlur="field.handleBlur"
					:onChange="(e) => field.handleChange((e.target as HTMLInputElement).value)"
					class="textarea textarea-bordered h-full font-mono shadow-md"
					:class="{ 'input-error': Boolean(state.meta.errors.length) }"
				/>
				<label class="label">
					<FormsErrorMessage :name="name" :has-error-message="Boolean(state.meta.errors.length)" />
				</label>
			</div>
		</template>
	</form.Field>
</template>

<script setup lang="ts">
import type { FormApi, Validator } from '@tanstack/vue-form';

const props = defineProps<{ form: FormApi<any, Validator<any, unknown>>; name: string; label: string }>();

// const { value, errorMessage } = useField<string>(toRef(props, 'name'));

const lengthCount = ref<number[]>([]);

watch(props.form.getFieldValue('text'), (textValue: string) => (lengthCount.value = textValue.split(/\n\s*\n/).map((section) => section.length)));
</script>
