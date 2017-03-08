const TelegramBot = require('node-telegram-bot-api');
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const greetings = require('./greetings.json');
const niceInsults = require('./niceInsults.json');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // console.log('===New Message:')
  // console.log(msg);

  if(msg.hasOwnProperty('new_chat_member')) {
    let rand1 = random(0, niceInsults.length-1);
    let rand2 = random(0, greetings.length-1);

    let niceInsult = niceInsults[rand1];
    let greeting = greetings[rand2];

    bot.sendMessage(chatId, `Hallo ${msg.new_chat_member.first_name} du ${niceInsult}. ${greeting}`);
  }
});

bot.on('text', (msg) => {
  const chatId = msg.chat.id;

  let text = msg.text;
  text = text.toLowerCase();

  if (text.startsWith('chia') || text.indexOf(' chia') !== -1 || text.indexOf('-chia') !== -1) {
    bot.sendMessage(chatId, 'SUPERFOOD');
  }
});

bot.on('===new_chat_participant:', (event) => {
  // console.log('group join event');
  // console.log(event);
});