export default function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw TypeError('Jobs is an array');
  }
  jobs.forEach((entry) => {
    const job = queue.create('push_notification_code_3', entry)
      .on('enqueue', () => console.log(`Notification job created: ${job.id}`))
      .on('complete', () => console.log(`Notification job ${job.id} completed`))
      .on('failed', (error) => console.log(`Notification job ${job.id} failed: ${error}`))
      .on('progress', (prog) => console.log(`Notification job ${job.id} ${prog}% complete`))
      .save();
  });
}
