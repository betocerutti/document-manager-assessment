import React from 'react';

const ResetPassword = () => (
    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-lg-6">
            <h1 className="mb-4 text-primary">Reset Password</h1>
            <form>
                <div className="mb-3">
                <input type="email" className="form-control" id="email" placeholder="Email" name="email" required />
                </div>
                <div className="mb-3">
                <input type="password" className="form-control" id="newPassword" placeholder="New Password" name="newPassword" required /> 
                </div>
                <div className="mb-3">
                <input type="password" className="form-control" id="confirmNewPassword" placeholder="Confirm New Password" name="confirmNewPassword" required />
                </div>
                <button type="submit" className="btn btn-primary">Reset Password</button>
            </form>
            </div>
        </div>
    </div>
);

export default ResetPassword;