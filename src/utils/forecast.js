const request = require('postman-request');

const forecast = (lng, lat, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${lat},${lng}&units=f`;

    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback(err.message, undefined);
        } else if (body.error) {
            callback(`Error: ${body.error.info}`, undefined);
        } else {
            callback(
                undefined,
                `It 's ${body.current.weather_descriptions.at(0)}. It is currently ${
          body.current.temperature
        } degrees and it feels like there is ${
          body.current.feelslike
        } out, and there is a ${body.current.precip} % chance of rain `
            );
        }
    });
};

module.exports = { forecast };