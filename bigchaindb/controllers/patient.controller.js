const bdb = require('../bdb'),
    assets = bdb.assets,
    hospitals = bdb.mongoose.connection.collection('hospitals'),
    patients = bdb.mongoose.connection.collection('patients'),
    Patient = require('../models/Patient');

async function create(data, res) {
    const hospital = await hospitals.findOne()

    const response = {}

    // Check data in local & decentralized DB
    const check = {
        bdb: await read({patient: data.bc_address}),
        mdb: await patients.findOne({
            'bc_address': data.bc_address
        })
    }

    // Set error message if data already exists on both DB
    if (check.mdb) {
        response.error = 'Data already exists in decentralized & local databases'
        return {status: 403, response};
    } else if (check.bdb && !check.mdb) {
        const patient = new Patient(check.bdb.data);
        patient.email = data.email;
        patient.password = data.password;
        patient.save()

        delete patient.password // Don't show the password in the receipt
        return {
            status: 201,
            response: {
                mdb: {
                    status: 201,
                    receipt: patient
                },
                bdb: {
                    status: 403,
                    error: "Data already exists in decentralized database"
                }
            }
        }
    }

    const patient = new Patient({
        name: data.name,
        bc_address: data.bc_address,
        dob: data.dob,
        gender: data.gender,
        ecdh_public_key: data.ecdh.public_key
    })

    // Store data to bdb
    response.bdb = {
        status: 201,
        receipt: await bdb.create_tx(
            patient,
            null,
            hospital.ed25519_private_key,
            hospital.ed25519_public_key,
            res
        )
    }

    // Store data to mdb
    patient.email = data.email;
    patient.password = data.password;
    patient.save()

    delete patient.password

    response.mdb = {
        status: 201,
        receipt: patient
    }

    return {status: 201, response}
}

async function read(data) {
    const patient = await assets.findOne({
        'data.model': 'Patient',
        'data.bc_address': data.patient
    }, {
        projection: {
            'data._id': 0,
            'data.model': 0,
            '_id': 0,
            'id': 0
        }
    })

    return patient.data
}

async function login(data) {
    return await patients.findOne({
        'email': data.email,
        'password': data.password
    }, {
        projection: {
            _id: 0,
            email: 0,
            __v: 0,
            model: 0,
            password: 0
        }
    });
}

module.exports = {
    create, read, login
}
