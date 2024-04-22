const controllerBar = require("../controllers/BarsController")
const express = require("express")
const BarsRouter = express.Router()
const { validateBar, validateBodyParam } = require("../validators/BarsValidator")
const validate = require("../validators/validator")

BarsRouter.get("/", controllerBar.getAll)
BarsRouter.get("/:id_bar", controllerBar.getBar)
BarsRouter.post("/", validate, validateBodyParam, validateBar, controllerBar.generate)
BarsRouter.put("/:id_bar", validate, validateBodyParam, validateBar, controllerBar.update)
BarsRouter.delete("/:id_bar", controllerBar.remove)

module.exports = BarsRouter;