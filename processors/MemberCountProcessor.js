const Processor = require('./Processor');

class MemberCountProcessor extends Processor {

  constructor(bot) {
    super(bot);
    let self = this;

    self.roundNumbers = [10, 20, 30, 40, 50, 100, 150, 175, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
      800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];

    self.schnapsZahlen = [11, 22, 33, 44, 55, 66, 77, 88, 99, 111, 222, 333, 444, 555, 666, 777,
      888, 999, 1111, 2222, 3333];

    self.bot.on('new_chat_participant', msg => {
      self.onNewChatParticipant(msg);
    });
  }

  onNewChatParticipant(msg) {
    let self = this;

    this.bot.getChatMembersCount(msg.chat.id).then(count => {
      if (self.roundNumbers.indexOf(count) !== -1) {
        // Send Message with 15 seconds delay
        setTimeout(function() {
          self.bot.sendMessage(msg.chat.id, `Juhu, in dieser Gruppe sind jetzt schon ${count} Mitglieder!`)
        }, 15000);
      }

      if (self.schnapsZahlen.indexOf(count) !== -1) {
        // Send Message with 15 seconds delay
        setTimeout(function() {
          self.bot.sendMessage(msg.chat.id, `${count} Mitglieder! Schnapszahl!`);
        }, 15000);
      }
    });
  }

}

module.exports = MemberCountProcessor;
