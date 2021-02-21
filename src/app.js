const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

//express config
const pathPublicDir = path.join(__dirname, '../public')
const viewsPathDir = path.join(__dirname, '../templates/views')
const partialsPathDir = path.join(__dirname, '../templates/partials')

// set handlebars engine and location
app.set('view engine', 'hbs')
app.set('views', viewsPathDir)
hbs.registerPartials(partialsPathDir)

// setup static directory to serve
app.use(express.static(pathPublicDir))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'weatherApp',
        name: 'Orestis Kotsas'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Orestis Kotsas'
        
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Orestis Kotsas',
        email:'orestiskotsas@hotmail.com'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address

    if (!address) {
        return res.send({
            error: "Please provide a location term!"
        })
    }

    geocode(address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast : forecastData.decription,
                location,
                // latitude,
                // longitude,
                address: req.query.address
            })                 
        })
    })


})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Orestis Kotsas',
        message: 'Help page not found!'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Orestis Kotsas',
        message: 'Page not found!'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})
