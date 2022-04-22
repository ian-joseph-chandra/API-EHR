const bdb = require('../bigchaindb/controllers/disease.controller'),
    bc = require('../blockchain/controllers/disease.controller')

async function index(req, res) {
    const body = req.body;

    let response = {}
    response.bdb = await bdb.index(body.bdb)

    res.status(200).json(response).end()
}

module.exports = {
    index
}
