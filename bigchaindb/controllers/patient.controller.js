const bdb = require('../bdb'),
    assets = bdb.assets,
    hospitals = bdb.mongoose.connection.collection('hospitals'),
    patients = bdb.mongoose.connection.collection('patients'),
    Patient = require('../models/Patient');

async function create(data, res) {
    const hospital = await hospitals.findOne()

    let status;
    const response = {}
    const check = {}

    // Check whether data is exists in assets collection
    check.bdb = await read({ patient: data.bc_address })

    // Check whether data is exists in patients collection
    check.mdb = await patients.findOne({
        'bc_address': data.bc_address
    })

    // Set error message if data already exists on both databases
    if (check.bdb && check.mdb) {
        status = 403
        response.error = 'Data already exists in decentralized & local databases'
        return { status, response };
    }

    status = 201
    response.bdb = {}
    response.mdb = {}

    if (check.bdb) {
        response.bdb.status = 403
        response.bdb.error = 'Data already exists in decentralized database'
    } else {
        const patient = new Patient({
            name: data.name,
            bc_address: data.bc_address,
            dob: data.dob,
            gender: data.gender,
            ecdh_public_key: data.ecdh.public_key
        })

        response.bdb.status = 201
        response.bdb.receipt = await bdb.create_tx(
            patient,
            data,
            hospital.ed25519_private_key,
            hospital.ed25519_public_key,
            res
        )
    }

    if (check.mdb) {
        response.mdb.status = 403
        response.mdb.error = 'Data already exists in local database'
    }
    else {
        response.mdb.status = 201

        const patient = new Patient(check.bdb.data);
        patient.email = data.email;
        patient.password = data.password;
        patient.save()

        delete patient.password // Don't show the password in the receipt
        response.mdb.receipt = patient
    }

    return { status, response }
}

async function read(data) {
    return await assets.findOne({
        'data.model': 'Patient',
        'data.bc_address': data.patient
    })
}

async function login(data) {
    return await patients.findOne({
        'email': data.email,
        'password': data.password
    }, {
        projection: {
            model: 0,
            password: 0
        }
    });
}

module.exports = {
    create, read, login
}