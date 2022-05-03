const bdb = require('../bigchaindb/controllers/hospital.controller'),
    bc = require('../blockchain/controllers/hospital.controller');

async function create(req, res) {
    const body = req.body

    // await bc.create(body.blockchain, res)

    // body.bdb.bc_tx_address =
    const response = await bdb.create(body, res);
    res.status(200).json(response);
}

function read(req, res) {
    
}

module.exports = {
    create,
    read
}
