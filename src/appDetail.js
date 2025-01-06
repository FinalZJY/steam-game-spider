import SteamAPI from 'steamapi';
import {readJSON, writeJSON} from './file.js';
import {appListChunkSize, dataDir, minSavingInterval, steamToken, tooManyRequestsInterval} from './config.js';
import path from 'path';
import {countdownInPlace} from './countdown.js';
import fs from 'fs';
import {getAppList} from './appList.js';

const appDetailsDir = path.join(dataDir, 'AppDetails');
const steam = new SteamAPI(steamToken);
const failed = [];
let lastSavingTime = 0;

function save(filename, chunkApps, process) {
  console.debug(`Process: ${(process * 100).toFixed(2)}%.`);
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

export async function getAppDetail() {
  const apps = await getAppList();
  if (!fs.existsSync(appDetailsDir)) {
    fs.mkdirSync(appDetailsDir);
  }

  for (let chunkIndex = 0; chunkIndex <= apps.length / appListChunkSize; chunkIndex++) {
    const filename = path.join(appDetailsDir, `app_${chunkIndex + 1}.json`);
    const start = chunkIndex * appListChunkSize;
    const end = Math.min(start + appListChunkSize, apps.length);
    const chunkApps = readJSON(filename, apps.slice(start, end));

    for (let index = 0; index < chunkApps.length; index++) {
      const app = chunkApps[index];
      if (app.name && !app.detail) {
        await getGameDetails(app);
      }
      if (Date.now() > lastSavingTime + minSavingInterval) {
        save(filename, chunkApps, start + index / apps.length);
      }
    }
    save(filename, chunkApps, end / apps.length);
  }

  console.log('Failed list: ', failed);
}
