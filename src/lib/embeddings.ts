//**Revisado */
/**
 * Genera embeddings para el texto dado utilizando la API de OpenAI.
 *
 * @param text - El texto de entrada para generar embeddings.
 * @returns Una promesa que se resuelve en un array de números que representan los embeddings.
 * @throws Lanzará un error si la respuesta de OpenAI es inválida o si hay un problema con la llamada a la API.
 */

import { OpenAIApi, Configuration } from "openai-edge"

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(config)

export async function getEmbeddings(text: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-3-small",
      input: text.replace(/\n/g, " "),
    })

    const result = await response.json()

    if (!result.data || !result.data[0] || !result.data[0].embedding) {
      //console.log("Invalid response from OpenAI:", result)
      throw new Error("Invalid embedding response structure")
    }

    return result.data[0].embedding as number[]
  } catch (error) {
    //console.log("Error en la llamada a OpenAI embeddings API", error)
    throw error
  }
}
