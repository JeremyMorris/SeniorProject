import axios from 'axios';
import { setAlert } from './alert';
import { USER_LOADED, PROCEDURE_FAIL } from './types';

// delete expense
export const deleteExpense = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/expenses/${id}`);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

    dispatch(setAlert('Expense Deleted', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROCEDURE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

// create expense
export const addExpense = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/expenses', formData, config);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

    dispatch(setAlert('Expense Added', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROCEDURE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}