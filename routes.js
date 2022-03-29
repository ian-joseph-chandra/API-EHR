'use strict';

module.exports = (route) => {

    route.get('', (req, res) => res.redirect('/users'))

    // Routing for User CRUD
    route.get('/users', (req, res) => console.log("Get all users"))
    route.get('/users/:user', (req, res) => console.log(`Get a user with id = ${req.params}`))
    route.post('/users', (req, res) => console.log("Create a new user"))

    // Routing for Hospital CRUD
    route.get('/hospitals', (req, res) => console.log("Get all hospitals"))
    route.get('/hospitals/:hospital', (req, res) => console.log(`Get a hospital with id = ${req.params}`))
    route.post('/hospitals', (req, res) => console.log("Create a new hospital"))

    // Routing for Diseases CRUD
    route.get('/diseases', (req, res) => console.log("Get all diseases"))
    route.get('/diseases/:disease', (req, res) => console.log(`Get a disease with id = ${req.params}`))
    route.post('/diseases', (req, res) => console.log("Create a new disease"))

    // Routing for Records CRUD
    route.get('/records', (req, res) => console.log("Get all records"))
    route.get('/records/:record', (req, res) => console.log(`Get a record with id = ${req.params}`))
    route.post('/records', (req, res) => console.log("Create a new record"))
}
