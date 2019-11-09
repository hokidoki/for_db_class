import { combineReducers } from 'redux';
import sign_in from './SIGN_IN';
import sign_up from './SIGN_UP';


export default combineReducers({
    sign_in,
    sign_up,
})
