const express = require("express")
const AuthorController = require("../controllers/author_controller")

const authorRouter = express.Router()

authorRouter.post("/author", AuthorController.create)
authorRouter.get("/authors", AuthorController.getAll)
authorRouter.get("/author/:id", AuthorController.getById)
authorRouter.put("/author/:id", AuthorController.update)
authorRouter.delete("/author/:id", AuthorController.delete)
authorRouter.post("/author/upload", AuthorController.uploadImage)


module.exports = authorRouter