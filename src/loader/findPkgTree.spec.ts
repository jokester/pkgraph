import { getTestAssetRoot } from '../test/load-test-asset';
import { findPkgTree } from './findPkgTree';

describe('repoLoader', () => {
  it('finds manifest and version lock in npm repo', async () => {
    const root = getTestAssetRoot('pkgraph-init');

    const resolved = await findPkgTree(root);
    expect(resolved).toBeTruthy();
  });
});
