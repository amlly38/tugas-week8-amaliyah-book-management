const express = require("express")
const testRoutes = require("./test_routes")
const categoryRouter = require("./category_routes")

const routes = express.Router()

// kumpulkan semua routes disini per bagian ex : /author,/books dll
routes.use(testRoutes)
routes.use(categoryRouter)



module.exports = routes