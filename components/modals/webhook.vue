<template>
	<div class="modal">
		<form class="modal-box relative" @submit="onSubmit">
			<button aria-label="Close popup" class="btn btn-circle btn-sm absolute right-2 top-2" @click="handleClose(form.reset)">
				<XCircleIcon />
			</button>
			<h3 class="text-lg font-bold">
				{{ action === 'add' ? 'Add a new Webhook URL' : 'Update Webhook URL' }}
			</h3>
			<FormsInput :form="form" name="label" label="Label" />
			<FormsInput :form="form" name="value" label="Webhook URL" />
			<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
				<button aria-label="Reset inputs" type="button" class="btn btn-accent" @click="form.reset()">Reset form</button>
				<button aria-label="Add webhook" type="submit" class="btn btn-primary" :disabled="form.state.isSubmitting || !form.state.isValid">
					{{ action === 'add' ? 'Add Webhook URL' : 'Update Webhook URL' }}
				</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/solid';
import { useForm, type Validator } from '@tanstack/vue-form';
import { yupValidator } from '@tanstack/yup-form-adapter';
import { addOrEditWebhookSchema } from '~~/lib/schemas/addOrEditWebhookSchema';
import type { PersistedStorageEntry } from '~~/lib/types/PersistedStorageEntry';

const emit = defineEmits<{
	(e: 'close-modal'): void;
	(e: 'append-webhook', webhook: PersistedStorageEntry): void;
	(e: 'splice-webhook', index: number, webhook: PersistedStorageEntry): void;
}>();

const props = defineProps<{
	webhooks: PersistedStorageEntry[];
	webhook: PersistedStorageEntry | null;
	action: 'add' | 'edit';
}>();

const form = useForm<PersistedStorageEntry, Validator<PersistedStorageEntry, unknown>>({
	defaultValues: {
		value: props.webhook?.value ?? '',
		label: props.webhook?.label ?? ''
	},
	onSubmit: ({ value }) => {
		console.log(value);
		if (props.action === 'add') {
			emit('append-webhook', value);
		} else {
			const index = props.webhooks.findIndex((webhook) => webhook.value === props.webhook?.value);
			emit('splice-webhook', index, value);
		}

		handleClose();
	},
	validatorAdapter: yupValidator(),
	validators: {
		onChange: addOrEditWebhookSchema(props.action === 'edit'),
		onSubmit: addOrEditWebhookSchema(props.action === 'edit')
	},
	onSubmitInvalid: (props) => {
		console.log(props);
		// useInvalidFormSubmit(errors);
	}
});

// const { handleSubmit, resetForm, isSubmitting, meta } = useForm<PersistedStorageEntry>({
// 	initialValues: {
// 		value: props.webhook?.value ?? '',
// 		label: props.webhook?.label ?? ''
// 	},
// 	validationSchema: addOrEditWebhookSchema(props.action === 'edit')
// });

function handleClose(resetForm?: () => void) {
	resetForm?.();
	emit('close-modal');
}

function onSubmit(e: Event) {
	e.preventDefault();
	e.stopPropagation();
	form.handleSubmit();
}

onBeforeUnmount(() => {
	form.reset();
});

// const onInvalidSubmit: InvalidSubmissionHandler<PersistedStorageEntry> = ({ errors }) => useInvalidFormSubmit(errors);
// const onSuccessfulSubmit: SubmissionHandler<PersistedStorageEntry> = (values) => {
// if (props.action === 'add') {
// 	props.webhooks.push(values);
// } else {
// 	const index = props.webhooks.findIndex((webhook) => webhook.value === props.webhook?.value);
// 	props.webhooks.splice(index, 1, values);
// }

// handleClose();
// };

// const onSubmit = handleSubmit(onSuccessfulSubmit, onInvalidSubmit);
</script>
