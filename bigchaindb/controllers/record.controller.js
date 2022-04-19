const bdb = require('../bdb'),
    hospitals = bdb.mongoose.connection.collection('hospitals'),
    controllers = {
        disease: require('../controllers/disease.controller')
    },
    models = {
        Disease: require("../models/Disease"),
        Record: require("../models/Record")
    };

async function create(data, res) {
    data.hospital = await hospitals.findOne({
        'bc_address': data.hospital.bc_address
    })

    let disease = await controllers.disease.read(data)
    console.log("disease:", disease)
    let receipt = null

    // Create disease if not exists
    if (disease == null){
        // receipt = await controllers.disease.create(data)
    } else {

    }
        // 2. If disease not exists, create disease
        // 3.
        // 3.

        const hospital = await hospitals.findOne()

    // console.log(hospital)
    // let diseasesId = "";

    // collection.find({
    //     'data._id': input.hospitalId
    // }).toArray(function (err, resp) {
    //     bdb.collection.find({
    //         'data.disease': input.disease,
    //         'data.model': 'disease'
    //     }).toArray(function (err, resp) {
    //         if (!resp.length) {
    //             const data = new Disease({
    //                 patientId: input.patientId,
    //                 hospitalId: input.hospitalId,
    //                 disease: input.disease,
    //                 model: "disease"
    //             })
    //             const metadata = null
    //
    //
    //             const tx = driver.Transaction.makeCreateTransaction(
    //                 data,
    //                 metadata,
    //
    //                 // A transaction needs an output
    //                 [driver.Transaction.makeOutput(
    //                     driver.Transaction.makeEd25519Condition(signaturePub))],
    //                 signaturePub
    //             )
    //
    //             const txSigned = driver.Transaction.signTransaction(tx, signaturePri)
    //
    //             bdb.conn.postTransactionCommit(txSigned)
    //                 .then(retrievedTx => {
    //                     console.log('Transaction', retrievedTx.id, 'successfully posted.');
    //                     diseasesId = retrievedTx.asset.data._id;
    //                 })
    //         } else {
    //             console.log('disease already exist')
    //             diseasesId = resp[0].data._id;
    //         }
    //
    //         const newRecord = new Record({
    //             diseaseId: diseasesId,
    //             doctorId: req.body.doctorId,
    //             diagnose: req.body.diagnose,
    //             date: req.body.date,
    //             model: "record"
    //         })
    //
    //         try {
    //             const data = newRecord
    //             const metadata = null
    //
    //             const tx = driver.Transaction.makeCreateTransaction(
    //                 data,
    //                 metadata,
    //
    //                 // A transaction needs an output
    //                 [bdb.driver.Transaction.makeOutput(
    //                     bdb.driver.Transaction.makeEd25519Condition(signaturePub))],
    //                 signaturePub
    //             )
    //
    //             const txSigned = bdb.driver.Transaction.signTransaction(tx, signaturePri)
    //
    //             bdb.conn.postTransactionCommit(txSigned)
    //                 .then(retrievedTx => console.log('Transaction', retrievedTx.id, 'successfully posted.'))
    //
    //             res.status(200).json({
    //                 message: "your EHR successfully added, heres your EHR",
    //                 data: data
    //             });
    //
    //         } catch (err) {
    //             res.status(500).json(err);
    //         }
    //     })
    // })
    res.status(200).json(receipt).end()
}

function getAll(req, res) {
    var db = mongoose.connection;
    var collection = db.collection('assets');

    collection.find({
        'data.model': "record"
    }).toArray(function (err, resp) {
        try {
            var json = {
                message: 'List EHR punya kamu!',
                data: []
            }

            for (x = 0; x < resp.length; x++) {
                json.data.push(
                    resp[x].data
                )
            }
            res.status(200).json(json.data)

        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })
}

function get(req, res) {
    var db = mongoose.connection;
    var collection = db.collection('assets');

    collection.find({
        'data._id': req.params.idRecord,
        'data.model': "record"
    }).toArray(function (err, resp) {
        try {
            var json = {
                message: 'EHR yang kamu cari!',
                data: resp[0].data
            }
            res.status(200).json(json.data)

        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })
}

module.exports = {
    create, getAll, get
}
