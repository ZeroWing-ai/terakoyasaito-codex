const GITHUB_API = "https://api.github.com";

type Repo = { owner: string; repo: string; branch: string };

function parseRepo(repoStr: string | undefined): Repo {
  if (!repoStr) throw new Error("Missing GITHUB_REPO env var (e.g. owner/name)");
  const [owner, repo] = repoStr.split("/");
  if (!owner || !repo) throw new Error("GITHUB_REPO must be in 'owner/name' format");
  const branch = process.env.GITHUB_BRANCH || "main";
  return { owner, repo, branch };
}

export async function getFile(path: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("Missing GITHUB_TOKEN env var");
  const { owner, repo, branch } = parseRepo(process.env.GITHUB_REPO);
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}?ref=${branch}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch file: ${path}: ${res.status}`);
  const json = (await res.json()) as any;
  const content = Buffer.from(json.content, "base64").toString("utf8");
  return { sha: json.sha as string, content };
}

export async function getFileNullable(path: string) {
  try {
    return await getFile(path);
  } catch (e: any) {
    if (e?.message?.includes('Failed to fetch file') || e?.message?.includes('404')) {
      return null;
    }
    throw e;
  }
}

export async function putFile(path: string, newContent: string, message: string, sha?: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("Missing GITHUB_TOKEN env var");
  const { owner, repo, branch } = parseRepo(process.env.GITHUB_REPO);
  const body: any = {
    message,
    content: Buffer.from(newContent, "utf8").toString("base64"),
    branch,
  };
  if (sha) body.sha = sha;
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to put file: ${res.status} ${text}`);
  }
  return res.json();
}

export async function updateFile(path: string, newContent: string, message: string, sha: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("Missing GITHUB_TOKEN env var");
  const { owner, repo, branch } = parseRepo(process.env.GITHUB_REPO);
  const body = {
    message,
    content: Buffer.from(newContent, "utf8").toString("base64"),
    sha,
    branch,
  };
  const res = await fetch(`${GITHUB_API}/repos/${owner}/${repo}/contents/${encodeURIComponent(path)}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to update file: ${res.status} ${text}`);
  }
  return res.json();
}

export function insertItemIntoArraySource(src: string, arrayName: string, itemLiteral: string) {
  const marker = `export const ${arrayName}`;
  const idx = src.indexOf(marker);
  if (idx === -1) throw new Error(`Array '${arrayName}' not found`);
  const bracketIdx = src.indexOf("[", idx);
  if (bracketIdx === -1) throw new Error(`Array '[' not found after ${arrayName}`);
  const before = src.slice(0, bracketIdx + 1);
  const after = src.slice(bracketIdx + 1);
  // Insert at the beginning with a trailing comma
  const insertion = `\n  ${itemLiteral},`;
  return before + insertion + after;
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFKD")
    // remove diacritics
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 60);
}

export function toTsString(value: string) {
  return JSON.stringify(value);
}
