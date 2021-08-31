const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

const Bottle = require('../models/Bottle');

// @route     POST api/bottles
// @desc      Add a bottle
// @access    Private
router.post(
  '/',
  [auth, [check('product', 'Product is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      product,
      vintage,
      varietal,
      style,
      sugar,
      bubbles,
      region,
      country,
      countryCode,
      criticsScore,
      size,
      dateOrdered,
      dateReceived,
      quantity,
      price,
      totalCost,
      costPerBottle,
      vendor,
      location,
      logNotes,
      alcoholPct,
      status,
    } = req.body;

    try {
      const newBottle = new Bottle({
        user: req.user.id,
        product,
        vintage,
        varietal,
        style,
        sugar,
        bubbles,
        region,
        country,
        countryCode,
        criticsScore,
        size,
        dateOrdered,
        dateReceived,
        quantity,
        price,
        totalCost,
        costPerBottle,
        vendor,
        location,
        logNotes,
        alcoholPct,
        status,
      });

      const bottle = await newBottle.save();
      res.json(bottle);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

// @route     GET api/bottles
// @desc      Get all the user's bottles
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const bottles = await Bottle.find({ user: req.user.id }).sort({ date: -1 });
    res.json(bottles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/bottles/:id
// @desc      Update bottle
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const {
    product,
    vintage,
    varietal,
    style,
    sugar,
    bubbles,
    region,
    country,
    countryCode,
    criticsScore,
    size,
    dateOrdered,
    dateReceived,
    quantity,
    price,
    totalCost,
    costPerBottle,
    vendor,
    location,
    logNotes,
    alcoholPct,
    status,
  } = req.body;

  const bottleFields = {};
  if (product) bottleFields.product = product;
  if (vintage) bottleFields.vintage = vintage;
  if (varietal) bottleFields.varietal = varietal;
  if (style) bottleFields.style = style;
  if (sugar) bottleFields.sugar = sugar;
  if (bubbles) bottleFields.bubbles = bubbles;
  if (region) bottleFields.region = region;
  if (country) bottleFields.country = country;
  if (countryCode) bottleFields.countryCode = countryCode;
  if (criticsScore) bottleFields.criticsScore = criticsScore;
  if (size) bottleFields.size = size;
  if (dateOrdered) bottleFields.dateOrdered = dateOrdered;
  if (dateReceived) bottleFields.dateReceived = dateReceived;
  if (quantity) bottleFields.quantity = quantity;
  if (price) bottleFields.price = price;
  if (totalCost) bottleFields.totalCost = totalCost;
  if (costPerBottle) bottleFields.costPerBottle = costPerBottle;
  if (vendor) bottleFields.vendor = vendor;
  if (location) bottleFields.location = location;
  if (logNotes) bottleFields.logNotes = logNotes;
  if (alcoholPct) bottleFields.alcoholPct = alcoholPct;
  if (status) bottleFields.status = status;

  try {
    let bottle = await Bottle.findById(req.params.id);

    if (!bottle) return res.status(404).json({ msg: 'Bottle not found' });

    // Make sure user owns bottle
    if (bottle.user.toString() !== req.user.id) {
      return res.status(400).json({ msg: 'Not authorized to edit' });
    }

    bottle = await Bottle.findByIdAndUpdate(
      req.params.id,
      { $set: bottleFields },
      { new: true }
    );

    res.json(bottle);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/bottles/:id
// @desc      Delete bottle
// @access    Private
router.delete(
  '/:id',
  auth,
  check('id', 'Bottle id is required').not().isEmpty(),
  async (req, res) => {
    try {
      let bottle = await Bottle.findById(req.params.id);

      if (!bottle) return res.status(404).json({ msg: 'Bottle not found' });

      if (bottle.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      bottle = await Bottle.findByIdAndRemove(req.params.id);

      res.send(bottle);
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
