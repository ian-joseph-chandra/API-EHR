const driver = require('bigchaindb-driver')

const PATH = [
    'http://192.168.1.13:9984/api/v1/'
]

const conn = new driver.Connection(PATH)
