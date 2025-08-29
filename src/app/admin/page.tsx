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
  const [secret, setSecret] = useState(''); // secret or token
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<ApiResult | null>(null);
  const [diag, setDiag] = useState<any>(null);
  const [who, setWho] = useState<any>(null);

  useEffect(() => {
    const s = localStorage.getItem('admin_secret');
    if (s) setSecret(s);
    fetch('/api/admin/diagnostics')
      .then((r) => r.json())
      .then(setDiag)
      .catch(() => {});
    // try whoami with stored secret
    if (s) {
      fetch('/api/admin/whoami', { headers: { 'x-admin-secret': s, 'x-admin-token': s } })
        .then((r) => r.json())
        .then(setWho)
        .catch(() => {});
    }
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
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret, 'x-admin-token': secret },
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
                <label style={{ minWidth: 120 }}>Secret / Token</label>
                <input
                  type="password"
                  value={secret}
                  onChange={(e) => saveSecret(e.target.value)}
                  placeholder="ADMIN_SECRET または 個人トークン"
                  style={{ flex: 1, padding: 8, border: '1px solid #e2e8f0', borderRadius: 6 }}
                />
              </div>
              <small style={{ color: '#64748b' }}>Vercel環境変数に設定した <code>ADMIN_SECRET</code> を入力します。ブラウザに保存されます。</small>
              {who?.authorized && (
                <div style={{ marginTop: 8, color: '#334155' }}>
                  ログイン中: {who?.mode === 'master' ? 'マスター管理者' : '管理者'} {who?.admin?.email ? `(${who.admin.email})` : ''}
                </div>
              )}
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
              <AdminsPanel secret={secret} />
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

function AdminsPanel({ secret }: { secret: string }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [list, setList] = useState<any[] | null>(null);
  const [gen, setGen] = useState<{ token?: string; id?: string; error?: string } | null>(null);

  useEffect(() => {
    if (!secret) return;
    fetch('/api/admin/admins', { headers: { 'x-admin-secret': secret, 'x-admin-token': secret } })
      .then((r) => r.json())
      .then((j) => setList(j.admins || []))
      .catch(() => setList(null));
  }, [secret]);

  async function add() {
    setGen(null);
    try {
      const res = await fetch('/api/admin/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-secret': secret, 'x-admin-token': secret },
        body: JSON.stringify({ email: email || undefined, name: name || undefined }),
      });
      const j = await res.json();
      if (!res.ok || !j.ok) throw new Error(j.error || 'failed');
      setGen({ token: j.token, id: j.id });
      // refresh list
      fetch('/api/admin/admins', { headers: { 'x-admin-secret': secret, 'x-admin-token': secret } })
        .then((r) => r.json())
        .then((jj) => setList(jj.admins || []))
        .catch(() => {});
    } catch (e: any) {
      setGen({ error: e?.message || 'error' });
    }
  }

  return (
    <div style={{ padding: 16, border: '1px solid #e5e7eb', borderRadius: 10 }}>
      <h2 style={{ marginTop: 0 }}>👤 管理者の追加</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        <Row label="メール"><TextInput value={email} onChange={(e) => setEmail(e.target.value)} placeholder="任意" /></Row>
        <Row label="名前"><TextInput value={name} onChange={(e) => setName(e.target.value)} placeholder="任意" /></Row>
        <div>
          <Button onClick={add}>管理者を追加</Button>
        </div>
      </div>
      {gen?.token && (
        <div style={{ marginTop: 12, padding: 10, background: '#ecfdf5', color: '#065f46', borderRadius: 8 }}>
          トークンを発行しました（この画面でしか表示されません）。新しい管理者へ安全に共有してください。
          <div style={{ fontFamily: 'monospace', marginTop: 6 }}>{gen.token}</div>
        </div>
      )}
      {gen?.error && (
        <div style={{ marginTop: 12, padding: 10, background: '#fef2f2', color: '#7f1d1d', borderRadius: 8 }}>エラー: {gen.error}</div>
      )}
      <div style={{ marginTop: 20 }}>
        <h3 style={{ margin: '8px 0' }}>現在の管理者</h3>
        <div style={{ display: 'grid', gap: 6 }}>
          {Array.isArray(list) && list.length > 0 ? (
            list.map((a) => (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', border: '1px solid #e5e7eb', borderRadius: 8, padding: 8 }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{a.name || '(no name)'}</div>
                  <div style={{ color: '#64748b', fontSize: 12 }}>{a.email || '(no email)'}</div>
                </div>
                <div style={{ color: a.active ? '#16a34a' : '#dc2626', alignSelf: 'center' }}>{a.active ? 'active' : 'inactive'}</div>
              </div>
            ))
          ) : (
            <div style={{ color: '#64748b' }}>登録された管理者はいません</div>
          )}
        </div>
      </div>
    </div>
  );
}
