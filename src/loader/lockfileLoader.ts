import snykLockFileParser from 'snyk-nodejs-lockfile-parser/dist/parsers';

export async function loadLockfile(content: string): Promise<snykLockFileParser.Lockfile> {
  return snykLockFileParser.parseLockFile(content);
}
