/*BIERE : 
 * POST /bars/:id_bar/biere => Ajouter un biere à un bars
 * PUT /biere/:id_biere => Modifier un biere
 . DELETE /biere/:id_biere => Supprimer un biere d'un bars
 . GET /bars/:id_bar/biere => Liste des biere d'un bars
 . GET /biere/:id_biere => Détail d'une biere*/

const express = require('express');
const biereRouter = express.Router();
const { validateBiere } = require('../validators/BiereValidator');
const controllerBiere = require('../controllers/BiereController');

// Route pour obtenir toutes les bières
biereRouter.get('/', controllerBiere.getAll);

// Route pour obtenir une bière spécifique par son ID
biereRouter.get('/:id_bar/biere', controllerBiere.show);

// Route GET pour récupérer la liste des bières d'un bar spécifique
biereRouter.get('/:id_bar/biere', controllerBiere.list )

// Route pour créer une nouvelle bière

biereRouter.post('/', controllerBiere.store);

// Route pour mettre à jour une bière existante

biereRouter.put('/:id', controllerBiere.update);

// Route pour supprimer une bière
biereRouter.delete('/biere/:id', controllerBiere.delete);


module.exports = biereRouter;
