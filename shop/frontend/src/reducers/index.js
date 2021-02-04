import { combineReducers } from "redux";
import products from './products';
import layout from './layout';
import auth from './auth';

export default combineReducers({
    products,
    layout,
    auth
});