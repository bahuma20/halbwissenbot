const Processor = require('./Processor');

class ExpelliarmusProcessor extends Processor {
  constructor(bot) {
    super(bot);
    let self = this;

    self.answers = [
      'Witzigkeit im Übermaß ist des Menschen größert Schatz.',
      'Viel mehr, als unsere Fähigkeiten sind es unsere Entscheidungen, die zeigen, wer wir wirklich sind.',
      'Schließlich ist der Tod für den gut vorbereiteten Geist nur das nächste große Abenteuer',
      'Natürlich passiert es in deinem Kopf, aber warum um alles in der Welt sollte das bedeuten, dass es nicht wirklich ist?',
      'Sich anzustrengen ist wichtig, aber es gibt etwas was noch wichtiger ist. Ihr müsst immer an euch glauben. Ihr müsst es mal so betrachten: Sämtliche großen Zauberer der Geschichte waren am Anfang nichts anderes als das was wir heute sind: Schüler. Und wenn die es schaffen konnten, können wir das auch!',
      'Die Stimme eines Kindes, egal wie ehrlich und aufrichtig ist bedeutungslos für jene, die verlernt haben zuzuhören.',
      'Aber glaubt mir, dass man Glück und Zuversicht selbst in Zeiten der Dunkelheit zu finden vermag. Man darf nur nicht vergessen ein Licht leuchten zu lassen.',
      'Wenn wir träumen, betreten wir eine Welt, die ganz und gar uns gehört. Vielleicht durchschwimmt er gerade den tiefsten Ozean oder gleitet über die höchste Wolke.',
      'Harry, bedaure nicht die Toten. Bedaure die Lebenden, und besonders all diejenigen, die ohne Liebe leben',
      'Harry, bedaure nicht die Toten. Bedaure die Lebenden, und besonders diejenigen, die ohne Liebe leben.',
      'Es sind nicht unsere Fähigkeiten, die zeigen, wer wir wirklich sind, sondern unsere Entscheidungen.',
      'Happiness can be found, even in the darkest time of life, if one only remembers to turn on the light.',
      'Natürlich passiert es in deinem Kopf, aber warum um alles in der Welt sollte das bedeuten, dass es nicht wirklich ist?',
      'Vor uns liegen dunkle, schwere Zeiten, Harry. Schon bald müssen wir uns entscheiden, zwischen dem richtigen Weg und dem leichten.'
      'Es verlangt sehr viel Mut, sich seinen Feinden in den Weg zu stellen, wesentlich mehr noch, sich seinen Freunden in den Weg zustellen.',
      'Es ist der Wert der Überzeugung, der den Erfolg ausmacht, nicht die Zahl der Anhänger.',
      'Dass Harry tot ist ändert nichts. (Seamus: "Hör auf, Neville!") Tag für Tag sterben Leute! Freunde, Verwandte . . . Ja, heute haben wir Harry verloren. Aber er ist noch bei uns: Hier drin! Genau wie Fred, Remus, Tonks . . . Sie alle. Ihr Tod war nicht sinnlos. Aber Ihrer wird es sein! Weil Sie im Unrecht sind! Harrys Herz hat für uns geschlagen, für jeden von uns! Es ist noch nicht vorbei!'
    ];


    self.bot.onText(/\/expelliarmus/, msg => {
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

module.exports = ExpelliarmusProcessor;
