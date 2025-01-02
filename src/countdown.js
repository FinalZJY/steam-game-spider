import {logProgress} from './log.js';

export async function countdownInPlace(seconds, prefix = 'Waiting ') {
  return new Promise(resolve => {
    const { updateProgress, finish } = logProgress(prefix, 's');
    let remaining = seconds;
    const intervalId = setInterval(() => {
      updateProgress(remaining);
      remaining--;
      if (remaining < 0) {
        clearInterval(intervalId);
        finish();
        resolve();
      }
    }, 1000);
  });
}
