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
} from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
};

export default function(state = initialState, action) {
    const {type, payload} = action;

    switch(type) {
        case AUTHENTICATED_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            };
        case AUTHENTICATED_FAIL:
            return {
                ...state,
                isAuthenticated: false
            };
        case LOGOUT:
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                refresh: null,
                user: null
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                isAuthenticated: true,
                token: payload.token,
                refresh: payload.refresh
            };
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null
            };
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user: payload
            };
        case USER_LOADED_FAIL:
            return {
                ...state,
                user: null
            };
        case FETCH_FILE_LIST_SUCCESS:
            return {
                ...state,
                files: payload
            };
        case FETCH_FILE_LIST_FAILURE:
            return {
                ...state,
                files: null
            };
    
        default:
            return state;
    }
}