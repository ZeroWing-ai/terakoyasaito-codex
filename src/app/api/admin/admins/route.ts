export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { generateToken, isAuthorized, loadAdmins, saveAdmins } from '@/lib/admins';

function cors() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-secret, x-admin-token',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: cors() });
}

export async function GET(req: NextRequest) {
  const auth = await isAuthorized(req.headers as any);
  if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: cors() });
  const { admins } = await loadAdmins();
  // Do not leak token hashes
  const redacted = admins.map(({ id, email, name, createdAt, active }) => ({ id, email, name, createdAt, active: active ?? true }));
  return NextResponse.json({ admins: redacted }, { headers: cors() });
}

export async function POST(req: NextRequest) {
  const auth = await isAuthorized(req.headers as any);
  if (!auth.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: cors() });

  const body = (await req.json()) as { email?: string; name?: string };
  const { admins, sha } = await loadAdmins();
  const { token, tokenHash } = generateToken();
  const record = {
    id: `adm_${Date.now().toString(36)}`,
    email: body.email,
    name: body.name,
    tokenHash,
    createdAt: new Date().toISOString(),
    active: true,
  };
  admins.unshift(record);
  await saveAdmins(admins, sha);
  return NextResponse.json({ ok: true, token, id: record.id }, { headers: cors() });
}

