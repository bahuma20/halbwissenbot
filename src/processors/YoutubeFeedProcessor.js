const Processor = require('./Processor');
const CronJob = require('cron').CronJob;
const fetch = require('node-fetch');

class YoutubeFeedProcessor extends Processor {

  constructor(bot) {
    super(bot);

    this.tempStoreAlreadyNotified = [];

    this.setupCronjob();
  }

  setupCronjob() {
    let self = this;

//     self.checkForLivestream();

    let job = new CronJob('0 */15 * * * *', () => {
      self.checkForLivestream();
    }, null, true, 'Europe/Berlin');
  }

  checkForLivestream() {
    let self = this;
    console.log('check for livestream');

    let channelId = process.env.YOUTUBE_CHANNEL_ID;
    let apiKey = process.env.YOUTUBE_API_KEY;

    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${apiKey}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        if (!data.hasOwnProperty('items')) {
          console.log(data);
          return;
        }
      
        if (data.items.length > 0) {
          let videoId = data.items[0].id.videoId;
          console.log('found live stream with video id ' + videoId);

          if (this.tempStoreAlreadyNotified.indexOf(videoId) === -1) {
            this.tempStoreAlreadyNotified.push(videoId);
            this.notifyAboutStream(data.items[0]);
          }
        }
      });
  }

  notifyAboutStream(item) {
    console.log('notify about a live stream');

    this.bot.getAllChats()
      .then(targets => {
        // Send messages to targets
        targets.forEach(target => {
          this.bot.sendMessage(target.bot, target.chatId, `🔴 [LIVE] 🔴 
Es wurde gerade ein Live-Stream von Gefährliches Halbwissen gestartet!

https://youtube.com/watch?v=${item.id.videoId}`);
        });
      });
  }
}

module.exports = YoutubeFeedProcessor;
