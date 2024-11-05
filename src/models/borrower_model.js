const mongoose = require('mongoose')

const BorrowerSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowerCase: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    address: {
      type: String,
      required: true
    },
    membershipStatus: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
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

  BorrowerSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });

  module.exports = BorrowerSchema