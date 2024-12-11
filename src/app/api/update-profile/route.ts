import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { user_profiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userEmail, age, genero, provincia, telefono, birthday } = body;
    if (!userEmail) {
      return NextResponse.json({ error: 'Email no proporcionado' }, { status: 400 });
    }

    await db.update(user_profiles)
      .set({
        age,
        genero,
        provincia,
        telefono,
        birthday: birthday ?? null,
      })
      .where(eq(user_profiles.email, userEmail));

    return NextResponse.json({ success: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error al actualizar perfil:', error);
    return NextResponse.json({ error: 'Error al actualizar perfil' }, { status: 500 });
  }
}
