const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const GreetNewUserProcessor = require('./src/processors/GreetNewUserProcessor');
const ChiaProcessor = require('./src/processors/ChiaProcessor');
const ChiaImageProcessor = require('./src/processors/ChiaImageProcessor');
const MemberCountProcessor = require('./src/processors/MemberCountProcessor');
const GhwKarteProcessor = require('./src/processors/GhwKarteProcessor');
const RssNotificationProcessor = require('./src/processors/RssNotificationProcessor');
const AnswerProcessor = require('./src/processors/AnswerProcessor');
const ExpelliarmusProcessor = require('./src/processors/ExpelliarmusProcessor');
const RandomMessageProcessor = require('./src/processors/RandomMessageProcessor');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Connect to database;
mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
  useMongoClient: true
});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database');

  // Add Processors
  new GreetNewUserProcessor(bot);
  new ChiaProcessor(bot);
  new ChiaImageProcessor(bot);
  new MemberCountProcessor(bot);
  new GhwKarteProcessor(bot);
  new RssNotificationProcessor(bot);
  new AnswerProcessor(bot);
  new ExpelliarmusProcessor(bot);
  new RandomMessageProcessor(bot);
});


// Web Server
// TODO: Split this in extra file
const GhwKarte = require('./src/services/GhwKarte');

const ghwkarte = new GhwKarte();

app.get('/api/ghwkarte/entries', (req, res) => {
  ghwkarte.getAllEntries().then(entries => res.send(entries));
});


const Message = require('./src/model/Message');

app.get('/api/messages', (req, res) => {
  Message.find().then(data => {
    res.send(data);
  });
});

app.use('/', express.static('public'));

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
