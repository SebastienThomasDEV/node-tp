const controllerBar = {};
const Bar = require('../models/Bar');
const commandeModel = require('../models/Commande');
const barsRepository = require('../repositories/Bars');
const biereModel = require("../models/Biere")
const {query} = require('express-validator');
const biereCommandeModel = require("../models/BiereCommande")
const ErrorService = require('../services/ErrorService');
const FilterService = require('../services/FilterService');
const Commande = require("../models/Commande");

controllerBar.getAll = async (req, res) => {
    if (Object.keys(req.query).length > 0) {
        await FilterService.filterBar(req.query)
            .then((queryResult) =>  res.json(queryResult))
            .catch((err) => ErrorService.handle(err, res));
    } else {
        await Bar.find()
            .then((queryResult) => res.json(queryResult))
            .catch((err) => ErrorService.handle(err, res));
    }
}


controllerBar.getBar = (req, res) => {
    Bar.find({_id: req.params.id_bar})
        .then((queryResult) => res.json(queryResult))
        .catch((err) => ErrorService.handle(err, res));
};

controllerBar.generate = (req, res) => {
    // Méthode manuelle à décommenter
    // if (!req.body.name || !req.body.adresse || !req.body.tel || !req.body.email || !req.body.description) {
    //     return res.json('Veuillez remplir tous les champs');
    // }
    // const bar = {
    //     name: req.body.name,
    //     adresse: req.body.adresse,
    //     tel: req.body.tel,
    //     email: req.body.email,
    //     description: req.body.description
    // }

    // Méthode automatique à commenter
    const bar = barsRepository[Math.floor(Math.random() * barsRepository.length)];
    Bar.create(bar)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => ErrorService.handle(err, res));
};

controllerBar.update = (req, res) => {

    Bar.findByIdAndUpdate(req.params.id_bar, req.body)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => ErrorService.handle(err, res));
};


controllerBar.remove = (req, res) => {
    Bar.findByIdAndDelete(req.params.id_bar)
        .then(() => {
            // Suppression des commandes associées au bar
            commandeModel.deleteMany({id_bar: req.params.id_bar})
                .then(() => {
                    // Suppression des bières associées au bar
                    return biereModel.deleteMany({id_bar: req.params.id_bar});
                })
                .then(() => {
                    // Suppression des bières commandées associées au bar
                    return biereCommandeModel.deleteMany({id_bar: req.params.id_bar});
                })
                .then(() => {
                    // Répondre une fois toutes les suppressions terminées
                    res.json("Bar supprimé");
                })
                .catch((err) => res.json(err));
        })
        .catch((err) => ErrorService.handle(err, res));
}

module.exports = controllerBar;


