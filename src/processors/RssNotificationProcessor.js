const Processor = require('./Processor');
const CronJob = require('cron').CronJob;
const feedparser = require('feedparser-promised');

const FeedStatus = require('../model/FeedStatus');
const Chat = require('../model/Chat');

class RssNotificationProcessor extends Processor {

  constructor(bot) {
    super(bot);

    let self = this;

    // Save chat ids of messages in this session in the temp storage so that the requests dont have to go against the database on every message
    self.chatTempStorage = [];

    // On every message, check if the channel of the message is saved in the database. If not: Add it.
    self.bot.onText(msg => {
      if (msg.bot.id === 'telegram') { // Only store telegram channels. On discord we use the guilds systemchannel setting.
        if (self.chatTempStorage.indexOf(msg.chatId) === -1) {
          self.registerChat(msg.chatId);
          self.chatTempStorage.push(msg.chatId);
        }
      }
    });


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

    let targets = new Set();

    // Add discord mainChatIds to targets
    this.bot.botInfos.discord.mainChatIds.forEach(chatId => {
      targets.add({
        bot: 'discord',
        chatId: chatId,
      });
    });

    // Add telegram chats to targets
    const addTelegramChats = () =>{
      return Chat.find().then((chats) => {
        chats.forEach(chat => {
          targets.add({
              bot: 'telegram',
              chatId: chat.chatId,
          });
        });
      });
    };

    addTelegramChats()
      .then(() => {
        // Send messages to targets
        targets.forEach(target => {
          self.bot.sendMessage(target.bot, target.chatId, `Eine neue Folge ist raus:
${item.link}
#ghwfolge`);
        });
      });
  }

  registerChat(chatId) {
    console.log('check if should register ' + chatId);
    let query = Chat.where({chatId: chatId});

    // Check if this group is already in the database and if not, add it.
    query.findOne((err, chat) => {
      if (err) console.log(err);

      if (chat === null) {
        console.log('Register new chat ' + chatId);
        let chat = new Chat({chatId: chatId});
        chat.save();
      }
    });
  }
}

module.exports = RssNotificationProcessor;