const bdb = require('../bigchaindb/controllers/record.controller'),
    bc = require('../blockchain/controllers/record.controller')

function create(req, res) {
    // record.blockchain =
    // record.diseases = []
    // record.hospitals = []
    bdb.create(req, res)
    bc.create()
}

function read(req, res){}

module.exports = {
    create,
    read
}
