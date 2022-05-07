const bdb = require('../bdb'),
    assets = bdb.assets,
    Disease = require('../models/Disease');

async function create(data, res) {
    let check = await read({
        patient: data.bc_addresses.patient,
        hospital: data.bc_addresses.hospital,
        name: data.cipher.disease
    })

    if (check) {
        const disease = check.data
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

    const receipt = await bdb.create_tx(
        disease,
        {disease: data.metadata.disease},
        data.hospital.ed25519_private_key,
        data.hospital.ed25519_public_key,
        res
    )

    return {status: 201, receipt}
}

async function read(data) {
    console.log('disease read input:', data)

    return await assets.findOne({
        'data.model': "Disease",
        'data.patient_bc_address': data.patient,
        'data.hospital_bc_address': data.hospital,
        'data.name': data.name
    }, {
        projection: {
            _id: 0,
            "data.model": 0
        }
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

    return assets.aggregate([
        {
            $match: {'data.model': 'Disease'}
        },
        {
            $project: {
                'data.model': 0,
                'data.patient_bc_address': 0
            }
        },
        {
            $group: {
                _id: {hospital: '$data.hospital_bc_address'},
                diseases: {
                    $push: {
                        name: '$data.name',
                        _id: '$data._id'
                    }
                }
            }
        }
    ]).toArray()
}


module.exports = {
    create,
    read,
    index
}
