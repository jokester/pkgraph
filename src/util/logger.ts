import debug from 'debug';
import path from 'node:path';

const repoRoot = path.resolve(__dirname, '..');

export const createLogger = (filename: string): debug.Debugger => {
  if (filename.startsWith(repoRoot)) {
    const relativePath = path.relative(repoRoot, filename);
    const namespace = relativePath.replace(/\//g, ':');

    return debug(`lockdiff:${namespace}`);
  }
  return debug('lockdiff');
};
