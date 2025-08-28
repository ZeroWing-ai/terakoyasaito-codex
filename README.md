This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Content updates via Admin API

This project renders blog/news from TypeScript arrays under `src/content/`.
For non-technical updates, an admin API can append new entries and trigger redeploy via GitHub.

### API endpoint

- URL: `/api/admin/publish`
- Method: `POST`
- Header: `x-admin-secret: <ADMIN_SECRET>`
- Body (JSON):
  - Blog:
    ```json
    {
      "type": "blog",
      "title": "タイトル",
      "date": "2025-07-28",
      "slug": "optional-slug",
      "excerpt": "短い紹介文",
      "content": "本文（改行OK）",
      "tags": ["任意タグ"]
    }
    ```
  - News:
    ```json
    {
      "type": "news",
      "title": "お知らせタイトル",
      "date": "2025-07-28",
      "slug": "optional-slug",
      "body": "本文（任意）"
    }
    ```

### Environment variables (Vercel)

Add these in Project Settings → Environment Variables:

- `ADMIN_SECRET`: shared secret for the admin endpoint
- `GITHUB_TOKEN`: GitHub token with `repo` scope (can update contents)
- `GITHUB_REPO`: e.g. `ZeroWing-ai/terakoyasaito-codex`
- `GITHUB_BRANCH`: optional (defaults to `main`)

Optional:

- `VERCEL_DEPLOY_HOOK_URL`: Project Settings → Deploy Hooks で作成したURL。
  これを設定すると、APIがGitHubへコミット後にこのフックを叩き、自動で再デプロイを開始します。

Notes:
- 本サイトは `src/content/*.ts` をビルド時に読み込むため、投稿内容が反映されるには再デプロイが必要です。
- VercelのGit連携が対象リポジトリ（`ZeroWing-ai/terakoyasaito-codex`）の`main`に接続されていることを確認してください。

When the API is called, it commits the change to GitHub which triggers a fresh Vercel deploy.

## Admin UI (/admin)

- Built-in admin page at `/admin` to post News/Blog.
- It calls `/api/admin/publish` with `x-admin-secret` you enter on the page (saved in browser).
- Optional Basic Auth for `/admin` via middleware:
  - `ADMIN_BASIC_USER`: username
  - `ADMIN_BASIC_PASS`: password
- Recommended env vars (Vercel → Project Settings → Environment Variables):
  - `ADMIN_SECRET` (required)
  - `GITHUB_TOKEN` (required)
  - `GITHUB_REPO` (required)
  - `GITHUB_BRANCH` (optional)
  - `VERCEL_DEPLOY_HOOK_URL` (optional, to auto-redeploy)
