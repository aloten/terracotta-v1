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
  producer: {
    type: String,
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
  criticsScore: {
    type: String,
  },
  size: {
    type: String,
  },
  datePurchased: {
    type: Date,
  },
  dateReceived: {
    type: Date,
  },
  quantity: {
    type: Number,
  },
  currency: {
    type: String,
  },
  price: {
    type: Number,
  },
  totalCost: {
    type: Number,
  },
  vendor: {
    type: String,
  },
  location: {
    type: String,
  },
  notes: {
    type: String,
  },
  alcoholPct: {
    type: String,
  },
  opened: {
    type: Boolean,
    default: false,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Bottle', bottleSchema);
