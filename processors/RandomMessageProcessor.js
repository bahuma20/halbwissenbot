const Processor = require('./Processor');
const Chat = require('../model/Chat');
const CronJob = require('cron').CronJob;

class RandomMessageProcessor extends Processor {
  constructor(bot) {
    super(bot);
    let self = this;

    self.messages = [
      `Hey Leute,
worauf freut ihr euch diese Woche besonders?`,
    ];

    this.setupCronjob();
  }

  randomValue(array) {
    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return array[random(0, array.length - 1)];
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
        self.bot.sendMessage(chat.chatId, this.randomValue(self.messages));
      });
    });
  }
}

module.exports = RandomMessageProcessor;