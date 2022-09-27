const conn = require('../ganache.connection'),
  abi = conn.web3.eth.abi,
  contract = conn.contract,
  methods = contract.methods,
  fs = require('fs');

async function create(data) {
  sender = conn.hospital.sender
  sender.from = data.bc_addresses.hospital

  const status = 201

  const start = Date.now()
  const receipt = await methods.create(
    data.bc_addresses.patient,
    data.bc_addresses.doctor,
    data.metadata.disease,
    data.metadata.diagnose,
    data.date
  ).send(sender);
  const stop = Date.now()

  fs.appendFileSync('./blockchain/test/BC-88B-dmore.csv', `${stop - start},${receipt.gasUsed}\n`)

  return { status, receipt }
}

async function read(data) {
  const create_params = contract.abi[0].inputs,
    tx = await conn.web3.eth.getTransaction(data.tx)

  console.log(tx)
  return await abi.decodeParameters(create_params, tx.input.slice(10))
}

module.exports = {
  create,
  read
}
