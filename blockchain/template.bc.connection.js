const Web3 = require('web3'),
    url = 'http://127.0.0.1:7545',
    web3 = new Web3(url),
    Tx = require('ethereumjs-tx').Transaction,
    hospital = {
        address: '', // Fill with hospital blockchain address
        private_key: '', // Fill with hospital blockchain private key
        sender: {
            from: '', // Fill with hospital blockchain address
            gasLimit: web3.utils.toHex(2000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
        }
    },
    contract = {
        address: '', // Fill with deployed contract address
        abi: require('../blockchain/smart-contracts/build/contracts/Records.json').abi // Fill with deployed contract abi
    };

contract.methods = new web3.eth.Contract(contract.abi, contract.address).methods;

module.exports = {
    web3,
    Tx,
    hospital,
    contract
}
