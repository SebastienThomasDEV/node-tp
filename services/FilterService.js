const Commande = require('../models/Commande');
const Bar = require('../models/Bar');
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
        let filters_list = [];
        if (filtres.alcool_min && filtres.alcool_max) {
            filters_list.push({alcool: {$gte: filtres.alcool_min, $lte: filtres.alcool_max}});
        }
        if (filtres.name) {
            filters_list.push({name: {$regex: filtres.name}});
        }
        return Biere.find({$and: filters_list});
    },
    filterBar : async (filtres) => {
        let filters_list = [];
        if (filtres.ville) {
            filters_list.push({ville: filtres.ville});
        }
        if (filtres.name) {
            filters_list.push({name: {$regex: filtres.name}});
        }
        return Bar.find({$and: filters_list});
    }
}

module.exports = filterService;
