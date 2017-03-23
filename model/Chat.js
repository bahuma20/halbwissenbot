const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
  chatId: {
    type: String,
    unique: true
  },
  rssenabled: {
    type: Boolean,
    default: true
  }
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;