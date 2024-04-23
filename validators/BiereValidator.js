/*- Tous les champs obligatoires doivent être renseignés
- Le nom d'un bars doit être unique
- Le prix d'une biere doit être positif
- Le prix d'une commande doit être positif
- Le status d'une commande doit être "en cours" ou "terminée"
- Le status d'une commande ne peut pas être modifié si elle contient des biere
- une commande ne peut pas être modifié si elle est terminée
- La date d'une commande ne peut pas être supérieure à la date du jour
- Quand je supprime un bars, je supprime toutes les biere et les commandes associées
- Quand je supprime une biere, je supprime toutes les commandes associées
- Quand je supprime une commande, je supprime toutes les biere_commande associées*/

const { body, param } = require("express-validator");



const validateBiere = [
  body("name").isString().withMessage("Le nom d'une bière doit être renseigné"),
  body("description")
    .isString()
    .withMessage("La description d'une bière doit être renseignée"),
  body("degree")
    .isFloat({ min: 0 })
    .withMessage("Le degre d'alcool d'une bière doit être renseigné"),
  body("prix")
    .isFloat({ min: 0 })
    .withMessage("Le prix d'une bière doit être renseigné"),
]

module.exports = { validateBiere };
