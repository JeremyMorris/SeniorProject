const User = require('../models/User');
const checkRecurringExpenses = require('../server functions/checkRecurringExpenses');

async function checkRecurrencesForAllUsers () {
  const cursor = User.find().cursor();

  for (let user = await cursor.next(); user != null; user = await cursor.next()) {
    checkRecurringExpenses(user.id);
  }
}

module.exports = checkRecurrencesForAllUsers;