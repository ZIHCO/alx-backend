import { createClient, print } from 'redis';

const client = createClient();

client.on('error', (err) => console.log(`Redis client not connected to the server: ${err}`));

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

const objOfFields = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2
};

Object.keys(objOfFields).forEach((entry) => {
  client.HSET('HolbertonSchools', entry, objOfFields[entry], print);
});

client.HGETALL('HolbertonSchools', (err, data) => {
  if (!err) {
    console.log(data);
  }
});
