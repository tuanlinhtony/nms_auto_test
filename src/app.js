const express = require('express')
require('./db/mongoose')
const hbs = require('hbs')
const path = require('path')
const bodyParser = require('body-parser')

//Add routers
const pageRouter = require('./routers/pageRouter')



//create Express Application
const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

//Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//pares incoming requests with JSON payloads and is based on body-parser.
app.use(bodyParser.json())
app.use(express.json())

//call router
app.use(pageRouter)



//Export module
module.exports = app