const Biere = require('../models/Biere');


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
    }

controllerBiere.show = (req, res) => {
    Biere.findById(req.params.id) // Correction : utilisation de findById au lieu de findByID
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
controllerBiere.store = (req, res) => {
    Biere.create(req.body)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors de la création de la bière." });
        });
}
controllerBiere.update = (req, res) => {
    Biere.updateOne({_id: req.params.id}, req.body)
        .then((result) => {
            if (result.nModified === 0) {
                return res.status(404).json({ message: "Bière non trouvée ou aucune modification apportée." });
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de la bière." });
        });
}

controllerBiere.delete = (req, res) => {
    Biere.findByIdAndDelete(req.params.id) // Correction : suppression de req.body
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
