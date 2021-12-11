const express = require('express');
const redis = require('redis');
const process = require('process');

const app = express();
const client = redis.createClient({
  process.exit(0);  // Used to crash the program
  //host: 'connectionURL'
  // But you just need to use the container name for the redis-server
  host: 'redis-server',
  port: 6379
});

client.set('visits', 0);

app.get('/', (req, res) => {
  client.get('visits', (err, visits) => {
    res.send('Number of visits is ' + visits);
    client.set('visits', parseInt(visits) + 1);
  });
});

app.listen(8081, () => {
  console.log('Listening on port 8081')
});
