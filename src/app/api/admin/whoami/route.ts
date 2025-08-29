export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { isAuthorized } from '@/lib/admins';

export async function GET(req: NextRequest) {
  const auth = await isAuthorized(req.headers as any);
  if (!auth.ok) return NextResponse.json({ authorized: false });
  return NextResponse.json({ authorized: true, mode: auth.mode, admin: auth.admin ? { id: auth.admin.id, email: auth.admin.email, name: auth.admin.name } : null });
}

