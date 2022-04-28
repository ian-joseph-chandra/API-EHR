const bdb = require('../bdb'),
    controllers = {
        disease: require('../controllers/disease.controller'),
        hospital: require('../controllers/hospital.controller'),
        doctor: require('../controllers/doctor.controller')
    },
    Record = require("../models/Record");

async function create(data, metadata) {
    const hospital = await controllers.hospital.read(data)

    let disease = await controllers.disease.read(data)

    // Create Disease if not exists
    if (disease == null) {
        const response = await controllers.disease.create(data)
        disease = response.asset
    }

    // Create Record
    const record = new Record({
        disease_id: disease.data._id,
        diagnose: data.diagnose,
        bc_tx_address: data.bc_tx_address,
        doctor_bc_address: data.doctor
    })

    const receipt = {}
    receipt.disease = disease
    receipt.record = await bdb.create_tx(
        record,
        metadata,
        hospital.ed25519_private_key,
        hospital.ed25519_public_key
    )

    return receipt
}

async function index(data) {
    const result = {}

    result.disease = await controllers.disease.read(data)
    result.hospital = await controllers.hospital.read(data)
    result.records = await bdb.assets.find({
        'data.model': "Record",
        'data.disease_id': result.disease.data._id
    }).toArray();

    return result
}

async function read(data) {
    const result = {}

    result.doctor = await controllers.doctor.read(data)
    result.disease = await controllers.disease.read(data)

    result.bdb.record = await bdb.assets.find({
        'data.model': "Record",
        'data.date': data.record
    });

    result.bdb.metadata = await bdb.metadata.find({
        'id': result.bdb.record.id
    })

    console.log(result)
    return result
}

module.exports = {
    create,
    index,
    read
}
