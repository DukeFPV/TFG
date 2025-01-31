//**Revisado */
/**
 * Carga un archivo PDF desde S3 en la base de datos vectorial Pinecone
 * @param fileKey - Archivo PDF en S3 a procesar
 * @returns Promesa que se resuelve con el primer documento después del procesamiento
 * @throws Error si falla la descarga del archivo desde S3
 *
 * Esta función realiza los siguientes pasos:
 * 1. Descarga y lee el archivo PDF desde S3
 * 2. Divide el PDF en segmentos
 * 3. Crea embeddings vectoriales de los segmentos
 * 4. Sube los vectores al índice de Pinecone
 */

import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone"
import { downLoadFromS3 } from "./s3-server"
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter"
import { getEmbeddings } from "./embeddings"
import md5 from "md5"
import { convertToAscii } from "./utils"

export const getPineconeClient = () => {
  return new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  })
}

type PDFPage = {
  pageContent: string
  metadata: {
    loc: { pageNumber: number }
  }
}

export async function loadS3IntoPinecone(fileKey: string) {
  // 1. Obtener el pdf -> descargar y leer el contenido
  //console.log("Descargando el archivo desde S3")
  const file_name = await downLoadFromS3(fileKey)

  if (!file_name) {
    throw new Error("Error al descargar el archivo desde S3")
  }

  const loader = new PDFLoader(file_name)
  const pages = (await loader.load()) as PDFPage[]

  // 2. Dividir el pdf en segmentos
  const documents = await Promise.all(pages.map(prepareDocument))

  // 3. Vectorizar y subir los embeddings a Pinecone
  const vectors = await Promise.all(documents.flat().map(embedDocument))

  // 4. Agregar los vectores a Pinecone
  const client = await getPineconeClient()
  const pineconeIndex = client.Index("sara-ia")
  const namespace = pineconeIndex.namespace(convertToAscii(fileKey))

  await namespace.upsert(vectors)

  return documents[0]
}

// Obtener los embeddings de un documento
async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent)
    const hash = md5(doc.pageContent)

    return {
      id: hash,
      values: embeddings,
      metadata: {
        pageNumber: doc.metadata.pageNumber,
        text: doc.metadata.text,
      },
    } as PineconeRecord
  } catch (error) {
    //console.log("Error en los embeddings Pinecone", error)
    throw error
  }
}

// Preparar el documento para ser vectorizado
async function prepareDocument(page: PDFPage) {
  // Se elimina la advertencia de eslint sobre el uso de const en lugar de let
  let { pageContent, metadata } = page
  pageContent = pageContent.replace(/\n/g, " ")

  // Dividir el documento en segmentos
  const splitter = new RecursiveCharacterTextSplitter()
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ])
  return docs
}

// Truncar el string a un número de bytes
export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder()
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes))
}
