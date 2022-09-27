const bdb = require('../bigchaindb/controllers/record.controller'),
    bc = require('../blockchain/controllers/record.controller'),
    handlers = {
        response: require('../handlers/response.handler')
    };

async function create(req, res) {
    const body = req.body

    // Send metadata to Blockchain
    const response = { bc: await bc.create(body, res) }

    body.cipher.bc_tx_address = response.bc.receipt.transactionHash

    // Send cipher to Decentralized DB
    response.bdb = await bdb.create(body, res)

    // res.status(201).json(response).end()
}

async function read(req, res) {
    const response = { bc: await bc.read(req.params) }

    res.status(200).json(response).end()
}

async function index(req, res) {
    const response = await bdb.index(req.query)

    res.status(200).json(response).end()
}

module.exports = {
    create,
    read,
    index
}
