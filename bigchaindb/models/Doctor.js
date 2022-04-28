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
    model: {
        type: String,
        default: "Doctor"
    }
});

module.exports = mongoose.model("Doctor", schema);
