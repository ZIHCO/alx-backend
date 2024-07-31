import { createClient } from 'redis';

const client = createClient();

client.on('connect', () => console.log('Redis client connected to the server'));

client.on('error', (error) => console.log(`Redis client not connected to the server: ${error}`));

client.subscribe('holberton school channel');

client.on('message', (_err, msg) => {
  if (msg !== 'KILL_SERVER') {
    console.log(msg);
  } else {
    client.unsubscribe('holberton school channel');
    client.QUIT();
  }
});
