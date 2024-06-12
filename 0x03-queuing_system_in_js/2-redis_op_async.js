import { createClient, print } from 'redis';
import { promisify } from 'util';

const client = createClient();

client.on('connect', () => console.log('Redis client connected to the server'));

client.on('error', (error) => console.log(`Redis client not connected to the server: ${error}`));

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, print);
}

async function displaySchoolValue(schoolName) {
  client.get = promisify(client.get);
  await client.get(schoolName)
    .then((resp) => console.log(resp))
    .catch((error) => console.log(error));
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
