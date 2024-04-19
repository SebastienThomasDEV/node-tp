/*BIERE : 
 * POST /bars/:id_bar/biere => Ajouter un biere à un bars
 * PUT /biere/:id_biere => Modifier un biere
 . DELETE /biere/:id_biere => Supprimer un biere d'un bars
 . GET /bars/:id_bar/biere => Liste des biere d'un bars
 . GET /biere/:id_biere => Détail d'un biere*/

const express = require('express');
const biereRouter = express.Router();
const controllerBiere = require('../controllers/BiereController');

biereRouter.get('/biere/:id_biere', controllerBiere.show);
biereRouter.get('/bars/:id_bar/biere', controllerBiere.store);
biereRouter.post('/bars/:id_bar/biere', controllerBiere.getAll);
biereRouter.put('/bars/:id_biere', controllerBiere.update);
biereRouter.delete('/bars/:id_biere', controllerBiere.delete);

module.exports = biereRouter;
