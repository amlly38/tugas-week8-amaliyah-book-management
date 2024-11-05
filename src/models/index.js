const mongoose = require('mongoose')
const CategorySchema = require("./category_model");
const BorrowerSchema = require("./borrower_model");

module.exports = {
    Category: mongoose.model('Category', CategorySchema),
    Borrower: mongoose.model('Borrower', BorrowerSchema)
}