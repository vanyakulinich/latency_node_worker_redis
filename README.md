## Latency rough measuments for redis pub-sub and nodejs worker thread

Goal: measure roughly latency between:

- sending and receiving message from main thread to worker thread in nodejs
- publishing and receiving message in local redis

#### Requirements:

- for redis tests need local redis running

#### HowTo:

```bash
npm run test:worker
# posts 1000 messages to worker thread with object including json 1.7mb
# outputs time latency in ms for each message
# time measurement relies on process.hrtime

npm run test:redis
# posts 1000 messages to worker thread with object including json 1.7mb
# outputs time latency in ms for each received message
# time measurement relies roughly on Date.now()
```
