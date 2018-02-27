const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
  chatId: {
    type: String,
  },
  msg: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;