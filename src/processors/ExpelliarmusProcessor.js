const Processor = require('./Processor');
const Toolbox = require('../Toolbox');

class ExpelliarmusProcessor extends Processor {
  constructor(bot) {
    super(bot);

    this.answers = require('../../texts/expelliarmus.json');

    this.bot.onCommand('expelliarmus', msg => {
      console.log('there was a expelliarmus command');
      if (this.shouldReply(msg)) {
        this.bot.sendMessage(msg.bot.id, msg.chatId, Toolbox.randomValue(this.answers));
      }
    });
  }

  shouldReply(msg) {
    // DO NOT REPLY TO OLD MESSAGES
    let currentTime = Date.now() / 1000;

    if(msg.date < currentTime - 60) {
      // If received message older than a minute, don't reply
      return false;
    }

    return true;
  }
}

module.exports = ExpelliarmusProcessor;
