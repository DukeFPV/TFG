/**
 * //!! Este archivo es un ejemplo de cómo descargar los audios generados y almacenados en un archivo de AWS S3 y guardarlo localmente
 * !! NOTA: Este archivo no se utiliza en el proyecto, es solo un ejemplo de cómo descargar un archivo de AWS S3 y guardarlo localmente
 */
import { S3 } from "@aws-sdk/client-s3"
import fs from "fs"
import { Readable } from "stream"

/**
 * Descarga un objeto de S3 a un archivo local (ejemplo).
 * Retorna la ruta en /tmp/ del archivo descargado
 */
export async function downLoadFromS3(file_key: string): Promise<string | null> {
  try {
    const s3 = new S3({
      region: process.env.AWS_REGION_NAME!,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    })

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: file_key,
    }
    const obj = await s3.getObject(params)

    const file_name = `/tmp/sara-ia-${Date.now()}.mp3`
    const bodyStream = obj.Body

    if (bodyStream instanceof Readable) {
      const fileWriteStream = fs.createWriteStream(file_name)

      // Guardar el archivo
      await new Promise<void>((resolve, reject) => {
        bodyStream.pipe(fileWriteStream)
        bodyStream.on("error", reject)
        fileWriteStream.on("finish", () => resolve())
        fileWriteStream.on("error", reject)
      })

      return file_name
    } else {
      // no es un stream
      return null
    }
  } catch (error) {
    console.error("Error downLoadFromS3 =>", error)
    return null
  }
}
