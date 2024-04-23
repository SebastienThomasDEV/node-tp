const { validationResult } = require('express-validator');
const Biere = require('../models/Biere');
const Bars = require('../models/Bars');
const { faker } = require('@faker-js/faker');

const controllerBiere = {};

controllerBiere.getAll = (req, res) => {
    Biere.find()
        .then((Biere) => {
            res.json(Biere);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors de la récupération des bières." });
        });
        console.log(`recuperation de biere ${req.body.bar_id}` );
    }

controllerBiere.show = (req, res) => {
    Biere.findById(req.body.bar_id) // Correction : utilisation de findById au lieu de findByID
        .then((biere) => {
            if (!biere) {
                return res.status(404).json({ message: "Bière non trouvée." });
            }
            res.json(biere);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors de la récupération de la bière." });
        });
}
controllerBiere.list = (req, res) => {

    Task.updateOne({_id : req.params.id}, req.body)
    .then((queryResult) => res.json(queryResult))
    .catch((err) => res.send(err));
}
controllerBiere.store = (req, res) => {
    // const errors = validationResult(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, degree, prix, b } = req.body; 
    const biere_data = {
        name,
        description,
        degree,
        prix,
        bar_id,
    }

    Biere.create(biere_data)
        .then((result) => {
            console.log(`Création de la bière ${result.name}`);
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors de la création de la bière." });
        });
};
controllerBiere.update = (req, res) => {

    Biere.findByIdAndUpdate(req.params.id)
        .then((result) => {
            if (result === 0) {
                return res.status(404).json({ message: "Bière non trouvée ou aucune modification apportée." });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de la bière." });
        });
}

controllerBiere.delete = (req, res) => {
    Biere.findByIdAndDelete(req.body.id) // Correction : suppression de req.body
        .then((result) => {
            if (!result) {
                return res.status(404).json({ message: "Bière non trouvée." });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors de la suppression de la bière." });
        });
    };
module.exports = controllerBiere;
