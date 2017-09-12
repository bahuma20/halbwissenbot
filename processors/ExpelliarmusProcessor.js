const Processor = require('./Processor');

class ExpelliarmusProcessor extends Processor {
  constructor(bot) {
    super(bot);
    let self = this;

    self.answers = require('../expelliarmus.json');


    self.bot.onText(/\/expelliarmus/, msg => {
      if (self.shouldReply(msg)) {
        self.bot.sendMessage(msg.chat.id, self.randomValue(self.answers));
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

  randomValue(array) {
    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return array[random(0, array.length - 1)];
  }
}

module.exports = ExpelliarmusProcessor;
