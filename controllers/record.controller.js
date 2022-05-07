const bdb = require('../bigchaindb/controllers/record.controller'),
    bc = require('../blockchain/controllers/record.controller'),
    handlers = {
        response: require('../handlers/response.handler')
    };

async function create(req, res) {
    const body = req.body

    body.date = Date.now()


    // Send metadata to Blockchain
    // response = {bc: await bc.create(body, res)}
    const response = { bc: { receipt: { transactionHash: 'abc' } } }

    body.cipher.bc_tx_address = response.bc.receipt.transactionHash

    // Send cipher to Decentralized DB
    response.bdb = await bdb.create(body, res)

    res.status(201).json(response).end()
}

async function read(req, res) {
    const response = {}

    response.bc = await bc.read(req.params)

    res.status(200).json(response).end()
}

async function index(req, res) {
    let response = {}
    response = await bdb.index(req.params)

    res.status(200).json(response).end()
}

module.exports = {
    create,
    read,
    index
}
