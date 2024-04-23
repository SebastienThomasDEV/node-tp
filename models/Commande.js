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
    biere_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'biere',
        // required: true
    },
});

module.exports = mongoose.model('commande', CommandeSchema);