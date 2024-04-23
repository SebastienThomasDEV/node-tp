const { body, param, validationResult } = require('express-validator');


const validateBodyParam = [
    body('date').isDate().custom((value, { req }) => {
        if (value > Date.now()) {
            throw new Error('La date doit être supérieure à la date actuelle');
        }
        return true;
    }),
    body('status').isIn(['en cours', 'terminée']),
    body('id_bars').isNumeric(),
    body('prix').isNumeric().isFloat({ min: 0 }),
];


module.exports = validateBodyParam;
