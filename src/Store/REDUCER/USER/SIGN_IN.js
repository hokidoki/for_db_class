import { handleActions } from 'redux-actions';
import * as type from '../../ACTIONS/ActionType';

const initialState = {
    user : null,
    friends :[],
    bothFollow : [],
    isLoading : false,
    error : null
}

export default handleActions({
    [type.SIGN_IN_REQUEST] : (state) => Object.assign({},state, {isLoading : true}),
    [type.SIGN_IN_SUCCESS] : (state,action) => Object.assign({},state, { user : action.payload, friends : [...action.payload.friends],bothFollow: [...action.payload.bothFollow],isLoading : false}),
    [type.SIGN_IN_FAILED] : (state,action) => Object.assign({},state, {isLoading : false, error: action.payload}),
    [type.CHANGE_INFO] : (state,action ) =>Object.assign({},state, {user : action.payload, error: false, isLoading : false}),
    [type.LOGOUT] : (state) => Object.assign({},state, {user : null, isLoading : false}),
    [type.GET_WHO_FOLLOW_ME_SUCCESS] : (state,action) => Object.assign({},state,{ whoFollowMe : action.data}),
}, initialState)