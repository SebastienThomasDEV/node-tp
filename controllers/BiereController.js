const { validationResult, validateID } = require('express-validator');
const Biere = require('../models/Biere');
const Bars = require('../models/Bars');



const controllerBiere = {};
// Route GET pour récupérer la liste des bières d'un bar spécifique
controllerBiere.getAll = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_bar } = req.params; // Récupérer l'ID du bar depuis les paramètres d'URL

    // Recherche du bar par son ID
    Bars.findById(id_bar)
        .then((bar) => {
            if (!bar) {
                return res.status(404).json({ message: "Bar non trouvé." });
            }

            // Recherche des bières associées à ce bar
            return Biere.find({ bar_id: id_bar });
        })
        .then((bieres) => {
            res.status(200).json(bieres);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors de la récupération des bières du bar." });
        });
};
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

controllerBiere.store = (req, res) => {
    // const errors = validationResult(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, description, degree, prix } = req.body; 
    const biere_data = {
        name,
        description,
        degree,
        prix,
        bar_id: req.params.id_bar,
    }

    Biere.create(biere_data)
        .then((result) => {

            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors de la création de la bière." });
        });
};
controllerBiere.update = (req, res) => {

    Biere.findByIdAndUpdate(req.params.id_biere , req.body)

        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json("err"));
};

controllerBiere.delete = (req, res) => {
    Biere.findByIdAndDelete(req.params.id_biere, req.body) 

    .then((queryResult) => res.json(queryResult))
    .catch((err) => res.json("err"));
    };
module.exports = controllerBiere;
