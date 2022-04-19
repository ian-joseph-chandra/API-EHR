const bdb = require('../bdb'),
    hospitals = bdb.mongoose.connection.collection('hospitals'),
    Patient = require('../models/Patient');

async function create(data, res) {
    const hospital = await hospitals.findOne()
    const patient = new Patient({
        name: data.name,
        bc_address: data.bc_address,
        dob: data.dob,
        gender: data.gender,
        ecdh_public_key: data.ecdh.public_key,
        ed25519_public_key: data.ed25519.public_key
    })

    return bdb.create_tx(
        patient,
        data,
        hospital.ed25519_private_key,
        hospital.ed25519_public_key,
        res
    )
}

module.exports = {
    create
}
