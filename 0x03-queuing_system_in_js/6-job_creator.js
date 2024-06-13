import { createQueue } from 'kue';

const queue = createQueue();

const jobData = {
  phoneNumber: '2348069709515',
  message: 'Hello DOE'
}

const job = queue.create('push_notification_code', jobData)
  .on('enqueue', () => console.log(`Notification job created: ${job.id}`))
  .on('complete', () => console.log('Notification job completed'))
  .on('failed attempt', () => console.log('Notification job failed'))
  .save();
