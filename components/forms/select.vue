<template>
	<div class="form-control mb-4 flex w-full flex-col gap-2">
		<label class="label">
			<span class="label-text">
				{{ label }} <FormsRequiredStar :required="required" />
				<span v-if="options.length === 0">
					<span class="text-error font-bold">
						<NuxtLink :aria-label="`Go to configuration page for ${label}`" class="link link-secondary" :to="addNewOptionHref"
							>configuration page</NuxtLink
						>
					</span>
				</span>
			</span>
		</label>
		<select v-model="value" class="max-x-ws select w-full shadow-md" :disabled="options.length === 0">
			<option :disabled="required" selected :value="null">None</option>
			<option v-for="option in options" :key="option.value" :value="option" :selected="value && value.value === option.value">
				{{ option.label + ' - ' + option.value }}
			</option>

			<FormsErrorMessage :name="name" :has-error-message="!!errorMessage" />
		</select>
	</div>
</template>

<script setup lang="ts">
import type { PersistedStorageEntry } from '~~/lib/types/PersistedStorageEntry';

const props = defineProps<{
	name: string;
	label: string;
	addNewOptionHref: string;
	required: boolean;
	options: PersistedStorageEntry[];
}>();

const { value, errorMessage } = useField<PersistedStorageEntry>(toRef(props, 'name'));
</script>
