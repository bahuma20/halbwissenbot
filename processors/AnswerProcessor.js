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
      'Ich mag Züge... Ruummms...',
      'Habe gerade keine Zeit um mit euch zu reden. Draußen ist gerade ein doppelter Regenbogen aufgetaucht...',
      'Kann gerade nicht sprechen. Kevin steht mit nem Baseballschläger vor mir...',
      'Hab grad keine Zeit zu schreiben. Der Chef steht hinter mir...',
      'Ich will nicht mit dir reden. Du hast nämlich keine Mütze mit Hochklappdings :P',
      'Hab gerade keine Zeit um mit dir zu reden. Muss darüber nachdenken welche Geräusche ein Fuchs macht...',
      'Hab gerade keine Zeit um mit dir zu reden. Muss gerade über eine schwierige Frage nachdenken: Können Pokemon nur ihren Namen sagen oder wurden sie nach dem benannt was sie sagen?',
      'Hab gerade keine Zeit um mit dir zu reden. Muss darüber nachdenken ob Seife dreckig werden kann... Und wenn ja, wie wäscht man sie eigentlich? Gibts Seife-Seife?',
      'Ingo ist gerade nicht da. Ich putz hier nur...',
      'Hab gerade keine Zeit zum schreiben. Bin mit Miley Cyrus auf Tour... I came in like a wrecking ball!',
      'Ingo? Ne der is grad nicht da. Soll ich ihm was ausrichten?',
      'Ich habe gerade keine Zeit um mit dir zu schreiben. In dringenden Fällen wende dich an Siri, Cortana, Alexa, die 112, die Ghostbusters oder das A-Team.',
      'Habe gerade keine Zeit. Jemand hat Otto Waalkes ausgelassen und ich muss jetzt in der ganzen Stadt die Ottifanten wegradieren...',
      'Habe gerade keine Zeit. Spongebob läuft auf Super RTL...'
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