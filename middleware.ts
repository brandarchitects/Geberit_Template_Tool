import { NextRequest, NextResponse } from 'next/server';

const COOKIE_NAME = 'geberit_auth';

const PUBLIC_PATHS = ['/login', '/api/auth', '/_next', '/favicon.ico', '/images', '/fonts'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow public paths
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const authCookie = req.cookies.get(COOKIE_NAME);

  if (!authCookie || authCookie.value !== 'authenticated') {
    const loginUrl = new URL('/login', req.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
