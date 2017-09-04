const Processor = require('./Processor');

class AnswerProcessor extends Processor {
  constructor(bot) {
    super(bot);
    let self = this;

    self.answers = [
      'Halts Maul, ich schlafe...',
      'Ich will jetzt nicht reden...',
      'Keine Zeit mit dir zu reden. Ich muss dieses Level in Candy Crush schaffen...',
      'Ich sortiere gerade meine Briefmarkensammlung. Hab keine Zeit zu schreiben...',
      'Grad keine Zeit zu schreiben. Muss Game of Thrones schauen...',
      'WAS? ICH VERSTEH DICH NICHT, ICH SCHREIE SO LAUT...',
      'Ich mag Züge... Ruummms...'
    ];

    self.bot.on('text', msg => {
      if (msg.text.indexOf('@halbwissenbot') !== -1 && self.shouldReply(msg)) {
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
}

module.exports = AnswerProcessor;