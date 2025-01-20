//**Revisado */
/**
 * Sube un archivo al un bucket de Amazon S3.
 *
 * @param file - El archivo que se subirá a S3
 * @returns Promesa que se resuelve en un objeto que contiene:
 *          - file_key: El identificador único/ruta del archivo en S3
 *          - file_name: El nombre original del archivo subido
 * @throws Lanzará un error si la subida a S3 falla
 *
 * @example
 * ```typescript
 * const file = new File(['contenido'], 'ejemplo.pdf');
 * const result = await uploadToS3(file);
 * console.log(result.file_key); // 'uploads/1234567890ejemplo.pdf'
 * console.log(result.file_name); // 'ejemplo.pdf'
 * ```
 */

import { PutObjectCommandOutput, S3 } from "@aws-sdk/client-s3"

export async function uploadToS3(
  file: File,
): Promise<{ file_key: string; file_name: string }> {
  return new Promise((resolve, reject) => {
    try {
      const s3 = new S3({
        region: "eu-west-3",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      })

      // Ruta en S3 donde se guardará el archivo con un nombre único
      const file_key =
        "uploads/" + Date.now().toString() + file.name.replace(" ", "-")

      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
        Body: file,
      }
      s3.putObject(
        params,
        (err: any, data: PutObjectCommandOutput | undefined) => {
          return resolve({
            file_key,
            file_name: file.name,
          })
        },
      )
    } catch (error) {
      reject(error)
    }
  })
}

// Se obtiene la URL del archivo en S3
export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.eu-west-3.amazonaws.com/${file_key}`
  return url
}
