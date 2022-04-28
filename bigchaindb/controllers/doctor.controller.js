const bdb = require('../bdb'),
    hospitals = bdb.mongoose.connection.collection('hospitals'),
    assets = bdb.assets
    Doctor = require('../models/Doctor');

async function create(data, res) {
    const hospital = await hospitals.findOne()

    const doctor = new Doctor({
        name: data.name,
        bc_address: data.bc_address,
    })

    return bdb.create_tx(
        doctor,
        data,
        hospital.ed25519_private_key,
        hospital.ed25519_public_key,
        res
    )
}

async function read(data) {
    return await assets.findOne({
        'model': 'Doctor',
        'bc_address': data.doctor
    })
}

module.exports = {
    create, read
}
