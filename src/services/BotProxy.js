const TelegramBot = require('node-telegram-bot-api');

class BotProxy {

  constructor() {
    this.botInfos = {
      telegram: {
        id: 'telegram',
        username: process.env.TELEGRAM_BOT_USERNAME,
      }
    };

    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;

    // Create a bot that uses 'polling' to fetch new updates
    this.telegramBot = new TelegramBot(telegramToken, {polling: true});
  }


  /**
   * React on messages that contain text.
   *
   * @param callback The callback function.
   */
  onText(callback) {
    this.telegramBot.on('text', msg => {
      let message = {
        bot: this.botInfos.telegram,
        text: msg.text,
        date: msg.date,
        chatId: msg.chat.id,
      };

      callback(message);
    });
  }


  /**
   * Send a message to a specific chat.
   *
   * @param botId The id of which bot the message should be sent to
   * @param chatId The id of the chat where the message should be sent to
   * @param {string} text The message to send
   */
  sendMessage(botId, chatId, text) {
    switch (botId) {
      case 'telegram':
        this.telegramBot.sendMessage(chatId, text);
        break;

      case 'discord':

        break;
    }
  }
}

module.exports = BotProxy;