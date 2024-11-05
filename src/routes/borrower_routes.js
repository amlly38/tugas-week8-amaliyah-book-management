const express = require("express")
const CategoryController = require("../controllers/borrower_controller")

const categoryRouter = express.Router()

categoryRouter.post("/borrower", CategoryController.create)
categoryRouter.get("/borrowers", CategoryController.getAll)
categoryRouter.get("/borrower/:id", CategoryController.getById)
categoryRouter.put("/borrower/:id", CategoryController.update)
categoryRouter.delete("/borrower/:id", CategoryController.delete)


module.exports = categoryRouter