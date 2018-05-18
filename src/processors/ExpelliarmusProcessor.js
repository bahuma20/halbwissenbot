const Processor = require('./Processor');
const Toolbox = require('../Toolbox');

class ExpelliarmusProcessor extends Processor {
  constructor(bot) {
    super(bot);
    let self = this;

    self.answers = require('../../texts/expelliarmus.json');


    self.bot.onText(/\/expelliarmus/, msg => {
      if (self.shouldReply(msg)) {
        self.bot.sendMessage(msg.chat.id, Toolbox.randomValue(self.answers));
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
