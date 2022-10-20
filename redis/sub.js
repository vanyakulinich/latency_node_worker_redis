const Redis = require('ioredis');

const redis = new Redis();

redis.on('ready', () => {
  redis.subscribe('test').then;
  redis.on('message', (channel, msg) => {
    const d = Date.now();
    const { time, json, itteration, fileSizeInKB, pub } = JSON.parse(msg);
    const diff = d - time;
    console.log(
      `SUB ${itteration} iteration from pub ${pub} RECEIVED: fileSize: ${fileSizeInKB}kb, DELAY: ${diff}ms`
    );
  });
});
