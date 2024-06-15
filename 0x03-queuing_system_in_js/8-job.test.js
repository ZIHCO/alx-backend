import createPushNotificationsJobs from './8-job.js';
import { createQueue } from 'kue';
import { expect } from 'chai';

const queue = createQueue();

describe('createPushNotificationsJobs', () => {
  before(() => queue.testMode.enter());
  afterEach(() => queue.testMode.clear());
  after(() => queue.testMode.exit());
        
  it('validate job creation', () => {
    const jobs = [
      {
        phoneNumber: '234705678900',
        message: 'I love you no diddy'
      },
      {
        phoneNumber: '234705678900',
        message: 'GM, I love you no diddy'
      },
    ];
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(2);
    console.log(queue.testMode.jobs[0].data);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.eql({
      phoneNumber: '234705678900',
      message: 'I love you no diddy'
    });
  });
});
