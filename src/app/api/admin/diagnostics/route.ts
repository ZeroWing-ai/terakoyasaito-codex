export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { getFile } from '@/lib/github';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  } as Record<string, string>;
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET() {
  const headers = corsHeaders();
  const data: any = {
    configured: {
      ADMIN_SECRET: Boolean(process.env.ADMIN_SECRET),
      GITHUB_TOKEN: Boolean(process.env.GITHUB_TOKEN),
      GITHUB_REPO: Boolean(process.env.GITHUB_REPO),
      GITHUB_BRANCH: Boolean(process.env.GITHUB_BRANCH || 'main'),
      VERCEL_DEPLOY_HOOK_URL: Boolean(process.env.VERCEL_DEPLOY_HOOK_URL),
    },
    checks: {
      githubReadContent: null as null | { ok: boolean; error?: string },
    },
  };

  // Try reading a known file to validate repo/token
  try {
    await getFile('src/content/news.ts');
    data.checks.githubReadContent = { ok: true };
  } catch (e: any) {
    data.checks.githubReadContent = { ok: false, error: e?.message || 'unknown' };
  }

  return NextResponse.json(data, { headers });
}

