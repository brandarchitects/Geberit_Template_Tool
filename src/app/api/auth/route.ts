import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

const COOKIE_NAME = 'geberit_auth';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    const expected = process.env.EDITOR_PASSWORD;

    if (!expected) {
      return NextResponse.json(
        { error: 'Server not configured. Set EDITOR_PASSWORD environment variable.' },
        { status: 503 }
      );
    }

    if (!password || password !== expected) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set(COOKIE_NAME, 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE,
      path: '/',
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return response;
}
