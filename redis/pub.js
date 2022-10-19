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
    };

    redis.publish('test', JSON.stringify(message));
    await new Promise((r) => setTimeout(() => r())); // wait till next iteration of event loop, otherwise redis looses msgs
    itteration++;
  }
});
