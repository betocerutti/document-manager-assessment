import axios from 'axios';
import {
    FETCH_FILE_LIST_REQUEST,
    FETCH_FILE_LIST_SUCCESS,
    FETCH_FILE_LIST_FAILURE,
    FETCH_FILE_DETAIL_FAILURE,
    FETCH_FILE_DETAIL_REQUEST,
    FETCH_FILE_DETAIL_SUCCESS,
} from "./types";

export const fetchFileListRequest = () => ({
    type: FETCH_FILE_LIST_REQUEST,
});

export const fetchFileListSuccess = fileList => ({
    type: FETCH_FILE_LIST_SUCCESS,
    payload: fileList,
});

export const fetchFileListFailure = error => ({
    type: FETCH_FILE_LIST_FAILURE,
    payload: error,
});

export const fetchFileDetailRequest = () => ({
    type: FETCH_FILE_DETAIL_REQUEST,
});

export const fetchFileDetailSuccess = fileDetail => ({
    type: FETCH_FILE_DETAIL_SUCCESS,
    payload: fileDetail,
});

export const fetchFileDetailFailure = error => ({
    type: FETCH_FILE_DETAIL_FAILURE,
    payload: error,
});

// export const fetchFileList = () => {
//     return (dispatch) => {
//         dispatch(fetchFileListRequest());
//         // fetch data widh authorization header using axios
//         axios.get(`${process.env.REACT_APP_API_URL}/api/file_versions`,
//             { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } })
//             .then(response => dispatch(fetchFileListSuccess(response.data)))
//             .catch(error => dispatch(fetchFileListFailure(error)));
//     };
// }

// export const fetchFileDetail = (id) => {
//     return (dispatch) => {
//         dispatch(fetchFileDetailRequest());
//         // fetch data widh authorization header using axios
//         axios.get(`${process.env.REACT_APP_API_URL}/api/file_versions/${id}`,
//             { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } })
//             .then(response => dispatch(fetchFileDetailSuccess(response.data)))
//             .catch(error => dispatch(fetchFileDetailFailure(error)));
//     };
// }

// export const uploadFile = (file) => {
//     return (dispatch) => {
//         dispatch(fetchFileDetailRequest());
//         // fetch data widh authorization header using axios
//         axios.post(`${process.env.REACT_APP_API_URL}/api/file_versions/`,
//             { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } })
//             .then(response => dispatch(fetchFileDetailSuccess(response.data)))
//             .catch(error => dispatch(fetchFileDetailFailure(error)));
//     };
// }

// export const downloadFile = (id) => {
//     return (dispatch) => {
//         dispatch(fetchFileDetailRequest());
//         // fetch data widh authorization header using axios
//         axios.get(`${process.env.REACT_APP_API_URL}/api/file_versions/${id}/download`,
//             { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } })
//             .then(response => dispatch(fetchFileDetailSuccess(response.data)))
//             .catch(error => dispatch(fetchFileDetailFailure(error)));
//     };
// }

// export const deleteFile = (id) => {
//     return (dispatch) => {
//         dispatch(fetchFileDetailRequest());
//         // fetch data widh authorization header using axios
//         axios.delete(`${process.env.REACT_APP_API_URL}/api/file_versions/${id}`,
//             { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } })
//             .then(response => dispatch(fetchFileDetailSuccess(response.data)))
//             .catch(error => dispatch(fetchFileDetailFailure(error)));
//     };
// }

// export const updateFile = (id) => {
//     return (dispatch) => {
//         dispatch(fetchFileDetailRequest());
//         // fetch data widh authorization header using axios
//         axios.put(`${process.env.REACT_APP_API_URL}/api/file_versions/${id}`,
//             { headers: { 'Authorization': `Token ${localStorage.getItem('token')}` } })
//             .then(response => dispatch(fetchFileDetailSuccess(response.data)))
//             .catch(error => dispatch(fetchFileDetailFailure(error)));
//     };
// }


