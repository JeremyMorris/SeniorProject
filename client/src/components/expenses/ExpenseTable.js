import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExpense } from '../../actions/expenses';
import ExpenseEditForm from './ExpenseEditForm';

const ExpenseTable = ({ expenses, categories, deleteExpense }) => {
  let expenseList = [];
  let categoryDictionary = {};

  const [showExpenseEditForm, toggleExpenseEditForm] = useState(false);
  const [editFormData, changeEditFormData] = useState({});

  categories.forEach(cat => {
    categoryDictionary[cat._id] = {
      name: cat.name,
      color: cat.color
    };
  });

  if (expenses) {
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    expenseList = expenses.map(exp => (
      <tr key={exp._id}>
        <td>{exp.name}</td>
        <td>${exp.amount}</td>
        <td>{categoryDictionary[exp.category] ? categoryDictionary[exp.category].name : ''}</td>
        <td className="hide-sm"><Moment utc format='MM/DD/YYYY'>{exp.date}</Moment></td>
        <td>
          <button onClick={e => {toggleExpenseEditForm(true); changeEditFormData(exp);}} className="btn btn-primary">
            <i className="fas fa-edit table-button"></i>
          </button>
          <button onClick={() => deleteExpense(exp._id)} className="btn btn-danger">
            <i className="fas fa-trash-alt table-button"></i>
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <Fragment>
      <table className="table center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th className="hide-sm">Date</th>
            <th />
          </tr>
        </thead>
        <tbody>{expenseList}</tbody>
      </table>
      <ExpenseEditForm show={showExpenseEditForm} toggleShow={toggleExpenseEditForm} categories={categories} data={editFormData}/>
    </Fragment>
  )
}

ExpenseTable.propTypes = {
  expenses: PropTypes.array.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
}

export default connect(null, { deleteExpense })(ExpenseTable);