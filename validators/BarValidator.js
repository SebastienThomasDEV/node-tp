const { body, param } = require("express-validator");

const validateBar = [
    param('id')
    .notEmpty()
        .isNumeric()
];

const validateBodyParam = [
    body('name').notEmpty().isString().custom((value, { req }) => {
        if ({name: req.body.name}) {
            throw new Error('Le nom du bar doit être unique, il existe déjà un bar avec ce nom');
        }
        return true;
    })
]

module.exports = { validateBodyParam, validateBar }