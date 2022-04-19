const bdb = require('../bdb'),
    assets = bdb.assets,
    Disease = require('../models/Disease');

async function create(data) {
    const disease = new Disease({
        patient_id: data.patient_id,
        hospital_id: data.hospital.bdb_id,
        name: data.disease.name
    })

    return bdb.create_tx(disease, null, data.hospital.ed25519_private_key, data.hospital.ed25519_public_key)
}

async function read(data) {
    console.log(data)
    return await assets.findOne({
        'data.model': "Disease",
        'data.patient_bc_address': data.patient.bc_address,
        'data.hospital_bc_address': data.hospital.bc_address,
        'data.name': data.disease.name
    });
}

function index(data, res) {
    res.status(200).json(assets.find({
        'data.model': "Disease",
        'data.patient_id': data.patient_id,
        'data.hospital_id': data.hospital_id
    }).toArray()).end()
}

module.exports = {
    create, read, index
}
