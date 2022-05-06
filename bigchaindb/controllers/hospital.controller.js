const bdb = require('../bdb'),
    driver = bdb.driver,
    assets = bdb.assets,
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

// Get data from assets collection (public)
async function read(data) {
    const status = 200
    const hospital = await assets.findOne({
        'data.model': 'Hospital',
        'data.bc_address': data.hospital
    }, {
        projection: {
            'data.model': 0,
            'data._id': 0,
            id: 0,
            _id: 0
        }
    })

    return {status, hospital}
}

async function index(data) {
    if (data.body.bc_addresses) {
        return assets.find({
            'data.model': 'Hospital',
            'data.bc_address': {$in: data.body.bc_addresses}
        }, {
            projection: {
                'data.model': 0,
                'data._id': 0,
                id: 0,
                _id: 0
            }
        }).toArray();
    }

    return assets.find({
        'data.model': 'Hospital'
    }, {
        projection: {
            'data.model': 0,
            'data._id': 0,
            id: 0,
            _id: 0
        }
    }).toArray();
}

// Get data from hospitals collection (local)
async function login(data) {
    const status = 200
    const hospital = await hospitals.findOne({
        'bc_address': data.hospital
    })

    return {status, hospital}
}

module.exports = {
    create,
    read,
    login,
    index
}
