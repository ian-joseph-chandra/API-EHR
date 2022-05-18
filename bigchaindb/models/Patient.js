const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    bc_address: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    ecdh_public_key: {
        type: String,
        required: true,
        unique: true
    },
    iv: {
        type: String,
        required: true
    },
    model: {
        type: String,
        default: "Patient"
    }
});

module.exports = mongoose.model("Patient", schema);