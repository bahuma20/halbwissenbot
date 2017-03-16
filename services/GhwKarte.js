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
    // TODO: Geocode location
    let lat = 0;
    let lon = 0;

    this.addEntry(name, lat, lon);
  }
}

module.exports = GhwKarte;