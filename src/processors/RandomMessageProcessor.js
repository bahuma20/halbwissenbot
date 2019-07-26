const Processor = require('./Processor');
const Chat = require('../model/Chat');
const CronJob = require('cron').CronJob;
const Toolbox = require('../Toolbox');

class RandomMessageProcessor extends Processor {
  constructor(bot) {
    super(bot);

    this.messages = require('../../texts/randomMessages.json');

    this.setupCronjob();
  }

  setupCronjob() {
    // Every Monday at 10:00 am
    let job = new CronJob('0 0 10 * * 1', () => {
      this.sendMessage();
    }, null, true, 'Europe/Berlin');
  }

  sendMessage() {
    this.bot.getAllChats()
      .then(targets => {
        targets.forEach(target => {
          this.bot.sendMessage(target.bot, target.chatId, Toolbox.randomValue(this.messages))
        });
      });
  }
}

module.exports = RandomMessageProcessor;