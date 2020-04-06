import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addExpense } from '../../actions/expenses';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

export const ExpenseForm = ({ show, addExpense, toggleShow, categories }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: '',
    notes: '',
    recurring: false,
    frequency: ''
  });

  const [frequencyDisabled, toggleDisabled] = useState(false);

  const [categoryDropdownValue, setCategoryDropdown] = useState({});

  const { name, amount, category, date, notes, recurring, frequency } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onCategoryChange = e => {
    setFormData({ ...formData, category: e.target.value._id });
    setCategoryDropdown(e.target.value);
  }

  function categoryTemplate(e) {
    return (
      <div>
        {e.name}{' '}
        <input type="color" value={e.color} disabled={true} />
      </div>
    );
  }
  
  return (
    <Dialog header="Add Expense" visible={show} style={{width: '80vw'}} modal={true} onHide={() => {
      toggleShow(false);
    }}>
      <form className="form" onSubmit={e => {
        e.preventDefault();
        addExpense(formData);
        toggleShow(false);
      }}>
        <div className="form-group">
          <input type="text" placeholder="* Expense Name" name="name" value={name} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Amount" name="amount" value={amount} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <Dropdown value={categoryDropdownValue} options={categories} itemTemplate={e => categoryTemplate(e)} 
            onChange={e => onCategoryChange(e)} placeholder="* Category" optionLabel="name" style={{width: '100%'}} />
        </div>
        <div className="form-group">
          <h4>Date</h4>
          <input type="date" name="date" value={date} onChange={e => onChange(e)} />
        </div>
        <div className="form-group">
          <textarea
            name="notes"
            cols="30"
            rows="5"
            placeholder="Additional Notes"
            value={notes} onChange={e => onChange(e)}
          ></textarea>
        </div>
        <div className="form-group">
          <p><input type="checkbox" name="recurring" checked={recurring} value={recurring} onChange={e => {
              setFormData({ ...formData, recurring: !recurring });
              toggleDisabled(!frequencyDisabled);
            }} />{' '}Recurring Expense</p>
        </div>
        <div className="form-group">
          <select placeholder="Frequency" name="frequency" disabled={frequencyDisabled ? false : true} value={frequency} onChange={e => onChange(e)}>
            <option value="0">* Select Frequency</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Every Other Week</option>
            <option value="monthly">Monthly</option>
            <option value="bimonthly">Every Other Month</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
      </form>
    </Dialog>
  );
}

ExpenseForm.propTypes = {

}

export default connect(null, { addExpense })(ExpenseForm);
