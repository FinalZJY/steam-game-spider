import {getAppList} from './appList.js';
import {getAppDetail} from './appDetail.js';
import {getAppReview} from './appReview.js';


if (process.argv.includes('appList')) {
  await getAppList();
}

if (process.argv.includes('appDetail')) {
  await getAppDetail();
}

if (process.argv.includes('appReview')) {
  await getAppReview();
}