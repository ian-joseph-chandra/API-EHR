const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors())
app.listen(port);

routes(app)

console.log("API is running on http://localhost:3000")

module.exports = app;
