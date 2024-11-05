const mongoose = require('mongoose')
const CategorySchema = require("./category_model");

module.exports = {
    Category: mongoose.model('Category', CategorySchema),
}