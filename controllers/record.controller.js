const bdb = require('../bigchaindb/controllers/record.controller'),
    bc = require('../blockchain/controllers/record.controller')

function create(req, res) {
    bdb.create(req, res)
    await bc.create(body.blockchain, res)
}

function read(req, res){}

module.exports = {
    create,
    read
}
