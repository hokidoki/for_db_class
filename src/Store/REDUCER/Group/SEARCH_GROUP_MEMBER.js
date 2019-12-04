import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    members : [],
    isLoading : false,
    error : null
}

export default handleActions({
    [type.SEARCH_GROUP_MEMBER_REQUEST] : (state) => Object.assign({},state, {isLoading : true}),
    [type.SEARCH_GROUP_MEMBER_SUCCESS] : (state,action) => Object.assign({},state, {members : [...action.payload],isLoading : false}),
    [type.SEARCH_GROUP_MEMBER_FAILED] : (state,action) => Object.assign({},state, {isLoading : false, error : action.payload}),
}, initialState)