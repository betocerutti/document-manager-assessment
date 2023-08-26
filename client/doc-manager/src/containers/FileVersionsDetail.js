import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFileDetailRequest, fetchFileDetailSuccess, fetchFileDetailFailure } from '../actions/files';


const FileDetailContainer = ({ match }) => {
    console.log('match:', match);
    const dispatch = useDispatch();
    const { fileDetail, loading, error } = useSelector(state => state.files);

    useEffect(() => {
        dispatch(fetchFileDetailRequest());
        // fetch data widh authorization header using axios
        axios.get(`${process.env.REACT_APP_API_URL}/api/file_versions/${match.params.uid}`,
            { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } })
            .then(response => dispatch(fetchFileDetailSuccess(response.data)))
            .catch(error => dispatch(fetchFileDetailFailure(error)));
    }, [dispatch, match.params.uid]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-primary">File detail</h1>
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="container-fluid py-5">
                        <table className="table">
                            <thead> 
                                <tr>
                                    <th scope="col">File name</th>
                                    <th scope="col">Version</th>
                                    <th scope="col">Created</th>
                                    <th scope="col">Owner</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{fileDetail.file_name}</td>
                                    <td>{fileDetail.version_number}</td>
                                    <td>{fileDetail.created}</td>
                                    <td>{fileDetail.owner}</td>
                                    <td><Link to={`/file/${fileDetail.id}/download`}><i className="bi bi-download"></i></Link></td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className="text-primary">Versions</h2>

                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Version</th>
                                            <th scope="col">Created</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fileDetail.versions && fileDetail.versions.map((version, index) => (
                                            <tr key={index}>
                                                <td>{version.version_number}</td>
                                                <td>{version.created}</td>
                                                <td><Link to={`/file/${version.id}/download`}><i className="bi bi-download"></i></Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className="text-primary">Comments</h2>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FileDetailContainer;

