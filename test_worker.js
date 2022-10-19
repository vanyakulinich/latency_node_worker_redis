const { Worker } = require('node:worker_threads');
const fs = require('node:fs');
const path = require('node:path');

const jsonName = 'huge'; // check ./data dir for other names
const worker = new Worker('./worker');

// worker.on('message', ({ date, itteration }) => {
//   console.log(`FROM WORKER ${itteration} PONG DELAY: ${Date.now() - date}ms`);
// });
(async () => {
  const JSON_FILE = path.resolve(__dirname, 'data', `${jsonName}.json`);
  const stats = fs.statSync(JSON_FILE);
  const fileSizeInKB = Math.floor(stats.size / 1024);
  const jsonObj = require(JSON_FILE);
  const json = JSON.stringify(jsonObj);

  let itteration = 1;

  while (itteration <= 1000) {
    let i = itteration;
    // await new Promise((r) => setTimeout(() => r())); // if enable delay, each post will be on iteration of event loop
    worker.postMessage({
      date: Date.now(),
      json,
      fileSizeInKB,
      itteration: i,
    });

    itteration++;
  }
})();
