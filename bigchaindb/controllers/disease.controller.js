const bdb = require('../bdb'),
    assets = bdb.assets,
    Disease = require('../models/Disease');

async function create(data, res) {
    let disease = await read({
        patient: data.bc_addresses.patient,
        hospital: data.bc_addresses.hospital,
        disease: data.cipher.disease
    })

    let status
    let message

    if (disease) {
        status = 403
        message = "Disease already exists"

        return { status, message, disease }
    }

    // Create disease if not exists
    disease = new Disease({
        patient_bc_address: data.bc_addresses.patient,
        hospital_bc_address: data.bc_addresses.hospital,
        name: data.cipher.disease
    })
    
    status = 201
    const receipt = await bdb.create_tx(
        disease,
        {disease: data.metadata.disease},
        data.hospital.ed25519_private_key,
        data.hospital.ed25519_public_key,
        res
    )

    return { status, receipt, disease }
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
