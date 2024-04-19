const controllerBar = require("../controllers/BarsController")
const express = require("express")
const BarsRouter = express.Router()

BarsRouter.get("/", controllerBar.getAll)
BarsRouter.get("/:id_bar", controllerBar.getBar)
BarsRouter.post("/", controllerBar.generate)
BarsRouter.put("/:id_bar", controllerBar.update)
BarsRouter.delete("/:id_bar", controllerBar.remove)

module.exports = BarsRouter;