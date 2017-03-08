const restify = require('restify');
const builder = require('botbuilder');

// Bot Setup
// Setup Restify Server
let server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, () => {
  console.log('%s listening to %s', server.name, server.url);
});

// Create chat bot
let connector = new builder.ChatConnector({
  appId: process.env.MICROSOFT_APP_ID,
  appPassword: process.env.MICROSOFT_APP_PASSWORD
});


// Bots Dialogs

bot.dialog('/', session => session.send('Hello World'));
