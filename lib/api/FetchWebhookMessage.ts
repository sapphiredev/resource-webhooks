import { RouteBases, Routes, type RESTGetAPIChannelMessageResult } from 'discord-api-types/v10';
import type { Update } from '~~/lib/types/Update';

export async function fetchWebhookMessage(updateData: Update): Promise<string | null> {
	if (!updateData.webhookUrl) return null;

	const [hookID, hookToken] = updateData.webhookUrl.value.split('/').slice(-2);

	const url = RouteBases.api + Routes.webhookMessage(hookID, hookToken, updateData.messageId);

	try {
		const response = await $fetch<RESTGetAPIChannelMessageResult>(url, {
			headers: {
				'Content-Type': 'application/json'
			}
		});

		return response.content;
	} catch {
		return null;
	}
}
