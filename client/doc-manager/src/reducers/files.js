import {
    FETCH_FILE_LIST_REQUEST,
    FETCH_FILE_LIST_SUCCESS,
    FETCH_FILE_LIST_FAILURE,
    FETCH_FILE_DETAIL_FAILURE,
    FETCH_FILE_DETAIL_REQUEST,
    FETCH_FILE_DETAIL_SUCCESS,
} from "../actions/types";

const initialState = {
    fileList: [],
    fileDetail: {},
    loading: false,
    error: null,
};

const fileReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FILE_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_FILE_LIST_SUCCESS:
            return {
                ...state,
                fileList: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_FILE_LIST_FAILURE:
            return {
                ...state,
                fileList: [],
                loading: false,
                error: action.payload,
            };
        case FETCH_FILE_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_FILE_DETAIL_SUCCESS:
            return {
                ...state,
                fileDetail: action.payload,
                loading: false,
                error: null,
            };
        case FETCH_FILE_DETAIL_FAILURE:
            return {
                ...state,
                fileDetail: {},
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default fileReducer;