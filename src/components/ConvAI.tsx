// archivo del repositorio de 11labs
"use client"

import {Button} from "@/components/ui/button";
import * as React from "react";
import {useState} from "react";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Conversation} from "@11labs/client";
import {cn} from "@/lib/utils";
import Image from "next/image";
// import { useConversation } from '@11labs/react';
// import { useCallback } from 'react';



async function requestMicrophonePermission() {
    try {
        await navigator.mediaDevices.getUserMedia({audio: true})
        return true
    } catch {
        console.error('Permiso al microfono denegado')
        return false
    }
}

async function getSignedUrl(): Promise<string> {
    const response = await fetch('/api/signed-url')
    if (!response.ok) {
        throw Error('Error al obtener signed-url')
    }
    const data = await response.json()
    return data.signedUrl
}

export function ConvAI() {
    const [conversation, setConversation] = useState<Conversation | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)

    async function startConversation() {
        const hasPermission = await requestMicrophonePermission()
        if (!hasPermission) {
            alert('No hay permiso para acceder al microfono')
            return;
        }
        const signedUrl = await getSignedUrl()
        const conversation = await Conversation.startSession({
            signedUrl: signedUrl,
            onConnect: () => {
                setIsConnected(true)
                setIsSpeaking(true)
            },
            onDisconnect: () => {
                setIsConnected(false)
                setIsSpeaking(false)
            },
            onError: (error) => {
                console.log(error)
                alert('Un error ha ocurrido durante la conversación')
            },
            onModeChange: ({mode}) => {
                setIsSpeaking(mode === 'speaking')
            },
        })
        setConversation(conversation)
    }

    async function endConversation() {
        if (!conversation) {
            return
        }
        await conversation.endSession()
        setConversation(null)
    }

    return (
        <div className={"flex justify-center items-center gap-x-4"}>
            <Card className={'rounded-3xl'}>
                <CardContent>
                    <CardHeader>
                        <CardTitle className={'text-center'}>
                            {isConnected ? (
                                isSpeaking ? `Sara está hablando` : 'Sara está escuchando'
                            ) : (
                                'Desconectado'
                            )}
                        </CardTitle>
                    </CardHeader>
                    <div className={'flex flex-col gap-y-4 text-center'}>
                        <div className={'rounded-3xl'}>
                          <Image 
                            src="/icons/sara-avatar.png" 
                            alt="SARA" 
                            width={150} 
                            height={150} 
                            className="mx-auto w-[80px] h-[80px] md:w-[150px] md:h-[150px] rounded-full"
                          />
                        </div>


                        <Button
                            variant={'outline'}
                            className={'rounded-full'}
                            size={"lg"}
                            disabled={conversation !== null && isConnected}
                            onClick={startConversation}
                        >
                            Empezar conversación
                        </Button>
                        <Button
                            variant={'outline'}
                            className={'rounded-full'}
                            size={"lg"}
                            disabled={conversation === null && !isConnected}
                            onClick={endConversation}
                        >
                            Finalizar conversación
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

// export function Conversation() {
//   const conversation = useConversation({
//     onConnect: () => console.log('Connected'),
//     onDisconnect: () => console.log('Disconnected'),
//     onMessage: (message) => console.log('Message:', message),
//     onError: (error) => console.error('Error:', error),
//   });


//   const startConversation = useCallback(async () => {
//     try {
//       // Request microphone permission
//       await navigator.mediaDevices.getUserMedia({ audio: true });

//       // Start the conversation with your agent
//       await conversation.startSession({
//         agentId: 'YOUR_AGENT_ID', // TODO Replace with your agent ID
//       });

//     } catch (error) {
//       console.error('Failed to start conversation:', error);
//     }
//   }, [conversation]);

//   const stopConversation = useCallback(async () => {
//     await conversation.endSession();
//   }, [conversation]);

//   return (
//     <div className="flex flex-col items-center gap-4">
//       <div className="flex gap-2">
//         <button
//           onClick={startConversation}
//           disabled={conversation.status === 'connected'}
//           className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//         >
//           Start Conversation
//         </button>
//         <button
//           onClick={stopConversation}
//           disabled={conversation.status !== 'connected'}
//           className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-300"
//         >
//           Stop Conversation
//         </button>
//       </div>

//       <div className="flex flex-col items-center">
//         <p>Status: {conversation.status}</p>
//         <p>Agent is {conversation.isSpeaking ? 'speaking' : 'listening'}</p>
//       </div>
//     </div>
//   );
// }
