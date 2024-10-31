import { readFile } from 'fs/promises';
import { defineEventHandler } from 'h3';
import path from 'path';

export default defineEventHandler(async (event) => {
  const filePath = path.join(process.cwd(), 'data', 'task_json.txt');
  const data = await readFile(filePath, 'utf8');
  return JSON.parse(data);
});
