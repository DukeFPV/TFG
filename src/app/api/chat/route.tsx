import { streamText, convertToCoreMessages, CoreMessage } from 'ai';
import { saveChat } from '@/lib/utils/queries';
import { db } from '@/lib/db/index';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { openai } from '@ai-sdk/openai';
import { NextResponse } from 'next/server';
import { getContext } from '@/lib/context';
import { auth } from "@clerk/nextjs/server"; 

    // Metodo alternativo para  manejar los logs
    function log(message: string) {
      console.log(message);
    }

export async function POST(req: Request) {
      //log('POST function called');  //Log para debug

  try {
    // Verificación de autenticación
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messages, chatId } = await req.json();

    const coreMessages = convertToCoreMessages(messages);

        log('chatId de chatId = ' + JSON.stringify(chatId)); //Log para debug
        log('Log de messages = ' + JSON.stringify(messages)); //Log para debug

    // Validate chatId
    if (!chatId) {
      return NextResponse.json({ error: 'Chat ID is required' }, { status: 400 });
    }

    // Ensure chatId is a number
    const chatIdValue = parseInt(chatId);
    if (isNaN(chatIdValue)) {
      return NextResponse.json(
        { error: 'Invalid chat ID format' }, 
        { status: 400 }
      );
    }

        log('Type of chatId: ' + typeof chatIdValue); //Log para debug
        log('Value of chatId: ' + chatIdValue); //Log para debug

    const _chats = await db.select().from(chats).where(eq(chats.id, chatIdValue));

        log('Log de _chats = ' + JSON.stringify(_chats)); //Log para debug

    if (_chats.length !== 1) {
      return NextResponse.json({ error: 'Chat no encontrado' }, { status: 404 });
    }

    const fileKey = _chats[0].fileKey;
    const lastMessage = messages[messages.length - 1];

    const context = await getContext(lastMessage.content, fileKey);

        log('Log de context = ' + JSON.stringify(context)); //Log para debug

    // Definición de los mensajes iniciales que SARA utiliza para entender su contexto y cómo debe interactuar, se mantienen en ingles para facilitar la comprensión de la API de OpenAI
    const prompt: CoreMessage[] = [{
      // Mensaje de configuración del sistema que define el comportamiento de SARA
      role: "system",
      content:
      `You are an AI that is there to help the elderly in the use of ICT.
      You must offer a personalized level of assistance and be able to respond in a clear way, always giving continuity to the answers so that the user has at all 
      times feedback of what is happening. You will be able to analyze the user's needs in real time, adapting the instructions and recommendations to the user's requests. 
      For example, if a user reports difficulties in completing a specific task, you can provide additional step-by-step process guidance to facilitate its completion.
      In addition, you can also chat with users and additional prompts, always responding in the language in which they are speaking to you, 
      if you do not recognize the language you will always answer in Spanish. Your name is SARA and you will always respond by referring to yourself as a girl. 
      START CONTEXT BLOCK
        ${context}
      END OF CONTEXT BLOCK
      `,
    },
    {
      // Mensaje del usuario que describe sus necesidades y expectativas al interactuar con SARA
      role: "user",
      content:
      "As a SARA user, I need help in the use of ICT. You must provide me with clear instructions on how to proceed with the questions I ask you" + 
      "To receive the best possible assistance, try to clearly express your needs and questions." +
      "In order to receive the best possible assistance, you must assist me as a user without advanced knowledge in the use of ICT ," + 
      "I can ask questions about the operation of devices or software, or ask for recommendations on how to perform certain online activities. " +
      "Mostly you will try to help me with the task of making a doctor's appointment or how to navigate a bank page. " +
      "If at any point you don't understand the answer or need more information, don't hesitate to ask." +
      "Please communicate in the language in which I speak to you, and I will respond in the same language. If you do not understand me, you must respond in Spanish.",
    }];

    const response = await streamText({
      model: openai('gpt-4o-mini'),
      messages: [...prompt, ...coreMessages],
      async onFinish({ text }) {
        try {
          const userMessage = messages[messages.length - 1];
          await saveChat({ 
            id: chatIdValue, 
            messages: [{
              content: userMessage.content,
              role: 'user'
            }],
            userId: _chats[0].userId 
          });
    
          await saveChat({ 
            id: chatIdValue, 
            messages: [{
              content: text,
              role: 'assistant'
            }],
            userId: _chats[0].userId 
          });
        } catch (error) {
          console.error('Failed to save chat:', error);
        }
      },
    });

    return response.toDataStreamResponse();
  } catch (error) {
    console.error('Error in POST /api/chat:', error);
    log('error en chat/route ' + (error as Error).message);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

