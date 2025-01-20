//**Revisado */
/**
 * Analiza una cadena markdown y la convierte en un array de bloques markdown sin procesar.
 * Utiliza una caché para evitar analizar el mismo markdown varias veces.
 *
 * @param markdown - La cadena markdown a analizar en bloques
 * @returns Un array de cadenas de bloques markdown sin procesar
 *
 * @example
 *
 * const markdown = "# Título\n\nPárrafo"
 * const blocks = parseMarkdownIntoBlocks(markdown)
 *
 */

import { marked } from "marked"

// Caché para almacenar los bloques de markdown analizados
const markdownCache: Map<string, string[]> = new Map()

// Función para analizar una cadena markdown en bloques
export function parseMarkdownIntoBlocks(markdown: string): string[] {
  if (markdownCache.has(markdown)) {
    return markdownCache.get(markdown) as string[]
  }
  const tokens = marked.lexer(markdown)
  const blocks = tokens.map((token) => token.raw)
  markdownCache.set(markdown, blocks)
  return blocks
}
