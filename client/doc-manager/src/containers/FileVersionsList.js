import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFileListRequest, fetchFileListSuccess, fetchFileListFailure } from '../actions/files';


const FileListContainer = () => {
    const dispatch = useDispatch();
    const { fileList, loading, error } = useSelector(state => state.files);
  
    useEffect(() => {
      dispatch(fetchFileListRequest());
      // fetch data widh authorization header using axios
      axios.get(`${process.env.REACT_APP_API_URL}/api/file_versions`, 
      { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } })
            .then(response => dispatch(fetchFileListSuccess(response.data)))
            .catch(error => dispatch(fetchFileListFailure(error)));
    }, [dispatch]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    return (
          <div className="container mt-5">
            <h1 className="text-primary">Files</h1>
            <button type="button" className="btn btn-primary">Upload file</button>
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="container-fluid py-5">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">File name</th>
                                    <th scope="col">Versions</th>
                                    <th scope="col">Created</th>
                                    <th scope="col">Owner</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fileList.map((file, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index}</th>
                                        <td><Link to={`/files/${file.id}`}>{file.file_name}</Link></td>
                                        <td>{file.version_number}</td>
                                        <td>{file.file}</td>
                                        <td>{file.owner}</td>
                                        
                                        <td><Link to={`/files/${file.id}/download`}><i className="bi bi-download"></i></Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
  };
  
  export default FileListContainer;



