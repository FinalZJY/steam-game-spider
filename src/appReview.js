import {getReviews} from './api.js';
import {appendChunk, getProgress, writeJSON} from './file.js';
import {dataDir, maxConcurrency, maxReviewsPerFile} from './config.js';
import path from 'path';
import fs from 'fs';
import {runParallelTask} from './task.js';
import {logMultiLineProgress} from './log.js';
import {getAppList} from './appList.js';

const num_per_page = 100;
const appReviewsDir = path.join(dataDir, 'AppReviews');

async function getAppReviews(appid, updateProgress) {
  const filename = path.join(appReviewsDir, `${appid}.json`);
  const progress = getProgress(filename, {
    existReviewLength: 0,
    cursor: '*',
    totalReviews: undefined,
  });

  let reviews = [];
  for (let cursor = progress.cursor; Boolean(cursor);) {
    const resp = await getReviews({
      appid,
      filter: 'recent',
      language: 'all',
      // day_range: '30',
      cursor,
      review_type: 'all',
      purchase_type: 'all',
      num_per_page: String(num_per_page),
      // filter_offtopic_activity: 0,
    });
    if (!resp.success) {
      throw new Error(`Error fetching reviews for ${appid}.`);
    } else if (!resp.cursor && (progress.existReviewLength + reviews.length) < progress.totalReviews) {
      // Sometimes resp.cursor is null, but it will return normal data if you fetch again.
      updateProgress(`${progress.existReviewLength + reviews.length}/${progress.totalReviews ?? '?'} retrying`);
      continue;
    }

    if (reviews.length + resp.reviews?.length > maxReviewsPerFile) {
      progress.cursor = cursor;
      progress.existReviewLength += reviews.length;
      appendChunk(filename, reviews, progress);
      reviews = [];
    }

    reviews.push(...resp.reviews);
    if (!progress.totalReviews) {
      progress.totalReviews = resp.query_summary?.total_reviews;
    }
    updateProgress(`${progress.existReviewLength + reviews.length}/${progress.totalReviews ?? '?'}`);
    if (cursor === resp.cursor) {
      break;
    } else {
      cursor = resp.cursor;
    }
  }

  if (progress.existReviewLength + reviews.length >= progress.totalReviews * 0.95) {
    if (progress.existReviewLength > 0) {
      appendChunk(filename, reviews);
    } else {
      writeJSON(filename, reviews);
    }
    return reviews;
  } else {
    throw new Error(`Error fetching reviews for ${appid}. Retrieving ${reviews.length}/${progress.totalReviews} reviews.`);
  }
}

export async function getAppReview() {
  const apps = await getAppList();
  if (!fs.existsSync(appReviewsDir)) {
    fs.mkdirSync(appReviewsDir);
  }
  const existReviewsFile = fs.readdirSync(appReviewsDir).reduce((previousValue, currentValue) => {
    previousValue[currentValue.replace('.json', '')] = true;
    return previousValue;
  }, {});
  const todos = apps.filter(app => !existReviewsFile[app.appid]);

  let finished = apps.length - todos.length;
  const { updateProgress: updateTotalProgress, finish: finishAll } = logMultiLineProgress(`Progress: `, '%.', true);
  updateTotalProgress((finished / apps.length * 100).toFixed(2));
  await runParallelTask(todos.map(app => async () => {
    const { updateProgress, finish } = logMultiLineProgress(`Fetching ${app.appid} reviews... `);
    updateProgress('');
    updateTotalProgress((finished / apps.length * 100).toFixed(2));
    try {
      await getAppReviews(app.appid, updateProgress);
      finish(`Fetching ${app.appid} reviews... Saved.`);
    } catch (err) {
      finish(`Fetching ${app.appid} reviews... ${err.message}`);
    }
    finished++;
  }), maxConcurrency);
  finishAll('Done.');
}
