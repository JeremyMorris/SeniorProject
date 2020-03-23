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
    parent: {
      type: String
    }
  }],
  recurringExpenses: [{
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
    frequency: {
      type: String,
      required: true
    },
    nextOccurrence: {
      type: Date,
      default: Date.now
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