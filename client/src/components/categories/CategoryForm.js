import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addCategory } from '../../actions/categories';
import { Dialog } from 'primereact/dialog';

export const CategoryForm = ({ show, addCategory, toggleShow }) => {
  const [formData, setFormData] = useState({
    name: '',
    color: ''
  });

  const { name, color } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Dialog header="Add Category" visible={show} style={{width: '80vw'}} modal={true} onHide={() => {
      toggleShow(false);
    }}>
      <form className="form" onSubmit={e => {
        e.preventDefault();
        addCategory(formData);
        toggleShow(false);
      }}>
        <div className="form-group">
          <input type="text" placeholder="* Category Name" name="name" value={name} onChange={e => onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="color" placeholder="* Color" name="color" value={color} onChange={e => onChange(e)} required />
          <label for="color"> Color</label>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
      </form>
    </Dialog>
  );
}

CategoryForm.propTypes = {

}

export default connect(null, { addCategory })(CategoryForm);
