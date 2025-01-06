import SteamAPI from 'steamapi';
import {readJSON, writeJSON} from './file.js';
import {appListFile, dataDir, steamToken} from './config.js';
import fs from 'fs';

const steam = new SteamAPI(steamToken);

export async function getAppList() {
  let apps = readJSON(appListFile, []);
  if (!apps.length) {
    apps =  await steam.getAppList();
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }
    writeJSON(appListFile, apps);
  }
  return apps;
}
