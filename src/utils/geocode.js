const request = require("request");

const geocode = (address, cb) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWRrYXJyMDEiLCJhIjoiY2p4b3Zma2g5MGI1ZDNscXVtYjNjcj' +
      'R6ZyJ9.Jx5abht67MVH6IP6khTtSQ&limit=1';

  request({
    url,
    json: true
  }, (error, {body}) => {
    if (error) {
      cb("Unable to connect to location services.");
    } else if (body.features.length === 0) {
      cb("Not a proper location");
    } else {
      cb(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        place: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
