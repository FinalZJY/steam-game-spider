import {getReviews} from './api.js';
import {readJSON, writeJSON, writeJSONByChunks} from './file.js';
import {appListFile, dataDir, maxConcurrency, maxReviewsPerFile} from './config.js';
import path from 'path';
import fs from 'fs';
import {runParallelTask} from './task.js';
import {logMultiLineProgress} from './log.js';

const appReviewsDir = path.join(dataDir, 'AppReviews');
const num_per_page = 100;

if (!fs.existsSync(appReviewsDir)) {
  fs.mkdirSync(appReviewsDir);
}

async function getAppReviews(appid, updateProgress) {
  let summary;
  const reviews = [];
  for (let cursor = '*'; Boolean(cursor);) {
    updateProgress(`${reviews.length}/${summary?.total_reviews ?? '?'}`);
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
    }
    reviews.push(...resp.reviews);
    if (!summary) {
      summary = resp.query_summary;
    }
    if (cursor === resp.cursor) {
      break;
    } else {
      cursor = resp.cursor;
    }
  }

  if (reviews.length >= summary.total_reviews * 0.99 && duplicationCheck(reviews)) {
    return reviews;
  } else {
    throw new Error(`Error fetching reviews for ${appid}. Retrieving ${reviews.length}/${summary.total_reviews} reviews.`);
  }
}

function duplicationCheck(reviews) {
  const reviewsMap = {};
  for (const review of reviews) {
    if (reviewsMap[review.recommendationid]) {
      throw new Error(`Duplicate review: ${review.recommendationid}`);
    } else {
      reviewsMap[review.recommendationid] = true;
    }
  }
  return true;
}

async function update() {
  const apps = readJSON(appListFile, []);

  let finished = 0;
  const { updateProgress: updateTotalProgress, finish: finishAll } = logMultiLineProgress(`Progress: `, '%.', true);
  updateTotalProgress(0);
  await runParallelTask(apps.map(app => async () => {
    const filename = path.join(appReviewsDir, `${app.appid}.json`);
    if (!fs.existsSync(filename)) {
      const { updateProgress, finish } = logMultiLineProgress(`Fetching ${app.appid} reviews... `);
      updateProgress('');
      updateTotalProgress((finished / apps.length * 100).toFixed(2));
      try {
        const reviews = await getAppReviews(app.appid, updateProgress);
        if (reviews.length > maxReviewsPerFile) {
          writeJSONByChunks(filename, reviews, maxReviewsPerFile);
        } else {
          writeJSON(filename, reviews);
        }
        finish(`Fetching ${app.appid} reviews... Saved to ${filename}.`);
      } catch (err) {
        finish(`Fetching ${app.appid} reviews... ${err.message}`);
      }
    }
    finished++;
  }), maxConcurrency);
  finishAll('Done.');
}

await update();
