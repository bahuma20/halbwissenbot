const Processor = require('./Processor');
const Message = require('../model/Message');
const Toolbox = require('../Toolbox');

class AnswerProcessor extends Processor {
  constructor(bot) {
    super(bot);

    this.answers = require('../../texts/answers.json');

    this.bot.onText(msg => {
      let searchStrings = [
        '<@' + msg.bot.username + '>',
        '@' + msg.bot.username,
      ];

      let alreadyAnswered = false;

      searchStrings.forEach(searchString => {
        if (!alreadyAnswered && (msg.text.startsWith(searchString) || msg.text.indexOf(' ' + searchString) !== -1) && this.shouldReply(msg)) {
          alreadyAnswered = true;
          this.logMessage(msg);
          this.bot.sendMessage(msg.bot.id, msg.chatId, Toolbox.randomValue(this.answers));
        }
      });
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
