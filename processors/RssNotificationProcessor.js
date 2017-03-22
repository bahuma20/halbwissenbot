const Processor = require('./Processor');
const CronJob = require('cron').CronJob;
const feedparser = require('feedparser-promised');
const FeedStatus = require('../model/FeedStatus');

class RssNotificationProcessor extends Processor {

  constructor(bot) {
    super(bot);

    let self = this;

    self.setupCronjob();
  }

  setupCronjob() {
    let self = this;

    self.checkForNewReleases();

    let job = new CronJob('0 * * * * *', () => {
      self.checkForNewReleases();
    }, null, true, 'Europe/Berlin');
  }

  checkForNewReleases() {
    console.log('check now');

    const feedURL = 'http://halbwissen.co/feed/mp3';

    feedparser.parse(feedURL)
      .then(items => {
        let guid = items[0].guid;

        FeedStatus.findOne({}, 'lastGuid', (err, feedStatus) => {
          console.log(feedStatus);
        });
      }).catch(error => {
        console.log(error);
      });
  }

  initialize() {
    let feedStatus = new FeedStatus();
    feedStatus.lastGuid = 0;
    feedStatus.save();
  }

  updateFeedStatus(newGuid) {
    FeedStatus.findOne({}, (err, feedStatus) => {
      feedStatus.lastGuid = newGuid;
      feedStatus.save();
    });
  }
}

module.exports = RssNotificationProcessor;