import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    result : [],
    isLoading : false,
    error : null,
}

export default handleActions({
    [type.SEARCH_REQUEST] : (state,action) => Object.assign({},state, {isLoading : true}),
    [type.SEARCH_SUCCESS] : (state,action) => Object.assign({},state, {result : action.payload, isLoading : false}),
    [type.SEARCH_FAILED] : (state,action) => Object.assign({},state, {isLoading : false, error : action.payload}),
    [type.SEARCH_MORE] :  (state,action) => Object.assign({},state, {result : [...state.result,action.payload], isLoading : false}),
}, initialState)