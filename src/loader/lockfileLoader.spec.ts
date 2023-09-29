import { loadTestAsset, testAssets } from '../test/load-test-asset';
import { loadLockfile } from './lockfileLoader';

describe('lockfileLoader', () => {
  it('should load yarn lockfile', async () => {
    const f1 = await loadTestAsset(testAssets.webNextjs.yarn);

    const lockfile = await loadLockfile(f1);
  });

  it('should load yarn berry lockfile', async () => {
    const f1 = await loadTestAsset(testAssets.voxscape.v202309);

    const lockfile = await loadLockfile(f1);
  });
  it('should load npm lockfile', async () => {
    const f1 = await loadTestAsset(testAssets.webNextjs.npm2);

    const lockfile = await loadLockfile(f1);
  });
});
