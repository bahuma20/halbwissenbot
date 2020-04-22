const Processor = require('./Processor');
const CronJob = require('cron').CronJob;
const feedparser = require('feedparser-promised');

const FeedStatus = require('../model/FeedStatus');
const Chat = require('../model/Chat');

class RssNotificationProcessor extends Processor {

  constructor(bot) {
    super(bot);

    let self = this;

    self.setupCronjob();
  }

  setupCronjob() {
    let self = this;

    self.checkForNewReleases();

    let job = new CronJob('0 */10 * * * *', () => {
      self.checkForNewReleases();
    }, null, true, 'Europe/Berlin');
  }

  checkForNewReleases() {
    let self = this;
    console.log('check for new releases');

    const feedURL = 'http://halbwissen.co/feed/mp3';

    feedparser.parse(feedURL)
      .then(items => {
        let guid = items[0].guid;

        FeedStatus.findOne({}, 'lastGuid', (err, feedStatus) => {
          if (feedStatus === null) {
            self.initialize().then(() => {
              self.updateFeedStatus(guid);
            });
          } else if (feedStatus.lastGuid !== guid) {
            self.updateFeedStatus(guid);
            self.notifyAboutEpisode(items[0]);
          }
        });
      }).catch(error => {
        console.log(error);
      });
  }

  initialize() {
    let feedStatus = new FeedStatus({
      lastGuid: '0'
    });

    return feedStatus.save();
  }

  updateFeedStatus(newGuid) {
    FeedStatus.findOne({}, (err, feedStatus) => {
      feedStatus.lastGuid = newGuid;
      feedStatus.save();
    });
  }

  notifyAboutEpisode(item) {
    let self = this;
    console.log('notify about a new episode');

    this.bot.getAllChats()
      .then(targets => {
        // Send messages to targets
        targets.forEach(target => {
          self.bot.sendMessage(target.bot, target.chatId, `Eine neue Folge ist raus:
${item.link}
#ghwfolge`);
        });
      });
  }
}

module.exports = RssNotificationProcessor;
