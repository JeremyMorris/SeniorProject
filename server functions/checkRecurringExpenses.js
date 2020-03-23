const User = require('../models/User');

async function checkRecurringExpenses(userID) {
  try {
    const user = await User.findById(userID).select('-password');
    const recurringExpenses = user.recurringExpenses;

    let currentDate = new Date();

    recurringExpenses.forEach(expense => {
      // if the current date is the expense's next occurrence
      if (
        expense.nextOccurrence.getFullYear() === currentDate.getFullYear() &&
        expense.nextOccurrence.getMonth() === currentDate.getMonth() &&
        expense.nextOccurrence.getDate() === currentDate.getDate()
      ) {
        // add an instance of the expense
        let newExpense = {};
        newExpense.name = expense.name;
        newExpense.amount = expense.amount;
        newExpense.category = expense.category;
        newExpense.date = Date.now();
        newExpense.notes = expense.notes;
        newExpense.recurring = true;
        newExpense.parent = expense.id;

        user.expenses.push(newExpense);

        // get the index of the recurring expense
        const index = user.recurringExpenses.map(item => item.id).indexOf(expense.id);

        // increment nextOccurrence
        switch(String(expense.frequency)) {
          case "daily":
            user.recurringExpenses[index].nextOccurrence.setDate(expense.nextOccurrence.getDate() + 1);
            user.recurringExpenses[index].nextOccurrence = new Date(user.recurringExpenses[index].nextOccurrence.toString());
            break;
          case "weekly":
            user.recurringExpenses[index].nextOccurrence.setDate(expense.nextOccurrence.getDate() + 7);
            user.recurringExpenses[index].nextOccurrence = new Date(user.recurringExpenses[index].nextOccurrence.toString());
            break;
          case "biweekly":
            user.recurringExpenses[index].nextOccurrence.setDate(expense.nextOccurrence.getDate() + 14);
            user.recurringExpenses[index].nextOccurrence = new Date(user.recurringExpenses[index].nextOccurrence.toString());
            break;
          case "monthly":
            user.recurringExpenses[index].nextOccurrence.setMonth(expense.nextOccurrence.getMonth() + 1);
            user.recurringExpenses[index].nextOccurrence = new Date(user.recurringExpenses[index].nextOccurrence.toString());
            break;
          case "bimonthly":
            user.recurringExpenses[index].nextOccurrence.setMonth(expense.nextOccurrence.getMonth() + 2);
            user.recurringExpenses[index].nextOccurrence = new Date(user.recurringExpenses[index].nextOccurrence.toString());
            break;
          case "yearly":
            user.recurringExpenses[index].nextOccurrence.setFullYear(expense.nextOccurrence.getFullYear() + 1);
            user.recurringExpenses[index].nextOccurrence = new Date(user.recurringExpenses[index].nextOccurrence.toString());
            break;
        }
      }
    });

    await user.save();
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = checkRecurringExpenses;