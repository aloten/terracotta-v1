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
    default: 'N/A',
  },
  countryCode: {
    type: String,
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
