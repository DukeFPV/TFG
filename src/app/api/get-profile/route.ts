import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { user_profiles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email');
  if (!email) {
    return NextResponse.json({ error: 'Email no proporcionado' }, { status: 400 });
  }

  const userData = await db.select()
    .from(user_profiles)
    .where(eq(user_profiles.email, email))
    .limit(1);

  // Comprobar si el usuario existe
  if (userData.length === 0) {
    return NextResponse.json({ user: null });
  }

  return NextResponse.json({ user: userData[0] });
}
