const bdb = require('../bigchaindb/controllers/disease.controller'),
    bc = require('../blockchain/controllers/disease.controller')

async function index(req, res) {
    const response = await bdb.index(req.params)

    res.status(200).json(response).end()
}

module.exports = {
    index
}
