'use strict';
const patient = require('./controllers/patient.controller')

module.exports = (route) => {
    // Default route redirects to patients
    route.get('', (req, res) => res.redirect('/patients'))

    // Routing for Patient CR
    route.get('/patients', (req, res) => console.log("Get all patients"))
    route.get('/patients/:patient', (req, res) => console.log(`Get a patient with id = ${req.params}`))
    route.post('/patients', (req, res) => patient.create(req, res))

    // Routing for Doctor CR
    route.get('/patients', (req, res) => console.log("Get all patients"))
    route.get('/patients/:patient', (req, res) => console.log(`Get a patient with id = ${req.params}`))
    route.post('/patients', (req, res) => console.log("Create a new patient"))

    // Routing for Hospital CR
    route.get('/hospitals', (req, res) => console.log("Get all hospitals"))
    route.get('/hospitals/:hospital', (req, res) => console.log(`Get a hospital with id = ${req.params}`))
    route.post('/hospitals', (req, res) => console.log("Create a new hospital"))

    // Routing for Diseases CR
    route.get('/diseases', (req, res) => console.log("Get all diseases"))
    route.get('/diseases/:disease', (req, res) => console.log(`Get a disease with id = ${req.params}`))
    route.post('/diseases', (req, res) => console.log("Create a new disease"))

    // Routing for Records CR
    route.get('/records', (req, res) => console.log("Get all records"))
    route.get('/records/:record', (req, res) => console.log(`Get a record with id = ${req.params}`))
    route.post('/records', (req, res) => console.log("Create a new record"))
}
