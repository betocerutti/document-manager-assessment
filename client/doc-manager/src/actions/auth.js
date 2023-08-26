import axios from 'axios';
import { 
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    FETCH_FILE_LIST_REQUEST,
    FETCH_FILE_LIST_SUCCESS,
    FETCH_FILE_LIST_FAILURE
} from "./types";

export const checkAuthenticated = () => async dispatch => {

    if (localStorage.getItem('token')){
        dispatch({
            type: AUTHENTICATED_SUCCESS
        });
        // const config = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'

        //     }
        // };
        // const body = JSON.stringify({token: localStorage.getItem('token')});

        // try {
        //     const res = await axios.post(
        //         `${process.env.REACT_APP_API_URL}/auth-jwt-verify/`,
        //         body,
        //         config
        //     );
        //     if (res.data.code !== 'token_not_valid'){
        //         dispatch({
        //             type: AUTHENTICATED_SUCCESS
        //         });
        //     } else {
        //         dispatch({
        //             type: AUTHENTICATED_FAIL
        //         });
        //     }
        // } catch (err) {
        //     dispatch({
        //         type: AUTHENTICATED_FAIL
        //     });
        // }
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};


export const load_user = () => async dispatch => {
    if (localStorage.getItem('token')){
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${localStorage.getItem('token')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/api/users/me/`, 
                config);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
    }
};

export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    const body = JSON.stringify({username, password});
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth-token/`, 
            body, 
            config);
        dispatch({
            type: LOGIN_SUCCESS, 
            payload: res.data
        });
        dispatch(load_user());
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL
        });
    }
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};

export const load_files = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${localStorage.getItem('token')}`,
            'Accept': 'application/json'
        }
    };
    try {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/file_versions/`, 
            config);
        dispatch({
            type: FETCH_FILE_LIST_SUCCESS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: FETCH_FILE_LIST_FAILURE
        });
    }

}

