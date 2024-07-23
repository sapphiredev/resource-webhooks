<template>
	<div class="modal">
		<form class="modal-box relative max-w-[40rem]" @submit="onSubmit">
			<button aria-label="Close popup" class="btn btn-circle btn-sm absolute right-2 top-2" @click="handleClose(resetForm)">
				<XCircleIcon />
			</button>
			<h3 class="text-lg font-bold">{{ action === 'add' ? 'Add a new Webhook URL' : 'Update Webhook URL' }}</h3>
			<FormsInput name="label" label="Label" :required="true" />
			<FormsInput name="value" label="Webhook URL" :required="true" />
			<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
				<button aria-label="Reset inputs" type="button" class="btn btn-accent" @click="resetForm()">Reset form</button>
				<button aria-label="Add webhook" type="submit" class="btn btn-primary" :disabled="isSubmitting || !meta.valid">
					{{ action === 'add' ? 'Add Webhook URL' : 'Update Webhook URL' }}
				</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { XCircleIcon } from '@heroicons/vue/24/solid';
import type { InvalidSubmissionHandler, SubmissionHandler } from 'vee-validate';
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

const { handleSubmit, resetForm, isSubmitting, meta } = useForm<PersistedStorageEntry>({
	initialValues: {
		value: props.webhook?.value ?? '',
		label: props.webhook?.label ?? ''
	},
	validationSchema: toTypedSchema(addOrEditWebhookSchema(props.action === 'edit'))
});

function handleClose(resetForm?: () => void) {
	resetForm?.();
	emit('close-modal');
}

const onInvalidSubmit: InvalidSubmissionHandler<PersistedStorageEntry> = ({ errors }) => useInvalidFormSubmit(errors);
const onSuccessfulSubmit: SubmissionHandler<PersistedStorageEntry> = (values) => {
	if (props.action === 'add') {
		emit('append-webhook', values);
	} else {
		const index = props.webhooks.findIndex((webhook) => webhook.value === props.webhook?.value);
		emit('splice-webhook', index, values);
	}

	handleClose();
};

const onSubmit = handleSubmit(onSuccessfulSubmit, onInvalidSubmit);
</script>
