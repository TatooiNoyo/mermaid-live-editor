import { describe, expect, it } from 'vitest';
import { toMermaidMarkdown } from './markdown';

describe('toMermaidMarkdown', () => {
  it('creates a fenced Mermaid block containing only the diagram source', () => {
    expect(toMermaidMarkdown('flowchart TD\n  A --> B')).toBe(
      '```mermaid\nflowchart TD\n  A --> B\n```'
    );
  });

  it('does not add an extra blank line when the source has a trailing newline', () => {
    expect(toMermaidMarkdown('flowchart TD\n')).toBe('```mermaid\nflowchart TD\n```');
  });
});
