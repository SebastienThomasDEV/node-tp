const controllerBar = require("../controllers/BarController")
const express = require("express")
const BarRouter = express.Router()
const { validateBar, validateBodyParam } = require("../validators/BarValidator")
const validate = require("../validators/validator")

BarRouter.get("/", controllerBar.getAll)
BarRouter.get("/:id_bar", controllerBar.getBar)
BarRouter.post("/", validate, validateBodyParam, validateBar, controllerBar.generate)
BarRouter.put("/:id_bar", validate, validateBodyParam, validateBar, controllerBar.update)
BarRouter.delete("/:id_bar", controllerBar.remove)

// Bonus

BarRouter.get("/:id_bar/bieres", controllerBar.sort)



module.exports = BarRouter;