<template>
	<div class="modal">
		<div class="modal-box relative min-w-full">
			<div v-if="status === 'pending'">
				<div class="flex items-center justify-center">
					<progress class="progress progress-primary w-1/3"></progress>
				</div>
			</div>
			<div v-else-if="error || !data">
				An error occurred fetching the webhook profile. Please contact the Sapphire developers by joining
				<NuxtLink aria-label="Join Sapphire Discord Server" class="link link-secondary" to="https://discord.gg/sapphiredev" target="_blank"
					>the official Sapphire server</NuxtLink
				>
			</div>
			<div v-else>
				<discord-messages class="py-2">
					<discord-message
						:bot="true"
						:avatar="data.avatar"
						:author="data.author"
						:ephemeral="data.ephemeral"
						:edited="data.edited"
						:timestamp="data.timestamp"
						:twenty-four="data.twentyFour"
					>
						<div v-html="parseMarkdownishInput()"></div>
					</discord-message>
				</discord-messages>
			</div>
			<div class="mt-5 grid w-full grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4">
				<button aria-label="Cancel" type="button" class="btn btn-error" @click="emits('close-modal')">Cancel</button>
				<button
					v-show="status !== 'pending' && !error && data !== null"
					aria-label="Confirm and post"
					type="button"
					class="btn btn-primary"
					@click="handleConfirm"
				>
					Confirm
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import '@skyra/discord-components-core';

import { bold } from '@discordjs/formatters';
import type { Update } from '~/lib/types/Update';
import { fetchWebhookProfile } from '~~/lib/api/FetchWebhookProfile';
import { sendWebhookMessage } from '~~/lib/api/SendWebhookMessage';
import type { Post } from '~~/lib/types/Post';
import { markdownToDiscordWebComponents } from '~~/lib/utils/MarkdownToDiscordWebComponents';
import type { FormApi, Validator } from '@tanstack/vue-form';
import { showToast } from '~/lib/utils/ShowToast';

const emits = defineEmits(['close-modal', 'reset-form']);
const { form, isEditing } = defineProps<{
	form: FormApi<any, Validator<any, unknown>>;
	isEditing: boolean;
}>();

const { data, status, error } = useAsyncData('webhookProfile', () => fetchWebhookProfile(form.getFieldValue('webhookUrl')));
const loadingStorage = useLoadingStore();

const parseMarkdownishInput = () => {
	let parsedText = form.getFieldValue('text');
	if (form.getFieldValue('role') && !form.getFieldValue('text').startsWith(bold('New announcement for'))) {
		parsedText = `${bold('New announcement for')} @${form.getFieldValue('role.label')?.replace(/(.+) - \d{18,}/, '$1')}:\n${form.getFieldValue('text')}`;
	}

	return markdownToDiscordWebComponents(parsedText);
};

async function handleConfirm() {
	try {
		loadingStorage.startLoading();

		await sendWebhookMessage(
			{
				role: form.getFieldValue('role'),
				text: form.getFieldValue('text'),
				webhookUrl: form.getFieldValue('webhookUrl'),
				messageId: form.getFieldValue('messageId') as string
			},
			isEditing ? 'update' : 'post'
		);

		emits('reset-form');
		emits('close-modal');

		showToast({
			type: 'success',
			message: `Successfully ${isEditing ? 'updated' : 'posted'} Webhook message!`,
			timeout: 5,
			pauseOnHover: true
		});
	} catch (error) {
		showToast({
			type: 'denied',
			message: `Failed to ${
				isEditing ? 'update' : 'post'
			} Webhook message, validate your input and/or check the dev console for more details. Make sure you have no browser extensions that are blocking discord.com, i.e. Privacy Badger`,
			timeout: 5,
			pauseOnHover: true
		});
	} finally {
		loadingStorage.endLoading();
	}
}
</script>
