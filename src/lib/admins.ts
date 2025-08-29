import { createHash, randomBytes } from 'crypto';
import { getFileNullable, putFile } from './github';

export type AdminRecord = {
  id: string;
  email?: string;
  name?: string;
  tokenHash: string; // sha256 of token
  createdAt: string; // ISO
  active?: boolean;
};

const PATH = 'src/content/admins.json';

export async function loadAdmins(): Promise<{ admins: AdminRecord[]; sha?: string }> {
  const file = await getFileNullable(PATH);
  if (!file) return { admins: [], sha: undefined };
  try {
    const data = JSON.parse(file.content) as AdminRecord[];
    return { admins: data, sha: file.sha };
  } catch {
    return { admins: [], sha: file.sha };
  }
}

export async function saveAdmins(admins: AdminRecord[], sha?: string) {
  const content = JSON.stringify(admins, null, 2) + '\n';
  return putFile(PATH, content, 'chore(admins): update admin list', sha);
}

export function hashToken(token: string) {
  return createHash('sha256').update(token).digest('hex');
}

export function generateToken(): { token: string; tokenHash: string } {
  const token = randomBytes(24).toString('hex');
  return { token, tokenHash: hashToken(token) };
}

export async function isAuthorized(headers: Headers): Promise<{ ok: boolean; mode?: 'master' | 'user'; admin?: AdminRecord }>{
  const master = process.env.ADMIN_SECRET;
  const headerSecret = headers.get('x-admin-secret') || '';
  if (master && headerSecret && headerSecret === master) return { ok: true, mode: 'master' };

  const headerToken = headers.get('x-admin-token') || headerSecret; // allow using same input
  if (headerToken) {
    const { admins } = await loadAdmins();
    const h = hashToken(headerToken);
    const found = admins.find((a) => (a.active ?? true) && a.tokenHash === h);
    if (found) return { ok: true, mode: 'user', admin: found };
  }
  return { ok: false };
}

