import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { editExpense } from '../../actions/expenses';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';

export const ExpenseEditForm = ({ show, editExpense, toggleShow, categories, data }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    category: '',
    date: '',
    notes: '',
    recurring: false,
    frequency: ''
  });

  useEffect(() => {
    let datadate = '';
    if (data.date) {
      const dateObj = new Date(data.date);
      datadate = dateObj.toISOString().slice(0,10);
    }
    setFormData({
      name: data.name || '',
      amount: data.amount || '',
      category: data.category || '',
      date: datadate || '',
      notes: data.notes || '',
      recurring: data.recurring || false,
      frequency: data.frequency || ''
    })
  }, [data])

  const [frequencyDisabled, toggleDisabled] = useState(false);

  const [categoryDropdownValue, setCategoryDropdown] = useState({});

  const { name, amount, date, notes, recurring, frequency } = formData;

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
    <Dialog header="Edit Expense" visible={show} style={{width: '80vw'}} modal={true} onHide={() => {
      toggleShow(false);
    }}>
      <form className="form" onSubmit={e => {
        e.preventDefault();
        editExpense(formData, data._id);
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

export default connect(null, { editExpense })(ExpenseEditForm);
