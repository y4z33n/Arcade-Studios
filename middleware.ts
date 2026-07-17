import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect the /mail route but allow /mail/login to be accessed
  if (pathname.startsWith('/mail') && pathname !== '/mail/login') {
    const authCookie = request.cookies.get('mail_auth');
    if (!authCookie || authCookie.value !== 'true') {
      const loginUrl = new URL('/mail/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/mail/:path*'],
};
