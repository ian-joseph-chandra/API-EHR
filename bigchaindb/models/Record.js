const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    bc_tx_address: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        required: true
    },
    disease_id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    diagnose: {
        type: String,
        required: true
    },
    doctor_bc_address: {
        type: String,
        required: true
    },
    model: {
        type: String,
        default: "Record"
    }
});

module.exports = mongoose.model("Record", schema);
