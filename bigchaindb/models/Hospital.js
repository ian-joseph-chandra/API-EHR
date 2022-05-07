const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    bc_address: {
        type: String,
        required: true,
        unique: true
    },
    ecdh_public_key: {
        type: String,
        required: true,
        unique: true
    },
    ecdh_private_key: {
        type: String,
        unique: true
    },
    ed25519_public_key: {
        type: String,
        required: true,
        unique: true,
    },
    ed25519_private_key: {
        type: String,
        unique: true,
    },
    model: {
        type: String,
        default: 'Hospital'
    }
});

module.exports = mongoose.model("Hospital", schema);
