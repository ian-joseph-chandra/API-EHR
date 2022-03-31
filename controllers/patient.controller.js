const bdb = require('../bigchaindb/controllers/patient.controllers'),
    bc = require('../blockchain/controllers/patient.controllers')

function create(req, res) {
    // patient.blockchain =
    // patient.diseases = []
    // patient.hospitals = []
    bc.create()
    bdb.create()
}

function read(req, res){}

module.exports = {
    create
}
