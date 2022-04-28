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
    response.bc = await bc.create(body.metadata, res)

    body.cipher.bc_tx_address = response.bc.transactionHash

    response.bdb = await bdb.create(body.cipher)

    res.status(200).json(response).end()
}

function read(req, res) {
    console.log(req.params)
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
