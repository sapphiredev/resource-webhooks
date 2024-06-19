<template>
	<form.Field :name="name">
		<template #default="{ state }">
			<div class="form-control mb-4 w-full">
				<label class="label">
					<span class="label-text">
						{{ label }}
						<span v-if="options.length === 0">
							<span class="font-bold text-error">
								<NuxtLink :aria-label="`Go to configuration page for ${label}`" class="link link-secondary" :to="addNewOptionHref"
									>configuration page</NuxtLink
								>
							</span>
						</span>
					</span>
				</label>
				<select v-model="state.value" class="max-x-ws select w-full shadow-md" :disabled="options.length === 0">
					<option :disabled="required" selected :value="null">None</option>
					<option
						v-for="option in options"
						:key="option.value"
						:value="option"
						:selected="state.value && state.value.value === option.value"
					>
						{{ option.label + ' - ' + option.value }}
					</option>

					<FormsErrorMessage :name="name" :has-error-message="Boolean(state.meta.errors.length)" />
				</select>
			</div>
		</template>
	</form.Field>
</template>

<script setup lang="ts">
import type { FormApi, Validator } from '@tanstack/vue-form';
import type { PersistedStorageEntry } from '~~/lib/types/PersistedStorageEntry';

defineProps<{
	form: FormApi<any, Validator<any, unknown>>;
	name: string;
	label: string;
	addNewOptionHref: string;
	required: boolean;
	options: PersistedStorageEntry[];
}>();

// const { value, errorMessage } = useField<PersistedStorageEntry>(props.name);
</script>
