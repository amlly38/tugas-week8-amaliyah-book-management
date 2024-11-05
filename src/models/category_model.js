const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
  });

  CategorySchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });

  module.exports = CategorySchema