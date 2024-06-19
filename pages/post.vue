<template>
	<div class="mt-5 grid h-full w-full grid-cols-1 px-5">
		<form class="flex flex-col" @submit="onSubmit">
			<ModalsReview
				v-if="modalStorage.identifier === ''"
				:form="form"
				:is-editing="false"
				@close-modal="modalStorage.resetModal()"
				@reset-form="form.reset()"
			/>
			<FormsTextarea :form="form" name="text" label="Message Text" />
			<FormsSelect
				:form="form"
				name="webhookUrl"
				label="Choose the webhook URL to post to"
				add-new-option-href="/configure/webhooks"
				class="py-2 lg:py-6"
				:options="webhookStorage.webhooks"
				:required="true"
			/>
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
import { useForm, type Validator } from '@tanstack/vue-form';
import { yupValidator } from '@tanstack/yup-form-adapter';
import { postSchema } from '~~/lib/schemas/postSchema';
import type { Post } from '~~/lib/types/Post';

const rolesStorage = useRoles();
const webhookStorage = useWebhooks();
const modalStorage = useModalStore();

const form = useForm<Post, Validator<Post, unknown>>({
	defaultValues: {
		webhookUrl: null,
		text: '',
		role: null
	},
	onSubmit: ({ value }) => {
		console.log(value);
		modalStorage.closeModal();
	},
	validatorAdapter: yupValidator(),
	validators: {
		onChange: postSchema,
		onSubmit: postSchema
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

// const { handleSubmit, resetForm, isSubmitting, meta, values } = useForm<Post>({
// 	initialValues: {
// 		webhookUrl: null,
// 		text: '',
// 		role: null
// 	},
// 	validationSchema: postSchema
// });

// const onInvalidSubmit: InvalidSubmissionHandler<Post> = ({ errors }) => useInvalidFormSubmit(errors);
// const onSuccessfulSubmit: SubmissionHandler<Post> = () => (openModal.value = '');

// const onSubmit = handleSubmit(onSuccessfulSubmit, onInvalidSubmit);
</script>
