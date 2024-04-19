const Biere = require('../models/Biere');
const { validationResult } = require('express-validator');


const controllerBiere = {};

controllerBiere.getAll = (req, res) => {
    Biere.find()
        .then(biere => {
            res.json(biere);
        })
        
        .catch(err => {
            res.status(500).json({ message: "Erreur lors de la récupération des bières", error: err });
        });
    }

controllerBiere.show = (req, res) => {
    Biere.findById(req.params.id_biere)
        .then(biere => {
            if (!biere) {
                return res.status(404).json({ message: "Bière non trouvée" });
            }
            res.json(biere);
        })
        .catch(err => {
            res.status(500).json({ message: "Erreur lors de la récupération des bières", error: err });
        });
}
controllerBiere.store = (req, res) => {
    Biere.create(req.body)
        .then(biere => {
            res.status(201).json(biere);
        })
        .catch(err => {
            res.status(500).json({ message: "Erreur lors de la récupération des bières", error: err });
        });
}
controllerBiere.update = (req, res) => {
    Biere.findById(req.params.id_biere)
        .then(biere => {
            if (!biere) {
                return res.status(404).json({ message: "Bière non trouvée" });
            }
            return Biere.updateOne({_id: req.params.id_biere}, req.body);
        })
        .then(result => {
            if (result.nModified === 0) {
                return res.status(400).json({ message: "Aucun changement à apporter" });
            }
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: "Erreur lors de la récupération des bières", error: err });
        });
}

controllerBiere.delete = (req, res) => {
    Biere.findByIdAndDelete(req.params.id_biere)
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            res.status(500).json({ message: "Erreur lors de la récupération des bières", error: err });
        });
    };
module.exports = controllerBiere;
