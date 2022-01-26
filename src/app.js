const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geolocation = require('geolocation');
const { geocode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');
require('dotenv').config({ path: './config.env' });

const app = express();

//Set up static directory to serve
app.use(express.static(path.join(__dirname, '../public')));
// set path for Express config and Redirect Express to use another directory for the views view engine other than the default one (views folder),
app.set('views', path.join(__dirname, `../templates/views`));
// Register a partial for the view engine
hbs.registerPartials(path.join(__dirname, '../templates/partials'));

// setting up the template engine
app.set('view engine', 'hbs');

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address to get weather info! for',
        });
    }

    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error });
            }
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }
                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address,
                });
            });
        }
    );
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must send a search term',
        });
    }
    console.log(req.query);
    res.send({
        products: [],
    });
});

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Youssef Fannichi',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'the about us page',
        name: 'Youssef Fannichi',
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'please help me to study good please',
        title: 'help page',
        name: 'Youssef Fannichi',
    });
});

app.get('/help/*', (req, res) => {
    res.render('errorPage', {
        title: 'Error',
        error: 'help article is not found! 404',
        name: 'Youssef Fannichi',
    });
});

app.get('*', (req, res) => {
    res.render('errorPage', {
        title: 'Error',
        error: 'PAGE NOT FOUND! 404',
        name: 'Youssef Fannichi',
    });
});
app.listen(8000, () => {
    console.log('Listening on port 8000...');
});