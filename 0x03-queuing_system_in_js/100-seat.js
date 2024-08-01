import express from 'express';
import { promisify } from 'util';
import { createQueue } from 'kue';
import { createClient } from 'redis';

const app = express();
const client = createClient({ name: 'reserve_seat' });
const queue = createQueue();
const INITIAL_SEATS_COUNT = 50;
let reservationEnabled = false;
const PORT = 1245;

/**
 * Modifies the number of available seats.
 * @param {number} number - The new number of seats.
 * @returns {Promise<void>}
 */
const reserveSeat = async (number) => {
  const setAsync = promisify(client.set).bind(client);
  await setAsync('available_seats', number);
};

/**
 * Retrieves the number of available seats.
 * @returns {Promise<number>}
 */
const getCurrentAvailableSeats = async () => {
  const getAsync = promisify(client.get).bind(client);
  return Number.parseInt(await getAsync('available_seats') || '0', 10);
};

app.get('/available_seats', async (_, res) => {
  try {
    const numberOfAvailableSeats = await getCurrentAvailableSeats();
    res.json({ numberOfAvailableSeats });
  } catch (error) {
    res.status(500).json({ status: 'Error retrieving available seats', error: error.toString() });
  }
});

app.get('/reserve_seat', (_req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservations are blocked' });
    return;
  }

  try {
    const job = queue.create('reserve_seat');

    job.on('failed', (err) => {
      console.log('Seat reservation job', job.id, 'failed:', err.message || err.toString());
    });
    job.on('complete', () => {
      console.log('Seat reservation job', job.id, 'completed');
    });
    job.save();
    res.json({ status: 'Reservation in process' });
  } catch (error) {
    res.status(500).json({ status: 'Reservation failed', error: error.toString() });
  }
});

app.get('/process', (_req, res) => {
  res.json({ status: 'Queue processing' });

  queue.process('reserve_seat', async (_job, done) => {
    try {
      const availableSeats = await getCurrentAvailableSeats();
      
      if (availableSeats > 0) {
        await reserveSeat(availableSeats - 1);
        reservationEnabled = availableSeats <= 1 ? false : reservationEnabled;
        done();
      } else {
        done(new Error('Not enough seats available'));
      }
    } catch (error) {
      done(new Error('Error processing reservation: ' + error.toString()));
    }
  });
});

const resetAvailableSeats = async (initialSeatsCount) => {
  const setAsync = promisify(client.set).bind(client);
  await setAsync('available_seats', Number.parseInt(initialSeatsCount, 10));
};

app.listen(PORT, async () => {
  try {
    await resetAvailableSeats(process.env.INITIAL_SEATS_COUNT || INITIAL_SEATS_COUNT);
    reservationEnabled = true;
    console.log(`API available on localhost port ${PORT}`);
  } catch (error) {
    console.error('Error resetting available seats:', error.toString());
  }
});

export default app;
