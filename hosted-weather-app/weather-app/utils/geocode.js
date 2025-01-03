const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?acces_token=pk.eyJ1IjoiamVubnlndXptYW4xNCIsImEiOiJjbTRwdjlobDkweTJlMndxMW95NXNiazJkIn0.KbAhyVzuk8e9aVqAnFdHyw&limit=1'

request({url, json:true },(error,{ body }) => {
    if (error) {
        callback('unable to connect to location services!',undefined)
    } else if (body.features.length === 0){
        callback('unable to find location. Try another search', undefined)
    } else {
        callback(undefinded, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name
        })
    }
})
}

module.exports = geocode