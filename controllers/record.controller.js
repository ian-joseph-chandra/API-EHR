const bdb = require('../bigchaindb/controllers/record.controller'),
    bc = require('../blockchain/controllers/record.controller')

async function create(req, res) {
    const body = req.body

    // await bc.create(body.bc, res)

    body.bdb.bc_tx_address = "tx_12345";
    bdb.create(body.bdb, res)
}

function read(req, res) {
}

module.exports = {
    create,
    read
}
