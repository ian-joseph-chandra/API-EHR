const conn = require('../bc.connection'),
    methods = conn.contract.methods;

async function create(data) {
    return await methods.create(
        data.patient,
        data.doctor,
        data.disease,
        data.diagnose,
        data.date
    ).send(conn.hospital.sender);
}

async function read(data) {
    return await methods.read(
        data.patient,
        data.hospital,
        data.disease,
        data.timestamp
    ).call();
}

module.exports = {
    create,
    read
}
