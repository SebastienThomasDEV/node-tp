const controllerBar = {};
const Bars = require('../models/Bars');
const { $where } = require('../models/Commande');
const fakerService = require('../services/FakerService');

controllerBar.getAll = (req, res) => {
    if (req.query.ville) {
        Bars.find({ ville: req.query.ville })
            .then((queryResult) => res.json(queryResult))
            .catch((err) => res.json(err));
    } 
    if (req.query.name) {
        Bars.find({ name: {$regex: req.query.name }})
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
    } else

        Bars.find()
            .then((queryResult) => res.json(queryResult))
            .catch((err) => res.json(err));
};

controllerBar.getBar = (req, res) => {
    Bars.find({ _id: req.params.id_bar })
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
};

controllerBar.generate = (req, res) => {
 /*    if (!req.body.name || !req.body.adresse || !req.body.tel || !req.body.email || !req.body.description) {
        return res.json('Veuillez remplir tous les champs');
    } */
    const bar = fakerService.generateFakeBar();
    // const bar = {
    //     name: req.body.name,
    //     adresse: req.body.adresse,
    //     tel: req.body.tel,
    //     email: req.body.email,
    //     description: req.body.description
    // }

    Bars.create(bar)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
};

controllerBar.update = (req, res) => {

    Bars.findByIdAndUpdate(req.params.id_bar, req.body)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json("err"));
};

controllerBar.remove = (req, res) => {
    Bars.findByIdAndDelete(req.params.id_bar, req.body)
        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json(err));
}
module.exports = controllerBar;


