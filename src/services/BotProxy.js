const TelegramBot = require('node-telegram-bot-api');
const Discord = require('discord.js');

class BotProxy {

  constructor() {
    this.botInfos = {
      telegram: {
        id: 'telegram',
        username: process.env.TELEGRAM_BOT_USERNAME,
      },
      discord: {
        id: 'discord',
        username: process.env.DISCORD_CLIENT_ID,
      },
    };



    // TELEGRAM
    const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
    // Create a bot that uses 'polling' to fetch new updates
    this.telegramBot = new TelegramBot(telegramToken, {polling: true});



    // DISCORD
    this.discordBot = new Discord.Client();

    this.discordBot.once('ready', e => {
      console.log('Discord Bot Ready');
    });

    this.discordBot.login(process.env.DISCORD_BOT_TOKEN);
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


    this.discordBot.on('message', msg => {
      let message = {
        bot: this.botInfos.discord,
        text: msg.content,
        date: Math.round(msg.createdTimestamp / 1000),
        chatId: msg.channel.id,
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
        let channel = this.discordBot.channels.find('id', chatId);

        if (channel) {
          channel.send(text);
        }

        break;
    }
  }
}

module.exports = BotProxy;