const request = require("postman-request");

const geocode = (addres, callback) => {
  const url = "http://api.positionstack.com/v1/forward?access_key=9ef32a8ca621aecde0033d26e4134028&query=" +
    encodeURIComponent(addres) +"&limit=1";
    
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect to location services!", undefined);
    } 
    //else {console.log(body);}
    
    //else if (!body.data[0]) {
    else if (body.error) {
    callback("No location found", undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].name + ", " + body.data[0].country,
      });
    }
  });
};

module.exports = geocode;
