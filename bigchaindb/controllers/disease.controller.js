const bdb = require('../bdb'), assets = bdb.assets, Disease = require('../models/Disease');

async function create(data, res) {
    let check = await read({
        patient: data.bc_addresses.patient,
        hospital: data.bc_addresses.hospital,
        disease: data.cipher.disease
    })

    if (check) {
        const disease = check
        disease.status = 403
        disease.message = "Disease already exists"

        return disease
    }

    // Create disease if not exists
    const disease = new Disease({
        patient_bc_address: data.bc_addresses.patient,
        hospital_bc_address: data.bc_addresses.hospital,
        name: data.cipher.disease
    })

    return {
        status: 201,
        receipt: await bdb.create_tx(disease, {disease: data.metadata.disease}, data.hospital.ed25519_private_key, data.hospital.ed25519_public_key, res)
    }
}

async function read(data) {
    const disease = await assets.findOne({
        'data.model': "Disease",
        'data.patient_bc_address': data.patient,
        'data.hospital_bc_address': data.hospital,
        'data.name': data.disease
    }, {
        projection: {
            _id: 0,
            "data.model": 0
        }
    });

    if (disease) {
        const result = disease.data
        result.metadata = {
            bdb_id: disease.id
        }

        return result
    }

    return null
}

async function index(params, body) {
    if (params.hospital) {
        return await assets.aggregate([{
            $match: {
                'data.patient_bc_address': params.patient,
                'data.hospital_bc_address': params.hospital,
                'data.model': 'Disease'
            }
        }, {
            $project: {
                'data.metadata': '$id',
                'data.name': 1,
                'data._id': 1
            }
        }, {
            $replaceRoot: {
                newRoot: '$data'
            }
        }]).toArray()
    }

    return assets.aggregate([
        {
            $match: {
                'data.bc_address': {$in: body.hospitals},
                'data.model': 'Hospital'
            }
        }, {
            $project: {
                ed25519_public_key: 0,
                model: 0,
                _id: 0
            }
        }, {
            $lookup: {
                from: 'assets',
                localField: 'data.bc_address',
                foreignField: 'data.hospital_bc_address',
                as: 'diseases'
            }
        }, {
            $project: {
                _id: 0,
                hospital: {
                    name: '$data.name',
                    bc_address: '$data.bc_address',
                    ecdh_public_key: '$data.ecdh_public_key'
                },
                'diseases.data.name': 1,
                'diseases.data._id': 1
            }
        }, {
            $project: {
                hospital: 1,
                diseases: '$diseases.data'
            }
        }, {
            $addFields: {
                'diseases.encrypted': true
            }
        }]).toArray()
}

function records(data) {
}

module.exports = {
    create, read, index, records
}
