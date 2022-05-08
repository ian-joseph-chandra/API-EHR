const bdb = require('../bigchaindb/controllers/disease.controller'),
    bc = require('../blockchain/controllers/disease.controller')

async function read(req, res) {
    const response = await bdb.read(req.params)

    res.status(200).json(response).end()
}

async function index(req, res) {
    const response = await bdb.index(req.params, req.body)

    res.status(200).json(response).end()
}

/**
 * Get records from several diseases
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
async function records(req, res) {
    const response = await bdb.index(req.body)

    res.status(200).json(response).end()
}

module.exports = {
    index,
    read,
    records
}
