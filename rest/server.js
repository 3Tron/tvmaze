const express = require('express')
const bodyParser = require('body-parser')
const mainRoutes = require('./routes/main')
const config = require('../config');

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine', 'ejs')

app.use(mainRoutes);

app.listen(config.httpPort, config.httpHost, () => {
    console.log('listening on port ' + config.httpPort)
})