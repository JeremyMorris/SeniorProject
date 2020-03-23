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
    res.json(user.expenses);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/expenses
// @desc    Create new expense
// @access  Private
router.post('/', auth, [
  check('name', 'Name is required').not().isEmpty(),
  check('amount', 'Amount is required').isNumeric(),
  check('category', 'Category is required').not().isEmpty()
], async (req, res) => {
  // Check post contents
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, 
          amount,
          category,
          date,
          notes,
          recurring,
          frequency
         } = req.body;

  // build expense object
  const newExpense = {};
  if (name) newExpense.name = name;
  if (amount) newExpense.amount = amount;
  if (category) newExpense.category = category;
  if (date) newExpense.date = date;
  if (notes) newExpense.notes = notes;
  if (recurring) newExpense.recurring = recurring;
  if (frequency) newExpense.frequency = frequency;

  try {
    // Get user
    let user = await User.findById(req.user.id).select('-password');

    // Add category
    user.expenses.push(newExpense);

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/expenses/:expense_id
// @desc    Edit expense
// @access  Private
router.put('/:expense_id', auth, async (req, res) => {

  const { name, 
          amount,
          category,
          date,
          notes,
          recurring,
          frequency
   } = req.body;

  try {
    // Get user
    let user = await User.findById(req.user.id).select('-password');

    // Get category index
    const index = user.expenses.map(item => item.id).indexOf(req.params.expense_id);
    if (name) user.expenses[index].name = name;
    if (amount) user.expenses[index].amount = amount;
    if (category) user.expenses[index].category = category;
    if (date) user.expenses[index].date = date;
    if (notes || notes === '') user.expenses[index].notes = notes;
    if (recurring) user.expenses[index].recurring = recurring;
    if (frequency) user.expenses[index].frequency = frequency;
    
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/expenses/:expense_id
// @desc    Delete expense
// @access  Private
router.delete('/:expense_id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    // Get remove index
    const removeIndex = user.expenses.map(item => item.id).indexOf(req.params.expenses_id);

    user.expenses.splice(removeIndex, 1);

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;