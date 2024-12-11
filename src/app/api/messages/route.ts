import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { eq, asc } from "drizzle-orm";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { chatId, content, role } = body;

    const message = await db
      .insert(messages)
      .values({
        chatId,
        content,
        role,
      })
      .returning({
        id: messages.id,
        content: messages.content,
        role: messages.role,
        createdAt: messages.createdAt,
      });

    return NextResponse.json(message[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error saving message" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const chatId = url.searchParams.get("chatId");

  if (!chatId) {
    return NextResponse.json({ error: "Chat ID requerido" }, { status: 400 });
  }

  try {

    // Asegurarse de que el chatId es un número
    const numericChatId = parseInt(chatId);
    if (isNaN(numericChatId)) {
      return NextResponse.json({ error: "Chat Id incorrecto" }, { status: 400 });
    }

    const savedMessages = await db
      .select()
      .from(messages)
      .where(eq(messages.chatId, parseInt(chatId)))
      .orderBy(asc(messages.createdAt));

    return NextResponse.json(savedMessages);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error retrieving messages" },
      { status: 500 }
    );
  }
}