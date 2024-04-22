const express = require('express');
const biereCommandeController = require('./BiereCommandeRouter');
const commandeController = require('../controllers/CommandeController');
const router = express.Router();

router.get('/', commandeController.list);
router.get('/:id', commandeController.show);
router.post('/', commandeController.create);
router.put('/:id', commandeController.update);
router.delete('/:id', commandeController.remove);

router.post('/:id', biereCommandeController);

module.exports = router;