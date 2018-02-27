const Processor = require('./Processor');
const downloadFile = require('download-file');
const fs = require('fs');
const request = require('request');
const DataURI = require('datauri').promise;

class ChiaImageProcessor extends Processor {

  constructor(bot) {
    super(bot);
    let self = this;

    self.bot.on('message', msg => {
      if (msg.hasOwnProperty('photo')) {
          console.log('received photo. Checking it for chia...');

          let photo = msg.photo[msg.photo.length - 1];
          self.bot.getFileLink(photo.file_id).then(fileLink => {

              let ending = fileLink.substr(fileLink.length - 4, fileLink.length);

              if (['.jpg', '.png', 'jpeg'].indexOf(ending) !== -1) {

                  let parts = fileLink.split('/');
                  let fileName = photo.file_id + '_' + parts[parts.length -1];

                  downloadFile(fileLink, {directory: './tmp/', filename: fileName}, function(err) {
                      if (err) return console.log(err);
                      console.log('downloaded file');

                      DataURI('./tmp/' + fileName).then(base64Image => {
                          request.post('https://api.ocr.space/parse/image', {
                              form: {
                                  apikey: process.env.OCR_SPACE_API_KEY,
                                  base64Image: base64Image,
                                  language: 'ger'
                              }
                          }, function (error, response, body) {
                              if (error) {
                                console.log('--OCR Error--');
                                console.log(error);
                                console.log(response);
                                console.log(body);
                                console.log('--OCR Error End--');
                                return;
                              }

                              let result = JSON.parse(body);
                              let imageText = result.ParsedResults[0].ParsedText;

                              console.log('Extracted text from image: ');
                              console.log('=== CUT HERE ===');
                              console.log(imageText);
                              console.log('=== CUT HERE ===');

                              if (imageText.toLowerCase().indexOf('chia') !== -1 && self.shouldReply(msg)) {
                                  self.bot.sendMessage(msg.chat.id, 'SUPERFOOD');
                              }
                          });
                      });
                  });
              }
          });

      }
    });
  }

  shouldReply(msg) {
    // DO NOT REPLY TO OLD MESSAGES
    let currentTime = Date.now() / 1000;

    return msg.date >= currentTime - 60;
  }
}

module.exports = ChiaImageProcessor;