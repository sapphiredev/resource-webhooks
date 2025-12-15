/**
 * Formats the content into subscript text.
 *
 * @typeParam Content - This is inferred by the supplied content
 * @param content - The content to wrap
 */
export function subscript<Content extends string>(content: Content): `-# ${Content}` {
	return `-# ${content}`;
}

/**
 * Formats a role id into a role mention.
 *
 * @typeParam RoleId - This is inferred by the supplied role id
 * @param roleId - The role id to format
 */
export function roleMention<RoleId extends string>(roleId: RoleId): `<@&${RoleId}>` {
	return `<@&${roleId}>`;
}
