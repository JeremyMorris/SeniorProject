import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { editCategory } from '../../actions/categories';
import { Dialog } from 'primereact/dialog';

export const CategoryEditForm = ({ show, editCategory, toggleShow, data }) => {
  const [formData, setFormData] = useState({
    name: '',
    color: ''
  });

  useEffect(() => {
    setFormData({
      name: data.name || '',
      color: data.color || ''
    })
  }, [data])

  const { name, color } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Dialog header="Edit Category" visible={show} style={{width: '80vw'}} modal={true} onHide={() => {
      toggleShow(false);
    }}>
      <form className="form" onSubmit={e => {
        e.preventDefault();
        editCategory(formData, data._id);
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

CategoryEditForm.propTypes = {

}

export default connect(null, { editCategory })(CategoryEditForm);
