import DepGraph from '@snyk/dep-graph';
import snykLockFileParser from 'snyk-nodejs-lockfile-parser/dist/parsers';

async function parseLockfile(fileContent: string): Promise<snykLockFileParser.Lockfile> {
  snykLockFileParser.parseManifestFile();
  LockfileParser.buildDepGraphFromCliOutput();
}
