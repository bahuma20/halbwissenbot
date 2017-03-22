const Processor = require('./Processor');
const CronJob = require('cron').CronJob;

class RssNotificationProcessor extends Processor {

  constructor(bot) {
    super(bot);

    let self = this;

    self.setupCronjob();
  }

  setupCronjob() {
    let self = this;

    let job = new CronJob('* * * * * *', () => {
      self.checkForNewReleases();
    }, null, true, 'Europe/Berlin');
  }

  checkForNewReleases() {
    console.log('check now');
  }
}

module.exports = RssNotificationProcessor;