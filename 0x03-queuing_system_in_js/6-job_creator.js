import { createQueue } from 'kue';

const queue = createQueue();

const job = queue.create('push_notification_code', {
  phoneNumber: '7054783923',
  message: 'I love you'
}).save((err) => {
  if (err) {
    console.log('Notification job failed');
  } else {
    console.log(`Notification job created: ${job.id}`);
  }
});

job.on('complete', () => console.log('Notification job completed'));
