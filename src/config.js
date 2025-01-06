import path from 'path';

export const dataDir = './data/';

export const appListFile = path.join(dataDir, 'app_list.json');

// Key to use for API calls. Key can be generated at https://steamcommunity.com/dev/apikey
export const steamToken = 'steam token';

export const appListChunkSize = 20000;

export const minSavingInterval = 10 * 1000; // 10s

export const tooManyRequestsInterval = 5 * 60; // 5 min

export const maxReviewsPerFile = 350000; // A large JSON can not use JSON.stringify or JSON.parse.

export const maxConcurrency = 10;
