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

// Validate environment variables
if (
  !NEXT_PUBLIC_S3_ACCESS_KEY_ID ||
  !NEXT_PUBLIC_S3_SECRET_ACCESS_KEY ||
  !NEXT_PUBLIC_S3_REGION_NAME ||
  !NEXT_PUBLIC_S3_BUCKET_NAME
) {
  throw new Error("One or more AWS environment variables are not set.")
}

// Initialize S3 Client
const s3 = new S3Client({
  credentials: {
    accessKeyId: NEXT_PUBLIC_S3_ACCESS_KEY_ID,
    secretAccessKey: NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
  },
  region: NEXT_PUBLIC_S3_REGION_NAME,
})

/**
 * Uploads an audio buffer to S3 and returns the object key.
 * @param audioBuffer - The audio data as a Buffer.
 * @returns The S3 object key.
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
    console.error("Error uploading to S3:", error)
    throw new Error("Failed to upload audio to S3")
  }
}

/**
 * Generates a presigned URL for the uploaded S3 object.
 * @param objectKey - The S3 object key.
 * @returns The presigned URL.
 */
export const generatePresignedUrl = async (
  objectKey: string,
): Promise<string> => {
  const getObjectParams = {
    Bucket: NEXT_PUBLIC_S3_BUCKET_NAME,
    Key: objectKey,
    Expires: 3600, // URL valid for 1 hour
  }

  try {
    const command = new GetObjectCommand(getObjectParams)
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
    return url
  } catch (error) {
    console.error("Error generating presigned URL:", error)
    throw new Error("Failed to generate presigned URL")
  }
}
