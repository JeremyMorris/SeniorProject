import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCategory } from '../../actions/categories';
import CategoryEditForm from './CategoryEditForm';

const CategoryTable = ({ categories, deleteCategory }) => {
  let categoryList = [];

  const [showCategoryEditForm, toggleCategoryEditForm] = useState(false);
  const [editFormData, changeEditFormData] = useState({});

  if (categories) {
    categoryList = categories.map(cat => (
      <tr key={cat._id}>
        <td>{cat.name}</td>
        <td>
          <input type="color" value={cat.color} disabled={true} />  
        </td>
        <td>
          <button onClick={e => {toggleCategoryEditForm(true); changeEditFormData(cat);}} className="btn btn-primary">
            <i className="fas fa-edit table-button"></i>
          </button>
          <button onClick={() => deleteCategory(cat._id)} className="btn btn-danger">
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
            <th>Color</th>
            <th />
          </tr>
        </thead>
        <tbody>{categoryList}</tbody>
      </table>
      <CategoryEditForm show={showCategoryEditForm} toggleShow={toggleCategoryEditForm} data={editFormData}/>
    </Fragment>
  )
}

CategoryTable.propTypes = {
  categories: PropTypes.array.isRequired,
  deleteCategory: PropTypes.func.isRequired
}

export default connect(null, { deleteCategory })(CategoryTable);