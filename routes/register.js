const express = require('express');
const router = express.Router();
const config = require('config');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');

// @route     POST api/register
// @desc      Register a user
// @access    Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if email is in database
      await User.findOne({ email: email }, (error, user) => {
        if (error) throw error;
        if (user != null) {
          return res.status(400).json({ msg: 'Email already in use' });
        }
      });

      let user = new User({
        name,
        email,
        password,
      });

      // hash password
      const salt = await bcryptjs.genSalt(10);
      user.password = await bcryptjs.hash(password, salt);

      user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      // generate token and send to user
      jwt.sign(
        payload,
        config.get('jwtSecret'), // need to create better secret
        {
          expiresIn: 3600,
        },
        (error, token) => {
          if (error) throw error;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
