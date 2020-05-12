import React, { Fragment, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';
import { ChartCarousel } from './ChartCarousel';
import { MultiSelect } from 'primereact/multiselect';
import ExpenseForm from '../expenses/ExpenseForm';

const Dashboard = ({ loadUser, auth: { user, loading } }) => {
  useEffect(() => {
    if (!loading) {
      setCategoryDropdown(user.categories);
    }
  }, [loading]);

  const date = new Date();
  const firstDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDateOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const [fromDate, setFromDate] = useState(`${firstDateOfMonth.getFullYear()}-${(date.getMonth().length < 2 ? '' : '0')}${firstDateOfMonth.getMonth()+1}-0${firstDateOfMonth.getDate()}`);
  const [toDate, setToDate] = useState(`${lastDateOfMonth.getFullYear()}-${(date.getMonth().length < 2 ? '' : '0')}${lastDateOfMonth.getMonth()+1}-${lastDateOfMonth.getDate()}`);

  const [showExpenseForm, toggleExpenseForm] = useState(false);
  const [categoryDropdownValue, setCategoryDropdown] = useState([]);
  const onCategoryChange = e => setCategoryDropdown(e.target.value);

  function categoryTemplate(e) {
    return (
      <div>
        {e.name}{' '}
        <input type="color" value={e.color} disabled={true} />
      </div>
    );
  }

  return (
    loading ? <div>Loading...</div> : 
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <button onClick={e => {toggleExpenseForm(true)}} className="btn btn-primary">Add Expense</button>
      <ExpenseForm show={showExpenseForm} toggleShow={toggleExpenseForm} categories={user.categories}/>
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
      <div className="form-group">
        <MultiSelect value={categoryDropdownValue} options={user.categories} itemTemplate={e => categoryTemplate(e)} 
          onChange={e => onCategoryChange(e)} placeholder="Categories" optionLabel="name" style={{width: '100%'}}
          maxSelectedLabels={10} />
      </div>
      <ChartCarousel expenses={user.expenses} selectedCategories={categoryDropdownValue} fromDate={fromDate} toDate={toDate} />
    </Fragment>
  )
};

Dashboard.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(Dashboard);
