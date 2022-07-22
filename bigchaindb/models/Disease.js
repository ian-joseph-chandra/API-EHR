const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    patient_bc_address: {
        type: String,
        required: true
    },
    hospital_bc_address: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    nonce: {
        type: String
    },
    model: {
        type: String,
        default: "Disease"
    }
});

module.exports = mongoose.model("Disease", schema);
