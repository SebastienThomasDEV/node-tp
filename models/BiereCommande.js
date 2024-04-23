const mongoose = require('mongoose');

const BiereCommandeSchema = new mongoose.Schema({
    id_biere: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Biere"
        // required: true
    },
    id_commande: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Commande'
        // required: true
    },
});

module.exports = mongoose.model('BiereCommande', BiereCommandeSchema);