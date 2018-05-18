const Processor = require('./Processor');
const Chat = require('../model/Chat');
const CronJob = require('cron').CronJob;
const Toolbox = require('../Toolbox');

class RandomMessageProcessor extends Processor {
  constructor(bot) {
    super(bot);
    let self = this;

    self.messages = require('../../texts/randomMessages.json');

    this.setupCronjob();
  }

  setupCronjob() {
    let self = this;

    // Every Monday at 10:00 am
    let job = new CronJob('0 0 10 * * 1', () => {
      self.sendMessage();
    }, null, true, 'Europe/Berlin');
  }

  sendMessage() {
    let self = this;
    console.log('notify about a new episode');

    Chat.find().then((chats) => {
      chats.forEach(chat => {
        self.bot.sendMessage(chat.chatId, Toolbox.randomValue(self.messages));
      });
    });
  }
}

module.exports = RandomMessageProcessor;