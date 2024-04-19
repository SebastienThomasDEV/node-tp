const express = require('express');
// const cors = require('cors');
const commandeController = require('../controllers/CommandeController');
const router = express.Router();

router.get('/', commandeController.list);
router.get('/:id', commandeController.show);
router.post('/', commandeController.create);
router.put('/:id', commandeController.update);
router.delete('/:id', commandeController.remove);




module.exports = router;