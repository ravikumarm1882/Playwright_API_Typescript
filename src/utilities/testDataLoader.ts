import * as fs from 'fs/promises';

export class TestDataLoader {
  static async loadJson<T = any>(filePath: string): Promise<T> {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }
}
