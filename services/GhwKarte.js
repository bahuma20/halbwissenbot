const fetch = require('node-fetch');

class GhwKarte {
  constructor() {
    // TODO: Setup Database Connection
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
  }

  addEntryWithGeocoding(name, query) {
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&address=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });

    let lat = 0;
    let lon = 0;

    this.addEntry(name, lat, lon);
  }
}

module.exports = GhwKarte;