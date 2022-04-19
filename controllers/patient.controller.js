const bdb = require('../bigchaindb/controllers/patient.controller'),
    bc = require('../blockchain/controllers/patient.controller')

async function create(req, res) {
    const body = req.body

    // bc.create()

    const response = await bdb.create(body, res)

    res.status(200).json(response).end();
}

function read(req, res) {
}

module.exports = {
    create
}
