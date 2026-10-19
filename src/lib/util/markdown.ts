/** Wrap Mermaid source in a fenced block that can be pasted directly into Markdown. */
export const toMermaidMarkdown = (code: string): string =>
  `\`\`\`mermaid\n${code}${code.endsWith('\n') ? '' : '\n'}\`\`\``;
