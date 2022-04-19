const bdb = require('../bigchaindb/controllers/patient.controller'),
    bc = require('../blockchain/controllers/patient.controller')

function create(req, res) {
    // patient.blockchain =
    // patient.diseases = []
    // patient.hospitals = []
    bdb.create()
    bc.create()
}

function read(req, res){}

module.exports = {
    create
}
