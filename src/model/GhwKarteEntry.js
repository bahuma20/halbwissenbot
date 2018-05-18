const mongoose = require('mongoose');

const ghwKarteEntrySchema = mongoose.Schema({
  name: String,
  lat: Number,
  lon: Number
});

const GhwKarteEntry = mongoose.model('GhwKarteEntry', ghwKarteEntrySchema);

module.exports = GhwKarteEntry;