<template>
	<div class="modal">
		<form class="modal-box relative" @submit="onSubmit">
			<button aria-label="Close popup" class="btn btn-circle btn-sm absolute right-2 top-2" @click="handleClose(form.reset)">
				<XCircleIcon />
			</button>
			<h3 class="text-lg font-bold">
				{{ action === 'add' ? 'Add a new role' : 'Update role' }}
			</h3>
			<form.Field name="label">
				<template #default="{ field, state }">
					<FormsInput
						:handle-blur="field.handleBlur"
						:state="state"
						name="label"
						label="Role name"
						@input="(newValue) => field.handleChange(newValue)"
					/>
				</template>
			</form.Field>
			<form.Field name="value">
				<template #default="{ field, state }">
					<FormsInput
						:handle-blur="field.handleBlur"
						:state="state"
						name="value"
						label="Role Snowflake"
						@input="(newValue) => field.handleChange(newValue)"
					/>
				</template>
			</form.Field>
			<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
				<button aria-label="Reset inputs" type="button" class="btn btn-accent" @click="form.reset()">Reset form</button>
				<button aria-label="Add role" type="submit" class="btn btn-primary" :disabled="form.state.isSubmitting || !form.state.isValid">
					{{ action === 'add' ? 'Add role' : 'Update role' }}
				</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/solid';
import { useForm, type Validator } from '@tanstack/vue-form';
import { addOrEditRoleSchema } from '~~/lib/schemas/addOrEditRoleSchema';
import { yupValidator } from '@tanstack/yup-form-adapter';
import type { PersistedStorageEntry } from '~~/lib/types/PersistedStorageEntry';

const emit = defineEmits<{
	(e: 'close-modal'): void;
	(e: 'append-role', role: PersistedStorageEntry): void;
	(e: 'splice-role', index: number, role: PersistedStorageEntry): void;
}>();

const props = defineProps<{
	roles: PersistedStorageEntry[];
	role: PersistedStorageEntry | null;
	action: 'add' | 'edit';
}>();

const form = useForm<PersistedStorageEntry, Validator<PersistedStorageEntry, unknown>>({
	defaultValues: {
		value: props.role?.value ?? '',
		label: props.role?.label ?? ''
	},
	onSubmit: ({ value }) => {
		if (props.action === 'add') {
			emit('append-role', value);
		} else {
			const index = props.roles.findIndex((role) => role.value === props.role?.value);
			emit('splice-role', index, value);
		}
		handleClose();
	},
	validatorAdapter: yupValidator(),
	validators: {
		onSubmit: addOrEditRoleSchema(props.action === 'edit'),
		onChange: addOrEditRoleSchema(props.action === 'edit')
	},
	onSubmitInvalid: (props) => {
		console.log(props);
		// useInvalidFormSubmit(errors);
	}
});

function handleClose(resetForm?: () => void) {
	resetForm?.();
	emit('close-modal');
}

function onSubmit(e: Event) {
	e.preventDefault();
	e.stopPropagation();
	form.handleSubmit();
}

// const onInvalidSubmit: InvalidSubmissionHandler<PersistedStorageEntry> = ({ errors }) => useInvalidFormSubmit(errors);
// const onSuccessfulSubmit: SubmissionHandler<PersistedStorageEntry> = (values) => {
// if (props.action === 'add') {
// 	props.roles.push(values);
// } else {
// 	const index = props.roles.findIndex((role) => role.value === props.role?.value);
// 	props.roles.splice(index, 1, values);
// }
// handleClose();
// };

// const onSubmit = handleSubmit(onSuccessfulSubmit, onInvalidSubmit);
</script>
