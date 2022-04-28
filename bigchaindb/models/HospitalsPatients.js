const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    patient: {
        type: String,
        required: true,
        unique: true
    },
    Hospital: {
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: String,
        default: "HospitalsPatients"
    }
});

module.exports = mongoose.model("HospitalsPatients", schema);
