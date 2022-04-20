const bdb = require('../bdb'),
    hospitals = bdb.mongoose.connection.collection('hospitals'),
    controller = {
        disease: require('../controllers/disease.controller')
    }, Record = require("../models/Record");

async function create(data, res) {
    data.hospital = await hospitals.findOne({
        'bc_address': data.hospital.bc_address
    })

    let disease = await controller.disease.read(data)
    let receipt = {}

    // Create Disease if not exists
    if (disease == null) {
        const response = await controller.disease.create(data)
        disease = response.asset.data
    }

    receipt.disease = disease

    // Create Record
    const record = new Record({
        disease_id: disease.data._id,
        diagnose: data.diagnose,
        bc_tx_address: data.bc_tx_address
    })

    const response = await bdb.create_tx(
        record,
        null,
        data.hospital.ed25519_private_key,
        data.hospital.ed25519_public_key
    )

    receipt.record = response.asset.data
    return receipt
}

function getAll(req, res) {
    var db = mongoose.connection;
    var collection = db.collection('assets');

    collection.find({
        'data.model': "record"
    }).toArray(function (err, resp) {
        try {
            var json = {
                message: 'List EHR punya kamu!',
                data: []
            }

            for (x = 0; x < resp.length; x++) {
                json.data.push(
                    resp[x].data
                )
            }
            res.status(200).json(json.data)

        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })
}

function get(req, res) {
    var db = mongoose.connection;
    var collection = db.collection('assets');

    collection.find({
        'data._id': req.params.idRecord,
        'data.model': "record"
    }).toArray(function (err, resp) {
        try {
            var json = {
                message: 'EHR yang kamu cari!',
                data: resp[0].data
            }
            res.status(200).json(json.data)

        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })
}

module.exports = {
    create, getAll, get
}
