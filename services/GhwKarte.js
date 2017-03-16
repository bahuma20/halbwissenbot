const fetch = require('node-fetch');
const GhwKarteEntry = require('../model/GhwKarteEntry');

class GhwKarte {
  constructor() {
  }

  getAllEntries() {
    return new Promise((resolve, reject) => {
      GhwKarteEntry.find().then(data => {
        resolve(data);
      }).catch(error => reject(error));
    });
  }

  addEntry(name, lat, lon) {
    return new Promise((resolve, reject) => {
      let entry = new GhwKarteEntry({
        name: name,
        lat: lat,
        lon: lon
      });

      entry.save().then(() => {
        resolve();
        console.log('Added entry to #ghwkarte');
      }).catch(err => reject(err));
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