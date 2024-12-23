import fs from 'fs';
import path from 'path';

const dir = './';

export function writeJSON(filename, data) {
  fs.writeFileSync(path.join(dir, filename), JSON.stringify(data, null, 2));
}

export function readJSON(filename, defaultValue) {
  try {
    const data = fs.readFileSync(path.join(dir, filename), { encoding: 'utf8' });
    return JSON.parse(data);
  } catch (error) {
    return defaultValue;
  }
}
