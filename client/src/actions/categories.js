import axios from 'axios';
import { setAlert } from './alert';
import { USER_LOADED, PROCEDURE_FAIL } from './types';

// delete category
export const deleteCategory = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/categories/${id}`);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

    dispatch(setAlert('Category Deleted', 'success'));
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

// create category
export const addCategory = (formData) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/categories', formData, config);

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });

    dispatch(setAlert('Category Added', 'success'));
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