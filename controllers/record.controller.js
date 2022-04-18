const bdb = require('../bigchaindb/controllers/record.controller'),
    bc = require('../blockchain/controllers/record.controller')

async function create(req, res) {
    const body = req.body
    await bc.create(body.blockchain, res)
}

async function read(req, res){
    await bc.read(req, res)
}

module.exports = {
    create,
    read
}
