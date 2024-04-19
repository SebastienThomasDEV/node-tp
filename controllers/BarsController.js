const controllerBar = {};
const Bars = require('../models/Bars');

controllerBar.getAll = (req, res) => {
    Bars.find()
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
};

controllerBar.getBar = (req, res) => {
    Bars.find({ _id: req.params.id })
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
};

controllerBar.generate = (req, res) => {
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

    Product.updateOne({ _id: req.params.id }, bars_data)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
};

controllerBar.remove = (req, res) => {
    Commande.deleteOne({ _id: req.params.id })
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
}
module.exports = controllerBar;


