import { linkEscapeRegex, linkEscapeReplacer } from '~~/lib/utils/LinkReplacer';

const newLineElement = '<div></div>';

/**
 * Converts markdown text to Discord web-components.
 *
 * @param markdown The markdown text to convert.
 * @returns The converted web-components.
 */
export function markdownToDiscordWebComponents(markdown: string) {
	const linkEscapedMarkdown = markdown.replace(linkEscapeRegex, linkEscapeReplacer).replaceAll('_ _', '');
	const lines = linkEscapedMarkdown.split('\n');
	const result: string[] = [];

	let isParsingInsideCodeBlock = false;
	let codeBlockLines: string[] = [];
	let language: string | null = null;

	for (let element of lines) {
		element = element.replaceAll(
			/(?<hashes>#{1,3}) (.+)/g,
			(__, hashes, text) => `<discord-header level="${hashes.length}">${text}</discord-header>`
		);

		element = element.replaceAll(/^(>{1,3}) (.+)$/g, '<discord-quote>$2</discord-quote>');
		element = element.replaceAll(/(\*\*)(.+?)\1/g, '<discord-bold>$2</discord-bold>');
		element = element.replaceAll(/(\*)(.+?)\1/g, '<discord-italic>$2</discord-italic>');
		element = element.replaceAll(/(__)(.+?)\1/g, '<discord-underlined>$2</discord-underlined>');
		element = element.replaceAll(/(\|\|)(.+?)\1/g, '<discord-spoiler>$2</discord-spoiler>');
		element = element.replaceAll(/(`){1}(?!``)(.+)\1/g, '<discord-code>$2</discord-code>');
		element = element.replaceAll(/\[([^\]]+)\]\(<([^>]+)>\)/g, '<discord-link href="$2" target="_blank" rel="noreferrer">$1</discord-link>');
		element = element.replaceAll(/<(t:[0-9]+:[tTdDfFR])>/g, '<discord-time>&lt;$1&gt;</discord-time>');

		if (element.startsWith('```')) {
			// End of a codeblock
			if (isParsingInsideCodeBlock) {
				let codeBlock = `<discord-code multiline language="${language}">` + codeBlockLines.join('\n') + '\n</discord-code>';
				result.push(codeBlock);
				result.push(newLineElement);
				codeBlockLines = [];
				language = null;
				isParsingInsideCodeBlock = false;
			} else {
				// Start of a code block
				language = element.slice(3);
				isParsingInsideCodeBlock = true;
			}
		} else if (isParsingInsideCodeBlock) {
			codeBlockLines.push(element);
		} else {
			result.push(element);
			result.push(newLineElement);
		}
	}

	return result.join('\n');
}
