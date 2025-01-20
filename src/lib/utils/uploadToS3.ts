//! NOTA: No se ha implementado la subida de archivos mp3 a S3 generados por TTS
//! Genera multiples archivos mp3 de cada chunk de texto generado por TTS

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { v4 as uuidv4 } from "uuid"
import dotenv from "dotenv"

dotenv.config()

const {
  NEXT_PUBLIC_S3_ACCESS_KEY_ID,
  NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
  NEXT_PUBLIC_S3_REGION_NAME,
  NEXT_PUBLIC_S3_BUCKET_NAME,
} = process.env

// Validar variables de entorno
if (
  !NEXT_PUBLIC_S3_ACCESS_KEY_ID ||
  !NEXT_PUBLIC_S3_SECRET_ACCESS_KEY ||
  !NEXT_PUBLIC_S3_REGION_NAME ||
  !NEXT_PUBLIC_S3_BUCKET_NAME
) {
  throw new Error(
    "Una o más variables de entorno de AWS no están configuradas.",
  )
}

// Inicializar cliente S3
const s3 = new S3Client({
  credentials: {
    accessKeyId: NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
  },
  region: NEXT_PUBLIC_S3_REGION_NAME,
})

/**
 * Sube un buffer de audio a S3 y devuelve la clave del objeto.
 * @param audioBuffer - Los datos de audio como un Buffer.
 * @returns La clave del objeto en S3.
 */
export const uploadAudioStreamToS3 = async (
  audioBuffer: Buffer,
): Promise<string> => {
  const remotePath = `audios/uploads/${uuidv4()}.mp3`

  try {
    await s3.send(
      new PutObjectCommand({
        Bucket: NEXT_PUBLIC_S3_BUCKET_NAME,
        Key: remotePath,
        Body: audioBuffer,
        ContentType: "audio/mpeg",
      }),
    )
    return remotePath
  } catch (error) {
    console.error("Error subiendo a S3:", error)
    throw new Error("Error al subir el audio a S3")
  }
}

/**
 * Genera una URL prefirmada para el objeto subido en S3.
 * @param objectKey - La clave del objeto en S3.
 * @returns La URL prefirmada.
 */
export const generatePresignedUrl = async (
  objectKey: string,
): Promise<string> => {
  const getObjectParams = {
    Bucket: NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: objectKey,
    Expires: 3600, // URL válida por 1 hora
  }

  try {
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    return url
  } catch (error) {
    console.error("Error generando URL prefirmada:", error)
    throw new Error("Error al generar la URL prefirmada")
  }
}
