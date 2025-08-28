'use client';

import React, { useEffect, useMemo, useState } from 'react';

type ApiResult = {
  ok?: boolean;
  error?: string;
  slug?: string;
  commit?: string;
  deployTriggered?: boolean;
};

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [diag, setDiag] = useState<any>(null);

  useEffect(() => {
    const s = localStorage.getItem('admin_secret');
    if (s) setSecret(s);
    fetch('/api/admin/diagnostics')
      .then((r) => r.json())
      .then(setDiag)
      .catch(() => {});
  }, []);

  function saveSecret(value: string) {
    setSecret(value);
    localStorage.setItem('admin_secret', value);
  }

  async function publish(payload: any) {
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setResult(json);
    } catch (e: any) {
      setResult({ ok: false, error: e?.message || 'Network error' });
    } finally {
      setBusy(false);
    }
  }

  const okBadge = (ok?: boolean) => (
    <span style={{ padding: '2px 8px', borderRadius: 12, fontSize: 12, background: ok ? '#d1fae5' : '#fee2e2', color: ok ? '#065f46' : '#991b1b' }}>
      {ok ? 'OK' : 'NG'}
    </span>
  );

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-card">
            <h1 className="section-title">🔐 管理者ページ</h1>
            <p style={{ color: '#636e72' }}>ここから「お知らせ」「ブログ」を投稿できます。</p>

            <div style={{ marginTop: 16, padding: 12, background: '#f8fafc', borderRadius: 8 }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <label style={{ minWidth: 120 }}>Admin Secret</label>
                <input
                  type="password"
                  value={secret}
                  onChange={(e) => saveSecret(e.target.value)}
                  placeholder="ADMIN_SECRET"
                  style={{ flex: 1, padding: 8, border: '1px solid #e2e8f0', borderRadius: 6 }}
                />
              </div>
              <small style={{ color: '#64748b' }}>Vercel環境変数に設定した <code>ADMIN_SECRET</code> を入力します。ブラウザに保存されます。</small>
            </div>

            {diag && (
              <div style={{ marginTop: 16, padding: 12, background: '#f1f5f9', borderRadius: 8 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>診断</div>
                <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', rowGap: 6, columnGap: 12 }}>
                  <div>ADMIN_SECRET</div>
                  <div>{okBadge(diag?.configured?.ADMIN_SECRET)}</div>
                  <div>GITHUB_TOKEN</div>
                  <div>{okBadge(diag?.configured?.GITHUB_TOKEN)}</div>
                  <div>GITHUB_REPO</div>
                  <div>{okBadge(diag?.configured?.GITHUB_REPO)}</div>
                  <div>GITHUB_BRANCH</div>
                  <div>{okBadge(diag?.configured?.GITHUB_BRANCH)}</div>
                  <div>DEPLOY_HOOK</div>
                  <div>{okBadge(diag?.configured?.VERCEL_DEPLOY_HOOK_URL)}</div>
                  <div>GitHub read content</div>
                  <div>{okBadge(diag?.checks?.githubReadContent?.ok)}</div>
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gap: 24, marginTop: 24 }}>
              <BlogForm busy={busy} onSubmit={(payload) => publish({ type: 'blog', ...payload })} />
              <NewsForm busy={busy} onSubmit={(payload) => publish({ type: 'news', ...payload })} />
            </div>

            {result && (
              <div style={{ marginTop: 20, padding: 12, borderRadius: 8, background: result.ok ? '#ecfdf5' : '#fef2f2', color: result.ok ? '#065f46' : '#7f1d1d' }}>
                <div style={{ fontWeight: 600 }}>{result.ok ? '投稿に成功しました' : '投稿に失敗しました'}</div>
                {result.error && <div>エラー: {result.error}</div>}
                {result.ok && (
                  <div>
                    <div>slug: {result.slug}</div>
                    {typeof result.deployTriggered !== 'undefined' && (
                      <div>deployTriggered: {String(result.deployTriggered)}</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 8, alignItems: 'center' }}>
      <label style={{ color: '#334155' }}>{label}</label>
      {children}
    </div>
  );
}

function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ padding: 8, border: '1px solid #e2e8f0', borderRadius: 6, ...(props.style || {}) }} />;
}

function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{ padding: 8, border: '1px solid #e2e8f0', borderRadius: 6, minHeight: 120, ...(props.style || {}) }} />;
}

function Button({ children, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...rest} style={{ padding: '8px 14px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer', ...(rest.style || {}) }}>
      {children}
    </button>
  );
}

function BlogForm({ busy, onSubmit }: { busy: boolean; onSubmit: (payload: any) => void }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  return (
    <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 10 }}>
      <h2 style={{ marginTop: 0 }}>📝 ブログ投稿</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        <Row label="タイトル"><TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例: 今日のてらこや" /></Row>
        <Row label="日付"><TextInput value={date} onChange={(e) => setDate(e.target.value)} placeholder="YYYY-MM-DD（省略可）" /></Row>
        <Row label="スラッグ"><TextInput value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="省略可（自動生成）" /></Row>
        <Row label="概要"><TextInput value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="短い紹介文" /></Row>
        <Row label="本文"><TextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder="本文（改行OK）" /></Row>
        <Row label="タグ"><TextInput value={tags} onChange={(e) => setTags(e.target.value)} placeholder="カンマ区切り（例: 日常,英語クラブ）" /></Row>
        <div>
          <Button disabled={busy} onClick={() => onSubmit({ title, date: date || undefined, slug: slug || undefined, excerpt, content, tags: tags ? tags.split(',').map((s) => s.trim()).filter(Boolean) : undefined })}>
            {busy ? '投稿中…' : 'ブログを投稿'}
          </Button>
        </div>
      </div>
    </div>
  );
}

function NewsForm({ busy, onSubmit }: { busy: boolean; onSubmit: (payload: any) => void }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [slug, setSlug] = useState('');
  const [body, setBody] = useState('');

  return (
    <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 10 }}>
      <h2 style={{ marginTop: 0 }}>📢 お知らせ投稿</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        <Row label="タイトル"><TextInput value={title} onChange={(e) => setTitle(e.target.value)} placeholder="例: 見学会のお知らせ" /></Row>
        <Row label="日付"><TextInput value={date} onChange={(e) => setDate(e.target.value)} placeholder="YYYY-MM-DD（省略可）" /></Row>
        <Row label="スラッグ"><TextInput value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="省略可（自動生成）" /></Row>
        <Row label="本文"><TextArea value={body} onChange={(e) => setBody(e.target.value)} placeholder="本文（任意）" /></Row>
        <div>
          <Button disabled={busy} onClick={() => onSubmit({ title, date: date || undefined, slug: slug || undefined, body: body || undefined })}>
            {busy ? '投稿中…' : 'お知らせを投稿'}
          </Button>
        </div>
      </div>
    </div>
  );
}

