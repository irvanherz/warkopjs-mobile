import auth from '../../Auth/reducer';
import product from '../../App/productReducer';
import cart from '../../App/cartReducer';
import { combineReducers } from 'redux';

export default combineReducers({ auth, product, cart });
