import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    isLoading : false,
    error : null
}

export default handleActions({
    [type.SIGN_UP_REQUEST] : (state) => Object.assign({},state, {isLoading : true}),
    [type.SIGN_UP_SUCCESS] : (state) => Object.assign({},state, {isLoading : false}),
    [type.SIGN_UP_FAILED] : (state,action) => Object.assign({},state, {isLoading : false, error: action.payload}),
}, initialState)