import fs from 'fs';
import path from 'path';

export const readJsonFile = (filePath: string) => {
  const fullPath = path.join(process.cwd(), 'data', filePath);
  const data = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(data);
};
