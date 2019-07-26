const Processor = require('./Processor');

class MemberCountProcessor extends Processor {

  constructor(bot) {
    super(bot);

    this.roundNumbers = [10, 20, 30, 40, 50, 75, 100, 125, 150, 175, 200, 250, 300, 350, 400, 450, 500, 550, 600, 650, 700, 750,
      800, 850, 900, 950, 1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];

    this.schnapsZahlen = [11, 22, 33, 44, 55, 66, 77, 88, 99, 111, 222, 333, 444, 555, 666, 777,
      888, 999, 1111, 2222, 3333];

    this.bot.onNewMember(msg => {
      this.onNewChatParticipant(msg);
    });
  }

  onNewChatParticipant(msg) {
    this.bot.getChatMembersCount(msg.bot.id, msg.chatId)
      .then(count => {

        if (this.roundNumbers.indexOf(count) !== -1) {
          // Send Message with 15 seconds delay
          setTimeout(() => {
            this.bot.sendMessage(msg.bot.id, msg.chatId, `Juhu, in dieser Gruppe sind jetzt schon ${count} Mitglieder!`)
          }, 15000);
        }

        if (this.schnapsZahlen.indexOf(count) !== -1) {
          // Send Message with 15 seconds delay
          setTimeout(() => {
            this.bot.sendMessage(msg.bot.id, msg.chatId, `${count} Mitglieder! Schnapszahl!`);
          }, 15000);
        }

      });
  }
}

module.exports = MemberCountProcessor;
