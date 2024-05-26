import fsp from 'node:fs/promises';
import path from 'node:path';
import { findPkgTree } from '../loader/findPkgTree';
import { getTestAssetRoot } from './load-test-asset';

async function main() {
  {
    const loaded = await findPkgTree(getTestAssetRoot('pkgraph-init'));
    await fsp.writeFile('pkgraph-init.json', JSON.stringify(loaded, null, 2));
  }
}

setTimeout(() =>
  main()
    .catch((error) => {
      console.error(error);
      return error;
    })
    .then((hadError) => process.exit(~~hadError)),
);
