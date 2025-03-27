import { z } from 'zod';
import { persistedStorageEntrySchema } from '~~/lib/schemas/persistedStorageEntrySchema';

export const postSchema = z.object({
	webhookUrl: persistedStorageEntrySchema.required(),
	text: z.string({ required_error: 'The text to post with the webhook is required.' }),
	role: persistedStorageEntrySchema.nullable()
});
