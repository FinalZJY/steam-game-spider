import SteamAPI from 'steamapi';
import {writeJSON} from './file.js';
import {appListFile, dataDir, steamToken} from './config.js';
import fs from 'fs';

const steam = new SteamAPI(steamToken);

const apps =  await steam.getAppList();
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}
writeJSON(appListFile, apps);
