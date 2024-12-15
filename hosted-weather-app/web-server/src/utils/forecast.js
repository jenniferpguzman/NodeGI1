const request = require('request')

const forecast = (latitude, longitude, temperature, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f803ff878ce60e30a60f7571c239ccb5&query=${latitude},${longitude}&units=${temperature}`

    request({ url, json: true}, (error ,{ body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('unable to find location',undefined)
        } else {
            callback( undefined, body.current.weather_descriptions[0] + `, It is currently ${body.current.temperature}. Have a great day!`)
        }
    })
}
module.exports = forecast