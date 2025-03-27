import { z } from 'zod';
import { SnowflakeRegex } from '~~/lib/utils/DiscordRegexes';

export const addOrEditRoleSchema = (isUpdating: boolean) => {
	const rolesStorage = useRoles();

	return z.object({
		value: z
			.string({ required_error: 'The role snowflake is required.' })
			.regex(SnowflakeRegex, 'The role snowflake is invalid.')
			.refine((value) => isUpdating || !rolesStorage.hasRole(value), {
				message: 'The role snowflake is already in use, please enter another one.'
			}),
		label: z
			.string({ required_error: 'The role label is required.' })

			.min(3, 'The role label should at least be 3 characters long.')
			.max(50, 'The role label can at most be 50 characters long.')
	});
};
