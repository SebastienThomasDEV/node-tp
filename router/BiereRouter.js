/*BIERE : 
 * POST /bars/:id_bar/biere => Ajouter un biere à un bars
 * PUT /biere/:id_biere => Modifier un biere
 . DELETE /biere/:id_biere => Supprimer un biere d'un bars
 . GET /bars/:id_bar/biere => Liste des biere d'un bars
 . GET /biere/:id_biere => Détail d'une biere
 GET /bars/:id_bar/degree => Degré d'alcool moyen des bières d'un bars
 */

const express = require('express');
const biereRouter = express.Router();
const { validateBiere }= require('../validators/BiereValidator');
const controllerBiere = require('../controllers/BiereController');
const validate = require("../validators/validator")
// Route GET pour récupérer la liste des bières d'un bar spécifique
biereRouter.get('/bars/:id_bar/bieres',controllerBiere.getAll);

// Route pour obtenir une bière spécifique par son ID
biereRouter.get('/bieres/:id_biere', controllerBiere.show);

// Route pour créer une nouvelle bière

biereRouter.post('/bars/:id_bar/bieres', validate, validateBiere,  controllerBiere.store);

// Route pour mettre à jour une bière existante

biereRouter.put('/bieres/:id_biere', controllerBiere.update);

// Route pour supprimer une bière
biereRouter.delete('/bieres/:id_biere', controllerBiere.delete);

biereRouter.get('/bars/:id_bar/degree', controllerBiere.degree);
biereRouter.get('/bars/:id_bar/bonus', controllerBiere.bonus);
module.exports = biereRouter;
