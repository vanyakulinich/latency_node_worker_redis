const { parentPort } = require('node:worker_threads');

parentPort.on('message', (msg) => {
  const d = Date.now();
  const { date, fileSizeInKB, json, itteration } = msg;
  const diff = d - date;
  console.log(
    `WORKER msg ${itteration} RECEIVED: fileSize: ${fileSizeInKB}kb, DELAY: ${diff}ms`
  );
  //   parentPort.postMessage({ date: Date.now(), fileSizeInKB, json, itteration });
});
