<template>
	<div class="mt-5 grid h-full w-full grid-cols-1 px-5">
		<form class="flex flex-col" @submit="onSubmit">
			<ModalsReview
				v-if="modalStorage.identifier === ''"
				:values="values"
				:is-editing="true"
				@close-modal="modalStorage.resetModal()"
				@reset-form="resetForm()"
			/>
			<FormsTextarea name="text" label="Message Text" :required="true" />
			<FormsSelect
				name="webhookUrl"
				label="Choose the webhook URL to post to"
				add-new-option-href="/configure/webhooks"
				class="pt-2 lg:pt-3"
				:options="webhookStorage.webhooks"
				:required="true"
			/>
			<FormsInput name="messageId" label="Message id to update" :required="true" />
			<button
				type="button"
				class="btn-shadow btn btn-primary w-full"
				:disabled="!values.messageId || !values.webhookUrl"
				@click="getMessageContent()"
			>
				Fetch webhook message content from Discord
			</button>
			<FormsSelect
				name="role"
				label="Optionally choose a role to mention"
				add-new-option-href="/configure/roles"
				:options="rolesStorage.roles"
				:required="false"
			/>
			<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
				<button aria-label="Reset form" type="button" class="btn-shadow btn btn-accent" @click="resetForm()">Reset form</button>
				<button
					aria-label="Review post"
					type="submit"
					class="btn-shadow btn btn-primary"
					:disabled="isSubmitting || !meta.dirty || !meta.valid"
				>
					Review post
				</button>
			</div>
		</form>
	</div>
</template>

<script setup lang="ts">
import type { InvalidSubmissionHandler, SubmissionHandler } from 'vee-validate';
import { showToast } from '~/lib/utils/ShowToast';
import { fetchWebhookMessage } from '~~/lib/api/FetchWebhookMessage';
import { updateSchema } from '~~/lib/schemas/updateSchema';
import type { Update } from '~~/lib/types/Update';

const rolesStorage = useRoles();
const webhookStorage = useWebhooks();
const modalStorage = useModalStore();
const loadingStorage = useLoadingStore();

const { handleSubmit, resetForm, isSubmitting, meta, values, setFieldValue } = useForm<Update>({
	initialValues: {
		webhookUrl: null,
		text: '',
		role: null,
		messageId: ''
	},
	validationSchema: toTypedSchema(updateSchema)
});

const onInvalidSubmit: InvalidSubmissionHandler<Update> = ({ errors }) => useInvalidFormSubmit(errors);
const onSuccessfulSubmit: SubmissionHandler<Update> = () => modalStorage.closeModal();

const onSubmit = handleSubmit(onSuccessfulSubmit, onInvalidSubmit);

async function getMessageContent() {
	loadingStorage.startLoading();

	const data = await fetchWebhookMessage(values);

	if (data) {
		setFieldValue('text', data);
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
