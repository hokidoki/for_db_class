import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    err : "",
    conversation : [],
    isLoading : false
}

export default handleActions({
    [type.GET_MESSAGE_REQUEST] : (state,action) => Object.assign({},state, {isLoading : true}),
    [type.GET_MESSAGE_SUCCESS] : (state,action) => Object.assign({},state, {isLoading : false, conversation : [...action.payload]}),
    [type.GET_MESSAGE_FAILED] : (state,action) => Object.assign({},state, {isLoading : false, err : action.payload}),
}, initialState)