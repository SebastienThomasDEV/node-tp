const controllerBar = {};
const Bar = require('../models/Bar');
const { $where } = require('../models/Commande');
const barsRepository = require('../repositories/Bars');
const Biere = require("../repositories/Bieres")


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

controllerBar.remove = (req, res) => {
    Bar.findByIdAndDelete(req.params.id_bar, req.body)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
}

// Bonus 

// ligne 126




module.exports = controllerBar;


