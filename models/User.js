const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  expenses: [{
    name: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: {
      type: String
    },
    recurring: {
      type: Boolean,
      default: false
    },
    frequency: {
      type: String
    }
  }],
  categories: [{
    name: {
      type: String,
      required: true
    },
    color: {
      type: String,
      required: true
    }
  }]
});

module.exports = User = mongoose.model('user', UserSchema);