import { linkEscapeRegex, linkEscapeReplacer } from '~~/lib/utils/LinkReplacer';

const newLineElement = '<div></div>';

/**
 * Converts markdown text to Discord web-components.
 *
 * @param markdown The markdown text to convert.
 * @returns The converted web-components.
 */
export function markdownToDiscordWebComponents(markdown: string) {
	const rolesStorage = useRoles();

	const linkEscapedMarkdown = markdown.replace(linkEscapeRegex, linkEscapeReplacer).replaceAll('_ _', '<br/>');
	const lines = linkEscapedMarkdown.split('\n');
	const result: string[] = [];

	let isParsingInsideCodeBlock = false;
	let codeBlockLines: string[] = [];
	let language: string | null = null;

	for (const element of lines) {
		const replacedElement = element
			.replaceAll(/^(-#) (.+)$/g, '<discord-subscript>$2</discord-subscript>')
			.replaceAll(/(?<hashes>#{1,3}) (.+)/g, (__, hashes, text) => `<discord-header level="${hashes.length}">${text}</discord-header>`)
			.replaceAll(/^(>{1,3}) (.+)$/g, '<discord-quote>$2</discord-quote>')
			.replaceAll(/(\*\*)(.+?)\1/g, '<discord-bold>$2</discord-bold>')
			.replaceAll(/(\*)(.+?)\1/g, '<discord-italic>$2</discord-italic>')
			.replaceAll(/(__)(.+?)\1/g, '<discord-underlined>$2</discord-underlined>')
			.replaceAll(/(\|\|)(.+?)\1/g, '<discord-spoiler>$2</discord-spoiler>')
			.replaceAll(/(`{1,2})(.+?)\1/g, '<discord-code>$2</discord-code>')
			.replaceAll(/\[([^\]]+)\]\(<([^>]+)>\)/g, '<discord-link href="$2" target="_blank" rel="noreferrer">$1</discord-link>')
			.replaceAll(/<(t:\d+:[tTdDfFR])>/g, '<discord-time>&lt;$1&gt;</discord-time>')
			.replaceAll(/<\/(\w+):\d{18,21}>/g, '<discord-mention type="slash">$1</discord-mention>')
			.replaceAll(/<@(\d{18,21})>/g, '<discord-mention type="user">$1</discord-mention>')
			.replaceAll(/<#(\d{18,21})>/g, '<discord-mention type="channel">$1</discord-mention>')
			.replaceAll(/<@&(\d{18,21})>/g, (_, p1) => {
				const roleLabel = rolesStorage.getRoleById(p1);
				return `<discord-mention type="role">${roleLabel ?? p1}</discord-mention>`;
			});

		if (replacedElement.startsWith('```')) {
			// End of a codeblock
			if (isParsingInsideCodeBlock) {
				const codeBlock = `<discord-code multiline language="${language}">` + codeBlockLines.join('\n') + '\n</discord-code>';
				result.push(codeBlock);
				result.push(newLineElement);
				codeBlockLines = [];
				language = null;
				isParsingInsideCodeBlock = false;
			} else {
				// Start of a code block
				language = replacedElement.slice(3);
				isParsingInsideCodeBlock = true;
			}
		} else if (isParsingInsideCodeBlock) {
			codeBlockLines.push(replacedElement);
		} else {
			result.push(replacedElement);
			result.push(newLineElement);
		}
	}

	return result.join('\n');
}
