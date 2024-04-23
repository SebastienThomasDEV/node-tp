const controllerBiereCommande = {};
const { faker } = require('@faker-js/faker');
const Commande = require('../models/Commande');
const Biere = require('../models/Biere');
const fakerService = require("../services/FakerService");
const BiereCommande = require('../models/BiereCommande');


controllerBiereCommande.addBiere = (req, res) => {
    /* if (!req.body.name || !req.body.prix || !req.params.id_bar || !req.body.date || !req.body.status) {
        return res.json('Veuillez remplir tous les champs');
    } */
    const newBiereCommande = new BiereCommande({
        id_biere: req.body.id_biere,
        id_commande: req.body.id_commande,
    });
    newBiereCommande.save()
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err))
}

controllerBiereCommande.removeBiere = (req, res) => {
    BiereCommande.findById(req.params.id_commande)
    .then((biereCommande) => {
        if (!biereCommande) {
            return res.json('Commande non trouvée');
        }
        BiereCommande.deleteMany({id_biere: req.params.id_biere}).then(() => {
            res.json('Commande supprimée');
        })
    })
}

module.exports = controllerBiereCommande;