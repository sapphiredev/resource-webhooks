import { z } from 'zod';
import { WebhookRegex } from '~~/lib/utils/DiscordRegexes';

export const addOrEditWebhookSchema = (isUpdating: boolean) => {
	const webhookStorage = useWebhooks();

	return z.object({
		value: z
			.string({ required_error: 'The webhook URL is required.' })
			.regex(WebhookRegex, 'The webhook URL is invalid.')
			.refine((value) => isUpdating || !webhookStorage.hasWebhook(value), {
				message: 'The webhook URL is already in use, please enter another one.'
			}),
		label: z
			.string({ required_error: 'The webhook label is required.' })
			.min(3, 'The webhook label should at least be 3 characters long.')
			.max(50, 'The webhook label can at most be 50 characters long.')
	});
};
