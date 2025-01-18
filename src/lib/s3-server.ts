//**Revisado */
/**
 * Descarga un archivo de Amazon S3 y lo guarda localmente.
 *
 * @param file_key - Archivo en el bucket S3
 * @returns Promise<string> - Devuelve una promesa que se resuelve con la ruta del archivo local
 * @throws Lanzará un error si falla el proceso de descarga o escritura del archivo
 *
 * @remarks
 * La función crea un archivo temporal en el directorio /tmp con un nombre único basado en timestamp.
 * Utiliza AWS SDK v3 y requiere que las credenciales S3 estén configuradas en variables de entorno:
 * - NEXT_PUBLIC_S3_ACCESS_KEY_ID
 * - NEXT_PUBLIC_S3_SECRET_ACCESS_KEY
 * - NEXT_PUBLIC_S3_BUCKET_NAME
 *
 * @example
 * ```typescript
 * try {
 *   const localPath = await downLoadFromS3('ruta/al/archivo.pdf');
 *   console.log('Archivo descargado de:', localPath);
 * } catch (error) {
 *   console.error('Falló la descarga:', error);
 * }
 * ```
 */

import { S3 } from "@aws-sdk/client-s3"
import fs from "fs"

export async function downLoadFromS3(file_key: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const s3 = new S3({
        region: "eu-west-3",
        credentials: {
          accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
        },
      })
      const params = {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
        Key: file_key,
      }

      const obj = await s3.getObject(params)
      const file_name = `/tmp/sara-ia-${Date.now().toString()}.pdf`

      if (obj.Body instanceof require("stream").Readable) {
        // AWS-SDK v3 has some issues with their typescript definitions, but this works
        // https://github.com/aws/aws-sdk-js-v3/issues/843
        //open the writable stream and write the file
        const file = fs.createWriteStream(file_name)

        file.on("open", function (fd) {
          // @ts-expect-error error reconocido
          obj.Body?.pipe(file).on("finish", () => {
            return resolve(file_name)
          })
        })
      }
    } catch (error) {
      console.error(error)
      reject(error)
      return null
    }
  })
}
