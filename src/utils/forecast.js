const request = require('request')

//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)


const forecast = (lat, lon, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5e2911cb208fbd074f06fc27506065ec&query='
                + lat + ',' + lon
    
    request({url:url, json:true}, (error, {body}) => {//    request({url, json:true}, (error, {body}) => {

        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.success === false) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] 
                    + '. It is currently ' + body.current.temperature + ' degress out. '
                    + ' The humidity is ' + body.current.humidity + '% and the wind speed is ' 
                    + body.current.wind_speed + ' Km/h from ' + body.current.wind_dir)
        }
    } )
}

module.exports = forecast