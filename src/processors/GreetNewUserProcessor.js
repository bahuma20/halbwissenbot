const Processor = require('./Processor');
const Toolbox = require('../Toolbox');

class GreetNewUserProcessor extends Processor {
  constructor(bot) {
    super(bot);
    let self = this;

    self.greetings = require('../../texts/greetings.json');
    self.niceInsults = require('../../texts/niceInsults.json');

    bot.getMe().then(botInfo => {
      self.botId = botInfo.id;
    });

    self.bot.on('new_chat_members', msg => {
      self.onNewChatParticipant(msg);
    });
  }

  onNewChatParticipant(msg) {
    let self = this;

    if (self.shouldReply(msg)) {
      self.bot.sendMessage(msg.chat.id, `Hallo ${msg.new_chat_participant.first_name} du ${Toolbox.randomValue(this.niceInsults)}. ${Toolbox.randomValue(this.greetings)}`);

//      setTimeout(function() {
//        self.bot.sendMessage(msg.chat.id, 'Arbeitest du zufällig in der Automobilbranche?');
//      }, 3000);
    }

  }

  shouldReply(msg) {
    // DO NOT REPLY WHEN THE USER WHO JOINED IS THE BOT HIMSELF
    if (msg.new_chat_member.id === this.botId) {
      return false;
    }

    return true;
  }
}

module.exports = GreetNewUserProcessor;
