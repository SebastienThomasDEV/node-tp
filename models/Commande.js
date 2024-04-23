const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String,
        // required: true
    },
    prix: {
        type: Number,
        min: 0
        // required: true
    },
    id_bar: {
        type: String,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['en cours', 'terminée'],
        default: 'en cours'
    },
    id_biere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Biere',
        // required: true
    },
});

module.exports = mongoose.model('Commande', CommandeSchema);