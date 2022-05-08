const bdb = require('../bigchaindb/controllers/hospital.controller'),
    bc = require('../blockchain/controllers/hospital.controller');

async function create(req, res) {
    const body = req.body

    // await bc.create(body.blockchain, res)

    // body.bdb.bc_tx_address =
    const response = await bdb.create(body, res);
    res.status(200).json(response);
}

// Get data from public collection (assets)
async function read(req, res) {
    const result = await bdb.read(req.params)

    res.status(200).json(result).end()
}

async function index(req, res) {
    // console.log('hospital index in action')
    const response = await bdb.index(req)

    res.status(200).json(response).end()
}

// Get data from local collection (hospitals)
async function login(req, res) {
    const response = await bdb.login(req.params)

    res.status(200).json(response).end()
}


module.exports = {
    create,
    read,
    login,
    index
}
