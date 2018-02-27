const Processor = require('./Processor');
const Message = require('../model/Message');

class AnswerProcessor extends Processor {
  constructor(bot) {
    super(bot);
    let self = this;

    self.answers = require('../answers.json');

    self.bot.on('text', msg => {
      if (msg.text.indexOf('@halbwissenbot') !== -1 && self.shouldReply(msg)) {
        self.logMessage(msg);
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

  logMessage(msg) {
    let message = new Message({
      chatId: msg.chatId,
      msg: msg
    });

    message.markModified('msg');

    message.save((err, response) => {
      if(err) return console.log(err);
    });
  }
}

module.exports = AnswerProcessor;