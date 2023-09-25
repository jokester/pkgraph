import snykLockFileParser, { parseManifestFile, ManifestFile } from 'snyk-nodejs-lockfile-parser/dist/parsers';
import { YarnLockParser } from 'snyk-nodejs-lockfile-parser/dist/parsers/yarn-lock-parser';
import { Yarn2LockParser } from 'snyk-nodejs-lockfile-parser/dist/parsers/yarn2-lock-parser';
import { PackageLockParser as NpmLockParser } from 'snyk-nodejs-lockfile-parser/dist/parsers/package-lock-parser';
import { createLogger } from '../util/logger';

const logger = createLogger(__filename);

export async function loadLockfile(content: string): Promise<snykLockFileParser.Lockfile> {
  try {
    const parser = new Yarn2LockParser();
    return parser.parseLockFile(content);
  } catch (ignored) {
    logger('Failed to parse as yarn2 lockfile', ignored);
  }
  try {
    const parser = new YarnLockParser();
    return parser.parseLockFile(content);
  } catch (ignored) {
    logger('Failed to parse as yarn lockfile', ignored);
  }

  try {
    const parser = new NpmLockParser();
    return parser.parseLockFile(content);
  } catch (ignored) {
    logger('Failed to parse as npm lockfile', ignored);
  }
  throw new Error('unsupported lock file');
}

export async function tryParseManifestFile(content: string): Promise<ManifestFile> {
  return parseManifestFile(content);
}
