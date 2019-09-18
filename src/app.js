require('dotenv').config();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const geocode = require('./utils/geocode');
const darksky = require('./utils/darksky');
const express = require('express');

const app = express();

// set up Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

// set up handlebars engine and location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

// set up to use the paths for the static directory
app.use(express.static(publicDirectoryPath));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// set local variables middleware
app.use(function(req, res, next) {
  // set default page title
  res.locals.name = 'Michael Karr';
  // continue on to next function in middleware chain
  next();
});

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather Overhead'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is some helpful text.',
    title: 'Help'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Please provide an address'
    });
  }

  geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
    if (error) {
      return res.send({ error });
    }
    darksky(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        address: req.query.address,
        forecast: forecastData,
        location: place
      });
      // console.log(`The forecast for ${place} is ${forecastData}`);
    });
  });
});

// Could have provided an else to add the successful req.query.search but is cleaner to just add a return to stop the if. Not doing so returns an error.
app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'No search term provided'
    });
  }
  console.log(req.query.search);
  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404 Error',
    errorText: 'Help article not found'
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: '404 Error',
    errorText: 'Article not found'
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
