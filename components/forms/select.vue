<template>
	<div class="form-control mb-4 w-full">
		<label class="label">
			<span class="label-text">
				{{ label }}
				<span v-if="options.length === 0">
					<span class="font-bold text-error">
						<nuxt-link :aria-label="`Go to configuration page for ${label}`" class="link-secondary link" :to="addNewOptionHref"
							>configuration page</nuxt-link
						>
					</span>
				</span>
			</span>
		</label>
		<select class="max-x-ws select w-full shadow-md" :disabled="options.length === 0" v-model="value">
			<option :disabled="required" selected :value="null">None</option>
			<option v-for="option in options" :key="option.value" :value="option" :selected="value && value.value === option.value">
				{{ option.label + ' - ' + option.value }}
			</option>

			<forms-error-message :name="name" :hasErrorMessage="!!errorMessage" />
		</select>
	</div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import type { PersistedStorageEntry } from '~~/lib/types/PersistedStorageEntry';

const props = defineProps<{
	name: string;
	label: string;
	addNewOptionHref: string;
	required: boolean;
	options: PersistedStorageEntry[];
}>();

const { value, errorMessage } = useField<PersistedStorageEntry>(props.name);
</script>
