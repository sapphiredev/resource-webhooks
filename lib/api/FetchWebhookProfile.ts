import type { DiscordMessage } from '@skyra/discord-components-core/discord-message.js';
import { RouteBases, Routes, type RESTGetAPIWebhookWithTokenResult } from 'discord-api-types/rest/v10';
import type { Post } from '~~/lib/types/Post';

export async function fetchWebhookProfile(webhook: Post['webhookUrl'], isUpdating: boolean = false): Promise<Partial<DiscordMessage>> {
	if (!webhook) throw 'No webhook URL provided.';

	const loadingStorage = useLoadingStore();

	const [hookID, hookToken] = webhook.value.split('/').slice(-2);

	if (!hookID || !hookToken) throw 'Unable to extract webhook ID and token.';

	const url = RouteBases.api + Routes.webhook(hookID, hookToken);

	loadingStorage.startLoading();

	try {
		const response = await $fetch<RESTGetAPIWebhookWithTokenResult>(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		loadingStorage.endLoading();

		return {
			avatar: `https://cdn.discordapp.com/avatars/${response.id}/${response.avatar}.png?size=4096`,
			author: response.name ?? 'Configured Webhook',
			ephemeral: false,
			bot: true,
			edited: isUpdating,
			timestamp: new Date(),
			twentyFour: true
		};
	} catch {
		throw 'Unable to fetch webhook profile.';
	}
}
