const controllerBiereCommande = {};

const Commande = require('../models/Commande');
const Biere = require('../models/Biere');
const BiereCommande = require('../models/BiereCommande');



controllerBiereCommande.getBico = (req, res) => {
    BiereCommande.find()
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));

}

controllerBiereCommande.addBiere = (req, res) => {
    /* if (!req.body.name || !req.body.prix || !req.params.id_bar || !req.body.date || !req.body.status) {
        return res.json('Veuillez remplir tous les champs');
    } */
    const newBiereCommande = new BiereCommande({
        id_biere: req.params.id_biere,
        id_commande: req.params.id_commande,
    });
    BiereCommande.create(newBiereCommande).then((biereCommande) => {
        res.json(biereCommande);
    });
}

controllerBiereCommande.removeBiere = (req, res) => {
    BiereCommande.findById(req.params.id_commande)
        .then((biereCommande) => {
            if (!biereCommande) {
                return res.json('Commande non trouvée');
            }
            BiereCommande.deleteMany({ id_biere: req.params.id_biere }).then(() => {
                res.json('Commande supprimée');
            })
        })
}

module.exports = controllerBiereCommande;