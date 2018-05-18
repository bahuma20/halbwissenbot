const mongoose = require('mongoose');
const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const GreetNewUserProcessor = require('./processors/GreetNewUserProcessor');
const ChiaProcessor = require('./processors/ChiaProcessor');
const ChiaImageProcessor = require('./processors/ChiaImageProcessor');
const MemberCountProcessor = require('./processors/MemberCountProcessor');
const GhwKarteProcessor = require('./processors/GhwKarteProcessor');
const RssNotificationProcessor = require('./processors/RssNotificationProcessor');
const AnswerProcessor = require('./processors/AnswerProcessor');
const ExpelliarmusProcessor = require('./processors/ExpelliarmusProcessor');
const RandomMessageProcessor = require('./processors/RandomMessageProcessor');

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Connect to database;
mongoose.connect(process.env.MONGODB_CONNECT_STRING);

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
const GhwKarte = require('./services/GhwKarte');

const ghwkarte = new GhwKarte();

app.get('/api/ghwkarte/entries', (req, res) => {
  ghwkarte.getAllEntries().then(entries => res.send(entries));
});


const Message = require('./model/Message');

app.get('/api/messages', (req, res) => {
  Message.find().then(data => {
    res.send(data);
  });
});

app.use('/', express.static('public'));

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
