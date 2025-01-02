import SteamAPI from 'steamapi';
import {readJSON, writeJSON} from './file.js';
import {appListFile, chunkSize, dataDir, minSavingInterval, steamToken, tooManyRequestsInterval} from './config.js';
import path from 'path';
import {countdownInPlace} from './countdown.js';
import fs from 'fs';

const appDetailsDir = path.join(dataDir, 'AppDetails');
if (!fs.existsSync(appDetailsDir)) {
  fs.mkdirSync(appDetailsDir);
}
const steam = new SteamAPI(steamToken);
const failed = [];
let lastSavingTime = 0;
let apps = readJSON(appListFile, []);
if (!apps.length) {
  apps =  await steam.getAppList();
  writeJSON(appListFile, apps);
}

function save(filename, chunkApps, index) {
  console.debug(`Process: ${(index / apps.length * 100).toFixed(2)}%.`);
  lastSavingTime = Date.now();
  writeJSON(filename, chunkApps);
}

async function getGameDetails(app) {
  try {
    console.debug(`Fetching ${app.appid}...`);
    app.detail = await steam.getGameDetails(app.appid);
  } catch (err) {
    failed.push(app.appid);
    console.error(err);
    if (err.message === 'Failed to find app ID') {
      app.detail = {};
    } else if (err.message === 'Too Many Requests') {
      await countdownInPlace(tooManyRequestsInterval);
      return getGameDetails(app);
    }
  }
}

async function update() {
  for (let chunkIndex = 0; chunkIndex <= apps.length / chunkSize; chunkIndex++) {
    const filename = path.join(appDetailsDir, `app_${chunkIndex + 1}.json`);
    const start = chunkIndex * chunkSize;
    const end = start + chunkSize;
    const chunkApps = readJSON(filename, apps.slice(start, end));

    for (let index = 0; index < chunkSize; index++) {
      const app = chunkApps[index];
      if (app.name && !app.detail) {
        await getGameDetails(app);
      }
      if (Date.now() > lastSavingTime + minSavingInterval) {
        save(filename, chunkApps, start + index);
      }
    }
    save(filename, chunkApps, end);
  }

  console.log('Fail list: ', failed);
}

await update();
