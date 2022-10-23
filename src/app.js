const path = require('path');  // It is core module
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();

// Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');   // this is we setting up handlebar
app.set('views', viewsPath);     // changing default 'views' to new path i.e 'templates
hbs.registerPartials(partialsPath);

// Static directory...
app.use(express.static(publicDirectoryPath));

// using handlebars here
app.get('/', (req, res) => {
    res.render('index', {title: 'Weather App', name: 'Akash'})
})

// using handler to setup 'about' page
app.get('/about', (req, res) => {
    res.render('about', {title: 'About me', name: 'Akash Rawat'});
})

// using handler to setup 'help' page
app.get('/help', (req,res) => {
    res.render('help', {helpText: 'This is the dynamic help page', name: 'Akash', title: 'Help Page'});
})


// Sending the weather info. to the client
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error: 'Please provide an address!!'});
    }

    const address = req.query.address;
    geocode(address, (error, {latitude, longitude, location} = {}) => { 
        if(error){
          return res.send({error: error});
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
          if(error){
            return res.send({error: error});
          }
          
          res.send({forecast: forecastData, location: location, address:address});
        })
      });

})

// Demo of using 'Query String'
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({error: 'Provide a search term'});
    }
    res.send({products: []});
    console.log(req.query);
})

// If not matches found after 'help/' url
app.get('/help/*', (req, res) => {
    res.render('404Page', {title: '404 Help Page', name: 'Akash', errorMessage: 'Help article not found'});
})

// It is executed when there is no matches found i.e for 404 page
// * = wildcard character
app.get('*', (req, res) => {
    res.render('404Page', {title: '404 Page', name: 'Akash', errorMessage: 'Page not found'});
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
})