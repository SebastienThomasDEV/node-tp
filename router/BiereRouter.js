/*BIERE : 
  POST /bars/:id_bar/biere => Ajouter un plat à un bars
  PUT /biere/:id_biere => Modifier un plat
  DELETE /biere/:id_biere => Supprimer un plat d'un bars
  GET /bars/:id_bar/biere => Liste des biere d'un bars
  GET /biere/:id_biere => Détail d'un plat*/

const express = require('express');
const biereRouter = express.Router();
const Biere = require('../models/Biere');

biereRouter.post('/:id_bar/biere', async (req, res) => {
    try {
        const biere = new Biere(req.body);
        const result = await biere.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});
biereRouter.put('/:id_biere', async (req, res) => {
    try {        
        const result = await Biere.findByIdAndUpdate(req.params.id_biere, req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});
biereRouter.delete('/:id_biere', async (req, res) => {
    try {        
        const result = await Biere.findByIdAndDelete(req.params.id_biere);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});
biereRouter.get('/:id_bar/biere', async (req, res) => {
    try {
        const result = await Biere.find({bar_id: req.params.id_bar});
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});
biereRouter.get('/:id_biere', async (req, res) => {
    try {
        const result = await Biere.findById(req.params.id_biere);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});
module.exports = biereRouter;
