import React, {useState} from 'react';
import {Link, Navigate} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../actions/auth';

const Login = ({login, isAuthenticated}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const {username, password} = formData;
    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        login(username, password);
        console.log('SUCCESS');
    };

    if (isAuthenticated) {
        return <Navigate to='/' />;
    } 

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-lg-6">
                    <h1 className="large text-primary">Sign In</h1>
                    <p className="lead">
                        <i className="fas fa-user"></i> Sign into Your Account
                    </p>
                    <form onSubmit={e => onSubmit(e)}>
                        <div className="mb-3">
                            <input className="form-control"
                                type="email" 
                                placeholder="Email Address" 
                                name="username" 
                                value={username} 
                                onChange={e => onChange(e)} 
                                required/>
                        </div>
                        <div className="mb-3">
                            <input className="form-control"
                                type="password" 
                                placeholder="Password" 
                                name="password" 
                                value={password} 
                                onChange={e => onChange(e)} 
                                minLength="6"/>
                        </div>
                        <button className='btn btn-primary' 
                                type='submit'>Login</button>
                    </form>
                    <p className="mt-3">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </p>
                    <p className="mt-3">
                        Forgot your password? <Link to="/reset-password">Reset password</Link>
                    </p>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);  