export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { getFile, updateFile, insertItemIntoArraySource, slugify, toTsString } from '@/lib/github';

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, x-admin-secret',
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

type BlogPayload = {
  type: 'blog';
  title: string;
  date?: string; // YYYY-MM-DD
  slug?: string;
  excerpt: string;
  content: string;
  tags?: string[];
};

type NewsPayload = {
  type: 'news';
  title: string;
  date?: string; // YYYY-MM-DD
  slug?: string;
  body?: string;
};

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get('x-admin-secret');
    if (!process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Server not configured: ADMIN_SECRET missing' }, { status: 500, headers: corsHeaders() });
    }
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders() });
    }

    const data = (await req.json()) as BlogPayload | NewsPayload;
    const today = new Date();
    const date = data.date || today.toISOString().slice(0, 10);
    const baseSlug = data.slug || `${date}-${slugify(data.title)}`;

    if (data.type === 'blog') {
      const path = 'src/content/blog.ts';
      const { sha, content } = await getFile(path);
      const item = `{
  slug: ${toTsString(baseSlug)},
  title: ${toTsString(data.title)},
  date: ${toTsString(date)},
  excerpt: ${toTsString(data.excerpt)},
  content: ${toTsString(data.content)},
  ${data.tags && data.tags.length ? `tags: [${data.tags.map(toTsString).join(', ')}],` : ''}
}`.replace(/,\n\s*\}/, '\n}');

      const newContent = insertItemIntoArraySource(content, 'blogPosts', item);
      const message = `chore(content): add blog post '${data.title}'`;
      const res = await updateFile(path, newContent, message, sha);
      // Optional: trigger Vercel deploy hook
      let triggered = false;
      const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
      if (hook) {
        try {
          await fetch(hook, { method: 'POST' });
          triggered = true;
        } catch {}
      }
      return NextResponse.json({ ok: true, slug: baseSlug, commit: res.commit?.sha, deployTriggered: triggered }, { headers: corsHeaders() });
    }

    if (data.type === 'news') {
      const path = 'src/content/news.ts';
      const { sha, content } = await getFile(path);
      const item = `{
  slug: ${toTsString(baseSlug)},
  title: ${toTsString(data.title)},
  date: ${toTsString(date)},
  ${data.body ? `body: ${toTsString(data.body)},` : ''}
}`.replace(/,\n\s*\}/, '\n}');

      const newContent = insertItemIntoArraySource(content, 'newsItems', item);
      const message = `chore(content): add news '${data.title}'`;
      const res = await updateFile(path, newContent, message, sha);
      // Optional: trigger Vercel deploy hook
      let triggered = false;
      const hook = process.env.VERCEL_DEPLOY_HOOK_URL;
      if (hook) {
        try {
          await fetch(hook, { method: 'POST' });
          triggered = true;
        } catch {}
      }
      return NextResponse.json({ ok: true, slug: baseSlug, commit: res.commit?.sha, deployTriggered: triggered }, { headers: corsHeaders() });
    }

    return NextResponse.json({ error: 'Invalid type' }, { status: 400, headers: corsHeaders() });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500, headers: corsHeaders() });
  }
}
