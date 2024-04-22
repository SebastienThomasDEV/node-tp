const mongoose = require('mongoose');

const BiereCommandeSchema = new mongoose.Schema({
    biere_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Biere',
        // required: true
    },
    commande_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Commande',
        // required: true
    },
});

module.exports = mongoose.model('biereCommande', BiereCommandeSchema);