const TelegramBot = require('node-telegram-bot-api');
const Discord = require('discord.js');

class BotProxy {

  constructor() {
    this.botInfos = {
      telegram: {
        id: 'telegram',
        username: process.env.TELEGRAM_BOT_USERNAME,
        mainChatIds: new Set(), // a list of chat ids which are considered as the main chat / channel
        commandPrefix: '/',
      },
      discord: {
        id: 'discord',
        username: process.env.DISCORD_CLIENT_ID,
        mainChatIds: new Set(), // a list of chat ids which are considered as the main chat / channel
        commandPrefix: '/',
      },
    };

    this.discordBot = null;
    this.telegramBot = null;
  }


  /**
   * Has to be called as the first method.
   * Creates all different bots and executes some startup actions.
   * Returns a promise when everything is ready.
   *
   * @returns {Promise}
   */
  initialize() {
    return new Promise((resolve, reject) => {
      // TELEGRAM
      // Create a bot that uses 'polling' to fetch new updates
      this.telegramBot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {polling: true});
      console.log('Telegram Bot Ready');

      this.telegramBot.on('polling_error', (error) => {
        console.error(error);  // => 'EFATAL'
      });

      // DISCORD
      this.discordBot = new Discord.Client();

      this.discordBot.once('ready', e => {
        console.log('Discord Bot Ready');

        // Store all systemChannelIDs in the botInfos
        this.discordBot.guilds.forEach(guild => {
          if (guild.systemChannelID) {
            this.botInfos.discord.mainChatIds.add(guild.systemChannelID);
          }
        });

        resolve();
      });

      this.discordBot.login(process.env.DISCORD_BOT_TOKEN);
    });
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
        chatId: msg.chat.id,
        text: msg.text,
        date: msg.date,
      };

      callback(message);
    });


    this.discordBot.on('message', msg => {
      let message = {
        bot: this.botInfos.discord,
        chatId: msg.channel.id,
        text: msg.content,
        date: Math.round(msg.createdTimestamp / 1000),
      };

      callback(message);
    });
  }


  /**
   * Adds an event listener when a command is issued.
   * The prefix of the command is configured at bot level.
   *
   * @param command
   *   The command (without prefix) on which the callback should be fired.
   * @param callback
   *   A function that gets a msg object passed.
   *   msg.parameters contains all text after the command.
   *   msg.text is not available.
   */
  onCommand(command, callback) {
    this.telegramBot.on('text', msg => {
      let text = msg.text;
      let prefix = this.botInfos.telegram.commandPrefix;
      let username = this.botInfos.telegram.username;

      let searchStrings = [
        prefix + command + '@' + username,
        prefix + command,
      ];

      let alreadySent = false;

      searchStrings.forEach(searchString => {
        if (!alreadySent && text.startsWith(searchString)) {
          let parameters = text.replace(searchString, '');
          parameters = parameters.trim();

          let message = {
            bot: this.botInfos.telegram,
            chatId: msg.chat.id,
            parameters: parameters,
            date: msg.date,
          };

          alreadySent = true;

          callback(message);
        }
      });
    });

    this.discordBot.on('message', msg => {
      let text = msg.content;
      let prefix = this.botInfos.discord.commandPrefix;

      if (text.startsWith(prefix + command)) {
        let parameters = text.replace(prefix + command, '');
        parameters = parameters.trim();

        let message = {
          bot: this.botInfos.discord,
          chatId: msg.channel.id,
          parameters: parameters,
          date: Math.round(msg.createdTimestamp / 1000),
        };

        callback(message);
      }
    });
  }


  /**
   * React when a new member joins a channel.
   *
   * @param callback
   */
  onNewMember(callback) {
    this.telegramBot.on('new_chat_members', msg => {
      let message = {
        bot: this.botInfos.telegram,
        chatId: msg.chat.id,
        newMember: {
          name: msg.new_chat_participant.first_name,
          id: msg.new_chat_member.id,
        }
      };

      callback(message);
    });

    this.discordBot.on("guildMemberAdd", member => {
      let message = {
        bot: this.botInfos.discord,
        chatId: member.guild.systemChannelID, // This is the id configured in the guild settings where the welcome messages should be sent to.
        newMember: {
          name: member.user.username,
          id: member.user.id,
        }
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

  getChatMembersCount(bot, chatId) {
    return new Promise((resolve, reject) => {
      if (bot === 'telegram') {
        this.telegramBot.getChatMembersCount(chatId).then(count => {
          resolve(count);
        });
      }

      if (bot === 'discord') {
        let channel = this.discordBot.channels.find('id', chatId);
        resolve(channel.guild.memberCount);
      }
    });
  }
}

module.exports = BotProxy;