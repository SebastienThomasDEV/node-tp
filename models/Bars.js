const mongoose = require("mongoose")

const barsSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },

    name: {
        type : String, 
        default: unique,
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
        type: Text,
        required: true,
    }
})

module.exports = mongoose.model("bars", barsSchema)