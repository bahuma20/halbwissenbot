const Processor = require('./Processor');

class GreetNewUserProcessor extends Processor {
  constructor(bot) {
    super(bot);
    let self = this;

    self.greetings = require('../greetings.json');
    self.niceInsults = require('../niceInsults.json');

    bot.getMe().then(botInfo => {
      self.botId = botInfo.id;
    });

    self.bot.on('new_chat_participant', msg => {
      self.onNewChatParticipant(msg);
    });
  }

  onNewChatParticipant(msg) {
    console.log('new user joined');
    console.log(msg);

    this.bot.sendMessage(msg.chat.id, `Hallo ${msg.new_chat_participant.first_name} du ${this.randomValue(this.niceInsults)}. ${this.randomValue(this.greetings)}`);
  }

  randomValue(array) {
    function random(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return array[random(0, array.length - 1)];
  }
}

module.exports = GreetNewUserProcessor;