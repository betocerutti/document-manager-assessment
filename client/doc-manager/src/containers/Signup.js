import React from 'react';

const Signup = () => (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-lg-6">
            <h1 className="large text-primary">Sign up</h1>
                    <p className="lead">
                        <i className="fas fa-user"></i> Create an account
                    </p>
            <form>
                <div className="mb-3">
                    <input type="email" 
                           className="form-control" 
                           id="email" 
                           placeholder="Email address" 
                           name="email" 
                           required />
                </div>
                <div className="mb-3">
                
                <input type="password" className="form-control" id="password" placeholder="Password" name="password" required />
                </div>
                <div className="mb-3">
                
                <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password" name="confirmPassword" required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>
            </div>
        </div>
    </div>
);

export default Signup;