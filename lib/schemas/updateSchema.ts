import { z } from 'zod';
import { postSchema } from '~~/lib/schemas/postSchema';

export const updateSchema = postSchema.merge(
	z.object({
		messageId: z.string({ required_error: 'You have to provide the message ID of the message to update.' })
	})
);
