const controllerBar = require("../controllers/BarsController")
const express = require("express")
const BarsRouter = express.Router()

router.get("/bars", controllerBar.getAll)
router.get("/bars/:id_bar", controllerBar.get)
router.post("/bars", controllerBar.post)
router.put("/bars/:id_bar", controllerBar.update)
router.delete("/bars/:id_bar", controllerBar.delete)

module.exports = BarsRouter;