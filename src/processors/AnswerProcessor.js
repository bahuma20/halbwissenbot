const Processor = require('./Processor');
const Message = require('../model/Message');
const Toolbox = require('../Toolbox');

class AnswerProcessor extends Processor {
  constructor(bot) {
    super(bot);
    let self = this;

    self.answers = require('../../texts/answers.json');

    self.bot.on('text', msg => {
      if (msg.text.indexOf('@halbwissenbot') !== -1 && self.shouldReply(msg)) {
        self.logMessage(msg);
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

  logMessage(msg) {
    let message = new Message({
      chatId: msg.chatId,
      msg: msg
    });

    message.markModified('msg');

    /*message.save((err, response) => {
      if(err) return console.log(err);
    });*/
  }
}

module.exports = AnswerProcessor;
