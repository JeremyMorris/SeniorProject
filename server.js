const express = require('express');
const connectDB = require('./config/db');
const schedule = require('node-schedule');

const app = express();

const checkRecurrencesForAllUsers = require('./server functions/checkRecurrencesForAllUsers');

// Connect database
connectDB();

// Initialize middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running 👍'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/categories', require('./routes/api/categories'));
app.use('/api/expenses', require('./routes/api/expenses'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

schedule.scheduleJob('0 0 * * *', () => {
  console.log('Checking recurrences for all users');
  checkRecurrencesForAllUsers();
})