<template>
	<dialog class="modal" ref="roleDialog" @click="$event.target === roleDialog && roleDialog?.close()">
		<form method="dialog" @submit="onSubmit" class="modal-box relative">
			<button id="role-modal-close-button" aria-label="Close popup" class="btn-sm btn-circle btn absolute right-2 top-2">
				<hero-icons-x />
			</button>
			<h3 class="text-lg font-bold">{{ action === 'add' ? 'Add a new role' : 'Update role' }}</h3>
			<forms-input name="label" label="Role name" />
			<forms-input name="value" label="Role Snowflake" />
			<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
				<button aria-label="Reset inputs" type="button" class="btn-accent btn" @click="resetForm()">Reset form</button>
				<button aria-label="Add role" type="submit" class="btn-primary btn" :disabled="isSubmitting || !meta.valid">
					{{ action === 'add' ? 'Add role' : 'Update role' }}
				</button>
			</div>
		</form>
	</dialog>
</template>

<script setup lang="ts">
import { useForm, type InvalidSubmissionHandler, type SubmissionHandler } from 'vee-validate';
import { addOrEditRoleSchema } from '~~/lib/schemas/addOrEditRoleSchema';
import type { PersistedStorageEntry } from '~~/lib/types/PersistedStorageEntry';

defineExpose({ showModal: () => roleDialog.value?.showModal() });

const props = defineProps<{ roles: PersistedStorageEntry[]; role: PersistedStorageEntry | null; action: 'add' | 'edit' }>();

const roleDialog = ref<HTMLDialogElement | null>(null);

const { handleSubmit, resetForm, isSubmitting, meta } = useForm<PersistedStorageEntry>({
	initialValues: {
		value: props.role?.value ?? '',
		label: props.role?.label ?? ''
	},
	validationSchema: addOrEditRoleSchema(props.action === 'edit')
});

function handleClose() {
	resetForm();
	roleDialog.value?.close();
}

const onInvalidSubmit: InvalidSubmissionHandler<PersistedStorageEntry> = ({ errors, evt }) => {
	if ((evt as SubmitEvent).submitter?.id === 'role-modal-close-button') return handleClose();
	return useInvalidFormSubmit(errors);
};

const onSuccessfulSubmit: SubmissionHandler<PersistedStorageEntry> = (values, { evt }) => {
	if ((evt as SubmitEvent).submitter?.id === 'role-modal-close-button') return handleClose();

	if (props.action === 'add') {
		props.roles.push(values);
	} else {
		const index = props.roles.findIndex((role) => role.value === props.role?.value);
		props.roles.splice(index, 1, values);
	}

	handleClose();
};

const onSubmit = handleSubmit(onSuccessfulSubmit, onInvalidSubmit);
</script>
