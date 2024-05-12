import { createQueue } from 'kue';

const queue = createQueue();

const job = queue.create('push_notification_code', {
  phoneNumber: '7054783923',
  message: 'I love you'
}).on('enqueue', () => console.log(`Notification job created: ${job.id}`)
).on('failed attempt', () => console.log('Notification job failed')
).on('complete', () => console.log('Notification job completed')
).save();


