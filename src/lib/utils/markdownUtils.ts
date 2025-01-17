import { marked } from "marked"

const markdownCache: Map<string, string[]> = new Map()

export function parseMarkdownIntoBlocks(markdown: string): string[] {
  if (markdownCache.has(markdown)) {
    return markdownCache.get(markdown) as string[]
  }
  const tokens = marked.lexer(markdown)
  const blocks = tokens.map((token) => token.raw)
  markdownCache.set(markdown, blocks)
  return blocks
}
