export async function runParallelTask(taskList, maxConcurrency = 10) {
  const runningTasks = [];
  for (let next = 0; next < taskList.length; next++) {
    const task = taskList[next];
    const promise = task().then(() => {
      const index = runningTasks.indexOf(promise);
      if (index !== -1) {
        runningTasks.splice(index, 1);
      }
    }).catch(error => {
      console.error(error);
    });
    runningTasks.push(promise);
    if (runningTasks.length >= maxConcurrency) {
      await Promise.race(runningTasks);
    }
  }
  await Promise.all(runningTasks);
}
