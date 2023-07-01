import fsp from 'node:fs/promises';
import path from 'node:path';

export async function loadTestAsset(filename: string): Promise<string> {
  return fsp.readFile(path.join(__dirname, 'assets', filename), 'utf8');
}
