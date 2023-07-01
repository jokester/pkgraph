import { Lockfile, LockfileType } from 'snyk-nodejs-lockfile-parser/dist/parsers';
import { DepGraphBuilder, DepGraph, PkgInfo } from '@snyk/dep-graph';
import { YarnLock } from 'snyk-nodejs-lockfile-parser/dist/parsers/yarn-lock-parser';

export function buildDepGraph1(f: Lockfile): DepGraph {
  const graphBuilder = new DepGraphBuilder({ name: f.type });
  if (f.type === LockfileType.yarn) {
    attach(graphBuilder, f);
  }
  return graphBuilder.build();
}

const rootPackage: PkgInfo = {
  name: '@@root',
};

function attach(builder: DepGraphBuilder, yarnlock: YarnLock): void {
  if (yarnlock.object) {
    for (const rootDeps of Object.entries(yarnlock.object)) {
      builder.addPkgNode(rootPackage);
    }
  }
}
