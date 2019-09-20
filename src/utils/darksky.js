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
          `${body.daily.data[0].summary} The temperature is currently ${body.currently.temperature} degrees with a ${body.currently.precipProbability}% chance of rain. The high for today will be ${body.daily.data[0].temperatureHigh} degrees with a low of ${body.daily.data[0].temperatureLow}. Winds will gust to ${body.daily.data[0].windGust} mph.`
        );
      }
    }
  );
};

module.exports = darksky;
