const Processor = require('./Processor');
const Toolbox = require('../Toolbox');
const snoowrap = require('snoowrap');

class TiradeProcessor extends Processor {
  constructor(bot) {
    super(bot);

    this.reddit = new snoowrap({
      userAgent: 'nodejs:io.bahuma.halbwissenbot:1.0 (by /u/bahuma20)',
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      username: process.env.REDDIT_USERNAME,
      password: process.env.REDDIT_PASSWORD
    });

    this.bot.onCommand('tirade', (msg) => {
      this.respond(msg);
    });
  }

  shouldReply(msg) {
    // DO NOT REPLY TO OLD MESSAGES
    let currentTime = Date.now() / 1000;

    if(msg.date < currentTime - 60) {
      // If received message older than a minute, don't reply
      return false;
    }

    return true;
  }

  respond(msg) {
    if (this.shouldReply(msg)) {
      this.reddit.search({
        query: 'tirade',
        subreddit: 'de',
        sort: 'top'
      }).then(submissions => {
        let submission = Toolbox.randomValue(submissions);
        let response = `${submission.title}
https://reddit.com${submission.permalink}`;
        this.bot.sendMessage(msg.bot.id, msg.chatId, response);
      });
    }
  }
}

module.exports = TiradeProcessor;
