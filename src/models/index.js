const mongoose = require('mongoose')
const CategorySchema = require("./category_model");
const BorrowerSchema = require("./borrower_model");
const AuthorSchema = require("./author_model");

module.exports = {
    Category: mongoose.model('Category', CategorySchema),
    Borrower: mongoose.model('Borrower', BorrowerSchema),
    Author: mongoose.model('Author', AuthorSchema)
}