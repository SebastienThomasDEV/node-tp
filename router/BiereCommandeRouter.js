const controllerBiereCommande = require("../controllers/BiereCommandeController")
const express = require("express")
const BiereCommandeRouter = express.Router()

BiereCommandeRouter.get("/commandes/:id_commande/bieres/:id_biere", controllerBiereCommande.addBiere)
BiereCommandeRouter.delete("/:id_bar", controllerBiereCommande.removeBiere)

module.exports = BiereCommandeRouter;