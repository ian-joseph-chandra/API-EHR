const Web3 = require('web3'),
    localUrl = 'http://127.0.0.1:7545',
    web3 = new Web3(localUrl),
    Tx = require('ethereumjs-tx').Transaction,
    hospital = {
        address: '0xD5D1062a3857Ccd0cE776521165E9B66bC3c4586',
        private_key: '920645f4ba3340757206cf3be10d5e275b135cededa119caba94c80f5f99c944',
        sender: {
            from: '0x721574b0a2a4E8f3b61eAC2edEa4D39Ff831270a',
            gasLimit: web3.utils.toHex(2000000),
            gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),
        }
    },
    contract = {
        address: '0x6A22a035ee88087Fe9F47759Ca3dc823890094A3',
        abi: [
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_patient",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_doctor",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_disease",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_detail",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_date",
                        "type": "string"
                    }
                ],
                "name": "create",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "address",
                        "name": "_patient",
                        "type": "address"
                    },
                    {
                        "internalType": "address",
                        "name": "_hospital",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_disease",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "_date",
                        "type": "string"
                    }
                ],
                "name": "read",
                "outputs": [
                    {
                        "internalType": "address",
                        "name": "_doctor",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "_detail",
                        "type": "string"
                    }
                ],
                "stateMutability": "view",
                "type": "function",
                "constant": true
            }
        ]
    };

contract.methods = new web3.eth.Contract(contract.abi, contract.address).methods;

module.exports = {
    web3,
    Tx,
    hospital,
    contract
}
