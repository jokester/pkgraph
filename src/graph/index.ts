import { DepGraph, DepGraphBuilder } from '@snyk/dep-graph';
import { Lockfile, parseManifestFile } from 'snyk-nodejs-lockfile-parser/dist/parsers';
import { loadLockfile } from '../loader/lockfileLoader';

async function buildGraph(lockfileContent: string, manifestContent?: string): Promise<DepGraph> {
  const lockfile = loadLockfile(lockfileContent);
  const manifest = manifestContent && (await parseManifestFile(lockfileContent));


}
