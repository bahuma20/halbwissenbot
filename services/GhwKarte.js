const fetch = require('node-fetch');
const GhwKarteEntry = require('../model/GhwKarteEntry');

class GhwKarte {
  constructor() {
  }

  getAllEntries() {
    return new Promise((resolve, reject) => {
      resolve([
        {
          lat: 49,
          lon: -111,
          name: 'Punkt im Nirgendwo'
        },
        {
          lat: 49.03,
          lon: 11.58,
          name: 'Dietfurt'
        },
      ]);
    });
  }

  addEntry(name, lat, lon) {
    // TODO: Save entry in database
    return new Promise((resolve, reject) => {
      resolve();
      let entry = new GhwKarteEntry({
        name: name,
        lat: lat,
        lon: lon
      });

      entry.save().then(() => {
        console.log('Added entry to #ghwkarte');
      }).error(err => console.log(err));
    });
  }

  addEntryWithGeocoding(name, query) {
    let self = this;
    return new Promise((resolve, reject) => {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&address=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 'OK') {
            let lat = data.results[0].geometry.location.lat;
            let lon = data.results[0].geometry.location.lng;

            self.addEntry(name, lat, lon);
            resolve({name: name, lat: lat, lon: lon});
          } else {
            reject(data);
          }
        });
    });
  }
}

module.exports = GhwKarte;