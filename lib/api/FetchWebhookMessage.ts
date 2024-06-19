import { RouteBases, Routes, type RESTGetAPIChannelMessageResult } from 'discord-api-types/v10';

export async function fetchWebhookMessage(webhookUrl: string | null, messageId: string): Promise<string | null> {
	if (!webhookUrl) return null;

	const [hookID, hookToken] = webhookUrl.split('/').slice(-2);

	const url = RouteBases.api + Routes.webhookMessage(hookID, hookToken, messageId);

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
