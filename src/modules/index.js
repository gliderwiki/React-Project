import { combineReducers } from 'redux';
import base from './base';
import contact from './contact'
import modal from './modal';

export default combineReducers({
    base,
    contact,
    modal
});