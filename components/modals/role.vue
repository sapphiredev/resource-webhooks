<template>
	<div class="modal">
		<form class="modal-box relative max-w-[40rem]" @submit="onSubmit">
			<button aria-label="Close popup" class="btn btn-circle btn-sm absolute right-2 top-2" @click="handleClose(resetForm)">
				<XCircleIcon />
			</button>
			<h3 class="text-lg font-bold">{{ action === 'add' ? 'Add a new role' : 'Update role' }}</h3>
			<FormsInput name="label" label="Role name" :required="true" />
			<FormsInput name="value" label="Role Snowflake" :required="true" />
			<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
				<button aria-label="Reset inputs" type="button" class="btn btn-accent" @click="resetForm()">Reset form</button>
				<button aria-label="Add role" type="submit" class="btn btn-primary" :disabled="isSubmitting || !meta.valid">
					{{ action === 'add' ? 'Add role' : 'Update role' }}
				</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/solid';
import type { InvalidSubmissionHandler, SubmissionHandler } from 'vee-validate';
import { addOrEditRoleSchema } from '~~/lib/schemas/addOrEditRoleSchema';
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

const { handleSubmit, resetForm, isSubmitting, meta } = useForm<PersistedStorageEntry>({
	initialValues: {
		value: props.role?.value ?? '',
		label: props.role?.label ?? ''
	},
	validationSchema: toTypedSchema(addOrEditRoleSchema(props.action === 'edit'))
});

function handleClose(resetForm?: () => void) {
	resetForm?.();
	emit('close-modal');
}

const onInvalidSubmit: InvalidSubmissionHandler<PersistedStorageEntry> = ({ errors }) => useInvalidFormSubmit(errors);
const onSuccessfulSubmit: SubmissionHandler<PersistedStorageEntry> = (values) => {
	if (props.action === 'add') {
		emit('append-role', values);
	} else {
		const index = props.roles.findIndex((role) => role.value === props.role?.value);
		emit('splice-role', index, values);
	}
	handleClose();
};

const onSubmit = handleSubmit(onSuccessfulSubmit, onInvalidSubmit);
</script>
