import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { loadUser } from '../../actions/auth';
import ExpenseTable from './ExpenseTable';
import ExpenseForm from './ExpenseForm';

export const Expenses = ({ loadUser, auth: { user, loading } }) => {
  useEffect(() => {
    loadUser();
  }, []);

  const [showExpenseForm, toggleExpenseForm] = useState(false);

  const date = new Date();
  const firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const [fromDate, setFromDate] = useState(`${firstDateOfMonth.getFullYear()}-${(date.getMonth().length < 2 ? '' : '0')}${firstDateOfMonth.getMonth()+1}-0${firstDateOfMonth.getDate()}`);
  const [toDate, setToDate] = useState(`${lastDateOfMonth.getFullYear()}-${(date.getMonth().length < 2 ? '' : '0')}${lastDateOfMonth.getMonth()+1}-${lastDateOfMonth.getDate()}`);

  return (
    loading ? <div>Loading...</div> : 
    <Fragment>
      <h1 className="large text-primary">Expenses</h1>
      <button onClick={e => {toggleExpenseForm(true)}} className="btn btn-primary">Add Expense</button>
      <ul className="form parent">
        <li className="form-group half">
          <h4>From Date</h4>
          <input type="date" name="from" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </li>
        <li className="form-group half">
          <h4>To Date</h4>
          <input type="date" name="to" value={toDate} onChange={e => setToDate(e.target.value)} />
        </li>
      </ul>
      <ExpenseForm show={showExpenseForm} toggleShow={toggleExpenseForm} categories={user.categories}/>
      <h2>Expenses from {fromDate} to {toDate}</h2>
      <ExpenseTable expenses=
        {user.expenses.filter(exp => {
            const time = new Date(exp.date).getTime();
            const from = new Date(fromDate).getTime();
            const to = new Date(toDate).getTime();
            return (from <= time && time <= to);
          })
        } categories={user.categories} />
      <h2>Recurring Expenses</h2>
      <ExpenseTable expenses={user.recurringExpenses} categories={user.categories} />
    </Fragment>
  )
}

Expenses.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(Expenses);
