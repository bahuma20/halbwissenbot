const mongoose = require('mongoose');
const express = require('express');
const BotProxy = require('./src/services/BotProxy');
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
const TiradeProcessor = require('./src/processors/TiradeProcessor');

const GhwKarte = require('./src/services/GhwKarte');

let db;
let bot;

const dbConnect = () => {
  return new Promise((resolve, reject) => {
    db = mongoose.connection;

    db.on('error', e => {
      console.error(e);
      reject(e.message);
    });

    db.once('open', () => {
      console.log('Connected to database');
      resolve();
    });

    // Connect to database;
    mongoose.connect(process.env.MONGODB_CONNECT_STRING, {
      useMongoClient: true
    });
  })
};

const initializeBots = () => {
  return new Promise((resolve, reject) => {
    bot = new BotProxy();

    bot.initialize()
      .then(() => {
        console.log('All bots are initialized');
        resolve();
      }).catch(reject);
  });
};


const startWebserver = () => {
  return new Promise((resolve, reject) => {
    const ghwkarte = new GhwKarte();

    app.get('/api/ghwkarte/entries', (req, res) => {
      ghwkarte.getAllEntries().then(entries => res.send(entries));
    });

    /*const Message = require('./src/model/Message');

    app.get('/api/messages', (req, res) => {
      Message.find().then(data => {
        res.send(data);
      });
    });*/

    app.use('/', express.static('public'));

    app.listen(process.env.PORT || 3000, function () {
      console.log('Webserver running on port 3000!');
      resolve();
    });
  });
};


const addProcessors = () => {
  return new Promise((resolve, reject) => {

    new GreetNewUserProcessor(bot);
    new ChiaProcessor(bot);
    // new ChiaImageProcessor(bot);
    new MemberCountProcessor(bot);
    new GhwKarteProcessor(bot);
    new RssNotificationProcessor(bot);
    new AnswerProcessor(bot);
    new ExpelliarmusProcessor(bot);
    new RandomMessageProcessor(bot);
    new TiradeProcessor(bot);

    resolve();
  });
};


initializeBots()
    .then(dbConnect)
    .then(startWebserver)
    .then(addProcessors)
    .then(() => {
      console.log('Everything is up and running! :-)');
    });
