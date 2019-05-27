const Processor = require('./Processor');
const Toolbox = require('../Toolbox');
const snoowrap = require('snoowrap');

class TiradeProcessor extends Processor {
  constructor(bot) {
    super(bot);
    let self = this;

    self.reddit = new snoowrap({
      userAgent: 'nodejs:io.bahuma.halbwissenbot:1.0 (by /u/bahuma20)',
      clientId: 'FTh4CuD5ZiqmfA',
      clientSecret: 'my-1nnemFe9t1rhSlZXiNGzpNfo',
      username: 'halbwissenbot',
      password: 'RRrwReRh7'
    });

    self.bot.onText(/\/tirade$/, function(msg) {
      self.respond(msg);
    });

    self.bot.onText(/\/tirade@halbwissenbot$/, function(msg) {
      self.respond(msg);
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
    let self = this;

    if (this.shouldReply(msg)) {
      self.reddit.search({
        query: 'tirade',
        subreddit: 'de',
        sort: 'top'
      }).then(submissions => {
        let submission = Toolbox.randomValue(submissions);
        let response = `${submission.title}
https://reddit.com${submission.permalink}`;
        self.bot.sendMessage(msg.chat.id, response);
      });
    }
  }
}

module.exports = TiradeProcessor;
