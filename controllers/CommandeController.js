const controller = {};
const Commande = require('../models/Commande');
const BiereCommande = require('../models/BiereCommande');
const fakerService = require('../services/FakerService');



controller.list = (req, res) => {
    console.log(req.query.date)
    if (req.query.date) {
        Commande.find({date: req.query.date}).then((queryResult) => {
            res.json(queryResult);
        }).catch((err) => {
            res.json(err);
        });
    }
    if (req.query.prix_min && req.query.prix_max) {
        Commande.find({prix: {$gte: req.query.prix_min, $lte: req.query.prix_max}}).then((queryResult) => {
            res.json(queryResult);
        }).catch((err) => {
            res.json(err);
        });
    }
}

controller.show = (req, res) => {
    Commande.findById(req.params.id)
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

    const fakerCommande = fakerService.generateFakeCommande();

    Commande.create(fakerCommande).then((queryResult) => {
        res.json(queryResult);
    }).catch((err) => {
        res.json(err);
    });
    // const newCommande = new Commande({
    //     name: req.body.name,
    //     prix: req.body.prix,
    //     id_bar: req.params.id_bar,
    //     date: req.body.date,
    //     status: req.body.status
    // });
    // newCommande.save()
    //     .then((queryResult) => res.json(queryResult))
    //     .catch((err) => res.json(err))
}

controller.update = (req, res) => {
    /* if (!req.body.name || !req.body.prix || !req.params.id_bar || !req.body.date || !req.body.status) {
        return res.json('Veuillez remplir tous les champs');
    } */
    Commande.find({_id: req.params.id}).then((commande) => {
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
    Commande.findById(req.params.id)
        .then((commande) => {
            if (!commande) {
                return res.json('Commande non trouvée');
            }
            BiereCommande.deleteMany({id_commande: req.params.id}).then(() => {
                res.json('Commande supprimée');
            })
        })
}

module.exports = controller;