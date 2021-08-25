const mongoose = require('mongoose');

const bottleSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
  },
  product: {
    type: String,
    required: true,
  },
  vintage: {
    type: String,
  },
  varietal: {
    type: String,
  },
  count: {
    type: Number,
  },
  price: {
    type: Number,
  },
  totalCost: {
    type: Number,
  },
  costPerBottle: {
    type: Number,
  },
  countryCode: {
    type: String,
  },
  size: {
    type: Number,
  },
  status: {
    type: String,
    default: 'unopened',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bottle', bottleSchema);
