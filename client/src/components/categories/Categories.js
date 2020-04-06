import React, { useEffect, useState, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { loadUser } from '../../actions/auth';
import CategoryForm from './CategoryForm';
import CategoryTable from './CategoryTable';

export const Categories = ({ loadUser, auth: { user, loading } }) => {
  useEffect(() => {
    loadUser();
  }, []);

  const [showCategoryForm, toggleCategoryForm] = useState(false);

  return (
    loading ? <div>Loading...</div> : 
    <Fragment>
      <h1 className="large text-primary">Categories</h1>
      <button onClick={e => {toggleCategoryForm(true)}} className="btn btn-primary">Add Category</button>
      <CategoryForm show={showCategoryForm} toggleShow={toggleCategoryForm} />
      <CategoryTable categories={user.categories} />
    </Fragment>
  )
}

Categories.propTypes = {
  loadUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loadUser })(Categories);
