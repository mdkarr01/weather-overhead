const request = require('request');
const geocode = require('./geocode');

const darksky = (latitude, longitude, cb) => {
  const url = `https://api.darksky.net/forecast/a74881a8e9a091a88951a9796eccd71a/${latitude}, ${longitude}`;

  request(
    {
      url,
      json: true
    },
    (error, { body }) => {
      if (error) {
        cb('Unable to connect to weather services.');
      } else if (body.error) {
        cb('Misformed address request!');
      } else {
        cb(
          undefined,
          `${body.daily.data[0].summary} The temperature is currently ${body.currently.temperature} degrees with a ${body.currently.precipProbability}% chance of rain.`
        );
      }
    }
  );
};

module.exports = darksky;
