<!-- eslint-disable vue/no-v-html -->
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
				<button aria-label="Cancel" type="button" class="btn btn-error text-white" @click="emits('close-modal')">Cancel</button>
				<button
					v-show="status !== 'pending' && !error && data !== null"
					aria-label="Confirm and post"
					type="button"
					class="btn btn-primary text-white"
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

import type { Update } from '~/lib/types/Update';
import { showToast } from '~/lib/utils/ShowToast';
import { fetchWebhookProfile } from '~~/lib/api/FetchWebhookProfile';
import { sendWebhookMessage } from '~~/lib/api/SendWebhookMessage';
import type { Post } from '~~/lib/types/Post';
import { markdownToDiscordWebComponents } from '~~/lib/utils/MarkdownToDiscordWebComponents';
import { subscript } from '~/lib/utils/Formatters';

const emits = defineEmits(['close-modal', 'reset-form']);
const props = defineProps<{ values: Post | Update; isEditing: boolean }>();

const { data, status, error } = useAsyncData('webhookProfile', () => fetchWebhookProfile(props.values.webhookUrl));
const loadingStorage = useLoadingStore();

const parseMarkdownishInput = () => {
	let parsedText = props.values.text;
	if (props.values.role && !props.values.text.startsWith(subscript('New announcement for'))) {
		parsedText = `${subscript('New announcement for')} @${props.values.role.label.replace(/(.+) - \d{18,}/, '$1')}:\n${props.values.text}`;
	}

	return markdownToDiscordWebComponents(parsedText);
};

async function handleConfirm() {
	try {
		loadingStorage.startLoading();

		await sendWebhookMessage(
			{ role: props.values.role, text: props.values.text, webhookUrl: props.values.webhookUrl, messageId: (props.values as Update).messageId },
			props.isEditing ? 'update' : 'post'
		);

		emits('reset-form');
		emits('close-modal');

		showToast({
			type: 'success',
			message: `Successfully ${props.isEditing ? 'updated' : 'posted'} Webhook message!`,
			timeout: 5,
			pauseOnHover: true
		});
	} catch {
		showToast({
			type: 'denied',
			message: `Failed to ${
				props.isEditing ? 'update' : 'post'
			} Webhook message, validate your input and/or check the dev console for more details. Make sure you have no browser extensions that are blocking discord.com, i.e. Privacy Badger`,
			timeout: 5,
			pauseOnHover: true
		});
	} finally {
		loadingStorage.endLoading();
	}
}
</script>
