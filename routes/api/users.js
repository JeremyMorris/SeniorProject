const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
], async (req, res) => {
  // Check post contents
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });

    if(user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Create user object
    user = new User({
      name,
      email,
      password
    });

    user.expenses = [];
    user.categories = [];
    user.categories.push({ name: 'Housing', color: '#bfc9ca' });
    user.categories.push({ name: 'Transportation', color: '#f0b27a' });
    user.categories.push({ name: 'Food', color: '#82e0aa' });
    user.categories.push({ name: 'Utilities', color: '#85c1e9' });
    user.categories.push({ name: 'Insurance', color: '#d98880' });
    user.categories.push({ name: 'Healthcare', color: '#f1948a' });
    user.categories.push({ name: 'Entertainment', color: '#f7dc6f' });
    user.categories.push({ name: 'Investments', color: '#28b463' });
    user.categories.push({ name: 'Other', color: '#a569bd' });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id
      }
    }

    jwt.sign(
      payload, 
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if(err) throw err;
        res.json({ token });
      });
  }
  catch(err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/users
// @desc    Delete user
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user.id);
    res.status(200).send('User deleted');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;