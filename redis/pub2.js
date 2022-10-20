const Redis = require('ioredis');
const fs = require('node:fs');
const path = require('node:path');

const redis = new Redis();

const jsonName = 'huge'; // check ./data dir for other names

redis.on('ready', async () => {
  const JSON_FILE = path.resolve(__dirname, '..', 'data', `${jsonName}.json`);
  const stats = fs.statSync(JSON_FILE);
  const fileSizeInKB = Math.floor(stats.size / 1024);
  const jsonObj = require(JSON_FILE);

  let itteration = 1;
  while (itteration <= 1000) {
    const message = {
      time: Date.now(),
      json: jsonObj,
      fileSizeInKB,
      itteration,
      pub: 2,
    };

    redis.publish('test', JSON.stringify(message));
    await new Promise((resolve) => setTimeout(() => resolve())); // wait till next iteration of event loop, otherwise redis looses msgs
    // await new Promise((resolve) => setTimeout(() => resolve(), 50)); // when multiple pubs (simulate many servers), to avoid fail - here we are in single js heap and event loop

    itteration++;
  }
});
