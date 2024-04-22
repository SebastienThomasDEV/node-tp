const controllerBar = {};
const Bars = require('../models/Bars');

controllerBar.getAll = (req, res) => {
    Bars.find()
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
};

controllerBar.getBar = (req, res) => {
    Bars.find({ id: req.params.id })
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
};

controllerBar.generate = (req, res) => {
    if (!req.body.name || !req.body.adresse || !req.body.tel || !req.body.email || !req.body.description) {
        return res.json('Veuillez remplir tous les champs');
    }
    const bars_data = {
        name: req.body.name,
        adresse: req.body.adresse,
        tel: req.body.tel,
        email: req.body.email,
        description: req.body.description
    }

    Bars.create(bars_data)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
}

controllerBar.update = (req, res) => {
    const bars_data = {}

    Product.updateOne({ id: req.params.id }, bars_data)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
};

controllerBar.remove = (req, res) => {
    Commande.deleteOne({ id: req.params.id })
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
}
module.exports = controllerBar;


