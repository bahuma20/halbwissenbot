const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECT_STRING);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database');
});
