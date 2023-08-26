import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (


    <div className="container mt-5">
        <div className="row justify-content-center">
            <div className="col-lg-12">

                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <div className="container-fluid py-5">
                        <h1 className="display-5 fw-bold text-primary">Propylon Document Manager</h1>
                        <p className="col-md-8 fs-4">
                            Tool for managing multiple versions of documents and its metadata.
                            You can upload a document to the desire URL, and the system will automatically create a new version of the document.
                            It is also possible to see the history of the document and download a specific version.
                        </p>
                        <Link to="/login" className="btn btn-outline-primary btn-lg" type="button">Login</Link>
                    </div>
                </div>

            </div>
        </div>
    </div>
);

export default Home;