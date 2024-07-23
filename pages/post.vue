<template>
	<div class="mt-5 grid h-full w-full grid-cols-1 px-5">
		<form class="flex flex-col" @submit="onSubmit">
			<modals-review
				v-if="modalStorage.identifier === ''"
				:values="values"
				:is-editing="false"
				@close-modal="modalStorage.resetModal()"
				@reset-form="resetForm()"
			/>
			<forms-textarea name="text" label="Message Text" />
			<forms-select
				name="webhookUrl"
				label="Choose the webhook URL to post to"
				add-new-option-href="/configure/webhooks"
				class="py-2 lg:py-6"
				:options="webhookStorage.webhooks"
				:required="true"
			/>
			<forms-select
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
import { postSchema } from '~~/lib/schemas/postSchema';
import type { Post } from '~~/lib/types/Post';

const rolesStorage = useRoles();
const webhookStorage = useWebhooks();
const modalStorage = useModalStore();

const { handleSubmit, resetForm, isSubmitting, meta, values } = useForm<Post>({
	initialValues: {
		webhookUrl: null,
		text: '',
		role: null
	},
	validationSchema: toTypedSchema(postSchema)
});

const onInvalidSubmit: InvalidSubmissionHandler<Post> = ({ errors }) => useInvalidFormSubmit(errors);
const onSuccessfulSubmit: SubmissionHandler<Post> = () => modalStorage.closeModal();

const onSubmit = handleSubmit(onSuccessfulSubmit, onInvalidSubmit);
</script>
