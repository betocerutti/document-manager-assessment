import { combineReducers } from 'redux';
import auth from './auth';
import fileReducer from '../reducers/files.js'

export default combineReducers({
    auth: auth, 
    files: fileReducer
});