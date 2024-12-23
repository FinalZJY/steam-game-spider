import path from 'path';

export const dataDir = './data/';

export const appListFile = path.join(dataDir, 'appList.json');

// Key to use for API calls. Key can be generated at https://steamcommunity.com/dev/apikey
export const steamToken = 'steam token';

export const chunkSize = 20000;

export const minSavingInterval = 10 * 1000; // 10s

export const tooManyRequestsInterval = 4 * 60 * 1000; // 4 min
