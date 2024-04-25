const controllerBiereCommande = require("../controllers/BiereCommandeController")
const express = require("express")
const BiereCommandeRouter = express.Router()

BiereCommandeRouter.get("/commandes/:id_bieres_commande", controllerBiereCommande.getBico)
BiereCommandeRouter.get("/commandes/:id_commande/bieres/:id_biere", controllerBiereCommande.addBiere)
BiereCommandeRouter.delete("/commandes/:id_commande/bieres/:id_biere", controllerBiereCommande.removeBiere)

module.exports = BiereCommandeRouter;