const mongoose = require('mongoose');

const feedStatusSchema = mongoose.Schema({
  lastGuid: String,
});

const FeedStatus = mongoose.model('FeedStatus', feedStatusSchema);

module.exports = FeedStatus;