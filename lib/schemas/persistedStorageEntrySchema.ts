import { z } from 'zod';

export const persistedStorageEntrySchema = z.object({
	label: z.string({ required_error: 'Label for the autocomplete option is required' }),
	value: z.string({ required_error: 'Value for the autocomplete option is required' })
});
