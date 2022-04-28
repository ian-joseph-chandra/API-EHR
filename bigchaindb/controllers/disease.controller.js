const bdb = require('../bdb'),
    assets = bdb.assets,
    Disease = require('../models/Disease');

async function create(data) {
    const disease = new Disease({
        patient_bc_address: data.patient,
        hospital_bc_address: data.hospital.bc_address,
        name: data.disease
    })

    return bdb.create_tx(
        disease,
        null,
        data.hospital.ed25519_private_key,
        data.hospital.ed25519_public_key
    )
}

async function read(data) {
    return await assets.findOne({
        'data.model': "Disease",
        'data.patient_bc_address': data.patient,
        'data.hospital_bc_address': data.hospital,
        'data.name': data.disease
    });
}

function index(data) {
    if (data.hospital) {
        return assets.find({
            'data.model': "Disease",
            'data.patient_bc_address': data.patient,
            'data.hospital_bc_address': data.hospital
        }).toArray()
    }

    return assets.find({
        'data.model': "Disease",
        'data.patient_bc_address': data.patient
    }).toArray()
}

module.exports = {
    create, read, index
}
