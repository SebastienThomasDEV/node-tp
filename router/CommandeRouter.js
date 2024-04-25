const express = require('express');
const biereCommandeController = require('./BiereCommandeRouter');
const commandeController = require('../controllers/CommandeController');
const router = express.Router();
const validateCommande = require('../validators/CommandeValidator');

router.get('/bars/:id_bar/commandes', commandeController.list);
router.get('/commandes/:id_commande', commandeController.show);
router.post('/bars/:id_bar/commandes', validateCommande, commandeController.create);
router.put('/commandes/:id_commande', commandeController.update);
router.delete('/commandes/:id_commande', commandeController.remove);
router.get('/commandes/details/:id_commande', commandeController.details);
router.post('/:id_bar', validateCommande, biereCommandeController);

module.exports = router;