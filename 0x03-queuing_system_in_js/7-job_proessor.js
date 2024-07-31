import { createQueue } from 'kue';

const BLACKLISTED_NUMBERS = ['4153518780', '4153518781'];
const queue = createQueue();

const sendNotification = (phoneNumber, message, job, done) => {
  const sendInterval = setInterval(() => {
    job.progress(0, 100);
    if (BLACKLISTED_NUMBERS.includes(phoneNumber)) {
      done(new Error(`Phone number ${phoneNumber} is blacklisted`));
      clearInterval(sendInterval);
      return;
    }
    job.progress(50, 100);
    console.log(
      `Sending notification to ${phoneNumber},`,
      `with message: ${message}`,
    );
    done();
    clearInterval(sendInterval);
  }, 1000);
};

queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
