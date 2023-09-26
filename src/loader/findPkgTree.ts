import fsp from 'node:fs/promises';
import path from 'node:path';
import { buildDepTreeFromFiles, PkgTree } from 'snyk-nodejs-lockfile-parser';

interface ResolvedManifest {
  pkgTree: PkgTree;
}

async function isFile(filename: string): Promise<boolean> {
  const stat = await fsp.stat(filename).catch((whatever) => null);
  return !!stat?.isFile();
}

/**
 * Try to find in {@param start}
 * @param start
 */
export async function findPkgTree(start: string): Promise<ResolvedManifest> {
  const manifestPath = path.join(start, 'package.json');
  if (!(await isFile(manifestPath))) {
    throw new Error(`package.json not found`);
  }

  const npmLockPath = path.join(start, 'package-lock.json');
  if (await isFile(npmLockPath)) {
    const pkgTree = await buildDepTreeFromFiles(start, 'package.json', 'package-lock.json', true);
    return { pkgTree };
  }

  const yarnLockPath = path.join(start, 'yarn.lock');
  if (await isFile(yarnLockPath)) {
    const pkgTree = await buildDepTreeFromFiles(start, 'package.json', 'yarn.lock', true);
    return { pkgTree };
  }
  throw new Error(`unable to build PkgTree `);
}
