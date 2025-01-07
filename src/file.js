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

export function writeJSONByChunks(filename, data, chunkSize) {
  if (Array.isArray(data)) {
    const jsonDir = filename.replace('.json', '');
    if (!fs.existsSync(jsonDir)) {
      fs.mkdirSync(jsonDir);
    }
    for (let index = 0; index < data.length / chunkSize; index++) {
      const chunk = data.slice(index * chunkSize, (index + 1) * chunkSize);
      writeJSON(path.join(jsonDir, `${index + 1}.json`), chunk);
    }
  } else {
    throw new Error('Only arrays can be split into chunks.');
  }
}

export function readJSONByChunks(filename, defaultValue) {
  const jsonDir = filename.replace('.json', '');
  if (!fs.existsSync(jsonDir)) {
    return defaultValue;
  }
  let data = [];
  fs.readdirSync(jsonDir).forEach(filename => {
    const chunk = readJSON(path.join(jsonDir, filename));
    if (Array.isArray(chunk)) {
      data = data.concat(chunk);
    }
  });
  if (data.length === 0) {
    return defaultValue;
  }
  return data;
}

export function getProgress(filename, defaultValue) {
  const jsonDir = filename.replace('.json', '');
  const tempDir = jsonDir + '_temp';
  if (!fs.existsSync(tempDir)) {
    return defaultValue;
  }
  return readJSON(path.join(tempDir, 'progress.json'), {});
}

export function appendChunk(filename, data, progress) {
  const jsonDir = filename.replace('.json', '');
  const tempDir = jsonDir + '_temp';
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  const chunks = fs.readdirSync(tempDir).filter(filename => filename !== 'progress.json');
  writeJSON(path.join(tempDir, `${chunks.length + 1}.json`), data);
  if (progress) {
    writeJSON(path.join(tempDir, 'progress.json'), progress);
  } else {
    fs.rmSync(path.join(tempDir, 'progress.json'));
    fs.renameSync(tempDir, jsonDir);
  }
}
