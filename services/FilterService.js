const Commande = require('../models/Commande');
const Utils = require('../utils/Utils');

const filterService = {
    filterCommandes: async (filtres) => {
        let filters_list = [];
        if (filtres.date) {
            filters_list.push({date: {$gte: new Date(filtres.date)}});
        }
        if (filtres.prix_min && filtres.prix_max) {
            filters_list.push({prix: {$gte: filtres.prix_min, $lte: filtres.prix_max}});
        }
        if (filtres.status) {
            filters_list.push({status: {$regex: filtres.status}});
        }
        if (filtres.name) {
            filters_list.push({name: {$regex: filtres.name}});
        }
        return Commande.find({$and: filters_list});
    },
    filterBiere : async (filtres) => {
        // code ici
    }
}

module.exports = filterService;
