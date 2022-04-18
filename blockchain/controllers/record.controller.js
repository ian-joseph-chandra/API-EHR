const conn = require('../bc.connection'),
    methods = conn.contract.methods;

async function create(data, res) {
    console.log(data)
    const receipt = await methods.create(
        data.patient,
        data.doctor,
        data.disease,
        data.detail,
        data.date
    ).send(conn.hospital.sender);

    res.status(200).json(receipt).end();
}

async function read(req, res) {
    console.log(req.params)
    const params = req.params;
    const receipt = await methods.read(
        params.patient,
        params.hospital,
        params.disease,
        params.record
    ).call();

    res.status(200).json(receipt).end();
}

module.exports = {
    create,
    read
}
