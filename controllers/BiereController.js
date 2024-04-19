const { query } = require('express');
const Biere = require('../models/Biere');


const controllerBiere = {};

controllerBiere.getAll = (req, res) => {
    Biere.find()
        .then((Biere) => {
            res.json(Biere);
        })
        .catch((err) => {
            res.json(err);
        });
    }

controllerBiere.show = (req, res) => {
    Biere.findByID(req.params.bar_id)
        .then((biere) => {
            res.json(biere);
        })
        .catch((err) => {
            res.json(err);
        });
}
controllerBiere.store = (req, res) => {
    Biere.create(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
}
controllerBiere.update = (req, res) => {
    Biere.updateOne({_id: req.params.id}, req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
}

controllerBiere.delete = (req, res) => {
    Biere.findByIdAndDelete({_id: req.params.id}, req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.json(err);
        });
    };
module.exports = controllerBiere;