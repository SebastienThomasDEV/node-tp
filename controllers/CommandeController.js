const controller = {};
const Commande = require('../models/Commande');
const BiereCommande = require('../models/BiereCommande');
const commandesRepository = require('../repositories/Commandes');
const FilterService = require('../services/FilterService');
const Utils = require('../utils/Utils');
const fs = require("fs");


controller.list = async (req, res) => {
    if (Object.keys(req.query).length > 0) {
        await FilterService.filterCommandes(req.query).then((queryResult) => {
            res.json(queryResult);
        }).catch((err) => {
            res.json(err);
        });
    } else {
        await Commande.find()
            .then((queryResult) => res.json(queryResult))
            .catch((err) => res.json(err));
    }
}

controller.show = (req, res) => {
    Commande.findById(req.params.id_commande)
        .then((queryResult) => {
            if (!queryResult) {
                return res.json('Commande non trouvée');
            }
            res.json(queryResult);
        })
        .catch((err) => {
            res.json(err);
        });
}

controller.create = (req, res) => {
    // if (!req.body.name || !req.body.prix || !req.params.id_bar || !req.body.date || !req.body.status) {
    //     return res.json('Veuillez remplir tous les champs');
    // }

    // Méthode manuelle à décommenter
    // const newCommande = new Commande({
    //     name: req.body.name,
    //     prix: req.body.prix,
    //     id_bar: req.params.id_bar,
    //     date: req.body.date,
    //     status: req.body.status
    // });

    // Méthode automatique à commenter
    const newCommande = commandesRepository[Math.floor(Math.random() * commandesRepository.length)];
    newCommande.id_bar = req.params.id_bar;
    Commande.create(newCommande)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err))
}

controller.update = (req, res) => {
    /* if (!req.body.name || !req.body.prix || !req.params.id_bar || !req.body.date || !req.body.status) {
        return res.json('Veuillez remplir tous les champs');
    } */
    Commande.find({ _id: req.params.id_commande }).then((commande) => {
        if (commande.length === 0) {
            return res.json('Commande non trouvée');
        }
        if (commande.status === 'terminée') {
            return res.json('Commande terminée, impossible de la modifier');
        }
    }).then(() => {
        Commande.findByIdAndUpdate(req.params.id_commande, req.body)
            .then(() => res.json('commande modifiée'))
            .catch((err) => res.json(err));
    }).catch((err) => res.json(err));
}

controller.remove = (req, res) => {

    // suppression des commandes via leur id
    Commande.findByIdAndDelete(req.params.id_commande)
        .then((commande) => {
            if (!commande) {
                return res.json('Commande non trouvée');
            }

            //suppression des bieres_commandes associées à cette commande via l'id
            BiereCommande.deleteMany({ id_commande: req.params.id_commande })

                .then(() => {
                    return BiereCommande.deleteMany({ id_commande: req.params.id_commande })
                })

                .then(() => {
                    res.json('Commande supprimée');
                })
                .catch((err) => res.json(err));
        })
        .catch((err) => res.json(err));
}

controller.details = (req, res) => {
    Commande.findById(req.params.id_commande)
        .then((commande) => {
            Utils.generatePdfAndSend(commande, res);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
}

module.exports = controller;