/*BIERE : 
 * POST /bars/:id_bar/biere => Ajouter un biere à un bars
 * PUT /biere/:id_biere => Modifier un biere
 . DELETE /biere/:id_biere => Supprimer un biere d'un bars
 . GET /bars/:id_bar/biere => Liste des biere d'un bars
 . GET /biere/:id_biere => Détail d'un biere*/

const express = require('express');
const biereRouter = express.Router();
const { validateBiere } = require('../validators/BiereValidator'); // Assurez-vous que le chemin d'importation est correct
const controllerBiere = require('../controllers/BiereController');

// Route pour obtenir toutes les bières
router.get('/biere', controllerBiere.getAll);

// Route pour obtenir une bière spécifique par son ID
router.get('/biere/:id', controllerBiere.show);

// Route pour créer une nouvelle bière

router.post('/biere', validateBiere, controllerBiere.store);

// Route pour mettre à jour une bière existante

router.put('/biere/:id', validateBiere, controllerBiere.update);

// Route pour supprimer une bière
router.delete('/biere/:id', controllerBiere.delete);


module.exports = biereRouter;
