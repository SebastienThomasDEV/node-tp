const mongoose = require('mongoose');

const CommandeSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String,
        required: true
    },
    prix: {
        type: Number,
        required: true
    },
    bars_id: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['en cours', 'terminée'],
        default: 'en cours'
    }

});

module.exports = mongoose.model('commande', CommandeSchema);