const { body, param, validationResult } = require('express-validator');


const validateCommande = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send({ errors: errors.array() });
    } else {
        next();
    }
    if (Object.keys(req.body).length === 0) {
        return res.json('Veuillez remplir tous les champs');
    }
    if (req.body.status === 'terminée') {
        return res.json('Impossible de créer une commande terminée');
    }
    if (req.body.date > Date.now()) {
        return res.json('La date doit être supérieure à la date actuelle');
    }
    if (req.body.prix < 0) {
        return res.json('Le prix doit être positif');
    }
    if (req.body.status !== 'en cours' && req.body.status !== 'terminée') {
        return res.json('Le status doit être "en cours" ou "terminée"');
    }
    if (req.body.id_bar === undefined) {
        return res.json('Le bar doit être renseigné');
    }
    if (req.body.id_biere === undefined) {
        return res.json('La bière doit être renseignée');
    }
    next();
};



module.exports = validateCommande;
