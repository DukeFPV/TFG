import { db } from '@/lib/db';
import { chats, messages as messagesTable } from '@/lib/db/schema';
import { eq, or } from 'drizzle-orm';

interface ChatMessage {
  content: string;
  role: 'user' | 'system' | 'assistant';
}

export async function saveChat({
  id,
  messages,
  //userId,
}: {
  id: number;
  messages: ChatMessage[];
  userId: string;
}) {
  try {
    for (const message of messages) {
      await db.insert(messagesTable).values({
        chatId: id,
        content: message.content,
        role: message.role,
        createdAt: new Date(),
      });
    }
  } catch (error) {
    console.error('Error al guardar el chat en la base de datos:', error);
    throw error;
  }
}

// Function to get accessible chats
export async function getAccessibleChats(userId: string) {
  return await db
    .select()
    .from(chats)
    .where(
      or(
        eq(chats.userId, userId),
        eq(chats.isPublic, true)
      )
    );
}