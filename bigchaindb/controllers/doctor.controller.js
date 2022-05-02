const bdb = require('../bdb'),
    assets = bdb.assets,
    hospitals = bdb.mongoose.connection.collection('hospitals'),
    doctors = bdb.mongoose.connection.collection('doctors'),
    Doctor = require('../models/Doctor');

async function create(data, res) {
    const hospital = await hospitals.findOne()

    const doctor = new Doctor({
        name: data.name,
        bc_address: data.bc_address
    })

    // store public data to assets collection 
    const result = await bdb.create_tx(
        doctor,
        data,
        hospital.ed25519_private_key,
        hospital.ed25519_public_key,
        res
    )

    doctor.password = data.password
    doctor.email = data.email

    // store complete data to doctors collection
    doctor.save()

    return result
}

async function read(data) {
    return await assets.findOne({
        'data.model': 'Doctor',
        'data.bc_address': data.doctor
    })
}

async function login(data) {
    return await doctors.findOne({
        'email': data.email,
        'password': data.password
    })
}

module.exports = {
    create, read, login
}
