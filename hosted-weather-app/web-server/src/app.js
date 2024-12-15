const path = require('path')
const express = require('express')
const hbs =require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()


//Define paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)



//setup static directory to serve
app.use(express.static(path.join(__dirname, '../public')))

app.get('',(req,res)=> {
    res.render('index', {
        title: 'Weather',
        name: ' Jennifer Guzman'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name: 'Jennifer Guzman'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        helpText: 'This is a help message',
        title:'Help',
        name:'Jennifer Guzman'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, req.query.temperature, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
    return res.send({
        error: 'You must provide a search term'
    })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req,res) =>{
    res.render('404', {
        title: '404 Help',
        name: 'Jennifer Guzman',
        errorMessage: 'Help article not found'
    })
}
)

app.get('*',(req,res) =>{
    res.render('404', {
        title: '404' ,
        name: "Jennifer Guzman" ,
        errorMessage: 'Page not found'
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000')
})
