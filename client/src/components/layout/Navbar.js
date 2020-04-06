import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';

export const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <Link to='/dashboard'>
        <i className="fas fa-user"></i>{' '}
        <span className="hide-sm">Dashboard</span>
      </Link>
      <Link to='/expenses'>
        <i className="fas fa-dollar-sign"></i>{' '}
        <span className="hide-sm">Expenses</span>
      </Link>
      <Link to='/categories'>
        <i className="fas fa-align-left"></i>{' '}
        <span className="hide-sm">Categories</span>
      </Link>
      <Link to='/' onClick={logout}>
        <i className='fas fa-sign-out-alt'></i>{' '}
        <span className='hide-sm'>Logout</span>
      </Link>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-search-dollar"></i> Ex-Pensive</Link>
      </h1>
  { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
    </nav>

  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);