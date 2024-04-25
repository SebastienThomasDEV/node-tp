const controllerBar = {};
const Bar = require('../models/Bar');
const commandeModel = require('../models/Commande');
const barsRepository = require('../repositories/Bars');
const biereModel = require("../models/Biere")
const biereCommandeModel = require("../models/BiereCommande");
const { query } = require('express-validator');


controllerBar.getAll = (req, res) => {

    if (req.query.ville) {
        Bar.find({ ville: req.query.ville })
            .then((queryResult) => res.json(queryResult))
            .catch((err) => res.json(err));
    }
    if (req.query.name) {
        Bar.find({ name: { $regex: req.query.name } })
            .then((queryResult) => res.json(queryResult))
            .catch((err) => res.json(err));
    }

    Bar.find()
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
}


controllerBar.getBar = (req, res) => {
    Bar.find({ _id: req.params.id_bar })
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
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
        .catch((err) => res.json(err));
};

controllerBar.update = (req, res) => {

    Bar.findByIdAndUpdate(req.params.id_bar, req.body)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json("err"));
};


/* controllerBar.remove = (req, res) => {

    Bar.findByIdAndDelete(req.params.id_bar)
        .then(() => {

            // suppression des commandés dont l'id_bar est spécifié dans l'URL
            commandeModel.find({ id_bar: req.params.id_bar })
                .then((commandes) => {
                    commandes.forEach((commande) => {
                        const CommandeID = commande._id
                        commandeModel.deleteMany({ CommandeID })

                    })
                    commandeModel.deleteMany({ id_bar: req.params.id_bar })
                })
                

            biereModel.find({ id_bar: req.params.id_bar })
                .then((bieres) => {
                    bieres.forEach((biere) => { // biere est un objet = chaque biere récupérée dans la table bieres
                        const biereID = biere._id
                        biereCommandeModel.deleteMany({ biereID })
                    })

                    biereModel.deleteMany({ id_bar: req.params.id_bar })
                        
                })
                .then(() => res.json("Bar supprimé"))
        })
        .catch((err) => res.json(err));
} */

controllerBar.remove = (req, res) => {
    Bar.findByIdAndDelete(req.params.id_bar)
        .then(() => {
            // Suppression des commandes associées au bar
            commandeModel.deleteMany({ id_bar: req.params.id_bar })
                .then(() => {
                    // Suppression des bières associées au bar
                    return biereModel.deleteMany({ id_bar: req.params.id_bar });
                })
                .then(() => {
                    // Suppression des bières_commandes associées au bar
                    return biereCommandeModel.deleteMany({ id_bar: req.params.id_bar });
                })
                .then(() => {
                    // Message une fois toutes les actions faites
                    res.json("Bar supprimé");
                })
                .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
}


module.exports = controllerBar;


