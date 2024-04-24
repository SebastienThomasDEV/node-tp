const { validationResult } = require('express-validator');
const Biere = require('../models/Biere');
const Bar = require('../models/Bar');
const { validateBiere } = require('../validators/BiereValidator');
const bieresRepository = require('../repositories/Bieres');
const mongoose = require('mongoose');
const Commande = require('../models/Commande');
const controllerBiere = {};
// Route GET pour récupérer la liste des bières d'un bar spécifique
controllerBiere.getAll = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { id_bar } = req.params; // Récupérer l'ID du bar depuis les paramètres d'URL



    // Recherche du bar par son ID
    Bar.findById(id_bar)
        .then((bar) => {
            if (!bar) {
                return res.status(404).json({ message: "Bar non trouvé." });
            }
            
            // Recherche des bières associées à ce bar  et trier par ordre alphabétique
            return Biere.find({ id_bar: id_bar }).sort({ name: 1 });
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
    Biere.findById(req.body.id_bar) // Correction : utilisation de findById au lieu de findByID
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
    // Méthode manuelle à décommenter
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
    // const { name, description, degree, prix } = req.body;
    // const biere_data = {
    //     name,
    //     description,
    //     degree,
    //     prix,
    //     id_bar: req.params.id_bar,
    // }

    // Méthode automatique à commenter
    const biere = bieresRepository[Math.floor(Math.random() * bieresRepository.length)];
    biere.id_bar = req.params.id_bar; // ne pas oublier d'ajouter l'ID du bar
    Biere.create(biere)
        .then((result) => {
            // Envoyer la réponse avec le résultat de la création
            res.status(201).json(result);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors de la création de la bière." });
        });
};
controllerBiere.update = (req, res) => {

    Biere.findByIdAndUpdate(req.params.id_biere, req.body)

        .then((queryResult) => res.json(queryResult))
        .catch((err) => res.json("err"));
};

controllerBiere.delete = (req, res) => {
    const biereID = req.params.id_biere
    //suprimer toute les commandes qui contiennent cette bière
     // Tout d'abord, supprimez toutes les commandes associées à la bière
     commande.deleteMany({ id_biere: biereID })
     .then(() => {
         // Après avoir supprimé les commandes, supprimez la bière elle-même
         return Biere.findByIdAndDelete(biereID);
     })
     .then((deleteBiere) => {
         if (!deleteBiere) {
             return res.status(404).json({ message: "Biere non trouvée." });
         }
         res.status(200).json({ message: "Biere suprimee." });
     })
     .catch((err) => {
         console.log(`err`);
         res.status(500).json({ message: "Une erreur est survenue lors de la suppression de la bière." });
     });
     console.log(`C`);
    };

    //GET /bars/:id_bar/degree => Degré d'alcool moyen des bières d'un bars
    controllerBiere.degree = (req, res) => {
        const { id_bar } = req.params;
    
        Biere.aggregate([
            { $match: { id_bar: new mongoose.Types.ObjectId(id_bar) } }, // Correctly use new keyword
            { $group: { _id: null, avgDegree: { $avg: "$degree" } } } // Calculate the average degree
        ])
        .then(result => {

            if (result.length > 0) {
                res.json({ averageDegree: result[0].avgDegree });
            } else {
                res.status(404).json({ message: "Aucune bière trouvée pour ce bar." });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: "Une erreur est survenue lors du calcul du degré moyen." });
        });
};
module.exports = controllerBiere;

