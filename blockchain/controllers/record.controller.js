const conn = require('../bc.connection'),
    methods = conn.contract.methods;

async function create(data) {
    const status = 201
    const receipt = await methods.create(
        data.bc_addresses.patient,
        data.bc_addresses.doctor,
        data.metadata.disease,
        data.metadata.diagnose,
        data.date
    ).send(conn.hospital.sender);

    return {status, receipt}
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
