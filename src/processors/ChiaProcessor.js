const Processor = require('./Processor');

class ChiaProcessor extends Processor {

  constructor(bot) {
    super(bot);

    this.bot.onText(msg => {
      this.onText(msg);
    });
  }

  onText(msg) {
    if (this.shouldReply(msg) && this.checkChia(msg.text)) {
      this.bot.sendMessage(msg.bot.id, msg.chatId, 'SUPERFOOD');
    }
  }

  checkChia(text) {
    text = text.toLowerCase();
    return text.startsWith('chia') || text.indexOf(' chia') !== -1 || text.indexOf('-chia') !== -1;
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

module.exports = ChiaProcessor;