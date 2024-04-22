const controllerBiereCommande = require("../controllers/BiereCommandeController")
const express = require("express")
const BiereCommandeRouter = express.Router()

BiereCommandeRouter.post("/commandes/:id/biere/:id", controllerBiereCommande.addBiere)
BiereCommandeRouter.delete("/:id_bar", controllerBiereCommande.removeBiere)

module.exports = BiereCommandeRouter;