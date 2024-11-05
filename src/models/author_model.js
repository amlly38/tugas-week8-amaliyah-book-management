const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    bio: {
      type: String,
      required: true,
      maxLength: 500
    },
    profilePicture: {
      type: String,
      default: 'null'
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

  AuthorSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });

  module.exports = AuthorSchema