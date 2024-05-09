import { createClient, print } from 'redis';

const client = createClient();

client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));

client.on('connect', () => {
  console.log('Redis client connected to the server');
  setHash('HolbertonSchools', objOfFields);
  getHash('HolbertonSchools');
});

const objOfFields = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2
};

function setHash (hashkey, value) {
  for (const key of Object.keys(value)) {
    client.HSET(hashkey, key, value[key], print);
  }
}

function getHash (hashKey) {
  client.HGETALL(hashKey, (err, value) => {
    if (!err) {
      console.log(value);
    }
  });
}
