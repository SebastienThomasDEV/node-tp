const controllerBar = {};
const Bar = require('../models/Bars');

controllerBar.getAll = (req, res) => {
    Bar.findAll()
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
};

controllerBar.get = (req, res) => {
    Bar.find({ _id: req.params.id })
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
};

controllerBar.post = (req, res) => {
    const bars_data = {
        name: req.body.name,
        adresse: req.body.adresse,
        tel: req.body.tel,
        email: req.body.email,
        description: req.body.description
    }

    Bar.create(bars_data)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
}

controllerBar.update = (req, res) => {
    const bars_data = {}

    Product.updateOne({ _id: req.params.id }, bars_data)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
};

controllerBar.delete = (req, res) => {
    Commande.deleteOne({_id: req.params.id})
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
}
module.exports = controllerBar;


