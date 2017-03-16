const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECT_STRING);



const GhwKarte = require('./services/GhwKarte');
const ghwkarte = new GhwKarte();

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to database');
});

app.get('/api/ghwkarte/entries', (req, res) => {
  ghwkarte.getAllEntries().then(entries => res.send(entries));
});

app.use('/', express.static('public'));

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
