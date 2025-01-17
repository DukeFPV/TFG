import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { messages } from "@/lib/db/schema"

export async function POST(req: Request) {
  const { userId } = await auth()
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { chatId, content, role } = await req.json()

    // Save message to DB
    await db
      .insert(messages)
      .values({
        chatId,
        content,
        role,
        createdAt: new Date(),
      })
      .execute()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving message:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
