const bdb = require('../bdb'),
    hospitals = bdb.mongoose.connection.collection('hospitals'),
    controllers = {disease: require('../controllers/disease.controller')},
    Record = require("../models/Record");

async function create(data) {
    data.hospital = await hospitals.findOne({
        'bc_address': data.hospital
    })

    let disease = await controllers.disease.read(data)
    let receipt = {}

    // Create Disease if not exists
    if (disease == null) {
        const response = await controllers.disease.create(data)
        disease = response.asset.data
    }

    receipt.disease = disease

    // Create Record
    const record = new Record({
        disease_id: disease._id,
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

async function index(data) {
    const disease = await controllers.disease.read({
        patient: data.patient,
        hospital: data.hospital,
        disease: data.disease
    })

    return bdb.assets.find({
        'data.model': "Record",
        'data.disease_id': disease.data._id
    }).toArray();
}

async function read(data) {
    const disease = await controllers.disease.read({
        patient: {bc_address: data.patient},
        hospital: {bc_address: data.hospital},
        disease: {name: data.disease}
    })

    return bdb.assets.find({
        'data.model': "Record",
        'data.disease_id': disease.data._id,
    });
}

module.exports = {
    create,
    index,
    read
}
