const bdb = require('../bdb'),
    driver = bdb.driver,
    hospitals = bdb.mongoose.connection.collection('hospitals'),
    Hospital = require('../models/Hospital');

async function create(data) {
    // Create objects
    const keys = new driver.Ed25519Keypair(),
        hospital = new Hospital({
            name: data.name,
            bc_address: data.bc_address,
            ecdh_public_key: data.ecdh_public_key,
            ed25519_public_key: keys.publicKey,
            model: "Hospital"
        }),
        mdb_data = new Hospital({
            name: data.name,
            bc_address: data.bc_address,
            ecdh_public_key: data.ecdh_public_key,
            ecdh_private_key: data.ecdh_private_key,
            ed25519_public_key: keys.publicKey,
            ed25519_private_key: keys.privateKey,
        })

    return {
        mdb: await mdb_data.save(),
        bdb: await bdb.create_tx(hospital, null, keys.privateKey, keys.publicKey)
    };
}

function read(data) {
    return hospitals.findOne({
        'bc_address': data.hospital
    })
}

function diseases(data, hospital) {

}

module.exports = {
    create,
    read,
    diseases
}
