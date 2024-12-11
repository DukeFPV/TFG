'use client'
import { uploadToS3 } from '@/lib/s3'
import { useMutation } from '@tanstack/react-query'
import { Inbox, Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

const ADMIN_ID = 'user_2ooPGvdai0IRYfKUmWh7T5y3rxp'

interface FileUploadProps {
  onUploadSuccess?: (chat_id: number) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const router = useRouter()
  const { user } = useUser()
  const [uploading, setUploading] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ file_key, file_name }: { file_key: string; file_name: string }) => {
      const response = await axios.post('/api/create-chat', { file_key, file_name })
      return response.data
    },
  })

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file.size > 10 * 1024 * 1024) {
        toast.error('El archivo es demasiado grande')
        return
      }

      try {
        setUploading(true)
        const data = await uploadToS3(file)
        if (!data?.file_key || !data?.file_name) {
          toast.error('Algo salió mal')
          return
        }
        mutate(data, {
          onSuccess: ({ chat_id }) => {
            toast.success('Chat creado!')
            // Llamamos a la función para notificar el ID del chat creado
            if (onUploadSuccess) {
              onUploadSuccess(chat_id)
            } else {
              // Por si no se pasa la función, navegación por defecto
              router.push(`/sara-ia/${chat_id}`)
              router.refresh()
            }
          },
          onError: (err) => {
            toast.error('Error al crear el chat')
            console.log('Error en mutate de FileUpload', err)
          },
        })

      } catch (error) {
        console.log(error)
      } finally {
        setUploading(false)
      }
    },
  })

  // Si no es admin, no mostrar el componente (aunque ya se filtra en el backend)
  if (!user || user.id !== ADMIN_ID) {
    return null
  }

  return (
    <div className='p-2 bg-slate-50 rounded-xl'>
      <div
        {...getRootProps({
          className: 'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col',
        })}
      >
        <input {...getInputProps()} />
        {(uploading || isPending) ? (
          <>
            <Loader2 className='h-10 w-10 animate-spin text-purple-600' />
            <p className='mt-2 text-sm text-slate-400'>Cargando a GPT...</p>
          </>
        ) : (
          <>
            <Inbox className='w-10 h-10 text-purple-500' />
            <p className='mt-2 text-sm text-slate-400'>Arrastra y suelta un archivo PDF o haz click para seleccionar uno</p>
          </>
        )}
      </div>
    </div>
  )
}

export default FileUpload
