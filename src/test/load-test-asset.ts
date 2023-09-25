import fsp from 'node:fs/promises';
import path from 'node:path';

export const testAssets = {
  webNextjs: {
    yarn: 'web-nextjs/202206-yarn.lock',
    npm2: 'web-nextjs/202306-package-lock.json',
  },
  voxscape: {
    yarn3: 'voxscape/yarn.lock',
  },
} as const;

export async function loadTestAsset(filename: string): Promise<string> {
  return fsp.readFile(path.join(__dirname, 'assets', filename), 'utf8');
}
