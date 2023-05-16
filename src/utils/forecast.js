const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=9a3c21bcc7b943b9c75676e77372faa4&query=" +
    longitude +
    "," +
    latitude +
    "&units=f";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather app", undefined);
    } else if (body.error) {
      callback("dWrong cordinates", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". It is currently " +
          body.current.temperature +
          " degress out. It feels like " +
          body.current.feelslike +
          " degress out. The humidity is " +
          body.current.humidity + "%."
      );
    }
  });
};

module.exports = forecast;
