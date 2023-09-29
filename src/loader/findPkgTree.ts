import fsp from 'node:fs/promises';
import path from 'node:path';
import {
  buildDepTree,
  buildDepTreeFromFiles,
  parseNpmLockV2Project,
  parseYarnLockV2Project,
  PkgTree,
} from 'snyk-nodejs-lockfile-parser';
import { DepGraph } from '@snyk/dep-graph';

interface ResolvedManifest {
  pkgTree: PkgTree;
  depGraph: DepGraph;
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
  const manifestContent = await fsp.readFile(manifestPath, { encoding: 'utf8' }).catch(() => null);
  if (!manifestContent) {
    throw new Error(`package.json not found`);
  }

  const npmLockPath = path.join(start, 'package-lock.json');
  const npmLockContent = await fsp.readFile(npmLockPath, { encoding: 'utf8' }).catch(() => null);
  if (npmLockContent) {
    const pkgTree = await buildDepTree(manifestContent, npmLockContent, true);
    if (pkgTree.meta?.packageManager === 'npm' && pkgTree.meta.lockfileVersion === 2) {
      const depGraph = await parseNpmLockV2Project(manifestContent, npmLockContent, {
        // "any cross referencing between workspace packages will lead to a throw"
        strictOutOfSync: false,
        includeDevDeps: true,
        includeOptionalDeps: true,
        // maybe only affact yarn v1
        pruneCycles: true,
      });
      return {
        pkgTree,
        depGraph,
      };
    }
  }

  const yarnLockPath = path.join(start, 'yarn.lock');
  const yarnLockContent = await fsp.readFile(yarnLockPath, { encoding: 'utf8' }).catch(() => null);
  if (yarnLockContent) {
    const pkgTree = await buildDepTree(manifestContent, yarnLockContent, true);
    if (pkgTree.meta?.packageManager === 'yarn' && pkgTree.meta.lockfileVersion === 2) {
      const depGraph = await parseYarnLockV2Project(manifestContent, yarnLockContent, {
        includeDevDeps: true,
        includeOptionalDeps: true,
        strictOutOfSync: true,
        // TODO: what does this do?
        pruneWithinTopLevelDeps: false,
      });
      return { pkgTree, depGraph };
    }
  }
  throw new Error(`unable to build PkgTree `);
}
