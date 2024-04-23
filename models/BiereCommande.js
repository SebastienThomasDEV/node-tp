const mongoose = require('mongoose');

const BiereCommandeSchema = new mongoose.Schema({
    id_biere: {
        type: String
        // required: true
    },
    id_commande: {
        type: String
        // required: true
    },
});

module.exports = mongoose.model('biereCommande', BiereCommandeSchema);