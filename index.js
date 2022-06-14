const express = require('express'),
    cors = require('cors'),
    fs = require('fs'),
    ssl = {
        privateKey: fs.readFileSync('./ssl.key'),
        certificate: fs.readFileSync('./ssl.cert')
    },
    http = require('http'),
    https = require('https'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    app = express(),
    port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(cors())

http.createServer(app)
    .listen(port, () => console.log("API is running on http://localhost:3000"))

https.createServer({
    key: ssl.privateKey,
    cert: ssl.certificate
}, app)
    .listen(3443, () => console.log("API is running on https://localhost:3443"))

routes(app)
