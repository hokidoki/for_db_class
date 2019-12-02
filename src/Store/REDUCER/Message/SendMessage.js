import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    err : "",
    isLoading : false
}

export default handleActions({
    [type.SEND_MESSAGE_REQUEST] : (state,action) => Object.assign({},state, {isLoading : true}),
    [type.SEND_MESSAGE_SUCCESS] : (state,action) => Object.assign({},state, {isLoading : false}),
    [type.SEND_MESSAGE_FAILED] : (state,action) => Object.assign({},state, {isLoading : false, err : action.payload}),
}, initialState)