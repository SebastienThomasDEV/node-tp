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
    Biere.findById(req.params.bar_id) // Correction : utilisation de findById au lieu de findByID
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
    Biere.find({ bar_id: req.params.id_bar }) // Utilisation de find avec un filtre sur bar_id
        .then((bieres) => {
            if (!bieres || bieres.length === 0) {
                return res.status(404).json({ message: "Aucune bière trouvée pour ce bar." });
            }
            res.json(bieres);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors de la récupération des bières." });
        });
}
controllerBiere.store = (req, res) => {
    const biere_data = {
        nom: req.params.nom,
        description: req.params.description,
        degree: req.params.degree,
        prix: req.params.prix
    };
    Biere.create(biere_data)
        .then((result) => {
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors de la création de la bière." });
        });
}
controllerBiere.update = (req, res) => {
    const biere_data = {};
    Biere.updateOne({_id: req.params.id},biere_data)
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
    Biere.findByIdAndDelete(req.params.id) // Correction : suppression de req.params
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
