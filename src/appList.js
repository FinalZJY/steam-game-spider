import SteamAPI from 'steamapi';
import {writeJSON} from './file.js';
import {appListFile, steamToken} from './config.js';

const steam = new SteamAPI(steamToken);

const apps =  await steam.getAppList();
writeJSON(appListFile, apps);
