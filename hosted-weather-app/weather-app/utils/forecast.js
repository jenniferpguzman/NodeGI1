const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=f803ff878ce60e30a60f7571c239ccb5&query=${latitude},${longitude}&units=f`

    request({ url, json: true}, (error ,{ body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('unable to find location',undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + 'It is currently' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast