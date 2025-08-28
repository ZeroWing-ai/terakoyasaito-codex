import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect /admin with optional basic auth if env set
  if (pathname.startsWith('/admin')) {
    const user = process.env.ADMIN_BASIC_USER;
    const pass = process.env.ADMIN_BASIC_PASS;
    if (user && pass) {
      const auth = req.headers.get('authorization');
      if (!auth?.startsWith('Basic ')) {
        return new NextResponse('Auth required', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Admin"' } });
      }
      const decoded = Buffer.from(auth.split(' ')[1], 'base64').toString('utf8');
      const [u, p] = decoded.split(':');
      if (u !== user || p !== pass) {
        return new NextResponse('Unauthorized', { status: 401, headers: { 'WWW-Authenticate': 'Basic realm="Admin"' } });
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

