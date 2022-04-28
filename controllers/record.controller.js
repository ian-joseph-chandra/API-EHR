const bdb = require('../bigchaindb/controllers/record.controller'),
    bc = require('../blockchain/controllers/record.controller'),
    handlers = {
        response: require('../handlers/response.handler'
        )
    };

async function create(req, res) {
    const body = req.body

    body.cipher.date = Date.now()
    body.metadata.date = body.cipher.date

    let response = {}

    const start_bc = Date.now()
    // Send metadata to Blockchain
    response.bc = await bc.create(body.metadata, res)
    const stop_bc = Date.now()

    body.cipher.bc_tx_address = response.bc.transactionHash

    const start_ddb = Date.now()
    // Send cipher to Decentralized DB
    response.bdb = await bdb.create(body.cipher, body.metadata)
    const stop_ddb = Date.now()

    response.durations = {
        bc: stop_bc - start_bc,
        ddb: stop_ddb - start_ddb
    }

    res.status(200).json(response).end()
}

async function read(req, res) {
    const response = {}

    response.bc = await bc.read(req.params)

    res.status(200).json(response).end()
}

async function index(req, res) {
    let response = {}
    response.bdb = await bdb.index(req.params)

    res.status(200).json(response).end()
}

module.exports = {
    create,
    read,
    index
}
