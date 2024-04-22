const { body, param } = require("express-validator");

const validateBar = [
    param('id')
    .notEmpty()
        .isNumeric()
];

const validateBodyParam = [
    body('name').notEmpty().isString().custom((value, { req }) => {
        const { name } = req.body;
        if (value === findOne({name}) ) {
            throw new Error('Le nom du bar doit être unique'),
            console.log(`Le nom du bar existe déjà`);
        }
        return true;
    })
]

module.exports = { validateBodyParam, validateBar }