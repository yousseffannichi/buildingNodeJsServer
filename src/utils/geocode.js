const request = require('postman-request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.MAP_TOKEN}&limit=1`;
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Error hitting the location services', undefined);
        } else if (body.error) {
            callback('there was an error parsing the data', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name,
            });
        }
    });
};

module.exports = { geocode };