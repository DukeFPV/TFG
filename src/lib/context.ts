//**Revisado */
/**
 * Recupera el contexto relevante de un documento basado en una consulta utilizando búsqueda de similitud basada en embeddings.
 *
 * @param query - La cadena de consulta de búsqueda para encontrar contexto relevante
 * @param fileKey - La clave identificadora del archivo/documento en el que buscar
 * @returns Promise que se resuelve en una cadena que contiene los pasajes de texto relevantes concatenados,
 *          limitado a 3000 caracteres
 *
 * @remarks
 * La función realiza los siguientes pasos:
 * 1. Genera embeddings para la consulta de entrada
 * 2. Encuentra pasajes coincidentes usando los embeddings
 * 3. Filtra las coincidencias con una puntuación de similitud > 0.5
 * 4. Extrae y concatena el texto de las coincidencias que califican
 *
 * @example
 * ```typescript
 * const contexto = await getContext("¿Qué es la IA?", "documento-123");
 * ```
 */

import { Pinecone } from "@pinecone-database/pinecone"
import { convertToAscii } from "./utils"
import { getEmbeddings } from "./embeddings"

export async function getMatchesFromEmbeddings(
  embeddings: number[],
  fileKey: string,
) {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  })

  try {
    const pineconeIndex = pinecone.Index("sara-ia")
    const namespace = pineconeIndex.namespace(convertToAscii(fileKey))

    const queryResult = await namespace.query({
      topK: 5,
      vector: embeddings,
      includeMetadata: true,
    })

    return queryResult.matches || []
  } catch (error) {
    console.log("Error en context obteniendo la petición", error)
    throw error
  }
}

export async function getContext(query: string, fileKey: string) {
  // Obteniendo embeddings de la consulta
  const queryEmbeddings = await getEmbeddings(query)
  // console.log('Query Embeddings:', queryEmbeddings); //Log Debug

  // Obteniendo coincidencias de embeddings
  const matches = await getMatchesFromEmbeddings(queryEmbeddings, fileKey)
  //console.log("Matches:", matches) //Log Debug

  // Filtrando coincidencias con puntuación de similitud > 0.5 //?? Por defecto modificar en caso de ser necesario
  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.5,
  )
  //console.log("Qualifying Docs:", qualifyingDocs) //Log Debug

  // Extrayendo y concatenando texto de coincidencias
  type Metadata = {
    text: string
    pageNumber: number
  }

  const docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text)
  //console.log("Docs:", docs) //Log Debug

  // Limitando la longitud de la respuesta a 3000 caracteres
  return docs.join("\n").substring(0, 3000)
}
