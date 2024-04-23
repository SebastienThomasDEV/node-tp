const mongoose = require("mongoose")

const barsSchema = mongoose.Schema({
    /* _id: {
        type: Number,
        required: true
    }, A ne pas mettre car il est généré automatiquement en mongoDB */ 

    name: {
        type : String, 
        /* unique: true, */
       /*  required: true, */
    },

    adresse: {
        type: String,
       /*  required: true, */
    },

    ville: {
        type: String,
    },

    tel: {
        type: String,
       /*  required: true, */
    },

    email: {
        type: String,
      /*   required: true, */
    },

    description: {
        type: String,
       /*  required: true, */
    },
    
    bieres: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Biere'
    }]
})

module.exports = mongoose.model("bars", barsSchema)