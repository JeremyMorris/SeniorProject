const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');

// @route   GET api/categories
// @desc    Get categories
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user.categories);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/categories
// @desc    Create new category
// @access  Private
router.post('/', auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('color', 'Color is required').not().isEmpty()
], async (req, res) => {
  // Check post contents
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, color } = req.body;

  const newCategory = {
    name,
    color
  }

  try {
    // Get user
    let user = await User.findById(req.user.id ).select('-password');

    // Add category
    user.categories.push(newCategory);

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/categories/:category_id
// @desc    Edit category
// @access  Private
router.put('/:category_id', auth, async (req, res) => {

  const { name, color } = req.body;

  try {
    // Get user
    let user = await User.findById(req.user.id ).select('-password');

    // Get category index
    const index = user.categories.map(item => item.id).indexOf(req.params.category_id);
    if (name) user.categories[index].name = name;
    if (color) user.categories[index].color = color;
    
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/categories/:category_id
// @desc    Delete category
// @access  Private
router.delete('/:category_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    // Get remove index
    const removeIndex = user.categories.map(item => item.id).indexOf(req.params.category_id);

    user.categories.splice(removeIndex, 1);

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;