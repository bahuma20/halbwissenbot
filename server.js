const express = require('express');
const app = express();

const GhwKarte = require('./services/GhwKarte');
const ghwkarte = new GhwKarte();


app.get('/api/ghwkarte/entries', (req, res) => {
  ghwkarte.getAllEntries().then(entries => res.send(entries));
});

app.use('/', express.static('public'));

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
