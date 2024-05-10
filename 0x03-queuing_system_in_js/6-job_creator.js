import { createQueue } from 'kue';

const push_notification_code = createQueue();

const job = push_notification_code.create('message', {
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
