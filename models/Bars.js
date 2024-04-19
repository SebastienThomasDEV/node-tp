const mongoose = require("mongoose")

const barsSchema = mongoose.Schema({
    id : integer,
    name : string, unique,
    adresse: string,
    tel: string,
    email: string,
    description: text
})

module.exports = mongoose.model("bars", barsSchema)