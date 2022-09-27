// Import BigchainDB components
const driver = require('bigchaindb-driver'),
    transaction = driver.Transaction,
    conn = new driver.Connection('http://localhost:9984/api/v1/'),
    fs = require('fs');

// Import MongoDB components
const mongoose = require('mongoose'),
    mdb_conn = mongoose.connect('mongodb://localhost:27017/bigchain'),
    assets = mongoose.connection.collection('assets'),
    metadata = mongoose.connection.collection('metadata');

async function create_tx(data, metadata, privateKey, publicKey, res) {
    try {
        // I was trying to make multiple outputs for 1 assets (future works)

        // let tx_conditions = [];
        //
        // for (let i = 0; i < publicKeys.length; i++)
        //     tx_conditions[i] = transaction.makeEd25519Condition(publicKeys[i])

        const tx = transaction.makeCreateTransaction(
            data,
            {'test': 'test'},

            // A transaction needs an output
            [transaction.makeOutput(
                transaction.makeEd25519Condition(publicKey))
            ],
            publicKey
        )

        const txSigned = transaction.signTransaction(tx, privateKey),
            start = Date.now()
        const receipt = await conn.postTransactionCommit(txSigned),
            stop = Date.now();

        fs.appendFileSync('./bigchaindb/test/BDB-10KB.csv', `${stop - start}\n`)

        return receipt
    } catch (err) {
        console.error(err)
    }
}

module.exports = {
    conn, driver, create_tx, mdb_conn, assets, mongoose, metadata
}
