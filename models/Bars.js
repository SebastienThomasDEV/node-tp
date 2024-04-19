const mongoose = require("mongoose")

const barsSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },

    name: {
        type : String, 
        unique: true,
        required: true,
    },

    adresse: {
        type: String,
        required: true,
    },

    tel: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model("bars", barsSchema)