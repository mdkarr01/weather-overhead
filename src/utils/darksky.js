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
      const temp = Math.round(body.currently.temperature);
      const tempHigh = Math.round(body.daily.data[0].temperatureHigh);
      const tempLow = Math.round(body.daily.data[0].temperatureLow);
      const wind = Math.round(body.daily.data[0].windGust);
      if (error) {
        cb('Unable to connect to weather services.');
      } else if (body.error) {
        cb('Misformed address request!');
      } else {
        cb(
          undefined,
          `${body.daily.data[0].summary} The temperature is currently ${temp} degrees with a ${body.currently.precipProbability}% chance of rain. The high for today will be ${tempHigh} degrees with a low of ${tempLow}. Winds will gust to ${wind} mph.`
        );
      }
    }
  );
};

module.exports = darksky;
