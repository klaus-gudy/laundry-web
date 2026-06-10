import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export function middleware(
  request: NextRequest
) {
  const refreshToken =
    request.cookies.get('refreshToken');

  const isAuthPage =
    request.nextUrl.pathname === '/login';

  if (!refreshToken && !isAuthPage) {
    return NextResponse.redirect(
      new URL('/login', request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/booking/:path*'],
};