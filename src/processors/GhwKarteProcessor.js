const Processor = require('./Processor');
const GhwKarte = require('../services/GhwKarte');

class GhwKarteProcessor extends Processor {

  constructor(bot) {
    super(bot);

    this.ghwKarte = new GhwKarte();
    this.karteURL = 'https://halbwissenbot.mybluemix.net';

    this.bot.onCommand('ghwkarte', msg => {
      if (msg.parameters === '') {

        this.bot.sendMessage(msg.bot.id, msg.chatId, `Die #ghwkarte findest du auf ${this.karteURL}
Falls du deinen Standort auch zur #ghwkarte hinzufügen möchtest verwende "/ghwkarte ORT"`);

      } else {

        let location = msg.parameters;

        this.ghwKarte.addEntryWithGeocoding(location, location)
          .then(entry => {
            this.bot.sendMessage(msg.bot.id, msg.chatId, `Dein Standort wurde zur #ghwkarte hinzugefügt.
${this.karteURL}`);
          }).catch(error => console.error(error));
      }
    });
  }
}

module.exports = GhwKarteProcessor;
