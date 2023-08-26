import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

const Navabar = ({logout, isAuthenticated}) => {

  const guestLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    </Fragment>
  );

  const authLinks = () => (
    <Fragment>
      <li className="nav-item">
        <Link className="nav-link" to="/logout" onClick={logout}>Logout</Link>
      </li>
    </Fragment>
  );



  return (
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">PropyDoc</Link>
         
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            
            <ul className="navbar-nav">
      
                  {isAuthenticated ? authLinks() : guestLinks()}
            </ul>
          </div>
          
        </div>
      </nav>
  )
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout}) (Navabar);