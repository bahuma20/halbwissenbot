const TelegramBot = require('node-telegram-bot-api');
const express = require('express');

let app = express();

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const greetings = require('./greetings.json');
const niceInsults = require('./niceInsults.json');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

bot.on('message', (msg) => {
  // DO NOT REPLY TO OLD MESSAGES
  let currentTime = Date.now() / 1000;

  if (msg.date < currentTime - 60) {
    // If received message older than a minute, don't reply
    return;
  }


  const chatId = msg.chat.id;

  // console.log('===New Message:')
  // console.log(msg);

  if(msg.hasOwnProperty('new_chat_member')) {
    // GREET NEW USERS
    let rand1 = random(0, niceInsults.length-1);
    let rand2 = random(0, greetings.length-1);

    let niceInsult = niceInsults[rand1];
    let greeting = greetings[rand2];

    bot.sendMessage(chatId, `Hallo ${msg.new_chat_member.first_name} du ${niceInsult}. ${greeting}`);
  }
});

bot.on('text', (msg) => {
  // DO NOT REPLY TO OLD MESSAGES
  let currentTime = Date.now() / 1000;

  if (msg.date < currentTime - 60) {
    // If received message older than a minute, don't reply
    return;
  }


  const chatId = msg.chat.id;

  // ANSWER SUPERFOOD TO CHIA MESSAGES
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


// Start HTTP Server (Heroku requires one)
app.use(express.static('public'));

let listener = app.listen(process.env.PORT || process.env.port || 3000, function() {
  console.log(`Express is listening on port ${listener.address().port}`);
});