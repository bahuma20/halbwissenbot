const Processor = require('./Processor');

class ChiaImageProcessor extends Processor {

  constructor(bot) {
    super(bot);
    let self = this;

    self.bot.on('text', msg => {
      self.onText(msg);
    })
  }

  onText(msg) {
    if (this.shouldReply(msg) && this.checkChia(msg.text)) {
      this.bot.sendMessage(msg.chat.id, 'SUPERFOOD');
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

module.exports = ChiaImageProcessor;