const TelegramBot = require('node-telegram-bot-api');

const GreetNewUserProcessor = require('./processors/GreetNewUserProcessor');
const ChiaProcessor = require('./processors/ChiaProcessor');
const MemberCountProcessor = require('./processors/MemberCountProcessor');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Add Processors
new GreetNewUserProcessor(bot);
new ChiaProcessor(bot);
new MemberCountProcessor(bot);
