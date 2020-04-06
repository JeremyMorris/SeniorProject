import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCategory } from '../../actions/categories';

const CategoryTable = ({ categories, deleteCategory }) => {
  let categoryList = [];
  if (categories) {
    categoryList = categories.map(cat => (
      <tr key={cat._id}>
        <td>{cat.name}</td>
        <td>
          <input type="color" value={cat.color} disabled={true} />  
        </td>
        <td>
          <button onClick={() => deleteCategory(cat._id)} className="btn btn-danger">Delete</button>
        </td>
      </tr>
    ));
  }

  return (
    <Fragment>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Color</th>
            <th />
          </tr>
        </thead>
        <tbody>{categoryList}</tbody>
      </table>
    </Fragment>
  )
}

CategoryTable.propTypes = {
  categories: PropTypes.array.isRequired,
  deleteCategory: PropTypes.func.isRequired
}

export default connect(null, { deleteCategory })(CategoryTable);