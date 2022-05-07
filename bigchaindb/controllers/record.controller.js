const bdb = require('../bdb'),
    controllers = {
        disease: require('../controllers/disease.controller'),
        hospital: require('../controllers/hospital.controller'),
        doctor: require('../controllers/doctor.controller')
    },
    Record = require("../models/Record");


async function create(data, res) {
    const hospital = await controllers.hospital.login({ hospital: data.bc_addresses.hospital })
    
    data.hospital = hospital.hospital
    
    const check = {
        disease: await controllers.disease.create(data, res)
    }

    const response = { 
        disease: check.disease.receipt.asset.data || check.disease
     }

    

    // Create Record
    const record = new Record({
        disease_id: response.disease._id,
        diagnose: data.cipher.diagnose,
        bc_tx_address: data.cipher.bc_tx_address,
        doctor_bc_address: data.bc_addresses.doctor
    })

    response.record = await bdb.create_tx(
        record,
        { diagnose: data.metadata.diagnose },
        hospital.ed25519_private_key,
        hospital.ed25519_public_key,
        res
    )

    return { status: 201, response }
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

    return result
}

module.exports = {
    create,
    index,
    read
}
