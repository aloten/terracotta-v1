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
    type: Number,
  },
  varietal: {
    type: String,
  },
  style: {
    type: String,
  },
  sugar: {
    type: String,
  },
  bubbles: {
    type: String,
  },
  region: {
    type: String,
  },
  country: {
    type: String,
  },
  countryCode: {
    type: String,
  },
  criticsScore: {
    type: String,
  },
  size: {
    type: String,
  },
  dateOrdered: {
    type: Date,
  },
  dateReceived: {
    type: Date,
  },
  quantity: {
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
  vendor: {
    type: String,
  },
  location: {
    type: String,
  },
  logNotes: {
    type: String,
  },
  alcoholPct: {
    type: Number,
  },
  status: {
    type: String,
    default: 'unopened',
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bottle', bottleSchema);
