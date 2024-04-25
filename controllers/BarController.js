const controllerBar = {};
const Bar = require('../models/Bar');
const Commande = require('../models/Commande');
const barsRepository = require('../repositories/Bars');
const biereModel = require("../models/Biere")
const biereCommandeModel = require("../models/BiereCommande")
const ErrorService = require('../services/ErrorService');


controllerBar.getAll = (req, res) => {

    if (req.query.ville) {
        Bar.find({ ville: req.query.ville })
            .then((queryResult) => res.json(queryResult))
            .catch((err) => ErrorService.handle(err, res));
    }
    if (req.query.name) {
        Bar.find({ name: { $regex: req.query.name } })
            .then((queryResult) => res.json(queryResult))
            .catch((err) => ErrorService.handle(err, res));
    }

    Bar.find()
        .then((queryResult) => res.json(queryResult))
        .catch((err) => ErrorService.handle(err, res));
}


controllerBar.getBar = (req, res) => {
    Bar.find({ _id: req.params.id_bar })
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

            // suppression des commandés dont l'id_bar est spécifié dans l'URL
            Commande.deleteMany({ id_bar: req.params.id_bar })
                .catch((err) => ErrorService.handle(err, res));
            biereModel.find({ id_bar: req.params.id_bar })
                .then((bieres) => {
                    bieres.forEach((biere) => { // biere est un objet = chaque biere récupérée dans la table bieres
                        const biereID = biere._id
                        biereCommandeModel.deleteMany({ biereID })
                            .catch((err) => ErrorService.handle(err, res));
                    })
                    biereModel.deleteMany({ id_bar: req.params.id_bar })
                        .catch((err) => ErrorService.handle(err, res));
                })
                .then(() => res.json("Bar supprimé"))
                .catch((err) => ErrorService.handle(err, res));
        })
        .catch((err) => ErrorService.handle(err, res));
}

module.exports = controllerBar;


