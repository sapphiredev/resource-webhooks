<template>
	<div class="mt-5 grid h-full w-full grid-cols-1 px-5">
		<form class="flex flex-col" @submit="onSubmit">
			<ModalsReview
				v-if="modalStorage.identifier === ''"
				:form="form"
				:is-editing="true"
				@close-modal="modalStorage.resetModal()"
				@reset-form="form.reset()"
			/>
			<FormsTextarea :form="form" name="text" label="Message Text" />
			<FormsSelect
				:form="form"
				name="webhookUrl"
				label="Choose the webhook URL to post to"
				add-new-option-href="/configure/webhooks"
				class="pt-2 lg:pt-3"
				:options="webhookStorage.webhooks"
				:required="true"
			/>
			<FormsInput :form="form" name="messageId" label="Message id to update" />
			<button
				type="button"
				class="btn-shadow btn btn-primary w-full"
				:disabled="!form.getFieldValue('messageId') || !form.getFieldValue('webhookUrl.value')"
				@click="getMessageContent()"
			>
				Fetch webhook message content from Discord
			</button>
			<FormsSelect
				:form="form"
				name="role"
				label="Optionally choose a role to mention"
				add-new-option-href="/configure/roles"
				:options="rolesStorage.roles"
				:required="false"
			/>
			<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
				<button aria-label="Reset form" type="button" class="btn-shadow btn btn-accent" @click="form.reset()">Reset form</button>
				<button
					aria-label="Review post"
					type="submit"
					class="btn-shadow btn btn-primary"
					:disabled="form.state.isSubmitting || !form.state.isDirty || !form.state.isValid"
				>
					Review post
				</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import { fetchWebhookMessage } from '~~/lib/api/FetchWebhookMessage';
import { useForm, type Validator } from '@tanstack/vue-form';
import { yupValidator } from '@tanstack/yup-form-adapter';
import { updateSchema } from '~~/lib/schemas/updateSchema';
import type { Update } from '~~/lib/types/Update';
import { showToast } from '~/lib/utils/ShowToast';

const rolesStorage = useRoles();
const webhookStorage = useWebhooks();
const modalStorage = useModalStore();
const loadingStorage = useLoadingStore();

const form = useForm<Update, Validator<Update, unknown>>({
	defaultValues: {
		webhookUrl: null,
		text: '',
		role: null,
		messageId: ''
	},
	onSubmit: ({ value }) => {
		console.log(value);
		modalStorage.closeModal();
	},
	validatorAdapter: yupValidator(),
	validators: {
		onChange: updateSchema,
		onSubmit: updateSchema
	},
	onSubmitInvalid: (props) => {
		console.log(props);
		// useInvalidFormSubmit(errors);
	}
});

function onSubmit(e: Event) {
	e.preventDefault();
	e.stopPropagation();
	form.handleSubmit();
}

// const { handleSubmit, resetForm, isSubmitting, meta, values, setFieldValue } = useForm<Update>({
// 	initialValues: {
// 		webhookUrl: null,
// 		text: '',
// 		role: null,
// 		messageId: ''
// 	},
// 	validationSchema: updateSchema
// });

// const loadingIndicator = useLoadingIndicator();

// const onInvalidSubmit: InvalidSubmissionHandler<Update> = ({ errors }) => useInvalidFormSubmit(errors);
// const onSuccessfulSubmit: SubmissionHandler<Update> = () => (openModal.value = '');

// const onSubmit = handleSubmit(onSuccessfulSubmit, onInvalidSubmit);

async function getMessageContent() {
	loadingStorage.startLoading();

	const data = await fetchWebhookMessage(form.getFieldValue('webhookUrl.value'), form.getFieldValue('messageId'));

	if (data) {
		form.setFieldValue('text', data);
		showToast({
			type: 'success',
			message: 'Set the content from Discord to the text input field',
			timeout: 5,
			pauseOnHover: true
		});
	} else {
		showToast({
			type: 'danger',
			message: 'Failed to fetch message from Discord',
			timeout: 5,
			pauseOnHover: true
		});
	}

	loadingStorage.endLoading();
}
</script>
