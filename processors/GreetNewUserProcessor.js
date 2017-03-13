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
    let self = this;

    if (self.shouldReply(msg)) {
      self.bot.sendMessage(msg.chat.id, `Hallo ${msg.new_chat_participant.first_name} du ${self.randomValue(this.niceInsults)}. ${self.randomValue(this.greetings)}`);

      setTimeout(function() {
        self.bot.sendMessage(msg.chat.id, 'Arbeitest du zufällig in der Automobilbranche?');
      }, 3000);
    }

  }

  shouldReply(msg) {
    // DO NOT REPLY WHEN THE USER WHO JOINED IS THE BOT HIMSELF
    if (msg.new_chat_member.id === this.botId) {
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

module.exports = GreetNewUserProcessor;